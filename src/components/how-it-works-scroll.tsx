"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Upload, CreditCard, MessageSquare } from "lucide-react";

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
  <CreditCard key="c" className="h-5 w-5" />,
  <MessageSquare key="m" className="h-5 w-5" />,
];

export function HowItWorksScroll({ steps, eyebrow, h2 }: Props) {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── 1. Header : fade + translateY calé sur le scroll ──
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

      // ── 2. Cartes : chacune arrive de sa propre direction + rotation ──
      // La section est épinglée le temps que les 3 cartes se déploient
      const cards = cardsRef.current
        ? Array.from(cardsRef.current.children)
        : [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 10%",      // commence quand la section est quasi en haut
          end: "+=160%",         // se joue sur 160vh de scroll
          pin: true,             // épingle la section
          pinSpacing: true,
          scrub: 1.2,            // fluidité du scrub (augmente = plus doux)
          anticipatePin: 1,
        },
      });

      // Carte 1 — arrive de la gauche avec légère rotation
      tl.from(cards[0], {
        x: -80,
        y: 60,
        rotation: -5,
        scale: 0.88,
        opacity: 0,
        ease: "power2.out",
        duration: 0.4,
      }, 0);

      // Carte 2 — arrive du bas, centrée
      tl.from(cards[1], {
        y: 100,
        scale: 0.85,
        opacity: 0,
        ease: "power2.out",
        duration: 0.4,
      }, 0.15);

      // Carte 3 — arrive de la droite avec légère rotation inverse
      tl.from(cards[2], {
        x: 80,
        y: 60,
        rotation: 5,
        scale: 0.88,
        opacity: 0,
        ease: "power2.out",
        duration: 0.4,
      }, 0.3);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how"
      ref={sectionRef}
      className="py-28 px-6"
      style={{ background: "#F4F3F8" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-20">
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
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
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
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6 text-white"
                style={{ background: GRADIENTS[i] }}
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
