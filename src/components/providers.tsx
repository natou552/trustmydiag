"use client";

import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "@/contexts/language";
import { SmoothScroll } from "@/components/smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <SmoothScroll />
        {children}
      </LanguageProvider>
    </SessionProvider>
  );
}
