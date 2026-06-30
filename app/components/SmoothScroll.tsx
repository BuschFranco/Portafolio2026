"use client";
import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    // Respeta la preferencia de movimiento reducido del usuario
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      // easing tipo "ease-out exponencial" — da la sensación de inercia
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Maneja los enlaces de ancla (#seccion) con el mismo scroll suave,
      // dejando espacio para el header fijo.
      anchors: { offset: -80 },
    });

    // Se expone para que otros componentes (ej. BackToTop) lo reutilicen
    window.__lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}
