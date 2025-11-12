"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import PublishedDate from "@/components/PublishedDate";
import ShareButton from "@/components/ShareButton";
import Link from "next/link";
import { nowPortableTextComponents } from "./portableTextComponents";

interface NowPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  body: any;
  images?: any[];
}

interface NowInfiniteScrollProps {
  initialPosts: NowPost[];
}

export default function NowInfiniteScroll({ initialPosts }: NowInfiniteScrollProps) {
  const [posts, setPosts] = useState<NowPost[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/now?page=${page}&limit=5`);
      const data = await response.json();

      if (data.posts && data.posts.length > 0) {
        setPosts((prev) => [...prev, ...data.posts]);
        setPage((prev) => prev + 1);
        setHasMore(data.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMorePosts, hasMore, loading]);

  return (
    <>
      <section className="space-y-16">
        {posts.map((post) => (
          <article key={post._id} className="pb-12">
            <Link href={`/now/${post.slug}`}>
              <h2 className="typography-article-h3 mb-8 hover:underline cursor-pointer">
                {post.title}
              </h2>
            </Link>

            <div className="prose max-w-none mb-6">
              {post.body && (
                <PortableText 
                  value={post.body}
                  components={nowPortableTextComponents}
                />
              )}
            </div>

            {post.images?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-6">
                {post.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={urlFor(img).width(1200).height(800).fit("max").url()}
                    alt={img?.alt || post.title}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                ))}
              </div>
            ) : null}
            
            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
              <PublishedDate date={post.publishedAt} />
              <ShareButton url={`${typeof window !== 'undefined' ? window.location.origin : ''}/now/${post.slug}`} />
            </div>
          </article>
        ))}
      </section>

      <div ref={observerTarget} className="py-8">
        {loading && <p className="text-gray-500 text-center">Loading more posts...</p>}
        {!hasMore && posts.length > 0 && (
          <p className="text-gray-500">You have reached the end of the posts. You are like totally obsessed with me! Stop it, you cutie!</p>
        )}
      </div>
    </>
  );
}
