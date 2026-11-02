"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
const isConfigured = /^G-[A-Z0-9]+$/.test(measurementId);

// These are intentions to contact, not confirmed calls, messages or enrolments.
export function trackEvent(
  name: string,
  parameters: Record<string, string | number> = {},
) {
  if (!isConfigured || typeof window === "undefined") return;
  (window as AnalyticsWindow).gtag?.("event", name, parameters);
}

export default function Analytics() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Local previews must never contaminate the production property's reports.
    const productionHost = [
      "gurusclassesofenglish.com",
      "www.gurusclassesofenglish.com",
    ].includes(window.location.hostname);
    setEnabled(isConfigured && productionHost);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    function onClick(event: MouseEvent) {
      if (window.location.pathname.startsWith("/publish")) return;
      const link =
        event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:") || href.startsWith("mailto:")) {
        trackEvent("contact_click", {
          contact_method: href.startsWith("tel:") ? "phone" : "email",
        });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled]);

  if (
    !enabled ||
    pathname.startsWith("/publish") ||
    pathname.startsWith("/offline")
  )
    return null;

  // GA4 enhanced measurement handles initial and history-based page views. Do not
  // add a second usePathname page_view event: it would double count navigation.
  return (
    <>
      <Script id="gurus-analytics-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}', { allow_google_signals: false, allow_ad_personalization_signals: false });`}
      </Script>
      <Script
        id="gurus-analytics"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
