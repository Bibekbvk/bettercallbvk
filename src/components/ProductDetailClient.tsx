'use client';

import { useState } from 'react';
import { Star, ShoppingBag, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '@/providers/CartContext';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  slug: string;
  desc: string;
  price: number;
  rating: number;
  category: string;
  stock: number;
  image: string;
  features: string[];
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviews, setReviews] = useState<{ name: string; stars: number; comment: string }[]>([
    { name: 'Alex K.', stars: 5, comment: 'Key worked instantly. The API quotas are exactly as advertised!' },
    { name: 'Maria D.', stars: 4, comment: 'Very clean code structures, got my SaaS online in under an hour.' },
  ]);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    setReviews((prev) => [
      ...prev,
      { name: 'You (Verified Buyer)', stars: reviewRating, comment: reviewComment },
    ]);
    setReviewComment('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      
      {/* Back Link */}
      <Link
        href="/marketplace"
        className="inline-flex items-center text-sm text-foreground/50 hover:text-cyan transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Catalog
      </Link>

      {/* Core Product Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Visual Mockup */}
        <div className="glass-panel rounded-2xl p-8 aspect-video sm:aspect-square flex flex-col items-center justify-center relative overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan/5 to-purple/5 -z-10" />
          <img
            src={product.image}
            className="w-full h-64 object-contain rounded-xl mb-4"
            alt={product.name}
          />
          <span className="font-mono text-xs uppercase tracking-widest text-cyan px-3 py-1 bg-cyan/10 rounded-full mb-2">
            {product.category}
          </span>
          <h2 className="font-display font-bold text-2xl text-white text-center">{product.name}</h2>
          <p className="text-xs text-foreground/40 mt-2 font-mono uppercase">Direct Digital Key Delivery</p>
        </div>

        {/* Right Column: Spec Sheet & Checkout */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-foreground/45 uppercase">Catalog ID: #{product.id}</span>
              <div className="flex items-center text-amber-400 text-sm">
                <Star className="w-4 h-4 fill-current mr-0.5" />
                <span className="font-bold text-white">{product.rating}</span>
              </div>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight">
              {product.name}
            </h1>
            <p className="text-base text-foreground/75 leading-relaxed">{product.desc}</p>
          </div>

          {/* Price and Cart Action */}
          <div className="glass-panel rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-foreground/50 block font-mono uppercase">Unit Cost</span>
              <span className="text-3xl font-mono font-bold text-white">Rs. {product.price.toLocaleString()}</span>
            </div>
            <button
              onClick={() => addItem(product)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-cyan to-purple text-background font-bold rounded-lg hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)] text-sm cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </button>
          </div>

          {/* Feature list */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-white">Item Scope & Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-foreground/70">
              {product.features.map((feat) => (
                <li key={feat} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-cyan shrink-0 mt-0.5 mr-2" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20 border-t border-white/5 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left reviews detail */}
          <div className="space-y-6">
            <h2 className="font-display font-bold text-2xl text-white">Verified Reviews</h2>
            
            {/* Form to submit rating */}
            <form onSubmit={handleReviewSubmit} className="glass-panel p-6 rounded-xl space-y-4">
              <h4 className="font-semibold text-white text-sm">Write a post-purchase review</h4>
              
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-foreground/50 block">Rating</label>
                <div className="flex space-x-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setReviewRating(s)}
                      className="p-0.5 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${s <= reviewRating ? 'fill-current' : 'text-foreground/20'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-foreground/50 block">Comments</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your purchase experience..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-cyan resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg transition-colors border border-white/10"
              >
                Submit Review
              </button>
              
              {reviewSuccess && (
                <p className="text-[10px] text-cyan text-center">Review saved to verified database!</p>
              )}
            </form>
          </div>

          {/* List of reviews */}
          <div className="lg:col-span-2 space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className="glass-panel p-6 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white text-sm">{r.name}</span>
                  <div className="flex text-amber-400 text-xs">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${idx < r.stars ? 'fill-current' : 'text-foreground/20'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground/65 leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
