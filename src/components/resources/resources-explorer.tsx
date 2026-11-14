"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  BookOpenText,
  CalendarCheck2,
  FileDown,
  Languages,
  MoonStar,
  MonitorSmartphone,
  Phone,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { CATEGORIES, categoryName, getCategory } from "@/lib/resources/categories";
import {
  formatReviewedDate,
  type ResourceSummary,
} from "@/lib/resources/shared";
import { SITE } from "@/lib/site";
import { LanguageProvider, useLanguage, type Lang } from "@/lib/resources/i18n";

/* ---------------- helpers ---------------- */

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

function matches(r: ResourceSummary, q: string): boolean {
  const hay = normalize(
    [
      r.titleEn,
      r.titleEs,
      r.summaryEn,
      r.summaryEs,
      r.keywords,
      r.slug,
      getCategory(r.category).nameEn,
      getCategory(r.category).nameEs,
    ].join(" ")
  );
  return q
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => hay.includes(word));
}

const EXAMPLE_CHIPS: Record<Lang, string[]> = {
  en: ["knee arthroscopy", "discharge", "wrist splint", "collar"],
  es: ["artroscopia", "alta", "férula", "collarín"],
};

/* ---------------- main export ---------------- */

export function ResourcesExplorer(props: {
  resources: ResourceSummary[];
  counts: Record<string, number>;
  initialCategory: string;
  initialQuery: string;
}) {
  return (
    <LanguageProvider>
      <ExplorerInner {...props} />
    </LanguageProvider>
  );
}

function ExplorerInner({
  resources,
  counts,
  initialCategory,
  initialQuery,
}: {
  resources: ResourceSummary[];
  counts: Record<string, number>;
  initialCategory: string;
  initialQuery: string;
}) {
  const { lang, toggle, t } = useLanguage();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const searchRef = useRef<HTMLInputElement>(null);
  const libraryRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLHeadingElement>(null);

  /* keep shareable URL in sync */
  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    const url = qs
      ? `${window.location.pathname}?${qs}#library`
      : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [query, category]);

  const q = normalize(query);
  const filtered = useMemo(
    () =>
      resources.filter(
        (r) => (!category || r.category === category) && (!q || matches(r, q))
      ),
    [resources, category, q]
  );
  const featured = useMemo(
    () => resources.filter((r) => r.featured).slice(0, 3),
    [resources]
  );
  const isFiltering = Boolean(q || category);

  const pickCategory = useCallback((slug: string) => {
    setCategory((prev) => (prev === slug ? "" : slug));
    setTimeout(
      () => libraryRef.current?.scrollIntoView({ behavior: "smooth" }),
      50
    );
  }, []);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero-pattern relative overflow-hidden no-print">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
          {/* top row: eyebrow + language toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden />
              {t("heroEyebrow")}
            </p>
            <button
              type="button"
              onClick={toggle}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white transition hover:border-accent hover:text-accent"
              aria-label="Switch language / Cambiar idioma"
            >
              <Languages className="h-4 w-4" aria-hidden />
              {t("langLabel")}
            </button>
          </div>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
              {t("heroTitle")}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {t("heroSubtitle")}
            </p>
          </div>

          {/* Search */}
          <div className="mt-9 max-w-2xl">
            <label
              htmlFor="resource-search"
              className="mb-2 block text-sm font-semibold text-white"
            >
              {t("searchLabel")}
            </label>
            <div className="group relative">
              <Search
                className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition group-focus-within:text-brand"
                aria-hidden
              />
              <input
                ref={searchRef}
                id="resource-search"
                type="search"
                role="searchbox"
                aria-label={t("searchAria")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setQuery("");
                  if (e.key === "Enter") {
                    e.preventDefault();
                    libraryRef.current?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-full border-2 border-transparent bg-white py-4 pl-13 pr-12 text-[15px] text-ink shadow-[0_18px_50px_-16px_rgba(0,0,0,0.55)] outline-none transition placeholder:text-slate-400 focus:border-brand"
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    searchRef.current?.focus();
                  }}
                  aria-label={t("clearSearch")}
                  className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              )}
            </div>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/60">
              <span className="font-medium">{t("examplesLabel")}:</span>
              {EXAMPLE_CHIPS[lang].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setQuery(chip);
                    libraryRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="rounded-full border border-white/20 px-3 py-1 text-white/80 transition hover:border-accent hover:text-accent"
                >
                  {chip}
                </button>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="mist-pattern no-print">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              {t("browseTitle")}
            </h2>
            <p className="mt-2 text-sm text-ink-soft sm:text-base">
              {t("browseSubtitle")}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => {
              const active = category === c.slug;
              const count = counts[c.slug] ?? 0;
              const Icon = c.icon;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => pickCategory(c.slug)}
                  aria-pressed={active}
                  className={`rise group relative overflow-hidden rounded-3xl border bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(7,41,60,0.35)] ${
                    active
                      ? "border-brand ring-2 ring-brand/30"
                      : "border-slate-200 hover:border-brand/40"
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.tint}`}
                    >
                      <Icon className={`h-6 w-6 ${c.text}`} aria-hidden />
                    </span>
                    <span className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
                      {count} {lang === "es" ? "guías" : "guides"}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-navy group-hover:text-brand-deep">
                    {lang === "es" ? c.nameEs : c.nameEn}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {lang === "es" ? c.descEs : c.descEn}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep">
                    {lang === "es" ? c.ctaEs : c.ctaEn}
                    <ArrowRight
                      className="h-4 w-4 transition group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ LIBRARY ============ */}
      <section id="library" ref={libraryRef} className="scroll-mt-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                {t("libraryTitle")}
              </h2>
              <p className="mt-2 text-sm text-ink-soft sm:text-base">
                {t("librarySubtitle")}
              </p>
            </div>
            <p
              ref={resultsRef}
              aria-live="polite"
              className="rounded-full bg-mist px-4 py-1.5 text-sm font-semibold text-navy"
            >
              {filtered.length} {t("results")}
            </p>
          </div>

          {/* Filter pills */}
          <div
            role="group"
            aria-label={t("filterAria")}
            className="no-print mt-6 flex flex-wrap gap-2"
          >
            <FilterPill
              active={!category}
              onClick={() => setCategory("")}
              label={t("all")}
              count={resources.length}
            />
            {CATEGORIES.map((c) => (
              <FilterPill
                key={c.slug}
                active={category === c.slug}
                onClick={() => setCategory(category === c.slug ? "" : c.slug)}
                label={lang === "es" ? c.nameEs : c.nameEn}
                count={counts[c.slug] ?? 0}
              />
            ))}
          </div>

          {/* Active query echo */}
          {q && (
            <p className="mt-4 text-sm text-ink-soft">
              {lang === "es" ? "Mostrando resultados para" : "Showing results for"}{" "}
              <span className="font-semibold text-navy">“{query}”</span>{" "}
              <button
                type="button"
                onClick={() => setQuery("")}
                className="ml-1 font-semibold text-brand-deep underline-offset-2 hover:underline"
              >
                {t("clearSearch")}
              </button>
            </p>
          )}

          {/* Featured strip (only when not filtering) */}
          {!isFiltering && featured.length > 0 && (
            <div className="no-print mt-8 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-600">
                {t("commonTitle")}
              </p>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {featured.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/patient-resources/${r.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-amber-100 bg-white p-3.5 transition hover:border-brand/40 hover:shadow-md"
                  >
                    <BookOpenText
                      className="h-5 w-5 shrink-0 text-brand"
                      aria-hidden
                    />
                    <span className="flex-1 text-sm font-semibold leading-snug text-navy group-hover:text-brand-deep">
                      {lang === "es" ? r.titleEs : r.titleEn}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand"
                      aria-hidden
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Results grid */}
          {filtered.length > 0 ? (
            <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((r, i) => (
                <ResourceCard key={r.slug} resource={r} lang={lang} index={i} />
              ))}
            </ul>
          ) : (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-mist p-10 text-center">
              <AlertCircle
                className="mx-auto h-8 w-8 text-brand"
                aria-hidden
              />
              <h3 className="mt-3 text-lg font-semibold text-navy">
                {t("noResultsTitle")}
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
                {t("noResultsBody")}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("");
                  }}
                  className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-deep"
                >
                  {t("clearSearch")}
                </button>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand-deep"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============ CARE TEAM / CONTACT ============ */}
      <section className="no-print mist-pattern">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
          <div className="hero-pattern overflow-hidden rounded-[2rem] p-7 shadow-[0_30px_80px_-30px_rgba(7,41,60,0.7)] sm:p-10">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {t("helpTitle")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">
                {t("helpBody")}
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {/* Office */}
              <div className="rounded-2xl border border-white/12 bg-white/6 p-5 backdrop-blur-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/20">
                  <Phone className="h-5 w-5 text-brand" aria-hidden />
                </span>
                <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-white/60">
                  {t("officeLabel")}
                </h3>
                <a
                  href={SITE.phoneHref}
                  className="mt-1 block text-xl font-bold text-white transition hover:text-accent"
                >
                  {SITE.phoneDisplay}
                </a>
                <p className="mt-1.5 text-xs leading-relaxed text-white/65">
                  {t("officeHours")}
                </p>
              </div>
              {/* After hours */}
              <div className="rounded-2xl border border-white/12 bg-white/6 p-5 backdrop-blur-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20">
                  <MoonStar className="h-5 w-5 text-accent" aria-hidden />
                </span>
                <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-white/60">
                  {t("afterHoursLabel")}
                </h3>
                <p className="mt-1 text-xl font-bold text-white">
                  {SITE.phoneDisplay}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/65">
                  {t("afterHoursBody")}
                </p>
              </div>
              {/* Portal */}
              <div className="rounded-2xl border border-white/12 bg-white/6 p-5 backdrop-blur-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/20">
                  <MonitorSmartphone
                    className="h-5 w-5 text-brand"
                    aria-hidden
                  />
                </span>
                <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-white/60">
                  {t("portalLabel")}
                </h3>
                <a
                  href={SITE.portalUrl}
                  target="_blank"
                  rel="noopener"
                  className="mt-1 inline-flex items-center gap-1.5 text-xl font-bold text-white transition hover:text-accent"
                >
                  {t("openPortal")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <p className="mt-1.5 text-xs leading-relaxed text-white/65">
                  {t("portalBody")}
                </p>
              </div>
            </div>
            <p className="mt-7 flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-white/65">
              <CalendarCheck2
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                aria-hidden
              />
              {lang === "es"
                ? "Las instrucciones proporcionadas por su equipo de atención siempre tienen prioridad sobre estos materiales generales. Traiga su guía impresa a su próxima cita si tiene preguntas."
                : "Instructions provided directly by your care team always take priority over these general materials. Bring your printed guide to your next visit if you have questions."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- subcomponents ---------------- */

function FilterPill({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition ${
        active
          ? "bg-navy text-white shadow-md"
          : "border border-slate-300 bg-white text-ink-soft hover:border-brand hover:text-brand-deep"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
          active ? "bg-white/20 text-white" : "bg-mist text-ink-soft"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function ResourceCard({
  resource: r,
  lang,
  index,
}: {
  resource: ResourceSummary;
  lang: Lang;
  index: number;
}) {
  const cat = getCategory(r.category);
  const Icon = cat.icon;
  const title = lang === "es" ? r.titleEs : r.titleEn;
  const summary = lang === "es" ? r.summaryEs : r.summaryEn;

  return (
    <li
      className="rise"
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_48px_-24px_rgba(7,41,60,0.3)]">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${cat.tint}`}
          >
            <Icon className={`h-4 w-4 ${cat.text}`} aria-hidden />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
            {categoryName(r.category, lang)}
          </span>
        </div>
        <h3 className="mt-3">
          <Link
            href={`/patient-resources/${r.slug}`}
            className="text-[15px] font-semibold leading-snug text-navy transition group-hover:text-brand-deep"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-ink-soft">
          {summary}
        </p>
        <p className="mt-3 text-[11px] font-medium text-slate-500">
          {lang === "es" ? "Última revisión:" : "Last reviewed:"}{" "}
          {formatReviewedDate(r.lastReviewed, lang)}
        </p>
        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
          <Link
            href={`/patient-resources/${r.slug}`}
            className="flex-1 rounded-full bg-navy px-3.5 py-2 text-center text-xs font-semibold text-white transition hover:bg-brand-deep"
          >
            {lang === "es" ? "Ver guía" : "View guide"}
          </Link>
          <a
            href={`/api/resources/${r.slug}/pdf?lang=en`}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-2 text-[11px] font-bold text-ink-soft transition hover:border-brand hover:text-brand-deep"
            title="Download PDF — English"
          >
            <FileDown className="h-3.5 w-3.5" aria-hidden />
            EN
          </a>
          <a
            href={`/api/resources/${r.slug}/pdf?lang=es`}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-2 text-[11px] font-bold text-ink-soft transition hover:border-brand hover:text-brand-deep"
            title="Descargar PDF — Español"
          >
            <FileDown className="h-3.5 w-3.5" aria-hidden />
            ES
          </a>
        </div>
      </div>
    </li>
  );
}
