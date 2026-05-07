import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "TrustMyDiag <noreply@trustmydiag.com>";

export async function sendVerificationEmail(email: string, name: string, token: string) {
  const url = `${process.env.NEXTAUTH_URL}/api/verify-email?token=${token}`;
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Vérifiez votre adresse email — TrustMyDiag",
    html: `
      <h2>Bonjour ${name},</h2>
      <p>Merci de vous être inscrit sur TrustMyDiag. Cliquez sur le lien ci-dessous pour vérifier votre adresse email :</p>
      <a href="${url}" style="background:#1e3a5f;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;margin:16px 0">Vérifier mon email</a>
      <p>Ce lien expire dans 24 heures.</p>
      <p>Si vous n'avez pas créé de compte, ignorez cet email.</p>
    `,
  });
}

export async function sendRequestConfirmation(email: string, name: string, requestId: string) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Votre demande a bien été reçue — TrustMyDiag",
    html: `
      <h2>Bonjour ${name},</h2>
      <p>Votre demande de second avis médical (<strong>#${requestId}</strong>) a bien été reçue et votre paiement confirmé.</p>
      <p>Un médecin partenaire analysera votre dossier dans les plus brefs délais. Vous recevrez un email dès que votre avis sera disponible.</p>
      <p>Vous pouvez suivre l'avancement de votre demande sur votre <a href="${process.env.NEXTAUTH_URL}/dashboard">tableau de bord</a>.</p>
    `,
  });
}

export async function sendDoctorNotification(
  doctorEmail: string,
  patientName: string,
  requestId: string,
  specialty: string,
  message: string | null,
  pdfUrl: string
) {
  await resend.emails.send({
    from: FROM,
    to: doctorEmail,
    subject: `Nouvelle demande de second avis — ${specialty} — TrustMyDiag`,
    html: `
      <h2>Nouvelle demande reçue</h2>
      <p><strong>Patient :</strong> ${patientName}</p>
      <p><strong>Spécialité :</strong> ${specialty}</p>
      <p><strong>Référence :</strong> #${requestId}</p>
      ${message ? `<p><strong>Message du patient :</strong><br>${message}</p>` : ""}
      <p><a href="${pdfUrl}">Télécharger le compte rendu (PDF)</a></p>
      <p><a href="${process.env.NEXTAUTH_URL}/admin">Accéder à l'interface médecin</a></p>
    `,
  });
}

export async function sendContactEmail(name: string, email: string, subject: string, message: string) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: "contact@trustmydiag.com",
    replyTo: email,
    subject: `[Contact] ${subject} — ${name}`,
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Sujet :</strong> ${subject}</p>
      <p><strong>Message :</strong></p>
      <blockquote style="border-left:4px solid #8B7FF0;padding:12px;margin:16px 0;background:#f4f3f8">${message.replace(/\n/g, "<br>")}</blockquote>
    `,
  });
  if (error) throw new Error(`Resend error (contact): ${JSON.stringify(error)}`);
}

export async function sendContactConfirmation(name: string, email: string, subject: string) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Nous avons bien reçu votre message — TrustMyDiag",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#2D2A3E">
        <div style="background:linear-gradient(135deg,#8B7FF0,#6B5FD0);padding:32px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="color:white;margin:0;font-size:22px">Message reçu ✓</h1>
        </div>
        <div style="background:#ffffff;padding:32px;border-radius:0 0 12px 12px;border:1px solid #eee">
          <p style="margin:0 0 16px">Bonjour <strong>${name}</strong>,</p>
          <p style="margin:0 0 16px;color:#6B6880">Merci de nous avoir contactés. Nous avons bien reçu votre message concernant : <strong>${subject}</strong>.</p>
          <p style="margin:0 0 24px;color:#6B6880">Notre équipe vous répondra dans un délai de <strong style="color:#2D2A3E">48 heures ouvrées</strong>.</p>
          <div style="background:#f4f3f8;border-radius:8px;padding:16px;margin-bottom:24px">
            <p style="margin:0;font-size:13px;color:#9B98A8">Si votre demande est urgente, vous pouvez nous écrire directement à <a href="mailto:contact@trustmydiag.com" style="color:#8B7FF0">contact@trustmydiag.com</a>.</p>
          </div>
          <p style="margin:0;font-size:13px;color:#9B98A8">L'équipe TrustMyDiag</p>
        </div>
      </div>
    `,
  });
  if (error) throw new Error(`Resend error (confirmation): ${JSON.stringify(error)}`);
}

export async function sendReplyToPatient(email: string, name: string, requestId: string, reply: string) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Votre second avis médical est disponible — TrustMyDiag",
    html: `
      <h2>Bonjour ${name},</h2>
      <p>Votre avis médical pour la demande <strong>#${requestId}</strong> est disponible.</p>
      <blockquote style="border-left:4px solid #1e3a5f;padding:12px;margin:16px 0;background:#f0f4f8">${reply}</blockquote>
      <p><a href="${process.env.NEXTAUTH_URL}/dashboard">Voir le détail sur votre tableau de bord</a></p>
    `,
  });
}
