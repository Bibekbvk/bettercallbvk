import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import AuroraBg from '@/components/AuroraBg';
import ProductDetailClient from '@/components/ProductDetailClient';
import { supabase } from '@/lib/supabase';

const allProducts = [
  {
    id: 1,
    name: 'Gemini Enterprise License Key',
    slug: 'gemini-enterprise-license',
    desc: 'Full access to Google Gemini models with advanced API quotas. Seamlessly build multimodal AI assistants, document summarizers, and autonomous pipelines using official API credits.',
    price: 26000,
    rating: 5,
    category: 'AI License',
    stock: 24,
    image: '/gemini-license.png',
    features: [
      '25M Tokens monthly quota included',
      'Production-grade latency throttling bypass',
      'Full multimodal capabilities (image, audio, text input)',
      '24/7 Enterprise ticket support',
    ],
  },
  {
    id: 2,
    name: 'Supabase Cloud Pro Server',
    slug: 'supabase-cloud-pro',
    desc: 'Optimized PostgreSQL instance with automated backups, real-time database connection pooling, and 50GB encrypted cloud disk capacity.',
    price: 6500,
    rating: 4.8,
    category: 'Cloud Services',
    stock: 15,
    image: '/supabase-server.png',
    features: [
      '50GB Dedicated Storage',
      'Daily automated DB backups',
      'Connection pooling up to 10k concurrent clients',
      'Pre-configured Row Level Security templates',
    ],
  },
  {
    id: 3,
    name: 'Cyber Sentinel Security Firewall',
    slug: 'cyber-sentinel-firewall',
    desc: 'Premium rate-limiting and Web Application Firewall (WAF) protection middleware suite. Mitigate SQL injection, script spamming, and CSRF hijacks in standard NodeJS and NextJS applications.',
    price: 17000,
    rating: 4.9,
    category: 'Security',
    stock: 8,
    image: '/security-firewall.png',
    features: [
      'DDoS rate limit mitigation rules',
      'SQL injection scrubbing middleware',
      'CSP policy header automation scripts',
      'Easy hook-up to Next.js middleware configurations',
    ],
  },
  {
    id: 4,
    name: 'Auto-GPT Lead Agent Script',
    slug: 'auto-gpt-lead-agent',
    desc: 'Automated CRM client ingestion script powered by GPT-4o vector storage. Automatically ingest incoming forms, analyze user intent, and reply with custom technical scopes.',
    price: 10500,
    rating: 4.5,
    category: 'AI License',
    stock: 42,
    image: '/gemini-license.png',
    features: [
      'Python and NodeJS script variants',
      'Custom vector database embeddings mapping',
      'Pre-connected to email SMTP systems',
      'Easy schedule automation configuration',
    ],
  },
  {
    id: 5,
    name: 'Next.js SaaS Boilerplate Elite',
    slug: 'nextjs-saas-boilerplate',
    desc: 'Full stack starter code with built-in Supabase RLS policies, Firebase Authentication OAuth handlers, and Stripe subscription webhook endpoints.',
    price: 19500,
    rating: 4.7,
    category: 'Templates',
    stock: 120,
    image: '/supabase-server.png',
    features: [
      'Tailwind CSS layout components',
      'Pre-configured Firebase Auth screens',
      'Stripe Checkout router integration',
      'Fully typed TypeScript interfaces',
    ],
  },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'gemini-enterprise-license' },
    { slug: 'supabase-cloud-pro' },
    { slug: 'cyber-sentinel-firewall' },
    { slug: 'auto-gpt-lead-agent' },
    { slug: 'nextjs-saas-boilerplate' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) {
    return {
      title: 'Digital Item Not Found',
    };
  }

  const title = `${product.name} (Nepal)`;
  const description = `${product.desc} Buy securely in Nepal for Rs. ${product.price.toLocaleString()} via eSewa, Khalti, or Fonepay QR at Better Call Bvk.`;
  const canonicalUrl = `https://better-call-bvk.web.app/marketplace/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | Better Call Bvk`,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Better Call Bvk`,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    try {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();
      if (data) {
        product = {
          id: data.id,
          name: data.name,
          slug: data.slug,
          desc: data.description,
          price: Number(data.price),
          rating: 5.0,
          category: data.category,
          stock: data.stock,
          image: data.image || '/gemini-license.png',
          features: data.features || [
            'Premium License Access',
            'Full Documentation & Starters',
            '24/7 Developer Support',
          ],
        };
      }
    } catch (err) {
      console.warn('Could not load dynamic product from Supabase:', err);
    }
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-bold text-white">Asset Registry Failure</h2>
        <p className="text-sm text-foreground/50">The requested digital item could not be retrieved.</p>
        <Link href="/marketplace" className="text-cyan hover:underline text-xs">Return to Catalog</Link>
      </div>
    );
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: `https://better-call-bvk.web.app${product.image}`,
    description: product.desc,
    sku: `BCB-${product.id}-${product.slug}`,
    offers: {
      '@type': 'Offer',
      url: `https://better-call-bvk.web.app/marketplace/${product.slug}`,
      priceCurrency: 'NPR',
      price: product.price,
      priceValidUntil: '2027-12-31',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Better Call Bvk',
        url: 'https://better-call-bvk.web.app',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: 18,
      bestRating: 5,
      worstRating: 1,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://better-call-bvk.web.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Marketplace',
        item: 'https://better-call-bvk.web.app/marketplace',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://better-call-bvk.web.app/marketplace/${product.slug}`,
      },
    ],
  };

  return (
    <div className="relative min-h-screen py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AuroraBg />
      <ProductDetailClient product={product} />
    </div>
  );
}
