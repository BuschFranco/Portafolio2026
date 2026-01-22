"use client";

import { useState } from "react";
import style from "../page.module.css";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Error al enviar el mensaje.");

      setStatus({ ok: true, msg: "¡Mensaje enviado con éxito!" });
      setName("");
      setEmail("");
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
          />
        </div>

        <div className={style.formActions}>
          <button className={style.formButton} type="submit" disabled={loading}>
            {loading ? "Enviando…" : "Enviar"}
          </button>
        </div>

        {status && (
          <p className={status.ok ? style.formStatusOk : style.formStatusErr} role="status">
            {status.msg}
          </p>
        )}
      </form>
    </section>
  );
}