import fs from 'fs';

let content = fs.readFileSync('src/components/EventPage.tsx', 'utf8');

const oldScheduleBlock = `<div className="flex-1 overflow-y-auto no-scrollbar pb-10 px-5 pt-2">
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

const newScheduleBlock = `<div className="flex-1 overflow-y-auto no-scrollbar pb-10 pl-5 pr-4 relative pt-2">
            <h2 className="text-[19px] font-black text-gray-900 mb-6 px-1">我的行程</h2>
            {/* Timeline line */}
            <div className="absolute left-[24.5px] top-[72px] bottom-10 w-[2px] bg-[#E8EBF0]"></div>
            
            <div className="space-y-6 relative z-10 w-full overflow-hidden">
              {SCHEDULE_RECORDS.map(record => (
                <div key={record.id} className="relative w-full">
                  {/* Timeline node */}
                  <div className="flex items-center gap-3 mb-2.5 relative z-10 bg-[#f8fbff] rounded-full w-fit pr-3">
                    <div className="w-3 h-3 rounded-full bg-[#5C6DFF] border-[3px] border-white shadow-sm flex-shrink-0 ml-[0.5px]"></div>
                    <span className="text-[15px] font-black text-gray-900 tracking-tight">{record.time}</span>
                    <span className={\`text-[11px] font-bold px-2 py-0.5 rounded-full ml-1 \${record.status === '进行中' ? 'bg-rose-50 text-rose-500' : 'bg-gray-100 text-gray-500'}\`}>{record.status}</span>
                  </div>
                  
                  {/* Card with cover */}
                  <div 
                    className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-gray-100/80 ml-6 cursor-pointer active:scale-[0.98] transition-transform overflow-hidden"
                    onClick={() => setSelectedSchedule(record)}
                  >
                    <div className="h-[130px] relative">
                      <img src={record.image} alt={record.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <h3 className="absolute bottom-3 left-3 right-3 font-bold text-[15px] text-white leading-snug line-clamp-2 drop-shadow-md">
                        {record.title}
                      </h3>
                    </div>
                    <div className="p-3 bg-white">
                      <div className="flex items-center text-[12px] text-gray-500 font-medium">
                        <MapPin size={13} className="mr-1.5 text-gray-400 shrink-0" />
                        <span className="truncate">{record.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>`;

content = content.replace(oldScheduleBlock, newScheduleBlock);
fs.writeFileSync('src/components/EventPage.tsx', content);

let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace('await new Promise((resolve) => setTimeout(resolve, 800));', 'await new Promise((resolve) => setTimeout(resolve, 150));');
fs.writeFileSync('src/App.tsx', appContent);

let policyContent = fs.readFileSync('src/components/PolicyServicePage.tsx', 'utf8');
policyContent = policyContent.replace('}, 1000);', '}, 200);');
fs.writeFileSync('src/components/PolicyServicePage.tsx', policyContent);
