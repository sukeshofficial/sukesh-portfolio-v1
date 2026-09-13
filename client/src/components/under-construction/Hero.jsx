import HeroTitle from "./HeroTitle";
import OrbScene from "./OrbScene";
import { portfolioConfig } from "../../config/portfolio";

export default function Hero() {
  return (
    /*
     * pt-* accounts for the absolute header height.
     * The hero section sits below the header and uses minimal
     * vertical margin between title and orb — the orb extends
     * into the horizon which acts as a visual anchor.
     */
    <section className="relative flex flex-col items-center w-full pt-24 sm:pt-28 lg:pt-32 xl:pt-36">

      {/* PORTFOLIO label — above the hero title */}
      <span
        className="text-[7px] sm:text-[8px] tracking-[0.40em] uppercase font-light mb-2 sm:mb-3 uc-fade-up"
        style={{ color: "var(--uc-text-muted)" }}
        aria-hidden="true"
      >
        {portfolioConfig.portfolioLabel}
      </span>

      {/* IMMERSIVE EXPERIENCE */}
      <HeroTitle />

      {/* mt-* is intentionally tight: orb sits right under the title */}
      <div className="w-full mt-2 sm:mt-3 lg:mt-4">
        <OrbScene />
      </div>

    </section>
  );
}
