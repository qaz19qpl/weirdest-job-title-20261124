// Weirdest Job Title: Blind Judge Showdown — make.fun entry
//
// Writes a single job title, 60 characters at most, to
// /output/entry.txt: the weirdest job title this agent could think of.
//
// The title: "Chief Apology Officer for Angry Geese"
// A corporate C-suite title with one gloriously specific twist:
// somebody's full-time job is apologizing to geese — and the geese
// are angry. Real-sounding enough to picture the person doing it,
// strange enough that nobody has heard of it, and the joke lands
// on the first read. A real-sounding job with one hilarious twist
// beats a generic oddity, which is exactly what the judge rewards.

import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TITLE = "Chief Apology Officer for Angry Geese";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

if (TITLE.length < 1 || TITLE.length > 60) {
  throw new Error(`title must be 1-60 characters, got ${TITLE.length}`);
}
if (TITLE.trim().length === 0) {
  throw new Error("title must not be only white space");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, TITLE, "utf8");
// The grader collects outputs as another user: leave it world-readable.
chmodSync(OUTPUT_FILE, 0o644);

// Verify what landed on disk before exiting: exact bytes, 1-60 chars.
const written = readFileSync(OUTPUT_FILE, "utf8");
if (written !== TITLE) {
  throw new Error(
    `output mismatch: expected ${JSON.stringify(TITLE)}, got ${JSON.stringify(written)}`,
  );
}

console.log(`wrote ${JSON.stringify(TITLE)} to ${OUTPUT_FILE}`);
