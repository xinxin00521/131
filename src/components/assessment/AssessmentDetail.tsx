import React, { useState } from 'react';
import { ChevronLeft, Share2, Star, Clock, FileText, User, Play, X, MessageCircle, Aperture, Link as LinkIcon, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Assessment } from './types';

interface AssessmentDetailProps {
  assessment: Assessment;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onBack: () => void;
  onStartTest: () => void;
}

export const AssessmentDetail: React.FC<AssessmentDetailProps> = ({
  assessment,
  isFavorited,
  onToggleFavorite,
  onBack,
  onStartTest
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen bg-white flex flex-col"
    >
      <div className="relative h-72 bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] px-6 pt-12 pb-8 flex flex-col shadow-[0_10px_40px_rgba(139,92,246,0.3)] overflow-hidden">
        <img src={assessment.cover} alt="cover" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="flex items-center text-white mb-auto relative z-10">
          <button 
            onClick={onBack} 
            className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="ml-2 text-[17px] font-bold tracking-wide drop-shadow-md">
            {assessment.category}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="relative z-10"
        >
          <h1 className="text-2xl font-black text-white leading-snug mb-4 drop-shadow-md">
            {assessment.title}
          </h1>
          <div className="flex items-center space-x-5 text-white/90 text-[13px] font-medium">
            <span className="flex items-center bg-black/10 px-2.5 py-1.5 rounded-lg backdrop-blur-sm"><FileText size={14} className="mr-1.5" /> 共{assessment.questionCount}题</span>
            <span className="flex items-center bg-black/10 px-2.5 py-1.5 rounded-lg backdrop-blur-sm"><User size={14} className="mr-1.5" /> {assessment.participants}已测</span>
          </div>
        </motion.div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="flex-1 px-6 py-8 bg-white -mt-6 rounded-t-3xl relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] pb-32">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h3 className="text-[18px] font-black text-gray-900 mb-4 flex items-center">
            {assessment.type === 'evaluation' ? '评估介绍' : '测试介绍'}
          </h3>
          <p className="text-[15px] text-gray-600 leading-relaxed mb-10 bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50">
            {assessment.description}
          </p>
          
          <h3 className="text-[18px] font-black text-gray-900 mb-4 flex items-center">
            {assessment.type === 'evaluation' ? '评估须知' : '测试须知'}
          </h3>
          <div className="text-[14px] text-gray-600 bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50 leading-relaxed">
            {assessment.type === 'evaluation' ? '评估' : '测试'}过程中请勿退出，否则进度将丢失，需重新开始。
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-gray-100 pb-10 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] z-40 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 px-2">
          <button 
            onClick={() => {
              onToggleFavorite();
              showToast(isFavorited ? '已取消收藏' : '已加入收藏');
            }}
            className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
          >
            <Star className={`w-5 h-5 ${isFavorited ? 'text-yellow-500 fill-yellow-500' : 'text-gray-500'}`} />
            <span className="text-[11px] text-gray-500 font-medium">收藏</span>
          </button>
          <button 
            onClick={() => setShowShareModal(true)}
            className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
          >
            <Share2 className="w-5 h-5 text-gray-500" />
            <span className="text-[11px] text-gray-500 font-medium">分享</span>
          </button>
        </div>

          <div className="flex-1 flex items-center gap-3">
          <button 
            onClick={onStartTest}
            className="flex-1 py-3.5 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-xl font-bold text-[15px] shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all"
          >
            立即开始
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showShareModal && (
          <AssessmentShareModal 
            assessment={assessment} 
            onClose={() => setShowShareModal(false)} 
            onAction={(action) => {
              setShowShareModal(false);
              if (action === '下载本地') showToast('海报已保存到相册');
              else if (action === '微信好友') showToast('已准备好发送给好友');
              else if (action === '朋友圈') showToast('已生成朋友圈海报');
              else if (action === '复制链接') {
                alert('链接复制成功');
              }
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 z-[400] bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-lg"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const AssessmentShareModal = ({ assessment, onClose, onAction }: { assessment: Assessment, onClose: () => void, onAction: (action: string) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/80 flex flex-col items-center justify-center p-6 backdrop-blur-sm"
    >
      <div className="absolute top-6 right-6 p-2 cursor-pointer" onClick={onClose}>
        <X className="text-white w-7 h-7" />
      </div>

      {/* Poster Preview */}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-[320px] bg-white rounded-2xl overflow-hidden shadow-2xl mb-8"
      >
        <div className="relative h-48 bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] overflow-hidden">
          <img src={assessment.cover || `https://api.dicebear.com/7.x/shapes/svg?seed=${assessment.id}`} alt="cover" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute bottom-4 left-5 right-5 text-white z-10">
            <div className="text-[10px] font-bold bg-[#8B5CF6] text-white px-2 py-0.5 rounded w-fit mb-2">{assessment.category}</div>
            <h3 className="text-[18px] font-bold text-white leading-snug line-clamp-2">{assessment.title}</h3>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-b from-white to-gray-50">
          <div className="space-y-3 mb-5">
            <div className="flex items-start text-[13px] text-gray-600">
              <FileText size={16} className="mr-2.5 text-[#8B5CF6] mt-0.5 flex-shrink-0" /> 
              <span className="leading-tight">共 {assessment.questionCount} 题</span>
            </div>
            <div className="flex items-start text-[13px] text-gray-600">
              <User size={16} className="mr-2.5 text-[#8B5CF6] mt-0.5 flex-shrink-0" /> 
              <span className="leading-tight">{assessment.participants} 人已测</span>
            </div>
          </div>
          
          {/* Divider */}
          <div className="w-full border-t border-dashed border-gray-200 my-4 relative">
            <div className="absolute -left-7 -top-2 w-4 h-4 rounded-full bg-[#1A1A1A]"></div>
            <div className="absolute -right-7 -top-2 w-4 h-4 rounded-full bg-[#1A1A1A]"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center border border-purple-100">
                <span className="text-[#8B5CF6] font-black text-[12px] tracking-tighter">大成<br/>财税</span>
              </div>
              <div className="text-[10px] text-gray-500 leading-relaxed">长按识别小程序码<br/>立即开始测试</div>
            </div>
            <div className="w-14 h-14 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
              {/* Mock QR Code */}
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=assessment_${assessment.id}`} alt="QR" className="w-full h-full mix-blend-multiply opacity-90" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="w-full max-w-[320px] bg-white/10 backdrop-blur-xl rounded-3xl p-5 flex justify-between items-center border border-white/20 shadow-2xl">
        <button onClick={() => onAction('微信好友')} className="flex flex-col items-center gap-2.5 group">
          <div className="w-12 h-12 rounded-full bg-[#07C160] flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
            <MessageCircle className="text-white w-6 h-6" />
          </div>
          <span className="text-white/90 text-[11px] font-medium">微信好友</span>
        </button>
        <button onClick={() => onAction('朋友圈')} className="flex flex-col items-center gap-2.5 group">
          <div className="w-12 h-12 rounded-full bg-[#07C160] flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
            <Aperture className="text-white w-6 h-6" />
          </div>
          <span className="text-white/90 text-[11px] font-medium">朋友圈</span>
        </button>
        <button onClick={() => onAction('复制链接')} className="flex flex-col items-center gap-2.5 group">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
            <LinkIcon className="text-white w-6 h-6" />
          </div>
          <span className="text-white/90 text-[11px] font-medium">复制链接</span>
        </button>
        <button onClick={() => onAction('下载本地')} className="flex flex-col items-center gap-2.5 group">
          <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
            <Download className="text-white w-6 h-6" />
          </div>
          <span className="text-white/90 text-[11px] font-medium">下载海报</span>
        </button>
      </div>
    </motion.div>
  );
};
