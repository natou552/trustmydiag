"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { PlusCircle, FileText, Clock, CheckCircle2, Trash2, Lock } from "lucide-react";
import { useLang } from "@/contexts/language";
import { t } from "@/lib/translations";

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
  const { lang } = useLang();
  const tr = t[lang].dashboard;
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(searchParams.get("payment") === "success");

  const STATUS_CONFIG: Record<string, { label: string; color: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode }> = {
    PENDING_PAYMENT: { label: tr.status.pendingPayment, color: "outline", icon: <Clock className="h-3 w-3" /> },
    PAID: { label: tr.status.paid, color: "secondary", icon: <Clock className="h-3 w-3" /> },
    IN_REVIEW: { label: tr.status.inReview, color: "secondary", icon: <Clock className="h-3 w-3" /> },
    COMPLETED: { label: tr.status.completed, color: "default", icon: <CheckCircle2 className="h-3 w-3" /> },
  };

  const SPECIALTY_LABELS: Record<string, string> = {
    DENTAL: tr.specialty.dental,
    GYNECOLOGY: tr.specialty.gynecology,
  };

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
    if (!confirm(tr.deleteConfirm)) return;
    setDeleting(id);
    await fetch(`/api/requests/${id}`, { method: "DELETE" });
    setRequests((prev) => prev.filter((r) => r.id !== id));
    setDeleting(null);
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10">
        {paymentSuccess && (
          <div className="bg-green-50 border border-green-100 text-green-700 rounded-xl px-5 py-4 mb-6 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">{tr.paymentSuccess}</p>
          </div>
        )}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">{tr.title}</h1>
            <p className="text-gray-500 text-sm mt-1">{tr.greeting} {session.user.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/security">
              <Button variant="outline" size="icon" title="Sécurité" className="border-gray-200 text-gray-500 hover:text-[#8B7FF0] hover:border-[#8B7FF0]">
                <Lock className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/new">
              <Button className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white gap-2">
                <PlusCircle className="h-4 w-4" />
                {tr.newRequest}
              </Button>
            </Link>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="glass-card rounded-2xl p-16 text-center">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{tr.emptyTitle}</h2>
            <p className="text-gray-400 text-sm mb-6">{tr.emptySub}</p>
            <Link href="/dashboard/new">
              <Button className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white">
                {tr.startRequest}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => {
              const status = STATUS_CONFIG[req.status] || STATUS_CONFIG.PENDING_PAYMENT;
              const canDelete = req.status === "PENDING_PAYMENT";
              return (
                <div key={req.id} className="glass-card rounded-2xl transition-shadow hover:shadow-[0_12px_40px_rgba(139,127,240,0.18)]">
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
                          {tr.requestLabel}{req.id.slice(-8).toUpperCase()} · {new Date(req.createdAt).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                        {req.message && (
                          <p className="text-sm text-gray-500 mt-2 truncate">{req.message}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-gray-400 hidden sm:block">{tr.seeDetail}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="px-6 pb-4 flex items-center gap-2">
                    {req.status === "PENDING_PAYMENT" && (
                      <Link href={`/dashboard/new?resume=${req.id}`} onClick={(e) => e.stopPropagation()}>
                        <Button size="sm" variant="outline" className="text-[#1e3a5f] border-[#1e3a5f]">
                          {tr.pay}
                        </Button>
                      </Link>
                    )}
                    {req.status === "COMPLETED" && req.pdfUrl && (
                      <a href={req.pdfUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <Button size="sm" variant="outline">{tr.seePdf}</Button>
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
