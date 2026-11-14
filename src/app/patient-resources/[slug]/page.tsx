import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  MoonStar,
  MonitorSmartphone,
  Phone,
} from "lucide-react";
import {
  formatReviewedDate,
  getRelatedResources,
  getResourceBySlug,
} from "@/lib/resources/queries";
import { parseBlocks } from "@/lib/resources/format";
import { getCategory } from "@/lib/resources/categories";
import { SITE } from "@/lib/site";
import { ResourceSheet } from "@/components/resources/resource-sheet";
import { PdfActions } from "@/components/resources/pdf-actions";
import { StroopChart } from "@/components/resources/stroop-chart";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = await getResourceBySlug(slug);
  if (!r) return { title: "Resource not found" };
  return {
    title: r.titleEn,
    description: r.summaryEn,
    alternates: { canonical: `/patient-resources/${r.slug}` },
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  const category = getCategory(resource.category);
  const related = await getRelatedResources(resource.category, resource.slug);
  const blocksEn = parseBlocks(resource.contentEn);
  const blocksEs = parseBlocks(resource.contentEs);

  return (
    <main className="mist-pattern">
      {/* Print-only letterhead */}
      <div className="print-only">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #000",
            paddingBottom: "8px",
            marginBottom: "12px",
          }}
        >
          <div>
            <p style={{ fontWeight: 700, fontSize: "16pt", margin: 0 }}>
              Complete <span style={{ color: "#0e6ba8" }}>Care</span>
            </p>
            <p style={{ fontSize: "9pt", margin: 0 }}>
              Patient Education &amp; Instructions
            </p>
          </div>
          <div style={{ textAlign: "right", fontSize: "9pt" }}>
            <p style={{ margin: 0 }}>(844) 699-2273</p>
            <p style={{ margin: 0 }}>www.complete-care.com</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="no-print mb-6 text-xs sm:text-sm">
          <ol className="flex flex-wrap items-center gap-1.5 text-ink-soft">
            <li>
              <Link
                href="/patient-resources"
                className="inline-flex items-center gap-1.5 font-medium text-brand-deep hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                Patient Resources
              </Link>
            </li>
            <li aria-hidden className="text-slate-400">
              /
            </li>
            <li>
              <Link
                href={`/patient-resources?category=${category.slug}#library`}
                className="font-medium text-brand-deep hover:underline"
              >
                {category.nameEn}
              </Link>
            </li>
            <li aria-hidden className="text-slate-400">
              /
            </li>
            <li aria-current="page" className="max-w-[280px] truncate font-medium text-navy sm:max-w-none">
              {resource.titleEn}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* ===== Instruction sheet ===== */}
          <article className="print-sheet rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-40px_rgba(7,41,60,0.45)] sm:p-10">
            <header>
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-faint px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-ink">
                <category.icon className="h-3.5 w-3.5" aria-hidden />
                {category.nameEn}
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl">
                {resource.titleEn}
              </h1>
              <p className="reader mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
                {resource.summaryEn}
              </p>
              <p className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <CalendarCheck2 className="h-4 w-4 text-brand" aria-hidden />
                  Last reviewed:{" "}
                  {formatReviewedDate(resource.lastReviewed, "en")}
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-accent-deep">
                  <BadgeCheck className="h-4 w-4" aria-hidden />
                  Reviewed by the Complete Care clinical team
                </span>
              </p>

              {/* Prominent download bar */}
              <PdfActions slug={resource.slug} />
            </header>

            {/* Sheet body with language toggle + TOC + blocks */}
            <ResourceSheet
              blocksEn={blocksEn}
              blocksEs={blocksEs}
              titleEn={resource.titleEn}
              titleEs={resource.titleEs}
            />

            {/* The Cognitive Exercises handout includes its Stroop chart */}
            {resource.slug === "cognitive-exercises" && (
              <section aria-label="Stroop chart" className="mt-9">
                <h2 className="border-l-4 border-brand pl-4 text-xl font-bold tracking-tight text-navy sm:text-2xl">
                  Stroop Chart
                </h2>
                <StroopChart />
              </section>
            )}

            {/* Contact & follow-up */}
            <section
              aria-label="Contact and follow-up"
              className="avoid-break mt-10 rounded-2xl border border-brand/25 bg-brand-faint p-5 sm:p-6"
            >
              <h2 className="text-base font-bold text-navy">
                Contact &amp; follow-up
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-ink">
                    <Phone className="h-3.5 w-3.5" aria-hidden /> Office
                  </p>
                  <a
                    href={SITE.phoneHref}
                    className="mt-1 block text-sm font-semibold text-navy"
                  >
                    {SITE.phoneDisplay}
                  </a>
                  <p className="mt-1 text-xs text-ink-soft">{SITE.hoursEn}</p>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-ink">
                    <MoonStar className="h-3.5 w-3.5" aria-hidden /> After hours
                  </p>
                  <p className="mt-1 text-sm font-semibold text-navy">
                    {SITE.phoneDisplay}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">
                    Follow the prompts for the on-call provider. For
                    emergencies, call 911.
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-ink">
                    <MonitorSmartphone className="h-3.5 w-3.5" aria-hidden />{" "}
                    Patient portal
                  </p>
                  <a
                    href={SITE.portalUrl}
                    target="_blank"
                    rel="noopener"
                    className="no-print mt-1 block text-sm font-semibold text-brand-deep underline-offset-2 hover:underline"
                  >
                    Open the secure portal
                  </a>
                  <p className="print-only mt-1 text-xs">Portal: mycw portal via complete-care.com</p>
                  <p className="mt-1 text-xs text-ink-soft">
                    Secure messages, refills, and visit summaries.
                  </p>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <p className="mt-6 border-t border-slate-100 pt-5 text-xs leading-relaxed text-slate-500">
              This information sheet is provided by your Complete Care team for
              education only. It does not replace professional medical advice
              or your individualized care plan. Please contact your healthcare
              provider with questions or concerns about your care.
            </p>
          </article>

          {/* ===== Sidebar ===== */}
          <aside className="no-print space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wider text-navy">
                Questions about your care?
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                If you are unsure whether this guide applies to you, contact
                your care team before changing your routine.
              </p>
              <a
                href={SITE.phoneHref}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-deep"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Call {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.portalUrl}
                target="_blank"
                rel="noopener"
                className="mt-2 flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand-deep"
              >
                <MonitorSmartphone className="h-4 w-4" aria-hidden />
                Patient portal
              </a>
            </div>

            {related.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-bold uppercase tracking-wider text-navy">
                  Related guides
                </h2>
                <ul className="mt-3 space-y-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/patient-resources/${r.slug}`}
                        className="group flex items-center gap-2.5 rounded-xl border border-slate-100 p-3 transition hover:border-brand/40 hover:bg-brand-faint/50"
                      >
                        <span className="flex-1 text-[13px] font-semibold leading-snug text-navy group-hover:text-brand-deep">
                          {r.titleEn}
                        </span>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/patient-resources?category=${category.slug}#library`}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand-deep underline-offset-2 hover:underline"
                >
                  All {category.nameEn} guides
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
