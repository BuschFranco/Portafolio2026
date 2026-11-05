"use client";

import { useState } from "react";
import style from "../page.module.css";
import { withBase } from "../basePath";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";
// Opcional: dígitos con +, espacios, guiones, puntos o paréntesis (entre 6 y 20 dígitos).
const PHONE_RE = /^\+?[\d\s().-]{6,30}$/;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ ok: false, msg: "Completá todos los campos obligatorios." });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ ok: false, msg: "Ingresá un email válido." });
      return;
    }
    if (phone.trim() && !PHONE_RE.test(phone.trim())) {
      setStatus({ ok: false, msg: "Ingresá un número válido o dejalo vacío." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Error al enviar el mensaje.");

      // Conversión del píxel de OpenAI (solo existe si el visitante dio consentimiento)
      (window as any).oaiq?.("measure", "lead_created", { type: "customer_action" });

      setStatus({ ok: true, msg: "¡Mensaje enviado con éxito!" });
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || "No se pudo enviar el mensaje." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={style.contactFormSection} aria-label="Formulario de contacto">
      
      <form className={style.contactForm} onSubmit={onSubmit}>
        <h3 className={style.contactFormTitle}>Contacto directo</h3>
        <div className={style.formRow}>
          <label className={style.formLabel} htmlFor="cf-name">Nombre*</label>
          <input
            id="cf-name"
            className={style.formInput}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            required
            aria-required="true"
          />
        </div>

        <div className={style.formRow}>
          <label className={style.formLabel} htmlFor="cf-email">Email*</label>
          <input
            id="cf-email"
            className={style.formInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            aria-required="true"
          />
        </div>

        <div className={style.formRow}>
          <label className={style.formLabel} htmlFor="cf-phone">Número (opcional)</label>
          <input
            id="cf-phone"
            className={style.formInput}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+54 9 11 1234-5678"
          />
        </div>

        <div className={style.formRow}>
          <label className={style.formLabel} htmlFor="cf-message">Mensaje*</label>
          <textarea
            id="cf-message"
            className={style.formTextarea}
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="¿En qué te puedo ayudar?"
            required
            aria-required="true"
          />
        </div>

        <div className={style.formActions}>
          <button className={style.formButton} type="submit" disabled={loading}>
            {loading ? "Enviando…" : "Enviar"}
          </button>
        </div>

        <p className={style.formPrivacyNote}>
          Al enviar aceptás que tus datos se almacenen para responder tu consulta.{" "}
          <a href={withBase("/privacidad")} className={style.formPrivacyLink}>Política de Privacidad</a>.
        </p>

        {status && (
          <p className={status.ok ? style.formStatusOk : style.formStatusErr} role="status">
            {status.msg}
          </p>
        )}
      </form>
    </section>
  );
}