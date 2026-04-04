"use client";
import { useEffect } from "react";
import styles from "./Modal.module.css";

export type ModalItem = {
  title: string;
  description: string;
  videoUrl?: string;
  imageSrc?: string;
  link?: string; // URL del proyecto en vivo o repositorio
};

type ModalProps = {
  open: boolean;
  item: ModalItem | null;
  onClose: () => void;
};

export default function Modal({ open, item, onClose }: ModalProps) {
  useEffect(() => {
    // Cerrar con Escape
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handler);
      // Bloquear scroll del body mientras el modal está abierto
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handler);
        document.body.style.overflow = prev;
      };
    }
  }, [open, onClose]);

  if (!open || !item) return null;

  const isEmbed = item.videoUrl?.includes("youtube.com") || item.videoUrl?.includes("vimeo.com");

  return (
    <div className={styles.backdrop} onClick={onClose} aria-modal="true" role="dialog">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.videoPane}>
          {item.videoUrl ? (
            isEmbed ? (
              <iframe
                className={styles.videoFrame}
                src={item.videoUrl}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video className={styles.videoTag} src={item.videoUrl} controls />
            )
          ) : item.imageSrc ? (
            <img className={styles.mediaImg} src={item.imageSrc} alt={item.title} loading="lazy" decoding="async" />
          ) : null}
        </div>
        <div className={styles.contentPane}>
          <div className={styles.header}>
            <h3 className={styles.title}>{item.title}</h3>
            <button className={styles.closeBtn} aria-label="Cerrar" onClick={onClose}>&times;</button>
          </div>
          <p className={styles.description}>{item.description}</p>
          {item.link && (
            <a
              className={styles.projectLink}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver proyecto →
            </a>
          )}
          <span className={styles.meta}>Haz click fuera del modal o presiona Esc para cerrar</span>
        </div>
      </div>
    </div>
  );
}