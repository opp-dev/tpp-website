import Link from 'next/link';
import PublishedDate from '@/components/PublishedDate';
import ShareButton from '@/components/ShareButton';

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
  abstract?: string;
  publishedAt: string;
  author: Author;
  mainImage?: MainImage;
  categories: Category[];
}

interface BlogPostCardProps {
  post: Post;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} key={post._id}>
      <article className="pb-4 max-w-[680px] mx-6 cursor-pointer">
        
        {/* Categories above the two columns */}
        {post.categories?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.categories.map((c, index) => (
              <span key={index} className="text-xs font-semibold uppercase tracking-wide text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md">
                {c.title}
              </span>
            ))}
          </div>
        )}

        {/* Two column layout */}
        <div className="flex gap-6">
          {/* Left side - Text content */}
          <div className="max-w-[464px] flex-shrink-0">
            <h4 className="typography-h4 mb-2">
              {post.title}
            </h4>

            {post.abstract && (
              <p className="typography-body-sm mb-4">
                {post.abstract}
              </p>
            )}

            <div className="flex items-center justify-between">
              <PublishedDate date={post.publishedAt} />
              <ShareButton />
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex-1 flex flex-col items-end">
            {post.mainImage?.asset?.url && (
              <img 
                src={post.mainImage.asset.url} 
                alt={post.mainImage.alt || post.title} 
                className="min-w-[160px] max-h-[110px] object-cover rounded"
              />
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
