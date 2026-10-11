import React from "react";
import { Plus, CheckCircle2 } from "lucide-react";

export default function ModulePlaceholder({
  id,
  label,
  actionText,
  icon: IconComponent,
  isPlaced,
  isSelected,
  onSelect,
  onDropModule,
  isDragOverTarget,
  onDragOverTarget,
  onDragLeaveTarget,
}) {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    onDragOverTarget?.(id);
  };
  const handleDragLeave = (e) => { e.preventDefault(); onDragLeaveTarget?.(id); };
  const handleDrop = (e) => {
    e.preventDefault();
    onDropModule?.(e.dataTransfer.getData("text/plain"), id);
  };

  const active = isDragOverTarget || isSelected;

  return (
    <div
      onClick={onSelect}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      aria-label={`${label} placement slot${isSelected ? " — tap to place" : ""}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.();
        }
      }}
      className={`group relative flex flex-col items-center justify-center gap-2 sm:gap-2.5 p-3.5 sm:p-4 md:p-5 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer select-none min-h-[130px] sm:min-h-[150px] md:min-h-[160px] text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pp-primary)] focus-visible:ring-offset-2 ${isDragOverTarget
          ? "bg-[var(--pp-primary-subtle)] border-[var(--pp-primary)] shadow-md scale-[1.015]"
          : isSelected
            ? "bg-[var(--pp-surface-secondary)] border-[var(--pp-primary)] shadow-sm scale-[1.01]"
            : "bg-[var(--pp-surface)]/50 hover:bg-[var(--pp-surface-secondary)]/60 border-[var(--pp-border)] hover:border-[var(--pp-text-muted)]/40"
        }`}
    >
      {/* Icon */}
      <div
        className={`p-2 sm:p-2.5 md:p-3 rounded-full transition-transform duration-200 group-hover:scale-105 ${active
            ? "bg-[var(--pp-primary)] text-[var(--pp-btn-primary-text)]"
            : "bg-[var(--pp-surface-secondary)] border border-[var(--pp-border)] text-[var(--pp-text-muted)] group-hover:text-[var(--pp-text-primary)]"
          }`}
      >
        {IconComponent ? (
          <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
        ) : (
          <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
        )}
      </div>

      {/* Label */}
      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-[var(--pp-text-primary)]">
        {label}
      </span>

      {/* Hint */}
      <span className="text-[10px] sm:text-[11px] font-medium text-[var(--pp-text-muted)] group-hover:text-[var(--pp-text-secondary)] transition-colors leading-snug">
        {isSelected ? "Tap to place here" : actionText}
      </span>

      {/* Corner category tag */}
      <span className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 text-[8px] sm:text-[9px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded bg-[var(--pp-surface-secondary)] border border-[var(--pp-border)] text-[var(--pp-text-muted)] flex items-center gap-1">
        {isDragOverTarget && <CheckCircle2 className="w-2.5 h-2.5 text-[var(--pp-primary)]" />}
        {id}
      </span>
    </div>
  );
}
