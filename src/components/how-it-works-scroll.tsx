"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Upload, Stethoscope, MessageSquare } from "lucide-react";

type Step = { step: string | number; title: string; desc: string };

type Props = {
  steps: readonly Step[];
  eyebrow: string;
  h2: string;
};

const GRADIENTS = [
  "linear-gradient(135deg, #8B7FF0, #C4A8D4)",
  "linear-gradient(135deg, #C4A8D4, #F9C4B0)",
  "linear-gradient(135deg, #7EC8C8, #8B7FF0)",
];

const ICONS = [
  <Upload key="u" className="h-5 w-5" />,
  <Stethoscope key="s" className="h-5 w-5" />,
  <MessageSquare key="m" className="h-5 w-5" />,
];

export function HowItWorksScroll({ steps, eyebrow, h2 }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardsRef.current
        ? Array.from(cardsRef.current.children)
        : [];

      // ── gsap.matchMedia : animations différentes selon la taille d'écran ──
      const mm = gsap.matchMedia();

      // ════════════════════════════════════════
      // DESKTOP (≥ 768px) — pin + scrub
      // ════════════════════════════════════════
      mm.add("(min-width: 768px)", () => {
        // Header parallax
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 40,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        });

        // Cartes — pin + scrub avec directions différentes
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 10%",
            end: "+=160%",
            pin: true,
            pinSpacing: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        tl.from(cards[0], { x: -80, y: 60, rotation: -5, scale: 0.88, opacity: 0, ease: "power2.out", duration: 0.4 }, 0);
        tl.from(cards[1], { y: 100, scale: 0.85, opacity: 0, ease: "power2.out", duration: 0.4 }, 0.15);
        tl.from(cards[2], { x: 80, y: 60, rotation: 5, scale: 0.88, opacity: 0, ease: "power2.out", duration: 0.4 }, 0.3);
      });

      // ════════════════════════════════════════
      // MOBILE (< 768px) — scroll reveal sans pin
      // Les cartes s'empilent verticalement,
      // chacune se révèle en entrant dans le viewport
      // ════════════════════════════════════════
      mm.add("(max-width: 767px)", () => {
        // Header : fade + scale rapide
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        // Chaque carte se révèle indépendamment avec un effet "surgir"
        cards.forEach((card, i) => {
          // Alternance gauche / droite / gauche pour donner du rythme
          const xFrom = i % 2 === 0 ? -40 : 40;

          gsap.from(card, {
            opacity: 0,
            x: xFrom,
            y: 50,
            scale: 0.93,
            rotation: i % 2 === 0 ? -3 : 3,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",       // déclenche quand la carte entre dans le viewport
              toggleActions: "play none none reverse",
            },
            delay: 0,                 // pas de delay global — le scroll se charge du timing
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how"
      ref={sectionRef}
      className="py-20 md:py-28 px-6 mx-3 md:mx-5 my-2 rounded-[28px]"
      style={{ background: "linear-gradient(160deg, #E2DEFA 0%, #EAE8F2 40%, #F2D5C8 100%)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)", border: "1px solid rgba(255,255,255,0.85)", boxShadow: "0 2px 0 rgba(255,255,255,0.9) inset, 0 20px 60px rgba(139,127,240,0.14), 0 4px 20px rgba(0,0,0,0.05)" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-12 md:mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#8B7FF0" }}>
            {eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: "#2D2A3E" }}>
            {h2}
          </h2>
        </div>

        {/* ── Cartes ── */}
        {/* Sur mobile : gap plus large pour que chaque carte soit bien visible avant la suivante */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((item, i) => (
            <div
              key={item.step}
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 24px rgba(139,127,240,0.07)",
              }}
            >
              {/* Gradient top border */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
                style={{ background: GRADIENTS[i] }}
              />

              {/* Numéro d'étape en grand en arrière-plan — décoratif */}
              <span
                className="absolute top-4 right-5 text-7xl font-black select-none pointer-events-none"
                style={{ color: "rgba(139,127,240,0.06)", lineHeight: 1 }}
              >
                {item.step}
              </span>

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white"
                style={{ background: GRADIENTS[i], boxShadow: `0 6px 16px rgba(139,127,240,0.25)` }}
              >
                {ICONS[i]}
              </div>
              <p className="text-xs font-medium mb-2" style={{ color: "#B0ABBD" }}>
                Étape {item.step}
              </p>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "#2D2A3E" }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6B6880" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
