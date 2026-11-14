import type { Metadata } from "next";
import {
  countByCategory,
  getAllResourceSummaries,
} from "@/lib/resources/queries";
import { ResourcesExplorer } from "@/components/resources/resources-explorer";

export const metadata: Metadata = {
  title: "Patient Resources: Education & Instructions",
  description:
    "Find procedure information, discharge instructions, post-operative guidance, brace instructions, and rehabilitation exercises — searchable, printable, and available in English and Spanish.",
};

export const dynamic = "force-dynamic";

export default async function PatientResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const [resources, counts, params] = await Promise.all([
    getAllResourceSummaries(),
    countByCategory(),
    searchParams,
  ]);

  return (
    <main id="main">
      <ResourcesExplorer
        resources={resources}
        counts={counts}
        initialCategory={params.category ?? ""}
        initialQuery={params.q ?? ""}
      />
    </main>
  );
}
