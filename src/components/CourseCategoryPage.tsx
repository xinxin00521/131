import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ListTree, Eye } from "lucide-react";

interface CourseCategoryPageProps {
  onClose: () => void;
  initialCategory?: string;
}

const categoryData: Record<string, any> = {
  财税早餐: {
    title: "财税早餐",
    sidebar: [
      {
        name: "每日速递",
        groups: [
          {
            title: "最新政策",
            items: ["2026年增值税新规", "个人所得税退税指南"],
          },
          { title: "行业动态", items: ["财税数字化转型", "金税四期解读"] },
        ],
      },
      {
        name: "实务要点",
        groups: [
          {
            title: "热点解析",
            items: ["研发费用加计扣除实操", "股权转让税务风险"],
          },
        ],
      },
    ],
  },
  税法直通车: {
    title: "税法直通车",
    sidebar: [
      {
        name: "增值税法",
        groups: [
          {
            title: "基础规定",
            items: ["增值税征税范围", "增值税税率及征收率"],
          },
          {
            title: "进阶实操",
            items: ["增值税发票管理指引", "不动产进项税额抵扣"],
          },
        ],
      },
      {
        name: "企业所得税法",
        groups: [
          {
            title: "税前扣除",
            items: ["工资薪金及福利费扣除", "利息支出税前扣除"],
          },
          {
            title: "税收优惠",
            items: ["小型微利企业优惠", "高新技术企业税收优惠"],
          },
        ],
      },
      {
        name: "个人所得税法",
        groups: [
          {
            title: "综合所得",
            items: ["薪金所得预扣预缴", "专项附加扣除详解"],
          },
        ],
      },
    ],
  },
  岗位培训: {
    title: "岗位",
    sidebar: [
      {
        name: "出纳",
        groups: [
          { title: "零基础上岗", items: ["出纳入门", "资金管理", "票据处理"] },
          { title: "常用软件/系统", items: ["网银操作", "财务软件出纳模块"] },
        ],
      },
      {
        name: "总账会计",
        groups: [
          { title: "日常账务", items: ["凭证处理", "月末结账", "报表编制"] },
          { title: "税务申报", items: ["增值税申报", "所得税申报"] },
        ],
      },
      {
        name: "税务会计",
        groups: [
          { title: "税务实操", items: ["发票开具与管理", "各税种申报流程"] },
          { title: "风险应对", items: ["税务预警指标", "稽查应对策略"] },
        ],
      },
      {
        name: "财务经理",
        groups: [
          { title: "团队管理", items: ["财务制度搭建", "人员考核与激励"] },
          { title: "经营分析", items: ["财务分析报告", "全面预算编制与执行"] },
        ],
      },
    ],
  },
  业务技能: {
    title: "技能",
    sidebar: [
      {
        name: "财务证书",
        groups: [
          { title: "初级职称", items: ["初级会计实务", "经济法基础"] },
          { title: "中级职称", items: ["中级会计实务", "财务管理", "经济法"] },
        ],
      },
      {
        name: "会计实操",
        groups: [
          { title: "学前指引", items: ["学前指引"] },
          {
            title: "零基础上岗",
            items: [
              "外勤入门",
              "出纳入门",
              "财务入门",
              "税务入门",
              "手工账",
              "电脑账",
              "岗前综合",
              "特训营",
            ],
          },
          {
            title: "常用软件/系统",
            items: ["财务软件", "税务系统", "办公软件"],
          },
          {
            title: "财务实战",
            items: ["会计准则", "建账结账", "全盘做账", "财务报表"],
          },
        ],
      },
    ],
  },
  行业垂直: {
    title: "行业",
    sidebar: [
      {
        name: "建筑工程",
        groups: [
          {
            title: "行业特色",
            items: ["工程项目核算", "建安发票处理", "异地预缴"],
          },
          { title: "税务风险", items: ["挂靠经营风险", "农民工工资涉税"] },
        ],
      },
      {
        name: "制造业",
        groups: [
          { title: "成本核算", items: ["品种法", "分批法", "标准成本法"] },
          { title: "税收优惠", items: ["高新技术企业", "研发费用加计扣除"] },
        ],
      },
      {
        name: "电商直播",
        groups: [
          { title: "平台对账", items: ["淘宝对账", "抖音对账", "佣金处理"] },
          { title: "税务合规", items: ["刷单涉税风险", "无票支出处理"] },
        ],
      },
      {
        name: "餐饮酒店",
        groups: [
          { title: "日常核算", items: ["餐饮成本核算", "收银系统对接"] },
          { title: "税务问题", items: ["农产品抵扣", "混合销售界定"] },
        ],
      },
    ],
  },
  高阶视角: {
    title: "高阶",
    sidebar: [
      {
        name: "税务筹划",
        groups: [
          { title: "企业架构", items: ["顶层架构设计", "持股平台设立"] },
          { title: "业务模式", items: ["供应链筹划", "灵活用工模式应用"] },
        ],
      },
      {
        name: "资本运作",
        groups: [
          { title: "投融资", items: ["尽职调查", "企业估值", "对赌协议解析"] },
          { title: "上市准备", items: ["IPO财务规范", "股权激励方案设计"] },
        ],
      },
      {
        name: "内控管理",
        groups: [
          { title: "风险防范", items: ["内部控制矩阵", "反舞弊机制建立"] },
          { title: "流程优化", items: ["业财融合实践", "财务共享中心建设"] },
        ],
      },
    ],
  },
};

export const CourseCategoryPage: React.FC<CourseCategoryPageProps> = ({
  onClose,
  initialCategory = "岗位培训",
}) => {
  const [activeMainCategory, setActiveMainCategory] = useState(initialCategory);
  const [activeSidebarItem, setActiveSidebarItem] = useState("");

  useEffect(() => {
    const validCategory = Object.keys(categoryData).includes(initialCategory)
      ? initialCategory
      : "岗位培训";
    setActiveMainCategory(validCategory);
    if (categoryData[validCategory]?.sidebar?.length > 0) {
      setActiveSidebarItem(categoryData[validCategory].sidebar[0].name);
    }
  }, [initialCategory]);

  const currentData =
    categoryData[activeMainCategory] || categoryData["岗位培训"];
  const sidebarItems = currentData.sidebar || [];
  const currentGroups =
    sidebarItems.find((item: any) => item.name === activeSidebarItem)?.groups ||
    [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[200] flex flex-col justify-end bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-[#F7F8FA] rounded-t-3xl h-[75%] flex flex-col w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
          <h1 className="text-[17px] font-bold text-gray-900">
            选择{currentData.title}
          </h1>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-[100px] bg-[#F7F8FA] overflow-y-auto no-scrollbar flex-shrink-0">
            {sidebarItems.map((item: any) => (
              <button
                key={item.name}
                onClick={() => setActiveSidebarItem(item.name)}
                className={`w-full py-4 px-2 text-center text-[14px] transition-colors relative ${
                  activeSidebarItem === item.name
                    ? "bg-white text-[#3B82F6] font-bold"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {activeSidebarItem === item.name && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-[#3B82F6] rounded-r-full" />
                )}
                {item.name}
              </button>
            ))}
          </div>

          {/* Right Content */}
          <div className="flex-1 bg-white overflow-y-auto no-scrollbar p-4">
            <div className="space-y-6 pb-8">
              {currentGroups.map((group: any, idx: number) => (
                <div key={idx} className="bg-white">
                  <div className="flex items-center gap-2 mb-3">
                    <ListTree className="w-4 h-4 text-[#3B82F6]" />
                    <h3 className="text-[14px] font-medium text-gray-800">
                      {group.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {group.items.map((item: string, itemIdx: number) => (
                      <div
                        key={itemIdx}
                        className="rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-transform flex flex-col"
                      >
                        <div className="aspect-[4/3] relative">
                          <img
                            src={`https://picsum.photos/seed/${encodeURIComponent(item)}/400/300`}
                            className="w-full h-full object-cover"
                            alt=""
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1 rounded flex items-center gap-0.5">
                            <Eye className="w-2.5 h-2.5" />
                            1.2w人学
                          </div>
                        </div>
                        <div className="p-2 flex-1 flex flex-col justify-between">
                          <h3 className="text-[12px] font-medium text-gray-800 line-clamp-2 leading-snug">
                            {item}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
