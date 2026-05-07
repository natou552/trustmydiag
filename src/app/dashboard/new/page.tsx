"use client";

import { useState, useCallback, Suspense } from "react";
import { Header } from "@/components/header";
import { CheckCircle, Upload, FileText, ChevronRight, Stethoscope, Baby, X, Image as ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing-client";

type Step = 1 | 2 | 3 | 4;

type DentalAnamnesis = {
  reason: string;
  treatments: string[];
  symptoms: string[];
  duration: string;
  intensity: number;
  hasQuote: string;
  lastVisit: string;
  pastTreatments: string[];
  doctorMessage: string;
};

type GynoAnamnesis = {
  reason: string;
  examConcerned: string[];
  symptoms: string[];
  duration: string;
  intensity: number;
  situation: string;
  lastConsultation: string;
  pastHistory: string[];
  doctorMessage: string;
};

const defaultDental: DentalAnamnesis = {
  reason: "", treatments: [], symptoms: [], duration: "",
  intensity: 0, hasQuote: "", lastVisit: "", pastTreatments: [], doctorMessage: "",
};

const defaultGyno: GynoAnamnesis = {
  reason: "", examConcerned: [], symptoms: [], duration: "",
  intensity: 0, situation: "", lastConsultation: "", pastHistory: [], doctorMessage: "",
};

function toggleMulti(arr: string[], val: string, exclusive?: string): string[] {
  if (exclusive && val === exclusive) return [exclusive];
  const without = arr.filter((v) => v !== exclusive);
  return without.includes(val) ? without.filter((v) => v !== val) : [...without, val];
}

const chipBase = "px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer";
const chipSelected: React.CSSProperties = {
  background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)",
  color: "white", boxShadow: "0 2px 8px rgba(139,127,240,0.35)", border: "1px solid transparent",
};
const chipUnselected: React.CSSProperties = {
  background: "rgba(255,255,255,0.85)", border: "1px solid rgba(139,127,240,0.18)", color: "#6B6880",
};

function Chip({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return <button type="button" onClick={onToggle} className={chipBase} style={selected ? chipSelected : chipUnselected}>{label}</button>;
}

function RadioChip({ label, selected, onSelect }: { label: string; selected: boolean; onSelect: () => void }) {
  return <button type="button" onClick={onSelect} className={chipBase} style={selected ? chipSelected : chipUnselected}>{label}</button>;
}

function FieldGroup({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-2.5">
        <p className="text-sm font-semibold" style={{ color: "#2D2A3E" }}>
          {label}{required && <span style={{ color: "#8B7FF0", marginLeft: "2px" }}>*</span>}
        </p>
        {hint && <span className="text-xs" style={{ color: "#B0ABBD" }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: "1px", background: "rgba(139,127,240,0.08)" }} />;
}

function IntensityPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button key={n} type="button" onClick={() => onChange(n)}
            className="w-9 h-9 rounded-xl text-sm font-bold transition-all duration-150"
            style={value === n ? {
              background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", color: "white", boxShadow: "0 2px 8px rgba(139,127,240,0.4)",
            } : n < value ? {
              background: "rgba(139,127,240,0.12)", color: "#8B7FF0", border: "1px solid rgba(139,127,240,0.2)",
            } : {
              background: "rgba(255,255,255,0.8)", border: "1px solid rgba(139,127,240,0.15)", color: "#B0ABBD",
            }}
          >{n}</button>
        ))}
      </div>
      <div className="flex justify-between text-xs mt-1.5" style={{ color: "#B0ABBD" }}>
        <span>Faible</span><span>Insupportable</span>
      </div>
    </>
  );
}

function MessageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)}
      placeholder="Précisez votre situation, vos inquiétudes ou vos questions…"
      rows={3} className="w-full text-sm resize-none focus:outline-none placeholder:text-[#C8C4D4]"
      style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(139,127,240,0.18)", borderRadius: "12px", padding: "12px 16px", color: "#2D2A3E" }}
      onFocus={e => (e.target.style.border = "1px solid rgba(139,127,240,0.5)")}
      onBlur={e => (e.target.style.border = "1px solid rgba(139,127,240,0.18)")}
    />
  );
}

function FilePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const isImage = file.type.startsWith("image/");
  const sizeMb = (file.size / 1024 / 1024).toFixed(1);
  return (
    <div className="flex items-center gap-3 rounded-xl px-4 py-3"
      style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(139,127,240,0.12)" }}>
      {isImage ? <ImageIcon className="h-5 w-5 flex-shrink-0" style={{ color: "#8B7FF0" }} />
        : <FileText className="h-5 w-5 flex-shrink-0" style={{ color: "#8B7FF0" }} />}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: "#2D2A3E" }}>{file.name}</p>
        <p className="text-xs" style={{ color: "#B0ABBD" }}>{sizeMb} Mo</p>
      </div>
      <button onClick={onRemove} className="transition-colors flex-shrink-0" style={{ color: "#B0ABBD" }}
        onMouseEnter={e => (e.currentTarget.style.color = "#e57373")}
        onMouseLeave={e => (e.currentTarget.style.color = "#B0ABBD")}>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function formatDental(a: DentalAnamnesis): string {
  const hasPain = a.symptoms.some((s) => s.toLowerCase().includes("douleur") || s.toLowerCase().includes("sensibilité"));
  const lines = [
    "=== ANTÉCÉDENTS DENTAIRES ===", "",
    `Motif principal : ${a.reason || "Non renseigné"}`,
    `Soin(s) concerné(s) : ${a.treatments.length ? a.treatments.join(", ") : "Non renseigné"}`, "",
    `Symptômes : ${a.symptoms.length ? a.symptoms.join(", ") : "Non renseigné"}`,
    ...(a.duration ? [`Depuis : ${a.duration}`] : []),
    ...(hasPain && a.intensity > 0 ? [`Intensité douleur : ${a.intensity}/10`] : []), "",
    `Devis chiffré disponible : ${a.hasQuote || "Non renseigné"}`,
    `Dernière visite dentiste : ${a.lastVisit || "Non renseigné"}`,
    `Traitements passés : ${a.pastTreatments.length ? a.pastTreatments.join(", ") : "Aucun"}`,
  ];
  if (a.doctorMessage.trim()) lines.push("", "Message du patient :", a.doctorMessage.trim());
  return lines.join("\n");
}

function formatGyno(a: GynoAnamnesis): string {
  const hasPain = a.symptoms.some((s) => s.toLowerCase().includes("douleur"));
  const lines = [
    "=== ANTÉCÉDENTS GYNÉCOLOGIQUES ===", "",
    `Motif principal : ${a.reason || "Non renseigné"}`,
    `Examen / soin concerné : ${a.examConcerned.length ? a.examConcerned.join(", ") : "Non renseigné"}`, "",
    `Symptômes : ${a.symptoms.length ? a.symptoms.join(", ") : "Non renseigné"}`,
    ...(a.duration ? [`Depuis : ${a.duration}`] : []),
    ...(hasPain && a.intensity > 0 ? [`Intensité douleur : ${a.intensity}/10`] : []), "",
    `Situation actuelle : ${a.situation || "Non renseigné"}`,
    `Dernière consultation gynéco : ${a.lastConsultation || "Non renseigné"}`,
    `Antécédents gynécologiques : ${a.pastHistory.length ? a.pastHistory.join(", ") : "Aucun"}`,
  ];
  if (a.doctorMessage.trim()) lines.push("", "Message de la patiente :", a.doctorMessage.trim());
  return lines.join("\n");
}

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.65)",
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.85)",
  boxShadow: "inset 0 2px 0 rgba(255,255,255,0.9), 0 8px 32px rgba(139,127,240,0.08)",
  borderRadius: "24px",
};

function NavBtn({ label, onClick, primary, disabled }: { label: React.ReactNode; onClick: () => void; primary?: boolean; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200"
      style={primary ? (disabled ? { background: "#D1D5DB", color: "white", cursor: "not-allowed", opacity: 0.6 } : {
        background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", color: "white", boxShadow: "0 4px 14px rgba(139,127,240,0.4)",
      }) : { border: "1px solid rgba(139,127,240,0.2)", color: "#6B6880", background: "rgba(255,255,255,0.7)" }}
    >{label}</button>
  );
}

function NewRequestForm() {
  const [step, setStep] = useState<Step>(1);
  const [specialty, setSpecialty] = useState<"DENTAL" | "GYNECOLOGY" | "">("");
  const [dental, setDental] = useState<DentalAnamnesis>(defaultDental);
  const [gyno, setGyno] = useState<GynoAnamnesis>(defaultGyno);
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
    accept: { "application/pdf": [".pdf"], "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/heic": [".heic"], "image/webp": [".webp"] },
    maxFiles: 5, maxSize: 16 * 1024 * 1024,
  });

  function setD<K extends keyof DentalAnamnesis>(key: K, value: DentalAnamnesis[K]) {
    setDental((prev) => ({ ...prev, [key]: value }));
  }
  function setG<K extends keyof GynoAnamnesis>(key: K, value: GynoAnamnesis[K]) {
    setGyno((prev) => ({ ...prev, [key]: value }));
  }

  const canProceedDental = dental.reason !== "" && dental.symptoms.length > 0;
  const canProceedGyno = gyno.reason !== "" && gyno.symptoms.length > 0;
  const canProceedAnamnesis = specialty === "DENTAL" ? canProceedDental : canProceedGyno;
  const hasDentalPain = dental.symptoms.some((s) => s.toLowerCase().includes("douleur") || s.toLowerCase().includes("sensibilité"));
  const hasGynoPain = gyno.symptoms.some((s) => s.toLowerCase().includes("douleur"));

  async function handleUpload() {
    if (files.length === 0) return;
    setUploading(true); setError("");
    try {
      const results = await startUpload(files);
      if (results && results.length > 0) {
        setUploadedUrls(results.map((r) => r.url));
        setUploadedKeys(results.map((r) => r.key));
        setStep(4);
      }
    } catch { setError("Erreur lors de l'envoi. Réessayez."); }
    setUploading(false);
  }

  async function handleSubmitAndPay() {
    setLoading(true); setError("");
    try {
      const message = specialty === "DENTAL" ? formatDental(dental) : formatGyno(gyno);
      const res = await fetch("/api/requests", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ specialty, pdfUrl: JSON.stringify(uploadedUrls), pdfKey: JSON.stringify(uploadedKeys), message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const checkoutRes = await fetch("/api/stripe/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: data.requestId }),
      });
      const checkoutData = await checkoutRes.json();
      if (!checkoutRes.ok) throw new Error(checkoutData.error);
      window.location.href = checkoutData.url;
    } catch { setError("Une erreur est survenue. Réessayez."); setLoading(false); }
  }

  const steps = [
    { n: 1, label: "Spécialité" },
    { n: 2, label: "Antécédents" },
    { n: 3, label: "Documents" },
    { n: 4, label: "Paiement" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-12">

        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#8B7FF0" }}>Nouvelle demande</p>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#2D2A3E" }}>Second avis médical</h1>
          <p className="text-sm mt-1.5" style={{ color: "#6B6880" }}>Complétez les étapes ci-dessous pour soumettre votre dossier.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={step > s.n ? { background: "#4CAF82", color: "white" }
                  : step === s.n ? { background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", color: "white", boxShadow: "0 2px 8px rgba(139,127,240,0.4)" }
                  : { background: "rgba(139,127,240,0.08)", color: "#B0ABBD" }}>
                {step > s.n ? <CheckCircle className="h-4 w-4" /> : s.n}
              </div>
              <span className="text-sm font-medium hidden sm:block" style={{ color: step >= s.n ? "#2D2A3E" : "#B0ABBD" }}>{s.label}</span>
              {i < steps.length - 1 && <div className="h-px flex-1 transition-colors duration-500"
                style={{ background: step > s.n ? "#4CAF82" : "rgba(139,127,240,0.12)" }} />}
            </div>
          ))}
        </div>

        <div style={cardStyle} className="p-8">

          {/* ── STEP 1 : Spécialité ── */}
          {step === 1 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#8B7FF0" }}>Étape 1</p>
              <h2 className="text-xl font-bold mb-1" style={{ color: "#2D2A3E" }}>Choisissez la spécialité</h2>
              <p className="text-sm mb-7" style={{ color: "#6B6880" }}>Sélectionnez le médecin correspondant à votre compte rendu.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { value: "DENTAL" as const, label: "Dentaire", sub: "Dr. xxxxxx xxxx", desc: "Chirurgien-dentiste", icon: <Stethoscope className="h-6 w-6" /> },
                  { value: "GYNECOLOGY" as const, label: "Gynécologie", sub: "Dr. xxxxxx xxxx", desc: "Gynécologue obstétricien", icon: <Baby className="h-6 w-6" /> },
                ].map((opt) => (
                  <button key={opt.value} onClick={() => setSpecialty(opt.value)}
                    className="p-6 rounded-2xl text-left transition-all duration-200"
                    style={specialty === opt.value ? {
                      border: "2px solid #8B7FF0", background: "rgba(139,127,240,0.06)", boxShadow: "0 0 0 4px rgba(139,127,240,0.08)",
                    } : { border: "1.5px solid rgba(139,127,240,0.15)", background: "rgba(255,255,255,0.7)" }}>
                    <div className="mb-4" style={{ color: specialty === opt.value ? "#8B7FF0" : "#B0ABBD" }}>{opt.icon}</div>
                    <div className="font-bold text-base" style={{ color: "#2D2A3E" }}>{opt.label}</div>
                    <div className="text-sm font-medium mt-1" style={{ color: "#8B7FF0" }}>{opt.sub}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#B0ABBD" }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
              <div className="mt-7 flex justify-end">
                <NavBtn label={<>Suivant <ChevronRight className="h-4 w-4" /></>} onClick={() => setStep(2)} primary disabled={!specialty} />
              </div>
            </div>
          )}

          {/* ── STEP 2 : Antécédents DENTAIRE ── */}
          {step === 2 && specialty === "DENTAL" && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#8B7FF0" }}>Étape 2 · Dentaire</p>
              <h2 className="text-xl font-bold mb-1" style={{ color: "#2D2A3E" }}>Antécédents dentaires</h2>
              <p className="text-sm mb-7" style={{ color: "#6B6880" }}>Quelques questions pour aider le chirurgien-dentiste à analyser votre dossier.</p>

              <div className="space-y-7">
                <FieldGroup label="Pourquoi consultez-vous ?" required>
                  <div className="flex flex-wrap gap-2">
                    {["Valider un devis", "Comprendre un diagnostic", "Douleur ou gêne", "Traitement proposé", "Autre"].map((r) => (
                      <RadioChip key={r} label={r} selected={dental.reason === r} onSelect={() => setD("reason", r)} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label="Soin(s) concerné(s)" hint="plusieurs choix possibles">
                  <div className="flex flex-wrap gap-2">
                    {["Implant", "Couronne / bridge", "Extraction", "Dévitalisation", "Détartrage / soin courant", "Prothèse", "Orthodontie / aligneurs", "Autre"].map((t) => (
                      <Chip key={t} label={t} selected={dental.treatments.includes(t)}
                        onToggle={() => setD("treatments", toggleMulti(dental.treatments, t))} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label="Symptômes actuels" required hint="plusieurs choix possibles">
                  <div className="flex flex-wrap gap-2">
                    {["Aucun", "Douleur spontanée", "Sensibilité chaud / froid", "Sensibilité à la pression", "Saignement des gencives", "Mobilité d'une dent", "Gonflement / abcès"].map((s) => (
                      <Chip key={s} label={s} selected={dental.symptoms.includes(s)}
                        onToggle={() => setD("symptoms", toggleMulti(dental.symptoms, s, "Aucun"))} />
                    ))}
                  </div>
                </FieldGroup>
                {dental.symptoms.length > 0 && !dental.symptoms.includes("Aucun") && (
                  <><Divider />
                    <FieldGroup label="Depuis quand ?">
                      <div className="flex flex-wrap gap-2">
                        {["Moins de 48h", "Quelques jours", "Plusieurs semaines", "Plus d'un mois"].map((d) => (
                          <RadioChip key={d} label={d} selected={dental.duration === d} onSelect={() => setD("duration", d)} />
                        ))}
                      </div>
                    </FieldGroup>
                  </>
                )}
                {hasDentalPain && (
                  <><Divider />
                    <FieldGroup label="Intensité de la douleur sur 10">
                      <IntensityPicker value={dental.intensity} onChange={(n) => setD("intensity", n)} />
                    </FieldGroup>
                  </>
                )}
                <Divider />
                <FieldGroup label="Avez-vous un devis chiffré ?">
                  <div className="flex gap-2">
                    {["Oui", "Non"].map((h) => (
                      <RadioChip key={h} label={h} selected={dental.hasQuote === h} onSelect={() => setD("hasQuote", h)} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label="Dernière visite chez le dentiste">
                  <div className="flex flex-wrap gap-2">
                    {["Moins de 6 mois", "6 mois – 1 an", "1 à 2 ans", "Plus de 2 ans"].map((v) => (
                      <RadioChip key={v} label={v} selected={dental.lastVisit === v} onSelect={() => setD("lastVisit", v)} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label="Traitements dentaires déjà réalisés" hint="plusieurs choix possibles">
                  <div className="flex flex-wrap gap-2">
                    {["Aucun", "Couronnes", "Implants", "Dévitalisations", "Prothèse", "Orthodontie"].map((p) => (
                      <Chip key={p} label={p} selected={dental.pastTreatments.includes(p)}
                        onToggle={() => setD("pastTreatments", toggleMulti(dental.pastTreatments, p, "Aucun"))} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label="Message au médecin" hint="optionnel">
                  <MessageField value={dental.doctorMessage} onChange={(v) => setD("doctorMessage", v)} />
                </FieldGroup>
              </div>

              <p className="text-xs text-center mt-6" style={{ color: "#B0ABBD" }}>
                Strictement confidentiel · transmis uniquement au chirurgien-dentiste assigné
              </p>
              <div className="mt-5 flex justify-between">
                <NavBtn label="Retour" onClick={() => setStep(1)} />
                <NavBtn label={<>Suivant <ChevronRight className="h-4 w-4" /></>} onClick={() => setStep(3)} primary disabled={!canProceedAnamnesis} />
              </div>
            </div>
          )}

          {/* ── STEP 2 : Antécédents GYNÉCOLOGIE ── */}
          {step === 2 && specialty === "GYNECOLOGY" && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#8B7FF0" }}>Étape 2 · Gynécologie</p>
              <h2 className="text-xl font-bold mb-1" style={{ color: "#2D2A3E" }}>Antécédents gynécologiques</h2>
              <p className="text-sm mb-7" style={{ color: "#6B6880" }}>Quelques questions pour aider le gynécologue à analyser votre dossier.</p>

              <div className="space-y-7">
                <FieldGroup label="Pourquoi consultez-vous ?" required>
                  <div className="flex flex-wrap gap-2">
                    {["Valider un diagnostic", "Résultat d'examen", "Douleur pelvienne", "Traitement proposé", "Désir de grossesse", "Autre"].map((r) => (
                      <RadioChip key={r} label={r} selected={gyno.reason === r} onSelect={() => setG("reason", r)} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label="Examen / soin concerné" hint="plusieurs choix possibles">
                  <div className="flex flex-wrap gap-2">
                    {["Échographie", "IRM pelvienne", "Frottis / colposcopie", "Hystéroscopie", "Cœlioscopie", "Bilan hormonal", "Contraception", "Autre"].map((e) => (
                      <Chip key={e} label={e} selected={gyno.examConcerned.includes(e)}
                        onToggle={() => setG("examConcerned", toggleMulti(gyno.examConcerned, e))} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label="Symptômes actuels" required hint="plusieurs choix possibles">
                  <div className="flex flex-wrap gap-2">
                    {["Aucun", "Douleurs pelviennes", "Règles irrégulières / abondantes", "Spotting / saignements", "Pertes inhabituelles", "Douleurs lors des rapports", "Gonflement abdominal"].map((s) => (
                      <Chip key={s} label={s} selected={gyno.symptoms.includes(s)}
                        onToggle={() => setG("symptoms", toggleMulti(gyno.symptoms, s, "Aucun"))} />
                    ))}
                  </div>
                </FieldGroup>
                {gyno.symptoms.length > 0 && !gyno.symptoms.includes("Aucun") && (
                  <><Divider />
                    <FieldGroup label="Depuis quand ?">
                      <div className="flex flex-wrap gap-2">
                        {["Moins d'une semaine", "Quelques semaines", "Plusieurs mois", "Plus d'un an"].map((d) => (
                          <RadioChip key={d} label={d} selected={gyno.duration === d} onSelect={() => setG("duration", d)} />
                        ))}
                      </div>
                    </FieldGroup>
                  </>
                )}
                {hasGynoPain && (
                  <><Divider />
                    <FieldGroup label="Intensité de la douleur sur 10">
                      <IntensityPicker value={gyno.intensity} onChange={(n) => setG("intensity", n)} />
                    </FieldGroup>
                  </>
                )}
                <Divider />
                <FieldGroup label="Situation actuelle">
                  <div className="flex flex-wrap gap-2">
                    {["Pas d'antécédents particuliers", "Enceinte / désir de grossesse", "Post-partum", "Ménopause", "Suivi gynécologique en cours"].map((s) => (
                      <RadioChip key={s} label={s} selected={gyno.situation === s} onSelect={() => setG("situation", s)} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label="Dernière consultation gynécologique">
                  <div className="flex flex-wrap gap-2">
                    {["Moins de 6 mois", "6 mois – 1 an", "1 à 2 ans", "Plus de 2 ans"].map((v) => (
                      <RadioChip key={v} label={v} selected={gyno.lastConsultation === v} onSelect={() => setG("lastConsultation", v)} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label="Antécédents gynécologiques" hint="plusieurs choix possibles">
                  <div className="flex flex-wrap gap-2">
                    {["Aucun", "Fibrome", "Kyste ovarien", "Endométriose", "Cancer gynécologique", "Chirurgie pelvienne"].map((p) => (
                      <Chip key={p} label={p} selected={gyno.pastHistory.includes(p)}
                        onToggle={() => setG("pastHistory", toggleMulti(gyno.pastHistory, p, "Aucun"))} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label="Message au médecin" hint="optionnel">
                  <MessageField value={gyno.doctorMessage} onChange={(v) => setG("doctorMessage", v)} />
                </FieldGroup>
              </div>

              <p className="text-xs text-center mt-6" style={{ color: "#B0ABBD" }}>
                Strictement confidentiel · transmis uniquement au gynécologue assigné
              </p>
              <div className="mt-5 flex justify-between">
                <NavBtn label="Retour" onClick={() => setStep(1)} />
                <NavBtn label={<>Suivant <ChevronRight className="h-4 w-4" /></>} onClick={() => setStep(3)} primary disabled={!canProceedAnamnesis} />
              </div>
            </div>
          )}

          {/* ── STEP 3 : Documents ── */}
          {step === 3 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#8B7FF0" }}>Étape 3</p>
              <h2 className="text-xl font-bold mb-1" style={{ color: "#2D2A3E" }}>Vos documents</h2>
              <p className="text-sm mb-7" style={{ color: "#6B6880" }}>PDF, photos (JPG, PNG, HEIC) · Max 5 fichiers · 16 Mo chacun</p>

              <div {...getRootProps()} className="rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 mb-4"
                style={isDragActive ? { border: "2px dashed #8B7FF0", background: "rgba(139,127,240,0.06)" }
                  : { border: "2px dashed rgba(139,127,240,0.2)", background: "rgba(255,255,255,0.5)" }}>
                <input {...getInputProps()} />
                <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(139,127,240,0.1)" }}>
                  <Upload className="h-5 w-5" style={{ color: "#8B7FF0" }} />
                </div>
                <p className="font-semibold text-sm" style={{ color: "#2D2A3E" }}>Glissez vos fichiers ici</p>
                <p className="text-xs mt-1" style={{ color: "#B0ABBD" }}>ou cliquez pour parcourir</p>
                <div className="flex justify-center gap-2 mt-4">
                  {["PDF", "JPG / PNG", "HEIC (iPhone)"].map((f) => (
                    <span key={f} className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                      style={{ background: "rgba(139,127,240,0.08)", color: "#8B7FF0" }}>{f}</span>
                  ))}
                </div>
              </div>

              {files.length > 0 && (
                <div className="space-y-2 mb-4">
                  {files.map((f, i) => <FilePreview key={i} file={f} onRemove={() => setFiles((p) => p.filter((_, j) => j !== i))} />)}
                  {files.length < 5 && (
                    <p className="text-xs text-center pt-1" style={{ color: "#B0ABBD" }}>
                      {files.length}/5 · Vous pouvez en ajouter {5 - files.length} de plus
                    </p>
                  )}
                </div>
              )}

              {error && <div className="text-sm rounded-xl px-4 py-3 mt-4"
                style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#dc2626" }}>{error}</div>}

              <div className="mt-6 flex justify-between">
                <NavBtn label="Retour" onClick={() => setStep(2)} />
                <NavBtn onClick={handleUpload} disabled={files.length === 0 || uploading} primary
                  label={uploading ? `Envoi… (${files.length} fichier${files.length > 1 ? "s" : ""})` : <><span>Suivant</span><ChevronRight className="h-4 w-4" /></>} />
              </div>
            </div>
          )}

          {/* ── STEP 4 : Paiement ── */}
          {step === 4 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#8B7FF0" }}>Étape 4</p>
              <h2 className="text-xl font-bold mb-1" style={{ color: "#2D2A3E" }}>Récapitulatif</h2>
              <p className="text-sm mb-7" style={{ color: "#6B6880" }}>Vérifiez votre demande avant de procéder au paiement.</p>

              <div className="rounded-2xl p-5 space-y-3 mb-6" style={{ background: "rgba(139,127,240,0.04)", border: "1px solid rgba(139,127,240,0.12)" }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6B6880" }}>Spécialité</span>
                  <span className="font-medium" style={{ color: "#2D2A3E" }}>{specialty === "DENTAL" ? "Dentaire — Dr Benguigui" : "Gynécologie — Dr. xxxxxx xxxx"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6B6880" }}>Motif</span>
                  <span className="font-medium" style={{ color: "#2D2A3E" }}>{(specialty === "DENTAL" ? dental.reason : gyno.reason) || "—"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6B6880" }}>Documents</span>
                  <span className="font-medium flex items-center gap-1.5" style={{ color: "#4CAF82" }}>
                    <CheckCircle className="h-3.5 w-3.5" />
                    {uploadedUrls.length} fichier{uploadedUrls.length > 1 ? "s" : ""} envoyé{uploadedUrls.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="pt-3 flex justify-between font-bold" style={{ borderTop: "1px solid rgba(139,127,240,0.12)" }}>
                  <span style={{ color: "#2D2A3E" }}>Total</span>
                  <span className="text-xl" style={{ color: "#8B7FF0" }}>22,00 €</span>
                </div>
              </div>

              <p className="text-xs text-center mb-6" style={{ color: "#B0ABBD" }}>
                Paiement sécurisé par Stripe · Aucune donnée bancaire stockée
              </p>

              {error && <div className="text-sm rounded-xl px-4 py-3 mb-4"
                style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#dc2626" }}>{error}</div>}

              <div className="flex justify-between">
                <NavBtn label="Retour" onClick={() => setStep(3)} />
                <NavBtn onClick={handleSubmitAndPay} disabled={loading} primary label={loading ? "Redirection…" : "Payer 22 €"} />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function NewRequestPage() {
  return <Suspense><NewRequestForm /></Suspense>;
}
