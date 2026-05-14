import { Resend } from "resend";

const FROM = "TrustMyDiag <noreply@trustmydiag.com>";

export async function sendOtpSms(email: string, otp: string) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: `${otp} — Votre code de vérification TrustMyDiag`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;color:#2D2A3E">
        <div style="background:linear-gradient(135deg,#8B7FF0,#6B5FD0);padding:28px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="color:white;margin:0;font-size:20px">Code de vérification</h1>
        </div>
        <div style="background:#ffffff;padding:32px;border-radius:0 0 12px 12px;border:1px solid #eee;text-align:center">
          <p style="margin:0 0 20px;color:#6B6880">Votre code de connexion TrustMyDiag :</p>
          <div style="display:inline-block;background:#f4f3f8;border-radius:12px;padding:16px 32px;margin-bottom:20px">
            <span style="font-size:36px;font-weight:700;letter-spacing:10px;color:#1e3a5f">${otp}</span>
          </div>
          <p style="margin:0;font-size:13px;color:#9B98A8">Ce code expire dans <strong>5 minutes</strong>.<br>Si vous n'avez pas demandé ce code, ignorez cet email.</p>
        </div>
      </div>
    `,
  });
  if (error) throw new Error(`Resend OTP error: ${JSON.stringify(error)}`);
}
