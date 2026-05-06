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
  Star,
  Upload,
  CreditCard,
  Stethoscope,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero — dark gradient, centered */}
      <section className="relative overflow-hidden bg-[#0a1628] pt-28 pb-32 px-4">
        {/* subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <Clock className="h-3.5 w-3.5" />
            Réponse garantie sous 72h · 22€ tout inclus
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Un second avis médical{" "}
            <span className="text-blue-400">en ligne.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Envoyez votre compte rendu à un médecin spécialiste et recevez une analyse claire, honnête et détaillée. En 72h, depuis chez vous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-base font-semibold rounded-xl gap-2 w-full sm:w-auto">
                Obtenir mon second avis
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#how">
              <Button size="lg" variant="outline" className="border-white/10 text-white bg-white/5 hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-xl w-full sm:w-auto">
                Comment ça marche
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-10 px-4 bg-[#0d1e35] border-b border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "22€", label: "Prix unique, tout inclus" },
            { value: "72h", label: "Délai de réponse maximum" },
            { value: "100%", label: "Confidentiel & chiffré" },
            { value: "2", label: "Spécialistes partenaires" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-black text-white mb-1">{s.value}</div>
              <div className="text-xs text-gray-500 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Pourquoi TrustMyDiag</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Le second avis, c'est votre droit.
            </h2>
            <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
              Un doute sur un diagnostic ? Un devis qui semble excessif ? Vous méritez une deuxième opinion.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Stethoscope className="h-6 w-6 text-blue-600" />,
                title: "Médecins diplômés",
                desc: "Chaque avis est rendu par un médecin spécialiste en exercice, diplômé et expérimenté. Pas un algorithme.",
              },
              {
                icon: <Clock className="h-6 w-6 text-blue-600" />,
                title: "Réponse en 72h max",
                desc: "Fini les mois d'attente pour un rendez-vous. Vous recevez votre analyse dans les 72 heures.",
              },
              {
                icon: <Lock className="h-6 w-6 text-blue-600" />,
                title: "Données protégées",
                desc: "Vos documents médicaux sont chiffrés, conformes au RGPD. Seul le médecin concerné y accède.",
              },
              {
                icon: <Star className="h-6 w-6 text-blue-600" />,
                title: "Prix transparent",
                desc: "22€ par demande, sans abonnement, sans frais cachés. Vous payez une fois, vous recevez votre avis.",
              },
              {
                icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
                title: "Analyse détaillée",
                desc: "Pas un simple résumé. Une analyse complète avec explications claires et recommandations concrètes.",
              },
              {
                icon: <Shield className="h-6 w-6 text-blue-600" />,
                title: "Espace personnel sécurisé",
                desc: "Retrouvez votre avis à tout moment dans votre espace patient. Téléchargeable en PDF.",
              },
            ].map((item) => (
              <div key={item.title} className="group p-7 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all bg-white">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-4 bg-[#f7f9fc]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">En 3 étapes</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Simple. Rapide. Fiable.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Upload className="h-7 w-7 text-white" />,
                step: "01",
                title: "Déposez votre document",
                desc: "Téléversez votre PDF (bilan, ordonnance, compte rendu) et décrivez votre situation en quelques mots.",
                bg: "bg-blue-600",
              },
              {
                icon: <CreditCard className="h-7 w-7 text-white" />,
                step: "02",
                title: "Payez en sécurité",
                desc: "22€ via Stripe, le leader mondial du paiement en ligne. Votre dossier est transmis instantanément.",
                bg: "bg-violet-600",
              },
              {
                icon: <MessageSquare className="h-7 w-7 text-white" />,
                step: "03",
                title: "Recevez votre avis",
                desc: "Le médecin spécialiste vous envoie son analyse par email. Elle est aussi disponible dans votre espace.",
                bg: "bg-emerald-600",
              },
            ].map((item) => (
              <div key={item.step} className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm overflow-hidden">
                <div className="absolute top-5 right-6 text-7xl font-black text-gray-50 select-none leading-none">
                  {item.step}
                </div>
                <div className={`relative w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6`}>
                  {item.icon}
                </div>
                <h3 className="relative font-bold text-lg text-gray-900 mb-3">{item.title}</h3>
                <p className="relative text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold rounded-xl gap-2">
                Commencer maintenant
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Nos spécialistes</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Des médecins qui s'engagent.</h2>
            <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
              Votre dossier est traité par un médecin spécialiste diplômé, pas par une IA.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Dr Robert Benguigui",
                specialty: "Chirurgien-dentiste",
                desc: "Spécialiste en chirurgie orale et dentisterie implantaire. Second avis sur diagnostics dentaires, plans de traitement, devis et extractions.",
                tag: "Dentaire",
                initial: "RB",
                gradient: "from-blue-500 to-blue-700",
                features: ["Diagnostics dentaires", "Plans de traitement", "Devis & chirurgie"],
              },
              {
                name: "Dr Yohan Benchimol",
                specialty: "Gynécologue obstétricien",
                desc: "Expert en gynécologie médicale et obstétrique. Second avis sur diagnostics gynécologiques, suivis de grossesse et traitements hormonaux.",
                tag: "Gynécologie",
                initial: "YB",
                gradient: "from-violet-500 to-violet-700",
                features: ["Diagnostics gynécologiques", "Suivi de grossesse", "Traitements hormonaux"],
              },
            ].map((doc) => (
              <div key={doc.name} className="rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`bg-gradient-to-br ${doc.gradient} p-8`}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-white text-xl font-black">
                      {doc.initial}
                    </div>
                    <div>
                      <div className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-1">
                        {doc.tag}
                      </div>
                      <h3 className="font-bold text-xl text-white leading-tight">{doc.name}</h3>
                      <p className="text-white/70 text-sm">{doc.specialty}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8">
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{doc.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {doc.features.map((f) => (
                      <span key={f} className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
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

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-[#f7f9fc]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Tarif</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Un prix. Zéro surprise.</h2>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 text-white flex flex-col justify-between">
                <div>
                  <div className="text-8xl font-black leading-none mb-3">22€</div>
                  <p className="text-blue-200 text-base">par demande · paiement unique</p>
                </div>
                <Link href="/register" className="mt-8 block">
                  <Button className="bg-white text-blue-700 hover:bg-blue-50 w-full py-6 text-base font-bold rounded-xl gap-2">
                    Obtenir mon second avis
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="p-10">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5">Ce qui est inclus</p>
                <ul className="space-y-4">
                  {[
                    "Analyse par un médecin spécialiste diplômé",
                    "Réponse détaillée sous 24 à 72h",
                    "Accès à votre avis dans votre espace",
                    "Documents médicaux chiffrés et sécurisés",
                    "Paiement sécurisé par Stripe",
                    "Conforme au RGPD",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
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

      {/* Trust / RGPD */}
      <section className="py-16 px-4 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="font-bold text-xl text-white mb-3">Vos données médicales sont protégées</h3>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            TrustMyDiag est conforme au RGPD. Vos documents sont chiffrés et accessibles uniquement au médecin concerné. Aucune revente de données. Droit à l'effacement garanti.{" "}
            <Link href="/rgpd" className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-2">
              En savoir plus
            </Link>
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {["RGPD", "SSL/TLS", "Stripe Certified", "Hébergement EU"].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-gray-500 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Prêt à obtenir votre second avis ?
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Rejoignez les patients qui ont fait confiance à TrustMyDiag.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-base font-bold rounded-xl gap-2">
              Commencer maintenant — 22€
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#06101f] py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-2 font-bold text-white">
            <Shield className="h-5 w-5 text-blue-400" />
            TrustMyDiag
          </div>
          <div className="flex gap-6 text-gray-500">
            <Link href="/rgpd" className="hover:text-gray-300 transition-colors">Confidentialité</Link>
            <Link href="/rgpd#mentions" className="hover:text-gray-300 transition-colors">Mentions légales</Link>
            <Link href="/login" className="hover:text-gray-300 transition-colors">Connexion</Link>
          </div>
          <p className="text-gray-600">© {new Date().getFullYear()} TrustMyDiag</p>
        </div>
      </footer>
    </div>
  );
}
