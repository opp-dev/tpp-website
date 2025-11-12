import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";

interface NowPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  body: any;
  images?: any[];
}

const NOW_PAGINATED_QUERY = `
  *[_type == "now"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          url,
          metadata {
            dimensions
          }
        }
      }
    },
    images
  }
`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "0");
  const limit = parseInt(searchParams.get("limit") || "5");
  
  const start = page * limit;
  const end = start + limit;
  
  try {
    const posts: NowPost[] = await client.fetch(
      NOW_PAGINATED_QUERY,
      { start, end },
      { next: { tags: ["now"], revalidate: 60 } }
    );
    
    return NextResponse.json({ posts, hasMore: posts.length === limit });
  } catch (error) {
    console.error("Error fetching now posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
