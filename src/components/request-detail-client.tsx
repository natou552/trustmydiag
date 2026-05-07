"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
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

export function RequestDetailClient({ request }: { request: Request }) {
  const { lang } = useLang();
  const tr = t[lang].requestDetail;

  const STATUS_CONFIG: Record<string, { label: string; color: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode }> = {
    PENDING_PAYMENT: { label: tr.status.pendingPayment, color: "outline", icon: <Clock className="h-3.5 w-3.5" /> },
    PAID: { label: tr.status.paid, color: "secondary", icon: <Clock className="h-3.5 w-3.5" /> },
    IN_REVIEW: { label: tr.status.inReview, color: "secondary", icon: <Clock className="h-3.5 w-3.5" /> },
    COMPLETED: { label: tr.status.completed, color: "default", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  };

  const SPECIALTY_LABELS: Record<string, string> = {
    DENTAL: tr.specialty.dental,
    GYNECOLOGY: tr.specialty.gynecology,
  };

  const status = STATUS_CONFIG[request.status] || STATUS_CONFIG.PENDING_PAYMENT;
  const date = new Date(request.createdAt).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

  let urls: string[] = [];
  try { urls = JSON.parse(request.pdfUrl); } catch { urls = [request.pdfUrl]; }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1e3a5f] transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" />
        {tr.back}
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-lg font-bold text-[#1e3a5f]">
                {SPECIALTY_LABELS[request.specialty]}
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">
                {tr.requestLabel}{request.id.slice(-8).toUpperCase()} · {date}
              </p>
            </div>
            <Badge variant={status.color} className="flex items-center gap-1.5 text-xs py-1 px-3">
              {status.icon}
              {status.label}
            </Badge>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{tr.yourMessage}</p>
            {request.message ? (
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{request.message}</p>
            ) : (
              <p className="text-sm text-gray-400 italic">{tr.noMessage}</p>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">{tr.documents}</p>
            <div className="space-y-2">
              {urls.map((url, i) => {
                const isImage = /\.(jpg|jpeg|png|heic|webp)/i.test(url) || url.includes("image");
                return (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#1e3a5f] font-medium hover:underline">
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    {isImage ? `${tr.photo} ${i + 1}` : `${tr.document} ${i + 1}`}
                  </a>
                );
              })}
            </div>
          </div>

          {request.status === "COMPLETED" && request.doctorReply && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{tr.medicalOpinion}</p>
              <div className="bg-[#f0f4f8] rounded-xl p-5 border-l-4 border-[#1e3a5f]">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-[#1e3a5f]" />
                  <span className="text-sm font-semibold text-[#1e3a5f]">{tr.doctorReply}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{request.doctorReply}</p>
              </div>
            </div>
          )}

          {request.status === "PENDING_PAYMENT" && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800">{tr.pendingTitle}</p>
                <p className="text-sm text-amber-700 mt-0.5">{tr.pendingSub}</p>
                <Link href={`/dashboard/new?resume=${request.id}`}>
                  <Button size="sm" className="mt-3 bg-[#1e3a5f] hover:bg-[#162d4a] text-white">
                    {tr.pendingBtn}
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {(request.status === "PAID" || request.status === "IN_REVIEW") && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-800">{tr.reviewTitle}</p>
                <p className="text-sm text-blue-700 mt-0.5">{tr.reviewSub}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
