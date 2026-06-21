# Hooosberg Website Deployment Runbook

Last updated: 2026-06-21

This document records how `hooosberg.com` was organized, published, secured, and verified so the workflow can be reused for future websites.

## Folder Model

The local website folder is split into two areas:

```text
/Users/maohuhu/Desktop/编程项目/ai教程项目/hooosberg-site/
  github/   # public source code, pushed to GitHub and deployed by Cloudflare Pages
  local/    # local-only notes, keys, drafts, screenshots, and anything not meant for GitHub
```

Only `github/` is the Git repository. Anything secret, temporary, account-specific, or private stays in `local/` or in provider dashboards.

## Current Production Setup

- Domain: `hooosberg.com`
- Registrar: Namecheap
- DNS/CDN: Cloudflare
- Hosting: Cloudflare Pages
- GitHub repository: `hooosberg/hooosberg-site`
- Pages project: `hooosberg-site`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Live URLs:
  - `https://hooosberg.com`
  - `https://www.hooosberg.com`
  - `https://hooosberg-site.pages.dev`

## Setup Flow We Used

1. Created the local split folder structure: `github/` for deployable source and `local/` for private local material.
2. Initialized the Astro site inside `github/`.
3. Added `.gitignore` rules so dependency folders, build output, local env files, and private notes are not uploaded.
4. Created the GitHub repository and pushed `main`.
5. Connected the GitHub repository to Cloudflare Pages.
6. Configured Cloudflare Pages:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Production branch: `main`
7. Added `hooosberg.com` to Cloudflare as a zone.
8. Updated Namecheap nameservers to the Cloudflare nameservers shown in the Cloudflare dashboard.
9. Added custom domains in Cloudflare Pages for `hooosberg.com` and `www.hooosberg.com`.
10. Verified HTTPS and redirects.
11. Added baseline security headers through `public/_headers`.

Cloudflare reference: <https://developers.cloudflare.com/pages/configuration/custom-domains/>

## Security Headers

Security headers live in:

```text
public/_headers
```

Current baseline:

```text
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000
```

HSTS should only be kept after HTTPS is confirmed working on both apex and `www`.

## Normal Update Flow

From the source folder:

```bash
cd /Users/maohuhu/Desktop/编程项目/ai教程项目/hooosberg-site/github
npm test
git status --short
git add .
git commit -m "Describe the site change"
git push origin main
```

Cloudflare Pages automatically builds from GitHub after the push.

Verify:

```bash
curl -I https://hooosberg.com
curl -I https://www.hooosberg.com
curl -I http://hooosberg.com
```

Expected:

- `https://hooosberg.com` returns `200`.
- `https://www.hooosberg.com` returns `200`.
- `http://hooosberg.com` redirects to HTTPS.

## Safety Review Before Uploading

Before a public push, check:

```bash
git status --short
git diff --cached
rg -n "token|secret|password|api[_-]?key|private|BEGIN .*KEY|wrangler|cloudflare|namecheap|proton" .
```

Rules:

- Do not upload `.env`, API keys, Cloudflare tokens, registrar credentials, account recovery codes, private drafts, or payment data.
- Google Analytics Measurement ID is public by design and may be committed if we choose the simple GitHub-only update model.
- Private future website material belongs in `../local`.

## Analytics

Preferred implementation:

- Create a Google Analytics 4 web data stream for `https://hooosberg.com`.
- Current Measurement ID: `G-80YLYDWMT6`.
- Put the Measurement ID in Cloudflare Pages as `PUBLIC_GA_MEASUREMENT_ID`, or commit it into source if we want fully GitHub-driven updates. This site currently commits the public ID so GitHub-to-Cloudflare deploys work without extra dashboard variables.
- The site loads Google Analytics only after the visitor accepts analytics in the consent banner.

Google tag reference: <https://developers.google.com/tag-platform/gtagjs>

Alternative:

- Cloudflare Web Analytics can be enabled from Cloudflare and is available on Cloudflare plans.
- It is useful for lightweight traffic and performance analytics.

Cloudflare Web Analytics reference: <https://developers.cloudflare.com/web-analytics/>

## Legal Pages And Consent

Site-wide pages:

- `/privacy`
- `/terms`
- `/cookies`
- `/en/privacy`
- `/en/terms`
- `/en/cookies`

The footer links to these pages. The copy is a practical baseline for an international informational website, not legal advice. If the site later adds accounts, payments, newsletters, ads, comments, embedded videos, or product telemetry, review the pages again.

EU data protection reference: <https://commission.europa.eu/law/law-topic/data-protection_en>

## Known Local Browser Gotcha

During setup, local Chrome showed an insecure/closed connection for `hooosberg.com` while command-line verification was healthy. The cause was local proxy routing. The local fix was to route `hooosberg.com` directly in Clash Verge.

If this happens again:

1. Verify from terminal first:
   ```bash
   curl -I https://hooosberg.com
   curl -I https://www.hooosberg.com
   ```
2. Check Chrome without proxy or with direct routing.
3. Avoid changing Cloudflare SSL settings unless terminal verification also fails.

## Rollback

If a bad deploy reaches production:

1. Open Cloudflare Dashboard > Workers & Pages > `hooosberg-site` > Deployments.
2. Redeploy a known-good previous deployment.
3. Revert or fix the Git commit locally.
4. Push `main` again after `npm test` passes.

## Troubleshooting

- Build fails: run `npm test` locally and fix Astro/TypeScript errors.
- Domain not active: confirm Namecheap nameservers match Cloudflare and the zone is active.
- Apex works but `www` fails: check Pages custom domains and DNS records.
- HTTPS fails: wait for Cloudflare certificate issuance, then verify SSL/TLS mode and DNS proxy status.
- Consent banner does not appear: confirm `PUBLIC_GA_MEASUREMENT_ID` is set; the banner is hidden when analytics is not configured.
- Analytics shows no data: accept analytics in a test browser, then check GA Realtime.
