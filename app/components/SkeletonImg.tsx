"use client";
import { useState, type ImgHTMLAttributes } from "react";
import styles from "./SkeletonImg.module.css";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  /** Proporción (ej. "16 / 9") reservada mientras la imagen carga, para evitar saltos de layout. */
  skeletonRatio?: string;
};

export default function SkeletonImg({ className = "", skeletonRatio, style, onLoad, onError, alt = "", ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...rest}
      alt={alt}
      ref={(el) => {
        // Imágenes ya en caché pueden estar completas antes de que React enganche onLoad
        if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
      }}
      className={`${className} ${loaded ? styles.loaded : styles.loading}`}
      style={!loaded && skeletonRatio ? { ...style, aspectRatio: skeletonRatio } : style}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        setLoaded(true);
        onError?.(e);
      }}
    />
  );
}
