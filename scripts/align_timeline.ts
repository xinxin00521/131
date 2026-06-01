import fs from 'fs';

let content = fs.readFileSync('src/components/EventPage.tsx', 'utf8');

// Correct left line width and circle alignment
// Update absolute left
content = content.replace(
  '<div className="absolute left-[16px] top-6 bottom-0 w-[1px] bg-gray-200"></div>',
  '<div className="absolute left-[15px] top-6 bottom-0 w-[1px] bg-gray-200"></div>'
);

// We need to check if we can remove -ml-0.5 and just use padding properly
content = content.replace(
  '<div className="flex items-center gap-3 mb-2.5 relative z-10 bg-gray-50/50 rounded-full w-fit pr-3 -ml-0.5">',
  '<div className="flex items-center gap-2.5 mb-2.5 relative z-10 bg-gray-50/50 rounded-full w-fit pr-3">'
);

content = content.replace(
  '<div className="w-2 h-2 rounded-full bg-[#5C6DFF] flex-shrink-0 ml-[1px]"></div>',
  '<div className="w-2 h-2 rounded-full bg-[#5C6DFF] flex-shrink-0 ml-[1px]"></div>'
);

// Wait, if no -ml-0.5, then circle is at 12px (pl-3) + 1px (ml-[1px]) + 4px (radius) = 17px.
// Let's set left to 17px.
content = content.replace(
  '<div className="absolute left-[15px] top-6 bottom-0 w-[1px] bg-gray-200"></div>',
  '<div className="absolute left-[16.5px] top-6 bottom-0 w-[1px] bg-[#E8EBF0]"></div>' // soft blue-gray border
);


fs.writeFileSync('src/components/EventPage.tsx', content);
