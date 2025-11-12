'use client'

import { useState, useMemo } from 'react';
import BlogPostCard from '@/components/BlogPostCard';
import CategoryFilter from '@/components/CategoryFilter';

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

interface BlogPostListProps {
  posts: Post[];
}

export default function BlogPostList({ posts }: BlogPostListProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Extract unique categories from all posts
  const allCategories = useMemo(() => {
    const categorySet = new Set<string>();
    posts.forEach(post => {
      post.categories?.forEach(cat => {
        categorySet.add(cat.title);
      });
    });
    return Array.from(categorySet).sort();
  }, [posts]);

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') {
      return posts;
    }
    return posts.filter(post => 
      post.categories?.some(cat => cat.title === selectedCategory)
    );
  }, [posts, selectedCategory]);

  return (
    <>
      <CategoryFilter 
        categories={allCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <section className="max-w-[680px] mx-6 mb-20">
        {filteredPosts.map((post, index) => (
          <div key={post._id}>
            <BlogPostCard post={post} />
            <div className="mt-6" />
            <div className="border-b border-gray-300" />
            {index < filteredPosts.length - 1 && <div className="mb-8" />}
          </div>
        ))}
      </section>
    </>
  );
}
