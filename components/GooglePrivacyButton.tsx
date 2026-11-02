"use client";
import { useEffect, useState } from "react";
import {
  canManageGooglePrivacy,
  googlePrivacyEvent,
  manageGooglePrivacy,
} from "@/lib/advertising";

export default function GooglePrivacyButton() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const update = () => setReady(canManageGooglePrivacy());
    update();
    window.addEventListener(googlePrivacyEvent, update);
    return () => window.removeEventListener(googlePrivacyEvent, update);
  }, []);
  if (!ready) return null;
  return (
    <button
      type="button"
      className="google-privacy-choice"
      onClick={manageGooglePrivacy}
    >
      Google privacy choices
    </button>
  );
}
