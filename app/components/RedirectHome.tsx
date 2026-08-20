"use client";

import { useEffect } from "react";
import { withBase } from "../basePath";

export default function RedirectHome() {
  useEffect(() => {
    window.location.replace(withBase("/"));
  }, []);

  return (
    <p style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      Redirigiendo…{" "}
      <a href={withBase("/")}>hacé click acá si no sos redirigido automáticamente</a>.
    </p>
  );
}
