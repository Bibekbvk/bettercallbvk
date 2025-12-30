import type { Metadata } from 'next';
import Link from 'next/link';
import AuroraBg from '@/components/AuroraBg';
import BlogDetailClient from '@/components/BlogDetailClient';
import { supabase } from '@/lib/supabase';

const allPosts = [
  {
    title: 'Securing Next.js 15 App Router Endpoints',
    slug: 'securing-nextjs-15',
    desc: 'Best practices for implementing CSRF tokens, secure headers, and robust rate limiting in the modern App Router environment.',
    date: 'Aug 10, 2026',
    author: 'Bvk Sharma',
    category: 'Security',
    readTime: '6 min read',
    image: '/security-firewall.png',
    content: `
### Overview of Next.js 15 Security
Next.js 15 brings powerful compilation updates, but dynamic server routing introduces fresh vulnerability considerations. When dealing with mutation APIs, security layers should never be left to chance.

### 1. Implementing Content Security Policies (CSP)
By configuring strict headers, you prevent malicious XSS payloads from executing.

\`\`\`typescript
// src/middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const cspHeader = \`
    default-src 'self';
    script-src 'self' 'nonce-\${nonce}';
    style-src 'self' 'unsafe-inline';
    object-src 'none';
  \`;
  
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', cspHeader.replace(/\\s{2,}/g, ' '));
  return response;
}
\`\`\`

### 2. Form Input Sanitization
Always sanitize raw string structures client-side and server-side. Prevent SQL injections by utilizing prepared database statements and Row Level Security templates in Supabase.
    `,
  },
  {
    title: 'Integrating Gemini Pro with Supabase Vector Store',
    slug: 'gemini-supabase-vector',
    desc: 'A comprehensive tutorial on building semantic search capabilities using SQL vector databases and generative API parameters.',
    date: 'Jul 28, 2026',
    author: 'Bvk Sharma',
    category: 'AI Research',
    readTime: '8 min read',
    image: '/gemini-license.png',
    content: `
### The Power of Postgres pgvector
Supabase simplifies semantic applications by supporting pgvector columns. Using Gemini Pro embeddings, we can easily match user queries to document contexts.

### 1. Designing the SQL Vector Table
Let's initialize the vector extension and table layout in Supabase SQL editor:

\`\`\`sql
-- Enable extension
create extension if not exists vector;

-- Create vector table
create table document_embeddings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  embedding vector(768) -- Gemini Pro embedding dimensions
);
\`\`\`

### 2. Injecting Gemini Embeddings API
Obtain embeddings using official Google generative packages:

\`\`\`javascript
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const response = await ai.models.embedContent({
  model: 'text-embedding-004',
  contents: 'Better Call Bvk AI services scaling details.',
});
\`\`\`
    `,
  },
  {
    title: 'Modern CSS Easing and Animations for Web Apps',
    slug: 'modern-css-easing',
    desc: 'How to use cubic-bezier transitions, staggered arrays, and hardware-accelerated transforms to create organic animations.',
    date: 'Jun 15, 2026',
    author: 'Bvk Sharma',
    category: 'Tutorials',
    readTime: '5 min read',
    image: '/supabase-server.png',
    content: `
### Easing Efficacy
Standard linear transitions feel synthetic. By configuring natural easing curves, web interfaces align with real-world physics.

### Cubic Bezier Curves
Use deceleration curves for opening items, and acceleration for exiting elements:

\`\`\`css
/* Deceleration curve (Ease-Out) */
.modal-enter {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Easing (Ease-In) */
.modal-exit {
  transition: transform 0.25s cubic-bezier(0.76, 0, 0.24, 1);
}
\`\`\`
    `,
  },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'securing-nextjs-15' },
    { slug: 'gemini-supabase-vector' },
    { slug: 'modern-css-easing' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    try {
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();
      if (data) {
        post = {
          title: data.title,
          slug: data.slug,
          desc: data.desc,
          date: new Date(data.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          author: data.author || 'Bvk Sharma',
          category: data.category,
          readTime: data.read_time || '5 min read',
          image: data.image || '/gemini-license.png',
          content: data.content,
        };
      }
    } catch {
      // fallback
    }
  }

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const title = post.title;
  const description = post.desc;
  const canonicalUrl = `https://better-call-bvk.web.app/blog/${post.slug}`;

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
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Better Call Bvk`,
      description,
      images: [post.image],
      creator: '@Bibekbvk',
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    try {
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();
      if (data) {
        post = {
          title: data.title,
          slug: data.slug,
          desc: data.desc,
          date: new Date(data.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          author: data.author || 'Bvk Sharma',
          category: data.category,
          readTime: data.read_time || '5 min read',
          image: data.image || '/gemini-license.png',
          content: data.content,
        };
      }
    } catch (err) {
      console.warn('Could not query dynamic post:', err);
    }
  }

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-xl font-bold text-white">Article Registry Failure</h2>
        <p className="text-sm text-foreground/50">The requested article could not be retrieved.</p>
        <Link href="/blog" className="text-cyan hover:underline text-xs">Return to Blog list</Link>
      </div>
    );
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.desc,
    image: `https://better-call-bvk.web.app${post.image}`,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://bhattaraibvk.com.np',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Better Call Bvk',
      logo: {
        '@type': 'ImageObject',
        url: 'https://better-call-bvk.web.app/icon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://better-call-bvk.web.app/blog/${post.slug}`,
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
        name: 'Blog',
        item: 'https://better-call-bvk.web.app/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://better-call-bvk.web.app/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="relative min-h-screen py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AuroraBg />
      <BlogDetailClient post={post} />
    </div>
  );
}
