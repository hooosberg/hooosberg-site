# Hooosberg AI Website

Source code for [hooosberg.com](https://hooosberg.com), the public website for 湖森堡AI_hooosberg.

Hooosberg is a public notebook for real product work in the AI era: independent apps, AI tools, launch notes, failed-product postmortems, AI coding workflows, and long-term build diaries.

## What The Site Contains

- Product pages for independent apps and tools.
- Build diaries that show requirements, prompts, code decisions, launch work, and postmortems.
- AI tool navigation for builders choosing coding agents, model platforms, design tools, hosting, and learning resources.
- Course and service entry points.
- Bilingual routes: Chinese at `/` and English at `/en`.
- Site-wide privacy, terms, and cookie pages.

## Tech Stack

- [Astro](https://astro.build/)
- TypeScript
- Static HTML output
- Cloudflare Pages
- GitHub-driven deployment

Cloudflare Pages builds from the `main` branch. Every normal update flows through GitHub, then Cloudflare automatically publishes the new build.

## Local Development

```bash
npm install
npm run dev -- --port 4321
```

Open:

```text
http://localhost:4321/
```

## Build And Test

```bash
npm run build
npm test
```

`npm test` runs the production build and the Node test suite under `tests/`.

## Deployment

Production is hosted on Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`
- Live site: <https://hooosberg.com>

Deployment and troubleshooting notes are recorded in [docs/deployment-runbook.md](docs/deployment-runbook.md).

## Analytics And Privacy

The site includes a consent-based analytics loader. Google Analytics only loads after a visitor accepts analytics.

Set the public Measurement ID as:

```text
PUBLIC_GA_MEASUREMENT_ID=G-80YLYDWMT6
```

The Measurement ID is not a secret. Tokens, credentials, private drafts, and local-only material do not belong in this repository.

## Repository Structure

```text
src/
  components/   Reusable Astro components
  data/         Product and article data
  layouts/      Base page layout and SEO shell
  pages/        Static routes
  styles/       Global CSS
public/         Static assets and Cloudflare Pages headers
docs/           Deployment, GitHub publishing, and operations notes
tests/          Build-time integrity tests
```

## Local-Only Material

The wider local project uses a sibling folder named `local/` for private or unpublished material. That folder is intentionally outside this Git repository and should not be uploaded.

## License

No formal open-source license has been selected yet. Until a license is added, the source is public for viewing and reference, but reuse rights are not granted by default.
