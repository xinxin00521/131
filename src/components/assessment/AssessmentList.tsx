import React, { useState } from 'react';
import { ChevronLeft, Star, History, FileText, Clock, User, ChevronRight, Search, Filter, ChevronDown, X, Trash2, BookOpen, MessageSquare, PlayCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Assessment } from './types';
import { CATEGORIES, ASSESSMENTS } from './data';

const TAX_TYPES = ['全部', '企业所得税', '增值税', '个人所得税', '其他'];

interface AssessmentListProps {
  onBack: () => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  onStartTest: (assessment: Assessment) => void;
  onNavigate: (view: 'favorites' | 'history') => void;
}

export const AssessmentList: React.FC<AssessmentListProps> = ({
  onBack,
  activeCategory,
  setActiveCategory,
  onStartTest,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchHistory, setSearchHistory] = useState(['个人所得税', '增值税', '企业合规', '财税实务']);

  const filteredAssessments = ASSESSMENTS.filter(a => {
    const matchesCategory = activeCategory === '全部' || a.category === activeCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || (a.description && a.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const assessmentResults = searchQuery.trim() === '' 
    ? [] 
    : ASSESSMENTS.filter(a => 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (a.description && a.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const clearHistory = () => setSearchHistory([]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen bg-[#F8F9FA] pb-20"
    >
      {/* Header */}
      <div className="pt-12 pb-4 px-6 flex items-center justify-between sticky top-0 bg-[#F8F9FA]/80 backdrop-blur-xl z-[100] border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="mr-2 p-1 rounded-full hover:bg-black/5 transition-colors">
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-gray-900 tracking-wider">测</h1>
            <button
              onClick={() => setIsSearchMode(true)}
              className="p-1 px-1.5 hover:bg-black/5 rounded-full text-gray-800 transition-all flex items-center justify-center hover:scale-105 active:scale-95"
              title="搜索"
            >
              <Search size={20} />
            </button>
            <button 
              onClick={() => setShowFilters(true)} 
              className="p-1 px-1.5 hover:bg-black/5 rounded-full text-gray-900 transition-all flex items-center justify-center hover:scale-105 active:scale-95"
              title="筛选"
            >
              <Filter size={18} />
            </button>
          </div>
        </div>
        
        {/* Far-right elements are balanced and kept clean */}
        <div className="w-10"></div>
      </div>

      {/* Categories */}
      <div className="px-6 mt-4 relative z-10">
        <div className="flex overflow-x-auto no-scrollbar space-x-3 pb-4 pt-2">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative whitespace-nowrap px-5 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300 flex-shrink-0 ${
                  isActive 
                    ? 'text-white shadow-[0_4px_12px_rgba(139,92,246,0.3)]' 
                    : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50 shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Assessment List (2-column grid) */}
      <div className="px-6 mt-2 grid grid-cols-2 gap-4">
        {filteredAssessments.map((assessment, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
            key={assessment.id}
            onClick={() => onStartTest(assessment)}
            className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_15px_rgb(0,0,0,0.04)] border border-gray-50/50 cursor-pointer hover:shadow-[0_8px_30px_rgb(139,92,246,0.08)] active:scale-[0.98] transition-all duration-300 flex flex-col"
          >
            <div className="relative h-24 w-full overflow-hidden bg-gray-50/50 flex items-center justify-center p-2">
              <img src={assessment.cover || `https://picsum.photos/seed/${assessment.id}/400/300`} alt={assessment.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                {assessment.isNew && (
                  <span className="px-1.5 py-0.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[9px] font-bold rounded shadow-sm">NEW</span>
                )}
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <span className={`px-1.5 py-0.5 backdrop-blur-md border border-white/20 text-white text-[9px] font-medium rounded mb-1 inline-block ${
                  assessment.type === 'evaluation' ? 'bg-indigo-500/60' : 'bg-black/40'
                }`}>
                  {assessment.type === 'evaluation' ? '评估' : '测试'}
                </span>
              </div>
            </div>
            <div className="p-3 flex flex-col flex-1">
              <h3 className="text-[13px] font-bold text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#8B5CF6] transition-colors">
                {assessment.title}
              </h3>
              <div className="mt-auto flex items-center justify-between text-[10px] text-gray-400 font-medium">
                <span className="flex items-center"><FileText size={10} className="mr-1" /> {assessment.questionCount}题</span>
                <span className="flex items-center"><User size={10} className="mr-1" /> {assessment.participants}</span>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredAssessments.length === 0 && (
          <div className="col-span-2 text-center py-10 text-gray-400 text-[13px]">
            暂无符合条件的评估
          </div>
        )}
      </div>

      {/* Search Mode Overlay - REUSED AI SEARCH STYLE */}
      <AnimatePresence>
        {isSearchMode && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed inset-0 bg-white z-[200] flex flex-col"
          >
            {/* Search Header - Replicating AI search header style */}
            <div className="px-4 pt-14 flex flex-col gap-2 border-b border-gray-50">
              <div className="pb-4 flex items-center gap-3">
                <button 
                  onClick={() => {
                    setIsSearchMode(false);
                    setSearchQuery('');
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    autoFocus
                    type="text" 
                    placeholder="搜索评估内容" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-9 bg-gray-100 rounded-full pl-9 pr-4 text-[14px] focus:outline-none placeholder:text-gray-400"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-gray-200 rounded-full text-gray-400 h-5 w-5 flex items-center justify-center"
                    >
                      <X size={12} className="text-gray-500" />
                    </button>
                  )}
                </div>
                <button 
                  className="text-[15px] font-bold text-[#8B5CF6] px-1 active:opacity-60"
                  onClick={() => setIsSearchMode(false)}
                >
                  取消
                </button>
              </div>

              {/* Search Tabs */}
              {searchQuery.trim() !== '' && (
                <div className="flex items-center space-x-8 px-2 overflow-x-auto no-scrollbar">
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto bg-white">
              {!searchQuery.trim() ? (
                <div className="px-6 py-8">
                  {/* History Section - Replicating AI search history style */}
                  <div className="mb-10">
                    <div className="flex justify-between items-center mb-5">
                      <h2 className="text-[18px] font-bold text-gray-900">搜索历史</h2>
                      {searchHistory.length > 0 && (
                        <button onClick={clearHistory}>
                          <Trash2 size={18} className="text-gray-400 hover:text-red-500 transition-colors" />
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {searchHistory.map((item, i) => (
                        <div 
                          key={i}
                          onClick={() => setSearchQuery(item)}
                          className="flex items-center gap-1.5 bg-gray-100 px-4 py-1.5 rounded-lg group cursor-pointer active:scale-95 transition-transform"
                        >
                          <span className="text-[13px] text-gray-600 font-medium">{item}</span>
                          <X 
                            size={12} 
                            className="text-gray-400 group-hover:text-gray-600" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSearchHistory(prev => prev.filter((_, idx) => idx !== i));
                            }}
                          />
                        </div>
                      ))}
                      {searchHistory.length === 0 && (
                        <p className="text-[13px] text-gray-400">暂无搜索历史记录</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="px-5 pt-6 pb-12">
                  {/* Results strictly for assessments */}
                  {assessmentResults.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-col gap-4">
                        {assessmentResults.map((assessment, idx) => (
                          <motion.div
                            key={assessment.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => {
                              onStartTest(assessment);
                              setIsSearchMode(false);
                              if (!searchHistory.includes(searchQuery)) {
                                setSearchHistory(prev => [searchQuery, ...prev].slice(0, 10));
                              }
                            }}
                            className="bg-white p-4 flex gap-4 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] active:scale-[0.98] transition-all cursor-pointer"
                          >
                            <div className="w-24 h-18 bg-gray-50 rounded-2xl overflow-hidden shrink-0 relative">
                              <img 
                                src={assessment.cover || `https://picsum.photos/seed/${assessment.id}/400/300`} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              />
                              <div className="absolute top-1 right-1 flex flex-col gap-1 items-end">
                                {assessment.isNew && (
                                  <span className="px-1 py-0.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[8px] font-bold rounded shadow-sm">NEW</span>
                                )}
                              </div>
                              <div className="absolute bottom-1 auto left-1 right-1 flex items-center justify-center">
                                <span className={`px-1 py-0.5 backdrop-blur-md border border-white/20 text-white text-[8px] font-medium rounded inline-block ${
                                  assessment.type === 'evaluation' ? 'bg-indigo-500/60' : 'bg-black/40'
                                }`}>
                                  {assessment.type === 'evaluation' ? '评估' : '测试'}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <h4 className="text-[14px] font-bold text-gray-900 line-clamp-2 mb-2 leading-snug">{assessment.title}</h4>
                              <div className="flex items-center gap-3">
                                <span className="px-1.5 py-0.5 bg-purple-50 text-[#8B5CF6] text-[10px] font-heavy rounded">
                                  {assessment.category}
                                </span>
                                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                                  <span className="flex items-center gap-0.5"><FileText size={10} /> {assessment.questionCount}题</span>
                                  <span className="flex items-center gap-0.5"><User size={10} /> {assessment.participants}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {assessmentResults.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                      <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <Search size={32} className="text-gray-200" />
                      </div>
                      <p className="text-[15px] text-gray-400 font-bold mb-1">未找到相关结果</p>
                      <p className="text-[13px] text-gray-300">请输入关键字搜索测试、评估</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Bottom Sheet */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[110]"
              onClick={() => setShowFilters(false)}
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[120] p-5 pb-8 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">筛选</h3>
                <button onClick={() => setShowFilters(false)} className="text-gray-400 p-1">
                  <ChevronDown size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* 测评类型 */}
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 mb-3 ml-1">测评类型</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['评估', '测试'].map(type => (
                      <button
                        key={type}
                        className="px-4 py-2 rounded-xl text-[13px] bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors text-center"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories (直接展示选项) */}
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 mb-3 ml-1">业务分类</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-[13px] transition-colors text-center ${
                          activeCategory === cat 
                            ? 'bg-[#8B5CF6] text-white font-medium' 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => setShowFilters(false)}
                  className="w-full py-3 rounded-full bg-[#8B5CF6] text-white font-medium text-[15px]"
                >
                  确定
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
