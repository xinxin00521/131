import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Phone, QrCode } from "lucide-react";

interface AdvisorContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvisorContactModal: React.FC<AdvisorContactModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center px-4 pb-4 sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-[#F7F8FA] rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 pb-8 relative shrink-0">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <img
                  src="https://picsum.photos/seed/advisor/100/100"
                  alt="专属顾问"
                  className="w-14 h-14 rounded-full border-2 border-white/30 object-cover shrink-0"
                />
                <div>
                  <h3 className="text-[20px] font-bold text-white mb-1">您的专属顾问</h3>
                  <p className="text-blue-100 text-[13px]">大成方略为您提供1v1贴心服务</p>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="px-5 pt-6 pb-8 flex-1 overflow-y-auto no-scrollbar -mt-4 bg-white rounded-t-[24px] relative z-10 flex flex-col gap-6">
              
              {/* Add WeChat */}
              <div className="bg-gray-50 rounded-[20px] p-5 border border-gray-100 flex flex-col items-center">
                <h4 className="text-[16px] font-bold text-gray-900 mb-1">添加顾问企业微信</h4>
                <p className="text-[13px] text-gray-500 mb-4 text-center">长按识别二维码即可添加<br/>与您的专属顾问在线沟通</p>
                <div className="w-32 h-32 bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-1">
                  <img src="https://picsum.photos/seed/qrcode/200/200" alt="WeChat QR" className="w-full h-full object-cover rounded-lg" />
                </div>
              </div>

              {/* Phone */}
              <div className="bg-blue-50/50 rounded-[20px] p-5 border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-gray-900">顾问电话号码</h4>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between bg-white rounded-xl py-3 px-4 shadow-sm border border-blue-50">
                  <span className="text-[18px] font-bold text-blue-600 tracking-wider">400-888-9999</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors active:scale-95 shadow-sm">
                    拨打
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
