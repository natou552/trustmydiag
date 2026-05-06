import { Header } from "@/components/header";
import Link from "next/link";

const sections = [
  {
    id: "objet",
    title: "1. Objet",
    content: `Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation de la plateforme TrustMyDiag, accessible à l'adresse trustmydiag.com, ainsi que les droits et obligations respectifs de la société TrustMyDiag et de ses utilisateurs.

TrustMyDiag est une plateforme de mise en relation entre des patients et des médecins experts indépendants, permettant l'obtention d'un second avis médical dans les spécialités de la chirurgie dentaire et de la gynécologie-obstétrique. Les avis rendus sont des opinions médicales indépendantes et ne constituent pas un diagnostic médical légal, ni une prescription.`,
  },
  {
    id: "acces",
    title: "2. Accès au service",
    content: `L'accès à la plateforme TrustMyDiag est ouvert à toute personne physique majeure (18 ans et plus) résidant en France. La création d'un compte est obligatoire pour soumettre un dossier et recevoir un second avis.

L'utilisateur s'engage à fournir des informations exactes et complètes lors de son inscription et à maintenir ces informations à jour. L'utilisation d'une fausse identité ou la transmission de documents falsifiés est strictement interdite et peut faire l'objet de poursuites judiciaires.

TrustMyDiag se réserve le droit de suspendre ou de supprimer tout compte ne respectant pas ces conditions, sans préavis ni indemnité.`,
  },
  {
    id: "responsabilites",
    title: "3. Responsabilités",
    content: `TrustMyDiag agit en qualité d'intermédiaire de mise en relation et ne saurait être tenu responsable des avis médicaux émis par les experts, ceux-ci étant entièrement indépendants dans leur pratique.

Les avis médicaux fournis via la plateforme constituent des opinions professionnelles basées sur les documents transmis par l'utilisateur. Ils ne remplacent pas une consultation médicale en présentiel et ne peuvent servir de base à un acte de soins sans intervention directe d'un professionnel de santé.

En cas d'urgence médicale, l'utilisateur est invité à contacter immédiatement les services d'urgence (15, 18 ou 112).`,
  },
  {
    id: "donnees",
    title: "4. Données personnelles",
    content: `TrustMyDiag traite les données personnelles de ses utilisateurs conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés modifiée.

Les données médicales transmises sont classifiées comme données de santé à caractère sensible et bénéficient d'une protection renforcée. Elles sont chiffrées, accessibles uniquement aux médecins experts assignés à votre dossier, et ne sont jamais partagées à des fins commerciales.

Vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données. Pour exercer ces droits, contactez notre délégué à la protection des données à l'adresse trustmydiag@gmail.com.`,
  },
  {
    id: "propriete",
    title: "5. Propriété intellectuelle",
    content: `L'ensemble des éléments constituant la plateforme TrustMyDiag — notamment les textes, graphismes, logos, icônes, interface utilisateur, logiciels et bases de données — est la propriété exclusive de la société TrustMyDiag et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.

Toute reproduction, représentation, modification, publication, adaptation ou exploitation de tout ou partie de ces éléments, quel que soit le moyen ou le procédé utilisé, est interdite sauf autorisation écrite préalable de TrustMyDiag.`,
  },
  {
    id: "droit",
    title: "6. Droit applicable",
    content: `Les présentes CGU sont soumises au droit français. En cas de litige relatif à l'interprétation ou à l'exécution des présentes conditions, les parties s'efforceront de trouver une solution amiable. À défaut d'accord amiable, le litige sera soumis à la compétence exclusive des tribunaux du ressort de Paris.

Conformément à l'article L.612-1 du Code de la consommation, l'utilisateur a le droit de recourir gratuitement à un médiateur de la consommation en cas de litige non résolu avec TrustMyDiag dans un délai raisonnable.

Dernière mise à jour : janvier 2025.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F4F3F8" }}>
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
            Légal
          </p>
          <h1 className="text-4xl font-bold text-[#1D1D1F] mb-4">
            Conditions générales d&apos;utilisation
          </h1>
          <p className="text-[#6E6E73]">Dernière mise à jour : janvier 2025</p>
        </div>

        {/* Table of contents */}
        <nav className="bg-[#F5F5F7] rounded-2xl p-6 mb-12">
          <h2 className="text-sm font-bold text-[#1D1D1F] uppercase tracking-wider mb-3">
            Sommaire
          </h2>
          <ul className="flex flex-col gap-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-[#0071E3] hover:underline"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="text-xl font-bold text-[#1D1D1F] mb-4">{s.title}</h2>
              <div className="text-sm text-[#6E6E73] leading-relaxed whitespace-pre-line">
                {s.content}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
