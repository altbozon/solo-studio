# Context limit handoff protocol

What to do when a worker or owner chat is approaching its context window limit mid-task.

Claude Code sessions have a finite context window. Long-running worker sessions — especially ones doing large refactors, reading many files, or running repeated build cycles — will eventually hit the limit. Without a protocol, the session degrades silently: the chat starts forgetting earlier decisions, produces inconsistent output, and eventually can't continue.

This protocol makes the handoff explicit and lossless.

---

## Signs you're approaching the limit

- The chat starts asking questions it already answered earlier in the session
- It references files it read but can't recall the contents accurately
- Build errors it fixed earlier reappear
- Response quality noticeably degrades
- Claude Code warns you about context length

**Don't wait for the warning.** Hand off proactively when a task boundary is reached.

---

## The handoff procedure

### 1. Reach a clean stopping point

Before handing off, get to a safe state:
- Complete the current subtask (don't hand off mid-function)
- Commit what's done: `git commit -m "wip: [what's done]"` on the discipline branch
- Run the build gate — confirm it passes at this point
- Update the Notion task with current progress (not Done — use the task body to note where you stopped)

### 2. Write a handoff note

The departing chat writes a `handoff.md` file at the worktree root:

```markdown
# Handoff — [Discipline] Worker — Sprint <N> — [date]

## What's done
- [subtask 1]: complete, committed at [short SHA]
- [subtask 2]: complete, committed at [short SHA]

## What's in progress
- [subtask 3]: [describe exact state — what file, what function, what decision point]

## What's remaining
- [subtask 4]: [scope from Notion task]
- [subtask 5]: [scope from Notion task]

## Decisions made this session
- [decision 1 and why — things the next chat needs to know that aren't in the code]
- [decision 2 and why]

## Watch out for
- [anything that bit you that the next chat should know]

## Files modified
- [file 1] — [what changed]
- [file 2] — [what changed]

## Build state
- Build gate: [passing / failing — and if failing, why]
- Last commit: [git log --oneline -3 output]
```

Commit the handoff note: `git commit -m "chore: handoff note"`

### 3. Tell the Owner

Report to the Owner chat:
```
Context limit reached. Committed through [subtask N]. Handoff note at worktree root.
Remaining: [subtask N+1], [subtask N+2]. Ready for a fresh worker session.
```

### 4. Owner spawns a fresh worker

Owner uses the same Worker prompt template, with one addition at the top:

```
⚠️ HANDOFF SESSION — read handoff.md at the worktree root BEFORE 
touching anything. All context for this session is in that file.
```

The fresh worker reads `handoff.md`, loads the relevant memory files, verifies the build gate passes, and continues from where the previous worker stopped.

### 5. Clean up

When the task is fully Done and the Notion task is closed, delete `handoff.md`:
```bash
git rm handoff.md
git commit -m "chore: remove handoff note"
```

---

## Owner-level handoff (sprint too long for one Owner session)

Same principle. Owner writes a `sprint-handoff.md` at the repo root:

```markdown
# Sprint <N> Owner Handoff

## Worker status
- Engineering: [Done / In progress — describe state]
- ML/Data: [Done / Not started]
- UI/Frontend: [Done / In progress]

## Branches
- sprint<N>/engineering: [merged / open — last commit SHA]
- sprint<N>/ml: [merged / not started]

## Worktrees
- ../project-engineering: [exists / removed]

## Pending merges
- [branch]: ready to merge — Notion task Done, build gate passing
- [branch]: waiting on worker — estimated [X]d remaining

## Open decisions needing EP input
- [decision 1]
```

---

## Anti-patterns

- **Handing off mid-function** — next chat inherits broken state; always reach a commit boundary first
- **Skipping the handoff note** — next chat starts cold with no context; wastes the whole session reconstructing what was done
- **Owner continuing after context degrades** — Owner making wrong merge decisions is worse than pausing; handoff early
- **Deleting the handoff note before the task closes** — keep it until Notion task is Done
