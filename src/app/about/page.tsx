import Header from "@/components/header";
import Link from "next/link";

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
    name: "Dr. Amina Bensalah",
    title: "Co-fondatrice & Directrice médicale",
    specialty: "Chirurgienne-dentiste, 12 ans d'expérience",
    bio: "Après avoir exercé dans plusieurs établissements hospitaliers parisiens, Amina a constaté que de nombreux patients subissaient des actes inutiles par manque d'information. C'est cette conviction qui l'a poussée à co-fonder TrustMyDiag en 2024.",
  },
  {
    name: "Dr. Julien Moreau",
    title: "Co-fondateur & Directeur scientifique",
    specialty: "Gynécologue-obstétricien, 15 ans d'expérience",
    bio: "Julien a exercé en France et en Suisse avant de se consacrer à l'amélioration de l'accès aux soins. Convaincu que chaque patient mérite un diagnostic indépendant, il a rejoint Amina pour construire une plateforme fiable et éthique.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
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
        <div className="bg-[#F5F5F7] rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-4">Notre histoire</h2>
          <p className="text-[#6E6E73] leading-relaxed mb-4">
            En 2024, deux médecins aux parcours différents mais aux valeurs communes se sont
            rencontrés lors d&apos;un symposium sur l&apos;éthique médicale à Paris. Le Dr. Amina
            Bensalah, chirurgienne-dentiste, et le Dr. Julien Moreau, gynécologue, partageaient la
            même frustration : leurs patients arrivaient en consultation avec des prescriptions
            inadaptées, victimes du manque de transparence du système de santé.
          </p>
          <p className="text-[#6E6E73] leading-relaxed mb-4">
            Ensemble, ils ont décidé de créer une plateforme digitale permettant à n&apos;importe
            quel patient d&apos;obtenir, en moins de 48 heures, l&apos;avis d&apos;un spécialiste
            indépendant sur son dossier médical. TrustMyDiag a officiellement lancé son service en
            septembre 2024.
          </p>
          <p className="text-[#6E6E73] leading-relaxed">
            Depuis, des centaines de patients ont pu éviter des traitements inutiles, économiser des
            milliers d&apos;euros, et surtout, reprendre le contrôle de leur santé en toute
            connaissance de cause.
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-8">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white border border-gray-200 rounded-2xl p-7">
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
                className="bg-[#F5F5F7] rounded-2xl p-8 flex flex-col gap-3"
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
