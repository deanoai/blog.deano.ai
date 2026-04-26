import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useState } from 'react';
import { getPostBySlug, getPosts } from '@/lib/supabase';
import { estimateReadingTime } from '@/lib/markdown';
import { formatDistanceToNow } from 'date-fns';
import type { Post } from '@/lib/supabase';

interface PostPageProps {
  post: Post | null;
}

export default function PostPage({ post }: PostPageProps) {
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Post not found</h1>
        <Link href="/posts" className="text-blue-600 hover:text-blue-700">
          ← Back to posts
        </Link>
      </div>
    );
  }

  const readingTime = estimateReadingTime(post.content);
  const shareUrl = `https://blog.deano.ai/posts/${post.slug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.excerpt}
        canonical={shareUrl}
        openGraph={{
          type: 'article',
          url: shareUrl,
          title: post.title,
          description: post.excerpt,
          images: post.featured_image
            ? [
                {
                  url: post.featured_image,
                  width: 1200,
                  height: 630,
                  alt: post.title,
                },
              ]
            : undefined,
          article: {
            publishedTime: post.created_at,
            modifiedTime: post.updated_at,
            authors: [post.author],
            tags: post.tags,
          },
        }}
      />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header */}
        <header className="mb-12">
          <Link
            href="/posts"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            ← Back to posts
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-6">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-t border-b border-gray-200 py-4">
            <div>
              <span className="font-semibold">{post.author}</span>
            </div>
            <div>·</div>
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <div>·</div>
            <span>{readingTime} min read</span>
            {post.updated_at && post.updated_at !== post.created_at && (
              <>
                <div>·</div>
                <span>
                  Updated {formatDistanceToNow(new Date(post.updated_at), { addSuffix: true })}
                </span>
              </>
            )}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 hover:bg-blue-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="mb-12 rounded-lg overflow-hidden bg-gray-200 h-96">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none mb-12 text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="font-semibold text-gray-900 mb-4">Share this post</h3>
          <div className="flex gap-4 flex-wrap">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 font-medium"
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 font-medium"
            >
              Share on LinkedIn
            </a>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium"
            >
              {copied ? '✓ Copied' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Author Box */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">About the Author</h3>
            <p className="text-gray-600">
              {post.author} is a contributor to Deano.AI Blog. Follow for more insights
              on AI, automation, and tech strategy.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug);
    return {
      props: { post },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    const posts = await getPosts();
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}
