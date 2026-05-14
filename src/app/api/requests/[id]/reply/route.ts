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
  if (typeof reply !== "string" || reply.trim().length < 10) {
    return NextResponse.json({ error: "Reply too short" }, { status: 400 });
  }
  if (reply.length > 8000) {
    return NextResponse.json({ error: "Reply too long" }, { status: 400 });
  }

  const request = await prisma.request.update({
    where: { id: params.id },
    data: { doctorReply: reply, status: "COMPLETED" },
    include: { user: true },
  });

  await sendReplyToPatient(request.user.email, request.user.name, params.id, reply);

  return NextResponse.json({ success: true });
}
