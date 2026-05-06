import { Header } from "@/components/header";
import Link from "next/link";

const terms = [
  {
    letter: "A",
    word: "Améloblaste",
    definition:
      "Cellule responsable de la formation de l'émail dentaire. Les améloblastes sont actifs pendant le développement des dents et disparaissent une fois la dent formée, ce qui explique pourquoi l'émail ne se régénère pas naturellement.",
  },
  {
    letter: "C",
    word: "Col utérin (dysplasie du)",
    definition:
      "Modification anormale des cellules du col de l'utérus, souvent détectée lors d'un frottis cervico-vaginal. Classifiée en degrés (CIN1, CIN2, CIN3), elle ne signifie pas forcément un cancer mais nécessite une surveillance ou un traitement selon le stade.",
  },
  {
    letter: "E",
    word: "Endométriose",
    definition:
      "Maladie gynécologique chronique dans laquelle des tissus similaires à la muqueuse utérine (l'endomètre) se développent en dehors de l'utérus, notamment sur les ovaires, les trompes ou le péritoine. Elle peut causer des douleurs pelviennes et des troubles de la fertilité.",
  },
  {
    letter: "F",
    word: "Frottis cervico-vaginal (FCV)",
    definition:
      "Examen de dépistage qui consiste à prélever des cellules du col de l'utérus pour les analyser. Recommandé tous les 3 ans entre 25 et 65 ans, il permet de détecter des lésions précancéreuses ou une infection au papillomavirus humain (HPV).",
  },
  {
    letter: "I",
    word: "Implant dentaire",
    definition:
      "Racine artificielle en titane implantée chirurgicalement dans l'os de la mâchoire pour remplacer une dent manquante. L'implant se soude à l'os par osséo-intégration avant de recevoir une couronne prothétique. La durée de vie moyenne est de 15 à 25 ans.",
  },
  {
    letter: "K",
    word: "Kyste ovarien",
    definition:
      "Poche remplie de liquide qui se forme sur ou dans un ovaire. La plupart sont bénins et disparaissent spontanément. Certains types (dermoides, endométriomes) peuvent nécessiter une surveillance ou une intervention chirurgicale selon leur taille et leur évolution.",
  },
  {
    letter: "P",
    word: "Parodontite",
    definition:
      "Infection bactérienne grave des tissus de soutien de la dent (gencive, os alvéolaire, ligament). Non traitée, elle entraîne un déchaussement progressif et la perte des dents. Elle est liée à une accumulation de plaque dentaire et peut être aggravée par le diabète ou le tabagisme.",
  },
  {
    letter: "S",
    word: "Salpingite",
    definition:
      "Inflammation ou infection des trompes de Fallope, le plus souvent d'origine bactérienne (Chlamydia, gonocoque). Elle peut provoquer des douleurs pelviennes, de la fièvre et, si elle est récurrente ou non traitée, des séquelles sur la fertilité.",
  },
];

const letters = [...new Set(terms.map((t) => t.letter))];

export default function GlossaryPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F4F3F8" }}>
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-[#6E6E73] hover:text-[#1D1D1F] text-sm mb-10 transition-colors"
        >
          ← Retour
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <p className="text-[#0071E3] text-sm font-semibold uppercase tracking-widest mb-3">
            Glossaire
          </p>
          <h1 className="text-4xl font-bold text-[#1D1D1F] mb-4">Glossaire médical</h1>
          <p className="text-lg text-[#6E6E73] max-w-2xl">
            Définitions claires des termes médicaux les plus courants en dentisterie et en
            gynécologie, pour vous aider à mieux comprendre vos diagnostics.
          </p>
        </div>

        {/* A-Z anchor links */}
        <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-gray-100">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-sm font-semibold text-[#1D1D1F] hover:bg-[#0071E3] hover:text-white hover:border-[#0071E3] transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Terms grouped by letter */}
        <div className="flex flex-col gap-10">
          {letters.map((letter) => (
            <div key={letter} id={`letter-${letter}`}>
              <h2 className="text-2xl font-bold text-[#0071E3] mb-4">{letter}</h2>
              <div className="flex flex-col gap-4">
                {terms
                  .filter((t) => t.letter === letter)
                  .map((term) => (
                    <div
                      key={term.word}
                      className="bg-[#F5F5F7] rounded-2xl p-6"
                    >
                      <h3 className="font-bold text-[#1D1D1F] text-base mb-2">{term.word}</h3>
                      <p className="text-sm text-[#6E6E73] leading-relaxed">{term.definition}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-blue-50 rounded-2xl p-7">
          <p className="text-sm text-[#6E6E73]">
            <strong className="text-[#1D1D1F]">Note :</strong> Ces définitions sont fournies à titre
            informatif uniquement. Elles ne remplacent pas un avis médical personnalisé. Si vous
            avez des doutes sur votre diagnostic, consultez un professionnel de santé ou{" "}
            <Link href="/register" className="text-[#0071E3] hover:underline">
              demandez un second avis sur TrustMyDiag
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
