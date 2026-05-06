"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { PlusCircle, FileText, Clock, CheckCircle2, Trash2 } from "lucide-react";

const STATUS_LABELS: Record<string, { label: string; color: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode }> = {
  PENDING_PAYMENT: { label: "En attente de paiement", color: "outline", icon: <Clock className="h-3 w-3" /> },
  PAID: { label: "Payé", color: "secondary", icon: <Clock className="h-3 w-3" /> },
  IN_REVIEW: { label: "En cours d'analyse", color: "secondary", icon: <Clock className="h-3 w-3" /> },
  COMPLETED: { label: "Avis reçu", color: "default", icon: <CheckCircle2 className="h-3 w-3" /> },
};

const SPECIALTY_LABELS: Record<string, string> = {
  DENTAL: "Dentaire — Dr Benguigui",
  GYNECOLOGY: "Gynécologie — Dr Benchimol",
};

type Request = {
  id: string;
  specialty: string;
  status: string;
  message: string | null;
  pdfUrl: string;
  doctorReply: string | null;
  createdAt: string;
};

export function DashboardClient({ session, requests: initialRequests }: {
  session: { user: { name?: string | null } };
  requests: Request[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(searchParams.get("payment") === "success");

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      const timer = setTimeout(() => {
        router.refresh();
        setPaymentSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette demande ?")) return;
    setDeleting(id);
    await fetch(`/api/requests/${id}`, { method: "DELETE" });
    setRequests((prev) => prev.filter((r) => r.id !== id));
    setDeleting(null);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10">
        {paymentSuccess && (
          <div className="bg-green-50 border border-green-100 text-green-700 rounded-xl px-5 py-4 mb-6 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">Paiement confirmé ! Votre dossier a été transmis au médecin. Mise à jour en cours…</p>
          </div>
        )}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">Mon espace</h1>
            <p className="text-gray-500 text-sm mt-1">Bonjour, {session.user.name}</p>
          </div>
          <Link href="/dashboard/new">
            <Button className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white gap-2">
              <PlusCircle className="h-4 w-4" />
              Nouvelle demande
            </Button>
          </Link>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Aucune demande pour l'instant</h2>
            <p className="text-gray-400 text-sm mb-6">Envoyez votre premier compte rendu pour obtenir un second avis médical.</p>
            <Link href="/dashboard/new">
              <Button className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white">
                Commencer une demande
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => {
              const status = STATUS_LABELS[req.status] || STATUS_LABELS.PENDING_PAYMENT;
              const canDelete = req.status === "PENDING_PAYMENT";
              return (
                <div key={req.id} className="bg-white rounded-2xl border border-gray-100 hover:shadow-sm transition-shadow">
                  <Link href={`/dashboard/requests/${req.id}`} className="block p-6 pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-semibold text-[#1e3a5f]">
                            {SPECIALTY_LABELS[req.specialty]}
                          </span>
                          <Badge variant={status.color} className="flex items-center gap-1 text-xs">
                            {status.icon}
                            {status.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">
                          Demande #{req.id.slice(-8).toUpperCase()} · {new Date(req.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                        {req.message && (
                          <p className="text-sm text-gray-500 mt-2 truncate">{req.message}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-gray-400 hidden sm:block">Voir le détail →</span>
                      </div>
                    </div>
                  </Link>
                  <div className="px-6 pb-4 flex items-center gap-2">
                    {req.status === "PENDING_PAYMENT" && (
                      <Link href={`/dashboard/new?resume=${req.id}`} onClick={(e) => e.stopPropagation()}>
                        <Button size="sm" variant="outline" className="text-[#1e3a5f] border-[#1e3a5f]">
                          Payer
                        </Button>
                      </Link>
                    )}
                    {req.status === "COMPLETED" && req.pdfUrl && (
                      <a href={req.pdfUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <Button size="sm" variant="outline">Voir le PDF</Button>
                      </a>
                    )}
                    {canDelete && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(req.id)}
                        disabled={deleting === req.id}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
