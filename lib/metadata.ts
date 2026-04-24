import type { Metadata } from "next";

const siteUrlString = process.env.NEXT_PUBLIC_SITE_URL || "https://peppecaru00.github.io/portfolio_v3";
export const siteUrl = siteUrlString.replace(/\/+$/, "");
export const metadataBase = new URL(siteUrl);

const defaultImage = `${siteUrl}/me.jpg`;
const defaultDescription =
  "Giuseppe Caruso is a filmmaker, photographer and visual storyteller creating compelling projects in photography, video and motion design.";
const defaultKeywords = [
  "portfolio",
  "Giuseppe Caruso",
  "photography",
  "video",
  "filmmaking",
  "visual storytelling",
  "creative director",
  "motion design",
];

const defaultOpenGraphImage = {
  url: defaultImage,
  alt: "Giuseppe Caruso Portfolio",
  width: 1200,
  height: 627,
};

function normalizePath(path: string) {
  if (!path) return "/";
  const sanitized = path.startsWith("/") ? path : `/${path}`;
  return sanitized.replace(/\/+/g, "/");
}

export function absoluteUrl(path: string) {
  return new URL(normalizePath(path), metadataBase).toString();
}

export function createMetadata({
  title,
  description = defaultDescription,
  images = [defaultOpenGraphImage],
  path = "/",
}: {
  title: string;
  description?: string;
  images?: Array<string | { url: string; alt?: string; width?: number; height?: number }>;
  path?: string;
}): Metadata {
  const canonical = `${siteUrl}${normalizePath(path)}`;

  const openGraphImages = images.map((image) => {
    if (typeof image === "string") {
      return {
        url: image,
        alt: title,
        width: 1200,
        height: 627,
      };
    }
    return image;
  });

  return {
    metadataBase,
    title,
    description,
    keywords: defaultKeywords,
    authors: [{ name: "Giuseppe Caruso", url: siteUrl }],
    icons: {
      icon: "/favicon.ico",
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: "Giuseppe Caruso Portfolio",
      images: openGraphImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: openGraphImages.map((image) => (typeof image === "string" ? image : image.url)),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
