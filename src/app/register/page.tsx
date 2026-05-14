"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ── Politique ANSSI ────────────────────────────────────────────────────────────
// Recommandations ANSSI (Guide d'hygiène informatique + recommandations MFA) :
//   • 12 caractères minimum
//   • Majuscule, minuscule, chiffre, caractère spécial
//   • Ne doit pas contenir l'identifiant (email local)
//   • Pas de mot de passe trivial / dictionnaire

const COMMON_PASSWORDS = [
  "Password1!", "Azerty123!", "Bonjour1!", "Soleil123!", "Bienvenu1!",
  "Trustmydiag1!", "Motdepasse1!", "Admin1234!", "France2024!", "Paris2024!",
];

type Criteria = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  digit: boolean;
  special: boolean;
  notEmail: boolean;
  notCommon: boolean;
};

function checkPassword(password: string, email: string): Criteria {
  const local = email.split("@")[0].toLowerCase();
  return {
    length:    password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit:     /[0-9]/.test(password),
    special:   /[^A-Za-z0-9]/.test(password),
    notEmail:  local.length < 3 || !password.toLowerCase().includes(local),
    notCommon: !COMMON_PASSWORDS.some(c => c.toLowerCase() === password.toLowerCase()),
  };
}

function strengthScore(c: Criteria): number {
  // Score sur les 5 critères principaux (notEmail & notCommon sont des disqualifiants)
  return [c.length, c.uppercase, c.lowercase, c.digit, c.special].filter(Boolean).length;
}

const STRENGTH_LABELS = ["Très faible", "Faible", "Moyen", "Fort", "Très fort"];
const STRENGTH_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#16a34a"];

const CRITERIA_LABELS: { key: keyof Criteria; label: string }[] = [
  { key: "length",    label: "12 caractères minimum" },
  { key: "uppercase", label: "Au moins une majuscule (A–Z)" },
  { key: "lowercase", label: "Au moins une minuscule (a–z)" },
  { key: "digit",     label: "Au moins un chiffre (0–9)" },
  { key: "special",   label: "Au moins un caractère spécial (!@#…)" },
  { key: "notEmail",  label: "Différent de votre identifiant" },
  { key: "notCommon", label: "Pas un mot de passe trivial" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", rgpd: false });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const criteria = checkPassword(form.password, form.email);
  const score = strengthScore(criteria);
  const allValid = Object.values(criteria).every(Boolean);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.rgpd) return setError("Vous devez accepter la politique de confidentialité.");

    if (!allValid) {
      setError("Le mot de passe ne respecte pas la politique de sécurité.");
      return;
    }

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
      } else if (data.error === "PASSWORD_POLICY") {
        setError("Le mot de passe ne respecte pas la politique de sécurité.");
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
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-card rounded-2xl p-10 max-w-md w-full text-center">
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full">
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
              id="name" type="text" placeholder="Jean Dupont"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              required className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email" type="email" placeholder="jean@exemple.fr"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              required className="mt-1"
            />
          </div>

          {/* Mot de passe + toggle */}
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPwd ? "text" : "password"}
                placeholder="12 caractères minimum"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Barre de force */}
            {form.password.length > 0 && (
              <div className="mt-2.5 space-y-2">
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-1.5 flex-1 rounded-full transition-all duration-300"
                      style={{
                        background: i < score
                          ? STRENGTH_COLORS[score - 1]
                          : "rgba(139,127,240,0.12)",
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs font-medium" style={{ color: score > 0 ? STRENGTH_COLORS[score - 1] : "#B0ABBD" }}>
                  {score > 0 ? STRENGTH_LABELS[score - 1] : "Saisissez un mot de passe"}
                </p>

                {/* Critères */}
                <div className="rounded-xl p-3 space-y-1.5" style={{ background: "rgba(139,127,240,0.04)", border: "1px solid rgba(139,127,240,0.10)" }}>
                  {CRITERIA_LABELS.map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={criteria[key]
                          ? { background: "#22c55e" }
                          : { background: "rgba(139,127,240,0.12)" }
                        }
                      >
                        {criteria[key]
                          ? <Check className="h-2.5 w-2.5 text-white" />
                          : <X className="h-2.5 w-2.5" style={{ color: "#B0ABBD" }} />
                        }
                      </div>
                      <span className="text-xs" style={{ color: criteria[key] ? "#374151" : "#9CA3AF" }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-start gap-3 pt-2">
            <input
              id="rgpd" type="checkbox"
              checked={form.rgpd} onChange={(e) => setForm({ ...form, rgpd: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-gray-300 accent-[#1e3a5f]"
            />
            <Label htmlFor="rgpd" className="text-sm font-normal text-gray-600 cursor-pointer">
              J'accepte la{" "}
              <Link href="/rgpd" className="underline text-[#1e3a5f]" target="_blank">politique de confidentialité</Link>{" "}
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
            disabled={loading || !allValid || !form.rgpd}
            className="w-full bg-[#1e3a5f] hover:bg-[#162d4a] text-white py-5 mt-2 disabled:opacity-50"
          >
            {loading ? "Création en cours…" : "Créer mon compte"}
          </Button>

          <p className="text-xs text-center text-gray-400">
            🔒 Politique de mot de passe conforme aux recommandations ANSSI
          </p>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-[#1e3a5f] font-medium hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
