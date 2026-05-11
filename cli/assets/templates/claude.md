# [Your Project Name] — CLAUDE.md

## Production methodology
This project runs under **Solo Studio**. Full reference: `~/.claude/methodology/production-pipeline.md`

- **EP chat** — cross-sprint, defines scope, never writes code. Kickoff prompt: `~/.claude/methodology/ep-chat-template.md`
- **Owner chat** — one per sprint, coordinates workers, merges branches. Prompt: `~/.claude/methodology/owner-chat-template.md`
- **Worker chats** — EP-authorised only, each in its own `git worktree`. Prompt: `~/.claude/methodology/worker-chat-template.md`

## Project identity
- **App / product name:** [Name]
- **Type:** [iOS app / Android app / web app / CLI tool / backend service / cross-platform / etc.]
- **Package / bundle ID:** [com.example.app or N/A]
- **Repo root:** [absolute path]

## Platform
- **Primary:** [iOS 18+ / Android 14+ / Web / Windows 11 / macOS 15+ / etc.]
- **Secondary:** [list all targets, or N/A]
- **Build gate:**
  ```bash
  [command Owner uses to verify a branch before merging]
  # iOS:     xcodebuild -scheme App -destination 'platform=iOS Simulator,name=iPhone 16' build
  # Android: ./gradlew assembleDebug test
  # Web:     npm run build && npm test
  # Python:  make test
  ```

## Repo layout
```
[your repo structure — enough for a cold-start chat to navigate]
```

## Hard constraints
- [e.g. "Do not sign up for paid services without explicit EP authorisation"]
- [e.g. "No PII stored on-device"]

## Notion
- **Production HQ:** [URL]
- **Project row:** [URL]
- **Tasks DB:** [URL]

## Disciplines active on this project
Engineering · ML / Data · Design · UI / Frontend · Platform · QA · Analytics · Product

## Versioning
- `VERSION` file at repo root: `MAJOR.MINOR.PATCH`
- Tag pattern: `v0.<sprint>.0`

## Key gotchas
<!-- Hard-won facts every chat needs on session open. Grows over sprints. -->
