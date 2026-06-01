import React, { useState } from 'react';
import { 
  Search, MapPin, ChevronRight, Play, 
  Calendar, MapPin as LocationIcon, Users,
  ChevronLeft, Filter, ChevronDown, Share2, FileText,
  X, MessageCircle, Aperture, Link as LinkIcon, Download,
  Star, History, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PurchaseModal } from './PurchaseModal';
import { LeadCaptureModal } from './LeadCaptureModal';

interface EventPageProps {
  onBack: () => void;
  initialCategory?: string;
  singleCategoryMode?: boolean;
  initialEvent?: any;
}

// --- Mock Data ---

const SCHEDULE_RECORDS = [
  {
    id: 's1',
    time: '今日 08:00',
    title: '2024大成财税年度峰会：新经济下的变革',
    location: '北京·国贸大酒店 3层宴会厅',
    image: 'https://picsum.photos/seed/sch1/600/300',
    category: '2024年行业峰会',
    tags: ['汇算清缴', '风险防范'],
    status: '进行中',
    isToday: true,
    speaker: '张大成 · 大成财税创始人',
    agenda: ['09:00-10:30 宏观经济趋势分析', '10:45-12:00 税务合规新要求'],
    hasMaterials: true,
    checkInStatus: '已签到',
    introduction: '本次峰会聚焦新经济形势下的财税变革，邀请行业顶尖专家，深度剖析最新政策走向，分享前沿税务筹划理念。旨在帮助企业在复杂多变的市场环境中，把握机遇，防范风险，实现稳健发展。',
    lecturerIntro: {
      name: '张大成',
      title: '大成财税创始人',
      image: 'https://picsum.photos/seed/lecturer1/200/200',
      description: '拥有20年财税行业经验，曾为多家世界500强企业提供财税咨询服务。'
    },
    destinationIntro: {
      title: '马来西亚参访企业',
      image: 'https://picsum.photos/seed/dest1/600/300',
      description: '本次行程将深入参访马来西亚知名科技企业及金融机构，了解当地投资环境与税收优惠政策。'
    },
    detailedItinerary: [
      {
        day: 'Day 1',
        date: '4月15日',
        activities: [
          { time: '08:00', event: '大巴统一出发', detail: '集合地点：总部大楼A座广场' },
          { time: '09:00', event: '到达酒店并签到', detail: '住宿酒店：北京国贸大酒店（五星级）' },
          { time: '09:30', event: '开幕式及主题演讲', detail: '主讲：张大成' },
          { time: '12:00', event: '自助午餐', detail: '地点：酒店2层自助餐厅' },
          { time: '14:00', event: '下午场：税务合规新要求', detail: '主讲：李晓明' },
          { time: '18:00', event: '欢迎晚宴', detail: '地点：3层宴会厅' }
        ]
      },
      {
        day: 'Day 2',
        date: '4月16日',
        activities: [
          { time: '07:30', event: '酒店早餐', detail: '凭房卡用餐' },
          { time: '09:00', event: '分组案例研讨', detail: '地点：各分会场' },
          { time: '12:00', event: '午餐及休息', detail: '' },
          { time: '14:00', event: '闭幕式及颁奖', detail: '' },
          { time: '16:00', event: '大巴返程', detail: '预计17:30抵达出发地' }
        ]
      }
    ],
    materials: [
      { name: '2024宏观经济趋势分析报告.pdf', size: '2.4 MB', type: 'pdf' },
      { name: '税务合规新要求实操指南.pptx', size: '5.1 MB', type: 'ppt' },
      { name: '峰会学员通讯录.xlsx', size: '1.2 MB', type: 'excel' }
    ]
  },
  {
    id: 's2',
    time: '4月15日 14:00',
    title: '房地产企业土地增值税清算实务深度解析',
    location: '上海·浦东金茂大厦 16层会议室',
    image: 'https://picsum.photos/seed/sch2/600/300',
    category: '线下实操课',
    tags: ['土地增值税', '合规审计'],
    status: '待参加',
    isToday: false,
    speaker: '李晓明 · 资深税务专家',
    agenda: ['14:00-15:30 清算流程详解', '15:45-17:00 案例实操演练'],
    hasMaterials: false,
    checkInStatus: '未签到',
    introduction: '针对房地产企业在土地增值税清算过程中面临的痛点和难点，本次课程将结合最新政策和实际案例，深度解析清算流程、关键风险点及应对策略，帮助企业提升税务合规水平。',
    lecturerIntro: {
      name: '李晓明',
      title: '资深税务专家',
      image: 'https://picsum.photos/seed/lecturer2/200/200',
      description: '专注于房地产行业税务筹划15年，实战经验丰富。'
    },
    detailedItinerary: [
      {
        day: 'Day 1',
        date: '4月15日',
        activities: [
          { time: '13:30', event: '签到入场', detail: '请携带报名凭证' },
          { time: '14:00', event: '清算流程详解', detail: '主讲：李晓明' },
          { time: '15:30', event: '茶歇交流', detail: '' },
          { time: '15:45', event: '案例实操演练', detail: '分组讨论与点评' },
          { time: '17:00', event: '课程结束', detail: '' }
        ]
      }
    ],
    materials: []
  },
  {
    id: 's3',
    time: '4月22日 09:30',
    title: '高新技术企业研发费用加计扣除专题培训',
    location: '深圳·南山科技园 腾讯大厦B座',
    image: 'https://picsum.photos/seed/sch3/600/300',
    category: '政策解读',
    tags: ['加计扣除', '国央企'],
    status: '待参加',
    isToday: false,
    speaker: '王志强 · 政策研究员',
    agenda: ['09:30-11:00 政策最新变化', '11:15-12:30 申报注意事项'],
    hasMaterials: true,
    checkInStatus: '未签到',
    introduction: '全面解读高新技术企业研发费用加计扣除最新政策，详细梳理申报流程和注意事项，结合实际案例分析常见问题，助力企业充分享受政策红利，降低税收成本。',
    lecturerIntro: {
      name: '王志强',
      title: '政策研究员',
      image: 'https://picsum.photos/seed/lecturer3/200/200',
      description: '长期从事高新技术企业相关政策研究，参与多项地方政策起草。'
    },
    detailedItinerary: [
      {
        day: 'Day 1',
        date: '4月22日',
        activities: [
          { time: '09:00', event: '签到入场', detail: '领取培训资料' },
          { time: '09:30', event: '政策最新变化解读', detail: '主讲：王志强' },
          { time: '11:00', event: '茶歇', detail: '' },
          { time: '11:15', event: '申报注意事项与实操', detail: '现场答疑' },
          { time: '12:30', event: '培训结束', detail: '' }
        ]
      }
    ],
    materials: [
      { name: '研发费用加计扣除政策汇编.pdf', size: '1.8 MB', type: 'pdf' },
      { name: '申报表格填写模板.docx', size: '500 KB', type: 'word' }
    ]
  }
];

const UPCOMING_EVENTS = [
  {
    id: 'u1',
    title: '2024房地产行业税务筹划与风险防范实战班',
    cover: 'https://picsum.photos/seed/ev1/400/300',
    date: '04月15日-16日',
    location: '北京·朝阳',
    tags: ['房地产', '企业所得税'],
    status: '报名中',
    price: '¥4980',
    industry: '房地产',
    taxType: '企业所得税',
    category: '游学标杆',
    isMemberFree: true,
    details: {
      background: '随着金税四期的全面上线，房地产行业面临前所未有的税务监管压力。本次实战班旨在帮助企业高管及财务负责人全面梳理税务风险点，掌握最新的税务筹划策略。',
      theme: '新形势下的房地产税务合规与筹划',
      speaker: {
        name: '张大成',
        title: '大成财税创始人',
        image: 'https://picsum.photos/seed/lecturer1/200/200',
        desc: '拥有20年财税行业经验，曾为多家世界500强企业提供财税咨询服务。'
      },
      companies: [
        { name: '马来西亚XX科技集团', image: 'https://picsum.photos/seed/comp1/400/200', desc: '东南亚领先的科技创新企业，在数字化转型和税务合规方面有独到经验。' }
      ],
      city: { name: '吉隆坡', image: 'https://picsum.photos/seed/city1/400/200', desc: '马来西亚首都，多元文化交融的国际大都市，东南亚重要的经济中心。' },
      food: { name: '特色娘惹菜', image: 'https://picsum.photos/seed/food1/400/200', desc: '融合华人与马来人烹饪特色的地道美食，体验独特的南洋风味。' },
      accommodation: { name: '吉隆坡香格里拉大酒店', image: 'https://picsum.photos/seed/hotel1/400/200', desc: '市中心五星级豪华酒店，提供舒适的住宿环境和优质的会议设施。' },
      schedule: [
        { day: '第一天 (4月15日)', desc: '全天报到，入住酒店，晚上举行欢迎晚宴及破冰活动。' },
        { day: '第二天 (4月16日)', desc: '上午：主题分享《新形势下的房地产税务合规》；下午：参访马来西亚XX科技集团。' }
      ],
      pricing: '标准价：4980元/人',
      inclusions: '包含培训费、资料费、参访费、活动期间餐饮及住宿费。不含往返大交通及个人消费。',
      registration: '请点击下方“立即报名”按钮，或联系专属客服获取《参会回执表》。发票将在活动结束后统一开具。',
      receiptForm: '报名成功后，客服将发送《参会回执表》至您的邮箱。',
      account: '户名：大成财税咨询有限公司\n账号：1234567890123456\n开户行：招商银行北京分行XX支行',
      others: '请携带有效身份证件/护照，注意当地风俗习惯。如需办理签证，请提前联系客服协助。'
    }
  },
  {
    id: 'u2',
    title: '金税四期下制造业合规应对与稽查防范指南',
    cover: 'https://picsum.photos/seed/ev2/400/300',
    date: '04月20日',
    location: '上海·浦东',
    tags: ['制造业', '增值税'],
    status: '即将满员',
    price: '¥3680',
    industry: '制造业',
    taxType: '增值税',
    category: '研修班',
    isMemberFree: false,
    details: {
      background: '制造业是国民经济的支柱，在金税四期背景下，如何做好增值税合规与稽查防范是每个制造企业必须面对的课题。',
      theme: '制造业增值税风险防范与应对',
      speaker: {
        name: '李晓明',
        title: '资深税务专家',
        image: 'https://picsum.photos/seed/lecturer2/200/200',
        desc: '专注于制造业税务筹划15年，实战经验丰富。'
      },
      schedule: [
        { day: '4月20日 上午', desc: '金税四期对制造业的影响及应对策略' },
        { day: '4月20日 下午', desc: '增值税稽查案例分析与风险防范' }
      ],
      pricing: '标准价：3680元/人',
      inclusions: '包含培训费、资料费、午餐费。',
      registration: '请点击下方“立即报名”按钮进行在线支付。',
      account: '户名：大成财税咨询有限公司\n账号：1234567890123456\n开户行：招商银行上海分行XX支行',
    }
  },
  {
    id: 'u3',
    title: '高新技术企业认定与研发费用加计扣除实操',
    cover: 'https://picsum.photos/seed/ev3/400/300',
    date: '05月08日',
    location: '深圳·南山',
    tags: ['高新', '所得税'],
    status: '报名中',
    price: '¥2980',
    industry: '通用',
    taxType: '企业所得税',
    category: '行业交流会',
    isMemberFree: true,
    details: {
      background: '高新技术企业认定标准日益严格，如何规范研发费用核算，充分享受加计扣除政策红利？',
      theme: '高企认定与研发费用加计扣除实务',
      speaker: {
        name: '王志强',
        title: '政策研究员',
        image: 'https://picsum.photos/seed/lecturer3/200/200',
        desc: '长期从事高新技术企业相关政策研究，参与多项地方政策起草。'
      },
      schedule: [
        { day: '5月8日 上午', desc: '高新技术企业认定最新政策解读' },
        { day: '5月8日 下午', desc: '研发费用加计扣除实操与风险防范' }
      ],
      pricing: '标准价：2980元/人',
      inclusions: '包含培训费、资料费、午餐费。',
      registration: '请点击下方“立即报名”按钮。',
    }
  },
  {
    id: 'u4',
    title: '跨境电商税务合规与出口退税实务解析',
    cover: 'https://picsum.photos/seed/ev4/400/300',
    date: '05月15日',
    location: '广州·天河',
    tags: ['跨境电商', '出口退税'],
    status: '报名中',
    price: '¥3280',
    industry: '互联网',
    taxType: '增值税',
    category: '峰会论坛',
    isMemberFree: false,
    details: {
      background: '跨境电商行业蓬勃发展，税务合规和出口退税成为企业核心竞争力之一。',
      theme: '跨境电商税务合规与出口退税',
      speaker: {
        name: '陈老师',
        title: '跨境电商税务专家',
        image: 'https://picsum.photos/seed/lecturer4/200/200',
        desc: '拥有丰富的跨境电商税务实操经验。'
      },
      schedule: [
        { day: '5月15日 全天', desc: '跨境电商税务合规框架及出口退税实操' }
      ],
      pricing: '标准价：3280元/人',
      inclusions: '包含培训费、资料费、午餐费。',
      registration: '请点击下方“立即报名”按钮。',
    }
  },
  {
    id: 'u5',
    title: '2024年个人所得税汇算清缴实操与风险防范',
    cover: 'https://picsum.photos/seed/ev5/400/300',
    date: '04月25日',
    location: '北京·海淀',
    tags: ['个税', '汇算清缴'],
    status: '报名中',
    price: '¥1980',
    industry: '通用',
    taxType: '个人所得税',
    category: '游学标杆',
    isMemberFree: true,
    details: {
      background: '个人所得税年度汇算清缴工作即将开始，企业HR和财务人员如何高效、准确地完成申报工作，防范潜在风险？',
      theme: '个税汇算清缴实操与风险防范',
      speaker: {
        name: '刘伟',
        title: '资深个税专家',
        image: 'https://picsum.photos/seed/lecturer5/200/200',
        desc: '专注个人所得税领域10余年，对个税政策有深入研究。'
      },
      schedule: [
        { day: '4月25日 上午', desc: '个税汇算清缴最新政策解读' },
        { day: '4月25日 下午', desc: '个税汇算清缴实操演示与常见问题解答' }
      ],
      pricing: '标准价：1980元/人',
      inclusions: '包含培训费、资料费、午餐费。',
      registration: '请点击下方“立即报名”按钮进行在线支付。',
      account: '户名：大成财税咨询有限公司\n账号：1234567890123456\n开户行：招商银行北京分行XX支行',
    }
  },
  {
    id: 'u6',
    title: '互联网企业税务合规与数据资产入表实务',
    cover: 'https://picsum.photos/seed/ev6/400/300',
    date: '05月10日',
    location: '杭州·余杭',
    tags: ['互联网', '数据资产'],
    status: '报名中',
    price: '¥3280',
    industry: '互联网',
    taxType: '企业所得税',
    category: '研修班',
    isMemberFree: false,
    details: {
      background: '数字经济时代，数据资产入表成为互联网企业关注的焦点。如何在税务合规的前提下，实现数据资产的价值最大化？',
      theme: '互联网企业税务合规与数据资产入表',
      speaker: {
        name: '陈明',
        title: '数字经济财税专家',
        image: 'https://picsum.photos/seed/lecturer6/200/200',
        desc: '深入研究数字经济财税政策，为多家知名互联网企业提供咨询服务。'
      },
      schedule: [
        { day: '5月10日 上午', desc: '互联网企业税务合规要点解析' },
        { day: '5月10日 下午', desc: '数据资产入表实务操作与税务处理' }
      ],
      pricing: '标准价：3280元/人',
      inclusions: '包含培训费、资料费、午餐费。',
      registration: '请点击下方“立即报名”按钮进行在线支付。',
      account: '户名：大成财税咨询有限公司\n账号：1234567890123456\n开户行：招商银行杭州分行XX支行',
    }
  },
  {
    id: 'u7',
    title: '金融行业增值税政策深度解析与筹划',
    cover: 'https://picsum.photos/seed/ev7/400/300',
    date: '04月28日',
    location: '上海·陆家嘴',
    tags: ['金融', '增值税'],
    status: '即将满员',
    price: '¥4580',
    industry: '金融',
    taxType: '增值税',
    category: '行业交流会',
    isMemberFree: true,
    details: {
      background: '金融行业业务复杂，增值税政策变动频繁。如何准确把握政策导向，优化税务筹划方案？',
      theme: '金融行业增值税政策解析与筹划',
      speaker: {
        name: '孙强',
        title: '金融财税专家',
        image: 'https://picsum.photos/seed/lecturer7/200/200',
        desc: '长期服务于大型金融机构，对金融行业财税问题有深刻理解。'
      },
      schedule: [
        { day: '4月28日 上午', desc: '金融行业增值税最新政策解读' },
        { day: '4月28日 下午', desc: '金融业务增值税筹划案例分析' }
      ],
      pricing: '标准价：4580元/人',
      inclusions: '包含培训费、资料费、午餐费。',
      registration: '请点击下方“立即报名”按钮进行在线支付。',
      account: '户名：大成财税咨询有限公司\n账号：1234567890123456\n开户行：招商银行上海分行XX支行',
    }
  },
  {
    id: 'u8',
    title: '2024大成财税年度峰会：预见未来，稳健前行',
    cover: 'https://picsum.photos/seed/ev8/400/300',
    date: '06月15日',
    location: '北京·国家会议中心',
    tags: ['宏观', '趋势'],
    status: '报名中',
    price: '¥8800',
    industry: '通用',
    taxType: '全部',
    category: '峰会论坛',
    isMemberFree: false,
    details: {
      background: '汇聚行业精英，共探财税未来。2024大成财税年度峰会将为您带来最前沿的宏观经济分析与财税政策解读。',
      theme: '预见未来，稳健前行',
      speaker: {
        name: '多位重量级嘉宾',
        title: '行业领袖与著名学者',
        image: 'https://picsum.photos/seed/lecturer8/200/200',
        desc: '邀请多位在宏观经济、财税政策领域具有深厚造诣的专家学者进行主旨演讲。'
      },
      schedule: [
        { day: '6月15日 上午', desc: '宏观经济形势分析与展望；财税体制改革最新进展' },
        { day: '6月15日 下午', desc: '圆桌论坛：企业如何应对新一轮财税变革；颁奖典礼' }
      ],
      pricing: '标准价：8800元/人',
      inclusions: '包含参会费、资料费、峰会期间餐饮费。',
      registration: '请点击下方“立即报名”按钮进行在线支付。',
      account: '户名：大成财税咨询有限公司\n账号：1234567890123456\n开户行：招商银行北京分行XX支行',
    }
  }
];

const PAST_EVENTS = [
  {
    id: 'p1',
    title: '大成财税2024年度峰会：新经济下的财税变革',
    cover: 'https://picsum.photos/seed/pv1/400/600',
    views: '1.2w',
    duration: '05:24',
    height: 'h-64'
  },
  {
    id: 'p2',
    title: 'CFO特训营：如何构建企业业财融合体系',
    cover: 'https://picsum.photos/seed/pv2/400/500',
    views: '8500',
    duration: '03:45',
    height: 'h-48'
  },
  {
    id: 'p3',
    title: '个税年度汇算清缴实操演示与答疑',
    cover: 'https://picsum.photos/seed/pv3/400/700',
    views: '2.1w',
    duration: '12:30',
    height: 'h-72'
  },
  {
    id: 'p4',
    title: '建筑企业“甲供材”税务处理难点解析',
    cover: 'https://picsum.photos/seed/pv4/400/550',
    views: '6200',
    duration: '08:15',
    height: 'h-56'
  }
];

const INDUSTRIES = ['全部', '房地产', '制造业', '互联网', '金融', '建筑'];
const TAX_TYPES = ['全部', '企业所得税', '增值税', '个人所得税', '出口退税'];
const STATUSES = ['全部', '报名中', '即将满员', '已结束'];
const TIME_OPTIONS = ['今日', '本周', '本月', '下月', '自定义'];
const DISCOVERY_CATEGORIES = ['游学标杆', '线下课程', '交流会', '特训研修'];

export const EventPage: React.FC<EventPageProps> = ({ onBack, initialCategory = null, singleCategoryMode = false, initialEvent = null }) => {
  const [activeTab, setActiveTab] = useState<'discovery' | 'schedule' | 'favorites'>('discovery');
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || '游学标杆');
  const [activeIndustry, setActiveIndustry] = useState('全部');
  const [activeTaxType, setActiveTaxType] = useState('全部');
  const [activeStatus, setActiveStatus] = useState('全部');
  const [activeTime, setActiveTime] = useState('不限');
  const [sortBy, setSortBy] = useState('newest');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [showTimeFilter, setShowTimeFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showLeadCaptureModal, setShowLeadCaptureModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [viewingEvent, setViewingEvent] = useState<any>(initialEvent);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [shareEvent, setShareEvent] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  // Mapping old categories to new categories
  const mapCategory = (cat: string) => {
    if (cat === '研修班') return '特训研修';
    if (cat === '行业交流会' || cat === '峰会论坛') return '交流会';
    if (cat === '线下实操课') return '线下课程';
    return '游学标杆';
  };

  // Filter logic
  const filteredEvents = UPCOMING_EVENTS.filter(event => {
    const eventCat = mapCategory(event.category);
    if (activeCategory && eventCat !== activeCategory) return false;
    if (activeIndustry !== '全部' && event.industry !== activeIndustry && event.industry !== '通用') return false;
    if (activeTaxType !== '全部' && event.taxType !== activeTaxType) return false;
    if (activeStatus !== '全部' && !event.status.includes(activeStatus.replace('中', ''))) return false;
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) && !event.category.toLowerCase().includes(searchQuery.toLowerCase()) && !event.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    // Time filter logic placeholder
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen bg-[#F5F6F8] pb-20 font-sans"
    >
      {/* Header */}
      <div className="pt-12 pb-3 px-5 sticky top-0 bg-[#F5F6F8]/95 backdrop-blur-md z-20 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button onClick={() => {
              if (singleCategoryMode) onBack();
              else if (activeTab !== 'discovery') setActiveTab('discovery');
              else onBack();
            }} className="mr-2 p-1 rounded-full hover:bg-black/5 transition-colors">
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <div className="flex items-center gap-1.5">
              <h1 className="text-[17px] font-bold text-gray-900 tracking-wider">
                {activeTab === 'discovery' ? '行' : activeTab === 'schedule' ? '行程' : '收藏'}
              </h1>
              {activeTab === 'discovery' && (
                <button
                  onClick={() => setIsSearchMode(true)}
                  className="p-1 px-1.5 hover:bg-black/5 rounded-full text-gray-850 transition-colors flex items-center justify-center shrink-0 hover:scale-105 active:scale-95"
                  title="搜索"
                >
                  <Search size={16} className="text-gray-800" />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10"></div>
          </div>
        </div>

        {/* Dynamic Location & Quick Navigation row instead of full-width search input */}
        <div className="flex items-center justify-between mt-2 px-1">
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-gray-800 font-bold text-[13px] bg-white px-2.5 py-1 rounded-full shadow-sm cursor-pointer border border-gray-100">
              北京 <ChevronDown size={12} className="ml-0.5 text-gray-450" />
            </div>
            <button 
              onClick={() => setActiveTab(activeTab === 'favorites' ? 'discovery' : 'favorites')}
              className={`text-[12px] font-bold px-2.5 py-1 rounded-full shadow-sm border ml-1 ${activeTab === 'favorites' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-white text-gray-600 border-gray-100'}`}
            >
              收藏
            </button>
          </div>
          
          <button 
            onClick={() => setActiveTab(activeTab === 'schedule' ? 'discovery' : 'schedule')} 
            className={`flex items-center gap-1.5 text-[12px] font-bold px-3 py-1 rounded-full shadow-sm border ${activeTab === 'schedule' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-white text-gray-600 border-gray-100'}`}
          >
            <Calendar size={13} className={activeTab === 'schedule' ? 'text-blue-500' : 'text-gray-400'} />
            我的行程
          </button>
        </div>
      </div>

      <div className="mt-3 h-[calc(100vh-140px)]">
        {activeTab === 'discovery' ? (
          <div className="flex h-full w-full gap-2 pb-20 pr-4">
            {/* Left Sidebar Menu */}
            <div className="w-[85px] bg-white shadow-[2px_0_8px_rgba(0,0,0,0.02)] rounded-tr-2xl overflow-y-auto no-scrollbar flex-shrink-0 flex flex-col pt-2 pb-6 gap-0 z-10">
              {DISCOVERY_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full py-4 pl-3 text-[13px] text-left transition-all relative ${
                    activeCategory === cat 
                      ? 'text-[#5C6DFF] font-bold bg-transparent' 
                      : 'text-gray-500 hover:text-gray-900 bg-transparent'
                  }`}
                >
                  {activeCategory === cat && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[16px] bg-[#5C6DFF] rounded-r-md"></div>
                  )}
                  <span className="relative z-10 block whitespace-nowrap tracking-wide pl-1">{cat}</span>
                </button>
              ))}
            </div>

            {/* Right Side Content (Timeline + Cards) */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Filter Bar */}
              <div className="flex items-center justify-between px-3 pb-3 pt-1 sticky top-0 z-30">
                <button 
                  onClick={() => setShowTimeFilter(true)}
                  className="flex items-center gap-1 text-[13px] text-gray-700 font-bold"
                >
                  {activeTime === '不限' ? '时间' : activeTime} <ChevronDown size={14} className="text-gray-400" />
                </button>
                <div className="flex items-center gap-3">
                  {[
                    { id: 'newest', label: '最新' },
                    { id: 'shares', label: '转发' },
                    { id: 'popularity', label: '热度' }
                  ].map(sort => (
                    <button 
                      key={sort.id}
                      onClick={() => {
                        if (sortBy === sort.id) {
                          setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
                        } else {
                          setSortBy(sort.id);
                          setSortOrder('desc');
                        }
                      }}
                      className={`flex items-center gap-0.5 text-[11px] transition-colors ${
                        sortBy === sort.id ? 'text-[#5C6DFF] font-bold' : 'text-gray-500'
                      }`}
                    >
                      {sort.label}
                      <div className="flex flex-col -space-y-[6px]">
                        <ChevronDown 
                          size={9} 
                          className={`rotate-180 ${sortBy === sort.id && sortOrder === 'asc' ? 'text-[#5C6DFF] opacity-100' : 'text-gray-400 opacity-40'}`} 
                          strokeWidth={3} 
                        />
                        <ChevronDown 
                          size={9} 
                          className={`${sortBy === sort.id && sortOrder === 'desc' ? 'text-[#5C6DFF] opacity-100' : 'text-gray-400 opacity-40'}`} 
                          strokeWidth={3} 
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar pb-10 pl-3 pr-2 relative">
                {/* Vertical line for timeline */}
                <div className="absolute left-[16.5px] top-4 bottom-0 w-[1px] bg-[#E8EBF0]"></div>
                
                <div className="space-y-6 pt-1 relative z-10">
                {filteredEvents.map(event => (
                  <div key={event.id} className="relative">
                    {/* Timeline Node & Date */}
                    <div className="flex items-center gap-2.5 mb-2.5 relative z-10 bg-gray-50/50 rounded-full w-fit pr-3">
                      <div className="w-2 h-2 rounded-full bg-[#5C6DFF] flex-shrink-0 ml-[1px]"></div>
                      <span className="text-[15px] font-extrabold text-gray-900 tracking-tight">{event.date || '04月15日-16日'}</span>
                    </div>

                    {/* Card container matching the image */}
                    <div 
                      className="bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-gray-50/50 ml-[20px] flex flex-col cursor-pointer active:scale-[0.98] transition-transform relative"
                      onClick={() => setViewingEvent(event)}
                    >
                      <div className="relative h-[140px]">
                        <img src={event.cover} alt={event.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                        
                        {/* Title inside image matching the image provided */}
                        <div className="absolute bottom-3 left-4 right-4 z-10">
                           <h3 className="text-[15px] font-bold text-white leading-snug line-clamp-2 drop-shadow-md mb-2">
                             {event.title}
                           </h3>
                           <div className="flex items-center text-[10.5px] text-gray-200 gap-4 mt-2">
                              <span className="flex items-center opacity-90"><Eye size={12} className="mr-1.5"/> 1.2w客户浏览</span>
                           </div>
                        </div>
                      </div>
                      
                      <div className="p-3.5 bg-white">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center text-[12px] text-gray-400 font-medium">
                            <Calendar size={13} className="mr-1.5 text-gray-300" />
                            <span>发布时间：今天</span>
                          </div>
                          <div className="flex items-center text-[12px] text-gray-400 font-medium max-w-[45%]">
                            <MapPin size={13} className="mr-1 text-gray-300 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-50">
                          <div className="font-bold text-[#F43F5E] text-[16px]">
                            {event.price}
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#5C6DFF] transition-colors"
                            >
                              <Share2 size={13} />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                                setShowLeadCaptureModal(true);
                              }}
                              className="bg-[#5C6DFF] hover:bg-blue-600 text-white rounded-full px-4 py-1.5 text-[13px] font-medium shadow-sm transition-colors"
                            >
                              参与报名
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filteredEvents.length === 0 && (
                <div className="py-10 text-center text-gray-400 text-[13px]">
                  暂无符合条件的活动
                </div>
              )}
              </div>
            </div>
          </div>
        ) : activeTab === 'schedule' ? (
          <div className="flex-1 overflow-y-auto no-scrollbar pb-10 pl-5 pr-4 relative pt-2">
            <h2 className="text-[19px] font-black text-gray-900 mb-6 px-1">我的行程</h2>
            {/* Timeline line */}
            <div className="absolute left-[24.5px] top-[72px] bottom-10 w-[2px] bg-[#E8EBF0]"></div>
            
            <div className="space-y-6 relative z-10 w-full overflow-hidden">
              {SCHEDULE_RECORDS.map(record => (
                <div key={record.id} className="relative w-full">
                  {/* Timeline node */}
                  <div className="flex items-center gap-3 mb-2.5 relative z-10 bg-[#f8fbff] rounded-full w-fit pr-3">
                    <div className="w-3 h-3 rounded-full bg-[#5C6DFF] border-[3px] border-white shadow-sm flex-shrink-0 ml-[0.5px]"></div>
                    <span className="text-[15px] font-black text-gray-900 tracking-tight">{record.time}</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ml-1 ${record.status === '进行中' ? 'bg-rose-50 text-rose-500' : 'bg-gray-100 text-gray-500'}`}>{record.status}</span>
                  </div>
                  
                  {/* Card with cover */}
                  <div 
                    className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-gray-100/80 ml-6 cursor-pointer active:scale-[0.98] transition-transform overflow-hidden"
                    onClick={() => setSelectedSchedule(record)}
                  >
                    <div className="h-[130px] relative">
                      <img src={record.image} alt={record.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <h3 className="absolute bottom-3 left-3 right-3 font-bold text-[15px] text-white leading-snug line-clamp-2 drop-shadow-md">
                        {record.title}
                      </h3>
                    </div>
                    <div className="p-3 bg-white">
                      <div className="flex items-center text-[12px] text-gray-500 font-medium">
                        <MapPin size={13} className="mr-1.5 text-gray-400 shrink-0" />
                        <span className="truncate">{record.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto no-scrollbar pb-10 space-y-4 px-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4 px-2">我的收藏</h2>
            <div className="text-gray-500 text-sm text-center py-10 bg-white rounded-xl shadow-sm border border-gray-100 mx-2">暂无收藏内容</div>
          </div>
        )}
      </div>

      {/* --- Filter Modal --- */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
             <div className="p-5 flex items-center justify-between border-b border-gray-100 mt-8">
               <span className="font-bold text-lg">全部筛选</span>
               <button onClick={() => setShowFilters(false)} className="p-2 -mr-2 bg-gray-50 rounded-full text-gray-500"><X size={20} /></button>
             </div>
             <div className="p-5 flex-1 overflow-y-auto">
                <div className="mb-4 text-sm font-bold text-gray-900">时间选项</div>
                <div className="flex flex-wrap gap-2">
                   {['今日', '本周', '本月', '下月', '自定义'].map(time => (
                     <button 
                       key={time} 
                       onClick={() => setActiveTime(time)} 
                       className={`px-4 py-2 rounded-full text-[13px] transition-colors ${
                         activeTime === time 
                           ? 'bg-[#F43F5E] text-white shadow-md shadow-rose-200' 
                           : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                       }`}
                     >
                       {time}
                     </button>
                   ))}
                </div>
             </div>
             <div className="p-5 border-t border-gray-100 flex gap-3 pb-8">
               <button onClick={() => setShowFilters(false)} className="flex-1 py-3 bg-gray-100 text-gray-900 rounded-full font-bold">重置</button>
               <button onClick={() => setShowFilters(false)} className="flex-1 py-3 bg-[#F43F5E] text-white rounded-full font-bold">确认</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

            {/* --- Mobile Time Filter Bottom Sheet --- */}
      <AnimatePresence>
        {showTimeFilter && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/40 flex flex-col justify-end"
          >
             <div className="flex-1" onClick={() => setShowTimeFilter(false)}></div>
             <motion.div 
               initial={{ y: '100%' }}
               animate={{ y: 0 }}
               exit={{ y: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 300 }}
               className="bg-white rounded-t-2xl pb-safe"
             >
               <div className="flex flex-col">
                 <div className="flex items-center justify-between p-4 border-b border-gray-50">
                   <span className="font-bold text-[16px] text-gray-900">时间选择</span>
                   <button onClick={() => setShowTimeFilter(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-full bg-gray-50">
                     <X size={18} />
                   </button>
                 </div>
                 
                 <div className="p-4 space-y-5">
                   <div className="flex flex-wrap gap-3">
                     {['不限', '本周', '本月', '下月'].map(time => (
                       <button
                         key={time}
                         onClick={() => setActiveTime(time)}
                         className={`px-5 py-2 rounded-full text-[13px] font-medium transition-colors ${
                           activeTime === time 
                             ? 'bg-[#E5E9FF] text-[#5C6DFF]' 
                             : 'bg-gray-50 text-gray-600'
                         }`}
                       >
                         {time}
                       </button>
                     ))}
                   </div>
                   
                   <div className="pt-2">
                     <div className="text-[13px] text-gray-500 mb-3 font-medium">自定义时间</div>
                     <div className="flex items-center gap-3">
                       <button className="flex-1 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-[13px] text-gray-400">
                         开始时间
                       </button>
                       <span className="text-gray-300">-</span>
                       <button className="flex-1 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-[13px] text-gray-400">
                         结束时间
                       </button>
                     </div>
                   </div>
                 </div>

                 <div className="p-4 border-t border-gray-50 flex gap-3">
                   <button 
                     onClick={() => setActiveTime('不限')}
                     className="w-1/3 py-3 rounded-xl bg-gray-50 text-gray-600 font-bold text-[14px]"
                   >
                     重置
                   </button>
                   <button 
                     onClick={() => setShowTimeFilter(false)}
                     className="flex-1 py-3 rounded-xl bg-[#5C6DFF] text-white font-bold text-[14px] shadow-md shadow-blue-200"
                   >
                     确认
                   </button>
                 </div>
               </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Schedule Detail Modal */}
      <AnimatePresence>
        {selectedSchedule && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="fixed inset-0 z-[80] bg-white flex flex-col"
          >
             <div className="p-5 flex items-center justify-between border-b border-gray-100">
               <span className="font-bold text-[17px] text-gray-900">行程详情</span>
               <button onClick={() => setSelectedSchedule(null)} className="p-2 -mr-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                 <X size={20} />
               </button>
             </div>
             
             <div className="flex-1 overflow-y-auto pb-20 p-5 space-y-6 bg-gray-50/30">
                <div className="bg-white p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-50">
                  <h2 className="text-[17px] font-bold text-gray-900 mb-3 leading-snug">{selectedSchedule.title}</h2>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-500 text-[13px]">
                       <Calendar size={15} /> {selectedSchedule.time}
                    </div>
                    <div className="flex items-start gap-2 text-gray-500 text-[13px]">
                       <MapPin size={15} className="mt-0.5 flex-shrink-0" /> <span className="leading-relaxed">{selectedSchedule.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-50">
                  <div className="font-bold text-[15px] text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-3.5 bg-[#5C6DFF] rounded-full"></div>
                    行程安排
                  </div>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-gray-100 before:to-transparent">
                    {selectedSchedule.detailedItinerary?.map((day: any, dayIdx: number) => (
                      <div key={dayIdx} className="mb-6 last:mb-0">
                        <div className="font-bold text-[13px] text-[#5C6DFF] bg-[#E5E9FF] inline-block px-3 py-1 rounded-full mb-4 relative z-10">{day.day} - {day.date}</div>
                        <div className="space-y-4">
                          {day.activities?.map((act: any, actIdx: number) => (
                            <div key={actIdx} className="relative flex items-start gap-4">
                              <div className="absolute left-[11px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#5C6DFF] -translate-x-[2.5px] border-2 border-white shadow-sm z-10"></div>
                              <div className="w-12 text-[13px] font-bold text-gray-400 pt-0.5 pl-[22px] flex-shrink-0">{act.time}</div>
                              <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100/50">
                                <div className="text-[14px] font-bold text-gray-900">{act.event}</div>
                                {act.detail && <div className="text-[12px] text-gray-500 mt-1">{act.detail}</div>}
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
        )}
      </AnimatePresence>\n\n      <LeadCaptureModal
        isOpen={showLeadCaptureModal}
        onClose={() => setShowLeadCaptureModal(false)}
        title="联系销售参与报名"
      />
      
      <PurchaseModal 
        isOpen={showPurchaseModal} 
        onClose={() => setShowPurchaseModal(false)}
        itemType="event"
        itemTitle={selectedEvent?.title || ''}
        price={selectedEvent?.price || '免费'}
        points={100}
      />
      
      {/* --- Event Detail Viewer --- */}
      <AnimatePresence>
        {viewingEvent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#F5F6F8] overflow-y-auto"
          >
            <div className="relative h-64 bg-white">
              <img src={viewingEvent.cover} alt={viewingEvent.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
              <button 
                onClick={() => {
                  if (initialEvent) {
                    onBack();
                  } else {
                    setViewingEvent(null);
                  }
                }} 
                className="absolute top-12 left-5 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <div className="p-5 pb-24">
               <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                 <div className="flex items-center gap-2 mb-3">
                   <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded">{viewingEvent.status || '报名中'}</span>
                   <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">{viewingEvent.category || '线下会议'}</span>
                 </div>
                 <h1 className="text-xl font-bold text-gray-900 mb-2 leading-snug">{viewingEvent.title}</h1>
                 <div className="font-bold text-[#F43F5E] text-[18px]">{viewingEvent.price || '免费'}</div>
               </div>
               
               <div className="space-y-3 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-50">
                 <div className="flex items-center text-[13px] text-gray-600 pb-3 border-b border-gray-50">
                   <Calendar size={16} className="mr-3 text-gray-400" /> 
                   <span>{viewingEvent.date || viewingEvent.startDate || '04月15日-16日'}</span>
                 </div>
                 <div className="flex items-center text-[13px] text-gray-600 pt-1">
                   <MapPin size={16} className="mr-3 text-gray-400" /> 
                   <span>{viewingEvent.location}</span>
                 </div>
               </div>

               <div className="bg-white rounded-xl p-4 shadow-sm">
                 <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                   <span className="w-1 h-3.5 bg-blue-500 rounded-full"></span> 详情介绍
                 </h3>
                 <div className="prose prose-sm text-gray-600 leading-relaxed">
                   <p>为更好的赋能企业，此次研讨会将深入解析行业发展趋势，并分享前沿成果。</p>
                   <p>本次活动将涵盖多个核心议题，汇聚行业顶尖大咖，期待您的参与。</p>
                 </div>
               </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe flex gap-3 z-10 px-5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
               <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 flex-shrink-0">
                 <Share2 size={20} />
               </button>
               <button 
                 onClick={() => {
                   setSelectedEvent(viewingEvent);
                   setShowLeadCaptureModal(true);
                 }}
                 className="flex-1 h-12 bg-gradient-to-r from-[#F43F5E] to-rose-600 text-white font-bold rounded-full shadow-lg shadow-rose-200 active:scale-95 transition-transform flex items-center justify-center"
               >
                 参与报名
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Mode Overlay */}
      <AnimatePresence>
        {isSearchMode && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed inset-0 bg-[#F5F6F8] z-[200] flex flex-col"
          >
            {/* Search Header */}
            <div className="px-4 pt-14 flex flex-col gap-2 border-b border-gray-100 bg-white">
              <div className="pb-4 flex items-center gap-3">
                <button 
                  onClick={() => {
                    setIsSearchMode(false);
                    setSearchQuery('');
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    autoFocus
                    type="text" 
                    placeholder="搜索活动、课程或地点" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-9 bg-gray-100 rounded-full pl-9 pr-4 text-[14px] focus:outline-none placeholder:text-gray-450"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-gray-200 rounded-full text-gray-400 h-5 w-5 flex items-center justify-center"
                    >
                      <X size={12} className="text-gray-500" />
                    </button>
                  )}
                </div>
                <button 
                  className="text-[15px] font-bold text-blue-600 px-1 active:opacity-60"
                  onClick={() => setIsSearchMode(false)}
                >
                  取消
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {searchQuery.trim() === '' ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  请输入关键词搜索活动、课程或地点
                </div>
              ) : filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <div 
                    key={event.id}
                    onClick={() => {
                      setViewingEvent(event);
                      setIsSearchMode(false);
                    }}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer flex gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 relative">
                      <img 
                        src={event.cover} 
                        alt="cover" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold mr-1.5">{event.category}</span>
                        <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 mt-1">{event.title}</h3>
                      </div>
                      <div className="flex items-center text-[11px] text-gray-500 gap-2">
                        <MapPin size={12} className="text-gray-400" />
                        <span>{event.location}</span>
                        <span>•</span>
                        <span>{(event as any).views || '1.2w'} 浏览</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400 text-sm">
                  没有找到符合条件的活动或课程
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


export const ScheduleDetailModal: React.FC<any> = ({ isOpen, onClose, schedule }) => {
  if (!isOpen || !schedule) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
       <div className="bg-white rounded-xl p-5 m-5">
         <h2 className="font-bold mb-4">{schedule.title || 'Schedule Details'}</h2>
         <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Close</button>
       </div>
    </div>
  );
};
