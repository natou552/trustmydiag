import { Header } from "@/components/header";
import Link from "next/link";

const newsItems = [
  {
    date: "Janvier 2025",
    title: "TrustMyDiag lance son service de second avis gynécologique",
    excerpt:
      "Après le succès de notre offre de second avis dentaire, nous élargissons notre réseau d'experts avec l'intégration de gynécologues-obstétriciens certifiés. Les patients peuvent désormais soumettre leurs dossiers gynécologiques — bilans hormonaux, comptes rendus d'échographie, résultats de frottis — et recevoir un avis indépendant en moins de 48 heures.",
    tag: "Nouveau service",
    tagColor: "bg-blue-50 text-[#0071E3]",
  },
  {
    date: "Novembre 2024",
    title: "TrustMyDiag prend désormais en charge les photos iPhone (HEIC)",
    excerpt:
      "Les patients peuvent désormais envoyer directement leurs clichés dentaires ou médicaux pris sur iPhone, au format HEIC, sans conversion de fichier. Une mise à jour pensée pour simplifier au maximum la démarche : il suffit de photographier son ordonnance, son devis ou son compte rendu et de le déposer en quelques secondes. Le format HEIC rejoint les formats PDF, JPG, PNG et WebP déjà acceptés.",
    tag: "Nouveauté",
    tagColor: "bg-violet-50 text-violet-600",
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #EEF0FB 0%, #F4F3F8 35%, #FDE8E0 65%, #F4F3F8 100%)" }}>
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-[#6E6E73] hover:text-[#1D1D1F] text-sm mb-10 transition-colors"
        >
          ← Retour
        </Link>

        {/* Hero */}
        <div className="mb-14">
          <p className="text-[#0071E3] text-sm font-semibold uppercase tracking-widest mb-3">
            Actualités
          </p>
          <h1 className="text-4xl font-bold text-[#1D1D1F] mb-4">
            Les dernières nouvelles de TrustMyDiag
          </h1>
          <p className="text-lg text-[#6E6E73]">
            Suivez l&apos;évolution de notre service et les annonces importantes.
          </p>
        </div>

        {/* News list */}
        <div className="flex flex-col gap-8">
          {newsItems.map((item) => (
            <article
              key={item.title}
              className="glass-card rounded-2xl p-8 hover:shadow-[0_12px_40px_rgba(139,127,240,0.18)] transition-shadow duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${item.tagColor}`}
                >
                  {item.tag}
                </span>
                <span className="text-sm text-[#6E6E73]">{item.date}</span>
              </div>
              <h2 className="text-xl font-bold text-[#1D1D1F] mb-3 leading-snug">{item.title}</h2>
              <p className="text-[#6E6E73] leading-relaxed text-sm">{item.excerpt}</p>
            </article>
          ))}
        </div>

        {/* Press contact */}
        <div className="mt-14 glass-card rounded-2xl p-8">
          <h2 className="text-lg font-bold text-[#1D1D1F] mb-2">Contact presse</h2>
          <p className="text-sm text-[#6E6E73]">
            Pour toute demande presse ou partenariat, contactez-nous à{" "}
            <a
              href="mailto:contact@trustmydiag.com"
              className="text-[#0071E3] hover:underline"
            >
              contact@trustmydiag.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
