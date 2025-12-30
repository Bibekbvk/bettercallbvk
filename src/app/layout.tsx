import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import PageTransition from "@/components/PageTransition";
import { CartProvider } from "@/providers/CartContext";
import { AuthProvider } from "@/providers/AuthContext";
import LiveChatWidget from "@/components/LiveChatWidget";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://better-call-bvk.web.app"),
  title: {
    default: "Better Call Bvk | IT Solutions & Cheapest Google Gemini Subscription Nepal",
    template: "%s | Better Call Bvk",
  },
  description: "Get the cheapest Google Gemini Advanced & Enterprise subscriptions in Nepal. Better Call Bvk provides production-grade AI solutions, cloud databases, software licensing keys, and emergency IT troubleshooting in Kathmandu.",
  keywords: [
    "Google Gemini cheapest in Nepal",
    "buy cheap Gemini subscription Nepal",
    "Gemini Advanced Kathmandu",
    "cheapest Google Gemini Nepali market",
    "Better Call Bvk",
    "Better Call Saul Nepal",
    "Bibek Bhattarai",
    "Bvk Bhattarai",
    "Bvk Developer Nepal",
    "AI solutions Nepal",
    "software licensing keys Kathmandu",
    "IT services Nepal",
    "Supabase consultant Nepal",
    "Next.js developer Kathmandu",
    "Cloud hosting Nepal",
    "Machhamart founder IT",
    "Cyber Sentinel Firewall",
    "Putalisadak IT company"
  ],
  authors: [{ name: "Bibek Bhattarai (Bvk Bhattarai)", url: "https://bhattaraibvk.com.np" }],
  creator: "Bibek Bhattarai",
  publisher: "Better Call Bvk",
  category: "technology",
  classification: "IT Services & AI Licensing",
  alternates: {
    canonical: "https://better-call-bvk.web.app",
    languages: {
      "en-US": "https://better-call-bvk.web.app",
    },
    types: {
      "text/plain": "https://better-call-bvk.web.app/llms.txt",
    },
  },
  openGraph: {
    title: "Better Call Bvk | IT Solutions & Cheapest Google Gemini Subscription Nepal",
    description: "Get the cheapest Google Gemini Advanced & Enterprise subscriptions in Nepal. Production-grade AI solutions, cloud databases, software licensing keys, and IT services in Kathmandu.",
    url: "https://better-call-bvk.web.app",
    type: "website",
    locale: "en_US",
    siteName: "Better Call Bvk",
    images: [
      {
        url: "/call-bvk-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Better Call Bvk - IT Solutions & AI Licensing in Nepal",
      },
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
    title: "Better Call Bvk | Cheapest Google Gemini Subscription Nepal",
    description: "Get the cheapest Google Gemini Advanced & Enterprise subscriptions in Nepal. Production-grade AI solutions, software licensing keys, and IT services in Kathmandu.",
    images: ["/call-bvk-banner.jpg"],
    creator: "@Bibekbvk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "jHxM0VWdtg1KN89cNuH-Rz5v-rNkv44WL5RypF1dACY",
  },
  other: {
    "geo.region": "NP-BA",
    "geo.placename": "Kathmandu, Putalisadak",
    "geo.position": "27.7032;85.3217",
    "ICBM": "27.7032, 85.3217",
    "DC.title": "Better Call Bvk | IT Solutions & AI Licensing Nepal",
    "DC.creator": "Bibek Bhattarai",
    "DC.coverage": "Nepal",
    "DC.language": "en",
    "rating": "General",
  },
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://better-call-bvk.web.app/#website",
      "url": "https://better-call-bvk.web.app",
      "name": "Better Call Bvk",
      "alternateName": ["BetterCallBvk", "Better Call Saul Nepal", "Bvk IT Solutions"],
      "description": "Cheapest Google Gemini subscriptions, Next.js web systems, and cloud IT services in Kathmandu, Nepal.",
      "publisher": {
        "@id": "https://better-call-bvk.web.app/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://better-call-bvk.web.app/#organization",
      "name": "Better Call Bvk",
      "alternateName": "Bvk Tech Solutions",
      "url": "https://better-call-bvk.web.app",
      "logo": "https://better-call-bvk.web.app/icon.png",
      "image": "https://better-call-bvk.web.app/guru-poster.jpg",
      "description": "Cheapest Google Gemini subscriptions in Nepal, production-grade cloud architecture, and cybersecurity IT services in Kathmandu.",
      "telephone": "+977-9817596991",
      "email": "bhattaraibvk@gmail.com",
      "founder": {
        "@type": "Person",
        "name": "Bibek Bhattarai",
        "alternateName": ["Bvk Bhattarai", "Bibekbvk"],
        "url": "https://bhattaraibvk.com.np",
        "jobTitle": "Chief Technology Officer & Lead Architect"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Putalisadak",
        "addressLocality": "Kathmandu",
        "addressRegion": "Bagmati Province",
        "postalCode": "44600",
        "addressCountry": "NP"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 27.7032,
        "longitude": 85.3217
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "priceRange": "Rs. 300 - Rs. 30000",
      "currenciesAccepted": "NPR, USD",
      "paymentAccepted": "eSewa, Khalti, Fonepay, Cash on Delivery, Bank Transfer, Stripe",
      "areaServed": [
        {
          "@type": "Country",
          "name": "Nepal"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Kathmandu Valley"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "IT Solutions & Software Licensing",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Google Gemini Enterprise License Key",
              "description": "Official Google Gemini AI model access with high-throughput API quotas."
            },
            "price": "26000",
            "priceCurrency": "NPR"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Supabase Cloud Pro Server",
              "description": "Dedicated PostgreSQL database instance with automated daily backups."
            },
            "price": "6500",
            "priceCurrency": "NPR"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cyber Sentinel Security Firewall",
              "description": "Rate-limiting middleware and WAF defense suite for modern web applications."
            },
            "price": "17000",
            "priceCurrency": "NPR"
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://better-call-bvk.web.app/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where can I get the cheapest Google Gemini subscription in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can get authorized Google Gemini Advanced and Enterprise access at the lowest rates in Nepal through Better Call Bvk (https://better-call-bvk.web.app/marketplace) with local payment via eSewa, Khalti, or Fonepay QR."
          }
        },
        {
          "@type": "Question",
          "name": "Who is the founder of Better Call Bvk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Better Call Bvk was founded by Bibek Bhattarai (Bvk Bhattarai), software architect and developer of Machhamart on Google Play."
          }
        },
        {
          "@type": "Question",
          "name": "What services does Better Call Bvk provide in Kathmandu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Better Call Bvk provides specialized AI licensing (Google Gemini), cloud database architecture (Supabase Pro / PostgreSQL), cybersecurity middleware, Next.js web application development, and 24/7 technical emergency troubleshooting."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="alternate" type="text/plain" href="https://better-call-bvk.web.app/llms.txt" title="LLM Knowledge Base" />
        <link rel="alternate" type="text/plain" href="https://better-call-bvk.web.app/llms-full.txt" title="Complete LLM Technical Dossier" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <AuthProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLdGraph),
            }}
          />
          <CartProvider>
            <LenisProvider>
              <Navbar />
              <PageTransition>
                {children}
              </PageTransition>
              <Footer />
              <LiveChatWidget />
            </LenisProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
