"use client";

import { useState, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Upload, FileText, ChevronRight, Stethoscope, Baby, X, Image as ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing-client";

type Step = 1 | 2 | 3 | 4;

type Anamnesis = {
  symptoms: string[];
  duration: string;
  intensity: number;
  chronicDiseases: string[];
  hospitalized: string;
  medications: string;
  smoking: string;
  physicalActivity: string;
  stress: string;
  familyHistory: string[];
  priorConsultation: string;
  availableDocuments: string[];
  doctorMessage: string;
};

const defaultAnamnesis: Anamnesis = {
  symptoms: [],
  duration: "",
  intensity: 0,
  chronicDiseases: [],
  hospitalized: "",
  medications: "",
  smoking: "",
  physicalActivity: "",
  stress: "",
  familyHistory: [],
  priorConsultation: "",
  availableDocuments: [],
  doctorMessage: "",
};

function toggleMulti(arr: string[], val: string, exclusive?: string): string[] {
  if (exclusive && val === exclusive) return [exclusive];
  const without = arr.filter((v) => v !== exclusive);
  return without.includes(val) ? without.filter((v) => v !== val) : [...without, val];
}

function Chip({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-3 py-1.5 rounded-full text-sm border transition-all font-medium ${
        selected
          ? "bg-[#1e3a5f] border-[#1e3a5f] text-white"
          : "bg-white border-gray-200 text-gray-600 hover:border-[#1e3a5f]/50 hover:text-[#1e3a5f]"
      }`}
    >
      {label}
    </button>
  );
}

function RadioChip({ label, selected, onSelect }: { label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`px-3 py-1.5 rounded-full text-sm border transition-all font-medium ${
        selected
          ? "bg-[#1e3a5f] border-[#1e3a5f] text-white"
          : "bg-white border-gray-200 text-gray-600 hover:border-[#1e3a5f]/50 hover:text-[#1e3a5f]"
      }`}
    >
      {label}
    </button>
  );
}

function SectionBlock({ number, title, subtitle, children }: { number: number; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="border border-gray-100 rounded-2xl p-5">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-6 h-6 rounded-full bg-[#1e3a5f] text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
          {number}
        </div>
        <div>
          <h3 className="font-semibold text-[#1e3a5f] text-sm">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-gray-700 mb-2">{children}</p>;
}

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
      <button onClick={onRemove} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function formatAnamnesis(a: Anamnesis): string {
  const lines = [
    "=== QUESTIONNAIRE D'ANAMNÈSE ===",
    "",
    "1. MOTIF DE LA DEMANDE",
    `Symptômes : ${a.symptoms.length ? a.symptoms.join(", ") : "Non renseigné"}`,
    `Durée : ${a.duration || "Non renseigné"}`,
    `Intensité : ${a.intensity > 0 ? `${a.intensity}/10` : "Non renseigné"}`,
    "",
    "2. ANTÉCÉDENTS MÉDICAUX",
    `Maladies chroniques : ${a.chronicDiseases.length ? a.chronicDiseases.join(", ") : "Non renseigné"}`,
    `Hospitalisé(e) / opéré(e) : ${a.hospitalized || "Non renseigné"}`,
    `Médicaments quotidiens : ${a.medications || "Non renseigné"}`,
    "",
    "3. MODE DE VIE & FACTEURS DE RISQUE",
    `Tabagisme : ${a.smoking || "Non renseigné"}`,
    `Activité physique : ${a.physicalActivity || "Non renseigné"}`,
    `Niveau de stress : ${a.stress || "Non renseigné"}`,
    `Antécédents familiaux : ${a.familyHistory.length ? a.familyHistory.join(", ") : "Non renseigné"}`,
    "",
    "4. CONTEXTE & ATTENTES",
    `Consultation antérieure : ${a.priorConsultation || "Non renseigné"}`,
    `Documents disponibles : ${a.availableDocuments.length ? a.availableDocuments.join(", ") : "Aucun"}`,
  ];
  if (a.doctorMessage.trim()) {
    lines.push("", "MESSAGE AU MÉDECIN :", a.doctorMessage.trim());
  }
  return lines.join("\n");
}

function NewRequestForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [specialty, setSpecialty] = useState<"DENTAL" | "GYNECOLOGY" | "">("");
  const [anamnesis, setAnamnesis] = useState<Anamnesis>(defaultAnamnesis);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploadedKeys, setUploadedKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { startUpload } = useUploadThing("medicalUploader");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles].slice(0, 5));
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

  function setA<K extends keyof Anamnesis>(key: K, value: Anamnesis[K]) {
    setAnamnesis((prev) => ({ ...prev, [key]: value }));
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
        setStep(4);
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
          message: formatAnamnesis(anamnesis),
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

  const canProceedAnamnesis = anamnesis.symptoms.length > 0 && anamnesis.duration !== "" && anamnesis.intensity > 0;

  const steps = [
    { n: 1, label: "Spécialité" },
    { n: 2, label: "Anamnèse" },
    { n: 3, label: "Documents" },
    { n: 4, label: "Paiement" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[#1e3a5f] mb-2">Nouvelle demande</h1>
        <p className="text-gray-500 text-sm mb-8">Obtenez un second avis médical — veuillez compléter ce questionnaire avant de joindre vos documents.</p>

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

          {/* ── STEP 1 : Spécialité ── */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-[#1e3a5f] mb-2">Choisissez la spécialité</h2>
              <p className="text-sm text-gray-500 mb-6">Sélectionnez le médecin correspondant à votre compte rendu.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { value: "DENTAL" as const, label: "Dentaire", sub: "Dr. xxxxxx xxxx", desc: "Chirurgien-dentiste", icon: <Stethoscope className="h-6 w-6" /> },
                  { value: "GYNECOLOGY" as const, label: "Gynécologie", sub: "Dr. xxxxxx xxxx", desc: "Gynécologue obstétricien", icon: <Baby className="h-6 w-6" /> },
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

          {/* ── STEP 2 : Anamnèse ── */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-[#1e3a5f] mb-1">Questionnaire d&apos;anamnèse</h2>
              <p className="text-sm text-gray-500 mb-6">Ces informations aident le médecin à analyser votre situation. <span className="text-[#1e3a5f] font-medium">* Les 3 premiers champs sont requis.</span></p>

              <div className="space-y-4">

                {/* Section 1 */}
                <SectionBlock number={1} title="Motif de la demande" subtitle="Décrivez votre symptôme principal">
                  <div className="space-y-4">
                    <div>
                      <FieldLabel>Quel est votre symptôme principal ? <span className="text-red-400">*</span></FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {["Douleur", "Essoufflement", "Fatigue inhabituelle", "Troubles du sommeil", "Vertiges / malaises", "Trouble digestif", "Autre"].map((s) => (
                          <Chip key={s} label={s} selected={anamnesis.symptoms.includes(s)}
                            onToggle={() => setA("symptoms", toggleMulti(anamnesis.symptoms, s))} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Depuis quand ? <span className="text-red-400">*</span></FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {["Moins de 48h", "Quelques jours", "Plusieurs semaines", "Plus d'un mois", "Chronique (> 3 mois)"].map((d) => (
                          <RadioChip key={d} label={d} selected={anamnesis.duration === d} onSelect={() => setA("duration", d)} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Intensité de la gêne sur 10 <span className="text-red-400">*</span></FieldLabel>
                      <div className="flex gap-1.5 flex-wrap">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <button key={n} type="button" onClick={() => setA("intensity", n)}
                            className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-all ${
                              anamnesis.intensity === n
                                ? "bg-[#1e3a5f] border-[#1e3a5f] text-white"
                                : n <= (anamnesis.intensity || 0)
                                ? "bg-[#1e3a5f]/10 border-[#1e3a5f]/30 text-[#1e3a5f]"
                                : "bg-white border-gray-200 text-gray-500 hover:border-[#1e3a5f]/40"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Faible</span>
                        <span>Insupportable</span>
                      </div>
                    </div>
                  </div>
                </SectionBlock>

                {/* Section 2 */}
                <SectionBlock number={2} title="Antécédents médicaux" subtitle="Pathologies, traitements et hospitalisations">
                  <div className="space-y-4">
                    <div>
                      <FieldLabel>Avez-vous des maladies chroniques connues ?</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {["Aucune", "Diabète", "Hypertension", "Asthme / BPCO", "Cardiopathie", "Pathologie thyroïdienne", "Cancer (passé ou actif)"].map((d) => (
                          <Chip key={d} label={d} selected={anamnesis.chronicDiseases.includes(d)}
                            onToggle={() => setA("chronicDiseases", toggleMulti(anamnesis.chronicDiseases, d, "Aucune"))} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Avez-vous été hospitalisé(e) ou opéré(e) ?</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {["Non", "Oui, il y a moins d'un an", "Oui, il y a plus d'un an"].map((h) => (
                          <RadioChip key={h} label={h} selected={anamnesis.hospitalized === h} onSelect={() => setA("hospitalized", h)} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Prenez-vous des médicaments au quotidien ?</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {["Non", "Oui (1 à 2)", "Oui (3 ou plus)"].map((m) => (
                          <RadioChip key={m} label={m} selected={anamnesis.medications === m} onSelect={() => setA("medications", m)} />
                        ))}
                      </div>
                    </div>
                  </div>
                </SectionBlock>

                {/* Section 3 */}
                <SectionBlock number={3} title="Mode de vie & facteurs de risque" subtitle="Habitudes et contexte de santé">
                  <div className="space-y-4">
                    <div>
                      <FieldLabel>Tabagisme</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {["Non-fumeur", "Ex-fumeur", "Fumeur actif"].map((s) => (
                          <RadioChip key={s} label={s} selected={anamnesis.smoking === s} onSelect={() => setA("smoking", s)} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Activité physique</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {["Sédentaire", "Légère (marche)", "Régulière (≥ 2×/sem.)", "Intensive"].map((a) => (
                          <RadioChip key={a} label={a} selected={anamnesis.physicalActivity === a} onSelect={() => setA("physicalActivity", a)} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Niveau de stress perçu</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {["Faible", "Modéré", "Élevé", "Très élevé"].map((s) => (
                          <RadioChip key={s} label={s} selected={anamnesis.stress === s} onSelect={() => setA("stress", s)} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Antécédents familiaux au 1er degré</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {["Aucun", "Maladie cardiovasculaire", "Cancer", "Diabète", "Maladie génétique"].map((f) => (
                          <Chip key={f} label={f} selected={anamnesis.familyHistory.includes(f)}
                            onToggle={() => setA("familyHistory", toggleMulti(anamnesis.familyHistory, f, "Aucun"))} />
                        ))}
                      </div>
                    </div>
                  </div>
                </SectionBlock>

                {/* Section 4 */}
                <SectionBlock number={4} title="Contexte & attentes" subtitle="Consultation antérieure et documents disponibles">
                  <div className="space-y-4">
                    <div>
                      <FieldLabel>Avez-vous déjà consulté pour ce problème ?</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {["Non, c'est une première", "Oui, sans résolution", "Oui, je cherche un 2e avis"].map((p) => (
                          <RadioChip key={p} label={p} selected={anamnesis.priorConsultation === p} onSelect={() => setA("priorConsultation", p)} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Documents médicaux disponibles</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {["Aucun", "Ordonnance", "Résultats d'analyses", "Imagerie (radio, IRM…)", "Compte-rendu hospitalier"].map((d) => (
                          <Chip key={d} label={d} selected={anamnesis.availableDocuments.includes(d)}
                            onToggle={() => setA("availableDocuments", toggleMulti(anamnesis.availableDocuments, d, "Aucun"))} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Message au médecin (optionnel)</FieldLabel>
                      <textarea
                        value={anamnesis.doctorMessage}
                        onChange={(e) => setA("doctorMessage", e.target.value)}
                        placeholder="Décrivez votre situation, vos questions ou vos inquiétudes…"
                        rows={3}
                        className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]/40 placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </SectionBlock>

              </div>

              <p className="text-xs text-gray-400 mt-4 text-center">
                TrustMyDiag — Ce questionnaire est strictement confidentiel et transmis uniquement au médecin assigné.
              </p>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>Retour</Button>
                <Button onClick={() => setStep(3)} disabled={!canProceedAnamnesis} className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white gap-2">
                  Suivant <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ── STEP 3 : Documents ── */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold text-[#1e3a5f] mb-1">Déposez vos documents</h2>
              <p className="text-sm text-gray-500 mb-6">PDF, photos (JPG, PNG, HEIC) · Max 5 fichiers · 16 Mo chacun</p>

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

              {error && (
                <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 border border-red-100 mt-4">
                  {error}
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>Retour</Button>
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

          {/* ── STEP 4 : Paiement ── */}
          {step === 4 && (
            <div>
              <h2 className="text-lg font-semibold text-[#1e3a5f] mb-2">Récapitulatif & paiement</h2>
              <p className="text-sm text-gray-500 mb-6">Vérifiez votre demande avant de payer.</p>

              <div className="bg-[#f8fafc] rounded-xl p-5 space-y-3 mb-6 border border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Spécialité</span>
                  <span className="font-medium">{specialty === "DENTAL" ? "Dentaire — Dr Benguigui" : "Gynécologie — Dr. xxxxxx xxxx"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Anamnèse</span>
                  <span className="font-medium text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Complétée
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Documents</span>
                  <span className="font-medium text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> {uploadedUrls.length} fichier{uploadedUrls.length > 1 ? "s" : ""} envoyé{uploadedUrls.length > 1 ? "s" : ""}
                  </span>
                </div>
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
                <Button variant="outline" onClick={() => setStep(3)}>Retour</Button>
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
