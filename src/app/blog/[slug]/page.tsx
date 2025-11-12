import { client } from '@/sanity/client';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Author {
  name: string;
  image?: {
    asset: {
      url: string;
    };
  };
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
  readingTime?: number;
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
    readingTime,
    body,
    author->{
      name,
      image {
        asset->{
          url
        }
      }
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
      <main className="container mx-auto pt-32 py-12">

        {/* Article Header */}
        <article>
          <header className="pb-20 flex flex-col gap-6">
            {/* Tag and Publish Date Section */}
            <div className="flex items-center justify-center gap-12">
              {/* Category Tag */}
              {post.categories?.length > 0 && (
                <span className="link-mono border px-2 py-.5 rounded-sm" style={{ color: 'var(--color-text-lighter)' }} >
                  {post.categories[0].title}
                </span>
              )}
              
              {/* Publish Date */}
              <time className="link-mono" style={{ color: 'var(--color-text-lighter)' }} dateTime={post.publishedAt}>
                Published {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>

            {/* Title */}
            <div className="mx-auto max-w-[968px] text-center">
              <h1 className="typography-article-h2">
                {post.title}
              </h1>
            </div>

            {/* Abstract */}
            <div className="mx-auto max-w-[672px]">
              <h2 className="typography-article-abstract-body text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </h2>
            </div>

            {/* Author and Metadata */}
            <div className="flex gap-16 items-center justify-between max-w-[968px] mx-auto" style={{ color: 'var(--color-text-lighter)' }}>
              {/* Author */}
              <div className="flex items-center gap-2">
                {/* Author Avatar */}
                {post.author.image?.asset?.url ? (
                  <img
                    src={post.author.image.asset.url}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-sm font-semibold">
                    {post.author.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="link-mono" style={{ color: 'var(--color-text-lighter)' }}>{post.author.name}</span>
              </div>

              {/* Reading Time and Share */}
              <div className="flex items-center gap-4">
                {/* Reading Time */}
                {post.readingTime && (
                  <div className="flex items-center gap-2 link-mono" style={{ color: 'var(--color-text-lighter)' }}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{post.readingTime} min</span>
                  </div>
                )}

                {/* Share Button */}
                <button className="flex items-center gap-2 link-mono" style={{ color: 'var(--color-text-lighter)' }}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.mainImage?.asset?.url && (
            <div className="mb-20 mx-auto overflow-hidden rounded-xl shadow-lg" style={{ maxWidth: '968px', maxHeight: '546px' }}>
              <img
                src={post.mainImage.asset.url}
                alt={post.mainImage.alt || post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Body */}
          <div className="mx-auto" style={{ maxWidth: '680px' }}>
            <PortableText 
              value={post.body}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="mb-6 text-lg" style={{ lineHeight: '150%' }}>
                      {children}
                    </p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-4xl font-bold mt-12 mb-6">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="typography-article-h2 mt-10 mb-5">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-bold mt-8 mb-4">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-xl font-bold mt-6 mb-3">
                      {children}
                    </h4>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 my-8 italic bg-gray-50 rounded">
                      {children}
                    </blockquote>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc list-inside mb-6 space-y-2">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal list-inside mb-6 space-y-2">
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
                    <strong className="font-bold">{children}</strong>
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
