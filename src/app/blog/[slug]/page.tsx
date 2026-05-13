import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { articles, getArticleBySlug } from "@/lib/blog-articles";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.dateISO,
      authors: [article.author],
    },
  };
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  Dentaire: { bg: "rgba(139,127,240,0.08)", text: "#8B7FF0" },
  Gynécologie: { bg: "rgba(196,168,212,0.15)", text: "#9B6BB5" },
  "Droits des patients": { bg: "rgba(72,187,120,0.1)", text: "#276749" },
  "Conseils pratiques": { bg: "rgba(237,137,54,0.1)", text: "#C05621" },
};

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const color = categoryColors[article.category] ?? { bg: "rgba(139,127,240,0.08)", text: "#8B7FF0" };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.dateISO,
    author: { "@type": "Person", name: article.author },
    publisher: {
      "@type": "Organization",
      name: "TrustMyDiag",
      url: "https://www.trustmydiag.com",
    },
    mainEntityOfPage: `https://www.trustmydiag.com/blog/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        <Header />

        <main className="max-w-3xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-10" style={{ color: "#9B98A8" }}>
            <Link href="/" className="hover:underline" style={{ color: "#8B7FF0" }}>Accueil</Link>
            <span>›</span>
            <Link href="/blog" className="hover:underline" style={{ color: "#8B7FF0" }}>Blog</Link>
            <span>›</span>
            <span className="truncate">{article.title}</span>
          </nav>

          {/* Header article */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: color.bg, color: color.text }}
              >
                {article.category}
              </span>
              <span className="text-xs" style={{ color: "#9B98A8" }}>{article.date}</span>
              <span className="text-xs" style={{ color: "#9B98A8" }}>· {article.readingTime} min de lecture</span>
            </div>

            <h1 className="text-3xl font-bold leading-snug mb-6" style={{ color: "#2D2A3E" }}>
              {article.title}
            </h1>

            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(139,127,240,0.12)" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)" }}
              >
                {article.author.split(" ").pop()?.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#2D2A3E" }}>{article.author}</p>
                <p className="text-xs" style={{ color: "#9B98A8" }}>{article.authorRole}</p>
              </div>
            </div>
          </div>

          {/* Article content */}
          <article
            className="rounded-2xl px-8 py-10 space-y-5"
            style={{
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 2px 24px rgba(139,127,240,0.07)",
            }}
          >
            {article.content.map((section, i) => {
              if (section.type === "h2") {
                return (
                  <h2 key={i} className="text-xl font-bold pt-4" style={{ color: "#2D2A3E" }}>
                    {section.text}
                  </h2>
                );
              }
              if (section.type === "h3") {
                return (
                  <h3 key={i} className="text-base font-semibold pt-2" style={{ color: "#2D2A3E" }}>
                    {section.text}
                  </h3>
                );
              }
              if (section.type === "p") {
                return (
                  <p key={i} className="text-sm leading-relaxed" style={{ color: "#4A4760" }}>
                    {section.text}
                  </p>
                );
              }
              if (section.type === "ul") {
                return (
                  <ul key={i} className="space-y-2 pl-1">
                    {section.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm" style={{ color: "#4A4760" }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#8B7FF0" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (section.type === "cta") {
                return (
                  <div key={i} className="pt-6">
                    <div
                      className="rounded-2xl px-7 py-7 text-center"
                      style={{ background: "rgba(139,127,240,0.06)", border: "1px solid rgba(139,127,240,0.15)" }}
                    >
                      <p className="text-sm font-semibold mb-1" style={{ color: "#2D2A3E" }}>
                        Besoin d&apos;un avis médical expert ?
                      </p>
                      <p className="text-sm mb-5" style={{ color: "#6B6880" }}>
                        Nos médecins analysent votre dossier et vous répondent en moins de 48h.
                      </p>
                      <Link href="/#order">
                        <button
                          className="text-sm font-semibold text-white px-7 py-3 rounded-full"
                          style={{ background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", boxShadow: "0 4px 14px rgba(139,127,240,0.35)" }}
                        >
                          {section.text}
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </article>

          {/* Back link */}
          <div className="mt-10">
            <Link href="/blog" className="text-sm font-medium" style={{ color: "#8B7FF0" }}>
              ← Retour aux articles
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
