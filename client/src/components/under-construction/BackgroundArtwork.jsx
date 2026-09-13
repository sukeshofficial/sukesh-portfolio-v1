import desktopBg from "../../assets/desktop-laptop tablet.png";
import mobileBg from "../../assets/tablet-mobile.png";

/**
 * BackgroundArtwork
 * Layer 1 — purely visual, aria-hidden.
 *
 * Desktop / Laptop / Tablet Landscape (≥ 768px):
 *   uses the wide landscape image (desktop-laptop tablet.png)
 *
 * Tablet Portrait / Mobile (< 768px):
 *   uses the portrait image (tablet-mobile.png)
 *
 * Both images cover the full viewport with object-fit: cover,
 * anchored to center so the orb stays centered at all sizes.
 */
export default function BackgroundArtwork() {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Wide (landscape) — shown md and above */}
      <img
        src={desktopBg}
        alt=""
        className="hidden md:block w-full h-full object-cover object-center select-none pointer-events-none"
        draggable="false"
        fetchpriority="high"
      />

      {/* Portrait — shown below md */}
      <img
        src={mobileBg}
        alt=""
        className="md:hidden w-full h-full object-cover object-center select-none pointer-events-none"
        draggable="false"
        fetchpriority="high"
      />
    </div>
  );
}
