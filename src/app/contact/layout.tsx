import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nous contacter — TrustMyDiag",
  description: "Contactez l'équipe TrustMyDiag pour toute question sur votre second avis médical. Réponse sous 48h.",
  openGraph: {
    title: "Nous contacter — TrustMyDiag",
    description: "Contactez l'équipe TrustMyDiag pour toute question sur votre second avis médical. Réponse sous 48h.",
    url: "https://www.trustmydiag.com/contact",
    siteName: "TrustMyDiag",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
