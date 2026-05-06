import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import {
  CheckCircle,
  FileText,
  MessageSquare,
  Shield,
  Lock,
  ArrowRight,
  Clock,
  Upload,
  CreditCard,
  Stethoscope,
  Eye,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const marqueeItems = [
    "RGPD Conforme",
    "SSL / TLS",
    "Stripe Certified",
    "Hébergement EU",
    "Médecins Diplômés",
    "Données Chiffrées",
    "Paiement Sécurisé",
    "Réponse 72h Garantie",
    "RGPD Conforme",
    "SSL / TLS",
    "Stripe Certified",
    "Hébergement EU",
    "Médecins Diplômés",
    "Données Chiffrées",
    "Paiement Sécurisé",
    "Réponse 72h Garantie",
  ];

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F]">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner { animation: marquee 28s linear infinite; }
        .marquee-inner:hover { animation-play-state: paused; }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-28 px-4 bg-white">
        {/* Very soft mesh gradient — Apple style */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-blue-100/70 blur-[100px]" />
          <div className="absolute top-32 right-1/4 w-[300px] h-[300px] rounded-full bg-violet-100/40 blur-[80px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <BadgeCheck className="h-3.5 w-3.5" />
            Médecins spécialistes diplômés · Réponse garantie 72h
          </div>

          {/* H1 */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#1D1D1F] leading-[1.05] tracking-tight mb-6">
            Le second avis médical{" "}
            <span className="text-[#0071E3]">que vous méritez.</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl text-[#6E6E73] max-w-2xl mx-auto leading-relaxed mb-10">
            Déposez votre compte rendu médical. Un spécialiste diplômé analyse votre dossier et vous répond en 72h. En ligne, confidentiel, pour 22€.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-[#0071E3] hover:bg-[#0077ED] text-white px-8 py-6 text-base font-semibold rounded-full gap-2 w-full sm:w-auto shadow-md shadow-blue-200 transition-all duration-200"
              >
                Obtenir mon second avis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#how">
              <Button
                size="lg"
                variant="outline"
                className="border-[#D2D2D7] text-[#1D1D1F] hover:bg-[#F5F5F7] px-8 py-6 text-base font-semibold rounded-full w-full sm:w-auto transition-all duration-200"
              >
                Comment ça marche
              </Button>
            </Link>
          </div>

          {/* Micro-trust */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-[#6E6E73]">
            {[
              { icon: <Lock className="h-3.5 w-3.5 text-[#34C759]" />, label: "100% confidentiel" },
              { icon: <Clock className="h-3.5 w-3.5 text-[#0071E3]" />, label: "Réponse sous 72h" },
              { icon: <Shield className="h-3.5 w-3.5 text-[#6E6E73]" />, label: "Conforme RGPD" },
            ].map((i) => (
              <span key={i.label} className="flex items-center gap-1.5">
                {i.icon}{i.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-y border-[#D2D2D7]/60 bg-[#F5F5F7] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="marquee-inner flex gap-10 items-center">
            {marqueeItems.map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-sm text-[#6E6E73] flex-shrink-0">
                <span className="w-1 h-1 rounded-full bg-[#0071E3] flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "22€", label: "Prix unique", sub: "Sans abonnement" },
            { value: "72h", label: "Délai maximum", sub: "Souvent moins" },
            { value: "100%", label: "Confidentiel", sub: "Données chiffrées" },
            { value: "2", label: "Spécialistes", sub: "Dentaire & Gynéco" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-5xl font-black text-[#1D1D1F] mb-1">{s.value}</div>
              <div className="text-sm font-semibold text-[#1D1D1F]">{s.label}</div>
              <div className="text-xs text-[#6E6E73] mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-24 px-4 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0071E3] font-semibold text-xs uppercase tracking-widest mb-3">Pourquoi TrustMyDiag</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1D1D1F] leading-tight">
              Un second avis pour<br />chaque situation.
            </h2>
            <p className="text-[#6E6E73] text-lg mt-4 max-w-xl mx-auto">
              Doute sur un diagnostic ? Devis excessif ? Vous avez le droit à une deuxième opinion médicale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: <Stethoscope className="h-5 w-5 text-[#0071E3]" />,
                title: "Médecins diplômés",
                desc: "Chaque avis est rendu par un spécialiste en exercice. Jamais une IA, toujours un humain qualifié.",
              },
              {
                icon: <Clock className="h-5 w-5 text-[#0071E3]" />,
                title: "Réponse en 72h",
                desc: "Fini les mois d'attente. Votre analyse arrive dans les 72 heures suivant votre paiement.",
              },
              {
                icon: <Lock className="h-5 w-5 text-[#0071E3]" />,
                title: "Données protégées",
                desc: "Chiffrement bout en bout, conforme RGPD. Seul le médecin concerné accède à votre dossier.",
              },
              {
                icon: <Eye className="h-5 w-5 text-[#0071E3]" />,
                title: "Analyse complète",
                desc: "Une analyse détaillée avec explications claires, pas un simple résumé en trois lignes.",
              },
              {
                icon: <CreditCard className="h-5 w-5 text-[#0071E3]" />,
                title: "22€, c'est tout",
                desc: "Paiement unique. Pas d'abonnement, pas de frais cachés. Vous payez une fois.",
              },
              {
                icon: <FileText className="h-5 w-5 text-[#0071E3]" />,
                title: "Espace personnel",
                desc: "Retrouvez votre avis à tout moment dans votre espace patient. Téléchargeable en PDF.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-7 border border-[#D2D2D7]/50 hover:border-[#0071E3]/30 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#1D1D1F] mb-2">{item.title}</h3>
                <p className="text-[#6E6E73] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0071E3] font-semibold text-xs uppercase tracking-widest mb-3">En 3 étapes</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1D1D1F]">Simple. Rapide. Fiable.</h2>
            <p className="text-[#6E6E73] text-lg mt-4 max-w-lg mx-auto">
              De l'envoi de votre document à la réception de l'avis médical, tout se passe en ligne.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {[
              {
                icon: <Upload className="h-6 w-6 text-white" />,
                step: "01",
                title: "Déposez votre document",
                desc: "Téléversez votre PDF (bilan, ordonnance, compte rendu) et décrivez votre situation.",
                bg: "bg-[#0071E3]",
              },
              {
                icon: <CreditCard className="h-6 w-6 text-white" />,
                step: "02",
                title: "Payez en sécurité",
                desc: "22€ via Stripe. Votre dossier est instantanément transmis au médecin spécialiste.",
                bg: "bg-[#5E5CE6]",
              },
              {
                icon: <MessageSquare className="h-6 w-6 text-white" />,
                step: "03",
                title: "Recevez votre avis",
                desc: "Le médecin vous envoie son analyse détaillée par email et dans votre espace personnel.",
                bg: "bg-[#34C759]",
              },
            ].map((item, i) => (
              <div key={item.step} className="relative flex flex-col">
                {/* Connector arrow */}
                {i < 2 && (
                  <div className="hidden md:flex absolute -right-3 top-8 z-10 w-6 items-center justify-center">
                    <ChevronRight className="h-4 w-4 text-[#D2D2D7]" />
                  </div>
                )}
                <div className="bg-[#F5F5F7] rounded-2xl p-8 flex-1 border border-[#D2D2D7]/40 hover:border-[#D2D2D7] hover:shadow-sm transition-all duration-200">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center shadow-sm`}>
                      {item.icon}
                    </div>
                    <span className="text-5xl font-black text-[#D2D2D7] leading-none">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-lg text-[#1D1D1F] mb-2">{item.title}</h3>
                  <p className="text-[#6E6E73] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-[#0071E3] hover:bg-[#0077ED] text-white px-8 py-6 text-base font-semibold rounded-full gap-2 shadow-md shadow-blue-200 transition-all duration-200"
              >
                Commencer maintenant
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section id="doctors" className="py-24 px-4 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0071E3] font-semibold text-xs uppercase tracking-widest mb-3">Nos spécialistes</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1D1D1F]">Des médecins qui s'engagent.</h2>
            <p className="text-[#6E6E73] text-lg mt-4 max-w-xl mx-auto">
              Votre dossier est lu et analysé par un médecin spécialiste en exercice. Pas une IA.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Dr Robert Benguigui",
                specialty: "Chirurgien-dentiste",
                desc: "Spécialiste en chirurgie orale et dentisterie implantaire. Second avis sur diagnostics dentaires, plans de traitement, devis et extractions.",
                tag: "Dentaire",
                initial: "RB",
                headerBg: "bg-gradient-to-br from-[#0071E3] to-[#0051A8]",
                tagBg: "bg-[#0071E3]/10 text-[#0071E3]",
                pillsBg: "bg-blue-50 text-[#0071E3]",
                features: ["Diagnostics dentaires", "Plans de traitement", "Devis & chirurgie"],
              },
              {
                name: "Dr Yohan Benchimol",
                specialty: "Gynécologue obstétricien",
                desc: "Expert en gynécologie médicale et obstétrique. Second avis sur diagnostics gynécologiques, suivis de grossesse et traitements hormonaux.",
                tag: "Gynécologie",
                initial: "YB",
                headerBg: "bg-gradient-to-br from-[#5E5CE6] to-[#3634A3]",
                tagBg: "bg-violet-50 text-violet-700",
                pillsBg: "bg-violet-50 text-violet-700",
                features: ["Diagnostics gynécologiques", "Suivi de grossesse", "Traitements hormonaux"],
              },
            ].map((doc) => (
              <div
                key={doc.name}
                className="bg-white rounded-2xl border border-[#D2D2D7]/50 overflow-hidden hover:shadow-lg transition-all duration-200 group"
              >
                <div className={`${doc.headerBg} p-8`}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white text-lg font-black flex-shrink-0">
                      {doc.initial}
                    </div>
                    <div>
                      <span className="inline-block text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full mb-1.5">
                        {doc.tag}
                      </span>
                      <h3 className="font-bold text-xl text-white">{doc.name}</h3>
                      <p className="text-white/70 text-sm">{doc.specialty}</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-[#6E6E73] text-sm leading-relaxed mb-5">{doc.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {doc.features.map((f) => (
                      <span key={f} className={`text-xs font-medium ${doc.pillsBg} px-3 py-1.5 rounded-full`}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0071E3] font-semibold text-xs uppercase tracking-widest mb-3">Tarif</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1D1D1F]">Un prix. Zéro surprise.</h2>
            <p className="text-[#6E6E73] text-lg mt-4 max-w-lg mx-auto">
              Pas d'abonnement, pas de frais cachés. Vous payez une fois, vous recevez votre avis médical.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#D2D2D7]/60 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Price panel */}
              <div className="bg-gradient-to-br from-[#0071E3] to-[#0051A8] p-10 flex flex-col justify-between">
                <div>
                  <div className="text-8xl font-black leading-none text-white mb-2">22€</div>
                  <p className="text-blue-200 text-base">par demande · paiement unique</p>
                  <p className="text-blue-300/60 text-sm mt-1">Dentaire ou Gynécologie</p>
                </div>
                <Link href="/register" className="mt-8 block">
                  <Button className="bg-white text-[#0071E3] hover:bg-blue-50 w-full py-6 text-base font-bold rounded-full gap-2 transition-all duration-200">
                    Obtenir mon second avis
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              {/* Checklist panel */}
              <div className="p-10">
                <p className="text-xs font-semibold text-[#6E6E73] uppercase tracking-widest mb-6">Ce qui est inclus</p>
                <ul className="space-y-4">
                  {[
                    "Analyse par un médecin spécialiste diplômé",
                    "Réponse détaillée sous 24 à 72h",
                    "Accès à votre avis dans votre espace",
                    "Documents médicaux chiffrés et sécurisés",
                    "Paiement sécurisé par Stripe",
                    "Conforme au RGPD",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#1D1D1F]">
                      <CheckCircle className="h-4 w-4 text-[#34C759] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RGPD ── */}
      <section className="py-16 px-4 bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#D2D2D7]/50 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Lock className="h-6 w-6 text-[#0071E3]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-bold text-lg text-[#1D1D1F] mb-2">Vos données médicales sont protégées</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                TrustMyDiag est conforme au RGPD. Vos documents sont chiffrés et accessibles uniquement au médecin concerné. Aucune revente de données. Droit à l'effacement garanti.{" "}
                <Link href="/rgpd" className="text-[#0071E3] hover:underline font-medium">
                  En savoir plus →
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 flex-shrink-0">
              {["RGPD", "SSL/TLS", "Stripe", "EU"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 bg-[#F5F5F7] border border-[#D2D2D7]/60 rounded-lg px-3 py-2 text-xs text-[#6E6E73]">
                  <CheckCircle className="h-3 w-3 text-[#34C759] flex-shrink-0" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── (seule section sombre, style Apple "think different") */}
      <section className="py-28 px-4 bg-[#1D1D1F]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#6E6E73] font-semibold text-xs uppercase tracking-widest mb-4">Prêt à commencer ?</p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
            Un second avis médical,<br />maintenant.
          </h2>
          <p className="text-[#6E6E73] text-lg mb-10 max-w-lg mx-auto">
            En quelques minutes, votre dossier est entre les mains d'un spécialiste diplômé.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-[#0071E3] hover:bg-[#0077ED] text-white px-10 py-6 text-base font-bold rounded-full gap-2 shadow-lg shadow-blue-500/30 transition-all duration-200"
            >
              Commencer — 22€
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="text-[#6E6E73] text-xs mt-4">Paiement sécurisé par Stripe · Conforme RGPD</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#F5F5F7] border-t border-[#D2D2D7]/60 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#6E6E73]">
          <div className="flex items-center gap-2 font-bold text-[#1D1D1F]">
            <Shield className="h-4 w-4 text-[#0071E3]" />
            TrustMyDiag
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/rgpd" className="hover:text-[#1D1D1F] transition-colors">Confidentialité</Link>
            <Link href="/rgpd#mentions" className="hover:text-[#1D1D1F] transition-colors">Mentions légales</Link>
            <Link href="#doctors" className="hover:text-[#1D1D1F] transition-colors">Nos médecins</Link>
            <Link href="#pricing" className="hover:text-[#1D1D1F] transition-colors">Tarif</Link>
            <Link href="/login" className="hover:text-[#1D1D1F] transition-colors">Connexion</Link>
          </div>
          <p>© {new Date().getFullYear()} TrustMyDiag</p>
        </div>
      </footer>
    </div>
  );
}
