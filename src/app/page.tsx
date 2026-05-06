"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Lock,
  Clock,
  Upload,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import { useLang } from "@/contexts/language";
import { t } from "@/lib/translations";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";

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
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F]">
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
        className="relative overflow-hidden pt-10 pb-24 px-6 text-center"
        style={{
          background:
            "radial-gradient(ellipse at 65% -5%, rgba(253,186,186,0.35) 0%, transparent 55%), radial-gradient(ellipse at 15% 70%, rgba(196,181,253,0.25) 0%, transparent 50%), radial-gradient(ellipse at 85% 90%, rgba(147,197,253,0.2) 0%, transparent 50%), #f9faff",
        }}
      >
        <motion.div
          className="max-w-3xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 bg-white/80 border border-black/[0.07] text-[#374151] text-xs font-medium px-4 py-2 rounded-full mb-5 shadow-sm"
          >
            <Clock className="h-3 w-3 text-[#0071E3]" />
            {tr.hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-6xl sm:text-7xl md:text-[86px] font-bold text-[#1D1D1F] leading-[1.06] tracking-tight mb-6"
          >
            {tr.hero.h1}{" "}
            <em className="not-italic text-[#0071E3]">{tr.hero.h1Accent}</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-lg text-[#6E6E73] max-w-xl mx-auto leading-relaxed mb-8"
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
              <button className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005EC4] text-white text-sm font-medium px-7 py-3.5 rounded-full transition-colors duration-200 shadow-md shadow-blue-200">
                {tr.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="#how">
              <button className="inline-flex items-center gap-2 bg-white/80 hover:bg-white border border-black/[0.1] text-[#374151] text-sm font-medium px-7 py-3.5 rounded-full transition-colors duration-200">
                {tr.hero.howItWorks}
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-y border-black/[0.06] bg-white py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="marquee-inner flex gap-12 items-center">
            {tr.marquee.map((item, i) => (
              <span key={i} className="flex items-center gap-2.5 text-xs text-[#9CA3AF] flex-shrink-0">
                <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {tr.stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={stagger(i * 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="text-5xl font-bold text-[#1D1D1F] mb-2 tracking-tight">{s.value}</div>
              <div className="text-sm text-[#374151]">{s.label}</div>
              <div className="text-xs text-[#9CA3AF] mt-1">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-28 px-6" style={{ background: "#f9faff" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-20"
          >
            <p className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-4">{tr.how.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tight">{tr.how.h2}</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {tr.how.steps.map((item, i) => {
              const icons = [
                <Upload key="u" className="h-5 w-5" />,
                <CreditCard key="c" className="h-5 w-5" />,
                <MessageSquare key="m" className="h-5 w-5" />,
              ];
              const colors = ["text-[#0071E3] bg-blue-50", "text-[#5E5CE6] bg-violet-50", "text-[#34C759] bg-green-50"];
              return (
                <motion.div
                  key={item.step}
                  variants={stagger(i * 0.12)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="bg-white rounded-3xl p-8 border border-black/[0.06]"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-6 ${colors[i]}`}>
                    {icons[i]}
                  </div>
                  <p className="text-xs text-[#9CA3AF] font-medium mb-2">Étape {item.step}</p>
                  <h3 className="text-lg font-medium text-[#1D1D1F] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#6E6E73] leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link href="/register">
              <button className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005EC4] text-white text-sm font-medium px-7 py-3.5 rounded-full transition-colors duration-200 shadow-md shadow-blue-200">
                {tr.how.cta}
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section id="doctors" className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-20"
          >
            <p className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-4">{tr.doctors.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tight">{tr.doctors.h2}</h2>
            <p className="text-[#6E6E73] text-lg mt-4 max-w-lg mx-auto font-bold">{tr.doctors.sub}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {tr.doctors.list.map((doc, i) => {
              const styles = [
                { header: "bg-[#0071E3]", pill: "bg-blue-50 text-[#0071E3]" },
                { header: "bg-[#5E5CE6]", pill: "bg-violet-50 text-violet-700" },
              ];
              const initials = ["RB", "YB"];
              return (
                <motion.div
                  key={doc.name}
                  initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                  className="rounded-3xl border border-black/[0.06] overflow-hidden"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className={`${styles[i].header} p-8`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white text-base font-semibold">
                        {initials[i]}
                      </div>
                      <div>
                        <p className="text-white/60 text-xs mb-0.5">{doc.tag}</p>
                        <h3 className="font-semibold text-white text-lg leading-tight">{doc.name}</h3>
                        <p className="text-white/70 text-sm">{doc.specialty}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-8">
                    <p className="text-[#6E6E73] text-sm leading-relaxed mb-5">{doc.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {doc.features.map((f) => (
                        <span key={f} className={`text-xs ${styles[i].pill} px-3 py-1.5 rounded-full`}>{f}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-28 px-6" style={{ background: "#f9faff" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-20"
          >
            <p className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-4">{tr.pricing.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tight">{tr.pricing.h2}</h2>
            <p className="text-[#6E6E73] text-lg mt-4 font-bold">{tr.pricing.sub}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl border border-black/[0.06] overflow-hidden max-w-2xl mx-auto"
          >
            <div className="bg-[#0071E3] px-10 py-10 text-white">
              <div className="text-7xl font-bold tracking-tight leading-none mb-2">22€</div>
              <p className="text-blue-200 text-sm">{tr.pricing.priceLabel}</p>
            </div>
            <div className="px-10 py-10">
              <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-6">{tr.pricing.included}</p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {tr.pricing.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#374151]">
                    <CheckCircle className="h-4 w-4 text-[#34C759] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="block mt-8">
                <button className="w-full inline-flex items-center justify-center gap-2 bg-[#0071E3] hover:bg-[#005EC4] text-white text-sm font-medium py-4 rounded-full transition-colors duration-200">
                  {tr.pricing.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="py-20 px-6 bg-white">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="h-5 w-5 text-[#0071E3]" />
          </div>
          <h3 className="text-xl font-medium text-[#1D1D1F] mb-3">{tr.rgpd.title}</h3>
          <p className="text-sm text-[#6E6E73] leading-relaxed max-w-lg mx-auto">
            {tr.rgpd.desc}{" "}
            <Link href="/rgpd" className="text-[#0071E3] underline underline-offset-2">{tr.rgpd.link}</Link>
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["RGPD", "SSL/TLS", "Stripe", "EU"].map((b, i) => (
              <motion.div
                key={b}
                variants={stagger(i * 0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-1.5 text-xs text-[#6E6E73] bg-[#F5F5F7] border border-black/[0.06] px-4 py-2 rounded-full"
              >
                <CheckCircle className="h-3 w-3 text-[#34C759]" />
                {b}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── EXEMPLE RAPPORT ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <p className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-4">Transparence</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] tracking-tight mb-4">
              Voyez ce que vous recevez pour 22€
            </h2>
            <p className="text-[#6E6E73] text-base max-w-xl mx-auto">
              Un exemple réel de rapport médical (anonymisé). Vous recevrez exactement ce niveau de détail.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-[#f9faff] border border-black/[0.06] rounded-3xl overflow-hidden"
          >
            {/* Barre de titre façon document */}
            <div className="flex items-center gap-3 px-6 py-4 bg-white border-b border-black/[0.06]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="text-xs text-[#9CA3AF] ml-2">rapport-second-avis-exemple.pdf</span>
            </div>

            {/* Aperçu contenu */}
            <div className="p-8 md:p-12 grid md:grid-cols-2 gap-10">
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-semibold text-[#0071E3] uppercase tracking-widest mb-2">Contexte patient</p>
                  <div className="space-y-2">
                    <div className="h-3 bg-[#E5E7EB] rounded-full w-full" />
                    <div className="h-3 bg-[#E5E7EB] rounded-full w-4/5" />
                    <div className="h-3 bg-[#E5E7EB] rounded-full w-3/4" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-[#374151] uppercase tracking-widest mb-2">Analyse du compte rendu</p>
                  <div className="space-y-2">
                    <div className="h-3 bg-[#E5E7EB] rounded-full w-full" />
                    <div className="h-3 bg-[#E5E7EB] rounded-full w-5/6" />
                    <div className="h-3 bg-[#E5E7EB] rounded-full w-full" />
                    <div className="h-3 bg-[#E5E7EB] rounded-full w-2/3" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-[#374151] uppercase tracking-widest mb-2">Avis du spécialiste</p>
                  <div className="space-y-2">
                    <div className="h-3 bg-[#DBEAFE] rounded-full w-full" />
                    <div className="h-3 bg-[#DBEAFE] rounded-full w-4/5" />
                    <div className="h-3 bg-[#DBEAFE] rounded-full w-full" />
                    <div className="h-3 bg-[#DBEAFE] rounded-full w-3/5" />
                    <div className="h-3 bg-[#DBEAFE] rounded-full w-5/6" />
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-semibold text-[#374151] uppercase tracking-widest mb-2">Recommandations</p>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-[#34C759] flex-shrink-0 mt-0.5" />
                        <div className="space-y-1.5 flex-1">
                          <div className="h-3 bg-[#E5E7EB] rounded-full w-full" />
                          <div className="h-3 bg-[#E5E7EB] rounded-full w-3/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-black/[0.06] p-5">
                  <p className="text-[10px] font-semibold text-[#0071E3] uppercase tracking-widest mb-3">Conclusion médicale</p>
                  <div className="space-y-2">
                    <div className="h-3 bg-[#DBEAFE] rounded-full w-full" />
                    <div className="h-3 bg-[#DBEAFE] rounded-full w-5/6" />
                    <div className="h-3 bg-[#DBEAFE] rounded-full w-4/5" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-black/[0.06] flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0071E3]/10 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-[#0071E3]" />
                    </div>
                    <div>
                      <div className="h-2.5 bg-[#E5E7EB] rounded-full w-24 mb-1" />
                      <div className="h-2 bg-[#E5E7EB] rounded-full w-16" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA téléchargement */}
            <div className="px-8 md:px-12 pb-10 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="/exemple-rapport.pdf"
                download
                className="inline-flex items-center gap-2 bg-[#1D1D1F] hover:bg-[#374151] text-white text-sm font-medium px-6 py-3 rounded-full transition-colors duration-200"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                Télécharger l&apos;exemple (PDF)
              </a>
              <p className="text-xs text-[#9CA3AF]">Données 100% anonymisées · Cas réel</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-32 px-6 text-center"
        style={{
          background:
            "radial-gradient(ellipse at 30% 0%, rgba(253,186,186,0.3) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(196,181,253,0.25) 0%, transparent 50%), #f9faff",
        }}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-6">{tr.cta.eyebrow}</p>
          <h2 className="text-5xl md:text-6xl font-bold text-[#1D1D1F] leading-tight tracking-tight mb-6">
            {tr.cta.h2}
          </h2>
          <p className="text-[#6E6E73] text-lg mb-10 font-bold">{tr.cta.sub}</p>
          <Link href="/register">
            <button className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005EC4] text-white text-sm font-medium px-8 py-4 rounded-full transition-colors duration-200 shadow-lg shadow-blue-200">
              {tr.cta.button}
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-5">{tr.cta.trust}</p>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-black/[0.06] pt-14 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1D1D1F] mb-3">
                <Shield className="h-4 w-4 text-[#0071E3]" />
                TrustMyDiag
              </div>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">{tr.footer.tagline}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-widest mb-4">{tr.footer.nav}</p>
              <ul className="space-y-3">
                {tr.footer.navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-widest mb-4">{tr.footer.learn}</p>
              <ul className="space-y-3">
                {tr.footer.learnLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-widest mb-4">{tr.footer.company}</p>
              <ul className="space-y-3">
                {tr.footer.companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-black/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#9CA3AF]">© {new Date().getFullYear()} {tr.footer.copyright}</p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <div className="flex items-center gap-1.5 border border-black/[0.08] rounded-full px-3 py-1.5 bg-white">
                <svg className="h-3.5 w-3.5 text-[#0071E3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span className="text-[10px] font-semibold text-[#374151] uppercase tracking-wide">RGPD</span>
              </div>
              <div className="flex items-center gap-1.5 border border-black/[0.08] rounded-full px-3 py-1.5 bg-white">
                <svg className="h-3.5 w-3.5 text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <span className="text-[10px] font-semibold text-[#374151] uppercase tracking-wide">HDS</span>
                <span className="text-[10px] text-[#9CA3AF]">En cours</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              {tr.footer.legal.map((l) => (
                <Link key={l.href} href={l.href} className="text-xs text-[#9CA3AF] hover:text-[#6E6E73] transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
