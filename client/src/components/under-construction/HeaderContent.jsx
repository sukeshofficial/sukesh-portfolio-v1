import { portfolioConfig } from "../../config/portfolio";

/**
 * HeaderContent
 * Layer 2 — HTML Header Content
 *
 * TOP LEFT:
 *   THINK
 *   BUILD
 *   GROW
 *
 * TOP CENTER:
 *   — SUKESH —
 *   PORTFOLIO
 *
 * TOP RIGHT:
 *   IDEAS
 *   CODE
 *   IMPACT
 *
 * Uses fluid padding to prevent collision on narrow 320px screens.
 */
export default function HeaderContent() {
  const { owner, mottoLeft, mottoRight, portfolioLabel } = portfolioConfig;

  return (
    <header className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-3 xs:px-4 sm:px-8 lg:px-12 py-3 sm:py-6 lg:py-8">

      {/* TOP LEFT: THINK / BUILD / GROW */}
      <div className="flex flex-col gap-0.5" aria-label="Motto Left">
        {mottoLeft.map((word) => (
          <span
            key={word}
            className="text-[6.5px] xs:text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.20em] xs:tracking-[0.25em] uppercase font-light leading-tight text-neutral-400"
          >
            {word}
          </span>
        ))}
      </div>

      {/* TOP CENTER: — SUKESH — / PORTFOLIO */}
      <div className="flex flex-col items-center gap-0.5 sm:gap-1 absolute left-1/2 -translate-x-1/2 top-3 sm:top-6 lg:top-8">
        <div className="flex items-center gap-1.5 sm:gap-3">
          <span
            className="block h-px w-3 sm:w-6 bg-neutral-600"
            aria-hidden="true"
          />
          <span className="text-[9px] xs:text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.28em] xs:tracking-[0.35em] uppercase font-light text-neutral-200 whitespace-nowrap">
            {owner}
          </span>
          <span
            className="block h-px w-3 sm:w-6 bg-neutral-600"
            aria-hidden="true"
          />
        </div>
        <span className="text-[6.5px] xs:text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.25em] xs:tracking-[0.30em] uppercase font-light text-neutral-400">
          {portfolioLabel}
        </span>
      </div>

      {/* TOP RIGHT: IDEAS / CODE / IMPACT */}
      <div className="flex flex-col items-end gap-0.5" aria-label="Motto Right">
        {mottoRight.map((word) => (
          <span
            key={word}
            className="text-[6.5px] xs:text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.20em] xs:tracking-[0.25em] uppercase font-light leading-tight text-neutral-400"
          >
            {word}
          </span>
        ))}
      </div>

    </header>
  );
}
