"use client";

import { FileDown, Printer } from "lucide-react";

/** Prominent Download / Print bar shown at the top of every instruction sheet. */
export function PdfActions({ slug }: { slug: string }) {
  return (
    <div
      className="no-print mt-6 flex flex-col gap-2.5 rounded-2xl border border-slate-200 bg-mist p-4 sm:flex-row sm:flex-wrap sm:items-center"
      role="group"
      aria-label="Download or print these instructions"
    >
      <a
        href={`/api/resources/${slug}/pdf?lang=en`}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(0,171,229,0.9)] transition hover:bg-brand-deep"
      >
        <FileDown className="h-4 w-4" aria-hidden />
        Download PDF · English
      </a>
      <a
        href={`/api/resources/${slug}/pdf?lang=es`}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-brand bg-white px-5 py-[10px] text-sm font-semibold text-brand-ink transition hover:bg-brand hover:text-white"
      >
        <FileDown className="h-4 w-4" aria-hidden />
        Descargar PDF · Español
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-navy sm:flex-none"
      >
        <Printer className="h-4 w-4" aria-hidden />
        Print
      </button>
    </div>
  );
}
