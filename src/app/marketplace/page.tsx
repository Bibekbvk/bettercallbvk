'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingBag, Eye, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useCart } from '@/providers/CartContext';
import AuroraBg from '@/components/AuroraBg';
import { supabase } from '@/lib/supabase';

// Expanded product catalog lists with actual images
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Gemini Enterprise License Key',
    slug: 'gemini-enterprise-license',
    desc: 'Full access to Google Gemini models with advanced API quotas.',
    price: 26000,
    rating: 5,
    category: 'AI License',
    stock: 24,
    image: '/gemini-license.png',
  },
  {
    id: 2,
    name: 'Supabase Cloud Pro Server',
    slug: 'supabase-cloud-pro',
    desc: 'Optimized PostgreSQL instance with automated backups and 50GB storage.',
    price: 6500,
    rating: 4.8,
    category: 'Cloud Services',
    stock: 15,
    image: '/supabase-server.png',
  },
  {
    id: 3,
    name: 'Cyber Sentinel Security Firewall',
    slug: 'cyber-sentinel-firewall',
    desc: 'Premium rate-limiting and WAF protection middleware suite.',
    price: 17000,
    rating: 4.9,
    category: 'Security',
    stock: 8,
    image: '/security-firewall.png',
  },
  {
    id: 4,
    name: 'Auto-GPT Lead Agent Script',
    slug: 'auto-gpt-lead-agent',
    desc: 'Automated CRM client ingestion script powered by GPT-4o vector storage.',
    price: 10500,
    rating: 4.5,
    category: 'AI License',
    stock: 42,
    image: '/gemini-license.png',
  },
  {
    id: 5,
    name: 'Next.js SaaS Boilerplate Elite',
    slug: 'nextjs-saas-boilerplate',
    desc: 'Full stack starter code with built-in Supabase RLS, Firebase Auth, and Stripe webhooks.',
    price: 19500,
    rating: 4.7,
    category: 'Templates',
    stock: 120,
    image: '/supabase-server.png',
  },
];

export default function Marketplace() {
  const { addItem } = useCart();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('popular');
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true });
        
        if (error) throw error;

        if (data && data.length > 0) {
          const formatted = data.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            desc: p.description,
            price: Number(p.price),
            rating: 5.0,
            category: p.category,
            stock: p.stock,
            image: p.image || '/gemini-license.png',
          }));
          setProducts(formatted);
          setHasMore(false);
        } else {
          // Seed the database table with the defaults
          const allToSeed = INITIAL_PRODUCTS.map(({ id, desc, ...rest }) => ({
            ...rest,
            description: desc,
          }));
          const { data: seeded, error: seedError } = await supabase
            .from('products')
            .insert(allToSeed)
            .select();
          
          if (seedError) throw seedError;
          if (seeded) {
            const formatted = seeded.map((p) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              desc: p.description,
              price: Number(p.price),
              rating: 5.0,
              category: p.category,
              stock: p.stock,
              image: p.image || '/gemini-license.png',
            }));
            setProducts(formatted);
            setHasMore(false);
          }
        }
      } catch (err) {
        console.warn('Could not fetch products from Supabase, using local fallback:', err);
      }
    };
    fetchProducts();
  }, []);

  // Filter and Sort logic
  const filteredProducts = products
    .filter((p) => category === 'All' || p.category === category)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return b.id - a.id; // default popular
    });

  return (
    <div className="relative min-h-screen py-16">
      <AuroraBg />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Page title */}
        <div className="text-center space-y-4 mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-4xl sm:text-6xl text-white"
          >
            Digital Software Marketplace
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-xl mx-auto text-sm sm:text-base"
          >
            Instant digital fulfillment. Access cloud assets, vector starter codes, and premium licensing keys securely.
          </motion.p>
        </div>

        {/* Filters Controls Panel */}
        <div className="glass-panel rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-cyan mr-2" />
            {['All', 'AI License', 'Cloud Services', 'Security', 'Templates'].map((cat) => (
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

          {/* Sorters */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <ArrowUpDown className="w-4 h-4 text-purple mr-2" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-1.5 text-xs focus:outline-none focus:border-cyan w-full md:w-auto"
            >
              <option value="popular" className="bg-[#0c101c]">Sort By: Popularity</option>
              <option value="price-asc" className="bg-[#0c101c]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#0c101c]">Price: High to Low</option>
              <option value="rating" className="bg-[#0c101c]">Sort By: Rating</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="glass-panel glow-card rounded-2xl p-6 flex flex-col justify-between h-full group relative"
              >
                <div className="space-y-4">
                  {/* Product card cover image */}
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
                  <span className="text-xl font-mono font-bold text-white">Rs. {p.price.toLocaleString()}</span>
                  <div className="flex space-x-2">
                    <Link
                      href={`/marketplace/${p.slug}`}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-white/5 text-foreground/80 hover:bg-white/10 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => addItem(p)}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-gradient-to-r from-cyan to-purple text-background hover:opacity-95 transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)] cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>


      </div>
    </div>
  );
}
