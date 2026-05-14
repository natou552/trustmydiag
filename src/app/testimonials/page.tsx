import { Metadata } from "next";
import { Header } from "@/components/header";
import Link from "next/link";
import { Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Témoignages — TrustMyDiag",
  description: "Découvrez les témoignages de patients qui ont obtenu un second avis médical avec TrustMyDiag et pris de meilleures décisions de santé.",
  openGraph: {
    title: "Témoignages — TrustMyDiag",
    description: "Découvrez les témoignages de patients qui ont obtenu un second avis médical avec TrustMyDiag et pris de meilleures décisions de santé.",
    url: "https://www.trustmydiag.com/testimonials",
    siteName: "TrustMyDiag",
    type: "website",
  },
};

const testimonials = [
  {
    name: "Sophie M.",
    profession: "Infirmière",
    specialty: "Second avis dentaire",
    quote:
      "J'avais un devis de 1 800 € pour des couronnes céramique. Grâce à TrustMyDiag, j'ai appris que deux des dents citées n'avaient pas besoin d'être traitées immédiatement. J'ai économisé et évité des soins invasifs inutiles.",
  },
  {
    name: "Jean-Pierre D.",
    profession: "Ingénieur",
    specialty: "Second avis dentaire",
    quote:
      "Service rapide et professionnel. Le rapport du médecin expert était très détaillé, avec des explications claires. J'aurais aimé connaître TrustMyDiag bien plus tôt. Je recommande à toute ma famille.",
  },
  {
    name: "Marie L.",
    profession: "Enseignante",
    specialty: "Second avis gynécologique",
    quote:
      "Après une échographie inquiétante, mon médecin suggérait une intervention chirurgicale. L'experte TrustMyDiag a confirmé que la surveillance simple était suffisante. Je me sens beaucoup plus sereine aujourd'hui.",
  },
  {
    name: "Thomas B.",
    profession: "Chef d'entreprise",
    specialty: "Second avis dentaire",
    quote:
      "En moins de 48 heures, j'avais un avis complet et argumenté d'un chirurgien-dentiste expert. Le rapport m'a permis de négocier mon plan de traitement et d'obtenir une prise en charge partielle.",
  },
  {
    name: "Isabelle R.",
    profession: "Pharmacienne",
    specialty: "Second avis gynécologique",
    quote:
      "En tant que professionnelle de santé, j'étais sceptique. Mais la qualité de l'analyse et la rigueur du rapport m'ont convaincue. C'est exactement ce dont les patientes ont besoin pour ne pas rester seules face à un diagnostic.",
  },
  {
    name: "Paul C.",
    profession: "Retraité",
    specialty: "Second avis dentaire",
    quote:
      "Mon dentiste me proposait un implant à 1 500 €. L'expert TrustMyDiag a suggéré une alternative prothétique trois fois moins coûteuse, tout aussi efficace pour mon cas. Un service précieux pour les personnes comme moi.",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen" >
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-[#6E6E73] hover:text-[#1D1D1F] text-sm mb-10 transition-colors"
        >
          ← Retour
        </Link>

        {/* Hero */}
        <div className="mb-14 text-center">
          <p className="text-[#0071E3] text-sm font-semibold uppercase tracking-widest mb-3">
            Témoignages
          </p>
          <h1 className="text-4xl font-bold text-[#1D1D1F] mb-4">
            Ils ont fait confiance à TrustMyDiag
          </h1>
          <p className="text-lg text-[#6E6E73] max-w-xl mx-auto">
            Des patients de tous horizons partagent leur expérience et comment un second avis a
            changé leur parcours de soins.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass-card rounded-2xl p-7 flex flex-col gap-4 hover:shadow-[0_12px_40px_rgba(139,127,240,0.18)] transition-shadow duration-200"
            >
              <StarRating />
              <p className="text-[#1D1D1F] text-sm leading-relaxed flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-bold text-[#1D1D1F] text-sm">{t.name}</p>
                <p className="text-xs text-[#6E6E73]">{t.profession}</p>
                <span className="inline-block mt-2 text-xs font-medium text-[#0071E3] bg-blue-50 px-2 py-0.5 rounded-full">
                  {t.specialty}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center glass-card rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-3">
            Prêt à obtenir votre second avis ?
          </h2>
          <p className="text-[#6E6E73] mb-6">
            Rejoignez des centaines de patients qui ont pris le contrôle de leur santé.
          </p>
          <Link
            href="/register"
            className="inline-block bg-[#0071E3] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0077ED] transition-colors"
          >
            Commencer maintenant
          </Link>
        </div>
      </main>
    </div>
  );
}
