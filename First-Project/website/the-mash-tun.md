# The Mash Tun — Homebrew Beer Website

A complete single-file homebrewing website built in HTML/CSS/JS with a rustic craft aesthetic. All data is stored in the browser via `localStorage` — no backend or database required.

---

## Project Structure

```
C:\Users\brian.macauley\First-Project\website\
└── index.html        ← the entire website
```

Run locally with:
```bash
npx serve C:\Users\brian.macauley\first-project\website
```
Then open **http://localhost:3000**

No build step required. The file is self-contained.

---

## Sections

### 1. Navigation
Sticky top bar linking to all sections. Dark bark background with amber accent border.

### 2. Hero
Full-width banner with headline, tagline, and a "Start Brewing" CTA button that scrolls to the guide.

### 3. How to Brew (`#guide`)
Six-step brewing guide in a card grid:
1. Sanitize Everything
2. Mashing the Grain
3. The Boil
4. Cooling & Pitching
5. Fermentation
6. Bottling & Conditioning

### 4. Beer Menu (`#menu`)
Eight beer style cards. Each card is **clickable** — clicking opens a Google search for "how to homebrew [beer name]" in a new tab. A "🔍 How to brew →" hint fades in on hover.

| Beer | Style | ABV | IBU | Difficulty |
|------|-------|-----|-----|------------|
| American Pale Ale | American Ale | 4.5–6% | 30–45 | Beginner |
| Dry Irish Stout | Irish Stout | 4–5% | 35–45 | Beginner |
| Hefeweizen | German Wheat | 4.5–5.5% | 10–20 | Beginner |
| New England IPA | India Pale Ale | 6–8% | 40–70 | Intermediate |
| Belgian Saison | Belgian Ale | 5–8% | 20–35 | Intermediate |
| Russian Imperial Stout | Imperial Stout | 9–13% | 50–90 | Advanced |
| Classic Cream Ale | American Lager | 4.2–5.6% | 10–22 | Easy |
| Kettle Sour (Berliner Weisse) | Sour Ale | 2.5–3.5% | 3–8 | Intermediate |

### 5. Equipment & Ingredients (`#equipment`)
Four-column reference lists:
- **Essential Equipment** — kettle, fermentation vessel, airlock, siphon, wort chiller, hydrometer, bottle capper, sanitizer
- **Key Ingredients** — malted barley, hops, yeast, water, priming sugar, Irish moss, yeast nutrient, adjuncts
- **Nice to Have** — grain mill, mash tun, refractometer, pH meter, keg system, temperature controller
- **Where to Buy** — local homebrew shop, MoreBeer, Northern Brewer, Adventures in Homebrewing, Midwest Supplies, Amazon

### 6. My Craft Beer Recipes (`#recipes`)
User-created recipe storage. All data saved in `localStorage` and persists across browser sessions.

#### Form fields

**Basic info**
- Recipe Name *(required)*
- Style (dropdown: Pale Ale, IPA, Stout, Porter, Hefeweizen, Saison, Lager, Sour, Amber Ale, Brown Ale, Barleywine, Other)
- Difficulty (Easy / Beginner / Intermediate / Advanced)

**Fermentation**
- Yeast (dropdown with 12 common strains + "Other" → free-text input)
- Malts Used (multi-select checkbox dropdown with 14 malts + "Other")
- Hops Used (multi-select checkbox dropdown with 15 hop varieties + "Other"; each selected hop reveals an oz quantity input)
- Est. ABV %
- IBU
- Batch Size (gallons)
- Grain Bill (lbs)
- OG — Original Gravity (e.g. 1.055)
- FG — Final Gravity (e.g. 1.010) — actual ABV auto-calculated as `(OG - FG) × 131.25`
- Brew Date

**Notes**
- Ingredients (textarea)
- Brew Notes & Method (textarea)

**Water Profile** *(collapsible advanced section)*
- Mash pH
- Calcium (ppm)
- Magnesium (ppm)
- Sodium (ppm)
- Sulfate SO₄ (ppm)
- Chloride Cl (ppm)

**Photo** — JPG, PNG, WEBP, stored as base64

#### Recipe list features
- **Search** — live filter by name or style
- **Filter** — by style and difficulty
- **Sort** — newest first, oldest first, A→Z, Z→A, by style
- **★ Faves** — toggle to show only starred recipes

#### Saved recipe cards
- Collapsed by default — shows name + tag pills (style, difficulty, yeast, malts, hops, ABV, IBU)
- **Click card to expand** — reveals fermentation stats (batch, grain, OG, FG, actual ABV), brew date, ingredients, notes, water profile
- **☆ Star button** (top-right) — favourite/unfavourite; persisted in localStorage
- **✕ Delete button** (top-right) — with confirmation prompt
- **Duplicate** — clones recipe to top of list
- **Export .txt** — downloads a formatted plain-text recipe file
- **Share Link** — encodes recipe as base64 in the URL hash; opening the link pre-fills the form

#### Brew Timer
Toggle with **⏱ Brew Timer** button above the recipe list. Presets: Mash 60m, Boil 90m, Hop 15m, Hop 5m. Start / Pause / Reset controls. Plays a 3-beep audio alert when the timer reaches zero.

**localStorage key:** `mashTunRecipes` (JSON array)

### 7. Photo Gallery (`#gallery`)
Three stock photography images of beer pints with captions. Sourced from Unsplash.

### 8. Brew Counter (`#counter`)
Tracks the number of batches brewed. Persists in `localStorage`.

**Controls:** `+` and `−` buttons. Reset button with confirmation prompt.

**Auto-calculated stats:**
| Stat | Formula |
|------|---------|
| Est. Gallons | batches × 5 |
| Est. Bottles | batches × 48 |
| Brewer Level | see table below |

**Brewer Levels:**
| Batches | Level |
|---------|-------|
| 0 | — |
| 1–2 | Novice |
| 3–6 | Apprentice |
| 7–14 | Brewer |
| 15–29 | Craftsman |
| 30+ | Master |

**localStorage key:** `mashTunBatches` (integer)

### 9. Brewing Q&A (`#qa`)
Live AI chat powered by the Anthropic Claude API (`claude-sonnet-4-20250514`).

- Maintains full conversation history within the session
- Pre-loaded suggestion chips for common questions
- Press Enter or click "Ask" to submit
- System prompt scopes Claude to homebrewing topics only

**Quick suggestion chips:**
- How long does fermentation take?
- Why is my beer cloudy?
- Best beginner beer to brew?
- What ABV is safe to bottle?
- How do I dry hop?

---

## Design System

### Colour Palette

| Variable | Hex | Usage |
|----------|-----|-------|
| `--amber` | `#C8871A` | Primary accent, buttons, borders |
| `--amber-light` | `#E8A83A` | Hover states, highlights |
| `--amber-dark` | `#8B5E0A` | Tags, dark accents |
| `--cream` | `#F5EDD8` | Primary background |
| `--cream-dark` | `#E8D9B8` | Secondary background, borders |
| `--bark` | `#2C1A0A` | Nav, hero, dark sections |
| `--bark-mid` | `#4A2E12` | Q&A background, card fills |
| `--bark-light` | `#6B4420` | Borders on dark sections |
| `--foam` | `#FBF6EC` | Guide section background |
| `--text` | `#2C1A0A` | Primary body text |
| `--text-mid` | `#5A3A1A` | Secondary text |
| `--text-light` | `#8B6A40` | Muted/hint text |

### Typography
- **Display / Headings:** Playfair Display (Google Fonts) — weights 400, 700, 900
- **Body / UI:** Crimson Pro (Google Fonts) — weights 300, 400, 600; italic variants

### Aesthetic
Rustic craft brewery — warm amber and dark wood tones, serif typography, noise texture overlay, elliptical hero wave, flat cards with amber top borders.

---

## localStorage Reference

| Key | Type | Description |
|-----|------|-------------|
| `mashTunBatches` | Integer | Total batch count for the brew counter |
| `mashTunRecipes` | JSON Array | All saved user recipes including base64 image data |

> **Note:** Because recipe photos are stored as base64 strings, each image adds roughly 1–3 MB to localStorage. Browsers typically allow 5–10 MB total. If storage fills up, older recipes with large photos should be deleted first.

---

## Claude API Integration

The Q&A section calls the Anthropic API directly from the browser.

```javascript
fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: "You are an expert homebrewing assistant...",
    messages: conversationHistory
  })
});
```

> **Important:** In production, API calls should be proxied through a backend server to avoid exposing your API key in client-side code.

---

## Deployment

### Local (npx serve)
```bash
npx serve C:\Users\brian.macauley\first-project\website
# → http://localhost:3000
```

### Static Hosting (recommended)
1. [Netlify](https://netlify.com) — drag and drop the folder, instant deploy
2. [GitHub Pages](https://pages.github.com) — push to a repo, enable Pages in settings
3. [Vercel](https://vercel.com) — connect repo or drag-and-drop

No build step required. The file is self-contained.

---

## Customisation Guide

| What to change | Where in the file |
|----------------|-------------------|
| Site name ("The Mash Tun") | `<title>`, `.nav-brand`, footer `<strong>` |
| Hero headline & tagline | `.hero h1` and `.hero-sub` |
| Beer menu cards | `#menu` section — duplicate/edit `.beer-card` blocks |
| Beer card search query | `onclick="window.open(...)"` on each `.beer-card` |
| Step-by-step guide content | `#guide` section — edit `.step-card` blocks |
| Equipment lists | `#equipment` section — edit `<li>` items |
| Gallery photos | Replace `src` URLs in `#gallery` `<img>` tags |
| Colour scheme | `:root` CSS variables at top of `<style>` |
| AI system prompt | `system:` field inside `sendMessage()` function |
| Brewer level thresholds | `getLevel()` function in `<script>` |
| Yeast options | `<select id="r-yeast">` in the recipes form |
| Malt options | `#maltPanel` checkbox list in the recipes form |
| Hop options | `#hopPanel` checkbox list in the recipes form |
