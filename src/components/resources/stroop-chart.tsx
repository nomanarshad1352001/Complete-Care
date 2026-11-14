import { STROOP_WORDS } from "@/lib/resources/stroop";

/**
 * The Stroop chart from the Cognitive Exercises handout — color words printed
 * in mismatched ink colors. Prints and downloads with the guide.
 */
export function StroopChart() {
  return (
    <div className="avoid-break mt-2">
      <div
        role="img"
        aria-label="Stroop chart: color words printed in mismatched ink colors — blue, red, yellow, orange, green and purple."
        className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-4 sm:gap-2.5 sm:p-5 md:grid-cols-6"
      >
        {STROOP_WORDS.map((s, i) => (
          <div
            key={i}
            aria-hidden
            className="flex items-center justify-center rounded-lg border border-slate-100 bg-mist/60 py-3.5"
          >
            <span
              className="text-sm font-extrabold uppercase tracking-[0.18em] sm:text-base"
              style={{ color: s.hex }}
            >
              {s.word}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-500">
        First pass: read each <em>word</em> out loud. Second pass: name the{" "}
        <em>color of the ink</em> out loud. Reading through twice is one set —
        perform 3 sets.
      </p>
    </div>
  );
}
