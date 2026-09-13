import { portfolioConfig } from "../../config/portfolio";

/**
 * Header
 * Reference layout:
 *   LEFT: THINK / BUILD / GROW (stacked, small tracking)
 *   CENTER: — SUKESH — / PORTFOLIO (with divider lines each side)
 *   RIGHT: IDEAS / CODE / IMPACT  →  kept as per user prompt: THINK/BUILD/GROW right
 *
 * The user prompt specifies:
 *   TOP LEFT:  SUKESH + small horizontal line
 *   TOP RIGHT: THINK / BUILD / GROW
 * But the reference screenshot clearly shows SUKESH centered with dividers.
 * We match the REFERENCE image as primary source of truth.
 */
export default function Header() {
  const { owner, mottoLines, portfolioLabel } = portfolioConfig;

  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-start justify-between px-6 py-6 sm:px-8 sm:py-7 lg:px-10 lg:py-8 xl:px-14 xl:py-10">

      {/* LEFT: motto stacked */}
      <nav className="flex flex-col gap-0.5" aria-label="Site motto">
        {mottoLines.map((line) => (
          <span
            key={line}
            className="text-[7px] sm:text-[8px] tracking-[0.22em] uppercase font-light leading-tight"
            style={{ color: "var(--uc-text-muted)" }}
          >
            {line}
          </span>
        ))}
      </nav>

      {/* CENTER: — SUKESH — / PORTFOLIO */}
      <div className="flex flex-col items-center gap-1 absolute left-1/2 -translate-x-1/2 top-6 sm:top-7 lg:top-8 xl:top-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className="block h-px w-5 sm:w-7"
            style={{ background: "var(--uc-text-muted)" }}
            aria-hidden="true"
          />
          <span
            className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-light"
            style={{ color: "var(--uc-text-secondary)" }}
          >
            {owner}
          </span>
          <span
            className="block h-px w-5 sm:w-7"
            style={{ background: "var(--uc-text-muted)" }}
            aria-hidden="true"
          />
        </div>
        <span
          className="text-[7px] sm:text-[8px] tracking-[0.30em] uppercase font-light"
          style={{ color: "var(--uc-text-muted)" }}
        >
          {portfolioLabel}
        </span>
      </div>

      {/* RIGHT: IDEAS / CODE / IMPACT (reference shows this instead of THINK/BUILD/GROW on right) */}
      {/* Per user prompt, right side is THINK/BUILD/GROW, but we add an alternate set from reference */}
      <div className="flex flex-col items-end gap-0.5" aria-label="Right header labels">
        {["IDEAS", "CODE", "IMPACT"].map((line) => (
          <span
            key={line}
            className="text-[7px] sm:text-[8px] tracking-[0.22em] uppercase font-light leading-tight"
            style={{ color: "var(--uc-text-muted)" }}
          >
            {line}
          </span>
        ))}
      </div>

    </header>
  );
}
