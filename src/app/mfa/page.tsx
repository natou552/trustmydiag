"use client";

import { useState, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Shield, SmartphoneNfc } from "lucide-react";
import { Button } from "@/components/ui/button";

function MfaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mfaToken = searchParams.get("token");
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) { setError("Entrez les 6 chiffres du code."); return; }
    if (!mfaToken) { setError("Session invalide. Reconnectez-vous."); return; }

    setLoading(true);
    setError("");

    const verifyRes = await fetch("/api/auth/verify-mfa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mfaToken, otp: code }),
    });

    if (!verifyRes.ok) {
      const data = await verifyRes.json();
      setError(data.error || "Code incorrect.");
      setLoading(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      return;
    }

    const result = await signIn("credentials", {
      step: "mfa",
      mfaToken,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Erreur lors de la connexion. Reconnectez-vous.");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  if (!mfaToken) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center space-y-4">
          <p className="text-red-600 font-medium">Session invalide.</p>
          <Link href="/login"><Button className="bg-[#1e3a5f] text-white w-full">Retour à la connexion</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center gap-2 justify-center font-bold text-xl text-[#1e3a5f] mb-6">
            <Shield className="h-6 w-6" />
            TrustMyDiag
          </Link>
          <div className="flex items-center justify-center w-14 h-14 bg-[#f0edff] rounded-full mx-auto mb-4">
            <SmartphoneNfc className="h-7 w-7 text-[#8B7FF0]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Vérification</h1>
          <p className="text-gray-500 text-sm mt-1">
            Entrez le code à 6 chiffres envoyé par SMS
            {email && <><br /><span className="text-xs">sur le numéro lié à <strong>{email}</strong></span></>}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-11 h-14 text-center text-xl font-bold border-2 rounded-xl focus:outline-none focus:border-[#8B7FF0] transition-colors"
                style={{ borderColor: digit ? "#8B7FF0" : "#e5e7eb" }}
              />
            ))}
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 border border-red-100 text-center">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || otp.join("").length < 6}
            className="w-full bg-[#1e3a5f] hover:bg-[#162d4a] text-white py-5"
          >
            {loading ? "Vérification…" : "Confirmer"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Code non reçu ?{" "}
          <Link href="/login" className="text-[#8B7FF0] hover:underline">Recommencer la connexion</Link>
        </p>
      </div>
    </div>
  );
}

export default function MfaPage() {
  return (
    <Suspense>
      <MfaForm />
    </Suspense>
  );
}
