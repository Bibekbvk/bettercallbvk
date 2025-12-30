'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Clock, MessageSquare, Send, CheckCircle2, AlertCircle, X, MapPin } from 'lucide-react';
import AuroraBg from '@/components/AuroraBg';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Contact() {
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Messenger Widget State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatSent, setChatSent] = useState(false);

  // Form Validation
  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const handleMessengerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatSent(true);
    setChatMessage('');
    // Simulate redirection/sending directly to Page inbox
    setTimeout(() => {
      window.open('https://m.me/bettercallbvk', '_blank');
      setChatSent(false);
      setIsChatOpen(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen py-16">
      <AuroraBg />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-4xl sm:text-6xl text-white"
          >
            Get Expert Support
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-xl mx-auto text-sm sm:text-base"
          >
            Have a project query, technical issue, or custom service request? Drop us a line.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* 1. Contact Form Card */}
          <div className="glass-panel rounded-2xl p-8 space-y-6 relative overflow-hidden">
            <h2 className="font-display font-bold text-2xl text-white flex items-center">
              <MessageSquare className="w-5 h-5 text-cyan mr-2" />
              Send a Secure Message
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-foreground/60">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan transition-colors"
                  />
                  {errors.name && <span className="text-xs text-red-400 block">{errors.name}</span>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-foreground/60">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan transition-colors"
                  />
                  {errors.email && <span className="text-xs text-red-400 block">{errors.email}</span>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-foreground/60">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan transition-colors"
                />
                {errors.subject && <span className="text-xs text-red-400 block">{errors.subject}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-foreground/60">Message</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan transition-colors resize-none"
                />
                {errors.message && <span className="text-xs text-red-400 block">{errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full inline-flex items-center justify-center py-3 bg-gradient-to-r from-cyan to-purple text-background font-bold rounded-lg hover:opacity-95 transition-all text-sm disabled:opacity-50"
              >
                {formStatus === 'submitting' ? (
                  <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </>
                )}
              </button>
            </form>

            {/* Form status notification */}
            <AnimatePresence>
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute inset-0 bg-background/95 flex flex-col items-center justify-center text-center p-6 space-y-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-cyan" />
                  <h3 className="font-display font-bold text-2xl text-white">Message Transmitted!</h3>
                  <p className="text-sm text-foreground/60 max-w-xs">
                    Your inquiry has been stored securely in our database. An engineer will follow up shortly.
                  </p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="px-4 py-2 border border-cyan/30 text-cyan rounded-lg text-xs font-bold hover:bg-cyan/10"
                  >
                    Send Another
                  </button>
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute inset-0 bg-background/95 flex flex-col items-center justify-center text-center p-6 space-y-4"
                >
                  <AlertCircle className="w-16 h-16 text-red-500" />
                  <h3 className="font-display font-bold text-2xl text-white">Transmission Defect</h3>
                  <p className="text-sm text-foreground/60 max-w-xs">
                    We encountered an error saving your request. Please try again or reach out directly.
                  </p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="px-4 py-2 border border-white/10 text-white rounded-lg text-xs font-bold hover:bg-white/5"
                  >
                    Back to Form
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Direct Contacts Grid */}
          <div className="space-y-8">
            <div className="glass-panel rounded-2xl p-8 space-y-6">
              <h2 className="font-display font-bold text-2xl text-white">Support Channels</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Secure Mailbox</h3>
                    <p className="text-sm text-foreground/65">bettercallbvk@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-purple/10 border border-purple/20 flex items-center justify-center text-purple shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Hotline</h3>
                    <p className="text-sm text-foreground/65">9817596991</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">HQ Location</h3>
                    <p className="text-sm text-foreground/65">Kathmandu, Nepal</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-purple/10 border border-purple/20 flex items-center justify-center text-purple shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Duty Hours</h3>
                    <p className="text-sm text-foreground/65">Mon - Fri, 09:00 - 18:00 NST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating FAQ card */}
            <div className="glass-panel rounded-2xl p-8">
              <h3 className="font-display font-bold text-xl text-white mb-2">Need Immediate License Key Recovery?</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                If you made a marketplace purchase, licensing tokens are auto-delivered to your profile's purchase history page upon transaction confirmation. Log in to claim yours instantly.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. FLOATING FACEBOOK MESSENGER SIMULATION WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="glass-panel w-80 sm:w-96 rounded-2xl border border-white/10 shadow-2xl mb-4 overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-cyan to-purple p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-background">
                  <FacebookIcon className="w-5 h-5 fill-current" />
                  <span className="font-bold text-sm">Better Call Bvk Messenger</span>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 rounded-full hover:bg-black/10 text-background"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Body */}
              <div className="p-4 bg-background min-h-40 flex flex-col justify-between">
                {chatSent ? (
                  <div className="flex flex-col items-center justify-center text-center space-y-3 py-6">
                    <CheckCircle2 className="w-12 h-12 text-cyan" />
                    <p className="text-sm text-white font-semibold">Initiating Chat Sequence...</p>
                    <p className="text-xs text-foreground/50">Redirecting to Facebook Messenger inbox</p>
                  </div>
                ) : (
                  <form onSubmit={handleMessengerSubmit} className="space-y-4">
                    <p className="text-xs text-foreground/60 leading-normal">
                      We reply instantly via Facebook Messenger. Type your opening query here to connect:
                    </p>
                    <textarea
                      rows={3}
                      required
                      placeholder="How can we assist you today?"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center py-2 bg-cyan text-background font-bold rounded-lg text-xs hover:bg-cyan-hover transition-colors"
                    >
                      Connect in Messenger
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bubble Trigger */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-gradient-to-r from-cyan to-purple rounded-full flex items-center justify-center text-background shadow-2xl hover:opacity-95 transition-all"
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </motion.button>
      </div>
    </div>
  );
}
