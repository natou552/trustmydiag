"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import {
  Shield,
  Zap,
  Flame,
  Wind,
  Droplets,
  Ruler,
  Bug,
  Sun,
  CheckCircle,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useLang } from "@/contexts/language";
import { t } from "@/lib/translations";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay },
  },
});

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionVal.set(target);
  }, [isInView, target, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

// ── Floating glass card ───────────────────────────────────────────────────────
function FloatingCard({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`absolute backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        y: {
          duration: 4,
          delay,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ── Sticky scroll block ───────────────────────────────────────────────────────
function StickyBlock({
  index,
  title,
  desc,
  cardContent,
  reversed,
  centered,
}: {
  index: number;
  title: string;
  desc: string;
  cardContent: React.ReactNode;
  reversed?: boolean;
  centered?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6], [60, 0]);

  if (centered) {
    return (
      <div ref={ref} className="min-h-[60vh] flex items-center justify-center px-6 py-24">
        <motion.div style={{ opacity, y }} className="text-center max-w-xl mx-auto">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
            0{index}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h3>
          <p className="text-white/60 text-lg mb-8">{desc}</p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            {cardContent}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className="min-h-[70vh] flex items-center px-6 py-24">
      <motion.div
        style={{ opacity, y }}
        className={`max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center ${
          reversed ? "md:[direction:rtl]" : ""
        }`}
      >
        <div className={reversed ? "[direction:ltr]" : ""}>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
            0{index}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h3>
          <p className="text-white/60 text-lg">{desc}</p>
        </div>
        <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm ${reversed ? "[direction:ltr]" : ""}`}>
          {cardContent}
        </div>
      </motion.div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HomePage() {
  const { lang } = useLang();
  const tr = t[lang];

  // Services
  const services = [
    {
      icon: <Sun className="h-6 w-6" />,
      title: "DPE",
      desc: "Diagnostic de performance énergétique obligatoire.",
    },
    {
      icon: <Wind className="h-6 w-6" />,
      title: "Amiante",
      desc: "Repérage des matériaux contenant de l'amiante.",
    },
    {
      icon: <Droplets className="h-6 w-6" />,
      title: "Plomb",
      desc: "Constat de risque d'exposition au plomb (CREP).",
    },
    {
      icon: <Flame className="h-6 w-6" />,
      title: "Gaz",
      desc: "État de l'installation intérieure de gaz.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Électricité",
      desc: "Diagnostic électrique pour toute installation de plus de 15 ans.",
    },
    {
      icon: <Ruler className="h-6 w-6" />,
      title: "Loi Carrez",
      desc: "Mesurage de la superficie privative.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "ERP",
      desc: "État des risques et pollutions (naturels, miniers, technologiques).",
    },
    {
      icon: <Bug className="h-6 w-6" />,
      title: "Termites",
      desc: "Recherche d'infestation par les insectes xylophages.",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote:
        "Rapport reçu en moins de 24h. Professionnel, clair et complet. Je recommande vivement TrustMyDiag pour tout projet immobilier.",
      name: "Sophie M.",
      role: "Acheteuse à Paris 15e",
      stars: 5,
    },
    {
      quote:
        "Équipe très réactive. Les experts ont pris le temps d'expliquer chaque point du rapport. Prix imbattable pour la qualité de service.",
      name: "Thomas R.",
      role: "Propriétaire bailleur",
      stars: 5,
    },
    {
      quote:
        "Grâce à TrustMyDiag, j'ai pu négocier le prix de vente. Le rapport certifié leur a fait confiance immédiatement.",
      name: "Amina K.",
      role: "Vendeuse en Île-de-France",
      stars: 5,
    },
  ];

  // Benefits
  const benefits = [
    "Rendez-vous en 48h",
    "Experts certifiés Cofrac",
    "Tarifs transparents",
    "Rapports 100% numériques",
    "Service client réactif",
  ];

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] overflow-x-hidden">
      <Header />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#040D1C] via-[#071428] to-[#040D1C] text-center px-6"
      >
        {/* Floating glass cards */}
        <FloatingCard
          className="hidden md:block left-[8%] top-[22%] w-36"
          delay={0.3}
        >
          <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Classe</p>
          <p className="text-white font-bold text-2xl">DPE · A</p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-green-400/30">
            <div className="h-1.5 w-1/6 rounded-full bg-green-400" />
          </div>
        </FloatingCard>

        <FloatingCard
          className="hidden md:block right-[7%] top-[30%] w-44"
          delay={0.5}
        >
          <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Statut</p>
          <p className="text-white font-semibold text-sm">Rapport certifié</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs">Validé</span>
          </div>
        </FloatingCard>

        <FloatingCard
          className="hidden md:block left-[10%] bottom-[28%] w-40"
          delay={0.7}
        >
          <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Délai</p>
          <p className="text-white font-bold text-xl">48h</p>
          <p className="text-white/40 text-xs mt-1">Intervention garantie</p>
        </FloatingCard>

        {/* Hero text */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6"
          >
            Diagnostic immobilier · Île-de-France
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          >
            Le diagnostic immobilier{" "}
            <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              nouvelle génération.
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed mb-10"
          >
            Experts certifiés, rapports numériques sous 48h. Vendez ou louez
            votre bien en toute sérénité.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005EC4] text-white text-sm font-semibold px-8 py-4 rounded-full transition-colors duration-200 shadow-lg shadow-blue-900/40"
              >
                Obtenir un devis
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </Link>
            <Link href="#services">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold px-8 py-4 rounded-full transition-colors duration-200 backdrop-blur-sm"
              >
                Nos services
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,113,227,0.12) 0%, transparent 70%)",
          }}
        />
      </section>

      {/* ── TRUST STATS ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <p className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-3">
              Notre bilan
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tight">
              La confiance se mérite.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                prefix: "+",
                value: 10,
                suffix: " ans",
                label: "d'expérience",
                sub: "dans le diagnostic immobilier",
              },
              {
                prefix: "+",
                value: 5000,
                suffix: "",
                label: "diagnostics réalisés",
                sub: "en Île-de-France",
              },
              {
                prefix: "",
                value: 100,
                suffix: "%",
                label: "experts certifiés",
                sub: "Cofrac & accrédités",
              },
              {
                prefix: "",
                value: 48,
                suffix: "h",
                label: "délai d'intervention",
                sub: "garanti sur toute l'IDF",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={stagger(i * 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white border border-black/[0.07] rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#1D1D1F] mb-2 tracking-tight">
                  <AnimatedCounter
                    target={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-sm font-semibold text-[#374151] mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-[#9CA3AF]">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section id="services" className="py-28 px-6 bg-[#F5F7FA]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <p className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-3">
              Ce que nous faisons
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tight mb-4">
              Tous vos diagnostics au même endroit.
            </h2>
            <p className="text-[#6E6E73] text-lg max-w-xl mx-auto">
              Obligatoires ou préventifs, nos experts certifiés couvrent
              l'ensemble des diagnostics immobiliers réglementaires.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                variants={stagger(i * 0.05)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                className="group backdrop-blur-sm bg-white/80 border border-white/60 rounded-2xl p-6 cursor-default hover:shadow-[0_8px_32px_rgba(0,113,227,0.12)] transition-shadow"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#0071E3] mb-4 group-hover:bg-blue-100 transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-[#1D1D1F] mb-1.5">
                  {service.title}
                </h3>
                <p className="text-xs text-[#6E6E73] leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORYTELLING / STICKY ─────────────────────────────────────────── */}
      <section className="bg-[#040D1C]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center pt-28 px-6"
          >
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
              Comment ça marche
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Simple. Rapide. Certifié.
            </h2>
          </motion.div>
        </div>

        <StickyBlock
          index={1}
          title="Prise de rendez-vous en ligne"
          desc="Choisissez vos diagnostics, sélectionnez un créneau et recevez la confirmation immédiatement. Zéro paperasse."
          cardContent={
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">1</div>
                <span className="text-white/70 text-sm">Sélectionnez vos diagnostics</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">2</div>
                <span className="text-white/70 text-sm">Choisissez votre créneau</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 text-xs font-bold">✓</div>
                <span className="text-white/70 text-sm">Confirmation instantanée</span>
              </div>
            </div>
          }
        />

        <StickyBlock
          index={2}
          title="Rapport certifié sous 48h"
          desc="Votre rapport numérique certifié vous est transmis dans les 48h suivant l'intervention. Valide légalement."
          reversed
          cardContent={
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-xs uppercase tracking-widest">Progression</span>
                <span className="text-green-400 text-xs font-semibold">100%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-2 bg-gradient-to-r from-blue-500 to-green-400 rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                />
              </div>
              <p className="text-white font-semibold">Rapport DPE — Bien certifié</p>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-white/60 text-sm">Signé électroniquement</span>
              </div>
            </div>
          }
        />

        <StickyBlock
          index={3}
          title="Valable pour votre vente ou location"
          desc="Nos rapports sont conformes à la réglementation en vigueur et acceptés par tous les notaires et agences immobilières."
          centered
          cardContent={
            <div className="grid grid-cols-2 gap-3">
              {["Vente", "Location", "Notaires", "Agences"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2"
                >
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          }
        />

        <div className="pb-16" />
      </section>

      {/* ── WHY US ────────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-4">
              Notre différence
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tight leading-tight">
              Pourquoi choisir TrustMyDiag&nbsp;?
            </h2>
            <p className="text-[#6E6E73] text-lg mt-6 leading-relaxed">
              Parce que votre projet immobilier mérite des experts qui s'engagent
              sur la qualité et les délais.
            </p>
          </motion.div>

          <div className="space-y-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                variants={stagger(i * 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="flex items-center gap-4 bg-[#F5F7FA] rounded-2xl px-6 py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: i * 0.1 + 0.2,
                  }}
                >
                  <CheckCircle className="h-5 w-5 text-[#0071E3] flex-shrink-0" />
                </motion.div>
                <span className="font-medium text-[#1D1D1F]">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#F5F7FA]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <p className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-3">
              Ils nous font confiance
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tight">
              Ce que disent nos clients.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                variants={stagger(i * 0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: testimonial.stars }).map((_, j) => (
                    <svg
                      key={j}
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-[#374151] text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-semibold text-[#1D1D1F] text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ───────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-[#040D1C] via-[#071428] to-[#040D1C] px-6 py-32 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,113,227,0.15) 0%, transparent 70%)",
          }}
        />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
            Passez à l'action
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            Prêt à planifier votre diagnostic&nbsp;?
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto">
            Obtenez un devis gratuit en moins de 2 minutes. Nos experts
            interviennent sous 48h en Île-de-France.
          </p>
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005EC4] text-white font-semibold px-10 py-5 rounded-full transition-colors duration-200 shadow-xl shadow-blue-900/40 text-sm"
            >
              Demander un devis gratuit
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </Link>
          <div className="flex items-center justify-center gap-2 mt-6 text-white/40 text-sm">
            <Phone className="h-4 w-4" />
            <span>Ou appelez-nous au</span>
            <a
              href="tel:+33123456789"
              className="text-white/60 hover:text-white transition-colors underline underline-offset-2"
            >
              01 23 45 67 89
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-black/[0.06] pt-14 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1D1D1F] mb-3">
                <Shield className="h-4 w-4 text-[#0071E3]" />
                TrustMyDiag
              </div>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                {tr.footer.tagline}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-widest mb-4">
                {tr.footer.nav}
              </p>
              <ul className="space-y-3">
                {tr.footer.navLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-widest mb-4">
                {tr.footer.learn}
              </p>
              <ul className="space-y-3">
                {tr.footer.learnLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-widest mb-4">
                {tr.footer.company}
              </p>
              <ul className="space-y-3">
                {tr.footer.companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-black/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#9CA3AF]">
              © {new Date().getFullYear()} {tr.footer.copyright}
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <div className="flex items-center gap-1.5 border border-black/[0.08] rounded-full px-3 py-1.5 bg-white">
                <svg
                  className="h-3.5 w-3.5 text-[#0071E3]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-[10px] font-semibold text-[#374151] uppercase tracking-wide">
                  RGPD
                </span>
              </div>
              <div className="flex items-center gap-1.5 border border-black/[0.08] rounded-full px-3 py-1.5 bg-white">
                <CheckCircle className="h-3.5 w-3.5 text-[#059669]" />
                <span className="text-[10px] font-semibold text-[#374151] uppercase tracking-wide">
                  Certifié Cofrac
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              {tr.footer.legal.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs text-[#9CA3AF] hover:text-[#6E6E73] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
