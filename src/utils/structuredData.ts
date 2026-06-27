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
  const pageUrl = absoluteUrl(canonicalPath);
  const primaryUrl = product.primaryAction.url;
  const sameAs = [
    product.hideSourceLinks ? undefined : product.repo,
    product.hideSourceLinks ? undefined : product.website,
    primaryUrl,
    product.hideSourceLinks ? undefined : product.secondaryAction?.url,
    pageUrl,
  ].filter((url, index, urls): url is string => Boolean(url) && urls.indexOf(url) === index);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${pageUrl}#software`,
    name: product.displayName,
    description: product.summary,
    url: pageUrl,
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

export function buildProductWebPageJsonLd(product: Product, locale: Locale) {
  const canonicalPath = locale === "en" ? `/en/apps/${product.slug}` : `/apps/${product.slug}`;
  const pageUrl = absoluteUrl(canonicalPath);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    name: product.displayName,
    description: product.summary,
    url: pageUrl,
    inLanguage: locale === "en" ? "en" : "zh-CN",
    isPartOf: {
      "@id": websiteId,
    },
    publisher: {
      "@id": organizationId,
    },
    mainEntity: {
      "@id": `${pageUrl}#software`,
    },
    about: [product.category, product.tagline, ...product.features.slice(0, 4)].map((topic) => ({
      "@type": "Thing",
      name: topic,
    })),
  };
}

type SectionItem = {
  name: string;
  url: string;
  description?: string;
};

type SectionCollectionInput = {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  topics: string[];
};

export function buildSectionWebPageJsonLd({ locale, path, name, description, topics }: SectionCollectionInput) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    inLanguage: locale === "en" ? "en" : "zh-CN",
    isPartOf: {
      "@id": websiteId,
    },
    publisher: {
      "@id": organizationId,
    },
    about: topics.map((topic) => ({
      "@type": "Thing",
      name: topic,
    })),
  };
}

export function buildSectionCollectionJsonLd({ locale, path, name, description, topics }: SectionCollectionInput) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name,
    description,
    url,
    inLanguage: locale === "en" ? "en" : "zh-CN",
    isPartOf: {
      "@id": websiteId,
    },
    publisher: {
      "@id": organizationId,
    },
    about: topics.map((topic) => ({
      "@type": "Thing",
      name: topic,
    })),
  };
}

export function buildItemListJsonLd(id: string, items: SectionItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": id,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Thing",
        name: item.name,
        url: item.url.startsWith("http") ? item.url : absoluteUrl(item.url),
        description: item.description,
      },
    })),
  };
}
