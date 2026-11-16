"use client";

import React from "react";
import { useEffect, useState } from "react";
import styles from "../page.module.css";

type Props = {
  text: string;
  speed?: number; // ms por carácter
  startDelay?: number; // ms antes de empezar
  as?: keyof React.JSX.IntrinsicElements; // etiqueta a renderizar (h1, h2, h3, span, etc.)
  className?: string;
  showCaret?: boolean; // muestra el caret al final
};

export default function Typewriter({
  text,
  speed = 100,
  startDelay = 0,
  as = "span",
  className,
  showCaret = true,
}: Props) {
  // Arranca con el texto completo: el HTML del servidor (buscadores, lectores de pantalla, sin JS)
  // ya trae el título. La animación lo reescribe al montar, tapada por el preloader.
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    // Con "reducir movimiento" el texto queda completo, sin tipeo.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let i = 0;
    let id: number | undefined;
    const start = setTimeout(() => {
      setDisplayed("");
      id = window.setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [text, speed, startDelay]);

  return React.createElement(
    as,
    { className },
    <>
      {displayed}
      {showCaret && <span className={styles.typewriterCaret} aria-hidden="true" />}
    </>
  );
}