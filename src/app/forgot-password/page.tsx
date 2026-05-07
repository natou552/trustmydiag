"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Une erreur est survenue.");
    } else {
      setSent(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center gap-2 justify-center font-bold text-xl text-[#1e3a5f] mb-6">
            <Shield className="h-6 w-6" />
            TrustMyDiag
          </Link>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Mot de passe oublié</h1>
          <p className="text-gray-500 text-sm mt-1">Nous vous enverrons un lien de réinitialisation</p>
        </div>

        {sent ? (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center w-14 h-14 bg-green-50 rounded-full mx-auto">
              <Mail className="h-7 w-7 text-green-600" />
            </div>
            <p className="text-[#1e3a5f] font-semibold">Email envoyé !</p>
            <p className="text-gray-500 text-sm">
              Si un compte existe pour <strong>{email}</strong>, vous recevrez un email avec un lien de réinitialisation valable 1 heure.
            </p>
            <Link href="/login">
              <Button variant="outline" className="mt-4 w-full gap-2">
                <ArrowLeft className="h-4 w-4" /> Retour à la connexion
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jean@exemple.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 border border-red-100">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e3a5f] hover:bg-[#162d4a] text-white py-5 mt-2"
              >
                {loading ? "Envoi en cours…" : "Envoyer le lien"}
              </Button>
            </form>

            <Link href="/login" className="flex items-center justify-center gap-1.5 text-sm text-gray-500 mt-6 hover:text-[#1e3a5f] transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              Retour à la connexion
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
