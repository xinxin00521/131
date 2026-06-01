import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Ticket, Trash2, Building2, Clock, Check, Copy, User, XCircle, Eye, EyeOff } from 'lucide-react';

export interface BoundCode {
  id: string;
  code: string;
  companyName: string;
  bindTime: string;
  role?: '管理员' | '普通用户' | '用户';
  status?: '正常' | '已过期' | '已失效' | '已停用';
  remark?: string;
}

export interface BindCodePageProps {
  onBack: () => void;
  onEnterBenefits: (companyName: string) => void;
  boundCompanies: BoundCode[];
  onBindCode: (code: BoundCode) => void;
  onUnbindCode: (id: string) => void;
  onSwitchCompany?: (companyName: string) => void;
}

export const BindCodePage: React.FC<BindCodePageProps> = ({ 
  onBack, 
  onEnterBenefits,
  boundCompanies,
  onBindCode,
  onUnbindCode,
  onSwitchCompany
}) => {
  const [newCode, setNewCode] = useState('');
  const [bindSuccessData, setBindSuccessData] = useState<BoundCode | null>(null);
  const [bindFailData, setBindFailData] = useState<{ companyName: string; reason: string } | null>(null);
  const [unbindConfirmId, setUnbindConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [visibleCodes, setVisibleCodes] = useState<Set<string>>(new Set());

  const toggleCodeVisibility = (id: string) => {
    setVisibleCodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBind = () => {
    if (!newCode.trim()) return;
    const companies = ['大成财税北京分公司', '大成财税上海分公司', '大成财税广州分公司', '大成财税联合事务所', '大成财税代理记账有限公司'];
    const selectedCompany = companies[Math.floor(Math.random() * companies.length)];
    
    if (newCode.trim() === '123') {
      const reasons = [
        '企业码的用户数量已达上限，请联系企业负责人或销售顾问咨询。',
        '企业码已过期。',
        '企业码已被停用，请联系企业负责人或销售顾问咨询。'
      ];
      setBindFailData({
        companyName: selectedCompany,
        reason: reasons[Math.floor(Math.random() * reasons.length)]
      });
      return;
    }

    const newBoundCode: BoundCode = {
      id: Date.now().toString(),
      code: newCode.trim(),
      companyName: selectedCompany,
      bindTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
      role: Math.random() > 0.5 ? '管理员' : '普通用户',
      status: '正常'
    };
    setBindSuccessData(newBoundCode);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast('企业码已复制');
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const confirmBindSuccess = () => {
    if (bindSuccessData) {
      onBindCode(bindSuccessData);
      setBindSuccessData(null);
      setNewCode('');
    }
  };

  const handleUnbind = (id: string) => {
    setUnbindConfirmId(id);
  };

  const confirmUnbind = () => {
    if (unbindConfirmId) {
      onUnbindCode(unbindConfirmId);
      setUnbindConfirmId(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed inset-0 z-[60] bg-[#F7F8FA] flex flex-col"
    >
      <div className="bg-white px-4 pt-14 pb-3 flex items-center justify-between sticky top-0 z-10 shadow-sm relative">
        <button onClick={onBack} className="p-2 -ml-2 active:bg-gray-50 rounded-full transition-colors relative z-10">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <span className="font-bold text-[17px] text-gray-900 absolute left-0 right-0 text-center pointer-events-none">绑定企业</span>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/50 mb-8">
          <h3 className="text-[16px] font-black text-gray-900 mb-2">绑定企业</h3>
          <p className="text-[13px] text-gray-500 mb-5">绑定企业会员码、可享企业的专属权益。</p>
          
          <div className="space-y-4">
            <div className="relative w-full">
              <Ticket className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={newCode}
                onChange={e => setNewCode(e.target.value)}
                placeholder="请输入企业会员码"
                className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl py-3.5 pl-11 pr-4 text-[15px] font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all font-mono tracking-wider"
              />
            </div>
            <button 
              onClick={handleBind}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl active:scale-95 transition-transform flex items-center justify-center text-[15px] shadow-sm"
            >
              绑定
            </button>
          </div>
        </div>

        <div>
          <p className="text-[13px] text-gray-500 pl-1 mb-4">当前手机号13012345678、已{boundCompanies.length}个绑定企业</p>
          
          {boundCompanies.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-[24px] border border-gray-100/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex flex-col items-center justify-center mx-auto mb-3">
                <Ticket className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-[14px] font-medium text-gray-400">暂无绑定的企业</p>
            </div>
          ) : (
            <div className="space-y-4">
              {boundCompanies.map(item => {
                const isVisible = visibleCodes.has(item.id);
                const maskedCode = `${item.code.substring(0, 4)}********`;

                return (
                <div key={item.id} className="bg-white rounded-[24px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/50 relative flex flex-col">
                  {/* Status Banner */}
                  {(item.status === '已过期' || item.status === '已停用') && (
                    <div className="absolute right-0 top-0 bg-gray-200 text-gray-600 text-[11px] font-bold px-3 py-1 pb-1.5 rounded-bl-lg z-10 shadow-sm">
                      {item.status}
                    </div>
                  )}
                  
                  {/* Header part */}
                  <div className="p-5 pb-4 border-b border-gray-50 flex items-start gap-3">
                    <div className="w-10 h-10 aspect-square rounded-[14px] bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/50 shadow-[inset_0_2px_4px_rgba(37,99,235,0.05)]">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="flex-1 mt-0.5">
                      <h3 className={`text-[15px] font-bold leading-snug line-clamp-2 ${item.status === '正常' ? 'text-gray-900' : 'text-gray-400'}`}>
                        {item.companyName}
                      </h3>
                    </div>
                  </div>

                  {/* Body part (Info grid) */}
                  <div className="px-5 py-4 bg-gray-50/50 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-gray-500">我的身份</span>
                      <span className="font-bold text-gray-800">{item.role === '用户' ? '普通用户' : (item.role || '普通用户')}</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-gray-500">企业码</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium text-gray-800 tracking-wider">
                          {isVisible ? item.code : maskedCode}
                        </span>
                        <button 
                          onClick={() => toggleCodeVisibility(item.id)}
                          className="text-gray-400 hover:text-gray-600 active:scale-95 transition-colors p-1"
                        >
                          {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-gray-500">绑定时间</span>
                      <span className="text-gray-800">{item.bindTime}</span>
                    </div>
                    {item.remark && (
                      <div className="flex items-start justify-between text-[13px]">
                        <span className="text-gray-500 shrink-0 mt-0.5">备注</span>
                        <span className="text-gray-800 text-right text-balance leading-snug max-w-[200px]">{item.remark}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions part */}
                  <div className="flex items-center justify-between px-2 py-3 bg-white">
                    <button 
                      onClick={() => handleCopy(item.code)}
                      className="flex flex-1 items-center justify-center gap-1.5 py-1.5 text-[13px] font-bold transition-colors active:scale-95 text-gray-600 hover:text-blue-600"
                    >
                      <Copy className="w-4 h-4" />
                      复制企业码
                    </button>
                    <div className="w-[1px] h-4 bg-gray-200"></div>
                    <button 
                      onClick={() => handleUnbind(item.id)}
                      className="flex flex-1 items-center justify-center gap-1.5 py-1.5 text-[13px] font-bold text-red-500 hover:text-red-600 transition-colors active:scale-95"
                    >
                      <Trash2 className="w-4 h-4" />
                      解绑企业
                    </button>
                  </div>
                </div>
              )})}
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-gray-900/90 backdrop-blur text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-[13px] font-medium tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {unbindConfirmId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[24px] p-6 w-full max-w-[300px] shadow-xl"
            >
              <h4 className="text-[17px] font-bold text-gray-900 mb-2">解绑企业</h4>
              <p className="text-[14px] text-gray-500 mb-6">确定要解除绑定该企业吗？解绑后将无法使用相关权益。</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setUnbindConfirmId(null)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl active:scale-95 transition-transform"
                >
                  取消
                </button>
                <button 
                  onClick={confirmUnbind}
                  className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl active:scale-95 transition-transform"
                >
                  确定解绑
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {bindSuccessData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[24px] p-6 w-full max-w-[300px] shadow-xl"
            >
              <div className="flex flex-col items-center">
                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                   <Check className="w-6 h-6 text-green-600" />
                 </div>
                 <h4 className="text-[17px] font-bold text-gray-900 mb-1">绑定成功</h4>
                 <p className="text-[14px] text-gray-500 mb-4">{bindSuccessData.companyName}</p>
                 
                 <div className="bg-gray-50 w-full rounded-xl p-3 mb-6 flex justify-between items-center">
                    <span className="text-[14px] text-gray-500">您的身份</span>
                    <span className="text-[14px] font-bold text-gray-900">{bindSuccessData.role}</span>
                 </div>
                 
                 <div className="w-full space-y-3">
                   <button 
                     onClick={() => {
                        if (onSwitchCompany && bindSuccessData) {
                          onSwitchCompany(bindSuccessData.companyName);
                        }
                        confirmBindSuccess();
                        onBack();
                     }} 
                     className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl active:scale-95 transition-transform"
                   >
                     切换到该企业
                   </button>
                   <button 
                     onClick={confirmBindSuccess}
                     className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl active:scale-95 transition-transform"
                   >
                     暂不切换
                   </button>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {bindFailData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[24px] p-6 w-full max-w-[300px] shadow-xl"
            >
              <div className="flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                   <XCircle className="w-6 h-6 text-red-600" />
                 </div>
                 <h4 className="text-[17px] font-bold text-gray-900 mb-1">绑定失败</h4>
                 <p className="text-[14px] text-gray-500 mb-3">{bindFailData.companyName}</p>
                 
                 <div className="bg-red-50/50 w-full rounded-xl p-3 mb-6">
                    <p className="text-[13px] text-red-600 leading-relaxed text-left">{bindFailData.reason}</p>
                 </div>
                 
                 <div className="w-full">
                   <button 
                     onClick={() => setBindFailData(null)}
                     className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl active:scale-95 transition-transform"
                   >
                     我知道了
                   </button>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
