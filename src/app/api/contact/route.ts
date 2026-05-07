import { NextResponse } from "next/server";
import { sendContactEmail, sendContactConfirmation } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    await Promise.all([
      sendContactEmail(name, email, subject, message),
      sendContactConfirmation(name, email, subject),
    ]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
  }
}
