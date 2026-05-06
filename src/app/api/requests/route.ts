import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { specialty, pdfUrl, pdfKey, message } = await req.json();

  if (!specialty || !pdfUrl || !pdfKey) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const request = await prisma.request.create({
    data: {
      userId: session.user.id,
      specialty,
      pdfUrl,
      pdfKey,
      message,
      status: "PENDING_PAYMENT",
    },
  });

  return NextResponse.json({ requestId: request.id });
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const isAdmin = searchParams.get("admin") === "true";

  if (isAdmin && session.user.role !== "DOCTOR" && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const requests = await prisma.request.findMany({
    where: isAdmin ? {} : { userId: session.user.id },
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(requests);
}
