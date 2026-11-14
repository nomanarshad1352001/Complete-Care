"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Info,
  Languages,
  ListChecks,
} from "lucide-react";
import type { ContentBlock } from "@/lib/resources/format";
import type { Lang } from "@/lib/resources/i18n";

interface TocEntry {
  id: string;
  text: string;
}

/**
 * Renders an instruction sheet with an EN/ES toggle, an auto table of
 * contents anchored to section headings, and styled block content.
 * Fully print-friendly: the toggle and TOC hide when printing.
 */
export function ResourceSheet({
  blocksEn,
  blocksEs,
  titleEs,
}: {
  blocksEn: ContentBlock[];
  blocksEs: ContentBlock[];
  titleEn: string;
  titleEs: string;
}) {
  const [lang, setLang] = useState<Lang>("en");

  /* Sync with whatever language the visitor used on the directory page */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("cc-lang");
      if (saved === "es") setLang("es");
    } catch {
      /* ignore */
    }
  }, []);

  const blocks = lang === "es" ? blocksEs : blocksEn;

  const toc: TocEntry[] = useMemo(() => {
    let n = 0;
    return blocks.flatMap((b) =>
      b.type === "heading" ? [{ id: `section-${n++}`, text: b.text }] : []
    );
  }, [blocks]);

  let headingIndex = -1;

  return (
    <div className="reader">
      {/* Language toggle */}
      <div className="no-print mt-8 flex flex-wrap items-center justify-between gap-3 border-y border-slate-100 py-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <ListChecks className="h-4 w-4 text-brand" aria-hidden />
          {lang === "es" ? "En esta guía" : "In this guide"} ·{" "}
          {toc.length} {lang === "es" ? "secciones" : "sections"}
        </p>
        <div
          role="group"
          aria-label="Content language"
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-mist p-1"
        >
          <Languages className="ml-2 h-4 w-4 text-slate-400" aria-hidden />
          <LangButton active={lang === "en"} onClick={() => setLang("en")}>
            English
          </LangButton>
          <LangButton active={lang === "es"} onClick={() => setLang("es")}>
            Español
          </LangButton>
        </div>
      </div>

      {/* Table of contents */}
      {toc.length > 1 && (
        <nav
          aria-label={lang === "es" ? "En esta guía" : "In this guide"}
          className="no-print mt-6"
        >
          <ol className="flex flex-wrap gap-2">
            {toc.map((entry, i) => (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-soft transition hover:border-brand hover:text-brand-deep"
                >
                  <span
                    aria-hidden
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-faint text-[10px] font-bold text-brand-ink"
                  >
                    {i + 1}
                  </span>
                  {entry.text}
                </a>
              </li>
            ))}
          </ol>
          <p className="sr-only">
            {lang === "es" ? `Título en español: ${titleEs}` : ""}
          </p>
        </nav>
      )}

      {/* Blocks */}
      <div className="mt-6 space-y-5">
        {blocks.map((block, i) => {
          switch (block.type) {
            case "heading": {
              headingIndex += 1;
              return (
                <h2
                  key={i}
                  id={`section-${headingIndex}`}
                  className="scroll-mt-28 border-l-4 border-brand pl-4 pt-2 text-xl font-bold tracking-tight text-navy sm:text-2xl"
                >
                  {block.text}
                </h2>
              );
            }
            case "paragraph":
              return (
                <p key={i} className="text-[15px] text-ink sm:text-base">
                  {block.text}
                </p>
              );
            case "bullets":
              return (
                <ul key={i} className="space-y-2.5">
                  {block.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-[15px] leading-relaxed text-ink sm:text-base"
                    >
                      <span
                        aria-hidden
                        className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-brand"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            case "steps":
              return (
                <ol key={i} className="space-y-3">
                  {block.items.map((item, j) => (
                    <li
                      key={j}
                      className="avoid-break flex gap-3.5 text-[15px] leading-relaxed text-ink sm:text-base"
                    >
                      <span
                        aria-hidden
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white"
                      >
                        {j + 1}
                      </span>
                      <span className="pt-0.5">{item}</span>
                    </li>
                  ))}
                </ol>
              );
            case "callout":
              return (
                <div
                  key={i}
                  role="note"
                  className="avoid-break flex gap-3 rounded-2xl border border-brand/30 bg-brand-faint p-4 sm:p-5"
                >
                  <Info
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-deep"
                    aria-hidden
                  />
                  <p className="text-sm leading-relaxed text-brand-ink">
                    {block.text}
                  </p>
                </div>
              );
            case "warning":
              return (
                <div
                  key={i}
                  role="alert"
                  className="avoid-break flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 sm:p-5"
                >
                  <AlertTriangle
                    className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                    aria-hidden
                  />
                  <p className="text-sm leading-relaxed text-amber-900">
                    {block.text}
                  </p>
                </div>
              );
            case "divider":
              return <hr key={i} className="border-slate-200" />;
          }
        })}
      </div>
    </div>
  );
}

function LangButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
        active
          ? "bg-navy text-white shadow"
          : "text-ink-soft hover:bg-white hover:text-navy"
      }`}
    >
      {children}
    </button>
  );
}
