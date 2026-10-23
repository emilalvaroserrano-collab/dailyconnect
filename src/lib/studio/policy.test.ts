import assert from "node:assert/strict";
import test from "node:test";
import {
  affiliateSplit,
  applyOrderEvent,
  creatorShare,
  nextRetryAt,
  publishClaim,
  screenCopy,
  videoIssues,
  withDisclosure,
} from "./policy.ts";

test("screening flags claims and likely copyrighted names", () => {
  assert.deepEqual(screenCopy("Lamp", "A brass lamp for the desk."), []);
  assert.ok(screenCopy("Offer", "Guaranteed income in a week").includes("misleading-claim"));
  assert.ok(screenCopy("Clip", "Featuring Disney characters").includes("possible-copyright"));
});

test("portrait videos must stay under 58 seconds", () => {
  assert.deepEqual(videoIssues({ mime: "video/mp4", durationSec: 20, width: 720, height: 1280 }), []);
  assert.ok(videoIssues({ mime: "video/mp4", durationSec: 59, width: 720, height: 1280 }).length > 0);
  assert.ok(videoIssues({ mime: "image/png", durationSec: 10, width: 720, height: 1280 }).length > 0);
  assert.ok(videoIssues({ mime: "video/mp4", durationSec: 10, width: 1280, height: 720 }).length > 0);
});

test("creator share is half of net eligible revenue", () => {
  assert.deepEqual(creatorShare(1000, 200), {
    gross: 1000,
    deductions: 200,
    net: 800,
    share: 400,
    basis: "net",
    shareBps: 5000,
  });
  assert.equal(creatorShare(100, 500).share, 0);
});

test("affiliate split does not add a membership commission", () => {
  const split = affiliateSplit(1000, 1000, 7000);
  assert.equal(split.grossCommission, 100);
  assert.equal(split.member, 70);
  assert.equal(split.house, 30);
});

test("publish jobs and order events are idempotent", () => {
  assert.equal(publishClaim(false), "create");
  assert.equal(publishClaim(true), "duplicate");
  assert.equal(applyOrderEvent("none", "confirmed"), "credit");
  assert.equal(applyOrderEvent("confirmed", "confirmed"), "noop");
  assert.equal(applyOrderEvent("confirmed", "refunded"), "reverse");
  assert.equal(applyOrderEvent("refunded", "refunded"), "noop");
  assert.equal(applyOrderEvent("refunded", "confirmed"), "noop");
});

test("retries back off and captions carry a disclosure", () => {
  const now = 1_000_000;
  assert.equal(nextRetryAt(0, now), now + 30_000);
  assert.equal(nextRetryAt(1, now), now + 60_000);
  assert.ok(nextRetryAt(20, now) - now <= 60 * 60 * 1000);
  assert.match(withDisclosure("The brass lamp."), /Affiliate link/);
  assert.equal(withDisclosure("Affiliate link already here."), "Affiliate link already here.");
});
