import React from "react";
import {
  User, FolderGit2, Briefcase, Cpu, Award, Send, HelpCircle, GripVertical,
} from "lucide-react";
import { useWorkspace } from "../../context/WorkspaceContext.jsx";
import { soundManager } from "../../lib/sound.js";

const ICON_MAP = { User, FolderGit2, Briefcase, Cpu, Award, Send };

export default function ComponentTray({ selectedModuleId, onSelectModule }) {
  const { modules, placements, placedCount, totalCount } = useWorkspace();

  const handleDragStart = (e, moduleId) => {
    e.dataTransfer.setData("text/plain", moduleId);
    e.dataTransfer.effectAllowed = "move";
    soundManager.playSound("module-pickup");
  };

  return (
    <aside className="w-full xl:w-72 2xl:w-80 flex-shrink-0 flex flex-col bg-[var(--pp-surface)]/70 backdrop-blur-md border-b xl:border-b-0 xl:border-r border-[var(--pp-border)] transition-colors duration-300">
      {/* Tray header */}
      <div className="px-4 py-2.5 sm:py-3 border-b border-[var(--pp-border)] flex items-center justify-between flex-shrink-0">
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--pp-text-secondary)]">
            Component Tray
          </h2>
          <p className="text-[10px] text-[var(--pp-text-muted)] mt-0.5">
            Drag or tap to place
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--pp-surface-secondary)] border border-[var(--pp-border)] text-[var(--pp-text-secondary)]">
          {placedCount}/{totalCount}
        </span>
      </div>

      {/* Module list — responsive horizontal scroll strip on mobile & tablet, vertical column on desktop */}
      <div className="flex-1 overflow-x-auto xl:overflow-y-auto xl:overflow-x-hidden p-2.5 sm:p-3 flex xl:flex-col gap-2.5 sm:gap-3 scrollbar-thin scroll-smooth snap-x sm:snap-none">
        {modules.map((module) => {
          const IconComponent = ICON_MAP[module.icon] || HelpCircle;
          const isPlaced = placements[module.id]?.isPlaced;
          const isSelected = selectedModuleId === module.id;

          return (
            <div
              key={module.id}
              draggable={!isPlaced}
              onDragStart={(e) => handleDragStart(e, module.id)}
              onClick={() => {
                if (!isPlaced) {
                  onSelectModule?.(module.id);
                  soundManager.playSound("module-pickup");
                }
              }}
              role="button"
              tabIndex={isPlaced ? -1 : 0}
              aria-label={`${module.label} module — ${isPlaced ? "placed" : "drag or tap to place"}`}
              onKeyDown={(e) => {
                if (!isPlaced && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  onSelectModule?.(module.id);
                }
              }}
              className={`w-[82vw] max-w-[280px] sm:w-64 sm:max-w-none xl:w-full flex-shrink-0 snap-start text-left p-3 rounded-xl border transition-all duration-200 group select-none ${isPlaced
                  ? "bg-transparent border-[var(--pp-border)]/40 opacity-50 cursor-not-allowed"
                  : isSelected
                    ? "bg-[var(--pp-surface-secondary)] border-[var(--pp-primary)] shadow-sm ring-1 ring-[var(--pp-primary)]/25 cursor-grab"
                    : "bg-[var(--pp-surface)]/80 hover:bg-[var(--pp-surface-secondary)]/60 border-[var(--pp-border)] cursor-grab active:cursor-grabbing hover:border-[var(--pp-text-muted)]/30"
                }`}
            >
              <div className="flex items-center gap-2.5">
                {!isPlaced && (
                  <GripVertical className="w-3.5 h-3.5 text-[var(--pp-text-muted)] flex-shrink-0 opacity-30 group-hover:opacity-70 transition-opacity hidden sm:block" />
                )}
                {isPlaced && <div className="w-3.5 hidden sm:block" />}

                <div
                  className={`flex-shrink-0 p-1.5 sm:p-2 rounded-lg border transition-colors ${isPlaced
                      ? "bg-[var(--pp-surface-secondary)] border-[var(--pp-border)] text-[var(--pp-text-muted)]"
                      : "bg-[var(--pp-primary-subtle)] border-[var(--pp-primary)]/20 text-[var(--pp-primary)]"
                    }`}
                >
                  <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[var(--pp-text-primary)] truncate">
                      {module.label}
                    </span>
                    <span
                      className={`text-[10px] font-medium flex-shrink-0 ${isPlaced ? "text-[var(--pp-success)]" : "text-[var(--pp-text-muted)]"
                        }`}
                    >
                      {isPlaced ? "✓" : "Drag / Tap"}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--pp-text-muted)] mt-0.5 leading-snug line-clamp-2">
                    {module.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tray footer */}
      <div className="px-4 py-3 border-t border-[var(--pp-border)] text-[10px] text-[var(--pp-text-muted)] text-center hidden xl:block">
        Drag modules onto canvas slots
      </div>
    </aside>
  );
}
