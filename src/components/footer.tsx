"use client";

import Link from "next/link";
import { Shield, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/language";
import { t } from "@/lib/translations";

export function Footer() {
  const { lang } = useLang();
  const tr = t[lang];

  return (
    <footer className="pt-14 pb-8 px-6" style={{ background: "transparent" }}>
      <div className="max-w-5xl mx-auto">

        {/* Desktop footer */}
        <div className="hidden md:grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: "#2D2A3E" }}>
              <Shield className="h-4 w-4" style={{ color: "#8B7FF0" }} />
              TrustMyDiag
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: "#6B6880" }}>{tr.footer.tagline}</p>
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-block"
            >
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)",
                  color: "white",
                  boxShadow: "0 2px 14px rgba(139,127,240,0.35)",
                }}
              >
                <LogIn className="h-3.5 w-3.5" />
                {tr.nav.login}
              </Link>
            </motion.div>
          </div>
          {[
            { title: tr.footer.nav, links: tr.footer.navLinks },
            { title: tr.footer.learn, links: tr.footer.learnLinks },
            { title: tr.footer.company, links: tr.footer.companyLinks },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#2D2A3E" }}>{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm transition-colors hover:text-[#2D2A3E]" style={{ color: "#6B6880" }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile footer — simplifié */}
        <div className="md:hidden flex flex-col items-center text-center gap-5 mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#2D2A3E" }}>
            <Shield className="h-4 w-4" style={{ color: "#8B7FF0" }} />
            TrustMyDiag
          </div>
          <p className="text-xs leading-relaxed max-w-[260px]" style={{ color: "#6B6880" }}>{tr.footer.tagline}</p>
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full"
              style={{
                background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)",
                color: "white",
                boxShadow: "0 2px 14px rgba(139,127,240,0.35)",
              }}
            >
              <LogIn className="h-3.5 w-3.5" />
              {tr.nav.login}
            </Link>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {[...tr.footer.navLinks, ...tr.footer.learnLinks.slice(0, 2)].map((l) => (
              <Link key={l.href} href={l.href} className="text-xs transition-colors" style={{ color: "#6B6880" }}>{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Bottom bar — commun */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(45,42,62,0.12)" }}>
          <p className="text-xs" style={{ color: "#8B88A0" }}>© {new Date().getFullYear()} {tr.footer.copyright}</p>
          <div className="hidden md:flex items-center gap-3 flex-wrap justify-center">
            <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5" style={{ border: "1px solid rgba(139,127,240,0.25)", background: "rgba(139,127,240,0.08)" }}>
              <svg className="h-3.5 w-3.5" style={{ color: "#8B7FF0" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#8B7FF0" }}>RGPD</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5" style={{ border: "1px solid rgba(139,127,240,0.2)", background: "rgba(139,127,240,0.06)" }}>
              <svg className="h-3.5 w-3.5" style={{ color: "#8B7FF0" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#8B7FF0" }}>HDS</span>
              <span className="text-[10px]" style={{ color: "#8B88A0" }}>En cours</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {tr.footer.legal.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs transition-colors hover:text-[#2D2A3E]" style={{ color: "#8B88A0" }}>{l.label}</Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
