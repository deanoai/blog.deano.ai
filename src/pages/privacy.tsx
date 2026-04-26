import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function Privacy() {
  return (
    <>
      <NextSeo
        title="Privacy Policy"
        description="Privacy policy for Deano.AI Blog"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p>
              Deano.AI Blog ("we", "us", "our", or "Company") operates the blog.deano.ai website
              (the "Site"). This page informs you of our policies regarding the collection, use,
              and disclosure of personal data when you use our Service and the choices you have
              associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Collection and Use</h2>
            <p>
              We collect several different types of information for various purposes to provide and
              improve our Service to you.
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                <strong>Usage Data:</strong> We may collect information how the Site is accessed and
                used ("Usage Data"). This may include information such as your computer's Internet
                Protocol address, browser type, browser version, the pages you visit, the time and
                date of your visit, and other diagnostic data.
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> We use cookies and similar
                tracking technologies to track activity on our Site and hold certain information.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Data</h2>
            <p>Deano.AI Blog uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>To provide and maintain the Site</li>
              <li>To notify you about changes to our Site</li>
              <li>To allow you to participate in interactive features of our Site</li>
              <li>To provide customer care and support</li>
              <li>To gather analysis or valuable information so that we can improve the Site</li>
              <li>To monitor the usage of the Site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Security of Data</h2>
            <p>
              The security of your data is important to us, but remember that no method of
              transmission over the Internet or method of electronic storage is 100% secure. While
              we strive to use commercially acceptable means to protect your personal data, we cannot
              guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the "effective date" at
              the top of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="https://deano.ai" className="text-blue-600 hover:text-blue-700">
                deano.ai
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            ← Back to home
          </Link>
        </div>
      </div>
    </>
  );
}
