'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Key, ShoppingBag, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import AuroraBg from '@/components/AuroraBg';

export default function CheckoutSuccessPage() {
  const [orderId, setOrderId] = useState('');
  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
    // Generate/Load Order ID
    const lastOrder = localStorage.getItem('lastOrderId');
    if (lastOrder) {
      setOrderId(lastOrder);
    } else {
      const randomOrder = 'BVK-ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      setOrderId(randomOrder);
    }

    // Get customer ID from auth or generate one
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setCustomerId(parsed.uid ? `BVK-CUST-${parsed.uid.substring(0, 8).toUpperCase()}` : `BVK-CUST-${Math.floor(100000 + Math.random() * 900000)}`);
      } catch {
        setCustomerId(`BVK-CUST-${Math.floor(100000 + Math.random() * 900000)}`);
      }
    } else {
      setCustomerId(`BVK-CUST-${Math.floor(100000 + Math.random() * 900000)}`);
    }

    // Fire celebratory confetti on client mount
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00E5FF', '#7C5CFF', '#ffffff'],
    });
  }, []);

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuroraBg />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel w-full max-w-lg rounded-2xl p-8 space-y-6 text-center border border-white/10 shadow-2xl relative"
      >
        <div className="space-y-4">
          <CheckCircle2 className="w-16 h-16 text-cyan mx-auto animate-bounce" />
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">Payment Authorized!</h1>
          <p className="text-sm text-foreground/70 max-w-sm mx-auto leading-relaxed">
            Your transaction has been processed successfully. Digital licensing tokens and activation scripts have been compiled.
          </p>
        </div>

        {/* Tracking Details Box */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left space-y-4">
          <div className="flex justify-between items-center text-xs font-mono border-b border-white/5 pb-2">
            <span className="text-foreground/50">Tracking Order ID:</span>
            <span className="text-white font-bold">{orderId}</span>
          </div>
          <div className="flex justify-between items-center text-xs font-mono border-b border-white/5 pb-2">
            <span className="text-foreground/50">Your Account ID:</span>
            <span className="text-cyan font-bold">{customerId}</span>
          </div>
          <div className="space-y-2 pt-2">
            <h3 className="font-mono text-xs text-cyan uppercase tracking-widest flex items-center">
              <Key className="w-4 h-4 mr-1.5" />
              Temporary License Key (Mock)
            </h3>
            <div className="bg-black/40 border border-white/5 p-3 rounded font-mono text-xs text-white break-all select-all">
              BCBVK-MOCK-LICENSE-KEY-78X9Y1Z-SECURE
            </div>
          </div>
          <p className="text-[10px] text-foreground/45 leading-normal">
            A confirmation receipt containing instructions and download mirrors has been transmitted to your email address. Reference your Order ID for customer support queries.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/marketplace"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-cyan text-background font-bold rounded-lg hover:bg-cyan-hover transition-colors text-sm"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Back to Catalog
          </Link>
          <Link
            href="/profile"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 border border-white/10 hover:bg-white/5 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Claim on Profile
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
