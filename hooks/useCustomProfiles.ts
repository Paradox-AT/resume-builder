"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { ResumeData, ResumeProfile } from "@/types";
import { createEmptyResumeData } from "@/lib/sanitize";
import { RESUME_REGISTRY, inferIconFromRole } from "@/data/resumes";

const CUSTOM_PROFILES_KEY = "resume-wizard:custom-profiles";

export function useCustomProfiles() {
  const [customProfiles, setCustomProfiles] = useState<ResumeProfile[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load custom profiles from localStorage on client mount
  useEffect(() => {
    queueMicrotask(() => {
      setIsMounted(true);
      try {
        const saved = localStorage.getItem(CUSTOM_PROFILES_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setCustomProfiles(parsed);
          }
        }
      } catch (err) {
        console.error("Failed to load custom profiles:", err);
      }
    });
  }, []);

  const saveCustomProfiles = useCallback((profiles: ResumeProfile[]) => {
    setCustomProfiles(profiles);
    try {
      localStorage.setItem(CUSTOM_PROFILES_KEY, JSON.stringify(profiles));
    } catch (err) {
      console.error("Failed to save custom profiles:", err);
    }
  }, []);

  const createFreshProfile = useCallback((customName?: string) => {
    const id = `custom-${Date.now()}`;
    const label = customName?.trim() || `New Resume ${customProfiles.length + 1}`;
    const emptyData = createEmptyResumeData();
    if (customName?.trim()) {
      emptyData.personalInfo.role = customName.trim();
    }

    const newProfile: ResumeProfile = {
      id,
      label,
      icon: "📄",
      data: emptyData,
      isCustom: true,
    };

    // Save empty resume data to its specific key
    try {
      localStorage.setItem(`resume-wizard:${id}`, JSON.stringify(newProfile.data));
    } catch {}

    const updatedList = [...customProfiles, newProfile];
    saveCustomProfiles(updatedList);
    return id;
  }, [customProfiles, saveCustomProfiles]);

  const createProfileWithData = useCallback(
    (profileData: ResumeData, customName?: string) => {
      const id = `custom-${Date.now()}`;
      const label =
        customName?.trim() ||
        profileData.personalInfo.role?.trim() ||
        profileData.personalInfo.name?.trim() ||
        `Imported Resume ${customProfiles.length + 1}`;

      const newProfile: ResumeProfile = {
        id,
        label,
        icon: inferIconFromRole(profileData.personalInfo.role),
        data: profileData,
        isCustom: true,
      };

      try {
        localStorage.setItem(`resume-wizard:${id}`, JSON.stringify(newProfile.data));
      } catch {}

      const updatedList = [...customProfiles, newProfile];
      saveCustomProfiles(updatedList);
      return id;
    },
    [customProfiles, saveCustomProfiles]
  );

  const deleteCustomProfile = useCallback(
    (id: string) => {
      const updated = customProfiles.filter((p) => p.id !== id);
      saveCustomProfiles(updated);
      try {
        localStorage.removeItem(`resume-wizard:${id}`);
      } catch {}
    },
    [customProfiles, saveCustomProfiles]
  );

  const updateCustomProfileLabel = useCallback(
    (id: string, name: string, role: string) => {
      const label = role?.trim() || name?.trim() || "New Resume";

      setCustomProfiles((prev) => {
        const targetIdx = prev.findIndex((p) => p.id === id);
        if (targetIdx === -1) return prev;
        if (prev[targetIdx].label === label) return prev;

        const next = [...prev];
        next[targetIdx] = {
          ...next[targetIdx],
          label,
        };
        try {
          localStorage.setItem(CUSTOM_PROFILES_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const allProfiles: ResumeProfile[] = useMemo(() => {
    return [...(RESUME_REGISTRY as ResumeProfile[]), ...customProfiles];
  }, [customProfiles]);

  return {
    customProfiles,
    allProfiles,
    isMounted,
    createFreshProfile,
    createProfileWithData,
    deleteCustomProfile,
    updateCustomProfileLabel,
  };
}
