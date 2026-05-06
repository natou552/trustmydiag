import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "TrustMyDiag — Second avis médical en toute confiance",
  description: "Obtenez un second avis médical de nos médecins partenaires en envoyant votre compte rendu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MCV5DCP9');` }} />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MCV5DCP9" height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
