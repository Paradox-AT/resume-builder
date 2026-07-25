"use client";

import Link from "next/link";

interface ToggleProps {
  activeView: "ux" | "ats";
}

export default function Toggle({ activeView }: ToggleProps) {
  return (
    <div className="fixed top-4 right-4 z-50 print:hidden">
      <div className="flex items-center gap-3 rounded-full border border-zinc-200/50 bg-white/70 p-1.5 shadow-lg backdrop-blur-md">
        {/* Toggle pill switcher */}
        <div className="relative flex rounded-full bg-zinc-100/80 p-0.5">
          {/* Active sliding background */}
          <div
            className={`absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${
              activeView === "ats" ? "translate-x-full" : "translate-x-0"
            }`}
          />

          <Link
            href="/?view=ux"
            replace
            className={`relative z-10 flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 ${
              activeView === "ux"
                ? "text-zinc-900"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            <svg
              className="h-3.5 w-3.5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
            </svg>
            UX-Rich
          </Link>

          <Link
            href="/?view=ats"
            replace
            className={`relative z-10 flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 ${
              activeView === "ats"
                ? "text-zinc-900"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            <svg
              className="h-3.5 w-3.5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
            ATS Scan
          </Link>
        </div>

        {/* Vertical divider */}
        <div className="h-6 w-[1px] bg-zinc-200" />

        {/* Print Button */}
        <button
          onClick={() => window.print()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white transition-all duration-200 hover:bg-zinc-800 hover:scale-105 active:scale-95"
          aria-label="Print or save as PDF"
        >
          <svg
            className="h-4 w-4 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
