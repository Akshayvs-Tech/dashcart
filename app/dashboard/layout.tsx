'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, User, LogOut, Sparkles } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useCartStore } from '@/lib/stores/cart-store';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState, useEffect } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const cartCount = getTotalItems();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Don't show header on login page
  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-card/80 border-b border-border backdrop-blur-xl shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/dashboard')}
            >
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                dashkart
              </span>
            </motion.div>

            {/* Navigation Links */}
            <div className="flex items-center gap-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/dashboard/products')}
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                Products
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/dashboard/orders')}
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                Orders
              </motion.button>
            </div>

            {/* Right Section - Cart & User */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Cart Icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push('/dashboard/cart')}
                className="relative p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-linear-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              {/* User Profile */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => router.push('/dashboard/profile')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-linear-to-r from-blue-50 to-indigo-50 cursor-pointer group"
              >
                <User className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">
                  {user?.username || 'Emily'}
                </span>
              </motion.div>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-700 group-hover:text-red-600" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {children}
    </div>
  );
}

