"use client";

import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "@/contexts/language";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CookieBanner } from "@/components/cookie-banner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <SmoothScroll />
        {children}
        <CookieBanner />
      </LanguageProvider>
    </SessionProvider>
  );
}
