import fs from 'fs';

let content = fs.readFileSync('src/components/EventPage.tsx', 'utf8');

content = content.replace(
  /<PurchaseModal\s+isOpen={showPurchaseModal}\s+onClose={\(\) => setShowPurchaseModal\(false\)}\s+\/>/, 
  `<PurchaseModal 
        isOpen={showPurchaseModal} 
        onClose={() => setShowPurchaseModal(false)}
        itemType="activity"
        itemTitle={selectedEvent?.title || ''}
        price={selectedEvent?.price || '免费'}
        points={100}
      />`
);

fs.writeFileSync('src/components/EventPage.tsx', content);
