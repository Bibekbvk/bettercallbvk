'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Filter } from 'lucide-react';
import AuroraBg from '@/components/AuroraBg';
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
  },
];

export default function BlogPage() {
  const [category, setCategory] = useState('All');
  const [dbPosts, setDbPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });
        if (data) {
          const formatted = data.map((b) => ({
            title: b.title,
            slug: b.slug,
            desc: b.desc,
            date: new Date(b.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
            author: b.author || 'Bvk Sharma',
            category: b.category,
            readTime: b.read_time || '5 min read',
            image: b.image || '/gemini-license.png',
          }));
          setDbPosts(formatted);
        }
      } catch (err) {
        console.warn('Could not load blogs from Supabase, fallback to static:', err);
      }
    };
    fetchBlogs();
  }, []);

  const mergedPosts = [...dbPosts, ...allPosts];

  const filteredPosts = mergedPosts.filter(
    (post) => category === 'All' || post.category === category
  );

  return (
    <div className="relative min-h-screen py-16">
      <AuroraBg />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-4xl sm:text-6xl text-white"
          >
            Engineering Research & Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-xl mx-auto text-sm sm:text-base"
          >
            Deep dives into security vulnerabilities, serverless vector processing, and modern visual design engineering.
          </motion.p>
        </div>

        {/* Categories Bar */}
        <div className="glass-panel rounded-2xl p-4 mb-12 flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-cyan mr-2 ml-2" />
          {['All', 'Security', 'AI Research', 'Tutorials'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                category === cat ? 'bg-cyan text-background font-bold' : 'bg-white/5 hover:bg-white/10 text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Post List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="glass-panel glow-card rounded-2xl p-6 flex flex-col justify-between h-full group"
              >
                <div className="space-y-4">
                  {/* Blog cover image */}
                  <div className="relative h-44 w-full bg-black/20 rounded-xl overflow-hidden border border-white/5 mb-4">
                    <img
                      src={post.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={post.title}
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs font-mono text-foreground/50">
                    <span className="text-cyan px-2 py-0.5 bg-cyan/10 rounded-full text-[10px] uppercase tracking-wider font-bold">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed line-clamp-3">{post.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                  <div className="flex items-center space-x-2 text-xs text-foreground/45">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-xs font-bold text-cyan hover:underline"
                  >
                    Read Post <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
