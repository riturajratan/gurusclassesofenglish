"use client";
import { useEffect, useState } from "react";
import {
  consentEvent,
  readAnalyticsChoice,
  saveAnalyticsChoice,
  removeAnalyticsCookies,
  type AnalyticsChoice,
} from "@/lib/analytics-consent";

export default function AnalyticsPreferences() {
  const [choice, setChoice] = useState<AnalyticsChoice | null>(null);
  useEffect(() => {
    const update = () => setChoice(readAnalyticsChoice());
    update();
    window.addEventListener(consentEvent, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(consentEvent, update);
      window.removeEventListener("storage", update);
    };
  }, []);
  function choose(value: AnalyticsChoice) {
    const previous = readAnalyticsChoice();
    saveAnalyticsChoice(value);
    if (value === "declined") {
      removeAnalyticsCookies();
      // Reload after withdrawal so an already loaded Google tag stops running.
      if (previous === "accepted") window.location.reload();
    }
  }
  return (
    <section
      className="privacy-preferences"
      aria-labelledby="privacy-choice-heading"
    >
      <h2 id="privacy-choice-heading">Your analytics choice</h2>
      <p>
        You can read every lesson and save practice sentences without analytics.
        This choice does not change your reading preferences or saved work.
      </p>
      <p role="status">
        {choice === "accepted"
          ? "Optional analytics: allowed."
          : choice === "declined"
            ? "Optional analytics: off."
            : "Optional analytics: off until you choose to allow it."}
      </p>
      <div className="privacy-actions">
        <button
          className="button button-outline"
          onClick={() => choose("declined")}
        >
          Keep analytics off
        </button>
        <button className="button" onClick={() => choose("accepted")}>
          Allow analytics
        </button>
      </div>
      <p className="desk-help">
        We remember your choice in this browser when storage is available.
        Turning analytics off removes this site's Google Analytics cookies; it
        does not delete data already processed by Google.
      </p>
    </section>
  );
}
