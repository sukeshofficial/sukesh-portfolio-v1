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
      className="fixed z-10 bottom-17 left-4 right-4 md:left-auto md:right-8 mx-auto md:mx-0 max-w-md pointer-events-auto rounded-2xl border border-zinc-700 bg-zinc-900/50 backdrop-blur-xl p-5 shadow-2xl text-zinc-100 font-sans transition-all duration-300"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-zinc-100 tracking-wide">Cookie Notice</h3>
          <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
            We use cookies to improve your experience and analyze our traffic.
            By clicking "Accept", you agree to our use of cookies.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={handleDecline}
            className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors border border-zinc-700/50 cursor-pointer"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-1.5 text-xs font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
