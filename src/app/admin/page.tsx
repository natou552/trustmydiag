import { requireDoctor } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/header";
import { AdminSearch } from "@/components/admin-search";
import Link from "next/link";
import { FileText, Clock, CheckCircle2, TrendingUp } from "lucide-react";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  await requireDoctor();

  const allRequests = await prisma.request.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  const pendingCount   = allRequests.filter(r => r.status === "PAID" || r.status === "IN_REVIEW").length;
  const completedCount = allRequests.filter(r => r.status === "COMPLETED").length;
  const revenue        = completedCount * 22;

  const statusFilter = searchParams.status;

  const filteredRequests = (() => {
    if (statusFilter === "pending")   return allRequests.filter(r => r.status === "IN_REVIEW" || r.status === "PAID");
    if (statusFilter === "completed") return allRequests.filter(r => r.status === "COMPLETED");
    if (statusFilter === "waiting")   return allRequests.filter(r => r.status === "PENDING_PAYMENT");
    return allRequests;
  })();

  const tabs = [
    { label: "Toutes",                  href: "/admin",                  value: undefined   },
    { label: `À traiter (${pendingCount})`,  href: "/admin?status=pending",   value: "pending"   },
    { label: `Traitées (${completedCount})`, href: "/admin?status=completed", value: "completed" },
    { label: "En attente de paiement",  href: "/admin?status=waiting",   value: "waiting"   },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Titre */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#8B7FF0" }}>
            Espace médecin
          </p>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Interface médecin</h1>
          <p className="text-gray-500 text-sm mt-1">
            {pendingCount} demande{pendingCount !== 1 ? "s" : ""} à traiter · {completedCount} traitée{completedCount !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total demandes", value: allRequests.length,   icon: <FileText className="w-5 h-5" />,     color: "#6B7280" },
            { label: "À traiter",      value: pendingCount,         icon: <Clock className="w-5 h-5" />,        color: "#F97316" },
            { label: "Traitées",       value: completedCount,       icon: <CheckCircle2 className="w-5 h-5" />, color: "#22C55E" },
            { label: "Revenu estimé",  value: `${revenue} €`,       icon: <TrendingUp className="w-5 h-5" />,   color: "#8B7FF0" },
          ].map(stat => (
            <div key={stat.label} className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{stat.label}</span>
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: "#1e3a5f" }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Onglets filtre */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => {
            const isActive = statusFilter === tab.value;
            return (
              <Link key={tab.href} href={tab.href}
                className="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150"
                style={isActive
                  ? { background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", color: "white", boxShadow: "0 2px 8px rgba(139,127,240,0.35)" }
                  : { background: "rgba(255,255,255,0.7)", color: "#6B6880", border: "1px solid rgba(139,127,240,0.18)" }
                }
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Liste avec recherche */}
        <AdminSearch requests={filteredRequests} />

      </div>
    </div>
  );
}
