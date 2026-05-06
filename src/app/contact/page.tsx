"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import Link from "next/link";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen" style={{ background: "#F4F3F8" }}>
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-[#6E6E73] hover:text-[#1D1D1F] text-sm mb-10 transition-colors"
        >
          ← Retour
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <p className="text-[#0071E3] text-sm font-semibold uppercase tracking-widest mb-3">
            Contact
          </p>
          <h1 className="text-4xl font-bold text-[#1D1D1F] mb-4">Nous contacter</h1>
          <p className="text-lg text-[#6E6E73]">
            Une question, un problème ou une suggestion ? Notre équipe vous répond sous 48 heures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h2 className="text-xl font-bold text-[#1D1D1F] mb-2">Message envoyé !</h2>
                <p className="text-[#6E6E73]">
                  Merci de nous avoir contactés. Nous vous répondrons dans les 48 heures.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-6 text-[#0071E3] text-sm font-medium hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Jean Dupont"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1D1D1F] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="jean.dupont@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1D1D1F] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">Sujet</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition bg-white"
                  >
                    <option value="" disabled>
                      Sélectionnez un sujet
                    </option>
                    <option value="general">Question générale</option>
                    <option value="tech">Problème technique</option>
                    <option value="partnership">Partenariat</option>
                    <option value="press">Presse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Décrivez votre demande en détail..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1D1D1F] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0071E3] text-white py-3 rounded-full font-semibold text-sm hover:bg-[#0077ED] transition-colors"
                >
                  Envoyer le message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#F5F5F7] rounded-2xl p-6">
              <h3 className="font-bold text-[#1D1D1F] mb-2">Email</h3>
              <a
                href="mailto:contact@trustmydiag.com"
                className="text-[#0071E3] text-sm hover:underline"
              >
                contact@trustmydiag.com
              </a>
            </div>

            <div className="bg-[#F5F5F7] rounded-2xl p-6">
              <h3 className="font-bold text-[#1D1D1F] mb-2">Délai de réponse</h3>
              <p className="text-sm text-[#6E6E73]">
                Nous répondons à tous les messages dans un délai de <strong className="text-[#1D1D1F]">48 heures ouvrées</strong>.
              </p>
            </div>

            <div className="bg-[#F5F5F7] rounded-2xl p-6">
              <h3 className="font-bold text-[#1D1D1F] mb-2">Support médical</h3>
              <p className="text-sm text-[#6E6E73]">
                Pour toute question relative à votre dossier médical, connectez-vous à votre espace
                patient.
              </p>
              <Link
                href="/dashboard"
                className="mt-3 inline-block text-sm font-medium text-[#0071E3] hover:underline"
              >
                Accéder au tableau de bord →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
