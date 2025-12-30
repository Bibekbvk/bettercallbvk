import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Engineering Research & Tech Blog",
  description: "In-depth technical guides, web security best practices, Next.js App Router architecture, and Google Gemini AI vector database integrations by Bibek Bhattarai.",
  alternates: {
    canonical: "https://better-call-bvk.web.app/blog",
  },
  openGraph: {
    title: "Engineering Research & Tech Blog | Better Call Bvk",
    description: "In-depth technical guides, web security best practices, Next.js App Router architecture, and Google Gemini AI vector database integrations by Bibek Bhattarai.",
    url: "https://better-call-bvk.web.app/blog",
    type: "website",
    images: [
      {
        url: "/security-firewall.png",
        width: 1200,
        height: 630,
        alt: "Better Call Bvk Tech Research & Security Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Research & Tech Blog | Better Call Bvk",
    description: "In-depth technical guides, Next.js architecture, and AI engineering research.",
    images: ["/security-firewall.png"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://better-call-bvk.web.app"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://better-call-bvk.web.app/blog"
    }
  ]
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
