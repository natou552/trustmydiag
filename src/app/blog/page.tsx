import { Metadata } from "next";
import { Header } from "@/components/header";
import Link from "next/link";
import { articles } from "@/lib/blog-articles";

export const metadata: Metadata = {
  title: "Blog — TrustMyDiag",
  description:
    "Articles rédigés par nos médecins experts : second avis dentaire, bilan gynécologique, droits des patients, comment préparer son dossier médical.",
  openGraph: {
    title: "Blog — TrustMyDiag",
    description:
      "Articles rédigés par nos médecins experts : second avis dentaire, bilan gynécologique, droits des patients, comment préparer son dossier médical.",
    url: "https://www.trustmydiag.com/blog",
    siteName: "TrustMyDiag",
    type: "website",
  },
};

const categoryColors: Record<string, string> = {
  Dentaire: "bg-[rgba(139,127,240,0.08)] text-[#8B7FF0]",
  Gynécologie: "bg-[rgba(196,168,212,0.15)] text-[#9B6BB5]",
  "Droits des patients": "bg-green-50 text-green-700",
  "Conseils pratiques": "bg-orange-50 text-orange-700",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center text-sm mb-10 transition-colors" style={{ color: "#8B7FF0" }}>
          ← Retour
        </Link>

        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#8B7FF0" }}>
            Blog
          </p>
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#2D2A3E" }}>
            Ressources &amp; conseils médicaux
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "#6B6880" }}>
            Des articles rédigés par nos médecins experts pour vous aider à mieux comprendre votre
            santé et à prendre des décisions éclairées.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
              <article
                className="h-full flex flex-col gap-4 px-7 py-6 rounded-2xl transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.9)",
                  boxShadow: "0 2px 12px rgba(139,127,240,0.05)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[article.category]}`}>
                    {article.category}
                  </span>
                  <span className="text-xs" style={{ color: "#9B98A8" }}>{article.date}</span>
                </div>

                <h2 className="text-base font-bold leading-snug group-hover:text-[#8B7FF0] transition-colors" style={{ color: "#2D2A3E" }}>
                  {article.title}
                </h2>

                <p className="text-sm leading-relaxed flex-1" style={{ color: "#6B6880" }}>
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs" style={{ color: "#9B98A8" }}>{article.readingTime} min de lecture</span>
                  <span className="text-sm font-semibold group-hover:underline" style={{ color: "#8B7FF0" }}>
                    Lire l&apos;article →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
