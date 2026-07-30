"use client";

import { useId, useRef } from "react";
import type { ResumeData } from "@/types";
import { IconUpload, IconTrash } from "@/components/ui/icons";
import { resolveAssetUrl } from "@/lib";

interface StepPersonalInfoProps {
  data: ResumeData;
  onUpdatePersonal: (field: keyof ResumeData["personalInfo"], value: string) => void;
  onUpdateContact: (field: keyof ResumeData["contact"], value: string) => void;
}

export default function StepPersonalInfo({
  data,
  onUpdatePersonal,
  onUpdateContact,
}: StepPersonalInfoProps) {
  const nameId = useId();
  const roleId = useId();
  const photoId = useId();
  const phoneId = useId();
  const emailId = useId();
  const linkedinId = useId();
  const githubId = useId();
  const addressId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Please select an image file smaller than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        onUpdatePersonal("profilePhotoUrl", base64);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
          Identity & Photo
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          Personal title and profile details visible at the top of your resume.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={nameId} className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id={nameId}
              type="text"
              value={data.personalInfo.name}
              onChange={(e) => onUpdatePersonal("name", e.target.value)}
              placeholder="e.g. Aayush Thakur"
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
            />
          </div>

          <div>
            <label htmlFor={roleId} className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Target Role / Title <span className="text-red-500">*</span>
            </label>
            <input
              id={roleId}
              type="text"
              value={data.personalInfo.role}
              onChange={(e) => onUpdatePersonal("role", e.target.value)}
              placeholder="e.g. Senior Blockchain Engineer"
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
            />
          </div>

          {/* Profile Photo Uploader */}
          <div className="sm:col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Profile Photo (Upload File or URL)
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-3">
              {/* Photo Preview Thumbnail */}
              <div className="h-12 w-12 shrink-0 rounded-full border border-zinc-300 dark:border-zinc-700 overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                {data.personalInfo.profilePhotoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={resolveAssetUrl(data.personalInfo.profilePhotoUrl)}
                    alt="Profile Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-lg text-zinc-400">👤</span>
                )}
              </div>

              <div className="flex-1 space-y-1.5 min-w-0">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="profile-photo-upload"
                />

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="profile-photo-upload"
                    className="flex items-center gap-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-3 py-1.5 text-xs font-bold shadow-xs hover:opacity-90 cursor-pointer transition-all"
                  >
                    <IconUpload className="h-3.5 w-3.5" /> Upload Photo
                  </label>

                  {data.personalInfo.profilePhotoUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        onUpdatePersonal("profilePhotoUrl", "");
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="flex items-center gap-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <IconTrash className="h-3.5 w-3.5" /> Remove
                    </button>
                  )}
                </div>

                <input
                  id={photoId}
                  type="text"
                  value={data.personalInfo.profilePhotoUrl || ""}
                  onChange={(e) => onUpdatePersonal("profilePhotoUrl", e.target.value)}
                  placeholder="Or paste URL (e.g. /Me.jpg or https://...)"
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 px-2.5 py-1 text-[11px] text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
          Contact Details
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          How recruiters and hiring managers reach you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={phoneId} className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Phone Number
            </label>
            <input
              id={phoneId}
              type="text"
              value={data.contact.phone}
              onChange={(e) => onUpdateContact("phone", e.target.value)}
              placeholder="+91 99 777 00000"
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
            />
          </div>

          <div>
            <label htmlFor={emailId} className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Email Address
            </label>
            <input
              id={emailId}
              type="email"
              value={data.contact.email}
              onChange={(e) => onUpdateContact("email", e.target.value)}
              placeholder="yourname@domain.com"
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
            />
          </div>

          <div>
            <label htmlFor={linkedinId} className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              LinkedIn Handle/URL
            </label>
            <input
              id={linkedinId}
              type="text"
              value={data.contact.linkedin}
              onChange={(e) => onUpdateContact("linkedin", e.target.value)}
              placeholder="linkedin.com/in/username"
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
            />
          </div>

          <div>
            <label htmlFor={githubId} className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              GitHub Profile
            </label>
            <input
              id={githubId}
              type="text"
              value={data.contact.github}
              onChange={(e) => onUpdateContact("github", e.target.value)}
              placeholder="github.com/username"
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor={addressId} className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Location / Address (Optional)
            </label>
            <input
              id={addressId}
              type="text"
              value={data.contact.address || ""}
              onChange={(e) => onUpdateContact("address", e.target.value)}
              placeholder="e.g. Pune, MH, India"
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
