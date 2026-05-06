"use client";

import { useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Upload, FileText, ChevronRight, Stethoscope, Baby } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing-client";

type Step = 1 | 2 | 3;

function NewRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>(1);
  const [specialty, setSpecialty] = useState<"DENTAL" | "GYNECOLOGY" | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [uploadedKey, setUploadedKey] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { startUpload } = useUploadThing("pdfUploader");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    try {
      const result = await startUpload([file]);
      if (result && result[0]) {
        setUploadedUrl(result[0].url);
        setUploadedKey(result[0].key);
        setStep(3);
      }
    } catch {
      setError("Erreur lors de l'upload. Réessayez.");
    }
    setUploading(false);
  }

  async function handleSubmitAndPay() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ specialty, pdfUrl: uploadedUrl, pdfKey: uploadedKey, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const checkoutRes = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: data.requestId }),
      });
      const checkoutData = await checkoutRes.json();
      if (!checkoutRes.ok) throw new Error(checkoutData.error);

      window.location.href = checkoutData.url;
    } catch (e) {
      setError("Une erreur est survenue. Réessayez.");
      setLoading(false);
    }
  }

  const steps = [
    { n: 1, label: "Spécialité" },
    { n: 2, label: "Document" },
    { n: 3, label: "Paiement" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[#1e3a5f] mb-2">Nouvelle demande</h1>
        <p className="text-gray-500 text-sm mb-8">Obtenez un second avis médical en 3 étapes</p>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                step > s.n ? "bg-[#4CAF82] text-white" : step === s.n ? "bg-[#1e3a5f] text-white" : "bg-gray-200 text-gray-400"
              }`}>
                {step > s.n ? <CheckCircle className="h-4 w-4" /> : s.n}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${step >= s.n ? "text-[#1e3a5f]" : "text-gray-400"}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && <div className={`h-px flex-1 ${step > s.n ? "bg-[#4CAF82]" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-[#1e3a5f] mb-2">Choisissez la spécialité</h2>
              <p className="text-sm text-gray-500 mb-6">Sélectionnez le médecin correspondant à votre compte rendu.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { value: "DENTAL" as const, label: "Dentaire", sub: "Dr Robert Benguigui", desc: "Chirurgien-dentiste", icon: <Stethoscope className="h-6 w-6" /> },
                  { value: "GYNECOLOGY" as const, label: "Gynécologie", sub: "Dr Yohan Benchimol", desc: "Gynécologue obstétricien", icon: <Baby className="h-6 w-6" /> },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSpecialty(opt.value)}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      specialty === opt.value
                        ? "border-[#1e3a5f] bg-[#f0f4f8]"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className={`mb-3 ${specialty === opt.value ? "text-[#1e3a5f]" : "text-gray-400"}`}>
                      {opt.icon}
                    </div>
                    <div className="font-semibold text-gray-900">{opt.label}</div>
                    <div className="text-sm font-medium text-[#1e3a5f] mt-1">{opt.sub}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!specialty}
                  className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white gap-2"
                >
                  Suivant <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-[#1e3a5f] mb-2">Déposez votre compte rendu</h2>
              <p className="text-sm text-gray-500 mb-6">Format PDF uniquement · Max 10 Mo</p>

              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-[#1e3a5f] bg-[#f0f4f8]" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input {...getInputProps()} />
                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-10 w-10 text-[#1e3a5f]" />
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} Mo</p>
                    <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="text-xs text-red-400 hover:underline mt-1">
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <Upload className="h-10 w-10 text-gray-300" />
                    <p className="font-medium text-gray-500">Glissez votre PDF ici</p>
                    <p className="text-sm text-gray-400">ou cliquez pour parcourir</p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <Label htmlFor="message">Message au médecin (optionnel)</Label>
                <Textarea
                  id="message"
                  placeholder="Décrivez votre situation, vos questions ou vos inquiétudes…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 resize-none"
                  rows={4}
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 border border-red-100 mt-4">
                  {error}
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>Retour</Button>
                <Button
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white gap-2"
                >
                  {uploading ? "Envoi en cours…" : <>Suivant <ChevronRight className="h-4 w-4" /></>}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold text-[#1e3a5f] mb-2">Récapitulatif & paiement</h2>
              <p className="text-sm text-gray-500 mb-6">Vérifiez votre demande avant de payer.</p>

              <div className="bg-[#f8fafc] rounded-xl p-5 space-y-3 mb-6 border border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Spécialité</span>
                  <span className="font-medium">{specialty === "DENTAL" ? "Dentaire — Dr Benguigui" : "Gynécologie — Dr Benchimol"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Document</span>
                  <span className="font-medium text-green-600 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Uploadé</span>
                </div>
                {message && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Message</span>
                    <span className="font-medium max-w-[200px] truncate">{message}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-[#1e3a5f] text-lg">22,00 €</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-6 text-center">
                Paiement sécurisé par Stripe · Aucune donnée bancaire stockée
              </p>

              {error && (
                <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 border border-red-100 mb-4">
                  {error}
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>Retour</Button>
                <Button
                  onClick={handleSubmitAndPay}
                  disabled={loading}
                  className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white px-8"
                >
                  {loading ? "Redirection…" : "Payer 22 €"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NewRequestPage() {
  return (
    <Suspense>
      <NewRequestForm />
    </Suspense>
  );
}
