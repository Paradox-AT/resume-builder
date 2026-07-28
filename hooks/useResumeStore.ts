"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { ResumeData, WorkExperience, Education, Skill } from "@/types";
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

  // Update history state indicators
  const syncHistoryFlags = useCallback(() => {
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  }, []);

  // Hydrate from localStorage on client mount
  useEffect(() => {
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
        syncHistoryFlags();
      } else {
        setData(initialData);
        setIsDirty(false);
        historyRef.current = [initialData];
        historyIndexRef.current = 0;
        syncHistoryFlags();
      }
    } catch {
      setData(initialData);
    }
  }, [profileId, storageKey, initialData, syncHistoryFlags]);

  // Push state to history & save to localStorage
  const updateData = useCallback(
    (nextDataOrFn: ResumeData | ((prev: ResumeData) => ResumeData)) => {
      setData((prev) => {
        const next = typeof nextDataOrFn === "function" ? nextDataOrFn(prev) : nextDataOrFn;
        const sanitized = sanitizeResumeData(next);

        // Persist to localStorage
        try {
          localStorage.setItem(storageKey, JSON.stringify(sanitized));
        } catch (err) {
          console.error("Failed to save to localStorage:", err);
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

  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      const prev = historyRef.current[historyIndexRef.current];
      setData(prev);
      try {
        localStorage.setItem(storageKey, JSON.stringify(prev));
      } catch {}
      syncHistoryFlags();
    }
  }, [storageKey, syncHistoryFlags]);

  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1;
      const next = historyRef.current[historyIndexRef.current];
      setData(next);
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {}
      syncHistoryFlags();
    }
  }, [storageKey, syncHistoryFlags]);

  // Section updaters
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

  const updateSummary = useCallback(
    (summary: string) => {
      updateData((prev) => ({ ...prev, summary }));
    },
    [updateData]
  );

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

  // Work History operations
  const addWorkExperience = useCallback(() => {
    updateData((prev) => {
      const newWork: WorkExperience = {
        id: `work-${Date.now()}`,
        title: "Senior Software Engineer",
        company: "Company Name",
        date: { start: "2024-01", end: "Present" },
        bullets: ["Key achievement or responsibility line."],
      };
      return { ...prev, workHistory: [newWork, ...prev.workHistory] };
    });
  }, [updateData]);

  const removeWorkExperience = useCallback(
    (id: string) => {
      updateData((prev) => ({
        ...prev,
        workHistory: prev.workHistory.filter((item) => item.id !== id),
      }));
    },
    [updateData]
  );

  const updateWorkExperience = useCallback(
    (id: string, updated: Partial<WorkExperience>) => {
      updateData((prev) => ({
        ...prev,
        workHistory: prev.workHistory.map((item) =>
          item.id === id ? { ...item, ...updated } : item
        ),
      }));
    },
    [updateData]
  );

  const reorderWorkExperience = useCallback(
    (id: string, direction: "up" | "down") => {
      updateData((prev) => {
        const idx = prev.workHistory.findIndex((item) => item.id === id);
        if (idx === -1) return prev;
        const targetIdx = direction === "up" ? idx - 1 : idx + 1;
        if (targetIdx < 0 || targetIdx >= prev.workHistory.length) return prev;

        const nextList = [...prev.workHistory];
        const [moved] = nextList.splice(idx, 1);
        nextList.splice(targetIdx, 0, moved);
        return { ...prev, workHistory: nextList };
      });
    },
    [updateData]
  );

  // Bullet operations within work experience
  const addWorkBullet = useCallback(
    (workId: string) => {
      updateData((prev) => ({
        ...prev,
        workHistory: prev.workHistory.map((item) =>
          item.id === workId
            ? { ...item, bullets: [...item.bullets, "New achievement bullet point."] }
            : item
        ),
      }));
    },
    [updateData]
  );

  const removeWorkBullet = useCallback(
    (workId: string, bulletIdx: number) => {
      updateData((prev) => ({
        ...prev,
        workHistory: prev.workHistory.map((item) =>
          item.id === workId
            ? { ...item, bullets: item.bullets.filter((_, idx) => idx !== bulletIdx) }
            : item
        ),
      }));
    },
    [updateData]
  );

  const updateWorkBullet = useCallback(
    (workId: string, bulletIdx: number, text: string) => {
      updateData((prev) => ({
        ...prev,
        workHistory: prev.workHistory.map((item) =>
          item.id === workId
            ? {
                ...item,
                bullets: item.bullets.map((b, idx) => (idx === bulletIdx ? text : b)),
              }
            : item
        ),
      }));
    },
    [updateData]
  );

  const reorderWorkBullet = useCallback(
    (workId: string, bulletIdx: number, direction: "up" | "down") => {
      updateData((prev) => ({
        ...prev,
        workHistory: prev.workHistory.map((item) => {
          if (item.id !== workId) return item;
          const targetIdx = direction === "up" ? bulletIdx - 1 : bulletIdx + 1;
          if (targetIdx < 0 || targetIdx >= item.bullets.length) return item;
          const nextBullets = [...item.bullets];
          const [moved] = nextBullets.splice(bulletIdx, 1);
          nextBullets.splice(targetIdx, 0, moved);
          return { ...item, bullets: nextBullets };
        }),
      }));
    },
    [updateData]
  );

  // Education operations
  const addEducation = useCallback(() => {
    updateData((prev) => {
      const newEdu: Education = {
        id: `edu-${Date.now()}`,
        degree: "Bachelor of Science in Computer Science",
        school: "University Name",
        date: { start: "2018-09", end: "2022-06" },
      };
      return { ...prev, education: [...prev.education, newEdu] };
    });
  }, [updateData]);

  const removeEducation = useCallback(
    (id: string) => {
      updateData((prev) => ({
        ...prev,
        education: prev.education.filter((item) => item.id !== id),
      }));
    },
    [updateData]
  );

  const updateEducation = useCallback(
    (id: string, updated: Partial<Education>) => {
      updateData((prev) => ({
        ...prev,
        education: prev.education.map((item) =>
          item.id === id ? { ...item, ...updated } : item
        ),
      }));
    },
    [updateData]
  );

  const reorderEducation = useCallback(
    (id: string, direction: "up" | "down") => {
      updateData((prev) => {
        const idx = prev.education.findIndex((item) => item.id === id);
        if (idx === -1) return prev;
        const targetIdx = direction === "up" ? idx - 1 : idx + 1;
        if (targetIdx < 0 || targetIdx >= prev.education.length) return prev;

        const nextList = [...prev.education];
        const [moved] = nextList.splice(idx, 1);
        nextList.splice(targetIdx, 0, moved);
        return { ...prev, education: nextList };
      });
    },
    [updateData]
  );

  // Skills & Languages operations
  const addSkill = useCallback(
    (category: "skills" | "languages") => {
      updateData((prev) => {
        const newSkill: Skill = { name: "New Skill", level: 3 };
        return { ...prev, [category]: [...prev[category], newSkill] };
      });
    },
    [updateData]
  );

  const removeSkill = useCallback(
    (category: "skills" | "languages", idx: number) => {
      updateData((prev) => ({
        ...prev,
        [category]: prev[category].filter((_, i) => i !== idx),
      }));
    },
    [updateData]
  );

  const updateSkill = useCallback(
    (category: "skills" | "languages", idx: number, updated: Partial<Skill>) => {
      updateData((prev) => ({
        ...prev,
        [category]: prev[category].map((item, i) =>
          i === idx ? { ...item, ...updated } : item
        ),
      }));
    },
    [updateData]
  );

  // Download export JSON
  const exportToJsonDownload = useCallback(() => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = (data.personalInfo.name || "resume")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_");
    a.download = `${safeName}_resume_data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [data]);

  // Import JSON from file input with size + MIME guards
  const importFromJsonFile = useCallback(
    (file: File): Promise<{ success: boolean; error?: string }> => {
      return new Promise((resolve) => {
        if (file.size > 1024 * 1024) {
          resolve({ success: false, error: "File size exceeds 1MB limit." });
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            const parsed = JSON.parse(content);
            const sanitized = sanitizeResumeData(parsed);
            updateData(sanitized);
            resolve({ success: true });
          } catch (err) {
            resolve({
              success: false,
              error: err instanceof Error ? err.message : "Failed to parse JSON file.",
            });
          }
        };
        reader.onerror = () => {
          resolve({ success: false, error: "Failed to read file." });
        };
        reader.readAsText(file);
      });
    },
    [updateData]
  );

  // Reset to preset or clear
  const resetToPreset = useCallback(
    (presetType?: string) => {
      const targetPreset = presetType ? getResumeData(presetType) : initialData;
      try {
        localStorage.removeItem(storageKey);
      } catch {}
      setData(targetPreset);
      setIsDirty(false);
      historyRef.current = [targetPreset];
      historyIndexRef.current = 0;
      syncHistoryFlags();
    },
    [initialData, storageKey, syncHistoryFlags]
  );

  const resetToEmpty = useCallback(() => {
    const empty = createEmptyResumeData();
    updateData(empty);
  }, [updateData]);

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
    exportToJsonDownload,
    importFromJsonFile,
    resetToPreset,
    resetToEmpty,
  };
}
