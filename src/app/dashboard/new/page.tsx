"use client";

import { useState, useCallback, Suspense } from "react";
import { Header } from "@/components/header";
import { CheckCircle, Upload, FileText, ChevronRight, Stethoscope, Baby, X, Image as ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing-client";
import { useLang } from "@/contexts/language";
import { t } from "@/lib/translations";

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

function IntensityPicker({ value, onChange, low, high }: { value: number; onChange: (n: number) => void; low: string; high: string }) {
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
        <span>{low}</span><span>{high}</span>
      </div>
    </>
  );
}

function MessageField({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3} className="w-full text-sm resize-none focus:outline-none placeholder:text-[#C8C4D4]"
      style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(139,127,240,0.18)", borderRadius: "12px", padding: "12px 16px", color: "#2D2A3E" }}
      onFocus={e => (e.target.style.border = "1px solid rgba(139,127,240,0.5)")}
      onBlur={e => (e.target.style.border = "1px solid rgba(139,127,240,0.18)")}
    />
  );
}

function FilePreview({ file, onRemove, moLabel }: { file: File; onRemove: () => void; moLabel: string }) {
  const isImage = file.type.startsWith("image/");
  const sizeMb = (file.size / 1024 / 1024).toFixed(1);
  return (
    <div className="flex items-center gap-3 rounded-xl px-4 py-3"
      style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(139,127,240,0.12)" }}>
      {isImage ? <ImageIcon className="h-5 w-5 flex-shrink-0" style={{ color: "#8B7FF0" }} />
        : <FileText className="h-5 w-5 flex-shrink-0" style={{ color: "#8B7FF0" }} />}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: "#2D2A3E" }}>{file.name}</p>
        <p className="text-xs" style={{ color: "#B0ABBD" }}>{sizeMb} {moLabel}</p>
      </div>
      <button onClick={onRemove} className="transition-colors flex-shrink-0" style={{ color: "#B0ABBD" }}
        onMouseEnter={e => (e.currentTarget.style.color = "#e57373")}
        onMouseLeave={e => (e.currentTarget.style.color = "#B0ABBD")}>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function formatDental(a: DentalAnamnesis, hasPain: boolean): string {
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

function formatGyno(a: GynoAnamnesis, hasPain: boolean): string {
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
  const { lang } = useLang();
  const tr = t[lang].newRequest;

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

  // Pain detection by option index (language-agnostic)
  const dentalPainOpts = [1, 2, 3].map(i => tr.step2dental.symptomsOptions[i] as string);
  const gynoPainOpts = [1].map(i => tr.step2gyno.symptomsOptions[i] as string);
  const hasDentalPain = dental.symptoms.some(s => dentalPainOpts.includes(s));
  const hasGynoPain = gyno.symptoms.some(s => gynoPainOpts.includes(s));

  const noneOptDental = tr.step2dental.symptomsOptions[0];
  const noneOptGyno = tr.step2gyno.symptomsOptions[0];
  const noneOptDentalPast = tr.step2dental.pastOptions[0];
  const noneOptGynoPast = tr.step2gyno.pastOptions[0];

  const canProceedDental = dental.reason !== "" && dental.symptoms.length > 0;
  const canProceedGyno = gyno.reason !== "" && gyno.symptoms.length > 0;
  const canProceedAnamnesis = specialty === "DENTAL" ? canProceedDental : canProceedGyno;

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
    } catch { setError(tr.step3.errorUpload); }
    setUploading(false);
  }

  async function handleSubmitAndPay() {
    setLoading(true); setError("");
    try {
      const message = specialty === "DENTAL" ? formatDental(dental, hasDentalPain) : formatGyno(gyno, hasGynoPain);
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
    } catch { setError(tr.step4.errorSubmit); setLoading(false); }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-12">

        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#8B7FF0" }}>{tr.pageEyebrow}</p>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#2D2A3E" }}>{tr.pageTitle}</h1>
          <p className="text-sm mt-1.5" style={{ color: "#6B6880" }}>{tr.pageSub}</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-8">
          {tr.steps.map((label, i) => {
            const n = i + 1;
            return (
              <div key={n} className="flex items-center gap-2 flex-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={step > n ? { background: "#4CAF82", color: "white" }
                    : step === n ? { background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", color: "white", boxShadow: "0 2px 8px rgba(139,127,240,0.4)" }
                    : { background: "rgba(139,127,240,0.08)", color: "#B0ABBD" }}>
                  {step > n ? <CheckCircle className="h-4 w-4" /> : n}
                </div>
                <span className="text-sm font-medium hidden sm:block" style={{ color: step >= n ? "#2D2A3E" : "#B0ABBD" }}>{label}</span>
                {i < tr.steps.length - 1 && <div className="h-px flex-1 transition-colors duration-500"
                  style={{ background: step > n ? "#4CAF82" : "rgba(139,127,240,0.12)" }} />}
              </div>
            );
          })}
        </div>

        <div style={cardStyle} className="p-8">

          {/* ── STEP 1 : Spécialité ── */}
          {step === 1 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#8B7FF0" }}>{tr.step1.eyebrow}</p>
              <h2 className="text-xl font-bold mb-1" style={{ color: "#2D2A3E" }}>{tr.step1.title}</h2>
              <p className="text-sm mb-7" style={{ color: "#6B6880" }}>{tr.step1.sub}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { value: "DENTAL" as const, label: tr.step1.dental.label, sub: tr.step1.dental.sub, desc: tr.step1.dental.desc, icon: <Stethoscope className="h-6 w-6" /> },
                  { value: "GYNECOLOGY" as const, label: tr.step1.gynecology.label, sub: tr.step1.gynecology.sub, desc: tr.step1.gynecology.desc, icon: <Baby className="h-6 w-6" /> },
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
                <NavBtn label={<>{tr.step1.next} <ChevronRight className="h-4 w-4" /></>} onClick={() => setStep(2)} primary disabled={!specialty} />
              </div>
            </div>
          )}

          {/* ── STEP 2 : Antécédents DENTAIRE ── */}
          {step === 2 && specialty === "DENTAL" && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#8B7FF0" }}>{tr.step2dental.eyebrow}</p>
              <h2 className="text-xl font-bold mb-1" style={{ color: "#2D2A3E" }}>{tr.step2dental.title}</h2>
              <p className="text-sm mb-7" style={{ color: "#6B6880" }}>{tr.step2dental.sub}</p>

              <div className="space-y-7">
                <FieldGroup label={tr.step2dental.reasonLabel} required>
                  <div className="flex flex-wrap gap-2">
                    {tr.step2dental.reasonOptions.map((r) => (
                      <RadioChip key={r} label={r} selected={dental.reason === r} onSelect={() => setD("reason", r)} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label={tr.step2dental.treatmentsLabel} hint={tr.multipleChoices}>
                  <div className="flex flex-wrap gap-2">
                    {tr.step2dental.treatmentsOptions.map((t2) => (
                      <Chip key={t2} label={t2} selected={dental.treatments.includes(t2)}
                        onToggle={() => setD("treatments", toggleMulti(dental.treatments, t2))} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label={tr.step2dental.symptomsLabel} required hint={tr.multipleChoices}>
                  <div className="flex flex-wrap gap-2">
                    {tr.step2dental.symptomsOptions.map((s) => (
                      <Chip key={s} label={s} selected={dental.symptoms.includes(s)}
                        onToggle={() => setD("symptoms", toggleMulti(dental.symptoms, s, noneOptDental))} />
                    ))}
                  </div>
                </FieldGroup>
                {dental.symptoms.length > 0 && !dental.symptoms.includes(noneOptDental) && (
                  <><Divider />
                    <FieldGroup label={tr.step2dental.durationLabel}>
                      <div className="flex flex-wrap gap-2">
                        {tr.step2dental.durationOptions.map((d) => (
                          <RadioChip key={d} label={d} selected={dental.duration === d} onSelect={() => setD("duration", d)} />
                        ))}
                      </div>
                    </FieldGroup>
                  </>
                )}
                {hasDentalPain && (
                  <><Divider />
                    <FieldGroup label={tr.step2dental.intensityLabel}>
                      <IntensityPicker value={dental.intensity} onChange={(n) => setD("intensity", n)}
                        low={tr.step2dental.intensityLow} high={tr.step2dental.intensityHigh} />
                    </FieldGroup>
                  </>
                )}
                <Divider />
                <FieldGroup label={tr.step2dental.quoteLabel}>
                  <div className="flex gap-2">
                    {tr.step2dental.quoteOptions.map((h) => (
                      <RadioChip key={h} label={h} selected={dental.hasQuote === h} onSelect={() => setD("hasQuote", h)} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label={tr.step2dental.lastVisitLabel}>
                  <div className="flex flex-wrap gap-2">
                    {tr.step2dental.lastVisitOptions.map((v) => (
                      <RadioChip key={v} label={v} selected={dental.lastVisit === v} onSelect={() => setD("lastVisit", v)} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label={tr.step2dental.pastLabel} hint={tr.multipleChoices}>
                  <div className="flex flex-wrap gap-2">
                    {tr.step2dental.pastOptions.map((p) => (
                      <Chip key={p} label={p} selected={dental.pastTreatments.includes(p)}
                        onToggle={() => setD("pastTreatments", toggleMulti(dental.pastTreatments, p, noneOptDentalPast))} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label={tr.step2dental.messageLabel} hint={tr.optional}>
                  <MessageField value={dental.doctorMessage} onChange={(v) => setD("doctorMessage", v)} placeholder={tr.messagePlaceholder} />
                </FieldGroup>
              </div>

              <p className="text-xs text-center mt-6" style={{ color: "#B0ABBD" }}>{tr.step2dental.confidential}</p>
              <div className="mt-5 flex justify-between">
                <NavBtn label={t[lang === "fr" ? "fr" : "en"].newRequest.step3.back} onClick={() => setStep(1)} />
                <NavBtn label={<>{tr.step1.next} <ChevronRight className="h-4 w-4" /></>} onClick={() => setStep(3)} primary disabled={!canProceedAnamnesis} />
              </div>
            </div>
          )}

          {/* ── STEP 2 : Antécédents GYNÉCOLOGIE ── */}
          {step === 2 && specialty === "GYNECOLOGY" && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#8B7FF0" }}>{tr.step2gyno.eyebrow}</p>
              <h2 className="text-xl font-bold mb-1" style={{ color: "#2D2A3E" }}>{tr.step2gyno.title}</h2>
              <p className="text-sm mb-7" style={{ color: "#6B6880" }}>{tr.step2gyno.sub}</p>

              <div className="space-y-7">
                <FieldGroup label={tr.step2gyno.reasonLabel} required>
                  <div className="flex flex-wrap gap-2">
                    {tr.step2gyno.reasonOptions.map((r) => (
                      <RadioChip key={r} label={r} selected={gyno.reason === r} onSelect={() => setG("reason", r)} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label={tr.step2gyno.examLabel} hint={tr.multipleChoices}>
                  <div className="flex flex-wrap gap-2">
                    {tr.step2gyno.examOptions.map((e) => (
                      <Chip key={e} label={e} selected={gyno.examConcerned.includes(e)}
                        onToggle={() => setG("examConcerned", toggleMulti(gyno.examConcerned, e))} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label={tr.step2gyno.symptomsLabel} required hint={tr.multipleChoices}>
                  <div className="flex flex-wrap gap-2">
                    {tr.step2gyno.symptomsOptions.map((s) => (
                      <Chip key={s} label={s} selected={gyno.symptoms.includes(s)}
                        onToggle={() => setG("symptoms", toggleMulti(gyno.symptoms, s, noneOptGyno))} />
                    ))}
                  </div>
                </FieldGroup>
                {gyno.symptoms.length > 0 && !gyno.symptoms.includes(noneOptGyno) && (
                  <><Divider />
                    <FieldGroup label={tr.step2gyno.durationLabel}>
                      <div className="flex flex-wrap gap-2">
                        {tr.step2gyno.durationOptions.map((d) => (
                          <RadioChip key={d} label={d} selected={gyno.duration === d} onSelect={() => setG("duration", d)} />
                        ))}
                      </div>
                    </FieldGroup>
                  </>
                )}
                {hasGynoPain && (
                  <><Divider />
                    <FieldGroup label={tr.step2gyno.intensityLabel}>
                      <IntensityPicker value={gyno.intensity} onChange={(n) => setG("intensity", n)}
                        low={tr.step2gyno.intensityLow} high={tr.step2gyno.intensityHigh} />
                    </FieldGroup>
                  </>
                )}
                <Divider />
                <FieldGroup label={tr.step2gyno.situationLabel}>
                  <div className="flex flex-wrap gap-2">
                    {tr.step2gyno.situationOptions.map((s) => (
                      <RadioChip key={s} label={s} selected={gyno.situation === s} onSelect={() => setG("situation", s)} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label={tr.step2gyno.lastConsultLabel}>
                  <div className="flex flex-wrap gap-2">
                    {tr.step2gyno.lastConsultOptions.map((v) => (
                      <RadioChip key={v} label={v} selected={gyno.lastConsultation === v} onSelect={() => setG("lastConsultation", v)} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label={tr.step2gyno.pastLabel} hint={tr.multipleChoices}>
                  <div className="flex flex-wrap gap-2">
                    {tr.step2gyno.pastOptions.map((p) => (
                      <Chip key={p} label={p} selected={gyno.pastHistory.includes(p)}
                        onToggle={() => setG("pastHistory", toggleMulti(gyno.pastHistory, p, noneOptGynoPast))} />
                    ))}
                  </div>
                </FieldGroup>
                <Divider />
                <FieldGroup label={tr.step2gyno.messageLabel} hint={tr.optional}>
                  <MessageField value={gyno.doctorMessage} onChange={(v) => setG("doctorMessage", v)} placeholder={tr.messagePlaceholder} />
                </FieldGroup>
              </div>

              <p className="text-xs text-center mt-6" style={{ color: "#B0ABBD" }}>{tr.step2gyno.confidential}</p>
              <div className="mt-5 flex justify-between">
                <NavBtn label={tr.step3.back} onClick={() => setStep(1)} />
                <NavBtn label={<>{tr.step1.next} <ChevronRight className="h-4 w-4" /></>} onClick={() => setStep(3)} primary disabled={!canProceedAnamnesis} />
              </div>
            </div>
          )}

          {/* ── STEP 3 : Documents ── */}
          {step === 3 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#8B7FF0" }}>{tr.step3.eyebrow}</p>
              <h2 className="text-xl font-bold mb-1" style={{ color: "#2D2A3E" }}>{tr.step3.title}</h2>
              <p className="text-sm mb-7" style={{ color: "#6B6880" }}>{tr.step3.sub}</p>

              <div {...getRootProps()} className="rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 mb-4"
                style={isDragActive ? { border: "2px dashed #8B7FF0", background: "rgba(139,127,240,0.06)" }
                  : { border: "2px dashed rgba(139,127,240,0.2)", background: "rgba(255,255,255,0.5)" }}>
                <input {...getInputProps()} />
                <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(139,127,240,0.1)" }}>
                  <Upload className="h-5 w-5" style={{ color: "#8B7FF0" }} />
                </div>
                <p className="font-semibold text-sm" style={{ color: "#2D2A3E" }}>{tr.step3.dropzone}</p>
                <p className="text-xs mt-1" style={{ color: "#B0ABBD" }}>{tr.step3.dropzoneSub}</p>
                <div className="flex justify-center gap-2 mt-4">
                  {tr.step3.formats.map((f) => (
                    <span key={f} className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                      style={{ background: "rgba(139,127,240,0.08)", color: "#8B7FF0" }}>{f}</span>
                  ))}
                </div>
              </div>

              {files.length > 0 && (
                <div className="space-y-2 mb-4">
                  {files.map((f, i) => <FilePreview key={i} file={f} moLabel={tr.step3.mo} onRemove={() => setFiles((p) => p.filter((_, j) => j !== i))} />)}
                  {files.length < 5 && (
                    <p className="text-xs text-center pt-1" style={{ color: "#B0ABBD" }}>
                      {tr.step3.fileCount(files.length, 5)}
                    </p>
                  )}
                </div>
              )}

              {error && <div className="text-sm rounded-xl px-4 py-3 mt-4"
                style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#dc2626" }}>{error}</div>}

              <div className="mt-6 flex justify-between">
                <NavBtn label={tr.step3.back} onClick={() => setStep(2)} />
                <NavBtn onClick={handleUpload} disabled={files.length === 0 || uploading} primary
                  label={uploading ? tr.step3.uploading(files.length) : <><span>{tr.step1.next}</span><ChevronRight className="h-4 w-4" /></>} />
              </div>
            </div>
          )}

          {/* ── STEP 4 : Paiement ── */}
          {step === 4 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#8B7FF0" }}>{tr.step4.eyebrow}</p>
              <h2 className="text-xl font-bold mb-1" style={{ color: "#2D2A3E" }}>{tr.step4.title}</h2>
              <p className="text-sm mb-7" style={{ color: "#6B6880" }}>{tr.step4.sub}</p>

              <div className="rounded-2xl p-5 space-y-3 mb-6" style={{ background: "rgba(139,127,240,0.04)", border: "1px solid rgba(139,127,240,0.12)" }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6B6880" }}>{tr.step4.specialty}</span>
                  <span className="font-medium" style={{ color: "#2D2A3E" }}>{specialty === "DENTAL" ? tr.step4.specialtyDental : tr.step4.specialtyGyno}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6B6880" }}>{tr.step4.reason}</span>
                  <span className="font-medium" style={{ color: "#2D2A3E" }}>{(specialty === "DENTAL" ? dental.reason : gyno.reason) || "—"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6B6880" }}>{tr.step4.documents}</span>
                  <span className="font-medium flex items-center gap-1.5" style={{ color: "#4CAF82" }}>
                    <CheckCircle className="h-3.5 w-3.5" />
                    {tr.step4.filesSent(uploadedUrls.length)}
                  </span>
                </div>
                <div className="pt-3 flex justify-between font-bold" style={{ borderTop: "1px solid rgba(139,127,240,0.12)" }}>
                  <span style={{ color: "#2D2A3E" }}>{tr.step4.total}</span>
                  <span className="text-xl" style={{ color: "#8B7FF0" }}>22,00 €</span>
                </div>
              </div>

              <p className="text-xs text-center mb-6" style={{ color: "#B0ABBD" }}>{tr.step4.stripe}</p>

              {error && <div className="text-sm rounded-xl px-4 py-3 mb-4"
                style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#dc2626" }}>{error}</div>}

              <div className="flex justify-between">
                <NavBtn label={tr.step4.back} onClick={() => setStep(3)} />
                <NavBtn onClick={handleSubmitAndPay} disabled={loading} primary label={loading ? tr.step4.redirecting : tr.step4.pay} />
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
