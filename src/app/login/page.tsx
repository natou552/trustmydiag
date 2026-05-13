"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const verified = searchParams.get("verified");
  const errorParam = searchParams.get("error");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      if (result.error === "EMAIL_NOT_VERIFIED") {
        setError("Veuillez vérifier votre email avant de vous connecter.");
      } else if (result.error.startsWith("MFA_REQUIRED:")) {
        const mfaToken = result.error.replace("MFA_REQUIRED:", "");
        router.push(`/mfa?token=${encodeURIComponent(mfaToken)}&email=${encodeURIComponent(form.email)}`);
      } else {
        setError("Email ou mot de passe incorrect.");
      }
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center gap-2 justify-center font-bold text-xl text-[#1e3a5f] mb-6">
            <Shield className="h-6 w-6" />
            TrustMyDiag
          </Link>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Connexion</h1>
          <p className="text-gray-500 text-sm mt-1">Accédez à votre espace personnel</p>
        </div>

        {verified && (
          <div className="bg-green-50 text-green-700 text-sm rounded-lg px-4 py-3 border border-green-100 mb-4">
            ✓ Email vérifié avec succès. Vous pouvez vous connecter.
          </div>
        )}

        {errorParam === "invalid_token" && (
          <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 border border-red-100 mb-4">
            Lien de vérification invalide ou expiré.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              type="email"
              placeholder="jean@exemple.fr"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="password">Mot de passe</Label>
              <Link href="/forgot-password" className="text-xs text-[#8B7FF0] hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
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
            {loading ? "Connexion…" : "Se connecter"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-[#1e3a5f] font-medium hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
