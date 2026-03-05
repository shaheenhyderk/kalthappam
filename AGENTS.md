# AGENTS.md

## Purpose
Project rules for Kalthappam website implementation.
Keep output visually consistent with approved UI references.

## Core Rules
- Match provided UI exactly. Do not introduce new visual themes.
- Use only assets present in `assets/` unless explicitly approved.
- Keep code minimal, readable, and production-safe.

## Animation Rule (Mandatory)
- Use **GSAP** (and GSAP plugins already in project) for all animations and micro-interactions.
- Do not implement animation behavior with custom CSS transitions/keyframes unless explicitly requested.
- Respect reduced motion preferences (`prefers-reduced-motion`).

## Brand Tokens
- Brand name: `Kalthappam`
- Background color: `#FFDFAE`
- Primary text color: `#4B372F`
- Button color: `#5A3E34`
- Button text color: `#F9F0DF`

## Typography
- Primary font: `Patrick Hand SC`
- Story/body text (desktop):
  - Size: `27px`
  - Line-height: `41px`
  - Letter-spacing: `0`
  - Max content width: `704px`
- Footer text:
  - Size: `16px`
  - Line-height: `35.01px`
  - Letter-spacing: `0`
  - Width: `260px`

## Layout Guidelines
- Keep desktop and mobile layouts aligned with approved MacBook/iPhone references.
- Keep floating WhatsApp CTA at bottom-right on desktop.
- Preserve spacing rhythm and section order from the reference UI.

## WhatsApp CTA
- Destination: `https://wa.me/918606358178`
- Prefilled text should remain business-ready and editable in HTML.

## SEO + LLM Files
- Maintain and update when relevant:
  - `robots.txt`
  - `sitemap.xml`
  - `llms.txt`

## Accessibility + Semantics
- Keep meaningful alt text for images.
- Preserve semantic structure (`main`, sections, headings).
- Do not remove screen-reader-only semantic headings unless replaced with equivalent semantics.
