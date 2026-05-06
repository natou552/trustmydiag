"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Lock,
  Clock,
  Upload,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import { useLang } from "@/contexts/language";
import { t } from "@/lib/translations";

export default function HomePage() {
  const { lang } = useLang();
  const tr = t[lang];

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F]">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner { animation: marquee 32s linear infinite; }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pt-10 pb-24 px-6 text-center"
        style={{
          background:
            "radial-gradient(ellipse at 65% -5%, rgba(253,186,186,0.35) 0%, transparent 55%), radial-gradient(ellipse at 15% 70%, rgba(196,181,253,0.25) 0%, transparent 50%), radial-gradient(ellipse at 85% 90%, rgba(147,197,253,0.2) 0%, transparent 50%), #f9faff",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-black/[0.07] text-[#374151] text-xs font-medium px-4 py-2 rounded-full mb-5 shadow-sm">
            <Clock className="h-3 w-3 text-[#0071E3]" />
            {tr.hero.badge}
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-[86px] font-bold text-[#1D1D1F] leading-[1.06] tracking-tight mb-6">
            {tr.hero.h1}{" "}
            <em className="not-italic text-[#0071E3]">{tr.hero.h1Accent}</em>
          </h1>

          <p className="text-lg text-[#6E6E73] max-w-xl mx-auto leading-relaxed mb-8">
            {tr.hero.sub}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <button className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005EC4] text-white text-sm font-medium px-7 py-3.5 rounded-full transition-colors duration-200 shadow-md shadow-blue-200">
                {tr.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="#how">
              <button className="inline-flex items-center gap-2 bg-white/80 hover:bg-white border border-black/[0.1] text-[#374151] text-sm font-medium px-7 py-3.5 rounded-full transition-colors duration-200">
                {tr.hero.howItWorks}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-y border-black/[0.06] bg-white py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="marquee-inner flex gap-12 items-center">
            {tr.marquee.map((item, i) => (
              <span key={i} className="flex items-center gap-2.5 text-xs text-[#9CA3AF] flex-shrink-0">
                <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {tr.stats.map((s) => (
            <div key={s.label}>
              <div className="text-5xl font-bold text-[#1D1D1F] mb-2 tracking-tight">{s.value}</div>
              <div className="text-sm text-[#374151]">{s.label}</div>
              <div className="text-xs text-[#9CA3AF] mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-28 px-6" style={{ background: "#f9faff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-4">{tr.how.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tight">{tr.how.h2}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tr.how.steps.map((item, i) => {
              const icons = [
                <Upload key="u" className="h-5 w-5" />,
                <CreditCard key="c" className="h-5 w-5" />,
                <MessageSquare key="m" className="h-5 w-5" />,
              ];
              const colors = ["text-[#0071E3] bg-blue-50", "text-[#5E5CE6] bg-violet-50", "text-[#34C759] bg-green-50"];
              return (
                <div key={item.step} className="bg-white rounded-3xl p-8 border border-black/[0.06]">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-6 ${colors[i]}`}>
                    {icons[i]}
                  </div>
                  <p className="text-xs text-[#9CA3AF] font-medium mb-2">Étape {item.step}</p>
                  <h3 className="text-lg font-medium text-[#1D1D1F] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#6E6E73] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/register">
              <button className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005EC4] text-white text-sm font-medium px-7 py-3.5 rounded-full transition-colors duration-200 shadow-md shadow-blue-200">
                {tr.how.cta}
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section id="doctors" className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-4">{tr.doctors.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tight">{tr.doctors.h2}</h2>
            <p className="text-[#6E6E73] text-lg mt-4 max-w-lg mx-auto font-bold">{tr.doctors.sub}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {tr.doctors.list.map((doc, i) => {
              const styles = [
                { header: "bg-[#0071E3]", pill: "bg-blue-50 text-[#0071E3]" },
                { header: "bg-[#5E5CE6]", pill: "bg-violet-50 text-violet-700" },
              ];
              const initials = ["RB", "YB"];
              return (
                <div key={doc.name} className="rounded-3xl border border-black/[0.06] overflow-hidden">
                  <div className={`${styles[i].header} p-8`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white text-base font-semibold">
                        {initials[i]}
                      </div>
                      <div>
                        <p className="text-white/60 text-xs mb-0.5">{doc.tag}</p>
                        <h3 className="font-semibold text-white text-lg leading-tight">{doc.name}</h3>
                        <p className="text-white/70 text-sm">{doc.specialty}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-8">
                    <p className="text-[#6E6E73] text-sm leading-relaxed mb-5">{doc.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {doc.features.map((f) => (
                        <span key={f} className={`text-xs ${styles[i].pill} px-3 py-1.5 rounded-full`}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-28 px-6" style={{ background: "#f9faff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-4">{tr.pricing.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tight">{tr.pricing.h2}</h2>
            <p className="text-[#6E6E73] text-lg mt-4 font-bold">{tr.pricing.sub}</p>
          </div>

          <div className="bg-white rounded-3xl border border-black/[0.06] overflow-hidden max-w-2xl mx-auto">
            <div className="bg-[#0071E3] px-10 py-10 text-white">
              <div className="text-7xl font-bold tracking-tight leading-none mb-2">22€</div>
              <p className="text-blue-200 text-sm">{tr.pricing.priceLabel}</p>
            </div>
            <div className="px-10 py-10">
              <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-6">{tr.pricing.included}</p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {tr.pricing.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#374151]">
                    <CheckCircle className="h-4 w-4 text-[#34C759] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="block mt-8">
                <button className="w-full inline-flex items-center justify-center gap-2 bg-[#0071E3] hover:bg-[#005EC4] text-white text-sm font-medium py-4 rounded-full transition-colors duration-200">
                  {tr.pricing.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="h-5 w-5 text-[#0071E3]" />
          </div>
          <h3 className="text-xl font-medium text-[#1D1D1F] mb-3">{tr.rgpd.title}</h3>
          <p className="text-sm text-[#6E6E73] leading-relaxed max-w-lg mx-auto">
            {tr.rgpd.desc}{" "}
            <Link href="/rgpd" className="text-[#0071E3] underline underline-offset-2">{tr.rgpd.link}</Link>
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["RGPD", "SSL/TLS", "Stripe", "EU"].map((b) => (
              <div key={b} className="flex items-center gap-1.5 text-xs text-[#6E6E73] bg-[#F5F5F7] border border-black/[0.06] px-4 py-2 rounded-full">
                <CheckCircle className="h-3 w-3 text-[#34C759]" />
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-32 px-6 text-center"
        style={{
          background:
            "radial-gradient(ellipse at 30% 0%, rgba(253,186,186,0.3) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(196,181,253,0.25) 0%, transparent 50%), #f9faff",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-6">{tr.cta.eyebrow}</p>
          <h2 className="text-5xl md:text-6xl font-bold text-[#1D1D1F] leading-tight tracking-tight mb-6">
            {tr.cta.h2}
          </h2>
          <p className="text-[#6E6E73] text-lg mb-10 font-bold">{tr.cta.sub}</p>
          <Link href="/register">
            <button className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005EC4] text-white text-sm font-medium px-8 py-4 rounded-full transition-colors duration-200 shadow-lg shadow-blue-200">
              {tr.cta.button}
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-5">{tr.cta.trust}</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-black/[0.06] pt-14 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1D1D1F] mb-3">
                <Shield className="h-4 w-4 text-[#0071E3]" />
                TrustMyDiag
              </div>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">{tr.footer.tagline}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-widest mb-4">{tr.footer.nav}</p>
              <ul className="space-y-3">
                {tr.footer.navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-widest mb-4">{tr.footer.learn}</p>
              <ul className="space-y-3">
                {tr.footer.learnLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-widest mb-4">{tr.footer.company}</p>
              <ul className="space-y-3">
                {tr.footer.companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-black/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#9CA3AF]">© {new Date().getFullYear()} {tr.footer.copyright}</p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <div className="flex items-center gap-1.5 border border-black/[0.08] rounded-full px-3 py-1.5 bg-white">
                <svg className="h-3.5 w-3.5 text-[#0071E3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span className="text-[10px] font-semibold text-[#374151] uppercase tracking-wide">RGPD</span>
              </div>
              <div className="flex items-center gap-1.5 border border-black/[0.08] rounded-full px-3 py-1.5 bg-white">
                <svg className="h-3.5 w-3.5 text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <span className="text-[10px] font-semibold text-[#374151] uppercase tracking-wide">HDS</span>
                <span className="text-[10px] text-[#9CA3AF]">En cours</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              {tr.footer.legal.map((l) => (
                <Link key={l.href} href={l.href} className="text-xs text-[#9CA3AF] hover:text-[#6E6E73] transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
