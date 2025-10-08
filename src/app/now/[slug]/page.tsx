import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

interface NowDetail {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  body: any;
  images?: any[];
}

const NOW_DETAIL_QUERY = `
  *[_type == "now" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    body,
    images
  }
`;

export default async function NowDetailPage({ params }: { params: { slug: string } }) {
  const entry: NowDetail | null = await client.fetch(NOW_DETAIL_QUERY, { slug: params.slug }, {
    next: { tags: ["now"], revalidate: 60 },
  });

  if (!entry) {
    return (
      <main className="container mx-auto p-8 max-w-3xl">
        <h1 className="text-2xl font-semibold">Not found</h1>
        <p className="text-gray-600 mt-2">We couldn’t find this now post.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{entry.title}</h1>
      <p className="text-sm text-gray-500 mb-8">
        {new Date(entry.publishedAt).toISOString().split("T")[0]}
      </p>

      <article className="prose max-w-none">
        {entry.body && (
          <div className="mb-8">
            <PortableText value={entry.body} />
          </div>
        )}

        {entry.images?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {entry.images.map((img, idx) => (
              <img
                key={idx}
                src={urlFor(img).width(1200).height(800).fit("max").url()}
                alt={img?.alt || entry.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            ))}
          </div>
        ) : null}
      </article>
    </main>
  );
}