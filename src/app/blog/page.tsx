import { Header } from "@/components/header";
import Link from "next/link";

const articles = [
  {
    title: "Pourquoi demander un second avis dentaire ?",
    date: "12 avril 2025",
    category: "Dentaire",
    excerpt:
      "Avant d'accepter un devis pour des implants ou une couronne, un second regard de spécialiste peut vous éviter des traitements inutiles et vous faire économiser plusieurs centaines d'euros. Découvrez quand et comment solliciter un deuxième avis.",
  },
  {
    title: "Comprendre votre bilan gynécologique",
    date: "28 mars 2025",
    category: "Gynécologie",
    excerpt:
      "Résultats de frottis, échographie pelvienne, bilan hormonal… Les comptes rendus médicaux sont souvent difficiles à déchiffrer. Nos experts gynécologues vous expliquent comment interpréter les termes clés de votre dossier.",
  },
  {
    title: "Second avis médical : vos droits en France",
    date: "5 mars 2025",
    category: "Droits des patients",
    excerpt:
      "La loi Kouchner de 2002 consacre le droit à l'information et au consentement éclairé. Mais saviez-vous que vous avez aussi le droit légal de consulter un autre médecin avant tout acte invasif ? Faisons le point sur vos droits.",
  },
  {
    title: "Comment préparer votre dossier médical",
    date: "18 février 2025",
    category: "Conseils pratiques",
    excerpt:
      "Un second avis de qualité repose sur des documents complets. Ordonnances, radios, résultats d'analyse, comptes rendus d'opération : voici la liste exhaustive des pièces à rassembler pour obtenir une réponse précise et rapide.",
  },
];

const categoryColors: Record<string, string> = {
  Dentaire: "bg-blue-50 text-[#0071E3]",
  Gynécologie: "bg-pink-50 text-pink-600",
  "Droits des patients": "bg-green-50 text-green-600",
  "Conseils pratiques": "bg-orange-50 text-orange-600",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F4F3F8" }}>
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
            Blog
          </p>
          <h1 className="text-4xl font-bold text-[#1D1D1F] mb-4">
            Ressources &amp; conseils médicaux
          </h1>
          <p className="text-lg text-[#6E6E73] max-w-2xl">
            Des articles rédigés par nos médecins experts pour vous aider à mieux comprendre votre
            santé et à prendre des décisions éclairées.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article
              key={article.title}
              className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[article.category]}`}
                >
                  {article.category}
                </span>
                <span className="text-xs text-[#6E6E73]">{article.date}</span>
              </div>
              <h2 className="text-lg font-bold text-[#1D1D1F] leading-snug">{article.title}</h2>
              <p className="text-[#6E6E73] text-sm leading-relaxed flex-1">{article.excerpt}</p>
              <span className="text-[#0071E3] text-sm font-medium hover:underline cursor-pointer">
                Lire l&apos;article →
              </span>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
