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
  body: any;
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
    body,
    
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
        <h1 className="typography-h1">The Product Papers</h1>
        <p className="mt-4">
            Welcome! It looks like there are no published posts yet.
        </p>
      </main>
    );
  }

  return (
    <div className="font-sans min-h-screen bg-white">
      <main className="container mx-auto px-6 md:px-8 max-w-5xl pt-12 pb-16">
        {/* Introduction Section */}
        <section className="mb-20">
          <h1>Welcome to The Product Papers</h1>
          <div className="max-w-3xl">
            <p className="text-xl mb-6 leading-relaxed">
              Product development is the art and science of turning ideas into reality. It's where creativity meets 
              strategy, where user needs intersect with business goals, and where innovation transforms into impact.
            </p>
            <p className="text-xl mb-6 leading-relaxed">
              Whether you're building digital products, physical goods, or services, the principles remain the same: 
              understand your users, validate your assumptions, iterate quickly, and always keep the bigger picture in mind.
            </p>
            <p className="text-xl leading-relaxed">
              Here at The Product Papers, you'll find insights on product strategy, development methodologies, 
              user research, market analysis, and the stories behind successful products. Expect practical advice, 
              real-world case studies, and thoughtful analysis that you can apply to your own product journey.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-20 bg-gray-50 border border-gray-200 rounded-2xl p-10 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-tight">Let's Connect</h2>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-lg mb-6 leading-relaxed">
              Have questions about product development? Want to share your own insights? 
              I'd love to hear from you and discuss all things product.
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              Whether you're a seasoned product manager, an aspiring entrepreneur, or someone curious about 
              the product development process, let's start a conversation.
            </p>
            <div className="inline-block">
              <a 
                href="mailto:contact@productpapers.com" 
                className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>

        <h1 className="text-3xl md:text-4xl font-bold mb-12 tracking-tight">Latest Articles</h1>

        <section className="space-y-12">
          {posts.map((post) => (
            <article key={post._id} className="border-b border-gray-100 pb-12 last:border-0">
              
              {/* Image (Optional) */}
              {post.mainImage?.asset?.url && (
                <img 
                  src={post.mainImage.asset.url} 
                  alt={post.mainImage.alt || post.title} 
                  className="w-full h-80 object-cover rounded-xl mb-6"
                />
              )}

              {/* Categories/Tags - Moved to top */}
              {post.categories?.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.categories.map((c, index) => (
                    <span key={index} className="text-xs font-semibold uppercase tracking-wide text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md">
                      {c.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Title and Link */}
              <Link href={`/blog/${post.slug}`} passHref>
                <h2 className="text-3xl md:text-4xl font-bold hover:text-blue-700 transition-colors duration-200 cursor-pointer mb-4 leading-tight">
                  {post.title}
                </h2>
              </Link>

              {/* Metadata */}
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

              {/* Excerpt */}
              <div className="text-lg leading-relaxed mb-6">
                <p>
                  {post.body?.[0]?.children?.[0]?.text}
                </p>
              </div>

              {/* Read More Link */}
              <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-base font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200">
                Read article
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}