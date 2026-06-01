import fs from 'fs';

let content = fs.readFileSync('src/components/EventPage.tsx', 'utf8');

// 1. Add states
content = content.replace(
  `const [activeTime, setActiveTime] = useState('今日');`,
  `const [activeTime, setActiveTime] = useState('不限');
  const [sortBy, setSortBy] = useState('newest');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [showTimeFilter, setShowTimeFilter] = useState(false);`
);

// 2. Right Side structure
const rightSideOriginal = `{/* Right Side Content (Timeline + Cards) */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-10 pl-3 pr-2 relative">
              {/* Vertical line for timeline */}
              <div className="absolute left-[16.5px] top-6 bottom-0 w-[1px] bg-[#E8EBF0]"></div>
              
              <div className="space-y-6 pt-2 relative z-10">`;

const rightSideNew = `{/* Right Side Content (Timeline + Cards) */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Filter Bar */}
              <div className="flex items-center justify-between px-3 pb-3 pt-1 sticky top-0 z-30">
                <button 
                  onClick={() => setShowTimeFilter(true)}
                  className="flex items-center gap-1 text-[13px] text-gray-700 font-bold"
                >
                  {activeTime === '不限' ? '时间' : activeTime} <ChevronDown size={14} className="text-gray-400" />
                </button>
                <div className="flex items-center gap-3">
                  {[
                    { id: 'newest', label: '最新' },
                    { id: 'shares', label: '转发' },
                    { id: 'popularity', label: '热度' }
                  ].map(sort => (
                    <button 
                      key={sort.id}
                      onClick={() => {
                        if (sortBy === sort.id) {
                          setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
                        } else {
                          setSortBy(sort.id);
                          setSortOrder('desc');
                        }
                      }}
                      className={\`flex items-center gap-0.5 text-[11px] transition-colors \${
                        sortBy === sort.id ? 'text-[#5C6DFF] font-bold' : 'text-gray-500'
                      }\`}
                    >
                      {sort.label}
                      <div className="flex flex-col -space-y-[6px]">
                        <ChevronDown 
                          size={9} 
                          className={\`rotate-180 \${sortBy === sort.id && sortOrder === 'asc' ? 'text-[#5C6DFF] opacity-100' : 'text-gray-400 opacity-40'}\`} 
                          strokeWidth={3} 
                        />
                        <ChevronDown 
                          size={9} 
                          className={\`\${sortBy === sort.id && sortOrder === 'desc' ? 'text-[#5C6DFF] opacity-100' : 'text-gray-400 opacity-40'}\`} 
                          strokeWidth={3} 
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar pb-10 pl-3 pr-2 relative">
                {/* Vertical line for timeline */}
                <div className="absolute left-[16.5px] top-4 bottom-0 w-[1px] bg-[#E8EBF0]"></div>
                
                <div className="space-y-6 pt-1 relative z-10">`;

content = content.replace(rightSideOriginal, rightSideNew);

// 3. Close the extra div
content = content.replace(
  `{filteredEvents.length === 0 && (
                <div className="py-10 text-center text-gray-400 text-[13px]">
                  暂无符合条件的活动
                </div>
              )}
            </div>
          </div>
        ) : activeTab === 'schedule' ? (`,
  `{filteredEvents.length === 0 && (
                <div className="py-10 text-center text-gray-400 text-[13px]">
                  暂无符合条件的活动
                </div>
              )}
              </div>
            </div>
          </div>
        ) : activeTab === 'schedule' ? (`
);

// 4. Add time filter popup
const popupHtml = `      {/* --- Mobile Time Filter Bottom Sheet --- */}
      <AnimatePresence>
        {showTimeFilter && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/40 flex flex-col justify-end"
          >
             <div className="flex-1" onClick={() => setShowTimeFilter(false)}></div>
             <motion.div 
               initial={{ y: '100%' }}
               animate={{ y: 0 }}
               exit={{ y: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 300 }}
               className="bg-white rounded-t-2xl pb-safe"
             >
               <div className="flex flex-col">
                 <div className="flex items-center justify-between p-4 border-b border-gray-50">
                   <span className="font-bold text-[16px] text-gray-900">时间选择</span>
                   <button onClick={() => setShowTimeFilter(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-full bg-gray-50">
                     <X size={18} />
                   </button>
                 </div>
                 
                 <div className="p-4 space-y-5">
                   <div className="flex flex-wrap gap-3">
                     {['不限', '本周', '本月', '下月'].map(time => (
                       <button
                         key={time}
                         onClick={() => setActiveTime(time)}
                         className={\`px-5 py-2 rounded-full text-[13px] font-medium transition-colors \${
                           activeTime === time 
                             ? 'bg-[#E5E9FF] text-[#5C6DFF]' 
                             : 'bg-gray-50 text-gray-600'
                         }\`}
                       >
                         {time}
                       </button>
                     ))}
                   </div>
                   
                   <div className="pt-2">
                     <div className="text-[13px] text-gray-500 mb-3 font-medium">自定义时间</div>
                     <div className="flex items-center gap-3">
                       <button className="flex-1 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-[13px] text-gray-400">
                         开始时间
                       </button>
                       <span className="text-gray-300">-</span>
                       <button className="flex-1 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-[13px] text-gray-400">
                         结束时间
                       </button>
                     </div>
                   </div>
                 </div>

                 <div className="p-4 border-t border-gray-50 flex gap-3">
                   <button 
                     onClick={() => setActiveTime('不限')}
                     className="w-1/3 py-3 rounded-xl bg-gray-50 text-gray-600 font-bold text-[14px]"
                   >
                     重置
                   </button>
                   <button 
                     onClick={() => setShowTimeFilter(false)}
                     className="flex-1 py-3 rounded-xl bg-[#5C6DFF] text-white font-bold text-[14px] shadow-md shadow-blue-200"
                   >
                     确认
                   </button>
                 </div>
               </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <LeadCaptureModal`;

content = content.replace(/<LeadCaptureModal/g, popupHtml);

fs.writeFileSync('src/components/EventPage.tsx', content);
console.log('Done');
