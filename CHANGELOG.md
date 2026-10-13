# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0-beta.1] - 2026-10-13

### Added
- **Multi-Step Resume Builder Wizard:** Left drawer editor supporting guided steps (Personal Info, Summary, Work History, Education, Skills, and Section Headings) with profile image uploading and live thumbnail previews.
- **14 ATS-Optimized Layout Templates:** Comprehensive suite of ATS-friendly templates (Standard, Minimo, Influx, Minimal, Modern, Compact, Academic, Iconic, Simple, Technical, Executive, Corporate) alongside a flagship Modern Sidebar UX layout.
- **Atomic Resume Primitives:** Shared component library (`ResumeHeader`, `WorkHistorySection`, `EducationSection`, `SkillsSection`, `ContactBar`) providing 100% schema consistency across all templates.
- **Dynamic Theming & Accent System:** 25 curated accent colors categorized by palette type and sorted by luminance, with an interactive 3-column layout picker and Light/Dark paper overrides.
- **Resume Import & Export:** One-click JSON download export per profile, plus JSON file upload featuring 2MB size checks, schema validation, and automatic profile registration.
- **Built-in Presets & Custom Profiles:** Pre-configured datasets for Full-Stack, Blockchain, and Backend/Go roles, with dynamic role-to-icon inference and local storage persistence for custom user profiles.
- **Pure Resume View Route:** Standalone `/view` route designed for printing, PDF generation, and clean previewing without editor controls.
- **Dynamic SEO & Metadata:** Server-side `generateMetadata` generating personalized page titles and OpenGraph tags dynamically based on profile and theme selection.
- **Sub-directory Asset Resolution:** `resolveAssetUrl` utility ensuring static assets load properly under GitHub Pages subpaths.
- **Custom UI Modals:** Glassmorphic `PromptModal` and `ConfirmModal` components for profile creation and deletion workflows.
- **Static GitHub Pages CI/CD:** Automated GitHub Actions deployment pipeline configured for Next.js static HTML export and `.nojekyll` bypass.

[Unreleased]: https://github.com/Paradox-AT/resume-builder/compare/v0.1.0-beta.1...HEAD
[0.1.0-beta.1]: https://github.com/Paradox-AT/resume-builder/releases/tag/v0.1.0-beta.1
