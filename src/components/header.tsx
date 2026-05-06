"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Shield, ChevronDown, ChevronRight, Menu, X, Globe } from "lucide-react";
import { useLang } from "@/contexts/language";
import { t } from "@/lib/translations";

function Dropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm text-[#374151] transition-colors duration-150 ${
          open ? "bg-white shadow-sm" : "hover:bg-black/[0.06]"
        }`}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-56 bg-white rounded-2xl shadow-xl border border-black/[0.06] py-2 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-[#374151] hover:bg-[#F5F5F7] transition-colors"
            >
              {item.label}
            </Link>
          ))}
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

  const learnItems = [
    { label: tr.blog, href: "/blog" },
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
          background: "rgba(244,243,248,0.55)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          borderBottom: "1px solid rgba(139,127,240,0.08)",
          padding: "10px 5%",
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
            style={{
              gap: "2px",
              padding: "5px 6px",
              borderRadius: "100px",
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(24px) saturate(200%)",
              WebkitBackdropFilter: "blur(24px) saturate(200%)",
              border: "1px solid rgba(255,255,255,0.45)",
              boxShadow: "0 2px 16px rgba(139,127,240,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.28)";
              el.style.boxShadow = "0 6px 28px rgba(139,127,240,0.12), inset 0 1px 0 rgba(255,255,255,0.6)";
              el.style.borderColor = "rgba(255,255,255,0.6)";
              el.style.transform = "translateX(-50%) translateY(-1px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.18)";
              el.style.boxShadow = "0 2px 16px rgba(139,127,240,0.08), inset 0 1px 0 rgba(255,255,255,0.5)";
              el.style.borderColor = "rgba(255,255,255,0.45)";
              el.style.transform = "translateX(-50%) translateY(0)";
            }}
          >
            {[
              { href: "/#how", label: tr.howItWorks },
              { href: "/#doctors", label: tr.doctors },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "7px 16px",
                  borderRadius: "100px",
                  fontSize: "14px",
                  color: "#4A4458",
                  background: "transparent",
                  transition: "background 0.2s, color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.55)";
                  (e.currentTarget as HTMLElement).style.color = "#1a1a2e";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#4A4458";
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
                  <button className="text-sm px-4 py-1.5 rounded-full transition-colors duration-150" style={{ color: "#6B6880" }}>
                    {tr.mySpace}
                  </button>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm px-4 py-1.5 rounded-full transition-colors duration-150"
                  style={{ color: "#6B6880" }}
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

          {/* Mobile: burger only */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-black/[0.06] transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5 text-[#374151]" />
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-[100] flex flex-col"
          style={{ background: "linear-gradient(160deg, #EEF0FB 0%, #F4F3F8 40%, #FDE8E0 100%)", backdropFilter: "blur(24px)" }}
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
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className="flex items-center justify-between px-4 py-3.5 rounded-2xl transition-colors active:opacity-70"
                  style={{ fontSize: "17px", fontWeight: 500, color: "#2D2A3E" }}
                >
                  {item.label}
                </Link>
              ))}

              {/* Ressources accordion */}
              <button
                onClick={() => setLearnOpen(!learnOpen)}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl w-full text-left transition-colors"
                style={{
                  fontSize: "17px", fontWeight: 500, color: "#2D2A3E",
                  background: learnOpen ? "rgba(139,127,240,0.06)" : "transparent",
                }}
              >
                {tr.learn}
                <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${learnOpen ? "rotate-90" : ""}`} style={{ color: "#C4A8D4" }} />
              </button>
              {learnOpen && (
                <div className="flex flex-col gap-0.5 ml-4 mb-1">
                  {learnItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors active:opacity-70"
                      style={{ fontSize: "15px", color: "#6B6880" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#C4A8D4" }} />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Entreprise accordion */}
              <button
                onClick={() => setCompanyOpen(!companyOpen)}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl w-full text-left transition-colors"
                style={{
                  fontSize: "17px", fontWeight: 500, color: "#2D2A3E",
                  background: companyOpen ? "rgba(139,127,240,0.06)" : "transparent",
                }}
              >
                {tr.company}
                <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${companyOpen ? "rotate-90" : ""}`} style={{ color: "#C4A8D4" }} />
              </button>
              {companyOpen && (
                <div className="flex flex-col gap-0.5 ml-4 mb-1">
                  {companyItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors active:opacity-70"
                      style={{ fontSize: "15px", color: "#6B6880" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#C4A8D4" }} />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </nav>
          </div>

          {/* Bottom — CTA */}
          <div className="shrink-0 px-6 pb-12 pt-4 flex flex-col gap-3">
            <Link href={session ? "/dashboard" : "/register"} onClick={closeMobile} className="w-full">
              <button
                className="w-full py-4 text-base font-semibold text-white rounded-2xl transition-all"
                style={{ background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)", boxShadow: "0 8px 24px rgba(139,127,240,0.3)" }}
              >
                {session ? tr.mySpace : tr.start}
              </button>
            </Link>
            <div className="flex items-center justify-center gap-5">
              {session ? (
                <button
                  onClick={() => { signOut({ callbackUrl: "/" }); closeMobile(); }}
                  className="text-sm" style={{ color: "#9B98A8" }}
                >
                  {tr.logout}
                </button>
              ) : (
                <Link href="/login" onClick={closeMobile}>
                  <span className="text-sm" style={{ color: "#9B98A8" }}>{tr.login}</span>
                </Link>
              )}
              <span style={{ color: "#D1C8E8" }}>·</span>
              <button
                onClick={toggle}
                className="flex items-center gap-1.5 text-sm"
                style={{ color: "#9B98A8" }}
              >
                <Globe className="h-3.5 w-3.5" />
                {lang === "fr" ? "FR" : "EN"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
