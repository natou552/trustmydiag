"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Shield, Mail, CheckCircle2, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Step = "idle" | "otp" | "done";

export function SecurityClient({
  email,
  mfaEnabled,
}: {
  email: string;
  mfaEnabled: boolean;
}) {
  const [step, setStep] = useState<Step>("idle");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [mfaToken, setMfaToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [enabled, setEnabled] = useState(mfaEnabled);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  async function sendOtp() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/setup-mfa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "send" }),
    });
    setLoading(false);
    if (!res.ok) { const d = await res.json(); setError(d.error); return; }
    const data = await res.json();
    setMfaToken(data.mfaToken);
    setOtp(["", "", "", "", "", ""]);
    setStep("otp");
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  }

  function handleOtpKey(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  }

  async function verifyOtp() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/setup-mfa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "verify", otp: otp.join(""), mfaToken }),
    });
    setLoading(false);
    if (!res.ok) { const d = await res.json(); setError(d.error); return; }
    setEnabled(true);
    setStep("done");
  }

  async function disableMfa() {
    setLoading(true);
    await fetch("/api/auth/setup-mfa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "disable" }),
    });
    setLoading(false);
    setEnabled(false);
    setStep("idle");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link href="/dashboard" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1e3a5f] mb-6 transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> Retour au tableau de bord
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#f0edff] rounded-xl flex items-center justify-center">
          <Lock className="h-5 w-5 text-[#8B7FF0]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Sécurité</h1>
          <p className="text-gray-500 text-sm">Gérez la double authentification de votre compte</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-[#f0edff] rounded-xl flex items-center justify-center flex-shrink-0">
            <Mail className="h-5 w-5 text-[#8B7FF0]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-[#1e3a5f]">Double authentification (email)</h2>
              {enabled && (
                <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full font-medium">
                  <CheckCircle2 className="h-3 w-3" /> Activée
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              À chaque connexion, un code à 6 chiffres sera envoyé à <strong>{email}</strong>.
            </p>
          </div>
        </div>

        {/* Idle */}
        {step === "idle" && (
          <>
            {enabled ? (
              <Button
                variant="outline"
                disabled={loading}
                onClick={disableMfa}
                className="w-full border-red-200 text-red-500 hover:bg-red-50"
              >
                {loading ? "Désactivation…" : "Désactiver la double authentification"}
              </Button>
            ) : (
              <Button
                disabled={loading}
                onClick={sendOtp}
                className="w-full bg-[#1e3a5f] hover:bg-[#162d4a] text-white"
              >
                {loading ? "Envoi du code…" : "Activer la double authentification"}
              </Button>
            )}
          </>
        )}

        {/* OTP */}
        {step === "otp" && (
          <div className="space-y-5">
            <p className="text-sm text-gray-500">
              Un code a été envoyé à <strong>{email}</strong>. Saisissez-le ci-dessous :
            </p>
            <div className="flex justify-center gap-3" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKey(i, e)}
                  className="w-11 h-14 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-colors"
                  style={{ borderColor: digit ? "#8B7FF0" : "#e5e7eb" }}
                />
              ))}
            </div>
            {error && <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 border border-red-100 text-center">{error}</div>}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => { setStep("idle"); setError(""); }} className="flex-1">Annuler</Button>
              <Button
                disabled={loading || otp.join("").length < 6}
                onClick={verifyOtp}
                className="flex-1 bg-[#1e3a5f] hover:bg-[#162d4a] text-white"
              >
                {loading ? "Vérification…" : "Confirmer"}
              </Button>
            </div>
            <p className="text-xs text-center text-gray-400">
              Pas reçu ? Vérifiez vos spams ou{" "}
              <button onClick={sendOtp} className="text-[#8B7FF0] hover:underline">renvoyez le code</button>
            </p>
          </div>
        )}

        {/* Done */}
        {step === "done" && (
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-full mx-auto">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <p className="font-semibold text-[#1e3a5f]">Double authentification activée !</p>
            <p className="text-sm text-gray-500">À chaque connexion, un code vous sera envoyé à <strong>{email}</strong>.</p>
            <Button onClick={() => setStep("idle")} variant="outline" className="mt-2">Fermer</Button>
          </div>
        )}
      </div>

      <div className="mt-4 rounded-xl p-4 flex gap-3" style={{ background: "rgba(139,127,240,0.07)", border: "1px solid rgba(139,127,240,0.15)" }}>
        <Shield className="h-5 w-5 text-[#8B7FF0] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#6B6880]">
          La double authentification ajoute une couche de sécurité supplémentaire. Même si votre mot de passe est compromis, personne ne pourra se connecter sans accès à votre boîte email.
        </p>
      </div>
    </div>
  );
}
