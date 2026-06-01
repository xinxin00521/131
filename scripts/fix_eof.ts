import fs from 'fs';

let content = fs.readFileSync('src/components/EventPage.tsx', 'utf8');

const targetIdx = content.indexOf('<div className="px-5 mt-3 h-[calc(100vh-140px)]">');

if (targetIdx !== -1) {
  content = content.substring(0, targetIdx);
  const newTail = `<div className="px-5 mt-3 h-[calc(100vh-140px)]">
        {activeTab === 'discovery' ? (
          <div className="flex h-full w-full gap-2 pb-20">
            {/* Left Sidebar Menu */}
            <div className="w-[80px] overflow-y-auto no-scrollbar flex-shrink-0 flex flex-col pt-2 border-r border-gray-100 pr-1 gap-1">
              {DISCOVERY_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={\`w-full py-3.5 px-2 text-[13px] text-center transition-all rounded-lg relative \${
                    activeCategory === cat 
                      ? 'text-gray-900 font-bold bg-white shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900 bg-transparent'
                  }\`}
                >
                  <span className="relative z-10 block whitespace-nowrap">{cat}</span>
                  {activeCategory === cat && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3.5 bg-blue-500 rounded-r-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Right Side Content (Timeline + Cards) */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-10 pl-3 pr-2 relative">
              {/* Vertical line for timeline */}
              <div className="absolute left-[18px] top-6 bottom-0 w-[1.5px] bg-gray-100"></div>
              
              <div className="space-y-6 pt-2 relative z-10">
                {filteredEvents.map(event => (
                  <div key={event.id} className="relative">
                    {/* Timeline Node & Date */}
                    <div className="flex items-center gap-3 mb-2.5 relative z-10 bg-gray-50/50 rounded-full w-fit pr-3 -ml-0.5">
                      <div className="w-3 h-3 rounded-full bg-blue-500 ring-[3px] ring-white shadow-sm flex-shrink-0"></div>
                      <span className="text-[15px] font-extrabold text-gray-900 tracking-tight">{event.date || '04月15日-16日'}</span>
                    </div>

                    {/* Card container matching the image */}
                    <div 
                      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 ml-[20px] flex flex-col cursor-pointer active:scale-[0.98] transition-transform relative"
                      onClick={() => setViewingEvent(event)}
                    >
                      {/* Subscription badge */}
                      {event.isMemberFree && (
                        <div className="absolute -right-6 top-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-[10px] font-bold py-1 w-24 text-center rotate-45 shadow-sm z-20">
                          会员免费
                        </div>
                      )}
                      
                      <div className="relative h-[140px]">
                        <img src={event.cover} alt={event.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                        
                        {/* Title inside image matching the image provided */}
                        <div className="absolute bottom-3 left-4 right-4 z-10">
                           <h3 className="text-[15px] font-bold text-white leading-snug line-clamp-2 drop-shadow-md mb-2">
                             {event.title}
                           </h3>
                           <div className="flex items-center text-[10.5px] text-gray-200 gap-4 mt-2">
                              <span className="flex items-center opacity-90"><Eye size={12} className="mr-1.5"/> 1.2w客户浏览</span>
                           </div>
                        </div>
                      </div>
                      
                      <div className="p-3.5 bg-white">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center text-[12px] text-gray-400 font-medium">
                            <Calendar size={13} className="mr-1.5 text-gray-300" />
                            <span>发布时间：今天</span>
                          </div>
                          <div className="flex items-center text-[12px] text-gray-400 font-medium max-w-[45%]">
                            <MapPin size={13} className="mr-1 text-gray-300 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-50">
                          <div className="font-bold text-[#F43F5E] text-[16px]">
                            {event.price}
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#5C6DFF] transition-colors"
                            >
                              <Share2 size={13} />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                                setShowLeadCaptureModal(true);
                              }}
                              className="bg-[#5C6DFF] hover:bg-blue-600 text-white rounded-full px-4 py-1.5 text-[13px] font-medium shadow-sm transition-colors"
                            >
                              参与报名
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filteredEvents.length === 0 && (
                <div className="py-10 text-center text-gray-400 text-[13px]">
                  暂无符合条件的活动
                </div>
              )}
            </div>
          </div>
        ) : activeTab === 'schedule' ? (
          <div className="flex-1 overflow-y-auto no-scrollbar pb-10 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4 px-2">我的行程</h2>
            <div className="text-gray-500 text-sm text-center py-10 bg-white rounded-xl shadow-sm border border-gray-100 mx-2">暂无行程记录</div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto no-scrollbar pb-10 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4 px-2">我的收藏</h2>
            <div className="text-gray-500 text-sm text-center py-10 bg-white rounded-xl shadow-sm border border-gray-100 mx-2">暂无收藏内容</div>
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
             <div className="p-5 flex items-center justify-between border-b border-gray-100 mt-8">
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
             <div className="p-5 border-t border-gray-100 flex gap-3 pb-8">
               <button onClick={() => setShowFilters(false)} className="flex-1 py-3 bg-gray-100 text-gray-900 rounded-full font-bold">重置</button>
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
            className="fixed inset-0 z-50 bg-[#F5F6F8] overflow-y-auto"
          >
            <div className="relative h-64 bg-white">
              <img src={viewingEvent.cover} alt={viewingEvent.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
              <button 
                onClick={() => setViewingEvent(null)} 
                className="absolute top-12 left-5 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <div className="p-5 pb-24">
               <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                 <div className="flex items-center gap-2 mb-3">
                   <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded">{viewingEvent.status}</span>
                   <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">{viewingEvent.category}</span>
                 </div>
                 <h1 className="text-xl font-bold text-gray-900 mb-2 leading-snug">{viewingEvent.title}</h1>
                 <div className="font-bold text-[#F43F5E] text-[18px]">{viewingEvent.price}</div>
               </div>
               
               <div className="space-y-3 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-50">
                 <div className="flex items-center text-[13px] text-gray-600 pb-3 border-b border-gray-50">
                   <Calendar size={16} className="mr-3 text-gray-400" /> 
                   <span>{viewingEvent.date || '04月15日-16日'}</span>
                 </div>
                 <div className="flex items-center text-[13px] text-gray-600 pt-1">
                   <MapPin size={16} className="mr-3 text-gray-400" /> 
                   <span>{viewingEvent.location}</span>
                 </div>
               </div>

               <div className="bg-white rounded-xl p-4 shadow-sm">
                 <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                   <span className="w-1 h-3.5 bg-blue-500 rounded-full"></span> 详情介绍
                 </h3>
                 <div className="prose prose-sm text-gray-600 leading-relaxed">
                   <p>为更好的赋能企业，此次研讨会将深入解析行业发展趋势，并分享前沿成果。</p>
                   <p>本次活动将涵盖多个核心议题，汇聚行业顶尖大咖，期待您的参与。</p>
                 </div>
               </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe flex gap-3 z-10 px-5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
               <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 flex-shrink-0">
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
`;

  content = content + newTail;
  fs.writeFileSync('src/components/EventPage.tsx', content);
}
