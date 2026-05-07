"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Synchronise Lenis avec le ticker GSAP so que ScrollTrigger
    // et les animations restent parfaitement calées sur le scroll
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return null;
}
