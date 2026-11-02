"use client";
import { useEffect, useState } from "react";
import { adsHidden, loadAdvertising, saveAdsHidden } from "@/lib/advertising";
import GooglePrivacyButton from "./GooglePrivacyButton";

export default function AdvertisingPreferences() {
  const [hidden, setHidden] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const saved = adsHidden();
    setHidden(saved);
    if (!saved) void loadAdvertising();
  }, []);
  function choose(value: boolean) {
    if (saveAdsHidden(value)) window.location.reload();
    else
      setError(
        "This browser could not save your choice. Its site-data or content-blocking settings can also be used to manage advertising.",
      );
  }
  return (
    <section
      className="privacy-preferences"
      aria-labelledby="ad-choice-heading"
    >
      <h2 id="ad-choice-heading">Your advertising choice</h2>
      <p>
        Every lesson and practice activity stays available without ads. This is
        separate from your analytics choice above.
      </p>
      <p role="status">
        {hidden === null
          ? "Checking this browser’s advertising preference…"
          : hidden
            ? "Lesson ads: off in this browser."
            : "Lesson ads: allowed, subject to Google approval, consent choices and availability."}
      </p>
      <div className="privacy-actions">
        <button
          type="button"
          className="button button-outline"
          onClick={() => choose(true)}
        >
          Read without ads
        </button>
        <button type="button" className="button" onClick={() => choose(false)}>
          Allow lesson ads
        </button>
      </div>
      <GooglePrivacyButton />
      {error && <p role="alert">{error}</p>}
      <p className="desk-help">
        We remember this preference only in this browser when storage is
        available. Turning ads off stops new advertising requests after reload;
        it does not delete information already processed by Google or its
        partners.
      </p>
    </section>
  );
}
