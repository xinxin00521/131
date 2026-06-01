import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Star, History, BookOpen, Clock, Share2, Search, X, MessageCircle, Aperture, Link as LinkIcon, Download, Globe, Heart, Filter, ChevronDown, Eye, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PurchaseModal } from './PurchaseModal';
import { LeadCaptureModal } from './LeadCaptureModal';
import { SearchHistory } from '../App';

interface JournalPageProps {
  onBack: () => void;
  onSearchClick?: () => void;
  initialJournal?: Journal | null;
}

type JournalType = 'weekly' | 'monthly' | 'quarterly';

export interface Journal {
  id: string;
  type: JournalType;
  title: string;
  issue: string;
  date: string;
  coverUrl: string;
  description: string;
  readCount: string;
  rating: string;
  author: string;
}

export const MOCK_JOURNALS: Journal[] = [
  // Weekly
  { id: 'journal-w1', type: 'weekly', title: '《纳税答疑》2026年第374期', issue: '第374期', date: '2026-03-24', coverUrl: 'https://picsum.photos/seed/jw1/400/600', description: '高新技术企业认定新规实操指南。', readCount: '3.5w', rating: '5.0', author: '财税专家组' },
  { id: 'journal-w2', type: 'weekly', title: '《纳税答疑》2026年第375期', issue: '第375期', date: '2026-03-31', coverUrl: 'https://picsum.photos/seed/jw2/400/600', description: '个人所得税汇算避坑指南。', readCount: '3.8w', rating: '4.9', author: '财税专家组' },
  { id: 'journal-w3', type: 'weekly', title: '《纳税答疑》2026年第376期', issue: '第376期', date: '2026-04-07', coverUrl: 'https://picsum.photos/seed/jw3/400/600', description: '税务合规审计应对关键点。', readCount: '4.1w', rating: '5.0', author: '财税专家组' },
  // Monthly
  { id: 'journal-m1', type: 'monthly', title: '《纳税参考》2026年1月第一期', issue: '2026年1月第一期', date: '2026-01-01', coverUrl: 'https://picsum.photos/seed/jm1/400/600', description: '深度解析：近期多地税务局抽查动态。', readCount: '8.2w', rating: '4.9', author: '财税智库' },
  { id: 'journal-m2', type: 'monthly', title: '《纳税参考》2026年2月第一期', issue: '2026年2月第一期', date: '2026-02-01', coverUrl: 'https://picsum.photos/seed/jm2/400/600', description: '深度解析：跨境税务合规核心问题探讨。', readCount: '8.5w', rating: '5.0', author: '财税智库' },
  { id: 'journal-m3', type: 'monthly', title: '《纳税参考》2026年3月第一期', issue: '2026年3月第一期', date: '2026-03-01', coverUrl: 'https://picsum.photos/seed/jm3/400/600', description: '深度解析：高风险行业自查操作手册。', readCount: '9.0w', rating: '4.9', author: '财税智库' },
  // Quarterly
  { id: 'journal-q1', type: 'quarterly', title: '《纳税答疑精选》2026年第二季度', issue: '2026年第二季度', date: '2026-06-30', coverUrl: 'https://picsum.photos/seed/jq1/400/600', description: '季报前瞻与财税政策效应评估。', readCount: '12w', rating: '5.0', author: '首席经济学家' },
  { id: 'journal-q2', type: 'quarterly', title: '《纳税答疑精选》2026年第三季度', issue: '2026年第三季度', date: '2026-09-30', coverUrl: 'https://picsum.photos/seed/jq2/400/600', description: '年度收官前的税务风险防范建议。', readCount: '13w', rating: '4.9', author: '首席经济学家' },
  { id: 'journal-q3', type: 'quarterly', title: '《纳税答疑精选》2026年第四季度', issue: '2026年第四季度', date: '2026-12-31', coverUrl: 'https://picsum.photos/seed/jq3/400/600', description: '新的一年税务战略规划指南。', readCount: '14w', rating: '5.0', author: '首席经济学家' }
];

const JournalCover = ({ journal, className = '' }: { journal: Journal, className?: string }) => {
  const label = journal.type === 'weekly' ? '周刊' : journal.type === 'monthly' ? '月刊' : '季刊';
  
  return (
    <div className={`relative w-full h-full overflow-hidden rounded-r-md shadow-[4px_0_15px_rgba(0,0,0,0.15)] bg-white ${className}`}>
      {/* 3D Spine Effect */}
      <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-gray-300 via-gray-100 to-transparent z-30 mix-blend-multiply"></div>
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-black/10 z-30"></div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col bg-white z-10">
        {/* Top Dark Blue Section */}
        <div className="relative h-[65%] bg-[#1a3673] overflow-hidden">
          {/* Globe Pattern */}
          <div className="absolute -top-4 -left-12 w-48 h-48 opacity-20">
            <Globe className="w-full h-full text-white" strokeWidth={0.5} />
          </div>
          {/* Type Label */}
          <div className="absolute top-3 left-4 z-20">
            <div className="px-2 py-0.5 rounded-sm bg-white/20 backdrop-blur-sm border border-white/30">
              <span className="text-[9px] font-bold text-white tracking-widest">{label}</span>
            </div>
          </div>
          {/* Logo Area */}
          <div className="absolute top-3 right-3 flex items-center gap-1 z-20">
            <div className="w-3 h-3 bg-white rounded-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#1a3673] rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Curved Separator */}
        <div className="absolute top-[45%] left-0 right-0 w-full z-20">
          <svg viewBox="0 0 1440 320" className="w-full h-auto drop-shadow-md">
            {/* Bright blue stripe */}
            <path fill="#1877F2" d="M0,128L80,149.3C160,171,320,213,480,218.7C640,224,800,192,960,160C1120,128,1280,96,1360,80L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            {/* White bottom */}
            <path fill="#ffffff" d="M0,160L80,176C160,192,320,224,480,224C640,224,800,192,960,165.3C1120,139,1280,117,1360,106.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>

        {/* Bottom White Section */}
        <div className="relative h-[35%] bg-white flex flex-col justify-start p-3 pt-4 text-right z-20">
          <div className="text-[#1a3673] text-[9px] font-bold tracking-widest mb-0.5">{journal.issue}</div>
          <div className="flex justify-end items-center gap-1.5">
            <h3 className="text-[#1a3673] text-[13px] font-normal tracking-wide leading-tight break-all">{journal.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export const JournalPage: React.FC<JournalPageProps> = ({ onBack, onSearchClick, initialJournal }) => {
  const [activeTab, setActiveTab] = useState<JournalType>('weekly');
  const [showHistory, setShowHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  const [viewingJournal, setViewingJournal] = useState<Journal | null>(initialJournal || null);
  const [shareJournal, setShareJournal] = useState<Journal | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchResult, setIsSearchResult] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isGated, setIsGated] = useState(true);
  const [showLeadModal, setShowLeadModal] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !viewingJournal) return;

    const handleScroll = () => {
      const currentScrollY = container.scrollTop;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowBottomBar(false);
      } else {
        // Scrolling up
        setShowBottomBar(true);
      }
      setLastScrollY(currentScrollY);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, viewingJournal]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const categories: { id: JournalType; label: string; color: string }[] = [
    { id: 'weekly', label: '周刊', color: 'from-emerald-500 to-emerald-700' },
    { id: 'monthly', label: '月刊', color: 'from-purple-500 to-purple-700' },
    { id: 'quarterly', label: '季刊', color: 'from-orange-500 to-orange-700' },
  ];

  const currentJournals = MOCK_JOURNALS.filter(j => j.type === activeTab).slice().reverse();

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(prev => prev.filter(fid => fid !== id));
      showToast('已取消收藏');
    } else {
      setFavorites(prev => [...prev, id]);
      showToast('已加入收藏');
    }
  };

  const formatPostTime = (dateStr?: string) => {
    if (!dateStr) return '2026-05-20';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '2026-05-20';
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const diffTime = today.getTime() - targetDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      
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

  if (showHistory || showFavorites) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="min-h-screen bg-[#F4F7F9] pb-20 relative"
      >
        <div className="pt-12 pb-4 px-6 flex items-center space-x-4 sticky top-0 bg-[#F4F7F9]/90 backdrop-blur-md z-10">
          <button onClick={() => { setShowHistory(false); setShowFavorites(false); }} className="mr-2">
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          <h1 className="text-[17px] font-bold text-gray-900">{showHistory ? '历史' : '收藏'}</h1>
        </div>
        
        {/* Search Input */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder={`搜索${showHistory ? '历史' : '收藏'}`}
              className="w-full h-10 bg-white rounded-xl pl-9 pr-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 border border-gray-100 shadow-sm"
            />
          </div>
        </div>

        <div className="px-6 py-4 space-y-4">
          {(showHistory 
            ? MOCK_JOURNALS.slice(0, 4) 
            : MOCK_JOURNALS.filter(j => favorites.includes(j.id))
          ).map((journal, index) => (
            <div key={`${showHistory ? 'hist' : 'fav'}-${journal.id}`} className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex items-center p-4 cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 active:scale-[0.98] border border-gray-50">
              <div className="w-[48px] h-[68px] flex-shrink-0 mr-4 shadow-[4px_4px_12px_rgba(0,0,0,0.15)] rounded-sm overflow-hidden flex justify-center bg-gray-50">
                <JournalCover journal={journal} className="h-full w-auto max-w-none" />
              </div>
              <div className="flex flex-col flex-1 justify-between h-[68px] py-0.5">
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-orange-500 transition-colors">
                    {journal.title}
                  </h4>
                  {showHistory ? (
                    <div className="text-[11px] text-gray-400 flex items-center mt-1">
                      <Clock size={12} className="mr-1" />
                      上次阅读: {index === 0 ? '今天 10:30' : index === 1 ? '昨天 15:45' : '3天前'}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{journal.readCount} 阅读</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-auto">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewingJournal(journal);
                      setIsGated(true);
                      setShowHistory(false);
                      setShowFavorites(false);
                    }}
                    className="px-3 py-1 border border-gray-200 text-gray-600 text-[11px] font-medium rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {showHistory ? '继续阅读' : '阅读'}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!showHistory && favorites.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-sm">
              暂无收藏内容
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute inset-0 bg-[#F4F7F9] flex flex-col overflow-hidden"
    >
      {/* Background Image with Gradient Mask */}
      <div className="absolute top-0 left-0 right-0 h-80 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/journalbg/800/600')] bg-cover bg-center opacity-30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-[#F4F7F9]/80 to-[#F4F7F9]"></div>
      </div>

      {/* Header */}
      <div className="pt-12 pb-4 px-6 flex items-center justify-between shrink-0 bg-[#F4F7F9]/80 backdrop-blur-xl z-20 border-b border-white/20">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="mr-2 p-1 rounded-full hover:bg-black/5 transition-colors">
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-gray-900 tracking-wider">看</h1>
            <button 
              onClick={() => setIsSearching(true)}
              className="p-1 px-1.5 hover:bg-black/10 hover:scale-105 active:scale-95 rounded-full text-gray-850 transition-all flex items-center justify-center bg-white/30 backdrop-blur-sm"
              title="搜索"
            >
              <Search size={18} className="text-gray-800" />
            </button>
          </div>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 pb-20">
        
        {/* Content */}
        <div className="px-6 space-y-6 mt-6">
        
        {/* Category Tabs & Search */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2 flex-1">
            {categories.map(category => (
              <button 
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`text-[14px] px-4 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  activeTab === category.id 
                    ? 'bg-orange-500 text-white font-bold shadow-lg shadow-orange-200' 
                    : 'bg-white/80 backdrop-blur-sm text-gray-600 border border-gray-100 shadow-sm'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {currentJournals.length > 0 ? currentJournals.map(journal => (
            <div 
              key={journal.id} 
              onClick={() => { setViewingJournal(journal); setIsGated(true); }}
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex items-center p-4 cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 active:scale-[0.98] border border-gray-50 group"
            >
              {/* Left: Cover */}
              <div className="w-[54px] h-[76px] flex-shrink-0 mr-4 rounded-sm shadow-[0_8px_16px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08)] transform group-hover:-translate-y-1 transition-transform duration-300 relative flex justify-center bg-gray-50 overflow-hidden">
                {/* 3D edge effect */}
                <div className="absolute inset-0 border border-black/5 rounded-sm z-20 pointer-events-none"></div>
                <div className="absolute -right-[1px] top-[2px] bottom-[2px] w-[1px] bg-white/50 z-20 pointer-events-none"></div>
                <JournalCover journal={journal} className="h-full w-auto max-w-none" />
              </div>
              
              {/* Right Container */}
              <div className="flex flex-col flex-1 justify-between h-[76px] py-0.5">
                <div>
                  {/* Title */}
                  <h4 className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-2 mb-1.5 group-hover:text-orange-500 transition-colors">
                    {journal.title}
                  </h4>
                </div>
                
                {/* Bottom: Date and Tag */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-[12px] text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye size={12} />
                      <span>{journal.readCount} 阅读</span>
                    </div>
                  </div>
                  
                  {/* Favorite Button */}
                  <button 
                    onClick={(e) => toggleFavorite(e, journal.id)}
                    className={`p-1.5 rounded-full transition-colors ${favorites.includes(journal.id) ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:text-red-500'}`}
                  >
                    <Heart size={16} fill={favorites.includes(journal.id) ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-10 text-gray-400 text-sm">
              暂无更多{categories.find(t => t.id === activeTab)?.label}
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Journal Detail Page */}
      {viewingJournal && (
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 bg-white z-[250] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-14 pb-3 bg-white border-b border-gray-50 shrink-0">
            <button onClick={() => setViewingJournal(null)} className="p-1 -ml-1 active:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <h1 className="text-[16px] font-medium text-gray-900 truncate px-4">文章详情</h1>
            <div className="flex items-center space-x-2">
              <div className="w-10"></div>
            </div>
          </div>

          {/* Content */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-5 py-6 no-scrollbar relative min-h-0"
          >
            <h1 className="text-[22px] font-bold text-gray-900 leading-snug mb-4">
              {viewingJournal.title}
            </h1>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="text-[12px] text-gray-500 flex items-center gap-3">
                <div className="flex items-center">
                  <span>{formatPostTime(viewingJournal.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-gray-400" />
                  <span>{viewingJournal.readCount} 浏览</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className={`text-[16px] text-gray-800 leading-relaxed space-y-6 ${isGated ? 'max-h-[400px] overflow-hidden' : ''}`}>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-xl text-[14px] leading-relaxed border border-gray-100">
                  <span className="font-bold text-gray-800 mr-2">本周热点：</span>
                  {viewingJournal.description}
                </p>
                
                <p>
                  随着新经济形势的发展，企业面临的财税环境日益复杂。为了帮助企业更好地应对挑战，我们特别推出了本期专刊，深度剖析最新政策走向，分享前沿税务筹划理念。
                </p>
                
                <h3 className="text-[18px] font-bold text-gray-900 mt-8 mb-4">一、政策背景与趋势分析</h3>
                <p>
                  近年来，国家出台了一系列减税降费政策，旨在减轻企业负担，激发市场活力。然而，政策的频繁调整也给企业的税务合规带来了新的挑战。企业需要密切关注政策动态，及时调整税务筹划策略。
                </p>

                <p>
                  进入2026年，数字化转型已成为企业财税管理的核心驱动力。大数据、人工智能等技术的应用，使得税务监管更加精准和实时。企业建立数字化的财税管理体系，不仅是合规的要求，更是提升竞争力的必然选择。
                </p>
                
                {isGated && (
                  <div className="absolute bottom-0 left-0 w-full h-[320px] bg-gradient-to-t from-white via-white/95 to-transparent flex flex-col items-center justify-end pb-12 px-6">
                    <h3 className="text-[20px] font-bold text-gray-900 mb-3 text-center">解锁完整期刊内容</h3>
                    <p className="text-[14px] text-gray-500 mb-8 text-center leading-relaxed">
                      该内容为会员专享权益、联系顾问获取免费阅读全文
                    </p>
                    <button
                      onClick={() => setShowLeadModal(true)}
                      className="w-full max-w-[280px] py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-[16px] font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
                    >
                      联系顾问阅读全文
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 上一篇 / 下一篇 */}
            {(() => {
              const currentCategoryJournals = MOCK_JOURNALS.filter(j => j.type === viewingJournal.type);
              const currentIndex = currentCategoryJournals.findIndex(j => j.id === viewingJournal.id);
              const prevJournal = currentIndex > 0 ? currentCategoryJournals[currentIndex - 1] : null;
              const nextJournal = currentIndex < currentCategoryJournals.length - 1 ? currentCategoryJournals[currentIndex + 1] : null;

              return (
                <div className="mt-10 flex items-center justify-between border-t border-gray-100 pt-6">
                  {prevJournal ? (
                    <div 
                      onClick={() => setViewingJournal(prevJournal)}
                      className="flex-1 pr-4 cursor-pointer group"
                    >
                      <div className="text-[12px] text-gray-400 mb-1 flex items-center">
                        <ChevronLeft size={14} className="mr-0.5" /> 上一篇
                      </div>
                      <div className="text-[14px] font-medium text-gray-800 line-clamp-1 group-hover:text-orange-500 transition-colors">
                        {prevJournal.title}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 pr-4">
                      <div className="text-[12px] text-gray-400 mb-1">上一篇</div>
                      <div className="text-[14px] text-gray-300">已经是第一篇了</div>
                    </div>
                  )}
                  
                  <div className="w-[1px] h-10 bg-gray-100 mx-2"></div>
                  
                  {nextJournal ? (
                    <div 
                      onClick={() => setViewingJournal(nextJournal)}
                      className="flex-1 pl-4 text-right cursor-pointer group"
                    >
                      <div className="text-[12px] text-gray-400 mb-1 flex items-center justify-end">
                        下一篇 <ChevronLeft size={14} className="ml-0.5 rotate-180" />
                      </div>
                      <div className="text-[14px] font-medium text-gray-800 line-clamp-1 group-hover:text-orange-500 transition-colors">
                        {nextJournal.title}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 pl-4 text-right">
                      <div className="text-[12px] text-gray-400 mb-1">下一篇</div>
                      <div className="text-[14px] text-gray-300">已经是最后一篇了</div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* 本专辑其他推荐 */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <h3 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-1 h-4 bg-orange-500 rounded-full mr-2"></div>
                本专辑其他推荐
              </h3>
              <div className="space-y-4">
                {MOCK_JOURNALS.filter(j => j.type === viewingJournal.type && j.id !== viewingJournal.id).slice(0, 3).map(journal => (
                  <div 
                    key={`rec-${journal.id}`}
                    onClick={() => setViewingJournal(journal)}
                    className="flex gap-3 items-center p-3 rounded-xl bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="w-16 h-20 flex-shrink-0 shadow-[2px_2px_8px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden">
                      <JournalCover journal={journal} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[14px] font-bold text-gray-900 line-clamp-2 mb-1">{journal.title}</h4>
                      <div className="text-[11px] text-gray-500 flex items-center gap-1">
                        <Eye size={12} className="ml-1" />
                        {journal.readCount} 阅读
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`h-20 ${isGated ? 'hidden' : ''}`}></div> {/* Bottom padding */}
          </div>
          
          {/* Add CallExpertModal or similar */}
          <LeadCaptureModal
            isOpen={showLeadModal}
            onClose={() => setShowLeadModal(false)}
            onSubmit={() => setIsGated(false)}
            title="预约免费体验"
            description="确认后专属顾问将尽快联系您，为您开通全文阅读权限。"
          />
        </motion.div>
      )}

      {/* Share Modal */}
      <AnimatePresence>
        {shareJournal && (
          <JournalShareModal 
            journal={shareJournal} 
            onClose={() => setShareJournal(null)} 
            onAction={(action) => {
              setShareJournal(null);
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

      {/* Search Screens */}
      <AnimatePresence>
        {isSearching && (
          <SearchHistory
            onClose={() => setIsSearching(false)}
            onSearch={(q) => {
              setSearchQuery(q);
              setIsSearching(false);
              setIsSearchResult(true);
            }}
          />
        )}
        {isSearchResult && (
          <JournalSearchResults
            query={searchQuery}
            onClose={() => setIsSearchResult(false)}
            onClear={() => {
              setIsSearchResult(false);
              setIsSearching(true);
            }}
            onJournalClick={(journal) => {
              setViewingJournal(journal);
            }}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white px-6 py-3 rounded-full text-[14px] shadow-lg z-[400] whitespace-nowrap"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const JournalSearchResults = ({
  query,
  onClose,
  onClear,
  onJournalClick
}: {
  query: string;
  onClose: () => void;
  onClear: () => void;
  onJournalClick: (journal: Journal) => void;
}) => {
  const filteredJournals = MOCK_JOURNALS.filter(j => 
    j.title.toLowerCase().includes(query.toLowerCase()) || 
    j.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 bg-white z-[200] flex flex-col pt-2"
    >
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 mt-10">
        <button onClick={onClose}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2 h-9">
          <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
          <div className="flex-1 text-[13px] text-gray-900 truncate">
            {query}
          </div>
          <X className="w-4 h-4 text-gray-400 cursor-pointer" onClick={onClear} />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-[#F4F7F9]">
        {filteredJournals.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-[14px] font-bold text-gray-400 mb-2 px-1">共 {filteredJournals.length} 条检索结果</h2>
            {filteredJournals.map(journal => (
              <div 
                key={journal.id} 
                onClick={() => onJournalClick(journal)}
                className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex items-center p-4 cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 active:scale-[0.98] border border-gray-50 group"
              >
                <div className="w-[54px] h-[76px] flex-shrink-0 mr-4 rounded-sm shadow-[0_8px_16px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08)] flex justify-center bg-gray-50 overflow-hidden relative">
                   <JournalCover journal={journal} className="h-full w-auto max-w-none" />
                </div>
                <div className="flex flex-col flex-1 justify-between h-[76px] py-0.5">
                  <div>
                    <h4 className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-2 mb-1.5 group-hover:text-orange-500 transition-colors">
                      {journal.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-[12px] text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock size={12} /> {journal.date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-400 text-[14px]">没有找到相关期刊</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const JournalShareModal = ({ journal, onClose, onAction }: { journal: Journal, onClose: () => void, onAction: (action: string) => void }) => {
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
        <div className="relative h-64">
          <img src={journal.coverUrl} alt="cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded w-fit mb-2">
              {journal.type === 'weekly' ? '周刊' : journal.type === 'monthly' ? '月刊' : '季刊'}
            </div>
            <h3 className="text-[18px] font-bold text-white leading-snug line-clamp-2">{journal.title}</h3>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-b from-white to-gray-50">
          <div className="space-y-3 mb-5">
            <div className="flex items-start text-[13px] text-gray-600">
              <Clock size={16} className="mr-2.5 text-orange-500 mt-0.5 flex-shrink-0" /> 
              <span className="leading-tight">{journal.date}</span>
            </div>
          </div>
          
          {/* Divider */}
          <div className="w-full border-t border-dashed border-gray-200 my-4 relative">
            <div className="absolute -left-7 -top-2 w-4 h-4 rounded-full bg-[#1A1A1A]"></div>
            <div className="absolute -right-7 -top-2 w-4 h-4 rounded-full bg-[#1A1A1A]"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center border border-orange-100">
                <span className="text-orange-500 font-black text-[12px] tracking-tighter">大成<br/>财税</span>
              </div>
              <div className="text-[10px] text-gray-500 leading-relaxed">长按识别小程序码<br/>阅读完整期刊</div>
            </div>
            <div className="w-14 h-14 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com" alt="QR" className="w-full h-full opacity-80" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Share Actions */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-center space-x-8 w-full max-w-[320px]"
      >
        <div className="flex flex-col items-center cursor-pointer group" onClick={() => onAction('微信好友')}>
          <div className="w-12 h-12 bg-[#07C160] rounded-full flex items-center justify-center mb-2 group-active:scale-90 transition-transform shadow-lg shadow-green-500/30">
            <MessageCircle className="text-white w-6 h-6" />
          </div>
          <span className="text-[11px] text-white/90">微信好友</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer group" onClick={() => onAction('朋友圈')}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 group-active:scale-90 transition-transform shadow-lg">
            <Aperture className="text-[#07C160] w-6 h-6" />
          </div>
          <span className="text-[11px] text-white/90">朋友圈</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer group" onClick={() => onAction('复制链接')}>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-2 group-active:scale-90 transition-transform">
            <LinkIcon className="text-white w-6 h-6" />
          </div>
          <span className="text-[11px] text-white/90">复制链接</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer group" onClick={() => onAction('下载本地')}>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-2 group-active:scale-90 transition-transform">
            <Download className="text-white w-6 h-6" />
          </div>
          <span className="text-[11px] text-white/90">下载本地</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
