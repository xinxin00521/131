import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Download, FileText, FileImage, FileArchive, Folder, Search, ChevronRight } from 'lucide-react';

interface CourseMaterialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock Data
const PARTICIPATED_EVENTS = [
  {
    id: 'e1',
    title: '2024大成财税年度峰会：新经济下的变革',
    date: '2024-03-15',
    image: 'https://picsum.photos/seed/sch1/200/200',
    materials: [
      { id: 'm1', name: '主论坛嘉宾PPT合集.zip', type: 'zip', size: '45.2 MB' },
      { id: 'm2', name: '2024财税行业白皮书.pdf', type: 'pdf', size: '12.8 MB' },
      { id: 'm3', name: '现场高清照片合集.zip', type: 'zip', size: '128.5 MB' },
    ]
  },
  {
    id: 'e2',
    title: '房地产企业土地增值税清算实务深度解析',
    date: '2024-04-15',
    image: 'https://picsum.photos/seed/sch2/200/200',
    materials: [
      { id: 'm4', name: '李晓明老师课件-土增税实操.pdf', type: 'pdf', size: '8.5 MB' },
      { id: 'm5', name: '清算表格模板(Excel).zip', type: 'zip', size: '2.1 MB' },
    ]
  },
  {
    id: 'e3',
    title: '高新技术企业研发费用加计扣除专题培训',
    date: '2024-04-22',
    image: 'https://picsum.photos/seed/sch3/200/200',
    materials: [
      { id: 'm6', name: '研发费用加计扣除政策解读.pdf', type: 'pdf', size: '5.4 MB' },
      { id: 'm7', name: '申报材料清单及范本.pdf', type: 'pdf', size: '3.2 MB' },
    ]
  }
];

export const CourseMaterialsModal: React.FC<CourseMaterialsModalProps> = ({ isOpen, onClose }) => {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredEvents = PARTICIPATED_EVENTS.filter(event => 
    event.title.includes(searchQuery)
  );

  const handleDownload = (id: string, name: string) => {
    setDownloadingId(id);
    // Simulate download
    setTimeout(() => {
      setDownloadingId(null);
      // Create a fake download link
      const element = document.createElement("a");
      const file = new Blob(["This is a simulated downloaded file content."], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = name;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-6 h-6 text-red-500" />;
      case 'zip': return <FileArchive className="w-6 h-6 text-yellow-500" />;
      case 'image': return <FileImage className="w-6 h-6 text-blue-500" />;
      default: return <FileText className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 bg-[#F5F6F8] z-[300] flex flex-col"
      >
        {/* Header */}
        <div className="pt-12 pb-3 px-5 bg-white sticky top-0 z-20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => selectedEvent ? setSelectedEvent(null) : onClose()} 
                className="p-1 -ml-1"
              >
                <ChevronLeft size={24} className="text-gray-800" />
              </button>
              <h2 className="text-[17px] font-bold text-gray-900">
                {selectedEvent ? '资料包详情' : '我的课程资料'}
              </h2>
            </div>
          </div>

          {!selectedEvent && (
            <div className="flex items-center space-x-3">
              <div className="flex-1 h-9 bg-gray-100 rounded-xl flex items-center px-4">
                <Search size={16} className="text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="搜索活动名称" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-[14px] text-gray-700 w-full placeholder-gray-400"
                />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {!selectedEvent ? (
            // Event List
            <div className="space-y-3">
              {filteredEvents.map(event => (
                <div 
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="bg-white rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                      {event.image ? (
                        <img src={event.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-50">
                          <Folder className="w-6 h-6 text-blue-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold text-gray-900 truncate mb-1">{event.title}</h3>
                      <div className="flex items-center gap-3 text-[12px] text-gray-500">
                        <span>{event.date}</span>
                        <span>共 {event.materials.length} 个文件</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0 ml-2" />
                </div>
              ))}
              {filteredEvents.length === 0 && (
                <div className="text-center py-12 text-gray-400 text-[14px]">
                  没有找到相关活动资料
                </div>
              )}
            </div>
          ) : (
            // Materials List
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
                <h3 className="text-[16px] font-bold text-gray-900 mb-2 leading-snug">{selectedEvent.title}</h3>
                <p className="text-[13px] text-gray-500">参加时间：{selectedEvent.date}</p>
              </div>

              <h4 className="text-[14px] font-bold text-gray-900 px-1 mb-2">包含文件 ({selectedEvent.materials.length})</h4>
              
              <div className="space-y-3">
                {selectedEvent.materials.map((material: any) => (
                  <div key={material.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getFileIcon(material.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[14px] font-medium text-gray-900 truncate mb-1">{material.name}</h4>
                        <p className="text-[11px] text-gray-400">{material.size}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDownload(material.id, material.name)}
                      disabled={downloadingId === material.id}
                      className="ml-4 p-2 bg-blue-50 text-blue-600 rounded-full active:scale-95 transition-transform disabled:opacity-50"
                    >
                      {downloadingId === material.id ? (
                        <div className="w-5 h-5 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                      ) : (
                        <Download className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
