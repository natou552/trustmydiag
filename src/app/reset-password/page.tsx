"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center space-y-4">
          <p className="text-red-600 font-medium">Lien invalide ou expiré.</p>
          <Link href="/forgot-password">
            <Button className="bg-[#1e3a5f] text-white w-full">Demander un nouveau lien</Button>
          </Link>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Les mots de passe ne correspondent pas."); return; }
    if (password.length < 8) { setError("Le mot de passe doit faire au moins 8 caractères."); return; }

    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Une erreur est survenue.");
    } else {
      setDone(true);
      setTimeout(() => router.push("/login"), 3000);
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
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Nouveau mot de passe</h1>
          <p className="text-gray-500 text-sm mt-1">Choisissez un mot de passe sécurisé</p>
        </div>

        {done ? (
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center w-14 h-14 bg-green-50 rounded-full mx-auto">
              <CheckCircle2 className="h-7 w-7 text-green-600" />
            </div>
            <p className="text-[#1e3a5f] font-semibold">Mot de passe modifié !</p>
            <p className="text-gray-500 text-sm">Redirection vers la connexion…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">Nouveau mot de passe</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="8 caractères minimum"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirm">Confirmer le mot de passe</Label>
              <Input
                id="confirm"
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
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
              {loading ? "Enregistrement…" : "Enregistrer le mot de passe"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
