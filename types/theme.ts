export type UxThemeId = "ux-modern";

export type AtsThemeId =
  | "ats-standard"
  | "ats-minimo"
  | "ats-influx"
  | "ats-minimal"
  | "ats-modern"
  | "ats-compact"
  | "ats-academic"
  | "ats-iconic"
  | "ats-simple"
  | "ats-technical"
  | "ats-executive"
  | "ats-corporate";

export type ThemeId = UxThemeId | AtsThemeId;

export interface ResumeThemeDefinition {
  id: ThemeId;
  category: "ux" | "ats";
  label: string;
  description: string;
  icon: string;
}

export const UX_THEMES: ResumeThemeDefinition[] = [
  {
    id: "ux-modern",
    category: "ux",
    label: "Modern Sidebar",
    description: "Classic split two-column layout with left accent sidebar and timeline connectors.",
    icon: "Sidebar",
  },
];

export const ATS_THEMES: ResumeThemeDefinition[] = [
  {
    id: "ats-standard",
    category: "ats",
    label: "Standard Centered",
    description: "Traditional ATS layout with centered text header and plain horizontal rules.",
    icon: "AlignHorizontalCenter",
  },
  {
    id: "ats-minimo",
    category: "ats",
    label: "Clean Whitespace",
    description: "Ultra-clean whitespace ATS layout with subtle divider rules and refined typography.",
    icon: "FileText",
  },
  {
    id: "ats-influx",
    category: "ats",
    label: "Header Banner",
    description: "Full-width text header bar with clear section divider titles and bullet lists.",
    icon: "Minus",
  },
  {
    id: "ats-minimal",
    category: "ats",
    label: "Minimal Vertical Line",
    description: "Left-aligned typography layout with a subtle vertical accent line along the edge.",
    icon: "AlignLeft",
  },
  {
    id: "ats-modern",
    category: "ats",
    label: "Modern Section Divider",
    description: "ATS-optimized format with a subtle header accent bar and structured section tags.",
    icon: "CheckSquare",
  },
  {
    id: "ats-compact",
    category: "ats",
    label: "Compact ATS Grid",
    description: "Dual-column ATS layout optimized for fitting 2+ pages into 1 page cleanly.",
    icon: "Grid",
  },
  {
    id: "ats-academic",
    category: "ats",
    label: "Academic Serif",
    description: "Classical academic layout with formal serif typography and publication spacing.",
    icon: "BookOpen",
  },
  {
    id: "ats-iconic",
    category: "ats",
    label: "Typography Badge",
    description: "Text-only ATS layout with clean typography section labels and bullet spacing.",
    icon: "Tag",
  },
  {
    id: "ats-simple",
    category: "ats",
    label: "Pure Single-Column",
    description: "Minimalist single-column text format with bold section titles and zero clutter.",
    icon: "List",
  },
  {
    id: "ats-technical",
    category: "ats",
    label: "Technical Skill Matrix",
    description: "High-density ATS layout with explicit skill matrix grids and experience timelines.",
    icon: "Cpu",
  },
  {
    id: "ats-executive",
    category: "ats",
    label: "Executive Classic",
    description: "Formal executive layout with double top accent rules and small caps section headers.",
    icon: "Award",
  },
  {
    id: "ats-corporate",
    category: "ats",
    label: "Corporate Grid",
    description: "Full-width top border bar with structured right-aligned contact details and shaded section headers.",
    icon: "Briefcase",
  },
];

export const ALL_THEMES: ResumeThemeDefinition[] = [...UX_THEMES, ...ATS_THEMES];

export function getThemeDefinition(id?: string): ResumeThemeDefinition {
  return ALL_THEMES.find((t) => t.id === id) || UX_THEMES[0];
}
