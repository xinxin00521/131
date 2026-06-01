import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MoreHorizontal, Download } from 'lucide-react';

interface AddToDesktopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddToDesktopModal: React.FC<AddToDesktopModalProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[5000] flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full bg-[#f8fbff] rounded-t-[32px] flex flex-col overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none" />
            
            <div className="flex items-center justify-between p-6 relative z-10">
               <h3 className="text-[19px] font-black text-gray-900">添加到桌面</h3>
               <button onClick={onClose} className="p-2 -mr-2 bg-white/80 rounded-full text-gray-400">
                 <X size={20} />
               </button>
            </div>
            
            <div className="px-6 pb-12 relative z-10 flex flex-col items-center">
               <p className="text-[14px] text-gray-500 mb-8 text-center leading-relaxed">
                 只需两步，即可将大成财税AI小程序添加到桌面，随时随地便捷访问。
               </p>
               
               <div className="w-full flex gap-3">
                 <div className="flex-1 bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col items-center text-center relative">
                   <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-black text-[12px] flex items-center justify-center">1</div>
                   <div className="w-14 h-8 bg-gray-100 rounded-full flex flex-col items-center justify-center mt-6 mb-4">
                     <MoreHorizontal className="w-6 h-6 text-gray-800" />
                   </div>
                   <div className="text-[14px] font-bold text-gray-900">点击右上角</div>
                   <div className="text-[12px] text-gray-400 mt-1">「更多」按钮</div>
                 </div>
                 
                 <div className="flex-1 bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col items-center text-center relative">
                   <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-black text-[12px] flex items-center justify-center">2</div>
                   <div className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center mt-5 mb-3">
                     <Download className="w-5 h-5 text-gray-800" />
                   </div>
                   <div className="text-[14px] font-bold text-gray-900">选择添加到桌面</div>
                   <div className="text-[12px] text-gray-400 mt-1">即可一键访问</div>
                 </div>
               </div>
               
               <button 
                 onClick={onClose}
                 className="w-full mt-10 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-[0_4px_12px_rgba(37,99,235,0.3)]"
               >
                 我知道了
               </button>
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};
