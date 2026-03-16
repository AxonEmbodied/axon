# Axon

Developer memory system. Nightly AI rollups, morning briefings, decision traces.

**CLI + Desktop app.** Open source (MIT).

Axon solves the Prompt Tax — the 15+ minutes/day developers lose re-explaining context to AI tools.

## Install

### CLI

```bash
npm i -g axon-dev
axon init
```

### Desktop

[![Download latest](https://img.shields.io/github/v/release/AxonEmbodied/axon?filter=desktop-v*&label=Download%20Desktop&style=for-the-badge)](https://github.com/AxonEmbodied/axon/releases/latest)

Or grab a `.dmg` from [Releases](https://github.com/AxonEmbodied/axon/releases?q=desktop-v).

### From source

```bash
git clone https://github.com/AxonEmbodied/axon.git
cd axon/desktop
npm install
npm run dev
```

## How it works

```
Dendrites (signals) → Nightly Rollup (AI synthesis) → Morning Briefing → Decisions fed back
```

- **Dendrites**: git commits, file trees, manual notes — raw context signals
- **Rollups**: Claude synthesizes overnight into narrative episodes
- **Mornings**: Conversational briefing with full project context
- **Decisions**: Every AI decision traced as a dendrite, feeding the next cycle

## Architecture

```
~/.axon/workspaces/{project}/
├── state.md        # Current context snapshot
├── stream.md       # Append-only raw log
├── episodes/       # Rollup narratives
├── dendrites/      # Input signals
├── mornings/       # Briefing conversations
└── config.yaml     # Project settings
```

Protocol over platform. Memory in portable markdown files, not model weights.

## License

MIT
