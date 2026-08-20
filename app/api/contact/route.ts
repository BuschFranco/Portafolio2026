import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_CONTACT_DATABASE_ID!;

const ALLOWED_ORIGIN = "https://buschfranco.github.io";

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
    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { message: "Campos incompletos." },
        { status: 400, headers: corsHeaders }
      );
    }

    await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        Nombre: {
          title: [{ text: { content: name.trim() } }],
        },
        Email: {
          email: email.trim(),
        },
        Mensaje: {
          rich_text: [{ text: { content: message.trim() } }],
        },
        Fecha: {
          date: { start: new Date().toISOString() },
        },
      },
    });

    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json(
      { message: "Error interno. Intentá de nuevo." },
      { status: 500, headers: corsHeaders }
    );
  }
}
