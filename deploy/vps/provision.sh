#!/usr/bin/env bash
# Suma el portafolio a la VPS que ya corre Rebound. Se puede correr más de una vez.
# Requiere que antes se haya corrido el provision.sh de Rebound (Node, Caddy, usuario
# deploy, firewall, swap). No toca la app de Rebound.
# Uso (como root, desde la carpeta deploy/vps copiada al servidor):
#   bash provision.sh "<clave pública de GitHub Actions del portafolio>"
set -euo pipefail

DEPLOY_PUBKEY="${1:?Falta la clave pública de deploy}"
HERE="$(cd "$(dirname "$0")" && pwd)"

for cmd in node caddy; do
  command -v "$cmd" >/dev/null || { echo "Falta $cmd: correr primero el provision.sh de Rebound"; exit 1; }
done
id deploy >/dev/null 2>&1 || { echo "Falta el usuario deploy: correr primero el provision.sh de Rebound"; exit 1; }

echo "==> Usuario 'portfolio' corre la app; 'deploy' la publica"
id portfolio >/dev/null 2>&1 || useradd --system --home /srv/portfolio --shell /usr/sbin/nologin portfolio
usermod -aG portfolio deploy
# Se agrega la clave sin pisar la de Rebound.
grep -qxF "$DEPLOY_PUBKEY" /home/deploy/.ssh/authorized_keys 2>/dev/null \
  || echo "$DEPLOY_PUBKEY" >> /home/deploy/.ssh/authorized_keys
chown deploy:deploy /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys

# releases/<commit> con cada versión, current -> la activa.
install -d -m 2775 -o deploy -g portfolio /srv/portfolio /srv/portfolio/releases /srv/portfolio/incoming

# Variables de la app (NOTION_TOKEN, NOTION_CONTACT_DATABASE_ID).
install -d -m 750 -o root -g portfolio /etc/portfolio
[ -f /etc/portfolio/portfolio.env ] || install -m 640 -o root -g portfolio /dev/null /etc/portfolio/portfolio.env

echo "==> Script de publicación y permiso para reiniciar solo la app"
install -m 755 -o root -g root "$HERE/portfolio-deploy" /usr/local/bin/portfolio-deploy
cat > /etc/sudoers.d/portfolio-deploy <<'EOF'
deploy ALL=(root) NOPASSWD: /usr/bin/systemctl restart portfolio, /usr/bin/systemctl is-active portfolio
EOF
chmod 440 /etc/sudoers.d/portfolio-deploy
visudo -cq

echo "==> Servicio de la app (systemd, puerto 3001)"
cat > /etc/systemd/system/portfolio.service <<'EOF'
[Unit]
Description=Portafolio Franco Busch (Next.js)
After=network-online.target
Wants=network-online.target

[Service]
User=portfolio
Group=portfolio
WorkingDirectory=/srv/portfolio/current
EnvironmentFile=/etc/portfolio/portfolio.env
Environment=NODE_ENV=production PORT=3001 HOSTNAME=127.0.0.1
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=3
# La VPS tiene 1 GB y la comparte con Rebound: tope de memoria para el portafolio.
MemoryMax=300M
# Endurecimiento: la app solo puede escribir en su carpeta.
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/srv/portfolio

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable portfolio >/dev/null

echo "==> Caddy: sitio del portafolio en /etc/caddy/sites"
install -d -m 755 /etc/caddy/sites
install -m 644 "$HERE/buschfranco.caddy" /etc/caddy/sites/buschfranco.caddy
grep -qF 'import /etc/caddy/sites/*.caddy' /etc/caddy/Caddyfile \
  || printf '\n# Otros sitios de la VPS (portafolio, etc.)\nimport /etc/caddy/sites/*.caddy\n' >> /etc/caddy/Caddyfile
caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null
systemctl reload caddy

echo
echo "LISTO. Falta cargar /etc/portfolio/portfolio.env y publicar la primera versión."
