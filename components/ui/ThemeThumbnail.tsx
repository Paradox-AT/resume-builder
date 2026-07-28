"use client";

import type { AtsThemeId } from "@/types";
import { getAccentGradientEnd } from "@/lib";

interface ThemeThumbnailProps {
  themeId: AtsThemeId | string;
  isSelected?: boolean;
  accentColor?: string;
  useGradient?: boolean;
  whiteCard?: boolean;
  dm?: boolean;
  className?: string;
}

export default function ThemeThumbnail({
  themeId,
  isSelected = false,
  accentColor = "#0f172a",
  useGradient = false,
  whiteCard = true,
  dm = false,
  className = "",
}: ThemeThumbnailProps) {
  const gradientEnd = getAccentGradientEnd(accentColor);
  const accentStyle = useGradient
    ? { backgroundImage: `linear-gradient(135deg, ${accentColor}, ${gradientEnd})` }
    : { backgroundColor: accentColor };

  const borderStyle = isSelected
    ? { borderColor: accentColor, borderWidth: "2px" }
    : { borderWidth: "1px" };

  const activeClass = isSelected
    ? "shadow-sm"
    : "opacity-85 hover:opacity-100";

  // Paper sheet background based on White Sheet Page & Dark Mode settings
  const isDarkPaper = !whiteCard && dm;

  const paperClass = whiteCard
    ? "bg-white border-zinc-200"
    : dm
    ? "bg-zinc-900 border-zinc-700"
    : "bg-zinc-100 border-zinc-300";

  const subtitleClass = isDarkPaper ? "bg-zinc-500" : "bg-zinc-400";
  const lineClass = isDarkPaper ? "bg-zinc-700" : whiteCard ? "bg-zinc-200" : "bg-zinc-300";
  const dividerClass = isDarkPaper ? "bg-zinc-700" : whiteCard ? "bg-zinc-200" : "bg-zinc-300";

  return (
    <div
      className={`relative w-full aspect-[4/5] rounded-xl border p-2 flex flex-col justify-start transition-all duration-200 overflow-hidden select-none shadow-xs ${paperClass} ${activeClass} ${className}`}
      style={borderStyle}
    >
      {isSelected && (
        <div
          className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full flex items-center justify-center text-[8px] font-black text-white shadow-xs z-10"
          style={accentStyle}
        >
          ✓
        </div>
      )}

      {/* Visual Mini Layout Renderers */}
      {themeId === "ats-standard" && (
        <div className="w-full h-full flex flex-col gap-1.5 items-center">
          <div className="w-12 h-1.5 rounded-full mt-1" style={accentStyle} />
          <div className={`w-8 h-1 rounded-full ${subtitleClass}`} />
          <div className={`w-full h-[1px] ${dividerClass} my-0.5`} />
          <div className="w-full space-y-1">
            <div className="w-10 h-1 rounded" style={{ backgroundColor: accentColor }} />
            <div className={`w-full h-1 rounded ${lineClass}`} />
            <div className={`w-full h-1 rounded ${lineClass}`} />
          </div>
          <div className="w-full space-y-1 mt-1">
            <div className="w-12 h-1 rounded" style={{ backgroundColor: accentColor }} />
            <div className={`w-3/4 h-1 rounded ${lineClass}`} />
          </div>
        </div>
      )}

      {themeId === "ats-minimo" && (
        <div className="w-full h-full flex flex-col gap-1.5 items-start px-0.5">
          <div className="w-10 h-1.5 rounded mt-1" style={accentStyle} />
          <div className={`w-14 h-1 rounded ${subtitleClass}`} />
          <div className={`w-full h-[1px] ${dividerClass} my-0.5`} />
          <div className="w-full space-y-1">
            <div className="w-10 h-1 rounded" style={{ backgroundColor: accentColor }} />
            <div className={`w-3/4 h-1 rounded ${lineClass}`} />
            <div className={`w-full h-1 rounded ${lineClass}`} />
          </div>
        </div>
      )}

      {themeId === "ats-influx" && (
        <div className="w-full h-full flex flex-col gap-1.5">
          <div className="w-full h-4 rounded flex items-center justify-center shadow-xs" style={accentStyle}>
            <div className="w-8 h-1 rounded bg-white" />
          </div>
          <div className={`w-full h-1 rounded ${subtitleClass}`} />
          <div className="w-full space-y-1 mt-0.5">
            <div className={`w-full h-1 rounded ${lineClass}`} />
            <div className={`w-4/5 h-1 rounded ${lineClass}`} />
          </div>
        </div>
      )}

      {themeId === "ats-minimal" && (
        <div className="w-full h-full flex border-l-2 pl-1.5 flex-col gap-1.5" style={{ borderColor: accentColor }}>
          <div className="w-10 h-1.5 rounded mt-1" style={accentStyle} />
          <div className={`w-8 h-1 rounded ${subtitleClass}`} />
          <div className="w-full space-y-1 mt-1">
            <div className={`w-full h-1 rounded ${lineClass}`} />
            <div className={`w-3/4 h-1 rounded ${lineClass}`} />
          </div>
        </div>
      )}

      {themeId === "ats-modern" && (
        <div className="w-full h-full flex flex-col gap-1.5">
          <div className="flex justify-between items-center w-full mt-1">
            <div className="w-8 h-1.5 rounded" style={accentStyle} />
            <div className={`w-6 h-1 rounded ${subtitleClass}`} />
          </div>
          <div className="w-full h-[1.5px] my-0.5" style={{ backgroundColor: accentColor }} />
          <div className="w-full space-y-1">
            <div className={`w-full h-1 rounded ${lineClass}`} />
            <div className={`w-full h-1 rounded ${lineClass}`} />
          </div>
        </div>
      )}

      {themeId === "ats-compact" && (
        <div className="w-full h-full flex flex-col gap-1">
          <div className="w-12 h-1.5 rounded mt-0.5" style={accentStyle} />
          <div className="grid grid-cols-3 gap-1 w-full mt-1">
            <div className="col-span-2 space-y-1">
              <div className="w-full h-1 rounded" style={{ backgroundColor: accentColor }} />
              <div className={`w-full h-1 rounded ${lineClass}`} />
              <div className={`w-full h-1 rounded ${lineClass}`} />
            </div>
            <div className={`space-y-1 border-l ${dividerClass} pl-0.5`}>
              <div className="w-full h-1 rounded" style={{ backgroundColor: accentColor }} />
              <div className={`w-full h-1 rounded ${lineClass}`} />
            </div>
          </div>
        </div>
      )}

      {themeId === "ats-academic" && (
        <div className="w-full h-full flex flex-col items-center gap-1">
          <div className="w-10 h-1.5 rounded mt-1" style={accentStyle} />
          <div className="w-12 h-[1.5px]" style={{ backgroundColor: accentColor }} />
          <div className="w-full space-y-1 mt-1">
            <div className={`w-full h-1 rounded ${lineClass}`} />
            <div className={`w-full h-1 rounded ${lineClass}`} />
          </div>
        </div>
      )}

      {themeId === "ats-iconic" && (
        <div className="w-full h-full flex flex-col items-center gap-1">
          <div className="w-10 h-1.5 rounded mt-1" style={accentStyle} />
          <div className={`w-6 h-1 rounded-full ${subtitleClass}`} />
          <div className="w-full border-l-2 pl-1 space-y-1 mt-1" style={{ borderColor: accentColor }}>
            <div className={`w-full h-1 rounded ${lineClass}`} />
            <div className={`w-3/4 h-1 rounded ${lineClass}`} />
          </div>
        </div>
      )}

      {themeId === "ats-simple" && (
        <div className="w-full h-full flex flex-col gap-1.5">
          <div className="w-10 h-1.5 rounded mt-1" style={accentStyle} />
          <div className="w-full h-[1.5px]" style={{ backgroundColor: accentColor }} />
          <div className="w-full space-y-1">
            <div className={`w-full h-1 rounded ${lineClass}`} />
            <div className={`w-full h-1 rounded ${lineClass}`} />
          </div>
        </div>
      )}

      {themeId === "ats-technical" && (
        <div className="w-full h-full flex flex-col gap-1">
          <div className="flex justify-between items-center w-full mt-0.5">
            <div className="w-8 h-1.5 rounded" style={accentStyle} />
            <div className={`w-5 h-1 rounded ${subtitleClass}`} />
          </div>
          <div className="grid grid-cols-2 gap-0.5 w-full my-1">
            <div className="h-1 rounded" style={{ backgroundColor: accentColor }} />
            <div className="h-1 rounded" style={{ backgroundColor: accentColor }} />
            <div className="h-1 rounded" style={{ backgroundColor: accentColor }} />
            <div className="h-1 rounded" style={{ backgroundColor: accentColor }} />
          </div>
          <div className={`w-full h-1 rounded ${lineClass}`} />
        </div>
      )}

      {themeId === "ats-executive" && (
        <div className="w-full h-full flex flex-col items-center gap-1">
          <div className="w-full h-[2px]" style={{ backgroundColor: accentColor }} />
          <div className="w-12 h-1.5 rounded mt-0.5" style={accentStyle} />
          <div className={`w-8 h-1 rounded ${subtitleClass}`} />
          <div className={`w-full h-[1px] ${dividerClass} my-0.5`} />
          <div className="w-full space-y-1">
            <div className="w-10 h-1 rounded" style={{ backgroundColor: accentColor }} />
            <div className={`w-full h-1 rounded ${lineClass}`} />
          </div>
        </div>
      )}

      {themeId === "ats-corporate" && (
        <div className="w-full h-full flex flex-col gap-1">
          <div className="w-full h-[2.5px]" style={accentStyle} />
          <div className="flex justify-between items-center w-full mt-0.5">
            <div className="w-7 h-1.5 rounded" style={accentStyle} />
            <div className={`w-4 h-1 rounded ${subtitleClass}`} />
          </div>
          <div className="w-full h-1.5 rounded my-0.5 flex items-center px-0.5" style={accentStyle}>
            <div className="w-6 h-0.5 bg-white rounded opacity-90" />
          </div>
          <div className="w-full space-y-1">
            <div className={`w-full h-1 rounded ${lineClass}`} />
            <div className={`w-3/4 h-1 rounded ${lineClass}`} />
          </div>
        </div>
      )}
    </div>
  );
}
