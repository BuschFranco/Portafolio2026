'use client';

import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Iniciar el fade out
      setIsLoading(false);
      
      // Remover completamente después de la animación
      setTimeout(() => {
        setIsVisible(false);
      }, 600); // 600ms para que coincida con la duración de la animación
    };

    // Si la página ya está cargada
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Escuchar cuando termine de cargar
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`${styles.preloader} ${!isLoading ? styles.fadeOut : ''}`}>
    </div>
  );
}