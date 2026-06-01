import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Share2, MoreHorizontal, Play, Pause, 
  Volume2, VolumeX, Maximize2, SkipBack, SkipForward, 
  Star, MessageSquare, Heart, X, Send, Link, MessageCircle, Aperture, ShoppingCart, Download, Eye,
  ChevronDown, ChevronUp, FileText, Clock, User, CheckCircle2
} from 'lucide-react';
import { LeadCaptureModal } from './LeadCaptureModal';
import { Post } from '../App';

interface ShortVideoFeedsProps {
  initialIndex?: number;
  posts: Post[];
  onClose: () => void;
  onShareClick?: () => void;
  onCourseClick?: (post: Post) => void;
  onEventClick?: (post: Post) => void;
}

export const ShortVideoFeeds: React.FC<ShortVideoFeedsProps> = ({ 
  initialIndex = 0, 
  posts = [], 
  onClose,
  onShareClick,
  onCourseClick,
  onEventClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Filter for only video posts to ensure swiping only between videos
  // But actually the user clicked a specific index in the mixed list, so we must just show that one and scroll between them. Wait, if we scroll to text, it's weird. 
  // Let's filter first and find the new index.
  const videoPosts = posts.filter(p => p.type === 'video' || p.type === 'vertical-video');
  const actualInitialIndex = Math.max(0, videoPosts.findIndex(p => p.id === posts[initialIndex]?.id));
  
  const [activeIndex, setActiveIndex] = useState(actualInitialIndex > -1 ? actualInitialIndex : 0);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const windowHeight = container.clientHeight;
    
    // Calculate which video is currently most visible
    const newIndex = Math.round(scrollPosition / windowHeight);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < videoPosts.length) {
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: activeIndex * containerRef.current.clientHeight,
        behavior: 'instant'
      });
    }
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-[200] overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Video Feed */}
      <div 
        ref={containerRef}
        className="flex-1 w-full h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
      >
        {videoPosts.map((post, index) => (
          <VideoItem 
            key={post.id} 
            post={post} 
            isActive={index === activeIndex}
            index={index}
            onLeadClick={() => setIsLeadModalOpen(true)}
            onCourseClick={() => onCourseClick?.(post)}
            onEventClick={() => onEventClick?.(post)}
          />
        ))}
        {videoPosts.length === 0 && (
          <div className="flex h-full items-center justify-center text-white/50">
            暂无视频内容
          </div>
        )}
      </div>

      {/* Lead Modal */}
      {isLeadModalOpen && (
        <LeadCaptureModal
          isOpen={true}
          onClose={() => setIsLeadModalOpen(false)}
        />
      )}
    </motion.div>
  );
};

const VideoItem = ({ post, isActive, index, onLeadClick, onCourseClick, onEventClick }: { 
  post: Post, 
  isActive: boolean, 
  index: number, 
  onLeadClick: () => void,
  onCourseClick: () => void,
  onEventClick: () => void
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [isActive]);

  const getConsultStyle = () => {
    const types = [
      { text: '咨询顾问', icon: <MessageCircle className="w-4 h-4" /> },
      { text: '学习课程', icon: <Play className="w-4 h-4" /> },
      { text: '查看活动', icon: <Star className="w-4 h-4" /> }
    ];
    return types[index % 3];
  };

  const consultConfig = getConsultStyle();

  return (
    <div className="w-full h-full snap-start relative bg-black flex items-center justify-center">
      {/* Video Content */}
      <div className="w-full h-full relative" onClick={() => setIsPlaying(!isPlaying)}>
        {post.videoUrl && isActive ? (
          <video
            src={post.videoUrl}
            className={`w-full h-full ${post.type === 'vertical-video' ? 'object-cover' : 'object-contain'}`}
            loop
            playsInline
            autoPlay={isActive}
            muted={false}
          />
        ) : (
          <img 
            src={post.cover || (post.images && post.images[0]) || "https://picsum.photos/seed/dance/500/800"} 
            className={`w-full h-full ${post.type === 'vertical-video' ? 'object-cover opacity-80' : 'object-contain opacity-80'}`} 
            alt="video cover" 
          />
        )}
        
        {/* Play/Pause overlay */}
        {!isPlaying && isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play className="w-16 h-16 text-white/80 fill-white/80" />
          </div>
        )}
      </div>

      {/* Info & Interactions Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
        
        {/* Left Info */}
        <div className="flex-1 pr-12 pointer-events-auto">
          <div onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer relative overflow-hidden">
            <h2 className={`text-[15px] text-white font-medium leading-snug drop-shadow-md transition-all ${isExpanded ? '' : 'line-clamp-2 pr-6'}`}>
              {post.title}
              {!isExpanded && (
                <span className="absolute right-0 bottom-0 text-white/90">
                  <ChevronDown className="w-5 h-5" />
                </span>
              )}
              {isExpanded && (
                <span className="inline-flex items-center ml-1 align-middle text-white/90">
                  <ChevronUp className="w-5 h-5" />
                </span>
              )}
            </h2>
            {isExpanded && (
              <p className="text-[13px] text-white/90 leading-relaxed drop-shadow mt-2 transition-all">
                {post.content || '这是为你提供的一个示例文本内容，当内容过长时会被折叠。'}
              </p>
            )}
          </div>

          {/* Consult Banner */}
          <div
            className="mt-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 flex items-center justify-between shadow-xl cursor-pointer pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              const type = index % 3;
              if (type === 0) onLeadClick();
              else if (type === 1) onCourseClick();
              else if (type === 2) onEventClick();
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg">
                {consultConfig.icon}
              </div>
              <div className="text-[15px] text-white font-bold tracking-wide">{consultConfig.text}</div>
            </div>
            <ChevronLeft className="w-4 h-4 text-white/50 rotate-180" />
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex flex-col items-center gap-5 pointer-events-auto shrink-0 pb-4">
          <button 
            className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
            onClick={() => setIsLiked(!isLiked)}
          >
            <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white">
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </div>
            <span className="text-[12px] text-white font-medium shadow-sm">{post.likesCount || 1204}</span>
          </button>

          <button className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
            <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white">
              <Star className="w-6 h-6 fill-white" />
            </div>
            <span className="text-[12px] text-white font-medium shadow-sm">收藏</span>
          </button>

          <button className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
            <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-[12px] text-white font-medium shadow-sm">分享</span>
          </button>
        </div>
      </div>
    </div>
  );
};
