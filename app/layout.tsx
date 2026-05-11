import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import BackToTop from "./components/BackToTop";
import GtmManager from "./components/GtmManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Franco Busch | Desarrollador Full Stack — Portafolio 2026",
  description:
    "Desarrollador de Software Full Stack especializado en Next.js, React y marketing digital. Portfolio de proyectos web, apps, automatizaciones y campañas de Google Ads.",
  metadataBase: new URL("https://buschfranco.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Franco Busch | Desarrollador Full Stack",
    description:
      "Portfolio de Franco Busch — proyectos web, apps, automatizaciones y marketing digital. Certificado Google Digital Marketing & E-commerce.",
    url: "https://buschfranco.com",
    siteName: "Franco Busch Portfolio",
    images: [{ url: "/logoWhite.webp" }],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Franco Busch | Desarrollador Full Stack",
    description:
      "Portfolio de Franco Busch — proyectos web, apps, automatizaciones y marketing digital.",
    images: ["/logoWhite.webp"],
  },
  icons: {
    icon: "/logoWhite.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2 — debe correr sincrónicamente antes que GTM */}
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;

          function isEU() {
            try {
              var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
              return /^Europe\\//.test(tz) || ['Atlantic/Canary','Atlantic/Faroe','Atlantic/Madeira','Atlantic/Reykjavik'].includes(tz);
            } catch(e) { return false; }
          }

          function loadGTM() {
            if (window.__gtm_loaded) return;
            window.__gtm_loaded = true;
            (function(w,d,s,l,i){
              w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KSTCPG4P');
          }
          window.loadGTM = loadGTM;

          var eu = isEU();

          gtag('consent', 'default', {
            analytics_storage:  eu ? 'denied' : 'granted',
            ad_storage:         eu ? 'denied' : 'granted',
            ad_user_data:       eu ? 'denied' : 'granted',
            ad_personalization: eu ? 'denied' : 'granted',
            wait_for_update:    eu ? 500 : 0,
          });

          if (!eu) {
            loadGTM();
          } else if (localStorage.getItem('cookie-consent') === 'accepted') {
            gtag('consent', 'update', {
              analytics_storage:  'granted',
              ad_storage:         'granted',
              ad_user_data:       'granted',
              ad_personalization: 'granted',
            });
            loadGTM();
          }
        `}} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Franco Busch",
              url: "https://buschfranco.com",
              jobTitle: "Desarrollador Full Stack",
              sameAs: [
                "https://www.linkedin.com/in/francobusch/",
                "https://github.com/BuschFranco",
              ],
              knowsAbout: ["Next.js", "React", "TypeScript", "Google Ads", "Marketing Digital"],
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a href="#main-content" className="skip-link">Saltar al contenido</a>
        <GtmManager />
        <Nav />
        <Preloader />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
