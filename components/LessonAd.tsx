"use client";
import { useEffect, useRef, useState } from "react";
import {
  adPublisher,
  lessonAdSlot,
  adsHidden,
  loadAdvertising,
  requestLessonAd,
} from "@/lib/advertising";

export default function LessonAd() {
  const area = useRef<HTMLElement>(null);
  const unit = useRef<HTMLModElement>(null);
  const requested = useRef(false);
  const [active, setActive] = useState(false);
  const [preview, setPreview] = useState(false);
  const [unfilled, setUnfilled] = useState(false);
  useEffect(() => {
    let mounted = true;
    if (adsHidden()) return;
    if (
      ["localhost", "127.0.0.1"].includes(window.location.hostname) &&
      new URLSearchParams(window.location.search).get("ad-preview") === "1"
    ) {
      setPreview(true);
      return;
    }
    void loadAdvertising().then((loaded) => {
      if (mounted && loaded) setActive(true);
    });
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    const slot = unit.current;
    const container = area.current;
    if (!active || !slot || !container) return;
    const mutation = new MutationObserver(() => {
      if (slot.dataset.adStatus === "unfilled") setUnfilled(true);
    });
    mutation.observe(slot, {
      attributes: true,
      attributeFilter: ["data-ad-status"],
    });
    function request() {
      if (requested.current || !container || container.clientWidth < 280)
        return;
      requested.current = true;
      try {
        if (!requestLessonAd()) setUnfilled(true);
      } catch {
        setUnfilled(true);
      }
    }
    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            request();
          }
        },
        { rootMargin: "400px" },
      );
      observer.observe(container);
    } else request();
    return () => {
      observer?.disconnect();
      mutation.disconnect();
    };
  }, [active]);
  return (
    <aside
      ref={area}
      className="lesson-ad"
      aria-label="Advertisement"
      hidden={(!active && !preview) || unfilled}
      data-lesson-ad="true"
    >
      <span className="lesson-ad-label">
        {preview ? "AD PLACEMENT PREVIEW · NO LIVE AD" : "Advertisement"}
      </span>
      {preview ? (
        <div className="lesson-ad-preview">Responsive advertising space</div>
      ) : active ? (
        <ins
          ref={unit}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: 100 }}
          data-ad-client={adPublisher}
          data-ad-slot={lessonAdSlot}
        />
      ) : null}
    </aside>
  );
}
