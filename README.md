# Solo Studio

A production methodology for building software alone, at studio quality, using Claude Code.

You stay in the EP seat. Claude chats fill every discipline role.

---

## The idea

Studio productions work because roles are separated. The executive producer never writes code. The engineering lead doesn't make product decisions. Each discipline owns its lane, and a shared tracker — not hallway conversations — keeps everyone aligned.

Solo Studio brings that model to a one-person project. You define scope and approve decisions. Claude chats handle execution across disciplines. Notion is the shared source of truth. No chat talks to another — they all read and write Notion.

The result: focused context per session, clean git history, and a production system that gets more accurate the longer you use it.

---

## How it works

```
              YOU
           (EP seat)
               │
       ┌───────┴───────┐
       │   EP chat     │  ← defines scope, never writes code
       └───────┬───────┘
               │
       ┌───────┴───────┐
       │  Owner chat   │  ← coordinates workers, merges branches
       └───┬───┬───┬───┘
           │   │   │
        [Eng] [ML] [UI]   ← each in its own git worktree
           │   │   │
           └───┴───┘
               │
           NOTION
       (shared state)
```

**EP chat** — One per sprint kickoff. Reads Notion, proposes scope, produces the Owner prompt. Never touches code.

**Owner chat** — One per sprint. Sets up worktrees, kicks off workers in dependency order, merges as branches land, closes the sprint.

**Worker chats** — One per discipline (Engineering, ML/Data, Design, UI/Frontend, QA). Each works in its own `git worktree`. Owns one Notion task end-to-end. Marks it Done with actual cost before moving on.

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

### 5. Run your first EP session

Open Claude Code in your project directory and paste the EP kickoff prompt from `methodology/ep-chat-template.md`, filled with your project's values.

The EP will orient, say "EP ready.", and wait for your first command.

Then: `kick off: Sprint 1`

---

## The files

```
methodology/
    production-pipeline.md    full reference: roles, Notion schema,
                              Definition of Done, memory tiers,
                              worktree rules, anti-patterns

    ep-role.md                EP posture and practice — what to do,
                              what not to do, how a session opens
                              and closes

    ep-chat-template.md       ready-to-paste EP kickoff prompt
                              with project fill-in guide

    owner-chat-template.md    Owner prompt with hard constraints
                              section, scope block format, worker
                              pattern decision guide, notes for EP

    worker-chat-template.md   Worker prompt skeleton — Owner fills
                              in discipline, tasks, build gate

examples/
    CLAUDE.md.example         what a well-formed project CLAUDE.md
                              looks like under this methodology

    project-memory-structure  what the project memory directory
                              looks like after a few sprints

    sprint-runsheet.md        the EP's personal sprint checklist —
                              copy per sprint, tick through
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

## What disciplines look like

Default seven. Projects can prune but shouldn't invent new ones — the schema is shared across projects so cross-project rollups stay clean.

`Engineering` · `ML / Data` · `Design` · `UI / Frontend` · `Product` · `QA` · `Analytics`

Each task has exactly one discipline. Each worker chat owns one discipline per sprint.

---

## Adapting to your project

The methodology layer (`~/.claude/methodology/`) is project-agnostic. Project-specific values — Notion links, build gates, hard constraints, bundle IDs — live in project memory (`~/.claude/projects/<project>/memory/`).

When something works on one project and would help any project using the same tech, promote it to global knowledge (`~/.claude/knowledge/`). That's how the system compounds across projects, not just within them.

---

## Contributing

If you adopt this and find something that should be in the template — a better owner pattern, a missing anti-pattern, a discipline split that works well — open a PR. The methodology improves the same way projects do: one sprint at a time.
