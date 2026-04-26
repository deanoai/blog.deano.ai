import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  created_at: string;
  featured_image?: string;
  tags: string[];
}

export default function PostCard({
  slug,
  title,
  excerpt,
  author,
  created_at,
  featured_image,
  tags,
}: PostCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      {featured_image && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          <Image
            src={featured_image}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <h2 className="mb-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          <Link href={`/posts/${slug}`}>{title}</Link>
        </h2>

        <p className="mb-4 text-sm text-gray-600">{excerpt}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 hover:bg-blue-200"
            >
              #{tag}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div>
            <span className="font-semibold">{author}</span>
            {' · '}
            <time dateTime={created_at}>
              {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </time>
          </div>
        </div>
      </div>
    </article>
  );
}
