import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion — TrustMyDiag",
  description: "Accédez à votre espace patient TrustMyDiag",
  openGraph: {
    title: "Connexion — TrustMyDiag",
    description: "Accédez à votre espace patient TrustMyDiag",
    url: "https://www.trustmydiag.com/login",
    siteName: "TrustMyDiag",
    type: "website",
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
