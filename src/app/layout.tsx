import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "TrustMyDiag — Second avis médical en toute confiance",
  description: "Obtenez un second avis médical de nos médecins partenaires en envoyant votre compte rendu.",
};

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MCV5DCP9');` }} />
      </head>
      <body className="font-sans antialiased">
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MCV5DCP9" height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>

        {/* Ambient blobs — très subtils, style Apple/Linear */}
        <div aria-hidden="true" style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          background: [
            "radial-gradient(ellipse 65% 55% at 62% 42%, rgba(255,200,182,0.55) 0%, transparent 60%)",
            "radial-gradient(ellipse 45% 60% at 2% 52%, rgba(215,213,245,0.18) 0%, transparent 50%)",
          ].join(","),
        }} />

        {/* Fondu blanc en haut — masque tout contraste avec la barre du navigateur */}
        <div aria-hidden="true" style={{
          position: "fixed", top: 0, left: 0, right: 0,
          height: "18vh", zIndex: 1, pointerEvents: "none",
          background: "linear-gradient(to bottom, #edeef8 0%, #edeef8 30%, transparent 100%)",
        }} />

        {/* Fondu blanc en bas — masque tout contraste avec la barre de navigation mobile */}
        <div aria-hidden="true" style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          height: "15vh", zIndex: 1, pointerEvents: "none",
          background: "linear-gradient(to top, #edeef8 0%, #edeef8 20%, transparent 100%)",
        }} />

        {/* Grain premium presque invisible */}
        <div aria-hidden="true" className="grain-overlay" style={{
          position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
          backgroundImage: GRAIN,
          backgroundSize: "200px 200px",
          opacity: 0.32,
          mixBlendMode: "multiply" as React.CSSProperties["mixBlendMode"],
        }} />

        {/* Contenu — au-dessus des blobs */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
