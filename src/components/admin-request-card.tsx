"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, ChevronDown, ChevronUp, Send } from "lucide-react";
import type { Request, User } from "@prisma/client";

type RequestWithUser = Request & { user: Pick<User, "name" | "email"> };

const SPECIALTY_LABELS: Record<string, string> = {
  DENTAL: "Dentaire",
  GYNECOLOGY: "Gynécologie",
};

export function AdminRequestCard({ request }: { request: RequestWithUser }) {
  const [expanded, setExpanded] = useState(request.status === "IN_REVIEW");
  const [reply, setReply] = useState(request.doctorReply || "");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(request.status === "COMPLETED");

  async function handleSendReply() {
    if (!reply.trim()) return;
    setLoading(true);
    await fetch(`/api/requests/${request.id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    });
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left flex items-center justify-between gap-4"
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <span className="font-semibold text-[#1e3a5f]">{request.user.name}</span>
              <Badge variant={sent ? "default" : "secondary"} className="text-xs">
                {sent ? "Traité" : "En attente d'avis"}
              </Badge>
              <Badge variant="outline" className="text-xs">{SPECIALTY_LABELS[request.specialty]}</Badge>
            </div>
            <p className="text-sm text-gray-400">
              {request.user.email} · #{request.id.slice(-8).toUpperCase()} · {new Date(request.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </div>
        </div>
        {expanded ? <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />}
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-gray-50 pt-4 space-y-4">
          {request.message && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Message du patient</p>
              <p className="text-sm text-gray-700 bg-[#f8fafc] rounded-lg p-4">{request.message}</p>
            </div>
          )}

          <div>
            <a href={request.pdfUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Ouvrir le compte rendu (PDF)
              </Button>
            </a>
          </div>

          {!sent && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Votre avis médical</p>
              <Textarea
                placeholder="Rédigez votre analyse et vos recommandations ici…"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <div className="mt-3 flex justify-end">
                <Button
                  onClick={handleSendReply}
                  disabled={loading || !reply.trim()}
                  className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white gap-2"
                >
                  <Send className="h-4 w-4" />
                  {loading ? "Envoi…" : "Envoyer l'avis"}
                </Button>
              </div>
            </div>
          )}

          {sent && request.doctorReply && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Avis envoyé</p>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-sm text-gray-700">{request.doctorReply}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
