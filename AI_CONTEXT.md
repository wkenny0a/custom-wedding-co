# AI Collaboration & Context Guide

This file serves as the Single Source of Truth for **Antigravity** and any other AI/Developer working on the "Custom Wedding Co." repository. 

Because AI coding assistants run locally and have local memory caches, two developers working on the same repo might get different generated logic if they aren't synced. **All shared knowledge, architecture rules, and guidelines MUST be checked in as Markdown files.**

## 🤖 Rules for AI Assistants

1. **Check Existing Knowledge First**: Before making any architectural changes (e.g., adding a new backend feature, or updating a Swell product schema), check the documentation in `docs/knowledge/`.
2. **Document Major Decisions**: If you (the AI) and the user make a significant decision (like how products sync from Swell to Sanity), **you must document it in `docs/knowledge/`**. Do not rely on your internal `~/.gemini/antigravity/` cache, as your human's collaborator won't have access to it!
3. **Respect `.cursorrules` and `BRANDING.md`**: Do not use generic Tailwind utility colors. Always abide by the color variables defined in the system.

## 📚 Key Knowledge Repositories

We have exported our local AI Knowledge Items directly into the codebase so everyone shares the same brain.

### Architecture & Backend Strategy
- **[Headless Integration Overview](docs/knowledge/headless_ecommerce_sanity_swell_integration/architecture/hybrid_page_builder.md)**: Explains the Hybrid Page Builder logic between Swell.js and Sanity.io.
- **[Next.js App Router Structure](docs/knowledge/headless_ecommerce_sanity_swell_integration/architecture/nextjs_route_groups_isolation.md)**: Rules on how we segment routes.
- **[API Usage](docs/knowledge/headless_ecommerce_sanity_swell_integration/swell/api_usage.md)**: Rules for writing to Swell / Sanity correctly.

### Frontend, Branding & Design
- **[BRANDING.md](BRANDING.md)**: High-level overview of our espresso, cream, and gold palette.
- **[Design System Details](docs/knowledge/branding_design_system_custom_wedding_co/design_guidelines.md)**: Deep dive into transitions, spacing, and styling conventions.

## 🤝 Workflow for Humans

1. Ensure you work entirely on **isolated feature branches**.
2. When your feature is complete, PR to `main`. 
3. Include descriptive commit messages so the AIs can parse git history and understand *why* you did something. 
4. If your AI created an artifact or plan (like `implementation_plan.md`) that's relevant to hand off, move it into the repo (`docs/planning/`) before assigning work to another team member!
