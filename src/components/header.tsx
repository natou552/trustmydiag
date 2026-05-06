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
      <header className="sticky top-0 z-50 backdrop-blur-2xl border-b" style={{ background: "rgba(244,243,248,0.6)", borderColor: "rgba(139,127,240,0.1)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold shrink-0" style={{ color: "#2D2A3E" }}>
            <Shield className="h-5 w-5" style={{ color: "#8B7FF0" }} />
            TrustMyDiag
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-0.5 text-sm">
            <Link href="/#how" className="px-4 py-1.5 rounded-full transition-colors duration-150" style={{ color: "#6B6880" }}>
              {tr.howItWorks}
            </Link>
            <Link href="/#doctors" className="px-4 py-1.5 rounded-full transition-colors duration-150" style={{ color: "#6B6880" }}>
              {tr.doctors}
            </Link>
            <Dropdown label={tr.learn} items={learnItems} />
            <Dropdown label={tr.company} items={companyItems} />
          </nav>

          {/* Right side desktop */}
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
                    className="text-sm text-white px-5 py-1.5 rounded-full font-medium transition-all duration-150"
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

      {/* ── MOBILE FULL-SCREEN MENU ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-white/90 backdrop-blur-2xl flex flex-col">

          {/* Top bar */}
          <div className="flex items-center justify-between px-6 h-14 border-b border-black/[0.06] shrink-0">
            <Link href="/" onClick={closeMobile} className="flex items-center gap-2 font-semibold text-[#1D1D1F]">
              <Shield className="h-5 w-5 text-[#0071E3]" />
              TrustMyDiag
            </Link>
            <button
              onClick={closeMobile}
              className="w-9 h-9 rounded-full bg-black/[0.07] flex items-center justify-center hover:bg-black/[0.12] transition-colors"
              aria-label="Fermer"
            >
              <X className="h-4 w-4 text-[#374151]" />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
            <nav className="flex flex-col">

              {/* Simple links */}
              {[
                { label: tr.howItWorks, href: "/#how" },
                { label: tr.doctors, href: "/#doctors" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className="py-4 text-[22px] font-medium text-[#1D1D1F] border-b border-black/[0.06] flex items-center justify-between active:opacity-60 transition-opacity"
                >
                  {item.label}
                </Link>
              ))}

              {/* Ressources accordion */}
              <button
                onClick={() => setLearnOpen(!learnOpen)}
                className="py-4 text-[22px] font-medium text-[#1D1D1F] border-b border-black/[0.06] flex items-center justify-between w-full text-left"
              >
                {tr.learn}
                <ChevronRight className={`h-5 w-5 text-[#9CA3AF] transition-transform duration-200 ${learnOpen ? "rotate-90" : ""}`} />
              </button>
              {learnOpen && (
                <div className="flex flex-col border-b border-black/[0.06]">
                  {learnItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className="py-3 pl-4 text-[17px] text-[#6E6E73] flex items-center gap-2 active:opacity-60 transition-opacity"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#9CA3AF]" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Entreprise accordion */}
              <button
                onClick={() => setCompanyOpen(!companyOpen)}
                className="py-4 text-[22px] font-medium text-[#1D1D1F] border-b border-black/[0.06] flex items-center justify-between w-full text-left"
              >
                {tr.company}
                <ChevronRight className={`h-5 w-5 text-[#9CA3AF] transition-transform duration-200 ${companyOpen ? "rotate-90" : ""}`} />
              </button>
              {companyOpen && (
                <div className="flex flex-col border-b border-black/[0.06]">
                  {companyItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className="py-3 pl-4 text-[17px] text-[#6E6E73] flex items-center gap-2 active:opacity-60 transition-opacity"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#9CA3AF]" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </nav>
          </div>

          {/* Bottom — CTA + lang */}
          <div className="shrink-0 px-6 pb-10 pt-4 flex flex-col items-center gap-4">
            <Link href="/register" onClick={closeMobile} className="w-full">
              <button className="w-full py-4 text-base font-medium text-[#374151] bg-white/80 border border-black/[0.1] rounded-full shadow-sm hover:bg-white transition-colors">
                {session ? tr.mySpace : tr.start}
              </button>
            </Link>
            <div className="flex items-center gap-4">
              {session ? (
                <button
                  onClick={() => { signOut({ callbackUrl: "/" }); closeMobile(); }}
                  className="text-sm text-[#6E6E73]"
                >
                  {tr.logout}
                </button>
              ) : (
                <Link href="/login" onClick={closeMobile}>
                  <span className="text-sm text-[#6E6E73]">{tr.login}</span>
                </Link>
              )}
              <span className="text-[#D1D5DB]">·</span>
              <button
                onClick={toggle}
                className="flex items-center gap-1 text-sm text-[#6E6E73]"
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
