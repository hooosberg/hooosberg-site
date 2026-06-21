export function getActionIcon(label: string, url: string) {
  const normalized = `${label} ${url}`.toLowerCase();

  if (normalized.includes("apps.apple.com") || normalized.includes("app store")) {
    return "/icons/platform/app-store.svg";
  }

  if (normalized.includes("download") || normalized.includes("下载") || normalized.includes("dmg") || normalized.includes("release")) {
    return "/icons/platform/download.svg";
  }

  if (normalized.includes("github.com")) {
    return "/icons/social/github.svg";
  }

  if (normalized.includes("文章") || normalized.includes("blog")) {
    return "/icons/platform/article.svg";
  }

  return "/icons/platform/web.svg";
}
