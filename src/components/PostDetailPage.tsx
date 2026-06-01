import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Share2, Star, Eye, ChevronDown, ChevronUp, Play, Lock, Headphones } from 'lucide-react';
import { Post } from '../App';
import { LeadCaptureModal } from './LeadCaptureModal';

interface PostDetailPageProps {
  post: Post;
  onClose: () => void;
  onShareClick: () => void;
}

export const PostDetailPage: React.FC<PostDetailPageProps> = ({ post, onClose, onShareClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  const [isGated, setIsGated] = useState(true);
  const [showLeadModal, setShowLeadModal] = useState(false);

  const isVideo = post.type === 'video' || post.type === 'vertical-video';

  const formatPostTime = (dateStr?: string) => {
    if (!dateStr) return '2026-05-20'; // Default to today for example
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '2026-05-20';
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const diffTime = today.getTime() - targetDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      
      // Case mapping:
      // 当天发布：12:34 发布
      // 昨日发布：昨天发布
      // 以后（今年）：4月2日
      // 跨年：2025年1月23
      
      if (diffDays === 0) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes} 发布`;
      } else if (diffDays === 1) {
        return '昨天发布';
      } else if (date.getFullYear() === now.getFullYear()) {
        return `${date.getMonth() + 1}月${date.getDate()}日`;
      } else {
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      }
    } catch (e) {
      return '2026-05-20';
    }
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[200] bg-white flex flex-col"
    >
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-3 flex items-center justify-between shadow-sm shrink-0 sticky top-0 z-20">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-900 active:scale-95">
          <ChevronLeft className="w-7 h-7" />
        </button>
        <span className="font-bold text-[17px]">
          {post.type === 'course' ? '课程详情' : (post.type === 'event' ? '活动详情' : (isVideo ? '视频播放' : '图文详情'))}
        </span>
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Video Player Section */}
        {isVideo && (
          <div className="w-full bg-black aspect-video relative group">
            {post.videoUrl ? (
              <video 
                src={post.videoUrl} 
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <Play className="w-16 h-16 text-white/50" />
                <span className="absolute bottom-4 text-white/70 text-[12px]">视频资源准备中...</span>
              </div>
            )}
          </div>
        )}

        <div className="p-5">
          {/* Title and Content with Expand/Collapse */}
          <div className="mb-6 flex flex-col gap-2">
            <div className="flex justify-between items-start gap-3">
              <h1 className={`text-[20px] font-bold text-gray-900 leading-snug ${(!isExpanded && isVideo) ? 'line-clamp-2' : ''}`}>
                {post.title || post.content}
              </h1>
              {isVideo && (
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 text-gray-400 active:scale-90 transition-transform bg-gray-50 rounded-full shrink-0"
                >
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              )}
            </div>

            <AnimatePresence>
              {(isExpanded || !isVideo) && (
                <motion.div
                  initial={isVideo ? { height: 0, opacity: 0 } : false}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className={`relative ${!isVideo && isGated ? 'max-h-[300px] overflow-hidden' : ''}`}>
                    <div className="text-[15px] text-gray-600 leading-relaxed mt-2 whitespace-pre-line border-t border-gray-50 pt-4 pb-8">
                      {post.content || '暂无详细介绍'}
                      
                      {!isVideo && post.content && post.content.length > 0 && isGated && (
                        <div className="absolute bottom-0 left-0 w-full h-[180px] bg-gradient-to-t from-white via-white/80 to-transparent flex flex-col items-center justify-end pb-4">
                           <div className="bg-white/95 backdrop-blur border border-blue-50 rounded-2xl p-5 shadow-lg w-full flex flex-col items-center">
                             <div className="flex items-center gap-2 mb-3">
                               <Lock className="w-4 h-4 text-blue-500" />
                               <span className="text-[14px] font-bold text-gray-900">联系顾问阅读全文</span>
                             </div>
                             <button
                               onClick={() => setShowLeadModal(true)}
                               className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 active:scale-95 text-[14px]"
                             >
                               <Headphones className="w-4 h-4" />
                               我想继续阅读
                             </button>
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-6 opacity-100">
            <div className="text-[12px] text-gray-500 flex items-center gap-3">
              <div className="flex items-center">
                <span>{formatPostTime(post.time)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3 text-gray-400" />
                <span>{post.views || 0} 浏览</span>
              </div>
            </div>
          </div>

          {!isVideo && post.images && post.images.length > 0 && (
            <div className={`flex flex-col gap-3 mb-6 ${isGated ? 'opacity-30 pointer-events-none filter blur-sm transition-all' : ''}`}>
              {post.images.map((img, i) => (
                <img key={i} src={img} className="w-full rounded-xl object-cover shadow-sm" alt="" referrerPolicy="no-referrer" />
              ))}
            </div>
          )}
          
          {!isVideo && post.cover && (!post.images || post.images.length === 0) && (
            <div className={`flex flex-col gap-3 mb-6 ${isGated ? 'opacity-30 pointer-events-none filter blur-sm transition-all' : ''}`}>
              <img src={post.cover} className="w-full rounded-xl object-cover shadow-sm" alt="" referrerPolicy="no-referrer" />
            </div>
          )}

          {/* Related Recommendations (Placeholder) */}
          <div className={`mt-8 ${isGated ? 'opacity-30 pointer-events-none filter blur-sm transition-all' : ''}`}>
            <h3 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-red-500 rounded-full" />
              精彩推荐
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-3 active:scale-[0.98] transition-all">
                  <div className="w-32 h-20 rounded-lg bg-gray-100 overflow-hidden shrink-0 shadow-sm">
                    <img src={`https://picsum.photos/seed/rel${i}/300/200`} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div className="text-[14px] font-medium text-gray-900 line-clamp-2 leading-snug">
                      更多精彩内容：关于财税政策的最新深度解读报告
                    </div>
                    <div className="text-[11px] text-gray-400">1.5k 学习 · 2天前</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        onSubmit={() => setIsGated(false)}
        title="联系顾问阅读全文"
      />
    </motion.div>
  );
};
