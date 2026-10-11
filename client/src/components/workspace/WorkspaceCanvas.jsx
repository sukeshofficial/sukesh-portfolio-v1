import React, { useState, useEffect } from "react";
import {
  User,
  FolderGit2,
  Briefcase,
  Cpu,
  Award,
  Send,
  Sparkles,
  HelpCircle,
  CheckCircle,
  Compass,
} from "lucide-react";
import { useWorkspace } from "../../context/WorkspaceContext.jsx";
import ModulePlaceholder from "./ModulePlaceholder.jsx";
import PlacedModuleCard from "./PlacedModuleCard.jsx";
import { soundManager } from "../../lib/sound.js";

const ICON_MAP = { User, FolderGit2, Briefcase, Cpu, Award, Send };

const PLACEHOLDER_LABELS = {
  identity: { label: "Identity", action: "Add identity" },
  projects: { label: "Projects", action: "Drop here" },
  experience: { label: "Experience", action: "Place experience" },
  skills: { label: "Skills", action: "Add skills" },
  proof: { label: "Proof", action: "Place achievements" },
  connect: { label: "Connect", action: "Connect with me" },
};

export default function WorkspaceCanvas({ selectedModuleId, onSelectModule }) {
  const {
    modules,
    placements,
    placedCount,
    totalCount,
    placeModule,
    isAutoFitActive,
    enterExplorationMode,
  } = useWorkspace();
  const [dragOverTargetId, setDragOverTargetId] = useState(null);
  const prevPlacedCountRef = React.useRef(placedCount);

  // Play completion sound ONLY on the transition from incomplete to 6 placed modules
  useEffect(() => {
    if (placedCount === totalCount && prevPlacedCountRef.current < totalCount) {
      soundManager.playSound("workspace-complete");
    }
    prevPlacedCountRef.current = placedCount;
  }, [placedCount, totalCount]);

  const handleDropModule = (draggedId, targetId) => {
    setDragOverTargetId(null);
    if (!draggedId || draggedId !== targetId) {
      soundManager.playSound("module-invalid");
      return;
    }
    placeModule(draggedId);
    soundManager.playSound("module-place");
    if (selectedModuleId === draggedId) onSelectModule?.(null);
  };

  const handlePlaceholderSelect = (id) => {
    if (selectedModuleId === id) {
      placeModule(id);
      soundManager.playSound("module-place");
      onSelectModule?.(null);
    } else if (selectedModuleId && selectedModuleId !== id) {
      if (!placements[id]?.isPlaced) {
        onSelectModule?.(id);
        soundManager.playSound("module-pickup");
      }
    } else {
      onSelectModule?.(id);
      soundManager.playSound("module-pickup");
    }
  };

  const handleStartAssembling = () => {
    const nextUnplaced = modules.find((m) => !placements[m.id]?.isPlaced);
    if (nextUnplaced) {
      placeModule(nextUnplaced.id);
      soundManager.playSound("module-place");
    }
  };

  const orderedModules = isAutoFitActive
    ? [...modules].sort((a, b) => {
      const aP = placements[a.id]?.isPlaced ? 0 : 1;
      const bP = placements[b.id]?.isPlaced ? 0 : 1;
      return aP !== bP ? aP - bP : a.order - b.order;
    })
    : modules;

  const isComplete = placedCount === totalCount;

  return (
    <div className="flex-1 min-w-0 bg-[var(--pp-background)] relative px-4 py-5 sm:px-6 sm:py-7 md:px-8 md:py-8 xl:px-12 xl:py-10 flex flex-col transition-all duration-500 overflow-x-hidden">
      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isComplete ? "opacity-[0.012]" : "opacity-[0.025] dark:opacity-[0.04]"
          }`}
        style={{
          backgroundImage: "radial-gradient(var(--pp-text-primary) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Content container with ultra-wide support up to 1920px ── */}
      <div className="w-full max-w-[1920px] mx-auto flex-1 flex flex-col min-w-0">
        {/* ── Hero banner — centered, responsive spacing ── */}
        <div className="relative z-10 w-full flex flex-col gap-y-1 items-center text-center pt-2 pb-6 sm:pt-4 sm:pb-8 md:pt-6 md:pb-10 xl:pt-8 xl:pb-10">
          {/* Status badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-semibold tracking-wide mb-3 sm:mb-4 transition-all duration-300 ${isComplete
              ? "bg-[var(--pp-success)]/10 border-[var(--pp-success)]/30 text-[var(--pp-success)]"
              : "bg-[var(--pp-surface-secondary)] border-[var(--pp-border)] text-[var(--pp-text-secondary)]"
              }`}
          >
            {isComplete ? (
              <CheckCircle className="w-3.5 h-3.5 text-[var(--pp-success)]" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-[var(--pp-primary)]" />
            )}
            <span>
              {isComplete
                ? "Workspace Fully Assembled"
                : isAutoFitActive
                  ? "Auto Fit Layout Active"
                  : "Interactive Workspace"}
            </span>
          </div>

          {/* Heading with clamp typography to prevent dominating on mobile */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--pp-text-primary)] leading-tight max-w-xl px-2">
            {isComplete
              ? "Congratulations! Portfolio Built."
              : "Welcome to my workspace."}
          </h1>

          {/* Subtitle */}
          <p className="mt-1.5 sm:mt-2.5 text-xs sm:text-sm text-[var(--pp-text-muted)] font-normal max-w-sm px-4">
            {isComplete
              ? "All six modules placed. Explore the full portfolio below."
              : "It's empty for now. Help me build it."}
          </p>

          {/* CTA */}
          <div className="!mt-2 sm:mt-5 md:mt-6">
            {!isComplete ? (
              <button
                onClick={handleStartAssembling}
                type="button"
                className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[var(--pp-btn-primary-bg)] hover:bg-[var(--pp-btn-primary-hover)] text-[var(--pp-btn-primary-text)] font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pp-primary)]"
              >
                {placedCount === 0 ? "Start assembling" : "Place next module"}
              </button>
            ) : (
              <button
                onClick={enterExplorationMode}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[var(--pp-btn-primary-bg)] hover:bg-[var(--pp-btn-primary-hover)] text-[var(--pp-btn-primary-text)] font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pp-primary)]"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Full Portfolio</span>
              </button>
            )}
          </div>
        </div>

        {/* ── 6-module grid: 1 col on mobile (<640px), 2 cols on tablet/compact (640-1199px), 3 equal cols on desktop (>=1200px) ── */}
        <div className="relative z-10 w-full min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:[grid-template-columns:repeat(3,minmax(0,1fr))] gap-4 sm:gap-5 md:gap-6">
            {orderedModules.map((mod) => {
              const isPlaced = placements[mod.id]?.isPlaced;
              const isSelected = selectedModuleId === mod.id;
              const config = PLACEHOLDER_LABELS[mod.id] || {
                label: mod.label,
                action: `Place ${mod.label.toLowerCase()}`,
              };
              const IconComp = ICON_MAP[mod.icon] || HelpCircle;

              if (isPlaced) {
                return <PlacedModuleCard key={mod.id} module={mod} />;
              }

              return (
                <ModulePlaceholder
                  key={mod.id}
                  id={mod.id}
                  label={config.label}
                  actionText={config.action}
                  icon={IconComp}
                  isPlaced={isPlaced}
                  isSelected={isSelected}
                  isDragOverTarget={dragOverTargetId === mod.id}
                  onDragOverTarget={(id) => setDragOverTargetId(id)}
                  onDragLeaveTarget={() => setDragOverTargetId(null)}
                  onDropModule={handleDropModule}
                  onSelect={() => handlePlaceholderSelect(mod.id)}
                />
              );
            })}
          </div>
        </div>

        {/* ── Canvas footer ── */}
        <div className="relative z-10 mt-auto pt-6 sm:pt-8 pb-2 border-t border-[var(--pp-border)]/50 text-center">
          <p className="text-[11px] text-[var(--pp-text-muted)]">
            {placedCount} of {totalCount} modules placed &nbsp;·&nbsp; Drag from tray or tap to place
          </p>
        </div>
      </div>
    </div>
  );
}
