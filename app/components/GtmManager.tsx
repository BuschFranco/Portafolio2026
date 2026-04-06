"use client";
import { useEffect, useState } from "react";
import style from "./GtmManager.module.css";

const GTM_ID = "GTM-KSTCPG4P";
const EU_EXTRA = ["Atlantic/Canary", "Atlantic/Faroe", "Atlantic/Madeira", "Atlantic/Reykjavik"];

function loadGTM() {
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

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
    const eu = isEU();
    if (!eu) {
      loadGTM();
      return;
    }
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "accepted") {
      loadGTM();
    } else if (!stored) {
      setShowBanner(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
    loadGTM();
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
