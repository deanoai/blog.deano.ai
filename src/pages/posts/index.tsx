import { NextSeo } from 'next-seo';
import { useState, useMemo } from 'react';
import { getPosts } from '@/lib/supabase';
import PostCard from '@/components/PostCard';
import type { Post } from '@/lib/supabase';

interface PostsPageProps {
  posts: Post[];
}

export default function PostsPage({ posts }: PostsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <>
      <NextSeo
        title="All Posts"
        description="Browse all articles from the Deano.AI Blog"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">All Posts</h1>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search posts
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {allTags.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by tag
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedTag === null
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center">
            <p className="text-lg text-gray-600">No posts found matching your criteria.</p>
          </div>
        )}

        {/* Results Summary */}
        <div className="mt-12 text-center text-sm text-gray-600">
          Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
          {selectedTag && ` with tag "${selectedTag}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const posts = await getPosts();
    return {
      props: { posts },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: { posts: [] },
      revalidate: 300,
    };
  }
}
