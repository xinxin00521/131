import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Search, Plus, Minus, CheckCircle, Circle, Heart, Share2 } from 'lucide-react';
import { Product } from './MallPage';

export interface CartItem extends Product {
  quantity: number;
  selected: boolean;
}

interface ShoppingCartPageProps {
  cartItems: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onRemoveItems: (ids: string[]) => void;
  onCheckout: (items: CartItem[]) => void;
  onProductClick: (product: CartItem) => void;
  onShareProduct?: (product: Product) => void;
}

export const ShoppingCartPage: React.FC<ShoppingCartPageProps> = ({
  cartItems,
  onBack,
  onUpdateQuantity,
  onToggleSelect,
  onToggleSelectAll,
  onRemoveItems,
  onCheckout,
  onProductClick,
  onShareProduct
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedItems = cartItems.filter(item => item.selected);
  
  const filteredCartItems = cartItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed inset-0 z-[60] bg-[#F7F8FA] flex flex-col"
    >
      {/* Header */}
      <div className="bg-white px-4 pt-14 flex items-center justify-between sticky top-0 z-10 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 active:bg-gray-50 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <div className="text-[17px] font-medium pb-2">心愿单 ({cartItems.length})</div>
        <div className="w-10"></div>
      </div>

      {/* Search */}
      <div className="bg-white px-4 py-2 border-b border-gray-50 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative z-10">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="搜索心愿单" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-[14px] w-full"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-32 overflow-x-hidden">
        {filteredCartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-[15px] font-medium text-gray-500 mb-2">{cartItems.length === 0 ? '心愿单空空如也' : '没有搜到商品'}</p>
            {cartItems.length === 0 && (
              <button onClick={onBack} className="mt-6 px-6 py-2 border border-gray-300 rounded-full text-[14px] text-gray-600 active:bg-gray-50">
                去逛逛
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCartItems.map(item => (
              <div key={item.id} className="relative rounded-[20px] bg-red-500 overflow-hidden shadow-sm">
                {/* Background Delete Button */}
                <div 
                  className="absolute right-0 top-0 bottom-0 w-20 flex items-center justify-center text-white font-bold cursor-pointer"
                  onClick={() => onRemoveItems([item.id])}
                >
                  删除
                </div>
                
                {/* Foreground Card */}
                <motion.div 
                  drag={isEditing ? false : "x"}
                  dragConstraints={{ left: -75, right: 0 }}
                  className="bg-white rounded-[20px] p-3 shadow-[0_2px_12px_rgb(0,0,0,0.04)] border border-gray-100/50 flex gap-3.5 group w-full h-full relative cursor-pointer"
                  onClick={() => isEditing ? onToggleSelect(item.id) : onProductClick(item)}
                >
                  {isEditing && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleSelect(item.id); }}
                      className="mt-8 shrink-0"
                    >
                      {item.selected ? (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300" />
                      )}
                    </button>
                  )}
                  
                  {/* Product Image */}
                  <div className="w-[76px] h-[76px] rounded-[10px] bg-gray-50 flex-shrink-0 relative overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/${item.id}/200/200`} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col pt-1 min-w-0">
                    <h3 className="text-[14px] font-bold text-gray-900 leading-[1.4] line-clamp-2 mb-1">
                      {item.name}
                    </h3>
                    
                    {/* Pricing Details */}
                    <div className="flex items-baseline gap-2 mb-2">
                      {item.price && item.price !== '面议' ? (
                        <>
                          <span className="text-[15px] font-black text-[#FF5E3A] leading-none">{item.price}</span>
                          <span className="text-[11px] text-gray-400 line-through leading-none">
                            ¥{Math.ceil((parseInt(item.price.replace(/[^\d]/g, ''), 10) * 1.35) / 10) * 10}
                          </span>
                        </>
                      ) : (
                        <span className="text-[15px] font-black text-[#FF5E3A] leading-none">{item.price || '面议'}</span>
                      )}
                    </div>

                    <div className="flex-1" />

                     {/* Quick Actions */}
                     <div className="flex items-center justify-end gap-3 shrink-0">
                       <button 
                         onClick={(e) => { 
                           e.stopPropagation(); 
                           onRemoveItems([item.id]); 
                         }}
                         className="w-7 h-7 rounded-full flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-rose-500 active:scale-95 transition-all shadow-sm border border-rose-100/50"
                       >
                         <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                       </button>
                     </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      {cartItems.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 pb-8 flex items-center justify-between z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          {isEditing ? (
            <>
              <div className="flex items-center gap-3">
                <button 
                  onClick={onToggleSelectAll}
                  className="flex items-center gap-1.5 text-[14px] text-gray-600"
                >
                  {cartItems.every(i => i.selected) ? (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                  全选
                </button>

                <button 
                  onClick={() => {
                    if (confirm('确定要清空心愿单吗？')) {
                      onRemoveItems(cartItems.map(i => i.id));
                      setIsEditing(false);
                    }
                  }}
                  className="text-[14px] text-gray-500 font-medium px-2 active:scale-95 transition-transform"
                >
                  清空
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => selectedItems.length > 0 && onRemoveItems(selectedItems.map(i => i.id))}
                  disabled={selectedItems.length === 0}
                  className={`px-6 py-2.5 rounded-full text-[14px] font-bold transition-all ${
                    selectedItems.length > 0 
                      ? 'bg-red-500 text-white shadow-md shadow-red-200 active:scale-95' 
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  删除
                </button>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="bg-blue-600 px-6 py-2.5 text-white rounded-full font-bold text-[14px] active:scale-95 transition-transform"
                >
                  完成
                </button>
              </div>
            </>
          ) : (
            <>
              <div /> {/* Spacer push to right */}
              <button 
                onClick={() => setIsEditing(true)} 
                className="bg-white border border-gray-300 px-6 py-2.5 text-gray-700 rounded-full font-bold text-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] active:bg-gray-50 active:scale-95 transition-all"
              >
                管理
              </button>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};
