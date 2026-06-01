import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Search, Package, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { ProductDetailPage } from './ProductDetailPage';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'completed';
  total: string;
  items: {
    name: string;
    price: string;
    quantity: number;
    image?: string;
  }[];
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-20260401-001',
    date: '2026-04-01 14:30',
    status: 'completed',
    total: '¥999.00',
    items: [
      { name: '会计知识大查练兵项目', price: '¥999.00', quantity: 1 }
    ]
  },
  {
    id: 'ORD-20260328-042',
    date: '2026-03-28 09:15',
    status: 'pending',
    total: '¥2999.00',
    items: [
      { name: '大成税效顾问', price: '¥2999.00', quantity: 1 }
    ]
  }
];

export const OrdersPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const filteredOrders = MOCK_ORDERS.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending': return { text: '待付款', color: 'text-orange-500', icon: <Clock className="w-4 h-4" /> };
      case 'completed': return { text: '已完成', color: 'text-green-500', icon: <CheckCircle2 className="w-4 h-4" /> };
      default: return { text: '未知', color: 'text-gray-500', icon: null };
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed inset-0 z-50 bg-[#F7F8FA] flex flex-col"
    >
      {/* Header */}
      <div className="bg-white px-4 pt-14 pb-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 active:bg-gray-50 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <div className="text-[17px] font-medium">我的订单</div>
        <button className="p-2 -mr-2 active:bg-gray-50 rounded-full transition-colors">
          <Search className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4 flex items-center justify-between border-b border-gray-100 sticky top-[80px] z-10">
        {[
          { id: 'all', label: '全部' },
          { id: 'pending', label: '待付款' },
          { id: 'completed', label: '已完成' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 text-[14px] font-medium relative transition-colors ${
              activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="orderTabIndicator"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-blue-600 rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <Package className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-[14px]">暂无相关订单</p>
          </div>
        ) : (
          filteredOrders.map(order => {
            const statusInfo = getStatusDisplay(order.status);
            return (
              <div 
                key={order.id} 
                className="bg-white rounded-xl p-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
                onClick={() => {
                  if (order.items.length > 0) {
                    setSelectedProduct({
                      id: order.id,
                      name: order.items[0].name,
                      price: order.total,
                      image: order.items[0].image || `https://picsum.photos/seed/${order.id}/400/400`,
                      description: '此商品为您在订单中的已购商品。',
                      tags: ['订单单品']
                    });
                  }
                }}
              >
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-50">
                  <span className="text-[12px] text-gray-500">订单号：{order.id}</span>
                  <div className={`flex items-center gap-1 text-[13px] font-medium ${statusInfo.color}`}>
                    {statusInfo.icon}
                    {statusInfo.text}
                  </div>
                </div>
                
                <div className="space-y-3 mb-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                        <Package className="w-6 h-6 text-gray-300" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-2 mb-1">{item.name}</h4>
                        <div className="text-[12px] text-gray-400">数量: x{item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <span className="text-[12px] text-gray-400">{order.date}</span>
                  <div className="text-[13px] text-gray-600">
                    实付款：<span className="text-[16px] font-bold text-[#FF5E3A]">{order.total}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
                  {order.status === 'pending' && (
                    <>
                      <button className="px-4 py-1.5 rounded-full border border-gray-300 text-[13px] text-gray-600 active:bg-gray-50">取消订单</button>
                      <button className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-[13px] font-medium active:bg-blue-700">立即付款</button>
                    </>
                  )}
                  {order.status === 'completed' && (
                    <>
                      <button className="px-4 py-1.5 rounded-full border border-blue-600 text-blue-600 text-[13px] font-medium active:bg-blue-50">再次购买</button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailPage 
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={() => alert('已加入购物车')}
            onBuyNow={() => alert('正在前往结算')}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
