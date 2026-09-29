import { buildSearchIndex } from "@/lib/search-data";

export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex());
}
