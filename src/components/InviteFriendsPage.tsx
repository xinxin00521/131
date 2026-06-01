import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, QrCode, Share2, Download } from 'lucide-react';

interface InvitedUser {
  id: string;
  name: string;
  avatar: string;
  date: string;
  status: '已注册';
}

const MOCK_INVITED_USERS: InvitedUser[] = [
  { id: '1', name: '王梦', avatar: 'https://picsum.photos/seed/u1/100/100', date: '2024-04-20', status: '已注册' },
  { id: '2', name: '李晓华', avatar: 'https://picsum.photos/seed/u2/100/100', date: '2024-04-18', status: '已注册' },
  { id: '3', name: '陈财税', avatar: 'https://picsum.photos/seed/u3/100/100', date: '2024-04-10', status: '已注册' },
  { id: '4', name: '张会计', avatar: 'https://picsum.photos/seed/u4/100/100', date: '2024-04-05', status: '已注册' },
];

export const InviteFriendsPage: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'qrcode' | 'users'>('qrcode');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ x: '100%' }}
           animate={{ x: 0 }}
           exit={{ x: '100%' }}
           transition={{ type: 'spring', damping: 25, stiffness: 200 }}
           className="fixed inset-0 z-[200] flex flex-col bg-[#F5F6F8]"
        >
          {/* Header */}
          <div className="bg-white px-4 pt-14 pb-3 flex items-center justify-between shrink-0 shadow-sm sticky top-0 z-20">
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center -ml-2 active:scale-95">
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
            <h1 className="text-[17px] font-bold text-gray-900">邀请好友</h1>
            <div className="w-8"></div>
          </div>

          {/* Tabs */}
          <div className="bg-white flex shadow-sm rounded-b-2xl mb-4">
             <button 
                onClick={() => setActiveTab('qrcode')}
                className={`flex-1 py-4 text-[15px] font-medium transition-colors relative ${activeTab === 'qrcode' ? 'text-blue-600' : 'text-gray-500'}`}
             >
                我的二维码
                {activeTab === 'qrcode' && (
                  <motion.div layoutId="invitetab" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-t-full" />
                )}
             </button>
             <button 
                onClick={() => setActiveTab('users')}
                className={`flex-1 py-4 text-[15px] font-medium transition-colors relative ${activeTab === 'users' ? 'text-blue-600' : 'text-gray-500'}`}
             >
                我邀请的用户
                {activeTab === 'users' && (
                  <motion.div layoutId="invitetab" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-t-full" />
                )}
             </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
            {activeTab === 'qrcode' ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-4 flex flex-col items-center"
              >
                <div className="bg-white w-full max-w-[320px] rounded-[24px] p-8 shadow-sm flex flex-col items-center relative overflow-hidden">
                   {/* Decorative elements */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0"></div>
                   
                   <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-white shadow-md z-10">
                     <img src="https://picsum.photos/seed/myavatar/200/200" alt="avatar" className="w-full h-full object-cover" />
                   </div>
                   <h2 className="text-[18px] font-bold text-gray-900 mb-1 z-10">这是你的专属邀请码</h2>
                   <p className="text-[13px] text-gray-500 mb-8 z-10">扫描二维码，邀请好友加入大成财税</p>

                   <div className="w-[200px] h-[200px] bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-8 relative z-10 p-2">
                     {/* Mock QR Code */}
                     <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center p-3 relative">
                       <span className="absolute inset-2 border-[10px] border-dashed border-white opacity-20 transform -rotate-3"></span>
                       <QrCode className="w-24 h-24 text-white opacity-80" strokeWidth={1} />
                     </div>
                   </div>

                   <button className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 active:scale-95 transition-transform z-10 text-[15px]">
                     <Share2 className="w-4 h-4" />
                     分享给微信好友
                   </button>
                   <button className="w-full py-3 mt-3 text-blue-700 bg-blue-50/80 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform z-10 text-[14px]">
                     <Download className="w-4 h-4" />
                     保存邀请海报
                   </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4"
              >
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-10">
                  <div className="px-4 py-4 border-b border-gray-50 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <span className="text-[16px] font-bold text-gray-900">已注册用户</span>
                       <span className="bg-blue-50 text-blue-600 text-[12px] font-bold px-2.5 py-0.5 rounded-full">
                         共 {MOCK_INVITED_USERS.length} 人
                       </span>
                     </div>
                  </div>
                  <div className="w-full">
                    {MOCK_INVITED_USERS.map((user, idx) => (
                      <div key={user.id} className={`p-4 flex items-center justify-between ${idx !== MOCK_INVITED_USERS.length - 1 ? 'border-b border-gray-50' : ''}`}>
                         <div className="flex items-center gap-3">
                           <img src={user.avatar} className="w-10 h-10 rounded-full object-cover bg-gray-100 border border-gray-100" alt="" />
                           <div>
                             <div className="text-[15px] font-bold text-gray-900 mb-0.5">{user.name}</div>
                             <div className="text-[11px] text-gray-400">注册时间: {user.date}</div>
                           </div>
                         </div>
                         <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-medium text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded pl-4 relative before:content-[''] before:absolute before:w-1 text-center before:h-1 before:bg-blue-600 before:rounded-full before:left-1.5 before:top-1/2 before:-translate-y-1/2">
                              {user.status}
                            </span>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
