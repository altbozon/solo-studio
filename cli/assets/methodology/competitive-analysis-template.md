# Competitive Analysis Template

Run this before the leads meeting. Output feeds directly into the Discovery chat as context.

One chat session. Web search enabled. Takes 20–40 minutes depending on how crowded the space is.

---

## Chat prompt

```
Competitive Analysis — [Product idea / space]

You are a product analyst. Your job is to map the competitive 
landscape for the following idea and produce a brief the team 
can use to sharpen the product.

The idea:
[DESCRIBE YOUR IDEA — what it does, who it's for, what problem 
it solves. A few sentences is enough. Don't over-define it — 
you want the analysis to challenge your assumptions, not confirm them.]

Target platform(s) (if known): [iOS / Android / Web / All / Unknown]

═════ Your tasks ═════

1. MAP THE SPACE
   Search for existing products in this category. For each one, 
   produce a table row:

   | Name | Platform | Price | Rating | Key features | What it's known for |

   Cover: direct competitors (same problem, same user), indirect 
   competitors (same user, different approach), and category leaders 
   (even if different target user — they set expectations).

   Minimum 6 products. Maximum 12. Cut the long tail.

2. USER COMPLAINTS — what's broken in the category
   For the top 3–4 competitors, find what users complain about.
   Sources: App Store reviews (1-2 star), Reddit threads, Product 
   Hunt comments, Twitter/X complaints.

   For each product: 3–5 specific complaints. Quote where possible.
   Group into themes across the whole category.

3. GAP ANALYSIS
   Based on the complaint themes: what does the category consistently 
   fail at? These are the gaps.

   Format:
   - Gap: [what's missing or broken]
   - Evidence: [which products, which complaints]
   - How hard to fix: [easy / medium / hard — and why]
   - Opportunity size: [how many users complain about this]

4. FEATURE IDEAS
   From the gaps, generate feature ideas. For each:
   - Feature: [what it does]
   - Gap it closes: [link to gap above]
   - Rough effort: [small / medium / large]
   - Killer-flow potential: [could this BE the reason someone switches?]

   Rank by: (gap size × killer-flow potential) / effort

5. POSITIONING ANGLES
   Given the gaps and the competitor map, what are 2–3 positioning 
   angles the new product could own? A positioning angle is a sentence 
   a user would use to describe why they chose this over the alternatives.

   Examples:
   - "The only one that works offline"
   - "Actually designed for [specific user type]"
   - "The [competitor] that doesn't [specific complaint]"

6. PRODUCE THE COMPETITIVE BRIEF
   A single document to hand to the leads meeting:

   ## Competitive Brief — [Space]

   ### Market map
   [the table from step 1]

   ### Category gaps (ranked)
   [gap analysis, top 5]

   ### Feature ideas (ranked)
   [feature list, top 8]

   ### Positioning angles
   [2–3 options]

   ### Your read
   One paragraph: is this a crowded space or a real gap? What's the 
   one thing this product must get right to win? What's the biggest 
   risk of entering this market?

Present the brief. Do not suggest a product strategy or make build 
decisions — that's the leads meeting's job. Your job is to give the 
leads the clearest possible picture of the landscape.
```

---

## What to do with the output

1. Read the competitive brief critically — push back on anything that looks wrong
2. Add any competitors the chat missed that you already know about
3. Paste the brief into the leads meeting prompt under "Competitive brief"
4. Keep the brief in project memory: `memory/project_competitive_brief.md`

---

## When to re-run it

- Before the leads meeting (always)
- When a major competitor ships a new feature that overlaps your roadmap
- Before finalising Tier 1 features (to check if a gap you planned to fill has been closed by a competitor)
- Before App Store submission (to update screenshots and positioning copy)
