# Brahma's Portfolio — Astro Project Specification

## Project Overview

Personal portfolio website for **Brahma** — a cybersecurity researcher / bug bounty hunter. The site has a **retro-terminal / cyberpunk aesthetic** (dark purple backgrounds, pixel borders, scanline overlays, monospace fonts, glitch effects). Built in **Astro** with **Tailwind CSS**, **vanilla JS**, and **plain HTML**. No JS frameworks (no React/Vue/Svelte).

**Author:** Brahma  
**Site Title:** Zero State Protocol  
**Logo Initials:** ZS  

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Astro (latest stable) |
| Styling | Tailwind CSS v3 (via `@astrojs/tailwind`) |
| JavaScript | Vanilla JS only — no frameworks |
| Fonts | IBM Plex Mono, Space Mono, Press Start 2P, VT323 (Google Fonts) |
| Icons | Iconify (via `@iconify/tailwind` or inline SVG `iconify-icon` web component) |
| Content | Astro Content Collections (Markdown/MDX) |
| SEO | `astro-seo` or `@astrojs/sitemap` + manual meta |
| Deployment target | Static (`output: 'static'`) |

---

## SEO Requirements

- Every page must have a unique `<title>`, `<meta name="description">`, and canonical URL.
- Use Astro's `<head>` slot in the base layout for all meta.
- Generate `/sitemap.xml` via `@astrojs/sitemap`.
- Generate `/rss.xml` for Journal posts via `@astrojs/rss`.
- Structured data (JSON-LD): `Person` schema on `/about`, `Article` schema on each journal post, `BreadcrumbList` on inner pages.
- OpenGraph + Twitter Card meta on every page and every journal/bounty post.
- All images must have descriptive `alt` attributes.
- Use semantic HTML: `<article>`, `<section>`, `<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>`.
- Heading hierarchy: one `<h1>` per page, logical `<h2>`/`<h3>` nesting.
- `robots.txt` at project root pointing to sitemap.
- Preload Google Fonts with `rel="preconnect"` + `rel="preload"`.
- Core Web Vitals: lazy-load images (`loading="lazy"`), defer non-critical JS.

---

## Project File Structure

```
brahma-portfolio/
├── public/
│   ├── robots.txt
│   ├── favicon.ico
│   └── og-default.png          # Default OG image
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BaseLayout.astro       # HTML shell, <head>, fonts, global CSS
│   │   │   ├── Nav.astro              # Top navigation bar
│   │   │   ├── MobileMenu.astro       # Full-screen mobile nav overlay
│   │   │   ├── MarqueeBanner.astro    # Scrolling news-ticker banner
│   │   │   ├── Footer.astro           # Site footer with links
│   │   │   └── SectionDivider.astro   # ◆ ◆ ◆ divider element
│   │   ├── ui/
│   │   │   ├── RetroButton.astro      # Pixel-shadow button (primary / ghost variants)
│   │   │   ├── RetroCard.astro        # Pixel-border card shell
│   │   │   ├── RetroTag.astro         # Severity/category tag badge
│   │   │   ├── SectionHeader.astro    # // LABEL + h2 combo used in all sections
│   │   │   ├── StatBlock.astro        # Single stat (number + label)
│   │   │   └── TerminalWindow.astro   # Fake terminal card with traffic-light dots
│   │   ├── home/
│   │   │   ├── Hero.astro             # Two-col hero with terminal card + stats
│   │   │   ├── FeaturedBounties.astro # Latest 3 bounty writeup cards
│   │   │   ├── FeaturedTools.astro    # Toolbox 4-up grid (arsenal section)
│   │   │   ├── Leaderboard.astro      # Top-5 bounty earners list
│   │   │   ├── NewsletterSignup.astro # Email + handle form widget
│   │   │   ├── Testimonials.astro     # Community quotes section
│   │   │   └── CTABanner.astro        # "Ready to go deeper?" full-width CTA
│   │   ├── bounties/
│   │   │   ├── BountyCard.astro       # Single bounty post card (list view)
│   │   │   └── BountyFeaturedCard.astro # Wide featured bounty card (lg:col-span-2)
│   │   ├── tools/
│   │   │   └── ToolCard.astro         # Single tool card with icon + download label
│   │   ├── journal/
│   │   │   ├── PostCard.astro         # Blog post summary card
│   │   │   └── PostMeta.astro         # Author avatar + date + read time
│   │   ├── archive/
│   │   │   └── ArchiveItem.astro      # Misc archive entry row
│   │   └── about/
│   │       └── ContactForm.astro      # Contact / intro form
│   ├── content/
│   │   ├── config.ts                  # Content collection schemas
│   │   ├── bounties/                  # .md files — one per bounty writeup
│   │   │   └── ssrf-deserialization-50k.md
│   │   ├── tools/                     # .md files — one per tool
│   │   │   └── recon-suite.md
│   │   ├── journal/                   # .md or .mdx blog posts
│   │   │   └── waf-bypass-unicode.md
│   │   └── archive/                   # .md files — misc entries
│   │       └── defcon-32-recap.md
│   ├── layouts/
│   │   └── PostLayout.astro           # Layout for journal + bounty detail pages
│   ├── pages/
│   │   ├── index.astro                # Home page
│   │   ├── bounties/
│   │   │   ├── index.astro            # Bounty listing page
│   │   │   └── [slug].astro           # Dynamic bounty detail page
│   │   ├── tools/
│   │   │   └── index.astro            # Tools listing page
│   │   ├── journal/
│   │   │   ├── index.astro            # Blog listing page
│   │   │   └── [slug].astro           # Dynamic journal post page
│   │   ├── archive/
│   │   │   └── index.astro            # Archive listing page
│   │   ├── about.astro                # About + contact page
│   │   ├── rss.xml.js                 # RSS feed for journal
│   │   └── 404.astro                  # Custom 404 page
│   ├── styles/
│   │   └── global.css                 # @layer base: animations, utility classes
│   └── utils/
│       ├── formatDate.ts              # Date formatting helper
│       └── readingTime.ts             # Estimated read time calc
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## Visual Design System

All design tokens must be defined in `tailwind.config.mjs` under `theme.extend`.

### Color Palette

```js
colors: {
  brand: {
    bg:         '#0d0416',   // Page background
    bgCard:     '#110822',   // Card background
    bgDeep:     '#080210',   // Footer / deepest bg
    bgHover:    '#1a0a2e',   // Hover state bg
    border:     '#2d1650',   // Default border
    borderDim:  '#1a0a2e',   // Subtle border
    purple:     '#a855f7',   // Primary accent
    purpleLight:'#c084fc',   // Light accent
    purpleDim:  '#7c3aed',   // Dim accent
    purpleMuted:'#6b5490',   // Muted text
    textPrimary:'#e9d5ff',   // Main text
    textMuted:  '#8b7aa8',   // Body text
    textDim:    '#6b5490',   // Dimmed text
    textFaint:  '#4a3566',   // Footer text
    green:      '#22c55e',   // Success / terminal green
    yellow:     '#eab308',   // Warning
    red:        '#f43f5e',   // Critical / danger
  }
}
```

### Typography

```js
fontFamily: {
  mono:    ['"IBM Plex Mono"', 'monospace'],   // Body / default
  space:   ['"Space Mono"', 'monospace'],      // Nav, labels, buttons
  pixel:   ['"Press Start 2P"', 'monospace'],  // Hero headings, logos
  vhs:     ['"VT323"', 'monospace'],           // Ticker, footer flavor text
}
```

### Custom Utilities (add to `global.css` via `@layer utilities`)

```css
/* Pixel-style hard drop shadow */
.retro-shadow     { box-shadow: 4px 4px 0px #1a0a2e; }
.retro-shadow-lg  { box-shadow: 6px 6px 0px #1a0a2e; }
.retro-shadow-purple { box-shadow: 4px 4px 0px #6b21a8; }

/* Pixel border */
.pixel-border { border: 3px solid #1a0a2e; }

/* Button press effect */
.retro-btn {
  box-shadow: 4px 4px 0px #1a0a2e;
  transition: all 0.1s ease;
}
.retro-btn:hover  { transform: translate(2px, 2px); box-shadow: 2px 2px 0px #1a0a2e; }
.retro-btn:active { transform: translate(4px, 4px); box-shadow: 0px 0px 0px #1a0a2e; }

/* Dashed purple border */
.dashed-border { border: 2px dashed #7c3aed; }

/* Purple grid background */
.grid-bg {
  background-image:
    linear-gradient(rgba(124, 58, 237, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 58, 237, 0.07) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* CRT scanline repeating lines */
.crt-lines {
  background-image: repeating-linear-gradient(
    0deg, transparent, transparent 2px,
    rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px
  );
}

/* VHS chromatic aberration text */
.vhs-text { text-shadow: 2px 0 #ff006e, -2px 0 #00f0ff; }

/* Blinking cursor */
.cursor-blink::after { content: '█'; animation: blink 1s step-end infinite; }

/* Retro input inset shadow */
.retro-input { box-shadow: inset 2px 2px 0px rgba(0,0,0,0.2), 4px 4px 0px #1a0a2e; }
```

### CSS Animations (define in `global.css` via `@layer base`)

```css
@keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
@keyframes blink    { 0%,50% { opacity:1; } 51%,100% { opacity:0; } }
@keyframes glitch   { 0%{transform:translate(0)} 20%{transform:translate(-2px,2px)} 40%{transform:translate(-2px,-2px)} 60%{transform:translate(2px,2px)} 80%{transform:translate(2px,-2px)} 100%{transform:translate(0)} }
@keyframes float    { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
@keyframes marquee  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
```

Add to `tailwind.config.mjs`:
```js
animation: {
  scanline: 'scanline 4s linear infinite',
  blink:    'blink 1s step-end infinite',
  glitch:   'glitch 0.3s ease',
  float:    'float 3s ease-in-out infinite',
  marquee:  'marquee 20s linear infinite',
}
```

### Noise Overlay + Scanline

Applied globally in `BaseLayout.astro`:
```html
<!-- Fixed noise texture layer -->
<div class="fixed inset-0 pointer-events-none z-50" style="background-image: url('noise.svg'); opacity: 0.08;"></div>

<!-- Scanline sweep (pseudo via body class or a fixed div) -->
<div class="fixed top-0 left-0 w-full h-1 bg-purple-500/8 animate-scanline pointer-events-none z-50"></div>
```

---

## Content Collections Schema (`src/content/config.ts`)

```typescript
import { defineCollection, z } from 'astro:content';

const bounties = defineCollection({
  type: 'content',
  schema: z.object({
    title:        z.string(),
    severity:     z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']),
    category:     z.string(),               // e.g. "RCE", "XSS", "SSRF"
    bountyAmount: z.number().optional(),    // USD
    date:         z.coerce.date(),
    program:      z.string().optional(),    // e.g. "HackerOne / Company X"
    featured:     z.boolean().default(false),
    draft:        z.boolean().default(false),
    description:  z.string(),
    tags:         z.array(z.string()).default([]),
    ogImage:      z.string().optional(),
  }),
});

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    icon:        z.string(),              // Iconify icon name
    downloadUrl: z.string().optional(),
    repoUrl:     z.string().optional(),
    free:        z.boolean().default(true),
    tags:        z.array(z.string()).default([]),
    featured:    z.boolean().default(false),
  }),
});

const journal = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    date:        z.coerce.date(),
    tags:        z.array(z.string()).default([]),
    draft:       z.boolean().default(false),
    ogImage:     z.string().optional(),
    readingTime: z.number().optional(),   // minutes (auto-computed if absent)
  }),
});

const archive = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    date:        z.coerce.date(),
    category:    z.string(),
    tags:        z.array(z.string()).default([]),
    externalUrl: z.string().optional(),
  }),
});

export const collections = { bounties, tools, journal, archive };
```

---

## Component Specifications

### `BaseLayout.astro`
Props: `{ title, description, ogImage?, canonical? }`

- Loads Google Fonts via `<link rel="preconnect">` + `<link rel="stylesheet">` in `<head>`.
- Inserts `<SEO>` meta block with OG / Twitter Card tags.
- Applies `bg-brand-bg text-brand-textPrimary crt-lines font-mono` to `<body>`.
- Renders noise overlay div + scanline div.
- Slot: `<slot />` for page content.
- Includes `<Nav />`, `<MarqueeBanner />` above the slot and `<Footer />` below.

### `Nav.astro`
- Sticky, `z-40`, `border-b-2 border-brand-border`.
- Logo: purple pixel square with "ZS" + "ZERO STATE / PROTOCOL" text.
- Desktop links: `[JOURNAL]` `[BOUNTIES]` `[TOOLS]` `[ARCHIVE]` `[ABOUT]` — wrapped in `<a>` pointing to `/journal`, `/bounties`, `/tools`, `/archive`, `/about`.
- Active link detection: compare `Astro.url.pathname` to each href, apply brighter color when active.
- CTA button: `SUBSCRIBE` → links to newsletter section or `/about#contact`.
- Hamburger button: visible on `md:hidden`, triggers `MobileMenu`.

### `MobileMenu.astro`
- Full-screen fixed overlay (`z-50`), hidden by default (`hidden` class).
- Opened/closed by vanilla JS in a `<script>` tag at bottom of component.
- Closes on any nav link click.

### `MarqueeBanner.astro`
- `bg-brand-bgHover border-b-2 border-brand-border overflow-hidden`.
- Inner div with `.marquee-track` animation (duplicated content for seamless loop).
- Items are configurable via a prop `items: string[]` with a default array.

### `SectionDivider.astro`
- `border-t-2 border-brand-border relative` with optional `◆ ◆ ◆` centered label.
- Prop: `label?: string` — if provided, renders the label pill.

### `RetroButton.astro`
Props: `{ variant?: 'primary' | 'ghost', href?: string, type?: string, class?: string }`
- `primary`: `bg-brand-purple text-brand-bg` + `.retro-btn .pixel-border`
- `ghost`: `bg-brand-bgHover text-brand-purpleLight border-brand-purpleDim` + `.retro-btn .pixel-border`
- Renders as `<a>` if `href` provided, else `<button>`.

### `RetroCard.astro`
- Shell: `bg-brand-bgCard pixel-border retro-shadow`.
- Hover: `hover:bg-brand-bgHover hover:translate-x-0.5 hover:translate-y-0.5 transition-all`.
- `<slot />` for inner content.

### `SectionHeader.astro`
Props: `{ label: string, heading: string }`
- Renders `// LABEL` in VT323 inside a `bg-brand-border pixel-border retro-shadow` pill.
- Then renders `heading` in Press Start 2P font below.

### `TerminalWindow.astro`
Props: `{ filename?: string, lines: Array<{ text: string, color: string }> }`
- Header bar: traffic-light dots (red/yellow/green) + filename.
- Body: renders each line with its specified color class.
- Last line gets `.cursor-blink` class.
- Apply `.floating` animation to outer wrapper.

### `StatBlock.astro`
Props: `{ value: string, label: string, color?: string }`
- `bg-brand-bgHover pixel-border p-3 text-center retro-shadow`.

### `RetroTag.astro`
Props: `{ severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | string }`
- CRITICAL → `bg-brand-red text-brand-bg`
- HIGH → `bg-brand-yellow text-brand-bg`
- MEDIUM → `bg-brand-purpleDim text-brand-textPrimary`
- LOW → `bg-brand-bgHover text-brand-purpleLight pixel-border`

---

## Pages Specification

### `index.astro` — Home Page
SEO: title `"Brahma | Zero State Protocol — Bug Bounty & Security Research"`, description summarising the site.

Sections in order:
1. `<Hero />` — two-col layout. Left: badge + h1 + tagline + two CTA buttons + 3 stats (`StatBlock`). Right: `<TerminalWindow />` with nmap output demo content.
2. `<SectionDivider label="◆ ◆ ◆" />`
3. `<FeaturedBounties />` — query `bounties` collection `featured: true`, sort by date desc, show max 3. Uses `BountyFeaturedCard` for first result (wide), `BountyCard` for rest.
4. `<SectionDivider />`
5. `<FeaturedTools />` — query `tools` collection `featured: true`, 4-up grid, `ToolCard`.
6. `<SectionDivider />`
7. Two-column layout: left `<Leaderboard />`, right `<NewsletterSignup />`.
8. `<SectionDivider />`
9. `<Testimonials />` — static, 3 quote cards.
10. `<SectionDivider />`
11. `<CTABanner />` — "READY TO GO DEEPER?" with subscribe CTA.

### `bounties/index.astro` — Bounties Listing
SEO: title `"Bug Bounty Writeups | Brahma — Zero State Protocol"`.

- `<SectionHeader label="// HALL OF FAME" heading="BOUNTY ACHIEVED" />`
- Filter/sort controls (vanilla JS): by severity, sort by date or amount.
- Grid of `<BountyCard />` components.
- All bounties from content collection, excluding `draft: true`.

### `bounties/[slug].astro` — Bounty Detail
- Uses `PostLayout.astro`.
- JSON-LD `Article` schema.
- Render MDX content.
- Sidebar: severity badge, bounty amount, program, date, tags.

### `tools/index.astro` — Tools Page
SEO: title `"Security Tools & Resources | Brahma — Zero State Protocol"`.

- `<SectionHeader label="// ARSENAL" heading="HUNTER'S TOOLBOX" />`
- 4-col grid (lg), 2-col (sm) of `<ToolCard />`.
- Each card: icon, title, description, download/repo link, free badge.

### `journal/index.astro` — Journal / Blog
SEO: title `"Security Research Journal | Brahma — Zero State Protocol"`.

- RSS feed link in `<head>`: `<link rel="alternate" type="application/rss+xml" href="/rss.xml" />`
- `<SectionHeader label="// DISPATCHES" heading="LATEST FROM THE FIELD" />`
- Grid of `<PostCard />` — query `journal` collection, exclude drafts, sort by date desc.

### `journal/[slug].astro` — Journal Post Detail
- Uses `PostLayout.astro`.
- JSON-LD `Article` schema.
- Estimated reading time via `readingTime` util.
- Tags rendered as `<RetroTag />`.

### `archive/index.astro` — Archive
SEO: title `"Archive | Brahma — Zero State Protocol"`.

- `<SectionHeader label="// VAULT" heading="THE ARCHIVE" />`
- List of `<ArchiveItem />` sorted by date desc.

### `about.astro` — About & Contact
SEO: title `"About Brahma | Zero State Protocol"`.
JSON-LD `Person` schema: name "Brahma", sameAs links (Twitter/X, GitHub, etc.).

Sections:
- Brief intro / bio block (text + terminal aesthetic).
- Contact form (`<ContactForm />`): name, email, message fields. On submit: `mailto:` fallback or a configured endpoint. Vanilla JS validation.
- PGP key display block (monospace, copyable).
- Social links.

### `404.astro` — Custom 404
- Retro terminal "404 NOT FOUND" in Press Start 2P.
- Fake error trace in VT323 monospace.
- Button back to home.

### `rss.xml.js`
```js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
export async function GET(context) {
  const posts = await getCollection('journal', ({ data }) => !data.draft);
  return rss({
    title: "Brahma | Zero State Protocol",
    description: "Security research journal by Brahma",
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/journal/${post.slug}/`,
    })),
  });
}
```

---

## `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://brahma.dev',   // Replace with real domain
  integrations: [
    tailwind(),
    sitemap(),
    mdx(),
  ],
  output: 'static',
});
```

---

## `tailwind.config.mjs`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,mdx}'],
  theme: {
    extend: {
      colors: { /* paste brand palette from above */ },
      fontFamily: { /* paste font families from above */ },
      animation: {
        scanline: 'scanline 4s linear infinite',
        blink:    'blink 1s step-end infinite',
        glitch:   'glitch 0.3s ease',
        float:    'float 3s ease-in-out infinite',
        marquee:  'marquee 20s linear infinite',
      },
      keyframes: {
        scanline: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100vh)' } },
        blink:    { '0%, 50%': { opacity: '1' }, '51%, 100%': { opacity: '0' } },
        glitch:   { '0%,100%': { transform: 'translate(0)' }, '20%': { transform: 'translate(-2px,2px)' }, '40%': { transform: 'translate(-2px,-2px)' }, '60%': { transform: 'translate(2px,2px)' }, '80%': { transform: 'translate(2px,-2px)' } },
        float:    { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        marquee:  { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
};
```

---

## `PostLayout.astro`

Used by both journal posts and bounty writeups.

```astro
---
// Props: frontmatter from collection entry
const { title, description, date, ogImage, ...rest } = Astro.props;
---
<BaseLayout title={title} description={description} ogImage={ogImage}>
  <main class="max-w-4xl mx-auto px-4 py-16">
    <!-- Breadcrumb -->
    <!-- Post header: title, meta, tags -->
    <!-- MDX slot -->
    <article class="prose prose-invert prose-purple max-w-none">
      <slot />
    </article>
    <!-- Back link -->
  </main>
</BaseLayout>
```

Add Tailwind Typography plugin (`@tailwindcss/typography`) and configure `prose-purple` variant to match brand palette.

---

## Interactivity (Vanilla JS)

All JS must be in `<script>` tags inside components or in `src/scripts/` imported via `<script src="...">`.

| Feature | Location | Notes |
|---|---|---|
| Mobile menu open/close | `MobileMenu.astro` | Toggle `hidden` class, trap focus |
| Marquee pause on hover | `MarqueeBanner.astro` | `animation-play-state: paused` on hover |
| Newsletter form validation | `NewsletterSignup.astro` | Check email format, show inline error in retro style |
| Contact form validation | `ContactForm.astro` | Same pattern |
| Bounty filter/sort | `bounties/index.astro` | Filter cards by data attributes, vanilla DOM |
| Copy to clipboard (PGP) | `about.astro` | `navigator.clipboard.writeText`, button text feedback |
| Active nav highlight | `Nav.astro` | Compare `window.location.pathname` to link hrefs |

---

## `robots.txt` (`public/robots.txt`)

```
User-agent: *
Allow: /
Sitemap: https://brahma.dev/sitemap-index.xml
```

---

## Sample Frontmatter Files

### `src/content/bounties/ssrf-deserialization-50k.md`
```md
---
title: "Chaining SSRF + Deserialization for $50,000: A Cloud Provider's Worst Nightmare"
severity: CRITICAL
category: RCE
bountyAmount: 50000
date: 2024-12-15
program: "HackerOne — Major Cloud Provider"
featured: true
description: "Deep dive into a critical vulnerability chain in a major cloud provider's internal API gateway."
tags: ["ssrf", "deserialization", "java", "rce", "cloud"]
---
```

### `src/content/tools/recon-suite.md`
```md
---
title: Recon Suite
description: Subdomain enumeration, port scanning, and asset discovery templates.
icon: solar:radar-2-linear
downloadUrl: /downloads/recon-suite.zip
free: true
featured: true
tags: ["recon", "enumeration", "osint"]
---
```

### `src/content/journal/waf-bypass-unicode.md`
```md
---
title: "Bypassing WAF Rules with Unicode Normalization Tricks"
description: "How Unicode normalization differences between WAFs and backend servers create exploitable gaps."
date: 2024-12-12
tags: ["waf", "bypass", "unicode", "xss"]
---
```

---

## Accessibility Checklist

- All interactive elements must be keyboard-navigable.
- Focus styles must be visible (use `focus:outline focus:outline-brand-purple`).
- Color contrast: ensure text-to-background passes WCAG AA.
- `aria-label` on icon-only buttons.
- `aria-expanded` on mobile menu toggle button.
- `role="navigation"` on `<nav>` elements.
- Skip-to-main link at top of `BaseLayout.astro`.

---

## Performance Notes

- Use Astro's built-in image optimization via `<Image />` from `astro:assets` for all images.
- All Google Fonts must use `display=swap`.
- Iconify web component (`iconify-icon`) is loaded from CDN — defer with `async` or self-host the subset needed.
- The noise overlay SVG should be inlined as a `data:` URI or saved as `public/noise.svg` and referenced via CSS `background-image`.
- Avoid `@apply` overuse in CSS — prefer utility classes directly in templates.

---

## Notes for the Agent

1. **Do not** install React, Vue, or Svelte. Astro components + vanilla JS only.
2. Content collections are the single source of truth for all dynamic content — no hardcoded article arrays in pages.
3. Every new page must import `BaseLayout.astro` and pass `title` + `description` props.
4. The `RetroButton`, `RetroCard`, `SectionHeader` components are **primitives** — all other components should compose them rather than duplicating styles.
5. Keep all section-level components (Hero, FeaturedBounties, etc.) in `src/components/home/` and page-level imports in `src/pages/index.astro` to maintain clear separation.
6. When building dynamic `[slug].astro` pages, always use `getStaticPaths` with `getCollection`.
7. The marquee track content must be **duplicated twice** inside the scrolling div to achieve a seamless infinite loop.
8. Fonts: load only the specific weights needed — IBM Plex Mono 400/600, Space Mono 400/700, Press Start 2P 400, VT323 400.
