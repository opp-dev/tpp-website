import Image from "next/image";
import { client } from '@/sanity/client';
import Link from 'next/link';
import HomePagePostCard from '@/components/HomePagePostCard';
import EmailCopyLink from '@/components/EmailCopyLink';
import Container from '@/components/Container';
import TextSection from '@/components/TextSection';
import { TextDefault, TextNarrow } from '@/components/TextLayout';

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
  abstract?: string;
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
    abstract,
    
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
      <main className="pb-16">
        {/* Introduction Section */}
        <Container className="min-h-screen flex flex-col justify-center pb-[15vh]">
          <TextSection>
            <TextDefault className="typography-h3">
              How are very really good things made?
            </TextDefault>
            <TextNarrow className="typography-body">
              <p>
                The problem with attempting to make exceptional things is that they have to be exceptional in so many little ways.
              </p>
              <p>
                Here I explore if there can be a method to this or is it just pure chaos that can this about. Join me as I try to find some answers and try to make very really good things.
              </p>
            </TextNarrow>
          </TextSection>
        </Container>

        <div className="mx-auto px-6 mb-20 lg:mb-40" style={{ maxWidth: '1280px' }}>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-[240px]">
            {/* Left Column - Title */}
            <div className="flex-shrink-0">
              <h3 className="typography-h3 font-medium">Latest Explorations</h3>
            </div>

            {/* Right Column - Articles */}
            <div className="flex-1">
              <div className="space-y-8">
                {posts.slice(0, 5).map((post) => (
                  <div key={post._id} className="border-b border-gray-100 pb-8 last:border-0">
                    <HomePagePostCard post={post} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <Container className="mb-20">
          <TextSection>
            <TextDefault className="typography-h3">
              Moin Moin!
            </TextDefault>
            <TextNarrow className="typography-body">
              <p>
                Are you trying to make something really very good and need a hand? Or you have some answers or questions to contribute? Either way I would love to hear from you. Drop me a line at <EmailCopyLink email="suryanshu.rai@orbitlabs.de" /> and I will get back to you!
              </p>
            </TextNarrow>
          </TextSection>
        </Container>
      </main>
    </div>
  );
}