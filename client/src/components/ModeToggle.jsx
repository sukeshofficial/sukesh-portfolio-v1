import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ModeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative group inline-block">
      <button
        onClick={toggleTheme}
        type="button"
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        aria-pressed={isDark}
        className={`relative inline-flex items-center justify-between p-1 rounded-full min-w-[4.5rem] w-20 max-w-full h-8 cursor-pointer select-none transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pp-primary)]/60 ${isDark
          ? "bg-[var(--pp-surface)]/70 backdrop-blur-md border border-[var(--pp-border)]/60 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.06)] text-[var(--pp-text-muted)]"
          : "bg-[var(--pp-surface-secondary)] border border-[var(--pp-border)] shadow-[inset_3px_3px_6px_#dddde3,inset_-3px_-3px_6px_#ffffff] text-[var(--pp-text-muted)]"
          } ${className}`}
      >
        <span className="sr-only">Toggle theme</span>

        {/* Static Background Icons for visual context */}
        <div className="flex justify-between items-center w-full px-1.5 z-0 pointer-events-none">
          <Sun
            className={`w-3.5 h-3.5 transition-all duration-300 ${isDark
              ? "opacity-30 text-[var(--pp-text-muted)] scale-90"
              : "opacity-0 scale-75"
              }`}
          />
          <Moon
            className={`w-3.5 h-3.5 transition-all duration-300 ${isDark
              ? "opacity-0 scale-75"
              : "opacity-35 text-[var(--pp-text-muted)] scale-90"
              }`}
          />
        </div>

        {/* Dynamic Responsive Sliding Orb Button */}
        <span
          className={`absolute top-1 w-6 h-6 rounded-full transform transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-active:scale-90 flex items-center justify-center pointer-events-none ${isDark
            ? "left-[calc(100%-1.75rem)] bg-gradient-to-br from-[var(--pp-primary-subtle)]/90 via-[var(--pp-surface)]/95 to-[var(--pp-surface)]/90 border border-[var(--pp-primary)]/30 shadow-[0_0_14px_var(--pp-glow),inset_0_1px_2px_rgba(255,255,255,0.1)]"
            : "left-1 bg-gradient-to-br from-white via-[#f8fafc] to-[#e2e8f0] border border-white/80 shadow-[3px_3px_6px_rgba(163,177,198,0.55),-2px_-2px_5px_rgba(255,255,255,0.95)]"
            }`}
        >
          {/* Active Sun Icon */}
          <Sun
            className={`w-3.5 h-3.5 text-amber-500 fill-amber-400/30 drop-shadow-[0_1px_3px_rgba(245,158,11,0.4)] transition-all duration-500 ease-out absolute ${isDark
              ? "opacity-0 scale-50 rotate-90"
              : "opacity-100 scale-100 rotate-0"
              }`}
          />

          {/* Active Moon Icon */}
          <Moon
            className={`w-3.5 h-3.5 text-[var(--pp-primary-soft)] fill-[var(--pp-primary-soft)]/30 drop-shadow-[0_0_6px_var(--pp-glow)] transition-all duration-500 ease-out absolute ${isDark
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 -rotate-90"
              }`}
          />
        </span>
      </button>

      {/* Tooltip */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 text-[11px] font-medium text-[var(--pp-text-primary)] bg-[var(--pp-surface)]/90 backdrop-blur-md rounded-md border border-[var(--pp-border)] shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 flex items-center gap-1.5">
        <span>Toggle Theme</span>
        <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-[var(--pp-text-muted)] bg-[var(--pp-surface-secondary)] border border-[var(--pp-border)] rounded">
          D
        </kbd>
      </div>
    </div>
  );
}

