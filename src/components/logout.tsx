"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SignOutIcon } from "@phosphor-icons/react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function LogoutButton({ churchLabel, isCollapsed }: { churchLabel?: string; isCollapsed?: boolean }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // O Better Auth limpa o cookie, e nós mandamos pro login global
          router.push(churchLabel ? `/${churchLabel}/login` : "/login");
          router.refresh();
        },
      },
    });
    setIsPending(false);
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 rounded-2xl px-4 py-3 text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive",
        isCollapsed && "justify-center"
      )}
    >
      <LogOut className="h-5 w-5 shrink-0" />
      {!isCollapsed && <span>Sair</span>}
    </Button>
  );
}
