import type { NextApiRequest, NextApiResponse } from 'next';
import { getPosts } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const posts = await getPosts();
    const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL || 'https://blog.deano.ai';
    const blogName = process.env.NEXT_PUBLIC_BLOG_NAME || 'Deano.AI Blog';
    const blogDescription =
      process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || 'Tech insights and automation';

    const rss = generateRSS(posts, baseUrl, blogName, blogDescription);

    res.setHeader('Content-Type', 'application/rss+xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.write(rss);
    res.end();
  } catch (error) {
    console.error('Error generating RSS:', error);
    res.status(500).json({ error: 'Failed to generate RSS feed' });
  }
}

function generateRSS(
  posts: any[],
  baseUrl: string,
  blogName: string,
  blogDescription: string
): string {
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(blogName)}</title>
    <link>${escapeXml(baseUrl)}</link>
    <description>${escapeXml(blogDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${escapeXml(baseUrl)}/og-image.png</url>
      <title>${escapeXml(blogName)}</title>
      <link>${escapeXml(baseUrl)}</link>
    </image>
`;

  posts.forEach((post) => {
    rss += `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(`${baseUrl}/posts/${post.slug}`)}</link>
      <guid>${escapeXml(`${baseUrl}/posts/${post.slug}`)}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      <author>${escapeXml(post.author)}</author>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <lastBuildDate>${new Date(post.updated_at).toUTCString()}</lastBuildDate>
      ${post.tags.map((tag: string) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>
`;
  });

  rss += `
  </channel>
</rss>`;

  return rss;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}
