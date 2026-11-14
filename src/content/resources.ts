import type { NewResource } from "@/db/schema";
import { beforeYourProcedure } from "@/db/seed-data/before-your-procedure";
import { proceduresTreatments } from "@/db/seed-data/procedures-treatments";
import { dischargeInstructions } from "@/db/seed-data/discharge-instructions";
import { afterSurgery } from "@/db/seed-data/after-surgery";
import { bracesSplintsSupports } from "@/db/seed-data/braces-splints-supports";
import { exercisesRehabilitation } from "@/db/seed-data/exercises-rehabilitation";

/**
 * The complete Patient Resource library, bundled with the app.
 *
 * This is the source of truth when no database is configured (for example a
 * static or serverless deployment without DATABASE_URL), so the Patient
 * Resources page, search, and every PDF download work with zero setup.
 * When a database IS configured and contains rows, the live database wins —
 * that is what the staff CMS writes to.
 */
export interface LibraryResource {
  slug: string;
  category: string;
  titleEn: string;
  titleEs: string;
  summaryEn: string;
  summaryEs: string;
  contentEn: string;
  contentEs: string;
  keywords: string;
  featured: boolean;
  lastReviewed: string;
  sortOrder: number;
}

function normalize(r: NewResource): LibraryResource {
  return {
    slug: r.slug,
    category: r.category,
    titleEn: r.titleEn,
    titleEs: r.titleEs,
    summaryEn: r.summaryEn,
    summaryEs: r.summaryEs,
    contentEn: r.contentEn,
    contentEs: r.contentEs,
    keywords: r.keywords ?? "",
    featured: r.featured ?? false,
    lastReviewed: r.lastReviewed as string,
    sortOrder: r.sortOrder ?? 0,
  };
}

export const RESOURCE_LIBRARY: LibraryResource[] = [
  ...beforeYourProcedure,
  ...proceduresTreatments,
  ...dischargeInstructions,
  ...afterSurgery,
  ...bracesSplintsSupports,
  ...exercisesRehabilitation,
].map(normalize);

export function libraryBySlug(slug: string): LibraryResource | undefined {
  return RESOURCE_LIBRARY.find((r) => r.slug === slug);
}

export function libraryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const r of RESOURCE_LIBRARY) {
    counts[r.category] = (counts[r.category] ?? 0) + 1;
  }
  return counts;
}
