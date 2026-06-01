import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  Play,
  Crown,
  Headphones,
  FileText,
  AlertCircle,
  History,
  Star,
  Share2,
  Video,
  Eye,
  BookOpen,
  Mic,
  Lock,
} from "lucide-react";
import { LeadCaptureModal } from "./LeadCaptureModal";

interface PolicyArticlePageProps {
  article: { title: string; date: string; type?: string };
  onBack: () => void;
  onAskAI?: (query: string) => void;
}

export const PolicyArticlePage: React.FC<PolicyArticlePageProps> = ({
  article,
  onBack,
  onAskAI,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isGated, setIsGated] = useState(true);
  const [showLeadModal, setShowLeadModal] = useState(false);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white z-[70] flex flex-col"
    >
      {/* Transparent Header over Video */}
      <div className="absolute top-0 w-full z-20 flex items-center justify-between px-4 pt-14 pb-3">
        <button
          onClick={onBack}
          className="p-1.5 bg-black/30 backdrop-blur-md rounded-full text-white active:bg-black/50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Video Section */}
      <div className="relative w-full aspect-[4/3] bg-gray-900 shrink-0">
        <img
          src="https://picsum.photos/seed/taxvideo/800/600"
          className="w-full h-full object-cover opacity-90"
          alt="Video Cover"
          referrerPolicy="no-referrer"
        />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center pl-1 cursor-pointer hover:bg-white/30 transition-colors">
            <Play className="w-7 h-7 text-white" fill="white" />
          </div>
        </div>

        {/* Bottom Gradient & VIP Info */}
        <div className="absolute bottom-0 w-full pt-16 pb-3 px-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-between">
          <span className="text-white text-[13px] font-medium tracking-wide">
            付费专区试看0:50
          </span>
          <button
            onClick={() => setShowLeadModal(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#FDE047] to-[#F59E0B] text-[#78350F] px-4 py-1.5 rounded-full text-[13px] font-bold shadow-lg active:scale-95 transition-transform"
          >
            <Crown className="w-4 h-4" />
            预约顾问开通
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-y-auto bg-white px-5 py-6 no-scrollbar pb-32">
        <h1 className="text-[18px] font-medium text-gray-800 leading-snug mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 mb-8">
          {article.type && (
            <span className="text-[12px] text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded">
              {article.type}
            </span>
          )}
          <span className="text-[13px] text-gray-400">{article.date}</span>
        </div>

        {/* Mock Policy Text */}
        <div className={`relative text-[15px] text-gray-700 leading-relaxed space-y-5 ${isGated ? 'max-h-[360px] overflow-hidden' : ''}`}>
          <p>为进一步支持小微企业发展，现将有关税收政策公告如下：</p>

          <p className="font-medium text-gray-900">一、关于企业所得税优惠</p>
          <p>
            对小型微利企业年应纳税所得额不超过100万元的部分，减按25%计入应纳税所得额，按20%的税率缴纳企业所得税。本条所称小型微利企业，是指从事国家非限制和禁止行业，且同时符合年度应纳税所得额不超过300万元、从业人数不超过300人、资产总额不超过5000万元等三个条件的企业。
          </p>

          <p className="font-medium text-gray-900">二、关于个人所得税优惠</p>
          <p>
            对个体工商户年应纳税所得额不超过100万元的部分，在现行优惠政策基础上，减半征收个人所得税。个体工商户在享受规定优惠政策基础上，可叠加享受本条优惠政策。
          </p>

          <p className="font-medium text-gray-900">三、执行期限</p>
          <p>
            本公告自发布之日起执行至2027年12月31日。各级税务机关要严格落实各项税费优惠政策，确保政策红利直达快享。同时，加强政策宣传辅导，帮助纳税人准确掌握政策规定，便利享受政策红利。
          </p>

          <p className="pt-4 text-right text-gray-500">特此公告。</p>
          
          {isGated && (
            <div className="absolute bottom-0 left-0 w-full h-[220px] bg-gradient-to-t from-white via-white/90 to-transparent flex flex-col items-center justify-end pb-2">
              <div className="bg-white/90 backdrop-blur border border-blue-100 rounded-2xl p-6 shadow-xl w-full max-w-[320px] flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                  <Lock className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-gray-900 font-bold mb-2">解锁完整深度解析</h3>
                <p className="text-gray-500 text-[13px] text-center mb-4 leading-relaxed">
                  本文包含更多实操细节与专家建议
                </p>
                <button
                  onClick={() => setShowLeadModal(true)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Headphones className="w-4 h-4" />
                  联系顾问阅读全文
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Policy Metadata Section */}
        <div className={`mt-10 space-y-4 border-t border-gray-100 pt-6 ${isGated ? 'opacity-30 pointer-events-none filter blur-sm transition-all' : ''}`}>
          {/* 政策出处 */}
          <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/50">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <h3 className="text-[14px] font-medium text-gray-800">
                政策出处
              </h3>
            </div>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              国家税务总局
              财政部关于进一步支持小微企业和个体工商户发展有关税费政策的公告（2026年第8号）
            </p>
          </div>

          {/* 对比往期修改点 */}
          <div className="bg-orange-50/50 rounded-xl p-4 border border-orange-100/50">
            <div className="flex items-center gap-2 mb-2">
              <History className="w-4 h-4 text-orange-600" />
              <h3 className="text-[14px] font-medium text-gray-800">
                对比往期修改点
              </h3>
            </div>
            <ul className="text-[13px] text-gray-600 leading-relaxed list-disc list-inside space-y-1">
              <li>延长了小型微利企业所得税优惠政策的执行期限至2027年底。</li>
              <li>
                明确了个体工商户个人所得税减半征收政策可与其他优惠叠加享受。
              </li>
              <li>优化了享受优惠政策的申报流程，减少了证明材料。</li>
            </ul>
          </div>

          {/* 作废政策等相关资料 */}
          <div className="bg-red-50/50 rounded-xl p-4 border border-red-100/50">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <h3 className="text-[14px] font-medium text-gray-800">
                作废政策及相关资料
              </h3>
            </div>
            <div className="text-[13px] text-gray-600 leading-relaxed space-y-2">
              <p>自本公告发布之日起，以下文件或条款废止：</p>
              <ul className="list-disc list-inside text-red-500/80">
                <li>
                  《关于实施小微企业普惠性税收减免政策的通知》（财税〔2019〕13号）第一条、第二条
                </li>
              </ul>
              <div className="mt-3 pt-3 border-t border-red-100">
                <a
                  href="#"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  查看《小微企业税费优惠政策指引（2026版）》
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Content Feed */}
        <div className={`mt-10 pt-8 border-t border-gray-100 pb-24 ${isGated ? 'opacity-30 pointer-events-none filter blur-sm transition-all' : ''}`}>
          <h2 className="text-[16px] font-bold text-gray-900 mb-4">相关推荐</h2>
          <div className="space-y-4">
            {/* Related Course */}
            <div className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
              <div className="w-24 h-16 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Play className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <h4 className="text-[14px] font-medium text-gray-800 line-clamp-2 leading-snug">
                  小微企业税收优惠政策深度解读与实操
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                    课程
                  </span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>1250人学过</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Video */}
            <div className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
              <div className="w-24 h-16 rounded-lg bg-purple-50 flex items-center justify-center shrink-0 relative overflow-hidden">
                <img
                  src="https://picsum.photos/seed/tax1/200/150"
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  alt="Video"
                />
                <Video className="w-6 h-6 text-white relative z-10" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <h4 className="text-[14px] font-medium text-gray-800 line-clamp-2 leading-snug">
                  3分钟看懂：如何申报个体户个税减半
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <span className="bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded">
                    视频
                  </span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>5.2w播放</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Journal */}
            <div className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
              <div className="w-24 h-32 rounded-lg bg-orange-50 flex items-center justify-center shrink-0 relative overflow-hidden">
                <img
                  src="https://picsum.photos/seed/journal1/200/300"
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  alt="Journal"
                />
                <BookOpen className="w-6 h-6 text-white relative z-10" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h4 className="text-[14px] font-medium text-gray-800 line-clamp-2 leading-snug mb-1">
                    《财税前沿》2026年第4期：小微企业特刊
                  </h4>
                  <p className="text-[12px] text-gray-500 line-clamp-2">
                    全面解析最新税费优惠政策，助力小微企业发展。
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <span className="bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded">
                    期刊
                  </span>
                  <span>2026-04-10</span>
                </div>
              </div>
            </div>

            {/* Related Podcast */}
            <div className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
              <div className="w-16 h-16 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <Mic className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="text-[14px] font-medium text-gray-800 line-clamp-1 mb-1.5">
                  税收红利如何直达快享？
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <span className="bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded">
                    播客
                  </span>
                  <span>15:30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 px-4 py-3 pb-8 flex items-center justify-between z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-orange-500 transition-colors"
          >
            <Star
              className="w-5 h-5"
              fill={isFavorite ? "currentColor" : "none"}
              color={isFavorite ? "#f97316" : "currentColor"}
            />
            <span className="text-[10px] font-medium">收藏</span>
          </button>
          <button
            onClick={() => alert("分享功能")}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-[10px] font-medium">分享</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLeadModal(true)}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full flex items-center gap-2 shadow-md shadow-blue-500/20 active:scale-95 transition-transform"
          >
            <Headphones className="w-4.5 h-4.5" />
            <span className="text-[14px] font-bold">预约顾问</span>
          </button>
        </div>
      </div>
      
      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        onSubmit={() => setIsGated(false)}
        title="联系顾问阅读全文"
      />
    </motion.div>
  );
};
