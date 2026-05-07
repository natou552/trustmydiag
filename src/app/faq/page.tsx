"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import Link from "next/link";
import { useLang } from "@/contexts/language";
import { t } from "@/lib/translations";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FaqPage() {
  const { lang } = useLang();
  const tr = t[lang];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen" >
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center text-sm mb-10 transition-colors" style={{ color: "#8B7FF0" }}>
          ← Retour
        </Link>

        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#8B7FF0" }}>
            {tr.faq.eyebrow}
          </p>
          <h1 className="text-4xl font-bold" style={{ color: "#2D2A3E" }}>
            {tr.faq.h2}
          </h1>
        </div>

        <div className="space-y-3">
          {tr.faq.items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(20px)",
                border: open === i ? "1px solid rgba(139,127,240,0.2)" : "1px solid rgba(255,255,255,0.9)",
                boxShadow: open === i ? "0 4px 20px rgba(139,127,240,0.1)" : "0 2px 12px rgba(139,127,240,0.05)",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-sm font-semibold pr-4" style={{ color: "#2D2A3E" }}>{item.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="h-4 w-4" style={{ color: "#8B7FF0" }} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#6B6880" }}>
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl px-7 py-6 text-center" style={{ background: "rgba(139,127,240,0.06)", border: "1px solid rgba(139,127,240,0.12)" }}>
          <p className="text-sm font-semibold mb-1" style={{ color: "#2D2A3E" }}>Vous n&apos;avez pas trouvé votre réponse ?</p>
          <p className="text-sm mb-4" style={{ color: "#6B6880" }}>Notre équipe répond sous 24h.</p>
          <Link href="/contact">
            <button className="text-sm font-semibold text-white px-6 py-3 rounded-full transition-all"
              style={{ background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", boxShadow: "0 4px 14px rgba(139,127,240,0.3)" }}>
              Nous contacter
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
