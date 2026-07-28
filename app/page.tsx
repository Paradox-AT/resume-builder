import type { Metadata } from "next";
import ResumeViewWrapper from "@/components/ResumeViewWrapper";
import { getResumeData, RESUME_REGISTRY } from "@/data/resumes";
import { getSidebarBg, getAccentGradientEnd, DEFAULT_ACCENT_COLOR } from "@/lib";
import type { ThemeMode, ViewType, ResumeType } from "@/types";

interface PageProps {
  searchParams: Promise<{ view?: string; theme?: string; type?: string; color?: string; gradient?: string; mode?: string; card?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { type } = await searchParams;
  const resume = getResumeData(type);
  return {
    title: `${resume.personalInfo.name} – ${resume.personalInfo.role}`,
    description: resume.summary,
  };
}

export default async function Home({ searchParams }: PageProps) {
  const { view, theme, type, color, gradient, mode, card } = await searchParams;
  const activeView: ViewType = view === "ats" ? "ats" : "ux";
  const activeTheme = theme || (activeView === "ats" ? "ats-standard" : "ux-modern");
  const activeType: ResumeType = type ? (type as ResumeType) : (RESUME_REGISTRY[0].id as ResumeType);
  const isGradient = gradient !== "false";
  const isWhiteCard = card !== "dark";

  const themeMode: ThemeMode =
    mode === "dark" ? "dark" : mode === "light" ? "light" : "system";

  let activeColor = DEFAULT_ACCENT_COLOR;
  if (color) {
    const decoded = decodeURIComponent(color).trim();
    if (decoded.startsWith("#") || decoded.startsWith("rgb") || decoded.startsWith("hsl")) {
      activeColor = decoded;
    } else {
      activeColor = `#${decoded}`;
    }
  }

  const sidebarBg = getSidebarBg(activeColor);
  const gradientEnd = getAccentGradientEnd(activeColor);
  const currentData = getResumeData(activeType);

  const modeClass =
    themeMode === "dark"
      ? "dark bg-zinc-950"
      : themeMode === "light"
      ? "light bg-zinc-200"
      : "bg-zinc-200 dark:bg-zinc-950";

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
      <ResumeViewWrapper
        initialData={currentData}
        activeView={activeView}
        activeTheme={activeTheme}
        activeType={activeType}
        activeColor={activeColor}
        isGradient={isGradient}
        themeMode={themeMode}
        isWhiteCard={isWhiteCard}
      />
    </div>
  );
}
