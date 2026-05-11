#!/usr/bin/env node
import { PLATFORMS, ALL_PLATFORMS } from "./platforms.js";
import { installMethodology, writeInstructionFile } from "./install.js";

const VERSION = "0.1.0";

function usage() {
  console.log(`
solo-studio-cli v${VERSION}

USAGE
  solo-studio init --ai <platform>   Install methodology for a specific assistant
  solo-studio init --ai all          Install for all supported assistants
  solo-studio versions               List supported platforms

PLATFORMS
${ALL_PLATFORMS.map((p) => `  ${p.padEnd(12)} ${PLATFORMS[p].label}`).join("\n")}
`);
}

function run() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "--help" || cmd === "-h") {
    usage();
    return;
  }

  if (cmd === "versions") {
    console.log("\nSupported platforms:\n");
    for (const id of ALL_PLATFORMS) {
      console.log(`  ${id.padEnd(12)} ${PLATFORMS[id].label}`);
    }
    console.log();
    return;
  }

  if (cmd === "init") {
    const aiIdx = args.indexOf("--ai");
    if (aiIdx === -1 || !args[aiIdx + 1]) {
      console.error("Error: --ai <platform> is required\n");
      usage();
      process.exit(1);
    }

    const target = args[aiIdx + 1].toLowerCase();
    const cwd = process.cwd();

    const platformIds = target === "all" ? ALL_PLATFORMS : [target];

    for (const id of platformIds) {
      const platform = PLATFORMS[id];
      if (!platform) {
        console.error(`Unknown platform: ${id}`);
        console.error(`Supported: ${ALL_PLATFORMS.join(", ")}`);
        process.exit(1);
      }

      console.log(`\nInstalling Solo Studio for ${platform.label}...`);

      const installed = installMethodology(platform, cwd);
      console.log(`  Methodology files (${installed.length}): ${platform.methodologyDir(cwd)}`);

      const instrFile = writeInstructionFile(platform, cwd);
      console.log(`  Project instructions: ${instrFile}`);

      if (platform.note) {
        console.log(`\n  ${platform.note}`);
      }
    }

    console.log(`
Next steps:
  1. Open ${platformIds.length === 1 && platformIds[0] !== "all" ? PLATFORMS[platformIds[0]].instructionFile : "the generated instruction file"}
  2. Fill in your project-specific values (name, Notion links, build gate, hard constraints)
  3. Start with Sprint 0 — see methodology/inception-phase.md
`);
    return;
  }

  console.error(`Unknown command: ${cmd}\n`);
  usage();
  process.exit(1);
}

run();
