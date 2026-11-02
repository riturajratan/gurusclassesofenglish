import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file, context = {}) {
  const result = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  const exports = {};
  vm.runInNewContext(result.outputText, { exports, ...context });
  return exports;
}
function consentHarness({
  saved = null,
  blocked = false,
  writeBlocked = false,
} = {}) {
  const store = new Map(
    saved === null ? [] : [["gurus-analytics-choice-v1", saved]],
  );
  const events = [];
  const deleted = [];
  const context = {
    window: {
      location: { hostname: "gurusclassesofenglish.com" },
      localStorage: {
        getItem(key) {
          if (blocked) throw Error("blocked");
          return store.get(key) ?? null;
        },
        setItem(key, value) {
          if (blocked || writeBlocked) throw Error("blocked");
          store.set(key, value);
        },
      },
      dispatchEvent(event) {
        events.push(event.type);
      },
    },
    Event: class Event {
      constructor(type) {
        this.type = type;
      }
    },
    document: {
      get cookie() {
        return "_ga=id; _ga_ED1TVZS6LQ=session; other_cookie=keep";
      },
      set cookie(value) {
        deleted.push(value);
      },
    },
  };
  return {
    api: load("lib/analytics-consent.ts", context),
    store,
    events,
    deleted,
  };
}
test("analytics requires an explicit recognised choice and remembers withdrawal", () => {
  const h = consentHarness({ saved: "unexpected" });
  assert.equal(h.api.readAnalyticsChoice(), null);
  h.api.saveAnalyticsChoice("accepted");
  assert.equal(h.api.readAnalyticsChoice(), "accepted");
  h.api.saveAnalyticsChoice("declined");
  assert.equal(h.api.readAnalyticsChoice(), "declined");
  assert.equal(h.store.get("gurus-analytics-choice-v1"), "declined");
  assert.equal(h.events.length, 2);
  h.store.delete("gurus-analytics-choice-v1");
  assert.equal(
    h.api.readAnalyticsChoice(),
    null,
    "Clearing stored consent must not reuse the previous choice",
  );
});
test("blocked storage defaults to no consent and keeps a session-only choice", () => {
  const h = consentHarness({ blocked: true });
  assert.equal(h.api.readAnalyticsChoice(), null);
  h.api.saveAnalyticsChoice("accepted");
  assert.equal(h.api.readAnalyticsChoice(), "accepted");
  h.api.saveAnalyticsChoice("declined");
  assert.equal(h.api.readAnalyticsChoice(), "declined");
});
test("withdrawal clears only GA cookies, across host and parent domain", () => {
  const h = consentHarness();
  h.api.removeAnalyticsCookies();
  assert.ok(
    h.deleted.some(
      (cookie) =>
        cookie.startsWith("_ga=") &&
        cookie.includes("domain=.gurusclassesofenglish.com"),
    ),
  );
  assert.ok(h.deleted.every((cookie) => cookie.includes("Max-Age=0")));
  assert.ok(h.deleted.every((cookie) => !cookie.startsWith("other_cookie=")));
});
test("withdrawal applies immediately when storage can be read but cannot be written", () => {
  const h = consentHarness({ saved: "accepted", writeBlocked: true });
  h.api.saveAnalyticsChoice("declined");
  assert.equal(h.api.readAnalyticsChoice(), "declined");
});
test("draft notes are blocked while legitimate explanations of context remain publishable", () => {
  const { hasUnresolvedReviewNote } = load("lib/editorial.ts");
  assert.equal(
    hasUnresolvedReviewNote("Note for teacher review: confirm the answers."),
    true,
  );
  assert.equal(
    hasUnresolvedReviewNote("The teacher should review these details."),
    true,
  );
  assert.equal(
    hasUnresolvedReviewNote(
      "Several answers are possible when the context changes. Here is one suggested answer.",
    ),
    false,
  );
});
test("topic listings offer populated topics and include grammar-tagged quizzes", () => {
  const { availableTopics, matchesTopic } = load("lib/topics.ts");
  const lessons = [
    { category: "Quiz", tags: ["Grammar"] },
    { category: "Word Power", tags: ["Vocabulary"] },
  ];
  assert.equal(matchesTopic(lessons[0], "Grammar"), true);
  assert.equal(matchesTopic(lessons[0], "Writing"), false);
  assert.deepEqual(Array.from(availableTopics(lessons)), [
    "Quiz",
    "Word Power",
    "Vocabulary",
    "Grammar",
  ]);
});
