"use client";
import { useEffect, useState } from "react";
import style from "./GtmManager.module.css";

const EU_EXTRA = ["Atlantic/Canary", "Atlantic/Faroe", "Atlantic/Madeira", "Atlantic/Reykjavik"];

function isEU(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz.startsWith("Europe/") || EU_EXTRA.includes(tz);
  } catch {
    return false;
  }
}

export default function GtmManager() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // GTM y consent default ya fueron configurados en el <head>.
    // Aquí solo decidimos si mostrar el banner (usuarios EU sin preferencia guardada).
    if (!isEU()) return;
    const stored = localStorage.getItem("cookie-consent");
    if (!stored) setShowBanner(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
    // Consent Mode v2: actualiza el estado y carga GTM
    const w = window as any;
    w.gtag?.("consent", "update", {
      analytics_storage:  "granted",
      ad_storage:         "granted",
      ad_user_data:       "granted",
      ad_personalization: "granted",
    });
    w.loadGTM?.();
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className={style.banner} role="dialog" aria-label="Preferencias de cookies">
      <div className={style.content}>
        <p className={style.text}>
          Este sitio usa cookies analíticas (Google Analytics) para entender cómo se usa.
          Podés aceptarlas o rechazarlas.{" "}
          <a href="/privacidad" className={style.link}>Política de Privacidad</a>.
        </p>
        <div className={style.actions}>
          <button className={style.btnAccept} onClick={accept}>Aceptar</button>
          <button className={style.btnDecline} onClick={decline}>Rechazar</button>
        </div>
      </div>
    </div>
  );
}
