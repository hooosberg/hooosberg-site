# GitHub Publishing Notes

The repository is intended to be a public source copy of the live website. That means the website, GitHub repository, and Cloudflare Pages deployment naturally contain the same public material.

## Repository Presentation

Recommended GitHub settings:

- Visibility: public
- Description: `Hooosberg AI website: real product diaries, independent apps, AI tools, and AI-era build notes.`
- Website: `https://hooosberg.com`
- Topics:
  - `astro`
  - `cloudflare-pages`
  - `ai-tools`
  - `indie-dev`
  - `product-diary`
  - `ai-coding`
  - `bilingual`

## What Belongs In GitHub

- Website source code
- Public product descriptions
- Public legal pages
- Public README and docs
- Public images and assets used by the site
- Non-secret analytics Measurement ID, if we choose to manage it in source

## What Does Not Belong In GitHub

- API tokens
- Cloudflare account tokens
- Namecheap credentials
- Google account credentials
- Recovery codes
- Private drafts or future unpublished strategy
- Local browser/proxy configuration
- Anything from `../local`

## Metadata Command

After confirming the repository is safe to make public:

```bash
gh repo edit hooosberg/hooosberg-site \
  --description "Hooosberg AI website: real product diaries, independent apps, AI tools, and AI-era build notes." \
  --homepage "https://hooosberg.com" \
  --add-topic astro \
  --add-topic cloudflare-pages \
  --add-topic ai-tools \
  --add-topic indie-dev \
  --add-topic product-diary \
  --add-topic ai-coding \
  --add-topic bilingual \
  --visibility public \
  --accept-visibility-change-consequences
```

Changing visibility can expose commit history, GitHub Actions logs, and all current repository files. Run the safety review in `docs/deployment-runbook.md` first.
