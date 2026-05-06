import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { CheckCircle, FileText, MessageSquare, Shield, Star, Lock } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#f0f4f8] to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#e8f0fe] text-[#1e3a5f] text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Shield className="h-4 w-4" />
            Plateforme médicale sécurisée & conforme RGPD
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1e3a5f] leading-tight mb-6">
            Un second avis médical,<br />en toute confiance
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Envoyez votre compte rendu médical à l'un de nos médecins partenaires et recevez une analyse experte dans les plus brefs délais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white px-8 py-6 text-lg w-full sm:w-auto">
                Commencer — 22€
              </Button>
            </Link>
            <Link href="#how">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-[#1e3a5f] text-[#1e3a5f] w-full sm:w-auto">
                Comment ça marche
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1e3a5f] mb-4">Comment ça marche</h2>
          <p className="text-center text-gray-500 mb-14">Trois étapes simples pour obtenir votre second avis</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="h-8 w-8 text-[#1e3a5f]" />,
                step: "1",
                title: "Envoyez votre compte rendu",
                desc: "Déposez votre PDF (bilan, analyse, ordonnance…) et choisissez la spécialité concernée.",
              },
              {
                icon: <Shield className="h-8 w-8 text-[#1e3a5f]" />,
                step: "2",
                title: "Payez en toute sécurité",
                desc: "Réglez 22€ via Stripe. Votre dossier est transmis immédiatement au médecin partenaire.",
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-[#1e3a5f]" />,
                step: "3",
                title: "Recevez l'avis d'un expert",
                desc: "Le médecin analyse votre dossier et vous envoie son avis par email et sur votre espace personnel.",
              },
            ].map((item) => (
              <div key={item.step} className="relative bg-[#f8fafc] rounded-2xl p-8 text-center border border-gray-100 hover:shadow-md transition-shadow">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                <div className="flex justify-center mb-4 mt-2">{item.icon}</div>
                <h3 className="font-semibold text-lg text-[#1e3a5f] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="py-20 px-4 bg-[#f0f4f8]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1e3a5f] mb-4">Nos médecins partenaires</h2>
          <p className="text-center text-gray-500 mb-14">Des spécialistes reconnus, disponibles pour analyser votre dossier</p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Dr Robert Benguigui",
                specialty: "Chirurgien-dentiste",
                desc: "Spécialiste en chirurgie orale et dentisterie implantaire. Second avis sur diagnostics, plans de traitement et devis dentaires.",
                tag: "Dentaire",
              },
              {
                name: "Dr Yohan Benchimol",
                specialty: "Gynécologue obstétricien",
                desc: "Expert en gynécologie médicale et obstétrique. Second avis sur diagnostics gynécologiques, suivis de grossesse et traitements.",
                tag: "Gynécologie",
              },
            ].map((doc) => (
              <div key={doc.name} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {doc.name.split(" ")[1][0]}
                </div>
                <div className="inline-block bg-[#e8f0fe] text-[#1e3a5f] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {doc.tag}
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-1">{doc.name}</h3>
                <p className="text-sm font-medium text-gray-500 mb-3">{doc.specialty}</p>
                <p className="text-gray-600 text-sm">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Un tarif unique et transparent</h2>
          <div className="bg-[#f0f4f8] rounded-2xl p-10 border border-gray-100 mt-8">
            <div className="text-6xl font-bold text-[#1e3a5f] mb-2">22€</div>
            <p className="text-gray-500 mb-8">par demande de second avis</p>
            <ul className="text-left space-y-3 mb-8">
              {[
                "Analyse par un médecin spécialiste",
                "Réponse par email + espace personnel",
                "Délai rapide (24-72h)",
                "Paiement sécurisé par Stripe",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#4CAF82] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/register">
              <Button className="w-full bg-[#1e3a5f] hover:bg-[#162d4a] text-white py-6 text-base">
                Obtenir mon second avis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* RGPD strip */}
      <section className="py-12 px-4 bg-[#1e3a5f]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="flex-shrink-0">
            <Lock className="h-10 w-10 text-[#4CAF82]" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">Vos données sont protégées</h3>
            <p className="text-blue-200 text-sm">
              TrustMyDiag est conforme au RGPD. Vos documents médicaux sont chiffrés et ne sont accessibles qu'au médecin concerné. Aucune revente de données. Droit à l'effacement garanti.{" "}
              <Link href="/rgpd" className="underline text-white">En savoir plus</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2 font-semibold text-[#1e3a5f]">
            <Shield className="h-4 w-4" />
            TrustMyDiag
          </div>
          <div className="flex gap-6">
            <Link href="/rgpd" className="hover:text-[#1e3a5f]">Politique de confidentialité</Link>
            <Link href="/rgpd#mentions" className="hover:text-[#1e3a5f]">Mentions légales</Link>
            <Link href="/login" className="hover:text-[#1e3a5f]">Connexion</Link>
          </div>
          <p>© {new Date().getFullYear()} TrustMyDiag. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
