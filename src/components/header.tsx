"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Shield, ChevronDown, ChevronRight, Globe, X, User } from "lucide-react";
import { useLang } from "@/contexts/language";
import { t } from "@/lib/translations";
import { motion, AnimatePresence } from "framer-motion";

function Dropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className="flex items-center gap-1 rounded-full text-sm transition-all duration-200"
        style={{
          padding: "6px 16px",
          color: open ? "#1a1a2e" : "#4A4458",
          background: open ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.5)",
          backdropFilter: "blur(10px) saturate(160%)",
          WebkitBackdropFilter: "blur(10px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.65)",
          boxShadow: open ? "0 2px 12px rgba(139,127,240,0.12)" : "0 1px 4px rgba(139,127,240,0.06)",
        }}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 z-50 pt-2"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div className="w-56 rounded-2xl py-2" style={{
            background: "rgba(255,255,255,0.62)",
            backdropFilter: "blur(28px) saturate(200%)",
            WebkitBackdropFilter: "blur(28px) saturate(200%)",
            border: "1px solid rgba(255,255,255,0.75)",
            boxShadow: "0 8px 32px rgba(139,127,240,0.15), 0 2px 8px rgba(0,0,0,0.06)",
          }}>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-[#2D2A3E] hover:text-[#8B7FF0] rounded-xl mx-1 transition-colors"
                style={{ transition: "background 0.15s, color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(139,127,240,0.1)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { data: session } = useSession();
  const { lang, toggle } = useLang();
  const tr = t[lang].nav;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const learnItems = [
    { label: tr.blog, href: "/blog" },
    { label: tr.faq, href: "/faq" },
    { label: tr.testimonials, href: "/testimonials" },
  ];

  const companyItems = [
    { label: tr.about, href: "/about" },
    { label: tr.news, href: "/news" },
    { label: tr.contact, href: "/contact" },
  ];

  function closeMobile() {
    setMobileOpen(false);
    setLearnOpen(false);
    setCompanyOpen(false);
  }

  return (
    <>
      <header
        className="sticky top-0 z-50"
        style={{
          background: scrolled ? "rgba(248,246,244,0.82)" : "transparent",
          backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(139,127,240,0.07)" : "none",
          padding: "28px 5%",
          transition: "background 400ms ease, border-color 400ms ease",
        }}
      >
        <div className="relative flex items-center justify-between">

          {/* LEFT — Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold shrink-0 z-10" style={{ color: "#2D2A3E" }}>
            <Shield className="h-5 w-5" style={{ color: "#8B7FF0" }} />
            TrustMyDiag
          </Link>

          {/* CENTER — Floating pill nav, truly centered */}
          <nav
            className="hidden md:inline-flex items-center absolute left-1/2 -translate-x-1/2"
            style={{ gap: "8px" }}
          >
            {[
              { href: "/#how", label: tr.howItWorks },
              { href: "/#doctors", label: tr.doctors },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "6px 16px",
                  borderRadius: "100px",
                  fontSize: "14px",
                  color: "#4A4458",
                  background: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(10px) saturate(160%)",
                  WebkitBackdropFilter: "blur(10px) saturate(160%)",
                  border: "1px solid rgba(255,255,255,0.65)",
                  boxShadow: "0 1px 4px rgba(139,127,240,0.06)",
                  transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.75)";
                  (e.currentTarget as HTMLElement).style.color = "#1a1a2e";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(139,127,240,0.12)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.45)";
                  (e.currentTarget as HTMLElement).style.color = "#4A4458";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 6px rgba(139,127,240,0.07)";
                }}
              >
                {item.label}
              </Link>
            ))}
            <Dropdown label={tr.learn} items={learnItems} />
            <Dropdown label={tr.company} items={companyItems} />
          </nav>

          {/* RIGHT — Lang + Auth */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={toggle}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-150"
              style={{ color: "#6B6880", border: "1px solid rgba(139,127,240,0.2)", background: "rgba(139,127,240,0.06)" }}
            >
              <Globe className="h-3.5 w-3.5" />
              {lang === "fr" ? "FR" : "EN"}
            </button>

            {session ? (
              <>
                <Link href="/dashboard">
                  <button
                    className="text-sm px-4 py-1.5 rounded-full font-medium transition-all duration-150"
                    style={{ color: "#8B7FF0", background: "rgba(139,127,240,0.08)", border: "1px solid rgba(139,127,240,0.2)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(139,127,240,0.14)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(139,127,240,0.08)"; }}
                  >
                    {tr.mySpace}
                  </button>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm px-4 py-1.5 rounded-full font-medium transition-all duration-150"
                  style={{ color: "#9B7EAA", background: "rgba(196,168,212,0.1)", border: "1px solid rgba(196,168,212,0.25)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(196,168,212,0.18)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(196,168,212,0.1)"; }}
                >
                  {tr.logout}
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="text-sm px-4 py-1.5 rounded-full transition-colors duration-150" style={{ color: "#6B6880" }}>
                    {tr.login}
                  </button>
                </Link>
                <Link href="/register">
                  <button
                    className="text-sm text-white px-5 py-2 rounded-full font-medium transition-all duration-150"
                    style={{ background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", boxShadow: "0 4px 14px rgba(139,127,240,0.35)" }}
                  >
                    {tr.start}
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile: icône compte + burger */}
          <div className="md:hidden flex items-center gap-1">

            {/* Icône compte — dashboard si connecté, login sinon */}
            <Link
              href={session ? "/dashboard" : "/login"}
              aria-label={session ? "Mon espace" : "Se connecter"}
            >
              <div
                className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
                style={{
                  background: session
                    ? "linear-gradient(135deg, #8B7FF0, #6B5FD0)"
                    : "rgba(139,127,240,0.08)",
                  border: session
                    ? "none"
                    : "1px solid rgba(139,127,240,0.2)",
                }}
              >
                {session ? (
                  <span className="text-xs font-bold text-white">
                    {session.user?.name?.charAt(0).toUpperCase() ?? <User className="h-4 w-4 text-white" />}
                  </span>
                ) : (
                  <User className="h-4 w-4" style={{ color: "#8B7FF0" }} />
                )}
              </div>
            </Link>

          <button
            className="relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-full transition-colors"
            style={{
              background: mobileOpen ? "rgba(139,127,240,0.15)" : "rgba(139,127,240,0.08)",
              border: "1px solid rgba(139,127,240,0.2)",
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block w-[18px] h-[1.5px] rounded-full origin-center"
              style={{ background: "#8B7FF0" }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-[18px] h-[1.5px] rounded-full"
              style={{ background: "#8B7FF0" }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block w-[18px] h-[1.5px] rounded-full origin-center"
              style={{ background: "#8B7FF0" }}
            />
          </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
      {mobileOpen && (
        <motion.div
          className="md:hidden fixed inset-0 z-[100] flex flex-col"
          style={{ background: "#eef2fc", transformOrigin: "top center" }}
          initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.6 }}
          animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
          exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0.6 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 shrink-0">
            <Link href="/" onClick={closeMobile} className="flex items-center gap-2 font-semibold" style={{ color: "#2D2A3E" }}>
              <Shield className="h-5 w-5" style={{ color: "#8B7FF0" }} />
              TrustMyDiag
            </Link>
            <button
              onClick={closeMobile}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(139,127,240,0.1)", color: "#8B7FF0" }}
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4">
            <nav className="flex flex-col gap-1">

              {[
                { label: tr.howItWorks, href: "/#how" },
                { label: tr.doctors, href: "/#doctors" },
              ].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMobile}
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl transition-colors active:opacity-70"
                    style={{ fontSize: "17px", fontWeight: 500, color: "#2D2A3E" }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Ressources accordion */}
              <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.27, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                <button
                  onClick={() => setLearnOpen(!learnOpen)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-2xl w-full text-left transition-colors"
                  style={{ fontSize: "17px", fontWeight: 500, color: "#2D2A3E", background: learnOpen ? "rgba(139,127,240,0.06)" : "transparent" }}
                >
                  {tr.learn}
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${learnOpen ? "rotate-90" : ""}`} style={{ color: "#C4A8D4" }} />
                </button>
                <AnimatePresence>
                  {learnOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-0.5 ml-4 mb-1 pt-1">
                        {learnItems.map((item) => (
                          <Link key={item.href} href={item.href} onClick={closeMobile}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors active:opacity-70"
                            style={{ fontSize: "15px", color: "#6B6880" }}>
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#C4A8D4" }} />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Entreprise accordion */}
              <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.33, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                <button
                  onClick={() => setCompanyOpen(!companyOpen)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-2xl w-full text-left transition-colors"
                  style={{ fontSize: "17px", fontWeight: 500, color: "#2D2A3E", background: companyOpen ? "rgba(139,127,240,0.06)" : "transparent" }}
                >
                  {tr.company}
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${companyOpen ? "rotate-90" : ""}`} style={{ color: "#C4A8D4" }} />
                </button>
                <AnimatePresence>
                  {companyOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-0.5 ml-4 mb-1 pt-1">
                        {companyItems.map((item) => (
                          <Link key={item.href} href={item.href} onClick={closeMobile}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors active:opacity-70"
                            style={{ fontSize: "15px", color: "#6B6880" }}>
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#C4A8D4" }} />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </nav>
          </div>

          {/* Bottom — CTA */}
          <motion.div
            className="shrink-0 px-6 pb-12 pt-4 flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {session ? (
              <>
                <Link href="/dashboard" onClick={closeMobile} className="w-full">
                  <button
                    className="w-full py-4 text-base font-semibold text-white rounded-2xl transition-all"
                    style={{ background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", boxShadow: "0 8px 24px rgba(139,127,240,0.3)" }}
                  >
                    {tr.mySpace}
                  </button>
                </Link>
                <button
                  onClick={() => { signOut({ callbackUrl: "/" }); closeMobile(); }}
                  className="w-full py-3.5 text-sm font-medium rounded-2xl transition-all"
                  style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(139,127,240,0.15)", color: "#6B6880" }}
                >
                  {tr.logout}
                </button>
              </>
            ) : (
              <>
                <Link href="/register" onClick={closeMobile} className="w-full">
                  <button
                    className="w-full py-4 text-base font-semibold text-white rounded-2xl transition-all"
                    style={{ background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", boxShadow: "0 8px 24px rgba(139,127,240,0.3)" }}
                  >
                    {tr.start}
                  </button>
                </Link>
                <Link href="/login" onClick={closeMobile} className="w-full">
                  <button
                    className="w-full py-4 text-base font-semibold rounded-2xl transition-all"
                    style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(139,127,240,0.15)", color: "#6B6880" }}
                  >
                    {tr.login}
                  </button>
                </Link>
              </>
            )}
            <div className="flex items-center justify-center">
              <button
                onClick={toggle}
                className="flex items-center gap-1.5 text-sm"
                style={{ color: "#9B98A8" }}
              >
                <Globe className="h-3.5 w-3.5" />
                {lang === "fr" ? "FR" : "EN"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
