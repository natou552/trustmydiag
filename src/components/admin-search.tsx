"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { AdminRequestCard } from "@/components/admin-request-card";
import type { Request, User } from "@prisma/client";

type RequestWithUser = Request & { user: Pick<User, "name" | "email"> };

export function AdminSearch({ requests }: { requests: RequestWithUser[] }) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? requests.filter(r =>
        r.user.name.toLowerCase().includes(query.toLowerCase()) ||
        r.user.email.toLowerCase().includes(query.toLowerCase()) ||
        r.id.toLowerCase().includes(query.toLowerCase())
      )
    : requests;

  return (
    <div>
      {/* Barre de recherche */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher par nom, email ou référence…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl focus:outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(139,127,240,0.18)",
            color: "#2D2A3E",
          }}
          onFocus={e => (e.target.style.border = "1px solid rgba(139,127,240,0.5)")}
          onBlur={e => (e.target.style.border = "1px solid rgba(139,127,240,0.18)")}
        />
      </div>

      {/* Résultats */}
      {filtered.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Search className="h-8 w-8 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Aucune demande trouvée pour « {query} »</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(req => (
            <div key={req.id} className="relative">
              {req.status === "PAID" && (
                <span className="absolute top-3 right-10 z-10 bg-orange-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Nouveau
                </span>
              )}
              <AdminRequestCard request={req} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
