import { asc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { resources, type Resource } from "@/db/schema";
import type { ResourceSummary } from "./shared";

export type { ResourceSummary } from "./shared";
export { formatReviewedDate } from "./shared";

const summaryColumns = {
  slug: resources.slug,
  category: resources.category,
  titleEn: resources.titleEn,
  titleEs: resources.titleEs,
  summaryEn: resources.summaryEn,
  summaryEs: resources.summaryEs,
  keywords: resources.keywords,
  featured: resources.featured,
  lastReviewed: resources.lastReviewed,
} as const;

export async function getAllResourceSummaries(): Promise<ResourceSummary[]> {
  try {
    return await db
      .select(summaryColumns)
      .from(resources)
      .orderBy(asc(resources.category), asc(resources.sortOrder));
  } catch (err) {
    console.error("resource summaries query failed:", err);
    return [];
  }
}

export async function getResourceBySlug(
  slug: string
): Promise<Resource | undefined> {
  try {
    const rows = await db
      .select()
      .from(resources)
      .where(eq(resources.slug, slug))
      .limit(1);
    return rows[0];
  } catch (err) {
    console.error(`resource query failed for ${slug}:`, err);
    return undefined;
  }
}

export async function getRelatedResources(
  category: string,
  excludeSlug: string,
  limit = 3
): Promise<ResourceSummary[]> {
  try {
    const rows = await db
      .select(summaryColumns)
      .from(resources)
      .where(eq(resources.category, category))
      .orderBy(asc(resources.sortOrder));
    return rows.filter((r) => r.slug !== excludeSlug).slice(0, limit);
  } catch (err) {
    console.error("related resources query failed:", err);
    return [];
  }
}

export async function countByCategory(): Promise<Record<string, number>> {
  try {
    const rows = await db
      .select({
        category: resources.category,
        count: sql<number>`count(*)::int`,
      })
      .from(resources)
      .groupBy(resources.category);
    return Object.fromEntries(rows.map((r) => [r.category, r.count]));
  } catch (err) {
    console.error("category count query failed:", err);
    return {};
  }
}
