import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Search, Bell, Megaphone, BookOpen, FileText, Share2, QrCode, Image as ImageIcon, Link as LinkIcon, Download } from 'lucide-react';

interface MessageCenterPageProps {
  onBack: () => void;
  onShare?: () => void;
  initialMessageId?: number | null;
}

export const MessageCenterPage: React.FC<MessageCenterPageProps> = ({ onBack, onShare, initialMessageId }) => {
  const [activeTab, setActiveTab] = useState<'全部' | '未读' | '已读'>('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      title: '系统通知', 
      content: '您的钻石会员已生效，快去体验专属特权吧！为了感谢您对大成方略的长期支持，我们为您额外赠送了30天的AI智库使用权。您可以直接在首页使用“AI搜”功能，获取最专业的财税咨询方案。', 
      date: '2026-05-22 05:40', 
      isRead: false, 
      type: 'system',
      attachments: [
        { type: 'image', url: 'https://picsum.photos/seed/vip/600/300' }
      ]
    },
    { 
      id: 2, 
      title: '活动提醒', 
      content: '大成方略举办2026年财税AI大赛，火热报名中！本次大赛旨在挖掘财税领域的AI创新人才。参赛者有机会获得万元奖金以及顶级事务所的内推机会。点击详情了解赛程安排与报名入口。期待您的精彩表现！', 
      date: '2026-05-21 15:30', 
      isRead: false, 
      type: 'activity',
      attachments: [
        { type: 'form' }
      ]
    },
    { 
      id: 3, 
      title: '课程更新', 
      content: '您关注的《企业所得税汇算清缴实务》已更新第3课时。本节课重点讲解了研发费用加计扣除的最新申报流程，以及金税四期背景下的合规性检查核心要点。请及时登录学习中心进行观看。', 
      date: '2026-04-02 09:15', 
      isRead: true, 
      type: 'course',
      attachments: [
        { type: 'pdf', title: '《企业所得税汇算清缴实务》大纲.pdf' }
      ]
    },
    { 
      id: 4, 
      title: '政策速递', 
      content: '国家税务总局发布最新小微企业税收优惠政策解读。针对最新年度最新的所得税减免政策进行了全方位梳理，特别强调了制造业小微企业的税收抵扣细节。建议相关企业财务负责人员尽快研读并执行。', 
      date: '2025-01-23 14:20', 
      isRead: true, 
      type: 'policy',
      attachments: [
        { type: 'qrcode', qrData: 'policy_2025' }
      ]
    },
    {
      id: 5,
      title: '专属客服',
      content: '您好，我是您的专属财税顾问。在为您提供服务的过程中，如果您有任何关于企业所得税、个人所得税或增值税的疑问，欢迎随时联系。我们将竭诚为您解答。',
      date: '2024-12-15 11:00',
      isRead: true,
      type: 'system',
      attachments: []
    }
  ]);
  const [selectedMessage, setSelectedMessage] = useState<any>(
    initialMessageId ? messages.find(m => m.id === initialMessageId) : null
  );

  React.useEffect(() => {
    if (initialMessageId) {
      const msg = messages.find(m => m.id === initialMessageId);
      if (msg) {
        setSelectedMessage(msg);
        markAsRead(msg.id);
      }
    }
  }, [initialMessageId]);

  const markAllAsRead = () => {
    setMessages(messages.map(m => ({ ...m, isRead: true })));
  };

  const markAsRead = (id: number) => {
    setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  const handleMessageClick = (msg: any) => {
    markAsRead(msg.id);
    setSelectedMessage(msg);
  };

  const filteredMessages = messages.filter(m => {
    const matchesTab = activeTab === '全部' ? true : activeTab === '未读' ? !m.isRead : m.isRead;
    const matchesSearch = m.title.includes(searchQuery) || m.content.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  const formatMessageDate = (dateStr: string) => {
    const date = new Date(dateStr.replace(/-/g, '/'));
    const now = new Date();
    
    const dateYear = date.getFullYear();
    const nowYear = now.getFullYear();
    if (dateYear !== nowYear) {
      return `${dateYear}年${date.getMonth() + 1}月${date.getDate()}日`;
    }
    
    const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth();

    if (isToday) {
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins > 0 && diffMins < 60) return `${diffMins}分钟前`;
      if (diffMins >= 60 && diffMins < 24 * 60) return `${Math.floor(diffMins / 60)}小时前`;
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} 发布`;
    }
    
    if (isYesterday) {
      return '昨天';
    }
    
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'system': return <Bell className="w-5 h-5 text-blue-500" />;
      case 'activity': return <Megaphone className="w-5 h-5 text-orange-500" />;
      case 'course': return <BookOpen className="w-5 h-5 text-emerald-500" />;
      case 'policy': return <FileText className="w-5 h-5 text-purple-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-[#F5F6F8] z-[200] flex flex-col"
    >
      {/* Header */}
      <div className="bg-white px-4 pt-14 pb-3 flex items-center justify-between shadow-sm shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h3 className="text-[17px] font-medium text-gray-900">消息中心</h3>
        <div className="w-8"></div>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-4 py-3 shrink-0">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索消息..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[36px] bg-gray-100 rounded-full px-9 text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-gray-400"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4 flex items-center justify-between border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-6">
          {['全部', '未读', '已读'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-3 text-[14px] font-medium relative transition-colors ${activeTab === tab ? 'text-blue-600' : 'text-gray-500'}`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="messageTabIndicator" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Action Bar Below Tabs */}
      <div className="px-5 py-2.5 flex justify-between items-center shrink-0">
        <span className="text-[12px] text-gray-450 font-medium">共 {filteredMessages.length} 条消息</span>
        <button 
          onClick={markAllAsRead} 
          className="text-[12px] text-blue-600 font-bold bg-white px-3 py-1.5 rounded-full shadow-[0_1px_5px_rgba(0,0,0,0.02)] border border-gray-100 active:scale-95 transition-transform"
        >
          全部已读
        </button>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {filteredMessages.length > 0 ? (
            filteredMessages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => handleMessageClick(msg)}
                className={`bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-50 cursor-pointer transition-all active:scale-[0.98] ${!msg.isRead ? 'bg-blue-50/30' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 relative">
                    {getIcon(msg.type)}
                    {!msg.isRead && (
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-[15px] font-medium truncate ${!msg.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                        {msg.title}
                      </h4>
                      <span className="text-[12px] text-gray-400 shrink-0 ml-2">{formatMessageDate(msg.date)}</span>
                    </div>
                    <p className={`text-[13px] leading-relaxed line-clamp-2 ${!msg.isRead ? 'text-gray-700' : 'text-gray-500'}`}>
                      {msg.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="pt-20 flex flex-col items-center justify-center text-gray-400">
              <Bell className="w-12 h-12 mb-3 opacity-20" />
              <p className="text-[14px]">暂无{activeTab !== '全部' ? activeTab : ''}消息</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Message Detail Overlay */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-white z-[300] flex flex-col"
          >
            {/* Header */}
            <div className="bg-white px-4 pt-14 pb-3 flex items-center shadow-sm shrink-0">
              <button 
                onClick={() => {
                  setSelectedMessage(null);
                  if (initialMessageId) onBack(); // If we came from banner, go all way back
                }} 
                className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h3 className="text-[17px] font-medium text-gray-900 ml-2">消息详情</h3>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              <h4 className="text-[26px] font-bold text-gray-900 leading-[1.4] mb-4">
                {selectedMessage.title}
              </h4>
              
              <div className="flex items-center gap-2 mb-10">
                <span className="text-[13px] text-gray-400 font-medium">
                  {formatMessageDate(selectedMessage.date)}
                </span>
              </div>
              
              <div className="text-[17px] text-gray-700 leading-[1.8] whitespace-pre-wrap mb-12 font-normal">
                {selectedMessage.content}
              </div>

              {/* Attachments */}
              {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                <div className="space-y-4 border-t border-gray-100 pt-8">
                  {selectedMessage.attachments.map((att: any, idx: number) => {
                    if (att.type === 'form') {
                      return (
                        <button key={idx} className="w-full flex items-center justify-between p-4 bg-blue-50 border border-blue-100/50 rounded-2xl active:scale-[0.98] transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-[12px] flex items-center justify-center shadow-sm text-blue-500">
                              <FileText className="w-5 h-5" />
                            </div>
                            <span className="text-[15px] font-bold text-blue-700">超级表单</span>
                          </div>
                          <ChevronLeft className="w-5 h-5 text-blue-400 rotate-180" />
                        </button>
                      );
                    }
                    if (att.type === 'image') {
                      return (
                        <div key={idx} className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                          <img src={att.url} alt="attachment" className="w-full h-auto object-cover" />
                        </div>
                      );
                    }
                    if (att.type === 'pdf') {
                      return (
                        <div key={idx} className="w-full flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl active:scale-[0.98] transition-all cursor-pointer hover:bg-gray-100/80">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 bg-white rounded-[12px] flex items-center justify-center shadow-sm text-red-500 shrink-0">
                              <Download className="w-5 h-5" />
                            </div>
                            <span className="text-[14px] font-medium text-gray-800 truncate">{att.title}</span>
                          </div>
                        </div>
                      );
                    }
                    if (att.type === 'qrcode') {
                      return (
                        <div key={idx} className="flex flex-col items-center p-8 bg-gray-50 rounded-[24px] border border-gray-100">
                           <div className="w-40 h-40 bg-white rounded-3xl p-3 shadow-sm border border-gray-50">
                             <img 
                               src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${att.qrData || 'msg'}`} 
                               alt="QR" 
                               className="w-full h-full" 
                             />
                           </div>
                           <div className="mt-4 text-[13px] text-gray-500 font-medium">
                             扫描上方二维码
                           </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
              
              <div className="h-24"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
