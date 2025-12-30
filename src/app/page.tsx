'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Terminal, Shield, Cpu, ShoppingBag, ArrowRight, Star } from 'lucide-react';
import AuroraBg from '@/components/AuroraBg';
import Typewriter from '@/components/Typewriter';
import Counter from '@/components/Counter';
import Magnetic from '@/components/Magnetic';
import { supabase } from '@/lib/supabase';

// Hardcoded featured products with actual image urls
const featuredProducts = [
  {
    id: 1,
    name: 'Gemini Enterprise License Key',
    desc: 'Full access to Google Gemini models with advanced API quotas.',
    price: 'Rs. 26,000',
    rating: 5,
    category: 'AI License',
    image: '/gemini-license.png',
  },
  {
    id: 2,
    name: 'Supabase Cloud Pro Server',
    desc: 'Optimized PostgreSQL instance with automated backups and 50GB storage.',
    price: 'Rs. 6,500',
    rating: 4.8,
    category: 'Cloud Services',
    image: '/supabase-server.png',
  },
  {
    id: 3,
    name: 'Cyber Sentinel Security Firewall',
    desc: 'Premium rate-limiting and WAF protection middleware suite.',
    price: 'Rs. 17,000',
    rating: 4.9,
    category: 'Security',
    image: '/security-firewall.png',
  },
];

// Hardcoded blog previews with image slots
const blogPosts = [
  {
    title: 'Securing Next.js 15 App Router Endpoints',
    slug: 'securing-nextjs-15',
    desc: 'Best practices for implementing CSRF tokens, secure headers, and robust rate limiting.',
    date: 'Aug 10, 2026',
    image: '/security-firewall.png',
  },
  {
    title: 'Integrating Gemini Pro with Supabase Vector Store',
    slug: 'gemini-supabase-vector',
    desc: 'A comprehensive tutorial on building semantic search capabilities using SQL vector databases.',
    date: 'Jul 28, 2026',
    image: '/gemini-license.png',
  },
];

// Hero text reveal animation variants
const textContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function Home() {
  const [heroTitle, setHeroTitle] = useState('Need Innovation?\nBetter Call Bvk');
  const [heroSubtitle, setHeroSubtitle] = useState('We engineer specialized AI Solutions, IT Cloud Services, and Digital Licensing Marketplace in Kathmandu, Nepal.');
  const [heroImage, setHeroImage] = useState('/guru-poster.jpg');
  const [trendingProducts, setTrendingProducts] = useState<any[]>(featuredProducts);

  useEffect(() => {
    const fetchHeroSettings = async () => {
      try {
        const { data: titleData } = await supabase.from('site_settings').select('value').eq('key', 'homepage_hero_title').single();
        if (titleData && titleData.value) setHeroTitle(titleData.value);

        const { data: subtitleData } = await supabase.from('site_settings').select('value').eq('key', 'homepage_hero_subtitle').single();
        if (subtitleData && subtitleData.value) setHeroSubtitle(subtitleData.value);

        const { data: imageData } = await supabase.from('site_settings').select('value').eq('key', 'homepage_hero_image').single();
        if (imageData && imageData.value) setHeroImage(imageData.value);

        // Dynamic fetch for top 3 trending products in Supabase
        const { data: dbProducts } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true })
          .limit(3);

        if (dbProducts && dbProducts.length > 0) {
          setTrendingProducts(dbProducts.map(p => ({
            id: p.id,
            name: p.name,
            desc: p.description,
            price: `Rs. ${Number(p.price).toLocaleString()}`,
            rating: 5.0,
            category: p.category,
            image: p.image || '/gemini-license.png',
          })));
        }
      } catch (err) {
        console.warn('Could not load dynamic homepage settings/products:', err);
      }
    };
    fetchHeroSettings();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-16">
        <AuroraBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-10">
            
            {/* Left: Headline & taglines */}
            <div className="space-y-8 text-center lg:text-left">
              <motion.div
                variants={textContainer}
                initial="hidden"
                animate="show"
                className="space-y-6"
              >
                <motion.h1 
                  variants={textItem}
                  className="font-display font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none text-white whitespace-pre-line"
                >
                  {heroTitle.split('\n').map((line, idx) => (
                    <span key={idx} className={idx === 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple" : ""}>
                      {line}
                      {idx === 0 && heroTitle.includes('\n') && <br />}
                    </span>
                  ))}
                </motion.h1>

                <motion.p 
                  variants={textItem}
                  className="text-base sm:text-xl text-foreground/80 font-medium"
                >
                  We engineer specialized{' '}
                  <Typewriter
                    words={['AI Solutions.', 'IT Cloud Services.', 'Digital Licensing Marketplace.']}
                    typingSpeed={80}
                    deletingSpeed={40}
                  />
                </motion.p>

                <motion.p
                  variants={textItem}
                  className="text-sm sm:text-base text-foreground/60 leading-relaxed max-w-lg"
                >
                  {heroSubtitle}
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Magnetic>
                  <Link
                    href="/marketplace"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan to-purple text-background font-bold rounded-xl hover:opacity-95 transition-all shadow-[0_0_30px_rgba(0,229,255,0.15)] text-base"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Explore Marketplace
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-white/10 glass-panel text-white font-bold rounded-xl hover:bg-white/5 transition-all text-base"
                  >
                    Get in Touch
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Magnetic>
              </motion.div>
            </div>

            {/* Right: Retro Pointing Uncle-Sam styled "AI & Tech Guru" Poster */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: -1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              <div className="relative group max-w-sm sm:max-w-md rounded-2xl overflow-hidden border-4 border-cyan bg-[#FCD116] p-2 shadow-[12px_12px_0px_rgba(217,4,41,0.9)] hover:shadow-[16px_16px_0px_rgba(217,4,41,1)] transition-all duration-300">
                <img
                  src={heroImage}
                  className="w-full h-auto object-cover rounded-lg border border-black/10"
                  alt="AI & Tech Guru - Better Call Bvk"
                />
                {/* Pop art label */}
                <div className="absolute -bottom-2 -right-2 bg-purple text-white font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-tl-xl border-l-2 border-t-2 border-cyan shadow-md">
                  9817596991
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-16 border-y border-white/5 bg-[#080B12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl sm:text-5xl font-display font-bold text-cyan">
                <Counter end={500} suffix="+" />
              </div>
              <p className="text-sm text-foreground/60 uppercase tracking-widest font-mono">Projects Built</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-5xl font-display font-bold text-purple">
                <Counter end={12} suffix="K+" />
              </div>
              <p className="text-sm text-foreground/60 uppercase tracking-widest font-mono">Products Sold</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-5xl font-display font-bold text-cyan">
                <Counter end={99} suffix=".9%" />
              </div>
              <p className="text-sm text-foreground/60 uppercase tracking-widest font-mono">Service Uptime</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-5xl font-display font-bold text-purple">
                <Counter end={8} suffix="+" />
              </div>
              <p className="text-sm text-foreground/60 uppercase tracking-widest font-mono">Years Active</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES ("WHAT WE DO") */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white">
            Comprehensive Digital Mastery
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-base">
            From intelligence models to production server scaling, we deliver systems engineered for speed and defense.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-panel glow-card rounded-2xl p-8 space-y-6">
            <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan border border-cyan/20">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white">AI Services</h3>
            <p className="text-foreground/75 leading-relaxed text-sm">
              Custom RAG pipelines, OpenAI/Gemini integration, fine-tuning vector embeddings, and autonomous agent orchestration tailored for business operations.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel glow-card rounded-2xl p-8 space-y-6">
            <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center text-purple border border-purple/20">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white">IT & Dev Solutions</h3>
            <p className="text-foreground/75 leading-relaxed text-sm">
              Enterprise-grade Next.js development, high-frequency backend API engineering, and automated Kubernetes cloud hosting solutions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel glow-card rounded-2xl p-8 space-y-6">
            <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan border border-cyan/20">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white">Licensing & Goods</h3>
            <p className="text-foreground/75 leading-relaxed text-sm">
              Fully automated software licensing key marketplace. Instantly purchase API keys, cloud resources, and developer tool accounts.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS WITH VISIBLE IMAGES */}
      <section className="py-24 bg-[#080B12] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-3xl text-white">Trending Marketplace Items</h2>
              <p className="text-sm text-foreground/60">Unlock elite digital products instantly with secured payments.</p>
            </div>
            <Link
              href="/marketplace"
              className="inline-flex items-center text-sm font-semibold text-cyan hover:underline mt-4 sm:mt-0"
            >
              View All Products
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingProducts.map((p) => (
              <div key={p.id} className="glass-panel glow-card rounded-2xl p-6 flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  {/* Product cover image container */}
                  <div className="relative h-48 w-full mb-4 bg-black/20 rounded-xl overflow-hidden border border-white/5">
                    <img
                      src={p.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={p.name}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-cyan px-2.5 py-1 bg-cyan/10 rounded-full">
                      {p.category}
                    </span>
                    <div className="flex items-center text-amber-400 text-xs">
                      <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                      <span>{p.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{p.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                  <span className="text-xl font-mono font-bold text-white">{p.price}</span>
                  <Link
                    href={`/marketplace`}
                    className="inline-flex items-center justify-center p-2 rounded-lg bg-white/5 text-white hover:bg-cyan hover:text-background transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RECENT RESEARCH / BLOG */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-3xl text-white">Engineering Research & News</h2>
            <p className="text-sm text-foreground/60">Insights from our tech leads and security teams.</p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-cyan hover:underline"
          >
            Read All Articles
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
              <div className="glass-panel glow-card rounded-2xl p-8 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Blog cover image */}
                  <div className="relative h-44 w-full bg-black/20 rounded-xl overflow-hidden border border-white/5 mb-2">
                    <img
                      src={post.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={post.title}
                    />
                  </div>

                  <span className="text-xs text-foreground/45 font-mono">{post.date}</span>
                  <h3 className="font-display font-bold text-2xl text-white group-hover:text-cyan transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{post.desc}</p>
                </div>
                <span className="inline-flex items-center text-sm font-bold text-cyan mt-6 group-hover:underline">
                  Read Article <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
