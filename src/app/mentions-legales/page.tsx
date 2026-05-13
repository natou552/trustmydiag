import { Header } from "@/components/header";
import Link from "next/link";

const sections = [
  {
    title: "Éditeur du site",
    content: [
      "Le site trustmydiag.com est édité par la société TrustMyDiag, société par actions simplifiée (SAS) en cours d'immatriculation.",
      "Siège social : Paris, France",
      "Co-fondateurs : Nathanael Benguigui & Ruben Benguigui",
      "Contact : contact@trustmydiag.com",
    ],
  },
  {
    title: "Directeur de la publication",
    content: [
      "Nathanael Benguigui, Co-fondateur & CEO de TrustMyDiag.",
    ],
  },
  {
    title: "Hébergement",
    content: [
      "Le site est hébergé par Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis.",
      "Les données médicales sont stockées sur Supabase (infrastructure AWS Europe West). Une migration vers un hébergeur certifié HDS (Hébergeur de Données de Santé) est en cours.",
    ],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "L'ensemble des contenus présents sur le site trustmydiag.com (textes, images, logotypes, structure) sont protégés par le droit d'auteur et sont la propriété exclusive de TrustMyDiag.",
      "Toute reproduction, représentation, modification ou exploitation de ces contenus, sans autorisation expresse et préalable de TrustMyDiag, est strictement interdite.",
    ],
  },
  {
    title: "Données personnelles & RGPD",
    content: [
      "Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles.",
      "Pour exercer ces droits ou pour toute question relative au traitement de vos données, contactez-nous à : contact@trustmydiag.com",
      "Pour plus d'informations, consultez notre politique de confidentialité.",
    ],
  },
  {
    title: "Médecins experts",
    content: [
      "Les seconds avis médicaux sont délivrés par des médecins diplômés, inscrits au Conseil National de l'Ordre des Médecins et identifiables via le Répertoire Partagé des Professionnels de Santé (RPPS) :",
      "Dr. xxxxxx xxxx — Chirurgien-dentiste — N° RPPS : xxxxxxxxxxx",
      "Dr. xxxxxx xxxx — Gynécologue obstétricien — N° RPPS : xxxxxxxxxxx",
    ],
  },
  {
    title: "Responsabilité",
    content: [
      "Les seconds avis médicaux fournis via TrustMyDiag sont délivrés par des médecins diplômés et constituent des avis d'experts indépendants. Ils ne remplacent pas une consultation médicale en présentiel et ne sauraient engager la responsabilité de TrustMyDiag au-delà du service rendu.",
      "TrustMyDiag s'engage à assurer la disponibilité du service mais ne peut garantir une disponibilité ininterrompue du site.",
    ],
  },
  {
    title: "Droit applicable",
    content: [
      "Les présentes mentions légales sont soumises au droit français. Tout litige relatif à l'utilisation du site trustmydiag.com sera soumis à la compétence exclusive des tribunaux français.",
    ],
  },
  {
    title: "Médiation",
    content: [
      "Conformément aux dispositions du Code de la consommation, vous pouvez recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d'un litige. Contactez-nous préalablement à contact@trustmydiag.com.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center text-sm mb-10 transition-colors" style={{ color: "#8B7FF0" }}>
          ← Retour
        </Link>

        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#8B7FF0" }}>
            Légal
          </p>
          <h1 className="text-4xl font-bold mb-3" style={{ color: "#2D2A3E" }}>
            Mentions légales
          </h1>
          <p className="text-sm" style={{ color: "#9B98A8" }}>
            Dernière mise à jour : mai 2025
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl px-7 py-6"
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 2px 16px rgba(139,127,240,0.06)",
              }}
            >
              <h2 className="text-base font-semibold mb-3" style={{ color: "#2D2A3E" }}>
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.content.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed" style={{ color: "#6B6880" }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-sm" style={{ color: "#8B7FF0" }}>
          <Link href="/rgpd" className="hover:underline">Politique de confidentialité</Link>
          <Link href="/cookies" className="hover:underline">Politique de cookies</Link>
          <Link href="/terms" className="hover:underline">Conditions d&apos;utilisation</Link>
        </div>
      </main>
    </div>
  );
}
