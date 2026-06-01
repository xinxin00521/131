import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, MoreHorizontal, Circle, Search } from 'lucide-react';
import { PolicyArticlePage } from './PolicyArticlePage';

interface PolicyDetailPageProps {
  initialCategory: string;
  onBack: () => void;
  onSearchClick?: () => void;
}

const categories = [
  '新政合集', '中央法规', '地方法规', '税务法则', '行业法规', '税收优惠', '税务稽查', '办税流程', '会计科目'
];

const mockData: Record<string, { sidebar: string[], content: { title: string, date: string, type?: string }[] }> = {
  '新政合集': {
    sidebar: ['2024年3月', '2024年2月', '2024年1月', '2023年12月', '2023年11月', '2023年10月', '2023年9月', '2023年8月'],
    content: [
      { title: '关于延续实施部分个人所得税优惠政策的公告', date: '2024-03-15' },
      { title: '关于增值税小规模纳税人减免增值税政策的公告', date: '2024-03-10' },
      { title: '关于进一步完善研发费用税前加计扣除政策的公告', date: '2024-03-05' },
      { title: '关于明确增值税小规模纳税人减免增值税等政策的公告', date: '2024-03-01' },
      { title: '关于支持小微企业融资有关税收政策的公告', date: '2024-02-28' },
      { title: '关于先进制造业企业增值税加计抵减政策的公告', date: '2024-02-20' }
    ]
  },
  '中央法规': {
    sidebar: ['增值税', '企业所得税', '个人所得税', '消费税', '印花税', '资源税', '契税', '车船税'],
    content: [
      { title: '中华人民共和国增值税暂行条例', date: '2023-10-01', type: '增值税' },
      { title: '营业税改征增值税试点实施办法', date: '2023-09-15', type: '增值税' },
      { title: '关于全面推开营业税改征增值税试点的通知', date: '2023-08-20', type: '增值税' },
      { title: '关于深化增值税改革有关政策的公告', date: '2023-07-10', type: '增值税' },
      { title: '关于简并增值税税率有关政策的通知', date: '2023-06-05', type: '增值税' },
      { title: '中华人民共和国企业所得税法实施条例', date: '2023-05-12', type: '企业所得税' }
    ]
  },
  'default': {
    sidebar: ['全部', '最新发布', '热门解读', '实务指南', '经典案例'],
    content: [
      { title: '相关法规名称标题 1', date: '2024-01-01' },
      { title: '相关法规名称标题 2', date: '2024-01-02' },
      { title: '相关法规名称标题 3', date: '2024-01-03' },
      { title: '相关法规名称标题 4', date: '2024-01-04' },
      { title: '相关法规名称标题 5', date: '2024-01-05' },
      { title: '相关法规名称标题 6', date: '2024-01-06' }
    ]
  }
};

export const PolicyDetailPage: React.FC<PolicyDetailPageProps> = ({ initialCategory, onBack, onSearchClick }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<{ title: string, date: string, type?: string } | null>(null);

  const currentData = mockData[activeCategory] || mockData['default'];

  // Reset sidebar selection when category changes
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveSidebarItem(0);
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white z-[65] flex flex-col"
    >
      {/* Header */}
      <div className="relative flex items-center justify-between px-4 pt-14 pb-3 bg-white shrink-0 border-b border-gray-50 gap-3">
        <div className="flex items-center shrink-0">
          <button onClick={onBack} className="p-1 -ml-1 active:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-[16px] font-medium ml-1 text-gray-800 whitespace-nowrap">政策</h1>
        </div>

        {/* Search Bar Inline */}
        <div 
          onClick={onSearchClick}
          className="flex-1 flex items-center bg-[#F7F8FA] rounded-full px-3 py-1.5 min-w-0 cursor-pointer"
        >
          <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="搜索政策法规" 
            readOnly
            className="bg-transparent border-none outline-none text-[13px] text-gray-800 w-full placeholder:text-gray-400 cursor-pointer pointer-events-none"
          />
        </div>

        <div className="w-10"></div>
      </div>

      {/* Horizontal Tabs */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-gray-100 bg-white px-2 shrink-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`whitespace-nowrap px-4 py-3 text-[14px] relative transition-colors ${
              activeCategory === cat ? 'text-[#2563EB] font-medium' : 'text-gray-600'
            }`}
          >
            {cat}
            {activeCategory === cat && (
              <motion.div 
                layoutId="policyTabIndicator"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#2563EB] rounded-t-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Main Content: Two Columns */}
      <div className="flex flex-1 overflow-hidden bg-white">
        {/* Left Sidebar */}
        <div className="w-[90px] bg-[#F7F8FA] overflow-y-auto no-scrollbar flex flex-col">
          {currentData.sidebar.map((item, idx) => {
            const isActive = activeSidebarItem === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveSidebarItem(idx)}
                className={`relative py-4 px-2 text-center text-[13px] transition-colors ${
                  isActive ? 'bg-white font-medium text-gray-900' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {/* Blue underline effect on the text like the reference image */}
                <span className="relative z-10">
                  {item}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-[#2563EB]/10 rounded-full -z-10"></div>
                  )}
                </span>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-[#2563EB] rounded-r-full"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Content List */}
        <div className="flex-1 overflow-y-auto bg-white px-4 no-scrollbar">
          <div className="py-2">
            {currentData.content.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedArticle(item)}
                className="py-4 border-b border-gray-50 active:bg-gray-50 transition-colors cursor-pointer"
              >
                <h3 className="text-[14px] text-gray-800 leading-relaxed font-medium mb-2">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2">
                  {item.type && (
                    <span className="text-[11px] text-[#2563EB] bg-[#2563EB]/10 px-1.5 py-0.5 rounded">
                      {item.type}
                    </span>
                  )}
                  <span className="text-[12px] text-gray-400">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <PolicyArticlePage 
            article={selectedArticle} 
            onBack={() => setSelectedArticle(null)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
