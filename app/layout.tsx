import type { Metadata } from "next";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "./components/Preloader";

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Image
          src="/logoWhite.png"
          className="logo"
          alt="Favicon"
          width={102}
          height={102}
          priority
        />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
