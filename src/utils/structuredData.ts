import { socialLinks, type Product } from "../data/products";
import { absoluteUrl, type Locale } from "./i18n";

const publicProfileUrls = socialLinks
  .map((link) => link.url)
  .filter((url) => url.startsWith("https://"));

const founderId = "https://hooosberg.com/#founder";
const organizationId = "https://hooosberg.com/#organization";
const websiteId = "https://hooosberg.com/#website";

const publicEmail = "zikedece@proton.me";

export function buildHomeJsonLd(locale: Locale) {
  const language = locale === "en" ? "en" : "zh-CN";

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: "Hooosberg",
      alternateName: ["湖森堡AI_hooosberg", "@Hooosberg"],
      url: absoluteUrl("/"),
      logo: absoluteUrl("/brand/hooosberg-ai-icon.png"),
      image: absoluteUrl("/brand/hooosberg-avatar.png"),
      email: publicEmail,
      sameAs: publicProfileUrls,
      founder: {
        "@id": founderId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": founderId,
      name: "Hooosberg",
      alternateName: ["湖森堡AI_hooosberg", "@Hooosberg"],
      url: absoluteUrl(locale === "en" ? "/en" : "/"),
      image: absoluteUrl("/brand/hooosberg-avatar.png"),
      sameAs: publicProfileUrls,
      worksFor: {
        "@id": organizationId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      name: locale === "en" ? "Hooosberg" : "湖森堡AI_hooosberg",
      alternateName: "Hooosberg",
      url: absoluteUrl(locale === "en" ? "/en" : "/"),
      inLanguage: language,
      publisher: {
        "@id": organizationId,
      },
    },
  ];
}

export function buildProductJsonLd(product: Product, locale: Locale) {
  const canonicalPath = locale === "en" ? `/en/apps/${product.slug}` : `/apps/${product.slug}`;
  const primaryUrl = product.primaryAction.url;
  const sameAs = [
    product.repo,
    product.website,
    primaryUrl,
    product.secondaryAction?.url,
    absoluteUrl(canonicalPath),
  ].filter((url, index, urls): url is string => Boolean(url) && urls.indexOf(url) === index);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.displayName,
    description: product.summary,
    url: absoluteUrl(canonicalPath),
    applicationCategory: product.category,
    operatingSystem: product.platforms.join(", "),
    image: absoluteUrl(product.icon ?? "/brand/hooosberg-ai-icon.png"),
    inLanguage: locale === "en" ? "en" : "zh-CN",
    keywords: [...product.features, ...product.platforms, ...product.status],
    downloadUrl: primaryUrl,
    installUrl: primaryUrl,
    sameAs,
    author: {
      "@id": founderId,
      "@type": "Person",
      name: "Hooosberg",
      url: absoluteUrl(locale === "en" ? "/en" : "/"),
    },
    publisher: {
      "@type": "Organization",
      name: "Hooosberg",
      url: absoluteUrl("/"),
      logo: absoluteUrl("/brand/hooosberg-ai-icon.png"),
      sameAs: publicProfileUrls,
    },
    offers: primaryUrl
      ? {
          "@type": "Offer",
          url: primaryUrl,
          availability: product.primaryAction.disabled ? "https://schema.org/PreOrder" : "https://schema.org/InStock",
        }
      : undefined,
  };
}
