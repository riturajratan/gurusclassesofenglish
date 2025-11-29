import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gurus Classes of English - Master English with Confidence | S.D. Singh Ratan",
    template: "%s | Gurus Classes of English"
  },
  description: "Learn English speaking, grammar, and communication skills with experienced English lecturer S.D. Singh Ratan. Expert coaching in spoken English, interview preparation, and personality development.",
  keywords: [
    "Best English Lecturer",
    "English Coaching",
    "Learn Spoken English",
    "S.D. Singh Ratan",
    "English Classes",
    "English Grammar",
    "Communication Skills",
    "Interview Preparation",
    "Personality Development",
    "Spoken English Course",
    "English Learning Tips",
    "Gurus Classes of English"
  ],
  authors: [{ name: "S.D. Singh Ratan" }],
  creator: "S.D. Singh Ratan",
  publisher: "Gurus Classes of English",
  metadataBase: new URL('https://gurusclassesofenglish.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gurusclassesofenglish.com',
    title: 'Gurus Classes of English - Master English with Confidence',
    description: 'Learn English speaking, grammar, and communication skills with experienced English lecturer S.D. Singh Ratan.',
    siteName: 'Gurus Classes of English',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gurus Classes of English',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gurus Classes of English - Master English with Confidence',
    description: 'Learn English speaking, grammar, and communication skills with S.D. Singh Ratan.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
