# Contributing to Deano.AI Blog

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

### 1. Fork and Clone

```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR_USERNAME/blog.deano.ai.git
cd blog.deano.ai
git remote add upstream https://github.com/deanoai/blog.deano.ai.git
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Use descriptive names:
- `feature/add-search` - New feature
- `fix/broken-link` - Bug fix
- `docs/update-readme` - Documentation
- `style/improve-typography` - Style improvements

### 3. Install Dependencies

```bash
npm install
```

### 4. Make Your Changes

See sections below for different types of contributions.

### 5. Test Locally

```bash
npm run dev
# Visit http://localhost:3000
```

### 6. Commit and Push

```bash
git add .
git commit -m "Description of changes"
git push origin feature/your-feature-name
```

### 7. Create a Pull Request

1. Go to [GitHub](https://github.com/deanoai/blog.deano.ai)
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template
5. Click "Create Pull Request"

## Types of Contributions

### 📝 Writing Blog Posts

1. Create a new post in Supabase:
   - Go to your Supabase dashboard
   - Open the `posts` table
   - Insert a new row with your content

2. Use Markdown for formatting:
   ```markdown
   # Heading 2
   ## Heading 3
   
   **Bold** and *italic*
   
   - Bullet points
   - Like this
   
   ```code blocks like this```
   
   [Links](https://example.com)
   ```

3. Include metadata:
   - `title`: Post title
   - `slug`: URL-friendly (e.g., "my-awesome-post")
   - `excerpt`: 160-character summary
   - `author`: Your name
   - `tags`: Relevant topics
   - `published`: Set to `true` when ready

### 🐛 Reporting Bugs

Create an issue with:

**Title:** Brief description of the bug
**Description:**
```
## Description
What happened?

## Steps to Reproduce
1. Go to...
2. Click on...
3. See the error

## Expected Behavior
What should happen?

## Actual Behavior
What actually happened?

## Environment
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari
- Node version: `node --version`
```

### 🎨 UI/Design Improvements

1. Create an issue describing your idea
2. Discuss with maintainers
3. Create a feature branch
4. Make changes to:
   - `src/components/` - React components
   - `src/styles/globals.css` - Global styles
   - `tailwind.config.js` - Tailwind configuration

5. Include before/after screenshots

### 📚 Documentation

1. Edit relevant `.md` files
2. Keep formatting consistent
3. Test links and code examples
4. Submit PR

### ⚙️ Code Improvements

1. Fix TypeScript errors
2. Improve performance
3. Add error handling
4. Refactor complex code

## Code Standards

### TypeScript

- Always use TypeScript types
- Avoid `any` type
- Define interfaces for complex objects

```typescript
interface Post {
  id: string;
  title: string;
  slug: string;
}
```

### React Components

- Use functional components
- Use hooks (`useState`, `useEffect`, etc.)
- Prop interface above component

```typescript
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

### Styling

- Use Tailwind CSS classes
- Avoid inline styles
- Keep components responsive

```typescript
// ✅ Good
<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  Click me
</button>

// ❌ Avoid
<button style={{ padding: '8px 16px', backgroundColor: 'blue' }}>
  Click me
</button>
```

### File Naming

- Components: `PascalCase` (e.g., `PostCard.tsx`)
- Utilities: `camelCase` (e.g., `supabase.ts`)
- Pages: `lowercase` or `[slug]` (e.g., `index.tsx`)

## Commit Messages

Use clear, descriptive messages:

```bash
✅ Good:
git commit -m "Fix: Correct syntax highlighting in code blocks"
git commit -m "Feature: Add search functionality to posts page"
git commit -m "Docs: Update installation instructions in README"

❌ Avoid:
git commit -m "fix stuff"
git commit -m "Update"
git commit -m "asdf"
```

### Format

```
<type>: <description>

<optional body>
<optional footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting, missing semicolons
- `refactor:` - Code restructuring
- `perf:` - Performance improvement
- `test:` - Adding tests
- `chore:` - Dependency updates, etc.

## Pull Request Checklist

Before submitting, ensure:

- [ ] Code follows the style guide
- [ ] All TypeScript types are correct
- [ ] No console errors or warnings
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Links and images work correctly
- [ ] No spelling or grammar errors
- [ ] Commit messages are clear
- [ ] PR description explains the changes
- [ ] Related issues are referenced

## Development Workflow

### Project Structure

```
src/
├── components/    # Reusable UI components
├── lib/          # Utilities and API clients
├── pages/        # Next.js pages and routes
└── styles/       # Global CSS
```

### Testing

```bash
# Build locally
npm run build

# Run linter
npm run lint

# Check for TypeScript errors
npx tsc --noEmit
```

### Common Commands

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run start     # Run production build
npm run lint      # Lint code
npm run export    # Export static site
```

## Getting Help

- 💬 Ask questions in [GitHub Discussions](https://github.com/deanoai/blog.deano.ai/discussions)
- 🐛 Report bugs in [Issues](https://github.com/deanoai/blog.deano.ai/issues)
- 📧 Contact [Deano.AI](https://deano.ai)

## Code of Conduct

- Be respectful and inclusive
- No harassment or discrimination
- No spam or self-promotion
- Focus on constructive feedback

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Deano.AI Blog! 🚀
