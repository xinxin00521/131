import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, CheckCircle2, Loader2 } from 'lucide-react';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckInModal: React.FC<CheckInModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success'>('idle');

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
    }
  }, [isOpen]);

  const handleScan = () => {
    setStatus('scanning');
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[400] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 text-center relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-[20px] font-black text-gray-900 mb-8 mt-4">活动签到</h3>

            <div className="flex flex-col items-center justify-center py-8">
              {status === 'idle' && (
                <>
                  <div className="w-32 h-32 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 border-2 border-blue-100 border-dashed">
                    <QrCode className="w-12 h-12 text-blue-500" />
                  </div>
                  <p className="text-[14px] text-gray-500 mb-8">请对准活动现场的签到二维码</p>
                  <button 
                    onClick={handleScan}
                    className="w-full py-4 bg-blue-600 text-white rounded-full font-bold text-[16px] shadow-lg shadow-blue-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
                  >
                    <QrCode className="w-5 h-5" /> 模拟扫码签到
                  </button>
                </>
              )}

              {status === 'scanning' && (
                <>
                  <div className="w-32 h-32 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 relative overflow-hidden">
                    <QrCode className="w-12 h-12 text-blue-500 opacity-50" />
                    <motion.div 
                      animate={{ top: ['-10%', '110%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                    />
                  </div>
                  <p className="text-[15px] font-bold text-gray-700 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" /> 正在识别二维码...
                  </p>
                </>
              )}

              {status === 'success' && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h4 className="text-[20px] font-black text-gray-900 mb-2">签到成功！</h4>
                  <p className="text-[14px] text-gray-500 mb-8">欢迎参加「2024大成财税年度峰会」</p>
                  <button 
                    onClick={onClose}
                    className="w-full px-12 py-4 bg-gray-100 text-gray-800 rounded-full font-bold text-[16px] active:scale-95 transition-transform"
                  >
                    完成
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
