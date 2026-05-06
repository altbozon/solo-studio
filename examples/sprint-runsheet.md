# Sprint PM Runsheet

**How to use:** Copy this file per sprint (`sprint-N-runsheet.md`). Fill in the scope block, work top to bottom, tick as you go. This is your personal tracking doc as EP — not a Claude prompt.

---

## Sprint [N] — [one-line goal] — [date]

---

### PHASE 1 · Define

- [ ] Open EP chat from project git root
- [ ] EP reads: memory → Notion → git log — orients silently
- [ ] Move known external blockers to Backlog before defining scope
- [ ] Fill in scope block below
- [ ] Verify no hard constraints crossed by any task
- [ ] Create Notion tasks (or verify they exist)
- [ ] Decide worker pattern

---

### SCOPE BLOCK (paste into EP chat when you say "kick off Sprint N")

```
Goal: [one line — what's shipped at end of sprint]

Tasks (in dependency order):
- [Task 1] — [Discipline], [X]d, Notion: [URL]
  Scope: [one sentence]

- [Task 2] — [Discipline], [X]d, Notion: [URL]
  Scope: [one sentence]

Total estimate: [X]d

Worker pattern: [Feature chat per task | Worker per discipline | Sequential single worker]
```

**Worker patterns:**
- `Feature chat per task` — tasks are independent features, each coherent alone
- `Worker per discipline` — one feature fans out across multiple disciplines
- `Sequential single worker` — all tasks same discipline, can chain

---

### PHASE 2 · Kickoff

- [ ] Say "kick off Sprint N" to EP chat with scope block above
- [ ] EP proposes scope — review for constraint violations
- [ ] Approve scope
- [ ] EP creates Notion tasks and produces Owner prompt
- [ ] Spawn Owner chat in project git root with Owner prompt
- [ ] Verify Owner read memory before acting
- [ ] Verify Owner set up worktrees: `git worktree list`

---

### PHASE 3 · Monitor

- [ ] Blocker escalations: ___
- [ ] Scope drift: ___
- [ ] All workers reported Done?

---

### PHASE 4 · Close

- [ ] Notion: all tasks = Done + Actual Cost filled
- [ ] `git log --oneline -10` — all expected commits present
- [ ] `git worktree list` — only main working tree remains
- [ ] Tag exists: `git tag | tail -5`
- [ ] VERSION bumped: `cat VERSION`
- [ ] Retro note in Notion parent task
- [ ] Bank surprises to memory
- [ ] Update sprint table in Production HQ

---

### Sprint close snapshot

| | Estimate | Actual |
|---|---|---|
| Total | | |
| [Discipline 1] | | |
| [Discipline 2] | | |

Shipped: ___  
Deferred: ___  
Memory banked: ___
