import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  url?: string;
  type?: string;
  author?: string;
  publishedDate?: string;
  category?: string;
}

export default function SEOHead({
  title,
  description,
  url,
  type = "article",
  author,
  publishedDate,
  category,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    const fullTitle = `${title} | Sinbar Consultants`;
    document.title = fullTitle;

    // Helper to set or create meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("name", "description", description);
    if (author) setMeta("name", "author", author);

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    if (url) setMeta("property", "og:url", url);
    setMeta("property", "og:site_name", "Sinbar Consultants LLC");

    // Twitter
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:card", "summary_large_image");

    // Article-specific
    if (publishedDate) {
      setMeta("property", "article:published_time", publishedDate);
    }
    if (category) {
      setMeta("property", "article:section", category);
    }
    if (author) {
      setMeta("property", "article:author", author);
    }

    // Cleanup: restore original title on unmount
    return () => {
      document.title =
        "Sinbar Consultants - MSP Wireless Internet Research Report";
    };
  }, [title, description, url, type, author, publishedDate, category]);

  return null;
}
