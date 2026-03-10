# Axon Design System: Editorial Neural
> Version: 1.0
> Date: 2026-03-10
> Status: Specification — ready for implementation
> Aesthetic: Editorial Neural

---

## 0. Design Philosophy

Axon is not a SaaS dashboard. It is a daily cognitive document — a beautifully typeset morning paper about your code. The design should feel like opening a premium magazine that happens to contain your project's memory.

**Three governing tensions:**

1. **Warmth vs precision.** Cream paper tones create approachability. Monospace data creates trust. Neither dominates.
2. **Density vs breathing room.** Information density comes from precision of language, not cramming UI elements. Whitespace is a feature.
3. **Organic vs structured.** Neural ASCII backgrounds create organic texture. Crisp card edges and grid alignment create order. The texture is alive; the layout is disciplined.

**Workshop Labs-inspired, Axon-owned:** Workshop Labs renders photographs as ASCII text art over warm cream palettes. Axon's version of this: your project's commit messages and decision traces rendered as neural branching patterns. The content becomes the texture. Your memory becomes the visual identity.

---

## 1. Color Palette

### 1.1 Light Mode (Default — "Cream Paper")

```css
:root {
  /* --- Surface hierarchy --- */
  --ax-bg-base:         #FAF7F2;   /* Warm cream — the "paper" */
  --ax-bg-elevated:     #FFFFFF;   /* Cards, modals — lifted off paper */
  --ax-bg-sunken:       #F3EDE5;   /* Inset areas, code blocks, sidebar wells */
  --ax-bg-sidebar:      #2C2420;   /* Deep warm brown — anchors navigation */

  /* --- Text hierarchy --- */
  --ax-text-primary:    #1A1614;   /* Near-black with warmth — headlines, body */
  --ax-text-secondary:  #5C524A;   /* Warm grey — supporting text, descriptions */
  --ax-text-tertiary:   #9B8E83;   /* Muted — timestamps, labels, captions */
  --ax-text-ghost:      #C4B8AD;   /* Very faint — ASCII background characters */
  --ax-text-on-dark:    #F5F0EA;   /* Text on dark surfaces (sidebar) */
  --ax-text-on-dark-muted: #A89888; /* Muted text on dark surfaces */

  /* --- Brand --- */
  --ax-brand-primary:   #C8956C;   /* Warm amber — primary actions, active states */
  --ax-brand-hover:     #B5845E;   /* Darkened for hover */
  --ax-brand-active:    #A27350;   /* Pressed state */
  --ax-brand-subtle:    #F0E4D8;   /* Brand tint for backgrounds */

  /* --- Accent (sage green) --- */
  --ax-accent:          #7B9E7B;   /* Sage green — success, completion, life */
  --ax-accent-hover:    #6B8E6B;
  --ax-accent-subtle:   #E8F0E8;

  /* --- Semantic --- */
  --ax-success:         #5A8A5A;   /* Completed items, healthy status */
  --ax-success-subtle:  #E4EFE4;
  --ax-warning:         #C4933B;   /* Stale items, needs attention */
  --ax-warning-subtle:  #F8F0E0;
  --ax-error:           #B85450;   /* Blockers, failures */
  --ax-error-subtle:    #F8EAEA;
  --ax-info:            #6B8FAD;   /* Informational, neutral call-outs */
  --ax-info-subtle:     #E8EFF5;

  /* --- Energy indicators (rollup energy: low/medium/high) --- */
  --ax-energy-low:      #9B8E83;   /* Quiet day */
  --ax-energy-medium:   #C8956C;   /* Productive day */
  --ax-energy-high:     #B85450;   /* Intense day */

  /* --- Borders & dividers --- */
  --ax-border:          #E5DDD3;   /* Default border */
  --ax-border-subtle:   #EDE7DF;   /* Lighter border for grouped items */
  --ax-border-strong:   #C4B8AD;   /* Emphasized border */
  --ax-border-focus:    #C8956C;   /* Focus ring color */

  /* --- Neural ASCII background --- */
  --ax-ascii-char:      #D8CFC4;   /* Default ASCII character color */
  --ax-ascii-char-dim:  #E8E0D6;   /* Lighter characters (visual density: low) */
  --ax-ascii-char-bright: #B8AA9C; /* Denser characters (visual density: high) */

  /* --- Shadows (warm-tinted, not blue-grey) --- */
  --ax-shadow-color:    47, 36, 28; /* RGB of warm brown, used with rgba() */
}
```

### 1.2 Dark Mode ("Neural Dark")

Dark mode is NOT simply inverted light mode. It uses deep warm browns (not blue-black) to maintain the editorial warmth.

```css
[data-theme="dark"] {
  /* --- Surfaces --- */
  --ax-bg-base:         #1A1614;   /* Deep warm charcoal */
  --ax-bg-elevated:     #242019;   /* Cards — slightly lifted */
  --ax-bg-sunken:       #13110F;   /* Inset areas */
  --ax-bg-sidebar:      #13110F;   /* Sidebar matches deepest surface */

  /* --- Text --- */
  --ax-text-primary:    #F0EBE4;   /* Warm off-white */
  --ax-text-secondary:  #B8AA9C;   /* Warm mid-grey */
  --ax-text-tertiary:   #7A6E63;   /* Muted warm */
  --ax-text-ghost:      #3D3530;   /* Very dim — ASCII background */
  --ax-text-on-dark:    #F0EBE4;
  --ax-text-on-dark-muted: #7A6E63;

  /* --- Brand (slightly brighter in dark mode for contrast) --- */
  --ax-brand-primary:   #D4A57C;
  --ax-brand-hover:     #DEB58E;
  --ax-brand-active:    #C8956C;
  --ax-brand-subtle:    #2E2520;

  /* --- Accent --- */
  --ax-accent:          #8DB88D;
  --ax-accent-hover:    #9DC89D;
  --ax-accent-subtle:   #1E2A1E;

  /* --- Semantic --- */
  --ax-success:         #6BA06B;
  --ax-success-subtle:  #1A261A;
  --ax-warning:         #D4A34B;
  --ax-warning-subtle:  #2A2418;
  --ax-error:           #D06460;
  --ax-error-subtle:    #2A1A1A;
  --ax-info:            #7BA0BE;
  --ax-info-subtle:     #1A2230;

  /* --- Energy --- */
  --ax-energy-low:      #5C524A;
  --ax-energy-medium:   #D4A57C;
  --ax-energy-high:     #D06460;

  /* --- Borders --- */
  --ax-border:          #332D27;
  --ax-border-subtle:   #2A2420;
  --ax-border-strong:   #4A403A;
  --ax-border-focus:    #D4A57C;

  /* --- ASCII --- */
  --ax-ascii-char:      #2A2420;
  --ax-ascii-char-dim:  #1F1C18;
  --ax-ascii-char-bright: #3D3530;

  /* --- Shadows --- */
  --ax-shadow-color:    0, 0, 0;
}
```

### 1.3 Tailwind Extension

```js
// tailwind.config.js — colors section
module.exports = {
  darkMode: 'class', // Use [data-theme="dark"] on <html>
  theme: {
    extend: {
      colors: {
        ax: {
          bg: {
            base: 'var(--ax-bg-base)',
            elevated: 'var(--ax-bg-elevated)',
            sunken: 'var(--ax-bg-sunken)',
            sidebar: 'var(--ax-bg-sidebar)',
          },
          text: {
            primary: 'var(--ax-text-primary)',
            secondary: 'var(--ax-text-secondary)',
            tertiary: 'var(--ax-text-tertiary)',
            ghost: 'var(--ax-text-ghost)',
            'on-dark': 'var(--ax-text-on-dark)',
            'on-dark-muted': 'var(--ax-text-on-dark-muted)',
          },
          brand: {
            DEFAULT: 'var(--ax-brand-primary)',
            hover: 'var(--ax-brand-hover)',
            active: 'var(--ax-brand-active)',
            subtle: 'var(--ax-brand-subtle)',
          },
          accent: {
            DEFAULT: 'var(--ax-accent)',
            hover: 'var(--ax-accent-hover)',
            subtle: 'var(--ax-accent-subtle)',
          },
          success: { DEFAULT: 'var(--ax-success)', subtle: 'var(--ax-success-subtle)' },
          warning: { DEFAULT: 'var(--ax-warning)', subtle: 'var(--ax-warning-subtle)' },
          error: { DEFAULT: 'var(--ax-error)', subtle: 'var(--ax-error-subtle)' },
          info: { DEFAULT: 'var(--ax-info)', subtle: 'var(--ax-info-subtle)' },
          energy: {
            low: 'var(--ax-energy-low)',
            medium: 'var(--ax-energy-medium)',
            high: 'var(--ax-energy-high)',
          },
          border: {
            DEFAULT: 'var(--ax-border)',
            subtle: 'var(--ax-border-subtle)',
            strong: 'var(--ax-border-strong)',
            focus: 'var(--ax-border-focus)',
          },
          ascii: {
            DEFAULT: 'var(--ax-ascii-char)',
            dim: 'var(--ax-ascii-char-dim)',
            bright: 'var(--ax-ascii-char-bright)',
          },
        },
      },
    },
  },
};
```

---

## 2. Typography

### 2.1 Font Stack

```css
:root {
  /* Serif — headlines, rollup titles, "the story" */
  --ax-font-serif: 'Instrument Serif', 'Crimson Pro', 'Georgia', serif;

  /* Sans — body text, descriptions, UI labels */
  --ax-font-sans: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Mono — data, timestamps, file paths, code, metrics */
  --ax-font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
}
```

**Why these fonts:**
- **Instrument Serif** is available on Google Fonts, has beautiful italic forms, and reads as "thoughtful publication" without feeling stuffy. Fallback to Crimson Pro (also Google Fonts) for broader weight support.
- **Inter** is the industry standard for UI. Excellent at small sizes, extensive weight range, designed for screens.
- **JetBrains Mono** is purpose-built for code with ligatures and clear character distinction at small sizes.

### 2.2 Type Scale

Based on a 1.250 ratio (major third) from a 16px base. Larger headlines use manual sizes for editorial impact.

| Token | Size | Line Height | Weight | Use |
|-------|------|-------------|--------|-----|
| `--ax-text-display` | 48px / 3rem | 1.1 | 400 | Hero rollup headline (today's story) |
| `--ax-text-h1` | 36px / 2.25rem | 1.15 | 400 | Section titles |
| `--ax-text-h2` | 28px / 1.75rem | 1.2 | 400 | Card headlines |
| `--ax-text-h3` | 22px / 1.375rem | 1.3 | 500 | Sub-section headers |
| `--ax-text-h4` | 18px / 1.125rem | 1.35 | 500 | Minor headers |
| `--ax-text-body` | 16px / 1rem | 1.6 | 400 | Body text, descriptions |
| `--ax-text-body-sm` | 14px / 0.875rem | 1.5 | 400 | Secondary body, sidebar items |
| `--ax-text-caption` | 12px / 0.75rem | 1.4 | 500 | Labels, timestamps, badges |
| `--ax-text-micro` | 11px / 0.6875rem | 1.3 | 500 | ASCII overlay, tiny metadata |

```css
:root {
  --ax-text-display:   3rem;
  --ax-text-h1:        2.25rem;
  --ax-text-h2:        1.75rem;
  --ax-text-h3:        1.375rem;
  --ax-text-h4:        1.125rem;
  --ax-text-body:      1rem;
  --ax-text-body-sm:   0.875rem;
  --ax-text-caption:   0.75rem;
  --ax-text-micro:     0.6875rem;

  --ax-leading-tight:  1.1;
  --ax-leading-snug:   1.3;
  --ax-leading-normal: 1.5;
  --ax-leading-relaxed: 1.6;
  --ax-leading-loose:  1.8;

  --ax-weight-regular: 400;
  --ax-weight-medium:  500;
  --ax-weight-semibold: 600;
  --ax-weight-bold:    700;
}
```

### 2.3 Typography Rules

1. **Rollup headlines** use `--ax-font-serif` at `--ax-text-display` or `--ax-text-h2`. This is the "magazine headline" moment. Always weight 400 (regular serif conveys editorial authority; bold serif looks like a newspaper tabloid).
2. **Body text** uses `--ax-font-sans` at `--ax-text-body`. Relaxed line height (1.6) for readability.
3. **All data** uses `--ax-font-mono`: commit counts, timestamps, file paths, SHA fragments, metrics, tags. Monospace signals "this is machine-precise information."
4. **Serif italic** for pull-quotes or highlighted Axon narration (the "colleague talking" voice in dashboard-aware messaging).
5. **Never use bold serif.** Serif weight stays at 400; emphasis comes from size and color, not weight.
6. **Letter spacing:** Headlines at 0 or slightly negative (-0.01em). Mono captions at +0.02em. All-caps labels at +0.08em.

### 2.4 Tailwind Font Extension

```js
// tailwind.config.js — fonts
fontFamily: {
  serif: ['Instrument Serif', 'Crimson Pro', 'Georgia', 'serif'],
  sans: ['Inter', 'SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
},
fontSize: {
  'display': ['3rem', { lineHeight: '1.1', fontWeight: '400' }],
  'h1': ['2.25rem', { lineHeight: '1.15', fontWeight: '400' }],
  'h2': ['1.75rem', { lineHeight: '1.2', fontWeight: '400' }],
  'h3': ['1.375rem', { lineHeight: '1.3', fontWeight: '500' }],
  'h4': ['1.125rem', { lineHeight: '1.35', fontWeight: '500' }],
  'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
  'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
  'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
  'micro': ['0.6875rem', { lineHeight: '1.3', fontWeight: '500' }],
},
```

### 2.5 Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## 3. Spacing Scale

8px base unit. Every spacing value is a multiple of 4 (for fine control) or 8 (for standard spacing).

```css
:root {
  --ax-space-0:   0;
  --ax-space-0.5: 2px;    /* Hairline: between inline elements */
  --ax-space-1:   4px;    /* Tight: icon gaps, badge padding */
  --ax-space-2:   8px;    /* Compact: between related items */
  --ax-space-3:   12px;   /* Default: list item padding */
  --ax-space-4:   16px;   /* Standard: card padding, section gaps */
  --ax-space-5:   20px;   /* Comfortable: between card sections */
  --ax-space-6:   24px;   /* Generous: between card groups */
  --ax-space-8:   32px;   /* Spacious: page section margins */
  --ax-space-10:  40px;   /* Expansive: major section breaks */
  --ax-space-12:  48px;   /* Dramatic: hero spacing */
  --ax-space-16:  64px;   /* Editorial: page-level whitespace */
  --ax-space-20:  80px;   /* Luxurious: above-fold breathing room */
  --ax-space-24:  96px;   /* Maximum: top-of-page margin */
}
```

### Tailwind Extension

```js
spacing: {
  '0.5': '2px',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
  '20': '80px',
  '24': '96px',
},
```

### Spacing Rules

1. **Card internal padding:** `--ax-space-6` (24px) on desktop, `--ax-space-4` (16px) on mobile.
2. **Between cards in a list:** `--ax-space-4` (16px).
3. **Between major page sections:** `--ax-space-12` (48px) minimum.
4. **Sidebar item padding:** `--ax-space-2` vertical, `--ax-space-3` horizontal.
5. **The "editorial rule":** When in doubt, add more space, not less. A rollup card with too much whitespace looks intentional (premium). One with too little looks broken (SaaS).

---

## 4. Component Tokens

### 4.1 Border Radius

```css
:root {
  --ax-radius-none: 0;
  --ax-radius-sm:   4px;    /* Badges, tags, small interactive elements */
  --ax-radius-md:   8px;    /* Buttons, inputs, chips */
  --ax-radius-lg:   12px;   /* Cards — the primary content container */
  --ax-radius-xl:   16px;   /* Modal dialogs, overlay panels */
  --ax-radius-2xl:  24px;   /* Hero sections, feature panels */
  --ax-radius-full: 9999px; /* Circular: avatars, dots, pills */
}
```

**Rules:**
- Cards: `--ax-radius-lg` (12px). Enough to feel modern without looking bubbly.
- Buttons: `--ax-radius-md` (8px).
- Tags/badges: `--ax-radius-full` (pill shape).
- The sidebar: `--ax-radius-none` (flush to screen edge).
- Never use radius > 16px on anything smaller than 200px wide.

### 4.2 Shadows

Warm-tinted shadows. No blue-grey. Uses the `--ax-shadow-color` variable.

```css
:root {
  --ax-shadow-xs:   0 1px 2px rgba(var(--ax-shadow-color), 0.04);
  --ax-shadow-sm:   0 1px 3px rgba(var(--ax-shadow-color), 0.06),
                    0 1px 2px rgba(var(--ax-shadow-color), 0.04);
  --ax-shadow-md:   0 4px 6px rgba(var(--ax-shadow-color), 0.05),
                    0 2px 4px rgba(var(--ax-shadow-color), 0.04);
  --ax-shadow-lg:   0 10px 20px rgba(var(--ax-shadow-color), 0.06),
                    0 4px 8px rgba(var(--ax-shadow-color), 0.04);
  --ax-shadow-xl:   0 20px 40px rgba(var(--ax-shadow-color), 0.08),
                    0 8px 16px rgba(var(--ax-shadow-color), 0.04);

  /* Card-specific: default resting state */
  --ax-shadow-card: 0 1px 3px rgba(var(--ax-shadow-color), 0.04),
                    0 1px 2px rgba(var(--ax-shadow-color), 0.02);

  /* Card hover: subtle lift */
  --ax-shadow-card-hover: 0 8px 24px rgba(var(--ax-shadow-color), 0.08),
                          0 2px 6px rgba(var(--ax-shadow-color), 0.04);

  /* Focus ring */
  --ax-shadow-focus: 0 0 0 3px rgba(200, 149, 108, 0.3);
}
```

### 4.3 Transitions

```css
:root {
  /* Duration */
  --ax-duration-fast:    100ms;   /* Hover color changes, active states */
  --ax-duration-normal:  200ms;   /* Card hover lift, fade-in */
  --ax-duration-slow:    350ms;   /* Page transitions, modal open/close */
  --ax-duration-glacial: 600ms;   /* ASCII background character shifts */

  /* Easing */
  --ax-ease-default:     cubic-bezier(0.4, 0, 0.2, 1);   /* General purpose */
  --ax-ease-in:          cubic-bezier(0.4, 0, 1, 1);      /* Elements exiting */
  --ax-ease-out:         cubic-bezier(0, 0, 0.2, 1);      /* Elements entering */
  --ax-ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful bounce — use sparingly */

  /* Composite */
  --ax-transition-fast:  all var(--ax-duration-fast) var(--ax-ease-default);
  --ax-transition-normal: all var(--ax-duration-normal) var(--ax-ease-default);
  --ax-transition-slow:  all var(--ax-duration-slow) var(--ax-ease-default);
}
```

---

## 5. Neural ASCII Background

This is Axon's signature visual element. Your project data rendered as a subtle background texture using ASCII characters arranged in neural branching patterns.

### 5.1 Concept

The background is a monospace text grid where:
1. An underlying neural/dendrite pattern defines where characters appear (branching tree shapes).
2. The characters themselves are sourced from your actual project data (commit messages, file paths, decision trace keywords).
3. Character visual density maps to pattern brightness: dense characters (`@`, `#`, `W`) for strong branches, sparse characters (`.`, `:`, `-`) for fading connections.
4. The texture is extremely subtle — visible on close inspection but not distracting.

### 5.2 Character Density Map

Ordered from least to most visually dense:

```
Level 0 (empty):     " " (space)
Level 1 (whisper):   . , · - ~ `
Level 2 (light):     : ; ' " ! ? i l
Level 3 (medium):    / \ | ( ) [ ] { } + = < >
Level 4 (strong):    t f r v x z c s o a e
Level 5 (heavy):     d b p q g j y k u n w
Level 6 (dense):     A V X Z S O G Q D B
Level 7 (solid):     # @ W M N H K R E %
```

### 5.3 Implementation

```typescript
// ascii-neural-background.ts

interface NeuralBackgroundConfig {
  /** Source text — typically concatenated recent commit messages */
  sourceText: string;
  /** Canvas dimensions in character cells */
  cols: number;
  rows: number;
  /** How many neural branches to generate */
  branchCount: number;
  /** Branch decay rate (0-1, higher = shorter branches) */
  decay: number;
  /** Random seed for reproducibility */
  seed?: number;
}

const DENSITY_CHARS = [
  ' ',                           // 0: empty
  '.:·-',                        // 1: whisper
  ':;\'!?',                      // 2: light
  '/\\|()[]{}',                  // 3: medium
  'tfrvcsoae',                   // 4: strong
  'dbpqgjykun',                  // 5: heavy
  'AVXZSOGQDB',                  // 6: dense
  '#@WMNHKRE',                   // 7: solid
];

/**
 * Generate a neural branching pattern as a 2D density map.
 *
 * Algorithm:
 * 1. Place N seed points along the bottom or center.
 * 2. From each seed, grow branches upward/outward using a random walk
 *    biased toward vertical movement.
 * 3. At each step, there's a probability of forking into two branches.
 * 4. Branch "energy" decays over distance — older branches have lower density values.
 * 5. Apply Gaussian blur to soften edges.
 */
function generateNeuralPattern(config: NeuralBackgroundConfig): number[][] {
  const { cols, rows, branchCount, decay, seed } = config;
  const grid: number[][] = Array.from({ length: rows }, () =>
    new Array(cols).fill(0)
  );

  const rng = createSeededRandom(seed ?? Date.now());

  for (let b = 0; b < branchCount; b++) {
    // Seed point along the bottom third
    let x = Math.floor(rng() * cols);
    let y = rows - 1 - Math.floor(rng() * (rows / 3));
    let energy = 7; // Start at max density

    growBranch(grid, x, y, energy, cols, rows, decay, rng);
  }

  // Gaussian blur pass for smooth falloff
  return gaussianBlur(grid, 1.2);
}

/**
 * Recursive branch growth with forking
 */
function growBranch(
  grid: number[][],
  x: number, y: number,
  energy: number,
  cols: number, rows: number,
  decay: number,
  rng: () => number
): void {
  if (energy < 1 || y < 0 || y >= rows || x < 0 || x >= cols) return;

  // Write density (take max if overlapping with another branch)
  grid[y][x] = Math.max(grid[y][x], Math.round(energy));

  // Decay energy
  energy -= decay + rng() * 0.3;

  // Movement: biased upward, slight horizontal drift
  const dy = -1; // Always move up
  const dx = rng() < 0.3 ? 0 : (rng() < 0.5 ? -1 : 1);

  // Fork probability increases as branches age
  const forkChance = 0.08 + (7 - energy) * 0.03;
  if (rng() < forkChance && energy > 2) {
    // Fork: create a second branch veering opposite direction
    growBranch(grid, x - dx, y + dy, energy * 0.8, cols, rows, decay, rng);
  }

  growBranch(grid, x + dx, y + dy, energy, cols, rows, decay, rng);
}

/**
 * Map density grid to actual characters, sourced from project text.
 *
 * Characters are pulled from sourceText in order. When a cell needs
 * a character at density N, it picks the next character from sourceText
 * and replaces it with a character of equivalent visual density.
 */
function renderToText(
  densityGrid: number[][],
  sourceText: string
): string {
  let sourceIndex = 0;
  const lines: string[] = [];

  for (const row of densityGrid) {
    let line = '';
    for (const density of row) {
      if (density === 0) {
        line += ' ';
      } else {
        // Get next non-space source character
        while (sourceIndex < sourceText.length && sourceText[sourceIndex] === ' ') {
          sourceIndex++;
        }
        if (sourceIndex >= sourceText.length) sourceIndex = 0;

        const sourceChar = sourceText[sourceIndex] || '.';
        sourceIndex++;

        // Map to a character at the target density level
        const densityLevel = Math.min(density, DENSITY_CHARS.length - 1);
        const candidates = DENSITY_CHARS[densityLevel];
        // Use source char if it naturally falls in the right density range,
        // otherwise pick from the density charset
        const charDensity = getCharDensity(sourceChar);
        if (Math.abs(charDensity - density) <= 1) {
          line += sourceChar;
        } else {
          line += candidates[Math.floor(Math.random() * candidates.length)];
        }
      }
    }
    lines.push(line);
  }

  return lines.join('\n');
}

/**
 * Look up which density level a character belongs to
 */
function getCharDensity(char: string): number {
  for (let i = DENSITY_CHARS.length - 1; i >= 0; i--) {
    if (DENSITY_CHARS[i].includes(char)) return i;
  }
  return 3; // default to medium
}
```

### 5.4 CSS Rendering

The ASCII background renders as a positioned `<pre>` element behind the main content.

```css
.ax-neural-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  font-family: var(--ax-font-mono);
  font-size: var(--ax-text-micro);
  line-height: 1.15;
  letter-spacing: 0.05em;
  color: var(--ax-ascii-char);
  white-space: pre;
  user-select: none;

  /* Fade out toward edges */
  -webkit-mask-image: radial-gradient(
    ellipse 70% 60% at 50% 50%,
    black 20%,
    transparent 70%
  );
  mask-image: radial-gradient(
    ellipse 70% 60% at 50% 50%,
    black 20%,
    transparent 70%
  );

  opacity: 0.35;
}

/* In dark mode, even more subtle */
[data-theme="dark"] .ax-neural-bg {
  opacity: 0.15;
}
```

### 5.5 Data Sources

The ASCII background text is assembled from:

1. **Recent commit messages** from `dendrites/*_git-log.md` — the primary source.
2. **Decision trace keywords** from the most recent rollup — weighted by recency.
3. **File paths** from `dendrites/*_file-tree.md` — provides the slashes and dots that create texture.

The source text is regenerated when a new rollup arrives. The neural pattern's seed is derived from the project name, so each project has a unique but stable branching structure.

### 5.6 Performance

- The ASCII grid is rendered once and cached as a string.
- On rollup update, regenerate the text content but keep the pattern structure.
- The `<pre>` element is GPU-composited via `will-change: opacity`.
- No JavaScript animation loop. Character "evolution" (subtle shifts when new data arrives) uses CSS transitions on opacity — swap the text, crossfade.
- Target: < 2ms to generate for a 200x100 grid.

---

## 6. Rollup Card Design

The rollup card is the hero component. Each card represents one day's synthesised activity — a mini-document, not a dashboard widget.

### 6.1 Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  March 10, 2026                                     ● ●●   │  ← date (mono) + energy dots
│                                                             │
│  Battle-hardened coupon engine —                            │  ← headline (serif, display)
│  97 tests, ghost redemption fixed                          │
│                                                             │
│  hardening  testing  concurrency                           │  ← tags (mono, pill badges)
│                                                             │
│  ────────────────────────────────────────                   │  ← thin divider
│                                                             │
│  Implemented idempotency keys for coupon redemptions.      │  ← summary preview (sans, 2-3 lines)
│  Fixed race condition in concurrent reservation flow.      │
│  97 tests passing, 34 commits across 3 sessions.           │
│                                                             │
│  34 commits  ·  6 decisions  ·  7 open loops               │  ← metrics row (mono)
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Specifications

```css
.ax-rollup-card {
  background: var(--ax-bg-elevated);
  border: 1px solid var(--ax-border);
  border-radius: var(--ax-radius-lg);
  padding: var(--ax-space-6);
  box-shadow: var(--ax-shadow-card);
  transition: var(--ax-transition-normal);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.ax-rollup-card:hover {
  box-shadow: var(--ax-shadow-card-hover);
  transform: translateY(-2px);
  border-color: var(--ax-border-strong);
}

/* Date line */
.ax-rollup-date {
  font-family: var(--ax-font-mono);
  font-size: var(--ax-text-caption);
  color: var(--ax-text-tertiary);
  letter-spacing: 0.02em;
  margin-bottom: var(--ax-space-3);
}

/* Headline */
.ax-rollup-headline {
  font-family: var(--ax-font-serif);
  font-size: var(--ax-text-h2);
  font-weight: var(--ax-weight-regular);
  color: var(--ax-text-primary);
  line-height: var(--ax-leading-snug);
  margin-bottom: var(--ax-space-4);
  max-width: 42ch; /* Optimal line length for readability */
}

/* Tags */
.ax-rollup-tags {
  display: flex;
  gap: var(--ax-space-2);
  flex-wrap: wrap;
  margin-bottom: var(--ax-space-4);
}

.ax-rollup-tag {
  font-family: var(--ax-font-mono);
  font-size: var(--ax-text-caption);
  color: var(--ax-text-secondary);
  background: var(--ax-bg-sunken);
  padding: var(--ax-space-0.5) var(--ax-space-2);
  border-radius: var(--ax-radius-full);
  letter-spacing: 0.01em;
}

/* Divider */
.ax-rollup-divider {
  border: none;
  border-top: 1px solid var(--ax-border-subtle);
  margin: var(--ax-space-4) 0;
}

/* Summary preview */
.ax-rollup-summary {
  font-family: var(--ax-font-sans);
  font-size: var(--ax-text-body);
  color: var(--ax-text-secondary);
  line-height: var(--ax-leading-relaxed);
  margin-bottom: var(--ax-space-4);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Metrics row */
.ax-rollup-metrics {
  display: flex;
  gap: var(--ax-space-4);
  align-items: center;
}

.ax-rollup-metric {
  font-family: var(--ax-font-mono);
  font-size: var(--ax-text-caption);
  color: var(--ax-text-tertiary);
}

.ax-rollup-metric-value {
  color: var(--ax-text-primary);
  font-weight: var(--ax-weight-medium);
}

.ax-rollup-metric-dot {
  color: var(--ax-text-ghost);
  margin: 0 var(--ax-space-1);
}
```

### 6.3 Energy Indicator

Three dots in the top-right corner. Visual density shows the day's energy level from the rollup frontmatter.

```css
.ax-energy-dots {
  display: flex;
  gap: 3px;
  align-items: center;
}

.ax-energy-dot {
  width: 6px;
  height: 6px;
  border-radius: var(--ax-radius-full);
  background: var(--ax-border);
  transition: var(--ax-transition-fast);
}

/* Energy levels fill dots left-to-right */
.ax-energy-dot.active { background: var(--ax-energy-low); }

[data-energy="medium"] .ax-energy-dot.active { background: var(--ax-energy-medium); }
[data-energy="high"] .ax-energy-dot.active { background: var(--ax-energy-high); }

/* Low: 1 dot filled. Medium: 2. High: 3. */
```

### 6.4 Card States

| State | Visual Treatment |
|-------|-----------------|
| Default | `--ax-shadow-card`, 1px border, no transform |
| Hover | `--ax-shadow-card-hover`, `translateY(-2px)`, border darkens |
| Active/Pressed | `translateY(0)`, shadow returns to default, brand border-left |
| Selected/Current | Left border becomes `3px solid var(--ax-brand-primary)`, subtle brand tint background |
| Stale (>3 days old) | Slight opacity reduction (0.85), date text gains `--ax-warning` color |

### 6.5 Expanded Card (Detail View)

When clicked, the rollup card expands (or navigates) to a full detail view. This renders the full markdown body with these styles:

- Headline: `--ax-text-display` (48px serif)
- Decision traces: Each `DT-N` entry rendered as a mini-card with left border accent
- Session table: Monospace, zebra-striped with `--ax-bg-sunken`
- Unfinished items: Checklist with custom styled checkboxes
- `[>]` rolled-over items: Left border in `--ax-warning` color

---

## 7. Animation Principles

### 7.1 Philosophy

Animations in Axon are **purposeful and restrained**. They communicate state changes, not decoration. The editorial aesthetic demands that motion feels considered — like a page turning, not a slot machine.

### 7.2 Catalogue of Animations

#### Page/View Transitions

```css
/* New view entering */
@keyframes ax-page-enter {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ax-page-enter {
  animation: ax-page-enter var(--ax-duration-slow) var(--ax-ease-out) forwards;
}
```

#### Card List Stagger

Cards in a timeline appear with a staggered fade-up. Each card delays by 50ms more than the previous.

```css
@keyframes ax-card-appear {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ax-card-stagger {
  animation: ax-card-appear var(--ax-duration-slow) var(--ax-ease-out) forwards;
  opacity: 0;
}

.ax-card-stagger:nth-child(1) { animation-delay: 0ms; }
.ax-card-stagger:nth-child(2) { animation-delay: 50ms; }
.ax-card-stagger:nth-child(3) { animation-delay: 100ms; }
.ax-card-stagger:nth-child(4) { animation-delay: 150ms; }
.ax-card-stagger:nth-child(5) { animation-delay: 200ms; }
/* Cap at 5 — later cards appear without stagger */
.ax-card-stagger:nth-child(n+6) { animation-delay: 250ms; }
```

#### Card Hover

Already defined in component tokens. Uses `transform: translateY(-2px)` with `--ax-transition-normal`.

#### ASCII Background Evolution

When new rollup data arrives, the ASCII background text content crossfades:

```css
.ax-neural-bg {
  transition: opacity var(--ax-duration-glacial) var(--ax-ease-default);
}

.ax-neural-bg.updating {
  opacity: 0;
}
/* After text swap, remove .updating to fade back in */
```

#### Loading / Processing States

During rollup generation, a subtle pulse on the neural background:

```css
@keyframes ax-neural-pulse {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.55; }
}

.ax-neural-bg.processing {
  animation: ax-neural-pulse 3s ease-in-out infinite;
}
```

#### Status Dot Pulse

The cron status dot subtly pulses when a rollup is actively running:

```css
@keyframes ax-status-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(90, 138, 90, 0.4); }
  50% { box-shadow: 0 0 0 4px rgba(90, 138, 90, 0); }
}

.ax-status-dot.active {
  animation: ax-status-pulse 2s ease-in-out infinite;
}
```

### 7.3 Rules

1. **No animation longer than 600ms.** If it takes longer, the UI feels sluggish.
2. **No bouncing.** The `--ax-ease-spring` exists for playful micro-interactions (toggle switches, checkbox ticks) only. Never for cards or pages.
3. **Respect prefers-reduced-motion.** All animations disabled when the user's OS setting requests it.
4. **Stagger, don't choreograph.** Lists stagger. Individual elements fade. No orchestrated multi-element sequences — that's showboating, not UX.
5. **ASCII background animates glacially.** The 600ms crossfade is the slowest animation in the system. The background should feel geological, not reactive.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Iconography

### 8.1 Approach

Axon uses a **minimal outlined icon set**. No filled icons, no colorful emoji, no custom illustrated icons. The editorial aesthetic demands that icons be quiet servants, not visual protagonists.

### 8.2 Recommended Icon Set

**Lucide Icons** (https://lucide.dev)

Why Lucide:
- 1px consistent stroke weight (matches the thin editorial borders)
- MIT licensed, React components available
- Comprehensive coverage without visual bloat
- The outlined style matches the "lightweight, considered" design language

### 8.3 Icon Sizing

| Context | Size | Stroke Width |
|---------|------|-------------|
| Inline with body text | 16px | 1.5px |
| Sidebar navigation | 18px | 1.5px |
| Card section headers | 20px | 1.5px |
| Page headers | 24px | 2px |
| Empty states / hero | 48px | 1.5px |

### 8.4 Icon Color

Icons inherit their parent's text color. They should never be a different color from adjacent text unless they serve as a status indicator.

```css
.ax-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
  flex-shrink: 0;
}
```

### 8.5 Key Icons by Function

| Function | Lucide Icon | Notes |
|----------|-------------|-------|
| Project | `folder` | |
| Rollup/Episode | `file-text` | |
| Commit | `git-commit-horizontal` | |
| Decision trace | `split` or `git-branch` | Neural/branching metaphor |
| Open loop / TODO | `circle` (unfilled) | |
| Completed item | `circle-check` | |
| Rolled-over item `[>]` | `circle-arrow-right` | In `--ax-warning` color |
| Blocker | `octagon-alert` | In `--ax-error` color |
| Session | `terminal` | |
| Time/Duration | `clock` | |
| Cron/Schedule | `timer` | |
| Settings | `settings` | |
| Search | `search` | |
| Morning briefing | `sun` | |
| Stream/Log | `scroll-text` | |
| Energy low | `battery-low` | |
| Energy medium | `battery-medium` | |
| Energy high | `battery-full` | |
| Expand/Collapse | `chevron-down` / `chevron-up` | |
| Navigate back | `arrow-left` | |
| External link | `external-link` | |
| Theme toggle | `sun` / `moon` | |

### 8.6 Custom Glyphs

For the Axon brand itself, one custom glyph: a stylized neuron/axon shape used as the app icon and favicon. This should be designed separately as an SVG mark. Design direction:

- Single continuous line forming a branching pattern (2-3 branches)
- Drawn with the same 1.5px stroke as Lucide icons
- Works at 16x16 favicon size and 512x512 app icon size
- Monochrome: `--ax-text-primary` on light, `--ax-text-primary` on dark

---

## 9. Responsive Breakpoints

### 9.1 Breakpoint Scale

Axon is **desktop-first** (Tauri app), but the React component library should degrade gracefully for smaller viewports (resized windows, future mobile companion).

```css
:root {
  --ax-bp-xs:  480px;   /* Small mobile — unlikely for Tauri, but defensible */
  --ax-bp-sm:  640px;   /* Large mobile / very narrow window */
  --ax-bp-md:  768px;   /* Tablet / narrow desktop panel */
  --ax-bp-lg:  1024px;  /* Standard laptop */
  --ax-bp-xl:  1280px;  /* Full desktop */
  --ax-bp-2xl: 1536px;  /* Wide desktop / ultrawide */
}
```

### Tailwind Config

```js
screens: {
  'xs': '480px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
},
```

### 9.2 Layout Behavior

| Breakpoint | Sidebar | Main Content | Card Layout |
|-----------|---------|--------------|-------------|
| >= 1280px (xl) | Fixed 260px sidebar visible | Full width minus sidebar | Single column, max-width 720px |
| >= 1024px (lg) | Collapsible sidebar | Expands when sidebar collapsed | Single column |
| >= 768px (md) | Hidden, overlay on toggle | Full width | Single column, reduced padding |
| < 768px (sm) | Hidden, slide-in drawer | Full width | Single column, compact cards |

### 9.3 Content Width Constraints

```css
.ax-content-area {
  max-width: 720px;    /* Optimal reading width: ~65-75 characters */
  margin: 0 auto;
  padding: 0 var(--ax-space-6);
}

/* For wide screens with swipe navigation, center the content hub */
@media (min-width: 1280px) {
  .ax-content-area {
    max-width: 800px;
  }
}
```

### 9.4 Responsive Typography

Headlines scale down at smaller breakpoints to maintain proportion:

```css
.ax-rollup-headline {
  font-size: var(--ax-text-h2); /* 28px default */
}

@media (min-width: 1024px) {
  .ax-rollup-headline {
    font-size: var(--ax-text-h1); /* 36px on desktop */
  }
}

/* Display size only on detail view, desktop */
.ax-rollup-headline-detail {
  font-size: var(--ax-text-h1);
}

@media (min-width: 1024px) {
  .ax-rollup-headline-detail {
    font-size: var(--ax-text-display); /* 48px on desktop detail */
  }
}
```

### 9.5 ASCII Background Responsiveness

- At widths < 768px, the ASCII background is hidden entirely. It is a premium desktop detail, not essential UI.
- At widths >= 768px but < 1024px, reduce opacity to 0.2.
- Full opacity treatment at >= 1024px.

```css
.ax-neural-bg {
  display: none;
}

@media (min-width: 768px) {
  .ax-neural-bg {
    display: block;
    opacity: 0.2;
  }
}

@media (min-width: 1024px) {
  .ax-neural-bg {
    opacity: 0.35;
  }
}
```

---

## 10. Dark Mode Strategy

### 10.1 Approach

Dark mode in Axon is not a simple CSS `filter: invert()`. Each color is explicitly defined in Section 1.2 to maintain the warm editorial character. The key principle: **dark mode uses deep warm browns, not blue-black.**

### 10.2 Transformation Rules

| Light Mode | Dark Mode | Rationale |
|-----------|-----------|-----------|
| `#FAF7F2` (cream paper) | `#1A1614` (warm charcoal) | Same hue family, opposite end of value scale |
| `#FFFFFF` (card white) | `#242019` (lifted charcoal) | Cards still float above base, but subtly |
| `#F3EDE5` (sunken) | `#13110F` (deepest) | Inset areas go darker, not lighter |
| `#2C2420` (sidebar) | `#13110F` (same deepest) | Sidebar merges with base in dark mode |
| `#C8956C` (brand amber) | `#D4A57C` (slightly brighter amber) | Accent colors get 10-15% brighter to maintain contrast |
| `#7B9E7B` (sage green) | `#8DB88D` (brighter sage) | Same adjustment |
| Warm shadows | Near-black shadows | Shadows go near-black in dark mode (warm tint invisible) |
| ASCII at 0.35 opacity | ASCII at 0.15 opacity | Much more subtle — avoid visual noise on dark backgrounds |

### 10.3 Toggle Implementation

```typescript
// theme-toggle.ts

type Theme = 'light' | 'dark' | 'system';

function setTheme(theme: Theme): void {
  const root = document.documentElement;

  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', theme);
  }

  localStorage.setItem('ax-theme', theme);
}

// Initialize on load
function initTheme(): void {
  const saved = localStorage.getItem('ax-theme') as Theme | null;
  setTheme(saved ?? 'light'); // Default to light (cream paper is the signature)
}

// Listen for system changes when in 'system' mode
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', () => {
    if (localStorage.getItem('ax-theme') === 'system') {
      setTheme('system');
    }
  });
```

### 10.4 Component-Level Dark Adjustments

Borders in dark mode need to be slightly stronger to maintain card definition against the dark background. The shadow system becomes less effective in dark mode (shadows are barely visible against dark surfaces), so border emphasis increases.

```css
[data-theme="dark"] .ax-rollup-card {
  border-width: 1px;
  border-color: var(--ax-border); /* #332D27 — warm, visible */
}

[data-theme="dark"] .ax-rollup-card:hover {
  border-color: var(--ax-border-strong); /* #4A403A — more visible lift */
  /* Shadow is less effective; rely on border for hover feedback */
}
```

---

## 11. Full Tailwind Configuration

This consolidates all tokens into a single Tailwind config object.

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      serif: ['Instrument Serif', 'Crimson Pro', 'Georgia', 'serif'],
      sans: ['Inter', 'SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
    },
    fontSize: {
      'display': ['3rem', { lineHeight: '1.1', fontWeight: '400' }],
      'h1': ['2.25rem', { lineHeight: '1.15', fontWeight: '400' }],
      'h2': ['1.75rem', { lineHeight: '1.2', fontWeight: '400' }],
      'h3': ['1.375rem', { lineHeight: '1.3', fontWeight: '500' }],
      'h4': ['1.125rem', { lineHeight: '1.35', fontWeight: '500' }],
      'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
      'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      'micro': ['0.6875rem', { lineHeight: '1.3', fontWeight: '500' }],
    },
    extend: {
      colors: {
        ax: {
          bg: {
            base: 'var(--ax-bg-base)',
            elevated: 'var(--ax-bg-elevated)',
            sunken: 'var(--ax-bg-sunken)',
            sidebar: 'var(--ax-bg-sidebar)',
          },
          text: {
            primary: 'var(--ax-text-primary)',
            secondary: 'var(--ax-text-secondary)',
            tertiary: 'var(--ax-text-tertiary)',
            ghost: 'var(--ax-text-ghost)',
            'on-dark': 'var(--ax-text-on-dark)',
            'on-dark-muted': 'var(--ax-text-on-dark-muted)',
          },
          brand: {
            DEFAULT: 'var(--ax-brand-primary)',
            hover: 'var(--ax-brand-hover)',
            active: 'var(--ax-brand-active)',
            subtle: 'var(--ax-brand-subtle)',
          },
          accent: {
            DEFAULT: 'var(--ax-accent)',
            hover: 'var(--ax-accent-hover)',
            subtle: 'var(--ax-accent-subtle)',
          },
          success: { DEFAULT: 'var(--ax-success)', subtle: 'var(--ax-success-subtle)' },
          warning: { DEFAULT: 'var(--ax-warning)', subtle: 'var(--ax-warning-subtle)' },
          error: { DEFAULT: 'var(--ax-error)', subtle: 'var(--ax-error-subtle)' },
          info: { DEFAULT: 'var(--ax-info)', subtle: 'var(--ax-info-subtle)' },
          energy: {
            low: 'var(--ax-energy-low)',
            medium: 'var(--ax-energy-medium)',
            high: 'var(--ax-energy-high)',
          },
          border: {
            DEFAULT: 'var(--ax-border)',
            subtle: 'var(--ax-border-subtle)',
            strong: 'var(--ax-border-strong)',
            focus: 'var(--ax-border-focus)',
          },
          ascii: {
            DEFAULT: 'var(--ax-ascii-char)',
            dim: 'var(--ax-ascii-char-dim)',
            bright: 'var(--ax-ascii-char-bright)',
          },
        },
      },
      spacing: {
        '0.5': '2px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(var(--ax-shadow-color), 0.04)',
        'sm': '0 1px 3px rgba(var(--ax-shadow-color), 0.06), 0 1px 2px rgba(var(--ax-shadow-color), 0.04)',
        'md': '0 4px 6px rgba(var(--ax-shadow-color), 0.05), 0 2px 4px rgba(var(--ax-shadow-color), 0.04)',
        'lg': '0 10px 20px rgba(var(--ax-shadow-color), 0.06), 0 4px 8px rgba(var(--ax-shadow-color), 0.04)',
        'xl': '0 20px 40px rgba(var(--ax-shadow-color), 0.08), 0 8px 16px rgba(var(--ax-shadow-color), 0.04)',
        'card': '0 1px 3px rgba(var(--ax-shadow-color), 0.04), 0 1px 2px rgba(var(--ax-shadow-color), 0.02)',
        'card-hover': '0 8px 24px rgba(var(--ax-shadow-color), 0.08), 0 2px 6px rgba(var(--ax-shadow-color), 0.04)',
        'focus': '0 0 0 3px rgba(200, 149, 108, 0.3)',
      },
      transitionDuration: {
        'fast': '100ms',
        'normal': '200ms',
        'slow': '350ms',
        'glacial': '600ms',
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      maxWidth: {
        'content': '720px',
        'content-wide': '800px',
        'reading': '42ch', /* Optimal line length */
      },
      keyframes: {
        'ax-page-enter': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'ax-card-appear': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'ax-neural-pulse': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.55' },
        },
        'ax-status-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(90, 138, 90, 0.4)' },
          '50%': { boxShadow: '0 0 0 4px rgba(90, 138, 90, 0)' },
        },
      },
      animation: {
        'page-enter': 'ax-page-enter 350ms cubic-bezier(0, 0, 0.2, 1) forwards',
        'card-appear': 'ax-card-appear 350ms cubic-bezier(0, 0, 0.2, 1) forwards',
        'neural-pulse': 'ax-neural-pulse 3s ease-in-out infinite',
        'status-pulse': 'ax-status-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
```

---

## 12. Component Quick Reference

Summary of how the design system applies to key UI elements.

### Sidebar

| Property | Value |
|----------|-------|
| Background | `--ax-bg-sidebar` (#2C2420) |
| Width | 260px fixed |
| Text | `--ax-text-on-dark` |
| Muted text | `--ax-text-on-dark-muted` |
| Active item | `--ax-brand-primary` background |
| Hover | `rgba(255, 255, 255, 0.06)` background |
| Border right | `1px solid var(--ax-border)` |
| Font | `--ax-font-sans`, `--ax-text-body-sm` |

### Rollup Timeline

| Property | Value |
|----------|-------|
| Container | `--ax-bg-base` background, max-width 720px, centered |
| Card gap | `--ax-space-4` (16px) |
| Section label (month/week) | `--ax-font-mono`, `--ax-text-caption`, uppercase, `--ax-text-tertiary` |
| ASCII background | Behind content area, z-index 0 |

### Morning Briefing Chat

| Property | Value |
|----------|-------|
| Axon messages | `--ax-font-serif` italic for narration, `--ax-font-sans` for factual content |
| User messages | `--ax-font-sans`, aligned right, `--ax-brand-subtle` background |
| Timestamps | `--ax-font-mono`, `--ax-text-caption` |
| Session links | `--ax-font-mono`, `--ax-brand-primary` color, underline on hover |

### Metrics / Data Displays

| Property | Value |
|----------|-------|
| All numbers | `--ax-font-mono` |
| Labels | `--ax-font-sans`, `--ax-text-caption`, uppercase, letter-spacing 0.08em |
| Values | `--ax-font-mono`, `--ax-text-primary`, `--ax-weight-medium` |
| Sparklines/charts | Stroke color `--ax-brand-primary`, fill `--ax-brand-subtle` |

### Status Indicators

| Status | Color | Icon |
|--------|-------|------|
| Healthy / recent rollup | `--ax-success` | Filled circle |
| Stale / old rollup | `--ax-warning` | Filled circle |
| Error / failed rollup | `--ax-error` | Filled circle |
| Inactive / no cron | `--ax-text-ghost` | Outlined circle |
| Processing | `--ax-accent` + pulse animation | Filled circle, pulsing |

---

## 13. File Structure for Implementation

When building the frontend, organize design system files as:

```
src/
├── design-system/
│   ├── tokens.css              ← CSS custom properties (Section 1, 2, 3, 4)
│   ├── animations.css          ← Keyframes and animation classes (Section 7)
│   ├── neural-background.ts    ← ASCII background generator (Section 5)
│   ├── theme-toggle.ts         ← Dark mode toggle logic (Section 10)
│   └── index.ts                ← Re-exports
├── components/
│   ├── RollupCard/
│   │   ├── RollupCard.tsx
│   │   ├── RollupCard.css      ← Uses design tokens
│   │   ├── EnergyDots.tsx
│   │   └── MetricsRow.tsx
│   ├── NeuralBackground/
│   │   └── NeuralBackground.tsx ← Renders the ASCII <pre> element
│   ├── Sidebar/
│   ├── ThemeToggle/
│   └── ...
```

---

*This specification is implementation-ready. Every value is concrete, every rule is actionable. The aesthetic is "Editorial Neural" — a daily cognitive document that looks like a beautifully designed magazine about your code.*
