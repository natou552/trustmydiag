"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import {
  CheckCircle,
  FileText,
  MessageSquare,
  Shield,
  Lock,
  ArrowRight,
  Clock,
  Upload,
  CreditCard,
  Stethoscope,
  Eye,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { useLang } from "@/contexts/language";
import { t } from "@/lib/translations";

const FEATURE_ICONS = [
  <Stethoscope key="s" className="h-5 w-5 text-[#0071E3]" />,
  <Clock key="c" className="h-5 w-5 text-[#0071E3]" />,
  <Lock key="l" className="h-5 w-5 text-[#0071E3]" />,
  <Eye key="e" className="h-5 w-5 text-[#0071E3]" />,
  <CreditCard key="cc" className="h-5 w-5 text-[#0071E3]" />,
  <FileText key="f" className="h-5 w-5 text-[#0071E3]" />,
];

const STEP_ICONS = [
  <Upload key="u" className="h-6 w-6 text-white" />,
  <CreditCard key="c" className="h-6 w-6 text-white" />,
  <MessageSquare key="m" className="h-6 w-6 text-white" />,
];

const STEP_COLORS = ["bg-[#0071E3]", "bg-[#5E5CE6]", "bg-[#34C759]"];

const DOCTOR_STYLES = [
  { headerBg: "bg-gradient-to-br from-[#0071E3] to-[#0051A8]", pillsBg: "bg-blue-50 text-[#0071E3]" },
  { headerBg: "bg-gradient-to-br from-[#5E5CE6] to-[#3634A3]", pillsBg: "bg-violet-50 text-violet-700" },
];
const DOCTOR_INITIALS = ["RB", "YB"];

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
        .marquee-inner { animation: marquee 28s linear infinite; }
        .marquee-inner:hover { animation-play-state: paused; }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-28 px-4 bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-blue-100/70 blur-[100px]" />
          <div className="absolute top-32 right-1/4 w-[300px] h-[300px] rounded-full bg-violet-100/40 blur-[80px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <BadgeCheck className="h-3.5 w-3.5" />
            {tr.hero.badge}
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#1D1D1F] leading-[1.05] tracking-tight mb-6">
            {tr.hero.h1}{" "}
            <span className="text-[#0071E3]">{tr.hero.h1Accent}</span>
          </h1>
          <p className="text-xl text-[#6E6E73] max-w-2xl mx-auto leading-relaxed mb-10">
            {tr.hero.sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-[#0071E3] hover:bg-[#0077ED] text-white px-8 py-6 text-base font-semibold rounded-full gap-2 w-full sm:w-auto shadow-md shadow-blue-200 transition-all duration-200">
                {tr.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#how">
              <Button size="lg" variant="outline" className="border-[#D2D2D7] text-[#1D1D1F] hover:bg-[#F5F5F7] px-8 py-6 text-base font-semibold rounded-full w-full sm:w-auto transition-all duration-200">
                {tr.hero.howItWorks}
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-[#6E6E73]">
            <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-[#34C759]" />{tr.hero.trustConfidential}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[#0071E3]" />{tr.hero.trust72h}</span>
            <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[#6E6E73]" />{tr.hero.trustRgpd}</span>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-y border-[#D2D2D7]/60 bg-[#F5F5F7] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="marquee-inner flex gap-10 items-center">
            {tr.marquee.map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-sm text-[#6E6E73] flex-shrink-0">
                <span className="w-1 h-1 rounded-full bg-[#0071E3] flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {tr.stats.map((s) => (
            <div key={s.label}>
              <div className="text-5xl font-black text-[#1D1D1F] mb-1">{s.value}</div>
              <div className="text-sm font-semibold text-[#1D1D1F]">{s.label}</div>
              <div className="text-xs text-[#6E6E73] mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-4 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0071E3] font-semibold text-xs uppercase tracking-widest mb-3">{tr.why.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1D1D1F] leading-tight">{tr.why.h2}</h2>
            <p className="text-[#6E6E73] text-lg mt-4 max-w-xl mx-auto">{tr.why.sub}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {tr.why.features.map((item, i) => (
              <div key={item.title} className="bg-white rounded-2xl p-7 border border-[#D2D2D7]/50 hover:border-[#0071E3]/30 hover:shadow-md transition-all duration-200 group">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                  {FEATURE_ICONS[i]}
                </div>
                <h3 className="font-bold text-[#1D1D1F] mb-2">{item.title}</h3>
                <p className="text-[#6E6E73] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0071E3] font-semibold text-xs uppercase tracking-widest mb-3">{tr.how.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1D1D1F]">{tr.how.h2}</h2>
            <p className="text-[#6E6E73] text-lg mt-4 max-w-lg mx-auto">{tr.how.sub}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {tr.how.steps.map((item, i) => (
              <div key={item.step} className="relative flex flex-col">
                {i < 2 && (
                  <div className="hidden md:flex absolute -right-3 top-8 z-10 w-6 items-center justify-center">
                    <ChevronRight className="h-4 w-4 text-[#D2D2D7]" />
                  </div>
                )}
                <div className="bg-[#F5F5F7] rounded-2xl p-8 flex-1 border border-[#D2D2D7]/40 hover:border-[#D2D2D7] hover:shadow-sm transition-all duration-200">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 ${STEP_COLORS[i]} rounded-2xl flex items-center justify-center shadow-sm`}>
                      {STEP_ICONS[i]}
                    </div>
                    <span className="text-5xl font-black text-[#D2D2D7] leading-none">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-lg text-[#1D1D1F] mb-2">{item.title}</h3>
                  <p className="text-[#6E6E73] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/register">
              <Button size="lg" className="bg-[#0071E3] hover:bg-[#0077ED] text-white px-8 py-6 text-base font-semibold rounded-full gap-2 shadow-md shadow-blue-200 transition-all duration-200">
                {tr.how.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section id="doctors" className="py-24 px-4 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0071E3] font-semibold text-xs uppercase tracking-widest mb-3">{tr.doctors.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1D1D1F]">{tr.doctors.h2}</h2>
            <p className="text-[#6E6E73] text-lg mt-4 max-w-xl mx-auto">{tr.doctors.sub}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {tr.doctors.list.map((doc, i) => (
              <div key={doc.name} className="bg-white rounded-2xl border border-[#D2D2D7]/50 overflow-hidden hover:shadow-lg transition-all duration-200">
                <div className={`${DOCTOR_STYLES[i].headerBg} p-8`}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white text-lg font-black flex-shrink-0">
                      {DOCTOR_INITIALS[i]}
                    </div>
                    <div>
                      <span className="inline-block text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full mb-1.5">{doc.tag}</span>
                      <h3 className="font-bold text-xl text-white">{doc.name}</h3>
                      <p className="text-white/70 text-sm">{doc.specialty}</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-[#6E6E73] text-sm leading-relaxed mb-5">{doc.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {doc.features.map((f) => (
                      <span key={f} className={`text-xs font-medium ${DOCTOR_STYLES[i].pillsBg} px-3 py-1.5 rounded-full`}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0071E3] font-semibold text-xs uppercase tracking-widest mb-3">{tr.pricing.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1D1D1F]">{tr.pricing.h2}</h2>
            <p className="text-[#6E6E73] text-lg mt-4 max-w-lg mx-auto">{tr.pricing.sub}</p>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#D2D2D7]/60 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-[#0071E3] to-[#0051A8] p-10 flex flex-col justify-between">
                <div>
                  <div className="text-8xl font-black leading-none text-white mb-2">22€</div>
                  <p className="text-blue-200 text-base">{tr.pricing.priceLabel}</p>
                  <p className="text-blue-300/60 text-sm mt-1">{tr.pricing.priceSub}</p>
                </div>
                <Link href="/register" className="mt-8 block">
                  <Button className="bg-white text-[#0071E3] hover:bg-blue-50 w-full py-6 text-base font-bold rounded-full gap-2 transition-all duration-200">
                    {tr.pricing.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="p-10">
                <p className="text-xs font-semibold text-[#6E6E73] uppercase tracking-widest mb-6">{tr.pricing.included}</p>
                <ul className="space-y-4">
                  {tr.pricing.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#1D1D1F]">
                      <CheckCircle className="h-4 w-4 text-[#34C759] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RGPD ── */}
      <section className="py-16 px-4 bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#D2D2D7]/50 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Lock className="h-6 w-6 text-[#0071E3]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-bold text-lg text-[#1D1D1F] mb-2">{tr.rgpd.title}</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                {tr.rgpd.desc}{" "}
                <Link href="/rgpd" className="text-[#0071E3] hover:underline font-medium">{tr.rgpd.link}</Link>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 flex-shrink-0">
              {["RGPD", "SSL/TLS", "Stripe", "EU"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 bg-[#F5F5F7] border border-[#D2D2D7]/60 rounded-lg px-3 py-2 text-xs text-[#6E6E73]">
                  <CheckCircle className="h-3 w-3 text-[#34C759] flex-shrink-0" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="py-28 px-4 bg-[#1D1D1F]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#6E6E73] font-semibold text-xs uppercase tracking-widest mb-4">{tr.cta.eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">{tr.cta.h2}</h2>
          <p className="text-[#6E6E73] text-lg mb-10 max-w-lg mx-auto">{tr.cta.sub}</p>
          <Link href="/register">
            <Button size="lg" className="bg-[#0071E3] hover:bg-[#0077ED] text-white px-10 py-6 text-base font-bold rounded-full gap-2 shadow-lg shadow-blue-500/30 transition-all duration-200">
              {tr.cta.button}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="text-[#6E6E73] text-xs mt-4">{tr.cta.trust}</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#F5F5F7] border-t border-[#D2D2D7]/60 pt-14 pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 font-semibold text-[#1D1D1F] mb-3">
                <Shield className="h-4 w-4 text-[#0071E3]" />
                TrustMyDiag
              </div>
              <p className="text-xs text-[#6E6E73] leading-relaxed max-w-[180px]">{tr.footer.tagline}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-widest mb-4">{tr.footer.nav}</p>
              <ul className="space-y-3 text-sm text-[#6E6E73]">
                {tr.footer.navLinks.map((l) => (
                  <li key={l.href}><Link href={l.href} className="hover:text-[#1D1D1F] transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-widest mb-4">{tr.footer.learn}</p>
              <ul className="space-y-3 text-sm text-[#6E6E73]">
                {tr.footer.learnLinks.map((l) => (
                  <li key={l.href}><Link href={l.href} className="hover:text-[#1D1D1F] transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-widest mb-4">{tr.footer.company}</p>
              <ul className="space-y-3 text-sm text-[#6E6E73]">
                {tr.footer.companyLinks.map((l) => (
                  <li key={l.href}><Link href={l.href} className="hover:text-[#1D1D1F] transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-[#D2D2D7]/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#6E6E73]">© {new Date().getFullYear()} {tr.footer.copyright}</p>
            <div className="flex flex-wrap justify-center gap-5 text-xs text-[#6E6E73]">
              {tr.footer.legal.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-[#1D1D1F] transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
