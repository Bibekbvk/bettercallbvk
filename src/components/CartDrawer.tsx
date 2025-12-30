'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { useCart } from '@/providers/CartContext';
import Link from 'next/link';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[450px] bg-[#0c101c] border-l border-white/5 shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-cyan" />
                <h2 className="font-display font-bold text-lg text-white">Your Cart Drawer</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/5 text-foreground/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Items Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-12 h-12 text-foreground/20 animate-bounce" />
                  <p className="text-sm text-foreground/50">Your cart is empty</p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-bold transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="glass-panel p-4 rounded-xl flex items-center justify-between space-x-4 overflow-hidden"
                    >
                      <div className="flex-1 space-y-1">
                        <h4 className="font-semibold text-white text-sm truncate">{item.name}</h4>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-cyan px-2 py-0.5 bg-cyan/10 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      
                      {/* Quantity adjuster */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-mono text-white font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price and remove */}
                      <div className="flex flex-col items-end space-y-2">
                        <span className="text-xs font-mono font-bold text-white">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-foreground/40 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Drawer Footer / Subtotal */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-[#080b12] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/60">Cart Subtotal</span>
                  <span className="text-xl font-mono font-bold text-white">
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center py-3 bg-gradient-to-r from-cyan to-purple text-background font-bold rounded-lg hover:opacity-95 transition-all text-sm"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
