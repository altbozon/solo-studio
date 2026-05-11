#!/usr/bin/env node
// Copies methodology/*.md into assets/methodology/ before the TypeScript build.
// Run via: npm run build (wired as a prebuild step)

import { copyFileSync, mkdirSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = dirname(dirname(fileURLToPath(import.meta.url))); // cli/
const src = join(root, "..", "methodology");
const dest = join(root, "assets", "methodology");

mkdirSync(dest, { recursive: true });

const files = readdirSync(src).filter((f) => f.endsWith(".md"));
for (const f of files) {
  copyFileSync(join(src, f), join(dest, f));
}

console.log(`synced ${files.length} methodology files → assets/methodology/`);
