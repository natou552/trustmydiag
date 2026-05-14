import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créer un compte — TrustMyDiag",
  description: "Créez votre compte TrustMyDiag et obtenez un second avis médical en ligne pour 22€.",
  openGraph: {
    title: "Créer un compte — TrustMyDiag",
    description: "Créez votre compte TrustMyDiag et obtenez un second avis médical en ligne pour 22€.",
    url: "https://www.trustmydiag.com/register",
    siteName: "TrustMyDiag",
    type: "website",
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
