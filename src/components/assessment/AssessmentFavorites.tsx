import React from 'react';
import { ChevronLeft, Star, FileText, User, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Assessment } from './types';

interface AssessmentFavoritesProps {
  favorites: Assessment[];
  onBack: () => void;
  onStartTest: (assessment: Assessment) => void;
}

export const AssessmentFavorites: React.FC<AssessmentFavoritesProps> = ({
  favorites,
  onBack,
  onStartTest
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen bg-[#F8F9FA] pb-20"
    >
      <div className="pt-12 pb-4 px-6 flex items-center space-x-4 sticky top-0 bg-[#F8F9FA]/80 backdrop-blur-xl z-20 border-b border-gray-100/50">
        <button onClick={onBack} className="mr-2 p-1 rounded-full hover:bg-black/5 transition-colors">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-[18px] font-bold text-gray-900 tracking-wide">我的收藏</h1>
      </div>
      
      {/* Search Input */}
      <div className="px-6 pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="搜索收藏"
            className="w-full h-10 bg-white rounded-xl pl-9 pr-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 border border-gray-100 shadow-sm"
          />
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <Star size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-400 font-medium">暂无收藏评估</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {favorites.map((assessment, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
                key={`fav-${assessment.id}-${index}`}
                onClick={() => onStartTest(assessment)}
                className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_15px_rgb(0,0,0,0.04)] border border-gray-50/50 cursor-pointer hover:shadow-[0_8px_30px_rgb(139,92,246,0.08)] active:scale-[0.98] transition-all duration-300 flex flex-col"
              >
                <div className="relative h-24 w-full overflow-hidden bg-gray-50/50 flex items-center justify-center p-2">
                  <img src={assessment.cover || `https://api.dicebear.com/7.x/shapes/svg?seed=${assessment.id}`} alt={assessment.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                    <Star size={14} className="fill-yellow-400 text-yellow-400 drop-shadow-sm" />
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
          </div>
        )}
      </div>
    </motion.div>
  );
};
