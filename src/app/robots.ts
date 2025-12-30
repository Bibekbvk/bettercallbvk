import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/checkout', '/checkout/success'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'ClaudeBot', 'PerplexityBot', 'Applebot-Extended'],
        allow: '/',
        disallow: ['/admin/'],
      },
    ],
    sitemap: 'https://better-call-bvk.web.app/sitemap.xml',
  };
}
