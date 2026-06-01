import React from 'react';
import { ChevronLeft, CheckCircle2, Circle, CheckSquare, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, Assessment } from './types';

interface AssessmentTestingProps {
  assessment: Assessment;
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  userAnswers: number[];
  onOptionSelect: (questionId: string, optionIndex: number, type: 'single' | 'multiple' | 'boolean') => void;
  onNext: () => void;
  onBack: () => void;
}

export const AssessmentTesting: React.FC<AssessmentTestingProps> = ({
  assessment,
  question,
  currentIndex,
  totalQuestions,
  userAnswers,
  onOptionSelect,
  onNext,
  onBack
}) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const isAnswered = userAnswers.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen bg-[#F8F9FA] flex flex-col"
    >
      <div className="pt-12 pb-4 px-4 flex items-center justify-between border-b border-gray-100/50 bg-white/80 backdrop-blur-xl sticky top-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors flex-shrink-0">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <div className="flex-1 mx-2 text-center overflow-hidden">
          <div className="text-[17px] font-bold text-gray-900 truncate">
            {assessment.title}
          </div>
        </div>
        <div className="text-[15px] font-black text-gray-800 tracking-wide tabular-nums flex-shrink-0">
          <span className="text-[#8B5CF6]">{currentIndex + 1}</span> 
          <span className="text-gray-400 mx-1">/</span> 
          <span className="text-gray-400 font-medium">{totalQuestions}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-gray-100 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-r-full"
          initial={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <div className="flex-1 px-6 py-8 overflow-y-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="inline-block px-3 py-1 bg-purple-50 text-[#8B5CF6] text-[12px] font-bold rounded-lg mb-6 shadow-sm border border-purple-100/50">
              {question.type === 'single' ? '单选题' : question.type === 'multiple' ? '多选题' : '判断题'}
            </div>
            <h2 className="text-[20px] font-bold text-gray-900 leading-relaxed mb-10 drop-shadow-sm">
              {question.question}
            </h2>

            <div className="space-y-4">
              {question.options.map((option, index) => {
                const isSelected = userAnswers.includes(index);
                return (
                  <motion.button
                    key={index}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onOptionSelect(question.id, index, question.type)}
                    className={`w-full p-5 rounded-2xl border-2 text-left flex items-start transition-all duration-300 ${
                      isSelected 
                        ? 'border-[#8B5CF6] bg-purple-50/50 shadow-[0_8px_20px_rgba(139,92,246,0.1)]' 
                        : 'border-transparent bg-white hover:border-gray-200 shadow-[0_4px_15px_rgba(0,0,0,0.03)]'
                    }`}
                  >
                    <div className="mt-0.5 mr-4 flex-shrink-0 text-[#8B5CF6]">
                      {question.type === 'single' ? (
                        isSelected ? <CheckCircle2 size={22} className="fill-[#8B5CF6] text-white drop-shadow-sm" /> : <Circle size={22} className="text-gray-300" />
                      ) : (
                        isSelected ? <CheckSquare size={22} className="fill-[#8B5CF6] text-white drop-shadow-sm" /> : <Square size={22} className="text-gray-300" />
                      )}
                    </div>
                    <span className={`text-[16px] leading-relaxed ${isSelected ? 'text-[#8B5CF6] font-bold' : 'text-gray-700 font-medium'}`}>
                      {option}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-6 bg-white/80 backdrop-blur-xl border-t border-gray-100/50 pb-10 sticky bottom-0 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
        <button 
          onClick={onNext}
          disabled={!isAnswered}
          className={`w-full py-4 rounded-2xl font-bold text-[17px] transition-all duration-300 flex items-center justify-center ${
            isAnswered 
              ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-[0_8px_25px_rgba(139,92,246,0.35)] active:scale-[0.98] hover:shadow-[0_10px_30px_rgba(139,92,246,0.45)]' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentIndex < totalQuestions - 1 ? '下一题' : (assessment.type === 'evaluation' ? '提交评估' : '提交测试')}
        </button>
      </div>
    </motion.div>
  );
};
