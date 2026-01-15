'use client';

import { motion } from 'framer-motion';
import { Package, ShoppingCart, TrendingUp, DollarSign, ArrowRight, Sparkles, Zap, BarChart3, Activity, User, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/lib/hooks/use-api';
import { useCartStore } from '@/lib/stores/cart-store';
import { formatPrice } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  },
};

const FloatingParticle = ({ delay, startX, endX, repeatDelay }: { delay: number; startX: number; endX: number; repeatDelay: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-blue-400/30"
    initial={{ y: 100, x: startX, opacity: 0 }}
    animate={{
      y: -100,
      x: endX,
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      repeatDelay,
    }}
  />
);

export default function DashboardPage() {
  const router = useRouter();
  const { data: productsData, isLoading } = useProducts({ limit: 100 });
  const { items, getTotalPrice, getTotalItems } = useCartStore();
  const { user, logout } = useAuthStore();
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const stats = [
    {
      name: 'Total Products',
      value: productsData?.total || 0,
      icon: Package,
      gradient: 'from-blue-500 via-blue-600 to-blue-700',
      lightGradient: 'from-blue-50 to-blue-100',
      iconBg: 'bg-linear-to-br from-blue-500 to-blue-600',
      delay: 0,
    },
    {
      name: 'Cart Items',
      value: items.length,
      icon: ShoppingCart,
      gradient: 'from-indigo-500 via-indigo-600 to-indigo-700',
      lightGradient: 'from-indigo-50 to-indigo-100',
      iconBg: 'bg-linear-to-br from-indigo-500 to-indigo-600',
      delay: 0.1,
    },
    {
      name: 'Cart Value',
      value: formatPrice(getTotalPrice()),
      icon: DollarSign,
      gradient: 'from-cyan-500 via-cyan-600 to-cyan-700',
      lightGradient: 'from-cyan-50 to-cyan-100',
      iconBg: 'bg-linear-to-br from-cyan-500 to-cyan-600',
      delay: 0.2,
    },
    {
      name: 'Categories',
      value: productsData
        ? new Set(productsData.products.map((p: any) => p.category)).size
        : 0,
      icon: TrendingUp,
      gradient: 'from-sky-500 via-sky-600 to-sky-700',
      lightGradient: 'from-sky-50 to-sky-100',
      iconBg: 'bg-linear-to-br from-sky-500 to-sky-600',
      delay: 0.3,
    },
  ];

  const quickActions = [
    {
      title: 'Manage Products',
      description: 'View, add, edit products',
      href: '/dashboard/products',
      icon: Package,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'View Cart',
      description: 'Review your items',
      href: '/dashboard/cart',
      icon: ShoppingCart,
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      title: 'Orders',
      description: 'Track your orders',
      href: '/dashboard/orders',
      icon: BarChart3,
      gradient: 'from-cyan-500 to-sky-500',
    },
  ];

  return (
    <>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-200/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <FloatingParticle delay={0} startX={23} endX={58} repeatDelay={1.2} />
        <FloatingParticle delay={0.5} startX={75} endX={96} repeatDelay={0.8} />
        <FloatingParticle delay={1} startX={14} endX={28} repeatDelay={1.5} />
        <FloatingParticle delay={1.5} startX={22} endX={21} repeatDelay={1.1} />
        <FloatingParticle delay={2} startX={50} endX={45} repeatDelay={0.9} />
        <FloatingParticle delay={2.5} startX={52} endX={58} repeatDelay={1.3} />
        <FloatingParticle delay={3} startX={3} endX={95} repeatDelay={1.6} />
        <FloatingParticle delay={3.5} startX={57} endX={86} repeatDelay={0.7} />
        <FloatingParticle delay={4} startX={2} endX={89} repeatDelay={1.4} />
        <FloatingParticle delay={4.5} startX={24} endX={51} repeatDelay={1.0} />
      </div>

      <div className="relative z-10 px-6 py-8 space-y-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <motion.div
              className="flex items-center gap-3 mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent animate-gradient">
                Dashboard
              </h1>
            </motion.div>
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome back! Here's your overview
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-blue rounded-2xl px-6 py-4 shadow-lg"
          >
            <div className="text-sm text-muted-foreground font-medium">Current Time</div>
            <div className="text-2xl font-bold text-foreground">
              {mounted && time ? time.toLocaleTimeString() : '--:--:--'}
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.name} variants={item} custom={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="relative overflow-hidden border-none shadow-xl group cursor-pointer glass">
                    {/* Animated Background Gradient */}
                    <div className={`absolute inset-0 bg-linear-to-br ${stat.lightGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
                    
                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                    />
                    
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                      <CardTitle className="text-sm font-bold text-primary uppercase tracking-wider">
                        {stat.name}
                      </CardTitle>
                      <motion.div
                        className={`p-3 rounded-xl ${stat.iconBg} shadow-2xl`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>
                    </CardHeader>
                    
                    <CardContent className="relative z-10">
                      <motion.div
                        className="text-3xl font-bold text-foreground"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: stat.delay + 0.3, type: "spring" }}
                      >
                        {isLoading ? (
                          <div className="w-20 h-8 bg-muted rounded animate-pulse" />
                        ) : (
                          stat.value
                        )}
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-1 mt-2 text-sm text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: stat.delay + 0.5 }}
                      >
                        <Activity className="w-4 h-4" />
                        <span>Active</span>
                      </motion.div>
                    </CardContent>
                    
                    {/* Corner Accent */}
                    <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-linear-to-br from-blue-400/20 to-transparent rounded-full blur-2xl" />
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-none shadow-2xl glass h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-primary" />
                  <CardTitle className="text-2xl font-bold text-foreground">Quick Actions</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">Jump to your most used features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.a
                      key={action.title}
                      href={action.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.03, x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      className="block p-4 rounded-2xl glass-blue hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                    >
                      {/* Hover Background */}
                      <div className={`absolute inset-0 bg-linear-to-r ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      <div className="flex items-center gap-4 relative z-10">
                        <motion.div
                          className={`p-3 rounded-xl bg-linear-to-br ${action.gradient} shadow-lg`}
                          whileHover={{ rotate: 12, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <p className="font-bold text-foreground text-base">{action.title}</p>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </motion.a>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-none shadow-2xl glass h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Activity className="w-6 h-6 text-primary" />
                  <CardTitle className="text-2xl font-bold text-foreground">Recent Activity</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">Your latest actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {items.slice(0, 4).map((cartItem, index) => (
                    <motion.div
                      key={cartItem.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center gap-4 p-3 rounded-2xl glass-blue hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <img
                          src={cartItem.thumbnail}
                          alt={cartItem.title}
                          className="w-16 h-16 rounded-xl object-cover shadow-lg ring-2 ring-blue-200"
                        />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-xs font-bold text-white">{cartItem.quantity}</span>
                        </div>
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{cartItem.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                          <span className="font-semibold">{formatPrice(cartItem.price)}</span>
                          <span className="text-muted-foreground/60">•</span>
                          <span>Qty: {cartItem.quantity}</span>
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  {items.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <ShoppingCart className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
                      <p className="text-foreground font-medium">No items in cart yet</p>
                      <p className="text-sm text-muted-foreground mt-1">Start adding products to see them here</p>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
