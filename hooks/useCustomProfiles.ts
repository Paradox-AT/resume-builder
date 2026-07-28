"use client";

import { useState, useEffect, useCallback } from "react";
import type { ResumeProfile } from "@/types";
import { RESUME_REGISTRY } from "@/data/resumes";
import { createEmptyResumeData } from "@/lib/sanitize";

const CUSTOM_PROFILES_KEY = "resume-wizard:custom-profiles-list";

export function useCustomProfiles() {
  const [customProfiles, setCustomProfiles] = useState<ResumeProfile[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load custom profiles from localStorage on client mount
  useEffect(() => {
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
      let label = role?.trim() || name?.trim() || "New Resume";

      setCustomProfiles((prev) => {
        const targetIdx = prev.findIndex((p) => p.id === id);
        if (targetIdx === -1) return prev;
        if (prev[targetIdx].label === label) return prev;

        const next = [...prev];
        next[targetIdx] = { ...next[targetIdx], label };
        try {
          localStorage.setItem(CUSTOM_PROFILES_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const allProfiles: ResumeProfile[] = [
    ...RESUME_REGISTRY.map((p) => ({ ...p, isCustom: false })),
    ...customProfiles,
  ];

  return {
    customProfiles,
    allProfiles,
    isMounted,
    createFreshProfile,
    deleteCustomProfile,
    updateCustomProfileLabel,
  };
}
