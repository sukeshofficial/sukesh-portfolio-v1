import { useState, useEffect } from "react";
import {
  grantConsent,
  denyConsent,
  getConsentStatus,
  trackEvent,
  CONSENT_STATES
} from "../lib/consent-manager";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const status = getConsentStatus();
    console.log("[CookieConsent] Consent status on mount:", status);
    if (status === CONSENT_STATES.UNDECIDED) {
      console.log("[CookieConsent] Status is UNDECIDED - showing consent banner");
      setIsVisible(true);
      trackEvent("cookie_consent_shown");
    } else {
      console.log("[CookieConsent] Status is already set to:", status);
    }
  }, []);

  const handleAccept = () => {
    grantConsent();
    setIsVisible(false);
  };

  const handleDecline = () => {
    denyConsent();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-50 bottom-4 left-4 right-4 md:left-auto md:right-4 mx-auto md:mx-0 max-w-md pointer-events-auto rounded-xl border border-[var(--pp-border)] bg-[var(--pp-surface)]/90 backdrop-blur-xl p-4 shadow-2xl text-[var(--pp-text-primary)] font-sans transition-all duration-300"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-[var(--pp-text-primary)] tracking-wide">Cookie Notice</h3>
          <p className="mt-1 text-xs text-[var(--pp-text-secondary)] leading-relaxed">
            We use cookies to improve your experience and analyze our traffic.
            By clicking "Accept", you agree to our use of cookies.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={handleDecline}
            className="rounded-[5px] px-3.5 py-1.5 text-xs font-medium text-[var(--pp-text-secondary)] hover:bg-[var(--pp-surface-secondary)] transition-colors border border-[var(--pp-border)] cursor-pointer"
          >
            Decline
          </button>

          <button
            onClick={handleAccept}
            className="rounded-[5px] bg-[var(--pp-btn-primary-bg)] hover:bg-[var(--pp-btn-primary-hover)] text-[var(--pp-btn-primary-text)] px-3.5 py-1.5 text-xs font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
