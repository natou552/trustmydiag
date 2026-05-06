"use client";

import { useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Upload, FileText, ChevronRight, Stethoscope, Baby, X, Image as ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing-client";

type Step = 1 | 2 | 3;

function FilePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const isImage = file.type.startsWith("image/");
  const sizeMb = (file.size / 1024 / 1024).toFixed(1);
  return (
    <div className="flex items-center gap-3 bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3">
      {isImage ? (
        <ImageIcon className="h-5 w-5 text-[#0071E3] flex-shrink-0" />
      ) : (
        <FileText className="h-5 w-5 text-[#1e3a5f] flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
        <p className="text-xs text-gray-400">{sizeMb} Mo</p>
      </div>
      <button
        onClick={onRemove}
        className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function NewRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>(1);
  const [specialty, setSpecialty] = useState<"DENTAL" | "GYNECOLOGY" | "">("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploadedKeys, setUploadedKeys] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { startUpload } = useUploadThing("medicalUploader");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => {
      const combined = [...prev, ...acceptedFiles];
      return combined.slice(0, 5);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/heic": [".heic"],
      "image/webp": [".webp"],
    },
    maxFiles: 5,
    maxSize: 16 * 1024 * 1024,
  });

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleUpload() {
    if (files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      const results = await startUpload(files);
      if (results && results.length > 0) {
        setUploadedUrls(results.map((r) => r.url));
        setUploadedKeys(results.map((r) => r.key));
        setStep(3);
      }
    } catch {
      setError("Erreur lors de l'envoi. Réessayez.");
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
        body: JSON.stringify({
          specialty,
          pdfUrl: JSON.stringify(uploadedUrls),
          pdfKey: JSON.stringify(uploadedKeys),
          message,
        }),
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
    } catch {
      setError("Une erreur est survenue. Réessayez.");
      setLoading(false);
    }
  }

  const steps = [
    { n: 1, label: "Spécialité" },
    { n: 2, label: "Documents" },
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
                      specialty === opt.value ? "border-[#1e3a5f] bg-[#f0f4f8]" : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className={`mb-3 ${specialty === opt.value ? "text-[#1e3a5f]" : "text-gray-400"}`}>{opt.icon}</div>
                    <div className="font-semibold text-gray-900">{opt.label}</div>
                    <div className="text-sm font-medium text-[#1e3a5f] mt-1">{opt.sub}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!specialty} className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white gap-2">
                  Suivant <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-[#1e3a5f] mb-1">Déposez vos documents</h2>
              <p className="text-sm text-gray-500 mb-6">PDF, photos (JPG, PNG, HEIC) · Max 5 fichiers · 16 Mo chacun</p>

              {/* Zone de drop */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors mb-4 ${
                  isDragActive ? "border-[#1e3a5f] bg-[#f0f4f8]" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                <p className="font-medium text-gray-500 text-sm">Glissez vos fichiers ici</p>
                <p className="text-xs text-gray-400 mt-1">ou cliquez pour parcourir</p>
                <div className="flex justify-center gap-2 mt-4">
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full">PDF</span>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full">JPG / PNG</span>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full">HEIC (iPhone)</span>
                </div>
              </div>

              {/* Liste des fichiers */}
              {files.length > 0 && (
                <div className="space-y-2 mb-6">
                  {files.map((f, i) => (
                    <FilePreview key={i} file={f} onRemove={() => removeFile(i)} />
                  ))}
                  {files.length < 5 && (
                    <p className="text-xs text-gray-400 text-center pt-1">
                      {files.length}/5 fichier{files.length > 1 ? "s" : ""} · Vous pouvez en ajouter {5 - files.length} de plus
                    </p>
                  )}
                </div>
              )}

              <div className="mt-2">
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
                  disabled={files.length === 0 || uploading}
                  className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white gap-2"
                >
                  {uploading ? `Envoi en cours… (${files.length} fichier${files.length > 1 ? "s" : ""})` : <>Suivant <ChevronRight className="h-4 w-4" /></>}
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
                  <span className="text-gray-500">Documents</span>
                  <span className="font-medium text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> {uploadedUrls.length} fichier{uploadedUrls.length > 1 ? "s" : ""} envoyé{uploadedUrls.length > 1 ? "s" : ""}
                  </span>
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
                <Button onClick={handleSubmitAndPay} disabled={loading} className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white px-8">
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
