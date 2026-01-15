'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit, Save, Camera, Shield, Bell, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useState } from 'react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  
  // Load saved profile data from localStorage or use defaults
  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userProfile');
      if (saved) return JSON.parse(saved);
    }
    return {
      username: user?.username || 'Emily',
      email: 'emily@example.com',
      phone: '+1 234 567 8900',
      location: 'New York, USA',
      bio: 'Passionate shopper and tech enthusiast',
    };
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save to localStorage or your backend
    localStorage.setItem('userProfile', JSON.stringify(formData));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 px-6 py-8 space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-primary hover:bg-accent"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </motion.div>
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              Profile
            </h1>
            <p className="text-muted-foreground">Manage your account settings</p>
          </div>
        </motion.div>

        {/* Profile Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 lg:grid-cols-3"
        >
          {/* Profile Card */}
          <motion.div variants={item} className="lg:col-span-1">
            <Card className="glass border-none shadow-xl overflow-hidden">
              <CardContent className="pt-6">
                {/* Profile Picture */}
                <div className="relative mx-auto w-32 h-32 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-full h-full rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/30 cursor-pointer group"
                  >
                    <User className="w-16 h-16 text-white" />
                    <motion.div
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 transition-opacity"
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </motion.div>
                  </motion.div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg" />
                </div>

                <h2 className="text-2xl font-bold text-center mb-1 text-foreground">{formData.username}</h2>
                <p className="text-center text-muted-foreground mb-4">{formData.email}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">24</div>
                    <div className="text-xs text-muted-foreground">Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-xs text-muted-foreground">Wishlist</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">5</div>
                    <div className="text-xs text-muted-foreground">Reviews</div>
                  </div>
                </div>

                {/* Action Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6">
                  <Button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30"
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Details Cards */}
          <motion.div variants={item} className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="glass border-none shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => handleChange('username', e.target.value)}
                      disabled={!isEditing}
                      className="glass-blue border-blue-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="glass-blue border-blue-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="glass-blue border-blue-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      disabled={!isEditing}
                      className="glass-blue border-blue-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    disabled={!isEditing}
                    className="glass-blue border-blue-200"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Settings Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Security */}
              <Card className="glass border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <motion.div whileHover={{ x: 5 }} className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Change Password</span>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }} className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Two-Factor Auth</span>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="glass border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <motion.div whileHover={{ x: 5 }} className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Email Notifications</span>
                    </div>
                    <div className="w-10 h-6 bg-linear-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg" />
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }} className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Push Notifications</span>
                    </div>
                    <div className="w-10 h-6 bg-gray-300 rounded-full shadow-lg" />
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
