import { useCountdown } from "../../hooks/useCountdown";
import { portfolioConfig } from "../../config/portfolio";

const UNITS = [
  { key: "days", label: "DAYS" },
  { key: "hours", label: "HOURS" },
  { key: "minutes", label: "MINUTES" },
  { key: "seconds", label: "SECONDS" },
];

function pad(n) {
  return String(n).padStart(2, "0");
}

/**
 * Countdown
 * Displays live countdown calculated by useCountdown hook.
 * Formatted as: 48 | 13 | 31 | 44
 * DAYS  HOURS  MINUTES  SECONDS
 *
 * Uses fluid gaps to ensure zero horizontal wrapping even on 320px width viewports.
 */
export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(portfolioConfig.launchDate);
  const values = { days, hours, minutes, seconds };

  return (
    <div
      className="flex items-end justify-center gap-1.5 xs:gap-2.5 sm:gap-4 md:gap-5 mt-3 sm:mt-4 md:mt-5"
      aria-label="Countdown to launch"
      role="timer"
    >
      {UNITS.map(({ key, label }, idx) => {
        const isLast = idx === UNITS.length - 1;
        return (
          <div key={key} className="flex items-end gap-1.5 xs:gap-2.5 sm:gap-4 md:gap-5">
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
              {/* Number */}
              <span className="uc-tabnum font-extralight leading-none text-white text-[1.25rem] xs:text-[1.4rem] sm:text-[1.8rem] md:text-[2.2rem] tracking-tight">
                {pad(values[key])}
              </span>
              {/* Label */}
              <span className="text-[6.5px] xs:text-[7px] sm:text-[8px] tracking-[0.18em] xs:tracking-[0.22em] uppercase text-neutral-400 font-light">
                {label}
              </span>
            </div>

            {!isLast && (
              <span
                className="pb-2 sm:pb-3 text-[10px] sm:text-xs md:text-sm font-thin text-neutral-500 select-none"
                aria-hidden="true"
              >
                |
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}