import fs from 'fs';

let content = fs.readFileSync('src/components/EventPage.tsx', 'utf8');

content = content.replace(/<PurchaseModal\s+isOpen={showPurchaseModal}\s+onClose={\(\) => setShowPurchaseModal\(false\)}\s+event={selectedEvent}\s+\/>/, 
  `<PurchaseModal isOpen={showPurchaseModal} onClose={() => setShowPurchaseModal(false)} />`
);

content += `

export const ScheduleDetailModal: React.FC<any> = ({ isOpen, onClose, schedule }) => {
  if (!isOpen || !schedule) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
       <div className="bg-white rounded-xl p-5 m-5">
         <h2 className="font-bold mb-4">{schedule.title || 'Schedule Details'}</h2>
         <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Close</button>
       </div>
    </div>
  );
};
`;

fs.writeFileSync('src/components/EventPage.tsx', content);
