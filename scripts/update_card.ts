import fs from 'fs';

let content = fs.readFileSync('src/components/EventPage.tsx', 'utf8');

// 1. Add LeadCaptureModal import
content = content.replace(
  `import { PurchaseModal } from './PurchaseModal';`,
  `import { PurchaseModal } from './PurchaseModal';\nimport { LeadCaptureModal } from './LeadCaptureModal';`
);

// 2. Add State for LeadCaptureModal
content = content.replace(
  `const [showPurchaseModal, setShowPurchaseModal] = useState(false);`,
  `const [showPurchaseModal, setShowPurchaseModal] = useState(false);\n  const [showLeadCaptureModal, setShowLeadCaptureModal] = useState(false);`
);

// 3. Render LeadCaptureModal
content = content.replace(
  `      <PurchaseModal `,
  `      <LeadCaptureModal
        isOpen={showLeadCaptureModal}
        onClose={() => setShowLeadCaptureModal(false)}
        title="联系销售参与报名"
      />\n      <PurchaseModal `
);

// 4. Update the card HTML
const cardRegex = /<div\s+className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 ml-\[20px\] flex flex-col cursor-pointer active:scale-\[0\.98\] transition-transform relative"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*\)\)}/g;

const match = cardRegex.exec(content);
if (match) {
  const newCardInner = `
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
                              className="bg-[#5C6DFF] hover:bg-blue-600 text-white rounded-full px-5 py-1.5 text-[13px] font-medium shadow-sm transition-colors"
                            >
                              参与报名
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
`;
  const sIdx = match.index;
  const matchLen = match[0].length;
  // wait we matched all the way to `))}`
  content = content.substring(0, sIdx + match[0].indexOf('<div className="bg-white rounded-xl')) + `<div 
                      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 ml-[20px] flex flex-col cursor-pointer active:scale-[0.98] transition-transform relative"
                      onClick={() => setViewingEvent(event)}
                    >` + newCardInner;

  fs.writeFileSync('src/components/EventPage.tsx', content);
  console.log("Updated EventPage");
} else {
  console.log("Could not find card regex");
}
