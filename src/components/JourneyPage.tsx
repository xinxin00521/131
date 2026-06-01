import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, MapPin, Calendar, Clock, Navigation, Users, Share2 } from 'lucide-react';
import { ScheduleDetailModal } from './EventPage';

interface Journey {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'past';
  type: 'event' | 'course';
  image: string;
  speaker: string;
  speakerTitle: string;
  checkInStatus: 'checked' | 'unchecked';
  categoryBadge: string;
  infoBadge?: string;
  agenda: string[];
  tags: string[];
  participants: string[];
  participantCount: number;
}

const MOCK_JOURNEYS: Journey[] = [
  {
    id: 'j1',
    title: '2024大成财税年度峰会：新经济下的变革',
    date: '今日',
    time: '08:00',
    location: '北京·国贸大酒店 3层宴会厅',
    status: 'upcoming',
    type: 'event',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    speaker: '张大成',
    speakerTitle: '大成财税创始人',
    checkInStatus: 'checked',
    categoryBadge: '2024年行业峰会',
    infoBadge: '课件已发',
    agenda: [
      '09:00-10:30 宏观经济趋势分析',
      '10:45-12:00 税务合规新要求'
    ],
    tags: ['汇算清缴', '风险防范'],
    participants: [
      'https://picsum.photos/seed/p1/200/200',
      'https://picsum.photos/seed/p2/200/200',
      'https://picsum.photos/seed/p3/200/200'
    ],
    participantCount: 12
  },
  {
    id: 'j2',
    title: '线下实操课：高新企业认定实务',
    date: '4月15日',
    time: '14:00',
    location: '上海·浦东金桥路 希尔顿酒店',
    status: 'upcoming',
    type: 'event',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop',
    speaker: '王志强',
    speakerTitle: '资深政策研究员',
    checkInStatus: 'unchecked',
    categoryBadge: '线下实操课',
    agenda: [
      '14:00-15:30 申报流程详解',
      '15:45-17:00 现场案例演示'
    ],
    tags: ['高新技术', '实操培训'],
    participants: [
      'https://picsum.photos/seed/p4/200/200',
      'https://picsum.photos/seed/p5/200/200',
      'https://picsum.photos/seed/p6/200/200'
    ],
    participantCount: 45
  },
  {
    id: 'j3',
    title: '线上课程：跨境电商税务合规专场',
    date: '3月20日',
    time: '10:00',
    location: '线上直播间',
    status: 'past',
    type: 'course',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop',
    speaker: '李文彬',
    speakerTitle: '财税法专家',
    checkInStatus: 'checked',
    categoryBadge: '线上精品课',
    infoBadge: '含回放',
    agenda: [
      '10:00-11:30 跨境业务架构',
      '14:00-15:30 风险防控要点'
    ],
    tags: ['跨境电商', '税务合规'],
    participants: [
      'https://picsum.photos/seed/p7/200/200',
      'https://picsum.photos/seed/p8/200/200',
      'https://picsum.photos/seed/p9/200/200'
    ],
    participantCount: 156
  }
];

export const JourneyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);

  const filteredJourneys = MOCK_JOURNEYS.filter(j => j.status === activeTab);

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
        <div className="text-[17px] font-medium">我的行程</div>
        <div className="w-10"></div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-10 flex items-center justify-between border-b border-gray-100 sticky top-[80px] z-10">
        {[
          { id: 'upcoming', label: '待出行' },
          { id: 'past', label: '已结束' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 text-[14px] font-medium relative transition-colors flex-1 ${
              activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="journeyTabIndicator"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Journey List */}
      <div className="flex-1 overflow-y-auto pt-6 px-4 pb-20 no-scrollbar">
        {filteredJourneys.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <Navigation className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-[14px]">暂无{activeTab === 'upcoming' ? '待出行' : '已结束'}的行程</p>
          </div>
        ) : (
          <div className="space-y-0">
            {filteredJourneys.map((journey, idx) => (
              <div key={journey.id} className="relative pl-7 pb-8 border-l border-gray-200/60 last:border-l-0 ml-2">
                {/* Timeline Node */}
                <div className={`absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm z-10 ${
                  journey.status === 'upcoming' ? 'bg-blue-600 scale-125' : 'bg-gray-400 scale-110'
                }`} />
                {journey.status === 'upcoming' && idx === 0 && (
                   <div className="absolute left-[-9px] top-0 w-4.5 h-4.5 rounded-full bg-blue-600/20 animate-ping" />
                )}
                
                {/* Time Header */}
                <div className="flex items-center gap-2 mb-3 -mt-1">
                  <span className="text-[16px] font-black text-gray-900 leading-none">{journey.date} {journey.time}</span>
                  {journey.status === 'upcoming' && idx === 0 && (
                    <span className="text-[11px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">进行中</span>
                  )}
                </div>

                {/* The Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[24px] shadow-[0_4px_24px_rgb(0,0,0,0.03)] border border-gray-100/50 overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="relative h-[210px] bg-gray-100 overflow-hidden">
                    <img src={journey.image} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="" />
                    
                    {/* Ribbon */}
                    <div className="absolute top-0 left-0 overflow-hidden w-32 h-32 pointer-events-none">
                      <div className="absolute top-4 left-[-35px] w-[140px] bg-blue-600/90 text-white text-[10px] font-black py-1.5 text-center rotate-[-45deg] shadow-sm backdrop-blur-sm tracking-wider">
                        {journey.categoryBadge}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 text-[11px] font-black px-2.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 backdrop-blur-md ${
                      journey.checkInStatus === 'checked' ? 'bg-emerald-500/90 text-white' : 'bg-gray-900/40 text-white border border-white/20'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${journey.checkInStatus === 'checked' ? 'bg-white animate-pulse' : 'bg-white/50'}`} />
                      {journey.checkInStatus === 'checked' ? '已签到' : '未签到'}
                    </div>

                    {/* Floating Actions on Image */}
                    <div className="absolute bottom-4 right-4 flex gap-2.5">
                      <button className="flex items-center gap-1.5 bg-white/95 text-gray-900 text-[12px] font-black px-4 py-2 rounded-xl shadow-lg backdrop-blur-sm active:scale-95 transition-transform">
                        <Navigation className="w-3.5 h-3.5 text-blue-600" />
                        导航
                      </button>
                      <button 
                        onClick={() => setSelectedJourney(journey)}
                        className="bg-blue-600 text-white text-[12px] font-black px-4 py-2 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
                      >
                        查看详情
                      </button>
                    </div>
                  </div>

                  {/* Content (Detailed info like screenshot) */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <h3 className="text-[18px] font-black text-gray-900 leading-[1.4] flex-1">{journey.title}</h3>
                      {journey.infoBadge && (
                        <span className="shrink-0 bg-orange-50 text-orange-500 text-[10px] font-black px-2 py-0.5 rounded-md border border-orange-100/50">
                          {journey.infoBadge}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2.5 mb-5">
                      <div className="flex items-center gap-2.5 text-[13px] text-gray-400 font-bold">
                        <MapPin className="w-4 h-4 shrink-0 transition-colors group-hover:text-blue-500" />
                        <span className="truncate">{journey.location}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[13px] text-gray-400 font-bold">
                        <Users className="w-4 h-4 shrink-0" />
                        <span className="truncate">主讲人：<span className="text-gray-600">{journey.speaker}</span> · {journey.speakerTitle}</span>
                      </div>
                    </div>

                    {/* Agenda Box */}
                    <div className="bg-[#F8FAFC] rounded-[20px] p-4 mb-5 border border-gray-100/50">
                      <div className="text-[12px] font-black text-gray-400 mb-3 uppercase tracking-widest pl-1">今日议程</div>
                      <div className="space-y-2.5">
                        {journey.agenda.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 text-[13px] text-gray-700 font-bold">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between border-t border-gray-50 pt-5">
                      <div className="flex gap-2">
                        {journey.tags.map(tag => (
                          <span key={tag} className="text-[11px] font-bold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100/30">#{tag}</span>
                        ))}
                        <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2 items-center">
                          {journey.participants.map((p, i) => (
                             <img key={i} src={p} className="w-7 h-7 rounded-full border-2 border-white shadow-sm object-cover" alt="" />
                          ))}
                        </div>
                        <span className="text-[11px] text-gray-400 font-black tracking-tight">等{journey.participantCount}人参加</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedJourney && (
          <ScheduleDetailModal 
            record={selectedJourney} 
            onClose={() => setSelectedJourney(null)} 
            onShare={() => {}} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
