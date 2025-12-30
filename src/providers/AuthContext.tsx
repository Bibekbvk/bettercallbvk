'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export interface UserType {
  uid: string;
  email: string;
  name: string;
  avatarUrl: string;
  role: 'admin' | 'customer';
}

interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  loginAsMock: (mockUser: UserType) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync profile logic
  const syncProfile = async (uid: string, email: string, name: string, avatarUrl: string) => {
    try {
      await fetch('/api/auth/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: uid, email, name, avatarUrl }),
      });
    } catch (err) {
      console.warn('Profile sync background warning:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      setLoading(true);
      if (firebaseUser) {
        // Whitelist admin check
        const role = firebaseUser.email === 'admin@bettercallbvk.com' ? 'admin' : 'customer';
        const formattedUser: UserType = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          avatarUrl: firebaseUser.photoURL || '',
          role: role,
        };
        setUser(formattedUser);
        localStorage.setItem('user', JSON.stringify(formattedUser));
        await syncProfile(formattedUser.uid, formattedUser.email, formattedUser.name, formattedUser.avatarUrl);
      } else {
        // Fallback check for Mock Bypass in localStorage
        const cached = localStorage.getItem('user');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            // Ensure if it was a real user, we clean it up (since firebase state is logged out),
            // but if it's a mock user (starting with mock-), we preserve it for dev evaluations.
            if (parsed.uid && parsed.uid.startsWith('mock-')) {
              setUser(parsed);
            } else {
              setUser(null);
              localStorage.removeItem('user');
            }
          } catch {
            setUser(null);
            localStorage.removeItem('user');
          }
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginAsMock = (mockUser: UserType) => {
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    syncProfile(mockUser.uid, mockUser.email, mockUser.name, mockUser.avatarUrl);
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.error('Firebase sign out error:', err);
    }
    setUser(null);
    localStorage.removeItem('user');
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginAsMock, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
