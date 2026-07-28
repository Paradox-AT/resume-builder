"use client";

import type { ContactInfo } from "@/types";

interface ContactBarProps {
  contact: ContactInfo;
  variant?: "icons" | "pills" | "ats-inline" | "ats-stacked";
  className?: string;
}

export default function ContactBar({
  contact,
  variant = "icons",
  className = "",
}: ContactBarProps) {
  const { phone, email, linkedin, github, address } = contact;

  if (variant === "ats-inline") {
    return (
      <div className={`flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)] ${className}`}>
        {phone && (
          <div>
            <span className="font-semibold text-[var(--text-primary)]">Phone: </span>
            {phone}
          </div>
        )}
        {email && (
          <div>
            <span className="font-semibold text-[var(--text-primary)]">Email: </span>
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
          </div>
        )}
        {linkedin && (
          <div>
            <span className="font-semibold text-[var(--text-primary)]">LinkedIn: </span>
            <a href={`https://${linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {linkedin}
            </a>
          </div>
        )}
        {github && (
          <div>
            <span className="font-semibold text-[var(--text-primary)]">GitHub: </span>
            <a href={`https://${github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {github}
            </a>
          </div>
        )}
        {address && (
          <div>
            <span className="font-semibold text-[var(--text-primary)]">Location: </span>
            {address}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-2 text-xs ${className}`}>
      {phone && (
        <div className="flex items-center gap-2">
          <span className="font-semibold opacity-70">Phone:</span>
          <span>{phone}</span>
        </div>
      )}
      {email && (
        <div className="flex items-center gap-2">
          <span className="font-semibold opacity-70">Email:</span>
          <a href={`mailto:${email}`} className="hover:underline truncate">
            {email}
          </a>
        </div>
      )}
      {linkedin && (
        <div className="flex items-center gap-2">
          <span className="font-semibold opacity-70">LinkedIn:</span>
          <a href={`https://${linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
            {linkedin}
          </a>
        </div>
      )}
      {github && (
        <div className="flex items-center gap-2">
          <span className="font-semibold opacity-70">GitHub:</span>
          <a href={`https://${github}`} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
            {github}
          </a>
        </div>
      )}
      {address && (
        <div className="flex items-center gap-2">
          <span className="font-semibold opacity-70">Location:</span>
          <span>{address}</span>
        </div>
      )}
    </div>
  );
}
