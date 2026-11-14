import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bandage,
  ClipboardCheck,
  HeartPulse,
  Home,
  Stethoscope,
} from "lucide-react";

export interface ResourceCategory {
  slug: string;
  nameEn: string;
  nameEs: string;
  descEn: string;
  descEs: string;
  ctaEn: string;
  ctaEs: string;
  icon: LucideIcon;
  /** Tailwind-friendly accent tokens */
  tint: string; // icon chip background
  text: string; // icon color
  ring: string; // hover ring
}

export const CATEGORIES: ResourceCategory[] = [
  {
    slug: "before-your-procedure",
    nameEn: "Before Your Procedure",
    nameEs: "Antes de Su Procedimiento",
    descEn: "Preparation checklists and what to expect before your visit.",
    descEs: "Listas de preparación y qué esperar antes de su visita.",
    ctaEn: "View preparation guides",
    ctaEs: "Ver guías de preparación",
    icon: ClipboardCheck,
    tint: "bg-sky-100",
    text: "text-sky-600",
    ring: "hover:ring-sky-200",
  },
  {
    slug: "procedures-treatments",
    nameEn: "Procedures & Treatments",
    nameEs: "Procedimientos y Tratamientos",
    descEn: "Step-by-step overviews of common procedures and treatments.",
    descEs: "Resúmenes paso a paso de procedimientos y tratamientos comunes.",
    ctaEn: "Explore procedures",
    ctaEs: "Explorar procedimientos",
    icon: Stethoscope,
    tint: "bg-teal-100",
    text: "text-teal-600",
    ring: "hover:ring-teal-200",
  },
  {
    slug: "discharge-instructions",
    nameEn: "Discharge Instructions",
    nameEs: "Instrucciones de Alta",
    descEn: "Care instructions for when you return home.",
    descEs: "Instrucciones de cuidado para cuando regrese a casa.",
    ctaEn: "Find discharge instructions",
    ctaEs: "Buscar instrucciones de alta",
    icon: Home,
    tint: "bg-indigo-100",
    text: "text-indigo-600",
    ring: "hover:ring-indigo-200",
  },
  {
    slug: "after-surgery",
    nameEn: "After Surgery",
    nameEs: "Después de la Cirugía",
    descEn: "Procedure-specific instructions for your recovery at home.",
    descEs: "Instrucciones específicas de cada procedimiento para su recuperación en casa.",
    ctaEn: "Find post-op instructions",
    ctaEs: "Buscar instrucciones postoperatorias",
    icon: HeartPulse,
    tint: "bg-rose-100",
    text: "text-rose-600",
    ring: "hover:ring-rose-200",
  },
  {
    slug: "braces-splints-supports",
    nameEn: "Braces, Splints & Supports",
    nameEs: "Férulas, Soportes y Apoyos",
    descEn: "Instructions for wearing and caring for your device.",
    descEs: "Instrucciones para usar y cuidar su dispositivo.",
    ctaEn: "Find your brace or support",
    ctaEs: "Encuentre su férula o soporte",
    icon: Bandage,
    tint: "bg-amber-100",
    text: "text-amber-600",
    ring: "hover:ring-amber-200",
  },
  {
    slug: "exercises-rehabilitation",
    nameEn: "Exercises & Rehabilitation",
    nameEs: "Ejercicios y Rehabilitación",
    descEn: "Exercise handouts and rehabilitation resources.",
    descEs: "Hojas de ejercicios y recursos de rehabilitación.",
    ctaEn: "Browse exercise guides",
    ctaEs: "Explorar guías de ejercicios",
    icon: Activity,
    tint: "bg-lime-100",
    text: "text-lime-600",
    ring: "hover:ring-lime-200",
  },
];

export function getCategory(slug: string): ResourceCategory {
  return CATEGORIES.find((c) => c.slug === slug) ?? CATEGORIES[0];
}

export function categoryName(slug: string, lang: "en" | "es"): string {
  const c = getCategory(slug);
  return lang === "es" ? c.nameEs : c.nameEn;
}
