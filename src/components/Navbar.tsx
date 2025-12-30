'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, User, Terminal, LogOut } from 'lucide-react';
import { useCart } from '@/providers/CartContext';
import { useAuth } from '@/providers/AuthContext';
import CartDrawer from './CartDrawer';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, signOut } = useAuth();

  // Scroll shrink & blur effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-background/80 backdrop-blur-md border-b border-white/5 shadow-lg'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 text-foreground hover:opacity-90">
              <Terminal className="w-6 h-6 text-cyan" />
              <span className="font-display font-bold text-xl tracking-tight">
                Better Call <span className="text-cyan glow-text-cyan">Bvk</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                      isActive ? 'text-foreground font-semibold' : 'text-foreground/70'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan to-purple rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Icons & Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-foreground/80 hover:text-cyan transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1.5 p-2 text-foreground/80 hover:text-cyan transition-colors cursor-pointer focus:outline-none">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.name} className="w-6 h-6 rounded-full border border-cyan/40" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-cyan/10 border border-cyan/40 flex items-center justify-center text-[10px] font-bold text-cyan">
                        {user.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="text-xs font-semibold text-white/80 hidden lg:inline max-w-[80px] truncate">{user.name}</span>
                  </button>
                  <div className="absolute right-0 top-full pt-2 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="glass-panel w-44 rounded-xl p-3 border border-white/10 shadow-2xl space-y-2 bg-[#0c101c]/95 backdrop-blur-md">
                      <div className="text-[9px] text-foreground/50 truncate font-mono uppercase pb-1 border-b border-white/5">
                        Role: {user.role}
                      </div>
                      {user.role === 'admin' ? (
                        <Link href="/admin" className="block text-xs text-white hover:text-cyan transition-colors py-1">
                          Admin Command
                        </Link>
                      ) : (
                        <Link href="/profile" className="block text-xs text-white hover:text-cyan transition-colors py-1">
                          Client Portal
                        </Link>
                      )}
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left text-xs text-red-400 hover:text-red-300 transition-colors py-1 border-t border-white/5 pt-1.5 cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/auth" className="p-2 text-foreground/80 hover:text-cyan transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              )}
              {/* Magnetic/Premium button style */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-4 py-2 border border-cyan/30 rounded-lg text-sm font-semibold text-cyan hover:bg-cyan/10 transition-all shadow-[0_0_15px_rgba(0,229,255,0.05)] hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                >
                  Get Solutions
                </Link>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-foreground/80 hover:text-cyan transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-foreground/85 hover:text-cyan transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-panel border-x-0 border-b border-white/5"
            >
              <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-cyan/10 text-cyan font-bold'
                          : 'text-foreground/80 hover:bg-white/5 hover:text-foreground'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="pt-4 pb-2 border-t border-white/5 flex items-center justify-between px-3">
                  {user ? (
                    <div className="flex items-center space-x-3">
                      <Link
                        href={user.role === 'admin' ? '/admin' : '/profile'}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-2 text-foreground/85 hover:text-cyan transition-colors"
                      >
                        {user.avatarUrl ? (
                          <img src={user.avatarUrl} alt={user.name} className="w-5 h-5 rounded-full" />
                        ) : (
                          <User className="w-5 h-5" />
                        )}
                        <span className="text-xs font-semibold text-white/80">{user.name}</span>
                      </Link>
                      <button
                        onClick={() => { signOut(); setIsOpen(false); }}
                        className="text-foreground/50 hover:text-red-400 p-1"
                        title="Sign Out"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/auth"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 text-foreground/85 hover:text-cyan transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span>Account</span>
                    </Link>
                  )}
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center px-4 py-2 border border-cyan/30 rounded-lg text-sm font-semibold text-cyan hover:bg-cyan/10"
                  >
                    Get Solutions
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
