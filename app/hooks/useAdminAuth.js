"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export function useAdminAuth() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Login sayfasında koruma uygulama
      if (pathname.startsWith("/admin/login")) return;
      const auth = localStorage.getItem("admin_auth");
      if (auth !== "ok") {
        router.replace("/admin/login?next=" + encodeURIComponent(pathname));
      }
    }
  }, [router, pathname]);
}
