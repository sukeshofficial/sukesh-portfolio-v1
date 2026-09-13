import Countdown from "./Countdown";
import { portfolioConfig } from "../../config/portfolio";

/**
 * ConstructionStatus
 *
 * UNDER CONSTRUCTION
 * Crafting a more immersive portfolio experience.
 * Countdown (Days, Hours, Minutes, Seconds)
 *
 * Uses uc-status-section for height-aware vertical compression.
 */
export default function ConstructionStatus() {
  const { description } = portfolioConfig;

  return (
    <section className="uc-status-section flex flex-col items-center text-center px-4 pb-1 sm:pb-3 lg:mb-2">
      {/* UNDER CONSTRUCTION */}
      <h2 className="uc-status-heading text-[9.5px] xs:text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.30em] xs:tracking-[0.35em] uppercase font-light text-neutral-300">
        Under Construction
      </h2>

      {/* Description */}
      <p className="uc-status-desc mt-1 sm:mt-1.5 text-[8.5px] xs:text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.10em] xs:tracking-[0.12em] font-light text-neutral-400 max-w-[280px] xs:max-w-xs sm:max-w-sm">
        {description}
      </p>

      {/* Live Countdown */}
      <div className="uc-countdown-container">
        <Countdown />
      </div>
    </section>
  );
}