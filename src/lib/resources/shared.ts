/** Client-safe types and helpers (no database imports). */

export interface ResourceSummary {
  slug: string;
  category: string;
  titleEn: string;
  titleEs: string;
  summaryEn: string;
  summaryEs: string;
  keywords: string;
  featured: boolean;
  lastReviewed: string;
}

export function formatReviewedDate(iso: string, lang: "en" | "es"): string {
  const d = new Date(iso.includes("T") ? iso : `${iso}T00:00:00`);
  return d.toLocaleDateString(lang === "es" ? "es-US" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
