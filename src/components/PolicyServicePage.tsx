import React, { useState } from 'react';
import { ChevronLeft, Headset, FileText, CheckCircle2, Send, Bot, User } from 'lucide-react';
import { motion } from 'motion/react';

export const PolicyServicePage = ({ onBack }: { onBack: () => void }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: '您好！我是您的专属税务顾问。请问有什么可以帮您？我们可以为您提供企业报税、政策解读、税务筹划等人工服务。' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), type: 'user', text: input }]);
    setInput('');
    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        type: 'bot', 
        text: '已收到您的咨询。我们的税务专家正在为您评估，稍后将为您提供详细的报税方案。' 
      }]);
    }, 200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed inset-0 bg-gray-50 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm relative z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">人工报税服务</h1>
        <div className="w-10"></div>
      </div>

      {/* Service Info */}
      <div className="bg-white p-5 mb-2 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-gray-900">企业代账报税</h2>
            <p className="text-[13px] text-gray-500 mt-1">资深注会团队把关，安全合规</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5 text-[12px] text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> 极速申报
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> 风险预警
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> 专属客服
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center">
          <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-1 rounded-full">今天 09:41</span>
        </div>
        
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'}`}>
              {msg.type === 'user' ? <User className="w-4 h-4" /> : <Headset className="w-4 h-4" />}
            </div>
            <div className={`max-w-[75%] p-3 rounded-2xl text-[14px] leading-relaxed ${
              msg.type === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-sm' 
                : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white p-3 border-t border-gray-100 pb-safe">
        <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1.5 pr-2 border border-gray-200 focus-within:border-blue-400 focus-within:bg-white transition-colors">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入您的问题，咨询税务专家..." 
            className="flex-1 bg-transparent border-none focus:outline-none px-3 text-[14px] text-gray-800 placeholder:text-gray-400"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:bg-gray-300 transition-colors"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
