// PATH: app/hooks/useAdminAuth.js
"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export function useAdminAuth(setYetkili) {
  const router = useRouter();
  const pathname = usePathname();
  const timerRef = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("admin_auth");
      if (auth !== "ok") {
        if (setYetkili) setYetkili(false);
        router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
      } else {
        if (setYetkili) setYetkili(true);
      }

      const resetTimer = () => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          localStorage.removeItem("admin_auth");
          router.replace("/admin/login");
        }, 5 * 60 * 1000); // 5 dakika
      };

      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keydown", resetTimer);
      resetTimer();

      return () => {
        window.removeEventListener("mousemove", resetTimer);
        window.removeEventListener("keydown", resetTimer);
        clearTimeout(timerRef.current);
      };
    }
  }, [router, pathname, setYetkili]);
}
