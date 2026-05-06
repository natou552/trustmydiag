import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const request = await prisma.request.findUnique({
    where: { id: params.id },
  });

  if (!request || request.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (request.status === "IN_REVIEW" || request.status === "COMPLETED") {
    return NextResponse.json({ error: "Cannot delete a paid request" }, { status: 403 });
  }

  await prisma.request.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
