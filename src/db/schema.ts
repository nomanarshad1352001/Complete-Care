import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * Patient education resources ("instruction sheets").
 * Content is stored in a lightweight staff-friendly block format
 * (see src/lib/resources/format.ts) in both English and Spanish so staff
 * can add/edit materials without touching code.
 */
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  /** URL slug, e.g. "after-your-knee-arthroscopy" */
  slug: text("slug").notNull().unique(),
  /** One of the six category slugs defined in src/lib/resources/categories.ts */
  category: text("category").notNull(),
  titleEn: text("title_en").notNull(),
  titleEs: text("title_es").notNull(),
  summaryEn: text("summary_en").notNull(),
  summaryEs: text("summary_es").notNull(),
  /** Body content in block format (English) */
  contentEn: text("content_en").notNull(),
  /** Body content in block format (Spanish) */
  contentEs: text("content_es").notNull(),
  /** Comma-separated search keywords (both languages) */
  keywords: text("keywords").notNull().default(""),
  /** Surface on the directory "common resources" row */
  featured: boolean("featured").notNull().default(false),
  /** Clinical last-reviewed date shown on page & PDF */
  lastReviewed: date("last_reviewed").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Resource = typeof resources.$inferSelect;
export type NewResource = typeof resources.$inferInsert;
