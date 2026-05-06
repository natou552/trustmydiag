import { requireDoctor } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/header";
import { AdminRequestCard } from "@/components/admin-request-card";
import { Badge } from "@/components/ui/badge";

const STATUS_LABELS: Record<string, string> = {
  PENDING_PAYMENT: "En attente de paiement",
  PAID: "Payé",
  IN_REVIEW: "En cours d'analyse",
  COMPLETED: "Traité",
};

export default async function AdminPage() {
  await requireDoctor();

  const requests = await prisma.request.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  const pending = requests.filter((r) => r.status === "IN_REVIEW");
  const completed = requests.filter((r) => r.status === "COMPLETED");

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Interface médecin</h1>
          <p className="text-gray-500 text-sm mt-1">
            {pending.length} demande{pending.length !== 1 ? "s" : ""} en attente · {completed.length} traitée{completed.length !== 1 ? "s" : ""}
          </p>
        </div>

        {pending.length > 0 && (
          <section className="mb-10">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              À traiter ({pending.length})
            </h2>
            <div className="space-y-4">
              {pending.map((req) => (
                <AdminRequestCard key={req.id} request={req} />
              ))}
            </div>
          </section>
        )}

        {completed.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Traitées ({completed.length})
            </h2>
            <div className="space-y-4">
              {completed.map((req) => (
                <AdminRequestCard key={req.id} request={req} />
              ))}
            </div>
          </section>
        )}

        {requests.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <p className="text-gray-400">Aucune demande pour l'instant.</p>
          </div>
        )}
      </div>
    </div>
  );
}
