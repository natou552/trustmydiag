"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-gray-100 bg-white/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-navy-800">
          <Shield className="h-6 w-6 text-[#1e3a5f]" />
          <span className="text-[#1e3a5f]">TrustMyDiag</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/#how" className="hover:text-[#1e3a5f] transition-colors">Comment ça marche</Link>
          <Link href="/#doctors" className="hover:text-[#1e3a5f] transition-colors">Nos médecins</Link>
          <Link href="/#pricing" className="hover:text-[#1e3a5f] transition-colors">Tarifs</Link>
          <Link href="/rgpd" className="hover:text-[#1e3a5f] transition-colors">RGPD</Link>
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">Mon espace</Button>
              </Link>
              <Button size="sm" variant="ghost" onClick={() => signOut({ callbackUrl: "/" })}>
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">Connexion</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white">
                  Commencer
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
