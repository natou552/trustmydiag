import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "TrustMyDiag — Second avis médical en toute confiance",
  description: "Obtenez un second avis médical de nos médecins partenaires en envoyant votre compte rendu.",
};

// Base: very light icy blue #EEF2FC — matches Pearl's canvas
const BASE = "#eef2fc";

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
            // Blush/peach glow — centered slightly right (Pearl signature)
            "radial-gradient(ellipse 90% 70% at 65% 45%, rgba(240,200,195,0.72) 0%, transparent 66%)",
            // Icy blue — left side
            "radial-gradient(ellipse 70% 85% at 5% 40%, rgba(195,218,255,0.62) 0%, transparent 60%)",
            // Lavender haze — bottom center
            "radial-gradient(ellipse 80% 55% at 45% 95%, rgba(218,208,255,0.55) 0%, transparent 58%)",
            // Warm cream — top right
            "radial-gradient(ellipse 55% 50% at 95% 5%, rgba(255,228,210,0.48) 0%, transparent 53%)",
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
