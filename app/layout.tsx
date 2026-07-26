import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "@/styles/globals.css";
import { getResumeData } from "@/data/resumes";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
});

const defaultResume = getResumeData();

export const metadata: Metadata = {
  title: `${defaultResume.personalInfo.name} – ${defaultResume.personalInfo.role}`,
  description: defaultResume.summary,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
