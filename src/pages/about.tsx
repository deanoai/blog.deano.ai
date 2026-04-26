import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <NextSeo
        title="About"
        description="Learn more about Deano.AI Blog and our mission"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">About Deano.AI</h1>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p className="text-lg">
            Welcome to the Deano.AI Blog. We're dedicated to exploring the frontier of artificial
            intelligence, automation, and practical technology strategies that shape the future.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p>
              We believe in democratizing knowledge about AI and automation. Through in-depth
              articles, tutorials, and thoughtful analysis, we help individuals and organizations
              understand and leverage cutting-edge technologies to solve real-world problems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Cover</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Artificial Intelligence and Machine Learning</li>
              <li>Automation and Workflow Optimization</li>
              <li>Web Development and Modern Tech Stacks</li>
              <li>Cloud Infrastructure and DevOps</li>
              <li>Product Strategy and Tech Leadership</li>
              <li>Case Studies and Real-World Applications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p>
              Have questions, feedback, or topic suggestions? We'd love to hear from you.
            </p>
            <p className="mt-4">
              <a href="https://deano.ai" className="text-blue-600 hover:text-blue-700 font-medium">
                Visit Deano.AI
              </a>
              {' '}to connect with us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscribe</h2>
            <p>
              Stay updated with our latest posts and insights. Subscribe to our{' '}
              <a href="/api/rss" className="text-blue-600 hover:text-blue-700 font-medium">
                RSS feed
              </a>
              {' '}to never miss an update.
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <Link href="/posts" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            ← Back to posts
          </Link>
        </div>
      </div>
    </>
  );
}
