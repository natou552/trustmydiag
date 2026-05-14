import { Metadata } from "next";
import { Header } from "@/components/header";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos — TrustMyDiag",
  description: "Découvrez la mission de TrustMyDiag : démocratiser le second avis médical dentaire et gynécologique pour tous les patients en France.",
  openGraph: {
    title: "À propos — TrustMyDiag",
    description: "Découvrez la mission de TrustMyDiag : démocratiser le second avis médical dentaire et gynécologique pour tous les patients en France.",
    url: "https://www.trustmydiag.com/about",
    siteName: "TrustMyDiag",
    type: "website",
  },
};

const values = [
  {
    title: "Transparence",
    description:
      "Nous vous fournissons des rapports complets, sans jargon inaccessible, rédigés par des médecins indépendants. Aucun conflit d'intérêt, aucune relation commerciale avec des cabinets de soins.",
    icon: "🔍",
  },
  {
    title: "Confiance",
    description:
      "Chaque expert de notre réseau est un spécialiste diplômé et en exercice, sélectionné rigoureusement. Vos données médicales sont traitées avec la plus haute confidentialité.",
    icon: "🛡️",
  },
  {
    title: "Accessibilité",
    description:
      "Parce que l'expertise médicale ne devrait pas être réservée à quelques-uns, nous proposons des tarifs transparents et abordables pour que chaque patient puisse accéder à un regard indépendant.",
    icon: "🌍",
  },
];

const team = [
  {
    name: "Nathanael Benguigui",
    title: "Co-fondateur & CEO",
    specialty: "Diplômé de Paris Dauphine — Master Systèmes d'Information",
    bio: "Passionné par l'innovation dans la santé, Nathanael a conçu et développé la plateforme TrustMyDiag pour rendre le second avis médical accessible à tous, rapidement et en toute confiance.",
  },
  {
    name: "Ruben Benguigui",
    title: "Co-fondateur & CEO",
    specialty: "Étudiant en chirurgie dentaire",
    bio: "Fort de sa formation en chirurgie dentaire, Ruben apporte l'expertise médicale au cœur de TrustMyDiag. Sa vision du terrain lui permet de garantir la qualité et la rigueur des avis rendus aux patients.",
  },
];

export default function AboutPage() {
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

        {/* Mission */}
        <div className="mb-16">
          <p className="text-[#0071E3] text-sm font-semibold uppercase tracking-widest mb-3">
            À propos
          </p>
          <h1 className="text-4xl font-bold text-[#1D1D1F] mb-6">
            Notre mission : démocratiser le second avis médical
          </h1>
          <p className="text-xl text-[#6E6E73] leading-relaxed max-w-3xl">
            TrustMyDiag est né d&apos;une conviction simple : chaque patient a le droit de comprendre
            son diagnostic et de bénéficier d&apos;un regard indépendant avant tout acte médical
            important. Nous mettons en relation des patients avec des spécialistes de confiance, de
            manière rapide, simple et accessible.
          </p>
        </div>

        {/* Founding Story */}
        <div className="glass-card rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-4">Notre histoire</h2>
          <p className="text-[#6E6E73] leading-relaxed mb-4">
            TrustMyDiag est né de la rencontre entre deux frères aux parcours complémentaires.
            Nathanael, diplômé de Paris Dauphine en systèmes d&apos;information, et Ruben, étudiant
            en chirurgie dentaire, ont constaté ensemble une réalité préoccupante : trop de patients
            acceptent des traitements coûteux sans jamais avoir eu accès à un regard indépendant.
          </p>
          <p className="text-[#6E6E73] leading-relaxed mb-4">
            De cette conviction est née l&apos;idée d&apos;une plateforme simple, rapide et
            accessible, permettant à n&apos;importe quel patient d&apos;obtenir un second avis
            médical de qualité, en ligne, pour 22€.
          </p>
          <p className="text-[#6E6E73] leading-relaxed">
            Aujourd&apos;hui, TrustMyDiag connecte des patients avec des spécialistes diplômés en
            dentaire et gynécologie, avec la volonté d&apos;élargir cette offre à d&apos;autres
            spécialités.
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-8">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="glass-card rounded-2xl p-7">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold text-[#1D1D1F] mb-3">{v.title}</h3>
                <p className="text-sm text-[#6E6E73] leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-8">Notre équipe fondatrice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="glass-card rounded-2xl p-8 flex flex-col gap-3"
              >
                <div className="w-16 h-16 bg-[#0071E3]/10 rounded-full flex items-center justify-center text-2xl font-bold text-[#0071E3]">
                  {member.name.split(" ")[1][0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1D1D1F]">{member.name}</h3>
                  <p className="text-[#0071E3] text-sm font-medium">{member.title}</p>
                  <p className="text-xs text-[#6E6E73] mt-0.5">{member.specialty}</p>
                </div>
                <p className="text-sm text-[#6E6E73] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
