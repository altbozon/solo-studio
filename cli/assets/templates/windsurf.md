# Solo Studio — Project Methodology

This project runs under **Solo Studio**, a role-separated production methodology for solo developers using AI coding assistants.

Full methodology reference: `.solo-studio/methodology/production-pipeline.md`

---

## Chat roles

**EP session** — cross-sprint, defines scope, never writes code.
Kickoff prompt: `.solo-studio/methodology/ep-chat-template.md`

**Owner session** — one per sprint. Sets up branches, coordinates workers, merges when done, bumps VERSION.
Kickoff prompt: `.solo-studio/methodology/owner-chat-template.md`

**Worker sessions** — one per discipline, EP-authorised only. Each on a dedicated branch: `sprint<N>/<discipline>`.
Kickoff prompt: `.solo-studio/methodology/worker-chat-template.md`

---

## Project identity
- **App / product name:** [Name]
- **Type:** [web app / CLI tool / backend service / etc.]
- **Repo root:** [absolute path]

## Platform & build gate
```bash
[command to verify a branch is shippable before merging]
```

## Hard constraints
- [e.g. "No paid service sign-ups without explicit EP authorisation"]

## Notion
- **Production HQ:** [URL]
- **Tasks DB:** [URL]

## Disciplines active
Engineering · ML / Data · Design · UI / Frontend · Platform · QA · Analytics · Product

## Key gotchas
<!-- Hard-won facts every session needs on open. Grows over sprints. -->
