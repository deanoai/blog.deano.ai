import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { getPosts } from '@/lib/supabase';
import PostCard from '@/components/PostCard';
import type { Post } from '@/lib/supabase';

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4);

  return (
    <>
      <NextSeo
        title="Home"
        description="Welcome to Deano.AI Blog - Tech insights, automation, and AI strategies"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Hero Section */}
        <section className="mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Deano.AI Blog
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl">
            Exploring the intersection of artificial intelligence, automation, and practical tech strategies. 
            We share insights, tutorials, and thoughts on building the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/posts"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Read All Posts
            </Link>
            <a
              href="https://deano.ai"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Visit Deano.AI
            </a>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Featured</h2>
            <div className="rounded-lg border border-gray-200 bg-blue-50 p-8 sm:p-12">
              <Link href={`/posts/${featuredPost.slug}`} className="inline-block">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 hover:text-blue-600 mb-4 transition-colors">
                  {featuredPost.title}
                </h3>
              </Link>
              <p className="text-lg text-gray-600 mb-6">{featuredPost.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full bg-blue-200 px-3 py-1 text-xs font-semibold text-blue-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/posts/${featuredPost.slug}`}
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
              >
                Read More →
              </Link>
            </div>
          </section>
        )}

        {/* Recent Posts */}
        {recentPosts.length > 0 && (
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Recent Posts</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/posts"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 text-lg"
              >
                View All Posts →
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const posts = await getPosts();
    return {
      props: { posts },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: { posts: [] },
      revalidate: 300,
    };
  }
}
