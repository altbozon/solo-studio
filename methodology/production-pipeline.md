# Production Pipeline — portable methodology

A Claude-native production model for running a software project with role-specialized chat agents and a shared source of truth.

Origin project: Motion Capture App (5+ sprints shipped under this model). Refined live across each sprint.

This doc is **project-agnostic**. Drop a pointer to it from any project's CLAUDE.md and the methodology applies. Project-specific state (sprint plan, feature roadmap, calibration memories) lives in the project, not here.

---

⚠️ **DO NOT WRITE TO `~/.claude/methodology/`** if you are an Owner, Worker, or Feature chat.
This includes edits, new files, and delta/amendment files.
Methodology is maintained by the EP meta-session only.
If you found a process problem: flag it as `Methodology candidate:` in your closing
report, OR write a delta file to project memory (`~/.claude/projects/<project>/memory/`)
— not here. The EP finds it there and integrates on the next session.

---

---

## Core idea

One database (Notion) is the source of truth. Multiple Claude chats with **distinct roles** read and write to it. No chat-to-chat communication — Notion is the shared memory. Each chat opens cold, queries Notion, does its job, closes.

This keeps token cost low, context focused, and the cross-project view always queryable.

---

## Chat roles

### EP chat
The "executive producer." Periodic. Cross-feature view only — sprint health, blockers, cost rollups, kicking off features. **Never writes feature code.** Reads Notion fresh each session. Closes when its question is answered.

**EP commands** (the chat translates these into Notion reads/writes):
- `kick off: [feature name] → Sprint [N]` — create discipline tasks in Notion for the feature
- `sprint [N] status` — open / blocked / done counts by discipline
- `what's blocking sprint [N]?` — list blocked tasks and dependencies
- `cost summary sprint [N]` — Cost Estimate vs Actual by discipline
- `feature [name] done` — mark all linked tasks Done, report blockers

### Feature chat
One per feature, for the duration of that feature. Owns the discipline tasks for that feature. Writes code, updates task status and cost in Notion as work progresses. Closes when feature ships.

**To start:** open a new Claude Code session in the project directory and say `Feature chat: [feature name]`.

### Owner chat (sprint coordinator)
Used only when the worker-chat-per-discipline pattern is in play (typically multi-sprint App Store / large parallel work). One owner chat coordinates N worker chats. **Owner chat does not write feature code.**

Owner chat responsibilities:
1. Create discipline branches at sprint start (`git branch sprint<N>/<discipline>` per worker).
2. Kick off worker chats in dependency order (skeleton first, others fan out).
3. **Merge branches back to `main` as they land.** Nothing merges automatically. A branch is ready when its Notion discipline task is `Done`.
4. When all discipline tasks Done and merged: bump `VERSION`, tag the sprint, close parent Notion task.

**🔴 MANDATORY: surface worker prompts as verbatim code blocks.**
When kicking off any worker (Wave 1, Wave 2, Wave 3, re-kicks, retries —
every time), the Owner's chat response MUST contain the full worker prompt
inside a fenced code block. Even if the prompt is already written in the
EP kickoff doc, the Owner reproduces it verbatim in chat output.

- DO output: a fenced code block with the complete prompt body.
- DO NOT: point at the kickoff doc ("paste the Engineering prompt above").
- DO NOT: summarize, paraphrase, or describe the prompt.
- DO NOT: tell the user to scroll up or open another doc.

The user must be able to copy each prompt with one click. Owner output
that points at existing text is a hard failure — the user will reject it
and the sprint stalls. This rule is non-negotiable.

**Owner chat trigger phrase from EP/user:** `status check — merge anything that's ready`.

**Kickoff prompt template:** `~/.claude/methodology/owner-kickoff-template.md` — copy, fill in `<N>` and scope list, paste into a new Claude Code session. Includes the Apple enrolment hard rule and the Definition of Done gate.

### Worker chat (per discipline) — only when EP authorises
For features too large for a single Feature chat. One worker per discipline.

**Mandatory rule:**
- **Every worker chat MUST run in its own `git worktree`.** No exceptions.
  - Create at session start: `git worktree add ../<project>-<discipline> sprint<N>/<discipline>`
  - Work, commit, push from that worktree only.
  - Owner chat removes worktrees with `git worktree remove` after merge.
- Sharing the main working tree between worker chats causes branch contention — workers can land commits on each other's branches when they checkout between another worker's checkout and commit. **This has happened.** Worktrees eliminate the race entirely.
- Each worker still owns one Notion discipline task end-to-end and updates it directly.

---

## Disciplines

Default 7 disciplines for a software product:
`Engineering` · `ML / Data` · `Design` · `UI / Frontend` · `Product` · `QA` · `Analytics`

A project can prune (e.g. drop `Analytics` for early-stage) but should not invent new ones — the schema is shared across projects so cross-project rollups stay clean.

Each task has exactly one discipline. When a feature is kicked off, one task is created per discipline that has work to do. Discipline tasks are sub-tasks of the feature's parent (Discipline = `Product`) task.

---

## Notion structure (required)

Each project shares the workspace's existing Tasks and Projects databases. Per project, the following must exist:

1. **One row in Projects DB** — Type matches the project category (`Code`, `Product`, etc.). Status moves through Backlog → In Progress → Done.

2. **Tasks DB schema must include** these fields beyond Notion's defaults:
   - `Discipline` (select: the 7 above)
   - `Sprint` (select: Sprint 1, 2, 3… + Backlog)
   - `Cost Estimate` (number, in days)
   - `Actual Cost` (number, in days)
   - `Project` (relation to Projects DB)
   - `Blocked By` / `Is Blocking` (self-relation on Tasks)
   - `Parent-task` / `Sub-tasks` (self-relation for feature → discipline tasks)

3. **Production HQ page** per project — the EP control room. Sections:
   - Quick links (project entry, Tasks DB, Projects DB, Home)
   - EP commands reference
   - Sprint table (one row per sprint, status + goal + actual vs estimate)
   - Disciplines list
   - Cost tracking notes
   - Feature roadmap (organised by tier or theme)

4. **Task naming convention:**
   - Parent feature task: `<Feature name>` (Discipline = Product)
   - Discipline sub-task: `<Feature name> — <Discipline>: <one-line scope>` (e.g. `RTSP input — Engineering: cv2.VideoCapture wrapper + reconnect`)

---

## Definition of Done

A feature task is **Done** when:
1. Tests written (BDD `.feature` file via pytest-bdd, or XCTest, or whatever the project uses) and passing
2. Telemetry wired — every user-visible action, screen view, and lifecycle event has a call site. If no new events are needed, the Feature chat must say so explicitly and why.
3. Committed with a Conventional Commit (`feat:` / `fix:` / `chore:` / `test:` / `refactor:`)
4. **Notion task marked Done with Actual Cost filled in (days)** — mandatory, not optional
5. No regressions in existing test suite

**Telemetry, Localization, and Tests are non-negotiable.** Every Feature chat prompt must include `## Telemetry`, `## Localization`, and `## Tests` sections before the DoD. A feature that ships without them is not Done. See `ep-role.md → How to write a Feature chat prompt`.

**Settings-toggle addendum.** When a feature task adds a user-visible Settings toggle:
1. The runtime call site that reads the toggle is in scope — not just the UI and persistence layer.
2. At least one test must flip the toggle and assert a behaviour change. That test belongs at the runtime layer (coordinator / model), not inside the Settings view's own test file — testing inside the view re-verifies persistence, not behaviour.
3. Merge-gate question for any toggle-touching branch: "can you point me at the test that fails when this toggle is removed?" If no such test exists, the toggle is silent and the branch is not Done. *(On trial from Sprint 9 — one direct data point; revisit after Sprint 10.)*

**Feature chat closing rule:** before ending any Feature session, the chat MUST update Notion. If a previous session forgot, do it at the start of the next one before touching code.

A sprint is **Done** when all its feature tasks are Done, `VERSION` is bumped (`MINOR` per sprint milestone), and a git tag is applied (`v0.X.0`).

---

## Versioning

- Semver in `VERSION` file at repo root
- `PATCH` = bug fix · `MINOR` = new feature / sprint milestone · `MAJOR` = breaking change
- Tag each sprint milestone (`git tag v0.2.0` when Sprint 2 ships)

---

## Memory — three-tier model

Learnings get banked at the right altitude based on who they're useful to.

### Tier 1 — Global knowledge (`~/.claude/knowledge/`)
Cross-project technical knowledge. A Swift gotcha learned in Project A should be available when working on Project B's Swift code. Topic-organised — see `~/.claude/knowledge/INDEX.md`.

**Promote here when:** the lesson would help a stranger working on a totally different project that uses the same tech (Swift, Apple framework, Notion API, MediaRecorder, etc.).

### Tier 2 — Project memory (`~/.claude/projects/<project>/memory/`)
Project-specific facts and decisions. Bundle IDs, sprint history, why we picked native Swift over Python wrapper *for this project*, deployment-target trade-offs.

**Keep here when:** the fact only makes sense in the context of this specific app or its current state.

### Tier 3 — Calibration patterns (project memory, but cross-project potential)
Estimates running hot, buffer task patterns, sprint cadence observations. These start project-local but graduate to global once they hold across two or more projects.

**Pattern:** when Sprint N closes, EP banks any cost variance / blocker / recurrence into project memory. After two confirming data points across different projects, promote to global.

---

## Promotion rule (mandatory)

When a Worker / Feature / EP chat captures a learning, the closing-out step includes a triage:

- "Is this lesson tech-agnostic and reusable on other projects?" → write to `~/.claude/knowledge/<topic>.md` (or extend an existing topic file). Add a one-line entry to `~/.claude/knowledge/INDEX.md`.
- "Is this only meaningful for *this* project?" → write to project memory.
- "I'm not sure" → default to project memory. Future EP audits can promote later. Don't over-globalise prematurely.

**Methodology candidate flag:** workers may also flag process-level observations — not tech gotchas, but friction in the workflow itself (a rule that caused confusion, a missing step, a template gap). These go in the closing report to Owner as a `Methodology candidate:` line. The EP reviews them at sprint close and decides whether to update `~/.claude/methodology/`. Workers do not touch methodology files directly.

When promoting an existing project memory:
1. Copy the general pattern to the relevant global knowledge file.
2. Trim the project memory to a short pointer + project-specific origin context (e.g. "Caught in Sprint 6 ClipRecorder.swift — see `~/.claude/knowledge/swift-language.md` for the general pattern").
3. Don't delete the project memory unless it's truly redundant — the origin context is often useful.

---

## Bootstrapping a new project under this methodology

The first chat opened in a project directory under this methodology should be an **EP audit chat**, not a feature chat. Its job:

1. Read this methodology doc
2. Read the project's existing CLAUDE.md, Notion page, recent git log
3. Audit: what already aligns, what's missing, what should stay as-is, what to restructure
4. Propose an adoption plan — phased, non-destructive
5. Report back. Do not write code or restructure anything until the user approves.

After approval, the audit chat (or a new EP chat) executes the adoption:
- Add methodology pointer to project CLAUDE.md
- Extend Tasks DB schema if missing fields
- Create Production HQ page
- Create / update Project entry in Projects DB
- Migrate any existing in-flight work into the Tasks DB structure

Then Sprint 1 (or "Sprint N+1" if work has been happening) kicks off normally.

---

## Anti-patterns (don't do these)

- One big chat for the whole project — token cost compounds, focus collapses
- Treating Notion as documentation only — it must be the active source of truth, written every sprint
- Buffer tasks "just in case" — once two consecutive sprints close them at 0d, drop them
- Sharing a working tree across parallel chats — always use worktrees
- Letting the Feature chat close without updating Notion — the EP catches it later but the gap creates ambiguity
- Inventing new disciplines per project — keep the schema portable
- Updating Notion fields the API rejects — Status enum on Projects DB and Tasks DB only accept a subset (Backlog/Canceled/Done; Not Started/Done/Archived). "In Progress" must be set in the Notion UI.
