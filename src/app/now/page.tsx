import Link from "next/link";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/lib/image";

interface NowListItem {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  bodyPlain?: string;
  images?: any[];
}

const NOW_LIST_QUERY = `
  *[_type == "now"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "bodyPlain": pt::text(body),
    images
  }
`;

export default async function NowListPage() {
  const items: NowListItem[] = await client.fetch(NOW_LIST_QUERY, {}, {
    next: { tags: ["now"], revalidate: 60 },
  });

  return (
    <main className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Now</h1>
      {(!items || items.length === 0) && (
        <p className="text-gray-600">No updates yet. Check back soon!</p>
      )}

      <section className="space-y-10">
        {items?.map((it) => {
          const firstImage = it.images?.[0];
          const imgUrl = firstImage ? urlFor(firstImage).width(1200).height(630).fit("crop").url() : undefined;
          const snippet = (it.bodyPlain || "").slice(0, 220) + ((it.bodyPlain || "").length > 220 ? "…" : "");
          return (
            <article key={it._id} className="border-b border-gray-200 pb-8">
              {imgUrl && (
                <img
                  src={imgUrl}
                  alt={firstImage?.alt || it.title}
                  className="w-full h-64 object-cover rounded-lg mb-4 shadow-md"
                />
              )}

              <Link href={`/now/${it.slug}`}>
                <h2 className="text-2xl font-bold text-indigo-700 hover:text-indigo-900 transition duration-150">
                  {it.title}
                </h2>
              </Link>

              <p className="text-sm text-gray-500 mt-1">
                {new Date(it.publishedAt).toISOString().split("T")[0]}
              </p>

              <p className="mt-4 text-gray-700 leading-relaxed">{snippet}</p>

              <Link
                href={`/now/${it.slug}`}
                className="mt-4 inline-block text-base font-semibold text-teal-600 hover:text-teal-800 transition duration-150"
              >
                Read more →
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}
