import { client } from "@/sanity/client";
import NowInfiniteScroll from "./NowInfiniteScroll";

interface NowPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  body: any;
  images?: any[];
}

const NOW_INITIAL_QUERY = `
  *[_type == "now"] | order(publishedAt desc) [0...5] {
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

export default async function NowListPage() {
  const initialPosts: NowPost[] = await client.fetch(NOW_INITIAL_QUERY, {}, {
    next: { tags: ["now"], revalidate: 60 },
  });

  return (
    <main className="pt-24" style={{ maxWidth: '600px', marginLeft: '22%' }}>
      {(!initialPosts || initialPosts.length === 0) && (
        <p>No updates yet. Check back soon!</p>
      )}
      
      {initialPosts && initialPosts.length > 0 && (
        <NowInfiniteScroll initialPosts={initialPosts} />
      )}
    </main>
  );
}
