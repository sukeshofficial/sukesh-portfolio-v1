/**
 * ConsentManager Utility for GA4 Consent Mode v2
 * Handles consent persistence (localStorage), gtag updates, and event tracking.
 */

const STORAGE_KEY = "cookie-consent";

export const CONSENT_STATES = {
  GRANTED: "granted",
  DENIED: "denied",
  UNDECIDED: "undecided",
};

/**
 * Update Google Consent Mode via gtag
 * @param {string} status - 'granted' or 'denied'
 */
const updateGtagConsent = (status) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: status,
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status,
    });
  }
};

/**
 * Send custom event to GA4
 * @param {string} eventName 
 */
export const trackEvent = (eventName) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName);
  }
};

const setCookie = (name, value, days = 730) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Grant all consents
 */
export const grantConsent = () => {
  localStorage.setItem(STORAGE_KEY, CONSENT_STATES.GRANTED);
  setCookie(STORAGE_KEY, CONSENT_STATES.GRANTED);
  updateGtagConsent(CONSENT_STATES.GRANTED);
  trackEvent("cookie_consent_accepted");
};

/**
 * Deny all consents
 */
export const denyConsent = () => {
  localStorage.setItem(STORAGE_KEY, CONSENT_STATES.DENIED);
  setCookie(STORAGE_KEY, CONSENT_STATES.DENIED);
  updateGtagConsent(CONSENT_STATES.DENIED);
  trackEvent("cookie_consent_declined");
};

/**
 * Get current consent status from storage (checks localStorage & cookies)
 * @returns {string} One of CONSENT_STATES
 */
export const getConsentStatus = () => {
  const status = localStorage.getItem(STORAGE_KEY) || getCookie(STORAGE_KEY);
  return status || CONSENT_STATES.UNDECIDED;
};

/**
 * Initialize consent on app load
 */
export const initializeConsent = () => {
  const status = getConsentStatus();
  if (status !== CONSENT_STATES.UNDECIDED) {
    updateGtagConsent(status);
  } else {
    // When nothing is chosen yet, explicitly set the 'undecided' cookie & localStorage entry
    localStorage.setItem(STORAGE_KEY, CONSENT_STATES.UNDECIDED);
    setCookie(STORAGE_KEY, CONSENT_STATES.UNDECIDED);
  }
};
