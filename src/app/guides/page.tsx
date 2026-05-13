import { Header } from "@/components/header";
import Link from "next/link";
import { FileText } from "lucide-react";

const guides = [
  {
    title: "Guide complet du second avis dentaire",
    description:
      "Tout ce que vous devez savoir avant d'accepter un devis dentaire : types de traitements, tarifs moyens, questions à poser, et comment évaluer la pertinence d'une recommandation.",
  },
  {
    title: "Comprendre un compte rendu gynécologique",
    description:
      "Un lexique illustré des termes courants dans les bilans gynécologiques, avec des explications claires sur les valeurs normales, les seuils d'alerte et les suites à donner.",
  },
  {
    title: "Checklist : préparer votre demande de second avis",
    description:
      "Une liste de contrôle pratique pour rassembler l'ensemble de vos documents médicaux, structurer votre question et maximiser la pertinence de la réponse de l'expert.",
  },
];

const caseStudies = [
  {
    title: "Sophie, 34 ans — Éviter un détartrage abusif",
    teaser:
      "Son dentiste lui préconisait un détartrage profond à 450 € non remboursé. Après un second avis TrustMyDiag, elle a appris que son état ne le justifiait pas encore. Économie réalisée : 450 €.",
    specialty: "Dentaire",
  },
  {
    title: "Marie, 42 ans — Kyste ovarien bénin confirmé",
    teaser:
      "Inquiète après une échographie évoquant un kyste, Marie a soumis son dossier à notre gynécologue expert. Diagnostic rassurant, surveillance simple recommandée, opération évitée.",
    specialty: "Gynécologie",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-[#6E6E73] hover:text-[#1D1D1F] text-sm mb-10 transition-colors"
        >
          ← Retour
        </Link>

        {/* Hero */}
        <div className="mb-14">
          <p className="text-[#0071E3] text-sm font-semibold uppercase tracking-widest mb-3">
            Études de cas &amp; Guides
          </p>
          <h1 className="text-4xl font-bold text-[#1D1D1F] mb-4">
            Apprenez à mieux naviguer dans le système de santé
          </h1>
          <p className="text-lg text-[#6E6E73] max-w-2xl">
            Des guides pratiques et des témoignages concrets pour vous aider à prendre des décisions
            médicales plus sûres et plus éclairées.
          </p>
        </div>

        {/* Guides */}
        <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">Guides pratiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {guides.map((guide) => (
            <div
              key={guide.title}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:shadow-[0_12px_40px_rgba(139,127,240,0.18)] transition-shadow duration-200"
            >
              <div className="w-10 h-10 bg-[#0071E3]/10 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#0071E3]" />
              </div>
              <h3 className="text-base font-bold text-[#1D1D1F] leading-snug">{guide.title}</h3>
              <p className="text-sm text-[#6E6E73] leading-relaxed flex-1">{guide.description}</p>
              <button className="mt-auto text-sm font-semibold text-[#0071E3] hover:underline text-left">
                Télécharger le guide →
              </button>
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">Études de cas patients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((cs) => (
            <div
              key={cs.title}
              className="glass-card rounded-2xl p-7 hover:shadow-[0_12px_40px_rgba(139,127,240,0.18)] transition-shadow duration-200"
            >
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-[#0071E3] mb-4 inline-block">
                {cs.specialty}
              </span>
              <h3 className="text-lg font-bold text-[#1D1D1F] mb-3">{cs.title}</h3>
              <p className="text-sm text-[#6E6E73] leading-relaxed">{cs.teaser}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
