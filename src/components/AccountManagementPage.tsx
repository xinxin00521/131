import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, BookOpen, Ticket, Plane, Cpu, Presentation, Plus, Minus, Search, ChevronDown, ChevronUp, MoreHorizontal, X, Check, Link2Off, Copy, Users, Edit3, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface ResourceData {
  total: number;
  used: number;
}

interface SubAccount {
  id: string;
  nickname: string;
  phone: string;
  avatar: string;
  resources: Record<string, ResourceData>;
  boundCode?: string;
  codeRemark?: string;
}

interface InvitationCodeData {
  id: string;
  code: string;
  remark: string;
  benefits: string[];
  maxUsers: number;
  usedUsers: number;
  status: 'active' | 'expired' | 'disabled';
  validUntil: string;
}

interface Enterprise {
  id: string;
  name: string;
  role: string;
  members: number;
}

interface AccountManagementPageProps {
  isOpen: boolean;
  onClose: () => void;
}

const RESOURCE_TYPES = [
  { id: 'courseHours', label: '分配课时', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-500', lightBg: 'bg-blue-50' },
  { id: 'qaCount', label: '分配答疑次数', icon: Presentation, color: 'text-orange-500', bg: 'bg-orange-500', lightBg: 'bg-orange-50' },
];

export const AccountManagementPage: React.FC<AccountManagementPageProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'codes'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingCodeRemarkId, setEditingCodeRemarkId] = useState<string | null>(null);
  const [tempRemark, setTempRemark] = useState('');
  const [visibleCodes, setVisibleCodes] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const toggleCodeVisibility = (id: string) => {
    setVisibleCodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Enterprise Selection State
  const [enterprises] = useState<Enterprise[]>([
    { id: 'ent1', name: '北京大成方略科技有限公司', role: '超级管理员', members: 168 },
    { id: 'ent2', name: '上海财税服务中心', role: '系统管理员', members: 42 },
    { id: 'ent3', name: '广州财会精英文库管理部', role: '普通管理员', members: 15 }
  ]);
  const [activeEnterpriseId, setActiveEnterpriseId] = useState('ent1');

  // Batch Allocation State
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [batchResource, setBatchResource] = useState(RESOURCE_TYPES[0].id);
  const [batchAmount, setBatchAmount] = useState(1);
  const [isBatchUnlimited, setIsBatchUnlimited] = useState(true);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [editingCell, setEditingCell] = useState<{accId: string, resId: string, val: string} | null>(null);
  
  const [invitationCodes, setInvitationCodes] = useState<InvitationCodeData[]>([
    { 
      id: 'c1', 
      code: "DCFL-8888-A1", 
      remark: "设计部专用企业码", 
      benefits: ["线上课时: 20", "大成云AI: 5", "赠送: 财税基础课"],
      maxUsers: 10,
      usedUsers: 2,
      status: 'active',
      validUntil: '2026-12-31'
    },
    { 
      id: 'c2', 
      code: "DCFL-9999-B2", 
      remark: "财务部专用企业码", 
      benefits: ["线上课时: 50", "参会资格: 2", "所有线下课 8折"],
      maxUsers: 5,
      usedUsers: 1,
      status: 'expired',
      validUntil: '2023-12-31'
    },
    { 
      id: 'c3', 
      code: "DCFL-7777-C3", 
      remark: "销售部特别码", 
      benefits: ["线上课时: 10"],
      maxUsers: 20,
      usedUsers: 20,
      status: 'disabled',
      validUntil: '2025-06-30'
    },
  ]);

  const handleUpdateRemark = (id: string) => {
    setInvitationCodes(prev => prev.map(code => 
      code.id === id ? { ...code, remark: tempRemark } : code
    ));
    setEditingCodeRemarkId(null);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast("企业码已复制");
  };

  const [unbindTarget, setUnbindTarget] = useState<SubAccount | null>(null);

  const handleUnbind = (accountId: string) => {
    const acc = subAccounts.find(a => a.id === accountId);
    if (!acc) return;
    setUnbindTarget(acc);
  };

  const executeUnbind = (accountId: string) => {
    const acc = subAccounts.find(a => a.id === accountId);
    if (!acc) return;

    // Return resources to mainBalance pool
    setMainBalance(prev => {
      const newBalance = { ...prev };
      RESOURCE_TYPES.forEach(resType => {
        const subRes = acc.resources[resType.id];
        if (subRes.total !== -1) {
          newBalance[resType.id] = {
            ...newBalance[resType.id],
            allocated: Math.max(0, newBalance[resType.id].allocated - subRes.total)
          };
        }
      });
      return newBalance;
    });

    setSubAccounts(prev => prev.filter(a => a.id !== accountId));
    if (expandedId === accountId) setExpandedId(null);
  };

  // mainBalance now stores { total, allocated }
  const [mainBalance, setMainBalance] = useState<Record<string, { total: number, allocated: number }>>({
    courseHours: { total: 100, allocated: 15 },
    qaCount: { total: 50, allocated: 10 },
  });

  const [subAccounts, setSubAccounts] = useState<SubAccount[]>([
    { 
      id: '1', nickname: '张三', phone: '13812345678', avatar: 'https://picsum.photos/seed/sub1/100/100',
      boundCode: 'DCFL-8888-A1',
      codeRemark: '设计部',
      resources: {
        courseHours: { total: 10, used: 4 },
        qaCount: { total: 5, used: 1 },
      }
    },
    { 
      id: '2', nickname: '李四', phone: '13987654321', avatar: 'https://picsum.photos/seed/sub2/100/100',
      boundCode: 'DCFL-9999-B2',
      codeRemark: '财务部',
      resources: {
        courseHours: { total: 5, used: 1 },
        qaCount: { total: 5, used: 0 },
      }
    },
    { 
      id: '3', nickname: '王五', phone: '13700001111', avatar: 'https://picsum.photos/seed/sub3/100/100',
      boundCode: 'DCFL-8888-A1',
      codeRemark: '设计部',
      resources: {
        courseHours: { total: 0, used: 0 },
        qaCount: { total: 0, used: 0 },
      }
    },
  ]);

  const filteredAccounts = subAccounts.filter(acc => 
    acc.nickname.includes(searchQuery) || acc.phone.includes(searchQuery)
  );

  const handleSetAbsoluteAllocation = (accountId: string, resourceId: string, newTotal: number) => {
    const acc = subAccounts.find(a => a.id === accountId);
    if (!acc) return;
    const currentTotal = acc.resources[resourceId].total;
    if (currentTotal === -1) return;
    
    let finalTotal = Math.max(newTotal, acc.resources[resourceId].used);
    const diff = finalTotal - currentTotal;
    const pool = mainBalance[resourceId];
    
    if (diff > 0 && pool.total - pool.allocated < diff) {
       finalTotal = currentTotal + (pool.total - pool.allocated);
    }

    const finalDiff = finalTotal - currentTotal;
    if (finalDiff === 0) return;

    setMainBalance(prev => ({
      ...prev,
      [resourceId]: { ...prev[resourceId], allocated: prev[resourceId].allocated + finalDiff }
    }));

    setSubAccounts(prev => prev.map(a => {
      if (a.id === accountId) {
        return {
          ...a,
          resources: {
            ...a.resources,
            [resourceId]: {
              ...a.resources[resourceId],
              total: finalTotal
            }
          }
        };
      }
      return a;
    }));
  };

  const handleAllocate = (accountId: string, resourceId: string, amount: number) => {
    const acc = subAccounts.find(a => a.id === accountId);
    if (!acc || acc.resources[resourceId].total === -1) return;

    if (amount > 0) {
      // Allocate to sub-account
      const pool = mainBalance[resourceId];
      if (pool.total - pool.allocated < amount) return;
      
      setMainBalance(prev => ({ 
        ...prev, 
        [resourceId]: { ...prev[resourceId], allocated: prev[resourceId].allocated + amount } 
      }));
      setSubAccounts(prev => prev.map(a => {
        if (a.id === accountId) {
          return {
            ...a,
            resources: {
              ...a.resources,
              [resourceId]: {
                ...a.resources[resourceId],
                total: a.resources[resourceId].total + amount
              }
            }
          };
        }
        return a;
      }));
    } else {
      // Take back from sub-account
      const res = acc.resources[resourceId];
      if (res.total + amount < res.used) return; // Cannot take back what's already used

      setMainBalance(prev => ({ 
        ...prev, 
        [resourceId]: { ...prev[resourceId], allocated: prev[resourceId].allocated + amount } // amount is negative
      }));
      setSubAccounts(prev => prev.map(a => {
        if (a.id === accountId) {
          return {
            ...a,
            resources: {
              ...a.resources,
              [resourceId]: {
                ...a.resources[resourceId],
                total: a.resources[resourceId].total + amount
              }
            }
          };
        }
        return a;
      }));
    }
  };

  const handleSelectAll = () => {
    if (selectedAccounts.length === subAccounts.length) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts(subAccounts.map(a => a.id));
    }
  };

  const handleBatchAllocate = () => {
    if (isBatchUnlimited) {
      let freedUpAllocation = 0;
      
      setSubAccounts(prev => prev.map(acc => {
        if (selectedAccounts.includes(acc.id)) {
          const prevTotal = acc.resources[batchResource].total;
          if (prevTotal !== -1) {
            freedUpAllocation += prevTotal;
          }
          return {
            ...acc,
            resources: {
              ...acc.resources,
              [batchResource]: {
                ...acc.resources[batchResource],
                total: -1
              }
            }
          };
        }
        return acc;
      }));

      setMainBalance(prev => ({
        ...prev,
        [batchResource]: { 
          ...prev[batchResource], 
          allocated: Math.max(0, prev[batchResource].allocated - freedUpAllocation) 
        }
      }));
    } else {
      const totalNeeded = batchAmount * selectedAccounts.length;
      const pool = mainBalance[batchResource];
      const remaining = pool.total - pool.allocated;
      
      if (totalNeeded > remaining) {
        alert(`剩余可分配数量不足！需要 ${totalNeeded}，剩余 ${remaining}`);
        return;
      }
      
      setMainBalance(prev => ({
        ...prev,
        [batchResource]: { ...prev[batchResource], allocated: prev[batchResource].allocated + totalNeeded }
      }));
      
      setSubAccounts(prev => prev.map(acc => {
        if (selectedAccounts.includes(acc.id)) {
          const prevTotal = acc.resources[batchResource].total === -1 ? 0 : acc.resources[batchResource].total;
          return {
            ...acc,
            resources: {
              ...acc.resources,
              [batchResource]: {
                ...acc.resources[batchResource],
                total: prevTotal + batchAmount
              }
            }
          };
        }
        return acc;
      }));
    }
    
    setIsBatchModalOpen(false);
    setSelectedAccounts([]);
    setBatchAmount(1);
    setIsBatchUnlimited(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[2000] bg-[#F7F9FC] flex flex-col"
      >
        {/* Header - Glassmorphism */}
        <div className="pt-14 pb-3 px-4 bg-white/70 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between border-b border-gray-100/50">
          <div className="flex items-center gap-3 flex-1">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={onClose} 
              className="w-8 h-8 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </motion.button>
            <h1 className="text-[18px] font-black text-gray-900 whitespace-nowrap">企业管理</h1>
            
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

        <div className="flex-1 overflow-y-auto no-scrollbar pb-12">
          {/* Tab Switcher */}
          <div className="px-4 py-3 sticky top-0 z-30 bg-[#F7F9FC]/90 backdrop-blur-md">
            <div className="bg-gray-200/50 p-1 rounded-2xl flex items-center">
              {[
                { id: 'users' as const, label: '用户分配' },
                { id: 'codes' as const, label: '企业码管理' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 text-[14px] font-black rounded-xl transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'users' ? (
            <>
              {/* Sub-accounts Area */}
              <div className="px-4 pt-2">
                <div className="flex items-center justify-between mb-3 px-1">
                  <h2 className="text-[13px] font-black text-gray-400 uppercase tracking-widest">用户分配 ({filteredAccounts.length})</h2>
                  <button 
                    onClick={() => setIsBatchModalOpen(true)}
                    className="text-[12px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full active:scale-95 transition-transform"
                  >
                    批量分配
                  </button>
                </div>
                
                <div className="space-y-3">
                  {filteredAccounts.map((account, idx) => {
                    const summary = RESOURCE_TYPES.map(res => {
                      const data = account.resources[res.id];
                      if (data.total === -1) return `${res.label}: 不限制`;
                      return data.total > 0 ? `${res.label}: ${data.total}` : null;
                    }).filter(Boolean).join(' | ');

                    return (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + idx * 0.05, type: 'spring', bounce: 0.4 }}
                        key={account.id} 
                        className="bg-white rounded-[20px] shadow-[0_2px_12px_rgb(0,0,0,0.02)] border border-gray-50/80 overflow-hidden"
                      >
                        {/* Account Info */}
                        <div className="p-4 flex gap-3.5">
                          <div>
                            <img src={account.avatar} className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-100" alt="" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[16px] font-black text-gray-900">{account.nickname}</span>
                              <span className="text-[12px] font-bold text-gray-500 font-mono bg-gray-50 px-2 py-0.5 rounded-md">{account.phone}</span>
                            </div>
                            
                            {account.boundCode && (() => {
                              const matchedCode = invitationCodes.find(c => c.code === account.boundCode);
                              const remarkToShow = matchedCode ? matchedCode.remark : account.codeRemark;
                              return (
                                <>
                                  {remarkToShow && (
                                    <div className="text-[14px] font-bold text-gray-800 mb-2.5 truncate">
                                      {remarkToShow}
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1.5 bg-[#F4F6F9] px-2.5 py-1.5 rounded-[10px] w-fit border border-gray-100/50">
                                    <Ticket className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                    <span className="text-[13px] font-bold font-mono text-gray-800 tracking-wider">
                                      {visibleCodes.has(account.id) ? account.boundCode : `${account.boundCode.substring(0, 4)}********`}
                                    </span>
                                    <button 
                                      onClick={() => toggleCodeVisibility(account.id)}
                                      className="text-gray-400 hover:text-blue-500 active:scale-95 transition-colors p-0.5 ml-1"
                                    >
                                      {visibleCodes.has(account.id) ? <EyeOff className="w-3.5 h-3.5"/> : <Eye className="w-3.5 h-3.5" />}
                                    </button>
                                    <div className="w-[1px] h-3 bg-gray-300 mx-0.5" />
                                    <button 
                                      onClick={() => handleCopyCode(account.boundCode!)}
                                      className="text-blue-500 hover:text-blue-600 active:scale-95 transition-colors p-0.5"
                                    >
                                      <Copy className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                        
                        {/* Summary */}
                        {summary && (
                          <div className="px-4 pb-4">
                            <div className="bg-[#F8FAFC] rounded-[10px] px-3 py-2.5 flex items-center gap-2 text-[12px] font-bold text-gray-500">
                              <AlertCircle className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              <span className="truncate">{summary}</span>
                            </div>
                          </div>
                        )}

                        {/* Action Bar */}
                        <div className="flex items-center border-t border-gray-50 bg-white">
                          <button 
                            onClick={() => setExpandedId(expandedId === account.id ? null : account.id)}
                            className={`flex flex-1 justify-center items-center gap-1 py-3 text-[14px] font-bold active:bg-gray-50 transition-colors ${expandedId === account.id ? 'text-blue-600 bg-blue-50/30' : 'text-blue-600'}`}
                          >
                            管理额度
                            {expandedId === account.id ? <ChevronUp className="w-4 h-4 ml-0.5" /> : <ChevronDown className="w-4 h-4 ml-0.5" />}
                          </button>
                          <div className="w-[1px] h-4 bg-gray-100" />
                          <button 
                            onClick={() => setUnbindTarget(account)}
                            className="flex flex-1 justify-center py-3 text-[14px] font-bold text-red-500 active:bg-gray-50 transition-colors"
                          >
                            解除绑定
                          </button>
                        </div>

                        {/* Resources List (Accordion Content) */}
                        <AnimatePresence>
                          {expandedId === account.id && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-gray-50 bg-[#FAFBFC]"
                            >
                              <div className="p-4 space-y-0">
                                {/* Table Header */}
                                <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 mb-2 px-2">
                                  <div className="w-[30%]">类目</div>
                                  <div className="w-[20%] text-center">已分配</div>
                                  <div className="w-[50%] text-right">分配额度</div>
                                </div>
                                
                                {RESOURCE_TYPES.map(res => {
                                  const data = account.resources[res.id];
                                  const isUnlimited = data.total === -1;
                                  const pool = mainBalance[res.id];
                                  const remainingInPool = pool.total - pool.allocated;
                                  
                                  const isEditing = editingCell?.accId === account.id && editingCell?.resId === res.id;
                                  const displayVal = isEditing ? editingCell.val : data.total.toString();
                                  
                                  return (
                                    <div key={res.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 px-2">
                                      <div className="w-[30%] text-[13px] font-bold text-gray-800">{res.label}</div>
                                      
                                      <div className="w-[20%] text-center">
                                        <span className="text-[15px] font-black text-gray-900">{data.used}</span>
                                      </div>
                                      
                                      <div className="w-[50%] flex items-center justify-end">
                                        {isUnlimited ? (
                                          <span className="text-[13px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">不限制</span>
                                        ) : (
                                          <div className="flex items-center gap-1 bg-gray-50/80 rounded-lg p-1 border border-gray-100">
                                            <motion.button 
                                              whileTap={{ scale: 0.9 }}
                                              onClick={() => handleAllocate(account.id, res.id, -1)}
                                              disabled={data.total <= data.used}
                                              className="w-7 h-7 rounded-md bg-white border border-gray-100 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                                            >
                                              <Minus className="w-3.5 h-3.5" />
                                            </motion.button>
                                            <input 
                                              type="number"
                                              value={displayVal}
                                              onChange={(e) => setEditingCell({ accId: account.id, resId: res.id, val: e.target.value })}
                                              onBlur={() => {
                                                if (isEditing) {
                                                  const val = parseInt(editingCell.val || '0', 10);
                                                  handleSetAbsoluteAllocation(account.id, res.id, isNaN(val) ? 0 : val);
                                                  setEditingCell(null);
                                                }
                                              }}
                                              className="w-10 text-center text-[14px] font-black text-blue-600 bg-transparent outline-none m-0 p-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                              style={{ MozAppearance: 'textfield' }}
                                            />
                                            <motion.button 
                                              whileTap={{ scale: 0.9 }}
                                              onClick={() => handleAllocate(account.id, res.id, 1)}
                                              disabled={remainingInPool <= 0}
                                              className="w-7 h-7 rounded-md bg-white border border-gray-100 flex items-center justify-center text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                                            >
                                              <Plus className="w-3.5 h-3.5" />
                                            </motion.button>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}

                                {/* Actions inside Accordion */}
                                <div className="mt-4 pt-3 flex justify-end">
                                  <motion.button 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => { showToast('额度已更新'); setExpandedId(null); }}
                                    className="text-[13px] font-bold text-white bg-blue-600 px-5 py-2.5 rounded-xl flex items-center gap-2 active:scale-95 transition-all shadow-sm"
                                  >
                                    保存配置
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                  
                  {filteredAccounts.length === 0 && (
                    <div className="text-center py-10 text-gray-400 text-[14px]">
                      没有找到匹配的用户
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="px-4 pt-1 pb-6">
              <h2 className="text-[13px] font-black text-gray-400 mb-3 uppercase tracking-widest pl-1">企业码列表 ({invitationCodes.length})</h2>
              <div className="space-y-4">
                {invitationCodes.map(item => {
                  const isVisible = visibleCodes.has(item.id);
                  const maskedCode = `${item.code.substring(0, 4)}********`;
                  
                  return (
                    <div key={item.id} className="bg-white rounded-[20px] shadow-[0_2px_12px_rgb(0,0,0,0.03)] border border-gray-50 overflow-hidden relative">
                      
                      {/* Title Bar (Own Line) */}
                      <div className="p-4 pb-0 flex items-start justify-between">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 cursor-pointer group w-fit" onClick={() => {
                            setEditingCodeRemarkId(item.id);
                            setTempRemark(item.remark);
                          }}>
                            <h3 className="text-[14px] font-black text-gray-900 group-hover:text-blue-600 transition-colors">{item.remark || '未命名企业码'}</h3>
                            <Edit3 className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                          </div>
                          {item.validUntil && (
                            <span className="text-[12px] font-bold text-gray-400">有效期至: {item.validUntil}</span>
                          )}
                        </div>
                        
                        {item.status !== 'active' && (
                          <div className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            item.status === 'expired' ? 'bg-orange-50 text-orange-600 border border-orange-100/50' : 
                            'bg-gray-100/80 text-gray-500 border border-gray-200/50'
                          }`}>
                            {item.status === 'expired' ? '已过期' : '已停用'}
                          </div>
                        )}
                      </div>

                      <div className="p-4 pt-3 mt-1">
                        {/* Users Usage */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[13px] font-bold text-gray-500">绑定用户</span>
                          <div className="flex items-center gap-1.5 text-[12px] font-bold text-gray-600 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                            <Users className="w-3.5 h-3.5 text-blue-500" />
                            <span><span className="text-gray-900 font-black">{item.usedUsers}</span> / {item.maxUsers}</span>
                          </div>
                        </div>

                        {/* Code Display Area */}
                        <div className="bg-[#F8FAFC] border border-gray-100 rounded-[14px] p-2.5 flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 overflow-hidden mr-2">
                            <div className="w-8 h-8 shrink-0 rounded-[10px] bg-white flex items-center justify-center text-blue-500 shadow-sm border border-gray-50">
                              <Ticket className="w-4 h-4" />
                            </div>
                            <div className="text-[14px] font-mono font-bold tracking-wider text-gray-800 truncate">
                               {isVisible ? item.code : maskedCode}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-0.5 text-gray-400 shrink-0">
                            <button 
                              onClick={() => toggleCodeVisibility(item.id)}
                              className="w-8 h-8 flex items-center justify-center hover:text-gray-700 rounded-full hover:bg-gray-200/50 transition-colors active:scale-95"
                            >
                              {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
                            <button
                              onClick={() => handleCopyCode(item.code)}
                              className="w-8 h-8 flex items-center justify-center text-blue-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors active:scale-95"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Benefits Area */}
                        <div>
                          <div className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest pl-0.5">权益内容配置</div>
                          <div className="flex flex-wrap gap-2">
                             {item.benefits.map((benefit, i) => (
                               <span key={i} className="inline-flex items-center px-2.5 py-1.5 bg-gray-50 border border-gray-100 text-gray-700 text-[12px] font-bold rounded-lg transition-colors hover:bg-gray-100">
                                 {benefit}
                               </span>
                             ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Batch Allocation Modal */}
        <AnimatePresence>
          {isBatchModalOpen && (
            <div className="fixed inset-0 z-[3000] flex items-end justify-center">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => {
                  setIsBatchModalOpen(false);
                  setIsBatchUnlimited(true);
                }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                className="relative w-full bg-white rounded-t-[32px] p-6 pb-10 shadow-2xl flex flex-col max-h-[85vh]"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[18px] font-black text-gray-900">批量分配</h3>
                  <button onClick={() => {
                    setIsBatchModalOpen(false);
                    setIsBatchUnlimited(true);
                  }} className="p-2 bg-gray-50 rounded-full text-gray-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
                  {/* Resource Selection */}
                  <div>
                    <label className="text-[13px] font-bold text-gray-700 mb-3 block">选择分配类目</label>
                    <div className="flex flex-wrap gap-2">
                      {RESOURCE_TYPES.map(res => (
                        <button
                          key={res.id}
                          onClick={() => setBatchResource(res.id)}
                          className={`px-4 py-2 rounded-full text-[13px] font-bold transition-colors ${
                            batchResource === res.id 
                              ? 'bg-gray-900 text-white' 
                              : 'bg-gray-50 text-gray-600 border border-gray-100'
                          }`}
                        >
                          {res.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 text-[12px] text-gray-500 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/50">
                      当前剩余可分配：<span className="font-black text-blue-600 text-[14px]">{mainBalance[batchResource].total - mainBalance[batchResource].allocated}</span>
                    </div>
                  </div>
                  
                  {/* Amount */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-[13px] font-bold text-gray-700">每人分配数量</label>
                      <button 
                        onClick={() => setIsBatchUnlimited(!isBatchUnlimited)}
                        className={`text-[12px] font-bold px-3 py-1 rounded-full transition-colors ${isBatchUnlimited ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                      >
                        不限制
                      </button>
                    </div>
                    {!isBatchUnlimited ? (
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setBatchAmount(Math.max(1, batchAmount - 1))}
                          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 active:scale-95"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="text-[24px] font-black text-gray-900 w-16 text-center">{batchAmount}</span>
                        <button 
                          onClick={() => setBatchAmount(batchAmount + 1)}
                          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 active:scale-95"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="h-10 flex items-center text-[14px] font-bold text-gray-500 bg-gray-50 rounded-xl px-4 border border-gray-100">
                        已选择不限制额度
                      </div>
                    )}
                  </div>
                  
                  {/* Account Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-[13px] font-bold text-gray-700">选择子账号</label>
                      <button onClick={handleSelectAll} className="text-[12px] font-bold text-blue-600">
                        {selectedAccounts.length === subAccounts.length ? '取消全选' : '全选'}
                      </button>
                    </div>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto no-scrollbar border border-gray-100 rounded-[16px] p-2">
                      {subAccounts.map(acc => (
                        <div 
                          key={acc.id}
                          onClick={() => {
                            setSelectedAccounts(prev => 
                              prev.includes(acc.id) ? prev.filter(id => id !== acc.id) : [...prev, acc.id]
                            )
                          }}
                          className="flex items-center justify-between p-3 rounded-[12px] hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img src={acc.avatar} className="w-8 h-8 rounded-full object-cover" alt="" />
                            <span className="text-[14px] font-bold text-gray-900">{acc.nickname}</span>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedAccounts.includes(acc.id) ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                          }`}>
                            {selectedAccounts.includes(acc.id) && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <button
                    onClick={handleBatchAllocate}
                    disabled={selectedAccounts.length === 0}
                    className="w-full py-4 bg-gray-900 text-white rounded-full font-bold text-[16px] disabled:opacity-50 active:scale-95 transition-transform"
                  >
                    确认分配 {isBatchUnlimited ? '(不限制)' : `(共 ${batchAmount * selectedAccounts.length} 个)`}
                  </button>
                </div>
              </motion.div>
            </div>
          )}

        {/* Edit Remark Modal */}
        <AnimatePresence>
          {editingCodeRemarkId && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:absolute md:px-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEditingCodeRemarkId(null)}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-[320px] bg-white rounded-[24px] p-6 shadow-2xl z-10"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[17px] font-black text-gray-900">企业码标题</h3>
                  <button onClick={() => setEditingCodeRemarkId(null)} className="p-1 text-gray-400 hover:text-gray-600 active:scale-95 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <input 
                  className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-[14px] px-4 py-3.5 text-[15px] font-bold outline-none mb-6 transition-colors placeholder:text-gray-400 placeholder:font-normal"
                  value={tempRemark}
                  onChange={(e) => setTempRemark(e.target.value)}
                  placeholder="请输入标题"
                  autoFocus
                  onFocus={(e) => e.target.select()}
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditingCodeRemarkId(null)}
                    className="flex-1 py-3 justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl font-bold text-[14px] transition-colors active:scale-95"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => {
                       handleUpdateRemark(editingCodeRemarkId);
                       setEditingCodeRemarkId(null);
                    }}
                    className="flex-1 py-3 justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-[14px] transition-colors active:scale-95 shadow-lg shadow-blue-500/20"
                  >
                    保存修改
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

          {unbindTarget && (
            <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setUnbindTarget(null)}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl z-10 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4 text-red-500">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-[17px] font-black text-gray-900 mb-2">确认解除绑定？</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                  确定要解除子账号“<span className="font-bold text-gray-950">{unbindTarget.nickname}</span>”的绑定吗？<br />
                  解除后，该用户已分配的资源额度将退回资产池。
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setUnbindTarget(null)}
                    className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl font-bold text-[14px] transition-colors active:scale-95"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => {
                      executeUnbind(unbindTarget.id);
                      setUnbindTarget(null);
                    }}
                    className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-[14px] transition-colors active:scale-95 shadow-lg shadow-red-500/10"
                  >
                    确认解除
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[5000] bg-gray-900/90 backdrop-blur text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-[13px] font-medium tracking-wide">{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
