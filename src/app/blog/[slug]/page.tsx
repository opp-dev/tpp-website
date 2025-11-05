import { client } from '@/sanity/client';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

const POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
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

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await client.fetch(
    `*[_type == "post"]{ "slug": slug.current }`,
    {},
    { next: { tags: ['post'] } }
  );
  
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post: Post = await client.fetch(POST_QUERY, { slug }, { next: { tags: ['post'] } });
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | The Product Papers`,
    description: post.body?.[0]?.children?.[0]?.text || '',
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post: Post = await client.fetch(POST_QUERY, { slug }, { 
    next: { tags: ['post'], revalidate: 60 } 
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="font-sans min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8 transition duration-150"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Articles
        </Link>

        {/* Article Header */}
        <article>
          <header className="mb-10">
            <h1 className="typography-h1 text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center">
                <span className="font-semibold">By {post.author.name}</span>
              </div>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>

            {/* Categories */}
            {post.categories?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.categories.map((category, index) => (
                  <span 
                    key={index} 
                    className="text-sm font-medium bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Featured Image */}
            {post.mainImage?.asset?.url && (
              <div className="mb-10">
                <img
                  src={post.mainImage.asset.url}
                  alt={post.mainImage.alt || post.title}
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            )}
          </header>

          {/* Article Body */}
          <div className="prose prose-lg prose-indigo max-w-none">
            <PortableText 
              value={post.body}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="mb-6 text-gray-800 leading-relaxed text-lg">
                      {children}
                    </p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-6">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-5">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                      {children}
                    </h4>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 my-8 italic text-gray-700 bg-gray-50 rounded">
                      {children}
                    </blockquote>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc list-inside mb-6 space-y-2 text-gray-800">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-800">
                      {children}
                    </ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li className="ml-4">{children}</li>
                  ),
                  number: ({ children }) => (
                    <li className="ml-4">{children}</li>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-bold text-gray-900">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 text-indigo-700 px-2 py-1 rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                  link: ({ children, value }) => (
                    <a 
                      href={value?.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 underline transition duration-150"
                    >
                      {children}
                    </a>
                  ),
                },
                types: {
                  code: ({ value }) => (
                    <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-8">
                      <code className="text-sm font-mono">{value.code}</code>
                    </pre>
                  ),
                },
              }}
            />
          </div>
        </article>

        {/* Back to Articles Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link 
            href="/" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition duration-150"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to All Articles
          </Link>
        </div>
      </main>
    </div>
  );
}
