"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ResumeData, ViewType, ResumeType, ThemeMode } from "@/types";
import { Toggle, PromptModal, ConfirmModal } from "@/components/ui";
import { UxRichLayout, AtsLayout } from "@/components/layouts";
import { useResumeStore } from "@/hooks/useResumeStore";
import { useCustomProfiles } from "@/hooks/useCustomProfiles";
import { getResumeData, RESUME_REGISTRY } from "@/data/resumes";
import { getSidebarBg, getAccentGradientEnd, DEFAULT_ACCENT_COLOR } from "@/lib";
import ResumeWizardDrawer from "@/components/wizard/ResumeWizardDrawer";

interface ResumeViewWrapperProps {
  initialData?: ResumeData;
  activeView?: ViewType;
  activeTheme?: string;
  activeType?: ResumeType;
  activeColor?: string;
  isGradient?: boolean;
  themeMode?: ThemeMode;
  isWhiteCard?: boolean;
}

export default function ResumeViewWrapper({
  initialData: propInitialData,
  activeView: propActiveView,
  activeTheme: propActiveTheme,
  activeType: propActiveType,
  activeColor: propActiveColor,
  isGradient: propIsGradient,
  themeMode: propThemeMode,
  isWhiteCard: propIsWhiteCard,
}: ResumeViewWrapperProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read searchParams from URL dynamically on client side
  const viewParam = searchParams.get("view");
  const themeParam = searchParams.get("theme");
  const typeParam = searchParams.get("type");
  const colorParam = searchParams.get("color");
  const gradientParam = searchParams.get("gradient");
  const modeParam = searchParams.get("mode");
  const cardParam = searchParams.get("card");

  const activeView: ViewType = viewParam === "ats" ? "ats" : (propActiveView || "ux");
  const activeTheme = themeParam || propActiveTheme || (activeView === "ats" ? "ats-standard" : "ux-modern");
  const activeType: ResumeType = (typeParam as ResumeType) || propActiveType || (RESUME_REGISTRY[0].id as ResumeType);
  const isGradient = gradientParam !== null ? gradientParam !== "false" : (propIsGradient ?? true);
  const isWhiteCard = cardParam !== null ? cardParam !== "dark" : (propIsWhiteCard ?? true);

  const themeMode: ThemeMode =
    modeParam === "dark" ? "dark" : modeParam === "light" ? "light" : (propThemeMode || "system");

  let activeColor = propActiveColor || DEFAULT_ACCENT_COLOR;
  if (colorParam) {
    const decoded = decodeURIComponent(colorParam).trim();
    if (decoded.startsWith("#") || decoded.startsWith("rgb") || decoded.startsWith("hsl")) {
      activeColor = decoded;
    } else {
      activeColor = `#${decoded}`;
    }
  }

  const sidebarBg = getSidebarBg(activeColor);
  const gradientEnd = getAccentGradientEnd(activeColor);
  const currentData = propInitialData || getResumeData(activeType);

  const modeClass =
    themeMode === "dark"
      ? "dark bg-zinc-950"
      : themeMode === "light"
      ? "light bg-zinc-200"
      : "bg-zinc-200 dark:bg-zinc-950";

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [currentActiveType, setCurrentActiveType] = useState<string>(activeType);

  useEffect(() => {
    if (currentActiveType !== activeType) {
      queueMicrotask(() => setCurrentActiveType(activeType));
    }
  }, [activeType, currentActiveType]);

  const customProfilesStore = useCustomProfiles();
  const store = useResumeStore(currentData, currentActiveType);

  // Sync custom profile label dynamically when name or role changes
  useEffect(() => {
    if (currentActiveType.startsWith("custom-")) {
      customProfilesStore.updateCustomProfileLabel(
        currentActiveType,
        store.data.personalInfo.name,
        store.data.personalInfo.role
      );
    }
  }, [
    currentActiveType,
    store.data.personalInfo.name,
    store.data.personalInfo.role,
    customProfilesStore,
  ]);

  const [isNewProfileModalOpen, setIsNewProfileModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; label: string } | null>(null);

  const handleCreateFreshProfile = () => {
    setIsNewProfileModalOpen(true);
  };

  const handleConfirmCreateProfile = (profileName: string) => {
    setIsNewProfileModalOpen(false);
    const newId = customProfilesStore.createFreshProfile(profileName);
    setCurrentActiveType(newId);
    const encodedColor = encodeURIComponent(activeColor);
    const currentCardParam = isWhiteCard ? "white" : "dark";
    router.replace(
      `?view=${activeView}&type=${newId}&color=${encodedColor}&gradient=${isGradient}&mode=${themeMode}&card=${currentCardParam}`
    );
    setIsWizardOpen(true);
  };

  const handleDeleteCustomProfile = (id: string) => {
    const profileObj = customProfilesStore.allProfiles.find((p) => p.id === id);
    const label = profileObj ? profileObj.label : "this profile";
    setDeleteTarget({ id, label });
  };

  const handleConfirmDeleteProfile = () => {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    setDeleteTarget(null);
    customProfilesStore.deleteCustomProfile(id);
    if (currentActiveType === id) {
      setCurrentActiveType("blockchain");
      const encodedColor = encodeURIComponent(activeColor);
      const currentCardParam = isWhiteCard ? "white" : "dark";
      router.replace(
        `?view=${activeView}&type=blockchain&color=${encodedColor}&gradient=${isGradient}&mode=${themeMode}&card=${currentCardParam}`
      );
    }
  };

  const handleExportProfile = (profileId: string) => {
    let exportData = store.data;
    if (profileId !== currentActiveType) {
      try {
        const saved = localStorage.getItem(`resume-wizard:${profileId}`);
        if (saved) {
          exportData = JSON.parse(saved);
        } else {
          exportData = getResumeData(profileId);
        }
      } catch {
        exportData = getResumeData(profileId);
      }
    }

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = (exportData.personalInfo?.name || "resume").toLowerCase().replace(/\s+/g, "_");
    a.download = `${safeName}_${profileId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center py-6 px-4 transition-colors duration-300 print:p-0 print:bg-white print:block ${modeClass} ${
        isGradient ? "use-gradient" : ""
      }`}
      style={
        {
          "--accent-color": activeColor,
          "--accent-gradient-end": gradientEnd,
          "--accent-gradient": `linear-gradient(135deg, ${activeColor}, ${gradientEnd})`,
          "--sidebar-bg": sidebarBg,
        } as React.CSSProperties
      }
    >
      <Toggle
        activeView={activeView}
        activeTheme={activeTheme}
        activeType={currentActiveType}
        activeColor={activeColor}
        useGradient={isGradient}
        themeMode={themeMode}
        whiteCard={isWhiteCard}
        isWizardOpen={isWizardOpen}
        isDirty={store.isDirty}
        profiles={customProfilesStore.allProfiles}
        onToggleWizard={() => setIsWizardOpen((prev) => !prev)}
        onOpenWizard={() => setIsWizardOpen(true)}
        onResetPreset={store.resetToPreset}
        onResetEmpty={store.resetToEmpty}
        onCreateFreshProfile={handleCreateFreshProfile}
        onDeleteCustomProfile={handleDeleteCustomProfile}
        onExportProfile={handleExportProfile}
      />

      <div className={`w-full flex-1 flex flex-col justify-start items-center print:block ${isWhiteCard ? "force-light" : "force-dark"}`}>
        {activeView === "ux" ? (
          <UxRichLayout data={store.data} themeId={activeTheme} />
        ) : (
          <AtsLayout data={store.data} themeId={activeTheme} />
        )}
      </div>

      <ResumeWizardDrawer
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        data={store.data}
        isDirty={store.isDirty}
        canUndo={store.canUndo}
        canRedo={store.canRedo}
        onUndo={store.undo}
        onRedo={store.redo}
        onUpdatePersonalInfo={store.updatePersonalInfo}
        onUpdateSummary={store.updateSummary}
        onUpdateContact={store.updateContact}
        onAddWorkExperience={store.addWorkExperience}
        onRemoveWorkExperience={store.removeWorkExperience}
        onUpdateWorkExperience={store.updateWorkExperience}
        onReorderWorkExperience={store.reorderWorkExperience}
        onAddWorkBullet={store.addWorkBullet}
        onRemoveWorkBullet={store.removeWorkBullet}
        onUpdateWorkBullet={store.updateWorkBullet}
        onReorderWorkBullet={store.reorderWorkBullet}
        onAddEducation={store.addEducation}
        onRemoveEducation={store.removeEducation}
        onUpdateEducation={store.updateEducation}
        onReorderEducation={store.reorderEducation}
        onAddSkill={store.addSkill}
        onRemoveSkill={store.removeSkill}
        onUpdateSkill={store.updateSkill}
        onUpdateSectionTitle={store.updateSectionTitle}
        onExportDownload={store.exportToJsonDownload}
        onImportFile={store.importFromJsonFile}
        onResetToPreset={store.resetToPreset}
        onResetToEmpty={store.resetToEmpty}
      />

      {/* Custom Prompt & Confirm Modals */}
      <PromptModal
        isOpen={isNewProfileModalOpen}
        title="New Target Resume Profile"
        description="Enter a name or role title for your new custom resume profile:"
        placeholder="e.g. Lead DevOps Engineer"
        defaultValue="My New Resume"
        confirmLabel="Create Profile"
        onConfirm={handleConfirmCreateProfile}
        onCancel={() => setIsNewProfileModalOpen(false)}
      />

      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="Delete Resume Profile"
        description={`Are you sure you want to delete profile "${deleteTarget?.label}"? This action cannot be undone.`}
        confirmLabel="Delete Profile"
        onConfirm={handleConfirmDeleteProfile}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
