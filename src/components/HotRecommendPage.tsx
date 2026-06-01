import React, { useState, useRef } from "react";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  ChevronDown, 
  Flame, 
  Play, 
  Clock, 
  User, 
  Star,
  X,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HotRecommendPageProps {
  onClose: () => void;
  onCourseClick: (course: any) => void;
}

export const HotRecommendPage: React.FC<HotRecommendPageProps> = ({ 
  onClose, 
  onCourseClick 
}) => {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [activeSubCategory, setActiveSubCategory] = useState("初级会计师");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState("最新发布");
  const [searchQuery, setSearchQuery] = useState("");

  const rightContainerRef = useRef<HTMLDivElement>(null);
  const isClickingRef = useRef<boolean>(false);

  const categories = ["全部", "财税政策", "实操指南", "企业合规", "职场提升"];
  const sortOptions = ["最新发布", "观看人数"];

  const subCategoriesMap: Record<string, string[]> = {
    "全部": ["初级会计师", "中级会计师", "高级会计师"],
    "财税政策": ["最新新规", "所得税政策", "增值税政策"],
    "实操指南": ["申报流程", "发票管理", "核算实务"],
    "企业合规": ["合规体系", "稽查防范", "劳动社保"],
    "职场提升": ["核心考证", "管理提升", "实战金课"]
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    const subList = subCategoriesMap[cat] || [];
    if (subList.length > 0) {
      setActiveSubCategory(subList[0]);
      if (rightContainerRef.current) {
        rightContainerRef.current.scrollTop = 0;
      }
    }
  };

  const handleSubCategoryClick = (sub: string) => {
    setActiveSubCategory(sub);
    isClickingRef.current = true;
    const element = document.getElementById(`subcat-section-${sub}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => {
      isClickingRef.current = false;
    }, 600);
  };

  const handleRightScroll = () => {
    if (isClickingRef.current) return;
    const container = rightContainerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    let closestSub = activeSubCategory;
    let minDistance = Infinity;

    subCategories.forEach((sub) => {
      const el = document.getElementById(`subcat-section-${sub}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerRect.top);
        if (distance < minDistance) {
          minDistance = distance;
          closestSub = sub;
        }
      }
    });

    if (closestSub !== activeSubCategory) {
      setActiveSubCategory(closestSub);
    }
  };

  const hotCourses = [
    {
      id: 5,
      type: "video",
      title: "3分钟看懂：金税四期下，企业如何规避税务风险？",
      cover: "https://picsum.photos/seed/tax_video2/800/450",
      views: "4.5w",
      duration: "03:15",
      chapters: 1,
      category: "实操指南",
      subCategories: ["初级会计师", "申报流程", "合规体系", "核心考证"],
      rating: 4.9,
      tags: ["金税四期", "税务风险"]
    },
    {
      id: 1,
      type: "video",
      title: "员工必须缴纳社保新规深度解读",
      cover: "https://picsum.photos/seed/hot_c1/600/340",
      views: "2.8w",
      duration: "45:00",
      chapters: 4,
      category: "财税政策",
      subCategories: ["初级会计师", "最新新规", "劳动社保", "核心考证"],
      rating: 4.9,
      tags: ["社保新规", "合规"]
    },
    {
      id: 2,
      type: "video",
      title: "金税四期下企业进项税额抵扣风险防范",
      cover: "https://picsum.photos/seed/hot_c2/600/340",
      views: "1.5w",
      duration: "32:15",
      chapters: 3,
      category: "实操指南",
      subCategories: ["中级会计师", "发票管理", "稽查防范", "管理提升"],
      rating: 4.8,
      tags: ["金税四期", "增值税"]
    },
    {
      id: 3,
      type: "video",
      title: "2024年小微企业所得税优惠政策汇总及申报实务",
      cover: "https://picsum.photos/seed/hot_c3/600/340",
      views: "3.2w",
      duration: "58:00",
      chapters: 5,
      category: "企业合规",
      subCategories: ["中级会计师", "所得税政策", "申报流程", "合规体系"],
      rating: 5.0,
      tags: ["所得税", "申报"]
    },
    {
      id: 4,
      type: "video",
      title: "高新企业认定：研发费用归集要点解析",
      cover: "https://picsum.photos/seed/hot_c4/600/340",
      views: "2.1w",
      duration: "40:30",
      chapters: 4,
      category: "财税政策",
      subCategories: ["高级会计师", "核算实务", "稽查防范", "实战金课"],
      rating: 4.7,
      tags: ["高新认定", "研发费用"]
    },
    {
      id: 6,
      type: "video",
      title: "大中企业跨国特许权使用费关联交易税务风险管理",
      cover: "https://picsum.photos/seed/hot_c6/600/340",
      views: "1.9w",
      duration: "52:20",
      chapters: 6,
      category: "企业合规",
      subCategories: ["高级会计师", "增值税政策", "合规体系", "管理提升"],
      rating: 4.9,
      tags: ["关联交易", "税务筹划"]
    }
  ];

  const subCategories = subCategoriesMap[activeCategory] || subCategoriesMap["全部"];

  const filteredCourses = hotCourses.filter((course) => {
    // 1. Search Query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        course.title.toLowerCase().includes(query) || 
        course.tags.some(tag => tag.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    // 2. Main category (top tabs) filter
    if (activeCategory !== "全部" && course.category !== activeCategory) {
      return false;
    }

    // 3. Sub-category (sidebar) filter
    if (course.subCategories && !course.subCategories.includes(activeSubCategory)) {
      return false;
    }

    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed inset-0 bg-gray-50 z-[100] flex flex-col no-scrollbar overflow-hidden"
    >
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.04)] relative">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={onClose} className="p-1 -ml-1 text-gray-800">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="text-[17px] font-bold text-gray-900">精选推荐</span>
          <div className="w-6" /> {/* Spacer */}
        </div>

        {/* Categories (Tabs) - Still quick access but also in filter */}
        <div className="px-4 py-1 border-t border-gray-50 flex items-center justify-between relative">
          <div className="flex-1 flex gap-6 overflow-x-auto no-scrollbar py-1 mr-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`text-[15px] whitespace-nowrap py-2 transition-colors relative ${
                  activeCategory === cat ? "text-blue-600 font-bold" : "text-gray-500 font-medium"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter Row (Below Tabs) */}
        <div className="px-4 pb-3 flex items-center gap-3">
          <div className="flex-1 bg-gray-100 rounded-xl h-10 flex items-center px-4">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="搜索热门课程、名师" 
              className="bg-transparent flex-1 text-[14px] outline-none placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <X className="w-4 h-4 text-gray-400" onClick={() => setSearchQuery("")} />
            )}
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              showFilters ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/50' : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Overlay - Now absolute floating over content to prevent pushing layout */}
        <AnimatePresence>
          {showFilters && (
            <React.Fragment key="filter-overlay-group">
              {/* Overlay Backdrop - starts below the header to keep header clean and bright */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFilters(false)}
                className="absolute top-full left-0 right-0 h-[200vh] bg-black/40 z-[48] cursor-pointer"
              />

              {/* Floating Filter Card */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.15),0_10px_10px_-5px_rgba(0,0,0,0.04)] rounded-b-[20px] z-[49] overflow-hidden"
              >
                <div className="p-4 space-y-5">
                  {/* Sort Section */}
                  <div>
                    <h3 className="text-[13px] font-bold text-gray-400 mb-3 ml-1 uppercase tracking-wider">排序方式</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setActiveFilter(opt);
                          }}
                          className={`py-2.5 rounded-xl text-[13px] font-bold text-center border-2 transition-all ${
                            activeFilter === opt 
                              ? "bg-blue-50 text-blue-600 border-blue-600 shadow-sm" 
                              : "bg-gray-50 text-gray-500 border-transparent"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category Section */}
                  <div>
                    <h3 className="text-[13px] font-bold text-gray-400 mb-3 ml-1 uppercase tracking-wider">课程分类</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            handleCategoryChange(cat);
                          }}
                          className={`py-2.5 rounded-xl text-[13px] font-bold text-center border-2 transition-all ${
                            activeCategory === cat 
                              ? "bg-blue-50 text-blue-600 border-blue-600 shadow-sm" 
                              : "bg-gray-50 text-gray-500 border-transparent"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => {
                        handleCategoryChange("全部");
                        setActiveFilter("最新发布");
                      }}
                      className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-[14px]"
                    >
                      重置
                    </button>
                    <button 
                      onClick={() => setShowFilters(false)}
                      className="flex-[2] py-3 bg-blue-600 text-white rounded-xl font-bold text-[14px] shadow-lg shadow-blue-200"
                    >
                      确定
                    </button>
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          )}
        </AnimatePresence>
      </div>

      {/* Split layout: left sidebar, right list */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Second-level Navigation) */}
        <div className="w-[100px] flex-shrink-0 bg-gray-50 border-r border-gray-100/80 flex flex-col overflow-y-auto no-scrollbar">
          {subCategories.map((sub) => {
            const isSelected = activeSubCategory === sub;
            return (
              <button
                key={sub}
                onClick={() => handleSubCategoryClick(sub)}
                className={`py-4 px-3 text-left text-[13px] font-medium leading-normal transition-all relative ${
                  isSelected
                    ? "bg-white text-blue-600 font-bold border-l-[3px] border-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>

        {/* Right Content Column */}
        <div 
          ref={rightContainerRef}
          onScroll={handleRightScroll}
          className="flex-1 overflow-y-auto p-4 pb-32 bg-white no-scrollbar scroll-smooth"
        >
          {(() => {
            const getSubCategoryCourses = (sub: string) => {
              let courses = hotCourses.filter((course) => {
                if (activeCategory !== "全部" && course.category !== activeCategory) {
                  return false;
                }
                if (!course.subCategories || !course.subCategories.includes(sub)) {
                  return false;
                }
                if (searchQuery) {
                  const query = searchQuery.toLowerCase();
                  return (
                    course.title.toLowerCase().includes(query) ||
                    course.tags.some(tag => tag.toLowerCase().includes(query))
                  );
                }
                return true;
              });

              if (activeFilter === "观看人数") {
                courses = [...courses].sort((a, b) => {
                  const valA = parseFloat(a.views.replace("w", "")) * 10000;
                  const valB = parseFloat(b.views.replace("w", "")) * 10000;
                  return valB - valA;
                });
              }
              return courses;
            };

            const hasAnyResults = subCategories.some(sub => getSubCategoryCourses(sub).length > 0);

            if (!hasAnyResults) {
              return (
                <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                  <span className="text-[12px] font-medium">暂无推荐内容</span>
                </div>
              );
            }

            return subCategories.map((sub) => {
              const courses = getSubCategoryCourses(sub);
              if (courses.length === 0) return null;

              return (
                <div key={sub} id={`subcat-section-${sub}`} className="mb-10 scroll-mt-2">
                  <h2 className="text-[14px] font-black text-gray-900 mb-4 tracking-wide border-l-4 border-blue-600 pl-2.5">
                    {sub}
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    {courses.map((course) => (
                      <motion.div 
                        key={course.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onCourseClick(course)}
                        className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col cursor-pointer group"
                      >
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <img 
                            src={course.cover} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            alt={course.title}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-white text-[11px] font-medium drop-shadow-md">
                                <Play className="w-3 h-3 fill-white" />
                                {course.views}
                              </div>
                              <div className="flex items-center gap-1 text-white text-[11px] font-medium drop-shadow-md">
                                <BookOpen className="w-3 h-3" />
                                {course.chapters || 1}章节
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {course.title}
                          </h3>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </motion.div>
  );
};
