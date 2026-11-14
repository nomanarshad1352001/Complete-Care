import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  MapPin,
  Phone,
  Printer,
  Search,
  ShieldCheck,
  Languages,
} from "lucide-react";
import { SITE } from "@/lib/site";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="hero-pattern relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden />
              Team-based injury care · Central Florida
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Recover with a care team that stays{" "}
              <span className="text-brand">with you</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              From your first evaluation through your last exercise, our
              specialists coordinate every step of recovery after auto accidents
              and slip-and-fall injuries — at 30+ neighborhood clinics.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/patient-resources"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(0,171,229,0.8)] transition hover:bg-brand-deep"
              >
                <BookOpenText className="h-4 w-4" aria-hidden />
                Patient Resources
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-accent hover:text-accent"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Patient resources spotlight */}
      <section className="mist-pattern">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-deep">
                New for patients
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Patient Education &amp; Instructions
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base">
                Prepare for your procedure, find your care instructions, and
                learn what to expect during recovery. Every guide includes a
                printable PDF in English and Spanish.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    icon: Search,
                    title: "Searchable library",
                    body: "36 guides across six categories of care.",
                  },
                  {
                    icon: Printer,
                    title: "Print & PDF",
                    body: "Every sheet downloads as a clean handout.",
                  },
                  {
                    icon: Languages,
                    title: "English & Español",
                    body: "Full bilingual content, one tap to switch.",
                  },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <f.icon className="h-5 w-5 text-brand" aria-hidden />
                    <p className="mt-2 text-sm font-semibold text-navy">
                      {f.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                      {f.body}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/patient-resources"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
              >
                Open the resource library
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(7,41,60,0.35)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                Explore the six categories
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  ["Before Your Procedure", "Preparation checklists and what to expect."],
                  ["Procedures & Treatments", "Step-by-step overviews of common procedures."],
                  ["Discharge Instructions", "Care instructions for when you return home."],
                  ["After Surgery", "Procedure-specific recovery instructions."],
                  ["Braces, Splints & Supports", "Wearing and caring for your device."],
                  ["Exercises & Rehabilitation", "Exercise handouts and rehab resources."],
                ].map(([name, desc], i) => (
                  <li key={name}>
                    <Link
                      href={`/patient-resources?category=${["before-your-procedure","procedures-treatments","discharge-instructions","after-surgery","braces-splints-supports","exercises-rehabilitation"][i]}`}
                      className="group flex items-center gap-4 rounded-2xl border border-slate-100 p-3.5 transition hover:border-brand/40 hover:bg-brand-faint/50"
                    >
                      <span
                        aria-hidden
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-faint text-xs font-bold text-brand-deep"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-navy group-hover:text-brand-deep">
                          {name}
                        </span>
                        <span className="block text-xs text-ink-soft">
                          {desc}
                        </span>
                      </span>
                      <ArrowRight
                        className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Access strip */}
      <section className="bg-navy">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            {
              icon: MapPin,
              title: "30+ locations",
              body: "Neighborhood clinics across Central Florida — walk-ins welcome.",
            },
            {
              icon: Phone,
              title: "One call access",
              body: `${SITE.phoneDisplay} · Same-day appointments, no referral needed.`,
            },
            {
              icon: ShieldCheck,
              title: "Coordinated care",
              body: "Injury care, imaging, orthopedics, neurology & rehab under one roof.",
            },
          ].map((c) => (
            <div key={c.title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/8">
                <c.icon className="h-5 w-5 text-accent" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{c.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/70">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
