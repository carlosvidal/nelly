# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Professional website for architect Nelly Cúneo Galdós (EDGE/LEED green-building consultant). Built with **Astro 5** (static output), **bilingual ES/EN**, SCSS for styling, no UI framework. Content is data-driven from JSON. Deployed on **Netlify** at `https://arquitectanelly.cuneo.com.pe`.

> The previous single-page version (plain HTML + Alpine.js + Pico CSS) is preserved on the `sitio-anterior-v1` branch / `v1.0-legacy` tag.

## Commands

- `npm run dev` — dev server with HMR (`npm` is aliased to **pnpm** here).
- `npm run build` — static build to `dist/` (also generates `sitemap-index.xml`).
- `npm run preview` — serve the production build locally.

There is no test suite. Netlify builds with `npm run build` and publishes `dist/` (see [netlify.toml](netlify.toml)).

## Architecture

- **i18n** ([src/i18n/ui.ts](src/i18n/ui.ts)): ES is the default locale (no prefix), EN lives under `/en`. `ROUTES` maps every page id (`home`, `servicios`, `edge`, `proyectos`, `sobre`, `contacto`) to its path per language; `NAV`/`UI` hold interface strings; `t()` / `localizedPath()` are the helpers. Astro `i18n` config is in [astro.config.mjs](astro.config.mjs).
- **Pages** ([src/pages/](src/pages/)): thin files (`*.astro` for ES, `en/*.astro` for EN) that import one shared view component from [src/components/pages/](src/components/pages/) (`Home`, `Servicios`, `Edge`, `Proyectos`, `Sobre`, `Contacto`) and pass `lang`. Each view holds its own bilingual content inline and wraps itself in `BaseLayout`.
- **Layout** ([src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro)): `<head>`, self-hosted fonts (Archivo + Inter via `@fontsource`), GA4 (`G-ZTTK8G63D1`), `SEO` component, `Nav`, `Footer`. Props: `title`, `description`, `lang`, `page`, `image`.
- **SEO** ([src/components/SEO.astro](src/components/SEO.astro)): per-page canonical, reciprocal `hreflang` (es-PE/en + x-default), Open Graph, Twitter, and `ProfessionalService`/`Person` JSON-LD.

## Content (data-driven)

All catalog content lives in [src/data/](src/data/) and is accessed through typed helpers in [src/lib/content.ts](src/lib/content.ts) — **edit the JSON, not the components**:

- `proyectos.json` → projects. Each entry only carries minimal fields (`tipo`, `nombre`, `ubicacion`, `cliente`, `estado`, `imagen`, `destacado`, `internacional`, `nota`). The **`estado`** value drives the displayed status label and the bilingual description automatically, via the `ESTADO_LABEL` / `DESCRIPCION` tables in `content.ts` — do not hand-write those texts per project.
- `servicios.json` → the four services (bilingual `titulo`/`resumen`/`descripcion`/`beneficios`).
- `clientes.json` → client logos.
- Homepage counters (`stats` in `content.ts`) are **computed** from these lists (`proyectos.length`, etc.) — never hardcode the numbers.
- Images are referenced by absolute URL from [public/images/](public/images/) (e.g. `/images/Foo.jpg`).

A non-technical guide for the site owner to add projects/clients via GitHub lives at [COMO-ACTUALIZAR-EL-SITIO.md](COMO-ACTUALIZAR-EL-SITIO.md).

## Styles

- Design tokens (palette, fluid type scale, spacing, breakpoints) in [src/styles/tokens.scss](src/styles/tokens.scss); base/reset/utilities in [src/styles/global.scss](src/styles/global.scss).
- Components use scoped `<style lang="scss">` blocks that `@use "../styles/tokens" as *` for the SCSS breakpoint vars (`$bp-sm/md/lg`). Colors/spacing are CSS custom properties from `:root`.
- Aesthetic: minimalist "architectural" — warm monochrome + a single sage-green accent.

## Gotchas

- `npm` is pnpm; native deps (sharp/esbuild) are allow-listed in [pnpm-workspace.yaml](pnpm-workspace.yaml).
- The counter animation script ([src/components/Counter.astro](src/components/Counter.astro)) must observe all counters after `DOMContentLoaded` — inline scripts run mid-parse, so querying earlier would only catch the first counter.
- The contact form uses Netlify Forms (static `data-netlify` form + hidden `form-name`); it only works once deployed on Netlify.
