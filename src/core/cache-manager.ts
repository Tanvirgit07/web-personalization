import type { UserContext } from "../types/index.js";

const DEFAULT_CACHE_KEY = "web_personalization_context_cache";

interface CacheEntry {
  context: UserContext;
  timestamp: number;
  expiresAt: number;
}

let memoryCache: CacheEntry | null = null;

export function getCachedContext(): UserContext | null {
  const now = Date.now();

  // 1. Check in-memory cache first
  if (memoryCache) {
    if (now < memoryCache.expiresAt) {
      return memoryCache.context;
    }
    memoryCache = null;
  }

  // 2. Check sessionStorage if available (browser environment)
  if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
    try {
      const stored = window.sessionStorage.getItem(DEFAULT_CACHE_KEY);
      if (stored) {
        const parsed: CacheEntry = JSON.parse(stored);
        if (now < parsed.expiresAt) {
          memoryCache = parsed; // Sync memory cache
          return parsed.context;
        }
        window.sessionStorage.removeItem(DEFAULT_CACHE_KEY);
      }
    } catch {
      // Ignore sessionStorage errors (e.g. quota exceeded or privacy mode)
    }
  }

  return null;
}

export function setCachedContext(context: UserContext, timeoutMs: number = 600000): void {
  const now = Date.now();
  const entry: CacheEntry = {
    context,
    timestamp: now,
    expiresAt: now + timeoutMs,
  };

  memoryCache = entry;

  if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
    try {
      window.sessionStorage.setItem(DEFAULT_CACHE_KEY, JSON.stringify(entry));
    } catch {
      // Ignore storage errors
    }
  }
}

export function clearCache(): void {
  memoryCache = null;
  if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
    try {
      window.sessionStorage.removeItem(DEFAULT_CACHE_KEY);
    } catch {
      // Ignore storage errors
    }
  }
}
