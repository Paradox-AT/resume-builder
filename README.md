# 📄 Interactive Resume Builder Wizard

A high-performance, dynamic resume builder application built with **Next.js 16**, **React 19**, **TypeScript 5**, and **Tailwind CSS 4**. Designed with a dual layout rendering engine featuring **12 Classic ATS (Applicant Tracking System)** templates and a **UX Rich Modern Sidebar** layout, combined with real-time browser preview, full state hydration, local storage persistence, multi-profile target management, and 1-click pixel-perfect PDF vector printing.

[![Live Demo](https://img.shields.io/badge/Live_Demo-https://paradox--at.github.io/resume--builder/-10B981?style=for-the-badge&logo=githubpages&logoColor=white)](https://paradox-at.github.io/resume-builder/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.12-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=flat-square)](LICENSE)

🚀 **Live Demo**: [https://paradox-at.github.io/resume-builder/](https://paradox-at.github.io/resume-builder/)

---

## ✨ Key Features

### 🎨 Dual Layout & Rendering Engines
* **12 ATS Optimized Templates**: Ultra-clean, single & dual-column text-focused layouts engineered to pass corporate Applicant Tracking Systems seamlessly.
  * `Standard Centered` – Traditional layout with centered header & subtle horizontal dividers.
  * `Clean Whitespace` – Refined typography with wide margins & clear structure.
  * `Header Banner` – Full-width text header bar with categorized bullet lists.
  * `Minimal Vertical Line` – Left-aligned typography with an elegant edge accent line.
  * `Modern Section Divider` – Header accent bar with tagged experience sub-sections.
  * `Compact ATS Grid` – High-density dual-column layout fitting long histories cleanly onto 1 page.
  * `Academic Serif` – Formal academic format with classical serif typography & publication spacing.
  * `Typography Badge` – Text-only ATS layout featuring high-contrast section badges.
  * `Pure Single-Column` – Minimalist single-column format with bold headers and zero clutter.
  * `Technical Skill Matrix` – Developer-focused grid highlighting core technologies & timelines.
  * `Executive Classic` – Double top accent rules with small-caps section headers.
  * `Corporate Grid` – Structured right-aligned contact details with shaded section headers.
* **UX Rich Modern Sidebar Engine**: Modern split-column layout (`ux-modern`) with a colored accent left sidebar, initials avatar, key contact chips, and timeline connectors.

---

### 🎛️ Real-Time Interactive Customization & Controls
* **Interactive Live Editing Drawer (Wizard)**: Slide-over editing drawer with real-time live preview updates as you type.
* **Multi-Profile Management**: Create, edit, rename, switch between, export, and delete multiple custom resume profiles (e.g. *Lead DevOps Engineer*, *Full-Stack Developer*, *Blockchain Architect*).
* **Editable Section Headings**: Customize default section titles (*Executive Summary*, *Work Experience*, *Education*, *Skills & Technologies*, *Languages*) to fit any industry or career track.
* **Undo / Redo History Ring Buffer**: 20-step deep state snapshot history allowing easy undo/redo during editing sessions.
* **25 Accent Color Presets & Custom Picker**: Curated HSL-tailored accent colors categorized across 5 aesthetic groups (*Classic*, *Professional*, *Modern*, *Creative*, *Bold*) plus custom Hex/RGB color input.
* **Dynamic Accent Gradients**: Smooth dual-color linear gradient engine calculated automatically based on the selected primary accent color.
* **Page Paper Color Controls**: Toggle between **Pure White** (`#ffffff`) for authentic document preview and **Dark Card** mode matching your application theme.
* **Light / Dark / System Appearance Modes**: Supports light mode, dark mode, and system preference detection with seamless color transitions.

---

### 💾 Data Portability & Storage
* **Local Storage Persistence**: Automatic client-side auto-saving per profile under the `resume-wizard:*` namespace.
* **JSON Import & Export**: One-click download of sanitized resume data in standard JSON format, with built-in schema validation and file size guards for importing external backup JSONs.
* **1-Click Vector PDF Printing**: Integrated `@media print` rules hiding floating headers and controls to produce clean, high-resolution vector PDF documents via browser native print preview (`Ctrl+P` / `Cmd+P`).

---

## 🏗️ Architecture & Technical Overview

```
                          ┌───────────────────────────┐
                          │   Next.js 16 App Router   │
                          │   (app/page.tsx Server)   │
                          └─────────────┬─────────────┘
                                        │
                                        ▼
                          ┌───────────────────────────┐
                          │    ResumeViewWrapper      │
                          │    (Client Controller)    │
                          └──────┬─────────────┬──────┘
                                 │             │
              ┌──────────────────┴──┐       ┌──┴──────────────────┐
              │  useResumeStore     │       │  useCustomProfiles  │
              │  (State + History)  │       │  (Multi-Profile)    │
              └──────────┬──────────┘       └──────────┬──────────┘
                         │                             │
                         └──────────────┬──────────────┘
                                        │
                         ┌──────────────┴──────────────┐
                         │   LocalStorage Persistence  │
                         └──────────────┬──────────────┘
                                        │
                  ┌─────────────────────┴─────────────────────┐
                  │                                           │
                  ▼                                           ▼
       ┌─────────────────────┐                     ┌─────────────────────┐
       │   UxRichLayout      │                     │     AtsLayout       │
       │   (Modern Sidebar)  │                     │   (12 ATS Themes)   │
       └─────────────────────┘                     └─────────────────────┘
```

### 📁 Directory Structure

```
resume-builder/
├── app/                        # Next.js App Router root
│   ├── layout.tsx              # Root HTML layout & font declarations
│   ├── page.tsx                # Main SSR Page & metadata generator
│   ├── robots.ts               # Search engine crawler config
│   └── sitemap.ts              # XML sitemap generator
├── components/                 # React UI components
│   ├── layouts/                # Resume layout renderers
│   │   ├── ats/                # 12 ATS layout implementations
│   │   └── ux/                 # UX Modern Sidebar implementation
│   ├── resume-primitives/      # Shared resume UI primitives (Header, ContactBar, WorkHistory, etc.)
│   ├── ui/                     # Application UI elements (Toggle toolbar, ThemeThumbnail, Modals)
│   └── wizard/                 # Interactive editing drawer & multi-step forms
├── data/                       # Default sample resume data & profile registries
├── hooks/                      # Custom React hooks
│   ├── useCustomProfiles.ts    # Multi-resume profile management hook
│   ├── useResumeStore.ts       # Core resume state, history & storage engine
│   └── useSystemDarkMode.ts    # System theme preference listener hook
├── lib/                        # Core utilities & design system logic
│   ├── constants.ts            # Palette presets, appearance modes & color luminance helpers
│   ├── sanitize.ts             # Schema sanitization & fallback generators
│   └── theme.ts                # Dynamic CSS variable & gradient calculators
├── styles/                     # CSS stylesheets
│   ├── ats.css                 # ATS print & typography layout rules
│   ├── globals.css             # Base CSS & Tailwind CSS directives
│   └── ux.css                  # Modern sidebar layout & print rules
└── types/                      # TypeScript interface & type definitions
```

---

## 🛠️ Getting Started & Local Development

### Prerequisites
* **Node.js**: `v20.x` or higher
* **Package Manager**: `pnpm` (recommended), `npm`, or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Paradox-AT/resume-builder.git
   cd resume-builder
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   pnpm dev
   ```

4. **View in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🧪 Verification & Build Commands

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts Next.js development server |
| `pnpm dev:webpack` | Starts dev server using Webpack compiler |
| `pnpm tsc --noEmit` | Executes TypeScript type checking without emitting files |
| `pnpm lint` | Runs ESLint analysis across the project |
| `pnpm build` | Compiles production Next.js build |
| `pnpm start` | Launches compiled production build server |

---

## 📊 Resume Data Schema Example

Below is the standard JSON structure used for importing and exporting resume data:

```json
{
  "personalInfo": {
    "name": "Alex Mercer",
    "role": "Senior Full-Stack & Systems Architect",
    "avatarInitials": "am"
  },
  "summary": "Accomplished Senior Architect with 8+ years of experience designing scalable distributed systems...",
  "sectionTitles": {
    "summary": "Executive Summary",
    "workHistory": "Professional Experience",
    "education": "Education & Academic Background",
    "skills": "Technical Proficiency",
    "languages": "Languages"
  },
  "contact": {
    "email": "alex.mercer@example.com",
    "phone": "+1 (555) 019-2831",
    "linkedin": "linkedin.com/in/alexmercer",
    "github": "github.com/alexmercer",
    "address": "San Francisco, CA"
  },
  "workHistory": [
    {
      "id": "work-1",
      "title": "Lead Software Architect",
      "company": "Apex Technologies",
      "date": { "start": "2022-01", "end": "Present" },
      "bullets": [
        "Architected micro-frontend architecture reducing bundle size by 42%.",
        "Mentored a team of 14 senior engineers across distributed systems."
      ]
    }
  ],
  "education": [
    {
      "id": "edu-1",
      "school": "University of California, Berkeley",
      "degree": "B.S. in Computer Science",
      "date": { "start": "2014-08", "end": "2018-05" }
    }
  ],
  "skills": [
    { "name": "TypeScript / React / Next.js", "level": 5 },
    { "name": "Node.js / Go / Distributed Systems", "level": 4 }
  ],
  "languages": [
    { "name": "English", "level": 5 }
  ]
}
```

---

## 📄 License

Distributed under the **Apache License, Version 2.0**. See [`LICENSE`](LICENSE) for more information.
