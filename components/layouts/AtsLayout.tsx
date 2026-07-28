"use client";

import type { ResumeData, AtsThemeId } from "@/types";
import {
  AtsStandard,
  AtsMinimo,
  AtsInflux,
  AtsMinimal,
  AtsModern,
  AtsCompact,
  AtsAcademic,
  AtsIconic,
  AtsSimple,
  AtsTechnical,
  AtsExecutive,
  AtsCorporate,
} from "./ats";

interface AtsLayoutProps {
  data: ResumeData;
  themeId?: AtsThemeId | string;
}

export default function AtsLayout({ data, themeId = "ats-standard" }: AtsLayoutProps) {
  switch (themeId) {
    case "ats-minimo":
      return <AtsMinimo data={data} />;
    case "ats-influx":
      return <AtsInflux data={data} />;
    case "ats-minimal":
      return <AtsMinimal data={data} />;
    case "ats-modern":
      return <AtsModern data={data} />;
    case "ats-compact":
      return <AtsCompact data={data} />;
    case "ats-academic":
      return <AtsAcademic data={data} />;
    case "ats-iconic":
      return <AtsIconic data={data} />;
    case "ats-simple":
      return <AtsSimple data={data} />;
    case "ats-technical":
      return <AtsTechnical data={data} />;
    case "ats-executive":
      return <AtsExecutive data={data} />;
    case "ats-corporate":
      return <AtsCorporate data={data} />;
    case "ats-standard":
    default:
      return <AtsStandard data={data} />;
  }
}
