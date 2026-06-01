import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Headphones,
  Scale,
  Coffee,
  Award,
  Sparkles,
  Navigation,
  ChevronLeft, ChevronRight,
  Crown,
  Building,
  ChevronDown,
  Check,
  BookOpen,
} from "lucide-react";
import { AdvisorContactModal } from "./AdvisorContactModal";
import { CallExpertModal } from "./CallExpertModal";

export interface BenefitsPageProps {
  onBack?: () => void;
  companyName?: string;
  boundCompanies?: {companyName: string}[];
  onSwitchCompany?: (companyName: string) => void;
  onSpecialColumnClick?: (columnName: string) => void;
  onEventClick?: () => void;
  onCourseClick?: (course: any) => void;
  onEnterMemberCenter?: () => void;
}

const benefits = [
  {
    id: 2,
    title: "税法直通车",
    desc: "最新税法政策第一时间解读",
    icon: Scale,
    color: "bg-indigo-50 text-indigo-600",
    isNew: true,
  },
  {
    id: 3,
    title: "财税早餐",
    desc: "每天清晨为您奉上财税视讯精华",
    icon: Coffee,
    color: "bg-orange-50 text-orange-500",
    isNew: true,
  },
  {
    id: 6,
    title: "游学标杆参访",
    desc: "本期：走进知名大厂探秘财务管理新模式",
    icon: Navigation,
    color: "bg-violet-50 text-violet-600",
    isNew: true,
  },
  {
    id: 1,
    title: "大成云人工答疑",
    desc: "专家在线解答您的财税疑问",
    icon: Headphones,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 5,
    title: "高快考证训练",
    desc: "高频题库与名师辅导，助力快速通关",
    icon: BookOpen,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 4,
    title: "审计总监特训营",
    desc: "进阶高管的实战必修课",
    icon: Award,
    color: "bg-rose-50 text-rose-600",
  },
];

export const BenefitsPage: React.FC<BenefitsPageProps> = ({
  onBack,
  companyName,
  boundCompanies = [],
  onSwitchCompany,
  onSpecialColumnClick,
  onEventClick,
  onCourseClick,
  onEnterMemberCenter,
}) => {
  const [isCompanySwitcherOpen, setIsCompanySwitcherOpen] = useState(false);
  const selectedCompany = companyName || "大成方略科技股份有限公司";
    
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isCallExpertOpen, setIsCallExpertOpen] = useState(false);
  const [showThirdPartyModal, setShowThirdPartyModal] = useState(false);
  const [showVipOverlay, setShowVipOverlay] = useState(true);

  const companies = boundCompanies.length > 0 
    ? boundCompanies.map(c => c.companyName) 
    : [
        "大成方略科技股份有限公司",
        "北京智汇财税咨询有限公司",
        "上海新动力创新科技有限公司",
      ];

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-[#F7F8FA] pb-32">
      {/* Header Profile Section */}
      <div className="bg-gradient-to-b from-[#1a1c29] to-[#2a2d42] pt-14 pb-8 px-5 relative shadow-md z-20">
        <div className="flex justify-between items-center relative mb-6 min-h-[32px]">
          {onBack ? (
            <button onClick={onBack} className="p-1 -ml-1 text-white active:scale-95 transition-transform z-10">
              <ChevronLeft className="w-6 h-6" />
            </button>
          ) : <div></div>}
          <h1 className="text-[17px] font-bold text-white tracking-wide absolute left-0 right-0 text-center pointer-events-none">
            大成方略
          </h1>
          <div className="w-10"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 z-0"></div>

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center">
            {/* Company Name (Static, no switching) */}
            <div className="flex-1">
              <div className="flex items-center gap-2.5 bg-white/10 px-3 py-2 rounded-xl w-max">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-inner">
                  <Building className="w-4 h-4 text-white" />
                </div>
                <span className="text-white text-[15px] font-bold tracking-wide truncate">
                  {selectedCompany}
                </span>
              </div>
            </div>
          </div>

          {/* 会员信息 */}
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/20">
              <Crown className="w-3.5 h-3.5 text-yellow-500" />
            </div>
            <span className="text-white/80 text-[13px] font-medium tracking-wide">
              基础会员有限期至：2025-12-31
            </span>
          </div>

          <h2 className="text-white text-[18px] font-bold tracking-wide mt-3">
            专属权益
          </h2>
        </div>
      </div>

      {/* Benefits List */}
      <div className="px-5 mt-6 mb-8">
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              key={benefit.id}
              onClick={() => {
                if (benefit.title === "大成云人工答疑") {
                  setIsCallExpertOpen(true);
                } else if (
                  benefit.title === "税法直通车" ||
                  benefit.title === "财税早餐"
                ) {
                  onCourseClick?.({
                    id: `benefits-${benefit.id}`,
                    title: benefit.title,
                    type: "course",
                    cover: "https://images.unsplash.com/photo-1544881655-78ba9d3afeb3?auto=format&fit=crop&q=80&w=800",
                    views: "1.2w",
                    price: "免费",
                    author: "财税专家",
                    category: benefit.title,
                    status: "normal",
                  });
                } else if (benefit.title === "游学标杆参访") {
                  onEventClick?.();
                } else if (benefit.title === "高快考证训练") {
                  setShowThirdPartyModal(true);
                }
              }}
              className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-4 active:scale-95 transition-all cursor-pointer border border-transparent hover:border-gray-50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] group"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${benefit.color} transition-all duration-300 group-hover:scale-110 shadow-inner`}
              >
                <benefit.icon className="w-7 h-7" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-[16px] font-bold text-gray-900 leading-tight truncate group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h3>
                  {benefit.isNew && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded flex-shrink-0 bg-red-500 text-white shadow-sm">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-gray-500 truncate leading-relaxed group-hover:text-gray-600 transition-colors">
                  {benefit.desc}
                </p>
              </div>

              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Member Center Button */}
        <div className="flex justify-center mt-6">
          <button 
            onClick={() => onEnterMemberCenter?.()}
            className="text-[13px] text-gray-500 font-medium py-2 px-5 rounded-full border border-gray-200 bg-white shadow-sm hover:text-blue-600 hover:border-blue-200 active:scale-95 transition-all flex items-center gap-1"
          >
            ui设计方案2
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <AdvisorContactModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />

      <CallExpertModal
        isOpen={isCallExpertOpen}
        onClose={() => setIsCallExpertOpen(false)}
      />

      {/* Third Party Jump Modal */}
      <AnimatePresence>
        {showThirdPartyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowThirdPartyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
            >
              <div className="p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-[20px] font-bold text-gray-900 mb-2">
                  即将离开当前应用
                </h3>
                <p className="text-[14px] text-gray-500 mb-8 leading-relaxed">
                  您即将前往第三方应用 "高快考证" 进行专业培训与练习，是否继续？
                </p>
                
                <div className="flex gap-4 w-full">
                  <button
                    onClick={() => setShowThirdPartyModal(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-full text-[15px] font-medium hover:bg-gray-200 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => {
                      setShowThirdPartyModal(false);
                      // Handle third party jump logic here
                    }}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-full text-[15px] font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                  >
                    前往应用
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* VIP Exclusive Overlay Demo */}
      <AnimatePresence>
        {showVipOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVipOverlay(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-b from-[#FAF8EB] to-[#FFF] w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="px-6 pt-10 pb-8 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg flex items-center justify-center mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-[22px] font-black text-gray-900 tracking-wider mb-2">
                  VIP 专区
                </h3>
                <p className="text-[13px] text-gray-500 mb-6 text-center">
                  输入专属会员码，解锁会员权益
                </p>

                <div className="w-full relative mb-4">
                  <input
                    type="text"
                    placeholder="请输入会员码"
                    className="w-full bg-white border border-yellow-200 rounded-xl px-4 py-3.5 text-[15px] font-bold text-gray-900 placeholder:text-gray-300 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-center tracking-widest shadow-sm"
                  />
                </div>

                <button
                  onClick={() => setShowVipOverlay(false)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold text-[16px] shadow-lg shadow-yellow-500/30 hover:opacity-90 active:scale-[0.98] transition-all mb-5 tracking-wide"
                >
                  立即加入
                </button>

                <div className="flex items-center justify-center gap-1.5 cursor-pointer text-gray-400 hover:text-yellow-600 transition-colors">
                  <Headphones className="w-4 h-4" />
                  <span className="text-[13px] font-medium" onClick={() => setIsCallModalOpen(true)}>联系顾问获取会员码</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
