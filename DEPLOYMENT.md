# Deployment

This repository is intended to deploy `hooosberg.com` through GitHub and Cloudflare Pages.

## Repository Root

Use this folder as the Git repository root:

```text
/Users/maohuhu/Desktop/编程项目/ai教程项目/hooosberg-site/github
```

The sibling folder `../local` is local-only and must not be uploaded.

## Cloudflare Pages Settings

- Framework preset: `Astro`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22.16.0` from `.nvmrc`

## Normal Update Flow

1. Make website changes locally.
2. Run `npm test`.
3. Review `git status --short --ignored`.
4. Commit and push to GitHub.
5. Cloudflare Pages builds automatically from the `main` branch.

## First-Time Domain Flow

1. In the new Cloudflare account, onboard `hooosberg.com` as a zone.
2. Choose the Free plan unless there is a specific paid feature requirement.
3. Copy the two Cloudflare nameservers assigned to the zone.
4. In Namecheap, open `hooosberg.com` > Manage > Nameservers.
5. Choose Custom DNS, paste the two Cloudflare nameservers, and save.
6. Return to Cloudflare and check nameservers. Propagation can take 24-48 hours.
7. In Cloudflare Pages, open the Pages project > Custom domains, then add `hooosberg.com`.
8. Add `www.hooosberg.com` too if you want the `www` version to resolve.

For a custom apex domain like `hooosberg.com`, Cloudflare Pages requires the domain zone to be in the same Cloudflare account as the Pages project.

## Upload Safety Checklist

Before pushing:

```bash
git status --short --ignored
rg -n --hidden -S "(api[_-]?key|secret|token|password|passwd|private[_-]?key|BEGIN (RSA|OPENSSH|PRIVATE)|AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9])" . -g '!node_modules' -g '!dist' -g '!.astro'
```

Do not commit:

- `.env`, `.dev.vars`, API keys, tokens, private keys, certificates
- account screenshots or DNS notes containing private data
- `node_modules/`, `dist/`, `.astro/`, `.wrangler/`
- anything from `../local`
