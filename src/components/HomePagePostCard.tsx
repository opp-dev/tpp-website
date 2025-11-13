import Link from 'next/link';
import PublishedDate from '@/components/PublishedDate';

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

interface HomePagePostCardProps {
  post: Post;
}

export default function HomePagePostCard({ post }: HomePagePostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="cursor-pointer">
        {/* Two column layout */}
        <div className="flex gap-6">
          {/* Left side - Text content */}
          <div className="max-w-[464px] flex-shrink-0">
            <h4 className="typography-h4 mb-4">
              {post.title}
            </h4>

            {post.abstract && (
              <p className="typography-body-sm line-clamp-2">
                {post.abstract}
              </p>
            )}

            <div className="link-mono" style={{ fontSize: '12px', color: '#4b5563'}}>
              <time dateTime={post.publishedAt}>
                Published {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
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
