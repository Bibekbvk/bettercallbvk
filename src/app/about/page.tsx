'use client';

import { motion } from 'framer-motion';
import { Shield, Brain, Zap, HelpCircle, Terminal } from 'lucide-react';
import AuroraBg from '@/components/AuroraBg';

// Timeline steps
const milestones = [
  {
    year: '2022',
    title: 'The Seed Idea',
    desc: 'Bvk started as a specialized consultancy, resolving complex multi-tenant cloud outages and AI prototypes for early-stage fintechs.',
  },
  {
    year: '2024',
    title: 'Better Call Bvk Launch',
    desc: 'Rebranded and unified under the "expert on call" banner, delivering dedicated end-to-end full-stack architectures and RAG systems.',
  },
  {
    year: '2026',
    title: 'Marketplace & Research Hub',
    desc: 'Expanded into an automated licensing distributor, launching pre-configured cloud resources, developer keys, and cutting-edge tech studies.',
  },
];

// Tech stack logo list (reusable mock names/icons)
const techStack = [
  { name: 'Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'GSAP', category: 'Animation' },
  { name: 'Firebase', category: 'Authentication & Analytics' },
  { name: 'Supabase / Postgres', category: 'Database & RLS' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Stripe', category: 'Payments' },
];

export default function About() {
  return (
    <div className="relative min-h-screen py-16">
      <AuroraBg />

      {/* 1. BRAND STORY HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-20 pt-10">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-4xl sm:text-6xl text-white"
        >
          Our Core Mission & Story
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-foreground/60 max-w-2xl mx-auto text-base sm:text-lg"
        >
          We are elite architects, builders, and troubleshooters. When scale breaks or AI behaves unpredictably, teams call us.
        </motion.p>
      </div>

      {/* 2. Brand Timeline */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <h2 className="font-display font-bold text-3xl text-center text-white mb-16">
          Evolutionary Timeline
        </h2>
        <div className="relative border-l border-white/5 pl-6 sm:pl-8 space-y-12">
          {milestones.map((step, index) => (
            <motion.div
              key={step.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Bullet circle */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-cyan border-4 border-background shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan px-2.5 py-1 bg-cyan/10 rounded-full">
                  {step.year}
                </span>
                <h3 className="font-display font-bold text-2xl text-white pt-2">{step.title}</h3>
                <p className="text-foreground/65 text-sm leading-relaxed max-w-2xl">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="bg-[#080B12] py-24 border-y border-white/5 mb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-center text-white mb-16">
            Our Development Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel rounded-xl p-8 space-y-4">
              <Zap className="w-8 h-8 text-cyan" />
              <h3 className="font-display font-bold text-xl text-white">Performant Scaling</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Code should run at 60fps and APIs must respond in sub-100ms. We construct lightweight pipelines that eliminate overhead.
              </p>
            </div>
            <div className="glass-panel rounded-xl p-8 space-y-4">
              <Shield className="w-8 h-8 text-purple" />
              <h3 className="font-display font-bold text-xl text-white">Military-Grade Defense</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                We default to strict Row Level Security, Content Security Policies, and client-side sanitization to keep endpoints fortified.
              </p>
            </div>
            <div className="glass-panel rounded-xl p-8 space-y-4">
              <Brain className="w-8 h-8 text-cyan" />
              <h3 className="font-display font-bold text-xl text-white">True Intelligence</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                We replace simple chatbots with contextual, robust semantic models and structured pipelines that provide actual business value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tech Stack Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display font-bold text-3xl text-center text-white mb-4">
          Tech Stack Expertise
        </h2>
        <p className="text-sm text-foreground/60 text-center max-w-xl mx-auto mb-12">
          We construct clean foundations utilizing the most efficient web libraries available.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.03, borderColor: 'rgba(0, 229, 255, 0.3)' }}
              className="glass-panel rounded-xl p-6 text-center border border-white/5 transition-all"
            >
              <Terminal className="w-5 h-5 mx-auto mb-2 text-cyan/70" />
              <h4 className="font-semibold text-white text-base">{tech.name}</h4>
              <span className="text-[10px] font-mono text-foreground/50 tracking-wider block mt-1 uppercase">
                {tech.category}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
