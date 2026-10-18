import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceWorker from '@/components/ServiceWorker';
import { site } from '@/lib/site';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Gurus Classes of English — A little English, every day',
    template: '%s | Gurus Classes of English',
  },
  description:
    'Discover vocabulary, grammar and writing lessons with Gurus Classes of English and S.D. Singh Ratan. A little practice, a little more confidence, every day.',
  authors: [{ name: site.author }],
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
    images: [{ url: '/logo.jpeg', alt: site.name }],
  },
  twitter: { card: 'summary', images: ['/logo.jpeg'] },
  icons: { icon: '/logo.jpeg', apple: '/icons/icon-192.png' },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } }
    : {}),
};
export const viewport: Viewport = { themeColor: '#172e2a', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ServiceWorker />
      </body>
    </html>
  );
}
