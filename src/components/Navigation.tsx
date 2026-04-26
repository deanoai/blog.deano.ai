import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600"></div>
            <span className="font-bold text-lg text-gray-900">Deano.AI Blog</span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden sm:inline-flex lg:hidden items-center justify-center h-10 w-10 rounded-md hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/posts" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Posts
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              About
            </Link>
            <a
              href="https://deano.ai"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
            >
              Visit Deano.AI
            </a>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-2">
            <Link href="/" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
              Home
            </Link>
            <Link href="/posts" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
              Posts
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
              About
            </Link>
            <a
              href="https://deano.ai"
              className="block px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Visit Deano.AI
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
