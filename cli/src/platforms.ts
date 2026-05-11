import { homedir } from "os";
import { join } from "path";

export interface Platform {
  id: string;
  label: string;
  /** Where methodology/*.md files are copied. Absolute path. */
  methodologyDir: (cwd: string) => string;
  /** Whether methodology dir is global (home-based) or local to project */
  methodologyScope: "global" | "local";
  /** Path of the generated project instruction file, relative to cwd */
  instructionFile: string;
  /** Template file name (in assets/templates/) */
  template: string;
  /** Note shown after install */
  note?: string;
}

export const PLATFORMS: Record<string, Platform> = {
  claude: {
    id: "claude",
    label: "Claude Code",
    methodologyDir: () => join(homedir(), ".claude", "methodology"),
    methodologyScope: "global",
    instructionFile: "CLAUDE.md",
    template: "claude.md",
    note: "Methodology installed globally to ~/.claude/methodology/. Add a pointer to CLAUDE.md in any project to activate.",
  },
  cursor: {
    id: "cursor",
    label: "Cursor",
    methodologyDir: (cwd) => join(cwd, ".solo-studio", "methodology"),
    methodologyScope: "local",
    instructionFile: ".cursor/rules/solo-studio.mdc",
    template: "cursor.md",
    note: "Methodology installed to .solo-studio/methodology/. Rules file written to .cursor/rules/solo-studio.mdc.",
  },
  copilot: {
    id: "copilot",
    label: "GitHub Copilot",
    methodologyDir: (cwd) => join(cwd, ".solo-studio", "methodology"),
    methodologyScope: "local",
    instructionFile: ".github/copilot-instructions.md",
    template: "copilot.md",
    note: "Methodology installed to .solo-studio/methodology/. Instructions written to .github/copilot-instructions.md.",
  },
  gemini: {
    id: "gemini",
    label: "Gemini CLI",
    methodologyDir: (cwd) => join(cwd, ".solo-studio", "methodology"),
    methodologyScope: "local",
    instructionFile: "GEMINI.md",
    template: "gemini.md",
    note: "Methodology installed to .solo-studio/methodology/. Instructions written to GEMINI.md.",
  },
  windsurf: {
    id: "windsurf",
    label: "Windsurf",
    methodologyDir: (cwd) => join(cwd, ".solo-studio", "methodology"),
    methodologyScope: "local",
    instructionFile: ".windsurf/rules/solo-studio.md",
    template: "windsurf.md",
    note: "Methodology installed to .solo-studio/methodology/. Rules written to .windsurf/rules/solo-studio.md.",
  },
};

export const ALL_PLATFORMS = Object.keys(PLATFORMS);
