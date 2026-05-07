import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { RequestDetailClient } from "@/components/request-detail-client";

export default async function RequestDetailPage({ params }: { params: { id: string } }) {
  const session = await requireAuth();

  const request = await prisma.request.findUnique({
    where: { id: params.id },
  });

  if (!request || request.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />
      <RequestDetailClient request={{
        id: request.id,
        specialty: request.specialty,
        status: request.status,
        message: request.message,
        pdfUrl: request.pdfUrl,
        doctorReply: request.doctorReply,
        createdAt: request.createdAt.toISOString(),
      }} />
    </div>
  );
}
