"use client";
import Image from "next/image";
import style from "./page.module.css";
import Typewriter from "./components/Typewriter";
import Reveal from "./components/Reveal";
import ContactForm from "./components/ContactForm";
import { useState } from "react";
import Modal, { ModalItem } from "./components/Modal";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null);

  const apisItems = [
    {
      imageSrc: "placeholders/api-1.svg",
      title: "API de Clientes",
      description:
        "CRUD seguro con JWT, validaciones robustas y limitación de tasa para proteger los endpoints. Documentada con OpenAPI.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      imageSrc: "placeholders/api-2.svg",
      title: "API de Pagos",
      description:
        "Integración de pagos con webhooks confiables, firma HMAC y manejo de reintentos. Includes estado de transacciones.",
      videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    },
    {
      imageSrc: "placeholders/api-3.svg",
      title: "API Analytics",
      description:
        "Endpoints agregados con caching, métricas de uso y segmentación para reportes. Optimizada para alto volumen.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  const landingItems = [
    {
      imageSrc: "placeholders/landing1.png",
      title: "Landing SaaS",
      description:
        "Hero persuasivo, pricing claro, testimonios y CTA optimizados. Performance y SEO cuidados.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      imageSrc: "placeholders/landing2.png",
      title: "Landing Producto",
      description:
        "Presentación del valor del producto con comparativas, beneficios clave y secciones de conversión.",
      videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    },
    {
      imageSrc: "placeholders/landing3.png",
      title: "Landing Evento",
      description:
        "Registro integrado, agenda, ponentes y analítica de campañas. Diseño adaptable.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  const appItems = [
    {
      imageSrc: "placeholders/aplicacion.png",
      title: "App Admin Dashboard",
      description:
        "Visualización de métricas con charts interactivos, filtros en tiempo real y exportación de datos.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      imageSrc: "placeholders/aplicacion1.png",
      title: "App Dev Request",
      description:
        "Catálogo, carrito persistente, checkout seguro y notificaciones de pedido. Escalable y modular.",
      videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    },
    {
      imageSrc: "placeholders/app-3.svg",
      title: "App Admin",
      description:
        "Gestión de usuarios con roles y permisos, auditoría de acciones y paneles de configuración.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  const botsItems = [
    {
      imageSrc: "aplicacion.png",
      title: "Bot de WhatsApp",
      description:
        "Atención automática con menús, derivación a agente y respuestas rápidas. Integración con CRM.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      imageSrc: "aplicacion1.png",
      title: "Bot de Telegram",
      description:
        "Comandos, suscripciones y envío de notificaciones. Webhooks confiables y almacenamiento.",
      videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    },
    {
      imageSrc: "logoWhite.png",
      title: "Automatización n8n",
      description:
        "Flujos con disparadores (cron/webhook), manejo de errores y logs. Integración multi-API.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  return (
    <main>
      <div className={style.titleContainer}>
        {/* Efecto de escritura para el nombre y el rol */}
        <Typewriter as="h3" text="Busch Franco" speed={110} showCaret={true} />
        <Typewriter as="h4" text="Desarrollador de Software" speed={60} showCaret={false} />
     

      <div className={style.description}>
        <p>
          Mi enfoque profesional se centra en la programación, el comercio y en la tecnología.
          Estudiante y Certificado en Marketing Digital. E-Commerce y Gestión de Proyectos por parte de Google.

          Soy un Desarrollador con experiencia en tecnologías como Astro, Node y React Native, así como en los entornos de Dynamics 365 (D365) y WordPress. Me apasiona la industria tecnológica y el Marketing Digital. Siempre busco oportunidades para aprender y crecer profesionalmente, ya que estoy convencido de que la evolución constante es vital para ofrecer mejores soluciones. Me entusiasma mucho la idea de contribuir en proyectos innovadores y retadores, donde pueda seguir desarrollándome como profesional aprendiendo nuevas habilidades y técnicas para mejorar, pulir y alcanzar tanto los objetivos empresariales como los personales.
        </p>
           <a
            className={style.downloadBtn}
            style={{textAlign: "start"}}
            href="#contacto"
          >
            Contacto
          </a>
      </div>
       </div>

      <hr className={style.separator} />

      <section className={style.workSection}>
        <div style={{backgroundColor: "white", color: "black", padding: "1.5rem"}}>
           <h2 style={{marginBottom: "0"}}>Mis Trabajos Destacados</h2>
          {/* Enlaces a subsecciones */}
          <nav className={style.workLinks} aria-label="Subsecciones de Mi Trabajo">
            <a href="#apis" className={style.workLink}>Apis</a>
            <a href="#landing-pages" className={style.workLink}>Landing Pages</a>
            <a href="#aplicaciones" className={style.workLink}>Aplicaciones</a>
            <a href="#automatizaciones" className={style.workLink}>Automatizaciones/Bots</a>
          </nav>
        </div>

         <article id="landing-pages" className={style.workCard}>
            <Reveal className="revealLeft" delay={120}>
              <h3>Landing Pages</h3>
              <div className={style.carousel}>
                {landingItems.map((it, idx) => (
                  <div
                    key={`landing-${idx}`}
                    className={style.thumbItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedItem({ title: it.title, description: it.description, videoUrl: it.videoUrl })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setSelectedItem({ title: it.title, description: it.description, videoUrl: it.videoUrl });
                    }}
                  >
                    <img className={style.thumbImage} src={it.imageSrc} alt={it.title} />
                    <div className={style.thumbOverlay}>
                      <h4>{it.title}</h4>
                      <p>{it.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </article>
       
          <article id="aplicaciones" className={style.workCard}>
            <Reveal className="revealLeft" delay={240}>
              <h3>Aplicaciones</h3>
              <div className={style.carousel}>
                {appItems.map((it, idx) => (
                  <div
                    key={`app-${idx}`}
                    className={style.thumbItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedItem({ title: it.title, description: it.description, videoUrl: it.videoUrl })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setSelectedItem({ title: it.title, description: it.description, videoUrl: it.videoUrl });
                    }}
                  >
                    <img className={style.thumbImage} src={it.imageSrc} alt={it.title} />
                    <div className={style.thumbOverlay}>
                      <h4>{it.title}</h4>
                      <p>{it.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </article>

          <article id="automatizaciones" className={style.workCard}>
            <Reveal className="revealLeft" delay={360}>
              <h3>Automatizaciones/Bots</h3>
              <div className={style.carousel}>
                {botsItems.map((it, idx) => (
                  <div
                    key={`bot-${idx}`}
                    className={style.thumbItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedItem({ title: it.title, description: it.description, videoUrl: it.videoUrl })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setSelectedItem({ title: it.title, description: it.description, videoUrl: it.videoUrl });
                    }}
                  >
                    <img className={style.thumbImage} src={it.imageSrc} alt={it.title} />
                    <div className={style.thumbOverlay}>
                      <h4>{it.title}</h4>
                      <p>{it.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </article>

           <div className={style.workGrid}>
          <article id="apis" className={style.workCard}>
            <Reveal className="revealLeft" delay={0}>
              <h3>Apis</h3>
              <div className={style.carousel}>
                {apisItems.map((it, idx) => (
                  <div
                    key={`api-${idx}`}
                    className={style.thumbItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedItem({ title: it.title, description: it.description, videoUrl: it.videoUrl })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setSelectedItem({ title: it.title, description: it.description, videoUrl: it.videoUrl });
                    }}
                  >
                    <img className={style.thumbImage} src={it.imageSrc} alt={it.title} />
                    <div className={style.thumbOverlay}>
                      <h4>{it.title}</h4>
                      <p>{it.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </article>
        </div>
        
        <div className={style.google}>
          <article id="analytics" className={style.workCard}>
            <div className={`${style.footerGrid} ${style.analyticsGrid}`}>
              <div className={style.analyticsTitle}>
                <h3>Medición y Mejora Continua con Google Analytics</h3>
              </div>
              <div className={style.analyticsMediaWrap}>
                <img
                  src="/placeholders/analytics.png"
                  alt="Google Analytics – panel y métricas"
                  className={`${style.thumbImage} ${style.analyticsImage}`}
                />
              </div>
              <div className={style.analyticsBody}>
                <p>
                  Cada desarrollo que entrego integra Google Analytics desde el primer día.
                  Medimos el comportamiento real de tus usuarios, detectamos oportunidades y
                  optimizamos continuamente para aumentar conversiones, retención y valor de negocio.
                  Configuro eventos clave, embudos y dashboards accionables para que tomes decisiones
                  con datos, no con suposiciones.
                </p>
                <a className={style.workLink} href="#contacto">Solicita una auditoría gratuita</a>
              </div>
            </div>
          </article>
        
        <article id="google-ads" className={style.workCard}>
          <div className={`${style.footerGrid} ${style.adsGrid}`}>
            <div className={style.analyticsTitle}>
              <h3>Rendimiento y Crecimiento con Google Ads</h3>
            </div>
            <div className={style.analyticsMediaWrap}>
              <img
                src="/placeholders/gads.png"
                alt="Google Ads – campañas y panel"
                className={`${style.thumbImage} ${style.analyticsImage}`}
              />
            </div>
            <div className={style.analyticsBody}>
              <p>
                Diseño y gestiono campañas orientadas a resultados: segmentación precisa,
                creatividades testeadas A/B y optimización continua de pujas y conversiones.
                Entrego dashboards y métricas clave para escalar inversión con confianza,
                mejorar el CPA y maximizar el ROAS.
              </p>
              <a className={style.workLink} href="#contacto">Solicita una revisión de campañas</a>
            </div>
          </div>
        </article>
         </div>
      </section>
      
 
       <section className={style.techSection} aria-label="Carrusel de tecnologías">
         <div className={style.techCarousel}>
           <div className={style.techTrack}>
             <span className={style.techItem}>TypeScript</span>
             <span className={style.techItem}>React</span>
             <span className={style.techItem}>Next.js</span>
             <span className={style.techItem}>NestJs</span>
             <span className={style.techItem}>Astro</span>
             <span className={style.techItem}>Python</span>
             <span className={style.techItem}>Tailwind CSS</span>
             <span className={style.techItem}>MongoDB</span>
             <span className={style.techItem}>Docker</span>
             <span className={style.techItem}>n8n</span>
             <span className={style.techItem}>Node.js</span>
             <span className={style.techItem}>Javascript</span>
             {/* Duplicado para bucle continuo */}
             <span className={style.techItem}>TypeScript</span>
             <span className={style.techItem}>React</span>
             <span className={style.techItem}>Next.js</span>
             <span className={style.techItem}>Node.js</span>
             <span className={style.techItem}>Astro</span>
             <span className={style.techItem}>Python</span>
             <span className={style.techItem}>Tailwind CSS</span>
             <span className={style.techItem}>MongoDB</span>
             <span className={style.techItem}>Docker</span>
             <span className={style.techItem}>n8n</span>
             <span className={style.techItem}>Node.js</span>
             <span className={style.techItem}>Javascript</span>
             {/* Duplicado para bucle continuo */}
             <span className={style.techItem}>TypeScript</span>
             <span className={style.techItem}>React</span>
             <span className={style.techItem}>Next.js</span>
             <span className={style.techItem}>Node.js</span>
             <span className={style.techItem}>Astro</span>
             <span className={style.techItem}>Python</span>
             <span className={style.techItem}>Tailwind CSS</span>
             <span className={style.techItem}>MongoDB</span>
             <span className={style.techItem}>Docker</span>
             <span className={style.techItem}>n8n</span>
             <span className={style.techItem}>Node.js</span>
             <span className={style.techItem}>Javascript</span>
           </div>
         </div>
       </section>
 
     <footer className={style.footerSection}>
      <h2 id="contacto">Contacto</h2>
      <div className={style.footerGrid}>
        <div className={style.footerInfo}>
          <div className={style.contactLinks}>
            <a 
              href="https://linkedin.com/in/franco-busch" 
              target="_blank" 
              rel="noopener noreferrer"
              className={style.contactLink}
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/franco-busch" 
              target="_blank" 
              rel="noopener noreferrer"
              className={style.contactLink}
            >
              GitHub
            </a>
            <a 
              href="https://mi-agencia-web.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={style.contactLink}
            >
              Agencia Web
            </a>
            <a 
              href="https://wa.me/5491123456789" 
              target="_blank" 
              rel="noopener noreferrer"
              className={style.contactLink}
            >
              WhatsApp
            </a>
            <a 
              href="mailto:franco.busch@example.com"
              className={style.contactLink}
            >
              Email
            </a>
          </div>
        </div>
        <div className={style.footerCv}>
          <h3>Curriculum</h3>
          <div className={style.cvPreview}>
            <iframe
              className={style.cvFrame}
              src="BuschFrancoCV.pdf"
              title="Previsualización del CV"
            ></iframe>
          </div>
          <a
            className={style.downloadBtn}
            href="BuschFrancoCV.pdf"
            download
          >
            Descargar CV
          </a>
        </div>
      </div>
      <ContactForm />
    </footer>

      {/* Modal de detalle */}
      <Modal open={!!selectedItem} item={selectedItem} onClose={() => setSelectedItem(null)} />

    </main>
  );
}
