"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";

type Prefs = { analytics: boolean; marketing: boolean };

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({ analytics: true, marketing: false });
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) setVisible(true);
  }, []);

  function save(value: "accepted" | "declined" | "custom", custom?: Prefs) {
    localStorage.setItem("cookie-consent", value);
    if (custom) localStorage.setItem("cookie-prefs", JSON.stringify(custom));
    setVisible(false);
    setShowPrefs(false);
  }

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      type="button"
      onClick={onChange}
      className="relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none"
      style={{ background: checked ? "#8B7FF0" : "#D1D5DB" }}
    >
      <span
        className="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 mt-0.5"
        style={{ transform: `translateX(${checked ? "22px" : "2px"})` }}
      />
    </button>
  );

  const categories = [
    {
      id: "essential",
      label: "Essentiels",
      desc: "Nécessaires au fonctionnement du site (session, sécurité). Toujours actifs.",
      locked: true,
      checked: true,
    },
    {
      id: "analytics",
      label: "Statistiques",
      desc: "Nous aident à comprendre comment vous utilisez le site (Google Analytics).",
      locked: false,
      checked: prefs.analytics,
    },
    {
      id: "marketing",
      label: "Marketing",
      desc: "Permettent de personnaliser les publicités et de mesurer leur performance.",
      locked: false,
      checked: prefs.marketing,
    },
  ];

  return (
    <>
      <AnimatePresence>
        {visible && !showPrefs && (
          <motion.div
            className="fixed bottom-5 left-1/2 z-[200] w-[calc(100%-2.5rem)] max-w-2xl"
            style={{ x: "-50%" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="rounded-2xl px-5 py-4"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 8px 32px rgba(139,127,240,0.15), 0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Texte */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="text-xl flex-shrink-0">🍪</span>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B6880" }}>
                    Nous utilisons des cookies pour améliorer votre expérience et mesurer l&apos;audience.{" "}
                    <Link href="/cookies" className="underline underline-offset-2" style={{ color: "#8B7FF0" }}>
                      Politique cookies
                    </Link>
                  </p>
                </div>

                {/* Boutons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setShowPrefs(true)}
                    className="px-4 py-2 text-sm font-medium rounded-xl transition-all border"
                    style={{ color: "#6B6880", borderColor: "rgba(139,127,240,0.2)", background: "transparent" }}
                  >
                    Préférences
                  </button>
                  <button
                    onClick={() => save("declined")}
                    className="px-4 py-2 text-sm font-medium rounded-xl transition-all"
                    style={{ color: "#6B6880", background: "rgba(139,127,240,0.07)", border: "1px solid rgba(139,127,240,0.12)" }}
                  >
                    Refuser
                  </button>
                  <button
                    onClick={() => save("accepted")}
                    className="px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all"
                    style={{ background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", boxShadow: "0 4px 14px rgba(139,127,240,0.35)" }}
                  >
                    Accepter
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panneau Préférences */}
      <AnimatePresence>
        {showPrefs && (
          <>
            <motion.div
              className="fixed inset-0 z-[300] bg-black/30"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowPrefs(false)}
            />
            <motion.div
              className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:left-1/2 sm:bottom-5 sm:w-full sm:max-w-lg z-[301]"
              style={{ x: typeof window !== "undefined" && window.innerWidth >= 640 ? "-50%" : "0" }}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.97)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.9)",
                  boxShadow: "0 16px 48px rgba(139,127,240,0.2)",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
                  <div>
                    <h2 className="font-bold text-base" style={{ color: "#2D2A3E" }}>Préférences de cookies</h2>
                    <p className="text-xs mt-0.5" style={{ color: "#9B98A8" }}>Choisissez ce que vous acceptez</p>
                  </div>
                  <button onClick={() => setShowPrefs(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Catégories */}
                <div className="px-5 py-3 space-y-2 max-h-64 overflow-y-auto">
                  {categories.map((cat) => (
                    <div key={cat.id} className="rounded-xl border border-gray-100 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpen(open === cat.id ? null : cat.id)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Toggle
                            checked={cat.checked}
                            onChange={() => {
                              if (cat.locked) return;
                              setPrefs((p) => ({ ...p, [cat.id]: !p[cat.id as keyof Prefs] }));
                            }}
                          />
                          <span className="text-sm font-medium" style={{ color: "#2D2A3E" }}>{cat.label}</span>
                          {cat.locked && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(139,127,240,0.1)", color: "#8B7FF0" }}>
                              Toujours actif
                            </span>
                          )}
                        </div>
                        <ChevronDown
                          className="h-4 w-4 flex-shrink-0 transition-transform duration-200"
                          style={{ color: "#B0ABBD", transform: open === cat.id ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                      </button>
                      <AnimatePresence>
                        {open === cat.id && (
                          <motion.div
                            initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="px-4 pb-3 text-xs leading-relaxed" style={{ color: "#9B98A8" }}>{cat.desc}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => save("declined")}
                    className="flex-1 py-2.5 text-sm font-medium rounded-xl border transition-all"
                    style={{ color: "#6B6880", borderColor: "rgba(139,127,240,0.2)" }}
                  >
                    Tout refuser
                  </button>
                  <button
                    onClick={() => save("custom", prefs)}
                    className="flex-1 py-2.5 text-sm font-semibold text-white rounded-xl transition-all"
                    style={{ background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", boxShadow: "0 4px 14px rgba(139,127,240,0.3)" }}
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => save("accepted")}
                    className="flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all"
                    style={{ background: "#1e3a5f", color: "white" }}
                  >
                    Tout accepter
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
