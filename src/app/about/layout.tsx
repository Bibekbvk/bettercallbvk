import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Our Mission & Story",
  description: "Learn about the mission, engineering history, and tech stack behind Better Call Bvk. Founded by Bibek Bhattarai in Putalisadak, Kathmandu — engineering resilient AI and cloud systems.",
  alternates: {
    canonical: "https://better-call-bvk.web.app/about",
  },
  openGraph: {
    title: "About Our Mission & Story | Better Call Bvk",
    description: "Learn about the mission, engineering history, and tech stack behind Better Call Bvk. Founded by Bibek Bhattarai in Putalisadak, Kathmandu.",
    url: "https://better-call-bvk.web.app/about",
    type: "website",
    images: [
      {
        url: "/guru-poster.jpg",
        width: 800,
        height: 800,
        alt: "Better Call Bvk Founder & Mascot Poster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Our Mission & Story | Better Call Bvk",
    description: "Engineering resilient AI and cloud systems in Putalisadak, Kathmandu.",
    images: ["/guru-poster.jpg"],
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
      "name": "About",
      "item": "https://better-call-bvk.web.app/about"
    }
  ]
};

export default function AboutLayout({
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
