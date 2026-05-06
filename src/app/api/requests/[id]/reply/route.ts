import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendReplyToPatient } from "@/lib/email";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "DOCTOR" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { reply } = await req.json();
  if (!reply) return NextResponse.json({ error: "Missing reply" }, { status: 400 });

  const request = await prisma.request.update({
    where: { id: params.id },
    data: { doctorReply: reply, status: "COMPLETED" },
    include: { user: true },
  });

  await sendReplyToPatient(request.user.email, request.user.name, params.id, reply);

  return NextResponse.json({ success: true });
}
