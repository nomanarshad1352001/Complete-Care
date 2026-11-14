/**
 * Seed + sync the patient resource library.
 * Safe to re-run: rows are upserted by slug.
 *
 *   npx tsx src/db/seed.ts
 */
import { db } from "./index";
import { resources } from "./schema";
import { beforeYourProcedure } from "./seed-data/before-your-procedure";
import { proceduresTreatments } from "./seed-data/procedures-treatments";
import { dischargeInstructions } from "./seed-data/discharge-instructions";
import { afterSurgery } from "./seed-data/after-surgery";
import { bracesSplintsSupports } from "./seed-data/braces-splints-supports";
import { exercisesRehabilitation } from "./seed-data/exercises-rehabilitation";

const ALL = [
  ...beforeYourProcedure,
  ...proceduresTreatments,
  ...dischargeInstructions,
  ...afterSurgery,
  ...bracesSplintsSupports,
  ...exercisesRehabilitation,
];

async function seed() {
  console.log(`Seeding ${ALL.length} patient resources…`);
  for (const r of ALL) {
    await db
      .insert(resources)
      .values(r)
      .onConflictDoUpdate({
        target: resources.slug,
        set: {
          category: r.category,
          titleEn: r.titleEn,
          titleEs: r.titleEs,
          summaryEn: r.summaryEn,
          summaryEs: r.summaryEs,
          contentEn: r.contentEn,
          contentEs: r.contentEs,
          keywords: r.keywords,
          featured: r.featured ?? false,
          lastReviewed: r.lastReviewed,
          sortOrder: r.sortOrder ?? 0,
          updatedAt: new Date(),
        },
      });
    console.log(`  ✓ ${r.slug}`);
  }
  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
