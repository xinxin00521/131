import fs from 'fs';

let content = fs.readFileSync('src/components/EventPage.tsx', 'utf8');

// 5. Replace Main Discovery Content
const mainStart = '<div className="px-5 space-y-6 mt-2">';
const mainEnd = ") : activeTab === 'schedule' ? (";
const sIdx = content.indexOf(mainStart);
const eIdx = content.indexOf(mainEnd, sIdx);

const newMainBody = `<div className="px-5 mt-3 h-[calc(100vh-140px)]">
        {activeTab === 'discovery' ? (
          <div className="flex h-full w-full gap-3 pb-20">
            {/* Left Sidebar Menu */}
            <div className="w-[84px] overflow-y-auto no-scrollbar flex-shrink-0 flex flex-col gap-2">
              {DISCOVERY_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={\`w-full py-4 px-2 text-[13px] font-medium text-center transition-all rounded-xl relative \${
                    activeCategory === cat 
                      ? 'bg-[#F43F5E] text-white shadow-md shadow-rose-200 font-bold scale-[1.02]' 
                      : 'text-gray-600 bg-white/60 border border-gray-100 hover:bg-white/80'
                  }\`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right Side Content (Event Cards) */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-10 space-y-3">
              {filteredEvents.map(event => (
                <div 
                  key={event.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100/60 flex flex-col cursor-pointer active:scale-[0.98] transition-transform"
                  onClick={() => setViewingEvent(event)}
                >
                  <div className="relative h-28">
                    <img src={event.cover} alt={event.title} className="w-full h-full object-cover" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 rounded bg-black/50 backdrop-blur-sm text-[10px] font-bold text-white">
                        {event.status}
                      </span>
                    </div>
                    {event.isMemberFree && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                        会员免费
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-2 mb-2">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {event.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-[10px] text-gray-500 mb-1">
                      <MapPin size={10} className="mr-1 flex-shrink-0 text-gray-400" /> 
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center text-[10px] text-gray-500 mb-3">
                      <Calendar size={10} className="mr-1 flex-shrink-0 text-gray-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
                      <div className="font-bold text-[#F43F5E] text-[15px]">
                        {event.price}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                          setShowPurchaseModal(true);
                        }}
                        className="px-3 py-1 bg-[#F43F5E] text-white text-[10px] font-medium rounded-full shadow-sm text-center"
                      >
                        报名
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredEvents.length === 0 && (
                <div className="py-10 text-center text-gray-400 text-[13px]">
                  暂无符合条件的活动
                </div>
              )}
            </div>
          </div>
        ) : activeTab === 'schedule' ? (`;

if (sIdx !== -1 && eIdx !== -1) {
  content = content.substring(0, sIdx) + newMainBody + content.substring(eIdx + mainEnd.length);
  fs.writeFileSync('src/components/EventPage.tsx', content);
  console.log("Modifications complete.");
} else {
  console.log("Could not find main start/end indices.");
  console.log("sIdx: ", sIdx, "eIdx: ", eIdx);
}
