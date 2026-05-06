"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", rgpd: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.rgpd) return setError("Vous devez accepter la politique de confidentialité.");
    if (form.password.length < 8) return setError("Le mot de passe doit contenir au moins 8 caractères.");

    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      if (data.error === "Email already used") {
        setError("Cette adresse email est déjà utilisée.");
      } else if (res.status === 500) {
        setError("Erreur serveur. Veuillez réessayer dans quelques instants.");
      } else {
        setError(data.error || "Une erreur est survenue.");
      }
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(160deg, #EEF0FB 0%, #F4F3F8 35%, #FDE8E0 65%, #F4F3F8 100%)" }}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">Vérifiez votre email</h2>
          <p className="text-gray-500 mb-6">
            Un email de confirmation a été envoyé à <strong>{form.email}</strong>. Cliquez sur le lien pour activer votre compte.
          </p>
          <Link href="/login">
            <Button className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white w-full">Aller à la connexion</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(160deg, #EEF0FB 0%, #F4F3F8 35%, #FDE8E0 65%, #F4F3F8 100%)" }}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center gap-2 justify-center font-bold text-xl text-[#1e3a5f] mb-6">
            <Shield className="h-6 w-6" />
            TrustMyDiag
          </Link>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Créer un compte</h1>
          <p className="text-gray-500 text-sm mt-1">Obtenez votre second avis médical</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Prénom et nom</Label>
            <Input
              id="name"
              type="text"
              placeholder="Jean Dupont"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="mt-1"
            />
          </div>
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
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="8 caractères minimum"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div className="flex items-start gap-3 pt-2">
            <input
              id="rgpd"
              type="checkbox"
              checked={form.rgpd}
              onChange={(e) => setForm({ ...form, rgpd: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1e3a5f] accent-[#1e3a5f]"
            />
            <Label htmlFor="rgpd" className="text-sm font-normal text-gray-600 cursor-pointer">
              J'accepte la{" "}
              <Link href="/rgpd" className="underline text-[#1e3a5f]" target="_blank">
                politique de confidentialité
              </Link>{" "}
              et le traitement de mes données médicales conformément au RGPD.{" "}
              <span className="text-red-500">*</span>
            </Label>
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
            {loading ? "Création en cours…" : "Créer mon compte"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-[#1e3a5f] font-medium hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
