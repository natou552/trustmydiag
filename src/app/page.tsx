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
  Users,
  Globe,
  ChevronRight,
  Star,
  BadgeCheck,
} from "lucide-react";

export default function HomePage() {
  const trustBadges = [
    "RGPD Conforme",
    "SSL / TLS Chiffré",
    "Stripe Certified",
    "Hébergement EU",
    "Médecins Diplômés",
    "Données Médicales Sécurisées",
    "Paiement Sécurisé",
    "Réponse 72h Garantie",
    "RGPD Conforme",
    "SSL / TLS Chiffré",
    "Stripe Certified",
    "Hébergement EU",
    "Médecins Diplômés",
    "Données Médicales Sécurisées",
    "Paiement Sécurisé",
    "Réponse 72h Garantie",
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.2s; }
        .fade-up-3 { animation-delay: 0.3s; }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-32 pb-36 px-4">
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-blue-600/20 blur-[140px]" />
          <div className="absolute top-40 left-1/4 w-[300px] h-[300px] rounded-full bg-violet-600/10 blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="fade-up inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <BadgeCheck className="h-3.5 w-3.5" />
            Second avis médical en ligne · 22€ · Réponse sous 72h
          </div>

          {/* H1 */}
          <h1 className="fade-up fade-up-1 text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.06] tracking-tight mb-6 text-white">
            Faites confiance{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              à un vrai médecin.
            </span>
          </h1>

          {/* Sub */}
          <p className="fade-up fade-up-2 text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-10">
            Déposez votre compte rendu médical et recevez l'analyse d'un spécialiste diplômé en exercice — pas un algorithme. En ligne, confidentiel, en 72h.
          </p>

          {/* CTAs */}
          <div className="fade-up fade-up-3 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-base font-semibold rounded-full gap-2 w-full sm:w-auto transition-all duration-200 shadow-lg shadow-blue-600/25">
                Obtenir mon second avis
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#how">
              <Button size="lg" variant="outline" className="border-white/10 text-white bg-white/5 hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-full w-full sm:w-auto transition-all duration-200">
                Comment ça marche
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-[#94A3B8]">
            {[
              { icon: <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />, label: "Médecins vérifiés" },
              { icon: <Lock className="h-4 w-4 text-green-400" />, label: "100% confidentiel" },
              { icon: <Clock className="h-4 w-4 text-blue-400" />, label: "Réponse garantie 72h" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-y border-white/5 bg-white/[0.02] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="marquee-track flex gap-10 items-center">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-[#94A3B8] opacity-60 flex-shrink-0">
                <CheckCircle className="h-3.5 w-3.5 text-blue-500" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "22€", label: "Prix unique tout inclus", sub: "Sans abonnement" },
            { value: "72h", label: "Délai de réponse max", sub: "Souvent moins" },
            { value: "100%", label: "Confidentiel & chiffré", sub: "Conforme RGPD" },
            { value: "2", label: "Spécialistes partenaires", sub: "Dentaire & Gynéco" },
          ].map((s) => (
            <div key={s.label} className="text-center group">
              <div className="text-5xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                {s.value}
              </div>
              <div className="text-sm font-medium text-white/80 leading-tight mb-0.5">{s.label}</div>
              <div className="text-xs text-[#94A3B8]">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-400 font-semibold text-xs uppercase tracking-widest mb-3">Pourquoi nous choisir</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Un second avis pour<br />chaque situation médicale.
            </h2>
            <p className="text-[#94A3B8] text-lg mt-4 max-w-xl mx-auto leading-relaxed">
              Un doute sur un diagnostic ? Un devis trop élevé ? Vous avez le droit d'avoir un autre regard.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: <Stethoscope className="h-5 w-5 text-blue-400" />,
                title: "Médecins diplômés",
                desc: "Chaque avis est rendu par un spécialiste en exercice. Jamais une IA, toujours un humain qualifié.",
              },
              {
                icon: <Clock className="h-5 w-5 text-blue-400" />,
                title: "Réponse en 72h",
                desc: "Fini les mois d'attente pour un rendez-vous. Votre analyse arrive dans les 72h garanties.",
              },
              {
                icon: <Lock className="h-5 w-5 text-blue-400" />,
                title: "Données protégées",
                desc: "Chiffrement bout en bout, conformité RGPD. Seul le médecin concerné accède à votre dossier.",
              },
              {
                icon: <Eye className="h-5 w-5 text-blue-400" />,
                title: "Analyse détaillée",
                desc: "Pas un résumé en 3 lignes. Une analyse complète avec explications et recommandations concrètes.",
              },
              {
                icon: <CreditCard className="h-5 w-5 text-blue-400" />,
                title: "22€, c'est tout",
                desc: "Paiement unique, sans abonnement, sans frais cachés. Vous payez une fois, vous recevez votre avis.",
              },
              {
                icon: <FileText className="h-5 w-5 text-blue-400" />,
                title: "Espace personnel",
                desc: "Retrouvez votre avis à tout moment dans votre espace patient. Disponible en PDF.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group p-6 rounded-2xl bg-[#111827] border border-white/[0.07] hover:border-blue-500/40 hover:bg-[#131d2e] transition-all duration-200 cursor-default"
              >
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-400 font-semibold text-xs uppercase tracking-widest mb-3">En 3 étapes</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Simple. Rapide. Fiable.</h2>
            <p className="text-[#94A3B8] text-lg mt-4 max-w-lg mx-auto">
              De l'envoi de votre document à la réception de l'avis médical, tout est en ligne.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Upload className="h-6 w-6 text-white" />,
                step: "01",
                title: "Déposez votre document",
                desc: "Téléversez votre PDF (bilan, ordonnance, compte rendu) et décrivez votre situation en quelques mots.",
                color: "bg-blue-600",
                glow: "shadow-blue-600/30",
              },
              {
                icon: <CreditCard className="h-6 w-6 text-white" />,
                step: "02",
                title: "Payez en sécurité",
                desc: "22€ via Stripe. Votre dossier est instantanément transmis au médecin spécialiste.",
                color: "bg-violet-600",
                glow: "shadow-violet-600/30",
              },
              {
                icon: <MessageSquare className="h-6 w-6 text-white" />,
                step: "03",
                title: "Recevez votre avis",
                desc: "Le médecin vous envoie son analyse par email. Elle est aussi disponible dans votre espace.",
                color: "bg-emerald-600",
                glow: "shadow-emerald-600/30",
              },
            ].map((item, i) => (
              <div key={item.step} className="relative bg-[#111827] rounded-2xl p-8 border border-white/[0.07] overflow-hidden group hover:border-white/20 transition-all duration-200">
                {/* Step number watermark */}
                <div className="absolute top-4 right-5 text-8xl font-black text-white/[0.03] leading-none select-none">
                  {item.step}
                </div>
                {/* Connector line (not on last) */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 z-10">
                    <ChevronRight className="h-5 w-5 text-white/20" />
                  </div>
                )}
                <div className={`relative w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-5 shadow-lg ${item.glow}`}>
                  {item.icon}
                </div>
                <h3 className="relative font-semibold text-white text-lg mb-2">{item.title}</h3>
                <p className="relative text-[#94A3B8] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-base font-semibold rounded-full gap-2 shadow-lg shadow-blue-600/25 transition-all duration-200">
                Commencer maintenant
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section id="doctors" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-400 font-semibold text-xs uppercase tracking-widest mb-3">Nos spécialistes</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Des médecins qui s'engagent.</h2>
            <p className="text-[#94A3B8] text-lg mt-4 max-w-xl mx-auto">
              Votre dossier est lu et analysé par un médecin spécialiste en exercice, pas par une IA.
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
                accentFrom: "from-blue-600",
                accentTo: "to-blue-800",
                accentText: "text-blue-400",
                accentBg: "bg-blue-500/10",
                features: ["Diagnostics dentaires", "Plans de traitement", "Devis & chirurgie orale"],
              },
              {
                name: "Dr Yohan Benchimol",
                specialty: "Gynécologue obstétricien",
                desc: "Expert en gynécologie médicale et obstétrique. Second avis sur diagnostics gynécologiques, suivis de grossesse et traitements hormonaux.",
                tag: "Gynécologie",
                initial: "YB",
                accentFrom: "from-violet-600",
                accentTo: "to-violet-800",
                accentText: "text-violet-400",
                accentBg: "bg-violet-500/10",
                features: ["Diagnostics gynécologiques", "Suivi de grossesse", "Traitements hormonaux"],
              },
            ].map((doc) => (
              <div key={doc.name} className="bg-[#111827] rounded-2xl border border-white/[0.07] overflow-hidden hover:border-white/20 transition-all duration-200 group">
                {/* Card top gradient header */}
                <div className={`bg-gradient-to-br ${doc.accentFrom} ${doc.accentTo} p-7`}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white text-lg font-black flex-shrink-0">
                      {doc.initial}
                    </div>
                    <div>
                      <span className="inline-block text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full mb-1.5">
                        {doc.tag}
                      </span>
                      <h3 className="font-bold text-xl text-white leading-tight">{doc.name}</h3>
                      <p className="text-white/60 text-sm">{doc.specialty}</p>
                    </div>
                  </div>
                </div>
                {/* Card body */}
                <div className="p-7">
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-5">{doc.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {doc.features.map((f) => (
                      <span key={f} className={`text-xs font-medium ${doc.accentBg} ${doc.accentText} px-3 py-1.5 rounded-full border border-white/5`}>
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
      <section id="pricing" className="py-24 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-400 font-semibold text-xs uppercase tracking-widest mb-3">Tarif</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Un prix. Zéro surprise.</h2>
            <p className="text-[#94A3B8] text-lg mt-4 max-w-lg mx-auto">
              Pas d'abonnement, pas de frais cachés. Vous payez une fois, vous recevez votre avis.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-[#111827] rounded-3xl border border-white/[0.07] overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Price side */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-900 p-10 flex flex-col justify-between">
                <div>
                  <div className="text-8xl font-black leading-none text-white mb-2">22€</div>
                  <p className="text-blue-200 text-base">par demande · paiement unique</p>
                  <p className="text-blue-300/60 text-sm mt-1">Dental ou Gynécologie</p>
                </div>
                <Link href="/register" className="mt-8 block">
                  <Button className="bg-white text-blue-700 hover:bg-blue-50 w-full py-6 text-base font-bold rounded-full gap-2 transition-all duration-200">
                    Obtenir mon second avis
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              {/* Features side */}
              <div className="p-10">
                <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-5">Ce qui est inclus</p>
                <ul className="space-y-3.5">
                  {[
                    "Analyse par un médecin spécialiste diplômé",
                    "Réponse détaillée sous 24 à 72h",
                    "Accès à votre avis dans votre espace",
                    "Documents médicaux chiffrés et sécurisés",
                    "Paiement sécurisé par Stripe",
                    "Conforme au RGPD",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                      <div className="w-5 h-5 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST / RGPD ── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#111827] rounded-3xl border border-white/[0.07] p-10 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Lock className="h-7 w-7 text-blue-400" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-bold text-xl text-white mb-2">Vos données médicales sont protégées</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">
                  TrustMyDiag est conforme au RGPD. Vos documents sont chiffrés et accessibles uniquement au médecin concerné. Aucune revente de données. Droit à l'effacement garanti.{" "}
                  <Link href="/rgpd" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 font-medium transition-colors">
                    En savoir plus →
                  </Link>
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="grid grid-cols-2 gap-2">
                  {["RGPD", "SSL/TLS", "Stripe", "EU"].map((badge) => (
                    <div key={badge} className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.07] rounded-lg px-3 py-2 text-xs text-[#94A3B8]">
                      <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/30 via-transparent to-violet-700/20" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-blue-400 font-semibold text-xs uppercase tracking-widest mb-4">Prêt à commencer ?</p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
            Un second avis médical,<br />maintenant.
          </h2>
          <p className="text-[#94A3B8] text-lg mb-10 max-w-lg mx-auto">
            En quelques minutes, votre dossier est entre les mains d'un spécialiste.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-6 text-base font-bold rounded-full gap-2 shadow-xl shadow-blue-600/30 transition-all duration-200">
              Commencer — 22€
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="text-[#94A3B8] text-xs mt-4">Paiement sécurisé par Stripe · Remboursé si aucune réponse sous 72h</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#06080f] border-t border-white/[0.05] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-2 font-bold text-white text-lg">
              <Shield className="h-5 w-5 text-blue-400" />
              TrustMyDiag
            </div>
            {/* Links */}
            <div className="flex gap-6 text-sm text-[#94A3B8]">
              <Link href="/rgpd" className="hover:text-white transition-colors">Confidentialité</Link>
              <Link href="/rgpd#mentions" className="hover:text-white transition-colors">Mentions légales</Link>
              <Link href="#doctors" className="hover:text-white transition-colors">Nos médecins</Link>
              <Link href="#pricing" className="hover:text-white transition-colors">Tarif</Link>
              <Link href="/login" className="hover:text-white transition-colors">Connexion</Link>
            </div>
            {/* Copyright */}
            <p className="text-[#94A3B8] text-sm">© {new Date().getFullYear()} TrustMyDiag</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
