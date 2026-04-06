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
  title: "Busch Franco | Portafolio",
  description: "Desarrollador de Software",
  icons: {
    icon: "/logoWhite.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GtmManager />
        <Nav />
        <Preloader />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
