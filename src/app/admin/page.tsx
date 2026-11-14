import Link from "next/link";
import {
  FileText,
  Info,
  PencilLine,
  Plus,
  ShieldCheck,
  Star,
} from "lucide-react";
import {
  getAllResourceSummaries,
  formatReviewedDate,
  databaseIsConfigured,
} from "@/lib/resources/queries";
import { CATEGORIES } from "@/lib/resources/categories";
import { Database, HardDriveDownload } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff CMS · Patient Resources",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [resources, hasDb] = await Promise.all([
    getAllResourceSummaries(),
    databaseIsConfigured(),
  ]);
  const grouped = CATEGORIES.map((c) => ({
    category: c,
    items: resources
      .filter((r) => r.category === c.slug)
      .sort((a, b) => a.titleEn.localeCompare(b.titleEn)),
  }));

  return (
    <main className="bg-mist">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-navy px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden />
              Staff CMS
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy">
              Patient Resources
            </h1>
            <p className="mt-1 text-sm text-ink-soft">
              Add, edit, and organize the 36 instruction guides shown on the
              Patient Resources page.
            </p>
          </div>
          <Link
            href="/admin/resources/new"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-brand-deep"
          >
            <Plus className="h-4 w-4" aria-hidden />
            New guide
          </Link>
        </div>

        {/* Deployment mode notice */}
        {hasDb ? (
          <p className="mt-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800">
            <Database className="h-5 w-5 shrink-0" aria-hidden />
            Connected to the database — edits save and publish to the website
            and both PDF handouts.
          </p>
        ) : (
          <p className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            <HardDriveDownload className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <span>
              <strong className="font-bold">
                Browsing the bundled library.
              </strong>{" "}
              This deployment has no <code>DATABASE_URL</code>, so all{" "}
              {resources.length} guides, search, and PDF downloads work
              read-only from the files shipped with the app. Add a{" "}
              <code>DATABASE_URL</code> environment variable to turn on saving
              and the staff editor.
            </span>
          </p>
        )}

        {/* How-to */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand/25 bg-brand-faint p-4 text-sm leading-relaxed text-brand-ink">
          <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p>
            Content uses a simple text format:{" "}
            <code className="rounded bg-white px-1 py-0.5 text-xs">
              ## Heading
            </code>{" "}
            for sections,{" "}
            <code className="rounded bg-white px-1 py-0.5 text-xs">- item</code>{" "}
            for bullets,{" "}
            <code className="rounded bg-white px-1 py-0.5 text-xs">
              1. step
            </code>{" "}
            for numbered steps,{" "}
            <code className="rounded bg-white px-1 py-0.5 text-xs">&gt; note</code>{" "}
            for blue callouts,{" "}
            <code className="rounded bg-white px-1 py-0.5 text-xs">
              ! caution
            </code>{" "}
            for amber warnings. Every guide needs both English and Spanish
            content; the website and PDF handouts update automatically after
            saving.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Total guides", value: resources.length },
            {
              label: "Featured on directory",
              value: resources.filter((r) => r.featured).length,
            },
            { label: "Categories", value: grouped.filter((g) => g.items.length).length },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-3xl font-bold text-navy">{s.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-soft">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Grouped table */}
        <div className="mt-8 space-y-6">
          {grouped.map(({ category, items }) => (
            <section
              key={category.slug}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <header className="flex items-center justify-between gap-3 border-b border-slate-100 bg-mist px-5 py-3.5">
                <h2 className="flex items-center gap-2.5 text-sm font-bold text-navy">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${category.tint}`}
                  >
                    <category.icon
                      className={`h-4 w-4 ${category.text}`}
                      aria-hidden
                    />
                  </span>
                  {category.nameEn}
                  <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-ink-soft">
                    {items.length}
                  </span>
                </h2>
                <Link
                  href={`/patient-resources?category=${category.slug}#library`}
                  className="text-xs font-semibold text-brand-deep hover:underline"
                >
                  View on site
                </Link>
              </header>
              <ul className="divide-y divide-slate-100">
                {items.map((r) => (
                  <li
                    key={r.slug}
                    className="flex flex-wrap items-center gap-3 px-5 py-3.5"
                  >
                    <FileText
                      className="h-4 w-4 shrink-0 text-slate-300"
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-navy">
                        {r.titleEn}
                        {r.featured && (
                          <Star
                            className="mb-0.5 ml-1.5 inline h-3.5 w-3.5 fill-amber-400 text-amber-400"
                            aria-label="Featured"
                          />
                        )}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        /{r.slug} · Reviewed{" "}
                        {formatReviewedDate(r.lastReviewed, "en")}
                      </p>
                    </div>
                    <Link
                      href={`/patient-resources/${r.slug}`}
                      className="rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-ink-soft transition hover:border-brand hover:text-brand-deep"
                    >
                      Preview
                    </Link>
                    <Link
                      href={`/admin/resources/${r.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-deep"
                    >
                      <PencilLine className="h-3.5 w-3.5" aria-hidden />
                      Edit
                    </Link>
                  </li>
                ))}
                {items.length === 0 && (
                  <li className="px-5 py-6 text-sm text-slate-400">
                    No guides in this category yet —{" "}
                    <Link
                      href="/admin/resources/new"
                      className="font-semibold text-brand-deep hover:underline"
                    >
                      add one
                    </Link>
                    .
                  </li>
                )}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-slate-500">
          Production note: this staff area would sit behind your SSO or
          WordPress-integrated authentication. Edits apply instantly to the
          website and to all generated PDF handouts.
        </p>
      </div>
    </main>
  );
}
