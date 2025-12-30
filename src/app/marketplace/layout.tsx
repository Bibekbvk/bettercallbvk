import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Digital Software & AI Marketplace",
  description: "Browse and buy production-ready AI model access, cheapest Google Gemini enterprise license keys, Supabase Cloud Pro servers, and cybersecurity firewall tools in Nepal.",
  alternates: {
    canonical: "https://better-call-bvk.web.app/marketplace",
  },
  openGraph: {
    title: "Digital Software & AI Marketplace | Better Call Bvk",
    description: "Browse and buy production-ready AI model access, cheapest Google Gemini enterprise license keys, Supabase Cloud Pro servers, and cybersecurity firewall tools in Nepal.",
    url: "https://better-call-bvk.web.app/marketplace",
    type: "website",
    images: [
      {
        url: "/gemini-license.png",
        width: 800,
        height: 600,
        alt: "Better Call Bvk Digital Software Marketplace Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Software & AI Marketplace | Better Call Bvk",
    description: "Production-ready AI models, Google Gemini licenses, and Supabase servers in Kathmandu, Nepal.",
    images: ["/gemini-license.png"],
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
      "name": "Marketplace",
      "item": "https://better-call-bvk.web.app/marketplace"
    }
  ]
};

export default function MarketplaceLayout({
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
