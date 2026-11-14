import Link from "next/link";
import { Clock, MapPin, MonitorSmartphone, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/complete-care-footer-logo.svg"
              alt="Complete Care"
              className="h-11 w-auto"
              width={252}
              height={45}
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Holistic, team-based injury care helping patients across Central
              Florida recover from auto accidents and slip-and-fall injuries.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/80">
                <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden />
                30+ locations
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/80">
                <Clock className="h-3.5 w-3.5 text-accent" aria-hidden />
                {SITE.hoursEn}
              </span>
            </div>
          </div>

          {/* Patient links */}
          <nav aria-label="Patient links">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Patients
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li>
                <Link
                  href="/patient-resources"
                  className="transition hover:text-white"
                >
                  Patient Resources
                </Link>
              </li>
              <li>
                <a
                  href={SITE.portalUrl}
                  target="_blank"
                  rel="noopener"
                  className="transition hover:text-white"
                >
                  Patient Portal
                </a>
              </li>
              <li>
                <a
                  href={SITE.external.schedule}
                  target="_blank"
                  rel="noopener"
                  className="transition hover:text-white"
                >
                  Request an Appointment
                </a>
              </li>
              <li>
                <a
                  href={SITE.external.billing}
                  target="_blank"
                  rel="noopener"
                  className="transition hover:text-white"
                >
                  No Surprise Billing
                </a>
              </li>
              <li>
                <a
                  href={SITE.external.accessibility}
                  target="_blank"
                  rel="noopener"
                  className="transition hover:text-white"
                >
                  Accessibility
                </a>
              </li>
            </ul>
          </nav>

          {/* Company links */}
          <nav aria-label="Company links">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Complete Care
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li>
                <a
                  href={SITE.external.locations}
                  target="_blank"
                  rel="noopener"
                  className="transition hover:text-white"
                >
                  Locations
                </a>
              </li>
              <li>
                <a
                  href={SITE.external.services}
                  target="_blank"
                  rel="noopener"
                  className="transition hover:text-white"
                >
                  Treatment &amp; Services
                </a>
              </li>
              <li>
                <a
                  href={SITE.external.injuries}
                  target="_blank"
                  rel="noopener"
                  className="transition hover:text-white"
                >
                  Injuries We Treat
                </a>
              </li>
              <li>
                <a
                  href={SITE.external.about}
                  target="_blank"
                  rel="noopener"
                  className="transition hover:text-white"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href={SITE.external.contact}
                  target="_blank"
                  rel="noopener"
                  className="transition hover:text-white"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Get care now
            </h3>
            <a
              href={SITE.phoneHref}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-white"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {SITE.phoneDisplay}
            </a>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Walk-ins welcome at all locations. Same-day appointments, no
              referral needed.
            </p>
            <a
              href={SITE.portalUrl}
              target="_blank"
              rel="noopener"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand transition hover:text-white"
            >
              <MonitorSmartphone className="h-4 w-4" aria-hidden />
              Open the patient portal
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-white/50">
            The educational materials on this site are for general information
            only and do not replace medical advice from your care team. If you
            are experiencing a medical emergency, call 911.
          </p>
          <p className="mt-3 text-xs text-white/50">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
