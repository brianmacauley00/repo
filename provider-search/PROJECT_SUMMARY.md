# Provider Search Project Summary

## Overview

This project is a front-end prototype for **Norstella LinQ Studio Provider Search**. It provides a browser-based interface for exploring healthcare providers, searching by geography and specialty, reviewing diagnosis-based provider results, and identifying provider coverage gaps.

The app is primarily built as a **static HTML/CSS/JavaScript experience** with a lightweight Node.js proxy used during local development to serve the UI and forward API requests.

## What the App Does

The main prototype supports three core workflows:

1. **Provider proximity search**
   - Search by ZIP code or state
   - Filter by radius and specialty
   - View provider lists and map results

2. **Diagnosis-based provider search**
   - Search providers related to a diagnosis / ICD flow
   - Display paginated results
   - Enrich and map returned providers

3. **Gap analysis**
   - Surface underserved areas and severity levels
   - Show summary cards and gap detail metrics
   - Support map-based exploration of gap locations

Additional UI features include:

- Specialty typeahead and lookup data
- Saved searches
- Provider detail drawer
- EHR export UI
- Coverage indicators and map visualization

## Architecture

This repo is not organized as a framework-based app. Instead, it uses:

- **Static HTML files** for the UI prototypes
- **Inline CSS** for styling
- **Inline vanilla JavaScript** for state, rendering, API calls, and interactions
- **A small Node.js HTTP proxy** in `proxy.js` for local serving and API forwarding

The main local app flow is:

- Browser loads `public/index.html`
- Front-end makes requests to `/api/...`
- `proxy.js` forwards those requests to the upstream API host

## Key Files

- `public/index.html`
  - Main prototype currently served by the local proxy
- `proxy.js`
  - Local HTTP server and API proxy
- `public/index11.html`, `public/index2.html` ... `public/index9.html`
  - Alternate prototype snapshots / iterations
- `provider-search.html`, `provider-search2.html`, `provider-search3.html`, `provider-search4.html`
  - Earlier or parallel standalone prototype files in the repo root
- `provider_smoke_test.html`
  - Likely a lightweight manual test page
- `norstella_400x400.png`
  - Branding/image asset used in the UI

## External Libraries

The front-end pulls in a few browser-hosted libraries directly from CDNs:

- Font Awesome
- D3.js
- TopoJSON

There is no package manifest in the current repo, so this project appears to run without a build step or dependency installation.

## API Integration

The UI fetches lookup and search data through the local proxy. Based on the current implementation, the app uses endpoints such as:

- `/v1/lookup/states`
- `/v1/lookup/specialties`
- `/v1/providers`
- `/v1/distance/coverage`
- `/v1/diagnosis/providers`
- `/v1/analytics/gaps`

The proxy adds an `X-API-Key` header and forwards requests to the configured upstream host.

## How to Run Locally

From the project root:

```powershell
node proxy.js
```

Then open:

`http://localhost:3131`

This serves `public/index.html` and proxies API traffic for the app.

## Current State of the Repo

This looks like an **interactive prototype / proof-of-concept repository** rather than a production application. The codebase is optimized for fast UI iteration:

- Many versioned HTML files suggest design or behavior iterations
- Logic is contained directly in the page instead of split into modules
- There is no bundler, test runner, or formal app structure visible in the repo

That makes the project easy to run and modify quickly, but it may need refactoring if it is intended to become a larger maintained product.
