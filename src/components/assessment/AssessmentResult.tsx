import React, { useState } from 'react';
import { ChevronLeft, Share2, FileText, AlertCircle, PlayCircle, Bot, HeadphonesIcon, BookOpen, X, Sparkles, Video, Headphones, ChevronRight, Star, UserPlus, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, Assessment } from './types';
import { AssessmentShareModal } from './AssessmentDetail';
import { LeadCaptureModal } from '../LeadCaptureModal';

interface AssessmentResultProps {
  assessment: Assessment;
  score: number;
  questions: Question[];
  userAnswers: Record<string, number[]>;
  isPaid: boolean;
  onPay: () => void;
  onBackToList: () => void;
  onCourseClick?: (courseId: string) => void;
  hideSalesUI?: boolean;
}

export const AssessmentResult: React.FC<AssessmentResultProps> = ({
  assessment,
  score,
  questions,
  userAnswers,
  isPaid,
  onPay,
  onBackToList,
  onCourseClick,
  hideSalesUI = false
}) => {
    const isCourseTest = assessment.category === '课程测试';
    const [showShareModal, setShowShareModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeModal, setActiveModal] = useState<'ai' | 'expert' | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);

  const showLockedContent = !assessment.isFree && !isPaid;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2000);
  };

  const handleShareAction = (action: string) => {
    setShowShareModal(false);
    showToast(`已${action}`);
  };
  const isEvaluation = assessment.type === 'evaluation';
  let evaluation = '';
  let suggestion = null;

  if (isEvaluation) {
    if (score >= 40) {
      evaluation = '全能型财税专家：您在合规与策略间取得了极佳平衡。';
      suggestion = {
        title: '职业建议：财务总监 / 税务合伙人',
        courses: [
          { id: 'ai-a1', title: '高级税务筹划实务', cover: 'https://picsum.photos/seed/course1/400/250' },
          { id: 'ai-a2', title: '跨国企业转让定价策略', cover: 'https://picsum.photos/seed/course2/400/250' },
          { id: 'ai-a3', title: 'CFO战略思维课', cover: 'https://picsum.photos/seed/live2/400/250' }
        ]
      };
    } else if (score >= 20) {
      evaluation = '专业型财税骨干：业务功底扎实，建议加强战略与前瞻性学习。';
      suggestion = {
        title: '职业建议：税务经理 / 资深审计',
        courses: [
          { id: 'ai-a1', title: '金税四期深度解析', cover: 'https://picsum.photos/seed/course1/400/250' },
          { id: 'ai-a2', title: '企业内控与风险管理', cover: 'https://picsum.photos/seed/course2/400/250' },
          { id: 'ai-a3', title: '数字化财务转型实践', cover: 'https://picsum.photos/seed/live2/400/250' }
        ]
      };
    } else {
      evaluation = '成长型财税新人：处于知识积累阶段，建议从基础合规入手。';
      suggestion = {
        title: '职业建议：税务会计 / 审计助理',
        courses: [
          { id: 'ai-a1', title: '零基础学会计申报', cover: 'https://picsum.photos/seed/course1/400/250' },
          { id: 'ai-a2', title: '发票合规管理入门', cover: 'https://picsum.photos/seed/course2/400/250' },
          { id: 'ai-a3', title: '最新税改政策专题班', cover: 'https://picsum.photos/seed/live2/400/250' }
        ]
      };
    }
  } else {
    if (score >= 90) evaluation = '优秀！您对该领域的知识掌握非常扎实。';
    else if (score >= 60) evaluation = '良好。基本掌握核心知识，部分细节仍需巩固。';
    else evaluation = '需努力。建议重新学习相关政策法规。';
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
      className="min-h-screen bg-[#F8F9FA] flex flex-col"
    >
      <div className="pt-12 pb-4 px-6 flex items-center justify-between bg-white/80 backdrop-blur-xl sticky top-0 z-30 border-b border-gray-100/50">
        <button onClick={onBackToList} className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-[18px] font-black text-gray-900 tracking-wide">{isEvaluation ? '评估报告' : '测试报告'}</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto pb-28 relative z-10">
        {/* Score Card - Always Visible */}
        <div className="bg-white px-8 pt-10 pb-12 flex flex-col items-center justify-center border-b border-gray-100/50 shadow-[0_10px_30px_rgba(0,0,0,0.02)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-50/50 to-transparent pointer-events-none" />
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className={`w-40 h-40 rounded-full border-[10px] border-purple-50 flex items-center justify-center mb-6 relative shadow-[0_8px_30px_rgba(139,92,246,0.15)] bg-white`}
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <motion.circle 
                cx="50" cy="50" r="45" 
                fill="none" stroke="url(#score-gradient)" strokeWidth="10" 
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (Math.min(score, 100) / 100) * 283 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#6D28D9" />
                </linearGradient>
              </defs>
            </svg>
            <div className="text-center relative z-10">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] drop-shadow-sm"
              >
                {score}
              </motion.span>
              <span className="text-sm font-bold text-gray-400 ml-1">分</span>
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="text-[20px] font-black text-gray-900 mb-2 drop-shadow-sm"
          >
            {isEvaluation ? '评估完成' : '测试完成'}
          </motion.h2>
          
          {!isEvaluation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.4 }}
              className="px-4 py-1.5 bg-purple-50 rounded-full mb-4 border border-purple-100 flex items-center gap-1.5"
            >
              <span className="text-[12px] font-bold text-gray-400">答对题数</span>
              <span className="text-[14px] font-black text-[#8B5CF6]">
                {questions.filter(q => {
                  const uAns = userAnswers[q.id] || [];
                  return JSON.stringify(uAns) === JSON.stringify(q.answer);
                }).length} / {questions.length}
              </span>
            </motion.div>
          )}

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.4 }}
            className="text-[15px] text-gray-500 text-center px-6 font-medium leading-relaxed"
          >
            {evaluation}
          </motion.p>
        </div>

        {/* Locked Content Area */}
        <div className="relative">
          {showLockedContent && (
            <div className="absolute inset-0 z-[40] bg-white/40 backdrop-blur-md flex flex-col items-center pt-20 px-10">
              <h3 className="text-xl font-black text-gray-900 mb-2">解锁完整评估报告</h3>
              <p className="text-[14px] text-gray-500 text-center mb-10 leading-relaxed font-medium">联系顾问查看报告、获取专家建议及定制课程推荐</p>
              <button 
                onClick={() => setShowLeadModal(true)}
                className="w-full max-w-[280px] py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-black text-[17px] shadow-lg shadow-blue-200 active:scale-95 transition-all mb-4 flex items-center justify-center gap-2"
              >
                联系顾问查看报告
              </button>
            </div>
          )}

          <div className={showLockedContent ? "pointer-events-none select-none max-h-[400px] overflow-hidden" : ""}>
            {/* Evaluation Suggestions */}
            {isEvaluation && suggestion && (
              <div className="p-6">
                <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-orange-100 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-[17px] font-bold text-gray-900">{suggestion.title}</div>
                  </div>
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-6">
                    基于您的评估得分，我们为您制定了以下专项提升路径。坚持学习，您将在专业领域取得更大突破。
                  </p>
                  
                  <div className="space-y-4">
                    <div className="text-[13px] font-bold text-gray-400 mb-1">推荐学习</div>
                    {suggestion.courses.map((course: any, idx: number) => (
                      <div 
                        key={idx} 
                        onClick={() => onCourseClick?.(course.id)}
                        className="flex gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-white hover:shadow-lg hover:shadow-orange-100/50 transition-all cursor-pointer group"
                      >
                        <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 shadow-sm">
                          <img src={course.cover} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center min-w-0">
                          <h4 className="text-[14px] font-bold text-gray-800 group-hover:text-orange-600 transition-colors truncate mb-1">
                            {course.title}
                          </h4>
                        </div>
                        <div className="flex items-center">
                          <ChevronRight size={18} className="text-gray-300 group-hover:text-orange-400 transform group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Answer Analysis */}
            {!isEvaluation && (
              <div className="p-6">
                <h3 className="text-[18px] font-black text-gray-900 mb-6 flex items-center drop-shadow-sm">
                  错题解析
                </h3>
                
                <div className="space-y-6">
                  {questions.filter(q => {
                    const uAns = userAnswers[q.id] || [];
                    return JSON.stringify(uAns) !== JSON.stringify(q.answer);
                  }).map((q, idx) => {
                    const uAns = userAnswers[q.id] || [];
                    const originalIndex = questions.findIndex(item => item.id === q.id);
                    
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        key={q.id} 
                        className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-gray-50/50"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[14px] font-black text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">第 {originalIndex + 1} 题</span>
                        </div>
                        <p className="text-[16px] font-bold text-gray-900 mb-5 leading-relaxed drop-shadow-sm">{q.question}</p>
                        
                        {q.answer && (
                          <div className="mb-6 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                            <div className="flex flex-col gap-4">
                              <div className="flex items-start">
                                <span className="text-[13px] font-bold text-gray-400 w-20 shrink-0 mt-0.5">您的答案</span>
                                <div className="text-[14px] text-red-500 font-bold leading-relaxed flex-1">
                                  {uAns.length > 0 
                                    ? uAns.map(idx => `${String.fromCharCode(65 + idx)}. ${q.options[idx]}`).join(' / ') 
                                    : '未作答'}
                                </div>
                              </div>
                              <div className="h-px bg-gray-200/50 w-full" />
                              <div className="flex items-start">
                                <span className="text-[13px] font-bold text-gray-400 w-20 shrink-0 mt-0.5">正确答案</span>
                                <div className="text-[14px] text-emerald-600 font-bold leading-relaxed flex-1">
                                  {q.answer.map(idx => `${String.fromCharCode(65 + idx)}. ${q.options[idx]}`).join(' / ')}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="bg-gradient-to-br from-purple-50/80 to-purple-50/30 rounded-2xl p-5 border border-purple-100/50 mb-4">
                          <div className="flex items-center text-[#8B5CF6] text-[14px] font-black mb-3 drop-shadow-sm">
                            <AlertCircle size={16} className="mr-1.5" /> 解析
                          </div>
                          <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
                            {q.explanation}
                          </p>
                        </div>

                        {/* Recommended Course for this question */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center text-gray-400 text-[12px] font-bold mb-3">
                            <Sparkles size={12} className="mr-1" /> 推荐学习
                          </div>
                          <div 
                            onClick={() => onCourseClick?.('ai-a1')}
                            className="flex gap-3 bg-gray-50 p-2.5 rounded-2xl border border-gray-100 hover:border-orange-200 transition-all cursor-pointer group"
                          >
                            <div className="w-20 h-12 rounded-lg overflow-hidden shrink-0 shadow-sm">
                              <img src={`https://picsum.photos/seed/qcourse${q.id}/200/120`} alt="课程封面" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex-1 flex flex-col justify-center min-w-0">
                              <h4 className="text-[13px] font-bold text-gray-700 group-hover:text-orange-600 transition-colors truncate mb-0.5">
                                {assessment.category.includes('风险') ? '企业合规与风险管理实务' : '2024财税政策深度解析'}
                              </h4>
                            </div>
                            <div className="flex items-center">
                              <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-400 transition-colors" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {!hideSalesUI && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-gray-100/50 pb-10 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex items-center gap-4">
          <div className="px-2">
            <button 
              onClick={() => {
                setIsFavorited(!isFavorited);
                showToast(isFavorited ? '已取消收藏' : '已收藏报告');
              }}
              className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
            >
              <Star className={`w-5 h-5 ${isFavorited ? 'text-yellow-500 fill-yellow-500' : 'text-gray-500'}`} />
              <span className="text-[11px] text-gray-500 font-medium">收藏</span>
            </button>
          </div>

          <button 
            onClick={() => setShowShareModal(true)}
            className="flex-1 py-3.5 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-xl font-bold text-[16px] shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <UserPlus size={18} />
            邀请好友一起测
          </button>
        </div>
      )}

      <AnimatePresence>
        {showShareModal && (
          <AssessmentShareModal 
            assessment={assessment} 
            onClose={() => setShowShareModal(false)} 
            onAction={handleShareAction} 
          />
        )}

        <LeadCaptureModal 
          isOpen={showLeadModal}
          onClose={() => setShowLeadModal(false)}
          title="联系顾问查看报告"
        />

        {/* AI & Expert Modal */}
        {activeModal && activeQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full sm:w-[400px] sm:rounded-3xl rounded-t-3xl max-h-[80vh] flex flex-col overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  {activeModal === 'ai' ? (
                    <>
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <Sparkles size={16} />
                      </div>
                      <span className="font-bold text-gray-900 text-[16px]">AI 智能解读</span>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <HeadphonesIcon size={16} />
                      </div>
                      <span className="font-bold text-gray-900 text-[16px]">专家在线解答</span>
                    </>
                  )}
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="p-2 bg-gray-50 rounded-full text-gray-500 active:scale-95 transition-transform"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="text-[13px] font-bold text-gray-400 mb-2">当前题目</div>
                  <div className="text-[14px] text-gray-800 font-medium leading-relaxed">
                    {activeQuestion.question}
                  </div>
                </div>

                {activeModal === 'ai' ? (
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
                        <Bot size={16} />
                      </div>
                      <div className="bg-indigo-50 rounded-2xl rounded-tl-none p-4 text-[14px] text-indigo-900 leading-relaxed">
                        <p className="mb-2">您好！我是您的专属AI财税助手。关于这道题，我们可以从以下几个维度来深入理解：</p>
                        <p className="mb-2 font-bold">核心考点：</p>
                        <p className="mb-2">{activeQuestion.relatedKnowledge?.[0] || '相关政策法规'}</p>
                        <p className="mb-2 font-bold">深度剖析：</p>
                        <p>{activeQuestion.explanation}</p>
                        <p className="mt-3 text-indigo-600/80 text-[12px]">以上内容由AI生成，仅供参考。</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-indigo-100">
                      <p className="mb-3 font-bold text-[13px] text-indigo-900 flex items-center gap-1.5">
                        <Sparkles size={14} /> 为您推荐相关学习资源：
                      </p>
                      <div className="space-y-2">
                        {/* Course */}
                        <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-indigo-50 cursor-pointer hover:border-indigo-200 transition-colors">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-md bg-orange-50 text-orange-500 flex items-center justify-center">
                              <BookOpen size={16} />
                            </div>
                            <div>
                              <div className="text-[13px] font-bold text-gray-800">企业所得税汇算清缴精讲班</div>
                              <div className="text-[11px] text-gray-500">系统课程 · 12课时</div>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-400" />
                        </div>
                        {/* Video */}
                        <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-indigo-50 cursor-pointer hover:border-indigo-200 transition-colors">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center">
                              <Video size={16} />
                            </div>
                            <div>
                              <div className="text-[13px] font-bold text-gray-800">广告费税前扣除实务解析</div>
                              <div className="text-[11px] text-gray-500">视频微课 · 15分钟</div>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-400" />
                        </div>
                        {/* Podcast */}
                        <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-indigo-50 cursor-pointer hover:border-indigo-200 transition-colors">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-md bg-purple-50 text-purple-500 flex items-center justify-center">
                              <Headphones size={16} />
                            </div>
                            <div>
                              <div className="text-[13px] font-bold text-gray-800">财税早班车：最新税收优惠政策解读</div>
                              <div className="text-[11px] text-gray-500">音频播客 · 8分钟</div>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 relative">
                        <HeadphonesIcon size={32} className="text-blue-500" />
                        <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>
                      <h3 className="text-[18px] font-bold text-gray-900 mb-2">连线资深财税专家</h3>
                      <p className="text-[14px] text-gray-500 mb-6 max-w-[240px]">
                        我们的专家团队已准备就绪，将为您提供一对一的深度解答和实务指导。
                      </p>
                      <button 
                        onClick={() => {
                          setToastMessage('正在为您接通专家...');
                          setActiveModal(null);
                        }}
                        className="w-full max-w-[200px] py-3.5 bg-blue-600 text-white rounded-xl font-bold text-[15px] active:scale-[0.98] transition-transform shadow-lg shadow-blue-600/20"
                      >
                        立即连线
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 z-[400] bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-lg"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
