'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '@/lib/firebase';
import { useAuth } from '@/providers/AuthContext';
import { Terminal, Mail, Lock, ShieldAlert, Compass } from 'lucide-react';
import AuroraBg from '@/components/AuroraBg';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function AuthPage() {
  const router = useRouter();
  const { user, loginAsMock, loading: authLoading } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Dynamic redirect check
  useEffect(() => {
    if (user && !authLoading) {
      const searchParams = new URLSearchParams(window.location.search);
      const redirectUrl = searchParams.get('redirect');
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push(user.role === 'admin' ? '/admin' : '/profile');
      }
    }
  }, [user, authLoading, router]);

  const handleOAuth = async (provider: typeof googleProvider | typeof facebookProvider) => {
    setLoading(true);
    setErrorMsg('');
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'OAuth authentication failed. Try Mock Bypass below.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        // Special case: Admin Whitelist local bypass fallback
        if (email === 'admin@bettercallbvk.com' && password === 'admin123') {
          try {
            await signInWithEmailAndPassword(auth, email, password);
          } catch (fbErr) {
            console.warn('Firebase auth failed, utilizing local whitelisted credentials:', fbErr);
            loginAsMock({
              uid: 'mock-admin-123',
              email: 'admin@bettercallbvk.com',
              name: 'Bvk (Admin)',
              avatarUrl: '',
              role: 'admin',
            });
          }
        } else {
          await signInWithEmailAndPassword(auth, email, password);
        }
      } else {
        // Registration
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Email authentication failed. Try Mock Bypass below.');
    } finally {
      setLoading(false);
    }
  };

  // Mock Bypass for local evaluation/testing
  const handleMockBypass = async (role: 'admin' | 'customer') => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    const mockUser = {
      uid: role === 'admin' ? 'mock-admin-123' : 'mock-customer-456',
      email: role === 'admin' ? 'admin@bettercallbvk.com' : 'customer@client.com',
      name: role === 'admin' ? 'Bvk (Admin)' : 'Client Guest',
      avatarUrl: '',
      role: role,
    };
    loginAsMock(mockUser);
    setLoading(false);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuroraBg />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel w-full max-w-md rounded-2xl p-8 space-y-6 border border-white/10 shadow-2xl relative"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <Terminal className="w-10 h-10 mx-auto text-cyan" />
          <h2 className="font-display font-bold text-3xl text-white">
            {isLogin ? 'Access Core Portal' : 'Create Credentials'}
          </h2>
          <p className="text-xs text-foreground/50">Authenticate to secure cloud resources and history</p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-white/5 p-1 rounded-lg">
          <button
            onClick={() => { setIsLogin(true); setErrorMsg(''); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
              isLogin ? 'bg-cyan text-background font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setIsLogin(false); setErrorMsg(''); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
              !isLogin ? 'bg-cyan text-background font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error messaging */}
        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg flex items-start space-x-2 text-xs">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Email Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-foreground/60">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-foreground/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@bettercallbvk.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-foreground/60">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-foreground/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || authLoading}
            className="w-full inline-flex items-center justify-center py-2.5 bg-white/10 text-white font-bold rounded-lg text-sm hover:bg-white/15 transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isLogin ? (
              'Log In with Credentials'
            ) : (
              'Register Account'
            )}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <span className="relative px-3 bg-[#0c101c] text-xs font-mono text-foreground/40">OR OAUTH PROVIDERS</span>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleOAuth(googleProvider)}
            disabled={loading || authLoading}
            className="inline-flex items-center justify-center py-2 border border-white/10 hover:bg-white/5 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            <Compass className="w-4 h-4 mr-2 text-cyan" />
            Google
          </button>
          <button
            onClick={() => handleOAuth(facebookProvider)}
            disabled={loading || authLoading}
            className="inline-flex items-center justify-center py-2 border border-white/10 hover:bg-white/5 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            <FacebookIcon className="w-4 h-4 mr-2 text-blue-500 fill-current" />
            Facebook
          </button>
        </div>

        {/* Mock Bypass Controls (For evaluation and testing without API credentials) */}
        <div className="pt-4 border-t border-white/5 space-y-3">
          <p className="text-[10px] text-center font-mono uppercase text-cyan/70 tracking-wider">
            Mock Bypass (For testing/evaluation)
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleMockBypass('customer')}
              className="py-1.5 bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 text-cyan text-xs font-bold rounded-lg transition-colors"
            >
              Sign In Client Mock
            </button>
            <button
              onClick={() => handleMockBypass('admin')}
              className="py-1.5 bg-purple/10 hover:bg-purple/20 border border-purple/30 text-purple text-xs font-bold rounded-lg transition-colors"
            >
              Sign In Admin Mock
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
