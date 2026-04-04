"use client";
import { useEffect, useState } from "react";
import style from "./BackToTop.module.css";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      className={`${style.btn} ${visible ? style.visible : ""}`}
      onClick={scrollUp}
      aria-label="Volver arriba"
    >
      ↑
    </button>
  );
}
