import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact & 24/7 IT Emergency Support",
  description: "Contact Better Call Bvk in Putalisadak, Kathmandu for urgent IT troubleshooting, AI model licensing, and web development consultations. Call +977-9817596991.",
  alternates: {
    canonical: "https://better-call-bvk.web.app/contact",
  },
  openGraph: {
    title: "Contact & 24/7 IT Emergency Support | Better Call Bvk",
    description: "Contact Better Call Bvk in Putalisadak, Kathmandu for urgent IT troubleshooting, AI model licensing, and web development consultations.",
    url: "https://better-call-bvk.web.app/contact",
    type: "website",
    images: [
      {
        url: "/call-bvk-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Better Call Bvk Contact & Support Kathmandu Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & 24/7 IT Emergency Support | Better Call Bvk",
    description: "Contact Better Call Bvk in Kathmandu for emergency IT support and AI licensing.",
    images: ["/call-bvk-banner.jpg"],
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
      "name": "Contact",
      "item": "https://better-call-bvk.web.app/contact"
    }
  ]
};

export default function ContactLayout({
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
