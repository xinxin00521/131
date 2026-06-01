import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Search, Heart, ShoppingCart, Star, TrendingUp, Award, BookOpen, Briefcase, Globe, Shield, CheckCircle, Share2, Plus, List } from 'lucide-react';
import { ProductDetailPage } from './ProductDetailPage';
import { ShoppingCartPage, CartItem } from './ShoppingCartPage';
import { ProductShareModal } from './ProductShareModal';

export interface Product {
  id: string;
  name: string;
  price?: string;
  tags?: string[];
  icon?: React.ReactNode;
  description?: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  products: Product[];
}

const CATEGORIES: Category[] = [
  {
    id: 'membership',
    name: '会员产品',
    icon: <Star className="w-5 h-5" />,
    products: [
      { id: 'mall-prod-m1', name: '会计知识大查练兵项目', tags: ['实战'], description: '全面提升会计实操能力', price: '¥999' },
      { id: 'mall-prod-m2', name: '大成税效顾问', tags: ['专家'], description: '专属税务顾问服务', price: '¥2999' },
      { id: 'mall-prod-m3', name: '税收风险管理系统', tags: ['SaaS'], description: '企业税务风险智能排查', price: '¥4999' },
    ]
  },
  {
    id: 'saas',
    name: '大成云SaaS',
    icon: <TrendingUp className="w-5 h-5" />,
    products: [
      { id: 'mall-prod-s1', name: '财务官综合训练', tags: ['CFO', '管理'], description: '全方位提升财务官管理视角', price: '¥3999' },
      { id: 'mall-prod-s2', name: '评估专家库', tags: ['智库', '资源'], description: '海量行业专家资源对接', price: '¥1999' },
    ]
  },
  {
    id: 'cert',
    name: '证书',
    icon: <Award className="w-5 h-5" />,
    products: [
      { id: 'mall-prod-c1', name: '国际注册会计师ICPA', tags: ['国际认证'], price: '¥8800' },
      { id: 'mall-prod-c2', name: 'ESG分析师', tags: ['前沿'], price: '¥5600' },
      { id: 'mall-prod-c3', name: '国际会计师AAIA', tags: ['国际认证'], price: '¥9800' },
      { id: 'mall-prod-c4', name: '管理会计师联合认证', tags: ['双证'], price: '¥6800' },
      { id: 'mall-prod-c5', name: '国际税务管理师', tags: ['国际认证'], price: '¥7800' },
      { id: 'mall-prod-c6', name: '汉唐中级经济师', tags: ['考证'], price: '¥2980' },
      { id: 'mall-prod-c7', name: '蜂和：26年CPA', tags: ['精讲'], price: '¥3980' },
      { id: 'mall-prod-c8', name: '高效通：26年CPA', tags: ['冲刺'], price: '¥4980' },
      { id: 'mall-prod-c9', name: '蜂和：26年税务师', tags: ['精讲'], price: '¥3580' },
      { id: 'mall-prod-c10', name: '高效通：26年税务师', tags: ['冲刺'], price: '¥4580' },
      { id: 'mall-prod-c11', name: '蜂和：26年会计中级', tags: ['精讲'], price: '¥1980' },
      { id: 'mall-prod-c12', name: '高效通：26年会计中级', tags: ['冲刺'], price: '¥2580' },
      { id: 'mall-prod-c13', name: '蜂和：中级经济师', tags: ['精讲'], price: '¥1880' },
      { id: 'mall-prod-c14', name: '蜂和：2026年会计初级', tags: ['入门'], price: '¥980' },
      { id: 'mall-prod-c15', name: '协会证书', tags: ['官方'], price: '¥1200' },
    ]
  },
  {
    id: 'special',
    name: '行业特色专题',
    icon: <Globe className="w-5 h-5" />,
    products: [
      { id: 'mall-prod-sp1', name: '特色游学 专行业大会', tags: ['线下', '交流'], description: '深入行业标杆企业参访', price: '¥5999' },
      { id: 'mall-prod-sp2', name: '企业家出海项目', tags: ['出海', '高端'], description: '助力企业拓展海外市场', price: '¥12999' },
      { id: 'mall-prod-sp3', name: '海外游学', tags: ['国际', '视野'], description: '拓展国际化商业视野', price: '¥19999' },
      { id: 'mall-prod-sp4', name: '协会高端班', tags: ['圈层', '进阶'], description: '顶级行业圈层交流平台', price: '¥8999' },
    ]
  },
  {
    id: 'consulting',
    name: '管理咨询产品',
    icon: <Briefcase className="w-5 h-5" />,
    products: [
      { id: 'mall-prod-co1', name: '企业内控体系建设', tags: ['定制'], description: '量身定制企业内部控制体系', price: '面议' },
      { id: 'mall-prod-co2', name: '全面预算管理咨询', tags: ['财务', '规划'], description: '优化企业资源配置效率', price: '面议' },
      { id: 'mall-prod-co3', name: '股权激励方案设计', tags: ['合伙人', '激励'], description: '激发核心团队创业热情', price: '面议' },
    ]
  }
];

export const MallPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef<boolean>(false);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(`category-section-${id}`);
    if (element && containerRef.current) {
      isProgrammaticScrollRef.current = true;
      const container = containerRef.current;
      const containerTop = container.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const scrollOffset = elementTop - containerTop;
      
      container.scrollTo({
        top: container.scrollTop + scrollOffset,
        behavior: 'smooth'
      });
      
      // Reset after smooth scroll finishes
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 600);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isProgrammaticScrollRef.current) return;
    
    const container = e.currentTarget;
    const containerTop = container.getBoundingClientRect().top;
    
    let activeId = activeCategory;
    for (const category of CATEGORIES) {
      const el = document.getElementById(`category-section-${category.id}`);
      if (el) {
        const elTop = el.getBoundingClientRect().top;
        if (elTop - containerTop <= 64) {
          activeId = category.id;
        }
      }
    }
    
    if (activeId !== activeCategory) {
      setActiveCategory(activeId);
    }
  };

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sharingProduct, setSharingProduct] = useState<Product | null>(null);
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleAddToCart = (product: Product) => {
    const isCurrentlyIn = cartItems.some(item => item.id === product.id);
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, { ...product, quantity: 1, selected: true }];
    });
    
    if (isCurrentlyIn) {
      showToast('已从心愿单取消');
    } else {
      showToast('已添加至心愿单');
    }
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setIsShoppingCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleToggleSelect = (id: string) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const handleToggleSelectAll = () => {
    const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);
    setCartItems(prev => prev.map(item => ({ ...item, selected: !allSelected })));
  };

  const handleRemoveItems = (ids: string[]) => {
    setCartItems(prev => prev.filter(item => !ids.includes(item.id)));
  };

  const handleCheckout = (items: CartItem[]) => {
    alert(`结算 ${items.length} 件商品，总价：¥${items.reduce((sum, item) => sum + parseFloat(item.price?.replace(/[^0-9.]/g, '') || '0') * item.quantity, 0).toFixed(2)}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed inset-0 z-[60] bg-[#F7F8FA] flex flex-col"
    >
      {/* Header */}
      <div className="bg-white px-4 pt-14 pb-3 sticky top-0 z-10 shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <button onClick={onBack} className="p-2 -ml-2 active:bg-gray-50 rounded-full transition-colors shrink-0">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-[18px] font-black text-gray-900 tracking-tight">产品服务</h1>
            <button 
              onClick={() => setIsShoppingCartOpen(true)}
              className="p-1.5 active:bg-gray-50 rounded-full transition-colors relative flex items-center justify-center"
            >
              <div className="relative flex items-center justify-center">
                <Heart className="w-5.5 h-5.5 text-rose-500 fill-rose-50" />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-md p-0.5 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center">
                  <List className="w-2.5 h-2.5 text-rose-600" strokeWidth={3} />
                </div>
              </div>
              {cartItems.length > 0 && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
              )}
            </button>
          </div>
        </div>
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="搜索商品、课程、证书..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 rounded-full py-2 pl-9 pr-4 text-[14px] outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[100px] bg-white overflow-y-auto no-scrollbar border-r border-gray-100">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`w-full flex flex-col items-center gap-1.5 py-4 px-2 relative transition-colors ${
                activeCategory === category.id ? 'bg-blue-50/50' : 'active:bg-gray-50'
              }`}
            >
              {activeCategory === category.id && (
                <motion.div 
                  layoutId="activeCategoryIndicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full"
                />
              )}
              
              <span className={`text-[12px] text-center leading-tight ${
                activeCategory === category.id ? 'text-blue-600 font-bold' : 'text-gray-600 font-medium'
              }`}>
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto no-scrollbar p-4"
        >
          {CATEGORIES.map((category) => {
            const categoryProducts = category.products.filter(p => 
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
              p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
            );

            if (categoryProducts.length === 0) return null;

            return (
              <div 
                key={category.id} 
                id={`category-section-${category.id}`} 
                className="mb-8 last:mb-16 scroll-mt-2"
              >
                <div className="mb-3 py-2 flex items-center justify-between">
                  <h2 className="text-[15px] font-black text-gray-900 flex items-center gap-1.5">
                    {category.name}
                  </h2>
                  <span className="text-[11px] font-bold text-gray-400 bg-gray-200/50 px-2.5 py-0.5 rounded-full font-mono">
                    {categoryProducts.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {categoryProducts.map(product => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white rounded-[20px] p-3 shadow-[0_2px_12px_rgb(0,0,0,0.04)] active:scale-[0.98] transition-transform cursor-pointer border border-gray-100/50 flex gap-3.5"
                    >
                      {/* Product Image */}
                      <div className="w-[76px] h-[76px] rounded-[10px] bg-gray-50 flex-shrink-0 relative overflow-hidden">
                        <img 
                          src={`https://picsum.photos/seed/${product.id}/200/200`} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 flex flex-col pt-1 min-w-0">
                        <h3 className="text-[14px] font-bold text-gray-900 leading-[1.4] line-clamp-2 mb-1">
                          {product.name}
                        </h3>
                        
                        {/* Pricing Details */}
                        <div className="flex items-baseline gap-2 mb-2">
                          {product.price && product.price !== '面议' ? (
                            <>
                              <span className="text-[15px] font-black text-[#FF5E3A] leading-none">{product.price}</span>
                              <span className="text-[11px] text-gray-400 line-through leading-none">
                                ¥{Math.ceil((parseInt(product.price.replace(/[^\d]/g, ''), 10) * 1.35) / 10) * 10}
                              </span>
                            </>
                          ) : (
                            <span className="text-[15px] font-black text-[#FF5E3A] leading-none">{product.price || '面议'}</span>
                          )}
                        </div>

                        <div className="flex-1" />

                        {/* Quick Actions */}
                        <div className="flex items-center justify-end gap-3 shrink-0">
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              handleAddToCart(product); 
                            }}
                            className="w-7 h-7 rounded-full flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-rose-500 active:scale-95 transition-all shadow-sm border border-rose-100/50"
                          >
                            <Heart 
                              className={`w-4 h-4 ${
                                cartItems.some(item => item.id === product.id) ? 'fill-rose-500 text-rose-500' : 'text-rose-500'
                              }`} 
                            />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Empty Search Results */}
          {CATEGORIES.every(cat => 
            cat.products.filter(p => 
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
              p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
            ).length === 0
          ) && (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400">
              <Search className="w-10 h-10 mb-3 opacity-20" />
              <p className="text-[13px]">没有找到相关商品</p>
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailPage 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            isInWishlist={cartItems.some(item => item.id === selectedProduct.id)}
          />
        )}
      </AnimatePresence>

      {/* Shopping Cart Overlay */}
      <AnimatePresence>
        {isShoppingCartOpen && (
          <ShoppingCartPage 
            cartItems={cartItems}
            onBack={() => setIsShoppingCartOpen(false)}
            onUpdateQuantity={handleUpdateQuantity}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
            onRemoveItems={handleRemoveItems}
            onCheckout={handleCheckout}
            onProductClick={(p) => {
              setSelectedProduct(p);
            }}
            onShareProduct={(p) => {
              setSharingProduct(p);
              setIsShareModalOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      <ProductShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        product={sharingProduct}
      />

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-full text-[14px] flex items-center gap-2 z-[100]"
          >
            <CheckCircle className="w-4 h-4 text-green-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
