/**
 * Lightweight "block format" for patient instruction sheets.
 *
 * Staff write content in plain text. The parser below converts it into
 * structured blocks that we render both on the web and inside PDFs.
 *
 *   ## Heading ............ section heading
 *   - item ................ bullet list (consecutive lines are grouped)
 *   1. step ............... numbered steps (consecutive lines are grouped)
 *   > note ................ blue callout box
 *   ! warning ............. amber caution box
 *   anything else ......... paragraph
 *   --- ................... divider
 */

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "warning"; text: string }
  | { type: "divider" };

export function parseBlocks(raw: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = raw.split(/\r?\n/);
  let bullets: string[] = [];
  let steps: string[] = [];

  const flushBullets = () => {
    if (bullets.length) {
      blocks.push({ type: "bullets", items: bullets });
      bullets = [];
    }
  };
  const flushSteps = () => {
    if (steps.length) {
      blocks.push({ type: "steps", items: steps });
      steps = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (!trimmed || trimmed === "---") {
      flushBullets();
      flushSteps();
      if (trimmed === "---") blocks.push({ type: "divider" });
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flushBullets();
      flushSteps();
      blocks.push({ type: "heading", text: trimmed.slice(3).trim() });
      continue;
    }
    if (trimmed.startsWith("- ")) {
      flushSteps();
      bullets.push(trimmed.slice(2).trim());
      continue;
    }
    const stepMatch = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
    if (stepMatch) {
      flushBullets();
      steps.push(stepMatch[2].trim());
      continue;
    }
    if (trimmed.startsWith("> ")) {
      flushBullets();
      flushSteps();
      blocks.push({ type: "callout", text: trimmed.slice(2).trim() });
      continue;
    }
    if (trimmed.startsWith("! ")) {
      flushBullets();
      flushSteps();
      blocks.push({ type: "warning", text: trimmed.slice(2).trim() });
      continue;
    }
    flushBullets();
    flushSteps();
    blocks.push({ type: "paragraph", text: trimmed });
  }
  flushBullets();
  flushSteps();
  return blocks;
}

/** Count headings to estimate reading structure (used for PDF page heuristics). */
export function sectionCount(blocks: ContentBlock[]): number {
  return blocks.filter((b) => b.type === "heading").length;
}
