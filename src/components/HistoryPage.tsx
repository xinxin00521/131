import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Search, BookOpen, Video, Scale, Headphones, PlayCircle, Star, History } from 'lucide-react';
import { CourseDetailPage } from './CourseDetailPage';
import { PolicyArticlePage } from './PolicyArticlePage';

interface RecordItem {
  id: string;
  type: '课程' | '播客' | '刊物' | '政策' | '视讯' | '测评';
  title: string;
  cover: string;
  time: string;
  views?: string;
  author?: string;
}

const MOCK_HISTORY: RecordItem[] = [
  { id: 'h1', type: '课程', title: '金税四期下的企业税务合规指南', cover: 'https://picsum.photos/seed/c2/400/250', time: '刚刚', views: '1.2w' },
  { id: 'h2', type: '政策', title: '中华人民共和国公司法(2023修订)', cover: '', time: '3小时前' },
  { id: 'h3', type: '播客', title: '财税早班车：最新留抵退税政策深度解析', cover: 'https://picsum.photos/seed/p2/400/250', time: '昨天', author: '财税李老师' },
  { id: 'h4', type: '视讯', title: '企业所得税汇算清缴10大易错点', cover: 'https://picsum.photos/seed/v2/400/250', time: '2024-03-20', views: '5.4k' },
  { id: 'h5', type: '刊物', title: '《大成视界》2024年第一季', cover: 'https://picsum.photos/seed/k2/300/400', time: '2024-03-15' },
  { id: 'h6', type: '测评', title: '企业高新认证资格自测', cover: 'https://picsum.photos/seed/a2/400/250', time: '2024-03-14' },
];

const TABS = ['全部', '课程', '播客', '刊物', '政策', '视讯', '测评'];

export const HistoryPage: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);

  const filteredData = MOCK_HISTORY.filter(item => {
    const matchTab = activeTab === '全部' || item.type === activeTab;
    const matchSearch = item.title.includes(searchQuery);
    return matchTab && matchSearch;
  });

  const handleItemClick = (item: RecordItem) => {
    if (item.type === '课程' || item.type === '视讯') {
      setSelectedCourse(item);
    } else if (item.type === '政策') {
      setSelectedPolicy(item);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#F7F9FC] flex flex-col"
          >
            {/* Header */}
            <div className="pt-14 pb-3 px-4 bg-white/80 backdrop-blur-md sticky top-0 z-20 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between relative">
                <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="w-8 h-8 flex items-center justify-center -ml-2">
                  <ChevronLeft className="w-6 h-6 text-gray-900" />
                </motion.button>
                <h1 className="text-[17px] font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">浏览记录</h1>
                <div className="w-8 h-8"></div>
              </div>
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索浏览记录" 
                  className="w-full bg-gray-100/80 rounded-full pl-9 pr-4 py-2 text-[14px] outline-none focus:bg-gray-200 transition-colors" 
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-100 px-4">
              <div className="flex overflow-x-auto no-scrollbar gap-6">
                {TABS.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap py-3 text-[15px] transition-colors relative ${
                      activeTab === tab ? 'font-bold text-blue-600' : 'font-medium text-gray-500'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="hisTab" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-blue-600 rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredData.length > 0 ? (
                filteredData.map(item => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleItemClick(item)}
                    className="bg-white p-4 rounded-xl shadow-sm flex gap-3 active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    {item.type === '政策' ? (
                      <div className="w-[100px] h-[70px] bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                        <Scale className="w-8 h-8 text-red-500 opacity-80" />
                      </div>
                    ) : item.type === '刊物' ? (
                      <img src={item.cover} className="w-[60px] h-[80px] rounded-sm object-cover shrink-0 shadow-sm" alt="" />
                    ) : item.type === '测评' ? (
                      <div className="w-[100px] h-[70px] bg-indigo-50 rounded-lg flex items-center justify-center shrink-0 border border-indigo-100">
                        <span className="font-bold text-indigo-500">专业测评</span>
                      </div>
                    ) : (
                      <div className="relative w-[110px] h-[70px] rounded-lg overflow-hidden shrink-0">
                         <img src={item.cover} className="w-full h-full object-cover" alt="" />
                         {item.type === '视讯' && (
                           <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                             <PlayCircle className="w-6 h-6 text-white opacity-90" />
                           </div>
                         )}
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div className="text-[15px] font-bold text-gray-900 line-clamp-2 leading-snug">{item.title}</div>
                      <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-2">
                         <span className="px-1.5 py-0.5 bg-blue-50 text-blue-500 rounded">{item.type}</span>
                        {item.type !== '课程' && <span>{item.time}</span>}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="pt-20 text-center text-gray-400 text-[14px]">
                  暂无相关浏览记录
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pages integration */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[110]">
            <CourseDetailPage 
              course={{ ...selectedCourse, image: selectedCourse.cover }} 
              onClose={() => setSelectedCourse(null)} 
            />
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedPolicy && (
          <div className="fixed inset-0 z-[110]">
            <PolicyArticlePage 
              article={{ title: selectedPolicy.title, date: selectedPolicy.time, type: selectedPolicy.type }}
              onBack={() => setSelectedPolicy(null)}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
