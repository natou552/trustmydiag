import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PATCH — médecin met à jour le statut (ex. PAID → IN_REVIEW)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "DOCTOR" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { status } = await req.json();
  // Seule transition autorisée via ce endpoint : PAID → IN_REVIEW (ouverture du dossier)
  if (status !== "IN_REVIEW") {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const request = await prisma.request.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json({ success: true, status: request.status });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const request = await prisma.request.findUnique({
    where: { id: params.id },
  });

  if (!request || request.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (["PAID", "IN_REVIEW", "COMPLETED"].includes(request.status)) {
    return NextResponse.json({ error: "Cannot delete a paid request" }, { status: 403 });
  }

  await prisma.request.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
