import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  FolderLock, 
  FileBox, 
  Download, 
  Eye, 
  FileText, 
  Video, 
  Image as ImageIcon, 
  FileCode, 
  ChevronRight,
  Search,
  X,
  Play
} from 'lucide-react';

interface ResourceFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'word' | 'ppt' | 'pdf';
  size: string;
  url: string;
}

interface ResourcePack {
  id: string;
  title: string;
  date: string;
  files: ResourceFile[];
}

const MOCK_PACKS: ResourcePack[] = [
  {
    id: 'pack1',
    title: '2024大成财税年度峰会资料合集',
    date: '2024-03-25',
    files: [
      { id: 'f1', name: '峰会开幕式精彩致辞', type: 'video', size: '124.5 MB', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'f2', name: '2024宏观经济趋势分析报告', type: 'pdf', size: '2.4 MB', url: '#' },
      { id: 'f3', name: '嘉宾演讲PPT合集', type: 'ppt', size: '45.2 MB', url: '#' },
      { id: 'f4', name: '现场精彩瞬间照片墙', type: 'image', size: '18.5 MB', url: 'https://picsum.photos/seed/moment1/800/600' },
    ]
  },
  {
    id: 'pack2',
    title: '房地产企业土地增值税清算实务课',
    date: '2024-03-15',
    files: [
      { id: 'f5', name: '清算流程图及关键风险点', type: 'word', size: '1.2 MB', url: '#' },
      { id: 'f6', name: '土地增值税预征管理办法解读', type: 'pdf', size: '0.8 MB', url: '#' },
      { id: 'f7', name: '实操案例演示视频', type: 'video', size: '85.4 MB', url: '#' },
    ]
  },
  {
    id: 'pack3',
    title: '高新技术企业研发费用加计扣除专题',
    date: '2024-02-28',
    files: [
      { id: 'f8', name: '项目立项及申报指引', type: 'pdf', size: '3.1 MB', url: '#' },
      { id: 'f9', name: '高新认定专家培训课件', type: 'ppt', size: '15.8 MB', url: '#' },
    ]
  },
  {
    id: 'pack4',
    title: '企业数字化税务转型管理白皮书分享会',
    date: '2024-01-20',
    files: [
      { id: 'f10', name: '数字化转型白皮书完整版', type: 'pdf', size: '12.5 MB', url: '#' },
      { id: 'f11', name: '分享会嘉宾对谈录音节选', type: 'video', size: '32.1 MB', url: '#' },
    ]
  }
];

export const ResourcePackPage: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [selectedPack, setSelectedPack] = useState<ResourcePack | null>(null);
  const [previewFile, setPreviewFile] = useState<ResourceFile | null>(null);

  const getFileIcon = (type: ResourceFile['type']) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-5 h-5 text-emerald-500" />;
      case 'video': return <Video className="w-5 h-5 text-blue-500" />;
      case 'word': return <FileText className="w-5 h-5 text-indigo-500" />;
      case 'ppt': return <FileBox className="w-5 h-5 text-orange-500" />;
      case 'pdf': return <FileCode className="w-5 h-5 text-rose-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleDownload = (file: ResourceFile) => {
    alert(`正在为您准备并下载: ${file.name}`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 bg-gray-50 z-[250] flex flex-col"
      >
        {/* Header */}
        <div className="bg-white px-4 pt-14 pb-4 flex items-center justify-between border-b border-gray-100 shrink-0">
          <button onClick={selectedPack ? () => setSelectedPack(null) : onClose} className="p-2 -ml-2 text-gray-800">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[17px] font-bold text-gray-900">
            {selectedPack ? '资料详情' : '我的资料包'}
          </h1>
          <div className="w-10" />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
          {!selectedPack ? (
            <div className="p-4">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="搜索资料包..."
                  className="w-full h-10 bg-white border border-gray-100 rounded-xl pl-10 pr-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-4 relative pl-4">
                {/* Timeline Line */}
                <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-blue-100/50" />

                {MOCK_PACKS.map((pack) => (
                  <motion.div
                    key={pack.id}
                    onClick={() => setSelectedPack(pack)}
                    className="relative pl-8 group"
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-3 w-4 h-4 bg-white border-2 border-blue-500 rounded-full z-10 group-hover:bg-blue-500 transition-colors" />
                    
                    <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50 group-hover:border-blue-100 transition-all">
                      <div className="text-[12px] font-bold text-blue-500 mb-2">{pack.date}</div>
                      <h3 className="text-[16px] font-black text-gray-900 mb-3 leading-snug">
                        {pack.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-1.5 overflow-hidden">
                            {pack.files.slice(0, 3).map((file, idx) => (
                              <div key={idx} className="w-6 h-6 bg-gray-50 border-2 border-white rounded-lg flex items-center justify-center shadow-sm">
                                {getFileIcon(file.type)}
                              </div>
                            ))}
                          </div>
                          <span className="text-[12px] text-gray-400 font-medium">
                            共 {pack.files.length} 个资料
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-[32px] text-white mb-6 shadow-lg shadow-blue-200">
                <div className="text-[13px] font-medium opacity-80 mb-2">{selectedPack.date}</div>
                <h2 className="text-[20px] font-black mb-4 leading-relaxed">{selectedPack.title}</h2>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[12px]">
                    {selectedPack.files.length} 个文件
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[12px]">
                    已解锁
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {selectedPack.files.map((file) => (
                  <div key={file.id} className="bg-white p-4 rounded-2xl border border-gray-50 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[15px] font-bold text-gray-900 truncate mb-0.5">{file.name}</div>
                      <div className="text-[12px] text-gray-400 font-medium">{file.size}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setPreviewFile(file)}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all active:scale-95"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDownload(file)}
                        className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-xl transition-all active:scale-95"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Global Preview Modal */}
        <AnimatePresence>
          {previewFile && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPreviewFile(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl z-10"
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="text-[14px] font-bold text-gray-900 truncate mr-4">{previewFile.name}</div>
                  <button onClick={() => setPreviewFile(null)} className="p-2 text-gray-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="bg-gray-100 aspect-video flex items-center justify-center overflow-hidden">
                  {previewFile.type === 'image' && (
                    <img src={previewFile.url} alt="" className="w-full h-full object-contain" />
                  )}
                  {previewFile.type === 'video' && (
                    <div className="relative w-full h-full">
                      <video src={previewFile.url} controls className="w-full h-full object-contain" />
                    </div>
                  )}
                  {(previewFile.type === 'word' || previewFile.type === 'ppt' || previewFile.type === 'pdf') && (
                    <div className="flex flex-col items-center gap-4 text-center p-10">
                      <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center">
                        {getFileIcon(previewFile.type)}
                      </div>
                      <div className="text-[15px] font-bold text-gray-600">
                        {previewFile.type.toUpperCase()} 文档预览暂未开放
                      </div>
                      <p className="text-[13px] text-gray-400">请点击下方按钮下载后查看</p>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-white">
                  <button
                    onClick={() => handleDownload(previewFile)}
                    className="w-full py-4 bg-blue-600 text-white rounded-full font-bold text-[16px] shadow-lg shadow-blue-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" /> 下载资料 ({previewFile.size})
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
