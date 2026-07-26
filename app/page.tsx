import type { Metadata } from "next";
import { Toggle } from "@/components/ui";
import { UxRichLayout, AtsLayout } from "@/components/layouts";
import { getResumeData, RESUME_REGISTRY } from "@/data/resumes";
import { getSidebarBg, getAccentGradientEnd } from "@/lib";
import type { ThemeMode, ViewType, ResumeType } from "@/types";

interface PageProps {
  searchParams: Promise<{ view?: string; type?: string; color?: string; gradient?: string; mode?: string; card?: string }>;
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
  const { view, type, color, gradient, mode, card } = await searchParams;
  const activeView: ViewType = view === "ats" ? "ats" : "ux";
  const isValidType = RESUME_REGISTRY.some((p) => p.id === type);
  const activeType: ResumeType = isValidType ? (type as ResumeType) : (RESUME_REGISTRY[0].id as ResumeType);
  const isGradient = gradient !== "false";
  const isWhiteCard = card !== "dark";

  const themeMode: ThemeMode =
    mode === "dark" ? "dark" : mode === "light" ? "light" : "system";

  let activeColor = "#252525";
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
      <Toggle
        activeView={activeView}
        activeType={activeType}
        activeColor={activeColor}
        useGradient={isGradient}
        themeMode={themeMode}
        whiteCard={isWhiteCard}
      />
      <div className={`w-full flex-1 flex flex-col justify-start items-center print:block ${isWhiteCard ? "force-light" : ""}`}>
        {activeView === "ux" ? (
          <UxRichLayout data={currentData} />
        ) : (
          <AtsLayout data={currentData} />
        )}
      </div>
    </div>
  );
}
