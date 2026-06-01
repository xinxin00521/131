import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Search, Ticket, Clock } from 'lucide-react';

interface ExchangeRecord {
  id: string;
  name: string;
  exchangeTime: string;
  validUntil: string;
  status: 'active' | 'expired' | 'disabled';
  benefits: string[];
  remark: string;
}

export const ExchangeCenterPage = ({ onClose }: { onClose: () => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRecord, setActiveRecord] = useState<ExchangeRecord | null>(null);
  const [isBindModalOpen, setIsBindModalOpen] = useState(false);
  const [newCode, setNewCode] = useState('');

  const records: ExchangeRecord[] = [
    {
      id: '1',
      name: '税务筹划高级课程兑换码',
      exchangeTime: '2025-10-12 14:30',
      validUntil: '2026-10-12 23:59',
      status: 'active',
      benefits: ['100课时'],
      remark: '双十一特惠活动获取'
    },
    {
      id: '2',
      name: '财税基础入门系列课兑换码',
      exchangeTime: '2023-01-05 09:15',
      validUntil: '2024-01-05 23:59',
      status: 'expired',
      benefits: ['10课时', '1次专属答疑'],
      remark: '新用户注册赠送'
    },
    {
      id: '3',
      name: '企业内部专用福利课兑换码',
      exchangeTime: '2024-06-20 16:00',
      validUntil: '2025-06-20 23:59',
      status: 'disabled',
      benefits: ['50课时'],
      remark: '审计部门专属'
    }
  ];

  const filteredRecords = records.filter(record => 
    record.name.includes(searchQuery) || record.remark.includes(searchQuery)
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[2000] bg-[#F7F9FC] flex flex-col"
      >
        {/* Header */}
        <div className="pt-14 pb-3 px-4 bg-white/70 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between border-b border-gray-100/50">
          <div className="flex items-center gap-3 flex-1">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={onClose} 
              className="w-8 h-8 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </motion.button>
            <h1 className="text-[18px] font-black text-gray-900 whitespace-nowrap">兑换中心</h1>
            
            {/* Search */}
            <div className="flex-1 relative max-w-[160px]">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="搜索" 
                className="w-full bg-gray-100/80 rounded-full pl-8 pr-3 py-1.5 text-[13px] outline-none focus:bg-gray-200 transition-colors" 
              />
            </div>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4 pt-4">
          {/* Overview */}
          <div className="bg-white rounded-[20px] p-4 shadow-[0_2px_12px_rgb(0,0,0,0.03)] border border-gray-50 flex flex-col gap-2 mb-4">
            <div className="text-[14px] font-black text-gray-900 border-b border-gray-50 pb-2">兑换权益</div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[12px] font-bold text-gray-500">消耗/课时</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-[16px] font-black text-blue-600">12</span>
                <span className="text-[12px] font-bold text-gray-400">/160</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
              <motion.div 
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(12 / 160) * 100}%` }}
                transition={{ type: 'spring', bounce: 0 }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredRecords.map((record, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={record.id}
                onClick={() => setActiveRecord(record)}
                className="bg-white rounded-[20px] p-4 shadow-[0_2px_12px_rgb(0,0,0,0.03)] border border-gray-50 overflow-hidden relative cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-[10px] bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                      <Ticket className="w-4 h-4" />
                    </div>
                    <h3 className="text-[15px] font-black text-gray-900 leading-tight">{record.name}</h3>
                  </div>
                  {record.status !== 'active' && (
                    <div className={`px-2 py-0.5 rounded text-[11px] font-bold shrink-0 ml-2 ${
                      record.status === 'expired' ? 'bg-orange-50 text-orange-600 border border-orange-100/50' : 
                      'bg-gray-100 text-gray-500 border border-gray-200/50'
                    }`}>
                      {record.status === 'expired' ? '已过期' : '已停用'}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[12px] text-gray-500">
                     <span className="font-bold">兑换时间:</span>
                     <span>{record.exchangeTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-gray-500">
                     <span className="font-bold">有效期至:</span>
                     <span className="font-mono">{record.validUntil}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 z-30">
          <button 
            onClick={() => setIsBindModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Ticket className="w-5 h-5" />
            绑定兑换码
          </button>
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {activeRecord && (
            <div className="fixed inset-0 z-[3000] flex flex-col justify-end">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveRecord(null)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative bg-[#F7F9FC] rounded-t-[32px] overflow-hidden flex flex-col max-h-[85vh]"
              >
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3" />
                <div className="px-6 pb-4">
                  <h2 className="text-[20px] font-black text-gray-900 mb-1">兑换码详情</h2>
                </div>
                
                <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-4">
                  <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-50">
                    <div className="flex items-start justify-between mb-4">
                       <h3 className="text-[16px] font-black text-gray-900">{activeRecord.name}</h3>
                       {activeRecord.status !== 'active' && (
                        <div className={`px-2.5 py-1 rounded-md text-[12px] font-bold shrink-0 ml-2 ${
                          activeRecord.status === 'expired' ? 'bg-orange-50 text-orange-600 border border-orange-100/50' : 
                          'bg-gray-100 text-gray-500 border border-gray-200/50'
                        }`}>
                          {activeRecord.status === 'expired' ? '已过期' : '已停用'}
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-[13px] font-bold text-gray-500">包含权益</span>
                        <span className="text-[13px] font-medium text-gray-800">{activeRecord.benefits.join('、')}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-[13px] font-bold text-gray-500">兑换时间</span>
                        <span className="text-[13px] font-medium text-gray-800">{activeRecord.exchangeTime}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-[13px] font-bold text-gray-500">有效期至</span>
                        <span className="text-[13px] font-mono font-medium text-gray-800">{activeRecord.validUntil}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[13px] font-bold text-gray-500">备注</span>
                        <span className="text-[13px] font-medium text-gray-800">{activeRecord.remark || '无'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Bind Modal */}
        <AnimatePresence>
          {isBindModalOpen && (
            <div className="fixed inset-0 z-[4000] flex items-center justify-center px-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsBindModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-[320px] bg-white rounded-[24px] p-6 shadow-xl"
              >
                <h3 className="text-[17px] font-black text-gray-900 text-center mb-6">绑定兑换码</h3>
                
                <input 
                  type="text"
                  placeholder="请输入您的兑换码"
                  className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] font-mono font-bold text-center focus:border-blue-500 outline-none mb-6 placeholder:font-normal uppercase"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  autoFocus
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                       setIsBindModalOpen(false);
                       setNewCode('');
                    }}
                    className="flex-1 py-3 rounded-xl bg-gray-50 text-gray-600 font-bold text-[14px] active:scale-95 transition-transform"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => {
                      if (!newCode.trim()) return;
                      alert("绑定成功");
                      setIsBindModalOpen(false);
                      setNewCode('');
                    }}
                    className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-[14px] shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
                  >
                    确认绑定
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
