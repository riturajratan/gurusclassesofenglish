import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function harness({
  host = "gurusclassesofenglish.com",
  hidden = null,
  blocked = false,
} = {}) {
  const stored = new Map(
    hidden === null ? [] : [["gurus-hide-ads-v1", hidden]],
  );
  const scripts = [];
  const events = [];
  const window = {
    location: { hostname: host },
    localStorage: {
      getItem(key) {
        if (blocked) throw Error("blocked");
        return stored.get(key) ?? null;
      },
      setItem(key, value) {
        if (blocked) throw Error("blocked");
        stored.set(key, value);
      },
    },
    dispatchEvent(event) {
      events.push(event.type);
    },
  };
  const exports = {};
  const code = ts.transpileModule(
    fs.readFileSync("lib/advertising.ts", "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } },
  ).outputText;
  vm.runInNewContext(code, {
    exports,
    window,
    Event: class {
      constructor(type) {
        this.type = type;
      }
    },
    document: {
      createElement() {
        return {};
      },
      head: {
        append(script) {
          scripts.push(script);
        },
      },
    },
  });
  return { api: exports, window, scripts, events, stored };
}
test("ad loader refuses localhost and lookalike hosts, including after opt-in", async () => {
  for (const host of [
    "localhost",
    "127.0.0.1",
    "gurusclassesofenglish.com.example.org",
  ]) {
    const h = harness({ host });
    assert.equal(await h.api.loadAdvertising(), false);
    assert.equal(h.api.requestLessonAd(), false);
    assert.equal(h.scripts.length, 0);
  }
  assert.equal(
    harness().api.isAdvertisingHost("www.gurusclassesofenglish.com"),
    true,
  );
});
test("read-without-ads prevents both script loading and unit requests", async () => {
  const h = harness({ hidden: "true" });
  assert.equal(await h.api.loadAdvertising(), false);
  assert.equal(h.api.requestLessonAd(), false);
  assert.equal(h.scripts.length, 0);
  assert.equal(h.api.saveAdsHidden(false), true);
  assert.equal(h.api.adsHidden(), false);
});
test("Google loader is shared across navigation and does not send analytics permission", async () => {
  const h = harness();
  const first = h.api.loadAdvertising();
  const second = h.api.loadAdvertising();
  assert.equal(first, second);
  assert.equal(h.scripts.length, 1);
  assert.match(h.scripts[0].src, /client=ca-pub-8791576499923818$/);
  assert.equal(h.window.googlefc.callbackQueue.length, 1);
  h.scripts[0].onload();
  assert.equal(await first, true);
  assert.equal(h.api.requestLessonAd(), true);
  assert.equal(h.window.adsbygoogle.length, 1);
  assert.equal(h.stored.has("gurus-analytics-choice-v1"), false);
});
test("blocked scripts resolve safely and blocked storage is reported by preferences", async () => {
  const h = harness({ blocked: true });
  assert.equal(h.api.saveAdsHidden(true), false);
  const pending = h.api.loadAdvertising();
  h.scripts[0].onerror();
  assert.equal(await pending, false);
});
test("Google privacy choices appear only when the consent API reports an applicable region", async () => {
  const h = harness();
  void h.api.loadAdvertising();
  h.window.__tcfapi = (command, version, callback) =>
    callback({ gdprApplies: true }, true);
  h.window.googlefc.callbackQueue[0].CONSENT_API_READY();
  assert.equal(h.api.canManageGooglePrivacy(), true);
  assert.deepEqual(h.events, ["gurus:google-privacy-ready"]);
  h.api.manageGooglePrivacy();
  assert.equal(h.window.googlefc.callbackQueue.length, 2);
});
test("samples and very short notes never receive an ad placement", () => {
  const { api } = harness();
  const content = Array(150).fill("word").join(" ");
  assert.equal(api.hasLessonAd({ sample: true, content }), false);
  assert.equal(
    api.hasLessonAd({ sample: false, content: "A short note." }),
    false,
  );
  assert.equal(api.hasLessonAd({ sample: false, content }), true);
});
