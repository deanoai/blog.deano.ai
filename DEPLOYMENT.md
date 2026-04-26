# Deployment Guide

## Vercel Deployment (Recommended)

### Step 1: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Select "Import Git Repository"
4. Choose **deanoai/blog.deano.ai**
5. Click "Import"

### Step 2: Configure Environment Variables

In Vercel's project settings, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
NEXT_PUBLIC_BLOG_URL=https://blog.deano.ai
NEXT_PUBLIC_BLOG_NAME=Deano.AI Blog
NEXT_PUBLIC_BLOG_DESCRIPTION=Insights on AI, automation, and tech
```

**Get these from Supabase:**
- Go to your Supabase project dashboard
- Settings → API
- Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy `service_role` key → `SUPABASE_SERVICE_KEY` (⚠️ Keep this secret!)

### Step 3: Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Your blog is live at `https://blog.deano.ai`

### Step 4: Configure Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain (e.g., `blog.deano.ai`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (usually 5-30 minutes)

## Database Setup

Before first deployment, set up your Supabase database:

### Create the Posts Table

1. Go to your Supabase project dashboard
2. Click "SQL Editor" (or "Database" → "SQL")
3. Run this SQL:

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

-- Enable Row Level Security
alter table posts enable row level security;

-- Allow public read for published posts
create policy "Allow public read for published posts" on posts
  for select using (published = true);

-- Allow authenticated users to manage posts (requires JWT)
create policy "Allow authenticated users" on posts
  using (true)
  with check (true);

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

### Add a Sample Post (Optional)

```sql
insert into posts (title, slug, excerpt, content, author, published, tags) values (
  'Welcome to Deano.AI Blog',
  'welcome-to-deano-ai-blog',
  'This is our first post on the Deano.AI blog. We''re excited to share insights on AI and automation.',
  '<h2>Welcome!</h2><p>This is the beginning of an exciting journey into AI, automation, and technology.</p>',
  'Team Deano',
  true,
  array['welcome', 'announcement']
);
```

## Local Development

### Prerequisites

```bash
node --version  # Should be 18+
npm --version   # Should be 9+
```

### Setup

```bash
# Clone the repository
git clone https://github.com/deanoai/blog.deano.ai.git
cd blog.deano.ai

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Edit with your Supabase credentials
nano .env.local
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## Monitoring & Maintenance

### Check Deployment Status

1. Go to Vercel dashboard
2. Select your project
3. Check "Deployments" tab

### View Logs

```bash
# View recent deployments
vercel list

# View logs for a deployment
vercel logs <deployment-url>
```

### Update Blog Content

1. Add/edit posts in Supabase dashboard
2. Changes automatically appear after ISR revalidation (max 1 hour)
3. Or manually trigger revalidation in Vercel

## Performance Optimization

### Image Optimization

- Upload featured images to Supabase Storage
- Use URLs in the `featured_image` field
- Next.js automatically optimizes on first request

### Database Indexes

Indexes are automatically created (see SQL above). Monitor performance:

1. Go to Supabase dashboard
2. Check "Inspect" for query performance
3. Add more indexes if needed

### Caching Strategy

- Static pages revalidated every 3600 seconds (1 hour)
- API endpoints cached for 3600 seconds
- Manual revalidation available via Vercel API

## Troubleshooting

### Posts Not Showing

**Check:**
- [ ] Posts have `published = true`
- [ ] Environment variables are correct
- [ ] Supabase is running and accessible
- [ ] Check Vercel logs for errors

```bash
vercel logs --follow
```

### Build Failures

**Common causes:**
- Missing environment variables
- Syntax errors in markdown
- Node version mismatch

**Fix:**
1. Check Vercel build logs
2. Ensure Node 18+ is selected
3. Redeploy from Vercel dashboard

### Styling Issues

**Clear cache:**
```bash
# Local
rm -rf .next
npm run build

# On Vercel
Click "Redeploy" → "Yes, redeploy"
```

## Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm update next

# Install new package
npm install <package-name>

# Commit and push
git add .
git commit -m "Update dependencies"
git push origin main
```

Vercel will automatically redeploy on push.

## Environment Variables Reference

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | String | ✅ Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | String | ✅ Yes | Supabase public key |
| `SUPABASE_SERVICE_KEY` | String | ✅ Yes | Supabase service role key (keep secret!) |
| `NEXT_PUBLIC_BLOG_URL` | String | ⚠️ Optional | Blog URL (default: `https://blog.deano.ai`) |
| `NEXT_PUBLIC_BLOG_NAME` | String | ⚠️ Optional | Blog name (default: `Deano.AI Blog`) |
| `NEXT_PUBLIC_BLOG_DESCRIPTION` | String | ⚠️ Optional | Blog description (default: `Insights on AI, automation, and tech`) |
| `NEXT_PUBLIC_GA_ID` | String | ⚠️ Optional | Google Analytics ID |

## Backup & Recovery

### Backup Database

```bash
# Export posts as JSON
# Use Supabase dashboard → Database → Download backup
```

### Backup Code

```bash
# Clone from GitHub
git clone https://github.com/deanoai/blog.deano.ai.git backup-$(date +%Y%m%d)
```

## Support

- 📚 [Next.js Documentation](https://nextjs.org/docs)
- 🗄️ [Supabase Documentation](https://supabase.com/docs)
- 🚀 [Vercel Documentation](https://vercel.com/docs)
- 🐛 [GitHub Issues](https://github.com/deanoai/blog.deano.ai/issues)

---

Happy blogging! 🎉
