# Project memory structure

What `~/.claude/projects/<your-project>/memory/` looks like after a few sprints.

The memory system is how Solo Studio compounds. Every hard-won lesson gets written here so future chats don't repeat the same mistake.

---

## Directory layout

```
memory/
    MEMORY.md                        ← index, loaded on every session
    
    # User preferences
    alt_user_preferences.md          ← how this user likes to collaborate
    
    # Project state
    project_roadmap.md               ← feature tiers, sequencing decisions
    project_sprint1_state.md         ← what shipped, what was deferred
    project_architecture.md          ← key decisions and why
    
    # Feedback memories (how to work in this project)
    feedback_testing_approach.md     ← BDD / XCTest / what the project uses
    feedback_estimates.md            ← calibration data, discount factors
    feedback_hard_constraints.md     ← standing rules (Apple Dev, etc.)
    
    # Technical gotchas
    [tech]_[topic].md                ← one file per hard-won lesson
    
    # Reference
    sprint_owner_template.md         ← Owner prompt fill-in for this project
```

---

## MEMORY.md format

One line per entry. 150 char max. Loaded cold on every session.

```markdown
- [Entry title](filename.md) — one-line hook: what it is and when it matters
- [iOS 18 share extension](ios18_share_ext.md) — extensionContext.open() dead on iOS 18+; use CFBundleDocumentTypes
- [Estimates run hot](feedback_estimates.md) — Apple-side work discounted 50%; buffer tasks closed at 0d twice
- [Sprint 3 state](project_sprint3_state.md) — what shipped, VERSION 0.3.0, 2 tasks deferred to backlog
```

---

## Memory file format

```markdown
---
name: [short name]
description: [one line — used to decide relevance in future sessions]
type: [user | feedback | project | reference]
---

[content]

**Why:** [the reason — often a past incident or strong preference]
**How to apply:** [when this kicks in]
```

---

## The promotion rule

| Where it lives | When to use it |
|---|---|
| `~/.claude/knowledge/` | Lesson helps any project using the same tech (Swift, Notion API, etc.) |
| `memory/` | Lesson only makes sense for this specific project |
| Both | Keep a short pointer in memory, full lesson in knowledge |

When a lesson appears in two different projects, promote it to global knowledge.

---

## What NOT to store

- Code patterns or architecture — derivable from reading the code
- Git history — `git log` is authoritative  
- In-progress task state — that's Notion's job
- Anything already in CLAUDE.md
