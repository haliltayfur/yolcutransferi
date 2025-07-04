// PATH: app/hooks/useAdminAuth.js
"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function useAdminAuth() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isAdmin = localStorage.getItem("admin_auth") === "ok";
    if (!isAdmin && !pathname.includes("/admin/login")) {
      router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [router, pathname]);
}
