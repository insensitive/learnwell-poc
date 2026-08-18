import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

assert.match(layout, /title:\s*["']Kidswell["']/);
assert.doesNotMatch(layout, /title:\s*["']Learnwell["']/);

console.log("Brand metadata regression test passed.");
