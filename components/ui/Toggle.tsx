"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ThemeMode, ResumeType, ViewType } from "@/types";
import { getAccentGradientEnd, applyThemeVars, PRESET_COLORS } from "@/lib";
import { RESUME_REGISTRY } from "@/data/resumes";
import { useSystemDarkMode } from "@/hooks/useSystemDarkMode";
import {
  IconUxRich,
  IconAts,
  IconSettings,
  IconCheck,
  IconChevronDown,
  IconPrint,
} from "./icons";

interface ToggleProps {
  activeView: ViewType;
  activeType?: ResumeType;
  activeColor?: string;
  useGradient?: boolean;
  themeMode?: ThemeMode;
  whiteCard?: boolean;
}

export default function Toggle({
  activeView = 'ux',
  activeType = RESUME_REGISTRY[0].id,
  activeColor = "#252525",
  useGradient = false,
  themeMode = "system",
  whiteCard = true,
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

  const selectedProfile =
    RESUME_REGISTRY.find((p) => p.id === activeType) || RESUME_REGISTRY[0];

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
    router.replace(`/?view=${activeView}&type=${typeId}&color=${encodedColor}&gradient=${useGradient}&mode=${themeMode}&card=${cardParam}`);
  };

  const handleApplyColor = (val: string) => {
    const colorStr = val.trim();
    if (!colorStr) return;
    applyThemeVars(colorStr);
    router.replace(`/?view=${activeView}&type=${activeType}&color=${encodeURIComponent(colorStr)}&gradient=${useGradient}&mode=${themeMode}&card=${cardParam}`);
  };

  const handleInputChange = (val: string) => {
    setCustomInput(val);
    if (val.trim()) {
      const colorStr = val.trim();
      applyThemeVars(colorStr);
      router.replace(`/?view=${activeView}&type=${activeType}&color=${encodeURIComponent(colorStr)}&gradient=${useGradient}&mode=${themeMode}&card=${cardParam}`);
    }
  };

  const handleToggleGradient = (next: boolean) => {
    router.replace(`/?view=${activeView}&type=${activeType}&color=${encodedColor}&gradient=${next}&mode=${themeMode}&card=${cardParam}`);
  };

  const handleToggleWhiteCard = (next: boolean) => {
    router.replace(`/?view=${activeView}&type=${activeType}&color=${encodedColor}&gradient=${useGradient}&mode=${themeMode}&card=${next ? "white" : "dark"}`);
  };

  const handleSetThemeMode = (nextMode: ThemeMode) => {
    router.replace(`/?view=${activeView}&type=${activeType}&color=${encodedColor}&gradient=${useGradient}&mode=${nextMode}&card=${cardParam}`);
  };

  const isPresetColor = PRESET_COLORS.some((p) => p.hex.toLowerCase() === activeColor.toLowerCase());
  const displayedColors = isPresetColor
    ? PRESET_COLORS
    : [...PRESET_COLORS.slice(0, 11), { hex: activeColor, label: "Custom" }];

  const dm = effectiveDarkMode;

  return (
    <>
      {/* TOP LEFT: Profile Selector */}
      <div className="fixed top-4 left-4 z-50 print:hidden" ref={profileRef}>
        <div className="relative">
          <button
            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsExpanded(false); }}
            aria-expanded={isProfileOpen}
            aria-haspopup="listbox"
            className={`relative flex items-center gap-2 rounded-full border py-2 pl-4 pr-5 shadow-lg backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer ${dm ? "border-zinc-800 bg-zinc-900/90 text-white hover:bg-zinc-800" : "border-zinc-200/60 bg-white/85 text-zinc-900 hover:bg-white hover:shadow-xl"
              }`}
          >
            <span className="text-sm select-none">{selectedProfile.icon}</span>
            <span className="text-xs font-bold tracking-tight">{selectedProfile.label}</span>
            <IconChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${dm ? "fill-zinc-400" : "fill-zinc-500"} ${isProfileOpen ? "rotate-180" : ""}`} />
          </button>

          {isProfileOpen && (
            <div role="listbox" className={`absolute top-full left-0 mt-2 w-56 rounded-2xl border p-1.5 shadow-xl backdrop-blur-md z-50 ${dm ? "border-zinc-800 bg-zinc-900/95 text-white" : "border-zinc-200/60 bg-white/95 text-zinc-900"}`}>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 select-none">Target Profile</div>
              <div className="flex flex-col gap-1">
                {RESUME_REGISTRY.map((option) => {
                  const isSelected = option.id === activeType;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectProfile(option.id)}
                      role="option"
                      aria-selected={isSelected}
                      style={isSelected ? activeBgStyle : undefined}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-150 cursor-pointer ${isSelected ? "text-white shadow-sm" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100/90"}`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-xs">{option.icon}</span>
                        {option.label}
                      </span>
                      {isSelected && <IconCheck className="h-3.5 w-3.5 fill-current text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
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
                href={`/?view=ux&type=${activeType}&color=${encodedColor}&gradient=${useGradient}&mode=${themeMode}&card=${cardParam}`}
                replace
                className={`relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold tracking-wide transition-colors duration-200 ${activeView === "ux" ? "text-white" : dm ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-900"}`}
              >
                <IconUxRich className="h-3.5 w-3.5 fill-current" />
                UX-Rich
              </Link>
              <Link
                href={`/?view=ats&type=${activeType}&color=${encodedColor}&gradient=${useGradient}&mode=${themeMode}&card=${cardParam}`}
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

                {/* Accent Color Header */}
                <div
                  className="mb-2.5 flex items-center justify-between transition-all duration-300"
                  style={{ transitionDelay: isExpanded ? "60ms" : "0ms", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateY(0)" : "translateY(-6px)" }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 select-none">Accent Color</span>
                  <span className="h-3 w-3 rounded-full border border-black/10" style={activeBgStyle} />
                </div>

                {/* Color Swatches Grid */}
                <div
                  className="grid grid-cols-6 gap-2 mb-3 px-0.5 transition-all duration-300"
                  style={{ transitionDelay: isExpanded ? "100ms" : "0ms", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateY(0)" : "translateY(-4px)" }}
                >
                  {displayedColors.map((preset) => {
                    const isSelected = preset.hex.toLowerCase() === activeColor.toLowerCase();
                    const swatchStyle = useGradient
                      ? { backgroundImage: `linear-gradient(135deg, ${preset.hex}, ${getAccentGradientEnd(preset.hex)})` }
                      : { backgroundColor: preset.hex };
                    return (
                      <button
                        key={preset.hex}
                        onClick={() => handleApplyColor(preset.hex)}
                        title={preset.label}
                        className="relative h-7 w-7 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer shadow-xs"
                        style={swatchStyle}
                      >
                        {isSelected && <IconCheck className="h-3.5 w-3.5 fill-current text-white" />}
                      </button>
                    );
                  })}
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

                {/* Gradient Mode Toggle */}
                <div
                  className={`flex items-center justify-between mb-3 pb-3 border-b transition-all duration-300 ${dm ? "border-zinc-800" : "border-zinc-100"}`}
                  style={{ transitionDelay: isExpanded ? "160ms" : "0ms", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateY(0)" : "translateY(-4px)" }}
                >
                  <span className="text-xs font-bold flex items-center gap-1.5"><span>✨</span> Gradient Mode</span>
                  <button
                    onClick={() => handleToggleGradient(!useGradient)}
                    role="switch"
                    aria-checked={useGradient}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${useGradient ? "bg-zinc-700" : "bg-zinc-300"}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ${useGradient ? "translate-x-4" : "translate-x-0"}`} />
                  </button>
                </div>

                {/* White Sheet Toggle (Dark Background + White A4 Page) */}
                <div
                  className={`flex items-center justify-between mb-3 pb-3 border-b transition-all duration-300 ${dm ? "border-zinc-800" : "border-zinc-100"}`}
                  style={{ transitionDelay: isExpanded ? "175ms" : "0ms", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateY(0)" : "translateY(-4px)" }}
                >
                  <span className="text-xs font-bold flex items-center gap-1.5"><span>📄</span> White Sheet Page</span>
                  <button
                    onClick={() => handleToggleWhiteCard(!whiteCard)}
                    role="switch"
                    aria-checked={whiteCard}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${whiteCard ? "bg-zinc-700" : "bg-zinc-300"}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ${whiteCard ? "translate-x-4" : "translate-x-0"}`} />
                  </button>
                </div>

                {/* Appearance Mode Segment */}
                <div
                  className="mb-3 transition-all duration-300"
                  style={{ transitionDelay: isExpanded ? "190ms" : "0ms", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateY(0)" : "translateY(-4px)" }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2 select-none">Appearance</div>
                  <div className={`grid grid-cols-3 gap-1 rounded-xl p-1 ${dm ? "bg-zinc-800/90" : "bg-zinc-100/90"}`}>
                    {(["light", "dark", "system"] as const).map((mode) => {
                      const labels = { light: "☀️ Light", dark: "🌙 Dark", system: "💻 System" };
                      const isActive = themeMode === mode;
                      return (
                        <button
                          key={mode}
                          onClick={() => handleSetThemeMode(mode)}
                          className={`flex items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] font-bold transition-all cursor-pointer ${isActive
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
                          {labels[mode]}
                        </button>
                      );
                    })}
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
