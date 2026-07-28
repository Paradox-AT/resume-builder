"use client";

import type { ResumeData } from "@/types";
import { UxModern } from "./ux";

interface UxRichLayoutProps {
  data: ResumeData;
  themeId?: string;
}

export default function UxRichLayout({ data }: UxRichLayoutProps) {
  return <UxModern data={data} />;
}
