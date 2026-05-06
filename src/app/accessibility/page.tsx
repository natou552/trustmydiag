import { Header } from "@/components/header";
import Link from "next/link";

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #EEF0FB 0%, #F4F3F8 35%, #FDE8E0 65%, #F4F3F8 100%)" }}>
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-[#6E6E73] hover:text-[#1D1D1F] text-sm mb-10 transition-colors"
        >
          ← Retour
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <p className="text-[#0071E3] text-sm font-semibold uppercase tracking-widest mb-3">
            Accessibilité
          </p>
          <h1 className="text-4xl font-bold text-[#1D1D1F] mb-4">
            Déclaration d&apos;accessibilité
          </h1>
          <p className="text-lg text-[#6E6E73]">
            TrustMyDiag s&apos;engage à rendre sa plateforme accessible à toutes et à tous, quelles
            que soient les capacités ou les technologies utilisées.
          </p>
        </div>

        {/* WCAG Commitment */}
        <div className="bg-[#F5F5F7] rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-[#1D1D1F] mb-4">Notre engagement WCAG</h2>
          <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">
            Nous nous engageons à respecter les recommandations du{" "}
            <strong className="text-[#1D1D1F]">
              Web Content Accessibility Guidelines (WCAG) 2.1, niveau AA
            </strong>
            , publiées par le World Wide Web Consortium (W3C). Ces lignes directrices définissent
            quatre grands principes d&apos;accessibilité numérique :
          </p>
          <ul className="flex flex-col gap-3 text-sm text-[#6E6E73]">
            <li className="flex gap-3">
              <span className="text-[#0071E3] font-bold">Perceptible</span>
              <span>
                Les informations et les composants d&apos;interface sont présentés de manière à
                être perçus par tous les utilisateurs, y compris ceux utilisant des lecteurs
                d&apos;écran.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#0071E3] font-bold">Utilisable</span>
              <span>
                Tous les éléments interactifs sont accessibles au clavier et disposent de zones
                cliquables suffisamment grandes.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#0071E3] font-bold">Compréhensible</span>
              <span>
                Le contenu est rédigé en français clair, avec des libellés de formulaires
                explicites et des messages d&apos;erreur descriptifs.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#0071E3] font-bold">Robuste</span>
              <span>
                Le code HTML est sémantique et compatible avec les technologies d&apos;assistance
                actuelles et futures.
              </span>
            </li>
          </ul>
        </div>

        {/* Measures taken */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-[#1D1D1F] mb-4">Mesures concrètes</h2>
          <ul className="list-disc list-inside flex flex-col gap-2 text-sm text-[#6E6E73]">
            <li>Contraste de couleur supérieur à 4,5:1 pour tout le texte principal</li>
            <li>Navigation complète au clavier (tabulation, touches fléchées)</li>
            <li>Attributs ARIA pour les composants dynamiques</li>
            <li>Textes alternatifs sur toutes les images informatives</li>
            <li>Titres de page et structure sémantique (h1, h2, h3)</li>
            <li>Pas de contenu animé sans option de pause</li>
            <li>Formulaires avec étiquettes associées et gestion des erreurs</li>
          </ul>
        </div>

        {/* Known limitations */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-[#1D1D1F] mb-4">Limitations connues</h2>
          <p className="text-sm text-[#6E6E73] leading-relaxed">
            Certains documents médicaux téléversés au format PDF peuvent ne pas être entièrement
            accessibles si leur source n&apos;est pas structurée. Nous travaillons à améliorer la
            gestion de ces fichiers tiers. Notre objectif est d&apos;atteindre une conformité totale
            WCAG 2.1 AA d&apos;ici fin 2025.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-blue-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[#1D1D1F] mb-3">
            Signaler un problème d&apos;accessibilité
          </h2>
          <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">
            Si vous rencontrez une barrière d&apos;accessibilité sur notre site, nous vous
            encourageons vivement à nous le signaler. Nous nous engageons à traiter votre demande
            dans un délai de 5 jours ouvrés.
          </p>
          <a
            href="mailto:trustmydiag@gmail.com?subject=Problème d'accessibilité"
            className="inline-block bg-[#0071E3] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0077ED] transition-colors"
          >
            Contacter notre équipe
          </a>
        </div>
      </main>
    </div>
  );
}
