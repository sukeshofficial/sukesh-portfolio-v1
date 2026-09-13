import { useState, useEffect } from "react";

/**
 * useCurrentTime
 * Returns formatted { time, date } strings based on browser local time.
 * Updates every second. Cleans up on unmount.
 */
export function useCurrentTime(timeFormat, dateFormat) {
  const getFormatted = () => {
    const now = new Date();
    return {
      time: now.toLocaleTimeString("en-US", timeFormat),
      date: now.toLocaleDateString("en-US", dateFormat).toUpperCase(),
    };
  };

  const [formatted, setFormatted] = useState(getFormatted);

  useEffect(() => {
    const id = setInterval(() => setFormatted(getFormatted()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return formatted;
}
