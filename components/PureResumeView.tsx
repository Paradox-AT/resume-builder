"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { ResumeData, ViewType, ResumeType, ThemeMode } from "@/types";
import { UxRichLayout, AtsLayout } from "@/components/layouts";
import { getResumeData, RESUME_REGISTRY } from "@/data/resumes";
import { getSidebarBg, getAccentGradientEnd, DEFAULT_ACCENT_COLOR, applyThemeVars } from "@/lib";
import { IconPrint, IconExternalLink, IconCheck } from "@/components/ui/icons";
import { sanitizeResumeData } from "@/lib/sanitize";

export default function PureResumeView() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  const viewParam = searchParams.get("view");
  const themeParam = searchParams.get("theme");
  const typeParam = searchParams.get("type");
  const colorParam = searchParams.get("color");
  const gradientParam = searchParams.get("gradient");
  const modeParam = searchParams.get("mode");
  const cardParam = searchParams.get("card");

  const activeView: ViewType = viewParam === "ats" ? "ats" : "ux";
  const activeTheme = themeParam || (activeView === "ats" ? "ats-standard" : "ux-modern");
  const activeType: ResumeType = (typeParam as ResumeType) || (RESUME_REGISTRY[0].id as ResumeType);
  const isGradient = gradientParam !== "false";
  const isWhiteCard = cardParam !== "dark";

  const themeMode: ThemeMode =
    modeParam === "dark" ? "dark" : modeParam === "light" ? "light" : "system";

  let activeColor = DEFAULT_ACCENT_COLOR;
  if (colorParam) {
    const decoded = decodeURIComponent(colorParam).trim();
    if (decoded.startsWith("#") || decoded.startsWith("rgb") || decoded.startsWith("hsl")) {
      activeColor = decoded;
    } else {
      activeColor = `#${decoded}`;
    }
  }

  const sidebarBg = getSidebarBg(activeColor);
  const gradientEnd = getAccentGradientEnd(activeColor);

  useEffect(() => {
    applyThemeVars(activeColor);
  }, [activeColor]);

  // Load custom profile data from localStorage if viewing custom profile
  useEffect(() => {
    queueMicrotask(() => {
      if (activeType && activeType.startsWith("custom-")) {
        try {
          const saved = localStorage.getItem(`resume-wizard:${activeType}`);
          if (saved) {
            const parsed = JSON.parse(saved);
            setResumeData(sanitizeResumeData(parsed));
            return;
          }
        } catch {}
      }
      setResumeData(getResumeData(activeType));
    });
  }, [activeType]);

  const currentData = resumeData || getResumeData(activeType);

  const modeClass =
    themeMode === "dark"
      ? "dark bg-zinc-950"
      : themeMode === "light"
      ? "light bg-zinc-200"
      : "bg-zinc-200 dark:bg-zinc-950";

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyLink = async () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center py-6 px-4 transition-colors duration-300 print:p-0 print:bg-white print:block ${modeClass} ${
        isGradient ? "use-gradient" : ""
      }`}
      style={
        {
          "--accent-color": activeColor,
          "--accent-gradient-end": gradientEnd,
          "--accent-gradient": `linear-gradient(135deg, ${activeColor}, ${gradientEnd})`,
          "--sidebar-bg": sidebarBg,
        } as React.CSSProperties
      }
    >
      {/* PURE RESUME LAYOUT CONTAINER */}
      <div className={`w-full flex-1 flex flex-col justify-start items-center print:block ${isWhiteCard ? "force-light" : "force-dark"}`}>
        {activeView === "ux" ? (
          <UxRichLayout data={currentData} themeId={activeTheme} />
        ) : (
          <AtsLayout data={currentData} themeId={activeTheme} />
        )}
      </div>

      {/* FLOATING ACTION PILL TOOLBAR (TOP RIGHT, HIDDEN ON PRINT) */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 p-1.5 shadow-2xl backdrop-blur-md transition-all print:hidden font-sans">
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          title="Print or save PDF"
        >
          <IconPrint className="h-3.5 w-3.5 text-[var(--accent-color)]" />
          <span>Print PDF</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          title="Copy shareable URL"
        >
          {copied ? (
            <>
              <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <IconExternalLink className="h-3.5 w-3.5 text-zinc-400" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
