/**
 * Portfolio Configuration — single source of truth.
 * Edit launchDate / launchLabel to change the countdown target.
 */
export const portfolioConfig = {
  owner: "SUKESH",

  heroTitle: "IMMERSIVE EXPERIENCE",

  /** Words used for two-line mobile hero title */
  heroTitleWords: ["IMMERSIVE", "EXPERIENCE"],

  description: "Crafting a more immersive portfolio experience.",

  /** ISO 8601 — used by useCountdown to calculate remaining time */
  launchDate: "2026-11-01T00:00:00+05:30",

  /** Human-readable label shown in LaunchDate component */
  launchLabel: "NOV 01, 2026",

  mottoLeft: ["THINK", "BUILD", "GROW"],
  mottoRight: ["IDEAS", "CODE", "IMPACT"],

  portfolioLabel: "PORTFOLIO",

  timeFormat: {
    time: { hour: "2-digit", minute: "2-digit", hour12: true },
    date: { weekday: "short", month: "short", day: "2-digit", year: "numeric" },
  },
};
