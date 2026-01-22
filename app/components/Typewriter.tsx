"use client";

import React from "react";
import { useEffect, useState } from "react";
import styles from "../page.module.css";

type Props = {
  text: string;
  speed?: number; // ms por carácter
  startDelay?: number; // ms antes de empezar
  as?: keyof JSX.IntrinsicElements; // etiqueta a renderizar (h1, h2, h3, span, etc.)
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
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
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