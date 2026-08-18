import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const title = layoutSource.match(/title:\s*["']([^"']+)["']/)?.[1];

test("accepts the exact Kidswell brand partition", () => {
  assert.equal(title, "Kidswell");
});

test("rejects case-variant brand partitions", () => {
  for (const candidate of ["kidswell", "KidsWell", "KIDSWELL"]) {
    assert.notEqual(candidate, title);
  }
});

test("rejects the former and unrelated brand partitions", () => {
  for (const candidate of ["Learnwell", "Learningwell", "Kids World"]) {
    assert.notEqual(candidate, title);
  }
});

test("does not retain the former brand in application metadata", () => {
  assert.doesNotMatch(layoutSource, /title:\s*["']Learnwell["']/);
});
