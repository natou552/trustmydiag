"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Clock,
  Upload,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import { useLang } from "@/contexts/language";
import { t } from "@/lib/translations";
import { motion, useScroll, useTransform, type Variants, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

function FaqSection({ tr }: { tr: typeof t["fr"] | typeof t["en"] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-24 px-6" style={{ background: "#F4F3F8" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#8B7FF0" }}>{tr.faq.eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#2D2A3E" }}>{tr.faq.h2}</h2>
        </motion.div>
        <div className="space-y-3">
          {tr.faq.items.map((item, i) => (
            <motion.div key={i} variants={stagger(i * 0.05)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(20px)",
                border: open === i ? "1px solid rgba(139,127,240,0.2)" : "1px solid rgba(255,255,255,0.9)",
                boxShadow: open === i ? "0 4px 20px rgba(139,127,240,0.1)" : "0 2px 12px rgba(139,127,240,0.05)",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            >
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                <span className="text-sm font-semibold pr-4" style={{ color: "#2D2A3E" }}>{item.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="flex-shrink-0">
                  <ChevronDown className="h-4 w-4" style={{ color: "#8B7FF0" }} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#6B6880" }}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/faq" className="text-sm font-medium" style={{ color: "#8B7FF0" }}>
            Voir toutes les questions →
          </Link>
        </div>
      </div>
    </section>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut", delay } },
});

export default function HomePage() {
  const { lang } = useLang();
  const tr = t[lang];
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen text-[#1D1D1F]" style={{ background: "#F4F3F8" }}>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner { animation: marquee 32s linear infinite; }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-12 pb-28 px-6 text-center"
        style={{
          background: "linear-gradient(160deg, #EEF0FB 0%, #F4F3F8 35%, #FDE8E0 65%, #F4F3F8 100%)",
        }}
      >
        {/* Orbs décoratifs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(circle, #C4A8D4 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #F9C4B0 0%, transparent 70%)", filter: "blur(60px)" }} />

        <motion.div className="max-w-3xl mx-auto relative" style={{ y: heroY, opacity: heroOpacity }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full mb-6 shadow-sm"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(139,127,240,0.2)",
              color: "#8B7FF0",
            }}
          >
            <Clock className="h-3 w-3" />
            {tr.hero.badge}
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-6xl sm:text-7xl md:text-[86px] leading-[1.05] tracking-tight mb-6"
            style={{ fontWeight: 700 }}
          >
            <span style={{ fontWeight: 300, color: "#4A4458" }}>{tr.hero.h1} </span>
            <em className="not-italic" style={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #8B7FF0 0%, #C4A8D4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {tr.hero.h1Accent}
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-lg max-w-xl mx-auto leading-relaxed mb-10"
            style={{ color: "#6B6880" }}
          >
            {tr.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link href="/register">
              <button
                className="inline-flex items-center gap-2 text-white text-sm font-semibold px-8 py-4 rounded-full transition-all duration-200 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #8B7FF0 0%, #6B5FD0 100%)",
                  boxShadow: "0 8px 24px rgba(139,127,240,0.35)",
                }}
              >
                {tr.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="#how">
              <button
                className="inline-flex items-center gap-2 text-sm font-medium px-8 py-4 rounded-full transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.9)",
                  color: "#4A4458",
                }}
              >
                {tr.hero.howItWorks}
              </button>
            </Link>
          </motion.div>

          {/* Stats glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            className="flex flex-wrap justify-center gap-4 mt-14"
          >
            {[
              { value: "22€", label: "Prix fixe, sans surprise" },
              { value: "72h", label: "Délai de réponse garanti" },
              { value: "100%", label: "Médecins diplômés" },
            ].map((s) => (
              <div
                key={s.value}
                className="flex flex-col items-center px-8 py-5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.9)",
                  boxShadow: "0 4px 20px rgba(139,127,240,0.08)",
                }}
              >
                <span className="text-2xl font-bold" style={{ color: "#8B7FF0" }}>{s.value}</span>
                <span className="text-xs mt-1" style={{ color: "#9B98A8" }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-4 overflow-hidden" style={{ borderTop: "1px solid rgba(139,127,240,0.1)", borderBottom: "1px solid rgba(139,127,240,0.1)", background: "rgba(255,255,255,0.6)" }}>
        <div className="flex whitespace-nowrap">
          <div className="marquee-inner flex gap-12 items-center">
            {tr.marquee.map((item, i) => (
              <span key={i} className="flex items-center gap-2.5 text-xs flex-shrink-0" style={{ color: "#B0ABBD" }}>
                <span className="w-1 h-1 rounded-full" style={{ background: "#C4A8D4" }} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-28 px-6" style={{ background: "#F4F3F8" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-20"
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#8B7FF0" }}>{tr.how.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#2D2A3E" }}>{tr.how.h2}</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {tr.how.steps.map((item, i) => {
              const icons = [
                <Upload key="u" className="h-5 w-5" />,
                <CreditCard key="c" className="h-5 w-5" />,
                <MessageSquare key="m" className="h-5 w-5" />,
              ];
              const gradients = [
                "linear-gradient(135deg, #8B7FF0, #C4A8D4)",
                "linear-gradient(135deg, #C4A8D4, #F9C4B0)",
                "linear-gradient(135deg, #7EC8C8, #8B7FF0)",
              ];
              return (
                <motion.div
                  key={item.step}
                  variants={stagger(i * 0.12)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="rounded-3xl p-8 relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    boxShadow: "0 4px 24px rgba(139,127,240,0.07)",
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  {/* Gradient top border */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl" style={{ background: gradients[i] }} />

                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6 text-white"
                    style={{ background: gradients[i] }}
                  >
                    {icons[i]}
                  </div>
                  <p className="text-xs font-medium mb-2" style={{ color: "#B0ABBD" }}>Étape {item.step}</p>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "#2D2A3E" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B6880" }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section id="doctors" className="py-28 px-6" style={{ background: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-20"
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#8B7FF0" }}>{tr.doctors.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#2D2A3E" }}>{tr.doctors.h2}</h2>
            <p className="text-lg mt-4 max-w-lg mx-auto" style={{ color: "#6B6880" }}>{tr.doctors.sub}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {tr.doctors.list.map((doc, i) => {
              const avatarGradients = [
                "linear-gradient(135deg, #8B7FF0, #C4A8D4)",
                "linear-gradient(135deg, #F9C4B0, #C4A8D4)",
              ];
              const pillStyles = [
                { bg: "rgba(139,127,240,0.1)", color: "#8B7FF0" },
                { bg: "rgba(249,196,176,0.3)", color: "#C4776A" },
              ];
              const initials = ["RB", "YB"];
              return (
                <motion.div
                  key={doc.name}
                  initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                  className="rounded-3xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.75)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    boxShadow: "0 4px 24px rgba(139,127,240,0.08)",
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="p-8" style={{ background: "linear-gradient(135deg, rgba(244,243,248,0.8), rgba(238,240,251,0.6))" }}>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-base font-semibold flex-shrink-0"
                        style={{ background: avatarGradients[i] }}
                      >
                        {initials[i]}
                      </div>
                      <div>
                        <p className="text-xs mb-0.5" style={{ color: "#B0ABBD" }}>{doc.tag}</p>
                        <h3 className="font-bold text-lg leading-tight" style={{ color: "#2D2A3E" }}>{doc.name}</h3>
                        <p className="text-sm" style={{ color: "#8B7FF0" }}>{doc.specialty}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-8 py-7">
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "#6B6880" }}>{doc.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {doc.features.map((f) => (
                        <span
                          key={f}
                          className="text-xs px-3 py-1.5 rounded-full font-medium"
                          style={{ background: pillStyles[i].bg, color: pillStyles[i].color }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EXEMPLE RAPPORT ── */}
      <section className="py-24 px-6" style={{ background: "#F4F3F8" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#8B7FF0" }}>Transparence</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: "#2D2A3E" }}>
              Voyez ce que vous recevez pour 22€
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#6B6880" }}>
              Un exemple réel de rapport médical (anonymisé). Vous recevrez exactement ce niveau de détail.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 8px 32px rgba(139,127,240,0.1)",
            }}
          >
            <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: "1px solid rgba(139,127,240,0.08)", background: "rgba(255,255,255,0.5)" }}>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="text-xs ml-2" style={{ color: "#B0ABBD" }}>rapport-second-avis-exemple.pdf</span>
            </div>

            <div className="p-8 md:p-12 grid md:grid-cols-2 gap-10">
              <div className="space-y-5">
                {[
                  { label: "Contexte patient", color: "#8B7FF0", bars: [1, 4/5, 3/4] },
                  { label: "Analyse du compte rendu", color: "#6B6880", bars: [1, 5/6, 1, 2/3] },
                  { label: "Avis du spécialiste", color: "#6B6880", barColor: "rgba(139,127,240,0.15)", bars: [1, 4/5, 1, 3/5, 5/6] },
                ].map((section) => (
                  <div key={section.label}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: section.color }}>{section.label}</p>
                    <div className="space-y-2">
                      {section.bars.map((w, idx) => (
                        <div key={idx} className="h-2.5 rounded-full" style={{ width: `${w * 100}%`, background: section.barColor || "rgba(196,168,212,0.2)" }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#6B6880" }}>Recommandations</p>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #8B7FF0, #C4A8D4)" }}>
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <div className="h-2.5 rounded-full w-full" style={{ background: "rgba(196,168,212,0.2)" }} />
                          <div className="h-2.5 rounded-full w-3/4" style={{ background: "rgba(196,168,212,0.2)" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl p-5" style={{ background: "rgba(139,127,240,0.06)", border: "1px solid rgba(139,127,240,0.12)" }}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#8B7FF0" }}>Conclusion médicale</p>
                  <div className="space-y-2">
                    {[1, 5/6, 4/5].map((w, i) => (
                      <div key={i} className="h-2.5 rounded-full" style={{ width: `${w * 100}%`, background: "rgba(139,127,240,0.15)" }} />
                    ))}
                  </div>
                  <div className="mt-4 pt-4 flex items-center gap-3" style={{ borderTop: "1px solid rgba(139,127,240,0.1)" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #8B7FF0, #C4A8D4)" }}>
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="h-2 rounded-full w-24 mb-1" style={{ background: "rgba(196,168,212,0.3)" }} />
                      <div className="h-2 rounded-full w-16" style={{ background: "rgba(196,168,212,0.2)" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 md:px-12 pb-10 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="/api/exemple-rapport"
                target="_blank"
                className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", boxShadow: "0 6px 20px rgba(139,127,240,0.3)" }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                Télécharger l&apos;exemple (PDF)
              </a>
              <p className="text-xs" style={{ color: "#B0ABBD" }}>Données 100% anonymisées · Cas réel</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-28 px-6" style={{ background: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-20"
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#8B7FF0" }}>{tr.pricing.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#2D2A3E" }}>{tr.pricing.h2}</h2>
            <p className="text-lg mt-4" style={{ color: "#6B6880" }}>{tr.pricing.sub}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto rounded-3xl overflow-hidden relative"
            style={{
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.95)",
              boxShadow: "0 12px 48px rgba(139,127,240,0.15)",
            }}
          >
            {/* Gradient top border */}
            <div className="h-1" style={{ background: "linear-gradient(90deg, #8B7FF0, #C4A8D4, #F9C4B0)" }} />

            <div className="px-10 pt-10 pb-8">
              <div className="flex items-end gap-2 mb-2">
                <span className="text-7xl font-bold tracking-tight leading-none" style={{ color: "#2D2A3E" }}>22€</span>
                <span className="text-sm mb-3" style={{ color: "#B0ABBD" }}>{tr.pricing.priceLabel}</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest mt-6 mb-5" style={{ color: "#B0ABBD" }}>{tr.pricing.included}</p>
              <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                {tr.pricing.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "#4A4458" }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #8B7FF0, #C4A8D4)" }}>
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="block">
                <button
                  className="w-full inline-flex items-center justify-center gap-2 text-white text-sm font-semibold py-4 rounded-full transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #8B7FF0 0%, #6B5FD0 100%)",
                    boxShadow: "0 8px 24px rgba(139,127,240,0.35)",
                  }}
                >
                  {tr.pricing.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection tr={tr} />

      {/* ── CTA ── */}
      <section
        className="py-32 px-6 text-center"
        style={{
          background: "linear-gradient(160deg, #EEF0FB 0%, #F4F3F8 40%, #FDE8E0 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(139,127,240,0.12) 0%, transparent 60%)",
        }} />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl mx-auto relative"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "#8B7FF0" }}>{tr.cta.eyebrow}</p>
          <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6" style={{ color: "#2D2A3E" }}>
            {tr.cta.h2}
          </h2>
          <p className="text-lg mb-10" style={{ color: "#6B6880" }}>{tr.cta.sub}</p>
          <Link href="/register">
            <button
              className="inline-flex items-center gap-2 text-white text-sm font-semibold px-10 py-4 rounded-full transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #8B7FF0 0%, #6B5FD0 100%)",
                boxShadow: "0 12px 32px rgba(139,127,240,0.35)",
              }}
            >
              {tr.cta.button}
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
          <p className="text-xs mt-5" style={{ color: "#B0ABBD" }}>{tr.cta.trust}</p>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pt-14 pb-8 px-6" style={{ background: "#2D2A3E", color: "#9B98A8" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: "#F4F3F8" }}>
                <Shield className="h-4 w-4" style={{ color: "#8B7FF0" }} />
                TrustMyDiag
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#A09DB8" }}>{tr.footer.tagline}</p>
            </div>

            {[
              { title: tr.footer.nav, links: tr.footer.navLinks },
              { title: tr.footer.learn, links: tr.footer.learnLinks },
              { title: tr.footer.company, links: tr.footer.companyLinks },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#F4F3F8" }}>{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: "#C4C2D4" }}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-xs" style={{ color: "#C4C2D4" }}>© {new Date().getFullYear()} {tr.footer.copyright}</p>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5" style={{ border: "1px solid rgba(139,127,240,0.2)", background: "rgba(139,127,240,0.08)" }}>
                <svg className="h-3.5 w-3.5" style={{ color: "#8B7FF0" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#8B7FF0" }}>RGPD</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5" style={{ border: "1px solid rgba(196,168,212,0.2)", background: "rgba(196,168,212,0.08)" }}>
                <svg className="h-3.5 w-3.5" style={{ color: "#C4A8D4" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#C4A8D4" }}>HDS</span>
                <span className="text-[10px]" style={{ color: "#C4C2D4" }}>En cours</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              {tr.footer.legal.map((l) => (
                <Link key={l.href} href={l.href} className="text-xs transition-colors hover:text-white" style={{ color: "#C4C2D4" }}>{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
