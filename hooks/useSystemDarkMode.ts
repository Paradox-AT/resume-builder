"use client";

import { useSyncExternalStore, useRef, useEffect } from "react";
import type { ThemeMode } from "@/types";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSystemSnapshot(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Returns `effectiveDarkMode` (boolean) based on `themeMode`.
 * Uses `useSyncExternalStore` for hydration-safe system theme detection.
 */
export function useSystemDarkMode(themeMode: ThemeMode): boolean {
  const isPrintingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforePrint = () => {
      isPrintingRef.current = true;
    };
    const handleAfterPrint = () => {
      isPrintingRef.current = false;
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  const systemDark = useSyncExternalStore(subscribe, getSystemSnapshot, getServerSnapshot);

  let isDark = false;
  if (themeMode === "dark") {
    isDark = true;
  } else if (themeMode === "light") {
    isDark = false;
  } else {
    isDark = systemDark;
  }

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, [isDark]);

  return isDark;
}
