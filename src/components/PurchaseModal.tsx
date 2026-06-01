import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, Coins, Crown, CheckCircle2, Clock } from 'lucide-react';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemType: 'course' | 'journal' | 'live' | 'event' | 'expert';
  itemTitle: string;
  price: number;
  points: number;
  onSuccess?: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  itemType,
  itemTitle,
  price,
  points,
  onSuccess
}) => {
  const [purchaseMethod, setPurchaseMethod] = useState<'money' | 'points' | 'hours' | 'vip'>('money');
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePurchase = () => {
    // Simulate purchase process
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      if (onSuccess) onSuccess();
    }, 2000);
  };

  const typeLabels = {
    course: '课程',
    journal: '期刊',
    live: '直播',
    event: '活动',
    expert: '专家咨询'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-[300] flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full bg-white rounded-t-3xl flex flex-col"
            style={{ maxHeight: '85vh' }}
          >
            {isSuccess ? (
              <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">购买成功</h3>
                <p className="text-sm text-gray-500 text-center">
                  您已成功获取该{typeLabels[itemType]}，快去体验吧！
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
                  <h3 className="text-lg font-bold text-gray-900">获取{typeLabels[itemType]}</h3>
                  <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-5 overflow-y-auto flex-1">
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">{typeLabels[itemType]}名称</h4>
                    <p className="text-base font-bold text-gray-900 line-clamp-2">{itemTitle}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">选择获取方式</h4>
                    
                    {/* Money Purchase */}
                    <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${purchaseMethod === 'money' ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${purchaseMethod === 'money' ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">单独购买</div>
                          <div className="text-xs text-gray-500">支持微信/支付宝</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-red-500">¥{price}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseMethod === 'money' ? 'border-blue-500' : 'border-gray-300'}`}>
                          {purchaseMethod === 'money' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                        </div>
                      </div>
                      <input type="radio" name="purchaseMethod" value="money" checked={purchaseMethod === 'money'} onChange={() => setPurchaseMethod('money')} className="hidden" />
                    </label>

                    {/* Points Redemption */}
                    <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${purchaseMethod === 'points' ? 'border-orange-500 bg-orange-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${purchaseMethod === 'points' ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-400'}`}>
                          <Coins className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">积分兑换</div>
                          <div className="text-xs text-gray-500">当前可用: 1250 积分</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-orange-500">{points} 积分</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseMethod === 'points' ? 'border-orange-500' : 'border-gray-300'}`}>
                          {purchaseMethod === 'points' && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />}
                        </div>
                      </div>
                      <input type="radio" name="purchaseMethod" value="points" checked={purchaseMethod === 'points'} onChange={() => setPurchaseMethod('points')} className="hidden" />
                    </label>

                    {/* Hours Redemption */}
                    <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${purchaseMethod === 'hours' ? 'border-purple-500 bg-purple-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${purchaseMethod === 'hours' ? 'bg-purple-100 text-purple-600' : 'bg-gray-50 text-gray-400'}`}>
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">课时兑换</div>
                          <div className="text-xs text-gray-500">当前可用: 12 课时</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-purple-500">1 课时</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseMethod === 'hours' ? 'border-purple-500' : 'border-gray-300'}`}>
                          {purchaseMethod === 'hours' && <div className="w-2.5 h-2.5 bg-purple-500 rounded-full" />}
                        </div>
                      </div>
                      <input type="radio" name="purchaseMethod" value="hours" checked={purchaseMethod === 'hours'} onChange={() => setPurchaseMethod('hours')} className="hidden" />
                    </label>

                    {/* VIP Upgrade */}
                    <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${purchaseMethod === 'vip' ? 'border-amber-500 bg-amber-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${purchaseMethod === 'vip' ? 'bg-amber-100 text-amber-600' : 'bg-gray-50 text-gray-400'}`}>
                          <Crown className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">升级会员</div>
                          <div className="text-xs text-amber-600 font-medium">全站内容免费看</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-amber-500">¥299/年</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseMethod === 'vip' ? 'border-amber-500' : 'border-gray-300'}`}>
                          {purchaseMethod === 'vip' && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />}
                        </div>
                      </div>
                      <input type="radio" name="purchaseMethod" value="vip" checked={purchaseMethod === 'vip'} onChange={() => setPurchaseMethod('vip')} className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="p-5 border-t border-gray-100 pb-safe shrink-0">
                  <button 
                    onClick={handlePurchase}
                    className={`w-full py-3.5 rounded-xl text-white font-bold text-base shadow-lg transition-transform active:scale-95 ${
                      purchaseMethod === 'money' ? 'bg-blue-600 shadow-blue-200' :
                      purchaseMethod === 'points' ? 'bg-orange-500 shadow-orange-200' :
                      purchaseMethod === 'hours' ? 'bg-purple-600 shadow-purple-200' :
                      'bg-gradient-to-r from-amber-400 to-amber-600 shadow-amber-200'
                    }`}
                  >
                    {purchaseMethod === 'money' ? `确认支付 ¥${price}` :
                     purchaseMethod === 'points' ? `确认兑换 (${points}积分)` :
                     purchaseMethod === 'hours' ? `确认兑换 (1课时)` :
                     '立即开通会员'}
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
