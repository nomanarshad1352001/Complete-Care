/**
 * Stroop chart data for the Cognitive Exercises handout.
 * Each word is printed in ink that does NOT match the word — patients first
 * read the words aloud, then name the ink colors aloud.
 */
export interface StroopWord {
  word: string;
  ink: string;
  hex: string;
}

const INK = {
  blue: "#2563eb",
  red: "#dc2626",
  yellow: "#d4a017",
  orange: "#ea580c",
  green: "#16a34a",
  purple: "#9333ea",
} as const;

function w(word: string, inkName: keyof typeof INK): StroopWord {
  return { word, ink: inkName, hex: INK[inkName] };
}

/* 24-word grid following the printed handout order */
export const STROOP_WORDS: StroopWord[] = [
  w("BLUE", "red"),
  w("RED", "blue"),
  w("YELLOW", "green"),
  w("ORANGE", "purple"),
  w("GREEN", "orange"),
  w("BLUE", "yellow"),
  w("PURPLE", "red"),
  w("RED", "green"),
  w("PURPLE", "blue"),
  w("YELLOW", "orange"),
  w("RED", "yellow"),
  w("BLUE", "purple"),
  w("ORANGE", "green"),
  w("BLUE", "orange"),
  w("YELLOW", "red"),
  w("RED", "purple"),
  w("RED", "orange"),
  w("GREEN", "blue"),
  w("ORANGE", "yellow"),
  w("BLUE", "green"),
  w("PURPLE", "orange"),
  w("YELLOW", "purple"),
  w("BLUE", "red"),
  w("ORANGE", "blue"),
];
