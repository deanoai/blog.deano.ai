import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function Terms() {
  return (
    <>
      <NextSeo
        title="Terms of Service"
        description="Terms of service for Deano.AI Blog"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using this Site, you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the above, please do not
              use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information
              or software) on Deano.AI Blog for personal, non-commercial transitory viewing only.
              This is the grant of a license, not a transfer of title, and under this license you
              may not:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>
                Attempting to decompile, reverse engineer, disassemble, or otherwise reducing the
                software to human-perceivable form
              </li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>
                Transferring the materials to another person or "mirroring" the materials on any
                other server
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Disclaimer</h2>
            <p>
              The materials on Deano.AI Blog are provided on an 'as is' basis. Deano.AI makes no
              warranties, expressed or implied, and hereby disclaims and negates all other warranties
              including, without limitation, implied warranties or conditions of merchantability,
              fitness for a particular purpose, or non-infringement of intellectual property or other
              violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitations</h2>
            <p>
              In no event shall Deano.AI or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business
              interruption,) arising out of the use or inability to use the materials on Deano.AI
              Blog.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Deano.AI Blog could include technical, typographical, or
              photographic errors. Deano.AI does not warrant that any of the materials on the Site
              are accurate, complete, or current. We may make changes to the materials contained on
              the Site at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Links</h2>
            <p>
              Deano.AI has not reviewed all of the sites linked to its website and is not responsible
              for the contents of any such linked site. The inclusion of any link does not imply
              endorsement by Deano.AI of the site. Use of any such linked website is at the user's own
              risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modifications</h2>
            <p>
              Deano.AI may revise these terms of service for the Site at any time without notice. By
              using this Site, you are agreeing to be bound by the then current version of these terms
              of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of
              the jurisdiction in which Deano.AI operates, and you irrevocably submit to the exclusive
              jurisdiction of the courts in that location.
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
