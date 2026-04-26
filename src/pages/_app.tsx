import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Deano.AI Blog"
        defaultTitle="Deano.AI Blog"
        description="Tech insights, automation, and AI strategies"
        canonical="https://blog.deano.ai"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://blog.deano.ai',
          siteName: 'Deano.AI Blog',
          images: [
            {
              url: 'https://blog.deano.ai/og-image.png',
              width: 1200,
              height: 630,
              alt: 'Deano.AI Blog',
            },
          ],
        }}
        twitter={{
          handle: '@deanoai',
          site: '@deanoai',
          cardType: 'summary_large_image',
        }}
      />
      <Navigation />
      <main className="min-h-screen bg-white">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
