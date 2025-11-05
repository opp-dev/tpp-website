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
        <h1 className="typography-h1 text-gray-900">The Product Papers</h1>
        <p className="mt-4">
            Welcome! It looks like there are no published posts yet.
        </p>
      </main>
    );
  }

  return (
    <div className="font-sans min-h-screen">
      <main className="container mx-auto p-8 max-w-4xl pt-10">
        {/* Introduction Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to The Product Papers</h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              Product development is the art and science of turning ideas into reality. It's where creativity meets 
              strategy, where user needs intersect with business goals, and where innovation transforms into impact.
            </p>
            <p className="mb-4">
              Whether you're building digital products, physical goods, or services, the principles remain the same: 
              understand your users, validate your assumptions, iterate quickly, and always keep the bigger picture in mind.
            </p>
            <p>
              Here at The Product Papers, you'll find insights on product strategy, development methodologies, 
              user research, market analysis, and the stories behind successful products. Expect practical advice, 
              real-world case studies, and thoughtful analysis that you can apply to your own product journey.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Let's Connect</h2>
          <div className="text-center">
            <p className="mb-6">
              Have questions about product development? Want to share your own insights? 
              I'd love to hear from you and discuss all things product.
            </p>
            <p className="mb-6">
              Whether you're a seasoned product manager, an aspiring entrepreneur, or someone curious about 
              the product development process, let's start a conversation.
            </p>
            <div className="inline-block">
              <a 
                href="mailto:contact@productpapers.com" 
                className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>

        <h1 className="typography-h1 text-gray-900 mb-10">Latest Articles from The Product Papers</h1>

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

              <div className="mt-4 text-gray-700">
  {/* Display the raw JSON string of the Portable Text for testing */}
  <div className="mt-4 text-gray-700">
  <p>
    {/* Access the first block -> first child -> text property */}
    {post.body?.[0]?.children?.[0]?.text}
  </p>
</div>
</div>
              
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
    </div>
  );
}