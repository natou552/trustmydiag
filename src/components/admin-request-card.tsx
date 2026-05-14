"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, AlertCircle, ChevronRight, Stethoscope, Baby } from "lucide-react";
import type { Request, User } from "@prisma/client";

type RequestWithUser = Request & { user: Pick<User, "name" | "email"> };

const SPECIALTY_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  DENTAL:    { label: "Dentaire",    icon: <Stethoscope className="h-3.5 w-3.5" />, color: "#3B82F6" },
  GYNECOLOGY:{ label: "Gynécologie", icon: <Baby className="h-3.5 w-3.5" />,        color: "#EC4899" },
};

const STATUS_CONFIG: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive"; icon: React.ReactNode }> = {
  PENDING_PAYMENT: { label: "En attente paiement", variant: "outline",     icon: <AlertCircle className="h-3 w-3" /> },
  PAID:            { label: "Nouveau",              variant: "secondary",   icon: <Clock className="h-3 w-3" /> },
  IN_REVIEW:       { label: "En cours",             variant: "secondary",   icon: <Clock className="h-3 w-3" /> },
  COMPLETED:       { label: "Traité",               variant: "default",     icon: <CheckCircle2 className="h-3 w-3" /> },
};

const AGE_GROUP_LABELS: Record<string, string> = {
  CHILD:        "Enfant (30 mois – 17 ans)",
  ADULT_18_65:  "Adulte (18 – 65 ans)",
  ADULT_66_80:  "Adulte (66 – 80 ans)",
  ADULT_81_PLUS:"Adulte (81 ans +)",
};

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60)   return "À l'instant";
  if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400)return `Il y a ${Math.floor(diff / 3600)} h`;
  const days = Math.floor(diff / 86400);
  return `Il y a ${days} jour${days > 1 ? "s" : ""}`;
}

export function AdminRequestCard({ request }: { request: RequestWithUser }) {
  const status  = STATUS_CONFIG[request.status]  ?? STATUS_CONFIG.PAID;
  const spec    = SPECIALTY_CONFIG[request.specialty] ?? SPECIALTY_CONFIG.DENTAL;
  const isNew   = request.status === "PAID";
  const initials = request.user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <Link
      href={`/admin/requests/${request.id}`}
      className="block glass-card rounded-2xl p-5 transition-all duration-200 hover:shadow-[0_12px_40px_rgba(139,127,240,0.18)] group"
      style={isNew ? { borderLeft: "3px solid #f97316" } : {}}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", color: "white" }}>
          {initials}
        </div>

        {/* Info principale */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold text-[#1e3a5f] text-sm">{request.user.name}</span>
            <Badge variant={status.variant} className="flex items-center gap-1 text-xs">
              {status.icon} {status.label}
            </Badge>
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: `${spec.color}15`, color: spec.color }}>
              {spec.icon} {spec.label}
            </span>
            {request.ageGroup && (
              <span className="text-xs text-gray-400">{AGE_GROUP_LABELS[request.ageGroup]}</span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>{request.user.email}</span>
            <span>·</span>
            <span>#{request.id.slice(-8).toUpperCase()}</span>
            <span>·</span>
            <span>{timeAgo(request.createdAt)}</span>
          </div>
          {request.message && (
            <p className="text-xs text-gray-500 mt-1.5 line-clamp-1">{request.message.split("\n").find(l => l.startsWith("Motif")) || request.message}</p>
          )}
        </div>

        {/* Flèche */}
        <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0 group-hover:text-[#8B7FF0] transition-colors" />
      </div>
    </Link>
  );
}
