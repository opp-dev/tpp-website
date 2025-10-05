import Image from "next/image";
import { client } from '@/sanity/client';
import Link from 'next/link';

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
  alt?: string; // Alt text is optional
}

interface Post {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  author: Author;
  mainImage?: MainImage; // Main image is optional
  categories: Category[];
}

const POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    
    // Follow the 'author' reference to get the author's name
    author->{
      name
    },
    
    // Select the mainImage fields, and follow the 'asset' reference for the URL
    mainImage {
      asset->{
        url
      },
      alt
    },
    
    // For the array of 'categories', follow each reference to get the title
    categories[]->{
      title
    }
  }
`;
export default async function HomePage() {
  
  // Fetch the strongly-typed data from Sanity
  // The 'client' should be imported from your configured 'src/sanity/client.ts'
  const posts: Post[] = await client.fetch(POSTS_QUERY, {}, { 
    // Recommended: Use cache options for performance on Vercel
    next: { tags: ['post'], revalidate: 60 }
  });

  if (!posts || posts.length === 0) {
    return (
      <main className="container mx-auto p-8 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900">The Product Papers</h1>
        <p className="mt-4 text-xl text-gray-500">
            Welcome! It looks like there are no published posts yet.
        </p>
      </main>
    );
  }

  return (
    <div className="font-sans min-h-screen">
      <main className="container mx-auto p-8 max-w-4xl pt-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Latest Articles from The Product Papers</h1>

        <section className="space-y-10">
          {posts.map((post) => (
            <article key={post._id} className="border-b border-gray-200 pb-8">
              
              {/* Image (Optional) */}
              {post.mainImage?.asset?.url && (
                <img 
                  src={post.mainImage.asset.url} 
                  alt={post.mainImage.alt || post.title} 
                  className="w-full h-64 object-cover rounded-lg mb-4 shadow-md"
                />
              )}

              {/* Title and Link */}
              <Link href={`/blog/${post.slug}`} passHref>
                <h2 className="text-3xl font-bold text-indigo-700 hover:text-indigo-900 transition duration-150 cursor-pointer">
                  {post.title}
                </h2>
              </Link>

              {/* Metadata */}
              <p className="text-sm text-gray-500 mt-2">
                By **{post.author.name}** on {new Date(post.publishedAt).toISOString().split('T')[0]}
              </p>
              
              {/* Categories/Tags */}
              {post.categories?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.categories.map((c, index) => (
                    <span key={index} className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      {c.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Read More Link */}
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-base font-semibold text-teal-600 hover:text-teal-800 transition duration-150">
                Continue reading &rarr;
              </Link>
            </article>
          ))}
        </section>
      </main>

      {/* Re-added your custom footer content */}
      <footer className="mt-16 border-t border-gray-200 py-4 text-center text-sm text-gray-500">
          <p>The Product Papers &copy; {new Date().getFullYear()} Suryanshu Rai. Designed and coded with love in Altona.</p>
      </footer>
    </div>
  );
}