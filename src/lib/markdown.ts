import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { MDXRemoteSerializeOptions, serialize } from 'next-mdx-remote/serialize';

export interface FrontMatter {
  title: string;
  description: string;
  author: string;
  date: string;
  updated?: string;
  tags?: string[];
  featured_image?: string;
  excerpt?: string;
}

export async function parseFrontMatter(content: string) {
  const { data, content: body } = matter(content);
  return {
    frontMatter: data as FrontMatter,
    content: body,
  };
}

export async function markdownToHtml(markdown: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkToc)
    .use(rehypeStringify)
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings);

  const result = await processor.process(markdown);
  return String(result);
}

export async function serializeMdx(
  content: string,
  options?: MDXRemoteSerializeOptions
) {
  return serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkToc],
      rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings],
    },
    ...options,
  });
}

export function generateTableOfContents(html: string) {
  const headingRegex = /<h([2-3]) id="([^"]+)">([^<]+)<\/h[2-3]>/g;
  const toc: Array<{ level: number; id: string; text: string }> = [];

  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    toc.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3],
    });
  }

  return toc;
}

export function estimateReadingTime(markdown: string): number {
  const wordsPerMinute = 200;
  const wordCount = markdown.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function extractExcerpt(markdown: string, length = 160): string {
  const text = markdown
    .replace(/#.*$/gm, '')
    .replace(/[*_`~\[\]()]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  return text.length > length ? text.substring(0, length) + '...' : text;
}
