import { client } from '@/sanity/client';
import BlogPostList from '@/components/BlogPostList';

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

const POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    body,
    abstract,
    
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
        {posts.length === 0 ? (
          <p>No posts published yet.</p>
        ) : (
          <BlogPostList posts={posts} />
        )}
      </main>
    </div>
  );
}
