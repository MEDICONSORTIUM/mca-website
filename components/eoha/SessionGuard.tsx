"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";

const IDLE_LIMIT_MS = 15 * 60 * 1000; // keep in sync with SESSION_MAX_AGE
const TAB_FLAG = "mca_tab_auth";

const subscribe = () => () => {};
const readTabFlag = () => sessionStorage.getItem(TAB_FLAG) !== null;
const readTabFlagOnServer = () => false;

export default function SessionGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/eoha/login";
  const hasTabFlag = useSyncExternalStore(subscribe, readTabFlag, readTabFlagOnServer);

  useEffect(() => {
    if (isLogin) return;

    async function signOut() {
      sessionStorage.removeItem(TAB_FLAG);
      await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
      router.replace(`/eoha/login?next=${encodeURIComponent(pathname)}`);
    }

    // New tab, or the tab was closed and reopened: no flag => sign in again
    if (!sessionStorage.getItem(TAB_FLAG)) {
      signOut();
      return;
    }

    // Auto sign-out after 15 minutes without activity
    let timer = setTimeout(signOut, IDLE_LIMIT_MS);
    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(signOut, IDLE_LIMIT_MS);
    };
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [isLogin, pathname, router]);

  return isLogin || hasTabFlag ? <>{children}</> : null;
}
