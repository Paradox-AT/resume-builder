"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ThemeMode, ResumeType, ViewType, ResumeProfile } from "@/types";
import { UX_THEMES, ATS_THEMES, type ResumeThemeDefinition } from "@/types";
import ThemeThumbnail from "./ThemeThumbnail";
import { getAccentGradientEnd, applyThemeVars, COLOR_PRESET_GROUPS, PRESET_COLORS, DEFAULT_ACCENT_COLOR, APPEARANCE_MODES, type PresetColorGroup, type PresetColor } from "@/lib";
import { RESUME_REGISTRY } from "@/data/resumes";
import { useSystemDarkMode } from "@/hooks/useSystemDarkMode";
import {
  IconUxRich,
  IconAts,
  IconSettings,
  IconCheck,
  IconChevronDown,
  IconPrint,
  IconEdit,
  IconPlus,
  IconSparkles,
  IconFileText,
  IconSun,
  IconMoon,
  IconMonitor,
  IconChain,
  IconZap,
  IconTrash,
  IconDownload,
  IconCode,
  IconServer,
  IconLayout,
  IconBriefcase,
  IconCloud,
} from "./icons";

function ProfileBadgeIcon({ role, className = "h-3.5 w-3.5" }: { role?: string; className?: string }) {
  const r = (role || "").toLowerCase();
  if (
    r.includes("blockchain") ||
    r.includes("crypto") ||
    r.includes("web3") ||
    r.includes("solidity") ||
    r.includes("hyperledger")
  ) {
    return <IconChain className={className} />;
  }
  if (r.includes("full-stack") || r.includes("fullstack") || r.includes("full stack")) {
    return <IconZap className={className} />;
  }
  if (r.includes("frontend") || r.includes("ui") || r.includes("ux") || r.includes("web")) {
    return <IconLayout className={className} />;
  }
  if (r.includes("backend") || r.includes("api") || r.includes("database") || r.includes("server")) {
    return <IconServer className={className} />;
  }
  if (r.includes("devops") || r.includes("cloud") || r.includes("aws") || r.includes("sysadmin")) {
    return <IconCloud className={className} />;
  }
  if (
    r.includes("engineer") ||
    r.includes("developer") ||
    r.includes("software") ||
    r.includes("programmer") ||
    r.includes("tech")
  ) {
    return <IconCode className={className} />;
  }
  if (r.includes("lead") || r.includes("manager") || r.includes("architect") || r.includes("director")) {
    return <IconBriefcase className={className} />;
  }
  return <IconFileText className={className} />;
}

interface ToggleProps {
  activeView?: ViewType;
  activeTheme?: string;
  activeType?: ResumeType;
  activeColor?: string;
  useGradient?: boolean;
  themeMode?: ThemeMode;
  whiteCard?: boolean;
  isWizardOpen?: boolean;
  isDirty?: boolean;
  profiles?: ResumeProfile[];
  onToggleWizard?: () => void;
  onOpenWizard?: () => void;
  onResetPreset?: (presetId?: string) => void;
  onResetEmpty?: () => void;
  onCreateFreshProfile?: () => void;
  onDeleteCustomProfile?: (id: string) => void;
  onExportProfile?: (profileId: string) => void;
}

export default function Toggle({
  activeView = 'ux',
  activeTheme = 'ux-modern',
  activeType = RESUME_REGISTRY[0].id,
  activeColor = DEFAULT_ACCENT_COLOR,
  useGradient = false,
  themeMode = "system",
  whiteCard = true,
  isWizardOpen = false,
  isDirty = false,
  profiles,
  onToggleWizard,
  onOpenWizard,
  onResetPreset,
  onResetEmpty,
  onCreateFreshProfile,
  onDeleteCustomProfile,
  onExportProfile,
}: ToggleProps) {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [customInput, setCustomInput] = useState(activeColor);
  const [prevActiveColor, setPrevActiveColor] = useState(activeColor);

  if (prevActiveColor !== activeColor) {
    setPrevActiveColor(activeColor);
    setCustomInput(activeColor);
  }

  const effectiveDarkMode = useSystemDarkMode(themeMode);

  const profileRef = useRef<HTMLDivElement>(null);
  const controlBarRef = useRef<HTMLDivElement>(null);

  const profileList = profiles && profiles.length > 0 ? profiles : (RESUME_REGISTRY as unknown as ResumeProfile[]);
  const selectedProfile = profileList.find((p) => p.id === activeType) || profileList[0];

  useEffect(() => {
    applyThemeVars(activeColor);
  }, [activeColor]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (controlBarRef.current && !controlBarRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const encodedColor = encodeURIComponent(activeColor);
  const isStandardHex = /^#([0-9A-F]{3}){1,2}$/i.test(activeColor);
  const gradientEnd = getAccentGradientEnd(activeColor);
  const activeBgStyle = useGradient
    ? { backgroundImage: `linear-gradient(135deg, ${activeColor}, ${gradientEnd})` }
    : { backgroundColor: activeColor };

  const cardParam = whiteCard ? "white" : "dark";

  const handleSelectProfile = (typeId: string) => {
    setIsProfileOpen(false);
    if (isDirty && typeId !== activeType) {
      const confirmSwitch = window.confirm(
        "You have custom unsaved edits for the current profile. Switching profiles will load the preset for " +
        typeId +
        ". Would you like to proceed?"
      );
      if (!confirmSwitch) return;
      if (onResetPreset) {
        onResetPreset(typeId);
      }
    }
    router.replace(`/?view=${activeView}&theme=${activeTheme}&type=${typeId}&color=${encodedColor}&gradient=${useGradient}&mode=${themeMode}&card=${cardParam}`);
  };

  const handleSelectTheme = (themeId: string) => {
    router.replace(`/?view=${activeView}&theme=${themeId}&type=${activeType}&color=${encodedColor}&gradient=${useGradient}&mode=${themeMode}&card=${cardParam}`);
  };

  const handleApplyColor = (val: string) => {
    const colorStr = val.trim();
    if (!colorStr) return;
    applyThemeVars(colorStr);
    router.replace(`/?view=${activeView}&theme=${activeTheme}&type=${activeType}&color=${encodeURIComponent(colorStr)}&gradient=${useGradient}&mode=${themeMode}&card=${cardParam}`);
  };

  const handleInputChange = (val: string) => {
    setCustomInput(val);
    if (val.trim()) {
      const colorStr = val.trim();
      applyThemeVars(colorStr);
      router.replace(`/?view=${activeView}&theme=${activeTheme}&type=${activeType}&color=${encodeURIComponent(colorStr)}&gradient=${useGradient}&mode=${themeMode}&card=${cardParam}`);
    }
  };

  const handleToggleGradient = (next: boolean) => {
    router.replace(`/?view=${activeView}&theme=${activeTheme}&type=${activeType}&color=${encodedColor}&gradient=${next}&mode=${themeMode}&card=${cardParam}`);
  };

  const handleToggleWhiteCard = (next: boolean) => {
    router.replace(`/?view=${activeView}&theme=${activeTheme}&type=${activeType}&color=${encodedColor}&gradient=${useGradient}&mode=${themeMode}&card=${next ? "white" : "dark"}`);
  };

  const handleSetThemeMode = (nextMode: ThemeMode) => {
    router.replace(`/?view=${activeView}&theme=${activeTheme}&type=${activeType}&color=${encodedColor}&gradient=${useGradient}&mode=${nextMode}&card=${cardParam}`);
  };

  const dm = effectiveDarkMode;

  return (
    <>
      {/* TOP LEFT: Target Profile Card */}
      <div className="fixed top-4 left-4 z-50 print:hidden" ref={profileRef}>
        <div className={`rounded-2xl border shadow-lg backdrop-blur-md transition-all duration-300 overflow-hidden ${dm ? "border-zinc-800 bg-zinc-900/90 text-white" : "border-zinc-200/50 bg-white/90 text-zinc-900"}`}>

          {/* Top Row: trigger button */}
          <div className="flex items-center p-1.5">
            <button
              onClick={() => { setIsProfileOpen(!isProfileOpen); setIsExpanded(false); }}
              aria-expanded={isProfileOpen}
              aria-haspopup="listbox"
              className={`w-full flex items-center justify-between gap-3 rounded-xl py-1.5 px-3 text-xs font-bold transition-all duration-200 cursor-pointer ${isProfileOpen
                ? dm ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-900"
                : dm ? "text-zinc-300 hover:bg-zinc-800/80 hover:text-white" : "text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-900"
                }`}
            >
              <div className="flex flex-col text-left min-w-0 flex-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 select-none leading-none mb-1">
                  Target Profile
                </span>
                <div className="flex items-center gap-1.5 min-w-0">
                  <ProfileBadgeIcon role={selectedProfile.label} className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate min-w-0 text-xs font-bold tracking-tight">{selectedProfile.label}</span>
                </div>
              </div>
              <IconChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Expanded Panel: smoothly expands inside the same container card */}
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-in-out"
            style={{ gridTemplateRows: isProfileOpen ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className={`border-t px-3 pb-3 pt-2.5 w-72 sm:w-80 max-w-[calc(100vw-2rem)] transition-opacity duration-300 ${isProfileOpen ? "opacity-100" : "opacity-0"} ${dm ? "border-zinc-800" : "border-zinc-100"}`}>
                <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 select-none">Target Profile</div>
                <div className="flex flex-col gap-1">
                  {profileList.map((option) => {
                    const isSelected = option.id === activeType;
                    return (
                      <div
                        key={option.id}
                        className={`flex items-center justify-between rounded-xl px-2.5 py-1.5 transition-all duration-150 gap-2 ${isSelected
                          ? dm
                            ? "bg-zinc-800/90 text-white font-bold"
                            : "bg-zinc-100 text-zinc-900 font-bold"
                          : dm
                            ? "text-zinc-300 hover:bg-zinc-800/60"
                            : "text-zinc-700 hover:bg-zinc-100/80"
                          }`}
                      >
                        <button
                          onClick={() => handleSelectProfile(option.id)}
                          role="option"
                          aria-selected={isSelected}
                          className="flex items-center gap-2 text-xs font-semibold flex-1 min-w-0 text-left cursor-pointer py-1"
                        >
                          <ProfileBadgeIcon role={option.label} className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate min-w-0">{option.label}</span>
                          {isSelected && <IconCheck className="h-3.5 w-3.5 fill-current text-zinc-900 dark:text-white shrink-0 ml-0.5" />}
                        </button>

                        <div className="flex items-center gap-1 shrink-0">
                          {onOpenWizard && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectProfile(option.id);
                                if (onOpenWizard) onOpenWizard();
                              }}
                              aria-label={`Edit ${option.label}`}
                              title={`Edit ${option.label}`}
                              className="flex items-center justify-center rounded-lg bg-zinc-200/70 dark:bg-zinc-700/70 h-6 w-6 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors cursor-pointer shrink-0"
                            >
                              <IconEdit className="h-3.5 w-3.5" />
                            </button>
                          )}

                          {onExportProfile && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onExportProfile(option.id);
                              }}
                              aria-label={`Export ${option.label} JSON`}
                              title={`Export ${option.label} JSON`}
                              className="flex items-center justify-center rounded-lg bg-zinc-200/70 dark:bg-zinc-700/70 h-6 w-6 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors cursor-pointer shrink-0"
                            >
                              <IconDownload className="h-3.5 w-3.5" />
                            </button>
                          )}

                          {option.isCustom && onDeleteCustomProfile && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteCustomProfile(option.id);
                              }}
                              aria-label={`Delete ${option.label}`}
                              title={`Delete ${option.label}`}
                              className="flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 h-6 w-6 text-red-500 transition-colors cursor-pointer shrink-0"
                            >
                              <IconTrash className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* New Resume Button */}
                {onResetEmpty && (
                  <div className="mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        if (onCreateFreshProfile) {
                          onCreateFreshProfile();
                        } else if (onResetEmpty) {
                          onResetEmpty();
                          if (onOpenWizard) onOpenWizard();
                        }
                      }}
                      className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 text-xs font-bold shadow-xs transition-all cursor-pointer"
                    >
                      <IconPlus className="h-3.5 w-3.5" /> New Resume
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOP RIGHT: Expandable Control Card */}
      <div className="fixed top-4 right-4 z-50 print:hidden" ref={controlBarRef}>
        <div className={`rounded-2xl border shadow-lg backdrop-blur-md transition-all duration-300 overflow-hidden ${dm ? "border-zinc-800 bg-zinc-900/90 text-white" : "border-zinc-200/50 bg-white/90 text-zinc-900"}`}>

          {/* ── Top Row: always visible ── */}
          <div className="flex items-center gap-2 p-1.5">

            {/* View Switcher Pill */}
            <div className={`relative flex rounded-full p-0.5 ${dm ? "bg-zinc-800/80" : "bg-zinc-100/80"}`}>
              <div
                className={`absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full shadow-md transition-all duration-300 ease-out ${activeView === "ats" ? "translate-x-full" : "translate-x-0"}`}
                style={activeBgStyle}
              />
              <Link
                href={`/?view=ux&theme=ux-modern&type=${activeType}&color=${encodedColor}&gradient=${useGradient}&mode=${themeMode}&card=${cardParam}`}
                replace
                className={`relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold tracking-wide transition-colors duration-200 ${activeView === "ux" ? "text-white" : dm ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-900"}`}
              >
                <IconUxRich className="h-3.5 w-3.5 fill-current" />
                UX-Rich
              </Link>
              <Link
                href={`/?view=ats&theme=ats-standard&type=${activeType}&color=${encodedColor}&gradient=${useGradient}&mode=${themeMode}&card=${cardParam}`}
                replace
                className={`relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold tracking-wide transition-colors duration-200 ${activeView === "ats" ? "text-white" : dm ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-900"}`}
              >
                <IconAts className="h-3.5 w-3.5 fill-current" />
                ATS Scan
              </Link>
            </div>

            {/* Print Button */}
            <button
              onClick={() => window.print()}
              style={activeBgStyle}
              className="flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-bold text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Print Resume"
            >
              <IconPrint className="h-3.5 w-3.5 fill-current" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Expand / Collapse Settings Button */}
            <button
              onClick={() => { setIsExpanded(!isExpanded); setIsProfileOpen(false); }}
              aria-expanded={isExpanded}
              title={isExpanded ? "Collapse settings" : "Open settings"}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer will-change-transform ${isExpanded
                ? dm ? "bg-zinc-700 text-white" : "bg-zinc-200 text-zinc-900"
                : dm ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
            >
              <IconSettings className={`h-4 w-4 fill-current transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
            </button>
          </div>

          {/* ── Expanded Settings Panel (grid height animation) ── */}
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-in-out"
            style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className={`border-t px-4 pb-4 pt-3 transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0"} ${dm ? "border-zinc-800" : "border-zinc-100"}`}>

                {/* Appearance Mode Segment */}
                <div
                  className="mb-3 transition-all duration-300"
                  style={{ transitionDelay: isExpanded ? "190ms" : "0ms", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateY(0)" : "translateY(-4px)" }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2 select-none">Appearance</div>
                  <div className={`grid grid-cols-3 gap-1 rounded-xl p-1 ${dm ? "bg-zinc-800/90" : "bg-zinc-100/90"}`}>
                    {APPEARANCE_MODES.map((modeItem) => {
                      const mode = modeItem.id;
                      const isActive = themeMode === mode;
                      return (
                        <button
                          key={mode}
                          onClick={() => handleSetThemeMode(mode)}
                          className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-bold transition-all cursor-pointer ${isActive
                            ? mode === "dark"
                              ? "bg-zinc-900 text-white shadow-xs"
                              : dm
                                ? "bg-zinc-700 text-white shadow-xs"
                                : "bg-white text-zinc-900 shadow-xs"
                            : dm
                              ? "text-zinc-400 hover:text-white"
                              : "text-zinc-600 hover:text-zinc-900"
                            }`}
                        >
                          {mode === "light" && <IconSun className="h-3.5 w-3.5" />}
                          {mode === "dark" && <IconMoon className="h-3.5 w-3.5" />}
                          {mode === "system" && <IconMonitor className="h-3.5 w-3.5" />}
                          <span className="capitalize">{modeItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Gradient Mode Toggle */}
                <div
                  className={`flex items-center justify-between mb-3 pb-3 border-b transition-all duration-300 ${dm ? "border-zinc-800" : "border-zinc-100"}`}
                  style={{ transitionDelay: isExpanded ? "160ms" : "0ms", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateY(0)" : "translateY(-4px)" }}
                >
                  <span className="text-xs font-bold flex items-center gap-1.5"><IconSparkles className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> Gradient Mode</span>
                  <button
                    onClick={() => handleToggleGradient(!useGradient)}
                    role="switch"
                    aria-checked={useGradient}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${useGradient ? "bg-zinc-700" : "bg-zinc-300"}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ${useGradient ? "translate-x-4" : "translate-x-0"}`} />
                  </button>
                </div>

                {/* Page Paper Color Toggle (Light vs Dark Paper Sheet) */}
                <div
                  className={`flex items-center justify-between mb-3 pb-3 border-b transition-all duration-300 ${dm ? "border-zinc-800" : "border-zinc-100"}`}
                  style={{ transitionDelay: isExpanded ? "175ms" : "0ms", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateY(0)" : "translateY(-4px)" }}
                >
                  <span className="text-xs font-bold flex items-center gap-1.5"><IconFileText className="h-3.5 w-3.5 text-zinc-500" /> Page Paper Color</span>
                  <div className={`flex items-center gap-1 rounded-lg p-0.5 ${dm ? "bg-zinc-800" : "bg-zinc-200"}`}>
                    <button
                      onClick={() => handleToggleWhiteCard(true)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${whiteCard ? (dm ? "bg-zinc-700 text-white shadow-xs" : "bg-white text-zinc-900 shadow-xs") : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => handleToggleWhiteCard(false)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${!whiteCard ? (dm ? "bg-zinc-700 text-white shadow-xs" : "bg-zinc-900 text-white shadow-xs") : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
                    >
                      Dark
                    </button>
                  </div>
                </div>

                {/* Layout Theme Thumbnail Picker */}
                {activeView === "ats" ? (
                  <div
                    className="mb-3.5 transition-all duration-300"
                    style={{ transitionDelay: isExpanded ? "30ms" : "0ms", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateY(0)" : "translateY(-4px)" }}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2 select-none">
                      <span>ATS Theme Layouts ({ATS_THEMES.length} Templates)</span>
                      <span className="text-zinc-500 font-normal">Click Thumbnail</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-1.5 custom-scrollbar">
                      {ATS_THEMES.map((t) => {
                        const isSelected = activeTheme === t.id;
                        return (
                          <button
                            key={t.id}
                            onClick={() => handleSelectTheme(t.id)}
                            title={`${t.label}: ${t.description}`}
                            className="group flex flex-col items-center gap-1 cursor-pointer transition-transform active:scale-95"
                          >
                            <ThemeThumbnail
                              themeId={t.id}
                              isSelected={isSelected}
                              accentColor={activeColor}
                              useGradient={useGradient}
                              whiteCard={whiteCard}
                              dm={dm}
                            />
                            <span className={`text-[9px] font-bold tracking-tight truncate w-full text-center ${isSelected ? "text-zinc-900 dark:text-white" : "text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"}`}>
                              {t.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div
                    className="mb-3.5 flex items-center justify-between transition-all duration-300"
                    style={{ transitionDelay: isExpanded ? "30ms" : "0ms", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateY(0)" : "translateY(-4px)" }}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 select-none">UX Theme Layout</span>
                    <span className="text-xs font-semibold text-zinc-500">Modern Sidebar</span>
                  </div>
                )}

                {/* Accent Color Header */}
                <div
                  className="mb-2.5 flex items-center justify-between transition-all duration-300"
                  style={{ transitionDelay: isExpanded ? "60ms" : "0ms", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateY(0)" : "translateY(-6px)" }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 select-none">Accent Colors ({PRESET_COLORS.length} Swatches)</span>
                  <span className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-xs" style={activeBgStyle} />
                </div>

                {/* Categorized Color Swatches */}
                <div
                  className="space-y-2 mb-3 transition-all duration-300"
                  style={{ transitionDelay: isExpanded ? "100ms" : "0ms", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateY(0)" : "translateY(-4px)" }}
                >
                  {COLOR_PRESET_GROUPS.map((group: PresetColorGroup) => (
                    <div key={group.name} className="flex items-center justify-between gap-2 px-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 select-none min-w-[70px]">
                        {group.name}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        {group.colors.map((preset: PresetColor) => {
                          const isSelected = preset.hex.toLowerCase() === activeColor.toLowerCase();
                          const swatchStyle = useGradient
                            ? { backgroundImage: `linear-gradient(135deg, ${preset.hex}, ${getAccentGradientEnd(preset.hex)})` }
                            : { backgroundColor: preset.hex };
                          return (
                            <button
                              key={preset.hex}
                              onClick={() => handleApplyColor(preset.hex)}
                              title={`${preset.label} (${group.name})`}
                              className="relative h-6 w-6 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer shadow-xs"
                              style={swatchStyle}
                            >
                              {isSelected && <IconCheck className="h-3 w-3 fill-current text-white" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Color Input */}
                <div
                  className="mb-3 transition-all duration-300"
                  style={{ transitionDelay: isExpanded ? "130ms" : "0ms", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateY(0)" : "translateY(-4px)" }}
                >
                  <div className={`flex items-center rounded-xl border p-1.5 transition-all focus-within:ring-2 focus-within:ring-zinc-500/20 ${dm ? "border-zinc-800 bg-zinc-800/80 focus-within:border-zinc-600" : "border-zinc-200/80 bg-zinc-50/80 focus-within:border-zinc-400"}`}>
                    <div className="relative flex items-center flex-shrink-0">
                      <span className="h-6 w-6 rounded-lg border border-black/10 cursor-pointer" style={activeBgStyle} />
                      <input
                        type="color"
                        value={isStandardHex ? activeColor : "#252525"}
                        onChange={(e) => handleApplyColor(e.target.value)}
                        className="absolute inset-0 opacity-0 h-6 w-6 cursor-pointer"
                        title="System color picker"
                      />
                    </div>
                    <input
                      type="text"
                      value={customInput}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="#1e3a8a or rgba(...)"
                      className={`w-full bg-transparent pl-2.5 pr-1 text-xs font-mono font-semibold focus:outline-none ${dm ? "text-white placeholder:text-zinc-500" : "text-zinc-800 placeholder:text-zinc-400"}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
