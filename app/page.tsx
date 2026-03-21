"use client";
import Image from "next/image";
import style from "./page.module.css";
import Typewriter from "./components/Typewriter";
import Reveal from "./components/Reveal";
import ContactForm from "./components/ContactForm";
import { useState, useEffect } from "react";
import Modal, { ModalItem } from "./components/Modal";
import AutoCarousel from "./components/AutoCarousel";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null);
  const [selectedCert, setSelectedCert] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedCert(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);


  type WorkItem = { imageSrc: string; title: string; description: string; badge?: string; link?: string };

  const truncate = (text: string, max: number = 120) =>
    text.length > max ? text.slice(0, max).trimEnd() + "..." : text;

  const landingItems: WorkItem[] = [
    {
      imageSrc: "placeholders/landing1.png",
      title: "Página Corporativa Media Digital Group",
      description:
        "Portal corporativo del negocio de VAS (Value Added Services), diseñado como punto único de contacto para clientes y partners. Desarrollada con Astro y React, consumiendo APIs internas y externas para gestionar consultas, formularios, catálogos y soporte; integra autenticación, trazabilidad de tickets y analítica.",
    },
    {
      imageSrc: "placeholders/landing-intelli.png",
      title: "Página agencia Intelli.Dev",
      description:
        "Agencia dedicada al desarrollo y soluciones tecnológicas. Implementada con tecnologías vanilla (HTML, CSS y JavaScript), integrando un chatbot con IA para asistencia en tiempo real y consumo de diversas APIs (correo, mapas, analítica y pricing). Incluye formularios validados, rendimiento optimizado y buenas prácticas de accesibilidad.",
      link: "https://buschfranco.github.io/Intelli.dev/",
    },
    {
      imageSrc: "placeholders/landing-portuauto.png",
      title: "Landing Concesionario Fiat — PortuAuto",
      description:
        "Landing page para concesionario oficial Fiat desarrollada con Astro. Muestra catálogo de modelos (Argo, Cronos, Mobi) con imágenes optimizadas en WebP, formulario de contacto y sección de planes. Deploy automático en Vercel.",
      link: "https://portuauto.vercel.app",
    },
    {
      imageSrc: "/placeholders/jamo.png",
      title: "Just a Marketing Office — Agencia de Leads",
      description:
        "Landing page de JAMO, agencia de adquisición de leads a comisión. Desarrollada con Astro, i18n en 3 idiomas (ES/EN/PT), Google Tag Manager, GA4 y modo oscuro nativo. El modelo: landing page + Google Ads + Analytics, sin retainer los primeros 3 meses. Incluye arquitectura screaming, SEO, formulario de contacto y deploy automático en Vercel vía GitHub Actions.",
      badge: "Proyecto propio",
      link: "https://justamarketingoffice.vercel.app/",
    },
    {
      imageSrc: "placeholders/landing-norton.png",
      title: "MDG Download Center — Norton",
      description:
        "Centro de descargas de manuales para productos Norton (Mobile Security, VPN, 360 Standard y Deluxe). Desarrollado con Astro, cubre múltiples países (Kuwait, Bahrain, Oman, Qatar, Chile, Brasil) y operadores de telecomunicaciones (STC, Ooredoo). Soporte en inglés, portugués y árabe.",
      link: "https://norton-help.xipio.online/",
    },
    {
      imageSrc: "placeholders/landing-magplus-at.png",
      title: "MagPlus Austria — Portal de Revistas",
      description:
        "Landing y portal de suscripción para MagPlus en el mercado austríaco/alemán, desarrollado con Astro. Acceso ilimitado a revistas internacionales en categorías de lifestyle, fitness, tech, moda y viajes. Diseño mobile-first, componentes hidratables y prueba gratuita sin compromiso.",
      link: "https://themagplus-at.com/",
    },
    {
      imageSrc: "placeholders/landing-epic-play.png",
      title: "Epic Play — Plataforma de Gaming",
      description:
        "Sitio web para una plataforma de entretenimiento y juegos online. Desarrollado con WordPress + Kubio builder e integración de WooCommerce para comercio electrónico. Diseño responsive con paleta vibrante (azules, naranja, verde menta), animaciones CSS, tipografías display y cumplimiento GDPR.",
      link: "https://epic-play.com/",
    },
  ];

  const appItems: WorkItem[] = [
    {
      imageSrc: "placeholders/app-recaap.png",
      title: "Recaap — Resúmenes de Libros con Audio",
      description:
        "Plataforma de resúmenes de libros en español con lectura y audio sincronizado entre dispositivos. Incluye modo offline, seguimiento de progreso, sistema de desafíos (racha de 21 días, maratón de lectura), logros y niveles. Más de 9 categorías: negocios, tecnología, biografía, ficción y más. Integra Google Analytics y GTM.",
      link: "https://www.recaap.ai/",
    },
    {
      imageSrc: "placeholders/app-magplus.png",
      title: "MagPlus — Plataforma de Revistas Digitales",
      description:
        "Plataforma global de distribución de revistas digitales con presencia en Oriente Medio, Europa, África y Asia. Sistema de autenticación, gestión de suscripciones, soporte multilingüe y multi-región, notificaciones push con OneSignal. Categorías: negocios, gastronomía, deportes, tecnología, bienestar y viajes. Integra GA4.",
      link: "https://magplus.club/",
    },
    {
      imageSrc: "placeholders/aplicacion.png",
      title: "DashboardMDG — Panel de Administración",
      description:
        "Panel de administración interno para Media Digital Group. Desarrollado con Astro y MongoDB, gestiona solicitudes de desarrollo con flujo de aprobación/rechazo por token. Incluye panel admin protegido, endpoints `/api/requests` y `/api/update-approval`, desplegado en Vercel.",
      link: "https://github.com/BuschFranco/DashboardMDG",
    },

    {
      imageSrc: "/placeholders/aplicacion.png",
      title: "App Admin",
      description:
        "Panel de administración central con gestión de roles y permisos, auditoría de acciones por usuario, configuración del sistema y paneles de métricas. Permite a los administradores controlar accesos, revisar logs y gestionar la configuración de las apps del ecosistema desde una interfaz unificada. Desarrollado con React, integración con APIs REST y control de sesiones con JWT.",
    },
    {
      imageSrc: "placeholders/aplicacion2.png",
      title: "ArcgameUnity — Juego Arcade",
      description:
        "Juego arcade desarrollado en Unity con C#. El jugador recorre un bosque recolectando ítems contra el reloj con 3 vidas, con dinámica de riesgo vs recompensa al buscar puntos de score adicionales. Sistema de puntuación, múltiples niveles y gestión de estado del jugador.",
      link: "https://github.com/BuschFranco/ArcgameUnity",
    },
    {
      imageSrc: "placeholders/jamo-panel.png",
      title: "JAMO — Panel de Operaciones",
      description:
        "Panel web interno para la agencia Just a Marketing Office. Permite prospectar empresas en Google Maps, extraer emails/Instagram/LinkedIn desde sus sitios web, analizar cada prospecto con IA (Claude) y gestionar el outreach por WhatsApp, Email, LinkedIn e Instagram desde una sola interfaz. Stack: Node.js, Express, Notion API, Google Maps API, Anthropic API.",
      badge: "Proyecto propio",
    },
  ];

  const botsItems: WorkItem[] = [
    {
      imageSrc: "/placeholders/aplicacion.png",
      title: "n8n/Bot de WhatsAPP",
      description:
        "Bot de WhatsApp integrado con IA capaz de informar al cliente, persuadirlo o que tenga el comportamiento que nosotros necesitemos.",
    },
    {
      imageSrc: "/placeholders/aplicacion1.png",
      title: "n8n/Bot de Telegram",
      description:
        "Bot de Telegram con IA que informa, resuelve dudas y orienta a los usuarios para que realicen las acciones que definamos, integrado a flujos n8n y servicios externos.",
    },
    {
      imageSrc: "/placeholders/aplicacion.png",
      title: "Zapier/Bot de Discord",
      description:
        "Bot de Discord vía Zapier que notifica cuando se generan conversiones en diferentes campañas de Google Ads; además comunica novedades y habilita distintas funcionalidades.",
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
          Desarrollador de software con foco en la industria tecnológica y el marketing digital.
          Construyo productos web, desde landing pages y APIs hasta automatizaciones y los mido con datos.
          Certificado en Marketing Digital, E-Commerce y Gestión de Proyectos por Google.
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
        <div className={style.workHeader}>
          <h2 style={{marginBottom: "0"}}>Mis Trabajos Destacados</h2>
          {/* Enlaces a subsecciones */}
          <nav className={style.workLinks} aria-label="Subsecciones de Mi Trabajo">
            <a href="#landing-pages" className={style.workLink}>Sitios Web</a>
            <a href="#aplicaciones" className={style.workLink}>Aplicaciones</a>
            <a href="#automatizaciones" className={style.workLink}>Automatizaciones/Bots</a>
          </nav>
        </div>

         <article id="landing-pages" className={style.workCard}>
            <Reveal className="revealLeft" delay={120}>
              <h3>Sitios Web</h3>
              <AutoCarousel className={style.carousel}>
                {landingItems.map((it, idx) => (
                  <div
                    key={`landing-${idx}`}
                    className={style.thumbItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedItem({ title: it.title, description: it.description, imageSrc: it.imageSrc, link: it.link })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setSelectedItem({ title: it.title, description: it.description, imageSrc: it.imageSrc, link: it.link });
                    }}
                  >
                    <img className={style.thumbImage} src={it.imageSrc} alt={it.title} />
                    {it.badge && <span className={style.projectBadge}>{it.badge}</span>}
                    <div className={style.thumbOverlay}>
                      <h4>{it.title}</h4>
                      <p>{truncate(it.description)}</p>
                    </div>
                  </div>
                ))}
              </AutoCarousel>
            </Reveal>
          </article>

          <article id="aplicaciones" className={style.workCard}>
            <Reveal className="revealLeft" delay={0}>
              <h3>Aplicaciones</h3>
              <AutoCarousel className={style.carousel}>
                {appItems.map((it, idx) => (
                  <div
                    key={`app-${idx}`}
                    className={style.thumbItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedItem({ title: it.title, description: it.description, imageSrc: it.imageSrc, link: it.link })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setSelectedItem({ title: it.title, description: it.description, imageSrc: it.imageSrc, link: it.link });
                    }}
                  >
                    <img className={style.thumbImage} src={it.imageSrc} alt={it.title} />
                    <div className={style.thumbOverlay}>
                      <h4>{it.title}</h4>
                      <p>{truncate(it.description, 140)}</p>
                    </div>
                  </div>
                ))}
              </AutoCarousel>
            </Reveal>
          </article>

          <article id="automatizaciones" className={style.workCard}>
            <Reveal className="revealLeft" delay={360}>
              <h3>Automatizaciones/Bots</h3>
              <AutoCarousel className={style.carousel}>
                {botsItems.map((it, idx) => (
                  <div
                    key={`bot-${idx}`}
                    className={style.thumbItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedItem({ title: it.title, description: it.description, imageSrc: it.imageSrc, link: it.link })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setSelectedItem({ title: it.title, description: it.description, imageSrc: it.imageSrc, link: it.link });
                    }}
                  >
                    <img className={style.thumbImage} src={it.imageSrc} alt={it.title} />
                    <div className={style.thumbOverlay}>
                      <h4>{it.title}</h4>
                      <p>{it.description}</p>
                    </div>
                  </div>
                ))}
              </AutoCarousel>
            </Reveal>
          </article>

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
                  con datos, no con suposiciones. Trabajo con GA4, un plan de etiquetado claro y,
                  cuando aplica, medición server‑side para mejorar la calidad del dato. Alineo KPIs
                  con objetivos del negocio y entrego insights periódicos y reportes personalizados.
                </p>
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
                mejorar el CPA y maximizar el ROAS. Trabajo con estructuras escalables, audiencias y
                palabras clave de intención, además de conversiones mejoradas y automatizaciones
                para mantener el crecimiento con control del gasto.
              </p>
            </div>
          </div>
        </article>

        <article id="certificados" className={style.workCard}>
          <h3 className={style.certSectionTitle}>Certificados Profesionales</h3>
          <div className={style.certsBadgeWrap}>
            <img
              src="/google-digital-marketing-badge.png"
              alt="Google Digital Marketing and E-commerce Badge"
              className={style.certsBadge}
            />
          </div>
          <div className={style.certsGrid}>
            {[
              { src: "/certificates/GoogleDigitalMarketingandE-commerceSpecializationCertificate.webp", title: "Google Digital Marketing and E-commerce Specialization" },
              { src: "/certificates/FoundationsofProjectManagement.webp", title: "Foundations of Project Management" },
              { src: "/certificates/SatisfactionGuaranteedDevelopCustomerLoyaltyOnline.webp", title: "Satisfaction Guaranteed: Develop Customer Loyalty Online" },
              { src: "/certificates/MakeTheSale.webp", title: "Make The Sale: Build, Launch, and Manage E-commerce Stores" },
              { src: "/certificates/AssessForSuccess.webp", title: "Assess for Success: Marketing Analytics and Measurement" },
              { src: "/certificates/AttractAndEngage.webp", title: "Attract and Engage Customers with Digital Marketing" },
              { src: "/certificates/EmailMarketing.webp", title: "Think Outside the Inbox: Email Marketing" },
              { src: "/certificates/FromLikesToLeads.webp", title: "From Likes to Leads: Interact with Customers Online" },
              { src: "/certificates/GoogleAI.webp", title: "Google AI Essentials" },
              { src: "/certificates/FoundationsDigitalMarketing.webp", title: "Foundations of Digital Marketing and E-commerce" },
              { src: "/certificates/GoogleDigitalMarketingandE-commerceBadge.webp", title: "Google Digital Marketing and E-commerce Badge" },
              { src: "/certificates/Programacion.webp", title: "Desarrollo Web con HTML5, CSS3, JS, AJAX, PHP y MySQL" },
              { src: "/certificates/Laravel9API.webp", title: "Curso de Laravel 9 desde cero + APIs RESTful" },
              { src: "/certificates/frontend-fullstack-js.webp", title: "Universidad Desarrollo Web — FrontEnd Web Developer" },
              { src: "/certificates/php-sql-certificado.webp", title: "Desarrolla un sistema web POS desde cero con PHP Nativo" },
              { src: "/certificates/CSharpBasic.webp", title: "Visual Studio 2022 C# — Nivel Básico" },
            ].map((cert, i) => (
              <div
                key={i}
                className={style.certCard}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedCert(cert)}
                onKeyDown={(e) => { if (e.key === "Enter") setSelectedCert(cert); }}
              >
                <img src={cert.src} alt={cert.title} className={style.certImg} />
                <p className={style.certTitle}>{cert.title}</p>
              </div>
            ))}
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
             <span className={style.techItem}>NestJs</span>
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

      {/* Lightbox de certificados */}
      {selectedCert && (
        <div
          className={style.certLightbox}
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
        >
          <img
            src={selectedCert.src}
            alt={selectedCert.title}
            className={style.certLightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </main>
  );
}
