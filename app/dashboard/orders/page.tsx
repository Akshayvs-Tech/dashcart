'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Package, Truck, CheckCircle, Clock, X, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useOrderStore } from '@/lib/stores/order-store';
import { formatPrice } from '@/lib/utils';

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

export default function OrdersPage() {
  const { orders, cancelOrder } = useOrderStore();

  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId);
  };

  const downloadCSV = () => {
    // Create CSV content
    const headers = ['Order ID', 'Date', 'Status', 'Items', 'Total', 'Customer Name', 'Address', 'City', 'ZIP'];
    const rows = orders.map(order => [
      order.id,
      new Date(order.date).toLocaleDateString(),
      order.status,
      order.items.length,
      order.total,
      order.shippingAddress.fullName,
      order.shippingAddress.address,
      order.shippingAddress.city,
      order.shippingAddress.zipCode
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
      processing: { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Package },
      shipped: { color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: Truck },
      delivered: { color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  return (
    <div className="relative px-6 py-8 space-y-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">Orders</h1>
            <p className="text-muted-foreground mt-2 text-lg">View your order history</p>
          </div>
          {orders.length > 0 && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={downloadCSV}
                className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/30"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CSV Report
              </Button>
            </motion.div>
          )}
        </motion.div>

      {orders.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-none shadow-2xl glass">
            <CardContent className="pt-12 pb-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="mx-auto w-24 h-24 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-lg"
              >
                <ShoppingBag className="w-12 h-12 text-primary" />
              </motion.div>
              <h2 className="text-3xl font-bold text-foreground mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Start shopping to see your orders here
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {orders.map((order, index) => {
            const statusBadge = getStatusBadge(order.status);
            const StatusIcon = statusBadge.icon;
            
            return (
              <motion.div key={order.id} variants={item} whileHover={{ scale: 1.01, y: -4 }}>
                <Card className="border-none shadow-xl glass">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <ShoppingBag className="w-5 h-5 text-blue-600" />
                          {order.id}
                        </CardTitle>
                        <CardDescription>
                          {new Date(order.date).toLocaleDateString()} • {order.items.length} items • Total: {formatPrice(order.total)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${statusBadge.color} shadow-sm flex items-center gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        {order.status !== 'delivered' && (
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCancelOrder(order.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-3 rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-colors"
                        >
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-lg shadow-md"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{item.title}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-600">{formatPrice(item.price)}</p>
                            <p className="text-xs text-gray-500">each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Shipping to:</p>
                          <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
                          <p className="text-sm text-gray-600">
                            {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.zipCode}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Order Total</p>
                          <p className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {formatPrice(order.total)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
