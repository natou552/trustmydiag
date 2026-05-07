import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const STATUS_LABELS: Record<string, { label: string; color: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode }> = {
  PENDING_PAYMENT: { label: "En attente de paiement", color: "outline", icon: <Clock className="h-3.5 w-3.5" /> },
  PAID: { label: "Payé — dossier transmis", color: "secondary", icon: <Clock className="h-3.5 w-3.5" /> },
  IN_REVIEW: { label: "En cours d'analyse", color: "secondary", icon: <Clock className="h-3.5 w-3.5" /> },
  COMPLETED: { label: "Avis reçu", color: "default", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
};

const SPECIALTY_LABELS: Record<string, string> = {
  DENTAL: "Dentaire — Dr Benguigui",
  GYNECOLOGY: "Gynécologie — Dr. xxxxxx xxxx",
};

export default async function RequestDetailPage({ params }: { params: { id: string } }) {
  const session = await requireAuth();

  const request = await prisma.request.findUnique({
    where: { id: params.id },
  });

  if (!request || request.userId !== session.user.id) {
    notFound();
  }

  const status = STATUS_LABELS[request.status] || STATUS_LABELS.PENDING_PAYMENT;
  const date = new Date(request.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-10">

        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1e3a5f] transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Retour à mon espace
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

          {/* Header card */}
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-lg font-bold text-[#1e3a5f]">
                  {SPECIALTY_LABELS[request.specialty]}
                </h1>
                <p className="text-sm text-gray-400 mt-0.5">
                  Demande #{request.id.slice(-8).toUpperCase()} · {date}
                </p>
              </div>
              <Badge variant={status.color} className="flex items-center gap-1.5 text-xs py-1 px-3">
                {status.icon}
                {status.label}
              </Badge>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-6 space-y-6">

            {/* Message patient */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Votre message</p>
              {request.message ? (
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{request.message}</p>
              ) : (
                <p className="text-sm text-gray-400 italic">Aucun message ajouté.</p>
              )}
            </div>

            {/* Fichiers */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Documents transmis</p>
              <div className="space-y-2">
                {(() => {
                  let urls: string[] = [];
                  try { urls = JSON.parse(request.pdfUrl); } catch { urls = [request.pdfUrl]; }
                  return urls.map((url, i) => {
                    const isImage = /\.(jpg|jpeg|png|heic|webp)/i.test(url) || url.includes("image");
                    return (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[#1e3a5f] font-medium hover:underline"
                      >
                        <FileText className="h-4 w-4 flex-shrink-0" />
                        {isImage ? `Photo ${i + 1}` : `Document ${i + 1}`}
                      </a>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Doctor reply */}
            {request.status === "COMPLETED" && request.doctorReply && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Avis médical</p>
                <div className="bg-[#f0f4f8] rounded-xl p-5 border-l-4 border-[#1e3a5f]">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-4 w-4 text-[#1e3a5f]" />
                    <span className="text-sm font-semibold text-[#1e3a5f]">Réponse du médecin</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{request.doctorReply}</p>
                </div>
              </div>
            )}

            {/* Pending payment CTA */}
            {request.status === "PENDING_PAYMENT" && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">Paiement en attente</p>
                  <p className="text-sm text-amber-700 mt-0.5">Votre dossier sera transmis au médecin après confirmation du paiement.</p>
                  <Link href={`/dashboard/new?resume=${request.id}`}>
                    <Button size="sm" className="mt-3 bg-[#1e3a5f] hover:bg-[#162d4a] text-white">
                      Finaliser le paiement
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* In review */}
            {(request.status === "PAID" || request.status === "IN_REVIEW") && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-800">Dossier en cours d'analyse</p>
                  <p className="text-sm text-blue-700 mt-0.5">Le médecin analyse votre compte rendu. Vous recevrez un email dès que l'avis est disponible.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
