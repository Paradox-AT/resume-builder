"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { ResumeData, WorkExperience, Education, Skill, SectionTitles } from "@/types";
import { sanitizeResumeData, createEmptyResumeData } from "@/lib/sanitize";
import { getResumeData } from "@/data/resumes";

const HISTORY_LIMIT = 20;

export function useResumeStore(initialData: ResumeData, profileId: string = "blockchain") {
  const [data, setData] = useState<ResumeData>(initialData);
  const [isMounted, setIsMounted] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Undo / Redo history ring buffer
  const historyRef = useRef<ResumeData[]>([initialData]);
  const historyIndexRef = useRef<number>(0);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const storageKey = `resume-wizard:${profileId}`;
  const initialDataRef = useRef(initialData);

  useEffect(() => {
    initialDataRef.current = initialData;
  }, [initialData]);

  // Update history state indicators
  const syncHistoryFlags = useCallback(() => {
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  }, []);

  // Hydrate from localStorage on client mount & whenever storageKey changes
  useEffect(() => {
    queueMicrotask(() => {
      setIsMounted(true);
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          const sanitized = sanitizeResumeData(parsed);
          setData(sanitized);
          setIsDirty(true);
          historyRef.current = [sanitized];
          historyIndexRef.current = 0;
          setCanUndo(false);
          setCanRedo(false);
        } else {
          const fallback = initialDataRef.current;
          setData(fallback);
          setIsDirty(false);
          historyRef.current = [fallback];
          historyIndexRef.current = 0;
          setCanUndo(false);
          setCanRedo(false);
        }
      } catch (err) {
        console.error("Failed to load resume state from localStorage:", err);
      }
    });
  }, [storageKey]);

  // Push state to history & save to localStorage
  const updateData = useCallback(
    (nextDataOrFn: ResumeData | ((prev: ResumeData) => ResumeData)) => {
      setData((prev) => {
        const next = typeof nextDataOrFn === "function" ? nextDataOrFn(prev) : nextDataOrFn;
        const sanitized = sanitizeResumeData(next);

        // Save to localStorage
        try {
          localStorage.setItem(storageKey, JSON.stringify(sanitized));
        } catch (err) {
          console.error("Failed to save resume state to localStorage:", err);
        }

        setIsDirty(true);

        // Manage history
        const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
        newHistory.push(sanitized);
        if (newHistory.length > HISTORY_LIMIT) {
          newHistory.shift();
        }
        historyRef.current = newHistory;
        historyIndexRef.current = newHistory.length - 1;
        syncHistoryFlags();

        return sanitized;
      });
    },
    [storageKey, syncHistoryFlags]
  );

  // Undo action
  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      const prev = historyRef.current[historyIndexRef.current];
      setData(prev);
      try {
        localStorage.setItem(storageKey, JSON.stringify(prev));
      } catch (err) {
        console.error("Failed to save undo state:", err);
      }
      syncHistoryFlags();
    }
  }, [storageKey, syncHistoryFlags]);

  // Redo action
  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1;
      const next = historyRef.current[historyIndexRef.current];
      setData(next);
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch (err) {
        console.error("Failed to save redo state:", err);
      }
      syncHistoryFlags();
    }
  }, [storageKey, syncHistoryFlags]);

  // Personal Info Form Mutators
  const updatePersonalInfo = useCallback(
    (field: keyof ResumeData["personalInfo"], value: string) => {
      updateData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [field]: value,
        },
      }));
    },
    [updateData]
  );

  // Summary Form Mutator
  const updateSummary = useCallback(
    (summary: string) => {
      updateData((prev) => ({
        ...prev,
        summary,
      }));
    },
    [updateData]
  );

  // Contact Form Mutator
  const updateContact = useCallback(
    (field: keyof ResumeData["contact"], value: string) => {
      updateData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [field]: value,
        },
      }));
    },
    [updateData]
  );

  // Section Titles Form Mutator
  const updateSectionTitle = useCallback(
    (field: keyof SectionTitles, value: string) => {
      updateData((prev) => ({
        ...prev,
        sectionTitles: {
          ...(prev.sectionTitles || {}),
          [field]: value,
        },
      }));
    },
    [updateData]
  );

  // Work Experience Form Mutators
  const addWorkExperience = useCallback(() => {
    updateData((prev) => {
      const newJob: WorkExperience = {
        id: `work-${Date.now()}`,
        title: "Software Engineer",
        company: "Company Name",
        date: { start: "2023-01", end: "Present" },
        bullets: ["Achieved X by performing Y, resulting in Z."],
      };
      return {
        ...prev,
        workHistory: [newJob, ...(prev.workHistory || [])],
      };
    });
  }, [updateData]);

  const removeWorkExperience = useCallback(
    (id: string) => {
      updateData((prev) => ({
        ...prev,
        workHistory: (prev.workHistory || []).filter((w) => w.id !== id),
      }));
    },
    [updateData]
  );

  const updateWorkExperience = useCallback(
    (id: string, updated: Partial<WorkExperience>) => {
      updateData((prev) => ({
        ...prev,
        workHistory: (prev.workHistory || []).map((w) => (w.id === id ? { ...w, ...updated } : w)),
      }));
    },
    [updateData]
  );

  const reorderWorkExperience = useCallback(
    (id: string, direction: "up" | "down") => {
      updateData((prev) => {
        const list = [...(prev.workHistory || [])];
        const idx = list.findIndex((w) => w.id === id);
        if (idx === -1) return prev;
        const targetIdx = direction === "up" ? idx - 1 : idx + 1;
        if (targetIdx < 0 || targetIdx >= list.length) return prev;
        const [moved] = list.splice(idx, 1);
        list.splice(targetIdx, 0, moved);
        return { ...prev, workHistory: list };
      });
    },
    [updateData]
  );

  const addWorkBullet = useCallback(
    (workId: string) => {
      updateData((prev) => ({
        ...prev,
        workHistory: (prev.workHistory || []).map((w) => {
          if (w.id !== workId) return w;
          return {
            ...w,
            bullets: [...(w.bullets || []), "New achievement bullet point."],
          };
        }),
      }));
    },
    [updateData]
  );

  const removeWorkBullet = useCallback(
    (workId: string, bulletIdx: number) => {
      updateData((prev) => ({
        ...prev,
        workHistory: (prev.workHistory || []).map((w) => {
          if (w.id !== workId) return w;
          const bullets = [...(w.bullets || [])];
          bullets.splice(bulletIdx, 1);
          return { ...w, bullets };
        }),
      }));
    },
    [updateData]
  );

  const updateWorkBullet = useCallback(
    (workId: string, bulletIdx: number, text: string) => {
      updateData((prev) => ({
        ...prev,
        workHistory: (prev.workHistory || []).map((w) => {
          if (w.id !== workId) return w;
          const bullets = [...(w.bullets || [])];
          bullets[bulletIdx] = text;
          return { ...w, bullets };
        }),
      }));
    },
    [updateData]
  );

  const reorderWorkBullet = useCallback(
    (workId: string, bulletIdx: number, direction: "up" | "down") => {
      updateData((prev) => ({
        ...prev,
        workHistory: (prev.workHistory || []).map((w) => {
          if (w.id !== workId) return w;
          const bullets = [...(w.bullets || [])];
          const targetIdx = direction === "up" ? bulletIdx - 1 : bulletIdx + 1;
          if (targetIdx < 0 || targetIdx >= bullets.length) return w;
          const [moved] = bullets.splice(bulletIdx, 1);
          bullets.splice(targetIdx, 0, moved);
          return { ...w, bullets };
        }),
      }));
    },
    [updateData]
  );

  // Education Form Mutators
  const addEducation = useCallback(() => {
    updateData((prev) => {
      const newEdu: Education = {
        id: `edu-${Date.now()}`,
        school: "University Name",
        degree: "B.S. in Computer Science",
        date: { start: "2018-09", end: "2022-05" },
      };
      return {
        ...prev,
        education: [newEdu, ...(prev.education || [])],
      };
    });
  }, [updateData]);

  const removeEducation = useCallback(
    (id: string) => {
      updateData((prev) => ({
        ...prev,
        education: (prev.education || []).filter((e) => e.id !== id),
      }));
    },
    [updateData]
  );

  const updateEducation = useCallback(
    (id: string, updated: Partial<Education>) => {
      updateData((prev) => ({
        ...prev,
        education: (prev.education || []).map((e) => (e.id === id ? { ...e, ...updated } : e)),
      }));
    },
    [updateData]
  );

  const reorderEducation = useCallback(
    (id: string, direction: "up" | "down") => {
      updateData((prev) => {
        const list = [...(prev.education || [])];
        const idx = list.findIndex((e) => e.id === id);
        if (idx === -1) return prev;
        const targetIdx = direction === "up" ? idx - 1 : idx + 1;
        if (targetIdx < 0 || targetIdx >= list.length) return prev;
        const [moved] = list.splice(idx, 1);
        list.splice(targetIdx, 0, moved);
        return { ...prev, education: list };
      });
    },
    [updateData]
  );

  // Skills & Languages Form Mutators
  const addSkill = useCallback(
    (category: "skills" | "languages") => {
      updateData((prev) => {
        const newSkill: Skill = {
          name: category === "skills" ? "New Skill" : "Language",
          level: 4,
        };
        const currentList = prev[category] || [];
        return {
          ...prev,
          [category]: [...currentList, newSkill],
        };
      });
    },
    [updateData]
  );

  const removeSkill = useCallback(
    (category: "skills" | "languages", idx: number) => {
      updateData((prev) => {
        const currentList = [...(prev[category] || [])];
        currentList.splice(idx, 1);
        return {
          ...prev,
          [category]: currentList,
        };
      });
    },
    [updateData]
  );

  const updateSkill = useCallback(
    (category: "skills" | "languages", idx: number, updated: Partial<Skill>) => {
      updateData((prev) => {
        const currentList = [...(prev[category] || [])];
        if (!currentList[idx]) return prev;
        currentList[idx] = { ...currentList[idx], ...updated };
        return {
          ...prev,
          [category]: currentList,
        };
      });
    },
    [updateData]
  );

  // Reset to initial preset
  const resetToPreset = useCallback(
    (targetPresetId?: string) => {
      const idToLoad = targetPresetId || profileId;
      const targetPreset = getResumeData(idToLoad);
      setData(targetPreset);
      setIsDirty(false);
      try {
        localStorage.removeItem(storageKey);
      } catch (err) {
        console.error("Failed to clear localStorage on reset:", err);
      }
      historyRef.current = [targetPreset];
      historyIndexRef.current = 0;
      syncHistoryFlags();
    },
    [profileId, storageKey, syncHistoryFlags]
  );

  // Reset to empty schema template
  const resetToEmpty = useCallback(() => {
    const empty = createEmptyResumeData();
    setData(empty);
    setIsDirty(true);
    try {
      localStorage.setItem(storageKey, JSON.stringify(empty));
    } catch (err) {
      console.error("Failed to save empty reset to localStorage:", err);
    }
    historyRef.current = [empty];
    historyIndexRef.current = 0;
    syncHistoryFlags();
  }, [storageKey, syncHistoryFlags]);

  // Export to JSON download file
  const exportToJsonDownload = useCallback(() => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = (data.personalInfo?.name || "resume").toLowerCase().replace(/\s+/g, "_");
    a.download = `${safeName}_${profileId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data, profileId]);

  // Import from JSON file
  const importFromJsonFile = useCallback(
    async (file: File): Promise<{ success: boolean; error?: string }> => {
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        const sanitized = sanitizeResumeData(parsed);
        updateData(sanitized);
        return { success: true };
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err.message : "Invalid JSON file structure.",
        };
      }
    },
    [updateData]
  );

  return {
    data,
    isMounted,
    isDirty,
    canUndo,
    canRedo,
    undo,
    redo,
    updatePersonalInfo,
    updateSummary,
    updateContact,
    updateSectionTitle,
    addWorkExperience,
    removeWorkExperience,
    updateWorkExperience,
    reorderWorkExperience,
    addWorkBullet,
    removeWorkBullet,
    updateWorkBullet,
    reorderWorkBullet,
    addEducation,
    removeEducation,
    updateEducation,
    reorderEducation,
    addSkill,
    removeSkill,
    updateSkill,
    resetToPreset,
    resetToEmpty,
    exportToJsonDownload,
    importFromJsonFile,
  };
}
