import fs from 'fs';

let content = fs.readFileSync('src/components/EventPage.tsx', 'utf8');

// 1. Remove left padding from parent container, and add padding to specific tabs
content = content.replace(
  '<div className="px-5 mt-3 h-[calc(100vh-140px)]">',
  '<div className="mt-3 h-[calc(100vh-140px)]">'
);

content = content.replace(
  '<div className="flex h-full w-full gap-2 pb-20">',
  '<div className="flex h-full w-full gap-2 pb-20 pr-4">'
);

// We replace all instances of "pb-10 space-y-4" for schedule/favorites tabs
content = content.replace(
  /<div className="flex-1 overflow-y-auto no-scrollbar pb-10 space-y-4">/g,
  '<div className="flex-1 overflow-y-auto no-scrollbar pb-10 space-y-4 px-5">'
);

// 2. Adjust Sidebar Background & Shadow
content = content.replace(
  '<div className="w-[85px] bg-white shadow-[2px_0_12px_rgba(0,0,0,0.03)] rounded-r-2xl overflow-y-auto no-scrollbar flex-shrink-0 flex flex-col pt-2 pb-6 gap-0 z-10">',
  '<div className="w-[85px] bg-white shadow-[2px_0_8px_rgba(0,0,0,0.02)] overflow-y-auto no-scrollbar flex-shrink-0 flex flex-col pt-2 pb-6 gap-0 z-10">'
);

// 3. Update Left Sidebar Button Aligment & Active Selection Line
const oldButtonCode = `              {DISCOVERY_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={\`w-full py-4 text-[13px] text-center transition-all relative \${
                    activeCategory === cat 
                      ? 'text-[#5C6DFF] font-bold' 
                      : 'text-gray-500'
                  }\`}
                >
                  <span className="relative z-10 block whitespace-nowrap">{cat}</span>
                </button>
              ))}`;

const newButtonCode = `              {DISCOVERY_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={\`w-full py-4 pl-3 text-[13px] text-left transition-all relative \${
                    activeCategory === cat 
                      ? 'text-[#5C6DFF] font-bold bg-[#F5F7FF]' 
                      : 'text-gray-500 hover:text-gray-900 bg-transparent'
                  }\`}
                >
                  {activeCategory === cat && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[16px] bg-[#5C6DFF] rounded-r-md"></div>
                  )}
                  <span className="relative z-10 block whitespace-nowrap tracking-wide pl-1">{cat}</span>
                </button>
              ))}`;

content = content.replace(oldButtonCode, newButtonCode);

// 4. Update timeline vertical line weight
content = content.replace(
  '<div className="absolute left-[18px] top-6 bottom-0 w-[1.5px] bg-gray-100"></div>',
  '<div className="absolute left-[18px] top-6 bottom-0 w-[2px] bg-gray-200"></div>'
);

// 5. Soften card shadows 
content = content.replace(
  /className="bg-white rounded-xl overflow-hidden shadow-\[0_2px_12px_rgba\(0,0,0,0\.04\)\] border border-gray-50 ml-\[20px\] flex flex-col cursor-pointer active:scale-\[0\.98\] transition-transform relative"/g,
  'className="bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-gray-50/50 ml-[20px] flex flex-col cursor-pointer active:scale-[0.98] transition-transform relative"'
);

fs.writeFileSync('src/components/EventPage.tsx', content);
console.log('Update Script Created and Executed');
