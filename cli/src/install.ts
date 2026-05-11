import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Platform } from "./platforms.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function assetsDir(): string {
  // Works both from dist/ (built) and src/ (dev via ts-node)
  return join(__dirname, "..", "assets");
}

function methodologySourceDir(): string {
  // In the published package, methodology files are bundled under assets/methodology/
  // In dev (running from repo), they live two levels up
  const bundled = join(assetsDir(), "methodology");
  if (existsSync(bundled)) return bundled;
  return join(__dirname, "..", "..", "methodology");
}

export function installMethodology(platform: Platform, cwd: string): string[] {
  const sourceDir = methodologySourceDir();
  const destDir = platform.methodologyDir(cwd);
  mkdirSync(destDir, { recursive: true });

  const files = readdirSync(sourceDir).filter((f) => f.endsWith(".md"));
  const installed: string[] = [];

  for (const file of files) {
    copyFileSync(join(sourceDir, file), join(destDir, file));
    installed.push(file);
  }

  return installed;
}

export function writeInstructionFile(platform: Platform, cwd: string): string {
  const templatePath = join(assetsDir(), "templates", platform.template);
  const destPath = join(cwd, platform.instructionFile);

  mkdirSync(dirname(destPath), { recursive: true });

  if (existsSync(destPath)) {
    // Don't overwrite — append a note instead
    const existing = readFileSync(destPath, "utf8");
    if (existing.includes("Solo Studio")) {
      return destPath; // already installed, skip
    }
    const template = readFileSync(templatePath, "utf8");
    writeFileSync(destPath, existing + "\n\n---\n\n" + template, "utf8");
  } else {
    const template = readFileSync(templatePath, "utf8");
    writeFileSync(destPath, template, "utf8");
  }

  return destPath;
}
