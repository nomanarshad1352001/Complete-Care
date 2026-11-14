import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getResourceBySlug } from "@/lib/resources/queries";
import { ResourceEditor } from "@/components/admin/resource-editor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Guide · Staff CMS",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const isNew = slug === "new";
  const resource = isNew ? null : await getResourceBySlug(slug);
  if (!isNew && !resource) notFound();

  return (
    <main className="bg-mist">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to all guides
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          {isNew ? "New instruction guide" : `Edit: ${resource!.titleEn}`}
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Changes publish instantly to the Patient Resources page and both PDF
          handouts (English &amp; Spanish).
        </p>
        <ResourceEditor
          mode={isNew ? "create" : "edit"}
          initial={
            resource
              ? {
                  slug: resource.slug,
                  category: resource.category,
                  titleEn: resource.titleEn,
                  titleEs: resource.titleEs,
                  summaryEn: resource.summaryEn,
                  summaryEs: resource.summaryEs,
                  contentEn: resource.contentEn,
                  contentEs: resource.contentEs,
                  keywords: resource.keywords,
                  featured: resource.featured,
                  lastReviewed: resource.lastReviewed,
                  sortOrder: resource.sortOrder,
                }
              : undefined
          }
        />
      </div>
    </main>
  );
}
