import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Share2, MoreHorizontal, Play, Pause, 
  Volume2, VolumeX, Maximize2, SkipBack, SkipForward, 
  Star, MessageSquare, Heart, X, Send, Link, MessageCircle, Aperture, ShoppingCart, Download, Eye,
  ChevronDown, ChevronUp, FileText, Clock, User, CheckCircle2, ChevronRight, PieChart, FileBarChart, Info
} from 'lucide-react';
import { LeadCaptureModal } from './LeadCaptureModal';

interface CourseDetailPageProps {
  course: any;
  onClose: () => void;
  onStartTest?: (test: any) => void;
  initialTab?: string;
  initialChapterIndex?: number;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ course, onClose, onStartTest, initialTab = '介绍', initialChapterIndex = 0 }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(initialChapterIndex);
  const [isCollected, setIsCollected] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [showNextRecommend, setShowNextRecommend] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setActiveTab(initialTab);
    setCurrentChapterIndex(initialChapterIndex);
  }, [initialTab, initialChapterIndex, course.id]);

  const chaptersList = course.chapters && course.chapters.length > 0  
    ? course.chapters 
    : [
        { id: 'course-ch-1', title: '核心概念与实战演练', duration: '45:00', progress: 100 },
        { id: 'course-ch-2', title: '进阶技巧深度解析', duration: '32:15', progress: 56 },
        { id: 'course-ch-3', title: '行业案例全方位剖析', duration: '50:20', progress: 0 },
        { id: 'course-ch-4', title: '测试与结业总结', duration: '15:00', progress: 0 },
      ];

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowBackToTop(scrollRef.current.scrollTop > 200);
    }
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tabs = ['介绍', '章节', '讲义', '测试'];

  const handleVideoEnded = () => {
    setShowNextRecommend(true);
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white z-[200] flex flex-col"
    >
      {/* Video Player Header */}
      <div className="relative w-full bg-black aspect-video flex-shrink-0 group">
        <video 
          src={course.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"} 
          className="w-full h-full object-contain"
          autoPlay={course.autoPlay ?? initialTab === '章节'}
          controls
          controlsList="nodownload"
          playsInline
          onEnded={handleVideoEnded}
        />
        
        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 px-4 pt-12 pb-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
          <button onClick={onClose} className="p-2 text-white pointer-events-auto">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Next Recommendation Overlay */}
        <AnimatePresence>
          {showNextRecommend && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 z-20 flex flex-col items-center justify-center text-white px-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 text-green-400 mb-4">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-[16px] font-medium">已学完本课程</span>
              </div>
              <p className="text-[13px] text-gray-300 mb-2">即将播放下一专题：</p>
              <h3 className="text-[18px] font-bold text-center leading-snug mb-8 max-w-[280px]">
                企业财务风险防范指南
              </h3>
              
              <div className="flex items-center gap-4 w-full max-w-[240px]">
                <button 
                  onClick={() => setShowNextRecommend(false)}
                  className="flex-1 py-2.5 rounded-full border border-white/30 text-white text-[14px] font-medium active:bg-white/10 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={() => setShowNextRecommend(false)}
                  className="flex-1 py-2.5 rounded-full bg-blue-600 text-white text-[14px] font-medium active:bg-blue-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Play className="w-4 h-4 fill-white" />
                  播放
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 px-4 bg-white flex-shrink-0">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-[15px] font-medium relative ${
              activeTab === tab ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="courseTabIndicator"
                className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-600 rounded-t-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto bg-gray-50 p-4 no-scrollbar"
      >
        {activeTab === '介绍' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50">
              <h2 className="text-[18px] font-bold text-gray-900 leading-snug mb-4">
                {course.courseTitle || course.title}
              </h2>
              
              <div className="h-[1px] bg-gray-100 w-full mb-4"></div>
              <h3 className="font-bold text-gray-900 mb-2">课程简介</h3>
              <p className="text-[14px] text-gray-600 leading-relaxed whitespace-pre-line">
                {course.content || '本课程深入浅出地讲解了相关领域的核心知识点，结合实际案例分析，帮助学员快速掌握实操技能。无论你是初学者还是有一定经验的从业者，都能从中获得启发。'}
              </p>
            </div>

            {/* 相关课程推荐 */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50">
              <h3 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                相关课程推荐
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'course-rel-101', title: '企业财务风险防范指南', image: 'https://picsum.photos/seed/rel1/400/250', views: '2.1w' },
                  { id: 'course-rel-102', title: '新税法下企业合规应对', image: 'https://picsum.photos/seed/rel2/400/250', views: '3.5w' },
                  { id: 'course-rel-103', title: '年终决算与汇算清缴实务', image: 'https://picsum.photos/seed/rel3/400/250', views: '1.8w' },
                ].map(rel => (
                  <div key={rel.id} className="flex gap-3 group cursor-pointer">
                    <div className="w-28 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img src={rel.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={rel.title} />
                    </div>
                    <div className="flex-1 flex flex-col pt-0.5">
                      <h4 className="text-[14px] font-medium text-gray-900 leading-snug mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">{rel.title}</h4>
                      <div className="mt-auto flex items-center gap-2 text-[12px] text-gray-400">
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {rel.views}学习</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === '章节' && (
          <div className="space-y-3">
            {chaptersList.map((chapter: any, index: number) => (
              <div 
                key={chapter.id} 
                className={`bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border transition-all cursor-pointer ${index === currentChapterIndex ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-gray-50 hover:border-blue-100'}`}
                onClick={() => setCurrentChapterIndex(index)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {index === currentChapterIndex && (
                      <div className="flex items-center gap-0.5 h-3 mt-1.5 flex-shrink-0">
                        <motion.div animate={{ height: ['40%', '100%', '40%'] }} transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }} className="w-0.5 bg-blue-600 rounded-full" />
                        <motion.div animate={{ height: ['100%', '40%', '100%'] }} transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }} className="w-0.5 bg-blue-600 rounded-full" />
                        <motion.div animate={{ height: ['60%', '100%', '60%'] }} transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} className="w-0.5 bg-blue-600 rounded-full" />
                      </div>
                    )}
                    <div>
                      <div className={`text-[14px] font-medium mb-1 line-clamp-2 ${index === currentChapterIndex ? 'text-blue-600' : 'text-gray-900'}`}>第{index + 1}章：{chapter.title}</div>
                      <div className="text-[12px] text-gray-500">视频时长 {chapter.duration}</div>
                    </div>
                  </div>
                  {index === currentChapterIndex ? null : chapter.progress === 100 ? (
                    <span className="shrink-0 px-2 py-0.5 rounded text-[11px] font-medium text-green-600 bg-green-50 border border-green-100">已学完</span>
                  ) : chapter.progress > 0 ? (
                    <span className="shrink-0 px-2 py-0.5 rounded text-[11px] font-medium text-amber-600 bg-amber-50 border border-amber-100">已学{chapter.progress}%</span>
                  ) : (
                    <span className="shrink-0 px-2 py-0.5 rounded text-[11px] font-medium text-gray-400 bg-gray-50 border border-gray-100">未学</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === '讲义' && (
          <div className="bg-white flex flex-col p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-gray-900">课程配套讲义</h3>
              <button 
                className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-600 rounded text-[12px] font-medium active:scale-95 transition-transform"
                onClick={() => alert('已开始下载讲义')}
              >
                <Download className="w-3.5 h-3.5" />
                下载讲义
              </button>
            </div>
            
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-inner flex flex-col items-center justify-center p-4 sm:p-6 aspect-[4/3] relative group">
               {/* PPT Preview Effect */}
               <div className="w-full h-full bg-white rounded shadow-md flex flex-col pt-6 pb-4 px-6 sm:px-8 relative">
                 <div className="text-center mb-6">
                   <h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">{course.courseTitle || course.title || '课程配套讲义'}</h2>
                   <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
                 </div>
                 
                 <div className="space-y-4 flex-1">
                   <div className="h-3 sm:h-4 bg-gray-100 rounded w-full"></div>
                   <div className="h-3 sm:h-4 bg-gray-100 rounded w-5/6"></div>
                   <div className="h-3 sm:h-4 bg-gray-100 rounded w-4/6"></div>
                   
                   <div className="mt-8 flex gap-4">
                     <div className="w-1/2 aspect-video bg-blue-50 rounded flex items-center justify-center">
                       <PieChart className="w-8 h-8 text-blue-300" />
                     </div>
                     <div className="w-1/2 aspect-video bg-emerald-50 rounded flex items-center justify-center">
                       <FileBarChart className="w-8 h-8 text-emerald-300" />
                     </div>
                   </div>
                 </div>
                 
                 <div className="mt-auto text-right text-[10px] text-gray-400">大成财税 · PPT 预览</div>
               </div>
               
               {/* Controls Overlay */}
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="p-1 hover:text-blue-400"><ChevronLeft className="w-5 h-5" /></button>
                 <span className="text-[12px] font-medium">01 / 24</span>
                 <button className="p-1 hover:text-blue-400"><ChevronRight className="w-5 h-5" /></button>
                 <div className="w-[1px] h-4 bg-white/20 mx-1"></div>
                 <button className="p-1 hover:text-blue-400"><Maximize2 className="w-4 h-4" /></button>
               </div>
            </div>
          </div>
        )}
        {activeTab === '测试' && (
          <div className="bg-white p-4 flex flex-col gap-3">
            {[
              { id: 'course-test-1', title: `${course.title || '当前课程'} - 基础知识测试`, qCount: 20, participants: "1.2w", difficulty: "中等" },
              { id: 'course-test-2', title: `${course.title || '当前课程'} - 进阶实操考核`, qCount: 30, participants: "3.5w", difficulty: "困难" },
            ].map((test) => (
              <div key={test.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col gap-3">
                <h4 className="text-[15px] font-bold text-gray-900 leading-snug">{test.title}</h4>
                <div className="flex gap-4 text-[12px] text-gray-500">
                  <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {test.qCount}题</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {test.participants}人考过</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div />
                  <button 
                    className="bg-blue-600 text-white rounded-full px-5 py-1.5 text-[13px] font-medium shadow-sm active:scale-95 transition-transform" 
                    onClick={() => {
                        if (onStartTest) onStartTest(test);
                    }}
                  >
                    开始测试
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between pb-safe flex-shrink-0">
        <div className="flex items-center gap-6 pl-2">
          <button 
            onClick={() => setIsCollected(!isCollected)}
            className={`flex flex-col items-center justify-center gap-1 ${isCollected ? 'text-yellow-500' : 'text-gray-500'}`}
          >
            <Star className="w-5 h-5" fill={isCollected ? "currentColor" : "none"} />
            <span className="text-[10px]">收藏</span>
          </button>
          <button 
            onClick={() => setShowShareModal(true)}
            className="flex flex-col items-center justify-center gap-1 text-gray-500"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-[10px]">分享</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center gap-1 text-gray-500"
          >
            <Eye className="w-5 h-5" />
            <span className="text-[10px]">1.2w学习</span>
          </button>
        </div>
        <button 
          onClick={() => setIsLeadModalOpen(true)}
          className="px-8 py-2.5 bg-blue-600 text-white rounded-full text-[14px] font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform"
        >
          联系顾问试听
        </button>
      </div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        title="预约试听课"
        type="purchase"
      />

      {/* Share Modal */}
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-5 z-[50] w-11 h-11 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <ChevronUp className="w-6 h-6 text-gray-500" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/90 flex flex-col items-center justify-center p-6 backdrop-blur-sm"
          >
            <div className="absolute top-6 right-6 p-2 cursor-pointer" onClick={() => setShowShareModal(false)}>
              <X className="text-white/70 hover:text-white w-7 h-7 transition-colors" />
            </div>

            {/* Top Title */}
            <h2 className="text-white text-[18px] font-bold mb-6 tracking-wider flex items-center gap-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/50"></div>
              邀请好友一起来学习吧
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/50"></div>
            </h2>

            {/* Poster Preview */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-[340px] bg-white rounded-md overflow-hidden relative shadow-2xl p-1.5"
            >
               <div className="w-full h-full bg-gradient-to-b from-[#EFF6FF] via-[#FFFFFF] to-[#DBEAFE] relative pt-8 pb-6 px-4 flex flex-col items-center rounded-sm">
                  {/* Decorative faint borders */}
                  <div className="absolute inset-2 border border-[#BFDBFE]/50 rounded-sm pointer-events-none"></div>
                  
                  {/* Title Section */}
                  <h3 className="text-[20px] font-bold text-[#1E3A8A] text-center mb-3 px-2 line-clamp-2 leading-snug">
                    《{course.title}》
                  </h3>
                  <p className="text-[13px] text-[#3B82F6] text-center mb-6">
                    这门高质量的财税实战课，推荐给你学习
                  </p>

                  {/* Course Image */}
                  <div className="w-4/5 aspect-[4/5] bg-white rounded-lg shadow-xl mb-8 relative p-1 overflow-hidden group">
                     <img src={course.image} alt="cover" className="w-full h-full object-cover rounded-md" />
                     {/* Play icon overlay */}
                     <div className="absolute inset-0 bg-black/10 flex items-end justify-center pb-4">
                       <span className="bg-black/40 text-white text-[12px] px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
                         <Play className="w-3 h-3 fill-white" /> 试听
                       </span>
                     </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="w-full flex items-center justify-between mt-auto pt-2 px-2 relative z-10">
                     <div>
                       <h4 className="text-[18px] font-bold text-[#1E3A8A] mb-1.5 tracking-wide">长按扫码，一起学财税</h4>
                       <p className="text-[12px] text-[#3B82F6]">大成方略 · 企业价值增长加速器</p>
                     </div>
                     
                     {/* QR Code */}
                     <div className="w-20 h-20 bg-white rounded-xl p-1.5 shadow-md relative shrink-0">
                       <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=dacheng`} className="w-full h-full object-contain" alt="QR" />
                       <div className="absolute inset-0 border border-[#BFDBFE]/80 rounded-xl pointer-events-none"></div>
                     </div>
                  </div>
               </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-[13px] mt-6 tracking-wide mb-8"
            >
              长按图片，分享给好友
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-5 gap-4 w-full max-w-[340px]"
            >
              <button 
                onClick={() => setShowShareModal(false)}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-[11px] text-white/80">微信好友</span>
              </button>
              <button 
                onClick={() => setShowShareModal(false)}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform">
                  <Share2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] text-white/80">朋友圈</span>
              </button>
              <button 
                onClick={() => setShowShareModal(false)}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform">
                  <Star className="w-6 h-6" />
                </div>
                <span className="text-[11px] text-white/80">收藏</span>
              </button>
              <button 
                onClick={() => setShowShareModal(false)}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform">
                  <Download className="w-6 h-6" />
                </div>
                <span className="text-[11px] text-white/80">保存图片</span>
              </button>
              <button 
                onClick={() => {
                  alert('复制链接成功');
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform">
                  <Link className="w-6 h-6" />
                </div>
                <span className="text-[11px] text-white/80">复制链接</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
