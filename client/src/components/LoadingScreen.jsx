import { useEffect, useRef, useState } from "react";
import { Progress } from "./ui/progress";

const EXIT_MS = 500;
const HOLD_MS = 1200;

const LOADING_CSS = `
  .loading-canvas {
    background: var(--pp-background, #ffffff);
    color: var(--pp-text-primary, #171717);
    font-family:
      Inter,
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
  }

  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transform: translateY(-4px);
  }

  .loading-wordmark {
    margin: 0;
    padding: 0;
    line-height: 1.1;
    letter-spacing: -0.065em;
  }

  .loading-caption {
    margin: 20px 0 0;
    color: var(--pp-text-muted, #737373);
    font-size: 10px;
    font-weight: 400;
    line-height: 1.6;
    letter-spacing: 0.24em;
    text-transform: uppercase;
  }
`;

export default function LoadingScreen({
  ready = true,
  onComplete,
}) {
  const onCompleteRef = useRef(onComplete);
  const completedRef = useRef(false);

  onCompleteRef.current = onComplete;

  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  // Prevent background scrolling while the loading screen is visible.
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keep the screen visible briefly after the portfolio is ready.
  useEffect(() => {
    if (!ready || exiting) return;

    const timer = window.setTimeout(() => {
      setExiting(true);
    }, HOLD_MS);

    return () => window.clearTimeout(timer);
  }, [ready, exiting]);

  // Finish the fade-out before removing the screen.
  useEffect(() => {
    if (!exiting) return;

    const timer = window.setTimeout(() => {
      if (completedRef.current) return;

      completedRef.current = true;
      setGone(true);
      onCompleteRef.current?.();
    }, EXIT_MS);

    return () => window.clearTimeout(timer);
  }, [exiting]);

  if (gone) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!ready}
      className={[
        "loading-canvas fixed inset-0 z-[9999]",
        "flex h-[100dvh] w-full items-center justify-center",
        "overflow-hidden select-none",
      ].join(" ")}
      style={{
        opacity: exiting ? 0 : 1,
        transition: `opacity ${EXIT_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        pointerEvents: exiting ? "none" : "auto",
        willChange: "opacity",
      }}
    >
      <style>{LOADING_CSS}</style>

      <div
        className={[
          "flex -translate-y-1 flex-col items-center",
          "px-6 text-center",
        ].join(" ")}
      >
        {/* Clean, understated portfolio wordmark */}
        <h1
          className="m-0 text-[clamp(2.75rem,5vw,4.25rem)] font-medium leading-none tracking-[-0.065em]"
          style={{
            color: "var(--pp-text-primary)",
          }}
        >
          Sukesh
          <span
            style={{
              color: "var(--pp-text-muted)",
            }}
          >
            .
          </span>
        </h1>

        {/* Minimal indeterminate loading indicator using shadcn Progress */}
        <Progress className="!mt-2 h-0.5 w-[56px] bg-border [&>div]:bg-primary" />

        {/* Quiet, secondary caption */}
        <p
          className={[
            "loading-caption mt-5 mb-0",
            "text-[9px] sm:text-[10px]",
            "font-normal uppercase",
            "tracking-[0.24em]",
            "leading-relaxed",
          ].join(" ")}
        >
        Preparing your canvas
        </p>
      </div>

      <span className="sr-only">
        {ready
          ? "Sukesh's portfolio is ready"
          : "Loading Sukesh's portfolio"}
      </span>
    </div>
  );
}