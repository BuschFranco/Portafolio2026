#!/usr/bin/env bash
# Base del portafolio en el PostgreSQL 16 que ya corre en la VPS (lo instaló el provision-db.sh de
# Rebound). Crea la base "portfolio" con la tabla de mensajes del formulario y un usuario que solo
# puede insertar. No toca la base de Rebound. Se puede correr más de una vez.
# Uso (como root): bash provision-db.sh
set -euo pipefail

DB=portfolio
KEYS=/root/portfolio-db.env   # contraseña generada; solo root

systemctl is-active --quiet postgresql || { echo "PostgreSQL no está corriendo"; exit 1; }

echo "==> Contraseña del usuario de la app (se genera una sola vez)"
if [ ! -f "$KEYS" ]; then
  umask 077
  echo "PORTFOLIO_WEB_PASSWORD=$(openssl rand -hex 24)" > "$KEYS"
fi
# shellcheck disable=SC1090
. "$KEYS"

echo "==> Usuario portfolio_web y base $DB"
sudo -u postgres psql -v ON_ERROR_STOP=1 -q <<SQL
do \$\$ begin
  if not exists (select from pg_roles where rolname = 'portfolio_web') then create role portfolio_web login; end if;
end \$\$;
alter role portfolio_web password '${PORTFOLIO_WEB_PASSWORD}';
SQL
sudo -u postgres psql -tAc "select 1 from pg_database where datname = '$DB'" | grep -q 1 || sudo -u postgres createdb "$DB"

echo "==> Tabla de mensajes: la app solo puede insertar (no leer, editar ni borrar)"
sudo -u postgres psql -d "$DB" -v ON_ERROR_STOP=1 -q <<'SQL'
revoke all on database portfolio from public;
grant connect on database portfolio to portfolio_web;
revoke all on schema public from public;
grant usage on schema public to portfolio_web;

create table if not exists public.contact_messages (
  id         bigint generated always as identity primary key,
  name       text not null check (char_length(name) between 1 and 200),
  email      text not null check (char_length(email) between 3 and 320),
  message    text not null check (char_length(message) between 1 and 5000),
  created_at timestamptz not null default now(),
  read_at    timestamptz
);
-- Número de teléfono/WhatsApp (opcional), agregado después.
alter table public.contact_messages add column if not exists phone text
  check (phone is null or char_length(phone) between 6 and 30);
create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);

revoke all on public.contact_messages from public, portfolio_web;
grant insert (name, email, phone, message) on public.contact_messages to portfolio_web;
grant usage on sequence public.contact_messages_id_seq to portfolio_web;
SQL

echo "==> DATABASE_URL para la app"
ENVF=/etc/portfolio/portfolio.env
touch "$ENVF"
# Se reemplaza la línea anterior y se limpian las variables viejas de Notion.
sed -i '/^DATABASE_URL=/d;/^NOTION_/d' "$ENVF"
echo "DATABASE_URL=postgres://portfolio_web:${PORTFOLIO_WEB_PASSWORD}@127.0.0.1:5432/${DB}" >> "$ENVF"
chown root:portfolio "$ENVF"
chmod 640 "$ENVF"

echo "==> Comando para ver los mensajes: portfolio-mensajes [cantidad]"
cat > /usr/local/bin/portfolio-mensajes <<'EOF'
#!/usr/bin/env bash
# Muestra los últimos mensajes del formulario del portafolio (por defecto 20). Uso (como root).
sudo -u postgres psql -d portfolio -P pager=off -c \
  "select id, to_char(created_at at time zone 'America/Argentina/Buenos_Aires', 'DD/MM HH24:MI') as fecha,
          name as nombre, email, phone as numero, left(message, 300) as mensaje
     from contact_messages order by created_at desc limit ${1:-20};"
EOF
chmod 755 /usr/local/bin/portfolio-mensajes

[ -e /srv/portfolio/current ] && systemctl restart portfolio

echo
echo "LISTO. Base $DB en PostgreSQL $(sudo -u postgres psql -tAc 'show server_version' | cut -d' ' -f1)."
