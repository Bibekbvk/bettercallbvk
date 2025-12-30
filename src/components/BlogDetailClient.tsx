'use client';

import { useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowLeft, User, Calendar, Share2, Bookmark, Check, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

interface Post {
  title: string;
  slug: string;
  desc: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  content: string;
}

export default function BlogDetailClient({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Dynamic Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan to-purple z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-foreground/50 hover:text-cyan transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Hero Cover Photo Card */}
        <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl mb-8">
          <img
            src={post.image}
            className="w-full h-full object-cover"
            alt={post.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        {/* Article Meta */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-cyan px-2.5 py-1 bg-cyan/10 rounded-full font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-xs text-foreground/50 font-mono">{post.readTime}</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-y border-white/5 py-4 text-xs sm:text-sm text-foreground/60">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <User className="w-4 h-4 text-cyan mr-1.5" />
                {post.author}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 text-purple mr-1.5" />
                {post.date}
              </span>
            </div>
            
            {/* Share controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="flex items-center hover:text-cyan transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1 text-cyan animate-pulse" />
                    Copied link
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </>
                )}
              </button>
              <button className="flex items-center hover:text-cyan transition-colors">
                <Bookmark className="w-4 h-4 mr-1" />
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Table of Contents & Article Body */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Table of Contents Sticky */}
          <div className="hidden lg:block space-y-4 lg:sticky lg:top-28">
            <h4 className="text-xs font-mono uppercase text-cyan tracking-wider font-bold">Table of Contents</h4>
            <ul className="text-xs space-y-3 text-foreground/60">
              <li><a href="#overview" className="hover:text-cyan transition-colors font-semibold">1. Overview</a></li>
              <li><a href="#impl" className="hover:text-cyan transition-colors">2. Code Implementation</a></li>
              <li><a href="#media" className="hover:text-cyan transition-colors">3. Media Gallery</a></li>
            </ul>
          </div>

          {/* Article Body Content */}
          <div className="lg:col-span-3 prose prose-invert max-w-none text-foreground/80 leading-relaxed space-y-6 text-sm sm:text-base">
            <div id="overview" className="space-y-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/### (.*)/g, '<h3 class="text-xl font-bold text-white mt-8 mb-4">$1</h3>')
                    .replace(/`([^`]+)`/g, '<code class="bg-white/5 px-1.5 py-0.5 rounded text-cyan text-xs font-mono font-bold">$1</code>')
                    .replace(/```([a-z]+)\n([\s\S]+?)\n```/g, (_, lang, code) => {
                      return `<pre class="bg-black/45 border border-white/5 p-4 rounded-xl font-mono text-xs overflow-x-auto text-cyan my-4"><code class="text-white">${code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
                    }),
                }}
              />
            </div>

            {/* DEDICATED INLINE MEDIA GALLERY SECTION */}
            <div id="media" className="border-t border-white/5 pt-8 mt-12 space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <ImageIcon className="w-5 h-5 text-cyan mr-2" />
                Related Media & Architecture
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Refer to this architectural layout schema representing our production AI/Security firewall routing setup:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="glass-panel p-2 rounded-xl overflow-hidden border border-white/5 group">
                  <img
                    src="/guru-poster.jpg"
                    className="w-full h-44 object-cover rounded-lg group-hover:scale-103 transition-transform"
                    alt="AI Security Guru"
                  />
                  <span className="text-[10px] font-mono text-foreground/50 block mt-2 text-center uppercase">
                    Fig 1: Security Guru Poster
                  </span>
                </div>
                <div className="glass-panel p-2 rounded-xl overflow-hidden border border-white/5 group">
                  <img
                    src="/call-bvk-banner.jpg"
                    className="w-full h-44 object-cover rounded-lg group-hover:scale-103 transition-transform"
                    alt="IT Solutions Banner"
                  />
                  <span className="text-[10px] font-mono text-foreground/50 block mt-2 text-center uppercase">
                    Fig 2: IT Solutions Banner
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}
