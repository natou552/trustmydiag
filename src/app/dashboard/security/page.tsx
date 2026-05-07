import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { SecurityClient } from "@/components/security-client";
import { Header } from "@/components/header";

export default async function SecurityPage() {
  const session = await requireAuth();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { email: true, mfaEnabled: true },
  });

  return (
    <div className="min-h-screen">
      <Header />
      <SecurityClient
        email={user?.email ?? session.user.email ?? ""}
        mfaEnabled={user?.mfaEnabled ?? false}
      />
    </div>
  );
}
