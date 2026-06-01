import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Sparkles, Phone, X, UserCheck } from "lucide-react";
import { LeadCaptureModal } from "./LeadCaptureModal";
import expertAvatar from '../assets/images/expert_finance_pure_white_1779777912018.png';

interface CallExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
  directCall?: boolean;
}

export const CallExpertModal: React.FC<CallExpertModalProps> = ({
  isOpen,
  onClose,
  directCall,
}) => {
  const [showReservationDialog, setShowReservationDialog] = useState(false);

  const handleCallClick = () => {
    setShowReservationDialog(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-white flex flex-col"
        >
          {/* Header */}
          <div className="pt-14 px-4 pb-2 flex items-center shrink-0">
            <button
              onClick={onClose}
              className="p-2 -ml-2 text-gray-700 hover:bg-black/5 rounded-full transition-colors relative z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-[17px] font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">
              人工专家
            </span>
          </div>

          <div className="flex-1 flex flex-col px-6 overflow-y-auto">
            {/* Avatar Area */}
            <div className="w-full flex justify-center pt-7 pb-2 shrink-0">
              <img
                src={expertAvatar}
                alt="3D Expert"
                fetchPriority="high"
                decoding="sync"
                className="w-auto h-[310px] sm:h-[310px] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Greeting Text */}
            <div className="mt-6 flex flex-col gap-2 relative z-10 items-center text-center shrink-0">
              <div className="text-[24px] font-bold text-[#1E3A8A] font-sans tracking-tight">
                拨打答疑热线
              </div>
              <div className="text-[14px] text-gray-600 font-medium leading-relaxed">
                人工专家1对1为您解答财税问题<br />工作日：08:20~17:00
              </div>
            </div>

            {/* Flexible Spacer to push button downwards */}
            <div className="flex-1 min-h-[32px]" />

            {/* Select Button */}
            <div className="w-full flex flex-col items-center gap-3 shrink-0 pb-12 pt-4">
             <motion.div
                animate={{ 
                  scale: [1, 1.05, 1], 
                  boxShadow: [
                    "0 0 0 0 rgba(59,130,246,0.3)", 
                    "0 0 0 20px rgba(59,130,246,0)", 
                    "0 0 0 0 rgba(59,130,246,0)"
                  ] 
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="rounded-full"
             >
                <button
                  onClick={handleCallClick}
                  className="w-[72px] h-[72px] rounded-full bg-gradient-to-b from-blue-500 to-blue-600 flex items-center justify-center shadow-lg border-2 border-white relative group active:scale-95 transition-transform"
                >
                  <Phone className="w-8 h-8 text-white fill-current" />
                </button>
             </motion.div>
             
             <div className="flex flex-col items-center gap-1 mt-2">
               <div className="bg-blue-100/50 text-blue-600 px-3 py-1 rounded-full text-[13px] font-medium flex items-center gap-1">
                 剩余免费通话：<span className="font-bold text-[14px]">1</span> 次
               </div>
             </div>
            </div>
          </div>

          <LeadCaptureModal 
            isOpen={showReservationDialog}
            onClose={() => {
              setShowReservationDialog(false);
              onClose();
            }}
            title="预约体验人工答疑"
            description="确认后专属顾问将尽快联系您，解答您的财税问题。"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
