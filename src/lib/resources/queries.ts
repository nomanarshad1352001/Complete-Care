import { asc, eq, sql } from "drizzle-orm";
import { resources, type Resource } from "@/db/schema";
import type { ResourceSummary } from "./shared";
import {
  RESOURCE_LIBRARY,
  libraryBySlug,
  libraryCounts,
  type LibraryResource,
} from "@/content/resources";

export type { ResourceSummary } from "./shared";
export { formatReviewedDate } from "./shared";

/**
 * Database access is resolved lazily and defensively.
 *
 * `src/db/index.ts` throws when DATABASE_URL is missing, so importing it at
 * module scope would crash the route on hosts with no database (e.g. Vercel).
 * We dynamic-import it instead, cache the outcome, and fall back to the
 * bundled library in `src/content/resources.ts` when no database is usable.
 */
let cachedDb: typeof import("@/db")["db"] | null | undefined;

/**
 * Returns a live Drizzle client, or null when no database is reachable.
 * Safe to call anywhere — never throws, and caches the outcome.
 */
export async function getDb() {
  if (cachedDb !== undefined) return cachedDb;

  if (!process.env.DATABASE_URL) {
    cachedDb = null;
    return cachedDb;
  }
  try {
    const mod = await import("@/db");
    // Prove the connection actually works before committing to it.
    await mod.db.execute(sql`select 1`);
    cachedDb = mod.db;
  } catch (err) {
    console.warn(
      "[resources] Database unavailable — serving the bundled instruction library.",
      err instanceof Error ? err.message : err
    );
    cachedDb = null;
  }
  return cachedDb;
}

/** True when a working database backs the library (drives the CMS notice). */
export async function databaseIsConfigured(): Promise<boolean> {
  return (await getDb()) !== null;
}

/* ---------------- normalizers ---------------- */

function toSummary(r: LibraryResource): ResourceSummary {
  return {
    slug: r.slug,
    category: r.category,
    titleEn: r.titleEn,
    titleEs: r.titleEs,
    summaryEn: r.summaryEn,
    summaryEs: r.summaryEs,
    keywords: r.keywords,
    featured: r.featured,
    lastReviewed: r.lastReviewed,
  };
}

function toFull(r: LibraryResource): Resource {
  return {
    ...r,
    id: 0,
    createdAt: new Date(0),
    updatedAt: new Date(0),
  } as Resource;
}

const summaryColumns = {
  slug: resources.slug,
  category: resources.category,
  titleEn: resources.titleEn,
  titleEs: resources.titleEs,
  summaryEn: resources.summaryEn,
  summaryEs: resources.summaryEs,
  keywords: resources.keywords,
  featured: resources.featured,
  lastReviewed: sql<string>`${resources.lastReviewed}::text`,
} as const;

/* ---------------- public queries ---------------- */

export async function getAllResourceSummaries(): Promise<ResourceSummary[]> {
  const db = await getDb();
  if (db) {
    try {
      const rows = await db
        .select(summaryColumns)
        .from(resources)
        .orderBy(asc(resources.category), asc(resources.sortOrder));
      if (rows.length > 0) return rows;
    } catch (err) {
      console.warn("[resources] summary query failed:", err);
    }
  }
  return RESOURCE_LIBRARY.map(toSummary);
}

export async function getResourceBySlug(
  slug: string
): Promise<Resource | undefined> {
  const db = await getDb();
  if (db) {
    try {
      const rows = await db
        .select()
        .from(resources)
        .where(eq(resources.slug, slug))
        .limit(1);
      if (rows[0]) return rows[0];
    } catch (err) {
      console.warn(`[resources] query failed for ${slug}:`, err);
    }
  }
  const local = libraryBySlug(slug);
  return local ? toFull(local) : undefined;
}

export async function getRelatedResources(
  category: string,
  excludeSlug: string,
  limit = 3
): Promise<ResourceSummary[]> {
  const all = await getAllResourceSummaries();
  return all
    .filter((r) => r.category === category && r.slug !== excludeSlug)
    .slice(0, limit);
}

export async function countByCategory(): Promise<Record<string, number>> {
  const db = await getDb();
  if (db) {
    try {
      const result = await db
        .select({
          category: resources.category,
          count: sql<number>`count(*)::int`,
        })
        .from(resources)
        .groupBy(resources.category);
      if (result.length > 0) {
        return Object.fromEntries(
          result.map((r) => [r.category, Number(r.count)])
        );
      }
    } catch (err) {
      console.warn("[resources] category count failed:", err);
    }
  }
  return libraryCounts();
}
