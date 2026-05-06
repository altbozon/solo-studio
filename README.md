# Solo Studio

A production methodology for building software alone, at studio quality, using Claude Code.

You stay in the EP seat. Claude chats fill every discipline role.

---

## The idea

Studio productions work because roles are separated. The executive producer never writes code. The engineering lead doesn't make product decisions. Each discipline owns its lane, and a shared tracker — not hallway conversations — keeps everyone aligned.

Solo Studio brings that model to a one-person project. You define scope and approve decisions. Claude chats handle execution across disciplines. Notion is the shared source of truth. No chat talks to another — they all read and write Notion.

The result: focused context per session, clean git history, and a production system that gets more accurate the longer you use it.

---

## The full lifecycle

```
    YOUR IDEA
        │
        ▼
  ┌─────────────┐
  │  Sprint 0   │  Inception — Competitive analysis → Leads meeting
  │  (no code)  │  → Product brief → Platform decision → Roadmap
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │   EP chat   │  Reads Notion + memory → proposes sprint scope
  │             │  → produces Owner prompt → never writes code
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │ Owner chat  │  Sets up worktrees → kicks off workers
  │             │  → merges branches → closes sprint
  └──┬───┬───┬──┘
     │   │   │
  [Eng] [ML] [UI]  Each in its own git worktree
     │   │   │     Each owns one Notion task end-to-end
     └───┴───┘
         │
       NOTION
   (shared state)
```

## Chat roles

**Discovery chat** (Sprint 0 only) — plays each discipline in sequence to pressure-test your idea. Produces the product brief. See `methodology/inception-phase.md`.

**EP chat** — one per sprint kickoff. Reads Notion + project memory, proposes scope, produces the Owner prompt. Never touches code.

**Owner chat** — one per sprint. Sets up worktrees, kicks off workers in dependency order, merges as branches land, closes the sprint. Never writes code.

**Worker chats** — one per discipline. Each works in its own `git worktree`. Owns one Notion task end-to-end. Marks it Done with actual cost before moving on.

---

## What this builds on

Solo Studio is a hybrid of established practices, applied to a one-person Claude Code workflow. If you already know any of these, you'll recognise the pattern.

| Practice | What Solo Studio takes from it |
|---|---|
| **Agile / Scrum** | Sprint cadence, backlog, Definition of Done, retrospectives. Sprints are fixed scope (not fixed time) — they close when all tasks are Done, not on a calendar date. |
| **BDD** (Behaviour-Driven Development) | Tests are written as human-readable scenarios before code. Worker chats write `.feature` files (pytest-bdd) or equivalent platform tests as part of the Definition of Done — not after. |
| **Kanban** | Task states flow Backlog → In Progress → Done in Notion. No task moves forward without the previous gate passing. |
| **Trunk-based development** | Short-lived discipline branches (`sprint<N>/<discipline>`), merged to `main` with `--no-ff` as soon as they're Done. No long-lived feature branches. |
| **Conventional Commits** | Every commit is prefixed (`feat:` / `fix:` / `chore:` / `test:` / `refactor:`). Enforced in every worker's Definition of Done. Makes git history machine-readable and sprint history auditable. |
| **Discipline-based studio production** | Role separation between EP, Owner, and Workers. No role crosses into another's lane. The EP never writes code; workers never make strategic decisions. |
| **Context engineering** | Each chat role is scoped to minimise token cost and maximise focus. Notion + memory files replace chat-to-chat communication. Chats open cold and read state — they don't carry it. |

**What's new:** the combination. Scrum gives you the sprint model. BDD gives you the test discipline. Studio production gives you the role structure. Context engineering makes it work with LLMs. Solo Studio wires them together into a single workflow one person can run alone.

---

## What keeps it honest

**Definition of Done** — a task is not done until: tests written and passing, committed with a conventional commit, Notion task marked Done with actual cost filled in. All three, every time.

**Worktrees** — every worker runs in its own `git worktree`. Parallel chats in the same branch cause real branch contention. Worktrees eliminate it entirely.

**No chat-to-chat communication** — workers don't brief each other. They brief Notion. Token cost stays low. State is always auditable.

**The promotion rule** — learnings get written to project memory. Lessons that apply to any project using the same tech get promoted to global knowledge. The system gets smarter every sprint.

---

## Quickstart

### 1. Prerequisites
- [Claude Code](https://claude.ai/code) CLI
- A [Notion](https://notion.so) workspace
- A git repo for your project

### 2. Install the methodology files

```bash
mkdir -p ~/.claude/methodology
cp methodology/* ~/.claude/methodology/
```

### 3. Set up Notion

You need two databases in your workspace:
- **Tasks DB** — with fields: `Discipline` (select), `Sprint` (select), `Cost Estimate` (number), `Actual Cost` (number), `Project` (relation), `Blocked By` / `Is Blocking` (self-relation), `Parent-task` / `Sub-tasks` (self-relation)
- **Projects DB** — one row per project

Create a **Production HQ page** for your project (see `methodology/production-pipeline.md` for the required sections).

### 4. Add a pointer to your project's CLAUDE.md

```markdown
## Production methodology
See `~/.claude/methodology/production-pipeline.md`.
- EP chat: cross-sprint audit, kicks off features, never writes code
- Feature chat: one per feature, owns Notion task updates
- Worker chats: EP-authorised only, each in its own git worktree
```

Also add your project's Notion links, bundle IDs, build gate, and any hard constraints.

### 5. Run Sprint 0 — Inception

Before Sprint 1, run the inception phase:

```
a. Competitive analysis — paste methodology/competitive-analysis-template.md
   into a new Claude Code session. Output: competitive brief.

b. Leads meeting — paste the Discovery chat prompt from
   methodology/inception-phase.md with your idea + competitive brief.
   Output: product brief (problem, killer flow, platform decision,
   feature tiers, Sprint 1 recommendation).

c. Sprint 0 close — set up Notion, write CLAUDE.md, create memory/,
   write VERSION=0.0.0. Checklist in methodology/inception-phase.md.
```

### 6. Run your first EP session

Open Claude Code in your project directory and paste the EP kickoff prompt from `methodology/ep-chat-template.md`, filled with your project's values.

The EP will orient, say "EP ready.", and wait for your first command.

Then: `kick off: Sprint 1`

---

## The files

```
methodology/
    inception-phase.md            Sprint 0: competitive analysis →
                                  leads meeting → product brief →
                                  platform decision → Sprint 0 close

    competitive-analysis-         ready-to-paste prompt for mapping
    template.md                   the market and finding gaps before
                                  the leads meeting

    production-pipeline.md        full reference: roles, Notion schema,
                                  Definition of Done, memory tiers,
                                  worktree rules, anti-patterns

    ep-role.md                    EP posture and practice

    ep-chat-template.md           ready-to-paste EP kickoff prompt

    owner-chat-template.md        Owner prompt with fill-in guide

    worker-chat-template.md       Worker prompt skeleton

    context-handoff.md            Protocol for handing off a session
                                  when context limit is reached
                                  mid-task — lossless, commit-anchored

    debug-agent-template.md       Specialist debugger chat — investigates,
                                  diagnoses, proposes fix, never applies
                                  it without approval

examples/
    CLAUDE.md.example             platform-agnostic project CLAUDE.md
                                  template

    project-memory-structure.md   what the memory directory looks like
                                  after a few sprints

    sprint-runsheet.md            EP personal sprint checklist
```

---

## What workers learn on the job — and how it stays

Every chat opens cold. It has no memory of previous sessions. This would normally mean the same mistake gets made over and over.

Solo Studio fixes this with a three-tier memory system. When a worker hits a gotcha, discovers a pattern, or makes a decision worth keeping, it writes a memory file before closing. The next chat that opens — for any sprint, on any discipline — loads that file and doesn't repeat the mistake.

**How it works:**

At the end of every worker session:
```
1. Worker hits a gotcha (wrong API, broken pattern, estimate was way off)
2. Worker writes a memory file: ~/.claude/projects/<project>/memory/<topic>.md
3. Worker adds a one-line pointer to MEMORY.md (the index)
4. Session closes
```

The next session that opens reads MEMORY.md first. It sees the pointer, loads the file, and already knows what the previous worker learned.

**The three tiers:**

```
~/.claude/projects/<project>/memory/   ← project-specific
    MEMORY.md                          ← index, loaded every session
    swiftdata_multicontext_bug.md      ← e.g. "writes from a fresh context
                                           don't reach @Query — use mainContext"
    feedback_estimates.md              ← "Apple-side work runs 50% hot"
    sprint3_state.md                   ← what shipped, what deferred

~/.claude/knowledge/                   ← cross-project (any project, same tech)
    swift-language.md                  ← Swift concurrency patterns
    notion-api.md                      ← Notion API quirks and limits

~/.claude/methodology/                 ← cross-project (the production model itself)
    production-pipeline.md             ← this repo
```

**The promotion rule:**

A lesson starts in project memory. If the same lesson surfaces in a second project, it gets promoted to global knowledge — so any future project using the same tech gets it for free.

```
Project A worker hits a Swift concurrency bug
    → writes to Project A memory
        → same pattern appears in Project B
            → promoted to ~/.claude/knowledge/swift-language.md
                → Project C worker loads it on session open, never hits the bug
```

This is how the system compounds. You don't just get better at one project — you get better at every project that shares a technology.

---

## What you get after a few sprints

- A sprint history with real cost estimates vs actuals
- Calibration data that makes future scoping reliably accurate
- A project memory with 30–50 hard-won gotchas that any chat can load instantly
- Clean git history: one branch per discipline per sprint, merged with `--no-ff`
- A production system that runs faster the longer you use it

The compounding is the point. Each sprint makes the next one cheaper.

---

## Disciplines

Default eight. Projects prune to what's needed — don't invent new ones, the schema is shared across projects so rollups stay clean.

`Engineering` · `ML / Data` · `Design` · `UI / Frontend` · `Platform` · `QA` · `Analytics` · `Product`

| Discipline | Owns |
|---|---|
| Engineering | Core logic, APIs, data layer, backend |
| ML / Data | Models, inference, training, data pipelines |
| Design | UX flows, visual design, brand, assets |
| UI / Frontend | Platform UI code, component implementation |
| Platform | Platform-specific integration: entitlements, permissions, store assets, signing, device matrix. Add this discipline when shipping on 3+ platforms or when platform work is substantial. |
| QA | Test strategy, regression, device/browser matrix |
| Analytics | Telemetry, funnels, instrumentation, metrics |
| Product | Roadmap, competitive position, feature prioritisation |

Each task has exactly one discipline. Each worker chat owns one discipline per sprint.

## Platforms

The methodology is platform-agnostic. The build gate, stack, and worktree paths are project fill-ins — not assumptions.

| Platform | Typical stack | Build gate example |
|---|---|---|
| iOS | Swift / SwiftUI | `xcodebuild -scheme App -destination 'platform=iOS Simulator' build` |
| Android | Kotlin / Jetpack Compose | `./gradlew assembleDebug` |
| macOS | Swift / SwiftUI | `xcodebuild -scheme App -destination 'platform=macOS' build` |
| Windows | .NET / WinUI, Electron | `dotnet build` or `npm run build` |
| Web | React / Vue / Svelte | `npm run build && npm test` |
| Cross-platform | Flutter, React Native, Tauri | platform-specific CI commands |
| Backend / CLI | Python, Go, Rust, Node | `make test` or `cargo test` |

---

## Adapting to your project

The methodology layer (`~/.claude/methodology/`) is project-agnostic. Project-specific values — Notion links, build gates, hard constraints, bundle IDs — live in project memory (`~/.claude/projects/<project>/memory/`).

When something works on one project and would help any project using the same tech, promote it to global knowledge (`~/.claude/knowledge/`). That's how the system compounds across projects, not just within them.

---

## Keeping methodology and knowledge in sync across machines

The methodology files (`~/.claude/methodology/`) and global knowledge (`~/.claude/knowledge/`) are local by default. If you work across multiple machines, keep them in a private "memory umbrella" repo with symlinks.

### Setup — the umbrella pattern

```bash
# Machine 1 — create the umbrella repo
mkdir -p ~/.claude/memory-umbrella
mv ~/.claude/methodology ~/.claude/memory-umbrella/methodology
mv ~/.claude/knowledge   ~/.claude/memory-umbrella/knowledge

cd ~/.claude/memory-umbrella
git init && git add . && git commit -m "init"
gh repo create claude-memory --private --source=. --push

# Symlink back so Claude Code finds them at expected paths
ln -s ~/.claude/memory-umbrella/methodology ~/.claude/methodology
ln -s ~/.claude/memory-umbrella/knowledge   ~/.claude/knowledge
```

```bash
# Machine 2 (and any subsequent machine) — clone and symlink
cd ~/.claude
git clone https://github.com/<you>/claude-memory memory-umbrella
ln -s ~/.claude/memory-umbrella/methodology ~/.claude/methodology
ln -s ~/.claude/memory-umbrella/knowledge   ~/.claude/knowledge
```

Push from wherever you update. Pull before starting a session on another machine.

### What to put in the umbrella

| Directory | Sync? | Why |
|---|---|---|
| `~/.claude/methodology/` | Yes | Methodology is machine-agnostic |
| `~/.claude/knowledge/` | Yes | Cross-project lessons are machine-agnostic |
| `~/.claude/projects/<project>/memory/` | Optional | Project memory is most useful where you develop that project. Add it to the umbrella if you work on the same project across machines. |

### Cloud sync alternative (simpler)

```bash
# macOS iCloud example
mv ~/.claude/methodology ~/Library/Mobile\ Documents/com~apple~CloudDocs/claude/methodology
ln -s ~/Library/Mobile\ Documents/com~apple~CloudDocs/claude/methodology ~/.claude/methodology
```

Same approach works with Dropbox or any folder-sync service.

---

## Contributing

If you adopt this and find something that should be in the template — a better owner pattern, a missing anti-pattern, a discipline split that works well — open a PR. The methodology improves the same way projects do: one sprint at a time.
