"use client";
import Image from "next/image";
import style from "./page.module.css";
import { withBase } from "./basePath";
import Typewriter from "./components/Typewriter";
import Reveal from "./components/Reveal";
import ContactForm from "./components/ContactForm";
import { useState, useEffect } from "react";
import Modal, { ModalItem } from "./components/Modal";
import AutoCarousel from "./components/AutoCarousel";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null);
  const [selectedCert, setSelectedCert] = useState<{ src: string; title: string } | null>(null);
  const [cvTab, setCvTab] = useState("general");
  const cvOptions = [
    { id: "general", label: "General", file: "BuschFrancoCV.pdf" },
    { id: "dev", label: "Full Stack", file: "CV-FullStack.pdf" },
    { id: "growth", label: "Growth", file: "CV-Growth.pdf" },
    { id: "ops", label: "Operativo", file: "CV-Operativo.pdf" },
  ];
  const activeCv = cvOptions.find((o) => o.id === cvTab) ?? cvOptions[0];

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
      imageSrc: "placeholders/landing1.webp",
      title: "Página Corporativa Media Digital Group",
      description:
        "Portal corporativo del negocio de VAS (Value Added Services), diseñado como punto único de contacto para clientes y partners. Desarrollada con Astro y React, consumiendo APIs internas y externas para gestionar consultas, formularios, catálogos y soporte; integra autenticación, trazabilidad de tickets y analítica.",
      link: "https://mediadigitalgroup.com/",
    },
    {
      imageSrc: "/placeholders/jamo.webp",
      title: "Just a Marketing Office — Agencia de Leads",
      description:
        "Landing page de JAMO, agencia de adquisición de clientes B2B con fee del 15% sobre pauta y 0 retainer los primeros 3 meses. Desarrollada con Astro, i18n en ES/EN/PT, GA4 + GTM con trazabilidad completa de eventos (clics, scroll, formularios, cambio de idioma), SEO técnico y deploy automático en Vercel vía GitHub Actions.",
      badge: "Proyecto propio",
      link: "https://justamarketingoffice.vercel.app/",
    },
    {
      imageSrc: "placeholders/landing-intelli.webp",
      title: "Página agencia Intelli.Dev",
      description:
        "Agencia dedicada al desarrollo y soluciones tecnológicas. Implementada con tecnologías vanilla (HTML, CSS y JavaScript), integrando un chatbot con IA para asistencia en tiempo real y consumo de diversas APIs (correo, mapas, analítica y pricing). Incluye formularios validados, rendimiento optimizado y buenas prácticas de accesibilidad.",
      link: "https://buschfranco.github.io/Intelli.dev/",
    },
    {
      imageSrc: "placeholders/landing-magplus-at.webp",
      title: "MagPlus Austria — Portal de Revistas",
      description:
        "Landing y portal de suscripción para MagPlus en el mercado austríaco/alemán, desarrollado con Astro. Acceso ilimitado a revistas internacionales en categorías de lifestyle, fitness, tech, moda y viajes. Diseño mobile-first, componentes hidratables y prueba gratuita sin compromiso.",
      link: "https://themagplus-at.com/",
    },
    {
      imageSrc: "placeholders/landing-epic-play.webp",
      title: "Epic Play — Plataforma de Gaming",
      description:
        "Sitio web para una plataforma de entretenimiento y juegos online. Desarrollado con WordPress + Kubio builder e integración de WooCommerce para comercio electrónico. Diseño responsive con paleta vibrante (azules, naranja, verde menta), animaciones CSS, tipografías display y cumplimiento GDPR.",
      link: "https://epic-play.com/",
    },
    {
      imageSrc: "placeholders/landing-portuauto.webp",
      title: "Landing Concesionario Fiat — PortuAuto",
      description:
        "Landing page para concesionario oficial Fiat desarrollada con Astro. Muestra catálogo de modelos (Argo, Cronos, Mobi) con imágenes optimizadas en WebP, formulario de contacto y sección de planes. Deploy automático en Vercel.",
      link: "https://portuauto.vercel.app",
    },
  ];

  const appItems: WorkItem[] = [
    {
      imageSrc: "placeholders/gamio.webp",
      title: "Gamio — Plataforma de Juegos Online",
      description:
        "Plataforma web de juegos jugables desde el navegador en mobile y desktop, desarrollada para Media Digital Group bajo la marca Epicplay. Catálogo público navegable sin registro en 12 categorías (acción, aventura, carreras, deportes, disparos, estrategia, multijuego, música, lucha, plataformas, puzzle e imagen), con carrusel de recomendados, colecciones curadas, novedades y buscador con filtros. Incluye autenticación por número de teléfono (MSISDN), biblioteca personal con \"Continuar jugando\", panel de estadísticas de usuario y soporte por WhatsApp. Multilingüe (inglés, español y polaco). Stack: Next.js (App Router), TypeScript, Tailwind CSS, next-intl (i18n), GA4 vía GTM y hosting en AWS.",
      link: "https://gamio.online/en",
    },
    {
      imageSrc: "placeholders/fluxstore.webp",
      title: "FluxStore — E-commerce de Celulares",
      description:
        "E-commerce de celulares importados desde Paraguay para venta en Argentina. Backend con Medusa.js v2 (API headless + admin panel), storefront con Next.js 15, PostgreSQL en Neon (AWS sa-east-1), pagos con MercadoPago Checkout Pro y storage de imágenes en Cloudflare R2. Deploy en Vercel (frontend) + Render (backend). Incluye métodos de envío Andreani (domicilio y sucursal) y envío propio.",
      badge: "Proyecto propio",
      link: "https://fluxstore-storefront.vercel.app",
    },
    {
      imageSrc: "placeholders/app-recaap.webp",
      title: "Recap — Resúmenes de Libros con Audio",
      description:
        "Plataforma de resúmenes de libros en español con lectura y audio sincronizado entre dispositivos. Incluye modo offline, seguimiento de progreso, sistema de desafíos (racha de 21 días, maratón de lectura), logros y niveles. Más de 9 categorías: negocios, tecnología, biografía, ficción y más. Integra Google Analytics y GTM.",
      link: "https://www.recaap.ai/",
    },
    {
      imageSrc: "placeholders/sumry.webp",
      title: "Sumry — Resúmenes de Libros en Texto y Audio",
      description:
        "Plataforma web de resúmenes de libros en texto y audio (estilo Blinkist/Headway) desarrollada para Media Digital Group, orientada a nuevos mercados europeos (Polonia y Austria). Incluye biblioteca personal con registro automático, reproductor multimedia con audio en streaming y lectura sincronizada entre dispositivos, autenticación OTP por teléfono y soporte por WhatsApp. Multilingüe (español, inglés, polaco y alemán), con arquitectura serverless y replicable por configuración. Stack: Next.js (App Router) con SSG/RSC, i18n y enfoque GDPR / WCAG 2.1 AA.",
      link: "https://sumry.online/en",
    },
    {
      imageSrc: "placeholders/libravo.webp",
      title: "Libravo — Audiolibros y Resúmenes por Suscripción",
      description:
        "Plataforma de suscripción de audiolibros y resúmenes de libros (+300 títulos) desarrollada para Media Digital Group, orientada a mercados europeos. Incluye biblioteca personal con seguimiento de progreso y favoritos, reproductor multimedia con audio en streaming y lectura de texto sincronizada, modo oscuro, autenticación OTP por teléfono y soporte por WhatsApp + Centro de Ayuda. Catálogo en 11 categorías (ficción, autoayuda, negocios, psicología, clásicos y más) y multilingüe (español, inglés, polaco, ruso y búlgaro). Stack: Next.js 16 (App Router) con RSC, next-intl (i18n), React 19, Tailwind 4 y PostgreSQL, con enfoque GDPR.",
      link: "https://libravo.online/es",
    },
    {
      imageSrc: "placeholders/pressly.webp",
      title: "Pressly — Plataforma de Revistas Digitales",
      description:
        "Servicio de suscripción de revistas digitales que ofrece acceso ilimitado a publicaciones globales (Vogue, National Geographic, Forbes, Harper's Bazaar, ELLE, Esquire, ¡HOLA! y más) desde el celular, sin descargas y con lectura instantánea. Actualizaciones semanales de contenido en múltiples categorías (noticias, moda, deportes, tecnología, bienestar, viajes y negocios), con más de 1 millón de usuarios. Suscripción con billing por operador (cargo a la factura del teléfono) y autenticación de usuario. Multilingüe (inglés, español, alemán, neerlandés y polaco).",
      link: "https://presslyonline.com/en",
    },
    {
      imageSrc: "placeholders/app-magplus.webp",
      title: "MagPlus — Plataforma de Revistas Digitales",
      description:
        "Plataforma global de distribución de revistas digitales con presencia en Oriente Medio, Europa, África y Asia. Sistema de autenticación, gestión de suscripciones, soporte multilingüe y multi-región, notificaciones push con OneSignal. Categorías: negocios, gastronomía, deportes, tecnología, bienestar y viajes. Integra GA4.",
      link: "https://magplus.club/",
    },
    {
      imageSrc: "placeholders/jamo-panel.webp",
      title: "JAMO — Panel de Operaciones",
      description:
        "Sistema interno de adquisición de clientes para JAMO. Prospecta negocios en Google Maps por rubro y ciudad, enriquece cada lead con email e Instagram (web scraping con Puppeteer + Cheerio), los carga en un CRM de Notion y gestiona el outreach por WhatsApp y secuencias de email frío en 3 pasos (Brevo). Análisis de prospectos con IA (Claude). Stack: Node.js, Express, Notion API, Google Maps Places API, Anthropic SDK, Puppeteer.",
      badge: "Proyecto propio",
    },
  ];

  const mobileAppItems: WorkItem[] = [
    {
      imageSrc: "placeholders/1of1.webp",
      title: "1OF1 - Basket Hub",
      description:
        "App móvil para encontrar canchas de básquet, armar pickups y competir con otros jugadores. Detecta partidos automáticamente vía GPS y registra tiempo de juego, mapas de calor, % de tiros, velocidad y verticalidad; incluye ranking \"King of the Court\" por temporadas semestrales, chat social, mapa colaborativo de canchas cargado por la comunidad e integración con smartwatch (Health Connect) para métricas físicas. Monorepo con app en Flutter/Dart, backend NestJS + Prisma sobre Supabase Postgres (deploy en Render) y landing en Astro con i18n ES/EN. Actualmente en etapa previa al lanzamiento en App Store y Google Play.",
      badge: "Proyecto propio",
      link: "https://buschfranco.github.io/1of1/",
    },
    {
      imageSrc: "placeholders/shooterloop.webp",
      title: "ShooterLoop — Auto-Shooter Roguelite (Prototipo)",
      description:
        "Juego auto-shooter tipo roguelite/survivor en desarrollo activo, con estética neón 100% vectorial (sin sprites) generada por código, con glow y grid de fondo. El jugador dispara automáticamente al enemigo más cercano en rondas de 60 segundos (cada 5ª ronda es un boss sin límite de tiempo), con racha de kills que multiplica hasta x2.5 la XP y las monedas, 11 tipos de enemigos —incluyendo variantes élite con modificadores como vampírico, blindado o explosivo—, 7 clases de build que se activan automáticamente según las estadísticas del jugador, catálogo de más de 20 mejoras por rareza, eventos aleatorios de ronda (zona que se encoge, lluvia de misiles, niebla, campo minado) y un balanceador de dificultad adaptativo. Stack: Godot Engine 4.7 con C# sobre .NET 8. Prototipo jugable en desarrollo activo, aún sin publicar.",
      badge: "Proyecto propio",
    },
  ];

  return (
    <main id="main-content">
      <div className={style.titleContainer}>
        <Typewriter as="h1" text="Franco Busch" speed={110} showCaret={true} />
        <Typewriter as="p" text="Desarrollador de Software" speed={60} showCaret={false} />
     

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
          <h2 style={{marginBottom: "0"}}>Parte de mi Esfuerzo</h2>
          {/* Enlaces a subsecciones */}
          <nav className={style.workLinks} aria-label="Subsecciones de Mi Trabajo">
            <a href="#landing-pages" className={style.workLink}>Sitios Web</a>
            <a href="#aplicaciones" className={style.workLink}>Aplicaciones</a>
            <a href="#aplicaciones-moviles" className={style.workLink}>Aplicaciones Móviles</a>
            <a href="#certificados" className={style.workLink}>Certificaciones</a>
            <a href="#analytics" className={style.workLink}>Análisis/Ads</a>
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
                    <img className={style.thumbImage} src={withBase(it.imageSrc)} alt={it.title} loading="lazy" decoding="async" />
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
                    <img className={style.thumbImage} src={withBase(it.imageSrc)} alt={it.title} loading="lazy" decoding="async" />
                    <div className={style.thumbOverlay}>
                      <h4>{it.title}</h4>
                      <p>{truncate(it.description, 140)}</p>
                    </div>
                  </div>
                ))}
              </AutoCarousel>
            </Reveal>
          </article>

          <article id="aplicaciones-moviles" className={style.workCard}>
            <Reveal className="revealLeft" delay={0}>
              <h3>Aplicaciones Móviles</h3>
              <div className={style.carousel}>
                {mobileAppItems.map((it, idx) => (
                  <div
                    key={`mobile-${idx}`}
                    className={style.thumbItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedItem({ title: it.title, description: it.description, imageSrc: it.imageSrc, link: it.link })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setSelectedItem({ title: it.title, description: it.description, imageSrc: it.imageSrc, link: it.link });
                    }}
                  >
                    <img className={style.thumbImage} src={withBase(it.imageSrc)} alt={it.title} loading="lazy" decoding="async" />
                    {it.badge && <span className={style.projectBadge}>{it.badge}</span>}
                    <div className={style.thumbOverlay}>
                      <h4>{it.title}</h4>
                      <p>{truncate(it.description)}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                  src={withBase("/placeholders/analytics.webp")}
                  alt="Google Analytics – panel y métricas"
                  className={`${style.thumbImage} ${style.analyticsImage}`}
                  loading="lazy"
                  decoding="async"
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
                  src={withBase("/placeholders/gads.webp")}
                  alt="Google Ads – campañas y panel"
                  className={`${style.thumbImage} ${style.analyticsImage}`}
                  loading="lazy"
                  decoding="async"
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
        </div>

        <section id="sobre-mi" className={style.aboutSection}>
          <Reveal className="revealLeft" delay={0}>
            <h2 className={style.aboutTitle}>Sobre mí</h2>
            <div className={style.aboutGrid}>
              <div className={style.aboutText}>
                <p>
                  Desarrollador de Producto con más de 4 años en la industria. Actualmente soy Responsable Técnico
                  de los productos internos y externos: lidero el desarrollo de punta a punta, defino prioridades
                  y me hago cargo de que cada producto llegue a buen puerto.
                </p>
                <p>
                  Soy analítico y pragmático — eso me permite mantener la cabeza fría en momentos de conflicto y tomar decisiones con criterio.
                  Me interesa el cruce entre el producto, el marketing y la analítica: construir productos que no solo funcionen, sino que generen resultados medibles.
                </p>
                <p>
                  Basado en Buenos Aires, Argentina. Abierto a proyectos remotos.
                </p>
                <div className={style.aboutDisclaimer}>
                  <p>
                    No te vendo un servicio en concreto. Te ofrezco alguien con ganas de participar y sacar adelante tu proyecto como si fuera propio — con el abanico de herramientas que existen hoy para afrontar cualquier desafío y desarrollo que sea necesario.
                  </p>
                </div>
              </div>
              <div className={style.aboutCards}>
                <div className={style.aboutCard}>
                  <span className={style.aboutCardNum}>4+</span>
                  <span className={style.aboutCardLabel}>años en la industria</span>
                </div>
                <div className={style.aboutCard}>
                  <span className={style.aboutCardNum}>RT</span>
                  <span className={style.aboutCardLabel}>Responsable Técnico de Producto</span>
                </div>
                <div className={style.aboutCard}>
                  <span className={style.aboutCardNum}>BA</span>
                  <span className={style.aboutCardLabel}>Buenos Aires, Argentina</span>
                </div>
                <div className={style.aboutCard}>
                  <span className={style.aboutCardNum}>23</span>
                  <span className={style.aboutCardLabel}>certificados profesionales</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <article id="certificados" className={style.workCard}>
          <h3 className={style.certSectionTitle}>Certificados Profesionales</h3>
          <div className={style.certsBadgeWrap}>
            <img
              src={withBase("/google-digital-marketing-badge.webp")}
              alt="Google Digital Marketing and E-commerce Badge"
              className={style.certsBadge}
              loading="lazy"
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
              { src: "/certificates/AIforDataAnalysis.webp", title: "AI for Data Analysis" },
              { src: "/certificates/AIforContentCreation.webp", title: "AI for Content Creation" },
              { src: "/certificates/AIforWritingandCommunicating.webp", title: "AI for Writing and Communicating" },
              { src: "/certificates/AIforResearchandInsights.webp", title: "AI for Research and Insights" },
              { src: "/certificates/AIforBrainstormingandPlanning.webp", title: "AI for Brainstorming and Planning" },
              { src: "/certificates/AIFundamentals.webp", title: "AI Fundamentals" },
              { src: "/certificates/DataDataEverywhere.webp", title: "Data, Data, Everywhere" },
            ].map((cert, i) => (
              <div
                key={i}
                className={style.certCard}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedCert(cert)}
                onKeyDown={(e) => { if (e.key === "Enter") setSelectedCert(cert); }}
              >
                <img src={withBase(cert.src)} alt={cert.title} className={style.certImg} loading="lazy" decoding="async" />
                <p className={style.certTitle}>{cert.title}</p>
              </div>
            ))}
          </div>
        </article>
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
              href="https://www.linkedin.com/in/francobusch/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={style.contactLink}
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/BuschFranco" 
              target="_blank" 
              rel="noopener noreferrer"
              className={style.contactLink}
            >
              GitHub
            </a>
            <a
              href="https://justamarketingoffice.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={style.contactLink}
            >
              Agencia Web
            </a>
            <a
              href="https://wa.me/5491131506458"
              target="_blank"
              rel="noopener noreferrer"
              className={style.contactLink}
            >
              WhatsApp
            </a>
            <a
              href="mailto:francobusch130@gmail.com"
              className={style.contactLink}
            >
              Email
            </a>
          </div>
        </div>
        <div className={style.footerCv}>
          <h3>Curriculum</h3>
          <div className={style.cvTabs} role="tablist" aria-label="Versiones del CV">
            {cvOptions.map((o) => (
              <button
                key={o.id}
                type="button"
                role="tab"
                aria-selected={cvTab === o.id}
                className={`${style.cvTab} ${cvTab === o.id ? style.cvTabActive : ""}`}
                onClick={() => setCvTab(o.id)}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className={style.cvPreview}>
            <iframe
              key={activeCv.file}
              className={style.cvFrame}
              src={activeCv.file}
              title={`Previsualización del CV — ${activeCv.label}`}
            ></iframe>
          </div>
          <a
            className={style.downloadBtn}
            href={activeCv.file}
            download
          >
            Descargar CV — {activeCv.label}
          </a>
        </div>
      </div>
      <ContactForm />
      <div className={style.footerLegal}>
        <span>© {new Date().getFullYear()} Franco Busch · Buenos Aires, Argentina</span>
        <div className={style.footerLegalLinks}>
          <a href={withBase("/privacidad")}>Política de Privacidad</a>
          <a href={withBase("/terminos")}>Términos y Condiciones</a>
        </div>
      </div>
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
            src={withBase(selectedCert.src)}
            alt={selectedCert.title}
            className={style.certLightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </main>
  );
}
