# Deano.AI Blog

A modern, SEO-optimized tech blog built with Next.js, Markdown support, Supabase backend, and Vercel deployment.

## Features

✨ **Key Features:**
- 📝 Markdown-based posts with syntax highlighting
- 🗄️ Supabase PostgreSQL database for post management
- 🚀 Next.js static generation with ISR (Incremental Static Regeneration)
- 🎨 Tailwind CSS for responsive design
- 🔍 Full-text search with tag filtering
- 📱 Mobile-friendly responsive layout
- 🎯 SEO-optimized (Open Graph, Twitter Cards, Structured Data)
- 📡 RSS feed support
- 🗺️ Auto-generated sitemaps
- ⚡ Fast, lightweight, and performant
- 🔄 Real-time updates with Supabase

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS 3
- **Database:** Supabase (PostgreSQL)
- **Markdown:** next-mdx-remote, gray-matter
- **Syntax Highlighting:** rehype-highlight
- **SEO:** next-seo
- **Date Utilities:** date-fns
- **Language:** TypeScript

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project
- GitHub account

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/deanoai/blog.deano.ai.git
cd blog.deano.ai
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
NEXT_PUBLIC_BLOG_URL=https://blog.deano.ai
NEXT_PUBLIC_BLOG_NAME=Deano.AI Blog
NEXT_PUBLIC_BLOG_DESCRIPTION=Insights on AI, automation, and tech
```

### Create Database Tables

Run this SQL in your Supabase SQL Editor:

```sql
-- Create posts table
create table posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  author text not null,
  published boolean default false,
  tags text[] default array[]::text[],
  featured_image text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Create indexes
create index posts_slug_idx on posts(slug);
create index posts_published_idx on posts(published);
create index posts_created_at_idx on posts(created_at desc);

-- Create updated_at trigger
create function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_update_updated_at
before update on posts
for each row
execute function update_updated_at();
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── components/       # Reusable React components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── PostCard.tsx
├── lib/             # Utility functions and API clients
│   ├── supabase.ts  # Supabase database operations
│   ├── markdown.ts  # Markdown processing utilities
│   └── seo.ts       # SEO utilities
├── pages/           # Next.js pages and API routes
│   ├── api/
│   │   ├── rss.ts   # RSS feed endpoint
│   │   └── sitemap.ts
│   ├── posts/
│   │   ├── index.tsx       # All posts page
│   │   └── [slug].tsx      # Individual post page
│   ├── _app.tsx     # App wrapper
│   ├── _document.tsx # Document wrapper
│   ├── index.tsx    # Home page
│   ├── about.tsx
│   ├── privacy.tsx
│   └── terms.tsx
└── styles/          # Global CSS
    └── globals.css
```

## Creating Posts

### Via Supabase Dashboard

1. Go to your Supabase project
2. Open the `posts` table
3. Insert a new row with:
   - `title`: Post title
   - `slug`: URL-friendly name (e.g., "my-first-post")
   - `excerpt`: Brief description
   - `content`: Markdown content with HTML (use `markdownToHtml()`)
   - `author`: Author name
   - `published`: true to publish
   - `tags`: Array of tags (e.g., `["ai", "automation"]`)
   - `featured_image`: Optional image URL

### Via API (Programmatic)

```typescript
import { createPost } from '@/lib/supabase';

await createPost({
  title: 'My Post',
  slug: 'my-post',
  excerpt: 'A brief excerpt',
  content: '<h2>Heading</h2><p>Content...</p>',
  author: 'Your Name',
  tags: ['tag1', 'tag2'],
  published: true,
});
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/deanoai/blog.deano.ai.git
git branch -M main
git push -u origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Add environment variables from `.env.local`
   - Click "Deploy"

3. **Configure custom domain:**
   - Go to project settings
   - Add your domain
   - Configure DNS records as instructed

### Environment Variables in Vercel

Add the following in Vercel Project Settings → Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_KEY`
- `NEXT_PUBLIC_BLOG_URL` (e.g., https://blog.deano.ai)

## Features in Detail

### SEO Optimization

- **Meta Tags:** Automatic generation of meta tags for all pages
- **Open Graph:** Rich previews on social media
- **Structured Data:** JSON-LD schema for articles
- **Sitemap:** Auto-generated at `/api/sitemap`
- **RSS Feed:** Available at `/api/rss`
- **Canonical URLs:** Prevents duplicate content issues

### Search and Filtering

- Full-text search across post titles and content
- Filter by tags
- Real-time search results

### Syntax Highlighting

Posts support code blocks with syntax highlighting:

````markdown
```typescript
const greet = (name: string) => `Hello, ${name}!`;
```
````

## API Endpoints

- `GET /api/rss` - RSS feed
- `GET /api/sitemap` - XML sitemap

## Customization

### Colors

Edit `tailwind.config.js` to customize colors:

```js
colors: {
  brand: {
    50: '#f0f7ff',
    // ... customize brand colors
  }
}
```

### Typography

Edit `src/styles/globals.css` to customize fonts and sizes.

### Components

All components are in `src/components/`. Customize Navigation, Footer, and PostCard as needed.

## Performance Tips

- ✅ Static generation with ISR (Incremental Static Regeneration)
- ✅ Image optimization with Next.js Image component
- ✅ CSS-in-JS with Tailwind (minimal CSS footprint)
- ✅ Database indexing for fast queries
- ✅ CDN-ready for Vercel edge caching

## Troubleshooting

### Posts not showing up?
- Ensure `published: true` in the posts table
- Check that Supabase environment variables are correct
- Rebuild the site: `npm run build`

### Styling not applying?
- Clear the `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

### Search not working?
- Verify Supabase database has content
- Check browser console for errors

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions:
- 🐛 Open an issue on GitHub
- 💬 Visit [Deano.AI](https://deano.ai)
- 📧 Contact via the website

## Changelog

### v0.1.0 (Initial Release)
- ✨ Complete Next.js blog scaffold
- 📝 Markdown support with syntax highlighting
- 🗄️ Supabase database integration
- 🎨 Tailwind CSS responsive design
- 🔍 Search and filtering
- 📱 Mobile-friendly
- 🎯 Full SEO optimization
- 📡 RSS feed
- 🗺️ Sitemap generation
- 🚀 Ready for Vercel deployment

---

Built with ❤️ by [Deano.AI](https://deano.ai)
