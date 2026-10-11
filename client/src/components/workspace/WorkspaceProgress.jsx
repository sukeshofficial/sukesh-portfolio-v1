import React from "react";
import { Progress } from "../ui/progress";
import { useWorkspace } from "../../context/WorkspaceContext.jsx";

const PROGRESS_MESSAGES = {
  0: "It's empty for now.",
  1: "First module placed.",
  2: "Taking shape.",
  3: "Halfway assembled.",
  4: "Almost there.",
  5: "One final piece left.",
  6: "Workspace assembled.",
};

export default function WorkspaceProgress({ compact = false }) {
  const { placedCount, totalCount } = useWorkspace();
  const percentage = Math.round((placedCount / totalCount) * 100);
  const message = PROGRESS_MESSAGES[placedCount] || "Assembling...";

  if (compact) {
    return (
      <div className="w-full flex items-center gap-2">
        <Progress value={percentage} className="w-full bg-[var(--pp-border)]" />
        <span className="text-[10px] font-mono text-[var(--pp-text-muted)] shrink-0">
          {percentage}%
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex flex-col items-end">
        <span className="text-[11px] font-semibold text-[var(--pp-text-primary)]">
          {placedCount} of {totalCount} Modules
        </span>
        <span className="text-[10px] text-[var(--pp-text-muted)] font-mono">
          {message} ({percentage}%)
        </span>
      </div>
      <div className="w-20 sm:w-24">
        <Progress value={percentage} className="bg-[var(--pp-border)] rounded-full" />
      </div>
    </div>
  );
}
