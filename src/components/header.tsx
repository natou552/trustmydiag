"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-[#EEF1F7]/90 backdrop-blur-md border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-[#1D1D1F]">
          <Shield className="h-5 w-5 text-[#0071E3]" />
          TrustMyDiag
        </Link>

        {/* Nav — centré */}
        <nav className="hidden md:flex items-center gap-1 text-sm text-[#374151]">
          <Link
            href="/#how"
            className="px-4 py-1.5 rounded-full hover:bg-black/[0.06] transition-colors duration-150"
          >
            Comment ça marche
          </Link>
          <Link
            href="/#doctors"
            className="px-4 py-1.5 rounded-full hover:bg-black/[0.06] transition-colors duration-150"
          >
            Nos médecins
          </Link>
          <Link
            href="/#pricing"
            className="px-4 py-1.5 rounded-full hover:bg-black/[0.06] transition-colors duration-150"
          >
            Tarifs
          </Link>
          <Link
            href="/rgpd"
            className="px-4 py-1.5 rounded-full hover:bg-black/[0.06] transition-colors duration-150"
          >
            RGPD
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <Link href="/dashboard">
                <button className="text-sm text-[#374151] px-4 py-1.5 rounded-full hover:bg-black/[0.06] transition-colors duration-150">
                  Mon espace
                </button>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-[#374151] px-4 py-1.5 rounded-full hover:bg-black/[0.06] transition-colors duration-150"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="text-sm text-[#374151] px-4 py-1.5 rounded-full hover:bg-black/[0.06] transition-colors duration-150">
                  Connexion
                </button>
              </Link>
              <Link href="/register">
                <button className="text-sm text-white bg-[#0071E3] hover:bg-[#0077ED] px-5 py-1.5 rounded-full font-medium transition-colors duration-150 shadow-sm">
                  Commencer
                </button>
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
