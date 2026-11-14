"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Clock, MapPin, Menu, Phone, X } from "lucide-react";
import { SITE } from "@/lib/site";

const NAV = [
  { label: "Home", href: "/", external: false },
  { label: "Locations", href: SITE.external.locations, external: true },
  {
    label: "Treatment & Services",
    href: SITE.external.services,
    external: true,
  },
  { label: "Patient Resources", href: "/patient-resources", external: false },
  { label: "About", href: SITE.external.about, external: true },
  { label: "Contact", href: SITE.external.contact, external: true },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header sticky top-0 z-50">
      {/* Utility bar */}
      <div className="bg-navy text-white/90 no-print">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs sm:px-6 lg:px-8">
          <p className="flex items-center gap-1.5 font-medium">
            <Clock className="h-3.5 w-3.5 text-accent" aria-hidden />
            <span className="hidden sm:inline">{SITE.hoursEn} ·</span>
            <span>Same-day appointments available</span>
          </p>
          <div className="flex items-center gap-4">
            <a
              href={SITE.external.locations}
              target="_blank"
              rel="noopener"
              className="hidden items-center gap-1.5 transition hover:text-white md:flex"
            >
              <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden />
              30+ Central Florida locations
            </a>
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-1.5 font-semibold text-white transition hover:text-accent"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-slate-200/80 bg-white/95 shadow-[0_1px_12px_rgba(7,41,60,0.06)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label="Complete Care home"
            className="shrink-0"
            onClick={() => setOpen(false)}
          >
            {/* Official Complete Care logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/complete-care-logo.svg"
              alt="Complete Care"
              className="h-9 w-auto sm:h-11"
              width={252}
              height={45}
            />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV.map((item) => {
              const active =
                !item.external && pathname.startsWith(item.href) && item.href !== "/" ||
                (!item.external && item.href === "/" && pathname === "/");
              const cls = `rounded-full px-3.5 py-2 text-[13px] font-medium transition ${
                active
                  ? "bg-brand-faint text-brand-ink"
                  : "text-ink-soft hover:bg-slate-100 hover:text-navy"
              }`;
              return item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                  className={cls}
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className={cls}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={SITE.external.schedule}
              target="_blank"
              rel="noopener"
              className="hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_6px_16px_-6px_rgba(0,171,229,0.9)] transition hover:bg-brand-deep focus-visible:outline-brand-deep sm:inline-flex"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden />
              Request Appointment
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-ink-soft transition hover:bg-slate-100 lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav
            aria-label="Mobile"
            className="border-t border-slate-200 bg-white lg:hidden"
          >
            <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
              {NAV.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener"
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-ink transition hover:bg-mist"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-ink transition hover:bg-mist"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <a
                  href={SITE.external.schedule}
                  target="_blank"
                  rel="noopener"
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white"
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden />
                  Request Appointment
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
