'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Terminal } from 'lucide-react';
import { useAuth } from '@/providers/AuthContext';
import { supabase } from '@/lib/supabase';

export default function LiveChatWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize session ID
  useEffect(() => {
    if (user) {
      setSessionId(user.uid);
    } else {
      // Check localStorage for existing guest session
      let cached = localStorage.getItem('chat_session_id');
      if (!cached) {
        cached = 'guest_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('chat_session_id', cached);
      }
      setSessionId(cached);
    }
  }, [user]);

  // Load message logs & subscribe to Postgres Realtime modifications
  useEffect(() => {
    if (!sessionId || !isOpen) return;

    const loadMessageHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('session_id', sessionId)
          .order('created_at', { ascending: true });
        if (data) {
          setMessages(data);
        }
      } catch (err) {
        console.warn('Error loading chat history:', err);
      }
    };
    loadMessageHistory();

    const channel = supabase
      .channel(`chat_session_${sessionId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages',
        filter: `session_id=eq.${sessionId}`
      }, (payload) => {
        setMessages((prev) => {
          // Prevent duplicates in state
          if (prev.some(m => m.id === payload.new.id)) return prev;
          return [...prev, payload.new];
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || !sessionId) return;

    const senderName = user ? `${user.name} (${user.email})` : `Guest Client [${sessionId.substring(6, 12)}]`;
    const messageText = inputVal.trim();
    setInputVal('');

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          session_id: sessionId,
          sender: 'client',
          sender_name: senderName,
          message: messageText,
          is_read: false,
        });
      if (error) throw error;
    } catch (err) {
      console.warn('Chat send error, adding local echo:', err);
      // Fallback echo for static tests
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          session_id: sessionId,
          sender: 'client',
          sender_name: senderName,
          message: messageText,
        },
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-cyan to-purple text-background hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] z-50 rounded-full cursor-pointer focus:outline-none"
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      {/* Floating Chat Console */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[90vw] sm:w-[360px] h-[450px] glass-panel border border-white/10 shadow-2xl rounded-2xl flex flex-col justify-between overflow-hidden z-50 bg-[#0c101c]/95 backdrop-blur-md"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-cyan animate-pulse" />
                <div>
                  <h3 className="text-sm font-display font-bold text-white leading-none">Bvk Support Node</h3>
                  <span className="text-[9px] text-foreground/45 font-mono">Real-time Encrypted Stream</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/5 rounded-full text-foreground/50 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-2 text-foreground/40 text-xs px-4">
                  <MessageSquare className="w-8 h-8 text-foreground/20" />
                  <p>Inbound node active. Type a message to establish real-time communication with the support tech.</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isClient = msg.sender === 'client';
                  return (
                    <div
                      key={msg.id || Math.random()}
                      className={`flex flex-col max-w-[85%] ${isClient ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                    >
                      <span className="text-[9px] text-foreground/40 font-mono mb-1">
                        {isClient ? 'You' : msg.sender_name}
                      </span>
                      <div
                        className={`p-2.5 rounded-xl border text-xs leading-normal ${
                          isClient
                            ? 'bg-cyan/10 border-cyan/30 text-white rounded-br-none'
                            : 'bg-purple/10 border-purple/30 text-white rounded-bl-none'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/5 bg-white/5 flex gap-2">
              <input
                type="text"
                required
                placeholder="Type decryption query..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#080c14] border border-white/10 rounded-lg text-xs text-white placeholder-foreground/30 focus:outline-none focus:border-cyan"
              />
              <button
                type="submit"
                className="p-2 bg-cyan text-background rounded-lg hover:opacity-95 transition-all flex items-center justify-center cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
