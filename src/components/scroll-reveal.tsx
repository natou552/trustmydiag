"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, CheckCircle, Star } from "lucide-react";

// ─────────────────────────────────────────────
// CARTE MOCK — remplace le contenu statique par
// tes vraies données ou une image de l'interface
// ─────────────────────────────────────────────
function DiagCard() {
  return (
    <div
      className="relative w-[340px] sm:w-[400px] rounded-3xl overflow-hidden select-none"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(40px) saturate(180%)",
        border: "1px solid rgba(139,127,240,0.25)",
        boxShadow:
          "0 0 0 1px rgba(139,127,240,0.08), 0 32px 80px rgba(0,0,0,0.6), 0 0 120px rgba(139,127,240,0.15)",
      }}
    >
      {/* Glow interne violet en haut */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(139,127,240,0.8), transparent)" }}
      />

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2.5">
          {/* Logo TrustMyDiag — remplace par <Image src="/logo.png" ... /> */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)" }}
          >
            TM
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: "#E8E6F0" }}>TrustMyDiag</p>
            <p className="text-[10px]" style={{ color: "#6B6880" }}>Second avis médical</p>
          </div>
        </div>
        {/* Badge statut */}
        <div
          className="flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: "rgba(72,187,120,0.12)", color: "#68D391", border: "1px solid rgba(72,187,120,0.2)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Avis rendu
        </div>
      </div>

      {/* ── Patient ── */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          {/* Avatar initiales — remplace par l'avatar réel du patient */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #C4A8D4, #8B7FF0)" }}
          >
            JD
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#E8E6F0" }}>
              {/* Remplace par le nom du patient */}
              Jean Dupont
            </p>
            <div
              className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full mt-0.5"
              style={{ background: "rgba(139,127,240,0.15)", color: "#A89EE8" }}
            >
              {/* Remplace par la spécialité réelle */}
              ● Dentaire
            </div>
          </div>
        </div>
      </div>

      {/* ── Extrait de l'avis ── */}
      <div className="px-5 py-5">
        {/* Remplace ce texte par un extrait réel d'un avis médical */}
        <p className="text-sm leading-relaxed" style={{ color: "#B8B4CC" }}>
          <span style={{ color: "#8B7FF0", fontSize: "28px", lineHeight: 1, float: "left", marginRight: "6px", marginTop: "-4px" }}>"</span>
          Le plan de traitement proposé est médicalement justifié. L'implant en position 36 constitue la solution la plus pérenne compte tenu de l'état de l'os alvéolaire…
        </p>
      </div>

      {/* ── Footer ── */}
      <div className="px-5 pb-5 pt-1">
        <div
          className="rounded-xl px-4 py-3 flex items-center justify-between"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div>
            {/* Remplace par le nom du médecin réel */}
            <p className="text-xs font-semibold" style={{ color: "#C4C2D4" }}>Dr. xxxxxx xxxx</p>
            <p className="text-[10px] mt-0.5" style={{ color: "#6B6880" }}>Chirurgien-dentiste · Rendu en 36h</p>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" style={{ color: "#F6C90E" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Reflet bas */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPOSANT PRINCIPAL — ScrollReveal
// ─────────────────────────────────────────────
export function ScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // On attend le prochain tick pour que le DOM soit bien mesuré
    const ctx = gsap.context(() => {

      // ── Timeline principale calée sur le scroll ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",       // commence quand la section atteint le haut
          end: "+=220%",          // se joue sur 220vh de scroll
          pin: true,              // épingle la section pendant la durée
          pinSpacing: true,
          scrub: 1.4,             // smoothness du scrub (plus = plus fluide/lent)
          anticipatePin: 1,
        },
      });

      // ── Phase 1 (0 → 0.35) : la carte se stabilise depuis le fond ──
      tl.from(cardRef.current, {
        scale: 1.12,
        opacity: 0,
        y: 30,
        ease: "power2.out",
        duration: 0.35,
      }, 0);

      // ── Phase 2 (0.25 → 0.75) : carte glisse à droite + rotation ──
      tl.to(cardRef.current, {
        xPercent: 46,             // décalage vers la droite (% de la carte)
        scale: 0.80,
        rotation: 3.5,            // légère rotation dans le sens horaire
        ease: "power2.inOut",
        duration: 0.5,
      }, 0.25);

      // ── Phase 3 (0.5 → 1) : texte de gauche fade-in + montée ──
      const children = textRef.current ? Array.from(textRef.current.children) : [];
      tl.fromTo(
        children,
        { opacity: 0, y: 52 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.09,          // décalage entre chaque enfant
          ease: "power3.out",
          duration: 0.45,
        },
        0.5
      );

    }, containerRef);

    return () => ctx.revert(); // nettoyage GSAP au démontage
  }, []);

  return (
    // ── Wrapper scroll ── hauteur réelle = 100vh, le pin ajoute l'espace de scroll
    <div ref={containerRef} className="relative w-full overflow-hidden"
      style={{ height: "100vh", background: "#090816" }}
    >
      {/* ── Fond décoratif ── */}
      {/* Orbe violet central — taille et position ajustables */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(139,127,240,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Orbe mauve bas-gauche */}
      <div className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(196,168,212,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Grille de points — pattern SVG inline */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(139,127,240,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Conteneur centré ── */}
      <div className="relative h-full flex items-center justify-center">

        {/* ── Carte médicale animée ── */}
        <div ref={cardRef} className="absolute" style={{ zIndex: 10 }}>
          <DiagCard />
        </div>

        {/* ── Bloc texte gauche (apparaît au scroll) ── */}
        <div
          ref={textRef}
          className="absolute left-0 w-full max-w-sm px-8 sm:px-12"
          style={{ zIndex: 5, pointerEvents: "none" }} // pointerEvents: "auto" une fois visible si besoin
        >
          {/* Eyebrow — remplace le texte */}
          <p className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#8B7FF0" }}>
            Simple &amp; Rapide
          </p>

          {/* H2 — remplace par ton titre */}
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-5"
            style={{ color: "#E8E6F0" }}>
            Déposez votre dossier.{" "}
            <span style={{
              background: "linear-gradient(135deg, #8B7FF0, #C4A8D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Recevez votre avis.
            </span>
          </h2>

          {/* Points clés — remplace les textes */}
          <ul className="space-y-3 mb-8">
            {[
              "Médecins diplômés, inscrits à l'Ordre",
              "Réponse écrite détaillée en moins de 48h",
              "100 % en ligne, sans déplacement",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm"
                style={{ color: "#9B98A8" }}>
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#8B7FF0" }} />
                {item}
              </li>
            ))}
          </ul>

          {/* CTA — pointerEvents réactivé pour le clic */}
          <div style={{ pointerEvents: "auto" }}>
            <Link href="/register">
              <button
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)",
                  boxShadow: "0 8px 28px rgba(139,127,240,0.4)",
                }}
              >
                Commencer maintenant
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
