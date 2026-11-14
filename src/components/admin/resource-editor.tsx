"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  Info,
  Loader2,
  Save,
} from "lucide-react";
import { CATEGORIES } from "@/lib/resources/categories";
import { parseBlocks, type ContentBlock } from "@/lib/resources/format";

interface FormState {
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

const EMPTY: FormState = {
  slug: "",
  category: "before-your-procedure",
  titleEn: "",
  titleEs: "",
  summaryEn: "",
  summaryEs: "",
  contentEn: "## Heading\nShort paragraph.\n- Bullet one\n- Bullet two\n> Callout note\n! Caution note\n1. Step one\n2. Step two",
  contentEs: "## Título de sección\nPárrafo corto.\n- Punto uno\n- Punto dos\n> Nota destacada\n! Nota de precaución\n1. Paso uno\n2. Paso dos",
  keywords: "",
  featured: false,
  lastReviewed: new Date().toISOString().slice(0, 10),
  sortOrder: 99,
};

export function ResourceEditor({
  mode,
  initial,
}: {
  mode: "create" | "edit";
  initial?: FormState;
}) {
  const [form, setForm] = useState<FormState>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [previewLang, setPreviewLang] = useState<"en" | "es">("en");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const autoSlug = (title: string) =>
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);

  const previewBlocks = useMemo(
    () => parseBlocks(previewLang === "es" ? form.contentEs : form.contentEn),
    [form.contentEn, form.contentEs, previewLang]
  );

  async function handleSave() {
    setSaving(true);
    setErrors([]);
    try {
      const res = await fetch("/api/admin/resources", {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "create"
            ? form
            : { ...form, originalSlug: initial?.slug ?? form.slug }
        ),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors ?? ["Save failed."]);
      } else {
        setSaved(true);
        if (mode === "create") {
          window.location.href = `/admin/resources/${data.slug}`;
          return;
        }
      }
    } catch {
      setErrors(["Network error — please try again."]);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      {/* ===== Form ===== */}
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        {errors.length > 0 && (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-4"
          >
            <p className="flex items-center gap-2 text-sm font-bold text-red-700">
              <AlertTriangle className="h-4 w-4" aria-hidden />
              Please fix the following:
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-red-700">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}
        {saved && (
          <p
            role="status"
            className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Saved. The website and PDFs are updated.{" "}
            <Link
              href={`/patient-resources/${form.slug}`}
              className="underline underline-offset-2"
            >
              View the guide
            </Link>
          </p>
        )}

        {/* Metadata */}
        <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <legend className="px-2 text-xs font-bold uppercase tracking-widest text-ink-soft">
            Organization
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.nameEn} / {c.nameEs}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="URL slug" hint="lowercase-hyphen-format">
              <input
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="e.g. after-your-knee-arthroscopy"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              />
            </Field>
            <Field label="Last reviewed date">
              <input
                type="date"
                value={form.lastReviewed}
                onChange={(e) => set("lastReviewed", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              />
            </Field>
            <Field label="Sort order" hint="lower appears first">
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => set("sortOrder", Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              />
            </Field>
            <Field
              label="Search keywords"
              hint="comma separated, both languages"
              className="sm:col-span-2"
            >
              <input
                value={form.keywords}
                onChange={(e) => set("keywords", e.target.value)}
                placeholder="knee, brace, rodilla, férula…"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              />
            </Field>
            <label className="flex items-center gap-2.5 text-sm font-semibold text-navy sm:col-span-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
              />
              Feature in “Commonly used guides” on the directory page
            </label>
          </div>
        </fieldset>

        {/* English content */}
        <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <legend className="px-2 text-xs font-bold uppercase tracking-widest text-brand-deep">
            English content
          </legend>
          <div className="space-y-4">
            <Field label="Title (English)">
              <input
                value={form.titleEn}
                onChange={(e) => {
                  set("titleEn", e.target.value);
                  if (mode === "create" && !form.slug) {
                    set("slug", autoSlug(e.target.value));
                  }
                  if (mode === "create" && form.slug === autoSlug(form.titleEn)) {
                    set("slug", autoSlug(e.target.value));
                  }
                }}
                placeholder="After Your Knee Arthroscopy"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              />
            </Field>
            <Field
              label="Introduction / summary (English)"
              hint="shown under the title and on directory cards"
            >
              <textarea
                value={form.summaryEn}
                onChange={(e) => set("summaryEn", e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              />
            </Field>
            <Field
              label="Body (English)"
              hint="## heading · - bullet · 1. step · > callout · ! caution"
            >
              <textarea
                value={form.contentEn}
                onChange={(e) => set("contentEn", e.target.value)}
                rows={16}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-mono text-[13px] leading-relaxed outline-none focus:border-brand"
              />
            </Field>
          </div>
        </fieldset>

        {/* Spanish content */}
        <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <legend className="px-2 text-xs font-bold uppercase tracking-widest text-accent-deep">
            Spanish content / Contenido en español
          </legend>
          <div className="space-y-4">
            <Field label="Título (español)">
              <input
                value={form.titleEs}
                onChange={(e) => set("titleEs", e.target.value)}
                placeholder="Después de Su Artroscopia de Rodilla"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              />
            </Field>
            <Field label="Introducción / resumen (español)">
              <textarea
                value={form.summaryEs}
                onChange={(e) => set("summaryEs", e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              />
            </Field>
            <Field label="Cuerpo (español)" hint="mismo formato que en inglés">
              <textarea
                value={form.contentEs}
                onChange={(e) => set("contentEs", e.target.value)}
                rows={16}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-mono text-[13px] leading-relaxed outline-none focus:border-brand"
              />
            </Field>
          </div>
        </fieldset>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-brand-deep disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Save className="h-4 w-4" aria-hidden />
            )}
            {mode === "create" ? "Create guide" : "Save changes"}
          </button>
          <Link
            href="/admin"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-ink-soft transition hover:border-navy hover:text-navy"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* ===== Live preview ===== */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 bg-mist px-4 py-3">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink-soft">
              <Eye className="h-4 w-4" aria-hidden />
              Live preview
            </p>
            <div className="inline-flex rounded-full border border-slate-200 bg-white p-0.5 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setPreviewLang("en")}
                className={`rounded-full px-3 py-1 ${previewLang === "en" ? "bg-navy text-white" : "text-ink-soft"}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setPreviewLang("es")}
                className={`rounded-full px-3 py-1 ${previewLang === "es" ? "bg-navy text-white" : "text-ink-soft"}`}
              >
                ES
              </button>
            </div>
          </div>
          <div className="max-h-[70vh] space-y-3 overflow-y-auto p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-brand-deep">
              {CATEGORIES.find((c) => c.slug === form.category)?.nameEn}
            </p>
            <p className="text-lg font-bold leading-snug text-navy">
              {previewLang === "es"
                ? form.titleEs || "(sin título)"
                : form.titleEn || "(untitled)"}
            </p>
            <p className="text-xs leading-relaxed text-ink-soft">
              {previewLang === "es" ? form.summaryEs : form.summaryEn}
            </p>
            <MiniPreview blocks={previewBlocks} />
          </div>
          <p className="flex items-start gap-2 border-t border-slate-100 bg-mist px-4 py-3 text-[11px] leading-relaxed text-slate-500">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            This is how the guide renders on the website. PDF handouts use the
            same content with the practice letterhead.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-soft">
        {label}
        {hint && (
          <span className="ml-2 font-normal normal-case tracking-normal text-slate-400">
            {hint}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function MiniPreview({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-3 border-t border-slate-100 pt-3 text-[13px] leading-relaxed text-ink">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "heading":
            return (
              <p key={i} className="border-l-2 border-brand pl-2 font-bold text-navy">
                {b.text}
              </p>
            );
          case "paragraph":
            return <p key={i}>{b.text}</p>;
          case "bullets":
            return (
              <ul key={i} className="list-disc space-y-1 pl-5">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case "steps":
            return (
              <ol key={i} className="list-decimal space-y-1 pl-5">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <p key={i} className="rounded-lg bg-brand-faint p-2.5 text-brand-ink">
                {b.text}
              </p>
            );
          case "warning":
            return (
              <p key={i} className="rounded-lg bg-amber-50 p-2.5 text-amber-800">
                {b.text}
              </p>
            );
          case "divider":
            return <hr key={i} className="border-slate-200" />;
        }
      })}
    </div>
  );
}
