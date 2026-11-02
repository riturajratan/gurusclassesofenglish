import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./learning.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceWorker from "@/components/ServiceWorker";
import Analytics from "@/components/Analytics";
import { absolute, jsonLd, site } from "@/lib/site";
import { siteDescription, siteTitle } from "@/lib/seo";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: siteTitle,
    template: "%s | Gurus Classes of English",
  },
  description: siteDescription,
  authors: [{ name: site.author }],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    images: [{ url: "/logo.jpeg", alt: site.name }],
  },
  twitter: { card: "summary", images: ["/logo.jpeg"] },
  icons: { icon: "/logo.jpeg", apple: "/icons/icon-192.png" },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: { google: site.googleVerification },
  // Ownership verification only; this does not load Google's advertising tag.
  other: { "google-adsense-account": "ca-pub-8791576499923818" },
};
export const viewport: Viewport = {
  themeColor: "#172e2a",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
        <ServiceWorker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "EducationalOrganization",
                  "@id": absolute("/#organization"),
                  name: site.name,
                  url: absolute("/"),
                  logo: absolute("/logo.jpeg"),
                  founder: { "@id": absolute("/about/#teacher") },
                  telephone: site.telephone,
                  email: site.email,
                  sameAs: [site.facebook],
                },
                {
                  "@type": "Person",
                  "@id": absolute("/about/#teacher"),
                  name: site.author,
                  url: absolute("/about/"),
                  image: absolute("/images/sd-singh-ratan.png"),
                  worksFor: { "@id": absolute("/#organization") },
                },
                {
                  "@type": "WebSite",
                  "@id": absolute("/#website"),
                  name: site.name,
                  url: absolute("/"),
                  inLanguage: "en-IN",
                  publisher: { "@id": absolute("/#organization") },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
