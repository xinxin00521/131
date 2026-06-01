import fs from 'fs';

let content = fs.readFileSync('src/components/EventPage.tsx', 'utf8');

// 1. Replace the "暂无行程记录" in Schedule tab
const oldScheduleBlock = `<div className="flex-1 overflow-y-auto no-scrollbar pb-10 space-y-4 px-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4 px-2">我的行程</h2>
            <div className="text-gray-500 text-sm text-center py-10 bg-white rounded-xl shadow-sm border border-gray-100 mx-2">暂无行程记录</div>
          </div>`;

const newScheduleBlock = `<div className="flex-1 overflow-y-auto no-scrollbar pb-10 px-5 pt-2">
            <h2 className="text-lg font-extrabold text-gray-900 mb-4 px-1">我的行程</h2>
            <div className="space-y-4">
              {SCHEDULE_RECORDS.map(record => (
                <div 
                  key={record.id} 
                  className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-50 p-4 cursor-pointer active:scale-[0.98] transition-transform"
                  onClick={() => setSelectedSchedule(record)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#5C6DFF]"></div>
                      <span className="text-[13px] font-bold text-[#5C6DFF]">{record.time}</span>
                    </div>
                    <span className="text-[11px] font-medium px-2 py-1 bg-gray-50 text-gray-500 rounded-md">
                      {record.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-[15px] text-gray-900 mb-2 leading-snug">{record.title}</h3>
                  <div className="flex items-center text-[12px] text-gray-400 font-medium">
                    <MapPin size={13} className="mr-1 text-gray-300 flex-shrink-0" />
                    <span className="truncate">{record.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>`;

content = content.replace(oldScheduleBlock, newScheduleBlock);


// 2. Add the selectedSchedule modal
const modalBlock = `      {/* Schedule Detail Modal */}
      <AnimatePresence>
        {selectedSchedule && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="fixed inset-0 z-[80] bg-white flex flex-col"
          >
             <div className="p-5 flex items-center justify-between border-b border-gray-100">
               <span className="font-bold text-[17px] text-gray-900">行程详情</span>
               <button onClick={() => setSelectedSchedule(null)} className="p-2 -mr-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                 <X size={20} />
               </button>
             </div>
             
             <div className="flex-1 overflow-y-auto pb-20 p-5 space-y-6 bg-gray-50/30">
                <div className="bg-white p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-50">
                  <h2 className="text-[17px] font-bold text-gray-900 mb-3 leading-snug">{selectedSchedule.title}</h2>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-500 text-[13px]">
                       <Calendar size={15} /> {selectedSchedule.time}
                    </div>
                    <div className="flex items-start gap-2 text-gray-500 text-[13px]">
                       <MapPin size={15} className="mt-0.5 flex-shrink-0" /> <span className="leading-relaxed">{selectedSchedule.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-50">
                  <div className="font-bold text-[15px] text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-3.5 bg-[#5C6DFF] rounded-full"></div>
                    行程安排
                  </div>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-gray-100 before:to-transparent">
                    {selectedSchedule.detailedItinerary?.map((day: any, dayIdx: number) => (
                      <div key={dayIdx} className="mb-6 last:mb-0">
                        <div className="font-bold text-[13px] text-[#5C6DFF] bg-[#E5E9FF] inline-block px-3 py-1 rounded-full mb-4 relative z-10">{day.day} - {day.date}</div>
                        <div className="space-y-4">
                          {day.activities?.map((act: any, actIdx: number) => (
                            <div key={actIdx} className="relative flex items-start gap-4">
                              <div className="absolute left-[11px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#5C6DFF] -translate-x-[2.5px] border-2 border-white shadow-sm z-10"></div>
                              <div className="w-12 text-[13px] font-bold text-gray-400 pt-0.5 pl-[22px] flex-shrink-0">{act.time}</div>
                              <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100/50">
                                <div className="text-[14px] font-bold text-gray-900">{act.event}</div>
                                {act.detail && <div className="text-[12px] text-gray-500 mt-1">{act.detail}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>`;

// Insert modal before </motion.div> at the very end
content = content.replace(
  '      <LeadCaptureModal',
  modalBlock + '\\n\\n      <LeadCaptureModal'
);

fs.writeFileSync('src/components/EventPage.tsx', content);

