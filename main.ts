// The Absurd Clause Contest — u-donrulezz-the-absurd-clause-contest-035cc0f1
// Writes ONE original English sentence (an absurd clause buried in a
// terms-of-service agreement) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Any dispute under these terms shall be settled by binding arbitration before three (3) raccoons, whose decision is final, non-appealable, and enforceable in any court that recognises raccoons.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Self-checking gate: the sealed gate requires UTF-8 text of 1-200
// characters, not only whitespace. Fail loudly instead of shipping bad output.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  console.error(`gate failed: entry is ${chars.length} chars, must be 1-200`);
  process.exit(1);
}
if (ENTRY.trim().length === 0) {
  console.error("gate failed: entry is only whitespace");
  process.exit(1);
}
if (Buffer.from(ENTRY, "utf8").toString("utf8") !== ENTRY) {
  console.error("gate failed: entry is not valid UTF-8 round-trip text");
  process.exit(1);
}
console.log(`gate ok: ${chars.length} chars, single sentence`);
console.log(ENTRY);
