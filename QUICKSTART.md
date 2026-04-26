# 🚀 QUICK START GUIDE

Get the Deano.AI blog live in 30 minutes.

## Step 1️⃣ Set Up Supabase (5 min)

```bash
# 1. Go to https://supabase.com
# 2. Create a new project
# 3. Go to Settings → API
# 4. Copy Project URL, anon public, and service_role keys
```

## Step 2️⃣ Create Database Table (2 min)

In Supabase SQL Editor, paste and run:

```sql
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

create index posts_slug_idx on posts(slug);
create index posts_published_idx on posts(published);
create index posts_created_at_idx on posts(created_at desc);

alter table posts enable row level security;

create policy "Allow public read for published posts" on posts
  for select using (published = true);

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

## Step 3️⃣ Deploy to Vercel (5 min)

```bash
# 1. Go to https://vercel.com
# 2. Click "Add New" → "Project"
# 3. Select "deanoai/blog.deano.ai" from GitHub
# 4. Add Environment Variables:
#    NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
#    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
#    SUPABASE_SERVICE_KEY=your-service-key
#    NEXT_PUBLIC_BLOG_URL=https://blog.deano.ai
# 5. Click "Deploy"
# 6. Wait ~2 minutes
```

## Step 4️⃣ Add Custom Domain (5 min)

```bash
# 1. In Vercel, go to Settings → Domains
# 2. Add blog.deano.ai
# 3. Update DNS records as instructed
# 4. Wait 5-30 minutes for propagation
```

## Step 5️⃣ Add First Post (2 min)

In Supabase dashboard:

```
posts table → Insert row →

title: "Welcome to Deano.AI Blog"
slug: "welcome"
excerpt: "Our first blog post..."
content: "<h2>Welcome</h2><p>Content here...</p>"
author: "Christopher"
tags: ["welcome", "announcement"]
published: true
```

## ✅ Done!

Your blog is live at https://blog.deano.ai

---

## 🔧 Local Development

```bash
# Clone
git clone https://github.com/deanoai/blog.deano.ai.git
cd blog.deano.ai

# Install
npm install

# Setup env
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Dev server
npm run dev
# Open http://localhost:3000
```

## 📚 Need Help?

- Full docs: See README.md
- Deployment issues: See DEPLOYMENT.md
- Contributing: See CONTRIBUTING.md

## 🎯 Next Steps

1. ✅ Deploy ← You are here
2. Add blog posts
3. Share on social media
4. Add newsletter (optional)
5. Add comments (optional)
6. Add analytics (optional)

---

**That's it! Blog is live.** 🎉
