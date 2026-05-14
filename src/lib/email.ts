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
  const { error } = await resend.emails.send({
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
  if (error) throw new Error(`Resend error (confirmation): ${JSON.stringify(error)}`);
}

export async function sendDoctorNotification(
  doctorEmail: string,
  patientName: string,
  requestId: string,
  specialty: string,
  message: string | null,
  pdfUrls: string[]
) {
  const docLinks = pdfUrls
    .map((url, i) => {
      const isImage = /\.(jpg|jpeg|png|heic|webp)/i.test(url) || url.includes("image");
      const label = isImage ? `Photo ${i + 1}` : `Document ${i + 1}`;
      return `<a href="${url}" style="display:inline-block;margin:4px 8px 4px 0;padding:8px 16px;background:#1e3a5f;color:white;border-radius:6px;text-decoration:none;font-size:14px">${label}</a>`;
    })
    .join("");

  const { error } = await resend.emails.send({
    from: FROM,
    to: doctorEmail,
    subject: `Nouvelle demande de second avis — ${specialty} — TrustMyDiag`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2D2A3E">
        <h2 style="color:#1e3a5f">Nouvelle demande reçue</h2>
        <p><strong>Patient :</strong> ${patientName}</p>
        <p><strong>Spécialité :</strong> ${specialty}</p>
        <p><strong>Référence :</strong> #${requestId}</p>
        ${message ? `<div style="background:#f4f3f8;border-left:4px solid #8B7FF0;padding:12px 16px;margin:16px 0;border-radius:4px;white-space:pre-wrap;font-size:13px">${message.replace(/</g, "&lt;")}</div>` : ""}
        ${pdfUrls.length > 0 ? `<p><strong>Documents transmis :</strong></p><p>${docLinks}</p>` : ""}
        <p style="margin-top:24px"><a href="${process.env.NEXTAUTH_URL}/admin" style="display:inline-block;padding:10px 20px;background:#8B7FF0;color:white;border-radius:6px;text-decoration:none">Accéder à l'interface médecin</a></p>
      </div>
    `,
  });

  if (error) throw new Error(`Resend error (doctor notification): ${JSON.stringify(error)}`);
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

export async function sendPasswordResetEmail(email: string, name: string, token: string) {
  const url = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Réinitialisation de votre mot de passe — TrustMyDiag",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#2D2A3E">
        <div style="background:linear-gradient(135deg,#1e3a5f,#2a4f7f);padding:32px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="color:white;margin:0;font-size:22px">Réinitialisation du mot de passe</h1>
        </div>
        <div style="background:#ffffff;padding:32px;border-radius:0 0 12px 12px;border:1px solid #eee">
          <p style="margin:0 0 16px">Bonjour <strong>${name}</strong>,</p>
          <p style="margin:0 0 24px;color:#6B6880">Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous :</p>
          <a href="${url}" style="display:inline-block;padding:12px 28px;background:#1e3a5f;color:white;border-radius:8px;text-decoration:none;font-weight:600;margin-bottom:24px">Réinitialiser mon mot de passe</a>
          <p style="margin:0 0 8px;font-size:13px;color:#9B98A8">Ce lien expire dans <strong>1 heure</strong>.</p>
          <p style="margin:0;font-size:13px;color:#9B98A8">Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
        </div>
      </div>
    `,
  });
  if (error) throw new Error(`Resend error (password reset): ${JSON.stringify(error)}`);
}

export async function sendReplyToPatient(email: string, name: string, requestId: string, reply: string) {
  const dashboardUrl = `${process.env.NEXTAUTH_URL}/dashboard`;
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Votre second avis médical est disponible — TrustMyDiag",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#2D2A3E">
        <div style="background:linear-gradient(135deg,#1e3a5f,#2a4f7f);padding:32px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="color:white;margin:0;font-size:22px">Votre second avis est disponible ✓</h1>
        </div>
        <div style="background:#ffffff;padding:32px;border-radius:0 0 12px 12px;border:1px solid #eee">
          <p style="margin:0 0 16px">Bonjour <strong>${name}</strong>,</p>
          <p style="margin:0 0 20px;color:#6B6880">
            Votre demande <strong style="color:#2D2A3E">#${requestId}</strong> a été analysée par l'un de nos médecins partenaires.
            Voici son avis médical :
          </p>
          <div style="background:#f4f3f8;border-left:4px solid #8B7FF0;padding:16px 20px;margin:0 0 24px;border-radius:0 8px 8px 0;font-size:14px;line-height:1.7;white-space:pre-wrap;color:#2D2A3E">${reply.replace(/</g, "&lt;")}</div>
          <a href="${dashboardUrl}" style="display:inline-block;padding:12px 28px;background:#1e3a5f;color:white;border-radius:8px;text-decoration:none;font-weight:600;margin-bottom:28px">Voir dans mon espace</a>
          <div style="border-top:1px solid #eee;padding-top:20px">
            <p style="margin:0 0 12px;font-size:12px;color:#9B98A8;font-style:italic">
              Cet avis est un second regard médical indépendant, non une consultation médicale.
              Il ne remplace pas l'avis de votre médecin traitant ni une consultation en cabinet.
            </p>
            <p style="margin:0;font-size:13px;color:#9B98A8">L'équipe TrustMyDiag</p>
          </div>
        </div>
      </div>
    `,
  });
  if (error) throw new Error(`Resend error (reply to patient): ${JSON.stringify(error)}`);
}

export async function sendWelcomeEmail(email: string, name: string) {
  const ctaUrl = `${process.env.NEXTAUTH_URL}/dashboard/new`;
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Bienvenue sur TrustMyDiag — Votre compte est activé",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#2D2A3E">
        <div style="background:linear-gradient(135deg,#8B7FF0,#6B5FD0);padding:36px 32px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="color:white;margin:0;font-size:24px">Bienvenue, ${name} ! 🎉</h1>
          <p style="color:rgba(255,255,255,0.85);margin:10px 0 0;font-size:15px">Votre compte TrustMyDiag est activé</p>
        </div>
        <div style="background:#ffffff;padding:32px;border-radius:0 0 12px 12px;border:1px solid #eee">
          <p style="margin:0 0 24px;color:#6B6880">
            Vous avez désormais accès à notre plateforme de second avis médical indépendant.
            Voici comment ça marche en 3 étapes simples :
          </p>

          <div style="display:flex;flex-direction:column;gap:0;margin-bottom:28px">
            <div style="display:flex;align-items:flex-start;margin-bottom:16px">
              <div style="min-width:36px;height:36px;background:linear-gradient(135deg,#8B7FF0,#6B5FD0);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:16px;margin-right:14px;text-align:center;line-height:36px">1</div>
              <div>
                <p style="margin:0 0 4px;font-weight:600;color:#2D2A3E">Déposez votre dossier</p>
                <p style="margin:0;font-size:14px;color:#6B6880">Téléchargez vos documents médicaux (comptes-rendus, résultats, imagerie) et décrivez votre situation.</p>
              </div>
            </div>
            <div style="display:flex;align-items:flex-start;margin-bottom:16px">
              <div style="min-width:36px;height:36px;background:linear-gradient(135deg,#8B7FF0,#6B5FD0);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:16px;margin-right:14px;text-align:center;line-height:36px">2</div>
              <div>
                <p style="margin:0 0 4px;font-weight:600;color:#2D2A3E">Un médecin analyse votre dossier</p>
                <p style="margin:0;font-size:14px;color:#6B6880">Un médecin spécialiste partenaire examine l'intégralité de vos documents avec attention.</p>
              </div>
            </div>
            <div style="display:flex;align-items:flex-start">
              <div style="min-width:36px;height:36px;background:linear-gradient(135deg,#8B7FF0,#6B5FD0);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:16px;margin-right:14px;text-align:center;line-height:36px">3</div>
              <div>
                <p style="margin:0 0 4px;font-weight:600;color:#2D2A3E">Recevez votre avis en 72 h</p>
                <p style="margin:0;font-size:14px;color:#6B6880">Vous recevez un avis médical détaillé et indépendant directement dans votre espace personnel.</p>
              </div>
            </div>
          </div>

          <div style="text-align:center;margin-bottom:28px">
            <a href="${ctaUrl}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#8B7FF0,#6B5FD0);color:white;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px">
              Obtenir mon premier avis
            </a>
          </div>

          <div style="border-top:1px solid #eee;padding-top:20px">
            <p style="margin:0;font-size:13px;color:#9B98A8">
              Une question ? Contactez-nous à <a href="mailto:contact@trustmydiag.com" style="color:#8B7FF0">contact@trustmydiag.com</a>.
            </p>
            <p style="margin:8px 0 0;font-size:13px;color:#9B98A8">L'équipe TrustMyDiag</p>
          </div>
        </div>
      </div>
    `,
  });
  if (error) throw new Error(`Resend error (welcome): ${JSON.stringify(error)}`);
}
