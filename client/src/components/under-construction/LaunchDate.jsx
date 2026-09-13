import { portfolioConfig } from "../../config/portfolio";

/**
 * LaunchDate
 * Displays expected launch date from portfolioConfig.
 *
 * UNTIL
 * NOV 01, 2026
 */
export default function LaunchDate() {
  const { launchLabel } = portfolioConfig;

  return (
    <div className="flex flex-col gap-1.5 sm:items-end" aria-label="Expected launch date">
      {/* Short divider */}
      <span
        className="block w-5 h-px bg-neutral-600"
        aria-hidden="true"
      />

      {/* UNTIL */}
      <span className="text-[7px] sm:text-[8px] tracking-[0.22em] uppercase font-light text-neutral-400">
        UNTIL
      </span>

      {/* NOV 01, 2026 */}
      <span className="text-[9px] sm:text-[10px] tracking-[0.18em] uppercase font-light text-neutral-300">
        {launchLabel}
      </span>
    </div>
  );
}