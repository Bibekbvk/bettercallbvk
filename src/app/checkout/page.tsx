'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/providers/CartContext';
import { useAuth } from '@/providers/AuthContext';
import { ShieldCheck, CreditCard, ArrowLeft, Terminal, AlertCircle, QrCode } from 'lucide-react';
import Link from 'next/link';
import AuroraBg from '@/components/AuroraBg';
import { supabase } from '@/lib/supabase';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  
  const [email, setEmail] = useState('');
  const [checkoutAsGuest, setCheckoutAsGuest] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [transactionId, setTransactionId] = useState('');
  const [screenshotName, setScreenshotName] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [qrImageUrl, setQrImageUrl] = useState('/payment-qr.png');

  // Prefill email if logged in
  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  // Load dyn QR code from settings
  useEffect(() => {
    async function loadQrCode() {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'payment_qr')
          .single();
        if (data && data.value) {
          setQrImageUrl(data.value);
        }
      } catch (err) {
        console.warn('Could not fetch custom payment QR, using local fallback:', err);
      }
    }
    loadQrCode();
  }, []);

  const validate = () => {
    const temp: { [key: string]: string } = {};
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      temp.email = 'Valid email is required for license delivery';
    }
    if (paymentMethod === 'online') {
      if (!transactionId.trim() && !screenshotFile) {
        temp.payment = 'Either Transaction ID (TID) or Payment Screenshot is required';
      }
    }
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // 1. Upload screenshot to Supabase Storage if uploaded
      let screenshotUrl = null;
      if (paymentMethod === 'online' && screenshotFile) {
        try {
          const { uploadFileToSupabase } = await import('@/lib/supabase');
          screenshotUrl = await uploadFileToSupabase('bettercallbvk', 'screenshots', screenshotFile);
        } catch (uploadErr) {
          console.warn('Supabase storage upload bypassed or failed, using receipt name:', uploadErr);
          screenshotUrl = screenshotName || 'receipt_attached';
        }
      }

      // Generate tracking code
      const orderUid = paymentMethod === 'online' && transactionId 
        ? transactionId.trim() 
        : 'BVK_' + Math.random().toString(36).substring(2, 10).toUpperCase();

      // 2. Insert order directly to Supabase
      const { error: dbError } = await supabase
        .from('orders')
        .insert({
          id: orderUid,
          user_id: user?.uid || null,
          email: email,
          total: cartTotal,
          status: 'pending', // Pending phase, cancellable by user
          payment_method: paymentMethod,
          transaction_id: paymentMethod === 'online' ? transactionId : null,
          screenshot_url: screenshotUrl,
        });

      if (!dbError) {
        // Log order items
        const orderItemsPayload = items.map((item) => ({
          order_id: orderUid,
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
        }));
        
        const { error: itemsError } = await supabase.from('order_items').insert(orderItemsPayload);
        if (itemsError) {
          console.warn('Error inserting order items:', itemsError);
        }
      } else {
        console.warn('Supabase DB error logging order, proceeding with client-side fallback:', dbError);
      }

      // 3. Clear cart and redirect to success page
      clearCart();
      
      // Store checkout order ID for success screen lookup
      localStorage.setItem('lastOrderId', orderUid);
      router.push('/checkout/success');
    } catch (err) {
      console.error('Checkout error:', err);
      clearCart();
      router.push('/checkout/success');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshotFile(file);
      setScreenshotName(file.name);
    }
  };

  // 1. Auth Guard Checklist
  if (!user && !checkoutAsGuest) {
    return (
      <div className="relative min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuroraBg />
        <div className="glass-panel w-full max-w-md rounded-2xl p-8 space-y-6 border border-white/10 shadow-2xl relative text-center">
          <Terminal className="w-12 h-12 mx-auto text-cyan animate-pulse" />
          <h2 className="font-display font-bold text-2xl text-white">Security Checkpoint</h2>
          <p className="text-sm text-foreground/60 leading-relaxed">
            To proceed with your order, please authenticate to track your purchase history, or continue checkout as a guest client.
          </p>
          <div className="flex flex-col gap-3 pt-4">
            <Link
              href={`/auth?redirect=/checkout`}
              className="inline-flex items-center justify-center py-2.5 bg-gradient-to-r from-cyan to-purple text-background font-bold rounded-lg text-sm hover:opacity-95 transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)]"
            >
              Sign In / Sign Up
            </Link>
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-4 text-foreground/40 font-mono text-xs">OR</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>
            <button
              onClick={() => setCheckoutAsGuest(true)}
              className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Continue Checkout as Guest
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Terminal className="w-12 h-12 text-cyan" />
        <h2 className="text-xl font-bold text-white">Invoice Queue Clear</h2>
        <p className="text-sm text-foreground/50">There are no digital licensing tokens in your invoice list.</p>
        <Link href="/marketplace" className="text-cyan hover:underline text-xs">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-16">
      <AuroraBg />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Link
          href="/marketplace"
          className="inline-flex items-center text-sm text-foreground/50 hover:text-cyan transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Marketplace
        </Link>

        <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-8">Secure Invoicing & Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Billing Form Column */}
          <div className="lg:col-span-2 glass-panel rounded-2xl p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="font-display font-bold text-xl text-white flex items-center">
                <ShieldCheck className="w-5 h-5 text-cyan mr-2" />
                Delivery Details & Payment
              </h2>
              {checkoutAsGuest && (
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan px-2 py-0.5 bg-cyan/10 rounded-full">
                  Guest Session
                </span>
              )}
            </div>

            {errors.submit && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg flex items-start space-x-2 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errors.submit}</span>
              </div>
            )}

            <form onSubmit={handlePay} className="space-y-6">
              
              {/* License delivery destination email */}
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-foreground/60">Email Address (Key Delivery Destination)</label>
                <input
                  type="email"
                  required
                  placeholder="recipient@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan"
                />
                {errors.email && <span className="text-xs text-red-400 block">{errors.email}</span>}
              </div>

              {/* Payment Method Selector */}
              <div className="border-t border-white/5 pt-6 space-y-4">
                <h3 className="font-semibold text-white text-sm flex items-center">
                  <CreditCard className="w-4 h-4 text-cyan mr-2" />
                  Select Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* COD Option */}
                  <label 
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod' 
                        ? 'border-cyan bg-cyan/5 text-white' 
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-foreground/70'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => {}}
                        className="accent-cyan"
                      />
                      <div>
                        <span className="text-sm font-semibold block">Cash on Delivery (COD)</span>
                        <span className="text-xs text-foreground/50">Pay upon keys activation</span>
                      </div>
                    </div>
                  </label>

                  {/* Online QR Option */}
                  <label 
                    onClick={() => setPaymentMethod('online')}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'online' 
                        ? 'border-cyan bg-cyan/5 text-white' 
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-foreground/70'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={paymentMethod === 'online'} 
                        onChange={() => {}}
                        className="accent-cyan"
                      />
                      <div>
                        <span className="text-sm font-semibold block">QR Payment (Bank Transfer)</span>
                        <span className="text-xs text-foreground/50">Fonepay/eSewa bank QR Scan</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Conditional online payment view displaying QR and transaction id */}
              <AnimatePresence mode="wait">
                {paymentMethod === 'online' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/5 pt-6 space-y-6 overflow-hidden"
                  >
                    {/* QR Display */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-40 h-40 shrink-0 bg-white p-2 rounded-lg relative flex items-center justify-center border-4 border-cyan overflow-hidden">
                        <img 
                          src={qrImageUrl} 
                          className="w-full h-full object-contain" 
                          alt="BVK Bank Payment QR Code" 
                        />
                      </div>
                      <div className="space-y-2 text-center sm:text-left">
                        <span className="inline-flex items-center text-xs font-mono font-bold text-cyan bg-cyan/10 px-2 py-0.5 rounded-full">
                          <QrCode className="w-3.5 h-3.5 mr-1" />
                          Official Bank QR
                        </span>
                        <h4 className="font-display font-bold text-white text-lg">Scan & Transfer Payment</h4>
                        <p className="text-xs text-foreground/70 leading-relaxed">
                          Scan the QR code to make your transfer. Account: <strong>Better Call Bvk AI</strong>. Contact Mobile: <strong>9817596991</strong> (Kathmandu, Nepal).
                        </p>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono uppercase text-foreground/60">Transaction Reference ID (TID) *</label>
                        <input
                          type="text"
                          placeholder="e.g. TXN-81972412"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono uppercase text-foreground/60">Upload Payment Screenshot *</label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-foreground/60 focus:outline-none focus:border-cyan flex items-center justify-between">
                            <span className="truncate max-w-[180px]">
                              {screenshotName || 'Choose screenshot image...'}
                            </span>
                            <span className="text-xs text-cyan underline shrink-0 font-bold">Browse</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {errors.payment && (
                      <span className="text-xs text-red-400 block">{errors.payment}</span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-cyan to-purple text-background font-bold rounded-lg hover:opacity-95 transition-all text-sm mt-4 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                ) : (
                  `Execute Secure Order (Rs. ${cartTotal.toLocaleString()})`
                )}
              </button>
            </form>
          </div>

          {/* Cart Summary Column */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Invoice Summary</h3>
            <div className="divide-y divide-white/5 text-sm">
              {items.map((item) => (
                <div key={item.id} className="py-3 flex justify-between space-x-2">
                  <div className="space-y-0.5">
                    <span className="text-white block font-semibold truncate max-w-44">{item.name}</span>
                    <span className="text-xs text-foreground/50">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-mono text-white">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-base">
              <span className="text-foreground/60">Grand Total</span>
              <span className="font-mono font-bold text-white text-lg">Rs. {cartTotal.toLocaleString()}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
