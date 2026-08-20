"use client";
import { useEffect, useState } from "react";
import style from "./Nav.module.css";
import { withBase } from "../basePath";

const links = [
  { label: "Inicio",       href: "#" },
  { label: "Trabajos",     href: "#landing-pages" },
  { label: "Certificados", href: "#certificados" },
  { label: "Sobre mí",    href: "#sobre-mi" },
  { label: "Contacto",    href: "#contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú al hacer resize a desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 600) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`${style.nav} ${scrolled || open ? style.scrolled : ""}`}>
        <a href="#" className={style.logo} aria-label="Inicio" onClick={close}>
          <img src={withBase("/logoWhite.webp")} alt="Logo" width={36} height={36} />
        </a>

        {/* Links desktop */}
        <nav className={style.links} aria-label="Navegación principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={style.link}>{l.label}</a>
          ))}
        </nav>

        {/* Botón hamburguesa — solo mobile */}
        <button
          className={`${style.burger} ${open ? style.burgerOpen : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Menú mobile desplegable */}
      <div className={`${style.drawer} ${open ? style.drawerOpen : ""}`} aria-hidden={!open}>
        <nav className={style.drawerLinks}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={style.drawerLink} onClick={close}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Overlay para cerrar al tocar fuera */}
      {open && <div className={style.overlay} onClick={close} aria-hidden />}
    </>
  );
}
