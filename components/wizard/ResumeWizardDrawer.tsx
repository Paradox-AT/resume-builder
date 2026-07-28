"use client";

import { useState, useEffect } from "react";
import type { ResumeData, StepId, WizardStep, WorkExperience, Education, Skill } from "@/types";
import StepPersonalInfo from "./steps/StepPersonalInfo";
import StepSummary from "./steps/StepSummary";
import StepWorkHistory from "./steps/StepWorkHistory";
import StepEducation from "./steps/StepEducation";
import StepSkills from "./steps/StepSkills";
import StepSectionHeadings from "./steps/StepSectionHeadings";
import type { SectionTitles } from "@/types";
import {
  IconUser,
  IconFileText,
  IconBriefcase,
  IconGraduation,
  IconZap,
  IconTag,
} from "@/components/ui/icons";

interface StepIconProps {
  id: StepId;
  className?: string;
}

function StepIcon({ id, className = "h-3.5 w-3.5" }: StepIconProps) {
  switch (id) {
    case "personal":
      return <IconUser className={className} />;
    case "summary":
      return <IconFileText className={className} />;
    case "work":
      return <IconBriefcase className={className} />;
    case "education":
      return <IconGraduation className={className} />;
    case "skills":
      return <IconZap className={className} />;
    case "headings":
      return <IconTag className={className} />;
  }
}

const WIZARD_STEPS: WizardStep[] = [
  { id: "personal", label: "Personal", icon: "", description: "Contact & Identity" },
  { id: "summary", label: "Summary", icon: "", description: "Executive Summary" },
  { id: "work", label: "Work", icon: "", description: "Employment History" },
  { id: "education", label: "Education", icon: "", description: "Degrees & Schools" },
  { id: "skills", label: "Skills", icon: "", description: "Technical & Languages" },
  { id: "headings", label: "Headings", icon: "", description: "Section Titles" },
];

interface ResumeWizardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
  isDirty: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onUpdatePersonalInfo: (field: keyof ResumeData["personalInfo"], value: string) => void;
  onUpdateSummary: (summary: string) => void;
  onUpdateContact: (field: keyof ResumeData["contact"], value: string) => void;
  onAddWorkExperience: () => void;
  onRemoveWorkExperience: (id: string) => void;
  onUpdateWorkExperience: (id: string, updated: Partial<WorkExperience>) => void;
  onReorderWorkExperience: (id: string, direction: "up" | "down") => void;
  onAddWorkBullet: (workId: string) => void;
  onRemoveWorkBullet: (workId: string, idx: number) => void;
  onUpdateWorkBullet: (workId: string, idx: number, text: string) => void;
  onReorderWorkBullet: (workId: string, idx: number, direction: "up" | "down") => void;
  onAddEducation: () => void;
  onRemoveEducation: (id: string) => void;
  onUpdateEducation: (id: string, updated: Partial<Education>) => void;
  onReorderEducation: (id: string, direction: "up" | "down") => void;
  onAddSkill: (category: "skills" | "languages") => void;
  onRemoveSkill: (category: "skills" | "languages", idx: number) => void;
  onUpdateSkill: (category: "skills" | "languages", idx: number, updated: Partial<Skill>) => void;
  onUpdateSectionTitle?: (field: keyof SectionTitles, value: string) => void;
  onExportDownload: () => void;
  onImportFile: (file: File) => Promise<{ success: boolean; error?: string }>;
  onResetToPreset: (presetId?: string) => void;
  onResetToEmpty: () => void;
}

export default function ResumeWizardDrawer({
  isOpen,
  onClose,
  data,
  isDirty,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onUpdatePersonalInfo,
  onUpdateSummary,
  onUpdateContact,
  onAddWorkExperience,
  onRemoveWorkExperience,
  onUpdateWorkExperience,
  onReorderWorkExperience,
  onAddWorkBullet,
  onRemoveWorkBullet,
  onUpdateWorkBullet,
  onReorderWorkBullet,
  onAddEducation,
  onRemoveEducation,
  onUpdateEducation,
  onReorderEducation,
  onAddSkill,
  onRemoveSkill,
  onUpdateSkill,
  onUpdateSectionTitle,
  onExportDownload,
  onImportFile,
  onResetToPreset,
  onResetToEmpty,
}: ResumeWizardDrawerProps) {
  const [activeStep, setActiveStep] = useState<StepId>("personal");

  // Reset to 1st step ("personal") whenever drawer opens
  useEffect(() => {
    if (isOpen) {
      setActiveStep("personal");
    }
  }, [isOpen]);

  // Esc key listener & Ctrl+Z / Ctrl+Shift+Z listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        if (e.shiftKey) {
          if (canRedo) onRedo();
        } else {
          if (canUndo) onUndo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, canUndo, canRedo, onUndo, onRedo]);

  if (!isOpen) return null;

  const activeStepIdx = WIZARD_STEPS.findIndex((s) => s.id === activeStep);
  const isFirstStep = activeStepIdx === 0;
  const isLastStep = activeStepIdx === WIZARD_STEPS.length - 1;

  const handlePrev = () => {
    if (!isFirstStep) {
      setActiveStep(WIZARD_STEPS[activeStepIdx - 1].id);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setActiveStep(WIZARD_STEPS[activeStepIdx + 1].id);
    }
  };

  return (
    <div
      role="dialog"
      aria-label="Resume Data Generator Wizard"
      className="fixed inset-0 z-50 overflow-hidden font-sans print:hidden"
    >
      {/* Backdrop for Mobile / Tablet */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-md sm:max-w-xl md:max-w-2xl bg-white dark:bg-zinc-900 shadow-2xl flex flex-col border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300">
          
          {/* DRAWER HEADER */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-950/80">
            <div>
              <div className="flex items-center gap-2">
                <IconFileText className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                <h2 className="text-base font-bold tracking-tight text-zinc-900 dark:text-white">
                  Resume Data Generator
                </h2>
                {isDirty ? (
                  <span className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    Custom Data
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    Preset Synced
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Dynamic live editor. Edits update preview instantly.
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Undo / Redo controls */}
              <button
                onClick={onUndo}
                disabled={!canUndo}
                title="Undo (Ctrl+Z)"
                className="px-2 py-1 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-30 disabled:hover:bg-white dark:disabled:hover:bg-zinc-800 cursor-pointer shadow-2xs transition-colors"
              >
                ↩ Undo
              </button>
              <button
                onClick={onRedo}
                disabled={!canRedo}
                title="Redo (Ctrl+Shift+Z)"
                className="px-2 py-1 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-30 disabled:hover:bg-white dark:disabled:hover:bg-zinc-800 cursor-pointer shadow-2xs transition-colors"
              >
                ↪ Redo
              </button>

              {/* Close button */}
              <button
                onClick={onClose}
                className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-lg font-bold ml-1"
                aria-label="Close wizard"
              >
                ✕
              </button>
            </div>
          </div>

          {/* STEP PILLS NAVIGATION */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 min-w-max">
              {WIZARD_STEPS.map((step, idx) => {
                const isActive = step.id === activeStep;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <StepIcon id={step.id} className="h-3.5 w-3.5 shrink-0" />
                    <span>
                      {idx + 1}. {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP BODY CONTENT */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {activeStep === "personal" && (
              <StepPersonalInfo
                data={data}
                onUpdatePersonal={onUpdatePersonalInfo}
                onUpdateContact={onUpdateContact}
              />
            )}

            {activeStep === "summary" && (
              <StepSummary data={data} onUpdateSummary={onUpdateSummary} />
            )}

            {activeStep === "work" && (
              <StepWorkHistory
                data={data}
                onAddWork={onAddWorkExperience}
                onRemoveWork={onRemoveWorkExperience}
                onUpdateWork={onUpdateWorkExperience}
                onReorderWork={onReorderWorkExperience}
                onAddBullet={onAddWorkBullet}
                onRemoveBullet={onRemoveWorkBullet}
                onUpdateBullet={onUpdateWorkBullet}
                onReorderBullet={onReorderWorkBullet}
              />
            )}

            {activeStep === "education" && (
              <StepEducation
                data={data}
                onAddEducation={onAddEducation}
                onRemoveEducation={onRemoveEducation}
                onUpdateEducation={onUpdateEducation}
                onReorderEducation={onReorderEducation}
              />
            )}

            {activeStep === "skills" && (
              <StepSkills
                data={data}
                onAddSkill={onAddSkill}
                onRemoveSkill={onRemoveSkill}
                onUpdateSkill={onUpdateSkill}
              />
            )}

            {activeStep === "headings" && (
              <StepSectionHeadings
                sectionTitles={data.sectionTitles}
                onUpdateSectionTitle={onUpdateSectionTitle || (() => {})}
              />
            )}
          </div>

          {/* DRAWER FOOTER */}
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-950/90 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={isFirstStep}
              className="flex items-center gap-1 rounded-xl border border-zinc-300 dark:border-zinc-700 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
            >
              ← Previous Step
            </button>

            <div className="text-[11px] font-semibold text-zinc-400">
              Step {activeStepIdx + 1} of {WIZARD_STEPS.length}
            </div>

            {isLastStep ? (
              <button
                onClick={onClose}
                className="flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                ✓ Done Editing
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-1 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-1.5 text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                Next Step →
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
