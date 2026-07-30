"use client";

import { useState } from "react";
import type { ResumeData, ContactInfo } from "@/types";
import { getInitials, resolveAssetUrl } from "@/lib";
import ContactBar from "./ContactBar";

interface ResumeHeaderProps {
  personalInfo: ResumeData["personalInfo"];
  contact: ContactInfo;
  variant?: "ux-sidebar" | "ux-executive" | "ux-primo" | "ux-cubic" | "ats-centered" | "ats-minimal" | "ats-banner";
  className?: string;
}

export default function ResumeHeader({
  personalInfo,
  contact,
  variant = "ux-sidebar",
  className = "",
}: ResumeHeaderProps) {
  const initials = personalInfo.avatarInitials || getInitials(personalInfo.name);
  const [imgError, setImgError] = useState(false);
  const hasPhoto = Boolean(personalInfo.profilePhotoUrl) && !imgError;
  const photoUrl = resolveAssetUrl(personalInfo.profilePhotoUrl);

  if (variant === "ux-executive") {
    return (
      <header className={`w-full rounded-2xl bg-zinc-900 text-white p-6 mb-6 shadow-md ${className}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className="h-16 w-16 shrink-0 rounded-full border-2 border-white/20 overflow-hidden bg-zinc-800 flex items-center justify-center">
              {hasPhoto ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={photoUrl}
                  alt={personalInfo.name}
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-white">{initials}</span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">{personalInfo.name}</h1>
              <p className="text-sm font-medium text-zinc-300 mt-0.5">{personalInfo.role}</p>
            </div>
          </div>
          <ContactBar contact={contact} variant="icons" className="text-zinc-300 shrink-0" />
        </div>
      </header>
    );
  }

  if (variant === "ux-primo") {
    return (
      <header className={`w-full text-center pb-6 mb-6 border-b border-zinc-200 dark:border-zinc-800 ${className}`}>
        <div className="mx-auto h-20 w-20 rounded-full border-4 border-zinc-900 dark:border-white overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3 shadow-md">
          {hasPhoto ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={photoUrl}
              alt={personalInfo.name}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-2xl font-black">{initials}</span>
          )}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">{personalInfo.name}</h1>
        <p className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-1">{personalInfo.role}</p>
      </header>
    );
  }

  if (variant === "ats-centered") {
    return (
      <header className={`border-b border-[var(--border-color)] pb-4 text-center ${className}`}>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{personalInfo.name}</h1>
        <p className="ats-role mt-1 text-base font-medium sm:text-lg">{personalInfo.role}</p>
        <ContactBar contact={contact} variant="ats-inline" className="mt-2.5" />
      </header>
    );
  }

  if (variant === "ats-minimal") {
    return (
      <header className={`border-b border-zinc-300 pb-4 text-left ${className}`}>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">{personalInfo.name}</h1>
        <p className="text-base font-semibold text-zinc-600 mt-0.5">{personalInfo.role}</p>
        <ContactBar contact={contact} variant="ats-inline" className="mt-3 justify-start" />
      </header>
    );
  }

  // Default UX Sidebar header
  return (
    <header className={`resume-header ${className}`}>
      <div className="avatar" aria-hidden="true">
        {hasPhoto ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={photoUrl}
            alt={personalInfo.name}
            onError={() => setImgError(true)}
            className="avatar-img"
          />
        ) : (
          <span className="avatar-text">{initials}</span>
        )}
      </div>
      <div>
        <h1>{personalInfo.name}</h1>
        <p className="role">{personalInfo.role}</p>
      </div>
    </header>
  );
}
