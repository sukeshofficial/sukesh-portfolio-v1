import "../../styles/under-construction.css";

import BackgroundArtwork from "./BackgroundArtwork";
import HeaderContent from "./HeaderContent";
import HeroContent from "./HeroContent";
import ConstructionStatus from "./ConstructionStatus";
import CurrentTime from "./CurrentTime";
import LaunchDate from "./LaunchDate";

/**
 * UnderConstruction
 *
 * Single Viewport Poster Layout (100dvh).
 * Corner placement globally for Time and Launch Date.
 */
export default function UnderConstruction() {
  return (
    <main
      className="relative w-full h-[100dvh] max-h-[100dvh] overflow-hidden bg-black text-neutral-100 select-none"
      role="main"
      aria-label="Portfolio under construction"
    >
      {/* Layer 1: Responsive Background Artwork */}
      <BackgroundArtwork />

      {/* Layer 2: HTML Content Overlay Container (Strict 100dvh flex column) */}
      <div className="relative z-10 flex flex-col justify-between h-[100dvh] max-h-[100dvh] overflow-hidden pointer-events-none">

        {/* TOP: Header Content */}
        <div className="pointer-events-auto shrink-0">
          <HeaderContent />
        </div>

        {/* CENTER COLUMN: Hero Title + Dynamic Orb Spacer + Construction Status & Countdown */}
        <div className="flex flex-col items-center justify-between flex-1 py-1 sm:py-3 md:py-4 overflow-hidden pointer-events-auto min-h-0">

          {/* Hero Title (SVG) */}
          <div className="w-full shrink-0">
            <HeroContent />
          </div>

          {/* Viewport-Height Aware Orb Spacer */}
          <div
            className="uc-orb-spacer w-full flex-1 min-h-[2.5vh] max-h-[22vh] lg:max-h-[28vh]"
            aria-hidden="true"
          />

          {/* Construction Status & Live Countdown */}
          <div className="w-full shrink-0 -translate-y-10">
            <ConstructionStatus />
          </div>

        </div>

        {/* BOTTOM METADATA: Current Time & Launch Date */}

        {/* Corner placement (Current Time bottom-left, Launch Date bottom-right) */}
        <div className="absolute bottom-4 left-4 xs:bottom-5 xs:left-6 xl:bottom-8 xl:left-12 pointer-events-auto">
          <CurrentTime />
        </div>

        <div className="absolute bottom-4 right-4 xs:bottom-5 xs:right-6 xl:bottom-8 xl:right-12 text-right pointer-events-auto">
          <LaunchDate />
        </div>

      </div>
    </main>
  );
}
