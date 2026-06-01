import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check, X } from 'lucide-react';

interface OnboardingWizardProps {
  onComplete: (data: any) => void;
  onSkip: () => void;
}

const stepsConfig = [
  {
    id: 'role',
    title: '您的角色',
    subtitle: '请选择您的身份与职业角色',
    required: true,
    type: 'single',
    options: [
      '企业主/老板',
      '财务总监/CFO',
      '会计/财务专员',
      '个体户/自由职业者',
      '在校学生/老师',
      '其他'
    ]
  },
  {
    id: 'industry',
    title: '所属行业',
    subtitle: '请选择您所在的行业，我们将为您推荐行业定制内容',
    required: false,
    type: 'single',
    options: [
      '农林牧渔/采矿/能源',
      '制造业',
      '建筑业',
      '批发和零售业',
      '交通运输/仓储/邮政',
      '住宿和餐饮业',
      '信息技术/软件/科研',
      '金融/房地产/租赁/商务服务',
      '教育/卫生/文化/体育',
      '其他'
    ]
  },
  {
    id: 'needs',
    title: '财税需求',
    subtitle: '请选择您当前最关心的财税需求（可多选）',
    required: false,
    type: 'multiple',
    options: [
      '考证备考',
      '职业晋升',
      '日常工作答疑',
      '纳税稽查实操',
      '政策法规速递',
      '团队管理与风控',
      '经营分析与决策支持',
      '个体户/小微企业合规'
    ]
  }
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({
    role: '',
    industry: '',
    needs: []
  });

  const handleSingleSelect = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTimeout(() => {
      handleNext();
    }, 200);
  };

  const handleMultiSelect = (field: string, value: string) => {
    const current = formData[field] || [];
    if (current.includes(value)) {
      setFormData(prev => ({ ...prev, [field]: current.filter((v: string) => v !== value) }));
    } else {
      setFormData(prev => ({ ...prev, [field]: [...current, value] }));
    }
  };

  const currentConfig = stepsConfig[currentStep];

  const handleNext = () => {
    if (currentStep < stepsConfig.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isCurrentStepValid = () => {
    if (currentConfig.required && currentConfig.type === 'single') {
      return formData[currentConfig.id] !== '';
    }
    if (currentConfig.required && currentConfig.type === 'multiple') {
      return formData[currentConfig.id] && formData[currentConfig.id].length > 0;
    }
    return true;
  };

  const progressPercentage = ((currentStep + 1) / stepsConfig.length) * 100;

  return (
    <div className="absolute inset-0 z-[300] bg-[#F8F9FB] flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-14 pb-4 flex items-center justify-between shrink-0 shadow-sm relative">
        <button 
          onClick={handlePrev}
          className={`w-8 h-8 flex items-center justify-center ${currentStep > 0 ? 'text-gray-900' : 'invisible'}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-100">
          <motion.div 
            className="h-full bg-blue-600"
            initial={{ width: `${(currentStep / stepsConfig.length) * 100}%` }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <button 
          onClick={onSkip}
          className="text-[14px] text-gray-400 font-medium px-2"
        >
          跳过
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto px-5 py-8 no-scrollbar relative flex flex-col">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-8">
              <div className="flex justify-between items-baseline mb-2">
                <h2 className="text-[24px] font-black text-gray-900">{currentConfig.title}</h2>
                <span className="text-[14px] font-bold text-gray-300">{currentStep + 1} / {stepsConfig.length}</span>
              </div>
              <p className="text-[14px] text-gray-500">{currentConfig.subtitle}</p>
            </div>

            {currentConfig.id === 'role' && (
              <div className="grid grid-cols-2 gap-3 pb-8">
                {currentConfig.options.map(option => (
                  <button
                    key={option}
                    onClick={() => handleSingleSelect('role', option)}
                    className={`py-4 px-2 rounded-xl text-[14px] font-medium transition-all border ${
                      formData.role === option
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100'
                        : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentConfig.id === 'industry' && (
              <div className="space-y-3 pb-8">
                {currentConfig.options.map(option => (
                  <button
                    key={option}
                    onClick={() => handleSingleSelect('industry', option)}
                    className={`w-full py-4 px-4 rounded-xl text-[15px] font-medium text-left transition-all border flex items-center justify-between ${
                      formData.industry === option
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{option}</span>
                    {formData.industry === option && <Check className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            )}

            {currentConfig.id === 'needs' && (
              <div className="grid grid-cols-2 gap-3 pb-8">
                {currentConfig.options.map(option => {
                  const selected = formData.needs.includes(option);
                  return (
                    <button
                      key={option}
                      onClick={() => handleMultiSelect('needs', option)}
                      className={`py-4 px-2 rounded-xl text-[13px] font-medium transition-all border flex flex-col items-center justify-center gap-2 ${
                        selected
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100'
                          : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-center w-full px-1">{option}</span>
                      {selected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      {currentStep === stepsConfig.length - 1 && (
        <div className="p-5 bg-white border-t border-gray-100 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
          <button
            onClick={handleNext}
            disabled={!isCurrentStepValid()}
            className={`w-full h-[52px] rounded-2xl font-bold text-[16px] shadow-lg transition-all ${
              isCurrentStepValid()
                ? 'bg-blue-600 text-white shadow-blue-200 active:scale-[0.98]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            完成并开启体验
          </button>
        </div>
      )}
    </div>
  );
};

