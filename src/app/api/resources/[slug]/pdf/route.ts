import { NextRequest } from "next/server";
import PDFDocument from "pdfkit";
import { getResourceBySlug, formatReviewedDate } from "@/lib/resources/queries";
import { parseBlocks, type ContentBlock } from "@/lib/resources/format";
import { getCategory } from "@/lib/resources/categories";
import { STROOP_WORDS } from "@/lib/resources/stroop";

export const dynamic = "force-dynamic";

const NAVY = "#06293C";
const BLUE = "#00ABE5";
const GREEN = "#85C440";
const GRAY = "#4D4D4F";
const SOFT = "#7A8899";

const LABELS = {
  en: {
    eyebrow: "PATIENT EDUCATION & INSTRUCTIONS",
    reviewed: "Last reviewed",
    office: "Office",
    hours: "Mon–Fri 7:30 AM – 6:00 PM",
    afterHours:
      "After hours: call the office number and follow the prompts for the on-call provider. For emergencies, call 911.",
    portal: "Patient portal",
    portalValue: "available from complete-care.com",
    contactTitle: "Contact & Follow-up",
    disclaimer:
      "This information sheet is provided by your Complete Care team for education only. It does not replace professional medical advice or your individualized care plan. Please contact your healthcare provider with questions or concerns about your care.",
    published: "Published",
    page: "Page",
    of: "of",
  },
  es: {
    eyebrow: "EDUCACIÓN E INSTRUCCIONES PARA PACIENTES",
    reviewed: "Última revisión",
    office: "Oficina",
    hours: "Lun–Vie 7:30 AM – 6:00 PM",
    afterHours:
      "Fuera del horario: llame al número de la oficina y siga las indicaciones para comunicarse con el proveedor de guardia. En caso de emergencia, llame al 911.",
    portal: "Portal del paciente",
    portalValue: "disponible en complete-care.com",
    contactTitle: "Contacto y Seguimiento",
    disclaimer:
      "Esta hoja informativa es proporcionada por su equipo de Complete Care solo con fines educativos. No reemplaza el consejo médico profesional ni su plan de cuidado individualizado. Comuníquese con su proveedor de salud si tiene preguntas o inquietudes sobre su atención.",
    published: "Publicado",
    page: "Página",
    of: "de",
  },
} as const;

type Lang = keyof typeof LABELS;

export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ slug: string }> }
) {
  try {
    return await buildPdf(request, ctx);
  } catch (err) {
    // pdfkit is fs-dependent; a serverless misconfiguration should fail loudly
    // in the logs but never leave the patient with a blank page.
    console.error("[pdf] generation failed:", err);
    return new Response(
      "Sorry — the PDF could not be generated right now. Please try again, or call (844) 699-2273 and we will send you a printed copy.",
      { status: 500, headers: { "Content-Type": "text/plain" } }
    );
  }
}

async function buildPdf(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const lang: Lang =
    new URL(request.url).searchParams.get("lang") === "es" ? "es" : "en";
  const r = await getResourceBySlug(slug);
  if (!r) {
    return new Response("Resource not found", { status: 404 });
  }

  const L = LABELS[lang];
  const category = getCategory(r.category);
  const title = lang === "es" ? r.titleEs : r.titleEn;
  const summary = lang === "es" ? r.summaryEs : r.summaryEn;
  const blocks = parseBlocks(lang === "es" ? r.contentEs : r.contentEn);

  const doc = new PDFDocument({
    size: "LETTER",
    margins: { top: 50, bottom: 76, left: 54, right: 54 },
    bufferPages: true,
    info: {
      Title: `${title} — Complete Care`,
      Author: "Complete Care",
      Subject: `${lang === "es" ? category.nameEs : category.nameEn} — ${L.eyebrow}`,
    },
  });

  const chunks: Buffer[] = [];
  doc.on("data", (c: Buffer) => chunks.push(c));
  const finished = new Promise<Buffer>((resolve) =>
    doc.on("end", () => resolve(Buffer.concat(chunks)))
  );

  const pageWidth = doc.page.width - 108; // minus L/R margins (54*2)
  const MARGIN_X = 54;

  const ensureSpace = (needed: number) => {
    if (doc.y + needed > doc.page.height - 90) doc.addPage();
  };

  /* ---------- Brand header ---------- */
  const headerY = 44;
  // Small green plus mark
  doc
    .save()
    .translate(MARGIN_X, headerY - 2)
    .fillColor(GREEN)
    .roundedRect(0, 6, 6, 16, 2)
    .fill()
    .roundedRect(-5, 11, 16, 6, 2)
    .fill()
    .restore();

  doc
    .font("Helvetica-Bold")
    .fontSize(19)
    .fillColor(GRAY)
    .text("Complete ", MARGIN_X + 18, headerY, { continued: true, lineBreak: false })
    .fillColor(BLUE)
    .text("Care", { lineBreak: false });

  doc
    .font("Helvetica-Bold")
    .fontSize(7.5)
    .fillColor(SOFT)
    .text(L.eyebrow, MARGIN_X + 18, headerY + 24, {
      characterSpacing: 1.2,
      lineBreak: false,
    });

  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor(SOFT)
    .text("(844) 699-2273", 0, headerY, {
      width: doc.page.width - MARGIN_X,
      align: "right",
      lineBreak: false,
    })
    .text("www.complete-care.com", 0, headerY + 12, {
      width: doc.page.width - MARGIN_X,
      align: "right",
      lineBreak: false,
    });

  doc
    .moveTo(MARGIN_X, 84)
    .lineTo(doc.page.width - MARGIN_X, 84)
    .lineWidth(2)
    .strokeColor(BLUE)
    .stroke();

  doc.y = 104;

  /* ---------- Title block ---------- */
  doc
    .font("Helvetica-Bold")
    .fontSize(8.5)
    .fillColor(BLUE)
    .text(
      (lang === "es" ? category.nameEs : category.nameEn).toUpperCase(),
      { characterSpacing: 1, lineBreak: false }
    );
  doc.moveDown(0.4);
  doc
    .font("Helvetica-Bold")
    .fontSize(20)
    .fillColor(NAVY)
    .text(title, { lineGap: 2 });
  doc.moveDown(0.5);
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(GRAY)
    .text(summary, { lineGap: 2.5 });
  doc.moveDown(0.4);
  doc
    .font("Helvetica-Oblique")
    .fontSize(8.5)
    .fillColor(SOFT)
    .text(
      `${L.reviewed}: ${formatReviewedDate(r.lastReviewed, lang)}  ·  Complete Care`,
      { lineBreak: false }
    );
  doc.moveDown(1.2);

  /* ---------- Content blocks ---------- */
  const renderBlocks = (list: ContentBlock[]) => {
    for (const block of list) {
      switch (block.type) {
        case "heading": {
          ensureSpace(52);
          doc.moveDown(0.4);
          doc
            .font("Helvetica-Bold")
            .fontSize(13)
            .fillColor(NAVY)
            .text(block.text, { lineGap: 1.5 });
          const y = doc.y + 2;
          doc
            .moveTo(MARGIN_X, y)
            .lineTo(MARGIN_X + 34, y)
            .lineWidth(2.5)
            .strokeColor(GREEN)
            .stroke();
          doc.moveDown(0.55);
          break;
        }
        case "paragraph": {
          ensureSpace(30);
          doc
            .font("Helvetica")
            .fontSize(10)
            .fillColor(GRAY)
            .text(block.text, { lineGap: 2.5 });
          doc.moveDown(0.6);
          break;
        }
        case "bullets": {
          for (const item of block.items) {
            ensureSpace(20);
            doc
              .font("Helvetica")
              .fontSize(10)
              .fillColor(BLUE)
              .text("•", MARGIN_X, doc.y, { continued: true, indent: 0, lineBreak: false })
              .fillColor(GRAY)
              .text(`  ${item}`, { indent: 14, lineGap: 2.2 });
          }
          doc.moveDown(0.6);
          break;
        }
        case "steps": {
          block.items.forEach((item, idx) => {
            ensureSpace(24);
            const y = doc.y;
            doc
              .font("Helvetica-Bold")
              .fontSize(10)
              .fillColor(BLUE)
              .text(`${idx + 1}.`, MARGIN_X, y, { lineBreak: false });
            doc
              .font("Helvetica")
              .fontSize(10)
              .fillColor(GRAY)
              .text(item, MARGIN_X + 18, y, {
                width: pageWidth - 18,
                lineGap: 2.2,
              });
            doc.moveDown(0.35);
          });
          doc.moveDown(0.4);
          break;
        }
        case "callout":
        case "warning": {
          const isWarn = block.type === "warning";
          const bg = isWarn ? "#FEF6E4" : "#E9F7FD";
          const fg = isWarn ? "#8A6D1A" : "#00587A";
          const label = isWarn
            ? lang === "es" ? "PRECAUCIÓN:" : "CAUTION:"
            : lang === "es" ? "NOTA:" : "NOTE:";
          doc.font("Helvetica").fontSize(9.5);
          const h =
            doc.heightOfString(`${label} ${block.text}`, {
              width: pageWidth - 28,
              lineGap: 2.4,
            }) + 26;
          ensureSpace(h + 10);
          const y = doc.y;
          doc
            .save()
            .roundedRect(MARGIN_X, y, pageWidth, h, 6)
            .fillColor(bg)
            .fill()
            .restore();
          doc
            .fillColor(fg)
            .font("Helvetica-Bold")
            .text(`${label}  `, MARGIN_X + 14, y + 12, {
              width: pageWidth - 28,
              continued: true,
              lineGap: 2.4,
            })
            .font("Helvetica")
            .text(block.text, { lineGap: 2.4 });
          doc.y = y + h;
          doc.moveDown(0.8);
          break;
        }
        case "divider":
          doc.moveDown(0.5);
          break;
      }
    }
  };

  renderBlocks(blocks);

  /* ---------- Stroop chart (Cognitive Exercises handout) ---------- */
  if (slug === "cognitive-exercises") {
    doc.addPage();
    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor(NAVY)
      .text(lang === "es" ? "Tabla Stroop" : "Stroop Chart", MARGIN_X, 70, {
        lineBreak: false,
      });
    doc
      .moveTo(MARGIN_X, doc.y + 2)
      .lineTo(MARGIN_X + 34, doc.y + 2)
      .lineWidth(2.5)
      .strokeColor(GREEN)
      .stroke();
    doc.moveDown(0.8);

    const cols = 4;
    const cellW = pageWidth / cols;
    const cellH = 52;
    const gridTop = doc.y;
    STROOP_WORDS.forEach((s, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = MARGIN_X + col * cellW;
      const y = gridTop + row * cellH;
      doc
        .save()
        .rect(x, y, cellW, cellH)
        .lineWidth(0.6)
        .strokeColor("#D9E4EC")
        .stroke()
        .restore();
      doc
        .font("Helvetica-Bold")
        .fontSize(15)
        .fillColor(s.hex)
        .text(s.word, x, y + cellH / 2 - 8, {
          width: cellW,
          align: "center",
          characterSpacing: 2,
          lineBreak: false,
        });
    });
    doc.y = gridTop + Math.ceil(STROOP_WORDS.length / cols) * cellH + 16;
    doc
      .font("Helvetica")
      .fontSize(8.5)
      .fillColor(SOFT)
      .text(
        lang === "es"
          ? "Primera pasada: lea cada palabra en voz alta. Segunda pasada: diga el color de la tinta en voz alta. Leerla dos veces es una serie. Realice 3 series."
          : "First pass: read each word out loud. Second pass: read the color of the ink out loud. Reading through twice is one set. Perform 3 sets.",
        MARGIN_X,
        doc.y,
        { width: pageWidth, lineGap: 1.8 }
      );
    doc.moveDown(0.6);
  }

  /* ---------- Contact box ---------- */
  const contactLineHeight = 78;
  ensureSpace(contactLineHeight + 30);
  doc.moveDown(0.6);
  const boxY = doc.y;
  doc
    .save()
    .roundedRect(MARGIN_X, boxY, pageWidth, contactLineHeight, 8)
    .fillColor("#F2F9FD")
    .fill()
    .restore();
  doc
    .font("Helvetica-Bold")
    .fontSize(10.5)
    .fillColor(NAVY)
    .text(L.contactTitle, MARGIN_X + 14, boxY + 12);
  const colW = (pageWidth - 28) / 3;
  const cols: Array<[string, string[]]> = [
    [L.office, ["(844) 699-2273", L.hours]],
    [lang === "es" ? "Fuera del horario" : "After hours", [L.afterHours]],
    [L.portal, [L.portalValue]],
  ];
  cols.forEach(([head, lines], i) => {
    const x = MARGIN_X + 14 + i * colW;
    doc
      .font("Helvetica-Bold")
      .fontSize(8)
      .fillColor(BLUE)
      .text(head.toUpperCase(), x, boxY + 32, { width: colW - 10, characterSpacing: 0.6 });
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor(GRAY)
      .text(lines.join("\n"), x, boxY + 43, { width: colW - 10, lineGap: 1.6 });
  });
  doc.y = boxY + contactLineHeight + 14;

  /* ---------- Disclaimer ---------- */
  doc
    .font("Helvetica-Oblique")
    .fontSize(7.8)
    .fillColor(SOFT)
    .text(L.disclaimer, MARGIN_X, doc.y + 4, { width: pageWidth, lineGap: 1.8 });

  /* ---------- Footers on every page ---------- */
  const [mm, yyyy] = (() => {
    const d = new Date(`${r.lastReviewed}T00:00:00`);
    return [
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getFullYear()),
    ];
  })();
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    const fy = doc.page.height - 46;
    doc
      .moveTo(MARGIN_X, fy - 8)
      .lineTo(doc.page.width - MARGIN_X, fy - 8)
      .lineWidth(0.7)
      .strokeColor("#D5E2EA")
      .stroke();
    doc
      .font("Helvetica")
      .fontSize(7.5)
      .fillColor(SOFT)
      .text("Complete Care · (844) 699-2273 · www.complete-care.com", MARGIN_X, fy, {
        lineBreak: false,
      });
    doc
      .font("Helvetica")
      .fontSize(7.5)
      .fillColor(SOFT)
      .text(
        `${L.published} ${mm}.${yyyy} | ${L.page} ${i + 1} ${L.of} ${range.count}`,
        0,
        fy,
        { width: doc.page.width - MARGIN_X, align: "right", lineBreak: false }
      );
  }

  doc.end();
  const pdf = await finished;

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${slug}-${lang}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
