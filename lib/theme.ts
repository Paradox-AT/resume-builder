// Derive candidate initials from full name (e.g. "Aayush Thakur" -> "at")
export function getInitials(name?: string): string {
  if (!name) return "";
  const words = name.trim().split(/\s+/);
  if (words.length === 0 || !words[0]) return "";
  if (words.length === 1) return words[0].slice(0, 2).toLowerCase();
  return (words[0][0] + words[words.length - 1][0]).toLowerCase();
}

// Compute soft sidebar background tint matching accent color (Hex, RGB, or RGBA)
export function getSidebarBg(colorStr: string): string {
  if (!colorStr) return "#f4f4f5";
  const str = colorStr.trim();

  // Handle rgba(...) or rgb(...)
  const rgbaMatch = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1], 10);
    const g = parseInt(rgbaMatch[2], 10);
    const b = parseInt(rgbaMatch[3], 10);
    const tintR = Math.round(255 * 0.93 + r * 0.07);
    const tintG = Math.round(255 * 0.93 + g * 0.07);
    const tintB = Math.round(255 * 0.93 + b * 0.07);
    return `rgb(${tintR}, ${tintG}, ${tintB})`;
  }

  // Handle Hex (#1e3a8a or 1e3a8a)
  const hex = str.toLowerCase().replace("#", "");
  const presetTints: Record<string, string> = {
    "252525": "#f4f4f5",
    "1e3a8a": "#eff6ff",
    "064e3b": "#ecfdf5",
    "881337": "#fff1f2",
    "0f766e": "#f0fdfa",
    "3730a3": "#eef2ff",
    "0284c7": "#f0f9ff",
    "14532d": "#f0fdf4",
    "581c87": "#faf5ff",
    "b45309": "#fffbeb",
    "991b1b": "#fef2f2",
    "334155": "#f8fafc",
  };

  if (presetTints[hex]) {
    return presetTints[hex];
  }

  try {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return "#f4f4f5";
    const tintR = Math.round(255 * 0.93 + r * 0.07);
    const tintG = Math.round(255 * 0.93 + g * 0.07);
    const tintB = Math.round(255 * 0.93 + b * 0.07);
    return `#${tintR.toString(16).padStart(2, "0")}${tintG.toString(16).padStart(2, "0")}${tintB.toString(16).padStart(2, "0")}`;
  } catch {
    return "#f4f4f5";
  }
}

// Compute secondary lighter end color for linear gradients
export function getAccentGradientEnd(colorStr: string): string {
  if (!colorStr) return "#4f4f4f";
  const str = colorStr.trim();

  // Preset mappings for ultra-clean gradients
  const hex = str.toLowerCase().replace("#", "");
  const presetGradients: Record<string, string> = {
    "252525": "#4a4a4a", // Charcoal
    "1e3a8a": "#3b82f6", // Navy Blue
    "064e3b": "#059669", // Emerald
    "881337": "#e11d48", // Burgundy
    "0f766e": "#14b8a6", // Tech Teal
    "3730a3": "#6366f1", // Indigo
    "0284c7": "#38bdf8", // Sapphire
    "14532d": "#22c55e", // Forest
    "581c87": "#a855f7", // Amethyst
    "b45309": "#f59e0b", // Amber
    "991b1b": "#ef4444", // Crimson
    "334155": "#64748b", // Slate
  };

  if (presetGradients[hex]) {
    return presetGradients[hex];
  }

  // Fallback formula for custom hex/rgb: lighten channel values by 35%
  try {
    const rgbaMatch = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    let r = 37, g = 37, b = 37;
    if (rgbaMatch) {
      r = parseInt(rgbaMatch[1], 10);
      g = parseInt(rgbaMatch[2], 10);
      b = parseInt(rgbaMatch[3], 10);
    } else {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
    if (isNaN(r) || isNaN(g) || isNaN(b)) return "#4f4f4f";
    const lightR = Math.min(255, Math.round(r + (255 - r) * 0.35));
    const lightG = Math.min(255, Math.round(g + (255 - g) * 0.35));
    const lightB = Math.min(255, Math.round(b + (255 - b) * 0.35));
    return `rgb(${lightR}, ${lightG}, ${lightB})`;
  } catch {
    return "#4f4f4f";
  }
}

// Apply accent color CSS custom properties to the document root
export function applyThemeVars(color: string): void {
  if (typeof document === "undefined") return;
  const endColor = getAccentGradientEnd(color);
  document.documentElement.style.setProperty("--accent-color", color);
  document.documentElement.style.setProperty("--accent-gradient-end", endColor);
  document.documentElement.style.setProperty("--accent-gradient", `linear-gradient(135deg, ${color}, ${endColor})`);
  document.documentElement.style.setProperty("--sidebar-bg", getSidebarBg(color));
}
