import { Header } from "@/components/header";
import Link from "next/link";

const faqs = [
  {
    question: "Comment fonctionne le paiement ?",
    answer:
      "Le paiement s'effectue en ligne de manière sécurisée via Stripe, avant la soumission de votre dossier. Nous acceptons les cartes Visa, Mastercard et American Express. Aucune donnée bancaire n'est stockée sur nos serveurs. Une fois le paiement validé, vous recevez un email de confirmation et pouvez envoyer vos documents.",
  },
  {
    question: "Dans quel délai vais-je recevoir mon avis ?",
    answer:
      "Nos experts s'engagent à vous fournir un rapport complet dans un délai maximal de 48 heures ouvrées après réception de votre dossier complet. Dans la plupart des cas, la réponse est disponible dans les 24 heures. Vous serez notifié par email dès que le rapport est prêt.",
  },
  {
    question: "Quels types de documents puis-je envoyer ?",
    answer:
      "Vous pouvez envoyer tout document médical pertinent : radiographies panoramiques ou dentaires, comptes rendus d'échographie, résultats de prise de sang, ordonnances, devis de traitement, photos intra-buccales, résultats de frottis, bilans hormonaux, etc. Les formats acceptés sont PDF, JPEG, PNG et DICOM. Taille maximale : 50 Mo par dossier.",
  },
  {
    question: "Comment protégez-vous mes données médicales ?",
    answer:
      "Vos données sont chiffrées en transit (TLS 1.3) et au repos (AES-256). Nous respectons scrupuleusement le RGPD et les recommandations de la CNIL. Seul le médecin expert assigné à votre dossier y a accès. Vos données ne sont jamais revendues ni partagées avec des tiers. Vous disposez d'un droit d'accès, de rectification et de suppression à tout moment.",
  },
  {
    question: "Puis-je demander un remboursement ?",
    answer:
      "Si votre dossier n'a pas encore été traité par un expert, vous pouvez demander un remboursement intégral dans les 48 heures suivant votre paiement. Une fois le rapport remis, nous ne procédons pas au remboursement, sauf en cas d'erreur de notre part. Pour toute demande, contactez-nous à trustmydiag@gmail.com.",
  },
  {
    question: "Comment contacter un médecin directement ?",
    answer:
      "TrustMyDiag ne permet pas la communication directe avec les médecins experts afin de préserver leur indépendance et leur objectivité. Si vous avez des questions complémentaires après réception de votre rapport, vous pouvez soumettre une nouvelle demande ou utiliser notre formulaire de contact pour des précisions d'ordre général. En cas d'urgence médicale, contactez le 15 (SAMU).",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen">
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
            Assistance
          </p>
          <h1 className="text-4xl font-bold text-[#1D1D1F] mb-4">
            Centre d&apos;aide &amp; FAQ
          </h1>
          <p className="text-lg text-[#6E6E73]">
            Trouvez rapidement une réponse à vos questions les plus fréquentes.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="glass-card rounded-2xl group overflow-hidden"
            >
              <summary className="flex items-center justify-between px-7 py-5 cursor-pointer list-none font-semibold text-[#1D1D1F] select-none hover:text-[#0071E3] transition-colors">
                <span>{faq.question}</span>
                <span className="ml-4 text-[#6E6E73] group-open:rotate-45 transition-transform duration-200 text-xl leading-none">
                  +
                </span>
              </summary>
              <div className="px-7 pb-6 text-sm text-[#6E6E73] leading-relaxed border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Still need help */}
        <div className="mt-12 glass-card rounded-2xl p-8 text-center">
          <h2 className="text-lg font-bold text-[#1D1D1F] mb-2">
            Vous n&apos;avez pas trouvé votre réponse ?
          </h2>
          <p className="text-sm text-[#6E6E73] mb-5">
            Notre équipe est disponible pour répondre à toutes vos questions.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#0071E3] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0077ED] transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </main>
    </div>
  );
}
