"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export function useAdminAuth() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("admin_auth");
      if (auth !== "ok") {
        router.replace("/admin/login?next=" + encodeURIComponent(pathname));
      }
    }
  }, [router, pathname]);
}
