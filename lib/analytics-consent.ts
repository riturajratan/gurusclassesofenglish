export type AnalyticsChoice = "accepted" | "declined";
export const consentStorageKey = "gurus-analytics-choice-v1";
export const consentEvent = "gurus:analytics-choice";
let memoryChoice: AnalyticsChoice | null = null;
let memoryOnly = false;

export function readAnalyticsChoice(): AnalyticsChoice | null {
  if (typeof window === "undefined") return null;
  if (memoryOnly) return memoryChoice;
  try {
    const saved = window.localStorage.getItem(consentStorageKey);
    return saved === "accepted" || saved === "declined" ? saved : null;
  } catch {
    return memoryChoice;
  }
}

export function saveAnalyticsChoice(choice: AnalyticsChoice) {
  memoryChoice = choice;
  try {
    window.localStorage.setItem(consentStorageKey, choice);
    memoryOnly = false;
  } catch {
    memoryOnly = true;
  }
  window.dispatchEvent(new Event(consentEvent));
}

export function removeAnalyticsCookies() {
  // Only remove this site's GA cookies; leave practice and reading preferences alone.
  const domains = [
    "",
    "; domain=" + window.location.hostname,
    "; domain=.gurusclassesofenglish.com",
  ];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_")) {
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
      }
    }
  }
}
