"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Upload,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import { useLang } from "@/contexts/language";
import { t } from "@/lib/translations";
import { motion, useScroll, useTransform, type Variants, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { HowItWorksScroll } from "@/components/how-it-works-scroll";

function FaqSection({ tr }: { tr: typeof t["fr"] | typeof t["en"] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 px-6" style={{ background: "transparent" }}>
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
                background: "rgba(255,255,255,0.58)",
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
            {tr.faq.seeAll}
          </Link>
        </div>
      </div>
    </section>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay } },
});

export default function HomePage() {
  const { lang } = useLang();
  const tr = t[lang];
  const heroRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="min-h-screen text-[#1D1D1F]">
      <Header />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-14 pb-20 px-6 text-center"
        style={{ background: "transparent" }}
      >

        <motion.div className="max-w-4xl mx-auto relative" style={isMobile ? {} : { y: heroY, opacity: heroOpacity }}>
          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="text-6xl sm:text-7xl md:text-[88px] leading-[1.05] tracking-tight mb-6"
          >
            <span style={{ fontWeight: 400, color: "#2D2A3E" }}>{tr.hero.h1}</span>
            <br />
            <span style={{ fontWeight: 400, color: "#2D2A3E" }}>{tr.hero.h1Mid} </span>
            <em className="not-italic" style={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #8B7FF0 0%, #C4A8D4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>{tr.hero.h1AccentInline}</em>
            <br />
            <em className="not-italic" style={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #8B7FF0 0%, #C4A8D4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>{tr.hero.h1Accent}</em>
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
                  background: "rgba(255,255,255,0.48)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.75)",
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
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-14 w-full max-w-2xl mx-auto"
          >
            {[
              { value: "22€", label: "Prix fixe" },
              { value: "72h", label: "Réponse garantie" },
              { value: "8/10", label: "Confirment le diagnostic" },
              { value: "3×", label: "Plus rapide qu'en cabinet" },
            ].map((s) => (
              <div
                key={s.value}
                className="flex flex-col items-center px-4 py-5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.58)",
                  backdropFilter: "blur(28px) saturate(200%)",
                  WebkitBackdropFilter: "blur(28px) saturate(200%)",
                  border: "1px solid rgba(255,255,255,0.72)",
                  boxShadow: "0 2px 0 rgba(255,255,255,0.9) inset, 0 8px 24px rgba(139,127,240,0.1), 0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <span className="text-2xl font-bold" style={{ color: "#8B7FF0" }}>{s.value}</span>
                <span className="text-xs mt-1 text-center leading-tight" style={{ color: "#9B98A8" }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── HOW IT WORKS — animé via GSAP ScrollTrigger ── */}
      <HowItWorksScroll steps={tr.how.steps} eyebrow={tr.how.eyebrow} h2={tr.how.h2} />

      {/* ── SECOND REGARD, PAS SECOND JUGEMENT ── */}
      <section className="py-20 px-6" style={{ background: "transparent" }}>
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#8B7FF0" }}>
              {tr.philosophy.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight" style={{ color: "#2D2A3E" }}>
              {tr.philosophy.h2a}{" "}
              <em className="not-italic" style={{
                background: "linear-gradient(135deg, #8B7FF0, #C4A8D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>{tr.philosophy.h2b}</em>
            </h2>
            <p className="text-lg mt-5 max-w-xl mx-auto leading-relaxed" style={{ color: "#6B6880" }}>
              {tr.philosophy.sub}
            </p>
          </motion.div>

          {/* Deux stats */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {tr.philosophy.stats.map((s, idx) => ({ ...s, delay: idx * 0.1 })).map((s) => (
              <motion.div
                key={s.figure}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: "easeOut", delay: s.delay }}
                className="rounded-3xl p-8"
                style={{
                  background: "rgba(255,255,255,0.58)",
                  backdropFilter: "blur(28px) saturate(200%)",
                  WebkitBackdropFilter: "blur(28px) saturate(200%)",
                  border: "1px solid rgba(255,255,255,0.72)",
                  boxShadow: "0 2px 0 rgba(255,255,255,0.9) inset, 0 8px 32px rgba(139,127,240,0.1), 0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <p className="text-6xl font-black mb-3" style={{
                  background: "linear-gradient(135deg, #8B7FF0, #C4A8D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                }}>
                  {s.figure}
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B6880" }}>{s.text}</p>
                <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(139,127,240,0.1)", color: "#8B7FF0", border: "1px solid rgba(139,127,240,0.2)" }}>
                  {s.source}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Message principal */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="rounded-3xl p-8 md:p-12"
            style={{
              background: "rgba(255,255,255,0.58)",
              backdropFilter: "blur(28px) saturate(200%)",
              WebkitBackdropFilter: "blur(28px) saturate(200%)",
              border: "1px solid rgba(255,255,255,0.72)",
              boxShadow: "0 2px 0 rgba(255,255,255,0.9) inset, 0 8px 32px rgba(139,127,240,0.1), 0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "#4A4458" }}>
              <span style={{ color: "#8B7FF0", fontSize: "36px", lineHeight: 1, float: "left", marginRight: "8px", marginTop: "-4px", fontFamily: "Georgia, serif" }}>"</span>
              {tr.philosophy.quote} <strong style={{ color: "#2D2A3E" }}>{tr.philosophy.quoteStrong}</strong> {tr.philosophy.quoteEnd}
            </p>

            <div className="rounded-2xl p-6 mb-8" style={{
              background: "rgba(139,127,240,0.07)",
              border: "1px solid rgba(139,127,240,0.15)",
            }}>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "#4A4458" }}>
                {tr.philosophy.highlight}{" "}
                <strong style={{ color: "#8B7FF0" }}>{tr.philosophy.highlightStrong}</strong>{" "}
                {tr.philosophy.highlightEnd}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: tr.philosophy.features[0] },
                { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", label: tr.philosophy.features[1] },
                { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", label: tr.philosophy.features[2] },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.58)", backdropFilter: "blur(28px) saturate(200%)", WebkitBackdropFilter: "blur(28px) saturate(200%)", border: "1px solid rgba(255,255,255,0.72)", boxShadow: "0 2px 0 rgba(255,255,255,0.9) inset, 0 4px 12px rgba(139,127,240,0.08)" }}>
                  <svg className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "#8B7FF0" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <p className="text-sm leading-snug" style={{ color: "#6B6880" }}>{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section id="doctors" className="py-20 px-6" style={{ background: "transparent" }}>
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
                    background: "rgba(255,255,255,0.58)",
                    backdropFilter: "blur(28px) saturate(200%)",
                    WebkitBackdropFilter: "blur(28px) saturate(200%)",
                    border: "1px solid rgba(255,255,255,0.72)",
                    boxShadow: "0 2px 0 rgba(255,255,255,0.9) inset, 0 8px 32px rgba(139,127,240,0.1), 0 2px 8px rgba(0,0,0,0.04)",
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
      <section className="py-20 px-6" style={{ background: "transparent" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#8B7FF0" }}>{tr.report.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: "#2D2A3E" }}>
              {tr.report.h2}
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#6B6880" }}>
              {tr.report.sub}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.58)",
              backdropFilter: "blur(28px) saturate(200%)",
              WebkitBackdropFilter: "blur(28px) saturate(200%)",
              border: "1px solid rgba(255,255,255,0.72)",
              boxShadow: "0 2px 0 rgba(255,255,255,0.9) inset, 0 8px 32px rgba(139,127,240,0.1), 0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: "1px solid rgba(139,127,240,0.08)", background: "rgba(255,255,255,0.5)" }}>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="text-xs ml-2" style={{ color: "#B0ABBD" }}>{tr.report.filename}</span>
            </div>

            <div className="p-8 md:p-12 grid md:grid-cols-2 gap-10">
              <div className="space-y-5">
                {[
                  { label: tr.report.sections[0], color: "#8B7FF0", bars: [1, 4/5, 3/4] },
                  { label: tr.report.sections[1], color: "#6B6880", bars: [1, 5/6, 1, 2/3] },
                  { label: tr.report.sections[2], color: "#6B6880", barColor: "rgba(139,127,240,0.15)", bars: [1, 4/5, 1, 3/5, 5/6] },
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
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#6B6880" }}>{tr.report.recommendations}</p>
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
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#8B7FF0" }}>{tr.report.conclusion}</p>
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
                {tr.report.downloadBtn}
              </a>
              <p className="text-xs" style={{ color: "#B0ABBD" }}>{tr.report.disclaimer}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section Avant / Après ── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Titre */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#8B7FF0" }}>Le parcours complet</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">Ce que vous déposez.<br />Ce que vous recevez.</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm">Voici exactement à quoi ressemble votre expérience sur TrustMyDiag.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-start">

            {/* GAUCHE — Mockup formulaire */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg,#8B7FF0,#6B5FD0)" }}>1</div>
                <p className="font-semibold text-[#1e3a5f]">Vous déposez votre dossier</p>
                <span className="text-xs text-gray-400 ml-auto">~5 min</span>
              </div>

              {/* Fenêtre navigateur */}
              <div className="rounded-2xl overflow-hidden shadow-xl" style={{ border: "1px solid rgba(139,127,240,0.15)" }}>
                {/* Barre navigateur */}
                <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#f8f7ff", borderBottom: "1px solid rgba(139,127,240,0.1)" }}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-3 bg-white rounded-md px-3 py-1 text-xs text-gray-400 flex items-center gap-1" style={{ border: "1px solid #e5e7eb" }}>
                    <Shield className="w-3 h-3 text-green-500" />
                    trustmydiag.com/dashboard/new
                  </div>
                </div>

                {/* Contenu formulaire */}
                <div className="bg-white p-5 space-y-4">

                  {/* Spécialité sélectionnée */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Spécialité choisie</p>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#8B7FF0,#6B5FD0)" }}>
                        🦷 Dentaire
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-400" style={{ border: "1px solid #e5e7eb" }}>
                        🌸 Gynécologie
                      </div>
                    </div>
                  </div>

                  {/* Questionnaire rempli */}
                  <div style={{ background: "#fafafa", borderRadius: 12, padding: 14 }}>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Questionnaire médical</p>
                    <div className="space-y-2">
                      {[
                        { label: "Tranche d'âge", value: "Adulte (18 – 65 ans)" },
                        { label: "Motif principal", value: "Valider un devis" },
                        { label: "Soin concerné", value: "Couronne / bridge" },
                        { label: "Symptômes", value: "Douleur à la mastication" },
                        { label: "Dernière visite", value: "Il y a moins de 6 mois" },
                      ].map((row, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-gray-400">{row.label}</span>
                          <span className="font-medium text-[#1e3a5f]">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Document uploadé */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Document transmis</p>
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#f0edff", border: "1px solid rgba(139,127,240,0.2)" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#8B7FF0" }}>
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#1e3a5f] truncate">panoramique-dentaire.pdf</p>
                        <p className="text-xs text-gray-400">2.4 Mo · Téléversé</p>
                      </div>
                      <div className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* Bouton paiement */}
                  <div className="pt-1">
                    <div className="w-full py-3 rounded-xl text-center text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#8B7FF0,#6B5FD0)" }}>
                      Payer 22 € et envoyer mon dossier →
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-2">🔒 Paiement sécurisé par Stripe</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* DROITE — Mockup réponse reçue */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)" }}>2</div>
                <p className="font-semibold text-[#1e3a5f]">Vous recevez votre avis médical</p>
                <span className="text-xs text-green-500 ml-auto font-medium">✓ Sous 72h</span>
              </div>

              {/* Fenêtre navigateur */}
              <div className="rounded-2xl overflow-hidden shadow-xl" style={{ border: "1px solid rgba(34,197,94,0.2)" }}>
                {/* Barre navigateur */}
                <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#f0fdf4", borderBottom: "1px solid rgba(34,197,94,0.15)" }}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-3 bg-white rounded-md px-3 py-1 text-xs text-gray-400 flex items-center gap-1" style={{ border: "1px solid #e5e7eb" }}>
                    <Shield className="w-3 h-3 text-green-500" />
                    trustmydiag.com/dashboard
                  </div>
                </div>

                {/* Contenu réponse */}
                <div className="bg-white p-5 space-y-4">

                  {/* En-tête demande */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Réf. #A4F2C8 · Dentaire</p>
                      <p className="text-sm font-semibold text-[#1e3a5f]">Second avis — Couronne sur 26</p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: "#22c55e" }}>✓ Traité</span>
                  </div>

                  {/* Avis médical exemple */}
                  <div className="rounded-xl p-4 space-y-3" style={{ background: "#f8f7ff", border: "1px solid rgba(139,127,240,0.15)" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg,#8B7FF0,#6B5FD0)" }}>DR</div>
                      <div>
                        <p className="text-xs font-semibold text-[#1e3a5f]">Dr. Thomas Renard</p>
                        <p className="text-xs text-gray-400">Chirurgien-dentiste · N° RPPS 10004521897</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 leading-relaxed space-y-2">
                      <p><span className="font-semibold text-[#1e3a5f]">Analyse du compte rendu :</span> Après lecture de votre panoramique dentaire, la couronne sur la dent 26 est effectivement indiquée. La dent présente une destruction coronaire importante compatible avec la prothèse proposée.</p>
                      <p><span className="font-semibold text-[#1e3a5f]">Mon avis :</span> Je confirme le plan de traitement de votre praticien. Le devis me paraît cohérent avec les standards actuels. Je vous recommande toutefois de demander un bilan parodontal préalable.</p>
                      <p><span className="font-semibold text-[#1e3a5f]">Recommandations :</span> Bilan parodontal avant pose · Détartrage si nécessaire · Suivi à 6 mois post-pose.</p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(139,127,240,0.1)", color: "#8B7FF0" }}>🔒 Données anonymisées</span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}>✓ Médecin diplômé</span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium text-gray-500" style={{ background: "#f3f4f6" }}>📧 Email envoyé</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>


        </div>
      </section>

    </div>
  );
}
