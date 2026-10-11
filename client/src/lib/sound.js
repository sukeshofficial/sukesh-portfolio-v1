// Resilient Sound Utility for Sukesh Portfolio Workspace
// Off by default. Handles missing audio files gracefully without failing builds.

const STORAGE_KEY = "sukesh_portfolio_sfx_muted";

class SoundManager {
  constructor() {
    this.isMuted = this.loadMutePreference();
    this.audioCache = {};
  }

  loadMutePreference() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // Off by default unless explicitly unmuted
      return saved !== null ? saved === "true" : true;
    } catch {
      return true;
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    try {
      localStorage.setItem(STORAGE_KEY, String(muted));
    } catch {
      // Ignore storage errors
    }
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  playSound(soundName) {
    if (this.isMuted) return;

    try {
      let audio = this.audioCache[soundName];
      if (!audio) {
        // Construct dynamic asset URL
        const assetUrl = new URL(`../assets/sfx/${soundName}.mp3`, import.meta.url).href;
        audio = new Audio(assetUrl);
        audio.preload = "auto";
        this.audioCache[soundName] = audio;
      }

      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Gracefully swallow missing file or browser autoplay restriction errors
          console.debug(`[SoundManager] Could not play "${soundName}":`, err.message);
        });
      }
    } catch (err) {
      console.debug(`[SoundManager] Audio initialization error for "${soundName}":`, err.message);
    }
  }
}

export const soundManager = new SoundManager();
