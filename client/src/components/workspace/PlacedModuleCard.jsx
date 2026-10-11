import React from "react";
import {
  User, FolderGit2, Briefcase, Cpu, Award, Send, X, CheckCircle2,
} from "lucide-react";
import { useWorkspace } from "../../context/WorkspaceContext.jsx";
import { portfolioData } from "../../config/portfolioData.js";

const ICON_MAP = { User, FolderGit2, Briefcase, Cpu, Award, Send };

export default function PlacedModuleCard({ module }) {
  const { removeModule } = useWorkspace();
  const IconComponent = ICON_MAP[module.icon] || CheckCircle2;

  return (
    <div className="relative group p-3.5 sm:p-4 md:p-5 rounded-2xl border border-[var(--pp-border)] bg-[var(--pp-surface)] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col min-h-[130px] sm:min-h-[150px] md:min-h-[160px]">
      {/* Top row: icon + label + remove */}
      <div className="flex items-start justify-between gap-3 mb-2.5 sm:mb-3">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="flex-shrink-0 p-1.5 sm:p-2 rounded-xl bg-[var(--pp-primary-subtle)] text-[var(--pp-primary)]">
            <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--pp-text-primary)] truncate">
              {module.label}
            </h3>
            <span className="text-[9px] sm:text-[10px] text-[var(--pp-success)] font-medium flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3 flex-shrink-0" /> Placed
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            removeModule(module.id);
          }}
          type="button"
          aria-label={`Remove ${module.label} module`}
          title={`Remove ${module.label}`}
          className="flex-shrink-0 p-1 sm:p-1.5 rounded-lg border border-[var(--pp-border)] bg-[var(--pp-surface-secondary)] text-[var(--pp-text-muted)] hover:text-[var(--pp-error)] hover:border-[var(--pp-error)]/40 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pp-primary)] opacity-70 group-hover:opacity-100"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content preview */}
      <div className="flex-1 text-xs text-[var(--pp-text-secondary)] leading-relaxed">
        {module.id === "identity" && (
          <p className="font-medium text-[var(--pp-text-primary)]">
            {portfolioData.identity.name} — {portfolioData.identity.title}
          </p>
        )}
        {module.id === "skills" && (
          <div className="flex flex-wrap gap-1">
            {portfolioData.skills.frontend.map((s) => (
              <span
                key={s}
                className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--pp-surface-secondary)] border border-[var(--pp-border)]"
              >
                {s}
              </span>
            ))}
          </div>
        )}
        {module.id !== "identity" && module.id !== "skills" && (
          <p className="text-[11px] text-[var(--pp-text-muted)] leading-snug">
            {module.description}
          </p>
        )}
      </div>

      {/* Footer meta */}
      <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-[var(--pp-border)]/50 flex justify-between items-center text-[9px] sm:text-[10px] text-[var(--pp-text-muted)] font-mono">
        <span>ID: {module.id}</span>
        <span>#{module.order}</span>
      </div>
    </div>
  );
}
