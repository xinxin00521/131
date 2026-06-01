import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Share, ShoppingCart, Star, CheckCircle, X, MoreHorizontal, Headphones, MessageCircle, Aperture, Link as LinkIcon, Download, ThumbsUp, Phone, MessageSquare, Play, Heart } from 'lucide-react';
import { Product } from './MallPage';
import { ProductShareModal } from './ProductShareModal';
import { LeadCaptureModal } from './LeadCaptureModal';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  isInWishlist?: boolean;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack, onAddToCart, onBuyNow, isInWishlist = false }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed inset-0 z-[60] bg-[#F7F8FA] flex flex-col"
    >
      {/* Header */}
      <div className="bg-white px-4 pt-14 pb-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 active:bg-gray-50 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <div className="text-[17px] font-medium">产品详情</div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Product Info */}
        <div className="bg-white p-5 mb-3">
          <h1 className="text-[20px] font-bold text-gray-900 mb-3 leading-snug">{product.name}</h1>
          <div className="flex items-baseline gap-2">
            {product.price && product.price !== '面议' ? (
              <>
                <span className="text-[24px] font-black text-[#FF5E3A] leading-none">{product.price}</span>
                <span className="text-[14px] text-gray-400 line-through leading-none">
                  ¥{Math.ceil((parseInt(product.price.replace(/[^\d]/g, ''), 10) * 1.35) / 10) * 10}
                </span>
              </>
            ) : (
              <span className="text-[24px] font-black text-[#FF5E3A] leading-none">{product.price || '面议'}</span>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white p-5 mb-3">
          <h2 className="text-[17px] font-bold text-gray-900 mb-5 flex items-center gap-2">
            <div className="w-1.5 h-4 bg-blue-600 rounded-sm" />
            产品介绍
          </h2>
          
          <div className="space-y-6">
            {/* Overview / Concept */}
            <div className="text-[14px] text-gray-700 leading-relaxed text-justify">
              {product.description || `${product.name} 专为关注财务税务管理的高级人员与企业管理层量身定制。我们不仅提供体系化的理论指导，更结合一线实战经验与典型案例，全方位拓展您的商业视角与风控能力，从而为您与企业创造更深远的价值。`}
            </div>

            {/* Advantages */}
            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/50">
              <h3 className="text-[14px] font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                核心优势
              </h3>
              <ul className="space-y-3">
                <li className="text-[13px] text-gray-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed"><strong>行业专家背书：</strong>由资深大咖、CFO及一流智库专家联合研发指导，保证服务前瞻性。</span>
                </li>
                <li className="text-[13px] text-gray-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed"><strong>落地实战驱动：</strong>拒绝纸上谈兵，依托上百个真实企业案例拆解，所学即所用。</span>
                </li>
                <li className="text-[13px] text-gray-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed"><strong>全链周期陪伴：</strong>配套社群及专属顾问售后解惑，长期追踪反馈落地成果。</span>
                </li>
              </ul>
            </div>

            {/* In-content Product Images (replaces "Long Image Section") */}
            <div className="pt-2 flex flex-col gap-3">
              <img 
                src={`https://picsum.photos/seed/${product.id}_detail1/800/1000`} 
                alt="产品详情内文配图" 
                className="w-full h-auto rounded-xl object-cover border border-gray-100 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <img 
                src={`https://picsum.photos/seed/${product.id}_detail2/800/1000`} 
                alt="产品详情内文配图" 
                className="w-full h-auto rounded-xl object-cover border border-gray-100 shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Conditional Video */}
            {['mall-prod-m1', 'mall-prod-s1', 'mall-prod-c1', 'mall-prod-c14'].includes(product.id) && (
              <div className="pt-2">
                <h3 className="text-[15px] font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                  <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
                  相关视频
                </h3>
                <div className="w-full aspect-video bg-gray-100 rounded-xl overflow-hidden relative border border-gray-100 shadow-sm">
                  <video 
                    src="https://www.w3schools.com/html/mov_bbb.mp4" 
                    poster={`https://picsum.photos/seed/${product.id}_vid/800/450`}
                    controls 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mini Program QR Section */}
        <div className="bg-white p-4 mb-3 flex items-center justify-between mx-4 border border-blue-100 rounded-2xl shadow-[0_4px_20px_rgba(37,99,235,0.05)] bg-gradient-to-r from-blue-50/50 to-white">
          <div className="flex flex-col">
            <h3 className="text-[15px] font-bold text-gray-900 mb-1 flex items-center gap-1.5">
              在小程序中打开
            </h3>
            <span className="text-[12px] text-gray-500">体验更流畅，随时随地学习</span>
          </div>
          <div className="w-14 h-14 bg-white p-1 rounded-xl shadow-sm border border-gray-100 shrink-0">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=miniprogram_${product.id}`} 
              alt="Mini Program QR" 
              className="w-full h-full opacity-90 rounded-md" 
            />
          </div>
        </div>

        {/* Attachments Section */}
        <div className="bg-white p-5 mb-3">
          <h2 className="text-[16px] font-bold text-gray-900 mb-4">产品附件</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50/50">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                  <span className="text-orange-600 font-bold text-[10px]">PDF</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-medium text-gray-900 truncate w-full">{product.name}产品手册.pdf</span>
                  <span className="text-[12px] text-gray-500">2.4 MB</span>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-200 rounded-full transition-colors active:scale-95 shrink-0 ml-2">
                <Download className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50/50">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <span className="text-blue-600 font-bold text-[10px]">DOCX</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-medium text-gray-900 truncate w-full">学习资料与大纲.docx</span>
                  <span className="text-[12px] text-gray-500">1.1 MB</span>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-200 rounded-full transition-colors active:scale-95 shrink-0 ml-2">
                <Download className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 pb-8 flex items-center justify-between gap-4 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
        {/* Left Action Icons: Share & Wishlist */}
        <div className="flex items-center gap-8 pl-4 pr-6 shrink-0">
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className="flex flex-col items-center gap-1.5 group"
          >
            <Share className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors" />
            <span className="text-[11px] text-gray-500 font-medium">分享</span>
          </button>

          <button 
            onClick={() => {
              onAddToCart(product);
              showToast(isInWishlist ? "已从心愿单取消" : "已添加至心愿单");
            }}
            className="flex flex-col items-center gap-1.5 group"
          >
            <Heart className={`w-5 h-5 transition-colors ${isInWishlist ? "fill-rose-500 text-rose-500" : "text-gray-500 group-hover:text-rose-500"}`} />
            <span className={`text-[11px] font-medium ${isInWishlist ? "text-rose-500" : "text-gray-500"}`}>
              {isInWishlist ? "已添加" : "心愿单"}
            </span>
          </button>
        </div>

        {/* Contact Advisor Button */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsLeadModalOpen(true)}
          className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-[15px] rounded-2xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Phone className="w-4 h-4" />
          联系顾问
        </motion.button>
      </div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        title="产品购买咨询"
        description="确认后，专属顾问将尽快与您取得联系，为您提供专业的产品咨询与定制方案。"
        type="purchase"
      />

      {/* Share Modal */}
      <ProductShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        product={product}
      />

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-full text-[14px] flex items-center gap-2 z-[100]"
          >
            <CheckCircle className="w-4 h-4 text-green-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
