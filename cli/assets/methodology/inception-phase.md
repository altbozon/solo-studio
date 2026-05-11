# Inception Phase — Sprint 0

The phase before Sprint 1. You have an idea. By the end of Sprint 0, you have a product brief, a competitive map, a platform decision, and a sequenced roadmap ready to execute.

Sprint 0 produces no shippable code. It produces decisions.

---

## The flow

```
Your idea
    │
    ▼
Competitive analysis    ← research the market, find the gaps
    │
    ▼
Leads meeting           ← each discipline weighs in on the idea
    │
    ▼
Product brief           ← combined output: problem, user, killer flow,
    │                      platform, tech approach, risks, roadmap
    ▼
Sprint 0 close          ← Notion set up, CLAUDE.md written, EP ready
    │
    ▼
Sprint 1 kickoff        ← first engineering sprint
```

You can run competitive analysis and leads meeting in either order, or in parallel. Competitive analysis first gives the leads better context. Leads meeting first gives the competitive analyst a sharper brief.

---

## Step 1 — Competitive analysis

Before the leads meeting, map the market. See `competitive-analysis-template.md` for the full chat prompt.

Output: a competitive brief with:
- Market map (who exists, what platform, what price, what score)
- Gap analysis (what users complain about, what's missing)
- Feature ideas ranked by gap size and feasibility
- 2–3 positioning angles your product could own

Bring this into the leads meeting as context.

---

## Step 2 — Leads meeting

A single Discovery chat that plays each discipline in sequence. You describe the idea. Each discipline weighs in with a 3–5 point brief. The combined output is the product brief.

### Leads meeting chat prompt

```
Discovery chat — [Project name]

You are running a leads meeting for a new product idea. You will play 
each discipline in sequence, giving a brief from their perspective. 
The goal is to pressure-test the idea and produce a product brief.

The idea:
[DESCRIBE YOUR IDEA HERE — what it does, who it's for, 
what problem it solves, any constraints you already know]

Competitive brief (from competitive analysis):
[PASTE COMPETITIVE BRIEF HERE, or "not yet run"]

Play each discipline in order. For each one, write a brief of 3–5 
bullet points from that discipline's perspective. Be direct — flag 
real risks, don't just validate the idea.

═════ Disciplines ═════

PRODUCT
- What problem does this actually solve?
- Who is the primary user? What's their context?
- What is the killer flow — the one thing that makes this worth building?
- What's the smallest version that proves the idea?
- What's the positioning angle vs competitors?

DESIGN
- What is the UX shape? (single-screen utility / multi-screen app / 
  background service / etc.)
- What platforms does this live on? (iOS / Android / Web / Windows / 
  macOS / cross-platform)
- What's the visual direction? (tool / consumer / professional / 
  ambient)
- What are the highest-risk UX flows to get right?

ENGINEERING
- What is the core technical approach?
- What are the highest-risk technical unknowns?
- What dependencies or third-party services does this require?
- What's the right stack for this platform decision?
- What would kill this if we got it wrong?

ML / DATA
- Are there AI/ML opportunities in this product?
- What models or APIs are relevant? (on-device vs cloud, existing 
  APIs vs custom)
- What's the data story? (what does the app collect, store, process)
- What are the ML risks? (latency, accuracy, cost, privacy)

QA
- What are the highest-risk flows to test?
- What does the device / platform matrix look like?
- What failure modes are hardest to catch?
- What's the minimum viable test strategy for Sprint 1?

ANALYTICS
- What metrics prove the killer flow is working?
- What's the funnel? (acquisition → activation → retention → revenue)
- What telemetry needs to be in from day one?
- What would we regret not having instrumented by Sprint 3?

═════ After all disciplines have weighed in ═════

Produce a combined PRODUCT BRIEF:

1. Problem statement (one sentence)
2. Primary user (one sentence)
3. Killer flow (the one scenario that makes this worth building — 
   step by step)
4. Platform decision (with rationale)
5. Technical approach (2–3 sentences)
6. Top 3 risks (across all disciplines)
7. Feature tiers:
   - Tier 0: must ship for the killer flow to work
   - Tier 1: high-value, ship in first 3 sprints
   - Tier 2: good ideas, ship later or cut
   - Deferred: explicitly out of scope until further notice
8. Recommended Sprint 1 scope (what to build first and why)

Present the brief, then wait. Do not start planning sprints or 
writing tasks until the user approves the brief.
```

---

## Step 3 — Product brief review

Read the brief. Push back on anything wrong. Common things to fix:
- Killer flow is too complex (should be one scenario, not three)
- Tier 0 is too big (should be the minimum that proves the idea)
- Platform decision is premature (if you're not sure yet, decide in Sprint 0)
- A risk is missing that you already know about

When the brief looks right, approve it.

---

## Step 4 — Sprint 0 close

With the approved product brief, set up the project infrastructure:

- [ ] Create Notion Tasks DB + Projects DB (if not already in your workspace)
- [ ] Create Production HQ page for this project
- [ ] Create project row in Projects DB
- [ ] Write `CLAUDE.md` from the template in `examples/CLAUDE.md.example`
      — fill in the platform decision, hard constraints, build gate, Notion links
- [ ] Create `~/.claude/projects/<project>/memory/` directory
- [ ] Write initial `MEMORY.md` index (start with the product brief summary)
- [ ] Write `VERSION` file at repo root: `0.0.0`
- [ ] Create Tier 0 + Tier 1 tasks in Notion with disciplines assigned
- [ ] EP ready for Sprint 1 kickoff

---

## Platform decision guide

| Platform | Stack options | Key disciplines |
|---|---|---|
| iOS | Swift/SwiftUI, React Native, Flutter | Engineering, ML/Data (on-device), UI/Frontend |
| Android | Kotlin/Jetpack Compose, React Native, Flutter | Engineering, UI/Frontend |
| macOS | Swift/SwiftUI, Electron, web wrapper | Engineering, UI/Frontend |
| Windows | .NET/WinUI, Electron, web wrapper | Engineering, UI/Frontend |
| Web | React, Vue, Svelte + backend of choice | Engineering, UI/Frontend |
| Cross-platform | React Native, Flutter, Tauri | Engineering, UI/Frontend, QA (device matrix) |
| CLI / service | Python, Go, Rust, Node | Engineering, ML/Data |
| Multi-platform | Any of the above in combination | Add Platform discipline |

**Platform discipline** — add this discipline when the project ships on 3+ platforms or has significant platform-specific integration work (entitlements, permissions, native APIs, store submission). It owns platform config, signing, store assets, and device matrix.

---

## Anti-patterns in Sprint 0

- **Skipping competitive analysis** — you'll discover competitors in Sprint 3 and have to redesign
- **Tier 0 that's really Tier 1** — if you can't explain the killer flow without it, it's Tier 0; if you can, it isn't
- **Deciding the stack before the platform** — platform first, stack follows
- **Skipping the brief review** — the Discovery chat will miss something; your job is to find it
- **Starting Sprint 1 before CLAUDE.md is written** — the first worker opens cold; if CLAUDE.md isn't there, it starts from scratch
