import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * App health check.
 *
 * The Patient Resources site is designed to run with or without a database
 * (it falls back to the bundled content library), so a missing or unreachable
 * database is reported as a status detail — not an app failure. This keeps
 * deploy health checks green on serverless hosts with no DATABASE_URL.
 */
export async function GET() {
  let database: "connected" | "not-configured" | "unreachable";

  if (!process.env.DATABASE_URL) {
    database = "not-configured";
  } else {
    try {
      const { db } = await import("@/db");
      await db.execute(sql`select 1`);
      database = "connected";
    } catch {
      database = "unreachable";
    }
  }

  return Response.json({
    ok: true,
    status: "healthy",
    database,
    contentSource:
      database === "connected" ? "database" : "bundled-library",
  });
}
