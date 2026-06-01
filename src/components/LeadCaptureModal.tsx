import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, UserCheck } from "lucide-react";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  type?: string; 
  description?: string;
  onSubmit?: () => void;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  title = "预约专属顾问",
  type = 'purchase',
  description,
  onSubmit
}) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    setIsSuccess(true);
    if (onSubmit) {
      onSubmit();
    }
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isSuccess && onClose()}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl"
          >
            {isSuccess ? (
              <div className="py-10 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </motion.div>
                <h3 className="text-[20px] font-black text-gray-900 mb-2">预约成功</h3>
                <p className="text-[14px] text-gray-500 text-center leading-relaxed">
                  您的专属顾问将在24小时内与您联系<br/>请留意接听来电
                </p>
              </div>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 mb-3 pr-8">
                  <h3 className="text-[19px] font-black text-gray-900">{title}</h3>
                </div>
                <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">
                  {description || "确认后顾问将尽快联系您，安排免费试听。"}
                </p>

                <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50 mb-8 flex items-center gap-4">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-500 shrink-0">
                     <UserCheck size={24} />
                   </div>
                   <div>
                     <div className="text-[15px] font-bold text-gray-900 mb-1">专属顾问</div>
                   </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-colors text-[16px]"
                  >
                    确认预约
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-3.5 rounded-xl font-bold text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-50 transition-colors text-[15px]"
                  >
                    暂不预约
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
