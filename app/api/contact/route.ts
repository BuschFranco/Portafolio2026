import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

// Postgres local de la VPS (base "portfolio"). El usuario de DATABASE_URL solo puede insertar
// en contact_messages: ver deploy/vps/provision-db.sh.
let pool: Pool | null = null;
const getPool = () =>
  (pool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 2 }));

const ALLOWED_ORIGIN = "https://buschfranco.github.io";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  const corsHeaders = { "Access-Control-Allow-Origin": ALLOWED_ORIGIN };

  try {
    const body = await req.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Campos incompletos." },
        { status: 400, headers: corsHeaders }
      );
    }
    if (!EMAIL_RE.test(email) || name.length > 200 || email.length > 320 || message.length > 5000) {
      return NextResponse.json(
        { message: "Revisá los datos del formulario." },
        { status: 400, headers: corsHeaders }
      );
    }

    await getPool().query(
      "insert into contact_messages (name, email, message) values ($1, $2, $3)",
      [name, email, message]
    );

    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json(
      { message: "Error interno. Intentá de nuevo." },
      { status: 500, headers: corsHeaders }
    );
  }
}
