"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileText, Image as ImageIcon, Send, CheckCircle2, Clock,
  User, Stethoscope, Baby, Calendar, Hash, Mail, AlertCircle,
  ExternalLink, Eye,
} from "lucide-react";
import type { Request, User as PrismaUser } from "@prisma/client";

type RequestWithUser = Request & { user: Pick<PrismaUser, "name" | "email"> };

const SPECIALTY_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  DENTAL:    { label: "Dentaire",    icon: <Stethoscope className="h-4 w-4" />, color: "#3B82F6", bg: "#EFF6FF" },
  GYNECOLOGY:{ label: "Gynécologie", icon: <Baby className="h-4 w-4" />,        color: "#EC4899", bg: "#FDF2F8" },
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  PENDING_PAYMENT: { label: "En attente de paiement", color: "#9CA3AF", bg: "#F9FAFB" },
  PAID:            { label: "Payé — À traiter",        color: "#F97316", bg: "#FFF7ED" },
  IN_REVIEW:       { label: "En cours d'analyse",      color: "#8B7FF0", bg: "#F5F3FF" },
  COMPLETED:       { label: "Avis envoyé",             color: "#22C55E", bg: "#F0FDF4" },
};

const AGE_GROUP_LABELS: Record<string, string> = {
  CHILD:        "Enfant entre 30 mois et 17 ans",
  ADULT_18_65:  "Adulte entre 18 et 65 ans",
  ADULT_66_80:  "Adulte entre 66 et 80 ans",
  ADULT_81_PLUS:"Adulte de plus de 81 ans",
};

/** Parse le message anamnèse en sections lisibles */
function parseMessage(msg: string): { section: string; lines: string[] }[] {
  const sections: { section: string; lines: string[] }[] = [];
  let current: { section: string; lines: string[] } | null = null;

  for (const raw of msg.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("===") && line.endsWith("===")) {
      if (current) sections.push(current);
      current = { section: line.replace(/===/g, "").trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    } else {
      if (!current) current = { section: "Informations", lines: [] };
      current.lines.push(line);
    }
  }
  if (current) sections.push(current);
  return sections;
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)} heure${Math.floor(diff / 3600) > 1 ? "s" : ""}`;
  const days = Math.floor(diff / 86400);
  return `Il y a ${days} jour${days > 1 ? "s" : ""}`;
}

export function AdminRequestDetail({ request: initial }: { request: RequestWithUser }) {
  const router = useRouter();
  const [reply, setReply] = useState(initial.doctorReply || "");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(initial.status === "COMPLETED");
  const [status, setStatus] = useState(initial.status);

  const spec   = SPECIALTY_CONFIG[initial.specialty] ?? SPECIALTY_CONFIG.DENTAL;
  const stCfg  = STATUS_CONFIG[status] ?? STATUS_CONFIG.PAID;
  const parsed = initial.message ? parseMessage(initial.message) : [];

  // Parse les URLs des documents
  let pdfUrls: string[] = [];
  try { pdfUrls = JSON.parse(initial.pdfUrl); } catch { pdfUrls = initial.pdfUrl ? [initial.pdfUrl] : []; }

  // Marquer IN_REVIEW automatiquement si PAID
  useEffect(() => {
    if (initial.status === "PAID") {
      fetch(`/api/requests/${initial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "IN_REVIEW" }),
      }).then(() => setStatus("IN_REVIEW"));
    }
  }, [initial.id, initial.status]);

  async function handleSend() {
    if (!reply.trim()) return;
    setLoading(true);
    const res = await fetch(`/api/requests/${initial.id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    });
    setLoading(false);
    if (res.ok) {
      setSent(true);
      setStatus("COMPLETED");
      router.refresh();
    }
  }

  const isImage = (url: string) => /\.(jpg|jpeg|png|heic|webp)/i.test(url) || url.includes("image");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()}
            className="text-sm text-gray-400 hover:text-[#8B7FF0] transition-colors flex items-center gap-1.5">
            ← Retour
          </button>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-2 font-mono text-sm text-gray-400">
            <Hash className="h-3.5 w-3.5" />
            {initial.id.slice(-8).toUpperCase()}
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
          style={{ background: stCfg.bg, color: stCfg.color }}>
          {status === "COMPLETED" ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
          {stCfg.label}
        </div>
      </div>

      {/* Grille 2 colonnes */}
      <div className="grid lg:grid-cols-[1fr_420px] gap-6 items-start">

        {/* ─── Colonne gauche : dossier patient ─── */}
        <div className="space-y-5">

          {/* Identité patient */}
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Patient</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", color: "white" }}>
                {initial.user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
              <div>
                <p className="font-bold text-[#1e3a5f] text-lg">{initial.user.name}</p>
                <a href={`mailto:${initial.user.email}`}
                  className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#8B7FF0] transition-colors mt-0.5">
                  <Mail className="h-3.5 w-3.5" /> {initial.user.email}
                </a>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl p-3" style={{ background: spec.bg }}>
                <div className="flex items-center gap-2 mb-0.5" style={{ color: spec.color }}>
                  {spec.icon}
                  <span className="text-xs font-semibold uppercase tracking-wide">{spec.label}</span>
                </div>
              </div>
              {initial.ageGroup && (
                <div className="rounded-xl p-3" style={{ background: "rgba(139,127,240,0.06)" }}>
                  <div className="flex items-center gap-2 mb-0.5" style={{ color: "#8B7FF0" }}>
                    <User className="h-3.5 w-3.5" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Âge</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{AGE_GROUP_LABELS[initial.ageGroup]}</p>
                </div>
              )}
              <div className="rounded-xl p-3" style={{ background: "rgba(245,243,255,1)" }}>
                <div className="flex items-center gap-2 mb-1" style={{ color: "#8B7FF0" }}>
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Reçu</span>
                </div>
                <p className="text-xs text-gray-600">{formatDate(initial.createdAt)}</p>
                <p className="text-xs text-gray-400 mt-0.5">{timeAgo(initial.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Anamnèse */}
          {parsed.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Dossier médical</p>
              <div className="space-y-4">
                {parsed.map((sec, i) => (
                  <div key={i}>
                    <p className="text-xs font-bold text-[#8B7FF0] uppercase tracking-wider mb-2">{sec.section}</p>
                    <div className="space-y-1.5">
                      {sec.lines.map((line, j) => {
                        const [label, ...rest] = line.split(" : ");
                        const value = rest.join(" : ");
                        if (!value) return (
                          <p key={j} className="text-sm text-gray-600 italic">{line}</p>
                        );
                        return (
                          <div key={j} className="flex gap-2 text-sm">
                            <span className="text-gray-400 shrink-0">{label} :</span>
                            <span className="text-gray-700 font-medium">{value}</span>
                          </div>
                        );
                      })}
                    </div>
                    {i < parsed.length - 1 && (
                      <div className="mt-4" style={{ height: "1px", background: "rgba(139,127,240,0.08)" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {pdfUrls.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                Documents transmis · {pdfUrls.length} fichier{pdfUrls.length > 1 ? "s" : ""}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {pdfUrls.map((url, i) => {
                  const img = isImage(url);
                  return (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-150 group hover:shadow-md"
                      style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(139,127,240,0.12)" }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: img ? "rgba(236,72,153,0.1)" : "rgba(59,130,246,0.1)" }}>
                        {img
                          ? <ImageIcon className="h-4 w-4" style={{ color: "#EC4899" }} />
                          : <FileText className="h-4 w-4" style={{ color: "#3B82F6" }} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1e3a5f] truncate">
                          {img ? `Photo ${i + 1}` : `Document ${i + 1}`}
                        </p>
                        <p className="text-xs text-gray-400">{img ? "Image" : "PDF"} · Ouvrir</p>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-gray-300 group-hover:text-[#8B7FF0] transition-colors flex-shrink-0" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ─── Colonne droite : réponse médecin ─── */}
        <div className="lg:sticky lg:top-24">
          <div className="glass-card rounded-2xl p-6">

            {sent ? (
              /* Avis envoyé */
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "#DCFCE7" }}>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1e3a5f]">Avis envoyé</p>
                    <p className="text-xs text-gray-400">Le patient a été notifié par email</p>
                  </div>
                </div>
                <div className="rounded-xl p-4 whitespace-pre-wrap text-sm text-gray-700 leading-relaxed"
                  style={{ background: "rgba(139,127,240,0.04)", border: "1px solid rgba(139,127,240,0.10)", minHeight: "120px" }}>
                  {reply || initial.doctorReply}
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  Visible dans l'espace patient · Email envoyé automatiquement
                </p>
              </div>
            ) : (
              /* Éditeur de réponse */
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(139,127,240,0.1)" }}>
                    <Eye className="h-4 w-4" style={{ color: "#8B7FF0" }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1e3a5f]">Votre avis médical</p>
                    <p className="text-xs text-gray-400">Sera envoyé par email + visible dans l'espace patient</p>
                  </div>
                </div>

                <textarea
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  placeholder={`Rédigez votre analyse pour ${initial.user.name}…\n\nStructure suggérée :\n• Lecture du dossier\n• Avis sur le diagnostic / devis\n• Recommandations\n• Conclusion`}
                  rows={16}
                  className="w-full text-sm resize-none focus:outline-none placeholder:text-gray-300 leading-relaxed"
                  style={{
                    background: "rgba(255,255,255,0.7)", border: "1px solid rgba(139,127,240,0.18)",
                    borderRadius: "12px", padding: "14px 16px", color: "#2D2A3E",
                  }}
                  onFocus={e => (e.target.style.border = "1px solid rgba(139,127,240,0.5)")}
                  onBlur={e => (e.target.style.border = "1px solid rgba(139,127,240,0.18)")}
                />

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{reply.length} caractères</span>
                  {reply.length > 0 && reply.length < 100 && (
                    <span className="text-xs text-orange-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Réponse trop courte
                    </span>
                  )}
                </div>

                <button
                  onClick={handleSend}
                  disabled={loading || reply.trim().length < 50}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={loading || reply.trim().length < 50
                    ? { background: "#E5E7EB", color: "#9CA3AF", cursor: "not-allowed" }
                    : { background: "linear-gradient(135deg, #1e3a5f, #2a5f8f)", color: "white", boxShadow: "0 4px 14px rgba(30,58,95,0.3)" }
                  }
                >
                  <Send className="h-4 w-4" />
                  {loading ? "Envoi en cours…" : "Envoyer l'avis au patient"}
                </button>

                <p className="text-xs text-center text-gray-400 mt-3">
                  Minimum 50 caractères · Envoi par email automatique
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
