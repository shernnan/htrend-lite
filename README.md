# Htrend

## Executive Summary
Htrend is a lightweight, static web tool designed for real-time metrics analysis of YouTube videos, shorts, and channels. Unlike complex platforms, Htrend processes data on-demand directly in the user's browser using the public YouTube API, allowing for immediate, secure monitoring without the need for registration or external servers.

The project is optimized to run exclusively on GitHub Pages with dynamic multi-language support.

## Vision
To offer the fastest, most lightweight, and accessible YouTube analysis tool on the web, running entirely on the client side.

---

## Key Features
* **On-Demand Analysis:** Instant inspection of metrics (views, interactions, growth rate) just by entering a YouTube URL or ID.
* **Pure Serverless Architecture:** Functions exclusively within the browser through direct `fetch` calls, ensuring absolute privacy and zero infrastructure costs.
* **Dynamic Internationalization:** Modular structure to support over 100 languages via asynchronous loading of local JSON files.
* **Compact Design:** A fast, responsive Single Page Application (SPA) interface adaptable to mobile devices.

---

## Folder Structure

```text
htrend-lite/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automatic deployment to GitHub Pages
├── public/
│   └── locales/              # Independent language files (100+ languages)
│       ├── es.json           # Spanish (Default)
│       ├── en.json           # English
│       └── [locale].json     # Other languages
├── src/
│   ├── api.js                # Direct connection functions to the YouTube Data API v3
│   ├── charts.js             # Real-time chart rendering (Chart.js / Canvas)
│   ├── i18n.js               # Asynchronous language switching logic
│   ├── main.js               # Main application logic and DOM manipulation
│   └── index.css             # Interface styling (Tailwind CSS)
├── index.html                # Single Page application interface
├── .env.example              # Template for the local API Key
├── .gitignore                # Git exclusions
├── LICENSE                   # MIT License
└── README.md                 # Project documentation


Operating Specifications
1. Real-Time Data Flow

    The user inserts a video, short, or channel URL into the main search interface.

    The core logic in src/api.js extracts the specific ID and triggers a direct asynchronous fetch request to the official YouTube Data API endpoints.

    The raw response is mapped in memory and parsed directly into src/main.js to update structural metrics cards and real-time visualization scales.

2. Local State Caching

To maintain optimal client-side execution boundaries and avoid quota bottlenecks, data is temporarily cached using native browser storage mechanisms. Language preferences and user configuration layers (such as safe client-side API Key storage) persist entirely inside LocalStorage and SessionStorage.
Local Installation & Development Setup
Prerequisites

Before starting, ensure you have the following software installed locally:

    Node.js (v18.0.0 or higher)

    npm (comes bundled with Node) or pnpm

Quick Start Steps

    Clone the repository to your local environment:
    ´´Bash

    git clone [https://github.com/your-username/htrend-lite.git](https://github.com/your-username/htrend-lite.git)


    Navigate directly into the project directory:
    ´´Bash

    cd htrend-lite

    Install all production and development dependencies:
    ´´Bash

    npm install

    Set up your local environment configuration:
    ´´Bash

    cp .env.example .env

    Launch the local Vite development server:
    ´´Bash

    npm run dev

The application will now be running locally, typically accessible via http://localhost:5173.
Deployment Mechanics

Automated continuous deployment is handled natively via GitHub Actions. Any validated codebase mutation pushed directly to the main branch triggers the orchestration pipeline inside .github/workflows/deploy.yml. The system automatically sets up the build environment, installs dependencies, runs optimization tasks via Vite, and forces a secure push to the gh-pages target branch for immediate production availability.
License

This project is open-source and structured under the terms of the MIT License.