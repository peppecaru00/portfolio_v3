import { siteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export async function GET() {
  const body = [`User-agent: *`, `Allow: /`, `Sitemap: ${siteUrl}/sitemap.xml`, `Host: ${siteUrl}`].join("\n");
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
