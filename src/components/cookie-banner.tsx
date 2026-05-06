"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-5 left-1/2 z-[200] w-[calc(100%-2.5rem)] max-w-lg"
          style={{ x: "-50%" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 8px 32px rgba(139,127,240,0.15), 0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            {/* Icône + texte */}
            <div className="flex items-start gap-3 flex-1">
              <span className="text-xl flex-shrink-0">🍪</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#2D2A3E" }}>
                  Nous utilisons des cookies
                </p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#6B6880" }}>
                  Pour améliorer votre expérience et mesurer l&apos;audience.{" "}
                  <Link href="/cookies" className="underline underline-offset-2" style={{ color: "#8B7FF0" }}>
                    En savoir plus
                  </Link>
                </p>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={decline}
                className="px-4 py-2 text-sm font-medium rounded-xl transition-all"
                style={{
                  color: "#6B6880",
                  background: "rgba(139,127,240,0.07)",
                  border: "1px solid rgba(139,127,240,0.12)",
                }}
              >
                Refuser
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all"
                style={{
                  background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)",
                  boxShadow: "0 4px 14px rgba(139,127,240,0.35)",
                }}
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
