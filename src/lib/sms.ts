import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function sendOtpSms(phone: string, otp: string) {
  await client.messages.create({
    body: `Votre code de vérification TrustMyDiag : ${otp}. Valable 5 minutes.`,
    from: process.env.TWILIO_PHONE_NUMBER!,
    to: phone,
  });
}
