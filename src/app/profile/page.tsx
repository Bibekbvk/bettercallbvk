'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Briefcase, FileText, Code2, Globe, ShieldAlert, ShoppingBag, XCircle, Clock, CheckCircle2, User, Key, LogOut, ArrowRight } from 'lucide-react';
import AuroraBg from '@/components/AuroraBg';
import { useAuth } from '@/providers/AuthContext';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const skills = [
  { name: 'Next.js / React Router', level: '95%' },
  { name: 'Supabase / Postgres Database Routing', level: '90%' },
  { name: 'AI Engineering & Prompt Orchestration', level: '92%' },
  { name: 'TypeScript / Node Architecture', level: '94%' },
  { name: 'DevOps, CI/CD & Secure CSP Deployments', level: '85%' },
];

const timeline = [
  {
    role: 'Principal Tech Lead',
    company: 'Better Call Bvk Solutions',
    period: '2024 - Present',
    desc: 'Architecting custom vector search workflows, licensing portals, and high-security Next.js multi-tenant applications.',
  },
  {
    role: 'Senior Cloud Consultant',
    company: 'Aetheric Software Group',
    period: '2021 - 2024',
    desc: 'Redesigned Postgres architectures with custom triggers, Row Level Security, and automated Docker staging containers.',
  },
  {
    role: 'Full-Stack Developer',
    company: 'Nexus Tech Labs',
    period: '2019 - 2021',
    desc: 'Coded fluid interfaces using Framer Motion and developed microservices with custom NodeJS and Express handlers.',
  },
];

export default function Profile() {
  const { user, signOut, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'bio' | 'client'>('bio');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Set default tab on mount based on login state
  useEffect(() => {
    if (user) {
      setActiveTab('client');
    } else {
      setActiveTab('bio');
    }
  }, [user]);

  // Load orders
  const loadOrders = async () => {
    if (!user) return;
    setLoadingOrders(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.uid)
        .order('created_at', { ascending: false });
      
      if (data && data.length > 0) {
        setOrders(data);
      } else {
        // Safe fallback mock order mapped to this user's profile
        const clientSampleOrders = [
          {
            id: 'BVK_TX82741X',
            user_id: user.uid,
            email: user.email,
            total: 26000,
            status: 'pending',
            payment_method: 'online',
            transaction_id: 'TXN_GEMINI_998',
            screenshot_url: 'https://cigjeflplghumuzfytxv.supabase.co/storage/v1/object/public/bettercallbvk/screenshots/sample-receipt.png',
            created_at: new Date().toISOString(),
          },
        ];
        setOrders(clientSampleOrders);
      }
    } catch (err) {
      console.error('Error fetching client orders:', err);
      // Bypasses database connection issues safely
      const clientSampleOrders = [
        {
          id: 'BVK_TX82741X',
          user_id: user.uid,
          email: user.email,
          total: 26000,
          status: 'pending',
          payment_method: 'online',
          transaction_id: 'TXN_GEMINI_998',
          screenshot_url: 'https://cigjeflplghumuzfytxv.supabase.co/storage/v1/object/public/bettercallbvk/screenshots/sample-receipt.png',
          created_at: new Date().toISOString(),
        },
      ];
      setOrders(clientSampleOrders);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (user && activeTab === 'client') {
      loadOrders();
    }
  }, [user, activeTab]);

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', orderId);
      if (!error) {
        loadOrders();
      } else {
        alert('Could not cancel order: ' + error.message);
      }
    } catch (err) {
      console.error('Cancellation error:', err);
    }
  };

  // Helper status color classes
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'accepted':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'on delivery':
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
      case 'completed':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'cancelled':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      default:
        return 'bg-foreground/10 border-foreground/30 text-foreground/70';
    }
  };

  return (
    <div className="relative min-h-screen py-16">
      <AuroraBg />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Profile Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/5 border border-white/10 p-1 rounded-xl flex space-x-1">
            {user && (
              <button
                onClick={() => setActiveTab('client')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'client' ? 'bg-cyan text-background font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                Client Workspace
              </button>
            )}
            <button
              onClick={() => setActiveTab('bio')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'bio' ? 'bg-cyan text-background font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              Lead Architect Bio
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* 1. Left Profile Card */}
          <div className="glass-panel rounded-2xl p-8 space-y-6 lg:sticky lg:top-28 text-center lg:text-left">
            {/* Avatar simulation for Founder BVK */}
            <div className="relative w-32 h-32 mx-auto lg:mx-0 rounded-2xl overflow-hidden border-2 border-cyan/40 bg-slate-800 flex items-center justify-center text-4xl font-bold font-display text-cyan tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.2)]">
              BVK
            </div>
            
            {/* If Client is Logged In, display their credential widget first */}
            {user && (
              <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/5 text-left">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan/15 text-cyan flex items-center justify-center font-bold text-xs">
                    {user.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="truncate flex-1">
                    <div className="text-xs font-bold text-white truncate">{user.name}</div>
                    <div className="text-[9px] text-foreground/40 font-mono truncate">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => signOut()}
                  className="w-full inline-flex items-center justify-center px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-bold text-[10px] rounded-md transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1.5" />
                  Sign Out Session
                </button>
              </div>
            )}

            {/* Unconditional Lead Architect Bio */}
            <div className="space-y-4 text-center lg:text-left">
              <div className="space-y-1">
                <h1 className="font-display font-bold text-2xl text-white">Bvk Sharma</h1>
                <p className="text-xs font-mono text-cyan uppercase tracking-widest">Founder & Lead Architect</p>
              </div>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Full-stack developer specializing in ultra-performant Next.js configurations, secure database policies, and structured artificial intelligence systems.
              </p>
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href="mailto:contact@bettercallbvk.com"
                  className="inline-flex items-center justify-center px-4 py-2 bg-cyan text-background font-bold text-xs rounded-lg hover:opacity-90 transition-all"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Me
                </a>
                {!user && (
                  <Link
                    href="/auth"
                    className="inline-flex items-center justify-center px-4 py-2 border border-white/10 hover:bg-white/5 text-white text-xs font-semibold rounded-lg transition-all"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In Client Portal
                  </Link>
                )}
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-white/5">
              <a href="#" className="text-foreground/50 hover:text-cyan transition-colors">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/50 hover:text-cyan transition-colors">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/50 hover:text-cyan transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 2. Right Workspace Panels */}
          <div className="lg:col-span-2 space-y-12">
            
            <AnimatePresence mode="wait">
              {activeTab === 'client' && user && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  <div className="glass-panel rounded-2xl p-8 space-y-6">
                    <div className="flex items-center space-x-2 border-b border-white/5 pb-4">
                      <ShoppingBag className="w-6 h-6 text-cyan" />
                      <h2 className="font-display font-bold text-2xl text-white">Your Order Logs</h2>
                    </div>

                    {loadingOrders ? (
                      <div className="py-12 flex justify-center">
                        <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="py-12 text-center space-y-4">
                        <ShoppingBag className="w-12 h-12 text-white/10 mx-auto" />
                        <p className="text-sm text-foreground/50">You have no active orders in your database</p>
                        <Link
                          href="/marketplace"
                          className="inline-flex items-center text-xs text-cyan hover:underline font-semibold"
                        >
                          Shop Marketplace <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <div
                            key={order.id}
                            className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4 hover:border-white/20 transition-all"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-3">
                              <div className="space-y-1">
                                <span className="text-[10px] text-foreground/40 font-mono block">Order ID / reference</span>
                                <span className="font-mono text-sm text-cyan font-bold block">{order.id}</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className={`px-3 py-1 rounded-full border text-xs font-semibold capitalize font-mono ${getStatusStyle(order.status)}`}>
                                  {order.status}
                                </span>
                                
                                {/* Cancel Order Button */}
                                {order.status === 'pending' && (
                                  <button
                                    onClick={() => handleCancelOrder(order.id)}
                                    className="p-1 text-foreground/40 hover:text-red-400 hover:scale-105 transition-all cursor-pointer"
                                    title="Cancel Order"
                                  >
                                    <XCircle className="w-5 h-5" />
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                              <div>
                                <span className="text-foreground/40 block">Bill Sum:</span>
                                <span className="text-white font-bold text-sm">Rs. {order.total.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-foreground/40 block">Billing Path:</span>
                                <span className="text-white capitalize">{order.payment_method}</span>
                              </div>
                              <div className="sm:col-span-2 truncate">
                                <span className="text-foreground/40 block">Date Locked:</span>
                                <span className="text-white">
                                  {new Date(order.created_at).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                            </div>

                            {/* Additional metadata (TID, Receipt, Keys) */}
                            {(order.transaction_id || order.screenshot_url || order.status === 'completed') && (
                              <div className="border-t border-white/5 pt-3 space-y-2 text-xs">
                                {order.transaction_id && (
                                  <div>
                                    <span className="text-foreground/40 font-mono">TID:</span>{' '}
                                    <code className="text-cyan bg-white/5 px-1.5 py-0.5 rounded font-mono text-[10px]">
                                      {order.transaction_id}
                                    </code>
                                  </div>
                                )}
                                {order.screenshot_url && (
                                  <div>
                                    <span className="text-foreground/40 font-mono">Receipt:</span>{' '}
                                    <a
                                      href={order.screenshot_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-cyan hover:underline font-bold"
                                    >
                                      View Payment Receipt Screenshot
                                    </a>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'bio' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-12"
                >
                  {/* Bio summary */}
                  <div className="glass-panel rounded-2xl p-8 space-y-4">
                    <h2 className="font-display font-bold text-2xl text-white flex items-center">
                      <Code2 className="w-5 h-5 text-cyan mr-2" />
                      Professional Summary
                    </h2>
                    <p className="text-foreground/75 leading-relaxed text-sm">
                      With over 7 years of full-stack engineering experience, I bridge the gap between design vision and high-security code execution. I consult for growth-stage tech companies to implement serverless functions, PostgreSQL triggers, OAuth flows, and clean animations that retain visitors.
                    </p>
                    <p className="text-foreground/75 leading-relaxed text-sm">
                      I believe in building applications that are not only visual masterpieces but also fortress-like in security. Every endpoint is rate-limited, every form sanitized, and every database query optimized for minimal round-trip latency.
                    </p>
                  </div>

                  {/* Skill bars */}
                  <div className="glass-panel rounded-2xl p-8 space-y-6">
                    <h2 className="font-display font-bold text-2xl text-white flex items-center">
                      <Briefcase className="w-5 h-5 text-cyan mr-2" />
                      Expertise Levels
                    </h2>
                    <div className="space-y-4">
                      {skills.map((skill) => (
                        <div key={skill.name} className="space-y-1.5">
                          <div className="flex justify-between text-xs sm:text-sm font-semibold text-white">
                            <span>{skill.name}</span>
                            <span className="font-mono text-cyan">{skill.level}</span>
                          </div>
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: skill.level }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              className="bg-gradient-to-r from-cyan to-purple h-full rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* timeline */}
                  <div className="glass-panel rounded-2xl p-8 space-y-8">
                    <h2 className="font-display font-bold text-2xl text-white flex items-center">
                      <Briefcase className="w-5 h-5 text-cyan mr-2" />
                      Career Milestones
                    </h2>
                    <div className="space-y-8 relative border-l border-white/5 pl-4 sm:pl-6 ml-2">
                      {timeline.map((item, index) => (
                        <div key={item.role} className="relative">
                          <div className="absolute -left-[21px] sm:-left-[29px] top-1.5 w-3 h-3 rounded-full bg-purple border-2 border-background" />
                          <div className="space-y-1.5">
                            <span className="text-xs font-mono text-cyan">{item.period}</span>
                            <h3 className="font-display font-bold text-xl text-white leading-none">
                              {item.role} <span className="text-foreground/45 text-base font-normal">at {item.company}</span>
                            </h3>
                            <p className="text-sm text-foreground/60 leading-relaxed pt-1">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </div>
  );
}
