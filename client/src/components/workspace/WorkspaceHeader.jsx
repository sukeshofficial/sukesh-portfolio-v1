import React, { useState } from "react";
import { RotateCcw, Compass, LayoutGrid, Volume2, VolumeX } from "lucide-react";
import ModeToggle from "../ModeToggle.jsx";
import WorkspaceProgress from "./WorkspaceProgress.jsx";
import { useWorkspace } from "../../context/WorkspaceContext.jsx";
import { soundManager } from "../../lib/sound.js";

export default function WorkspaceHeader() {
  const {
    resetWorkspace,
    enterExplorationMode,
    autoFitWorkspace,
    isAutoFitActive,
    placedCount,
    totalCount,
  } = useWorkspace();

  const [isMuted, setIsMuted] = useState(soundManager.isMuted);

  const handleToggleSound = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) soundManager.playSound("module-pickup");
  };

  const handleAutoFit = () => {
    autoFitWorkspace();
    soundManager.playSound("autofit-align");
  };

  const handleReset = () => {
    resetWorkspace();
    soundManager.playSound("module-invalid");
  };

  // Shared button size classes for consistent 36px height controls
  const iconBtn =
    "h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-lg border border-[var(--pp-border)] bg-[var(--pp-surface-secondary)] text-[var(--pp-text-secondary)] hover:text-[var(--pp-text-primary)] hover:bg-[var(--pp-surface)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pp-primary)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <header className="w-full border-b border-[var(--pp-border)] bg-[var(--pp-surface)]/90 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
      {/* 
        DESKTOP & TABLET VIEW (min-width: 601px):
        - Desktop (>=1024px): Exact preserved layout with wordmark & badge, progress bar, controls, and theme toggle.
        - Tablet (601px - 1023px): Single compact row, adjusted gaps, no clipping.
      */}
      <div className="hidden sm:flex h-14 px-4 md:px-6 w-full items-center justify-between gap-3">
        {/* Brand & Badge */}
        <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
          <span className="text-lg font-bold tracking-tight text-[var(--pp-text-primary)] select-none">
            Sukesh<span className="text-[var(--pp-primary-soft)]">.</span>
          </span>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--pp-surface-secondary)] border border-[var(--pp-border)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-medium text-[var(--pp-text-secondary)]">
              Workspace Active
            </span>
          </div>
        </div>

        {/* Progress Bar (Desktop & Tablet) */}
        <div className="flex items-center flex-1 max-w-xs mx-2 lg:mx-4 min-w-0 justify-end lg:justify-center">
          <WorkspaceProgress />
        </div>

        {/* Toolbar Action Controls & Theme Toggle */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            type="button"
            aria-label={isMuted ? "Unmute workspace sounds" : "Mute workspace sounds"}
            title={isMuted ? "Sound off — click to enable" : "Sound on — click to mute"}
            className={iconBtn}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[var(--pp-primary)]" />
            )}
          </button>

          {/* Auto Fit Layout */}
          <button
            onClick={handleAutoFit}
            disabled={placedCount === 0}
            type="button"
            aria-label="Auto fit layout"
            title="Auto fit: group placed modules"
            className={`h-9 px-3 flex items-center gap-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pp-primary)] disabled:opacity-40 disabled:cursor-not-allowed ${isAutoFitActive
              ? "bg-[var(--pp-primary)] text-[var(--pp-btn-primary-text)] border-transparent shadow-sm"
              : "bg-[var(--pp-surface-secondary)] hover:bg-[var(--pp-surface)] border-[var(--pp-border)] text-[var(--pp-text-primary)]"
              }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Auto Fit</span>
          </button>

          {/* Reset Placements */}
          <button
            onClick={handleReset}
            disabled={placedCount === 0}
            type="button"
            aria-label="Reset workspace"
            title="Reset all placements"
            className={iconBtn}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Explore Directly */}
          <button
            onClick={enterExplorationMode}
            type="button"
            aria-label="Explore portfolio directly"
            title="Skip workspace and explore complete portfolio directly"
            className="h-9 px-3 flex items-center gap-1.5 rounded-lg border border-[var(--pp-border)] bg-[var(--pp-surface-secondary)] hover:bg-[var(--pp-surface)] text-[var(--pp-text-primary)] text-xs font-semibold transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pp-primary)]"
          >
            <Compass className="w-3.5 h-3.5 text-[var(--pp-primary)]" />
            <span>Explore directly</span>
          </button>

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>

      {/* 
        MOBILE VIEW (max-width: 600px):
        Responsive Two-Row Layout:
        Row 1: Brand Wordmark (Left) + ModeToggle (Right)
        Row 2: Dedicated Balanced Toolbar (Sound, AutoFit, Reset, Explore)
      */}
      <div className="flex sm:hidden flex-col w-full divide-y divide-[var(--pp-border)]/60">
        {/* Row 1: Wordmark & Theme Toggle */}
        <div className="h-13 px-4 w-full flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight text-[var(--pp-text-primary)] select-none">
            Sukesh<span className="text-[var(--pp-primary-soft)]">.</span>
          </span>
          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>

        {/* Row 2: Compact, balanced action toolbar (40-42px touch-friendly height) */}
        <div className="px-3 py-2 w-full flex items-center justify-between gap-2 bg-[var(--pp-surface-secondary)]/30">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            type="button"
            aria-label={isMuted ? "Unmute workspace sounds" : "Mute workspace sounds"}
            title={isMuted ? "Sound off — click to enable" : "Sound on — click to mute"}
            className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl border border-[var(--pp-border)] bg-[var(--pp-surface)] text-[var(--pp-text-secondary)] hover:text-[var(--pp-text-primary)] transition-all shadow-xs active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pp-primary)] cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4 text-[var(--pp-primary)]" />
            )}
          </button>

          {/* Auto Fit Layout */}
          <button
            onClick={handleAutoFit}
            disabled={placedCount === 0}
            type="button"
            aria-label="Auto fit layout"
            title="Auto fit: group placed modules"
            className={`h-10 flex-1 min-w-0 max-w-[120px] px-2 flex items-center justify-center gap-1.5 rounded-xl border text-xs font-semibold transition-all shadow-xs active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pp-primary)] disabled:opacity-40 disabled:cursor-not-allowed ${isAutoFitActive
              ? "bg-[var(--pp-primary)] text-[var(--pp-btn-primary-text)] border-transparent shadow-sm"
              : "bg-[var(--pp-surface)] hover:bg-[var(--pp-surface-secondary)] border-[var(--pp-border)] text-[var(--pp-text-primary)]"
              }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Auto Fit</span>
          </button>

          {/* Reset Placements */}
          <button
            onClick={handleReset}
            disabled={placedCount === 0}
            type="button"
            aria-label="Reset workspace"
            title="Reset all placements"
            className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl border border-[var(--pp-border)] bg-[var(--pp-surface)] text-[var(--pp-text-secondary)] hover:text-[var(--pp-text-primary)] transition-all shadow-xs active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pp-primary)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Explore Directly */}
          <button
            onClick={enterExplorationMode}
            type="button"
            aria-label="Explore portfolio directly"
            title="Skip workspace and explore complete portfolio directly"
            className="h-10 flex-1 min-w-0 px-3 flex items-center justify-center gap-1.5 rounded-xl border border-[var(--pp-border)] bg-[var(--pp-surface)] hover:bg-[var(--pp-surface-secondary)] text-[var(--pp-text-primary)] text-xs font-semibold transition-all shadow-xs active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pp-primary)]"
          >
            <Compass className="w-4 h-4 text-[var(--pp-primary)] shrink-0" />
            <span className="truncate">Explore</span>
          </button>
        </div>
      </div>
    </header>
  );
}
