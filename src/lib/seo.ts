export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  type?: 'website' | 'article' | 'blog';
  tags?: string[];
}

export function generateMetaTags(props: SEOProps) {
  const {
    title,
    description,
    canonical,
    image,
    author,
    publishedDate,
    modifiedDate,
    type = 'website',
    tags = [],
  } = props;

  const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL || 'https://blog.deano.ai';
  const canonicalUrl = canonical || baseUrl;
  const imageUrl =
    image ||
    `${baseUrl}/og-image.png`;

  return {
    title,
    description,
    canonical: canonicalUrl,
    openGraph: {
      title,
      description,
      type,
      url: canonicalUrl,
      image: imageUrl,
      ...(author && { article: { authors: [author] } }),
      ...(publishedDate && { article: { publishedTime: publishedDate } }),
      ...(modifiedDate && { article: { modifiedTime: modifiedDate } }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: imageUrl,
    },
    ...(author && { author }),
    ...(publishedDate && { publishedTime: publishedDate }),
    ...(modifiedDate && { modifiedTime: modifiedDate }),
    keywords: tags.join(', '),
  };
}

export function generateStructuredData(
  type: 'BlogPosting' | 'BlogFeed',
  props: any
) {
  const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL || 'https://blog.deano.ai';

  if (type === 'BlogPosting') {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: props.title,
      description: props.description,
      image: props.image,
      datePublished: props.publishedDate,
      dateModified: props.modifiedDate,
      author: {
        '@type': 'Person',
        name: props.author || 'Deano.AI',
      },
      articleBody: props.content,
    };
  }

  if (type === 'BlogFeed') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: process.env.NEXT_PUBLIC_BLOG_NAME || 'Deano.AI Blog',
      description:
        process.env.NEXT_PUBLIC_BLOG_DESCRIPTION ||
        'Tech insights and automation',
      url: baseUrl,
      image: `${baseUrl}/og-image.png`,
      publisher: {
        '@type': 'Organization',
        name: 'Deano.AI',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
        },
      },
    };
  }
}

export function generateSitemap(posts: Array<{ slug: string; updated_at: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL || 'https://blog.deano.ai';

  const urls = [
    {
      url: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '1.0',
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastmod: post.updated_at,
      changefreq: 'weekly',
      priority: '0.8',
    })),
  ];

  return generateSitemapXml(urls);
}

function generateSitemapXml(
  urls: Array<{ url: string; lastmod: string; changefreq: string; priority: string }>
) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach((item) => {
    xml += '  <url>\n';
    xml += `    <loc>${item.url}</loc>\n`;
    xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}
