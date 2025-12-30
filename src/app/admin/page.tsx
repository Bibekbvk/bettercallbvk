'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Inbox,
  ShoppingBag,
  AlertOctagon,
  ArrowRight,
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
  MessageSquare,
  Upload,
  QrCode,
  Image as ImageIcon,
  CheckCheck,
  Send,
  User,
  FileText,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import AuroraBg from '@/components/AuroraBg';
import AdminCharts from '@/components/AdminCharts';
import { useAuth } from '@/providers/AuthContext';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, signOut, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'contacts' | 'chat' | 'settings' | 'blogs'>('analytics');

  // Products CRUD State
  const [products, setProducts] = useState<any[]>([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('AI License');
  const [newProductStock, setNewProductStock] = useState('10');
  const [productFile, setProductFile] = useState<File | null>(null);
  const [productUploadStatus, setProductUploadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Contact Inboxes
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Sarah Connor', email: 'sconnor@resistance.net', subject: 'Cloud Migration', msg: 'Need custom secure vector setup details.', read: false },
    { id: 2, name: 'Miles Dyson', email: 'mdyson@cyberdyne.org', subject: 'Neural Network licensing', msg: 'Gemini Advanced quota billing queries.', read: true },
  ]);

  // Dynamic Orders Database
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Settings & QR code Configuration
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [qrUploadStatus, setQrUploadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [currentQrUrl, setCurrentQrUrl] = useState('/payment-qr.png');

  // Homepage Dynamic Content Editor State
  const [homepageTitle, setHomepageTitle] = useState('Need Innovation?');
  const [homepageSubtitle, setHomepageSubtitle] = useState('We engineer specialized AI Solutions, IT Cloud Services, and Digital Licensing Marketplace.');
  const [homepageHeroImage, setHomepageHeroImage] = useState<File | null>(null);
  const [homepageHeroImageUrl, setHomepageHeroImageUrl] = useState('/guru-poster.jpg');
  const [homepageStatus, setHomepageStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Blog Publisher State
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSlug, setBlogSlug] = useState('');
  const [blogDesc, setBlogDesc] = useState('');
  const [blogCategory, setBlogCategory] = useState('Security');
  const [blogReadTime, setBlogReadTime] = useState('5 min read');
  const [blogContent, setBlogContent] = useState('');
  const [blogFile, setBlogFile] = useState<File | null>(null);
  const [blogStatus, setBlogStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Real-time Chat Inbox State
  const [chatSessions, setChatSessions] = useState<{ id: string; name: string; hasUnread: boolean }[]>([]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [adminReply, setAdminReply] = useState('');

  // Protect Admin Access
  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        router.push('/auth');
      }
    }
  }, [user, authLoading, router]);

  const fallbackOrders = [
    {
      id: 'BVK_TX82741X',
      email: 'alice@gmail.com',
      total: 26000,
      status: 'pending',
      payment_method: 'online',
      transaction_id: 'TXN_GEMINI_998',
      screenshot_url: 'https://cigjeflplghumuzfytxv.supabase.co/storage/v1/object/public/bettercallbvk/screenshots/sample-receipt.png',
    },
    {
      id: 'BVK_TX91024Y',
      email: 'bob.developer@outlook.com',
      total: 19500,
      status: 'accepted',
      payment_method: 'online',
      transaction_id: 'TXN_STRIPE_772',
      screenshot_url: 'https://cigjeflplghumuzfytxv.supabase.co/storage/v1/object/public/bettercallbvk/screenshots/sample-receipt.png',
    },
    {
      id: 'BVK_TX51603Z',
      email: 'guest_nepal@yahoo.com',
      total: 6500,
      status: 'on delivery',
      payment_method: 'cod',
      transaction_id: null,
      screenshot_url: null,
    },
    {
      id: 'BVK_TX44901W',
      email: 'charlie.security@gmail.com',
      total: 17000,
      status: 'completed',
      payment_method: 'online',
      transaction_id: 'TXN_QR_551',
      screenshot_url: 'https://cigjeflplghumuzfytxv.supabase.co/storage/v1/object/public/bettercallbvk/screenshots/sample-receipt.png',
    },
  ];

  // Load orders from database
  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setOrders(data);
      } else {
        setOrders(fallbackOrders);
      }
    } catch (err) {
      console.error('Error fetching admin orders, using fallback:', err);
      setOrders(fallbackOrders);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Load site settings (QR & Homepage content)
  const loadSiteSettings = async () => {
    try {
      const { data: qrData } = await supabase.from('site_settings').select('value').eq('key', 'payment_qr').single();
      if (qrData && qrData.value) setCurrentQrUrl(qrData.value);

      const { data: titleData } = await supabase.from('site_settings').select('value').eq('key', 'homepage_hero_title').single();
      if (titleData && titleData.value) setHomepageTitle(titleData.value);

      const { data: subtitleData } = await supabase.from('site_settings').select('value').eq('key', 'homepage_hero_subtitle').single();
      if (subtitleData && subtitleData.value) setHomepageSubtitle(subtitleData.value);

      const { data: imageData } = await supabase.from('site_settings').select('value').eq('key', 'homepage_hero_image').single();
      if (imageData && imageData.value) setHomepageHeroImageUrl(imageData.value);
    } catch (err) {
      console.warn('Could not fetch settings:', err);
    }
  };

  // Load distinct chat sessions with unread indicators
  const loadChatSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('session_id, sender, sender_name, is_read, created_at')
        .order('created_at', { ascending: false });
      
      if (data) {
        const uniqueSessionsMap = new Map<string, { id: string; name: string; hasUnread: boolean }>();
        data.forEach((msg) => {
          const current = uniqueSessionsMap.get(msg.session_id);
          const isClientUnread = msg.sender === 'client' && !msg.is_read;

          if (!current) {
            uniqueSessionsMap.set(msg.session_id, {
              id: msg.session_id,
              name: msg.sender_name || `Client [${msg.session_id.substring(0, 6)}]`,
              hasUnread: isClientUnread,
            });
          } else if (isClientUnread) {
            current.hasUnread = true;
          }
        });
        setChatSessions(Array.from(uniqueSessionsMap.values()));
      }
    } catch (err) {
      console.error('Error loading chat sessions:', err);
    }
  };
  // Load products from database
  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });
      if (data && data.length > 0) {
        setProducts(data.map((p: any) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          desc: p.description,
          price: Number(p.price),
          stock: p.stock,
          category: p.category,
          image: p.image || '/gemini-license.png',
        })));
      } else {
        // Fallback defaults
        setProducts([
          { id: 1, name: 'Gemini Enterprise License Key', price: 26000, stock: 24, category: 'AI License', image: '/gemini-license.png' },
          { id: 2, name: 'Supabase Cloud Pro Server', price: 6500, stock: 4, category: 'Cloud Services', image: '/supabase-server.png' },
          { id: 3, name: 'Cyber Sentinel Security Firewall', price: 17000, stock: 8, category: 'Security', image: '/security-firewall.png' },
        ]);
      }
    } catch (err) {
      console.warn('Error loading products from Supabase:', err);
    }
  };

  // Fetch initial tabs data
  useEffect(() => {
    if (user && user.role === 'admin') {
      loadOrders();
      loadSiteSettings();
      loadChatSessions();
      loadProducts();
    }
  }, [user, activeTab]);

  // Mark selected session messages as read
  const markSessionRead = async (sessionId: string) => {
    try {
      await supabase
        .from('chat_messages')
        .update({ is_read: true })
        .eq('session_id', sessionId)
        .eq('sender', 'client');
      loadChatSessions(); // Reload sessions to clear indicators
    } catch (err) {
      console.error('Error marking session as read:', err);
    }
  };

  // Real-time Chat Subscription
  useEffect(() => {
    if (!user || user.role !== 'admin' || activeTab !== 'chat') return;

    // Load messages of selected session
    const fetchSessionMessages = async () => {
      if (!activeSession) return;
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', activeSession)
        .order('created_at', { ascending: true });
      if (data) {
        setChatMessages(data);
      }
    };
    fetchSessionMessages();

    if (activeSession) {
      markSessionRead(activeSession);
    }

    // Subscribe to new messages
    const channel = supabase
      .channel('admin_chat_sync')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
        loadChatSessions(); // Refresh session lists
        if (activeSession && payload.new.session_id === activeSession) {
          setChatMessages((prev) => [...prev, payload.new]);
          markSessionRead(activeSession);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeSession, activeTab, user]);

  const handleUpdateOrderStatus = async (orderId: string, nextStatus: 'accepted' | 'on delivery' | 'completed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: nextStatus })
        .eq('id', orderId);
      if (!error) {
        loadOrders();
      } else {
        alert('Error updating status: ' + error.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) return;
    const priceFloat = parseFloat(newProductPrice);
    if (isNaN(priceFloat)) return;

    setProductUploadStatus('loading');
    let finalImg = '/gemini-license.png';
    try {
      if (productFile) {
        const { uploadFileToSupabase } = await import('@/lib/supabase');
        finalImg = await uploadFileToSupabase('bettercallbvk', 'products', productFile);
      }
      
      const generatedSlug = newProductName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const { error } = await supabase
        .from('products')
        .insert({
          name: newProductName,
          slug: generatedSlug,
          description: 'Custom product added via admin panel.',
          price: priceFloat,
          stock: parseInt(newProductStock) || 0,
          category: newProductCategory,
          image: finalImg,
        });

      if (error) throw error;

      await loadProducts();
      setNewProductName('');
      setNewProductPrice('');
      setProductFile(null);
      setProductUploadStatus('success');
    } catch (err) {
      console.error('Product creation failed:', err);
      setProductUploadStatus('error');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      if (!error) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        throw error;
      }
    } catch (err) {
      console.error('Error deleting product from DB:', err);
    }
  };

  const markContactRead = (id: number) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, read: true } : c))
    );
  };

  const handleQrUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qrFile) return;
    setQrUploadStatus('loading');
    try {
      const { uploadFileToSupabase } = await import('@/lib/supabase');
      const publicUrl = await uploadFileToSupabase('bettercallbvk', 'settings', qrFile);
      
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key: 'payment_qr', value: publicUrl }, { onConflict: 'key' });

      if (!error) {
        setQrUploadStatus('success');
        setCurrentQrUrl(publicUrl);
        setQrFile(null);
      } else {
        throw error;
      }
    } catch (err) {
      console.error('QR upload error:', err);
      setQrUploadStatus('error');
    }
  };

  const handleSaveHomepageSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setHomepageStatus('loading');
    try {
      let finalImgUrl = homepageHeroImageUrl;
      if (homepageHeroImage) {
        const { uploadFileToSupabase } = await import('@/lib/supabase');
        finalImgUrl = await uploadFileToSupabase('bettercallbvk', 'config', homepageHeroImage);
      }

      await supabase.from('site_settings').upsert({ key: 'homepage_hero_title', value: homepageTitle }, { onConflict: 'key' });
      await supabase.from('site_settings').upsert({ key: 'homepage_hero_subtitle', value: homepageSubtitle }, { onConflict: 'key' });
      await supabase.from('site_settings').upsert({ key: 'homepage_hero_image', value: finalImgUrl }, { onConflict: 'key' });

      setHomepageHeroImageUrl(finalImgUrl);
      setHomepageHeroImage(null);
      setHomepageStatus('success');
    } catch (err) {
      console.error(err);
      setHomepageStatus('error');
    }
  };

  const handlePublishBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogDesc || !blogContent) return;
    setBlogStatus('loading');

    try {
      let bannerUrl = '/gemini-license.png';
      if (blogFile) {
        const { uploadFileToSupabase } = await import('@/lib/supabase');
        bannerUrl = await uploadFileToSupabase('bettercallbvk', 'blogs', blogFile);
      }

      const postSlug = blogSlug || blogTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      const { error } = await supabase
        .from('blogs')
        .insert({
          title: blogTitle,
          slug: postSlug,
          desc: blogDesc,
          category: blogCategory,
          read_time: blogReadTime,
          image: bannerUrl,
          content: blogContent,
        });

      if (!error) {
        setBlogStatus('success');
        setBlogTitle('');
        setBlogSlug('');
        setBlogDesc('');
        setBlogContent('');
        setBlogFile(null);
      } else {
        throw error;
      }
    } catch (err) {
      console.error('Failed publishing blog:', err);
      setBlogStatus('error');
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSession || !adminReply.trim()) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          session_id: activeSession,
          sender: 'admin',
          sender_name: 'Bvk (Admin)',
          message: adminReply.trim(),
          is_read: true,
        });
      if (!error) {
        setAdminReply('');
      }
    } catch (err) {
      console.error('Chat reply error:', err);
    }
  };

  // Filtered Orders
  const filteredOrders = orders.filter((order) => {
    if (!order || !order.id) return false;
    const matchesSearch =
      order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      (order.email && order.email.toLowerCase().includes(orderSearch.toLowerCase())) ||
      (order.transaction_id && order.transaction_id.toLowerCase().includes(orderSearch.toLowerCase()));
    const matchesFilter = orderStatusFilter === 'all' || order.status === orderStatusFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate Metrics
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + parseFloat(o.total || 0), 0);
  const lowStockItems = products.filter((p) => p.stock < 5).length;
  const activeChatsCount = chatSessions.length;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'accepted': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'on delivery': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-white/5 text-foreground/50 border-white/5';
    }
  };

  if (authLoading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center space-y-4">
        <AlertOctagon className="w-16 h-16 text-red-500 animate-pulse" />
        <h2 className="text-2xl font-bold text-white">Security Block: Admin Role Required</h2>
        <p className="text-sm text-foreground/50">Your active credentials are not authorized for dashboard routers.</p>
        <button
          onClick={() => router.push('/auth')}
          className="px-6 py-2.5 bg-cyan text-background font-bold text-xs rounded-lg hover:bg-cyan-hover cursor-pointer"
        >
          Sign In as Admin
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-10 bg-[#060913]">
      <AuroraBg />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Modern Header Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-white/5 bg-white/5">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-foreground/45">Total Sales Revenue</span>
              <p className="text-2xl font-bold font-mono text-white">Rs. {totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-white/5 bg-white/5">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-foreground/45">Transaction Count</span>
              <p className="text-2xl font-bold font-mono text-white">{orders.length}</p>
            </div>
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-white/5 bg-white/5">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-foreground/45">Active Support Chats</span>
              <p className="text-2xl font-bold font-mono text-white">{activeChatsCount}</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>
          <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-white/5 bg-white/5">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-foreground/45">Critical Low Stocks</span>
              <p className="text-2xl font-bold font-mono text-white">{lowStockItems}</p>
            </div>
            <div className={`p-3 rounded-xl ${lowStockItems > 0 ? 'bg-red-500/10 text-red-400 animate-pulse' : 'bg-white/5 text-foreground/30'}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* 1. Sidebar Nav */}
          <div className="glass-panel rounded-2xl p-5 space-y-5 lg:min-h-[75vh] lg:sticky lg:top-28 flex flex-col justify-between border border-white/5 bg-white/5">
            <div className="space-y-5">
              <div className="space-y-1">
                <h1 className="font-display font-bold text-lg text-white">Admin Command</h1>
                <p className="text-[9px] font-mono text-cyan uppercase tracking-wider">Root authorization node</p>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    activeTab === 'analytics' ? 'bg-cyan text-background font-bold' : 'text-foreground/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Analytics Node</span>
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    activeTab === 'products' ? 'bg-cyan text-background font-bold' : 'text-foreground/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Product Manager</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    activeTab === 'orders' ? 'bg-cyan text-background font-bold' : 'text-foreground/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Orders & Tracking</span>
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    activeTab === 'chat' ? 'bg-cyan text-background font-bold' : 'text-foreground/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Live Support Chat</span>
                </button>
                <button
                  onClick={() => setActiveTab('blogs')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    activeTab === 'blogs' ? 'bg-cyan text-background font-bold' : 'text-foreground/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Blog Publisher</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    activeTab === 'settings' ? 'bg-cyan text-background font-bold' : 'text-foreground/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>QR & Home Config</span>
                </button>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    activeTab === 'contacts' ? 'bg-cyan text-background font-bold' : 'text-foreground/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>Submissions Inbox</span>
                </button>
              </nav>
            </div>

            <button
              onClick={() => signOut()}
              className="w-full flex items-center justify-center space-x-2 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>De-authenticate</span>
            </button>
          </div>

          {/* 2. Main Panel */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* TAB: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <div className="glass-panel p-6 rounded-2xl flex flex-wrap justify-between gap-6 border border-white/5 bg-white/5">
                  <div>
                    <h2 className="font-display font-bold text-2xl text-white">System Analytics</h2>
                    <p className="text-xs text-foreground/50">Realtime activity tracking details</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-[10px] uppercase font-mono text-cyan">Daily Visits</span>
                      <p className="text-xl font-bold font-mono text-white">3,490</p>
                    </div>
                    <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-[10px] uppercase font-mono text-purple">Conversion Rate</span>
                      <p className="text-xl font-bold font-mono text-white">4.2%</p>
                    </div>
                  </div>
                </div>

                <AdminCharts />

                {/* Geography list */}
                <div className="glass-panel p-6 rounded-2xl space-y-4 border border-white/5 bg-white/5">
                  <h3 className="font-display font-semibold text-white">Visitor Geography</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['United States (45%)', 'Nepal (25%)', 'Germany (15%)', 'Canada (15%)'].map((geo) => (
                      <div key={geo} className="bg-white/5 border border-white/5 p-4 rounded-xl text-center">
                        <span className="text-xs font-mono font-bold text-white">{geo}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PRODUCTS (Add custom photos functionality) */}
            {activeTab === 'products' && (
              <div className="space-y-8">
                {/* Create Form */}
                <div className="glass-panel p-6 rounded-2xl space-y-4 border border-white/5 bg-white/5">
                  <h3 className="font-display font-bold text-xl text-white">Deploy New Digital Asset</h3>
                  <form onSubmit={handleCreateProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-foreground/50">Product Name</label>
                      <input
                        type="text"
                        required
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-cyan"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-foreground/50">Price (Rs.)</label>
                      <input
                        type="text"
                        required
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-cyan"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-foreground/50">Category</label>
                      <select
                        value={newProductCategory}
                        onChange={(e) => setNewProductCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-cyan"
                      >
                        <option value="AI License" className="bg-[#0c101c]">AI License</option>
                        <option value="Cloud Services" className="bg-[#0c101c]">Cloud Services</option>
                        <option value="Security" className="bg-[#0c101c]">Security</option>
                        <option value="Templates" className="bg-[#0c101c]">Templates</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-foreground/50">Stock Quantity</label>
                      <input
                        type="number"
                        value={newProductStock}
                        onChange={(e) => setNewProductStock(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-cyan"
                      />
                    </div>
                    
                    {/* File Upload input for product image */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-mono uppercase text-foreground/50">Product Banner Image / Photo</label>
                      <div className="relative border border-dashed border-white/10 hover:border-cyan/50 rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files && setProductFile(e.target.files[0])}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <Upload className="w-5 h-5 text-cyan" />
                        <span className="text-xs text-foreground/60 truncate">
                          {productFile ? productFile.name : 'Upload product logo or screenshot...'}
                        </span>
                      </div>
                    </div>

                    <div className="sm:col-span-2 pt-2">
                      <button
                        type="submit"
                        disabled={productUploadStatus === 'loading'}
                        className="w-full inline-flex items-center justify-center py-2.5 bg-cyan text-background font-bold text-xs rounded-lg hover:bg-cyan-hover transition-colors cursor-pointer"
                      >
                        {productUploadStatus === 'loading' ? (
                          <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-1.5" />
                            Create Product Asset
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Product Inventory Table */}
                <div className="glass-panel p-6 rounded-2xl space-y-4 border border-white/5 bg-white/5">
                  <h3 className="font-display font-semibold text-white">Active Digital Assets Inventory</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-white/5 text-foreground/50 font-mono uppercase">
                          <th className="pb-3 pr-2">Photo</th>
                          <th className="pb-3 pr-2">Asset Name</th>
                          <th className="pb-3 pr-2">Category</th>
                          <th className="pb-3 pr-2">Price</th>
                          <th className="pb-3 pr-2">Stock</th>
                          <th className="pb-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {products.map((p) => (
                          <tr key={p.id} className="align-middle">
                            <td className="py-4 pr-2">
                              <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 bg-slate-800 flex items-center justify-center">
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                              </div>
                            </td>
                            <td className="py-4 font-semibold text-white pr-2">{p.name}</td>
                            <td className="py-4 pr-2">{p.category}</td>
                            <td className="py-4 font-mono pr-2">Rs. {p.price.toLocaleString()}</td>
                            <td className="py-4 font-mono pr-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.stock < 5 ? 'bg-red-500/10 text-red-400 border border-red-500/25 animate-pulse' : 'text-white'}`}>
                                {p.stock} units
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1.5 text-foreground/40 hover:text-red-400 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ORDERS (With filters & searches) */}
            {activeTab === 'orders' && (
              <div className="glass-panel p-6 rounded-2xl space-y-4 border border-white/5 bg-white/5">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <h3 className="font-display font-semibold text-white text-lg">Transactions Database & Lifecycle</h3>
                  <button onClick={loadOrders} className="text-xs text-cyan hover:underline">Refresh</button>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-4 py-2 text-xs">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 text-foreground/45 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search email, TID, or reference ID..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-foreground/30 focus:outline-none focus:border-cyan text-xs"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-cyan" />
                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan text-xs"
                    >
                      <option value="all" className="bg-[#0c101c]">All Statuses</option>
                      <option value="pending" className="bg-[#0c101c]">Pending</option>
                      <option value="accepted" className="bg-[#0c101c]">Accepted</option>
                      <option value="on delivery" className="bg-[#0c101c]">On Delivery</option>
                      <option value="completed" className="bg-[#0c101c]">Completed</option>
                      <option value="cancelled" className="bg-[#0c101c]">Cancelled</option>
                    </select>
                  </div>
                </div>
                
                {loadingOrders ? (
                  <div className="py-12 flex justify-center">
                    <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="py-12 text-center text-foreground/50">
                    No client transactions match the selected filters.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-white/5 text-foreground/50 font-mono uppercase">
                          <th className="pb-3 pr-2">ID</th>
                          <th className="pb-3 pr-2">Customer Email</th>
                          <th className="pb-3 pr-2">Total (NPR)</th>
                          <th className="pb-3 pr-2">Payment Method</th>
                          <th className="pb-3 pr-2">Details (TID/Screenshot)</th>
                          <th className="pb-3 pr-2">Status</th>
                          <th className="pb-3 text-right">Progress Workflow Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="text-white hover:bg-white/5 transition-colors">
                            <td className="py-4 font-mono text-cyan font-bold pr-2">{order.id}</td>
                            <td className="py-4 pr-2">{order.email}</td>
                            <td className="py-4 font-mono font-bold pr-2">Rs. {order.total.toLocaleString()}</td>
                            <td className="py-4 pr-2 capitalize">{order.payment_method}</td>
                            <td className="py-4 text-left space-y-1 max-w-[200px] truncate pr-2">
                              {order.transaction_id && (
                                <div className="font-mono text-[10px]">TID: {order.transaction_id}</div>
                              )}
                              {order.screenshot_url ? (
                                <a
                                  href={order.screenshot_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyan hover:underline font-bold text-[10px] block"
                                >
                                  View Screenshot
                                </a>
                              ) : (
                                order.payment_method === 'online' && <span className="text-red-400/60">No receipt</span>
                              )}
                            </td>
                            <td className="py-4 pr-2">
                              <span className={`inline-flex px-2 py-0.5 border rounded-full text-[9px] font-bold font-mono uppercase ${getStatusStyle(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              {order.status === 'pending' && (
                                <button
                                  onClick={() => handleUpdateOrderStatus(order.id, 'accepted')}
                                  className="px-2.5 py-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                                >
                                  Accept Order
                                </button>
                              )}
                              {order.status === 'accepted' && (
                                <button
                                  onClick={() => handleUpdateOrderStatus(order.id, 'on delivery')}
                                  className="px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                                >
                                  Set On Delivery
                                </button>
                              )}
                              {order.status === 'on delivery' && (
                                <button
                                  onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                                  className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                                >
                                  Mark Completed
                                </button>
                              )}
                              {['completed', 'cancelled'].includes(order.status) && (
                                <span className="text-[10px] text-foreground/30 font-mono">Archived</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB: SETTINGS & BRANDING (Dynamic QR & Homepage Layout Configuration) */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                
                {/* 1. Homepage Content & Branding Editor */}
                <div className="glass-panel p-6 rounded-2xl space-y-6 border border-white/5 bg-white/5">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white">Homepage Content Editor</h3>
                    <p className="text-xs text-foreground/50">Modify the text content and hero graphics of the public homepage.</p>
                  </div>

                  <form onSubmit={handleSaveHomepageSettings} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-foreground/45 uppercase">Hero Title Headline</label>
                          <input
                            type="text"
                            required
                            value={homepageTitle}
                            onChange={(e) => setHomepageTitle(e.target.value)}
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-cyan"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-foreground/45 uppercase">Hero Subtitle Paragraph</label>
                          <textarea
                            required
                            rows={3}
                            value={homepageSubtitle}
                            onChange={(e) => setHomepageSubtitle(e.target.value)}
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-cyan leading-relaxed"
                          />
                        </div>
                        
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-foreground/45 uppercase">Upload New Hero Poster Image</label>
                          <div className="relative border border-dashed border-white/10 hover:border-cyan/50 rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => e.target.files && setHomepageHeroImage(e.target.files[0])}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                            <Upload className="w-6 h-6 text-cyan" />
                            <span className="text-xs text-foreground/60 truncate max-w-full">
                              {homepageHeroImage ? homepageHeroImage.name : 'Select homepage graphic poster...'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Homepage Preview Box */}
                      <div className="bg-white/5 border border-white/5 p-5 rounded-xl space-y-4">
                        <h4 className="font-semibold text-white text-xs uppercase font-mono tracking-wider">Homepage Banner Preview</h4>
                        <div className="border border-white/10 rounded-xl overflow-hidden bg-slate-900 p-4 space-y-4">
                          <div className="space-y-1">
                            <h5 className="font-display font-bold text-white text-sm truncate">{homepageTitle}</h5>
                            <p className="text-[10px] text-foreground/60 leading-normal line-clamp-2">{homepageSubtitle}</p>
                          </div>
                          <div className="w-full h-32 rounded-lg overflow-hidden border border-white/10 bg-slate-800">
                            <img src={homepageHeroImageUrl} alt="Hero image" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={homepageStatus === 'loading'}
                        className="w-full md:w-auto px-6 py-2.5 bg-cyan text-background font-bold text-xs rounded-lg hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {homepageStatus === 'loading' ? (
                          <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        ) : (
                          'Save Homepage Content'
                        )}
                      </button>

                      {homepageStatus === 'success' && (
                        <span className="text-xs text-emerald-400 font-bold font-mono">Homepage settings synchronized!</span>
                      )}
                      {homepageStatus === 'error' && (
                        <span className="text-xs text-red-400 font-bold font-mono">Failed saving configs to database.</span>
                      )}
                    </div>
                  </form>
                </div>

                {/* 2. QR Code Billing Configuration */}
                <div className="glass-panel p-6 rounded-2xl space-y-6 border border-white/5 bg-white/5">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white">QR Code Billing Configuration</h3>
                    <p className="text-xs text-foreground/50">Upload or replace your banking QR code display for online invoices.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Upload Box */}
                    <form onSubmit={handleQrUpload} className="space-y-4 bg-white/5 p-5 rounded-xl border border-white/5">
                      <h4 className="font-semibold text-white text-sm">Upload QR Image</h4>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-foreground/45 uppercase">Select Local QR File</label>
                        <div className="relative border border-dashed border-white/10 hover:border-cyan/50 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all">
                          <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={(e) => e.target.files && setQrFile(e.target.files[0])}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          <Upload className="w-8 h-8 text-cyan" />
                          <span className="text-xs text-foreground/60 truncate max-w-full">
                            {qrFile ? qrFile.name : 'Choose bank QR code image...'}
                          </span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={qrUploadStatus === 'loading'}
                        className="w-full inline-flex items-center justify-center py-2.5 bg-cyan text-background font-bold text-xs rounded-lg hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {qrUploadStatus === 'loading' ? (
                          <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        ) : (
                          'Save Payment QR to settings'
                        )}
                      </button>

                      {qrUploadStatus === 'success' && (
                        <p className="text-[10px] text-emerald-400 text-center font-bold">QR code configuration saved to DB!</p>
                      )}
                      {qrUploadStatus === 'error' && (
                        <p className="text-[10px] text-red-400 text-center font-bold">QR upload error. Check bucket policies.</p>
                      )}
                    </form>

                    {/* Live Preview */}
                    <div className="bg-white/5 border border-white/5 p-5 rounded-xl space-y-3 text-center">
                      <h4 className="font-semibold text-white text-sm">Live Checkout QR Preview</h4>
                      <div className="w-48 h-48 bg-white p-2 border-4 border-cyan rounded-lg mx-auto overflow-hidden">
                        <img src={currentQrUrl} alt="Active QR" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[10px] font-mono text-foreground/40 break-all">{currentQrUrl}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: BLOG PUBLISHER (Post custom blogs dynamically) */}
            {activeTab === 'blogs' && (
              <div className="glass-panel p-6 rounded-2xl space-y-6 border border-white/5 bg-white/5">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Publish New Blog Article</h3>
                  <p className="text-xs text-foreground/50">Write markup articles dynamically saved to Supabase blogs database.</p>
                </div>

                <form onSubmit={handlePublishBlog} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-mono text-foreground/45 uppercase text-[10px]">Article Title</label>
                    <input
                      type="text"
                      required
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan text-xs"
                      placeholder="e.g. Scaling LLM Deployments"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-foreground/45 uppercase text-[10px]">Slug Reference</label>
                    <input
                      type="text"
                      value={blogSlug}
                      onChange={(e) => setBlogSlug(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan text-xs"
                      placeholder="e.g. scaling-llm-deployments (Auto generated if left blank)"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-mono text-foreground/45 uppercase text-[10px]">Brief Summary Description</label>
                    <input
                      type="text"
                      required
                      value={blogDesc}
                      onChange={(e) => setBlogDesc(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan text-xs"
                      placeholder="A short tagline preview of the article contents..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-foreground/45 uppercase text-[10px]">Category</label>
                    <select
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan text-xs"
                    >
                      <option value="Security" className="bg-[#0c101c]">Security</option>
                      <option value="AI Research" className="bg-[#0c101c]">AI Research</option>
                      <option value="Tutorials" className="bg-[#0c101c]">Tutorials</option>
                      <option value="Guides" className="bg-[#0c101c]">Guides</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-foreground/45 uppercase text-[10px]">Read Time</label>
                    <input
                      type="text"
                      required
                      value={blogReadTime}
                      onChange={(e) => setBlogReadTime(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan text-xs"
                      placeholder="e.g. 5 min read"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="font-mono text-foreground/45 uppercase text-[10px]">Article Banner Image File</label>
                    <div className="relative border border-dashed border-white/10 hover:border-cyan/50 rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files && setBlogFile(e.target.files[0])}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <Upload className="w-5 h-5 text-cyan" />
                      <span className="text-xs text-foreground/60 truncate max-w-full font-mono">
                        {blogFile ? blogFile.name : 'Select blog cover banner graphics...'}
                      </span>
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="font-mono text-foreground/45 uppercase text-[10px]">Markdown Article Content</label>
                    <textarea
                      required
                      rows={12}
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan font-mono text-xs leading-relaxed"
                      placeholder="### Markdown heading ... Use standard md formatting."
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-between pt-2">
                    <button
                      type="submit"
                      disabled={blogStatus === 'loading'}
                      className="w-full md:w-auto px-6 py-2.5 bg-cyan text-background font-bold text-xs rounded-lg hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {blogStatus === 'loading' ? (
                        <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      ) : (
                        'Publish Blog Article'
                      )}
                    </button>
                    {blogStatus === 'success' && (
                      <span className="text-xs text-emerald-400 font-bold font-mono">Blog article published successfully!</span>
                    )}
                    {blogStatus === 'error' && (
                      <span className="text-xs text-red-400 font-bold font-mono">Blog upload error. Check logs.</span>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* TAB: CHAT (Real-time Live Support Inbox console with unread indicators) */}
            {activeTab === 'chat' && (
              <div className="glass-panel p-6 rounded-2xl space-y-6 h-[72vh] flex flex-col border border-white/5 bg-white/5">
                <div className="border-b border-white/5 pb-3">
                  <h3 className="font-display font-semibold text-white text-lg flex items-center">
                    <MessageSquare className="w-5 h-5 text-cyan mr-2" />
                    Live Support Chat Console
                  </h3>
                  <p className="text-xs text-foreground/50">Reply to customer inquiries in real-time</p>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
                  {/* Sessions sidebar */}
                  <div className="border-r border-white/5 pr-4 space-y-2 overflow-y-auto max-h-[50vh] md:max-h-full">
                    <h4 className="text-[10px] font-mono uppercase text-foreground/45">Inbound Threads</h4>
                    {chatSessions.length === 0 ? (
                      <p className="text-xs text-foreground/40 py-4 text-center">No active client sessions</p>
                    ) : (
                      chatSessions.map((session) => (
                        <button
                          key={session.id}
                          onClick={() => setActiveSession(session.id)}
                          className={`w-full text-left p-3 rounded-lg border text-xs font-semibold block truncate transition-all cursor-pointer relative ${
                            activeSession === session.id
                              ? 'bg-cyan/10 border-cyan text-cyan'
                              : 'bg-white/5 border-white/5 hover:bg-white/10 text-white'
                          }`}
                        >
                          <div className="font-bold truncate pr-6">{session.name}</div>
                          <div className="text-[9px] text-foreground/45 font-mono truncate">{session.id}</div>
                          
                          {/* Unread dot notification (Blinking green) */}
                          {session.hasUnread && (
                            <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                            </span>
                          )}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Messages workspace */}
                  <div className="md:col-span-2 flex flex-col justify-between h-[45vh] md:h-full overflow-hidden">
                    {activeSession ? (
                      <>
                        {/* Messages logs stream */}
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
                          {chatMessages.map((msg) => {
                            const isAdminMsg = msg.sender === 'admin';
                            return (
                              <div
                                key={msg.id || Math.random()}
                                className={`flex flex-col max-w-[85%] ${isAdminMsg ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                              >
                                <span className="text-[9px] text-foreground/40 font-mono mb-1">{msg.sender_name}</span>
                                <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                                  isAdminMsg
                                    ? 'bg-purple/10 border-purple/30 text-white rounded-br-none'
                                    : 'bg-cyan/10 border-cyan/30 text-white rounded-bl-none'
                                }`}>
                                  {msg.message}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Reply Form */}
                        <form onSubmit={handleSendReply} className="flex gap-2 pt-2 border-t border-white/5">
                          <input
                            type="text"
                            required
                            placeholder="Type encryption reply..."
                            value={adminReply}
                            onChange={(e) => setAdminReply(e.target.value)}
                            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-cyan"
                          />
                          <button
                            type="submit"
                            className="px-4 bg-cyan rounded-lg text-background flex items-center justify-center hover:opacity-95 transition-all cursor-pointer"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </form>
                      </>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center space-y-3 text-foreground/40">
                        <MessageSquare className="w-10 h-10 animate-pulse text-foreground/20" />
                        <p className="text-xs">Select a customer thread from the left menu to establish communication.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CONTACTS */}
            {activeTab === 'contacts' && (
              <div className="glass-panel p-6 rounded-2xl space-y-4 border border-white/5 bg-white/5">
                <h3 className="font-display font-semibold text-white">Client Inquiry Submissions</h3>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-4 rounded-xl border transition-all ${
                        contact.read ? 'bg-white/5 border-white/5' : 'bg-cyan/5 border-cyan/20'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-white text-sm">{contact.name}</h4>
                          <span className="text-xs text-foreground/50 font-mono">{contact.email}</span>
                        </div>
                        {!contact.read && (
                          <button
                            onClick={() => markContactRead(contact.id)}
                            className="inline-flex items-center text-[10px] font-bold text-cyan hover:underline cursor-pointer"
                          >
                            <CheckCircle className="w-3.5 h-3.5 mr-1" />
                            Mark Decrypted
                          </button>
                        )}
                      </div>
                      <div className="border-t border-white/5 pt-2 space-y-1">
                        <span className="text-xs font-mono text-cyan">Subject: {contact.subject}</span>
                        <p className="text-sm text-foreground/75 leading-relaxed pt-1">{contact.msg}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
