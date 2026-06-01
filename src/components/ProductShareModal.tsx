import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Share2, Download, Phone } from 'lucide-react';
import { Product } from './MallPage';

interface ProductShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export const ProductShareModal: React.FC<ProductShareModalProps> = ({
  isOpen,
  onClose,
  product
}) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full bg-[#f8fbff] rounded-t-[40px] p-6 pb-12 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[18px] font-black text-gray-900">生成分享海报</h3>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-400 border border-gray-100 shadow-sm">
                <X size={18} />
              </button>
            </div>

            <div className="mb-8">
              {/* Poster Preview */}
              <div className="bg-white rounded-[24px] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-100 mb-6 max-w-[300px] mx-auto overflow-hidden">
                {/* Header: Logo & Name on left, Mini Program QR on right */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100/60">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-[12px]">
                      大
                    </div>
                    <span className="text-[15px] font-black text-gray-900 tracking-tight">大成方略</span>
                  </div>
                  
                  {/* Mini Program QR Code */}
                  <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-100/50">
                    <div className="w-6.5 h-6.5 bg-white p-0.5 rounded-md border border-gray-200/60 shrink-0">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=miniprogram_${product.id}`} 
                        alt="Mini Program QR" 
                        className="w-full h-full opacity-90 rounded-full" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[8px] text-gray-500 font-bold whitespace-nowrap scale-90 origin-left">扫码进入小程序</span>
                  </div>
                </div>

                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-50 border border-gray-100/50">
                  <img 
                    src={`https://picsum.photos/seed/${product.id}/400/400`} 
                    className="w-full h-full object-cover" 
                    alt="" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-md">
                    大成精选
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-[17px] font-black text-gray-900 mb-2 line-clamp-2 leading-[1.3]">{product.name}</h4>
                  <div className="text-[12px] text-gray-500 line-clamp-2 leading-relaxed mb-3">
                    {product.description || '专业财务与管理培训，实战案例解析，提升企业核心竞争力，助力企业在业务方面进一步发展。'}
                  </div>
                  <div className="text-[22px] font-black text-[#FF5E3A] leading-none">
                    {product.price || '面议'}
                  </div>
                </div>

                <div className="flex items-center gap-3.5 bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="w-14 h-14 bg-white p-1 rounded-lg border border-gray-200 shadow-sm shrink-0">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=wechat_sales_${product.id}`} 
                      alt="Sales WeChat QR" 
                      className="w-full h-full opacity-90" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0 justify-center">
                    <span className="text-[11px] text-gray-400 mb-1 font-medium">长按识别添加顾问微信</span>
                    <span className="text-[14px] font-black text-gray-800 flex items-center gap-1.5 font-mono">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      138-0000-0000
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4 mb-2 max-w-[280px] mx-auto w-full">
              <button className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#07C160] shadow-sm border border-gray-50 group-active:scale-90 transition-transform">
                  <MessageCircle size={28} />
                </div>
                <span className="text-[11px] text-gray-500 font-medium">微信好友</span>
              </button>
              <button className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#ff9f00] shadow-sm border border-gray-50 group-active:scale-90 transition-transform">
                  <Share2 size={24} />
                </div>
                <span className="text-[11px] text-gray-500 font-medium">朋友圈</span>
              </button>
              <button className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-600 shadow-sm border border-gray-50 group-active:scale-90 transition-transform">
                  <Download size={24} />
                </div>
                <span className="text-[11px] text-gray-500 font-medium">保存本地</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
