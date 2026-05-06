"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Shield, ChevronDown, Menu, X, Globe } from "lucide-react";
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

  const learnItems = [
    { label: tr.blog, href: "/blog" },
    { label: tr.guides, href: "/guides" },
    { label: tr.testimonials, href: "/testimonials" },
  ];

  const companyItems = [
    { label: tr.about, href: "/about" },
    { label: tr.news, href: "/news" },
    { label: tr.contact, href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#EEF1F7]/90 backdrop-blur-md border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-[#1D1D1F] shrink-0">
          <Shield className="h-5 w-5 text-[#0071E3]" />
          TrustMyDiag
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-0.5 text-sm">
          <Link href="/#how" className="px-4 py-1.5 rounded-full text-[#374151] hover:bg-black/[0.06] transition-colors duration-150">
            {tr.howItWorks}
          </Link>
          <Link href="/#doctors" className="px-4 py-1.5 rounded-full text-[#374151] hover:bg-black/[0.06] transition-colors duration-150">
            {tr.doctors}
          </Link>
          <Dropdown label={tr.learn} items={learnItems} />
          <Dropdown label={tr.company} items={companyItems} />
        </nav>

        {/* Right side desktop */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 text-xs font-medium text-[#374151] px-3 py-1.5 rounded-full border border-black/[0.1] hover:bg-black/[0.06] transition-colors duration-150"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "fr" ? "FR" : "EN"}
          </button>

          {session ? (
            <>
              <Link href="/dashboard">
                <button className="text-sm text-[#374151] px-4 py-1.5 rounded-full hover:bg-black/[0.06] transition-colors duration-150">
                  {tr.mySpace}
                </button>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-[#374151] px-4 py-1.5 rounded-full hover:bg-black/[0.06] transition-colors duration-150"
              >
                {tr.logout}
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="text-sm text-[#374151] px-4 py-1.5 rounded-full hover:bg-black/[0.06] transition-colors duration-150">
                  {tr.login}
                </button>
              </Link>
              <Link href="/register">
                <button className="text-sm text-white bg-[#0071E3] hover:bg-[#0077ED] px-5 py-1.5 rounded-full font-medium transition-colors duration-150 shadow-sm">
                  {tr.start}
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile: lang + burger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className="flex items-center gap-1 text-xs font-medium text-[#374151] px-2.5 py-1.5 rounded-full border border-black/[0.1] hover:bg-black/[0.06] transition-colors"
          >
            <Globe className="h-3 w-3" />
            {lang === "fr" ? "FR" : "EN"}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-full hover:bg-black/[0.06] transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5 text-[#374151]" /> : <Menu className="h-5 w-5 text-[#374151]" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#EEF1F7] border-t border-black/[0.06] px-4 pb-5 pt-3">
          <div className="flex flex-col gap-0.5">
            {[
              { label: tr.howItWorks, href: "/#how" },
              { label: tr.doctors, href: "/#doctors" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-sm text-[#374151] rounded-xl hover:bg-black/[0.06] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <p className="mt-4 mb-1 px-4 text-[10px] font-semibold text-[#6E6E73] uppercase tracking-widest">{tr.learn}</p>
          <div className="flex flex-col gap-0.5">
            {learnItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-sm text-[#374151] rounded-xl hover:bg-black/[0.06] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <p className="mt-4 mb-1 px-4 text-[10px] font-semibold text-[#6E6E73] uppercase tracking-widest">{tr.company}</p>
          <div className="flex flex-col gap-0.5">
            {companyItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-sm text-[#374151] rounded-xl hover:bg-black/[0.06] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-black/[0.06] flex gap-2">
            {session ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex-1">
                  <button className="w-full text-sm text-[#374151] px-4 py-2 rounded-full border border-black/[0.1] hover:bg-black/[0.06] transition-colors">
                    {tr.mySpace}
                  </button>
                </Link>
                <button
                  onClick={() => { signOut({ callbackUrl: "/" }); setMobileOpen(false); }}
                  className="flex-1 text-sm text-[#374151] px-4 py-2 rounded-full border border-black/[0.1] hover:bg-black/[0.06] transition-colors"
                >
                  {tr.logout}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                  <button className="w-full text-sm text-[#374151] px-4 py-2 rounded-full border border-black/[0.1] hover:bg-black/[0.06] transition-colors">
                    {tr.login}
                  </button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1">
                  <button className="w-full text-sm text-white bg-[#0071E3] hover:bg-[#0077ED] px-4 py-2 rounded-full font-medium transition-colors shadow-sm">
                    {tr.start}
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
