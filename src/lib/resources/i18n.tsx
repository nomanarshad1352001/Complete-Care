"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "es";

const DICTIONARY = {
  heroEyebrow: {
    en: "Patient Education & Instructions",
    es: "Educación e Instrucciones para Pacientes",
  },
  heroTitle: { en: "Your care, step by step", es: "Su cuidado, paso a paso" },
  heroSubtitle: {
    en: "Prepare for your procedure, find your care instructions, and learn what to expect during recovery — in English and Spanish.",
    es: "Prepárese para su procedimiento, encuentre sus instrucciones de cuidado y sepa qué esperar durante la recuperación — en inglés y español.",
  },
  searchLabel: { en: "Find your instructions", es: "Encuentre sus instrucciones" },
  searchPlaceholder: {
    en: "Search by procedure, brace, or type of care…",
    es: "Busque por procedimiento, férula o tipo de cuidado…",
  },
  examplesLabel: { en: "Examples", es: "Ejemplos" },
  browseTitle: { en: "Browse by category", es: "Explorar por categoría" },
  browseSubtitle: {
    en: "Every guide is written by our care team and reviewed regularly.",
    es: "Cada guía está escrita por nuestro equipo de atención y se revisa con regularidad.",
  },
  libraryTitle: { en: "Instruction library", es: "Biblioteca de instrucciones" },
  librarySubtitle: {
    en: "All guides include a printable PDF in English and Spanish.",
    es: "Todas las guías incluyen un PDF imprimible en inglés y español.",
  },
  all: { en: "All guides", es: "Todas las guías" },
  results: { en: "guides", es: "guías" },
  noResultsTitle: { en: "No matches found", es: "No se encontraron resultados" },
  noResultsBody: {
    en: "Try a different keyword, or call our office and we will point you to the right instructions.",
    es: "Intente con otra palabra clave o llame a nuestra oficina y le indicaremos las instrucciones correctas.",
  },
  viewGuide: { en: "View guide", es: "Ver guía" },
  pdfEn: { en: "PDF (EN)", es: "PDF (EN)" },
  pdfEs: { en: "PDF (ES)", es: "PDF (ES)" },
  downloadPdfEn: { en: "Download PDF (English)", es: "Descargar PDF (inglés)" },
  downloadPdfEs: { en: "Descargar PDF (Español)", es: "Descargar PDF (español)" },
  print: { en: "Print", es: "Imprimir" },
  printInstructions: { en: "Print instructions", es: "Imprimir instrucciones" },
  lastReviewed: { en: "Last reviewed", es: "Última revisión" },
  backToAll: { en: "Back to all resources", es: "Volver a todos los recursos" },
  relatedTitle: { en: "Related guides", es: "Guías relacionadas" },
  inThisGuide: { en: "In this guide", es: "En esta guía" },
  helpTitle: { en: "Need help finding your instructions?", es: "¿Necesita ayuda para encontrar sus instrucciones?" },
  helpBody: {
    en: "Our care team can help you choose the right guide or answer questions about your care.",
    es: "Nuestro equipo de atención puede ayudarle a elegir la guía correcta o responder preguntas sobre su cuidado.",
  },
  officeLabel: { en: "Office", es: "Oficina" },
  officeHours: {
    en: "Mon–Fri, 7:30 AM – 6:00 PM · Same-day appointments",
    es: "Lun–Vie, 7:30 AM – 6:00 PM · Citas el mismo día",
  },
  afterHoursLabel: { en: "After hours", es: "Fuera del horario" },
  afterHoursBody: {
    en: "Call the office number and follow the prompts to reach the on-call provider. For emergencies, call 911.",
    es: "Llame al número de la oficina y siga las indicaciones para comunicarse con el proveedor de guardia. En caso de emergencia, llame al 911.",
  },
  portalLabel: { en: "Patient portal", es: "Portal del paciente" },
  portalBody: {
    en: "Send a secure message, request refills, or view your visit summaries online.",
    es: "Envíe un mensaje seguro, solicite recargas de medicamentos o vea los resúmenes de sus visitas en línea.",
  },
  openPortal: { en: "Open the patient portal", es: "Abrir el portal del paciente" },
  callOffice: { en: "Call the office", es: "Llamar a la oficina" },
  questionsTitle: { en: "Questions about your care?", es: "¿Preguntas sobre su cuidado?" },
  questionsBody: {
    en: "If you are unsure which guide applies to you, contact your care team before making changes to your routine.",
    es: "Si no está seguro de qué guía le corresponde, comuníquese con su equipo de atención antes de cambiar su rutina.",
  },
  disclaimerTitle: { en: "About this information", es: "Sobre esta información" },
  disclaimerBody: {
    en: "This sheet is provided by your Complete Care team for education only. It does not replace professional medical advice or your personalized care plan. Contact your provider with questions or concerns about your care.",
    es: "Esta hoja es proporcionada por su equipo de Complete Care solo con fines educativos. No reemplaza el consejo médico profesional ni su plan de cuidado personalizado. Comuníquese con su proveedor si tiene preguntas o inquietudes sobre su atención.",
  },
  categoryLabel: { en: "Category", es: "Categoría" },
  searchAria: { en: "Search instruction guides", es: "Buscar guías de instrucciones" },
  filterAria: { en: "Filter by category", es: "Filtrar por categoría" },
  langLabel: { en: "Español", es: "English" },
  commonTitle: { en: "Commonly used guides", es: "Guías más utilizadas" },
  clearSearch: { en: "Clear search", es: "Borrar búsqueda" },
  skipToResults: { en: "Skip to results", es: "Saltar a los resultados" },
} as const;

export type DictionaryKey = keyof typeof DICTIONARY;

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: DictionaryKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("cc-lang");
      if (saved === "en" || saved === "es") setLangState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("cc-lang", l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "en" ? "es" : "en";
      try {
        window.localStorage.setItem("cc-lang", next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const t = useCallback(
    (key: DictionaryKey) => DICTIONARY[key][lang],
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang, toggle, t }),
    [lang, setLang, toggle, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

/** Server-side helper for static strings. */
export function translate(key: DictionaryKey, lang: Lang): string {
  return DICTIONARY[key][lang];
}
