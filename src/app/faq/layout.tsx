import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — TrustMyDiag",
  description: "Trouvez les réponses à vos questions sur le second avis médical TrustMyDiag : délais, documents, remboursement, confidentialité.",
  openGraph: {
    title: "FAQ — TrustMyDiag",
    description: "Trouvez les réponses à vos questions sur le second avis médical TrustMyDiag : délais, documents, remboursement, confidentialité.",
    url: "https://www.trustmydiag.com/faq",
    siteName: "TrustMyDiag",
    type: "website",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
