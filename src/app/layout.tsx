import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "TrustMyDiag — Second avis médical en toute confiance",
  description: "Obtenez un second avis médical de nos médecins partenaires en envoyant votre compte rendu.",
};

// Base: Pearl exact canvas — near-white with a breath of cold blue
const BASE = "#f0f2f8";

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

        {/*
          Pearl / Apple gradient mesh
          — 4 ultra-soft, large, overlapping clouds
          — No hard edges, no saturation, center stays bright
        */}
        <div aria-hidden="true" style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          background: [
            // Blush/peach — Pearl signature, very whisper-soft, center-right
            "radial-gradient(ellipse 85% 65% at 68% 42%, rgba(248,218,212,0.38) 0%, transparent 65%)",
            // Icy lavender-blue — left, Pearl's cool anchor
            "radial-gradient(ellipse 65% 80% at 2% 45%, rgba(208,220,248,0.42) 0%, transparent 60%)",
            // Pale lavender — bottom, barely there
            "radial-gradient(ellipse 75% 50% at 50% 100%, rgba(228,222,250,0.22) 0%, transparent 55%)",
            // Cool tint — top left, echoes Pearl header
            "radial-gradient(ellipse 50% 40% at 0% 0%, rgba(210,218,250,0.30) 0%, transparent 50%)",
          ].join(","),
        }} />

        {/* Top fade — seamless with header */}
        <div aria-hidden="true" style={{
          position: "fixed", top: 0, left: 0, right: 0,
          height: "18vh", zIndex: 1, pointerEvents: "none",
          background: `linear-gradient(to bottom, ${BASE} 0%, ${BASE} 25%, transparent 100%)`,
        }} />

        {/* Bottom fade — seamless with mobile nav bar */}
        <div aria-hidden="true" style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          height: "15vh", zIndex: 1, pointerEvents: "none",
          background: `linear-gradient(to top, ${BASE} 0%, ${BASE} 20%, transparent 100%)`,
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
