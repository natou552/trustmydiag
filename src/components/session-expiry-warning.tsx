"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INACTIVITY_WARN_MS = 25 * 60 * 1000; // 25 minutes → show warning
const SIGNOUT_AFTER_WARN_MS = 5 * 60 * 1000; // 5 more minutes → sign out

export function SessionExpiryWarning() {
  const { status } = useSession();
  const [visible, setVisible] = useState(false);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const signoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAllTimers = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (signoutTimer.current) clearTimeout(signoutTimer.current);
  };

  const scheduleSignout = () => {
    if (signoutTimer.current) clearTimeout(signoutTimer.current);
    signoutTimer.current = setTimeout(() => {
      signOut({ callbackUrl: "/login" });
    }, SIGNOUT_AFTER_WARN_MS);
  };

  const resetTimer = () => {
    clearAllTimers();
    setVisible(false);
    inactivityTimer.current = setTimeout(() => {
      setVisible(true);
      scheduleSignout();
    }, INACTIVITY_WARN_MS);
  };

  const handleStayConnected = async () => {
    try {
      await fetch("/api/auth/session");
    } catch {
      // ignore fetch errors — session refresh is best-effort
    }
    setVisible(false);
    resetTimer();
  };

  const handleSignOut = () => {
    clearAllTimers();
    signOut({ callbackUrl: "/login" });
  };

  useEffect(() => {
    if (status !== "authenticated") return;

    const events = ["mousemove", "keydown", "click", "scroll"] as const;
    const handleActivity = () => resetTimer();

    events.forEach((e) => window.addEventListener(e, handleActivity, { passive: true }));
    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
      clearAllTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status !== "authenticated") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="session-expiry-warning"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            zIndex: 50,
            background: "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            border: "1.5px solid rgba(139, 127, 240, 0.45)",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(139, 127, 240, 0.18), 0 2px 8px rgba(0,0,0,0.06)",
            padding: "1.25rem 1.5rem",
            maxWidth: "22rem",
            width: "calc(100vw - 2rem)",
          }}
          role="alertdialog"
          aria-live="assertive"
          aria-label="Avertissement d'expiration de session"
        >
          <div className="flex items-start gap-3">
            <div
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(139, 127, 240, 0.1)" }}
            >
              <Clock className="h-5 w-5" style={{ color: "#8B7FF0" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold" style={{ color: "#2D2A3E" }}>
                Session bientôt expirée
              </p>
              <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#6B6880" }}>
                Votre session expire dans 5 minutes en raison d&apos;inactivité.
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleStayConnected}
                  className="flex-1 text-xs font-semibold py-2 px-3 rounded-full transition-all duration-150"
                  style={{
                    background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)",
                    color: "white",
                    boxShadow: "0 2px 8px rgba(139,127,240,0.35)",
                    border: "none",
                  }}
                >
                  Rester connecté
                </button>
                <button
                  onClick={handleSignOut}
                  className="text-xs font-medium py-2 px-3 rounded-full transition-all duration-150"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(139,127,240,0.2)",
                    color: "#6B6880",
                  }}
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
