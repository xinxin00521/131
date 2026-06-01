import fs from 'fs';

let content = fs.readFileSync('src/components/EventPage.tsx', 'utf8');

const replacement = `
        ) : activeTab === 'schedule' ? (
          <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4 h-[calc(100vh-140px)]">
            <h2 className="text-lg font-bold text-gray-900 mb-4">我的行程</h2>
            <div className="text-gray-500 text-sm text-center py-10 bg-white rounded-xl shadow-sm border border-gray-100">暂无行程记录</div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4 h-[calc(100vh-140px)]">
            <h2 className="text-lg font-bold text-gray-900 mb-4">我的收藏</h2>
            <div className="text-gray-500 text-sm text-center py-10 bg-white rounded-xl shadow-sm border border-gray-100">暂无收藏内容</div>
          </div>
        )}
      </div>

      {/* --- Filter Modal --- */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
             <div className="p-5 flex items-center justify-between border-b border-gray-100">
               <span className="font-bold text-lg">全部筛选</span>
               <button onClick={() => setShowFilters(false)} className="p-2 -mr-2 bg-gray-50 rounded-full text-gray-500"><X size={20} /></button>
             </div>
             <div className="p-5 flex-1 overflow-y-auto">
                <div className="mb-4 text-sm font-bold text-gray-900">时间选项</div>
                <div className="flex flex-wrap gap-2">
                   {['今日', '本周', '本月', '下月', '自定义'].map(time => (
                     <button 
                       key={time} 
                       onClick={() => setActiveTime(time)} 
                       className={\`px-4 py-2 rounded-full text-[13px] transition-colors \${
                         activeTime === time 
                           ? 'bg-[#F43F5E] text-white shadow-md shadow-rose-200' 
                           : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                       }\`}
                     >
                       {time}
                     </button>
                   ))}
                </div>
             </div>
             <div className="p-5 border-t border-gray-100 flex gap-3">
               <button className="flex-1 py-3 bg-gray-100 text-gray-900 rounded-full font-bold">重置</button>
               <button onClick={() => setShowFilters(false)} className="flex-1 py-3 bg-[#F43F5E] text-white rounded-full font-bold">确认</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LeadCaptureModal
        isOpen={showLeadCaptureModal}
        onClose={() => setShowLeadCaptureModal(false)}
        title="联系销售参与报名"
      />
      <PurchaseModal 
        isOpen={showPurchaseModal} 
        onClose={() => setShowPurchaseModal(false)} 
        event={selectedEvent} 
      />
      
      {/* --- Event Detail Viewer --- */}
      <AnimatePresence>
        {viewingEvent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            <div className="relative h-64">
              <img src={viewingEvent.cover} alt={viewingEvent.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <button 
                onClick={() => setViewingEvent(null)} 
                className="absolute top-6 left-5 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <div className="p-5 bg-gradient-to-b from-white to-gray-50 min-h-[calc(100vh-16rem)] flex flex-col">
               <div className="flex items-center gap-2 mb-3">
                 <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded">{viewingEvent.status}</span>
                 <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">{viewingEvent.category}</span>
               </div>
               
               <h1 className="text-xl font-bold text-gray-900 mb-4 leading-snug">{viewingEvent.title}</h1>
               
               <div className="space-y-3 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-50">
                 <div className="flex items-center text-[13px] text-gray-600">
                   <Calendar size={16} className="mr-3 text-gray-400" /> 
                   <span>{viewingEvent.date || '04月15日-16日'}</span>
                 </div>
                 <div className="flex items-center text-[13px] text-gray-600">
                   <MapPin size={16} className="mr-3 text-gray-400" /> 
                   <span>{viewingEvent.location}</span>
                 </div>
               </div>

               <div className="prose prose-sm text-gray-600">
                 <p>为更好的赋能企业，此次研讨会将深入解析行业发展趋势，并分享前沿成果。</p>
                 <p>本次活动将涵盖多个核心议题，汇聚行业顶尖大咖，期待您的参与。</p>
               </div>

               <div className="mt-auto pt-6 flex gap-3">
                 <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                   <Share2 size={20} />
                 </button>
                 <button 
                   onClick={() => {
                     setSelectedEvent(viewingEvent);
                     setShowLeadCaptureModal(true);
                   }}
                   className="flex-1 h-12 bg-gradient-to-r from-[#F43F5E] to-rose-600 text-white font-bold rounded-full shadow-lg shadow-rose-200 active:scale-95 transition-transform flex items-center justify-center"
                 >
                   参与报名
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
`;

content = content + replacement;
fs.writeFileSync('src/components/EventPage.tsx', content);
