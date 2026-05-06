import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { DashboardClient } from "@/components/dashboard-client";

export default async function DashboardPage() {
  const session = await requireAuth();

  const requests = await prisma.request.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return <DashboardClient session={session} requests={JSON.parse(JSON.stringify(requests))} />;
}
