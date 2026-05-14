import { requireDoctor } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/header";
import { AdminRequestDetail } from "@/components/admin-request-detail";
import { notFound } from "next/navigation";

export default async function AdminRequestPage({ params }: { params: { id: string } }) {
  await requireDoctor();

  const request = await prisma.request.findUnique({
    where: { id: params.id },
    include: { user: { select: { name: true, email: true } } },
  });

  if (!request) notFound();

  return (
    <div className="min-h-screen">
      <Header />
      <AdminRequestDetail request={request} />
    </div>
  );
}
