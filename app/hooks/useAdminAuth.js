// PATH: app/hooks/useAdminAuth.js
"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export function useAdminAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const timerRef = useRef();
  const [state, setState] = useState({ loading: true, isAuth: false });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("admin_auth");
      if (auth !== "ok") {
        router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
        setState({ loading: false, isAuth: false });
      } else {
        setState({ loading: false, isAuth: true });
      }

      const resetTimer = () => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          localStorage.removeItem("admin_auth");
          router.replace("/admin/login");
        }, 5 * 60 * 1000);
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
  }, [router, pathname]);

  return state;
}
// PATH: app/hooks/useAdminAuth.js
