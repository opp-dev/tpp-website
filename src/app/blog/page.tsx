import Link from 'next/link';
import { client } from '@/sanity/client';

interface Author {
  name: string;
}

interface Category {
  title: string;
}

interface MainImage {
  asset: {
    url: string;
  };
  alt?: string;
}

interface Post {
  _id: string;
  title: string;
  slug: string;
  body: any;
  publishedAt: string;
  author: Author;
  mainImage?: MainImage;
  categories: Category[];
}

const POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    body,
    
    author->{
      name
    },
    
    mainImage {
      asset->{
        url
      },
      alt
    },
    
    categories[]->{
      title
    }
  }
`;

export default async function BlogPage() {
  const posts: Post[] = await client.fetch(POSTS_QUERY, {}, { 
    next: { tags: ['post'], revalidate: 60 }
  });

  return (
    <div className="font-sans min-h-screen bg-white">
      <main className="container mx-auto px-6 md:px-8 max-w-5xl pt-12 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Blog</h1>
        <p className="text-xl mb-12 max-w-3xl">
          Insights on product strategy, development methodologies, user research, and the stories behind successful products.
        </p>

        {posts.length === 0 ? (
          <p>No posts published yet.</p>
        ) : (
          <section className="space-y-12">
            {posts.map((post) => (
              <article key={post._id} className="border-b border-gray-100 pb-12 last:border-0">
                
                {post.mainImage?.asset?.url && (
                  <img 
                    src={post.mainImage.asset.url} 
                    alt={post.mainImage.alt || post.title} 
                    className="w-full h-80 object-cover rounded-xl mb-6"
                  />
                )}

                {post.categories?.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.categories.map((c, index) => (
                      <span key={index} className="text-xs font-semibold uppercase tracking-wide text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md">
                        {c.title}
                      </span>
                    ))}
                  </div>
                )}

                <Link href={`/blog/${post.slug}`} passHref>
                  <h2 className="text-3xl md:text-4xl font-bold hover:text-blue-700 transition-colors duration-200 cursor-pointer mb-4 leading-tight">
                    {post.title}
                  </h2>
                </Link>

                <div className="flex items-center gap-3 text-sm mb-5">
                  <span className="font-medium">{post.author.name}</span>
                  <span className="opacity-40">·</span>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </time>
                </div>

                <div className="text-lg leading-relaxed mb-6">
                  <p>
                    {post.body?.[0]?.children?.[0]?.text}
                  </p>
                </div>

                <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-base font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Read article
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
