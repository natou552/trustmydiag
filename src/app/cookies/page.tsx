import { Header } from "@/components/header";
import Link from "next/link";

const cookieCategories = [
  {
    name: "Cookies essentiels",
    status: "Toujours actifs",
    statusColor: "text-green-600 bg-green-50",
    description:
      "Ces cookies sont indispensables au bon fonctionnement de la plateforme. Ils gèrent votre session de connexion, la sécurité des formulaires et vos préférences de base. Ils ne peuvent pas être désactivés.",
    examples: [
      { name: "session", purpose: "Maintien de la session utilisateur", duration: "Session" },
      { name: "csrf_token", purpose: "Protection contre les attaques CSRF", duration: "Session" },
      { name: "lang", purpose: "Préférence de langue", duration: "1 an" },
    ],
  },
  {
    name: "Cookies analytiques",
    status: "Désactivés par défaut",
    statusColor: "text-orange-600 bg-orange-50",
    description:
      "Ces cookies nous permettent de mesurer l'audience de notre site et de comprendre comment les visiteurs l'utilisent (pages visitées, temps de navigation, source de trafic). Ils nous aident à améliorer notre service. Aucune donnée personnelle identifiable n'est collectée.",
    examples: [
      { name: "_ga", purpose: "Identifiant Google Analytics", duration: "2 ans" },
      { name: "_gid", purpose: "Session Google Analytics", duration: "24 heures" },
      { name: "_gat", purpose: "Limitation du taux de requêtes", duration: "1 minute" },
    ],
  },
  {
    name: "Cookies marketing",
    status: "Désactivés par défaut",
    statusColor: "text-red-600 bg-red-50",
    description:
      "Ces cookies sont utilisés pour vous présenter des publicités personnalisées en fonction de vos centres d'intérêt, sur notre site ou sur des sites tiers. Ils peuvent également être utilisés pour limiter la fréquence d'affichage des publicités.",
    examples: [
      { name: "_fbp", purpose: "Suivi des conversions Facebook Ads", duration: "3 mois" },
      { name: "ads/ga-audiences", purpose: "Remarketing Google Ads", duration: "Session" },
    ],
  },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-[#6E6E73] hover:text-[#1D1D1F] text-sm mb-10 transition-colors"
        >
          ← Retour
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <p className="text-[#0071E3] text-sm font-semibold uppercase tracking-widest mb-3">
            Légal
          </p>
          <h1 className="text-4xl font-bold text-[#1D1D1F] mb-4">Politique de cookies</h1>
          <p className="text-lg text-[#6E6E73] max-w-2xl">
            TrustMyDiag utilise des cookies pour assurer le bon fonctionnement de sa plateforme,
            améliorer votre expérience et, avec votre consentement, mesurer son audience. Voici une
            vue transparente de ce que nous utilisons.
          </p>
          <p className="text-sm text-[#6E6E73] mt-3">Dernière mise à jour : janvier 2025</p>
        </div>

        {/* What is a cookie */}
        <div className="bg-[#F5F5F7] rounded-2xl p-7 mb-10">
          <h2 className="text-lg font-bold text-[#1D1D1F] mb-3">Qu&apos;est-ce qu&apos;un cookie ?</h2>
          <p className="text-sm text-[#6E6E73] leading-relaxed">
            Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone,
            tablette) lors de la visite d&apos;un site web. Il permet au site de mémoriser des
            informations sur votre visite, comme vos préférences ou votre statut de connexion. Les
            cookies ont une durée de vie limitée et peuvent être supprimés à tout moment depuis les
            paramètres de votre navigateur.
          </p>
        </div>

        {/* Cookie categories */}
        <div className="flex flex-col gap-8">
          {cookieCategories.map((category) => (
            <div
              key={category.name}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
            >
              {/* Category header */}
              <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
                <h2 className="text-lg font-bold text-[#1D1D1F]">{category.name}</h2>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${category.statusColor}`}
                >
                  {category.status}
                </span>
              </div>

              {/* Description */}
              <div className="px-7 py-5">
                <p className="text-sm text-[#6E6E73] leading-relaxed mb-5">
                  {category.description}
                </p>

                {/* Cookie table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#F5F5F7]">
                        <th className="text-left px-4 py-2.5 text-xs font-bold text-[#1D1D1F] rounded-l-lg">
                          Nom du cookie
                        </th>
                        <th className="text-left px-4 py-2.5 text-xs font-bold text-[#1D1D1F]">
                          Finalité
                        </th>
                        <th className="text-left px-4 py-2.5 text-xs font-bold text-[#1D1D1F] rounded-r-lg">
                          Durée
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.examples.map((cookie, i) => (
                        <tr
                          key={cookie.name}
                          className={i % 2 === 0 ? "bg-white" : "bg-[#F5F5F7]/50"}
                        >
                          <td className="px-4 py-3 font-mono text-xs text-[#1D1D1F]">
                            {cookie.name}
                          </td>
                          <td className="px-4 py-3 text-xs text-[#6E6E73]">{cookie.purpose}</td>
                          <td className="px-4 py-3 text-xs text-[#6E6E73]">{cookie.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Manage preferences */}
        <div className="mt-10 bg-[#F5F5F7] rounded-2xl p-8">
          <h2 className="text-lg font-bold text-[#1D1D1F] mb-3">Gérer vos préférences</h2>
          <p className="text-sm text-[#6E6E73] leading-relaxed mb-5">
            Vous pouvez modifier vos préférences de cookies à tout moment en cliquant sur le bouton
            ci-dessous. Vous pouvez également configurer votre navigateur pour refuser tout ou
            partie des cookies. Notez que la désactivation de certains cookies peut affecter votre
            expérience sur le site.
          </p>
          <button className="bg-[#1D1D1F] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-black transition-colors">
            Gérer mes préférences
          </button>
          <p className="text-xs text-[#6E6E73] mt-4">
            Pour en savoir plus sur vos droits, consultez le site de la{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071E3] hover:underline"
            >
              CNIL
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
