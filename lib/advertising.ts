export const adPublisher = "ca-pub-8791576499923818";
export const lessonAdSlot = "4182619631";
export const adPreferenceKey = "gurus-hide-ads-v1";
export const googlePrivacyEvent = "gurus:google-privacy-ready";

export function isAdvertisingHost(host: string) {
  return [
    "gurusclassesofenglish.com",
    "www.gurusclassesofenglish.com",
  ].includes(host);
}
export function hasLessonAd(post: { sample?: boolean; content: string }) {
  // An editorial layout rule, not an AdSense approval threshold.
  return (
    !post.sample && (post.content.trim().match(/\S+/g) || []).length >= 100
  );
}
export function adsHidden() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(adPreferenceKey) === "true";
  } catch {
    return false;
  }
}
export function saveAdsHidden(hidden: boolean) {
  try {
    window.localStorage.setItem(adPreferenceKey, String(hidden));
    return true;
  } catch {
    return false;
  }
}
type ConsentData = { gdprApplies?: boolean };
type AdWindow = Window & {
  adsbygoogle?: { push: (entry: Record<string, unknown>) => unknown };
  googlefc?: {
    callbackQueue: Array<Record<string, () => void>>;
    showRevocationMessage?: () => void;
  };
  __tcfapi?: (
    command: string,
    version: number,
    callback: (data: ConsentData, success: boolean) => void,
  ) => void;
};
let loader: Promise<boolean> | undefined;
let googlePrivacyReady = false;
export function canManageGooglePrivacy() {
  return googlePrivacyReady;
}
export function manageGooglePrivacy() {
  const win = window as AdWindow;
  win.googlefc?.callbackQueue.push({
    CONSENT_API_READY: () => win.googlefc?.showRevocationMessage?.(),
  });
}
export function loadAdvertising(): Promise<boolean> {
  if (
    typeof window === "undefined" ||
    !isAdvertisingHost(window.location.hostname) ||
    adsHidden()
  )
    return Promise.resolve(false);
  if (loader) return loader;
  const win = window as AdWindow;
  win.googlefc = win.googlefc || { callbackQueue: [] };
  win.googlefc.callbackQueue = win.googlefc.callbackQueue || [];
  win.googlefc.callbackQueue.push({
    CONSENT_API_READY: () => {
      win.__tcfapi?.("addEventListener", 0, (data, success) => {
        if (!success) return;
        googlePrivacyReady = data?.gdprApplies === true;
        window.dispatchEvent(new Event(googlePrivacyEvent));
      });
    },
  });
  loader = new Promise((resolve) => {
    const script = document.createElement("script");
    script.id = "gurus-advertising";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adPublisher}`;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.append(script);
  });
  return loader;
}
export function requestLessonAd() {
  if (!isAdvertisingHost(window.location.hostname) || adsHidden()) return false;
  const win = window as AdWindow;
  const queue = win.adsbygoogle || ([] as Record<string, unknown>[]);
  win.adsbygoogle = queue;
  queue.push({});
  return true;
}
