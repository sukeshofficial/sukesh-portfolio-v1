import orbImage from "../../assets/orb.png";

/**
 * OrbScene
 * Uses the provided orb.png for the glass sphere.
 * Horizon is an SVG curve with atmospheric glow layered underneath.
 */
export default function OrbScene() {
  return (
    <div className="relative w-full flex flex-col items-center" aria-hidden="true">

      {/* ── Orb ──────────────────────────────────────── */}
      <div className="orb-container">
        <img
          src={orbImage}
          alt=""
          aria-hidden="true"
          className="orb-img"
          draggable="false"
        />
        {/* Outer glow ring */}
        <div className="orb-glow" />
      </div>

      {/* ── Horizon ──────────────────────────────────── */}
      <div className="horizon-zone">

        {/* Wide warm bloom behind horizon */}
        <div className="horizon-bloom" />

        {/* SVG curved line */}
        <svg
          className="horizon-svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(80,100,200,0)" />
              <stop offset="18%" stopColor="rgba(110,90,190,0.30)" />
              <stop offset="38%" stopColor="rgba(200,150,80,0.55)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="62%" stopColor="rgba(200,140,70,0.55)" />
              <stop offset="82%" stopColor="rgba(110,90,190,0.30)" />
              <stop offset="100%" stopColor="rgba(80,100,200,0)" />
            </linearGradient>
            <linearGradient id="hg-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(80,100,200,0)" />
              <stop offset="22%" stopColor="rgba(120,90,200,0.15)" />
              <stop offset="50%" stopColor="rgba(255,200,100,0.35)" />
              <stop offset="78%" stopColor="rgba(120,90,200,0.15)" />
              <stop offset="100%" stopColor="rgba(80,100,200,0)" />
            </linearGradient>
            <filter id="hblur">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
          </defs>

          {/* Fat soft glow duplicate */}
          <path
            d="M-100,88 Q360,2 720,2 Q1080,2 1540,88"
            fill="none"
            stroke="url(#hg-glow)"
            strokeWidth="20"
            filter="url(#hblur)"
          />
          {/* Crisp line */}
          <path
            d="M-100,88 Q360,2 720,2 Q1080,2 1540,88"
            fill="none"
            stroke="url(#hg)"
            strokeWidth="1.2"
          />
        </svg>

        {/* Inner atmosphere — the dark curved surface below the horizon */}
        {/* <div className="horizon-surface" /> */}
      </div>

    </div>
  );
}