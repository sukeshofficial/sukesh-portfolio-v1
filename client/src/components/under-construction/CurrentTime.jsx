import { useCurrentTime } from "../../hooks/useCurrentTime";
import { portfolioConfig } from "../../config/portfolio";

/**
 * CurrentTime
 * Displays user's live browser local time and date.
 * Example:
 *   10:28 AM
 *   SUN, SEP 13, 2026
 */
export default function CurrentTime() {
  const { time, date } = useCurrentTime(
    portfolioConfig.timeFormat.time,
    portfolioConfig.timeFormat.date
  );

  const timeMatch = time.match(/^(.*?)\s?(AM|PM)$/i);
  const mainTime = timeMatch ? timeMatch[1] : time;
  const ampm = timeMatch ? timeMatch[2] : "";

  return (
    <div className="flex flex-col gap-1" aria-label="Current local time">
      {/* Time: 10:28 AM */}
      <div className="flex items-baseline gap-1.5">
        <span className="uc-tabnum font-extralight text-white leading-none text-[1.5rem] sm:text-[1.8rem] md:text-[2.2rem] tracking-tight">
          {mainTime}
        </span>
        {ampm && (
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-light text-neutral-300">
            {ampm}
          </span>
        )}
      </div>

      {/* Date: SUN, SEP 13, 2026 */}
      <span className="text-[8px] sm:text-[9px] tracking-[0.20em] uppercase font-light text-neutral-400">
        {date}
      </span>
    </div>
  );
}