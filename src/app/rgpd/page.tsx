import Link from "next/link";
import { Header } from "@/components/header";
import { Shield } from "lucide-react";

export default function RGPDPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F4F3F8" }}>
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-[#1e3a5f]" />
          <h1 className="text-3xl font-bold text-[#1e3a5f]">Politique de confidentialité</h1>
        </div>

        <p className="text-sm text-gray-400 mb-10">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>

        <div className="prose prose-gray max-w-none space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f]">1. Responsable du traitement</h2>
            <p className="text-gray-600 mt-3">
              TrustMyDiag est responsable du traitement de vos données personnelles. Pour toute question relative à vos données, vous pouvez nous contacter à l'adresse : <a href="mailto:dpo@trustmydiag.fr" className="text-[#1e3a5f] underline">dpo@trustmydiag.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f]">2. Données collectées</h2>
            <p className="text-gray-600 mt-3">Dans le cadre de l'utilisation de TrustMyDiag, nous collectons :</p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>Vos informations d'identification : nom, prénom, adresse email</li>
              <li>Vos documents médicaux (comptes rendus au format PDF)</li>
              <li>Vos messages adressés aux médecins</li>
              <li>Les informations de paiement (traitées par Stripe — nous ne stockons aucune donnée bancaire)</li>
              <li>Les avis médicaux reçus des médecins partenaires</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f]">3. Finalités du traitement</h2>
            <p className="text-gray-600 mt-3">Vos données sont utilisées exclusivement pour :</p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>La gestion de votre compte et de votre authentification</li>
              <li>La transmission de vos documents médicaux au médecin partenaire concerné</li>
              <li>L'envoi de notifications et de votre avis médical par email</li>
              <li>Le traitement de votre paiement</li>
              <li>La conformité avec nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f]">4. Base légale</h2>
            <p className="text-gray-600 mt-3">
              Le traitement de vos données repose sur votre <strong>consentement explicite</strong> recueilli lors de votre inscription, ainsi que sur l'exécution du contrat de service médical.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f]">5. Durée de conservation</h2>
            <p className="text-gray-600 mt-3">
              Vos données personnelles et vos documents médicaux sont conservés pendant <strong>3 ans</strong> à compter de votre dernière activité sur la plateforme, conformément aux obligations légales applicables aux données de santé.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f]">6. Sécurité des données</h2>
            <p className="text-gray-600 mt-3">
              Vos documents médicaux sont stockés de manière chiffrée. L'accès est strictement limité au médecin concerné par votre demande. Aucun document n'est accessible publiquement (URLs signées temporaires).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f]">7. Partage des données</h2>
            <p className="text-gray-600 mt-3">
              Vos données ne sont <strong>jamais revendues</strong> à des tiers. Elles peuvent être partagées avec :
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>Les médecins partenaires de TrustMyDiag (uniquement pour votre demande)</li>
              <li>Stripe (traitement des paiements)</li>
              <li>Nos prestataires d'hébergement (données chiffrées)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f]">8. Vos droits</h2>
            <p className="text-gray-600 mt-3">Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
              <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
              <li><strong>Droit à l'effacement</strong> : supprimer vos données</li>
              <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition</strong> : vous opposer à certains traitements</li>
            </ul>
            <p className="text-gray-600 mt-3">
              Pour exercer ces droits, contactez-nous à : <a href="mailto:dpo@trustmydiag.fr" className="text-[#1e3a5f] underline">dpo@trustmydiag.fr</a>
            </p>
            <p className="text-gray-600 mt-2">
              Vous pouvez également introduire une réclamation auprès de la <a href="https://www.cnil.fr" className="text-[#1e3a5f] underline" target="_blank" rel="noopener">CNIL</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f]">9. Cookies</h2>
            <p className="text-gray-600 mt-3">
              TrustMyDiag utilise uniquement des cookies essentiels au fonctionnement du service (session d'authentification). Aucun cookie publicitaire ou de tracking tiers n'est utilisé.
            </p>
          </section>

          <section id="mentions">
            <h2 className="text-xl font-semibold text-[#1e3a5f]">10. Mentions légales</h2>
            <p className="text-gray-600 mt-3">
              TrustMyDiag est une plateforme de mise en relation entre patients et médecins partenaires indépendants. Les avis médicaux fournis ne constituent pas une consultation médicale au sens légal et ne remplacent pas un avis médical en présentiel. L'utilisation de la plateforme est soumise aux <Link href="/cgv" className="text-[#1e3a5f] underline">Conditions Générales de Vente</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
