import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Calendar, Clock, Video } from 'lucide-react';

const MOCK_LIVES = [
  {
    id: 'l1',
    title: '2024金税四期企业应对高级研修班',
    date: '2026-04-15',
    time: '09:00 - 17:00',
    status: 'live',
    speaker: '张大成',
    image: 'https://picsum.photos/seed/live1/400/250'
  },
  {
    id: 'l2',
    title: '房地产企业土地增值税清算实务深度解析',
    date: '2026-04-16',
    time: '14:00 - 16:00',
    status: 'reserve',
    speaker: '李晓明',
    image: 'https://picsum.photos/seed/live2/400/250'
  },
  {
    id: 'l3',
    title: '跨境电商税务合规与出口退税',
    date: '2026-04-20',
    time: '19:30 - 21:00',
    status: 'reserve',
    speaker: '王志强',
    image: 'https://picsum.photos/seed/live3/400/250'
  }
];

export const LiveTeaserPage: React.FC<{ 
  onBack: () => void;
  onReserve?: () => void;
  onLiveJoin?: () => void;
}> = ({ onBack, onReserve, onLiveJoin }) => {
  const formatDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      return `${month}月${day}日`;
    }
    return dateStr;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed inset-0 z-50 bg-[#F7F8FA] flex flex-col"
    >
      {/* Header */}
      <div className="bg-white px-4 pt-14 pb-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 active:bg-gray-50 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <div className="text-[17px] font-medium">直播预告</div>
        <div className="w-10"></div>
      </div>

      {/* Live List (Timeline UI) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {MOCK_LIVES.map((live, index) => (
          <div key={live.id} className="relative pl-8">
            {/* Timeline line */}
            {index !== MOCK_LIVES.length - 1 && (
              <div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-gray-200"></div>
            )}
            
            {/* Timeline dot */}
            <div className="absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center border-4 border-[#F7F8FA] bg-blue-500">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>

            {/* Date next to dot */}
            <div className="text-[15px] font-bold text-gray-900 mb-2 leading-6">
              {formatDate(live.date)} {live.time}开播
            </div>

            <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-50">
              <div className="flex gap-3">
                <div className="w-[110px] h-[80px] rounded-lg overflow-hidden relative shrink-0">
                  <img src={live.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  {live.status === 'live' && (
                    <div className="absolute top-1 left-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm">
                      <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>直播中
                    </div>
                  )}
                  {live.status === 'reserve' && (
                    <div className="absolute top-1 left-1 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                      即将开播
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <h3 className="text-[14px] font-bold text-gray-900 line-clamp-2 leading-snug">{live.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-[11px] text-gray-500">{live.speaker}</div>
                    <div className="flex items-center gap-3">
                      {live.status === 'live' ? (
                        <button onClick={onLiveJoin} className="px-4 py-1.5 rounded-full bg-red-500 text-white text-[12px] font-medium active:bg-red-600 transition-colors shadow-sm shadow-red-500/20">
                          进入
                        </button>
                      ) : (
                        <button onClick={onReserve} className="px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200 text-[12px] font-medium active:bg-orange-100 transition-colors">
                          预约
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
