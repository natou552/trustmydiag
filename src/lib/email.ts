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
