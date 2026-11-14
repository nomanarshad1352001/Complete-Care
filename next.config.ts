import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * pdfkit reads its AFM font metrics from disk at runtime. Next.js does not
   * trace those files automatically, so PDF generation would fail on
   * serverless hosts (Vercel) with "StandardFontMetrics missing". Ship them.
   */
  outputFileTracingIncludes: {
    "/api/resources/[slug]/pdf": ["./node_modules/pdfkit/js/data/**"],
  },
};

export default nextConfig;
