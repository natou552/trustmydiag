import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { CheckCircle, FileText, MessageSquare, Shield, Lock, ArrowRight, Star, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2044] via-[#1a3a6e] to-[#1e5fbf] py-24 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white text-sm font-medium px-4 py-2 rounded-full mb-8 border border-white/20">
            <Zap className="h-4 w-4 text-yellow-300" />
            Réponse en 24 à 72h
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Ton second avis<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              médical en ligne
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Envoie ton compte rendu à un spécialiste et reçois une analyse claire, honnête et rapide. Sans rendez-vous, sans attente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-[#1a3a6e] hover:bg-blue-50 px-8 py-6 text-lg font-bold w-full sm:w-auto rounded-2xl shadow-xl gap-2">
                Commencer — 22€
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#how">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg w-full sm:w-auto rounded-2xl backdrop-blur">
                Voir comment ça marche
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center gap-6 text-blue-200 text-sm flex-wrap">
            <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Paiement sécurisé</div>
            <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Conforme RGPD</div>
            <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Médecins certifiés</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: "22€", label: "Prix fixe, sans surprise" },
            { value: "72h", label: "Délai de réponse max" },
            { value: "100%", label: "Sécurisé & confidentiel" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1a3a6e]">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Simple & rapide</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">3 étapes, c'est tout</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="h-7 w-7 text-white" />,
                bg: "bg-blue-500",
                step: "01",
                title: "Envoie ton doc",
                desc: "Dépose ton PDF (bilan, analyse, ordonnance…) et décris ta situation en quelques lignes.",
              },
              {
                icon: <Shield className="h-7 w-7 text-white" />,
                bg: "bg-indigo-500",
                step: "02",
                title: "Paye en sécurité",
                desc: "22€ via Stripe. Ton dossier est transmis immédiatement au bon spécialiste.",
              },
              {
                icon: <MessageSquare className="h-7 w-7 text-white" />,
                bg: "bg-cyan-500",
                step: "03",
                title: "Reçois ton avis",
                desc: "Le médecin t'envoie son analyse complète par email et sur ton espace perso.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center shadow-lg`}>
                    {item.icon}
                  </div>
                  <span className="text-4xl font-black text-gray-100">{item.step}</span>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Nos experts</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Des médecins qui s'engagent</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Dr Robert Benguigui",
                specialty: "Chirurgien-dentiste",
                desc: "Spécialiste en chirurgie orale et dentisterie implantaire. Second avis sur diagnostics, plans de traitement et devis dentaires.",
                tag: "🦷 Dentaire",
                color: "from-blue-500 to-indigo-500",
              },
              {
                name: "Dr Yohan Benchimol",
                specialty: "Gynécologue obstétricien",
                desc: "Expert en gynécologie médicale et obstétrique. Second avis sur diagnostics gynécologiques, suivis de grossesse et traitements.",
                tag: "🌸 Gynécologie",
                color: "from-pink-500 to-rose-400",
              },
            ].map((doc) => (
              <div key={doc.name} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
                <div className={`w-16 h-16 bg-gradient-to-br ${doc.color} rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-5 shadow-lg`}>
                  {doc.name.split(" ")[1][0]}
                </div>
                <div className="inline-block bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                  {doc.tag}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{doc.name}</h3>
                <p className="text-sm font-medium text-blue-600 mb-3">{doc.specialty}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-lg mx-auto text-center">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Tarif</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-10">Un seul prix, tout inclus</h2>
          <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-500 to-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl">
              Le plus populaire
            </div>
            <div className="text-7xl font-black text-[#1a3a6e] mb-1">22€</div>
            <p className="text-gray-400 mb-8">par demande · paiement unique</p>
            <ul className="text-left space-y-4 mb-8">
              {[
                "Analyse complète par un médecin spécialiste",
                "Réponse par email + espace personnel",
                "Délai garanti 24-72h",
                "Paiement 100% sécurisé par Stripe",
                "Données médicales chiffrées",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/register">
              <Button className="w-full bg-gradient-to-r from-[#1a3a6e] to-blue-600 hover:from-[#0f2044] hover:to-blue-700 text-white py-6 text-base rounded-2xl font-bold shadow-lg gap-2">
                Obtenir mon second avis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* RGPD */}
      <section className="py-14 px-4 bg-[#0f2044]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Lock className="h-7 w-7 text-blue-300" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Tes données sont en sécurité</h3>
            <p className="text-blue-300 text-sm">
              TrustMyDiag est 100% conforme au RGPD. Tes documents médicaux sont chiffrés, accessibles uniquement au médecin concerné. Aucune revente de données. Droit à l'effacement garanti.{" "}
              <Link href="/rgpd" className="underline text-white">En savoir plus →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2 font-bold text-gray-700">
            <Shield className="h-4 w-4 text-[#1a3a6e]" />
            TrustMyDiag
          </div>
          <div className="flex gap-6">
            <Link href="/rgpd" className="hover:text-gray-700">Confidentialité</Link>
            <Link href="/rgpd#mentions" className="hover:text-gray-700">Mentions légales</Link>
            <Link href="/login" className="hover:text-gray-700">Connexion</Link>
          </div>
          <p>© {new Date().getFullYear()} TrustMyDiag</p>
        </div>
      </footer>
    </div>
  );
}
