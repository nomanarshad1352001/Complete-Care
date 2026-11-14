import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { resources } from "@/db/schema";
import { getDb } from "@/lib/resources/queries";
import { CATEGORIES } from "@/lib/resources/categories";
import { RESOURCE_LIBRARY } from "@/content/resources";

export const dynamic = "force-dynamic";

interface Payload {
  slug?: string;
  originalSlug?: string;
  category?: string;
  titleEn?: string;
  titleEs?: string;
  summaryEn?: string;
  summaryEs?: string;
  contentEn?: string;
  contentEs?: string;
  keywords?: string;
  featured?: boolean;
  lastReviewed?: string;
  sortOrder?: number;
}

function validate(p: Payload): string[] {
  const errors: string[] = [];
  const slug = p.slug ?? "";
  if (!/^[a-z0-9][a-z0-9-]{2,80}$/.test(slug)) {
    errors.push(
      "Slug must be 3-80 chars: lowercase letters, numbers, and hyphens."
    );
  }
  if (!CATEGORIES.some((c) => c.slug === p.category)) {
    errors.push("Category must be one of the six resource categories.");
  }
  for (const k of ["titleEn", "summaryEn", "contentEn"] as const) {
    if (!p[k] || p[k]!.trim().length < 3) errors.push(`${k} is required.`);
  }
  for (const k of ["titleEs", "summaryEs", "contentEs"] as const) {
    if (!p[k] || p[k]!.trim().length < 3) errors.push(`${k} is required.`);
  }
  if (!p.lastReviewed || !/^\d{4}-\d{2}-\d{2}$/.test(p.lastReviewed)) {
    errors.push("Last reviewed must be a date (YYYY-MM-DD).");
  }
  return errors;
}

async function requireDb() {
  const db = await getDb();
  if (!db) {
    return {
      error: NextResponse.json(
        {
          errors: [
            "No database is configured for this deployment, so edits cannot be saved. The public library is being served from the bundled content and continues to work normally. Set DATABASE_URL (for example a Vercel Postgres / Neon connection string) to enable the staff CMS.",
          ],
        },
        { status: 503 }
      ),
    };
  }
  return { db };
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Payload;
  const errors = validate(body);
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });

  const guard = await requireDb();
  if ("error" in guard) return guard.error;

  try {
    await guard.db.insert(resources).values({
      slug: body.slug!,
      category: body.category!,
      titleEn: body.titleEn!,
      titleEs: body.titleEs!,
      summaryEn: body.summaryEn!,
      summaryEs: body.summaryEs!,
      contentEn: body.contentEn!,
      contentEs: body.contentEs!,
      keywords: body.keywords ?? "",
      featured: body.featured ?? false,
      lastReviewed: body.lastReviewed!,
      sortOrder: body.sortOrder ?? 99,
    });
    return NextResponse.json({ ok: true, slug: body.slug });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    if (msg.includes("unique")) {
      return NextResponse.json(
        { errors: ["A guide with this slug already exists."] },
        { status: 409 }
      );
    }
    console.error("create resource failed:", err);
    return NextResponse.json({ errors: [msg] }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const body = (await request.json()) as Payload;
  const errors = validate(body);
  if (!body.originalSlug) errors.push("originalSlug is required.");
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });

  const guard = await requireDb();
  if ("error" in guard) return guard.error;

  try {
    const updated = await guard.db
      .update(resources)
      .set({
        slug: body.slug!,
        category: body.category!,
        titleEn: body.titleEn!,
        titleEs: body.titleEs!,
        summaryEn: body.summaryEn!,
        summaryEs: body.summaryEs!,
        contentEn: body.contentEn!,
        contentEs: body.contentEs!,
        keywords: body.keywords ?? "",
        featured: body.featured ?? false,
        lastReviewed: body.lastReviewed!,
        sortOrder: body.sortOrder ?? 99,
        updatedAt: new Date(),
      })
      .where(eq(resources.slug, body.originalSlug!))
      .returning({ slug: resources.slug });

    if (!updated.length) {
      return NextResponse.json(
        { errors: ["Resource not found."] },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true, slug: body.slug });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("update resource failed:", err);
    return NextResponse.json({ errors: [msg] }, { status: 500 });
  }
}

/** Simple inventory endpoint used by the CMS dashboard. */
export async function GET() {
  const db = await getDb();
  return NextResponse.json({
    databaseConfigured: db !== null,
    bundledCount: RESOURCE_LIBRARY.length,
  });
}
