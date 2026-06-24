# Htrend Lite

Htrend Lite is a lightweight, client-side Single Page Application (SPA) that shows real-time analytics for any public YouTube video or Short using the YouTube Data API v3. It's designed to be fast, privacy-respecting (no server-side storage), and easy to host (works with Vite and GitHub Pages).

## Table of contents
- [Features](#features)
- [Tech stack](#tech-stack)
- [How it works](#how-it-works)
- [Folder structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Local development](#local-development)
- [Configuration (API key & language)](#configuration-api-key--language)
- [Build & deploy](#build--deploy)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features
- Instant inspection of YouTube videos and Shorts by pasting a URL or ID.
- Displays title, channel, thumbnail, description and basic statistics (views, likes, comments).
- Small client-only codebase — no backend required.
- Dynamic language support via JSON locale files in public/locales.
- Responsive UI using Tailwind CSS (CDN) and charts rendered with Chart.js (CDN).

## Tech stack
- Language: JavaScript, HTML
- Build tool: Vite
- UI: Tailwind CSS (CDN)
- Charts: Chart.js (CDN)
- YouTube Data: YouTube Data API v3 (client-side fetch)
- Locales: JSON files under public/locales/

Notable files: `src/api.js`, `src/main.js`, `src/i18n.js`, `index.html`, `vite.config.js`, `package.json`.

## How it works
1. The user pastes a YouTube video/short URL into the search input.
2. The client extracts the video ID (`src/api.js`) and calls the YouTube Data API v3.
3. Response data is mapped to UI cards and a chart (`src/main.js`).
4. Language strings are loaded dynamically from `public/locales/<locale>.json` (`src/i18n.js`).
5. API key is stored locally in the browser (localStorage) and used for requests.

## Folder structure
```text
htrend-lite/
├── public/
│   └── locales/            # Locale JSON files (e.g. en.json, es.json)
├── src/
│   ├── api.js              # Extracts IDs + fetches YouTube Data API
│   ├── i18n.js             # Loads locale JSON files and applies translations
│   └── main.js             # App wiring, DOM handling, chart render
├── index.html              # SPA entry (Tailwind + Chart.js via CDN)
├── package.json            # Vite scripts: dev, build, preview
├── vite.config.js
└── LICENSE                 # MIT License
