export const DEFAULT_ACCENT_COLOR = "#0f172a";

export interface PresetColor {
  hex: string;
  label: string;
}

export interface PresetColorGroup {
  name: string;
  colors: PresetColor[];
}

export interface AppearanceModeDefinition {
  id: "light" | "dark" | "system";
  label: string;
  icon: string;
}

export const APPEARANCE_MODES: AppearanceModeDefinition[] = [
  { id: "light", label: "Light", icon: "Sun" },
  { id: "dark", label: "Dark", icon: "Moon" },
  { id: "system", label: "System", icon: "Monitor" },
];

/** Helper to compute relative luminance of hex color (0 = darkest, 255 = lightest) */
export function getHexLuminance(hex: string): number {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

const RAW_COLOR_GROUPS: PresetColorGroup[] = [
  {
    name: "Classic",
    colors: [
      { hex: "#334155", label: "Slate" },
      { hex: "#1e3a8a", label: "Navy Blue" },
      { hex: "#3f2e21", label: "Espresso" },
      { hex: "#252525", label: "Charcoal" },
      { hex: "#0f172a", label: "Midnight" },
    ],
  },
  {
    name: "Professional",
    colors: [
      { hex: "#0f766e", label: "Tech Teal" },
      { hex: "#78350f", label: "Bronze" },
      { hex: "#1e40af", label: "Steel Blue" },
      { hex: "#14532d", label: "Forest" },
      { hex: "#881337", label: "Burgundy" },
    ],
  },
  {
    name: "Modern",
    colors: [
      { hex: "#0891b2", label: "Cyan" },
      { hex: "#0284c7", label: "Sapphire" },
      { hex: "#475569", label: "Graphite" },
      { hex: "#6d28d9", label: "Violet" },
      { hex: "#3730a3", label: "Indigo" },
    ],
  },
  {
    name: "Creative",
    colors: [
      { hex: "#c2410c", label: "Coral" },
      { hex: "#9f1239", label: "Rose Gold" },
      { hex: "#701a75", label: "Plum" },
      { hex: "#581c87", label: "Amethyst" },
      { hex: "#064e3b", label: "Emerald" },
    ],
  },
  {
    name: "Bold",
    colors: [
      { hex: "#ea580c", label: "Burnt Orange" },
      { hex: "#b45309", label: "Amber" },
      { hex: "#2563eb", label: "Electric Blue" },
      { hex: "#be123c", label: "Ruby" },
      { hex: "#991b1b", label: "Crimson" },
    ],
  },
];

/** Presets sorted strictly from Lightest to Darkest in each group */
export const COLOR_PRESET_GROUPS: PresetColorGroup[] = RAW_COLOR_GROUPS.map((group) => ({
  ...group,
  colors: [...group.colors].sort((a, b) => getHexLuminance(b.hex) - getHexLuminance(a.hex)),
}));

export const PRESET_COLORS: PresetColor[] = COLOR_PRESET_GROUPS.flatMap((group) => group.colors);
