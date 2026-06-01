import { BindCodePage, BoundCode } from "./components/BindCodePage";
import { AddToDesktopModal } from "./components/AddToDesktopModal";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Search,
  Menu,
  Home,
  Zap,
  MessageSquare,
  User,
  Crown,
  Play,
  Pause,
  Headphones,
  BookOpen,
  ClipboardCheck,
  Navigation,
  Quote,
  Video,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  MoreHorizontal,
  ChevronDown,
  MessageCircle,
  Share2,
  Plus,
  Link,
  Camera,
  FileText,
  Hash,
  AtSign,
  Check,
  CheckCircle2,
  Image as ImageIcon,
  Smile,
  ThumbsDown,
  MessageCircleOff,
  Maximize2,
  Minimize2,
  Filter,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Star,
  Landmark,
  MapPin,
  Scale,
  Briefcase,
  Gift,
  ShieldCheck,
  ArrowRightCircle,
  Calculator,
  CheckSquare,
  Sparkles,
  Ticket,
  UserPlus,
  Flame,
  FileSearch,
  BookMarked,
  PieChart,
  Target,
  Shield,
  History,
  Phone,
  Clock,
  UserCheck,
  CreditCard,
  Headset,
  ShoppingBag,
  PlayCircle,
  Calendar,
  LogOut,
  Edit3,
  Building2,
  QrCode,
  Smartphone,
  Settings,
  Download,
  ThumbsUp,
  Coffee,
  Newspaper,
  MessageSquarePlus,
  Copy,
  Sun,
  Moon,
  XCircle,
  Square,
  Receipt,
  Map,
  MonitorSmartphone,
  Info,
  Users,
  Mic,
  Folder,
  FolderPlus,
  FilePlus,
  ExternalLink,
  File,
  Eye,
  Tag,
  Edit2,
  FolderInput,
  FolderOpen,
  CircleDot,
  Bell,
  Paperclip,
  Megaphone,
  ReceiptText,
  ShieldAlert,
  FileBarChart,
  ScanLine,
  Compass,
  ArrowLeft,
  ArrowUp,
  ArrowUpDown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { GoogleGenAI } from "@google/genai";
import { CourseDetailPage } from "./components/CourseDetailPage";
import { PolicyDetailPage } from "./components/PolicyDetailPage";
import { PolicyArticlePage } from "./components/PolicyArticlePage";
import { JournalPage, MOCK_JOURNALS, Journal } from "./components/JournalPage";
import { AssessmentPage } from "./components/AssessmentPage";
import { EventPage } from "./components/EventPage";
import { CheckInModal } from "./components/CheckInModal";
import { CourseMaterialsModal } from "./components/CourseMaterialsModal";
import { PurchaseModal } from "./components/PurchaseModal";
import { AccountManagementPage } from "./components/AccountManagementPage";
import { MallPage } from "./components/MallPage";
import { OrdersPage } from "./components/OrdersPage";
import { JourneyPage } from "./components/JourneyPage";
import { CourseCategoryPage } from "./components/CourseCategoryPage";
import { BenefitsPage } from "./components/BenefitsPage";
import { OnboardingWizard } from "./components/OnboardingWizard";
import { PolicyServicePage } from "./components/PolicyServicePage";
import { LiveTeaserPage } from "./components/LiveTeaserPage";
import { CallExpertModal } from "./components/CallExpertModal";
import { ExpertConsultationModal } from "./components/ExpertConsultationModal";
import { MessageCenterPage } from "./components/MessageCenterPage";
import { FavoritesPage } from "./components/FavoritesPage";
import { HistoryPage } from "./components/HistoryPage";
import { ResourcePackPage } from "./components/ResourcePackPage";
import { ExchangeCenterPage } from "./components/ExchangeCenterPage";
import { InviteFriendsPage } from "./components/InviteFriendsPage";
import { ShortVideoFeeds } from "./components/ShortVideoFeeds";
import { PostDetailPage } from "./components/PostDetailPage";
import { HotRecommendPage } from "./components/HotRecommendPage";

import { LeadCaptureModal } from "./components/LeadCaptureModal";
import { AdvisorContactModal } from "./components/AdvisorContactModal";

// --- AI Initialization ---
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// --- Types ---
export interface Post {
  id: number | string;
  type:
    | "audio"
    | "text"
    | "single-image"
    | "multi-image"
    | "large-image"
    | "course"
    | "live"
    | "event"
    | "video"
    | "vertical-video"
    | "policy"
    | "publication"
    | "hot"
    | "case"
    | "news-multi-image";
  title: string;
  content?: string;
  images?: string[];
  author?: string;
  avatar?: string;
  time?: string;
  likesCount?: number;
  commentsCount?: number;

  cover?: string;
  category?: string;
  businessTag?: string;
  status?: "playback" | "live" | "reserve" | "enrolling" | "past" | "normal";
  location?: string;
  startDate?: string;
  videoUrl?: string;
  publishYear?: string;
  views?: string | number;
  price?: string | number;
  hidePrice?: boolean;
  duration?: string;
}

interface Comment {
  id: number | string;
  author: string;
  avatar: string;
  content: string;
  time: string;
  location: string;
  likes: number;
  repliesCount?: number;
}

const formatCommentDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const diffTime = today.getTime() - targetDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const timeStr = `${hours}:${minutes}`;

  if (diffDays === 0) {
    return `今天 ${timeStr}`;
  } else if (diffDays === 1) {
    return `昨天 ${timeStr}`;
  } else if (diffDays === 2) {
    return `前天 ${timeStr}`;
  } else if (date.getFullYear() === now.getFullYear()) {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}-${day} ${timeStr}`;
  } else {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${timeStr}`;
  }
};

const formatLiveTime = (dateStr?: string) => {
  if (!dateStr) return "";
  if (!dateStr.includes("T") && !dateStr.includes("-")) return dateStr;

  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const timeStr = `${hours}:${minutes}`;

    if (diffDays === 0) {
      return `今天 ${timeStr}`;
    } else if (diffDays === 1) {
      return `明天 ${timeStr}`;
    } else if (date.getFullYear() === now.getFullYear()) {
      return `${date.getMonth() + 1}月${date.getDate()}日 ${timeStr}`;
    } else {
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${timeStr}`;
    }
  } catch (e) {
    return dateStr;
  }
};

const formatPostTime = (dateStr?: string) => {
  if (!dateStr) return "";
  // If it's already a formatted string like "发布于刚刚" or "1小时前", return as is
  if (!dateStr.includes("T") && !dateStr.includes("-")) return dateStr;

  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr; // Invalid date

    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    const diffTime = today.getTime() - targetDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes} 发布`;
    } else if (diffDays === 1) {
      return "昨天";
    } else if (date.getFullYear() === now.getFullYear()) {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    } else {
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    }
  } catch (e) {
    return dateStr;
  }
};

// --- Mock Data ---
const MOCK_COMMENTS: Comment[] = [
  {
    id: "comment-1",
    author: "是晚睡的人😂",
    avatar: "https://picsum.photos/seed/c1/100/100",
    content: "是晚睡的人😂",
    time: "2026-03-27T10:30:00",
    location: "北京",
    likes: 46,
    repliesCount: 7,
  },
  {
    id: "comment-2",
    author: "吴老师",
    avatar: "https://picsum.photos/seed/c2/100/100",
    content:
      "早熟的人容易对这个世界低头，像成熟的稻谷，被生活所累，弯了腰;晚熟的人，却像冬日山间的松柏，虽腰身弯折，却蓄势待发。",
    time: "2026-03-26T14:20:00",
    location: "广西",
    likes: 6,
    repliesCount: 2,
  },
  {
    id: "comment-3",
    author: "一宝",
    avatar: "https://picsum.photos/seed/c3/100/100",
    content: "难怪我这么孤独。也不打算随波逐流。就这样也挺好",
    time: "2026-03-25T09:15:00",
    location: "湖南",
    likes: 3,
  },
  {
    id: "comment-4",
    author: "晚熟的人",
    avatar: "https://picsum.photos/seed/c4/100/100",
    content: "莫言老师的书总是能直击灵魂。",
    time: "2025-11-05T16:45:00",
    location: "山东",
    likes: 12,
  },
];

const HOME_POSTS: Post[] = [
  {
    id: "e1",
    type: "event",
    title: "2026中国（深圳）企业财税管理创新大会",
    cover: "https://picsum.photos/seed/event_sz/800/400",
    location: "中国·深圳",
    startDate: "06月15日 09:00",
    time: "2026-05-20T12:34:00",
    views: "1.2w",
  },
  {
    id: "v_yesterday",
    type: "video",
    title: "财税政策深度解读",
    content: "这是一段展示昨天发布的示例内容。",
    cover: "https://picsum.photos/seed/tax_y/800/450",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "10:00",
    time: "2026-05-19T14:30:00",
    views: "3.5k",
  },
  {
    id: "v_long",
    type: "video",
    title: "【深度重磅】2026年度全国企业财税管理核心指南",
    content: "这是一段展示同月发布的示例内容。",
    cover: "https://picsum.photos/seed/long_title/800/450",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "15:45",
    time: "2026-05-15T04:27:00",
    views: "5.8w",
  },
  {
    id: "n1",
    type: "video",
    title: "2026年最新企业所得税汇算清缴指南",
    cover: "https://picsum.photos/seed/tax_video1/800/450",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "04:20",
    time: "2026-04-02T10:00:00",
    views: "2.1k",
  },
  {
    id: "n3",
    type: "hot",
    title: "重磅！多地税务局发文",
    content: "近期多地税务局相继发布通知，将对特定类型的发票进行严格审查。",
    cover: "https://picsum.photos/seed/tax_hot1/400/300",
    time: "2025-01-23T14:20:00",
    views: "9.2k",
  },
  {
    id: "n4",
    type: "news-multi-image",
    title:
      "小微企业增值税期末留抵退税政策实施力度加大，快来看看你是否符合条件！",
    images: [
      "https://picsum.photos/seed/tax_news1/400/300",
      "https://picsum.photos/seed/tax_news2/400/300",
      "https://picsum.photos/seed/tax_news3/400/300",
    ],
    time: "2026-05-18T06:50:00",
  },
  {
    id: "post-1",
    type: "multi-image",
    title: "公告",
    content: "友友们，我们的新课程上线了，有需要的朋友，可以真实v",
    images: [
      "https://picsum.photos/seed/post1-1/400/400",
      "https://picsum.photos/seed/post1-2/400/400",
      "https://picsum.photos/seed/post1-3/400/400",
    ],
    author: "AuxreUXD",
    avatar: "https://picsum.photos/seed/avatar1/100/100",
    time: "2026-03-27T10:30:00",
    likesCount: 528,
    commentsCount: 42,
  },
  {
    id: "post-2",
    type: "large-image",
    title: "公告",
    content: "友友们，我们的新课程上线了，有需要的朋友，可以真实v",
    images: ["https://picsum.photos/seed/post2/800/450"],
    author: "AuxreUXD",
    avatar: "https://picsum.photos/seed/avatar1/100/100",
    time: "2026-03-26T14:20:00",
    likesCount: 342,
    commentsCount: 18,
  },
  {
    id: "h2",
    type: "live",
    title: "金税四期下的企业税务合规指南",
    cover: "https://picsum.photos/seed/live1/400/250",
    category: "八大学院",
    businessTag: "税务合规",
    status: "playback",
    time: "2026-05-17T14:30:00",
  },
  {
    id: "h3",
    type: "policy",
    title: "关于进一步加大增值税期末留抵退税政策实施力度的公告",
    publishYear: "2026",
    content:
      "为进一步支持小微企业和制造业等行业发展，提振市场主体信心，激发市场主体活力，现将进一步加大增值税期末留抵退税政策实施力度有关事项公告如下：一、加大小微企业增值税期末留抵退税政策实施力度...",
    time: "2026-03-26T10:00:00",
    views: "2.4w",
    businessTag: "税收优惠",
  },
  {
    id: "h4",
    type: "hot",
    title: "2026年最新企业所得税汇算清缴指南：这10个易错点千万别踩！",
    content:
      "一年一度的企业所得税汇算清缴又开始了，很多财务人员在填报时容易忽略一些细节，导致多缴税或面临税务风险。本文总结了10个最常见的易错点...",
    cover: "https://picsum.photos/seed/hot1/400/300",
    time: "2026-03-26T14:20:00",
  },
  {
    id: "h5",
    type: "hot",
    title: "重磅！多地税务局发文，严查这类发票，企业财务速看",
    content:
      "近期，多地税务局相继发布通知，将对特定类型的发票进行严格审查。企业财务人员需高度警惕，及时自查自纠，避免因发票问题引发税务稽查...",
    time: "2026-03-25T09:15:00",
    views: "3.1w",
    businessTag: "税务风险",
  },
  {
    id: "post-5",
    type: "text",
    title: "专家解答：出口免税业务进项抵扣咨询",
    content:
      "出口免税不退税的业务，对应的进项税额是否可以抵扣，如果抵扣了账务怎么处理？",
    author: "财税专家",
    avatar: "https://picsum.photos/seed/avatar2/100/100",
    time: "2025-03-12T12:00:00",
    likesCount: 215,
    commentsCount: 34,
  },
];

const AI_RESULT_POSTS: Post[] = [
  {
    id: "ai-a1",
    type: "course",
    title: "高新技术企业认定与研发费用加计扣除实务",
    cover: "https://picsum.photos/seed/course1/400/250",
    category: "财税早餐",
    businessTag: "加计扣除",
    status: "reserve",
    startDate: "04月15日 14:00",
    time: "2026-03-27T09:00:00",
    hidePrice: true,
    duration: "120:00",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "ai-a2",
    type: "course",
    title: "出口退税实务操作全流程解析",
    cover: "https://picsum.photos/seed/course2/400/250",
    category: "八大学院",
    businessTag: "出口退税",
    status: "normal",
    time: "2026-03-25T14:30:00",
    hidePrice: true,
    duration: "95:00",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "ai-a3",
    type: "live",
    title: "专家在线答疑：年底报税常见问题汇总",
    cover: "https://picsum.photos/seed/live2/400/250",
    category: "财税早餐",
    businessTag: "年底报税",
    status: "live",
    time: "2026-05-20T10:00:00",
  },
  {
    id: "ai-a4",
    type: "live",
    title: "新公司法对企业财税的影响及应对策略",
    cover: "https://picsum.photos/seed/live3/400/250",
    category: "八大学院",
    businessTag: "公司法",
    status: "reserve",
    time: "2026-05-21T16:00:00",
  },
  {
    id: "ai-a5",
    type: "event",
    title: "2026年度全国财税高峰论坛 - 深圳站",
    cover: "https://picsum.photos/seed/event1/800/400",
    category: "行业峰会",
    businessTag: "财税前沿",
    status: "enrolling",
    time: "2026-03-24T11:00:00",
  },
  {
    id: "ai-a6",
    type: "event",
    title: "走进标杆企业：华为财务管理之道游学班",
    cover: "https://picsum.photos/seed/event2/800/400",
    category: "游学标杆",
    businessTag: "财务管理",
    status: "past",
    time: "2026-02-10T09:00:00",
  },
  {
    id: "ai-a7",
    type: "vertical-video",
    title: "3分钟看懂：金税四期下，企业如何规避税务风险？",
    cover: "https://picsum.photos/seed/tax_video2/400/600",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "03:15",
    time: "2026-03-27T08:30:00",
  },
  {
    id: "ai-a10",
    type: "case",
    title: "某科技公司研发费用加计扣除税务筹划成功案例",
    content:
      "本案例详细介绍了某高新技术企业如何通过合理归集研发费用，成功申请加计扣除，有效降低企业所得税税负的实操过程...",
    cover: "https://picsum.photos/seed/case1/400/300",
    businessTag: "加计扣除",
    time: "2026-03-20T10:00:00",
  },
  {
    id: "ai-a11",
    type: "case",
    title: "跨国企业转让定价税务风险应对案例分析",
    content:
      "随着反避税调查的深入，跨国企业面临的转让定价税务风险日益增加。本案例剖析了一起典型的转让定价税务调整案件，为企业提供合规建议...",
    businessTag: "转让定价",
    time: "2026-02-15T09:30:00",
    views: "1.5w",
  },
];

const TABS = ["综合", "课程", "直播", "政策", "热点"];
const TAB_ICONS: Record<string, any> = {
  综合: Sparkles,
  课程: BookOpen,
  直播: Video,
  政策: Scale,
  热点: Flame,
};

const LiveTabContent: React.FC<{
  onShareClick: () => void;
  onLiveJoin: () => void;
  onReserve: () => void;
  onTopicClick: (topic: any) => void;
  onStartTest?: () => void;
}> = ({ onShareClick, onLiveJoin, onReserve, onTopicClick, onStartTest }) => {
  const [activeSubTab, setActiveSubTab] = useState("精品专题");
  const [customBg, setCustomBg] = useState<string | null>(() =>
    localStorage.getItem("customBg"),
  );

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCustomBg(base64String);
        localStorage.setItem("customBg", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const previews = [
    {
      id: 1,
      title: "聊聊增值税有哪些重大变化的发展",
      time: "3月17日（星期五）07:00开播",
      image: "https://picsum.photos/seed/live_pre1/200/200",
    },
    {
      id: 2,
      title: "企业所得税汇算清缴要点解析",
      time: "3月20日（星期一）14:00开播",
      image: "https://picsum.photos/seed/live_pre2/200/200",
    },
  ];

  const topics = [
    {
      id: 1,
      title: "财税早餐",
      subtitle: "清晨第一节财税课",
      desc: "每日清晨为您带来最新财税政策解读与实务案例分析，助您快速掌握财税核心要点。",
      tag: "最新财税政策解读",
      image: "https://picsum.photos/seed/topic1/200/200",
      joined: "12345人已加入",
    },
    {
      id: 2,
      title: "税法直通车",
      subtitle: "最新财税政策解读",
      desc: "深度剖析财税实务与案例，全面提升企业税务合规能力，为您答疑解惑。",
      tag: "最新财税政策解读",
      image: "https://picsum.photos/seed/topic2/200/200",
      joined: "12345人已加入",
    },
    {
      id: 3,
      title: "精品大课",
      subtitle: "深度剖析财税实务与案例",
      desc: "聚焦企业税务风险防范，提供全方位的税务筹划与合规指导，打造财税精英。",
      tag: "最新财税政策解读",
      image: "https://picsum.photos/seed/topic3/200/200",
      joined: "12345人已加入",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Live Banner - New Screenshot Style */}
      <section className="px-4 py-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-100/50 flex h-[180px]">
          {/* Left: Image Preview */}
          <div className="relative w-[40%] h-full">
            <img
              src="https://picsum.photos/seed/live_host/400/400"
              className="w-full h-full object-cover"
              alt=""
              referrerPolicy="no-referrer"
            />

            {/* Live Badge */}
            <div className="absolute top-0 left-0 bg-red-600 px-3 py-1.5 rounded-br-xl flex items-center gap-1.5">
              <div className="flex gap-0.5 items-end h-2.5">
                <div className="w-0.5 bg-white animate-[bounce_0.8s_infinite] h-full"></div>
                <div className="w-0.5 bg-white animate-[bounce_0.8s_infinite_0.2s] h-2/3"></div>
                <div className="w-0.5 bg-white animate-[bounce_0.8s_infinite_0.4s] h-1/2"></div>
              </div>
              <span className="text-[11px] text-white font-bold">直播中</span>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 p-5 flex flex-col justify-center">
            <h2 className="text-[16px] font-bold text-gray-900 mb-1.5">
              新用户福利直播
            </h2>
            <p className="text-[13px] text-gray-400 leading-snug mb-4 line-clamp-2">
              小白必看！建筑行业加计扣除/书单推荐/基金避坑理财课靠谱吗？
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-[#E8EDFB] text-[#4F75FF] text-[11px] font-medium rounded-lg">
                加计扣除
              </span>
              <span className="px-3 py-1 bg-[#E8EDFB] text-[#4F75FF] text-[11px] font-medium rounded-lg">
                建筑行业
              </span>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-5 h-1.5 bg-blue-600 rounded-full"></div>
          <div className="w-3 h-1.5 bg-gray-200 rounded-full"></div>
          <div className="w-3 h-1.5 bg-gray-200 rounded-full"></div>
        </div>
      </section>

      {/* Live Previews */}
      <section className="mt-6">
        <div className="px-5 flex justify-between items-center mb-4">
          <h2 className="text-[16px] font-bold text-gray-900">直播预告</h2>
        </div>
        <div className="pl-5 overflow-x-auto no-scrollbar py-2">
          <div className="flex gap-3 pr-5 pb-4">
            {previews.map((item) => (
              <div
                key={item.id}
                className="min-w-[280px] bg-white rounded-xl p-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                  <h3 className="text-[14px] font-medium text-gray-900 line-clamp-2 leading-snug flex-1">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-gray-400">{item.time}</p>
                  <button
                    onClick={onReserve}
                    className="px-4 py-1.5 bg-blue-50 text-[#4F75FF] text-[12px] font-bold rounded-full active:scale-95 transition-transform"
                  >
                    预约
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Tabs */}
      <section className="mt-8">
        <div className="px-5 flex gap-8 border-b border-gray-50">
          <button
            onClick={() => setActiveSubTab("精品专题")}
            className={`pb-3 text-[16px] transition-colors ${activeSubTab === "精品专题" ? "font-bold text-gray-900" : "font-medium text-gray-400"}`}
          >
            精品专题
          </button>
          <button
            onClick={() => setActiveSubTab("我的预约")}
            className={`pb-3 text-[16px] transition-colors ${activeSubTab === "我的预约" ? "font-bold text-gray-900" : "font-medium text-gray-400"}`}
          >
            我的预约
          </button>
        </div>

        <div className="px-4 py-4 space-y-5">
          {activeSubTab === "精品专题" ? (
            topics.map((topic) => (
              <div key={topic.id} className="relative">
                {/* Card Container with Background Image */}
                <div
                  className="w-[calc(100%+10px)] -ml-[5px] h-[200px] bg-no-repeat flex flex-col px-[35px] pt-[30px] pb-[35px] relative rounded-xl overflow-hidden"
                  style={{
                    backgroundImage: `url('${customBg || "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop"}')`,
                    backgroundSize: "100% 100%",
                  }}
                >
                  <div className="flex flex-col h-full justify-between relative z-10">
                    <div className="flex gap-4 items-start">
                      {/* Rectangular Image with Upload Trigger */}
                      <label className="relative w-[72px] h-[90px] rounded-lg overflow-hidden flex-shrink-0 shadow-sm cursor-pointer group/img block">
                        <img
                          src={topic.image}
                          className="w-full h-full object-cover"
                          alt=""
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center">
                          <Camera className="w-5 h-5 text-white" />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleBgUpload}
                        />
                      </label>

                      <div className="flex-1 min-w-0 flex flex-col h-[90px] justify-between py-0.5">
                        <div className="text-[15px] font-bold text-gray-900 leading-snug line-clamp-1">
                          {topic.title}
                        </div>

                        <div className="text-[12px] text-[#99A1AF] leading-snug line-clamp-1">
                          {topic.subtitle}
                        </div>

                        <div className="text-[13px] text-[#626262] leading-snug">
                          {topic.desc}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center">
                        <div className="flex -space-x-2 mr-3">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <img
                              key={i}
                              src={`https://picsum.photos/seed/u${i + topic.id * 10}/40/40`}
                              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                              alt=""
                              referrerPolicy="no-referrer"
                            />
                          ))}
                        </div>
                        <span className="text-[12px] text-gray-400 font-medium">
                          {topic.joined.replace("人已加入", "")}人已加入
                        </span>
                      </div>

                      <button
                        onClick={() => onTopicClick(topic)}
                        className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-[#4F75FF] text-[12px] font-bold rounded-full active:scale-95 transition-transform border border-blue-50 flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        看回放
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="relative pl-6 space-y-8 before:absolute before:left-1 before:top-2 before:bottom-0 before:w-px before:bg-gray-200">
              {/* Timeline Item 1 */}
              <div className="relative">
                <div className="absolute -left-[30px] top-0.5 w-5 h-5 bg-[#F0F2F5] rounded-full flex items-center justify-center z-10">
                  <div className="w-4 h-4 bg-[#0066FF] rounded-full flex items-center justify-center">
                    <Video className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div className="text-[16px] font-bold text-gray-800 mb-3">
                  今日 08:00
                </div>
                <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
                  <div className="relative h-[100px]">
                    <img
                      src="https://picsum.photos/seed/res1/400/200"
                      className="w-full h-full object-cover"
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-[#E57B6B] to-[#C65D9E] px-3 py-1.5 rounded-br-2xl text-[12px] text-white font-medium">
                      财税早餐
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-[15px] font-bold text-gray-900 mb-3">
                      这里编辑一个财税直播的名称
                    </h3>
                    <div className="flex gap-2">
                      <span className="px-2.5 py-1 bg-[#F5F6F8] text-gray-500 text-[12px] rounded-md">
                        加计扣除
                      </span>
                      <span className="px-2.5 py-1 bg-[#F5F6F8] text-gray-500 text-[12px] rounded-md">
                        国央企
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative">
                <div className="absolute -left-[30px] top-0.5 w-5 h-5 bg-[#F0F2F5] rounded-full flex items-center justify-center z-10">
                  <div className="w-4 h-4 bg-[#0066FF] rounded-full flex items-center justify-center">
                    <Video className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div className="text-[16px] font-bold text-gray-800 mb-3">
                  今日 19:00
                </div>
                <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
                  <div className="relative h-[100px]">
                    <img
                      src="https://picsum.photos/seed/res2/400/200"
                      className="w-full h-full object-cover"
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-[#8B3DFF] to-[#5B24E6] px-3 py-1.5 rounded-br-2xl text-[12px] text-white font-medium">
                      税法直通车
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-[15px] font-bold text-gray-900 mb-3">
                      这里编辑一个财税直播的名称
                    </h3>
                    <div className="flex gap-2">
                      <span className="px-2.5 py-1 bg-[#F5F6F8] text-gray-500 text-[12px] rounded-md">
                        加计扣除
                      </span>
                      <span className="px-2.5 py-1 bg-[#F5F6F8] text-gray-500 text-[12px] rounded-md">
                        国央企
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const LiveConfirmModal: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ onConfirm, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-[24px] w-full max-w-[300px] overflow-hidden shadow-2xl"
      >
        <div className="p-6 text-center">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-7 h-7 text-blue-500" />
          </div>
          <h3 className="text-[17px] font-bold text-gray-900 mb-2">
            外部平台跳转提示
          </h3>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            即将离开“大成方略”，前往第三方直播平台观看直播。
          </p>
        </div>
        <div className="flex border-t border-gray-100">
          <button
            onClick={onCancel}
            className="flex-1 py-3.5 text-[15px] font-medium text-gray-500 border-r border-gray-100 active:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3.5 text-[15px] font-bold text-blue-600 active:bg-gray-50 transition-colors"
          >
            确认前往
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ReserveConfirmModal: React.FC<{
  post: Post;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ post, onConfirm, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-[24px] w-full max-w-[300px] overflow-hidden shadow-2xl"
      >
        <div className="p-6 text-center">
          <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-7 h-7 text-orange-500" />
          </div>
          <h3 className="text-[17px] font-bold text-gray-900 mb-2">
            预约直播确认
          </h3>
          <p className="text-[13px] text-gray-500 leading-relaxed mb-3">
            您确定要预约此直播吗？
          </p>
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100/80 text-left">
            <p className="text-[13px] font-bold text-gray-800 line-clamp-2 leading-snug">
              {post.title}
            </p>
          </div>
        </div>
        <div className="flex border-t border-gray-100">
          <button
            onClick={onCancel}
            className="flex-1 py-3.5 text-[15px] font-medium text-gray-500 border-r border-gray-100 active:bg-gray-50 transition-colors"
          >
            暂不预约
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3.5 text-[15px] font-bold text-orange-600 active:bg-gray-50 transition-colors"
          >
            确认预约
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AIShareModal: React.FC<{
  onClose: () => void;
  onImageShare: () => void;
  onLinkShare: () => void;
}> = ({ onClose, onImageShare, onLinkShare }) => {
  const shareOptions = [
    {
      icon: (
        <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
          <ImageIcon className="w-8 h-8" />
        </div>
      ),
      label: "图片分享",
      action: onImageShare,
    },
    {
      icon: (
        <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-600 shadow-sm">
          <Link className="w-8 h-8" />
        </div>
      ),
      label: "链接分享",
      action: onLinkShare,
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 z-[210] bg-black/40 backdrop-blur-[2px]"
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="absolute left-0 right-0 bottom-0 z-[220] bg-[#F7F7F7] rounded-t-[32px] overflow-hidden pb-12 shadow-[0_-8px_30px_rgba(0,0,0,0.1)]"
      >
        <div className="px-6 py-8">
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
            {shareOptions.map((opt, i) => (
              <div
                key={i}
                onClick={opt.action}
                className="flex flex-col items-center gap-2.5 min-w-[72px] active:scale-95 transition-transform cursor-pointer"
              >
                {opt.icon}
                <span className="text-[12px] text-gray-500 font-medium">
                  {opt.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6">
          <button
            onClick={onClose}
            className="w-full py-4 bg-white rounded-2xl text-[16px] font-bold text-gray-800 active:bg-gray-50 transition-colors shadow-sm"
          >
            取消
          </button>
        </div>
      </motion.div>
    </>
  );
};

const ShareModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const shareOptions = [
    {
      icon: (
        <div className="w-14 h-14 bg-[#07C160] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-100">
          <MessageCircle className="w-8 h-8 fill-white" />
        </div>
      ),
      label: "微信好友",
    },
    {
      icon: (
        <div className="w-14 h-14 bg-[#07C160] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-100">
          <Zap className="w-8 h-8 fill-white" />
        </div>
      ),
      label: "朋友圈",
    },
    {
      icon: (
        <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-600 shadow-sm">
          <Link className="w-8 h-8" />
        </div>
      ),
      label: "复制链接",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 z-[210] bg-black/40 backdrop-blur-[2px]"
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="absolute left-0 right-0 bottom-0 z-[220] bg-[#F7F7F7] rounded-t-[32px] overflow-hidden pb-12 shadow-[0_-8px_30px_rgba(0,0,0,0.1)]"
      >
        <div className="px-6 py-8">
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
            {shareOptions.map((opt, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2.5 min-w-[72px] active:scale-95 transition-transform cursor-pointer"
                onClick={() => {
                  if (opt.label === "复制链接") {
                    alert("链接复制成功");
                  }
                  onClose();
                }}
              >
                {opt.icon}
                <span className="text-[12px] text-gray-500 font-medium">
                  {opt.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6">
          <button
            onClick={onClose}
            className="w-full py-4 bg-white rounded-2xl text-[16px] font-bold text-gray-800 active:bg-gray-50 transition-colors shadow-sm"
          >
            取消
          </button>
        </div>
      </motion.div>
    </>
  );
};

const ImageShareModal: React.FC<{
  onClose: () => void;
  onAction: (action: string) => void;
}> = ({ onClose, onAction }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 z-[230] bg-black/60 backdrop-blur-[2px]"
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="absolute left-0 right-0 bottom-0 z-[240] bg-[#F7F7F7] rounded-t-[32px] overflow-hidden pb-12 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] flex flex-col pt-4"
      >
        <div className="p-6 flex-1 overflow-y-auto flex flex-col items-center">
          {/* Image Preview Card */}
          <div className="w-full max-w-[280px] bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 p-5 flex items-end">
              <h3 className="text-white font-bold text-xl leading-tight tracking-wide">
                大成方略
                <br />
                财税智能解析
              </h3>
            </div>
            <div className="p-5">
              <p className="text-gray-800 text-sm font-medium mb-3">
                为您推荐的财税知识
              </p>
              <div className="w-full h-24 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 text-xs border border-gray-100">
                [内容预览]
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-[10px] font-bold">
                      大成
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    长按识别小程序码
                  </span>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-md border border-gray-200"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 w-full max-w-[320px] justify-items-center">
            {[
              {
                icon: <MessageCircle className="w-5 h-5 text-emerald-500" />,
                label: "微信好友",
              },
              { icon: <Share2 className="w-5 h-5 text-green-500" />, label: "朋友圈" },
              { icon: <Star className="w-5 h-5 text-orange-400" />, label: "收藏" },
              { icon: <Download className="w-5 h-5 text-blue-500" />, label: "下载" },
            ].map((opt, i) => (
              <div
                key={i}
                onClick={() => onAction(opt.label)}
                className="flex flex-col items-center gap-2 min-w-[60px] active:scale-95 transition-transform cursor-pointer"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {opt.icon}
                </div>
                <span className="text-[11px] text-gray-600 text-center font-medium">{opt.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 pt-2">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-white rounded-2xl text-[15px] font-bold text-gray-800 active:bg-gray-50 transition-colors shadow-sm"
          >
            取消
          </button>
        </div>
      </motion.div>
    </>
  );
};

export const SearchHistory = ({
  onClose,
  onSearch,
}: {
  onClose: () => void;
  onSearch: (query: string) => void;
}) => {
  const history = [
    "增值税加计抵减",
    "高新技术企业认定",
    "研发费用加计扣除",
    "个人所得税汇算清缴",
    "金税四期",
    "印花税法",
    "留抵退税",
    "社保降费",
    "数电票",
    "专精特新",
    "企业所得税",
    "个人所得税",
    "增值税",
    "消费税",
    "附加税",
    "印花税",
    "契税",
    "土地增值税",
    "房产税",
    "车船税",
    "城镇土地使用税",
    "耕地占用税",
  ];

  const hotSearches = [
    "2026年加计扣除最近税法",
    "青岛AI财税峰会",
    "出口免税不退税的课程",
    "企业所得税汇算清缴怎么做",
    "新公司法对财税的影响",
    "金税四期下如何应对税务稽查",
  ];

  const handleSearch = (q: string) => {
    onSearch(q);
  };

  return (
    <div className="absolute inset-0 bg-white z-[100] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Search Header */}
      <div className="px-4 pt-5 pb-4 flex items-center gap-3 border-b border-gray-50">
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            autoFocus
            type="text"
            placeholder="搜索课程、政策或财税问题"
            onKeyDown={(e) =>
              e.key === "Enter" && handleSearch(e.currentTarget.value)
            }
            className="w-full h-9 bg-gray-100 rounded-full pl-9 pr-4 text-[14px] focus:outline-none"
          />
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* History Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[18px] font-bold text-gray-800">历史记录</h2>
            <Trash2 className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />
          </div>
          <div className="flex flex-wrap gap-2">
            {history.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSearch(item)}
                className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-lg group cursor-pointer active:scale-95 transition-transform"
              >
                <span className="text-[13px] text-gray-600">{item}</span>
                <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchResults = ({
  query,
  onClose,
  onClear,
  onShareClick,
  onAIShareClick,
  onChatClick,
  onFilterClick,
  onRemoveFilter,
  allSelectedFilters = [],
  visible = true,
  onPostClick,
  initialTab,
}: {
  query: string;
  onClose: () => void;
  onClear: () => void;
  onShareClick: () => void;
  onAIShareClick: () => void;
  onChatClick: (query: string, answer: string) => void;
  onFilterClick: () => void;
  onRemoveFilter: (type: string, value: string) => void;
  allSelectedFilters?: { type: string; value: string }[];
  visible?: boolean;
  onPostClick?: (post: Post) => void;
  initialTab?: string;
}) => {
  const [activeTab, setActiveTab] = useState(initialTab || "综合");

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const [isGenerating, setIsGenerating] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string>("");
  const [showTabFilter, setShowTabFilter] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabs = ["综合", "课程", "问答", "视频"];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 10);
    setShowScrollTop(e.currentTarget.scrollTop > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const generateAnswer = async () => {
      if (!query.trim()) {
        setAiAnswer("请输入您的问题。");
        setIsGenerating(false);
        return;
      }

      setIsGenerating(true);
      console.log("Starting AI generation for query:", query);

      try {
        await new Promise((resolve) => setTimeout(resolve, 150));

        const mockAnswers: Record<string, string> = {
          进项税额转出:
            "### 进项税额转出核心要点\n\n**1. 适用情形**\n已抵扣进项税额的购进货物、劳务、服务等，如果发生以下情况，需要作进项税额转出：\n*   用于简易计税方法计税项目、免征增值税项目、集体福利或者个人消费。\n*   非正常损失（如管理不善导致的被盗、丢失、霉烂变质，以及因违反法律法规造成货物被依法没收、销毁、拆除的情形）。\n*   购进货物、设计服务、建筑服务用于免税项目等。\n*   因违规造成的非正常损失，不仅进项税额需要转出，相关的损失在企业所得税税前扣除时也可能面临更严格的审查。\n\n**2. 会计分录**\n借：相关成本/费用/损失科目（如：应付职工薪酬、待处理财产损溢、主营业务成本等）\n  贷：应交税费——应交增值税（进项税额转出）\n\n**3. 实务风险提示**\n*   **准确界定“非正常损失”：** 自然灾害造成的损失不属于非正常损失，无需作进项税额转出。\n*   **转出金额计算：** 需准确计算应转出的进项税额，特别是涉及固定资产、无形资产等按净值计算转出的情况。\n*   **时间节点：** 发生上述情形的当期就应当进行转出处理，避免滞后引发税务稽查风险。\n*   **发票管理：** 进项税额转出后，原抵扣的增值税专用发票应妥善保管，作为备查资料。如果在后续业务中改变用途（如从免税项目转为应税项目），符合条件的还可以按规定再次抵扣。\n\n**4. 常见误区**\n许多企业在发放员工福利时，直接将外购商品作为福利发放，忘记做进项税额转出，这是税务稽查的重点关注领域。建议企业在采购环节就明确用途，规范财务核算。",
          研发费用加计扣除:
            "### 研发费用加计扣除核心要点\n\n**1. 政策概述**\n企业开展研发活动中实际发生的研发费用，未形成无形资产计入当期损益的，在按规定据实扣除的基础上，再按照实际发生额的100%在税前加计扣除；形成无形资产的，按照无形资产成本的200%在税前摊销（具体比例根据最新政策和企业类型可能有所不同，如科技型中小企业等）。\n\n**2. 核心流程**\n*   **项目立项：** 确保研发项目符合相关规定，并取得立项决议等证明文件。立项报告应详细说明研发目标、技术路线、创新点及预期成果。\n*   **费用归集：** 准确归集研发费用，建立研发费用辅助账，严格区分研发与生产费用。建议采用专账管理，确保账目清晰可查。\n*   **申报享受：** 在企业所得税汇算清缴时，填报相关申报表享受加计扣除优惠。可选择在预缴时享受或在年度汇算清缴时统一享受。\n\n**3. 实务风险提示**\n*   **研发活动界定：** 严格区分常规性升级与实质性研发活动，避免将非研发费用混入。单纯的工艺改进或产品外观设计通常不符合加计扣除条件。\n*   **备查资料：** 妥善留存研发项目立项文件、研发人员名单、研发费用辅助账等备查资料，以应对税务检查。资料的完整性和逻辑一致性是税务核查的重点。\n*   **人员工时分配：** 研发人员同时从事非研发活动的，需合理分配工时，否则相关薪酬不得加计扣除。建议引入工时打卡系统或详细的工时记录表。\n\n**4. 联合审查机制**\n目前税务部门常与科技部门开展联合审查，对研发项目的真实性和技术先进性进行实质性鉴定。企业应确保研发活动不仅在财务上合规，在技术层面也经得起推敲。",
        };

        let answer =
          "**1. 政策依据**\n根据现行财税法规，企业在处理相关业务时需严格遵循相关规定，确保合规。最新出台的《关于深化税收征管改革的意见》也强调了规范化管理的重要性，企业应密切关注政策动向。\n\n**2. 实务操作建议**\n建议您在实际操作中，结合企业自身情况，完善内部审批流程，并保留好相关凭证和备查资料。特别是跨区域经营的企业，更应注意各地税务局的具体执行口径差异，提前做好沟通与备案。\n\n**3. 潜在风险提示**\n请注意防范税务风险，特别是涉及发票开具、费用扣除等环节，务必确保业务真实、票据合法。一旦发生虚开发票或违规扣除，不仅面临补税罚款，还可能影响企业的纳税信用评级（如降为C级或D级），进而影响企业的融资和招投标。\n\n**4. 应对策略**\n建议企业定期开展税务健康检查，引入专业的第三方财税服务机构进行合规性评估，建立健全税务风险预警机制，防患于未然。同时，加强财务人员的业务培训，提升团队的整体税务合规意识。";

        for (const key in mockAnswers) {
          if (query.includes(key)) {
            answer = mockAnswers[key];
            break;
          }
        }

        setAiAnswer(answer);
      } catch (error) {
        console.error("AI Generation failed:", error);
        setAiAnswer(
          "抱歉，AI解答暂时不可用。请参考下方搜索结果或咨询人工客服。",
        );
      } finally {
        console.log("AI generation process finished.");
        setIsGenerating(false);
      }
    };

    generateAnswer();
  }, [query]);

  // Derive results
  const journalPosts: Post[] = MOCK_JOURNALS.map((j) => ({
    id: j.id,
    type: "publication",
    title: j.title,
    content: j.description,
    cover: j.coverUrl,
    views: j.readCount,
    time: j.date,
    businessTag:
      j.type === "weekly" ? "周刊" : j.type === "monthly" ? "月刊" : "季刊",
  }));

  const allResults = [
    ...HOME_POSTS,
    ...journalPosts,
    ...(typeof AI_RESULT_POSTS !== "undefined" ? AI_RESULT_POSTS : []),
  ].filter((post) => post.type !== "live" && post.status !== "playback");
  let displayedResults = allResults.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      (p.content && p.content.toLowerCase().includes(query.toLowerCase())),
  );

  if (activeTab === "综合") {
    displayedResults = displayedResults.filter((p) =>
      ["course", "text", "hot", "case", "video", "vertical-video"].includes(
        p.type,
      ),
    );
  } else if (activeTab === "视频") {
    displayedResults = displayedResults.filter((p) =>
      ["video", "vertical-video"].includes(p.type),
    );
  } else if (activeTab === "课程") {
    displayedResults = displayedResults.filter((p) => p.type === "course");
  } else if (activeTab === "问答") {
    displayedResults = displayedResults.filter((p) =>
      ["text", "hot", "case"].includes(p.type),
    );
  }

  return (
    <div
      className={`absolute inset-0 bg-white z-[110] flex flex-col animate-in fade-in slide-in-from-right-4 duration-300 ${!visible ? "hidden" : ""}`}
    >
      {/* Search Header */}
      <div className="px-4 pt-5 pb-2 flex items-center gap-3">
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            readOnly
            type="text"
            value={query}
            className="w-full h-9 bg-gray-100 rounded-full pl-9 pr-10 text-[14px] focus:outline-none"
          />
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Tabs - Sticky Header Style */}
      <div
        className={`bg-white transition-shadow duration-300 relative z-20 ${scrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.02)]" : ""}`}
      >
        <div className="flex items-center px-4">
          <div className="flex-1 flex gap-6 overflow-x-auto no-scrollbar py-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[15px] whitespace-nowrap relative ${
                  activeTab === tab
                    ? "text-blue-600 font-bold"
                    : "text-gray-500"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Filters Tags (Independent Row) */}
        {allSelectedFilters.length > 0 && (
          <div className="px-4 py-2 flex flex-wrap gap-2">
            {allSelectedFilters.map((filter, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-lg text-[12px] text-gray-600 border border-white/50 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                {filter.value}
                <X
                  className="w-3 h-3 cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => onRemoveFilter(filter.type, filter.value)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Fixed Padding below tabs */}
        <div className="h-4 bg-white w-full"></div>
        <div className="border-b border-gray-50 mx-4"></div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto bg-gray-50/50 no-scrollbar"
      >
        {/* AI Answer Section - Cleaned up shadows and refined mask */}
        {activeTab === "综合" && (
          <div className="bg-white p-6 relative z-10">
            {/* Subtle AI Answer Title */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[13px] font-medium tracking-wide transition-colors duration-500 ${isGenerating ? "text-blue-500" : "text-gray-500"}`}
                >
                  {isGenerating ? "AI正在思考中..." : "AI智能解答"}
                </span>
                {isGenerating && (
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`relative transition-all duration-700 ease-in-out ${isExpanded ? "max-h-[5000px]" : "max-h-[300px] overflow-hidden"}`}
            >
              <div
                className={`text-[15px] text-gray-900 font-medium leading-relaxed space-y-4 transition-opacity duration-700 ${isGenerating ? "opacity-40" : "opacity-100"}`}
              >
                {isGenerating ? (
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse"></div>
                  </div>
                ) : (
                  <div className="markdown-body">
                    <ReactMarkdown>{aiAnswer}</ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Action Buttons - Only visible when expanded */}
              {!isGenerating && aiAnswer && isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-30 flex items-center justify-end mt-6 pt-5 border-t border-gray-100 pb-2"
                >
                  <span className="text-[11px] text-gray-400 font-medium">
                    AI生成请仔细甄别
                  </span>
                </motion.div>
              )}

              {/* Gradient Mask - Starts from the last line (approx. 48px height) */}
              {!isExpanded && !isGenerating && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/95 via-white/60 to-transparent pointer-events-none z-10"></div>
              )}
            </div>

            {/* Expand More Button - Positioned to overlap with gradient middle */}
            <div
              className={`relative flex justify-center z-20 pointer-events-none ${isExpanded ? "mt-4 -mb-2" : "-mt-6 -mb-6"}`}
            >
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="pointer-events-auto group relative px-5 py-1.5 bg-white border border-gray-100 rounded-full text-[13px] text-gray-500 shadow-[0_4px_12px_rgba(0,0,0,0.06)] flex items-center gap-1.5 active:scale-95 transition-all hover:border-gray-200"
              >
                <span className="relative z-10">
                  {isExpanded ? "收起" : "展开"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 relative z-10 transition-transform duration-300 ${isExpanded ? "rotate-180" : "group-hover:translate-y-0.5"}`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Results List - Direct transition from AI section */}
        <div className="pt-4 pb-10 px-4 relative z-0">
          {displayedResults.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={onPostClick}
              onShareClick={onShareClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CollectButton = ({ className = "" }: { className?: string }) => {
  const [isCollected, setIsCollected] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCollected(!isCollected);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-1.5 transition-all active:scale-90 ${className} ${isCollected ? "text-yellow-500" : "text-gray-400"}`}
    >
      <Star
        className={`w-4.5 h-4.5 transition-all ${isCollected ? "fill-yellow-500 text-yellow-500" : ""}`}
      />
    </button>
  );
};

const QuickActionIcon = ({
  icon: Icon,
  label,
  colorClass,
  glowColor,
  shadowClass,
  onClick,
}: {
  icon: any;
  label: string;
  colorClass: string;
  glowColor: string;
  shadowClass: string;
  onClick: () => void;
}) => (
  <div
    className="flex flex-col items-center w-[60px] bg-gradient-to-b from-white/5 from-[30%] via-white via-[60%] to-white rounded-[30px] pt-1.5 pb-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer group transform active:scale-95 transition-all duration-200"
    onClick={onClick}
  >
    <div className="relative mt-1 flex flex-col items-center w-[38px]">
      {/* 投影块复刻：同色色块、不模糊、不偏太多、有一点扩散 */}
      <div
        className={`absolute -top-[6px] -left-[1px] w-[34px] h-[30px] ${glowColor} opacity-[0.3] blur-[0.5px] rounded-[10px] group-hover:opacity-[0.4] transition-opacity`}
      ></div>
      {/* 圆角矩形图标主体 */}
      <div
        className={`relative w-[38px] h-[32px] ${colorClass} rounded-[12px] flex items-center justify-center z-10`}
      >
        <Icon
          className="w-[17px] h-[17px] text-white/90 drop-shadow-[0_1px_1.5px_rgba(255,255,255,0.4)]"
          fill="currentColor"
          strokeWidth={0}
        />
      </div>
    </div>
    <span className="text-[12px] font-bold text-gray-500/90 tracking-wider mt-[10px]">
      {label}
    </span>
  </div>
);

// Video element wrapper to handle visibility-based playback
const VisibilityVideo = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.6 }, // Play when 60% visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      muted
      loop
      playsInline
    />
  );
};

const formatPublishTime = (timeString?: string) => {
  if (!timeString) return "";
  const date = new Date(timeString);
  if (isNaN(date.getTime())) return timeString;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  const isSameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();

  if (isSameDay) {
    if (diffMs >= 0) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      if (diffMins < 60) {
        return `${Math.max(1, diffMins)}分钟前`;
      } else if (diffHours < 24) {
        return `${diffHours}小时前`;
      }
    }
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")} 发布`;
  } else if (isYesterday) {
    return "昨天";
  } else if (date.getFullYear() === now.getFullYear()) {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  } else {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }
};

const PostCard: React.FC<{
  post: Post;
  onShareClick?: () => void;
  onReserve?: (post: Post) => void;
  onLiveJoin?: (post: Post) => void;
  onEnroll?: (post: Post) => void;
  onClick?: (post: Post) => void;
}> = ({ post, onShareClick, onReserve, onLiveJoin, onEnroll, onClick }) => {
  // Metadata Helper
  const PostMeta = () => (
    <div className="flex justify-between items-center text-[11px] text-gray-400 mt-2.5 w-full">
      <div className="opacity-80">{formatPublishTime(post.time)}</div>
      <div className="flex items-center gap-1.5 opacity-80">
        <Eye className="w-3 h-3" />
        <span>{post.views || "1.2w"} 浏览</span>
      </div>
    </div>
  );

  // Dynamic content strategy:
  // 1. Title 1 line -> Content up to 2 lines
  // 2. Title 2 lines -> Content up to 1 line
  // 3. Title 3 lines -> Content 0 lines (hidden)
  const contentClamp = "line-clamp-1";

  return (
    <div
      className="bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] mb-4 border border-gray-100/30 transition-all active:scale-[0.98] cursor-pointer hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)]"
      onClick={() => onClick?.(post)}
    >
      <div className="flex flex-col gap-3">
        {/* 1. 课程 & 视频 & 直播 & 活动: 标题在上内容在下 */}
        {(post.type === "course" ||
          post.type === "video" ||
          post.type === "vertical-video" ||
          post.type === "live" ||
          post.type === "event") && (
          <div className="flex flex-col gap-3">
            <div className="min-h-0">
              <h3 className="text-[16px] font-bold text-gray-900 leading-snug line-clamp-2">
                {post.title}
              </h3>
              {post.content && post.type !== "video" && post.type !== "vertical-video" && (
                <p
                  className={`text-gray-500 text-[13px] leading-relaxed ${contentClamp} mt-1`}
                >
                  {post.content}
                </p>
              )}
            </div>
            {(post.cover || (post.images && post.images[0])) && (
              <div className="flex justify-start">
                <div
                  className={`relative rounded-xl overflow-hidden bg-gray-50 shadow-sm group transition-all ${
                    post.type === "vertical-video"
                      ? "aspect-[3/4] h-[200px]"
                      : "aspect-video w-full"
                  }`}
                >
                  {(post.type === "video" || post.type === "vertical-video") &&
                  post.videoUrl ? (
                    <VisibilityVideo
                      src={post.videoUrl}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={post.cover || (post.images && post.images[0])}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {/* Overlays */}
                  {(post.type === "video" ||
                    post.type === "vertical-video" ||
                    post.type === "course") && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                        <PlayCircle className="w-12 h-12 text-white/90 drop-shadow-lg opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                      {post.type === "course" && (
                        <div className="absolute top-2.5 left-2.5 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                          课程
                        </div>
                      )}
                    </>
                  )}
                  {post.duration &&
                    (post.type === "course" ||
                      post.type === "video" ||
                      post.type === "vertical-video") && (
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {post.duration}
                      </div>
                    )}
                  {post.type === "event" && (
                    <>
                      <div className="absolute top-2.5 left-2.5 bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                        活动
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 text-[10px] text-white z-10 font-bold">
                        <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.startDate || "6月13～6月15日"}
                        </div>
                        {post.location && (
                          <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {post.location}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {post.type === "live" && post.status === "live" && (
                    <div className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      直播中
                    </div>
                  )}
                </div>
              </div>
            )}
            {post.type === "course" && post.price && !post.hidePrice && (
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-[12px] font-bold text-red-500">¥</span>
                  <span className="text-[18px] font-black text-red-500">
                    {post.price}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. 期刊 & 政策 & 音频: 封面在左侧(小)、标题在右侧 */}
        {(post.type === "publication" ||
          post.type === "policy" ||
          post.type === "audio") && (
          <div className="flex gap-4">
            {post.cover && (
              <div className="relative shrink-0 w-[64px] h-[88px] rounded shadow-[2px_4px_12px_rgba(0,0,0,0.08)] overflow-hidden bg-white border border-gray-100 flex items-center justify-center">
                <img
                  src={post.cover}
                  className="w-full h-full object-cover"
                  alt=""
                  referrerPolicy="no-referrer"
                />
                {post.type === "publication" && (
                  <>
                    <div className="absolute inset-y-0 left-0 w-[3px] bg-black/5"></div>
                    <div className="absolute inset-y-0 left-[3px] w-[0.5px] bg-white/30"></div>
                    <div className="absolute top-1 left-1.5 z-20">
                      <div className="px-1 py-0.5 rounded-[2px] bg-[#1a3673]/80 backdrop-blur-[2px] border border-white/20">
                        <span className="text-[8px] font-bold text-white scale-90 inline-block">
                          {post.businessTag}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                {post.type === "audio" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Headphones className="w-6 h-6 text-white/90 drop-shadow-md" />
                  </div>
                )}
              </div>
            )}
            <div className="flex-1 flex flex-col min-w-0">
              <h3 className="text-[15px] font-bold text-gray-900 leading-snug line-clamp-2">
                {post.title}
              </h3>
              <p
                className={`text-[12px] text-gray-500 leading-relaxed ${contentClamp} mt-0.5`}
              >
                {post.content}
              </p>
            </div>
          </div>
        )}

        {/* 3. 文章(纯文本): 标题在上(2), 正文下(2) -> Dynamic */}
        {post.type === "text" && (
          <div className="flex flex-col">
            <h3 className="text-[16px] font-bold text-gray-900 leading-snug line-clamp-2">
              {post.title || post.content}
            </h3>
            {post.title && post.content && (
              <p
                className={`text-gray-500 text-[14px] leading-relaxed ${contentClamp} mt-1`}
              >
                {post.content}
              </p>
            )}
          </div>
        )}

        {/* 4. 文章(多图文): 标题在上(2), 正文动态展示, 正文下方多图(Max 3) */}
        {(post.type === "multi-image" || post.type === "news-multi-image") && (
          <div className="flex flex-col">
            <div className="mb-3">
              <h3 className="text-[16px] font-bold text-gray-900 leading-snug line-clamp-2">
                {post.title}
              </h3>
              {post.content && (
                <p
                  className={`text-gray-500 text-[14px] leading-relaxed ${contentClamp} mt-1`}
                >
                  {post.content}
                </p>
              )}
            </div>
            {post.images && post.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {post.images.slice(0, 3).map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-100/50 shadow-sm"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. 文章(单图文): 图片在下方大图 */}
        {(post.type === "single-image" ||
          post.type === "hot" ||
          post.type === "case" ||
          post.type === "large-image") && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <h3 className="text-[16px] font-bold text-gray-900 leading-snug line-clamp-2">
                {post.title}
              </h3>
              {post.content && (
                <p
                  className={`text-gray-500 text-[13px] leading-relaxed ${contentClamp} mt-1`}
                >
                  {post.content}
                </p>
              )}
            </div>
            {(post.cover || (post.images && post.images[0])) && (
              <div className="w-full aspect-[2.4/1] rounded-xl overflow-hidden bg-gray-50 border border-gray-100/50 shadow-sm">
                <img
                  src={post.cover || (post.images && post.images[0])}
                  className="w-full h-full object-cover"
                  alt=""
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>
        )}
        <PostMeta />
      </div>
    </div>
  );
};

const TeacherDetailPage = ({
  teacher,
  onClose,
  onCourseClick,
}: {
  teacher: any;
  onClose: () => void;
  onCourseClick: (course: any) => void;
}) => {
  const [activeCategory, setActiveCategory] = useState("全部课程");
  const [activeFilter, setActiveFilter] = useState("综合排序");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const categories = ["全部课程", "税务合规", "财务分析", "职场考证"];
  const filters = ["综合排序", "最新发布", "最多播放", "评分最高"];

  return (
    <div className="absolute inset-0 bg-gray-50 z-[100] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 border-b border-gray-100">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-[17px] text-gray-900">讲师详情</span>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Teacher Info Card */}
        <div className="bg-white p-6 mb-2">
          <div className="flex items-start gap-4">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-gray-50"
            />
            <div className="flex-1">
              <h2 className="text-[20px] font-bold text-gray-900 mb-1">
                {teacher.name}
              </h2>
              <p className="text-[13px] text-gray-600 mb-2 font-medium">
                {teacher.company} · {teacher.title}
              </p>
              <div className="flex gap-4 text-[12px] text-gray-500">
                <span className="bg-gray-50 px-2 py-0.5 rounded">
                  <span className="font-bold text-gray-700 mr-1">
                    {teacher.coursesCount}
                  </span>
                  门课程
                </span>
                <span className="bg-gray-50 px-2 py-0.5 rounded">
                  <span className="font-bold text-gray-700 mr-1">
                    {teacher.students}
                  </span>
                  学员
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Categories */}
        <div className="bg-white sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 border-b border-gray-100">
            <div className="flex gap-5 overflow-x-auto no-scrollbar py-3 relative flex-1 mr-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[14px] whitespace-nowrap transition-colors relative ${
                    activeCategory === cat
                      ? "text-blue-600 font-bold"
                      : "text-gray-600"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="teacherCat"
                      className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-blue-600 rounded-t-full"
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 pl-3 border-l border-gray-100 py-2 shrink-0">
              <Search
                className={`w-[18px] h-[18px] cursor-pointer transition-colors ${
                  isSearching ? "text-blue-600" : "text-gray-600"
                }`}
                onClick={() => setIsSearching(!isSearching)}
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center transition-colors ${
                  showFilters || activeFilter !== "综合排序"
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <Filter className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="absolute top-full left-0 right-0 bg-white shadow-[0_12px_24px_rgba(0,0,0,0.08)] border-b border-gray-100 overflow-hidden"
              >
                <div className="flex bg-gray-50/50">
                  <div className="w-[100px] border-r border-gray-100 bg-gray-50 flex flex-col py-2">
                    <button className="px-4 py-3 text-[13px] font-bold text-blue-600 bg-white relative">
                      分类筛选
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-blue-600 rounded-r-full" />
                    </button>
                    <button className="px-4 py-3 text-[13px] text-gray-600 text-left">
                      课程阶段
                    </button>
                  </div>
                  <div className="flex-1 p-5 space-y-6 bg-white min-h-[300px]">
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-900 mb-3">
                        课程分类
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              setActiveCategory(cat);
                            }}
                            className={`px-4 py-1.5 rounded-full text-[12px] transition-colors shadow-sm ${
                              activeCategory === cat
                                ? "bg-blue-600 text-white font-medium border border-blue-600"
                                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-900 mb-3">
                        课程阶段
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {["初级", "中级", "高级"].map((stage) => (
                          <button
                            key={stage}
                            className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-full text-[12px] transition-colors shadow-sm"
                          >
                            {stage}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-900 mb-3">
                        排序方式
                      </h4>
                      <div className="flex gap-2.5 flex-wrap">
                        {filters.map((f) => (
                          <button
                            key={f}
                            onClick={() => {
                              setActiveFilter(f);
                            }}
                            className={`px-4 py-1.5 rounded-full text-[12px] transition-colors shadow-sm ${
                              activeFilter === f
                                ? "bg-blue-600 text-white font-medium border border-blue-600"
                                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border-t border-gray-100 bg-white">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 h-10 rounded-full border border-gray-200 text-[13px] font-medium text-gray-700"
                  >
                    重置
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-[2] h-10 rounded-full bg-blue-600 text-[13px] font-medium text-white shadow-lg shadow-blue-600/20"
                  >
                    查看课程
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Course List */}
        <div className="p-4 flex flex-col gap-3 pb-safe">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white p-3 rounded-2xl flex gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-gray-50 cursor-pointer active:scale-[0.98] transition-transform"
              onClick={() =>
                onCourseClick({
                  id: "c" + i,
                  title: `${teacher.name}的精选 ${activeCategory} 课程 ${i}`,
                  teacher: teacher.name,
                  price: null,
                  students: 1200 + i * 300,
                  cover: `https://picsum.photos/seed/tc${i}/400/250`,
                })
              }
            >
              <div className="relative w-[130px] h-[82px] rounded-xl overflow-hidden shrink-0 bg-gray-100">
                <img
                  src={`https://picsum.photos/seed/tc${i}/400/250`}
                  className="w-full h-full object-cover"
                  alt="cover"
                />
                <div className="absolute bottom-1.5 right-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                  12课时
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                <h3 className="text-[14px] font-bold text-gray-900 line-clamp-2 leading-snug">
                  【深度精讲】最新税收政策解读与实操指南（第{i}期）
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    <User className="w-3 h-3" />
                    <span>{1200 + i * 300}人在学</span>
                  </div>
                  {i === 1 ? (
                    <span className="text-[13px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                      免费试听
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search View Overlay */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 bg-white z-[200] flex flex-col pt-2"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 mt-10">
              <button
                onClick={() => {
                  setIsSearching(false);
                  setSearchQuery("");
                }}
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2 h-9">
                <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="搜索课程名称"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-[13px] placeholder:text-gray-400 min-w-0"
                  autoFocus
                />
                {searchQuery && (
                  <X
                    className="w-4 h-4 text-gray-400 cursor-pointer shrink-0 ml-2"
                    onClick={() => setSearchQuery("")}
                  />
                )}
              </div>
              <button
                className="text-[14px] text-blue-600 font-medium"
                onClick={() => setIsSearching(false)}
              >
                搜索
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
              {!searchQuery ? (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-[14px] text-gray-900">
                      搜索历史
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["税务合规", "财务分析", "最新实操"].map((item) => (
                      <span
                        key={item}
                        className="bg-white border border-gray-100 px-3 py-1.5 rounded-full text-[12px] text-gray-600 cursor-pointer"
                        onClick={() => setSearchQuery(item)}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-20">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <Search className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-[13px] text-gray-400">未找到相关课程</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TopicPage = ({
  topic,
  onClose,
  setActiveAssessment,
  setCurrentView,
}: {
  topic: any;
  onClose: () => void;
  setActiveAssessment: (test: any) => void;
  setCurrentView: (view: any) => void;
}) => {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowBackToTop(scrollRef.current.scrollTop > 200);
    }
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pastLives = [
    {
      id: 1,
      title: "破局资产困局：数字化+证券化双轮驱动办法和解读 (上)",
      image: "https://picsum.photos/seed/past1/200/120",
      progress: 85,
      isLive: true,
    },
    {
      id: 3,
      title: "破局资产困局：数字化+证券化双轮驱动办法和解读 (下)",
      image: "https://picsum.photos/seed/past3/200/120",
      progress: 30,
      isLive: false,
    },
    {
      id: 4,
      title: "金税四期下的企业税务合规指南",
      image: "https://picsum.photos/seed/past4/200/120",
      progress: 0,
      isLive: false,
    },
  ];

  return (
    <div className="absolute inset-0 bg-gray-50 z-[100] flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="relative h-[240px] flex-shrink-0">
        <img
          src={topic.image}
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Nav */}
        <div className="absolute top-0 left-0 right-0 px-4 pt-5 pb-4 flex items-center justify-between z-10">
          <button
            onClick={onClose}
            className="p-2 bg-black/20 rounded-full backdrop-blur-md text-white flex-shrink-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 mx-3 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-white/70" />
            </div>
            <input
              type="text"
              placeholder="搜索课程..."
              className="w-full bg-black/20 backdrop-blur-md text-white placeholder-white/70 text-[14px] rounded-full py-1.5 pl-9 pr-4 border border-white/20 focus:outline-none focus:bg-black/30 transition-colors"
            />
          </div>

          <div className="w-10"></div>
        </div>

        {/* Topic Info */}
        <div className="absolute top-[120px] left-0 right-0 px-5 text-white z-10">
          <h1 className="text-[24px] font-bold mb-3 leading-tight">
            {topic.title}
          </h1>
          <p className="text-[14px] text-white/90 line-clamp-2 leading-relaxed">
            {topic.desc}
          </p>
        </div>
      </div>

      {/* List */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto bg-white rounded-t-2xl -mt-4 relative z-20 px-4 py-5 no-scrollbar"
      >
        <h2 className="text-[16px] font-bold text-gray-900 mb-4">往期直播</h2>

        <div className="space-y-4">
          {pastLives.map((live) => (
            <div
              key={live.id}
              onClick={() => setSelectedCourse(live)}
              className="flex gap-3 active:bg-gray-50 p-2 -mx-2 rounded-xl transition-colors cursor-pointer"
            >
              {/* Left Image */}
              <div className="relative w-[120px] h-[75px] rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={live.image}
                  className="w-full h-full object-cover"
                  alt=""
                  referrerPolicy="no-referrer"
                />
                {live.isLive && (
                  <div className="absolute top-1 left-1 bg-red-500 px-1.5 py-0.5 rounded text-[10px] text-white font-bold flex items-center gap-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    直播中
                  </div>
                )}
              </div>

              {/* Right Content */}
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <h3 className="text-[14px] font-bold text-gray-900 line-clamp-2 leading-snug">
                  {live.title}
                </h3>

                {/* Progress Bar */}
                <div className="mt-2">
                  {live.progress === 0 ? (
                    <span className="text-[11px] text-gray-500">未观看</span>
                  ) : live.progress === 100 ? (
                    <span className="text-[11px] text-gray-500">已看完</span>
                  ) : (
                    <>
                      <div className="flex justify-between text-[11px] text-gray-500 mb-1.5">
                        <span>已观看 {live.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${live.progress}%` }}
                        ></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Detail Page Overlay */}
      <AnimatePresence>
        {selectedCourse && (
          <CourseDetailPage
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
            onStartTest={(test) => {
              setActiveAssessment(test);
              setCurrentView("assessment");
            }}
            initialTab="介绍"
            initialChapterIndex={0}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const PolicyTabContent: React.FC<{
  onCategorySelect: (category: string) => void;
  onPolicySelect: (policy: any) => void;
}> = ({ onCategorySelect, onPolicySelect }) => {
  const gridItems = [
    {
      title: "中央法规",
      sub: "权威发布",
      icon: Landmark,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      title: "地方法规",
      sub: "区域政策",
      icon: MapPin,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      title: "税务法则",
      sub: "合规指南",
      icon: Scale,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: "行业法规",
      sub: "专属政策",
      icon: Briefcase,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      title: "税收优惠",
      sub: "减税降费",
      icon: Gift,
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
    },
    {
      title: "税务稽查",
      sub: "风险防范",
      icon: ShieldCheck,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      border: "border-cyan-100",
    },
    {
      title: "办税流程",
      sub: "操作指南",
      icon: ArrowRightCircle,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
    {
      title: "会计科目",
      sub: "实务处理",
      icon: Calculator,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
  ];

  const newPolicies = [
    {
      id: 1,
      title: "关于进一步支持小微企业和个体工商户发展有关税费政策的公告",
      docNumber: "财政部 税务总局公告2026年第8号",
      date: "2026-04-08",
      tags: ["税收优惠", "小微企业", "增值税"],
      hot: true,
    },
    {
      id: 2,
      title: "国家税务总局关于办理2025年度个人所得税综合所得汇算清缴事项的公告",
      docNumber: "国家税务总局公告2026年第2号",
      date: "2026-03-15",
      tags: ["个人所得税", "汇算清缴", "中央法规"],
    },
    {
      id: 3,
      title: "关于延续实施全年一次性奖金个人所得税政策的公告",
      docNumber: "财政部 税务总局公告2026年第1号",
      date: "2026-02-28",
      tags: ["个人所得税", "税收优惠"],
    },
    {
      id: 4,
      title: "关于先进制造业企业增值税加计抵减政策的公告",
      docNumber: "财政部 税务总局公告2026年第4号",
      date: "2026-01-10",
      tags: ["增值税", "制造业", "加计抵减"],
    },
    {
      id: 5,
      title: "关于明确增值税小规模纳税人减免增值税等政策的公告",
      docNumber: "财政部 税务总局公告2025年第15号",
      date: "2025-12-20",
      tags: ["增值税", "小规模纳税人"],
    },
  ];

  return (
    <div className="px-5 py-6 space-y-8 bg-[#F8FAFC] min-h-full">
      {/* Grid Section - 2 items per row, bento style */}
      <div>
        <div className="grid grid-cols-2 gap-3">
          {gridItems.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategorySelect(item.title)}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 cursor-pointer"
            >
              <div
                className={`w-10 h-10 rounded-xl ${item.bg} ${item.border} border flex items-center justify-center shrink-0`}
              >
                <item.icon
                  className={`w-5 h-5 ${item.color}`}
                  strokeWidth={2}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] font-bold text-gray-900 truncate">
                  {item.title}
                </span>
                <span className="text-[11px] text-gray-500 truncate mt-0.5">
                  {item.sub}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* New Policies Feed */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-bold text-gray-900 flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-500" />
            最新政策
          </h2>
        </div>
        <div className="space-y-3">
          {newPolicies.map((policy) => (
            <motion.div
              key={policy.id}
              whileHover={{ scale: 0.99 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onPolicySelect(policy)}
              className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 cursor-pointer relative overflow-hidden group"
            >
              {policy.hot && (
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-red-500 to-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm">
                  HOT
                </div>
              )}
              <h3 className="text-[16px] font-bold text-gray-900 leading-snug mb-1.5 group-hover:text-blue-600 transition-colors pr-6">
                {policy.title}
              </h3>
              {policy.docNumber && (
                <div className="text-[12px] text-gray-500 mb-3 font-medium">
                  {policy.docNumber}
                </div>
              )}
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-wrap gap-2">
                  {policy.tags.map((tag, idx) => (
                    <span
                      key={tag}
                      className={`text-[11px] px-2.5 py-1 rounded-md font-medium ${idx === 0 ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-600"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[12px] text-gray-400 shrink-0 ml-3 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {policy.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HotTabContent: React.FC<{
  onShareClick: () => void;
  onClick: (post: Post) => void;
}> = ({ onShareClick, onClick }) => {
  const [activeCategory, setActiveCategory] = useState("全部");
  const categories = ["全部", "财税", "新规", "视频", "案例", "深度", "职场"];

  const hotItems = [
    {
      id: 1,
      type: "article-3-images",
      title: "2026年最新企业所得税汇算清缴指南：这10个易错点千万别踩！",
      images: [
        "https://picsum.photos/seed/hot1-1/400/300",
        "https://picsum.photos/seed/hot1-2/400/300",
        "https://picsum.photos/seed/hot1-3/400/300",
      ],
      author: "财税头条",
      comments: 128,
      time: "2026-05-18T05:00:00",
      isTop: true,
    },
    {
      id: 2,
      type: "vertical-video",
      title: "3分钟看懂：金税四期下，企业如何规避税务风险？",
      videoCover: "https://picsum.photos/seed/tax_video2/400/600",
      duration: "03:15",
      author: "税务专家王老师",
      comments: 456,
      time: "2026-05-17T14:20:00",
    },
    {
      id: 3,
      type: "article-1-image",
      title: "重磅！多地税务局发文，严查这类发票，企业财务速看",
      image: "https://picsum.photos/seed/hot3/400/300",
      author: "中国税务报",
      comments: 89,
      time: "2026-04-02T09:15:00",
    },
    {
      id: 4,
      type: "article-text",
      title:
        "财政部最新通知：关于进一步加大增值税期末留抵退税政策实施力度的公告",
      author: "官方发布",
      comments: 234,
      time: "2025-01-23T12:00:00",
    },
    {
      id: 5,
      type: "video",
      title: "实操演示：电子发票全流程开具与报销指南",
      videoCover: "https://picsum.photos/seed/hot5/800/450",
      duration: "12:40",
      author: "会计学堂",
      comments: 56,
      time: "2025-03-12T12:00:00",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Content List */}
      <div className="divide-y divide-gray-100">
        {hotItems.map((item) => (
          <div
            key={item.id}
            className="p-4 active:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onClick(item as any)}
          >
            {item.type === "article-3-images" && (
              <div>
                <h3 className="text-[17px] font-medium text-gray-900 leading-snug mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex gap-1 mb-2">
                  {item.images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      className="flex-1 h-[80px] object-cover rounded-sm"
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  {item.isTop && (
                    <span className="text-red-500 font-medium">置顶</span>
                  )}
                  <span>{item.author}</span>
                  <span>{item.comments}评论</span>
                </div>
              </div>
            )}

            {item.type === "article-1-image" && (
              <div className="flex gap-3">
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="text-[17px] font-medium text-gray-900 leading-snug line-clamp-3">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-2">
                    {item.isTop && (
                      <span className="text-red-500 font-medium">置顶</span>
                    )}
                    <span>{item.author}</span>
                    <span>{item.comments}评论</span>
                  </div>
                </div>
                <img
                  src={item.image}
                  className="w-[112px] h-[74px] object-cover rounded-sm flex-shrink-0"
                  alt=""
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {item.type === "article-text" && (
              <div>
                <h3 className="text-[17px] font-medium text-gray-900 leading-snug mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  {item.isTop && (
                    <span className="text-red-500 font-medium">置顶</span>
                  )}
                  <span>{item.author}</span>
                  <span>{item.comments}评论</span>
                </div>
              </div>
            )}

            {(item.type === "video" || item.type === "vertical-video") && (
              <div>
                <h3 className="text-[17px] font-medium text-gray-900 leading-snug mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <div
                  className={`relative w-full rounded-lg overflow-hidden mb-2 ${
                    item.type === "vertical-video"
                      ? "aspect-[4/5] max-w-[280px]"
                      : "h-[190px]"
                  }`}
                >
                  <img
                    src={item.videoCover}
                    className="w-full h-full object-cover"
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play
                        className="w-5 h-5 text-white ml-1"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-0.5 rounded-full text-[11px] text-white font-medium">
                    {item.duration}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  {item.isTop && (
                    <span className="text-red-500 font-medium">置顶</span>
                  )}
                  <span>{item.author}</span>
                  <span>{item.comments}评论</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ChargingPage: React.FC<{
  onBack: () => void;
  onSearchClick: () => void;
  onFilterClick: () => void;
  onCourseClick: (course: any) => void;
  myChannels: string[];
  setShowCourseCategoryPage: (show: boolean) => void;
  setActiveCourseCategory: (category: string) => void;
}> = ({
  onBack,
  onSearchClick,
  onFilterClick,
  onCourseClick,
  myChannels,
  setShowCourseCategoryPage,
  setActiveCourseCategory,
}) => {
  const [learnSubTab, setLearnSubTab] = useState("专题");
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [isLearnSearching, setIsLearnSearching] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(true);
  const [learnSearchQuery, setLearnSearchQuery] = useState("");

  const MOCK_LEARN_SEARCH_ITEMS = [
    {
      id: "learn-s-1",
      type: "course",
      title: "【高新专题】高新技术企业认定与研发费用加计扣除申报全流程指引",
      category: "加计扣除",
      views: "18.5万",
      chaptersCount: 15,
      duration: "4小时",
      cover: "https://picsum.photos/seed/learns1/400/250",
    },
    {
      id: "learn-s-2",
      type: "chapter",
      courseTitle: "【高新专题】高新技术企业认定与研发费用加计扣除申报全流程指引",
      chapterTitle: "研发活动归集与工时打卡管理规范",
      title: "研发活动归集与工时打卡管理规范",
      chapterIndex: 2,
      category: "研发归集",
      views: "3.2万",
      chaptersCount: 1,
      duration: "25:40",
      cover: "https://picsum.photos/seed/learns1/400/250",
    },
    {
      id: "learn-s-3",
      type: "course",
      title: "【实务大课】出口退税免抵退申报及征免退税率实操指南",
      category: "出口退税",
      views: "12.8万",
      chaptersCount: 12,
      duration: "3.5小时",
      cover: "https://picsum.photos/seed/learns2/400/250",
    },
    {
      id: "learn-s-4",
      type: "chapter",
      courseTitle: "【实务大课】出口退税免抵退申报及征免退税率实操指南",
      chapterTitle: "免抵退税系统流程实操演示与排错要点",
      title: "免抵退税系统流程实操演示与排错要点",
      chapterIndex: 4,
      category: "系统实操",
      views: "1.9万",
      chaptersCount: 1,
      duration: "45:15",
      cover: "https://picsum.photos/seed/learns2/400/250",
    },
    {
      id: "learn-s-5",
      type: "course",
      title: "【新税规】2024最新企业所得税年度汇算清缴关键点解析",
      category: "企业所得税",
      views: "24.5万",
      chaptersCount: 18,
      duration: "5小时",
      cover: "https://picsum.photos/seed/learns3/400/250",
    },
    {
      id: "learn-s-6",
      type: "chapter",
      courseTitle: "【新税规】2024最新企业所得税年度汇算清缴关键点解析",
      chapterTitle: "新旧税法交替下视同销售的调整要点",
      title: "新旧税法交替下视同销售的调整要点",
      chapterIndex: 1,
      category: "视同销售",
      views: "5.4万",
      chaptersCount: 1,
      duration: "32:10",
      cover: "https://picsum.photos/seed/learns3/400/250",
    },
    {
      id: "learn-s-7",
      type: "course",
      title: "【财务晋升】从会计到财务经理的核心业务与管理跨越",
      category: "财务晋升",
      views: "9.2万",
      chaptersCount: 8,
      duration: "2小时",
      cover: "https://picsum.photos/seed/learns4/400/250",
    },
    {
      id: "learn-s-8",
      type: "chapter",
      courseTitle: "【财务晋升】从会计到财务经理的核心业务与管理跨越",
      chapterTitle: "财务经理如何进行全面预算管理与监控",
      title: "财务经理如何进行全面预算管理与监控",
      chapterIndex: 0,
      category: "预算管理",
      views: "2.8万",
      chaptersCount: 1,
      duration: "50:20",
      cover: "https://picsum.photos/seed/learns4/400/250",
    },
  ];

  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    role: "全部岗位",
    business: "全部业务",
    industry: "全部行业",
    scenario: "全部场景",
    taxType: "全部税种",
    topic: "全部专题",
    sort: "综合排序",
  });

  const [activeSubFilters, setActiveSubFilters] = useState<
    Record<string, string>
  >({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showStickyFilters, setShowStickyFilters] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowStickyFilters(scrollRef.current.scrollTop > 150);
      setShowBackToTop(scrollRef.current.scrollTop > 300);
    }
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filterConfig = [
    {
      id: "role",
      label: "全部岗位",
      options: [
        { label: "会计出纳", subOptions: ["出纳实操", "总账会计", "应收应付"] },
        { label: "审计师", subOptions: ["内部审计", "外部审计", "IT审计"] },
        { label: "财务经理" },
        { label: "税务" },
        { label: "cfo" },
        { label: "资金经理" },
        { label: "财务BP" },
      ],
    },
    {
      id: "business",
      label: "全部业务",
      options: [
        { label: "加计扣除", subOptions: ["研发费用", "设备器具", "高新技术"] },
        { label: "税务稽查" },
        { label: "出海报税" },
        { label: "财税分析" },
        { label: "表格处理" },
      ],
    },
    {
      id: "industry",
      label: "全部行业",
      options: [
        { label: "医疗" },
        { label: "建筑" },
        { label: "科技" },
        { label: "金融" },
        { label: "服务" },
        { label: "化工" },
        { label: "进出口物流" },
      ],
    },
    {
      id: "scenario",
      label: "全部场景",
      options: [
        { label: "热点" },
        { label: "职场" },
        { label: "非财" },
        { label: "视野" },
        { label: "成长" },
        { label: "职称考培" },
      ],
    },
    {
      id: "taxType",
      label: "全部税种",
      options: [
        { label: "公司所得税" },
        { label: "印花税" },
        { label: "增值税" },
        { label: "个人所得税" },
        { label: "消费税" },
        { label: "契税" },
      ],
    },
    {
      id: "topic",
      label: "全部专题",
      options: [
        { label: "精品课" },
        { label: "免费试听" },
        { label: "研修班" },
        { label: "出海专题" },
        { label: "税法直通车" },
        { label: "年终清缴" },
        { label: "商业模式" },
        { label: "股权特训" },
      ],
    },
    {
      id: "sort",
      label: "综合排序",
      options: [{ label: "最近" }, { label: "热度" }],
    },
  ];

  const mockCourses = [
    {
      id: 1,
      title: "【新课上线】全面掌握AI视频创作，从入门到精通",
      image: "https://picsum.photos/seed/c1/400/250",
      views: "20.5万",
      hours: 70,
      time: "2026-05-20T01:30:00Z",
    },
    {
      id: 2,
      title: "【每天学一点】365勇哥餐饮创业线上视频课程",
      image: "https://picsum.photos/seed/c2/400/250",
      views: "17.5万",
      hours: 38,
      time: "2026-05-19T14:30:00Z",
    },
    {
      id: 3,
      title: "新课 | 18堂高阶情商博弈课，带你赢下人生关键局",
      image: "https://picsum.photos/seed/c3/400/250",
      views: "85.1万",
      hours: 18,
      time: "2026-04-02T10:00:00Z",
    },
    {
      id: 4,
      title: "【限时早鸟价】满分汇报PPT模板！赠27G素材包",
      image: "https://picsum.photos/seed/c4/400/250",
      views: "1万",
      hours: 2,
      time: "2025-01-23T08:00:00Z",
    },
    {
      id: 5,
      title: "【上新5折】龚琳娜：国风声乐课",
      image: "https://picsum.photos/seed/c5/400/250",
      views: "8万",
      hours: 20,
      time: "2026-05-20T02:50:00Z",
    },
    {
      id: 6,
      title: "【语言区NO.1】英语兔：早该这样学英语！",
      image: "https://picsum.photos/seed/c6/400/250",
      views: "228.9万",
      hours: 24,
      time: "2026-03-15T09:00:00Z",
    },
  ];

  return (
    <div
      className="flex-1 overflow-y-auto no-scrollbar bg-white pb-32"
      ref={scrollRef}
      onScroll={handleScroll}
    >
      {/* Top Header Tabs & Sticky Filters */}
      <div className="sticky top-0 z-50 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between px-4 pt-5 pb-2">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="p-2 -ml-2 mr-2 text-gray-800 hover:bg-black/5 rounded-full transition-colors shrink-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[18px] text-gray-900">学</span>
              <button
                onClick={() => setIsLearnSearching(true)}
                className="p-1 px-1.5 hover:bg-black/5 rounded-full text-gray-800 transition-colors flex items-center justify-center shrink-0 hover:scale-105 active:scale-95"
                title="搜索"
              >
                <Search className="w-4.5 h-4.5 text-gray-800" />
              </button>
            </div>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Sticky Selected Filters */}
        <AnimatePresence>
          {showStickyFilters &&
            learnSubTab === "课程" &&
            Object.keys(activeFilters).some(
              (k) =>
                activeFilters[k] !==
                filterConfig.find((f) => f.id === k)?.label,
            ) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-b border-gray-100 px-4 py-2 flex overflow-x-auto no-scrollbar gap-2 shadow-sm bg-white"
              >
                {filterConfig.map((filter) => {
                  if (activeFilters[filter.id] !== filter.label) {
                    return (
                      <div
                        key={filter.id}
                        className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-[12px] whitespace-nowrap shrink-0"
                      >
                        <span>{activeFilters[filter.id]}</span>
                        {activeSubFilters[filter.id] && (
                          <>
                            <span className="text-blue-300 mx-0.5">·</span>
                            <span>{activeSubFilters[filter.id]}</span>
                          </>
                        )}
                        <X
                          className="w-3 h-3 ml-1 cursor-pointer opacity-70 hover:opacity-100"
                          onClick={() => {
                            setActiveFilters((prev) => ({
                              ...prev,
                              [filter.id]: filter.label,
                            }));
                            const newSub = { ...activeSubFilters };
                            delete newSub[filter.id];
                            setActiveSubFilters(newSub);
                          }}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Search and Filter */}
      <div className="px-5 bg-white pt-1">
        <div className="flex justify-center items-center border-b border-gray-100 w-full">
          <div className="grid grid-cols-4 w-full place-items-center">
            {["专题", "课程", "名师", "记录"].map((tab) => (
              <button
                key={tab}
                onClick={() => setLearnSubTab(tab)}
                className={`w-full text-center py-3 text-[15px] transition-all relative ${
                  learnSubTab === tab
                    ? "text-blue-600 font-normal"
                    : "text-gray-500 hover:text-gray-900 font-normal"
                }`}
              >
                {tab}
                {learnSubTab === tab && (
                  <motion.div
                    layoutId="learnSubTabIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-t-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {learnSubTab === "课程" && (
        <>
          {/* New Filter UI */}
          <div className="bg-white px-4 pt-3 pb-2 flex flex-col gap-3">
            {filterConfig.map((filter) => {
              const selectedOptionLabel = activeFilters[filter.id];
              const selectedOption = filter.options.find(
                (o) => o.label === selectedOptionLabel,
              );
              const hasSubOptions =
                selectedOption &&
                selectedOption.subOptions &&
                selectedOption.subOptions.length > 0;

              return (
                <div key={filter.id} className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setActiveFilters({
                          ...activeFilters,
                          [filter.id]: filter.label,
                        });
                        const newSub = { ...activeSubFilters };
                        delete newSub[filter.id];
                        setActiveSubFilters(newSub);
                      }}
                      className={`shrink-0 text-[13px] px-2 py-1 rounded transition-colors ${
                        activeFilters[filter.id] === filter.label
                          ? "bg-blue-50 text-blue-500 font-medium"
                          : "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {filter.label}
                    </button>
                    <div className="flex-1 flex overflow-x-auto no-scrollbar gap-4">
                      {filter.options.map((option) => {
                        const isSelected =
                          activeFilters[filter.id] === option.label;
                        return (
                          <div
                            key={option.label}
                            className="relative flex flex-col items-center"
                          >
                            <button
                              onClick={() => {
                                setActiveFilters({
                                  ...activeFilters,
                                  [filter.id]: option.label,
                                });
                                if (
                                  option.subOptions &&
                                  option.subOptions.length > 0
                                ) {
                                  setActiveSubFilters({
                                    ...activeSubFilters,
                                    [filter.id]: option.subOptions[0],
                                  });
                                } else {
                                  const newSub = { ...activeSubFilters };
                                  delete newSub[filter.id];
                                  setActiveSubFilters(newSub);
                                }
                              }}
                              className={`whitespace-nowrap text-[13px] px-2 py-1 rounded transition-colors ${
                                isSelected
                                  ? "bg-blue-50 text-blue-500 font-medium"
                                  : "text-gray-600"
                              }`}
                            >
                              {option.label}
                            </button>
                            {isSelected &&
                              option.subOptions &&
                              option.subOptions.length > 0 && (
                                <div className="absolute -bottom-2 w-3 h-3 bg-[#F7F8FA] rotate-45 z-10 translate-y-1/2 rounded-sm"></div>
                              )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Secondary Filter Row */}
                  {hasSubOptions && (
                    <div className="mt-2 bg-[#F7F8FA] rounded-lg p-2.5 flex overflow-x-auto no-scrollbar gap-4 relative z-0">
                      {selectedOption.subOptions.map((sub) => (
                        <button
                          key={sub}
                          onClick={() =>
                            setActiveSubFilters({
                              ...activeSubFilters,
                              [filter.id]: sub,
                            })
                          }
                          className={`whitespace-nowrap text-[12px] transition-colors ${
                            activeSubFilters[filter.id] === sub
                              ? "text-blue-500 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Course List */}
          <div className="grid grid-cols-2 gap-3 px-4 pb-8">
            {mockCourses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col cursor-pointer active:scale-95 transition-transform"
                onClick={() => onCourseClick(course)}
              >
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shrink-0">
                  <img
                    src={course.image}
                    className="w-full h-full object-cover"
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-1 right-1 text-white text-[10px] font-medium z-10 px-0.5">
                    共{course.hours}章节
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-[13px] font-normal text-gray-900 line-clamp-2 leading-snug">
                    {course.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {learnSubTab === "专题" && (
        <div className="px-4 py-5 space-y-8 bg-gray-50 min-h-screen">
          {[
            {
              category: "新课首发",
              topics: [
                {
                  title: "2026年企业所得锐汇算清缴实务",
                  coursesCount: 5,
                  views: 3200,
                  image: "https://picsum.photos/seed/tax1/400/250",
                },
                {
                  title: "新公司法下注册资本认缴制专题",
                  coursesCount: 3,
                  views: 1540,
                  image: "https://picsum.photos/seed/legal1/400/250",
                },
              ],
            },
            {
              category: "热点专题",
              topics: [
                {
                  title: "金税四期背景下票据合规应对",
                  coursesCount: 8,
                  views: 5600,
                  image: "https://picsum.photos/seed/hot1/400/250",
                },
                {
                  title: "数据资产入账与分期摊销实务",
                  coursesCount: 4,
                  views: 2100,
                  image: "https://picsum.photos/seed/hot2/400/250",
                },
              ],
            },
            {
              category: "财税月选",
              topics: [
                {
                  title: "5月重点财税法规回顾与实操",
                  coursesCount: 1,
                  views: 890,
                  image: "https://picsum.photos/seed/month1/400/250",
                },
                {
                  title: "离岸贸易税收优惠政策深度揭秘",
                  coursesCount: 2,
                  views: 1200,
                  image: "https://picsum.photos/seed/month2/400/250",
                },
              ],
            },
            {
              category: "人“财”提升",
              topics: [
                {
                  title: "财务总监从入门到精通",
                  coursesCount: 10,
                  views: 7800,
                  image: "https://picsum.photos/seed/career1/400/250",
                },
                {
                  title: "复合型财税人才能力模型建设",
                  coursesCount: 6,
                  views: 4200,
                  image: "https://picsum.photos/seed/career2/400/250",
                },
              ],
            },
            {
              category: "对标岗能",
              topics: [
                {
                  title: "对标名企：华为财经体系深度解析",
                  coursesCount: 12,
                  views: 1.25,
                  image: "https://picsum.photos/seed/benchmark1/400/250",
                },
              ],
            },
            {
              category: "沉浸学习",
              topics: [
                {
                  title: "沉浸式税务沙盘演练课程",
                  coursesCount: 4,
                  views: 1500,
                  image: "https://picsum.photos/seed/immersion1/400/250",
                },
              ],
            },
            {
              category: "岗位提升",
              topics: [
                {
                  title: "会计主管核心管理力专题",
                  coursesCount: 5,
                  views: 2300,
                  image: "https://picsum.photos/seed/post1/400/250",
                },
              ],
            },
            {
              category: "行业财税",
              topics: [
                {
                  title: "高新技术企业认定与维护全流程",
                  coursesCount: 9,
                  views: 4500,
                  image: "https://picsum.photos/seed/industry1/400/250",
                },
                {
                  title: "建筑行业挂靠经营转自营税务处理",
                  coursesCount: 7,
                  views: 3100,
                  image: "https://picsum.photos/seed/industry2/400/250",
                },
              ],
            },
            {
              category: "其他专题",
              topics: [
                {
                  title: "家庭财富传承与税务规划锦囊",
                  coursesCount: 3,
                  views: 1100,
                  image: "https://picsum.photos/seed/other1/400/250",
                },
              ],
            },
          ].map((section, sIdx) => (
            <div key={sIdx}>
              <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-[17px] font-bold text-gray-900">
                  {section.category}
                </h2>
              </div>
              <div className="flex overflow-x-auto no-scrollbar gap-3 -mx-4 px-5 pb-4">
                {[...section.topics, ...section.topics, ...section.topics].slice(0, 5).map((topic, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col cursor-pointer active:scale-95 transition-transform w-[calc(40vw-9px)] sm:w-[146px] shrink-0"
                    onClick={() =>
                      onCourseClick({
                        id: `topic-${sIdx}-${idx}`,
                        title: topic.title,
                        image: topic.image,
                      })
                    }
                  >
                    <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shrink-0">
                      <img
                        src={topic.image}
                        alt={topic.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-1 right-1 text-white text-[10px] font-medium z-10 px-0.5">
                        共{topic.coursesCount}章节
                      </div>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-[13px] font-normal text-gray-900 line-clamp-2 leading-snug">
                        {topic.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {learnSubTab === "名师" && (
        <div className="px-4 py-5 space-y-4 bg-gray-50 min-h-screen pb-32">
          {[
            {
              id: 1,
              name: "王税务",
              title: "注册税务师 / 10年资深专家",
              company: "某知名会计师事务所",
              avatar: "https://picsum.photos/seed/t1/100/100",
              coursesCount: 15,
              students: "5.2w",
            },
            {
              id: 2,
              name: "李财务",
              title: "高级会计师 / 财务总监",
              company: "前500强企业CFO",
              avatar: "https://picsum.photos/seed/t2/100/100",
              coursesCount: 8,
              students: "3.1w",
            },
            {
              id: 3,
              name: "张审",
              title: "注册会计师 / 审计合伙人",
              company: "八大会计师事务所",
              avatar: "https://picsum.photos/seed/t3/100/100",
              coursesCount: 12,
              students: "2.8w",
            },
            {
              id: 4,
              name: "赵法",
              title: "知名财税律师",
              company: "百强律所合伙人",
              avatar: "https://picsum.photos/seed/t4/100/100",
              coursesCount: 6,
              students: "1.5w",
            },
            {
              id: 5,
              name: "陈税代",
              title: "资深财税顾问",
              company: "头部代账公司合伙人",
              avatar: "https://picsum.photos/seed/t5/100/100",
              coursesCount: 9,
              students: "1.2w",
            },
          ].map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-gray-100 flex items-start gap-4 active:scale-[0.98] transition-transform cursor-pointer"
              onClick={() => setSelectedTeacher(teacher)}
            >
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-gray-50"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[16px] font-bold text-gray-900 truncate">
                    {teacher.name}
                  </h3>
                </div>
                <p className="text-[13px] text-gray-600 truncate mb-1 bg-gray-50 inline-block px-2 py-0.5 rounded text-[11px]">
                  {teacher.title}
                </p>
                <p className="text-[12px] text-gray-400 truncate mb-2.5 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  {teacher.company}
                </p>
                <div className="flex items-center gap-4 text-[12px] text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500 opacity-80" />
                    <span>
                      <span className="font-bold text-gray-700">
                        {teacher.coursesCount}
                      </span>
                      门课程
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-orange-500 opacity-80" />
                    <span>
                      <span className="font-bold text-gray-700">
                        {teacher.students}
                      </span>
                      学员
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Teacher Detail Overlay */}
      <AnimatePresence>
        {selectedTeacher && (
          <TeacherDetailPage
            teacher={selectedTeacher}
            onClose={() => setSelectedTeacher(null)}
            onCourseClick={onCourseClick}
          />
        )}
      </AnimatePresence>

      {learnSubTab === "记录" && (
        <div className="px-5 py-6">
          {/* Course Hours Consumption */}
          <div className="bg-white rounded-3xl p-6 mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[16px] font-bold text-gray-900">消耗课时</h3>
              <div className="flex items-baseline gap-0.5">
                <span className="text-[18px] font-black text-blue-600">20</span>
                <span className="text-[13px] font-bold text-gray-400">/100 课时</span>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(20 / 100) * 100}%` }}
                transition={{ type: 'spring', bounce: 0 }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-4">
              <h3 className="text-[16px] font-bold text-gray-900">
                技能成长
              </h3>
              <div className="text-[12px] text-gray-500">
                领先同行：<span className="text-blue-600 font-bold">85%</span>
              </div>
            </div>

            <div className="w-full h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={[
                    { subject: "会计实务", A: 120, fullMark: 150 },
                    { subject: "税务稽查", A: 98, fullMark: 150 },
                    { subject: "资产管理", A: 86, fullMark: 150 },
                    { subject: "财务分析", A: 99, fullMark: 150 },
                    { subject: "风险防控", A: 85, fullMark: 150 },
                    { subject: "法律合规", A: 65, fullMark: 150 },
                  ]}
                >
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#64748b", fontSize: 11 }}
                  />
                  <Radar
                    name="Learning"
                    dataKey="A"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex items-center justify-between mb-5 px-1">
            <h2 className="text-[17px] font-bold text-gray-900">最近学习</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                id: "course-101",
                title: "出口退税实务操作全流程解析",
                chapter: "课时 3",
                chapterIndex: 2,
                progress: 100,
                learnedDuration: "45:00",
                totalDuration: "45:00",
                image: "https://picsum.photos/seed/learn1/400/250",
              },
              {
                id: "course-102",
                title: "金税四期下的企业税务合规指南",
                chapter: "课时 1",
                chapterIndex: 0,
                progress: 65,
                learnedDuration: "39:00",
                totalDuration: "60:00",
                image: "https://picsum.photos/seed/learn2/400/250",
              },
              {
                id: "course-103",
                title: "财务报表分析入门与实操技巧",
                chapter: "课时 5",
                chapterIndex: 4,
                progress: 15,
                learnedDuration: "04:30",
                totalDuration: "30:00",
                image: "https://picsum.photos/seed/learn3/400/250",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 items-center bg-white p-3 rounded-2xl border border-gray-50 shadow-[0_2px_12px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all cursor-pointer group"
                onClick={() => onCourseClick({ ...item, initialTab: "章节", initialChapterIndex: item.chapterIndex })}
              >
                <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 shadow-inner">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt=""
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-white/80" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </div>
                  <div className="flex items-center pr-2">
                    {item.progress === 100 ? (
                      <div className="text-[12px] text-gray-500 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                        <span>已学完</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 w-full">
                        <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.progress}%` }}></div>
                        </div>
                        <div className="text-[11px] text-gray-400 font-medium shrink-0">{item.learnedDuration} / {item.totalDuration}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dedicated Independent Learning Search Mode Overlay */}
      <AnimatePresence>
        {isLearnSearching && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed inset-0 bg-[#F5F6F8] z-[200] flex flex-col font-sans"
          >
            {/* Search Header */}
            <div className="px-4 pt-14 flex flex-col gap-2 border-b border-gray-100 bg-white shadow-sm shrink-0">
              <div className="pb-4 flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsLearnSearching(false);
                    setLearnSearchQuery("");
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
                    placeholder="搜索课程、章节或内容"
                    value={learnSearchQuery}
                    onChange={(e) => setLearnSearchQuery(e.target.value)}
                    className="w-full h-10 bg-gray-100 rounded-full pl-9 pr-10 text-[14px] focus:outline-none placeholder:text-gray-400 hover:bg-gray-200/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-gray-800"
                  />
                  {learnSearchQuery && (
                    <button
                      onClick={() => setLearnSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-gray-200 rounded-full text-gray-450 h-5 w-5 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <X size={12} className="text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Results Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {learnSearchQuery.trim() === "" ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-500">
                    <BookMarked className="w-8 h-8" />
                  </div>
                  <p className="text-gray-800 font-bold text-[15px] mb-1">
                    学的独立检索空间
                  </p>
                  <p className="text-gray-400 text-[13px] max-w-[240px] leading-relaxed">
                    请输入关键词搜索大成方略精品财税课程、实操章节、随堂微课
                  </p>
                </div>
              ) : (
                (() => {
                  const results = MOCK_LEARN_SEARCH_ITEMS.filter(
                    (item) =>
                      item.title
                        .toLowerCase()
                        .includes(learnSearchQuery.toLowerCase()) ||
                      item.category
                        .toLowerCase()
                        .includes(learnSearchQuery.toLowerCase()),
                  );

                  if (results.length > 0) {
                    return (
                      <div className="space-y-3.5 pl-2">
                        {results.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              onCourseClick({
                                id: item.id.includes("1")
                                  ? 1
                                  : item.id.includes("3")
                                    ? 3
                                    : item.id.includes("5")
                                      ? 5
                                      : 2,
                                title: item.title,
                                courseTitle: item.courseTitle,
                                initialChapterIndex: item.chapterIndex,
                                chapters: item.type === "chapter" && item.chapterTitle ? Array.from({ length: 5 }).map((_, i) => ({
                                  id: `mock-${i + 1}`,
                                  title: i === item.chapterIndex ? item.chapterTitle : `默认章节 ${i + 1}`,
                                  duration: i === item.chapterIndex ? item.duration : '30:00',
                                  progress: i < item.chapterIndex ? 100 : 0
                                })) : undefined,
                                image: item.cover,
                                views: item.views,
                                hours: item.duration.includes("小时")
                                  ? parseInt(item.duration)
                                  : 10,
                                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                                autoPlay: item.type === "chapter",
                                initialTab: item.type === "course" ? "介绍" : "章节",
                              });
                              // setIsLearnSearching(false); // Retain search state when opening course
                            }}
                            className="flex gap-3 mb-4 cursor-pointer active:scale-95 transition-transform"
                          >
                            <div className="w-[110px] aspect-video rounded-lg overflow-hidden flex-shrink-0 relative">
                              <img
                                src={item.cover}
                                alt="cover"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                              <div className="absolute bottom-1 right-1 text-[10px] text-white backdrop-blur-sm px-1 rounded-sm">
                                {item.type === "course"
                                  ? `共${item.chaptersCount}章节`
                                  : item.duration}
                              </div>
                            </div>

                            <div className="flex-1 pt-0.5">
                              <h3 className="text-[14px] font-normal text-gray-900 line-clamp-2 leading-snug">
                                {item.title}
                              </h3>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  } else {
                    return (
                      <div className="text-center py-20 text-gray-400 text-sm">
                        没有找到符合条件的培训课程或教学章节
                      </div>
                    );
                  }
                })()
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-5 z-[50] w-11 h-11 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <ChevronUp className="w-6 h-6 text-gray-500" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Mini Player */}
      <AnimatePresence>
        {showMiniPlayer && learnSubTab !== "记录" && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 left-4 right-4 z-[90] bg-black/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-white/10 p-2.5 flex gap-3 items-center cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => onCourseClick({
              id: "mini-1", 
              title: "【高新专题】高新技术企业认定与研发费用加计扣除申报全流程指引",
              type: "course", 
              cover: "https://picsum.photos/seed/learns1/400/250",
              initialTab: "章节"
            })}
          >
            <div className="relative w-16 h-10 rounded-lg overflow-hidden shrink-0">
              <img src="https://picsum.photos/seed/learns1/400/250" className="w-full h-full object-cover" alt="cover" />
              <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center backdrop-blur-[1px]">
                 <Play className="w-4 h-4 text-white fill-white shadow-sm" />
              </div>
            </div>
            <div className="flex-1 min-w-0 pr-2">
               <div className="text-[13px] font-medium text-white line-clamp-1 leading-snug">【高新专题】高新技术企业认定与研发费用加计扣除申报全流程指引</div>
            </div>
            <button 
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full active:scale-95 transition-all"
              onClick={(e) => { e.stopPropagation(); setShowMiniPlayer(false); }}
            >
               <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AgentsView = () => {
  const agents = [
    {
      title: "发票检测",
      icon: ReceiptText,
      desc: "一键检测发票真伪与合规性",
      color: "text-blue-500",
      bg: "bg-blue-50/50",
    },
    {
      title: "风险评估",
      icon: ShieldAlert,
      desc: "智能评估企业财税风险漏洞",
      color: "text-red-500",
      bg: "bg-red-50/50",
    },
    {
      title: "制作报表",
      icon: FileBarChart,
      desc: "自动生成标准财务报表",
      color: "text-green-500",
      bg: "bg-green-50/50",
    },
    {
      title: "发票提取",
      icon: ScanLine,
      desc: "图像识别快速提取发票信息",
      color: "text-purple-500",
      bg: "bg-purple-50/50",
    },
    {
      title: "单据处理",
      icon: Calculator,
      desc: "智能分类与处理各类报销单",
      color: "text-orange-500",
      bg: "bg-orange-50/50",
    },
    {
      title: "探虎罗盘",
      icon: Compass,
      desc: "深度行业数据分析与洞察",
      color: "text-indigo-500",
      bg: "bg-indigo-50/50",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {agents.map((agent, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-[20px] shadow-sm border border-gray-100 flex flex-col items-start gap-3 active:scale-95 transition-transform cursor-pointer"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${agent.bg}`}
            >
              <agent.icon className={`w-6 h-6 ${agent.color}`} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">{agent.title}</h3>
              <p className="text-[11px] text-gray-500 leading-snug line-clamp-2">
                {agent.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TaxQASection = ({
  initialQuery,
  initialAnswer,
  onAIShareClick,
  onUpgradeClick,
}: {
  initialQuery?: string;
  initialAnswer?: string;
  onAIShareClick?: () => void;
  onUpgradeClick?: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<"ai" | "expert" | "ai_knowledge">(
    "ai",
  );
  const [mainHeaderTab, setMainHeaderTab] = useState<"ai_finance" | "agents">(
    "ai_finance",
  );
  const [isFavorited, setIsFavorited] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const [messages, setMessages] = useState<
    {
      role: "user" | "ai";
      content: string;
      followUpText?: string;
      options?: string[];
      optionType?: "single" | "multiple" | "open";
      attachments?: { name: string; url: string; type: string }[];
    }[]
  >(() => {
    if (initialQuery && initialAnswer) {
      return [
        { role: "user", content: initialQuery },
        { role: "ai", content: initialAnswer },
      ];
    }
    return [];
  });
  const [input, setInput] = useState("");
  const [chatAttachments, setChatAttachments] = useState<
    { name: string; url: string; type: string }[]
  >([]);
  const chatFileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isFullScreenInputOpen, setIsFullScreenInputOpen] = useState(false);
  const [isAiShareModalOpen, setIsAiShareModalOpen] = useState(false);
  const [isOutOfHoursModalOpen, setIsOutOfHoursModalOpen] = useState(false);
  const [isH5CardModalOpen, setIsH5CardModalOpen] = useState(false);
  const [shareContent, setShareContent] = useState<any>(null);
  const [historySearch, setHistorySearch] = useState("");
  const [expertTab, setExpertTab] = useState<
    "recommend" | "favorite" | "history"
  >("recommend");
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("AI顾问");
  const [activeHistoryItemAction, setActiveHistoryItemAction] = useState<
    number | null
  >(null);
  const [isShareMode, setIsShareMode] = useState(false);
  const [selectedShareMessages, setSelectedShareMessages] = useState<number[]>(
    [],
  );
  const [shareFormat, setShareFormat] = useState<"image" | "link">("image");
  const [isExpertPurchaseModalOpen, setIsExpertPurchaseModalOpen] =
    useState(false);
  const [isExpertConsultationModalOpen, setIsExpertConsultationModalOpen] =
    useState(false);
  const [selectedExpertForConsultation, setSelectedExpertForConsultation] =
    useState<any>(null);
  const [selectedExpertForPurchase, setSelectedExpertForPurchase] =
    useState<any>(null);
  const [isUploadMenuOpen, setIsUploadMenuOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Knowledge Base States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTags, setSearchTags] = useState([
    "财税",
    "报表",
    "培训",
    "指南",
  ]);
  const [tagRenameModalOpen, setTagRenameModalOpen] = useState(false);
  const [editingTagIndex, setEditingTagIndex] = useState<number | null>(null);
  const [newTagValue, setNewTagValue] = useState("");
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [fileActionModalOpen, setFileActionModalOpen] = useState(false);
  const [activeFile, setActiveFile] = useState<any>(null);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [newFolderModalOpen, setNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const [knowledgeFiles, setKnowledgeFiles] = useState<any[]>([
    {
      id: 1,
      title: "工作有",
      type: "问答",
      date: "25/6/19",
      iconType: "qa",
      tags: ["财税", "报表"],
    },
    {
      id: 2,
      title: "[讲师介绍] 大成方略名师手册.pdf",
      type: "PDF",
      date: "25/6/19",
      iconType: "pdf",
      tags: ["培训"],
    },
    {
      id: 3,
      title: "ima知识库使用指南.docx",
      type: "WORD",
      date: "25/3/12",
      iconType: "word",
      tags: ["指南"],
    },
    {
      id: 4,
      title: "我的文件夹",
      type: "文件夹",
      date: "25/6/20",
      iconType: "folder",
      tags: [],
      fileCount: 5,
    },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isPdf = file.name.toLowerCase().endsWith(".pdf");
      const isWord =
        file.name.toLowerCase().endsWith(".doc") ||
        file.name.toLowerCase().endsWith(".docx");

      const newFile = {
        id: Date.now(),
        title: file.name,
        type: isPdf ? "PDF" : isWord ? "WORD" : "文件",
        date: new Date()
          .toLocaleDateString("zh-CN", {
            year: "2-digit",
            month: "numeric",
            day: "numeric",
          })
          .replace(/\//g, "/"),
        iconType: isPdf ? "pdf" : isWord ? "word" : "qa",
      };

      setKnowledgeFiles((prev) => [newFile, ...prev]);
      setIsUploadMenuOpen(false);
    }
  };

  const handleChatFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAttachments = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "file",
    }));
    setChatAttachments((prev) => [...prev, ...newAttachments]);
    if (chatFileInputRef.current) {
      chatFileInputRef.current.value = "";
    }
  };

  const uploadOptions = [
    { icon: Camera, label: "拍照" },
    { icon: ImageIcon, label: "图片" },
    { icon: Mic, label: "录音" },
    { icon: Folder, label: "本地文件" },
    { icon: MessageCircle, label: "微信文件" },
    { icon: Link, label: "网页链接" },
    { icon: ExternalLink, label: "笔记" },
    { icon: FolderPlus, label: "新建文件夹", divider: true },
  ];

  const handleCallExpert = (expert: any) => {
    setSelectedExpertForConsultation(expert);
    setIsExpertConsultationModalOpen(true);
  };
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery && initialAnswer) {
      setMessages([
        {
          role: "ai",
          content:
            "嗨，我是大成AI，你的财税智能专家。",
        },
        { role: "user", content: initialQuery },
        { role: "ai", content: initialAnswer },
      ]);
      setActiveTab("ai");
    }
  }, [initialQuery, initialAnswer]);

  const categories = [
    { label: "AI顾问", id: "all" },
    { label: "人工专家", id: "call" },
  ];

  const chatHistory = [
    { id: 1, title: "关于出口退税的咨询", date: "2026-03-25 14:30" },
    { id: 2, title: "个人所得税专项扣除", date: "2026-03-24 09:15" },
    { id: 3, title: "企业所得税汇算清缴", date: "2026-03-22 16:45" },
  ];

  const experts = [
    {
      id: 1,
      name: "张晓明",
      title: "资深税务专家",
      specialty: "企业所得税、税务筹划",
      avatar: "https://picsum.photos/seed/expert1/100/100",
      experience: "15年财税实务经验",
      rating: 4.9,
      calls: 1280,
    },
    {
      id: 2,
      name: "李丽华",
      title: "注册会计师",
      specialty: "审计、财务报表分析",
      avatar: "https://picsum.photos/seed/expert2/100/100",
      experience: "12年审计事务所经验",
      rating: 4.8,
      calls: 950,
    },
    {
      id: 3,
      name: "王建国",
      title: "高级会计师",
      specialty: "成本管理、管理会计",
      avatar: "https://picsum.photos/seed/expert3/100/100",
      experience: "20年大型企业财务总监经验",
      rating: 5.0,
      calls: 2100,
      tags: ["非工作时间交互"],
    },
  ];

  const callRecords = [
    {
      id: 1,
      expert: "张晓明",
      avatar: "https://picsum.photos/seed/expert1/100/100",
      date: "2026-03-20 15:24",
      duration: "15分钟",
      status: "已完成",
    },
    {
      id: 2,
      expert: "李丽华",
      avatar: "https://picsum.photos/seed/expert2/100/100",
      date: "2026-03-15 08:45",
      duration: "8分钟",
      status: "已完成",
    },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if ((!messageText && chatAttachments.length === 0) || isLoading) return;

    setSelectedOptions([]);
    const attachmentsToSent = [...chatAttachments];
    const newMessages: {
      role: "user" | "ai";
      content: string;
      options?: string[];
      attachments?: { name: string; url: string; type: string }[];
    }[] = [
      ...messages,
      {
        role: "user",
        content: messageText,
        attachments:
          attachmentsToSent.length > 0 ? attachmentsToSent : undefined,
      },
    ];
    setMessages(newMessages);
    setInput("");
    setChatAttachments([]);
    setIsLoading(true);
    setIsStopped(false);

    try {
      const contents = newMessages.map((m) => ({
        role: m.role === "ai" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      await new Promise((resolve) => setTimeout(resolve, 800));

      let responseText = "";
      const currentRound = newMessages.filter((m) => m.role === "user").length;

      if (currentRound % 3 === 1) {
        responseText =
          "关于您提到的财税问题，建议首先进行全面的税务合规风险评估。根据最新税收政策，针对中小微企业以及特定行业的企业（如高新技术企业、软件企业等），有许多新的税收减免或研发费用加计扣除政策。及时进行合规性排查，不仅能降低税务稽查风险，还能帮助企业合理合法地减轻税负。\n---\n请选择您想进一步了解的操作指导，以确定下一步重点：\n[单选] 税收减免申请流程详述\n[单选] 常见税务合规风险盘点\n[单选] 预约专家进行初步评估";
      } else if (currentRound % 3 === 2) {
        responseText =
          "企业所得税汇算清缴是一项系统且复杂的工作。其核心在于准确将企业的财务会计利润调整为应纳税所得额，包括各项收入的确认、各项扣除的计算以及税收优惠政策的准确适用。实际操作中，常见的易错点包括：业务招待费、广宣费的扣除限额计算，以及跨期费用的准确处理等。一旦处理不当，极易引发税务处罚。\n---\n若您近期在准备汇算清缴，我们可提供方案，您还可阅读：\n[多选] 查看当年汇算清缴避坑\n[多选] 咨询最新税率变动影响\n[多选] 了解高新企业审查要点";
      } else {
        responseText =
          "高新技术企业认定是一项含金量很高的资质。认定成功后，企业不仅可以享受15%的优惠所得税率，许多地方政府还会给予几十万甚至上百万的资金奖励。认定的关键硬性指标包括：研发投入在销售收入中的占比、高新技术产品（或服务）收入在总收入中的占比，以及科技人员占企业当年职工总数的比例等。\n---\n若要评估您企业是否达标，需要些基本数据，要做评估吗？\n[开放]";
      }

      const parts = responseText.split("\n---\n");
      const answerContent = parts[0].trim();

      let followUpText = undefined;
      let options: string[] = [];
      let optionType: "single" | "multiple" | "open" = "open" as const;

      if (parts.length > 1) {
        const followUpLines = parts[1].split("\n");
        const followUpDescLines = [];

        for (const line of followUpLines) {
          if (line.startsWith("[单选]")) {
            options.push(line.replace("[单选]", "").trim());
            optionType = "single";
          } else if (line.startsWith("[多选]")) {
            options.push(line.replace("[多选]", "").trim());
            optionType = "multiple";
          } else if (line.startsWith("[开放]")) {
            optionType = "open";
          } else {
            followUpDescLines.push(line);
          }
        }

        followUpText = followUpDescLines.join("\n").trim();
        if (!followUpText) followUpText = undefined;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: answerContent,
          followUpText,
          options: options.length > 0 ? options : undefined,
          optionType,
        },
      ]);
    } catch (error) {
      console.error("Chat failed:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "抱歉，我现在遇到了一点问题，请稍后再试。" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    setIsStopped(false);
    setIsLoading(true);
    // Mock continuing generation
    setTimeout(() => {
      setMessages((prev) => {
        const newMsgs = [...prev];
        if (newMsgs.length > 0 && newMsgs[newMsgs.length - 1].role === "ai") {
          newMsgs[newMsgs.length - 1].content += "\n\n（继续生成的内容...）";
        }
        return newMsgs;
      });
      setIsLoading(false);
    }, 1500);
  };

  const startNewChat = () => {
    setMessages([]);
    setIsHistoryOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] h-full overflow-hidden relative">
      {/* Removed Capsule Button */}

      {/* Header Tabs */}
      {activeTab === "ai_knowledge" ? (
        <div className="px-6 pt-5 pb-4 bg-white shrink-0 flex items-center justify-between relative z-40">
          <>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("ai")}
                className="p-1 -ml-1 text-gray-600"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="text-[18px] font-black text-gray-900">
                个人知识库
              </span>
            </div>
            <div className="flex items-center gap-4 mr-24">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-600"
              >
                <Search className="w-5 h-5" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsUploadMenuOpen(!isUploadMenuOpen)}
                  className="text-gray-600"
                >
                  <FilePlus className="w-5 h-5" />
                </button>
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isUploadMenuOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setIsUploadMenuOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                      >
                        {uploadOptions.map((option, index) => (
                          <React.Fragment key={index}>
                            <button
                              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-gray-700"
                              onClick={() => {
                                setIsUploadMenuOpen(false);
                                if (
                                  option.label === "本地文件" ||
                                  option.label === "图片"
                                ) {
                                  fileInputRef.current?.click();
                                } else if (option.label === "新建文件夹") {
                                  setNewFolderModalOpen(true);
                                } else {
                                  alert(`功能 [${option.label}] 开发中`);
                                }
                              }}
                            >
                              <option.icon className="w-5 h-5 text-gray-500" />
                              <span className="text-[15px]">
                                {option.label}
                              </span>
                            </button>
                            {option.divider &&
                              index < uploadOptions.length - 1 && (
                                <div className="h-px bg-gray-100 my-1 mx-4" />
                              )}
                          </React.Fragment>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        </div>
      ) : (
        <div className="px-6 pt-5 pb-4 bg-white shrink-0 relative flex items-center justify-center">
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="absolute left-6 p-2 text-gray-600 hover:text-gray-900 transition-colors z-50"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-8">
            <button
              onClick={() => setMainHeaderTab("ai_finance")}
              className={`text-[18px] tracking-wider transition-colors relative ${mainHeaderTab === "ai_finance" ? "font-black text-gray-900" : "font-bold text-gray-400"}`}
            >
              AI专家
              {mainHeaderTab === "ai_finance" && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-blue-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setMainHeaderTab("agents")}
              className={`text-[18px] tracking-wider transition-colors relative ${mainHeaderTab === "agents" ? "font-black text-gray-900" : "font-bold text-gray-400"}`}
            >
              智能体
              {mainHeaderTab === "agents" && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-blue-600 rounded-full" />
              )}
            </button>
          </div>


          {/* History Icon removed per user request */}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileUpload}
        accept=".pdf,.doc,.docx,.txt,image/*"
      />

      {mainHeaderTab === "agents" ? (
        <AgentsView />
      ) : activeTab === "ai" ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar"
          >
            {/* AI Welcome Header with Animation */}
            <div className="flex flex-col items-center py-12">
              <div className="relative w-48 h-48 mb-6">
                {/* Outer Glow Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 border border-blue-100 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-4 border border-blue-50 rounded-full"
                />

                {/* The Orb */}
                <div className="absolute inset-8 bg-gradient-to-br from-blue-100 via-blue-400 to-indigo-600 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.3)] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_60%)]" />
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-full h-full bg-blue-500/20 rounded-full blur-xl"
                  />
                </div>

                {/* Orbiting Dot */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                </motion.div>
              </div>

              <div className="text-center">
                <p className="text-gray-400 text-[14px] mb-1">嗨，我是大成AI</p>
                <h2 className="text-[24px] font-black text-gray-900 tracking-tight mb-4">
                  你的财税智能专家
                </h2>
              </div>
            </div>

            {messages.map((msg, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex flex-col gap-2 ${msg.role === "ai" ? "w-full max-w-[95%]" : "max-w-[85%]"}`}
                >
                  <div
                    className={`px-5 py-3.5 rounded-[28px] text-[15px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#3B82F6] text-white rounded-tr-none"
                        : "bg-[#F2F5F9] text-gray-800 rounded-tl-none"
                    }`}
                  >
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {msg.attachments.map((file, idx) => (
                          <div
                            key={idx}
                            className="relative group flex items-center bg-white/20 border border-white/30 rounded-lg p-1 pr-2"
                          >
                            {file.type === "image" ? (
                              <img
                                src={file.url}
                                alt={file.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded flex items-center justify-center shrink-0">
                                <FileText className="w-4 h-4" />
                              </div>
                            )}
                            <span className="text-[12px] text-white ml-2 max-w-[150px] truncate">
                              {file.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="markdown-body">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                    {msg.followUpText && (
                      <div className="mt-4 pt-4 border-t border-gray-200/60">
                        <div className="markdown-body text-[14px]">
                          <ReactMarkdown>{msg.followUpText}</ReactMarkdown>
                        </div>
                      </div>
                    )}
                    {msg.options && msg.options.length > 0 && (
                      <div className="mt-3 flex flex-col gap-3">
                        <div className="flex flex-wrap gap-2.5">
                          {msg.options.map((opt, idx) => {
                            const isSelected = selectedOptions.includes(opt);
                            const isLastMessage = i === messages.length - 1;
                            return (
                              <button
                                key={idx}
                                onClick={() => {
                                  if (!isLastMessage || isLoading) return;
                                  if (msg.optionType === "single") {
                                    handleSend(opt);
                                  } else if (msg.optionType === "multiple") {
                                    if (isSelected) {
                                      setSelectedOptions((prev) =>
                                        prev.filter((o) => o !== opt),
                                      );
                                    } else {
                                      setSelectedOptions((prev) => [
                                        ...prev,
                                        opt,
                                      ]);
                                    }
                                  }
                                }}
                                disabled={isLoading || !isLastMessage}
                                className={`relative px-4 py-2 rounded-xl text-[13.5px] text-left transition-all shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] ${
                                  !isLastMessage
                                    ? "bg-white/40 text-gray-400 cursor-not-allowed"
                                    : msg.optionType === "multiple" &&
                                        isSelected
                                      ? "bg-blue-600 text-white font-medium hover:bg-blue-700"
                                      : "bg-white text-gray-700 hover:bg-blue-50/50 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] hover:scale-[1.01] active:scale-[0.99]"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {msg.optionType === "multiple" &&
                          i === messages.length - 1 &&
                          !isLoading && (
                            <div className="flex justify-start mt-2">
                              <button
                                onClick={() => {
                                  if (selectedOptions.length > 0) {
                                    handleSend(selectedOptions.join("，"));
                                  }
                                }}
                                disabled={selectedOptions.length === 0}
                                className={`px-6 py-2 rounded-xl text-[13px] font-medium transition-all ${
                                  selectedOptions.length > 0
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                              >
                                发送
                              </button>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                  {msg.role === "ai" && (
                    <div className="flex items-center gap-4 px-2 mt-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(msg.content);
                          showToast("已复制到剪贴板");
                        }}
                        className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-blue-600 transition-colors"
                        title="复制"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setIsShareMode(true);
                          setSelectedShareMessages([i]);
                        }}
                        className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-blue-600 transition-colors"
                        title="分享"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          const icon = e.currentTarget.querySelector("svg");
                          if (icon) {
                            icon.classList.toggle("fill-current");
                            icon.classList.toggle("text-blue-600");
                          }
                        }}
                        className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-blue-600 transition-colors"
                        title="点赞"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          const icon = e.currentTarget.querySelector("svg");
                          if (icon) {
                            icon.classList.toggle("fill-current");
                            icon.classList.toggle("text-red-600");
                          }
                        }}
                        className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-red-600 transition-colors"
                        title="踩"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-5 py-3.5 rounded-[28px] rounded-tl-none flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
          </div>

          {/* Categories & Input Area */}
          <div className="px-5 pt-4 pb-32 shrink-0">
            {/* Horizontal Categories */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar mb-3 pb-2 px-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (cat.id === "expert") {
                      setActiveTab("expert");
                    } else if (cat.id === "call") {
                      setIsCallModalOpen(true);
                    } else {
                      setActiveCategory(cat.label);
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all relative ${
                    activeCategory === cat.label && cat.id !== "expert"
                      ? "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-100"
                  }`}
                >
                  {cat.label}
                  {activeCategory === cat.label && cat.id !== "expert" && (
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#7C3AED]" />
                  )}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="bg-white rounded-[20px] px-4 py-3 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              {/* Attachments Display */}
              {chatAttachments.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {chatAttachments.map((file, idx) => (
                    <div
                      key={idx}
                      className="relative group flex items-center bg-gray-50 border border-gray-100 rounded-lg p-1 pr-2"
                    >
                      {file.type === "image" ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-8 h-8 object-cover rounded"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded flex items-center justify-center">
                          <FileText className="w-4 h-4" />
                        </div>
                      )}
                      <span className="text-[12px] text-gray-700 ml-2 max-w-[100px] truncate">
                        {file.name}
                      </span>
                      <button
                        onClick={() =>
                          setChatAttachments((prev) =>
                            prev.filter((_, i) => i !== idx),
                          )
                        }
                        className="absolute -top-1.5 -right-1.5 bg-white border border-gray-200 text-gray-500 hover:text-red-500 rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Row 1: Input & Full Screen */}
              <div className="flex items-start gap-2">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${Math.min(e.target.scrollHeight, window.innerHeight * 0.75)}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="您可以这样问我：如何评估和管理并购后的财务风险？"
                  className="flex-1 bg-transparent border-none outline-none text-[14px] text-gray-900 placeholder:text-gray-300 resize-none no-scrollbar leading-relaxed min-h-[22px] max-h-[75vh]"
                />
                <button
                  onClick={() => setIsFullScreenInputOpen(true)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors shrink-0 mt-0.5"
                  title="全屏输入"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Row 2: New Chat & Send */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={startNewChat}
                    className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                    title="新建对话"
                  >
                    <MessageSquarePlus className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => chatFileInputRef.current?.click()}
                    className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                    title="上传图片或文件"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="file"
                    ref={chatFileInputRef}
                    className="hidden"
                    multiple
                    onChange={handleChatFileUpload}
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                </div>
                {isLoading ? (
                  <button
                    onClick={() => {
                      setIsLoading(false);
                      setIsStopped(true);
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95"
                    title="停止生成"
                  >
                    <Square className="w-4 h-4 fill-current" />
                  </button>
                ) : isStopped ? (
                  <button
                    onClick={handleContinue}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-blue-100 text-blue-600 hover:bg-blue-200 active:scale-95"
                    title="继续生成"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      input.trim()
                        ? "bg-blue-600 text-white shadow-md active:scale-95"
                        : "bg-gray-100 text-gray-300"
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <p className="text-[11px] text-gray-400 text-center mt-3 mb-1">
              AI生成请仔细甄别
            </p>
          </div>
        </div>
      ) : activeTab === "ai_knowledge" ? (
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {isSearchOpen ? (
            <div className="flex-1 flex flex-col bg-white z-50 absolute inset-0">
              <div className="px-6 pt-5 pb-4 flex items-center gap-3 border-b border-gray-50">
                <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2">
                  <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="搜索文件"
                    className="bg-transparent border-none focus:ring-0 text-[15px] w-full outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="p-1 shrink-0"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-[15px] text-gray-600 whitespace-nowrap font-medium"
                >
                  取消
                </button>
              </div>

              {!searchQuery ? (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[15px] font-bold text-gray-900">
                      我的标签
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {searchTags.map((tag, idx) => (
                      <div
                        key={idx}
                        className="group relative px-4 py-2 bg-gray-50 rounded-full text-[14px] text-gray-700 flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          setEditingTagIndex(idx);
                          setNewTagValue(tag);
                          setTagRenameModalOpen(true);
                        }}
                      >
                        <span>{tag}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchTags((prev) =>
                              prev.filter((_, i) => i !== idx),
                            );
                          }}
                          className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto no-scrollbar">
                  {knowledgeFiles
                    .filter((f) =>
                      f.title.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-4 p-4 border-b border-gray-50 transition-colors hover:bg-gray-50"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden shadow-sm">
                          {file.iconType === "folder" ? (
                            <div className="relative w-full h-full bg-[#FFE8A1] flex items-center justify-center">
                              <div className="absolute top-0 left-0 w-1/2 h-2 bg-[#FFD659] rounded-br-lg" />
                              <Folder
                                className="w-6 h-6 text-[#D4A017] mt-1"
                                fill="currentColor"
                              />
                            </div>
                          ) : file.iconType === "qa" ? (
                            <File
                              className="w-6 h-6 text-gray-200"
                              strokeWidth={1}
                            />
                          ) : file.iconType === "pdf" ? (
                            <div className="w-full h-full bg-blue-50/50 flex flex-col items-center justify-center p-1">
                              <div className="text-[6px] text-blue-600 font-bold leading-tight text-center">
                                大成方略名师手册
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center p-1">
                              <div className="text-[6px] text-gray-500 leading-tight text-center">
                                ima知识库使用指南
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[16px] text-gray-900 mb-1 truncate">
                            {file.title}
                          </div>
                          <div className="flex items-center gap-1.5 text-[13px] text-gray-400">
                            <div className="flex items-center gap-1">
                              {file.iconType === "folder" && (
                                <span className="text-gray-500">
                                  {file.fileCount || 0}个文件
                                </span>
                              )}
                              {file.iconType === "qa" && (
                                <Smile className="w-3.5 h-3.5 text-green-500" />
                              )}
                              {file.iconType === "pdf" && (
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="text-red-500"
                                >
                                  <path d="M12 2L22 20H2L12 2Z" />
                                </svg>
                              )}
                              {file.iconType === "word" && (
                                <span className="text-blue-600 font-black text-[12px] leading-none">
                                  W
                                </span>
                              )}
                              {file.iconType !== "folder" && (
                                <span className="text-gray-500">
                                  {file.type}
                                </span>
                              )}
                            </div>
                            <span className="text-gray-300">|</span>
                            <span>{file.date}</span>
                            {file.tags && file.tags.length > 0 && (
                              <>
                                <span className="text-gray-300">|</span>
                                <div className="flex items-center gap-1">
                                  {file.tags.map((tag: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px]"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Knowledge Base List */}
              <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                <div className="flex flex-col">
                  {knowledgeFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`flex items-center gap-4 p-4 border-b border-gray-50 transition-colors ${selectedFiles.includes(file.id) ? "bg-blue-50/50" : "hover:bg-gray-50"}`}
                      onClick={() => {
                        if (isMultiSelectMode) {
                          setSelectedFiles((prev) =>
                            prev.includes(file.id)
                              ? prev.filter((id) => id !== file.id)
                              : [...prev, file.id],
                          );
                        } else {
                          setActiveFile(file);
                          setFileActionModalOpen(true);
                        }
                      }}
                    >
                      {isMultiSelectMode && (
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${selectedFiles.includes(file.id) ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}
                        >
                          {selectedFiles.includes(file.id) && (
                            <Check className="w-3.5 h-3.5 text-white" />
                          )}
                        </div>
                      )}
                      <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden shadow-sm">
                        {file.iconType === "folder" ? (
                          <div className="relative w-full h-full bg-[#FFE8A1] flex items-center justify-center">
                            <div className="absolute top-0 left-0 w-1/2 h-2 bg-[#FFD659] rounded-br-lg" />
                            <Folder
                              className="w-6 h-6 text-[#D4A017] mt-1"
                              fill="currentColor"
                            />
                          </div>
                        ) : file.iconType === "qa" ? (
                          <File
                            className="w-6 h-6 text-gray-200"
                            strokeWidth={1}
                          />
                        ) : file.iconType === "pdf" ? (
                          <div className="w-full h-full bg-blue-50/50 flex flex-col items-center justify-center p-1">
                            <div className="text-[6px] text-blue-600 font-bold leading-tight text-center">
                              大成方略名师手册
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center p-1">
                            <div className="text-[6px] text-gray-500 leading-tight text-center">
                              ima知识库使用指南
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[16px] text-gray-900 mb-1 truncate">
                          {file.title}
                        </div>
                        <div className="flex items-center gap-1.5 text-[13px] text-gray-400">
                          <div className="flex items-center gap-1">
                            {file.iconType === "folder" && (
                              <span className="text-gray-500">
                                {file.fileCount || 0}个文件
                              </span>
                            )}
                            {file.iconType === "qa" && (
                              <Smile className="w-3.5 h-3.5 text-green-500" />
                            )}
                            {file.iconType === "pdf" && (
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="text-red-500"
                              >
                                <path d="M12 2L22 20H2L12 2Z" />
                              </svg>
                            )}
                            {file.iconType === "word" && (
                              <span className="text-blue-600 font-black text-[12px] leading-none">
                                W
                              </span>
                            )}
                            {file.iconType !== "folder" && (
                              <span className="text-gray-500">{file.type}</span>
                            )}
                          </div>
                          <span className="text-gray-300">|</span>
                          <span>{file.date}</span>
                          {file.tags && file.tags.length > 0 && (
                            <>
                              <span className="text-gray-300">|</span>
                              <div className="flex items-center gap-1">
                                {file.tags.map((tag: string, idx: number) => (
                                  <span
                                    key={idx}
                                    className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px]"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="shrink-0 px-4 pt-4 pb-32 bg-white">
                <div className="bg-white rounded-full px-4 py-2.5 border border-gray-200 flex items-center gap-3 shadow-sm">
                  <input
                    type="text"
                    placeholder="基于知识库提问"
                    className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] outline-none placeholder-gray-400"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && input.trim()) {
                        setActiveTab("ai");
                        handleSend();
                      }
                    }}
                  />
                  <button className="w-8 h-8 rounded-full border-[1.5px] border-gray-700 flex items-center justify-center shrink-0 text-gray-700 hover:bg-gray-50 transition-colors">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="2" />
                      <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
                    </svg>
                  </button>
                  <button className="w-8 h-8 rounded-full border-[1.5px] border-gray-700 flex items-center justify-center shrink-0 text-gray-700 hover:bg-gray-50 transition-colors">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (input.trim()) {
                        setActiveTab("ai");
                        handleSend();
                      }
                    }}
                    className={`w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${
                      input.trim()
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-700 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {input.trim() ? (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : activeTab === "expert" ? (
        <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
          {/* Expert Q&A Tab */}
          <div className="p-5">
            {/* Expert Tabs */}
            <div className="flex items-center gap-6 mb-6 border-b border-gray-100 pb-2">
              <button
                onClick={() => setExpertTab("recommend")}
                className={`text-[15px] font-bold transition-colors relative pb-2 ${expertTab === "recommend" ? "text-gray-900" : "text-gray-400"}`}
              >
                推荐专家
                {expertTab === "recommend" && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-blue-600 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setExpertTab("favorite")}
                className={`text-[15px] font-bold transition-colors relative pb-2 ${expertTab === "favorite" ? "text-gray-900" : "text-gray-400"}`}
              >
                收藏专家
                {expertTab === "favorite" && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-blue-600 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setExpertTab("history")}
                className={`text-[15px] font-bold transition-colors relative pb-2 ${expertTab === "history" ? "text-gray-900" : "text-gray-400"}`}
              >
                答疑记录
                {expertTab === "history" && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-blue-600 rounded-full" />
                )}
              </button>
            </div>

            {(expertTab === "recommend" || expertTab === "favorite") && (
              <div className="space-y-4 mb-8">
                {experts.map((expert) => (
                  <div
                    key={expert.id}
                    onClick={() => setSelectedExpert(expert)}
                    className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-50 flex gap-4 cursor-pointer active:scale-[0.98] transition-all"
                  >
                    <img
                      src={expert.avatar}
                      className="w-14 h-14 rounded-2xl object-cover shrink-0"
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <span className="text-[15px] font-bold text-gray-900">
                            {expert.name}
                          </span>
                          <span className="ml-2 text-[11px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                            {expert.title}
                          </span>
                          {expert.tags?.map((tag: string) => (
                            <span
                              key={tag}
                              className="ml-2 text-[11px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                          <Star
                            className="w-4 h-4 hover:text-yellow-500 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          />
                          <Share2
                            className="w-4 h-4 hover:text-blue-500 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShareContent(expert);
                              setIsH5CardModalOpen(true);
                            }}
                          />
                        </div>
                      </div>
                      <p className="text-[12px] text-gray-500 mb-2">
                        擅长：{expert.specialty}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-gray-400">
                          {expert.calls}次答疑记录
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCallExpert(expert);
                          }}
                          className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center active:scale-95 transition-transform"
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {expertTab === "history" && (
              <div className="space-y-3">
                {callRecords.map((record) => (
                  <div
                    key={record.id}
                    className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-50 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={record.avatar}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                        alt=""
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-[14px] font-bold text-gray-800">
                          {record.expert}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {record.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-[13px] font-bold text-gray-700">
                          {record.duration}
                        </p>
                        <p className="text-[11px] text-green-500">
                          {record.status}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleCallExpert(
                            experts.find((e) => e.name === record.expert),
                          )
                        }
                        className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center active:scale-95 transition-transform"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* History Drawer */}
      <AnimatePresence>
        {isHistoryOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm z-[150]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="absolute top-0 left-0 bottom-0 w-[85%] bg-white z-[160] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[18px] font-black text-gray-900">
                    历史记录
                  </h3>
                  <button onClick={() => setIsHistoryOpen(false)}>
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                {/* Search Bar and New Chat in Drawer */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                      placeholder="搜索历史记录..."
                      className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-10 text-[14px] outline-none focus:ring-2 focus:ring-blue-500/10"
                    />
                    {historySearch && (
                      <button
                        onClick={() => setHistorySearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                {(() => {
                  const filteredHistory = chatHistory.filter((item) =>
                    item.title
                      .toLowerCase()
                      .includes(historySearch.toLowerCase()),
                  );

                  if (filteredHistory.length === 0) {
                    return (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400 pb-20">
                        <div className="w-24 h-24 mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                          <FileSearch className="w-10 h-10 text-gray-300" />
                        </div>
                        <p className="text-[14px]">暂无搜索结果</p>
                      </div>
                    );
                  }

                  return filteredHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group relative"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-[14px] font-bold text-gray-800 line-clamp-1 pr-8">
                          {item.title}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHistoryItemAction(item.id);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-400">{item.date}</p>
                    </div>
                  ));
                })()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* History Action Bottom Sheet */}
      <AnimatePresence>
        {activeHistoryItemAction && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveHistoryItemAction(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm z-[200]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-gray-100 rounded-t-3xl z-[210] overflow-hidden"
            >
              <div className="p-2 pb-8">
                <div className="bg-white rounded-2xl mb-2 overflow-hidden">
                  <button
                    onClick={() => {
                      // Handle delete
                      setActiveHistoryItemAction(null);
                    }}
                    className="w-full py-4 text-[16px] text-gray-900 text-center active:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    删除
                  </button>
                  <button
                    onClick={() => {
                      // Handle rename
                      setActiveHistoryItemAction(null);
                    }}
                    className="w-full py-4 text-[16px] text-gray-900 text-center active:bg-gray-50 transition-colors"
                  >
                    重命名
                  </button>
                </div>
                <button
                  onClick={() => setActiveHistoryItemAction(null)}
                  className="w-full py-4 bg-white rounded-2xl text-[16px] text-gray-900 text-center font-medium active:bg-gray-50 transition-colors"
                >
                  取消
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Expert Call Page */}
      <AnimatePresence>
        {selectedExpert && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="absolute inset-0 bg-white z-[200] flex flex-col"
          >
            <div className="px-6 pt-5 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedExpert(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h3 className="text-[18px] font-bold text-gray-900">
                  专家详情
                </h3>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col items-center mb-8">
                <img
                  src={selectedExpert.avatar}
                  className="w-24 h-24 rounded-[32px] object-cover shadow-xl mb-4"
                  alt=""
                />
                <h2 className="text-[22px] font-black text-gray-900">
                  {selectedExpert.name}
                </h2>
                <p className="text-blue-600 font-bold text-[14px]">
                  {selectedExpert.title}
                </p>
                <div className="flex gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-[18px] font-black text-gray-900">
                      {selectedExpert.calls}次
                    </p>
                    <p className="text-[11px] text-gray-400">答疑</p>
                  </div>
                  <div className="w-px h-8 bg-gray-100"></div>
                  <div className="text-center">
                    <p className="text-[18px] font-black text-gray-900">15年</p>
                    <p className="text-[11px] text-gray-400">经验</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-2">
                    专业擅长
                  </h4>
                  <p className="text-[14px] text-gray-600 leading-relaxed">
                    {selectedExpert.specialty}
                  </p>
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-2">
                    专家简介
                  </h4>
                  <p className="text-[14px] text-gray-600 leading-relaxed">
                    {selectedExpert.experience}
                    。深耕财税领域多年，曾为多家世界500强企业提供税务咨询服务，擅长解决复杂的财税难题。
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-100 pb-10 flex items-center gap-4 relative z-50">
              <div className="flex items-center gap-6 px-1">
                <button
                  onClick={() => {
                    const newStatus = !isFavorited;
                    setIsFavorited(newStatus);
                    setToastMessage(newStatus ? "已加入收藏" : "已取消收藏");
                    setTimeout(() => setToastMessage(null), 2000);
                  }}
                  className="flex flex-col items-center gap-1 group"
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${isFavorited ? "text-orange-400 fill-orange-400" : "text-gray-400 group-hover:text-orange-400"}`}
                  />
                  <span
                    className={`text-[11px] font-medium transition-colors ${isFavorited ? "text-orange-400" : "text-gray-400"}`}
                  >
                    收藏
                  </span>
                </button>
                <button
                  onClick={() => {
                    setShareContent(selectedExpert);
                    setIsH5CardModalOpen(true);
                  }}
                  className="flex flex-col items-center gap-1 group"
                >
                  <Share2 className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <span className="text-[11px] text-gray-400 font-medium">
                    分享
                  </span>
                </button>
              </div>

              <button
                onClick={() => handleCallExpert(selectedExpert)}
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-[16px] shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Phone className="w-5 h-5 fill-white" /> 拨打专家
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Input Modal */}
      <AnimatePresence>
        {isFullScreenInputOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-0 bg-white z-[300] flex flex-col"
          >
            <div className="px-4 pt-5 pb-4 flex items-center justify-between border-b border-gray-100">
              <button
                onClick={() => setIsFullScreenInputOpen(false)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h3 className="text-[16px] font-bold text-gray-900">全屏输入</h3>
              <div className="w-10"></div>
            </div>
            <div className="flex-1 p-4 flex flex-col">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="您可以这样问我：如何评估和管理并购后的财务风险？"
                className="flex-1 w-full bg-transparent border-none outline-none text-[16px] text-gray-900 placeholder:text-gray-300 resize-none no-scrollbar leading-relaxed"
                autoFocus
              />
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end">
              {isLoading ? (
                <button
                  onClick={() => {
                    setIsLoading(false);
                    setIsStopped(true);
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95"
                  title="停止生成"
                >
                  <Square className="w-5 h-5 fill-current" />
                </button>
              ) : isStopped ? (
                <button
                  onClick={handleContinue}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-blue-100 text-blue-600 hover:bg-blue-200 active:scale-95"
                  title="继续生成"
                >
                  <Play className="w-5 h-5 fill-current" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsFullScreenInputOpen(false);
                    handleSend();
                  }}
                  disabled={!input.trim()}
                  className={`px-6 py-2.5 rounded-full font-bold text-[15px] transition-all ${
                    input.trim()
                      ? "bg-blue-600 text-white shadow-md active:scale-95"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  发送
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Selection Modal */}
      <AnimatePresence>
        {isShareMode && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-gray-50 z-[200] flex flex-col"
          >
            {/* Header */}
            <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm shrink-0">
              <button
                onClick={() => {
                  setIsShareMode(false);
                  setSelectedShareMessages([]);
                }}
                className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-[17px] font-medium text-gray-900">
                选择分享内容
              </h3>
              <div className="w-10"></div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-5 pb-32">
              <div className="flex flex-col gap-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className="flex cursor-pointer"
                    onClick={() => {
                      setSelectedShareMessages((prev) =>
                        prev.includes(i)
                          ? prev.filter((idx) => idx !== i)
                          : [...prev, i],
                      );
                    }}
                  >
                    <div className="flex items-center justify-center w-8 shrink-0 mr-2">
                      {selectedShareMessages.includes(i) ? (
                        <CheckSquare className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                    <div
                      className={`flex flex-col gap-2 ${msg.role === "ai" ? "w-full max-w-[95%]" : "max-w-[85%] ml-auto"}`}
                    >
                      <div
                        className={`px-5 py-3.5 rounded-[28px] text-[15px] leading-relaxed ${
                          msg.role === "user"
                            ? "bg-[#3B82F6] text-white rounded-tr-none"
                            : "bg-[#F2F5F9] text-gray-800 rounded-tl-none border border-gray-100 shadow-sm"
                        } ${selectedShareMessages.includes(i) ? "ring-2 ring-blue-500" : ""}`}
                      >
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {msg.attachments.map((file, idx) => (
                              <div
                                key={idx}
                                className="relative group flex items-center bg-white/20 border border-white/30 rounded-lg p-1 pr-2"
                              >
                                {file.type === "image" ? (
                                  <img
                                    src={file.url}
                                    alt={file.name}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                ) : (
                                  <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded flex items-center justify-center shrink-0">
                                    <FileText className="w-4 h-4" />
                                  </div>
                                )}
                                <span className="text-[12px] text-white ml-2 max-w-[150px] truncate">
                                  {file.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="markdown-body">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe">
              <div className="flex items-center justify-between">
                <div className="text-[15px] text-gray-600">
                  已选择{" "}
                  <span className="font-bold text-blue-600">
                    {selectedShareMessages.length}
                  </span>{" "}
                  条
                </div>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => {
                      if (selectedShareMessages.length > 0) {
                        const selectedContent = selectedShareMessages
                          .sort((a, b) => a - b)
                          .map((idx) => messages[idx])
                          .map(
                            (msg) =>
                              `${msg.role === "user" ? "我" : "大成AI"}：\n${msg.content}`,
                          )
                          .join("\n\n");
                        setShareContent(selectedContent);
                        setShareFormat("image");
                        setIsAiShareModalOpen(true);
                        // Do not close share mode yet, let it be underneath or close it
                      }
                    }}
                    disabled={selectedShareMessages.length === 0}
                    className={`flex flex-col items-center gap-1 transition-colors ${
                      selectedShareMessages.length > 0
                        ? "text-gray-700 hover:text-blue-600"
                        : "text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-medium">图片分享</span>
                  </button>
                  <button
                    onClick={() => {
                      if (selectedShareMessages.length > 0) {
                        showToast("链接复制成功");
                        setIsShareMode(false);
                        setSelectedShareMessages([]);
                      }
                    }}
                    disabled={selectedShareMessages.length === 0}
                    className={`flex flex-col items-center gap-1 transition-colors ${
                      selectedShareMessages.length > 0
                        ? "text-gray-700 hover:text-blue-600"
                        : "text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                      <Link className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-medium">链接分享</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Share Modal */}
      <AnimatePresence>
        {isAiShareModalOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-gray-50 z-[300] flex flex-col"
          >
            {/* Header */}
            <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm shrink-0">
              <button
                onClick={() => setIsAiShareModalOpen(false)}
                className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-[17px] font-medium text-gray-900">
                分享预览
              </h3>
              <div className="w-10"></div> {/* Spacer for centering */}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 pb-44">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[15px]">
                      大成AI
                    </h4>
                    <p className="text-[12px] text-gray-500 mt-0.5">
                      您的智能财税专家
                    </p>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                  <ReactMarkdown>{shareContent || ""}</ReactMarkdown>
                </div>
                <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-12 h-12 text-gray-300" />
                    <div className="text-[11px] text-gray-400">
                      <p>扫描二维码进入小程序</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-300">来自大成财税</div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#F7F7F7] border-t border-gray-100 p-4 pb-8 flex flex-col items-center gap-4 shrink-0 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
              <div className="grid grid-cols-4 gap-2 w-full max-w-[320px] justify-items-center">
                {[
                  {
                    icon: <MessageCircle className="w-5 h-5 text-emerald-500" />,
                    label: "微信好友",
                    handler: () => {
                      showToast("已准备好发送给微信好友");
                      setIsAiShareModalOpen(false);
                      setIsShareMode(false);
                      setSelectedShareMessages([]);
                    }
                  },
                  {
                    icon: <Share2 className="w-5 h-5 text-green-500" />,
                    label: "朋友圈",
                    handler: () => {
                      showToast("已生成朋友圈海报");
                      setIsAiShareModalOpen(false);
                      setIsShareMode(false);
                      setSelectedShareMessages([]);
                    }
                  },
                  {
                    icon: <Star className="w-5 h-5 text-orange-400" />,
                    label: "收藏",
                    handler: () => {
                      showToast("已添加到收藏");
                      setIsAiShareModalOpen(false);
                      setIsShareMode(false);
                      setSelectedShareMessages([]);
                    }
                  },
                  {
                    icon: <Download className="w-5 h-5 text-blue-500" />,
                    label: "下载",
                    handler: () => {
                      showToast("已保存到相册");
                      setIsAiShareModalOpen(false);
                      setIsShareMode(false);
                      setSelectedShareMessages([]);
                    }
                  },
                ].map((opt, i) => (
                  <div
                    key={i}
                    onClick={opt.handler}
                    className="flex flex-col items-center gap-2 min-w-[60px] active:scale-95 transition-transform cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                      {opt.icon}
                    </div>
                    <span className="text-[11px] text-gray-600 text-center font-medium">{opt.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* H5 Card Modal */}
      <AnimatePresence>
        {isH5CardModalOpen && shareContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-[400] flex flex-col items-center justify-center p-6"
            onClick={() => setIsH5CardModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-[320px] bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <img
                  src={shareContent.avatar}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white/20 shadow-lg mx-auto mb-4 relative z-10"
                  alt=""
                />
                <h3 className="text-[24px] font-black text-white relative z-10">
                  {shareContent.name}
                </h3>
                <p className="text-blue-100 font-medium text-[14px] relative z-10">
                  {shareContent.title}
                </p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-[12px] text-gray-500 mb-1">擅长领域</p>
                  <p className="text-[14px] text-gray-800 font-medium leading-relaxed">
                    {shareContent.specialty}
                  </p>
                </div>
                <div className="mb-6">
                  <p className="text-[12px] text-gray-500 mb-1">专家简介</p>
                  <p className="text-[14px] text-gray-800 font-medium leading-relaxed">
                    {shareContent.experience}
                    。深耕财税领域多年，曾为多家企业提供专业服务，擅长解决复杂的财税难题。
                  </p>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
                  <div className="flex-1 pr-4">
                    <p className="text-[12px] text-gray-500 mb-1">
                      扫码或点击咨询
                    </p>
                    <p className="text-[10px] text-gray-400">
                      长按识别二维码进入大成财税小程序，注册后即可与专家一对一沟通
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-sm flex items-center justify-center text-gray-400 text-[10px]">
                      二维码
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    alert("模拟跳转：进入小程序 -> 注册 -> 专家详情页 -> 拨打");
                    setIsH5CardModalOpen(false);
                  }}
                  className="w-full mt-6 bg-blue-600 text-white font-bold py-3.5 rounded-xl active:scale-[0.98] transition-transform shadow-lg shadow-blue-600/20"
                >
                  立即咨询
                </button>
              </div>
            </motion.div>

            {/* Share Widget Below Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="mt-6 grid grid-cols-4 gap-4 w-full max-w-[320px]"
            >
              <button
                onClick={() => {
                  alert("调用小程序分享组件：分享给好友");
                  setIsH5CardModalOpen(false);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-[12px] text-white/80">分享给好友</span>
              </button>
              <button
                onClick={() => {
                  alert("调用小程序分享组件：分享朋友圈");
                  setIsH5CardModalOpen(false);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white">
                  <Share2 className="w-6 h-6" />
                </div>
                <span className="text-[12px] text-white/80">分享朋友圈</span>
              </button>
              <button
                onClick={() => {
                  alert("调用小程序分享组件：收藏");
                  setIsH5CardModalOpen(false);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white">
                  <Star className="w-6 h-6" />
                </div>
                <span className="text-[12px] text-white/80">收藏</span>
              </button>
              <button
                onClick={() => {
                  alert("调用小程序分享组件：下载");
                  setIsH5CardModalOpen(false);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white">
                  <Download className="w-6 h-6" />
                </div>
                <span className="text-[12px] text-white/80">下载</span>
              </button>
            </motion.div>

            <button
              onClick={() => setIsH5CardModalOpen(false)}
              className="mt-8 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Out of Hours Modal */}
      <AnimatePresence>
        {isOutOfHoursModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 z-[400] flex items-center justify-center p-6"
            onClick={() => setIsOutOfHoursModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-[300px] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-[18px] font-bold text-gray-900 text-center mb-2">
                非工作时间
              </h3>
              <p className="text-[14px] text-gray-600 text-center leading-relaxed mb-6">
                专家的工作时间为
                <span className="font-bold text-gray-800">
                  <br />
                  工作日 08:30 - 17:30
                </span>
                。<br />
                请您在工作时间段内发起咨询，感谢您的理解与支持！
              </p>
              <button
                onClick={() => setIsOutOfHoursModalOpen(false)}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl active:scale-[0.98] transition-transform"
              >
                我知道了
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multi-select Bottom Bar */}
      <AnimatePresence>
        {isMultiSelectMode && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-between z-[100] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-8"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setIsMultiSelectMode(false);
                  setSelectedFiles([]);
                }}
                className="text-[15px] text-gray-400 font-medium"
              >
                取消
              </button>
              <button
                onClick={() => {
                  if (selectedFiles.length === knowledgeFiles.length) {
                    setSelectedFiles([]);
                  } else {
                    setSelectedFiles(knowledgeFiles.map((f) => f.id));
                  }
                }}
                className="text-[15px] text-gray-900 font-medium"
              >
                {selectedFiles.length === knowledgeFiles.length
                  ? "取消全选"
                  : "全选"}
              </button>
            </div>
            <div className="flex items-center gap-6">
              <button
                className="flex flex-col items-center gap-1 text-gray-500"
                onClick={() => setMoveModalOpen(true)}
              >
                <FolderPlus className="w-5 h-5" />
                <span className="text-[10px]">移动</span>
              </button>
              <button
                className="flex flex-col items-center gap-1 text-red-500"
                onClick={() => {
                  setKnowledgeFiles((prev) =>
                    prev.filter((f) => !selectedFiles.includes(f.id)),
                  );
                  setIsMultiSelectMode(false);
                  setSelectedFiles([]);
                }}
              >
                <Trash2 className="w-5 h-5" />
                <span className="text-[10px]">删除</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Action Modal */}
      <AnimatePresence>
        {fileActionModalOpen && activeFile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[100]"
              onClick={() => setFileActionModalOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[100] overflow-hidden pb-8"
            >
              <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  {activeFile.iconType === "qa" ? (
                    <File className="w-5 h-5 text-gray-400" />
                  ) : (
                    <FileText className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold text-gray-900 truncate">
                    {activeFile.title}
                  </div>
                  <div className="text-[12px] text-gray-400">
                    {activeFile.date}
                  </div>
                </div>
              </div>
              <div className="p-2">
                <button
                  className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-50 transition-colors text-gray-700"
                  onClick={() => {
                    setFileActionModalOpen(false);
                    setIsMultiSelectMode(true);
                    setSelectedFiles([activeFile.id]);
                  }}
                >
                  <CheckSquare className="w-5 h-5 text-gray-400" />
                  <span className="text-[15px]">多选</span>
                </button>
                <button
                  className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-50 transition-colors text-gray-700"
                  onClick={() => {
                    setFileActionModalOpen(false);
                    setTagModalOpen(true);
                  }}
                >
                  <Tag className="w-5 h-5 text-gray-400" />
                  <span className="text-[15px]">编辑标签</span>
                </button>
                <button
                  className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-50 transition-colors text-gray-700"
                  onClick={() => {
                    setFileActionModalOpen(false);
                    setNewFileName(activeFile.title);
                    setRenameModalOpen(true);
                  }}
                >
                  <Edit2 className="w-5 h-5 text-gray-400" />
                  <span className="text-[15px]">重命名</span>
                </button>
                <button
                  className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-50 transition-colors text-gray-700"
                  onClick={() => {
                    setFileActionModalOpen(false);
                    setMoveModalOpen(true);
                  }}
                >
                  <FolderInput className="w-5 h-5 text-gray-400" />
                  <span className="text-[15px]">移动到</span>
                </button>
                <button
                  className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-50 transition-colors text-red-500"
                  onClick={() => {
                    setKnowledgeFiles((prev) =>
                      prev.filter((f) => f.id !== activeFile.id),
                    );
                    setFileActionModalOpen(false);
                  }}
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                  <span className="text-[15px]">删除</span>
                </button>
              </div>
              <div className="h-2 bg-gray-50" />
              <button
                className="w-full p-4 text-[16px] font-medium text-gray-600 active:bg-gray-50 transition-colors"
                onClick={() => setFileActionModalOpen(false)}
              >
                取消
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Tag Rename Modal */}
      <AnimatePresence>
        {tagRenameModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setTagRenameModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl"
            >
              <div className="p-6">
                <h3 className="text-[18px] font-bold text-gray-900 mb-4 text-center">
                  重命名标签
                </h3>
                <input
                  type="text"
                  value={newTagValue}
                  onChange={(e) => setNewTagValue(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  autoFocus
                />
              </div>
              <div className="flex border-t border-gray-100">
                <button
                  className="flex-1 py-4 text-[16px] font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                  onClick={() => setTagRenameModalOpen(false)}
                >
                  取消
                </button>
                <div className="w-px bg-gray-100" />
                <button
                  className="flex-1 py-4 text-[16px] font-bold text-blue-600 hover:bg-blue-50 transition-colors"
                  onClick={() => {
                    if (newTagValue.trim() && editingTagIndex !== null) {
                      setSearchTags((prev) =>
                        prev.map((t, i) =>
                          i === editingTagIndex ? newTagValue.trim() : t,
                        ),
                      );
                    }
                    setTagRenameModalOpen(false);
                  }}
                >
                  确定
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rename Modal */}
      <AnimatePresence>
        {renameModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setRenameModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl"
            >
              <div className="p-6">
                <h3 className="text-[18px] font-bold text-gray-900 mb-4 text-center">
                  重命名
                </h3>
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  autoFocus
                />
              </div>
              <div className="flex border-t border-gray-100">
                <button
                  className="flex-1 py-4 text-[16px] font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                  onClick={() => setRenameModalOpen(false)}
                >
                  取消
                </button>
                <div className="w-px bg-gray-100" />
                <button
                  className="flex-1 py-4 text-[16px] font-bold text-blue-600 hover:bg-blue-50 transition-colors"
                  onClick={() => {
                    if (newFileName.trim()) {
                      setKnowledgeFiles((prev) =>
                        prev.map((f) =>
                          f.id === activeFile?.id
                            ? { ...f, title: newFileName.trim() }
                            : f,
                        ),
                      );
                    }
                    setRenameModalOpen(false);
                  }}
                >
                  确定
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* New Folder Modal */}
      <AnimatePresence>
        {newFolderModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setNewFolderModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl"
            >
              <div className="p-6">
                <h3 className="text-[18px] font-bold text-gray-900 mb-4 text-center">
                  新建文件夹
                </h3>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="请输入文件夹名称"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  autoFocus
                />
              </div>
              <div className="flex border-t border-gray-100">
                <button
                  className="flex-1 py-4 text-[16px] font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                  onClick={() => setNewFolderModalOpen(false)}
                >
                  取消
                </button>
                <div className="w-px bg-gray-100" />
                <button
                  className="flex-1 py-4 text-[16px] font-bold text-blue-600 hover:bg-blue-50 transition-colors"
                  onClick={() => {
                    if (newFolderName.trim()) {
                      const newFolder = {
                        id: Date.now(),
                        title: newFolderName.trim(),
                        type: "文件夹",
                        date: new Date()
                          .toLocaleDateString("zh-CN", {
                            year: "2-digit",
                            month: "numeric",
                            day: "numeric",
                          })
                          .replace(/\//g, "/"),
                        iconType: "folder",
                      };
                      setKnowledgeFiles((prev) => [newFolder, ...prev]);
                    }
                    setNewFolderModalOpen(false);
                    setNewFolderName("");
                  }}
                >
                  确定
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Move Modal */}
      <AnimatePresence>
        {moveModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setMoveModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl"
            >
              <div className="p-6">
                <h3 className="text-[18px] font-bold text-gray-900 mb-4 text-center">
                  移动到
                </h3>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  <div className="p-3 rounded-xl border border-blue-500 bg-blue-50 flex items-center gap-3 cursor-pointer">
                    <Folder className="w-5 h-5 text-blue-500" />
                    <span className="text-[15px] font-medium text-blue-700">
                      根目录
                    </span>
                    <Check className="w-4 h-4 text-blue-500 ml-auto" />
                  </div>
                  {knowledgeFiles
                    .filter((f) => f.iconType === "folder")
                    .map((folder) => (
                      <div
                        key={folder.id}
                        className="p-3 rounded-xl border border-gray-100 hover:bg-gray-50 flex items-center gap-3 cursor-pointer transition-colors"
                      >
                        <Folder className="w-5 h-5 text-gray-400" />
                        <span className="text-[15px] text-gray-700">
                          {folder.title}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex border-t border-gray-100">
                <button
                  className="flex-1 py-4 text-[16px] font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                  onClick={() => setMoveModalOpen(false)}
                >
                  取消
                </button>
                <div className="w-px bg-gray-100" />
                <button
                  className="flex-1 py-4 text-[16px] font-bold text-blue-600 hover:bg-blue-50 transition-colors"
                  onClick={() => {
                    alert("已移动");
                    setMoveModalOpen(false);
                    setIsMultiSelectMode(false);
                    setSelectedFiles([]);
                  }}
                >
                  确定
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tag Modal */}
      <AnimatePresence>
        {tagModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setTagModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl"
            >
              <div className="p-6">
                <h3 className="text-[18px] font-bold text-gray-900 mb-4 text-center">
                  编辑标签
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[13px] font-medium flex items-center gap-1">
                    财税 <X className="w-3 h-3 cursor-pointer" />
                  </span>
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-[13px] font-medium flex items-center gap-1">
                    报表 <X className="w-3 h-3 cursor-pointer" />
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="输入新标签，按回车添加"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <div className="flex border-t border-gray-100">
                <button
                  className="flex-1 py-4 text-[16px] font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                  onClick={() => setTagModalOpen(false)}
                >
                  取消
                </button>
                <div className="w-px bg-gray-100" />
                <button
                  className="flex-1 py-4 text-[16px] font-bold text-blue-600 hover:bg-blue-50 transition-colors"
                  onClick={() => {
                    alert("标签已保存");
                    setTagModalOpen(false);
                  }}
                >
                  确定
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <PurchaseModal
        isOpen={isExpertPurchaseModalOpen}
        onClose={() => setIsExpertPurchaseModalOpen(false)}
        itemType="expert"
        itemTitle={
          selectedExpertForPurchase
            ? `与专家 ${selectedExpertForPurchase.name} 咨询`
            : ""
        }
        price={199}
        points={1990}
      />

      <CallExpertModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />

      <ExpertConsultationModal
        isOpen={isExpertConsultationModalOpen}
        onClose={() => setIsExpertConsultationModalOpen(false)}
        expert={selectedExpertForConsultation}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[1000] px-6 py-3 bg-gray-900/90 backdrop-blur-md text-white text-[14px] font-bold rounded-full shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MemberPage = ({ onBack }: { onBack?: () => void }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalType, setLeadModalType] = useState<"purchase" | "renew">(
    "purchase",
  );
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "wechat" | "alipay"
  >("wechat");
  const [isScrolled, setIsScrolled] = useState(false);

  const cards = [
    {
      id: 1,
      name: "金卡会员",
      company: "北京大成科技有限公司",
      validity: "2024.01.01 - 2025.01.01",
      orderNo: "NO.8553 0778",
      theme: "gold",
      isOwned: false,
      price: 99,
    },
    {
      id: 2,
      name: "皇冠会员",
      company: "上海财税咨询有限公司",
      validity: "2024.03.15 - 2025.03.15",
      orderNo: "NO.8553 0779",
      theme: "crown",
      isOwned: true,
      price: 299,
    },
    {
      id: 3,
      name: "至臻会员",
      company: "广州企业管理有限公司",
      validity: "2024.06.20 - 2025.06.20",
      orderNo: "NO.8553 0780",
      theme: "diamond",
      isOwned: false,
      price: 999,
    },
    {
      id: 4,
      name: "非标会员卡",
      company: "灵活组合专属服务",
      validity: "按需定制",
      orderNo: "NO.8553 0781",
      theme: "custom",
      isOwned: false,
      price: "定制",
    },
  ];

  const handlePrev = () => setActiveCardIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setActiveCardIndex((prev) => Math.min(cards.length - 1, prev + 1));

  const handlePaymentConfirm = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Close modal after showing success
      setTimeout(() => {
        setPaymentSuccess(false);
        setIsPaymentModalOpen(false);
      }, 2000);
    }, 1500);
  };

  const getCardStyle = (theme: string) => {
    switch (theme) {
      case "gold":
        return "bg-gradient-to-br from-[#4A3B22] via-[#2A2010] to-[#140F05]";
      case "crown":
        return "bg-gradient-to-br from-[#20366b] via-[#122045] to-[#0a122c]";
      case "diamond":
        return "bg-gradient-to-br from-[#2A2A40] via-[#151525] to-[#0A0A14]";
      case "custom":
        return "bg-gradient-to-br from-[#1E3A5F] via-[#0F1D30] to-[#080F1A]";
      default:
        return "bg-[#1A1C35]";
    }
  };

  return (
    <div
      className="flex-1 overflow-y-auto no-scrollbar bg-[#05050F] text-white pb-32 relative"
      onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 10)}
    >
      {/* Background gradient effect */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[#1A1C4B]/30 to-transparent pointer-events-none"></div>

      {/* Header */}
      <div
        className={`px-4 pt-5 pb-4 flex items-center justify-between sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#05050F] shadow-md border-b border-white/5" : "bg-transparent"}`}
      >
        <button onClick={() => onBack?.()} className="w-8 h-8 flex items-center justify-center -ml-2 active:bg-white/10 rounded-full transition-colors z-10">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 text-[17px] font-medium">
          会员中心
        </div>
        <div className="w-10"></div>
      </div>

      {/* Card Section */}
      <div className="mt-6 relative w-full overflow-hidden flex justify-center items-center h-[200px]">
        <AnimatePresence initial={false}>
          {cards.map((card, index) => {
            const diff = index - activeCardIndex;
            if (Math.abs(diff) > 1) return null;

            const isCenter = diff === 0;
            const isLeft = diff < 0;
            const isRight = diff > 0;

            return (
              <motion.div
                key={card.id}
                initial={false}
                animate={{
                  x: isCenter ? 0 : isLeft ? -150 : 150,
                  scale: isCenter ? 1 : 0.85,
                  opacity: isCenter ? 1 : 0.4,
                  zIndex: isCenter ? 10 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => {
                  if (isLeft) handlePrev();
                  if (isRight) handleNext();
                }}
                className={`absolute w-[300px] h-[180px] rounded-2xl p-5 flex flex-col justify-between shadow-2xl shadow-black/80 cursor-pointer overflow-hidden ${getCardStyle(card.theme)}`}
              >
                {/* Background Texture Overlay */}
                <div
                  className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                  }}
                ></div>

                {/* Top Row */}
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-1.5 py-0.5 bg-black/30 rounded text-[11px] text-[#8b9cbd]">
                      所属机构
                    </span>
                    <span className="text-[13px] text-[#8b9cbd] tracking-wide">
                      {card.company.replace("有限公司", "")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center mr-1">
                    <div
                      className="text-[32px] font-black italic text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#E2E8F0] to-[#94A3B8] leading-none tracking-tighter"
                      style={{
                        filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.5))",
                      }}
                    >
                      VI
                    </div>
                    <span className="text-[11px] text-[#8b9cbd] mt-1 tracking-widest">
                      {card.name.replace("会员", "")}
                    </span>
                  </div>
                </div>

                {/* Middle Block (VIP + Validity) */}
                <div className="w-[190px] bg-gradient-to-r from-[#F8F9FA] to-[#DDE2E5] rounded-lg p-3 flex items-center justify-between mt-[-10px] shadow-lg relative z-10">
                  <div className="text-[26px] font-black italic text-[#111] tracking-widest leading-none">
                    VIP
                  </div>
                  <div className="text-right flex flex-col justify-center">
                    <div className="text-[10px] text-[#333] mb-0.5">
                      有效期至
                    </div>
                    <div className="text-[14px] text-[#111] font-bold font-mono leading-none">
                      {card.validity.split(" - ")[1]}
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="flex justify-between items-end relative z-10">
                  <div className="text-[14px] text-[#8b9cbd] font-mono tracking-widest">
                    {card.orderNo}
                  </div>
                  {isCenter && (
                    <button
                      className="relative z-10 px-6 py-1 rounded-full border border-white text-white text-[13px] hover:bg-white/10 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlan(card);
                        setLeadModalType(card.isOwned ? "renew" : "purchase");
                        setIsLeadModalOpen(true);
                      }}
                    >
                      {card.isOwned ? "续费" : "购买"}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Tier Timeline */}
      <div className="mt-8 px-8 relative">
        {/* Curved Line (SVG) */}
        <div className="absolute top-4 left-0 w-full px-12">
          <svg
            width="100%"
            height="20"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 15 Q 50 0 100 15"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            <path
              d="M 0 15 Q 25 7.5 50 7.5"
              fill="none"
              stroke="#81E6D9"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="flex justify-between items-end relative z-10">
          {cards.map((card, idx) => {
            const isActive = idx === activeCardIndex;
            return (
              <div
                key={card.id}
                className="flex flex-col items-center gap-1.5 cursor-pointer"
                onClick={() => setActiveCardIndex(idx)}
              >
                {isActive && (
                  <div className="text-[10px] text-white/70">当前会员</div>
                )}
                <div
                  className={`rounded-full transition-all ${isActive ? "w-2.5 h-2.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "w-1.5 h-1.5 bg-white/40"}`}
                ></div>
                <div
                  className={`text-[11px] transition-all ${isActive ? "text-white/80 border border-white/20 px-2 py-0.5 rounded bg-white/5" : "text-white/50"}`}
                >
                  {card.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 会员权益 (Membership Benefits) */}
      <div className="mt-12 px-4">
        <div className="flex justify-center mb-6">
          <div className="bg-[#1A1C35] text-[#A0A2B8] text-[13px] px-6 py-1.5 rounded-full">
            会员权益
          </div>
        </div>

        {activeCardIndex === 3 ? (
          <div className="bg-[#12132A] rounded-2xl p-6 flex flex-col items-center text-center border border-white/10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#080F1A] flex items-center justify-center mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-[#81E6D9]" />
            </div>
            <h3 className="text-[18px] font-bold text-white mb-2">
              销售灵活组合专属服务
            </h3>
            <p className="text-[13px] text-[#8A8C9E] leading-relaxed mb-6">
              非标会员卡支持根据您的企业实际需求，由专属销售顾问为您量身定制现场课、交流会、研修班等各项服务的次数与组合，打造最适合您的财税服务方案。
            </p>
            <button className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#0565D6] to-[#0A4B99] text-white text-[14px] font-medium transition-all hover:shadow-[0_0_15px_rgba(5,101,214,0.5)]">
              联系专属顾问
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                title: "税法直通车",
                desc: "这是课程描述与介绍",
                count: 4,
                total: 12,
                img: "https://picsum.photos/seed/class1/100/100",
              },
              {
                title: "财税早餐",
                desc: "这是交流会描述与介绍",
                count: 4,
                total: 12,
                img: "https://picsum.photos/seed/meet1/100/100",
              },
              {
                title: "游学标杆参访",
                desc: "这是课程描述与介绍",
                count: 4,
                total: 12,
                img: "https://picsum.photos/seed/tax1/100/100",
              },
              {
                title: "大成云人工答疑",
                desc: "这是交流会描述与介绍",
                count: 4,
                total: 12,
                img: "https://picsum.photos/seed/focus1/100/100",
              },
              {
                title: "高快考证训练",
                desc: "这是课程描述与介绍",
                count: 4,
                total: 12,
                img: "https://picsum.photos/seed/forum1/100/100",
              },
              {
                title: "审计总监特训营",
                desc: "这是交流会描述与介绍",
                count: 4,
                total: 12,
                img: "https://picsum.photos/seed/train1/100/100",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#12132A] rounded-2xl p-4 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#E5E5E5] mb-3 overflow-hidden">
                  <img
                    src={item.img}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-[14px] font-medium text-white mb-1">
                  {item.title}
                </div>
                <div className="text-[11px] text-[#8A8C9E] mb-3">
                  {item.desc}
                </div>
                <div className="w-full h-[1px] bg-white/5 mb-3"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 增值服务 (Value-added Services) */}
      <div className="mt-10 px-4">
        <div className="flex justify-center mb-6">
          <div className="bg-[#1A1C35] text-[#A0A2B8] text-[13px] px-6 py-1.5 rounded-full">
            增值服务
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              title: "精品课",
              desc: "这是课程描述与介绍",
              count: 4,
              total: 12,
              img: "https://picsum.photos/seed/course1/120/80",
            },
            {
              title: "优惠折扣报价",
              desc: "这是课程描述与介绍",
              img: "https://picsum.photos/seed/discount1/120/80",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#12132A] rounded-2xl p-4 flex items-center gap-4"
            >
              <div className="w-20 h-14 rounded-lg bg-[#E5E5E5] overflow-hidden shrink-0">
                {item.img && (
                  <img
                    src={item.img}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-medium text-white mb-1">
                  {item.title}
                </div>
                <div className="text-[12px] text-[#8A8C9E]">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        type={leadModalType}
        title={leadModalType === "renew" ? "会员续费咨询" : "会员购买咨询"}
        description={leadModalType === "renew" ? "确认后，专属顾问将尽快与您联系，为您办理会员卡续费服务。" : "确认后顾问将尽快联系您，为您提供专业的会员购买及特权咨询。"}
      />

      {/* Payment Modal */}
      <AnimatePresence>
        {isPaymentModalOpen && selectedPlan && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
              onClick={() =>
                !isProcessing && !paymentSuccess && setIsPaymentModalOpen(false)
              }
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 w-full bg-[#1A1C35] rounded-t-3xl z-50 overflow-hidden flex flex-col"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div className="text-[18px] font-medium text-white">
                  确认订单
                </div>
                <div className="flex items-center gap-3">
                  {!isProcessing && !paymentSuccess && (
                    <button className="flex items-center gap-1 text-[13px] text-[#A0A2B8] hover:text-white transition-colors">
                      <Headset className="w-4 h-4" />
                      联系客服
                    </button>
                  )}
                  {!isProcessing && !paymentSuccess && (
                    <button
                      onClick={() => setIsPaymentModalOpen(false)}
                      className="p-1.5 bg-white/5 rounded-full text-white/60 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {paymentSuccess ? (
                <div className="py-16 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="text-[20px] font-medium text-white mb-2">
                    支付成功
                  </div>
                  <div className="text-[14px] text-[#A0A2B8]">
                    您已成功{selectedPlan.isOwned ? "续费" : "购买"}
                    {selectedPlan.name}
                  </div>
                </div>
              ) : (
                <div className="p-5 flex-1 overflow-y-auto">
                  {/* Order Details */}
                  <div className="bg-[#12132A] rounded-2xl p-5 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-[15px] text-[#A0A2B8]">商品名称</div>
                      <div className="text-[15px] text-white font-medium">
                        {selectedPlan.name}{" "}
                        {selectedPlan.isOwned ? "续费" : "购买"}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-[15px] text-[#A0A2B8]">有效期</div>
                      <div className="text-[15px] text-white">1年</div>
                    </div>
                    <div className="w-full h-[1px] bg-white/5 mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="text-[15px] text-[#A0A2B8]">支付金额</div>
                      <div className="text-[24px] text-[#E5A853] font-bold">
                        ¥{selectedPlan.price}
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="text-[15px] font-medium text-white mb-4">
                    选择支付方式
                  </div>
                  <div className="space-y-3 mb-8">
                    <div
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-colors ${selectedPaymentMethod === "wechat" ? "bg-[#09B83E]/10 border-[#09B83E]/50" : "bg-[#12132A] border-white/5"}`}
                      onClick={() => setSelectedPaymentMethod("wechat")}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#09B83E] flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[15px] text-white">微信支付</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPaymentMethod === "wechat" ? "border-[#09B83E]" : "border-white/20"}`}
                      >
                        {selectedPaymentMethod === "wechat" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#09B83E]"></div>
                        )}
                      </div>
                    </div>

                    <div
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-colors ${selectedPaymentMethod === "alipay" ? "bg-[#1677FF]/10 border-[#1677FF]/50" : "bg-[#12132A] border-white/5"}`}
                      onClick={() => setSelectedPaymentMethod("alipay")}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1677FF] flex items-center justify-center">
                          <span className="text-white font-bold text-[12px]">
                            支
                          </span>
                        </div>
                        <span className="text-[15px] text-white">支付宝</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPaymentMethod === "alipay" ? "border-[#1677FF]" : "border-white/20"}`}
                      >
                        {selectedPaymentMethod === "alipay" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#1677FF]"></div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handlePaymentConfirm}
                    disabled={isProcessing}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#0565D6] to-[#0A4B9E] text-white text-[16px] font-medium flex items-center justify-center gap-2 shadow-lg shadow-[#0565D6]/30 disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>处理中...</span>
                      </>
                    ) : (
                      <span>立即支付 ¥{selectedPlan.price}</span>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [invitationCode, setInvitationCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isEnterpriseSelectOpen, setIsEnterpriseSelectOpen] = useState(false);

  const handleWechatLogin = () => {
    if (!agreed) {
      alert("请先阅读并同意用户协议和隐私政策");
      return;
    }
    setIsEnterpriseSelectOpen(true);
  };

  const handlePhoneLogin = () => {
    if (!agreed) {
      alert("请先阅读并同意用户协议和隐私政策");
      return;
    }
    setIsEnterpriseSelectOpen(true);
  };

  const handleSelectEnterprise = (enterprise: string) => {
    setIsEnterpriseSelectOpen(false);
    onLogin();
  };

  const DUMMY_ENTERPRISES = [
    "北京金税科技优先公司",
    "上海财税服务集团",
    "广州大成咨询控股有限公司",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-[200] bg-[#F8FAFC] flex flex-col items-center px-8 pt-32"
    >
      {/* Brand Logo Section */}
      <div className="flex flex-col items-center mb-16">
        <div className="w-20 h-20 bg-blue-600 rounded-[28px] flex items-center justify-center shadow-[0_20px_40px_rgba(37,99,235,0.2)] mb-6 rotate-3">
          <Crown className="w-10 h-10 text-white -rotate-3" />
        </div>
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">
          大成方略
        </h1>
        <div className="h-1 w-8 bg-blue-600 rounded-full mt-2 mb-3"></div>
        <p className="text-gray-400 text-[14px] text-center font-medium">
          财税知识服务平台 · 助力企业价值增长
        </p>
      </div>

      {/* Login Buttons Section */}
      <div className="w-full space-y-4 mb-10">
        <button
          onClick={handleWechatLogin}
          className="w-full h-[54px] bg-[#07C160] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-[0_12px_24px_rgba(7,193,96,0.15)] active:scale-[0.98] transition-all"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          微信一键登录
        </button>

        <button
          onClick={handlePhoneLogin}
          className="w-full h-[54px] bg-white text-gray-700 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-all"
        >
          <Smartphone className="w-5 h-5 text-gray-400" />
          手机号授权登录
        </button>
      </div>

      {/* Invitation Code Section */}
      <div className="w-full">
        <p className="text-[13px] text-gray-400 mb-3 ml-1 font-medium">
          填入会员码可享会员权益
        </p>
        <div className="relative group">
          <input
            type="text"
            placeholder="请填写会员码（选填）"
            value={invitationCode}
            onChange={(e) => setInvitationCode(e.target.value)}
            className="w-full h-[54px] bg-white border-none rounded-2xl px-5 text-[15px] text-gray-800 placeholder:text-gray-300 shadow-[0_8px_30px_rgba(0,0,0,0.04)] focus:shadow-[0_12px_40px_rgba(0,0,0,0.08)] outline-none transition-all"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors">
            <Ticket className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Terms & Conditions Section */}
      <div className="mt-auto mb-12 flex items-start gap-3 bg-white/50 p-4 rounded-2xl backdrop-blur-sm border border-white">
        <button
          onClick={() => setAgreed(!agreed)}
          className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${agreed ? "bg-blue-600 border-blue-600 shadow-[0_4px_12px_rgba(37,99,235,0.3)]" : "border-gray-200 bg-white"}`}
        >
          {agreed && <Check className="w-3 h-3 text-white stroke-[3]" />}
        </button>
        <p className="text-[12px] text-gray-400 leading-relaxed font-medium">
          我已阅读并同意
          <span className="text-blue-600">《用户服务协议》</span>、
          <span className="text-blue-600">《隐私政策》</span>
        </p>
      </div>

      <AnimatePresence>
        {isEnterpriseSelectOpen && (
          <React.Fragment key="enterprise-select">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[300]"
              onClick={() => setIsEnterpriseSelectOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-[#F7F9FC] rounded-t-[32px] z-[310] overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="px-6 pt-6 pb-4 bg-white sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-[20px] font-bold text-gray-900">
                    选择绑定企业
                  </h3>
                  <button
                    onClick={() => setIsEnterpriseSelectOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <p className="text-[13px] text-gray-500 mt-2">
                  点击选择您要登录的企业账号
                </p>
              </div>
              <div className="p-6 space-y-3 overflow-y-auto no-scrollbar pb-10">
                {DUMMY_ENTERPRISES.map((ent, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectEnterprise(ent)}
                    className="w-full bg-white p-5 rounded-2xl flex items-center gap-4 shadow-sm active:scale-95 transition-transform text-left border border-gray-100"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-[18px]">
                      {ent.substring(0, 1)}
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold text-gray-900">
                        {ent}
                      </h4>
                      <p className="text-[13px] text-gray-400 mt-1">
                        管理员账号
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const UserPage = ({
  onLogout,
  onMemberClick,
  unreadCount,
  onMessageCenterClick,
  currentCompany,
  boundCompanies,
  onSwitchCompany,
  onBindCode,
  onUnbindCode,
}: {
  onLogout: () => void;
  onMemberClick: () => void;
  unreadCount?: number;
  onMessageCenterClick?: () => void;
  currentCompany: string;
  boundCompanies: BoundCode[];
  onSwitchCompany: (c: string) => void;
  onBindCode: (code: BoundCode) => void;
  onUnbindCode: (id: string) => void;
}) => {
  const [userInfo, setUserInfo] = useState({
    avatar: "https://picsum.photos/seed/user1/200/200",
    nickname: "用户8888",
    role: "管理员",
    id: "23456",
    phone: "138****8888",
    exchangeCodes: ["TAX-2026-VIP"],
    memberCards: [
      { name: "钻石会员", expiry: "2028-12-31" },
      { name: "黄金会员", expiry: "2025-06-30" },
    ],
  });

  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isCheckInSuccess, setIsCheckInSuccess] = useState(false);
  const [isResourcePackPageOpen, setIsResourcePackPageOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPhoneEditModalOpen, setIsPhoneEditModalOpen] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isCourseMaterialsModalOpen, setIsCourseMaterialsModalOpen] =
    useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isExchangeCodeModalOpen, setIsExchangeCodeModalOpen] = useState(false);
  const [isAccountManagementPageOpen, setIsAccountManagementPageOpen] =
    useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isMallPageOpen, setIsMallPageOpen] = useState(false);
  const [isOrdersPageOpen, setIsOrdersPageOpen] = useState(false);
  const [isJourneyPageOpen, setIsJourneyPageOpen] = useState(false);
  const [isFavoritesPageOpen, setIsFavoritesPageOpen] = useState(false);
  const [isHistoryPageOpen, setIsHistoryPageOpen] = useState(false);
  const [isInvitePageOpen, setIsInvitePageOpen] = useState(false);
  const [isCompanyBenefitsOpen, setIsCompanyBenefitsOpen] = useState(false);
  const [selectedBoundCompany, setSelectedBoundCompany] = useState("");
  const [isAddToDesktopModalOpen, setIsAddToDesktopModalOpen] = useState(false);
  const [newExchangeCode, setNewExchangeCode] = useState("");
  const [isCompanySwitcherOpen, setIsCompanySwitcherOpen] = useState(false);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [isExchangeCenterPageOpen, setIsExchangeCenterPageOpen] = useState(false);

  const handleAvatarClick = () => {
    setUserInfo((prev) => ({
      ...prev,
      nickname: "微信用户-财安然",
      avatar: "https://picsum.photos/seed/wechatAvatar/200/200"
    }));
    showToast("微信授权昵称及头像同步成功");
  };

  const handleBindCode = () => {
    if (newExchangeCode.trim()) {
      setUserInfo((prev) => ({
        ...prev,
        exchangeCodes: [...prev.exchangeCodes, newExchangeCode.trim()],
      }));
      setNewExchangeCode("");
      alert("兑换码绑定成功");
    }
  };

  const handleDeleteCode = (codeToDelete: string) => {
    setUserInfo((prev) => ({
      ...prev,
      exchangeCodes: prev.exchangeCodes.filter((code) => code !== codeToDelete),
    }));
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-[#F7F8FA] pb-32">
      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {isLogoutConfirmOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutConfirmOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-[300px] bg-white rounded-[24px] p-6 shadow-xl"
            >
              <h3 className="text-[17px] font-bold text-gray-900 text-center mb-2">
                退出登录
              </h3>
              <p className="text-[14px] text-gray-500 text-center mb-6">
                确定要退出当前账号吗？
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsLogoutConfirmOpen(false)}
                  className="flex-1 py-2.5 rounded-full border border-gray-100 text-gray-500 font-medium text-[14px]"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    setIsLogoutConfirmOpen(false);
                    onLogout();
                  }}
                  className="flex-1 py-2.5 rounded-full bg-red-500 text-white font-medium text-[14px]"
                >
                  确定
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Header & Profile */}
      <div className="bg-gradient-to-b from-[#F0F4F8] to-[#F7F8FA] px-4 pt-5 pb-4">
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-4">
            <button
              onClick={handleAvatarClick}
              className="w-[60px] h-[60px] rounded-full overflow-hidden shadow-sm border-2 border-white relative group shrink-0"
            >
              <img
                src={userInfo.avatar}
                className="w-full h-full object-cover"
                alt=""
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 hidden group-hover:flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-bold text-gray-900">
                  {userInfo.nickname}
                </h2>
                {userInfo.role && (
                  <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-1.5 py-0.5 rounded-md">
                    {userInfo.role}
                  </span>
                )}
              </div>
              <div className="flex items-center mt-1 text-[12px] text-gray-500">
                {currentCompany && (
                  <button 
                    onClick={() => setIsCompanySwitcherOpen(true)}
                    className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 px-2 py-1 -ml-2 rounded-lg transition-colors border border-transparent hover:border-gray-200"
                  >
                    <span>{currentCompany}</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="w-8 h-8 flex items-center justify-center text-gray-400 active:scale-95 transition-transform shrink-0"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Member Cards (Horizontal Scroll) */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 px-2 snap-x">
          {userInfo.memberCards.map((card, idx) => (
            <div
              key={idx}
              onClick={onMemberClick}
              className="min-w-[280px] snap-center bg-gradient-to-r from-[#2A3143] to-[#424B61] rounded-[20px] p-5 flex items-center justify-between shadow-md relative overflow-hidden shrink-0 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 20px)",
                }}
              ></div>
              <div className="relative z-10">
                <div className="text-white text-[18px] font-medium mb-1">
                  {card.name}
                </div>
                <div className="text-white/60 text-[12px] mb-1">
                  有效期：{card.expiry}
                </div>
                <div className="text-white/80 text-[12px] font-medium">
                  {currentCompany}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLeadModalOpen(true);
                }}
                className="relative z-10 bg-gradient-to-r from-[#D5D9E5] to-[#F4F6FB] text-[#2A3143] px-4 py-1.5 rounded-full text-[12px] font-bold shadow-sm hover:opacity-90 transition-opacity"
              >
                续费
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-100/50 flex items-center justify-between">
          {[
            {
              label: "产品服务",
              icon: ShoppingBag,
              action: () => setIsMallPageOpen(true),
              color: "text-rose-500",
            },
            {
              label: "收藏记录",
              icon: Star,
              action: () => setIsFavoritesPageOpen(true),
              color: "text-amber-500",
            },
            {
              label: "浏览记录",
              icon: History,
              action: () => setIsHistoryPageOpen(true),
              color: "text-indigo-500",
            },
            {
              label: "专属顾问",
              icon: Headphones,
              action: () => setIsAdvisorModalOpen(true),
              color: "text-blue-500",
            },
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center ${item.color} group-active:scale-95 transition-all`}
              >
                <item.icon className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <span className="text-[12px] font-bold text-gray-700">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        type="renew"
        title="会员续费咨询"
        description="确认后，专属顾问将尽快与您联系，为您办理会员卡续费服务。"
      />

      <AdvisorContactModal 
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
      />

      {/* Function Lists */}
      <div className="px-4 mt-4 pb-8">
        <div className="bg-white rounded-[32px] divide-y divide-gray-50 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-50/50">
          {[
            {
              label: "消息中心",
              icon: Bell,
              action: () => onMessageCenterClick?.(),
              badge: unreadCount,
            },
            {
              label: "兑换中心",
              icon: Gift,
              action: () => setIsExchangeCenterPageOpen(true),
            },
            {
              label: "绑定企业",
              icon: Ticket,
              action: () => setIsExchangeCodeModalOpen(true),
            },
            {
              label: "企业管理",
              icon: Users,
              action: () => setIsAccountManagementPageOpen(true),
            },
            {
              label: "添加桌面",
              icon: MonitorSmartphone,
              action: () => setIsAddToDesktopModalOpen(true),
            },
            { label: "关于我们", icon: Info, action: () => alert("关于我们") },
            {
              label: "联系客服",
              icon: Headphones,
              action: () => setIsContactModalOpen(true),
            },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center justify-between py-5 px-6 active:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-active:scale-95 transition-transform group-hover:bg-blue-50 group-hover:text-blue-600">
                  <item.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="text-[15px] font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                  {item.label}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.badge !== undefined && item.badge > 0 && (
                  <div className="bg-red-500 text-white text-[12px] font-bold px-2 py-0.5 rounded-full flex items-center justify-center min-w-[20px]">
                    {item.badge > 99 ? "99+" : item.badge}
                  </div>
                )}
                <ChevronRight className="w-4 h-4 text-gray-300 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 px-2">
          <button
            onClick={() => setIsLogoutConfirmOpen(true)}
            className="w-full py-3.5 bg-white text-red-500 font-medium text-[15px] rounded-[20px] shadow-sm active:scale-95 transition-transform"
          >
            退出登录
          </button>
        </div>
      </div>

      <AccountManagementPage
        isOpen={isAccountManagementPageOpen}
        onClose={() => setIsAccountManagementPageOpen(false)}
      />

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <React.Fragment key="edit-modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[300]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] p-8 z-[310] shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />
              <h3 className="text-[20px] font-black text-gray-900 mb-8">
                个人信息修改
              </h3>

              <div className="space-y-6 mb-10">
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[12px] font-bold text-gray-400 uppercase">
                      昵称
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsWeChatModalOpen(true)}
                      className="text-blue-600 hover:text-blue-700 font-bold text-[13px] transition-all outline-none cursor-pointer p-0 bg-transparent border-none active:scale-95 flex items-center gap-1"
                    >
                      微信昵称授权
                    </button>
                  </div>
                  <input
                    type="text"
                    value={userInfo.nickname}
                    onChange={(e) =>
                      setUserInfo((prev) => ({
                        ...prev,
                        nickname: e.target.value,
                      }))
                    }
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-[15px] font-bold focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-gray-400 uppercase ml-1 flex justify-between">
                    <span>手机号</span>
                    <button
                      onClick={() => setIsPhoneEditModalOpen(true)}
                      className="text-blue-500 font-normal"
                    >
                      修改
                    </button>
                  </label>
                  <div className="bg-gray-50 rounded-2xl px-6 py-4 text-[15px] font-bold text-gray-800">
                    {userInfo.phone}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-full py-5 bg-blue-600 text-white font-black text-[16px] rounded-[24px] shadow-lg shadow-blue-200 active:scale-95 transition-transform"
              >
                保存修改
              </button>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>

      {/* Phone Edit Modal */}
      <AnimatePresence>
        {isPhoneEditModalOpen && (
          <React.Fragment key="phone-edit-modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPhoneEditModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[320]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] p-8 z-[330] shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />
              <h3 className="text-[20px] font-black text-gray-900 mb-8">
                修改手机号
              </h3>

              <div className="space-y-6 mb-10">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-gray-400 uppercase ml-1">
                    新手机号
                  </label>
                  <input
                    type="tel"
                    placeholder="请输入新手机号"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-[15px] font-bold focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-gray-400 uppercase ml-1">
                    验证码
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="请输入验证码"
                      value={phoneVerificationCode}
                      onChange={(e) => setPhoneVerificationCode(e.target.value)}
                      className="w-full bg-gray-50 border-none rounded-2xl pl-6 pr-32 py-4 text-[15px] font-bold focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                    <button
                      onClick={() => {
                        if (!isCodeSent && newPhone.length === 11) {
                          setIsCodeSent(true);
                          setCountdown(60);
                          const timer = setInterval(() => {
                            setCountdown((prev) => {
                              if (prev <= 1) {
                                clearInterval(timer);
                                setIsCodeSent(false);
                                return 0;
                              }
                              return prev - 1;
                            });
                          }, 1000);
                        }
                      }}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-bold ${isCodeSent ? 'text-gray-400' : 'text-blue-600'}`}
                    >
                      {isCodeSent ? `${countdown}s 后重新发送` : '获取验证码'}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (newPhone && phoneVerificationCode) {
                    setUserInfo((prev) => ({ ...prev, phone: newPhone }));
                    setIsPhoneEditModalOpen(false);
                    setNewPhone("");
                    setPhoneVerificationCode("");
                  }
                }}
                className="w-full py-5 bg-blue-600 text-white font-black text-[16px] rounded-[24px] shadow-lg shadow-blue-200 active:scale-95 transition-transform"
              >
                确认修改
              </button>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isContactModalOpen && (
          <React.Fragment key="contact-modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[300]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] p-8 z-[310] shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />
              <h3 className="text-[20px] font-black text-gray-900 mb-6">
                联系客服
              </h3>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <span className="text-[15px] font-medium">
                      客服电话: 400-123-4567
                    </span>
                  </div>
                  <button className="text-blue-500 text-[13px] font-medium px-3 py-1 bg-blue-50 rounded-full active:bg-blue-100 transition-colors">
                    拨打
                  </button>
                </div>

                <div className="p-5 bg-gray-50 rounded-2xl flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 mb-4 w-full">
                    <QrCode className="w-5 h-5 text-green-500" />
                    <span className="text-[15px] font-medium text-gray-800">
                      微信客服二维码
                    </span>
                  </div>
                  <div className="w-40 h-40 bg-white rounded-xl shadow-sm border border-gray-100 p-2 flex items-center justify-center">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WeChatService"
                      alt="WeChat QR Code"
                      className="w-full h-full object-contain opacity-80"
                    />
                  </div>
                  <p className="text-[12px] text-gray-400 mt-3">
                    长按识别或者截图保存二维码
                  </p>
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>

      <CheckInModal
        isOpen={isCheckInModalOpen}
        onClose={() => setIsCheckInModalOpen(false)}
      />

      <CourseMaterialsModal
        isOpen={isCourseMaterialsModalOpen}
        onClose={() => setIsCourseMaterialsModalOpen(false)}
      />

      {/* Resource Pack Page Overlay */}
      <ResourcePackPage
        isOpen={isResourcePackPageOpen}
        onClose={() => setIsResourcePackPageOpen(false)}
      />

      {/* Account Management Page Overlay */}
      <AnimatePresence>
        {isAccountManagementPageOpen && (
          <AccountManagementPage
            isOpen={isAccountManagementPageOpen}
            onClose={() => setIsAccountManagementPageOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Exchange Center Page Overlay */}
      {isExchangeCenterPageOpen && (
        <ExchangeCenterPage onClose={() => setIsExchangeCenterPageOpen(false)} />
      )}

      {/* Mall Page Overlay */}
      <AnimatePresence>
        {isMallPageOpen && <MallPage onBack={() => setIsMallPageOpen(false)} />}
      </AnimatePresence>

      {/* Orders Page Overlay */}
      <AnimatePresence>
        {isOrdersPageOpen && (
          <OrdersPage onBack={() => setIsOrdersPageOpen(false)} />
        )}
      </AnimatePresence>

      {/* Journey Page Overlay */}
      <AnimatePresence>
        {isJourneyPageOpen && (
          <JourneyPage onBack={() => setIsJourneyPageOpen(false)} />
        )}
      </AnimatePresence>

      <FavoritesPage
        isOpen={isFavoritesPageOpen}
        onClose={() => setIsFavoritesPageOpen(false)}
      />
      <HistoryPage
        isOpen={isHistoryPageOpen}
        onClose={() => setIsHistoryPageOpen(false)}
      />
      <InviteFriendsPage
        isOpen={isInvitePageOpen}
        onClose={() => setIsInvitePageOpen(false)}
      />

      <AnimatePresence>
        {isExchangeCodeModalOpen && (
          <BindCodePage
            onBack={() => setIsExchangeCodeModalOpen(false)}
            boundCompanies={boundCompanies}
            onBindCode={onBindCode}
            onUnbindCode={onUnbindCode}
            onSwitchCompany={onSwitchCompany}
            onEnterBenefits={(name) => {
              setSelectedBoundCompany(name);
              setIsCompanyBenefitsOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCompanyBenefitsOpen && (
          <div className="fixed inset-0 z-[70] bg-white">
            <BenefitsPage
              onBack={() => setIsCompanyBenefitsOpen(false)}
              companyName={selectedBoundCompany}
              boundCompanies={boundCompanies}
              onSwitchCompany={(c) => {
                onSwitchCompany(c);
                setSelectedBoundCompany(c);
              }}
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCompanySwitcherOpen && (
          <React.Fragment key="company-switcher-modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[300]"
              onClick={() => setIsCompanySwitcherOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-[#F8FAFC] rounded-t-[32px] z-[310] flex flex-col"
            >
              <div className="p-6 pb-4 bg-white rounded-t-[32px] border-b border-gray-50 flex items-center justify-between shrink-0">
                <span className="font-bold text-[18px] text-gray-900">
                  切换企业
                </span>
                <button
                  onClick={() => setIsCompanySwitcherOpen(false)}
                  className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-3 overflow-y-auto no-scrollbar pb-10">
                {boundCompanies.map((ent, idx) => (
                  <button
                    key={ent.id}
                    onClick={() => {
                      onSwitchCompany(ent.companyName);
                      setIsCompanySwitcherOpen(false);
                    }}
                    className={`w-full bg-white p-5 rounded-2xl flex items-center gap-4 shadow-sm active:scale-95 transition-transform text-left border ${currentCompany === ent.companyName ? 'border-[#5C6DFF] ring-1 ring-[#5C6DFF]/50' : 'border-gray-100'}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-[18px]">
                      {ent.companyName.substring(0, 1)}
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold text-gray-900">
                        {ent.companyName}
                      </h4>
                      <div className="text-[12px] text-gray-500 mt-1 flex items-center gap-2">
                        {currentCompany === ent.companyName ? (
                          <span className="text-[#5C6DFF] flex items-center gap-1"><Check size={14}/> 当前使用中</span>
                        ) : '点击切换当前企业' }
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>

      <AddToDesktopModal
        isOpen={isAddToDesktopModalOpen}
        onClose={() => setIsAddToDesktopModalOpen(false)}
      />

      {/* WeChat Authorization Modal */}
      <AnimatePresence>
        {isWeChatModalOpen && (
          <React.Fragment key="wechat-auth-modal">
            {/* Background Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWeChatModalOpen(false)}
              className="fixed inset-0 bg-black/50 z-[400]"
            />
            {/* Draw from bottom */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-[410] px-6 pt-6 pb-8 text-gray-900 border-t border-gray-100 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                </div>
                <span className="text-[14px] font-bold text-gray-800">微信个人信息授权</span>
              </div>

              {/* Application Details */}
              <div className="mb-6">
                <h4 className="text-[17px] font-bold text-gray-900 leading-tight">
                  财税AI智库 申请使用
                </h4>
                <p className="text-[13px] text-gray-400 mt-1">
                  您的微信头像、昵称，以便您更便捷地管理财税与顾问信息。
                </p>
              </div>

              {/* Account Box selector */}
              <div className="border border-gray-100 rounded-xl p-4 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://picsum.photos/seed/wechatAvatar/200/200" 
                      className="w-10 h-10 rounded-full object-cover border border-gray-100" 
                      alt="WeChat User Avatar"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-[14px] font-extrabold text-gray-800">
                        微信用户-财安然
                      </div>
                      <div className="text-[11px] text-gray-500">
                        微信绑定的默认昵称与头像
                      </div>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-blue-600 bg-blue-600 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>
              </div>

              {/* Choice Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setIsWeChatModalOpen(false)}
                  className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-[15px] active:scale-[0.98] transition-transform"
                >
                  拒绝
                </button>
                <button
                  onClick={() => {
                    setUserInfo((prev) => ({
                      ...prev,
                      nickname: "微信用户-财安然",
                      avatar: "https://picsum.photos/seed/wechatAvatar/200/200"
                    }));
                    setIsWeChatModalOpen(false);
                    showToast("微信授权昵称及头像同步成功");
                  }}
                  className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-[15px] active:scale-[0.98] transition-transform shadow-md shadow-blue-500/20"
                >
                  允许并授权
                </button>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white px-6 py-3 rounded-full shadow-2xl backdrop-blur-md z-[500] text-[14px] font-medium flex items-center gap-2 whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PodcastPlayer = ({
  category,
  podcast: initialPodcast,
  onClose,
  onNext,
  onPrev,
}: {
  category?: string;
  podcast: any;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}) => {
  const [currentPodcast, setCurrentPodcast] = useState(initialPodcast);

  React.useEffect(() => {
    setCurrentPodcast(initialPodcast);
  }, [initialPodcast]);

  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState("1.0x");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowBackToTop(scrollRef.current.scrollTop > 200);
    }
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSpeedChange = () => {
    const speeds = ["1.0x", "1.25x", "1.5x", "2.0x"];
    const currentIndex = speeds.indexOf(speed);
    setSpeed(speeds[(currentIndex + 1) % speeds.length]);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleShareAction = (action: string) => {
    setIsShareModalOpen(false);
    if (action === "复制链接") {
      alert("链接复制成功");
    } else {
      showToast(`已分享到${action}`);
    }
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-[#0A0A0A] z-[300] flex flex-col overflow-y-auto no-scrollbar"
      ref={scrollRef}
      onScroll={handleScroll}
    >
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-[120] w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-transform"
          >
            <ChevronUp className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Header (Sticky) */}
      <div className="sticky top-0 z-20 bg-[#121215]/90 backdrop-blur-md flex items-center justify-between px-6 pt-5 pb-4">
        <button
          onClick={onClose}
          className="p-1 active:scale-95 transition-transform"
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </button>
        <span className="text-white text-[15px] font-medium">
          {category || "专栏详情"}
        </span>
        <div className="w-8"></div>
      </div>

      {/* Player Content */}
      <div className="flex-1 flex flex-col">
        {/* Cover Art */}
        <div className="flex flex-col items-center justify-center px-8 mt-8">
          <div
            className={`w-64 h-64 rounded-full border-4 border-white/10 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] ${isPlaying ? "animate-[spin_20s_linear_infinite]" : ""}`}
          >
            <img
              src={`https://picsum.photos/seed/podcast${currentPodcast.id}/400/400`}
              className="w-full h-full object-cover"
              alt="cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-white text-[20px] font-bold mt-10 text-center line-clamp-2">
            {currentPodcast.title}
          </h2>
        </div>

        {/* Progress & Controls */}
        <div className="px-8 mt-12 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-gray-400 text-[12px]">02:14</span>
            <div className="flex-1 h-1 bg-white/20 rounded-full relative">
              <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-[#A3D977] rounded-full"></div>
              <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
            </div>
            <span className="text-gray-400 text-[12px]">
              {currentPodcast.duration || "12:30"}
            </span>
          </div>

          <div className="flex items-center justify-between mb-10 px-4">
            <div className="w-8"></div>
            <button
              className="active:scale-95 transition-transform"
              onClick={() => {
                if (onPrev) {
                  onPrev();
                } else {
                  setCurrentPodcast({
                    ...currentPodcast,
                    title: `音频内容第 ${currentPodcast.id} 期`,
                    id: currentPodcast.id - 1,
                  });
                }
              }}
            >
              <SkipBack className="w-8 h-8 text-white fill-white" />
            </button>
            <button
              className="w-16 h-16 bg-[#A3D977] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(163,217,119,0.3)] active:scale-95 transition-transform"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <div className="w-6 h-6 flex gap-1.5 justify-center ml-1">
                  <div className="w-1.5 h-6 bg-white rounded-sm"></div>
                  <div className="w-1.5 h-6 bg-white rounded-sm"></div>
                </div>
              ) : (
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              )}
            </button>
            <button
              className="active:scale-95 transition-transform"
              onClick={() => {
                if (onNext) {
                  onNext();
                } else {
                  setCurrentPodcast({
                    ...currentPodcast,
                    title: `音频内容第 ${currentPodcast.id + 2} 期`,
                    id: currentPodcast.id + 1,
                  });
                }
              }}
            >
              <SkipForward className="w-8 h-8 text-white fill-white" />
            </button>
            <div className="w-8"></div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-12 px-8">
            <button
              onClick={() => {
                setIsFavorite(!isFavorite);
                showToast(isFavorite ? "已取消收藏" : "已收藏");
              }}
              className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
            >
              <Star
                className={`w-6 h-6 ${isFavorite ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`}
              />
              <span className="text-[10px] text-gray-500">收藏</span>
            </button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
            >
              <Share2 className="w-6 h-6 text-gray-400" />
              <span className="text-[10px] text-gray-500">分享</span>
            </button>
            <button
              onClick={handleSpeedChange}
              className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
            >
              <div className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold text-[13px] border-2 border-gray-400 rounded-full">
                {speed.replace("x", "")}
              </div>
              <span className="text-[10px] text-gray-500">倍速</span>
            </button>
          </div>
        </div>
      </div>

      {/* Playlist Section */}
      <div className="px-6 pb-12 mt-4 border-t border-white/5 pt-8 bg-gradient-to-b from-transparent to-black/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-[16px] font-bold flex items-center gap-2">
            <Menu className="w-5 h-5 text-[#A3D977]" /> 专栏列表
          </h3>
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
            }
            className="flex items-center gap-1.5 text-gray-400 text-[12px] active:scale-95 transition-all"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortOrder === "desc" ? "从新到旧" : "从旧到新"}
          </button>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }, (_, i) => i + 1)
            .sort((a, b) => (sortOrder === "desc" ? a - b : b - a))
            .map((idx, arrayIdx) => {
              let statusText = "";
              let statusColor = "";
              if (arrayIdx === 0) {
                statusText = "已播 50%";
                statusColor = "text-[#A3D977]";
              } else if (arrayIdx === 1) {
                statusText = "已播完";
                statusColor = "text-gray-500";
              } else {
                statusText = "未收听";
                statusColor = "text-gray-500";
              }

              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 active:bg-white/5 p-2 -mx-2 rounded-xl transition-colors cursor-pointer"
                >
                  <span
                    className={`text-[14px] font-medium w-6 text-center ${arrayIdx === 0 ? "text-[#A3D977]" : "text-gray-500"}`}
                  >
                    {idx < 10 ? `0${idx}` : idx}
                  </span>
                  <div
                    className="flex-1 min-w-0"
                    onClick={() => {
                      if (idx !== 1) {
                        setCurrentPodcast({
                          ...currentPodcast,
                          title: `相关播客推荐内容 第${idx}期`,
                          id: currentPodcast.id + idx,
                        });
                      }
                    }}
                  >
                    <h4
                      className={`text-[14px] font-medium truncate cursor-pointer ${idx === 1 ? "text-[#A3D977]" : "text-white"}`}
                    >
                      {idx === 1
                        ? currentPodcast.title
                        : `相关播客推荐内容 第${idx}期`}
                    </h4>
                    <div className="text-gray-500 text-[11px] mt-1.5 flex items-center gap-3">
                      <span
                        className={`flex items-center gap-1 ${statusColor}`}
                      >
                        {statusText}
                      </span>
                      <span>12:30</span>
                    </div>
                  </div>
                  {idx === 1 && (
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#A3D977] rounded-full animate-pulse shadow-[0_0_8px_#A3D977]"></div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/80 flex flex-col items-center justify-center p-6 backdrop-blur-sm"
          >
            <div
              className="absolute top-6 right-6 p-2 cursor-pointer"
              onClick={() => setIsShareModalOpen(false)}
            >
              <X className="text-white w-7 h-7" />
            </div>

            {/* Poster Preview */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-[320px] bg-[#121215] rounded-2xl overflow-hidden shadow-2xl mb-8 border border-white/10"
            >
              <div className="relative h-64 bg-gradient-to-br from-[#A3D977] to-[#4ADE80]">
                <img
                  src={`https://picsum.photos/seed/podcast${currentPodcast.id}/400/400`}
                  alt="cover"
                  className="w-full h-full object-cover mix-blend-overlay opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-[#121215]/40 to-transparent"></div>
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <div className="text-[10px] font-bold bg-[#A3D977] text-black px-2 py-0.5 rounded w-fit mb-2">
                    大成财税播客
                  </div>
                  <h3 className="text-[18px] font-bold text-white leading-snug line-clamp-2">
                    {currentPodcast.title}
                  </h3>
                </div>
              </div>
              <div className="p-5 bg-[#121215]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A3D977] to-[#4ADE80] flex items-center justify-center border border-white/10">
                      <Headphones className="w-5 h-5 text-black" />
                    </div>
                    <div className="text-[10px] text-gray-400 leading-relaxed">
                      长按识别小程序码
                      <br />
                      立即收听播客
                    </div>
                  </div>
                  <div className="w-14 h-14 bg-white rounded-xl p-1 shadow-sm border border-gray-800">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=podcast_${currentPodcast.id}`}
                      alt="QR"
                      className="w-full h-full mix-blend-multiply opacity-90"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <div className="w-full max-w-[320px] bg-white/10 backdrop-blur-xl rounded-3xl p-5 flex justify-between items-center border border-white/20 shadow-2xl">
              <button
                onClick={() => handleShareAction("微信好友")}
                className="flex flex-col items-center gap-2.5 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#07C160] flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
                  <MessageCircle className="text-white w-6 h-6" />
                </div>
                <span className="text-white/90 text-[11px] font-medium">
                  微信好友
                </span>
              </button>
              <button
                onClick={() => handleShareAction("朋友圈")}
                className="flex flex-col items-center gap-2.5 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#07C160] flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
                  <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <span className="text-white/90 text-[11px] font-medium">
                  朋友圈
                </span>
              </button>
              <button
                onClick={() => handleShareAction("收藏")}
                className="flex flex-col items-center gap-2.5 group"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
                  <Star className="text-white w-6 h-6" />
                </div>
                <span className="text-white/90 text-[11px] font-medium">
                  收藏
                </span>
              </button>
              <button
                onClick={() => handleShareAction("复制链接")}
                className="flex flex-col items-center gap-2.5 group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
                  <Link className="text-white w-6 h-6" />
                </div>
                <span className="text-white/90 text-[11px] font-medium">
                  复制链接
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white px-6 py-3 rounded-full shadow-2xl backdrop-blur-md z-[400] text-[14px] font-medium flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ⚠️ 小程序容器约束提醒: 必须使用 absolute inset-0 而不是 fixed inset-0，确保弹窗不溢出手机模拟器容器 */
const ListenModule = ({
  onClose,
  initialPodcast,
}: {
  onClose: () => void;
  initialPodcast?: any;
}) => {
  const [selectedPodcast, setSelectedPodcast] = useState<any>(
    initialPodcast || null,
  );
  const [activeMainTab, setActiveMainTab] = useState<
    "listen" | "history" | "favorites"
  >("listen");
  const [activeCategory, setActiveCategory] = useState("行业税观");
  const [favoriteItems, setFavoriteItems] = useState([
    {
      id: 101,
      title: "案例剖析：大厂避税案背后的法律风险",
      duration: "18:20",
      updateTime: "3天前",
      plays: "5.2k",
    },
    {
      id: 102,
      title: "2026年企业研发费用加计扣除申报要点",
      duration: "25:15",
      updateTime: "1周前",
      plays: "12w",
    },
    {
      id: 103,
      title: "数字化转型的财税合规之路：专访财税专家",
      duration: "32:40",
      updateTime: "2周前",
      plays: "3.5w",
    },
  ]);

  const [isWidgetPlaying, setIsWidgetPlaying] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const categories = ["行业税观", "案例剖析", "大佬经验", "新闻快评"];

  const podcasts = [
    {
      id: "podcast-1",
      title: "税答会客室",
      duration: "12:30",
      updateTime: "2小时前",
      plays: "1.2w",
    },
    {
      id: "podcast-2",
      title: "新闻茶水间",
      duration: "15:45",
      updateTime: "5小时前",
      plays: "8.5k",
    },
    {
      id: "podcast-3",
      title: "大佬方法论",
      duration: "08:20",
      updateTime: "昨天",
      plays: "5.6k",
    },
    {
      id: "podcast-4",
      title: "税案剖析",
      duration: "22:10",
      updateTime: "2天前",
      plays: "3.2k",
    },
    {
      id: "podcast-5",
      title: "行业税观",
      duration: "10:05",
      updateTime: "3天前",
      plays: "15w",
    },
    {
      id: "podcast-6",
      title: "新政快评",
      duration: "18:45",
      updateTime: "4天前",
      plays: "9.1k",
    },
  ];

  // Robust mock of episode items in the podcast playlists (专辑列表的内容)
  const allTracks = [
    // podcast-1 (税答会客室)
    {
      id: "track-1-1",
      podcastId: "podcast-1",
      podcastTitle: "税答会客室",
      title: "大厂避税案背后的法律风险分析",
      duration: "18:20",
      updateTime: "2小时前",
      plays: "4.2k",
    },
    {
      id: "track-1-2",
      podcastId: "podcast-1",
      podcastTitle: "税答会客室",
      title: "2026年企业最新汇算清缴避坑要点",
      duration: "15:45",
      updateTime: "昨天",
      plays: "3.5k",
    },
    {
      id: "track-1-3",
      podcastId: "podcast-1",
      podcastTitle: "税答会客室",
      title: "研发减免税款申报常见失误汇总",
      duration: "22:15",
      updateTime: "3天前",
      plays: "2.8k",
    },
    // podcast-2 (新闻茶水间)
    {
      id: "track-2-1",
      podcastId: "podcast-2",
      podcastTitle: "新闻茶水间",
      title: "金税四期全面铺开对中小微创的影响",
      duration: "12:10",
      updateTime: "5小时前",
      plays: "8.5k",
    },
    {
      id: "track-2-2",
      podcastId: "podcast-2",
      podcastTitle: "新闻茶水间",
      title: "最新印花税下调政策解读与落实",
      duration: "10:30",
      updateTime: "前天",
      plays: "6.2k",
    },
    {
      id: "track-2-3",
      podcastId: "podcast-2",
      podcastTitle: "新闻茶水间",
      title: "加计扣除申报时限顺延新出台",
      duration: "14:15",
      updateTime: "5天前",
      plays: "4.8k",
    },
    // podcast-3 (大佬方法论)
    {
      id: "track-3-1",
      podcastId: "podcast-3",
      podcastTitle: "大佬方法论",
      title: "连线知名CFO：如何搭建智能化财务团队",
      duration: "25:30",
      updateTime: "昨天",
      plays: "5.6k",
    },
    {
      id: "track-3-2",
      podcastId: "podcast-3",
      podcastTitle: "大佬方法论",
      title: "专访大成财税：财税合规如何降本增效",
      duration: "32:40",
      updateTime: "3天前",
      plays: "7.1k",
    },
    {
      id: "track-3-3",
      podcastId: "podcast-3",
      podcastTitle: "大佬方法论",
      title: "企业转型重组中的核心税务筹划艺术",
      duration: "28:15",
      updateTime: "1周前",
      plays: "3.9k",
    },
    // podcast-4 (税案剖析)
    {
      id: "track-4-1",
      podcastId: "podcast-4",
      podcastTitle: "税案剖析",
      title: "跨境电商双重征税风波警示录",
      duration: "20:50",
      updateTime: "2天前",
      plays: "3.2k",
    },
    {
      id: "track-4-2",
      podcastId: "podcast-4",
      podcastTitle: "税案剖析",
      title: "某高新企业被撤销资质的税务反思",
      duration: "17:35",
      updateTime: "4天前",
      plays: "2.9k",
    },
    {
      id: "track-4-3",
      podcastId: "podcast-4",
      podcastTitle: "税案剖析",
      title: "高净值个人所得税被催缴重大典型",
      duration: "24:10",
      updateTime: "1周前",
      plays: "5.1k",
    },
    // podcast-5 (行业税观)
    {
      id: "track-5-1",
      podcastId: "podcast-5",
      podcastTitle: "行业税观",
      title: "新能车购置税减免对产业链利润重构",
      duration: "16:05",
      updateTime: "3天前",
      plays: "15w",
    },
    {
      id: "track-5-2",
      podcastId: "podcast-5",
      podcastTitle: "行业税观",
      title: "AI人工智能创作版权费纳税热点案例",
      duration: "12:50",
      updateTime: "5天前",
      plays: "11w",
    },
    {
      id: "track-5-3",
      podcastId: "podcast-5",
      podcastTitle: "行业税观",
      title: "医药行业合规大洗牌与税务风险预警",
      duration: "19:30",
      updateTime: "1周前",
      plays: "9.5w",
    },
    // podcast-6 (新政快评)
    {
      id: "track-6-1",
      podcastId: "podcast-6",
      podcastTitle: "新政快评",
      title: "简评：2026季度增值税小规模免征标准",
      duration: "09:45",
      updateTime: "4天前",
      plays: "9.1k",
    },
    {
      id: "track-6-2",
      podcastId: "podcast-6",
      podcastTitle: "新政快评",
      title: "速览：数电发票试点扩容后的注意事项",
      duration: "11:15",
      updateTime: "6天前",
      plays: "8.3k",
    },
    {
      id: "track-6-3",
      podcastId: "podcast-6",
      podcastTitle: "新政快评",
      title: "热议：地方创投税收优惠再升级折射了什么",
      duration: "13:40",
      updateTime: "1周前",
      plays: "7.6k",
    },
  ];

  const recordItems = [
    {
      id: "pd-history-1",
      title: "2026年最新企业所得税汇算清缴指南",
      duration: "12:30",
      updateTime: "2小时前",
      plays: "1.2w",
    },
    {
      id: "pd-history-2",
      title: "金税四期下，企业如何规避税务风险？",
      duration: "15:45",
      updateTime: "5小时前",
      plays: "8.5k",
    },
  ];

  // Helper to handle switching to the next track or selecting specific tracks in the mini player
  const currentWidgetTrack = allTracks[currentTrackIndex] || allTracks[0];

  const playNextTrack = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIndex = (currentTrackIndex + 1) % allTracks.length;
    setCurrentTrackIndex(nextIndex);
    setSelectedPodcast(allTracks[nextIndex]);
    setIsWidgetPlaying(true);
  };

  const playPrevTrack = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIndex = (currentTrackIndex - 1 + allTracks.length) % allTracks.length;
    setCurrentTrackIndex(prevIndex);
    setSelectedPodcast(allTracks[prevIndex]);
    setIsWidgetPlaying(true);
  };

  const playSpecificTrack = (track: any) => {
    const idx = allTracks.findIndex((t) => t.id === track.id || t.title === track.title);
    if (idx !== -1) {
      setCurrentTrackIndex(idx);
      setSelectedPodcast(allTracks[idx]);
    } else {
      setSelectedPodcast(track);
    }
    setIsWidgetPlaying(true);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-[#0A0A0A] z-[100] flex flex-col overflow-hidden"
    >
      {/* Background Image with Masking */}
      {activeMainTab === "listen" && (
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop"
            alt="background"
            className="w-full h-[70vh] object-cover opacity-50"
            referrerPolicy="no-referrer"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, transparent 100%)",
              WebkitMaskImage:
                "-webkit-linear-gradient(top, black 0%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/80 to-[#0A0A0A]"></div>
        </div>
      )}

      {/* Top Nav */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              if (activeMainTab !== "listen") setActiveMainTab("listen");
              else onClose();
            }}
            className="p-1 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center mr-1"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          {/* TITLE & SEARCH (FILTER) ICON PAIRING */}
          <div className="flex items-center gap-2">
            <h1
              className={`${activeMainTab === "listen" ? "text-3xl font-black" : "text-[17px] font-bold"} text-white tracking-wider`}
            >
              {activeMainTab === "listen"
                ? "听"
                : activeMainTab === "history"
                  ? "历史"
                  : "收藏"}
            </h1>

            {activeMainTab === "listen" && (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 rounded-full hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center ml-1 object-contain"
                title="搜索单集"
              >
                <Search size={20} className="text-white bg-transparent" />
              </button>
            )}
          </div>
        </div>

        {/* Far-right elements are kept completely clean & transparent */}
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 pb-32">
        {activeMainTab === "listen" && (
          <>
            <div className="pl-[30px] pr-5">
              {/* Greeting Section */}
              <div className="mt-6 mb-8">
                <h1 className="text-white text-[25px] font-medium leading-relaxed tracking-wide drop-shadow-md">
                  中午好呀！
                  <br />
                  午休时间到啦，
                  <br />
                  让我来陪你听听新鲜事！
                </h1>
              </div>

              {/* Quick Play Button */}
              <div className="mb-10">
                <div
                  className="w-[100px] h-[64px] bg-[#A3D977] rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(163,217,119,0.3)] cursor-pointer active:scale-95 transition-transform mb-3"
                  onClick={() =>
                    playSpecificTrack(
                      podcasts[0] || { id: "quick", title: "联播快讯" },
                    )
                  }
                >
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
                <div className="text-gray-300 text-[13px] font-medium tracking-wide">
                  1小时前更新了一波联播快讯
                </div>
              </div>
            </div>

            {/* Podcast List */}
            <div className="px-6 space-y-4">
              {podcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  onClick={() => playSpecificTrack(podcast)}
                  className="flex gap-4 items-center bg-white/5 border border-white/5 p-3 rounded-2xl active:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm"
                >
                  <div className="w-[60px] h-[60px] rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                    <img
                      src={`https://picsum.photos/seed/podcast${podcast.id}/200/200`}
                      className="w-full h-full object-cover"
                      alt="cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-[15px] font-medium mb-1.5 truncate">
                      {podcast.title}
                    </h3>
                    <div className="text-gray-400 text-[11px] flex items-center gap-2">
                      <span>{podcast.updateTime}</span>
                      <span className="text-gray-500 flex items-center gap-0.5 ml-1">
                        <Play className="w-3 h-3" /> {podcast.plays}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeMainTab === "history" && (
          <div className="px-6">
            <div className="relative w-full mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索历史记录..."
                className="w-full h-[42px] bg-white/10 border border-white/5 rounded-full pl-11 pr-4 text-[14px] text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition-colors backdrop-blur-md"
              />
            </div>
            <div className="space-y-4">
              {recordItems.map((podcast) => (
                <div
                  key={podcast.id}
                  onClick={() => playSpecificTrack(podcast)}
                  className="flex gap-4 items-center bg-white/5 border border-white/5 p-3 rounded-2xl active:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm"
                >
                  <div className="w-[60px] h-[60px] rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                    <img
                      src={`https://picsum.photos/seed/podcast${podcast.id}/200/200`}
                      className="w-full h-full object-cover"
                      alt="cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-[15px] font-medium mb-1.5 truncate">
                      {podcast.title}
                    </h3>
                    <div className="text-gray-400 text-[11px] flex items-center gap-2 mb-1">
                      <span>{podcast.updateTime}</span>
                    </div>
                    <div className="text-[#A3D977] text-[11px] flex items-center gap-1">
                      已播 50%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeMainTab === "favorites" && (
          <div className="px-6 h-full">
            <div className="relative w-full mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索收藏内容..."
                className="w-full h-[42px] bg-white/10 border border-white/5 rounded-full pl-11 pr-4 text-[14px] text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition-colors backdrop-blur-md"
              />
            </div>

            {favoriteItems.length > 0 ? (
              <div className="space-y-4">
                {favoriteItems.map((podcast) => (
                  <div
                    key={podcast.id}
                    className="flex gap-4 items-center bg-white/5 border border-white/5 p-3 rounded-2xl active:bg-white/10 transition-colors backdrop-blur-sm group"
                  >
                    <div
                      onClick={() => playSpecificTrack(podcast)}
                      className="w-[60px] h-[60px] rounded-xl overflow-hidden flex-shrink-0 shadow-md cursor-pointer"
                    >
                      <img
                        src={`https://picsum.photos/seed/fav${podcast.id}/200/200`}
                        className="w-full h-full object-cover"
                        alt="cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div
                      className="flex-1 min-w-0"
                      onClick={() => playSpecificTrack(podcast)}
                    >
                      <h3 className="text-white text-[15px] font-medium mb-1.5 truncate cursor-pointer">
                        {podcast.title}
                      </h3>
                      <div className="text-gray-400 text-[11px] flex items-center gap-2 mb-1">
                        <span>{podcast.updateTime}</span>
                        <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">
                          {podcast.duration}
                        </span>
                        <span className="text-gray-500 flex items-center gap-0.5 ml-1">
                          <Play className="w-3 h-3" /> {podcast.plays}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFavoriteItems((prev) =>
                          prev.filter((item) => item.id !== podcast.id),
                        );
                      }}
                      className="p-2.5 rounded-full bg-white/5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all active:scale-90"
                      title="取消收藏"
                    >
                      <Star
                        size={16}
                        fill="currentColor"
                        className="text-yellow-400"
                      />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center mt-20">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-10 h-10 text-gray-600" />
                </div>
                <p className="text-gray-400 text-[14px]">暂无收藏内容</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Player Widget - High Contrast Frosted Glass */}
      <div
        className="absolute bottom-8 right-6 z-20 w-[275px] cursor-pointer"
        onClick={() => setSelectedPodcast(currentWidgetTrack)}
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/15 rounded-full p-1.5 pr-3.5 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.7)] transition-all duration-300 hover:bg-white/15 hover:border-white/20">
          <div className="flex items-center min-w-0 flex-1">
            <div
              className={`w-9 h-9 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center ${isWidgetPlaying ? "animate-[spin_4s_linear_infinite]" : ""} flex-shrink-0 shadow-inner border border-white/10`}
            >
              <div className="w-2.5 h-2.5 bg-[#A3D977] rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0 ml-2.5">
              <div className="text-white text-[13px] font-bold truncate drop-shadow-md">
                {currentWidgetTrack.title}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            {/* Prev Track Button (切换上一曲) */}
            <button
              className="p-1.5 active:scale-95 transition-transform bg-[#A3D977]/20 rounded-full hover:bg-[#A3D977]/35 text-[#A3D977]"
              onClick={(e) => {
                playPrevTrack(e);
              }}
              title="上一曲"
            >
              <SkipBack className="w-3 h-3 fill-current" />
            </button>

            {/* Play/Pause Button */}
            <button
              className="p-1.5 active:scale-95 transition-transform bg-white/15 rounded-full hover:bg-white/25"
              onClick={(e) => {
                e.stopPropagation();
                setIsWidgetPlaying(!isWidgetPlaying);
              }}
              title={isWidgetPlaying ? "暂停" : "播放"}
            >
              {isWidgetPlaying ? (
                <div className="w-3 h-3 flex gap-0.5 justify-center items-center">
                  <div className="w-0.5 h-3 bg-white rounded-full"></div>
                  <div className="w-0.5 h-3 bg-white rounded-full"></div>
                </div>
              ) : (
                <Play className="w-3 h-3 text-white fill-white ml-0.5" />
              )}
            </button>

            {/* Next Track Button (切换下一曲) */}
            <button
              className="p-1.5 active:scale-95 transition-transform bg-[#A3D977]/20 rounded-full hover:bg-[#A3D977]/35 text-[#A3D977]"
              onClick={(e) => {
                playNextTrack(e);
              }}
              title="下一曲"
            >
              <SkipForward className="w-3 h-3 fill-current" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedPodcast && (
          <PodcastPlayer
            podcast={selectedPodcast}
            onClose={() => setSelectedPodcast(null)}
            category={activeCategory}
            onNext={playNextTrack}
            onPrev={playPrevTrack}
          />
        )}
      </AnimatePresence>

      {/* Search overlay inside ListenModule */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-[#0A0A0A] z-[120] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            {/* Search Header */}
            <div className="px-6 pt-5 pb-4 flex items-center gap-3 border-b border-white/5 bg-[#0A0A0A]">
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-1 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
              >
                <ChevronLeft size={24} className="text-white" />
              </button>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="搜索播客单集/内容..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 bg-white/10 border border-white/5 rounded-full pl-9 pr-4 text-[14px] text-white placeholder:text-gray-500 focus:outline-none focus:bg-white/15 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white flex items-center justify-center p-1"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
              {searchQuery === "" ? (
                <div>
                  <h3 className="text-gray-300 text-[13px] font-bold mb-4 tracking-wider">
                    热门搜索
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      "避税案",
                      "研发费用",
                      "金税四期",
                      "合规",
                      "筹划",
                      "印花税",
                    ].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-full text-[13px] font-medium transition-colors border border-white/5"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {allTracks.filter((t) =>
                    t.title.toLowerCase().includes(searchQuery.toLowerCase()),
                  ).length > 0 ? (
                    allTracks
                      .filter((t) =>
                        t.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()),
                      )
                      .map((track) => {
                        const parentPodcast =
                          podcasts.find((p) => p.id === track.podcastId) ||
                          podcasts[0];
                        return (
                          <div
                            key={track.id}
                            onClick={() => {
                              playSpecificTrack({
                                id: track.id,
                                podcastId: parentPodcast.id,
                                podcastTitle: parentPodcast.title,
                                title: track.title,
                                duration: track.duration,
                                updateTime: track.updateTime,
                                plays: track.plays,
                              });
                              setIsSearchOpen(false);
                            }}
                            className="flex gap-4 items-center bg-white/5 border border-white/5 p-3 rounded-2xl active:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm shadow-sm"
                          >
                            <div className="w-[54px] h-[54px] rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                              <img
                                src={`https://picsum.photos/seed/podcast${track.podcastId}/200/200`}
                                className="w-full h-full object-cover"
                                alt="cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] text-[#A3D977] bg-[#A3D977]/10 px-1.5 py-0.5 rounded font-medium mb-1 inline-block">
                                {track.podcastTitle}
                              </span>
                              <h3 className="text-white text-[14px] font-medium leading-snug line-clamp-2">
                                {track.title}
                              </h3>
                              <div className="text-gray-400 text-[11px] mt-1 flex items-center gap-2">
                                <span className="bg-white/5 px-1 py-0.5 rounded text-[9px]">
                                  {track.duration}
                                </span>
                                <span className="text-gray-500 flex items-center gap-0.5 ml-1">
                                  <Play className="w-3 h-3" /> {track.plays}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <div className="text-gray-500 text-[13px] text-center py-12">
                      没有找到符合条件的播客单集
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const [boundCompanies, setBoundCompanies] = useState<BoundCode[]>([
    { id: '1', code: 'DC2024-VIP-88A', companyName: '大成方略科技股份有限公司', bindTime: '2024-05-10 14:30', role: '管理员', status: '正常', remark: '北京总部专用码' },
    { id: '2', code: 'DC2024-PRO-99B', companyName: '北京智汇财税咨询有限公司', bindTime: '2024-05-08 09:15', role: '普通用户', status: '正常', remark: '销售二部邀请' },
    { id: '3', code: 'DC2024-PRO-99C', companyName: '上海新动力创新科技有限公司', bindTime: '2024-05-01 10:00', role: '普通用户', status: '已过期', remark: '测试体验码' },
    { id: '4', code: 'DC2024-IN-00D', companyName: '广州宏图致远有限公司', bindTime: '2024-04-10 11:20', role: '普通用户', status: '已停用' },
  ]);
  const [currentCompany, setCurrentCompany] = useState<string>("大成方略科技股份有限公司");

  const [currentView, setCurrentView] = useState<
    "main" | "journal" | "assessment" | "event" | "policy-service"
  >("main");
  const [activeAssessment, setActiveAssessment] = useState<any>(null);
  const [activeJournal, setActiveJournal] = useState<Journal | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("出口退税");
  const [isSearchResult, setIsSearchResult] = useState(false);
  const [searchInitialTab, setSearchInitialTab] = useState("综合");
  const [activeNav, setActiveNav] = useState("首页");
  const [eventPageCategory, setEventPageCategory] = useState<
    string | undefined
  >(undefined);
  const [eventPageSingleMode, setEventPageSingleMode] = useState(false);
  const [eventPageInitialEvent, setEventPageInitialEvent] = useState<any>(null);
  const [isChargingPageOpen, setIsChargingPageOpen] = useState(false);
  const [policyTab, setPolicyTab] = useState<"查" | "记录" | "收藏">("查");
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true",
  );
  const [qaInitialQuery, setQaInitialQuery] = useState("");
  const [qaInitialAnswer, setQaInitialAnswer] = useState("");
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [showBackToTopHome, setShowBackToTopHome] = useState(false);
  const [isItineraryVisible, setIsItineraryVisible] = useState(true);

  // Feed Details State
  const [selectedPostDetail, setSelectedPostDetail] = useState<Post | null>(
    null,
  );
  const [shortVideoStartIndex, setShortVideoStartIndex] = useState<
    number | null
  >(null);
  const [persistedVideoIndex, setPersistedVideoIndex] = useState<number | null>(
    null,
  );

  const [isLiveConfirmOpen, setIsLiveConfirmOpen] = useState(false);
  const [isReserveConfirmOpen, setIsReserveConfirmOpen] = useState(false);
  const [reservingPost, setReservingPost] = useState<Post | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAIShareModalOpen, setIsAIShareModalOpen] = useState(false);
  const [isImageShareModalOpen, setIsImageShareModalOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMessageBannerVisible, setIsMessageBannerVisible] = useState(true);
  const [isMessageCenterOpen, setIsMessageCenterOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(105);
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null,
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [courseInitialTab, setCourseInitialTab] = useState<string>("介绍");
  const [courseInitialChapter, setCourseInitialChapter] = useState<number>(0);
  const [isHotRecommendPageOpen, setIsHotRecommendPageOpen] = useState(false);
  const [showCourseCategoryPage, setShowCourseCategoryPage] = useState(false);
  const [isLiveTeaserPageOpen, setIsLiveTeaserPageOpen] = useState(false);
  const [activeCourseCategory, setActiveCourseCategory] = useState("全部");
  const [isListenModuleOpen, setIsListenModuleOpen] = useState(false);
  const [listenInitialPodcast, setListenInitialPodcast] = useState<any>(null);

  // Channel Management State
  const [myChannels, setMyChannels] = useState([
    "综合",
    "会计出纳",
    "房地产",
    "AI财务工具",
    "成本预算",
  ]);
  const [isEditingChannels, setIsEditingChannels] = useState(false);
  const [isChannelManagerOpen, setIsChannelManagerOpen] = useState(false);

  // Filter State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<"filter" | "time">("filter");
  const [selectedPolicyCategory, setSelectedPolicyCategory] = useState<
    string | null
  >(null);
  const [selectedPolicy, setSelectedPolicy] = useState<{
    title: string;
    date: string;
    type?: string;
  } | null>(null);
  const [activeFilterTab, setActiveFilterTab] = useState("region");
  const [isTimeFilterOpen, setIsTimeFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    region: string[];
    taxType: string[];
    industry: string[];
    people: string[];
    authority: string[];
    effectiveness: string[];
    policyType: string[];
    time: string;
  }>({
    region: [],
    taxType: [],
    industry: [],
    people: [],
    authority: [],
    effectiveness: [],
    policyType: [],
    time: "",
  });

  const filterOptions = {
    region: {
      label: "适用地域",
      options: [
        "全国",
        "北京",
        "天津",
        "河北",
        "山西",
        "内蒙古",
        "辽宁",
        "吉林",
        "黑龙江",
        "上海",
        "江苏",
        "浙江",
        "安徽",
        "福建",
        "江西",
        "山东",
        "河南",
        "湖北",
        "湖南",
        "广东",
        "广西",
        "海南",
        "重庆",
        "四川",
        "贵州",
        "云南",
        "西藏",
        "陕西",
        "甘肃",
        "青海",
        "宁夏",
        "新疆",
        "台湾",
        "香港",
        "澳门",
      ],
    },
    taxType: {
      label: "适用税种",
      options: [
        "增值税",
        "消费税",
        "企业所得税",
        "个人所得税",
        "资源税",
        "城市维护建设税",
        "房产税",
        "印花税",
        "城镇土地使用税",
        "土地增值税",
        "车船税",
        "船舶吨税",
        "车辆购置税",
        "关税",
        "耕地占用税",
        "契税",
        "环境保护税",
      ],
    },
    industry: {
      label: "适用行业",
      options: [
        "农、林、牧、渔业",
        "采矿业",
        "制造业",
        "电力、热力、燃气及水生产和供应业",
        "建筑业",
        "批发和零售业",
        "交通运输、仓储和邮政业",
        "住宿和餐饮业",
        "信息传输、软件和信息技术服务业",
        "金融业",
        "房地产业",
        "租赁和商务服务业",
        "科学研究和技术服务业",
        "水利、环境和公共设施管理业",
        "居民服务、修理和其他服务业",
        "教育",
        "卫生和社会工作",
        "文化、体育和娱乐业",
        "公共管理、社会保障和社会组织",
        "国际组织",
      ],
    },
    people: {
      label: "适用人群",
      options: [
        "企业纳税人",
        "个人纳税人",
        "个体工商户",
        "涉税专业服务机构",
        "税务机关",
      ],
    },
    authority: {
      label: "发文机关",
      options: [
        "全国人民代表大会及其常务委员会",
        "国务院",
        "财政部",
        "国家税务总局",
        "海关总署",
        "国务院关税税则委员会",
        "地方人民代表大会及其常务委员会",
        "地方人民政府",
        "地方税务局",
      ],
    },
    effectiveness: {
      label: "效力级别",
      options: [
        "法律",
        "行政法规",
        "部门规章",
        "税收规范性文件",
        "地方性法规",
        "地方政府规章",
        "地方税收规范性文件",
      ],
    },
    policyType: {
      label: "政策类型",
      options: [
        "实体法",
        "程序法",
        "税收优惠",
        "征收管理",
        "税务稽查",
        "行政复议",
        "行政诉讼",
      ],
    },
  };

  const chargingFilterOptions = {
    jobEscort: {
      label: "岗位护航",
      options: [
        "会计出纳",
        "税务经理",
        "审计经理",
        "成本经理",
        "财税BP",
        "财务分析",
        "财务总监",
        "CFO、资金经理",
      ],
    },
    businessTopic: {
      label: "业务专题",
      options: [
        "成本预算",
        "经营分析",
        "稽查应对",
        "税务申报",
        "税收优惠",
        "汇算清缴",
      ],
    },
    hotFinance: {
      label: "热点财税",
      options: ["企业职场", "综合能力", "职业素养", "业绩追踪", "公司治理"],
    },
    boutiqueTraining: {
      label: "精品研修",
      options: ["财务晋级特训", "公司治理特训", "高阶税务经理", "高级经理"],
    },
    titleExam: { label: "职称考培", options: ["注册会计师", "注册审计"] },
    industryFinance: {
      label: "行业财税",
      options: [
        "高科技企业",
        "建筑业",
        "制造业",
        "房地产",
        "电商",
        "跨境电电商",
        "电力企业",
        "医药行业",
      ],
    },
    bossFinance: {
      label: "老板财商",
      options: ["AI财税未来", "财税危机风险等", "政策环境"],
    },
    toolTutorial: {
      label: "工具教程",
      options: ["AI财务工具", "Excel报表制作"],
    },
  };

  const timeOptions = ["今天", "本周", "本月"];

  const allSelectedFilters = [
    ...selectedFilters.region
      .filter((r) => r !== "全国")
      .map((v) => ({ type: "region", value: v })),
    ...selectedFilters.taxType.map((v) => ({ type: "taxType", value: v })),
    ...selectedFilters.industry.map((v) => ({ type: "industry", value: v })),
    ...selectedFilters.people.map((v) => ({ type: "people", value: v })),
    ...selectedFilters.authority.map((v) => ({ type: "authority", value: v })),
    ...selectedFilters.effectiveness.map((v) => ({
      type: "effectiveness",
      value: v,
    })),
    ...selectedFilters.policyType.map((v) => ({
      type: "policyType",
      value: v,
    })),
    ...(selectedFilters.time
      ? [{ type: "time", value: selectedFilters.time }]
      : []),
  ];

  const selectedFilterCount = [
    ...selectedFilters.region.filter((r) => r !== "全国"),
    ...selectedFilters.taxType,
    ...selectedFilters.industry,
    ...selectedFilters.people,
    ...selectedFilters.authority,
    ...selectedFilters.effectiveness,
    ...selectedFilters.policyType,
  ].length;

  const selectedTimeCount = selectedFilters.time ? 1 : 0;

  const toggleFilter = (type: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => {
      if (type === "time") {
        return { ...prev, time: prev.time === value ? "" : value };
      }
      const list = prev[type] as string[];
      if (list.includes(value)) {
        return { ...prev, [type]: list.filter((v) => v !== value) };
      } else {
        return { ...prev, [type]: [...list, value] };
      }
    });
  };

  const removeFilter = (type: string, value: string) => {
    toggleFilter(type as keyof typeof selectedFilters, value);
  };

  const resetFilters = () => {
    setSelectedFilters({
      region: ["全国"],
      taxType: [],
      industry: [],
      people: [],
      authority: [],
      effectiveness: [],
      policyType: [],
      time: "",
    });
  };

  const applyFilters = () => {
    setIsFilterDrawerOpen(false);
  };

  const scrollToCategory = (key: string) => {
    setActiveFilterTab(key);
    const element = document.getElementById(`filter-category-${key}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current || !feedRef.current) return;
    const scrollTop = scrollContainerRef.current.scrollTop;
    const feedTop = feedRef.current.offsetTop;

    // Header changes when feed hits the top
    setIsTabsSticky(scrollTop >= feedTop - 10);

    // Tabs become compact when scrolled 100px past the sticky point
    setIsCompact(scrollTop >= feedTop + 100);

    // Show back to top button
    setShowBackToTopHome(scrollTop > 500);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(false);
    setIsSearchResult(true);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans text-gray-900 flex justify-center items-start py-10">
      {/* SVG Gradients for Icons */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient
            id="whiteGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Mobile Frame Container - Very Thin Phone Shell with Dynamic Island */}
      <div className="w-full max-w-[414px] bg-[#F5F6F8] h-[896px] relative flex flex-col overflow-hidden border-[1px] border-gray-300 rounded-[56px] shadow-[0_40px_80px_rgba(0,0,0,0.1)] transform-gpu">
        {isSearching && (
          <SearchHistory
            onClose={() => setIsSearching(false)}
            onSearch={handleSearch}
          />
        )}
        {isSearchResult && (
          <SearchResults
            query={searchQuery}
            initialTab={searchInitialTab}
            visible={activeNav === "首页"}
            onClose={() => setIsSearchResult(false)}
            onClear={() => {
              setIsSearchResult(false);
              setIsSearching(true);
            }}
            onShareClick={() => setIsShareModalOpen(true)}
            onAIShareClick={() => setIsAIShareModalOpen(true)}
            onChatClick={(query, answer) => {
              setQaInitialQuery(query);
              setQaInitialAnswer(answer);
              setActiveNav("AI财税");
            }}
            onFilterClick={() => setIsFilterDrawerOpen(true)}
            onRemoveFilter={removeFilter}
            allSelectedFilters={allSelectedFilters}
            onPostClick={(post) => {
              if (post.type === "publication") {
                const journal = MOCK_JOURNALS.find((j) => j.id === post.id);
                if (journal) {
                  setActiveJournal(journal);
                  setCurrentView("journal");
                  setIsSearchResult(false);
                }
              } else if (post.type === "course") {
                setCourseInitialTab("介绍");
                setCourseInitialChapter(0);
                setSelectedCourse(post);
              } else if (
                post.type === "video" ||
                post.type === "vertical-video"
              ) {
                setShortVideoStartIndex(0);
              } else if (post.type === "audio") {
                setListenInitialPodcast(post);
                setIsListenModuleOpen(true);
              } else {
                setSelectedPostDetail(post);
              }
            }}
          />
        )}

        <AnimatePresence>
          {currentView === "journal" && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-[100] bg-[#F5F6F8] overflow-hidden"
            >
              <JournalPage
                onBack={() => {
                  setCurrentView("main");
                  setActiveJournal(null);
                }}
                initialJournal={activeJournal}
              />
            </motion.div>
          )}
          {currentView === "assessment" && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-[100] bg-[#F5F6F8] overflow-y-auto no-scrollbar"
            >
              <AssessmentPage
                onBack={() => {
                  setCurrentView("main");
                  setActiveAssessment(null);
                }}
                initialAssessment={
                  activeAssessment
                    ? {
                        id: `course_test_${activeAssessment.id}`,
                        category: "课程测试",
                        title: activeAssessment.title,
                        description: "课程随堂测试，检验学习成果。",
                        questionCount: 2,
                        participants: activeAssessment.participants,
                        duration: activeAssessment.time,
                        isHot: true,
                        type: "test",
                        cover:
                          "https://p5.itc.cn/q_70/images03/20220312/0a76461d44c146239140192d2ff13158.png",
                        questions: [
                          {
                            id: "q1",
                            type: "single",
                            question:
                              "企业发生的符合条件的广告费和业务宣传费支出，不超过当年销售收入（ ）的部分，准予扣除。",
                            options: ["10%", "15%", "20%", "30%"],
                            answer: [1],
                            explanation:
                              "《企业所得税法实施条例》第四十四条规定，不超过当年销售收入15%的部分，准予扣除。",
                            videoUrl:
                              "https://www.w3schools.com/html/mov_bbb.mp4",
                            relatedKnowledge: [
                              "企业所得税法实施条例第四十四条",
                            ],
                          },
                          {
                            id: "q2",
                            type: "multiple",
                            question:
                              "下列各项中，在计算企业所得税应纳税所得额时不得扣除的有（ ）。",
                            options: [
                              "企业之间支付的管理费",
                              "企业内营业机构之间支付的租金",
                              "罚金、罚款",
                              "税收滞纳金",
                            ],
                            answer: [0, 1, 2, 3],
                            explanation:
                              "根据所得税法，管理费、内部分支机构租金、罚金及滞纳金均不得税前扣除。",
                          },
                        ],
                      }
                    : undefined
                }
              />
            </motion.div>
          )}
          {currentView === "event" && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-[100] bg-[#F5F6F8] overflow-y-auto no-scrollbar"
            >
              <EventPage
                onBack={() => {
                  if (persistedVideoIndex !== null) {
                    setShortVideoStartIndex(persistedVideoIndex);
                    setPersistedVideoIndex(null);
                  }
                  setCurrentView("main");
                  setEventPageSingleMode(false);
                  setEventPageInitialEvent(null);
                }}
                initialCategory={eventPageCategory}
                singleCategoryMode={eventPageSingleMode}
                initialEvent={eventPageInitialEvent}
              />
            </motion.div>
          )}
          {currentView === "policy-service" && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-[100] bg-[#F5F6F8] overflow-y-auto no-scrollbar"
            >
              <PolicyServicePage onBack={() => setCurrentView("main")} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isLiveConfirmOpen && (
            <LiveConfirmModal
              onConfirm={() => {
                setIsLiveConfirmOpen(false);
                // In a real app, this would be window.location.href = 'xiaoetong://...' or similar
                console.log("Jumping to Xiaoetong...");
              }}
              onCancel={() => setIsLiveConfirmOpen(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isReserveConfirmOpen && reservingPost && (
            <ReserveConfirmModal
              post={reservingPost}
              onConfirm={() => {
                setIsReserveConfirmOpen(false);
                showToast("预约成功");
              }}
              onCancel={() => setIsReserveConfirmOpen(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isShareModalOpen && (
            <ShareModal onClose={() => setIsShareModalOpen(false)} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAIShareModalOpen && (
            <AIShareModal
              onClose={() => setIsAIShareModalOpen(false)}
              onImageShare={() => {
                setIsAIShareModalOpen(false);
                setIsImageShareModalOpen(true);
              }}
              onLinkShare={() => {
                setIsAIShareModalOpen(false);
                showToast("链接复制成功");
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isImageShareModalOpen && (
            <ImageShareModal
              onClose={() => setIsImageShareModalOpen(false)}
              onAction={(action) => {
                setIsImageShareModalOpen(false);
                if (action === "下载") {
                  showToast("已保存到相册");
                } else if (action === "微信好友") {
                  showToast("已准备好发送给微信好友");
                } else if (action === "朋友圈") {
                  showToast("已生成朋友圈海报");
                } else if (action === "收藏") {
                  showToast("已添加到收藏");
                } else if (action === "复制链接") {
                  showToast("链接复制成功");
                }
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -20, x: "-50%" }}
              className="absolute top-24 left-1/2 z-[300] bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-lg"
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Image with Gradient Mask */}
        {activeNav === "首页" && (
          <div className="absolute top-0 left-0 w-full h-[450px] z-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[#F5F6F8]"></div>
            <img
              src="https://picsum.photos/seed/taxbg/800/600"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 0%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, transparent 100%)",
              }}
              alt=""
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Status Bar Area */}
        {activeNav === "首页" && (
          <div
            className={`px-6 sticky top-0 z-50 transition-all duration-300 flex flex-col ${isTabsSticky ? "bg-[#F5F6F8]/95 backdrop-blur-md shadow-sm pt-4 pb-4" : "bg-transparent pt-6 pb-4"}`}
          >
            {/* Row 1: Always Brand Space & Capsule */}
            {!isTabsSticky && (
              <div className="flex justify-between items-center w-full min-h-[40px] relative">
                <div className="flex-1">
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {/* Capsule Button: Standard position */}
                  <div className="w-10"></div>
                </div>
              </div>
            )}

            {/* Row 2: Message & Search Box (New row created below Row 1 when sticky) */}
            <AnimatePresence>
              {isTabsSticky && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -5 }}
                  className="flex items-center gap-3 w-full"
                >

                  <div
                    onClick={() => {
                      setSearchInitialTab("综合");
                      setIsSearching(true);
                    }}
                    className="flex-1 flex items-center bg-white h-[36px] rounded-full px-4 shadow-sm border border-gray-100 cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 text-gray-400 mr-2" />
                    <span className="text-[13px] text-gray-400 truncate">
                      AI搜
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Scrollable Content */}
        {activeNav === "首页" ? (
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto no-scrollbar relative z-10 bg-[#F5F6F8]"
          >
            {/* Header Section */}
            <section className="px-6 pt-5 pb-10">
              {/* Message Banner */}
              <AnimatePresence>
                {isMessageBannerVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-6 bg-white rounded-full px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center justify-between border border-gray-50"
                  >
                    <div
                      className="flex items-center gap-2 flex-1 cursor-pointer overflow-hidden"
                      onClick={() => {
                        setSelectedMessageId(2); // Link to AI Competition message
                        setIsMessageCenterOpen(true);
                      }}
                    >
                      <Megaphone className="w-4 h-4 text-orange-500 shrink-0" />
                      <span className="text-[13px] text-gray-700 truncate font-medium">
                        大成方略举办2026年财税AI大赛、火热报名中...
                      </span>
                    </div>
                    <button
                      onClick={() => setIsMessageBannerVisible(false)}
                      className="p-1 ml-2 text-gray-400 hover:bg-gray-100 rounded-full shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <h1 className="text-[30px] font-bold flex items-center gap-2 text-gray-900">
                  大成方略AI财税引擎
                  <Quote className="w-8 h-8 text-[#7C3AED] fill-[#7C3AED] opacity-80" />
                </h1>
                <p className="text-gray-400 text-[15px] mt-2">
                  引领财税+AI新纪元
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative mt-8">
                <input
                  type="text"
                  placeholder="输入财税问题，AI为您解答"
                  onFocus={() => {
                    setSearchInitialTab("综合");
                    setIsSearching(true);
                  }}
                  className="w-full h-[48px] bg-white rounded-2xl px-6 pr-24 shadow-[0_4px_12px_rgba(0,0,0,0.02)] border-none focus:outline-none transition-all placeholder:text-gray-300 cursor-pointer"
                />
                <button
                  onClick={() => {
                    setSearchInitialTab("综合");
                    setIsSearching(true);
                  }}
                  className="absolute right-1.5 top-1.5 h-[36px] px-4 bg-[#3B82F6] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100 active:scale-95 transition-transform"
                >
                  <span className="text-[13px] font-bold whitespace-nowrap">
                    AI搜
                  </span>
                </button>
              </div>

              {/* Quick Actions - 1:1 UI Style Recreation */}
              <div className="flex justify-between mt-9">
                <QuickActionIcon
                  icon={Play}
                  label="学"
                  colorClass="bg-gradient-to-br from-[#4F75FF] to-[#3B59F6]"
                  glowColor="bg-[#4F75FF]"
                  shadowClass="shadow-[0_8px_16px_-4px_rgba(59,89,246,0.5)]"
                  onClick={() => setIsChargingPageOpen(true)}
                />
                <QuickActionIcon
                  icon={Headphones}
                  label="听"
                  colorClass="bg-gradient-to-br from-[#4ADE80] to-[#22C55E]"
                  glowColor="bg-[#4ADE80]"
                  shadowClass="shadow-[0_8px_16px_-4px_rgba(34,197,94,0.5)]"
                  onClick={() => setIsListenModuleOpen(true)}
                />
                <QuickActionIcon
                  icon={BookOpen}
                  label="看"
                  colorClass="bg-gradient-to-br from-[#FB923C] to-[#F97316]"
                  glowColor="bg-[#FB923C]"
                  shadowClass="shadow-[0_8px_16px_-4px_rgba(249,115,22,0.5)]"
                  onClick={() => setCurrentView("journal")}
                />
                <QuickActionIcon
                  icon={ClipboardCheck}
                  label="测"
                  colorClass="bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6]"
                  glowColor="bg-[#A78BFA]"
                  shadowClass="shadow-[0_8px_16px_-4px_rgba(139,92,246,0.5)]"
                  onClick={() => setCurrentView("assessment")}
                />
                <QuickActionIcon
                  icon={Navigation}
                  label="行"
                  colorClass="bg-gradient-to-br from-[#FB7185] to-[#F43F5E]"
                  glowColor="bg-[#FB7185]"
                  shadowClass="shadow-[0_8px_16px_-4px_rgba(244,63,94,0.5)]"
                  onClick={() => {
                    setEventPageCategory(undefined);
                    setCurrentView("event");
                  }}
                />
              </div>
            </section>

            {/* Feed Container */}
            <div
              ref={feedRef}
              className="min-h-[1200px] pb-32 relative z-20 mt-6"
            >
              {/* Animated Background */}
              <div
                className={`absolute inset-x-0 bottom-0 bg-white shadow-[0_-12px_40px_rgba(0,0,0,0.03)] transition-all duration-300 -z-10 ${isTabsSticky ? "top-0 rounded-none" : "top-20 rounded-t-[48px]"}`}
              />

              {/* Banner */}
              <section className="px-5 relative z-10 pt-2">
                <div className="relative rounded-[24px] overflow-hidden aspect-[21/10] shadow-sm">
                  <img
                    src="https://media2.hntv.tv/data_01/1/1/2022/03/01/23f9023f7dd0d74d8737a817fb62972c.jpg"
                    className="w-full h-full object-cover"
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === 1 ? "bg-white w-4" : "bg-white/50"}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Live Recommendations */}
              <section className="px-6 py-4 mt-2 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[18px] font-bold text-gray-900 flex items-center gap-2">
                    <Video className="w-5 h-5 text-red-500" /> 直播推荐
                  </h2>
                  <button
                    onClick={() => setIsLiveTeaserPageOpen(true)}
                    className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    更多
                  </button>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
                  {[...HOME_POSTS, ...AI_RESULT_POSTS]
                    .filter(
                      (post) =>
                        post.type === "live" && post.status !== "playback",
                    )
                    .map((post) => (
                      <div
                        key={post.id}
                        className="min-w-[280px] w-[280px] bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-50 flex-shrink-0 cursor-pointer group flex h-[90px]"
                        onClick={() => {
                          if (post.status === "live") {
                            setIsLiveConfirmOpen(true);
                          } else if (post.status === "reserve") {
                            showToast("预约成功");
                          }
                        }}
                      >
                        <div className="relative w-20 h-full bg-gray-100 overflow-hidden flex-shrink-0">
                          <img
                            src={post.cover}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            alt=""
                            referrerPolicy="no-referrer"
                          />
                          {post.status === "live" && (
                            <div className="absolute top-1 left-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm transform scale-90 origin-top-left">
                              <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
                              直播中
                            </div>
                          )}
                          {post.status === "reserve" && (
                            <>
                              <div className="absolute top-1 left-1 bg-blue-500/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm transform scale-90 origin-top-left">
                                预告
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showToast("预约成功");
                                }}
                                className="absolute bottom-1.5 inset-x-1.5 py-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-[10px] font-black rounded-lg shadow-[0_2px_8px_rgba(249,115,22,0.3)] active:scale-95 transition-all text-center flex items-center justify-center cursor-pointer z-10"
                              >
                                预约
                              </button>
                            </>
                          )}
                        </div>
                        <div className="flex-1 p-3 flex flex-col justify-center min-w-0">
                          <h3 className="text-[14px] font-bold text-gray-900 line-clamp-2 leading-tight mb-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">
                              {post.startDate
                                ? post.startDate
                                : post.time
                                  ? formatLiveTime(post.time)
                                  : "今日 14:00"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </section>

              {/* Hot Topics for Small Business Owners */}
              <section className="px-6 py-4 mt-4 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[18px] font-bold text-gray-900 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" /> 精选推荐
                  </h2>
                  <button
                    onClick={() => setIsHotRecommendPageOpen(true)}
                    className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    更多
                  </button>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
                  {/* Video Card */}
                  <div className="min-w-[130px] w-[130px] bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-50 flex-shrink-0 cursor-pointer group">
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src="https://picsum.photos/seed/social_security/400/225"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt=""
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                    </div>
                    <div className="p-2">
                      <h3 className="text-[13px] font-bold text-gray-900 line-clamp-2 leading-tight">
                        员工必须缴纳社保新规深度解读
                      </h3>
                    </div>
                  </div>

                  {/* Course Card */}
                  <div className="min-w-[130px] w-[130px] bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-50 flex-shrink-0 cursor-pointer group">
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src="https://picsum.photos/seed/ecommerce_tax/400/225"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt=""
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-[13px] font-bold text-gray-900 line-clamp-2 leading-tight">
                        电商老板出海报税相关课程
                      </h3>
                    </div>
                  </div>

                  {/* AI Tool Card */}
                  <div className="min-w-[130px] w-[130px] bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-50 flex-shrink-0 cursor-pointer group">
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src="https://picsum.photos/seed/ai_finance/400/225"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt=""
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-[13px] font-bold text-gray-900 line-clamp-2 leading-tight">
                        AI 时代财务人的技能升级指南
                      </h3>
                    </div>
                  </div>
                </div>
              </section>

              {/* Feed List */}
              <section className="mt-2 px-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[18px] font-bold text-gray-900 flex items-center gap-2">
                    财税视讯
                  </h2>
                </div>
                {[...HOME_POSTS, ...AI_RESULT_POSTS]
                  .filter(
                    (post) =>
                      post.type !== "live" &&
                      post.status !== "playback" &&
                      post.type !== "event" &&
                      post.type !== "course" &&
                      post.type !== "publication",
                  )
                  .sort(
                    (a, b) =>
                      new Date(b.time || 0).getTime() -
                      new Date(a.time || 0).getTime(),
                  )
                  .map((post, idx, arr) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onShareClick={() => setIsShareModalOpen(true)}
                      onReserve={() => showToast("预约成功")}
                      onLiveJoin={() => setIsLiveConfirmOpen(true)}
                      onEnroll={() => showToast("请填写报名信息")}
                      onClick={() => {
                        if (
                          post.type === "video" ||
                          post.type === "vertical-video"
                        ) {
                          setShortVideoStartIndex(
                            arr.findIndex((p) => p.id === post.id),
                          );
                        } else if (post.type === "course") {
                          setCourseInitialTab("介绍");
                          setCourseInitialChapter(0);
                          setSelectedCourse(post);
                        } else if (post.type === "event") {
                          setEventPageInitialEvent(post);
                          setCurrentView("event");
                        } else {
                          setSelectedPostDetail(post);
                        }
                      }}
                    />
                  ))}
              </section>
            </div>

            <AnimatePresence>
              {showBackToTopHome && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() =>
                    scrollContainerRef.current?.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                  className="fixed right-6 bottom-24 p-3 bg-white text-gray-600 rounded-full shadow-xl border border-gray-100 hover:text-[#8B5CF6] transition-colors z-[300] active:scale-95"
                >
                  <ArrowUp size={24} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        ) : activeNav === "权益" ? (
          <BenefitsPage
            companyName={currentCompany}
            boundCompanies={boundCompanies}
            onSwitchCompany={setCurrentCompany}
            onSpecialColumnClick={(category) => {
              setActiveCourseCategory(category);
              setShowCourseCategoryPage(true);
            }}
            onEventClick={() => {
              setEventPageCategory("游学标杆");
              setEventPageSingleMode(true);
              setCurrentView("event");
            }}
            onCourseClick={(course) => {
              setCourseInitialTab("介绍");
              setCourseInitialChapter(0);
              setSelectedCourse(course);
            }}
            onEnterMemberCenter={() => setActiveNav("会员")}
          />
        ) : activeNav === "AI财税" ? (
          <TaxQASection
            initialQuery={qaInitialQuery}
            initialAnswer={qaInitialAnswer}
            onAIShareClick={() => setIsAIShareModalOpen(true)}
            onUpgradeClick={() => setActiveNav("会员")}
          />
        ) : activeNav === "查政策" ? (
          <div className="flex-1 overflow-y-auto no-scrollbar bg-[#F5F6F8] pb-24 relative">
            <div className="sticky top-0 z-10 bg-white pt-5 pb-2 px-4 flex items-center justify-between gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              {/* Left: Tabs */}
              <div className="flex items-center gap-4 shrink-0">
                <button
                  onClick={() => setPolicyTab("查")}
                  className={`text-[18px] font-bold transition-colors ${policyTab === "查" ? "text-gray-900" : "text-gray-400"}`}
                >
                  查
                </button>
                <button
                  onClick={() => setPolicyTab("记录")}
                  className={`text-[16px] font-medium transition-colors ${policyTab === "记录" ? "text-gray-900" : "text-gray-400"}`}
                >
                  记录
                </button>
                <button
                  onClick={() => setPolicyTab("收藏")}
                  className={`text-[16px] font-medium transition-colors ${policyTab === "收藏" ? "text-gray-900" : "text-gray-400"}`}
                >
                  收藏
                </button>
              </div>

              {/* Middle: Search Box */}
              <div
                className="flex-1 h-8 bg-gray-100 rounded-full flex items-center px-3 cursor-pointer"
                onClick={() => setIsSearching(true)}
              >
                <Search className="w-4 h-4 text-gray-400 mr-1.5" />
                <span className="text-[13px] text-gray-400">搜索政策...</span>
              </div>

              {/* Right: Capsule Button */}
              <div className="shrink-0 flex items-center h-8 px-2.5">
                <div className="w-8"></div>
              </div>
            </div>
            <div className="mt-2">
              {policyTab === "查" && (
                <PolicyTabContent
                  onCategorySelect={setSelectedPolicyCategory}
                  onPolicySelect={setSelectedPolicy}
                />
              )}
              {policyTab === "记录" && (
                <div className="p-6 text-center text-gray-400 mt-10">
                  暂无浏览记录
                </div>
              )}
              {policyTab === "收藏" && (
                <div className="p-6 text-center text-gray-400 mt-10">
                  暂无收藏记录
                </div>
              )}
            </div>
          </div>
        ) : activeNav === "会员" ? (
          <MemberPage onBack={() => setActiveNav("权益")} />
        ) : activeNav === "我的" ? (
          <UserPage
            onLogout={() => setIsLoggedIn(false)}
            onMemberClick={() => setActiveNav("权益")}
            unreadCount={unreadCount}
            onMessageCenterClick={() => setIsMessageCenterOpen(true)}
            currentCompany={currentCompany}
            boundCompanies={boundCompanies}
            onSwitchCompany={setCurrentCompany}
            onBindCode={(code) => setBoundCompanies([code, ...boundCompanies])}
            onUnbindCode={(id) => setBoundCompanies(boundCompanies.filter(c => c.id !== id))}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            {activeNav}页面开发中...
          </div>
        )}

        {/* Login Page Overlay */}
        {!isLoggedIn && !showOnboarding && (
          <LoginPage onLogin={() => setShowOnboarding(true)} />
        )}

        {/* Bottom Navigation */}
        {activeNav !== "会员" && (
          <nav className="absolute bottom-0 w-full bg-white/95 backdrop-blur-2xl border-t border-gray-50 px-6 pt-4 pb-10 flex justify-between items-center z-50">
            <NavItem
              icon={Home}
              label="首页"
              active={activeNav === "首页"}
              onClick={() => setActiveNav("首页")}
            />
            <NavItem
              icon={MessageSquare}
              label="AI财税"
              active={activeNav === "AI财税"}
              onClick={() => setActiveNav("AI财税")}
            />
            <NavItem
              icon={FileSearch}
              label="查政策"
              active={activeNav === "查政策"}
              onClick={() => setActiveNav("查政策")}
            />
            <NavItem
              icon={Crown}
              label="权益"
              active={activeNav === "权益"}
              onClick={() => setActiveNav("权益")}
            />
            <NavItem
              icon={User}
              label="我的"
              active={activeNav === "我的"}
              onClick={() => setActiveNav("我的")}
            />
          </nav>
        )}

        {/* Charging Page Overlay */}
        <AnimatePresence>
          {isChargingPageOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-[80] bg-white flex flex-col"
            >
              <ChargingPage
                onBack={() => setIsChargingPageOpen(false)}
                onSearchClick={() => setIsSearching(true)}
                onFilterClick={() => setIsChannelManagerOpen(true)}
                onCourseClick={(course) => {
                  setCourseInitialTab(course.initialTab || "介绍");
                  setCourseInitialChapter(course.initialChapterIndex || 0);
                  setSelectedCourse(course);
                }}
                myChannels={myChannels}
                setShowCourseCategoryPage={setShowCourseCategoryPage}
                setActiveCourseCategory={setActiveCourseCategory}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Topic Page Overlay */}
        {selectedTopic && (
          <TopicPage
            topic={selectedTopic}
            onClose={() => setSelectedTopic(null)}
            setActiveAssessment={setActiveAssessment}
            setCurrentView={setCurrentView}
          />
        )}

        {/* Course Detail Page Overlay */}
        {selectedCourse && (
          <CourseDetailPage
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
            onStartTest={(test) => {
              setActiveAssessment(test);
              setCurrentView("assessment");
            }}
            initialTab={courseInitialTab}
            initialChapterIndex={courseInitialChapter}
          />
        )}

        {/* Course Category Page Overlay */}
        <AnimatePresence>
          {showCourseCategoryPage && (
            <CourseCategoryPage
              initialCategory={activeCourseCategory}
              onClose={() => setShowCourseCategoryPage(false)}
            />
          )}
        </AnimatePresence>

        {/* Live Teaser Page Overlay */}
        <AnimatePresence>
          {isLiveTeaserPageOpen && (
            <LiveTeaserPage
              onBack={() => setIsLiveTeaserPageOpen(false)}
              onReserve={() => showToast("预约成功")}
              onLiveJoin={() => setIsLiveConfirmOpen(true)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedPolicyCategory && activeNav === "查政策" && (
            <PolicyDetailPage
              initialCategory={selectedPolicyCategory}
              onBack={() => setSelectedPolicyCategory(null)}
              onSearchClick={() => setIsSearching(true)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedPolicy && activeNav === "查政策" && (
            <PolicyArticlePage
              article={selectedPolicy}
              onBack={() => setSelectedPolicy(null)}
              onAskAI={(query) => {
                setQaInitialQuery(query);
                setQaInitialAnswer("");
                setActiveNav("AI财税");
              }}
            />
          )}
        </AnimatePresence>

        {/* Listen Module Overlay */}
        <AnimatePresence>
          {isListenModuleOpen && (
            <ListenModule
              onClose={() => {
                setIsListenModuleOpen(false);
                setListenInitialPodcast(null);
              }}
              initialPodcast={listenInitialPodcast}
            />
          )}
        </AnimatePresence>

        {/* Floating Action Button Removed */}

        <AnimatePresence>
          {isChannelManagerOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] flex flex-col justify-end bg-black/40 backdrop-blur-sm"
              onClick={() => setIsChannelManagerOpen(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-white rounded-t-3xl h-[75%] flex flex-col w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsChannelManagerOpen(false)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white/80 rounded-full backdrop-blur-sm"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto no-scrollbar pb-10 pt-6">
                  {/* My Channels Section */}
                  <div className="px-6 pb-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[16px] font-bold text-gray-900">
                          我的频道
                        </h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-x-3 gap-y-4">
                      {myChannels.map((channel) => (
                        <div key={channel} className="relative">
                          <div
                            className={`rounded-lg py-2.5 text-center text-[14px] font-medium transition-colors whitespace-nowrap overflow-hidden text-ellipsis px-1 ${
                              channel === "综合"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-gray-50 text-gray-700"
                            }`}
                          >
                            {channel}
                          </div>
                          {channel !== "综合" && (
                            <button
                              onClick={() =>
                                setMyChannels((prev) =>
                                  prev.filter((c) => c !== channel),
                                )
                              }
                              className="absolute -top-1.5 -right-1.5 bg-gray-400 text-white rounded-full w-4 h-4 flex items-center justify-center shadow-sm"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Categories Section */}
                  <div className="px-6 py-4 space-y-10">
                    {Object.entries(chargingFilterOptions).map(
                      ([key, category]) => (
                        <div key={key}>
                          <h4 className="text-[15px] font-bold text-gray-900 mb-5">
                            {category.label}
                          </h4>
                          <div className="grid grid-cols-4 gap-x-3 gap-y-4">
                            {category.options.map((opt) => {
                              const isInMyChannels = myChannels.includes(opt);
                              return (
                                <button
                                  key={opt}
                                  onClick={() => {
                                    if (isInMyChannels) {
                                      if (opt !== "综合") {
                                        setMyChannels((prev) =>
                                          prev.filter((c) => c !== opt),
                                        );
                                      }
                                    } else {
                                      setMyChannels((prev) => [...prev, opt]);
                                    }
                                  }}
                                  className={`relative border rounded-lg py-2.5 text-center text-[13px] font-medium transition-all flex items-center justify-center gap-1 whitespace-nowrap overflow-hidden text-ellipsis px-1 ${
                                    isInMyChannels
                                      ? "bg-white border-gray-100 text-gray-300"
                                      : "bg-white border-gray-100 text-gray-700 hover:border-blue-200 active:scale-95"
                                  }`}
                                >
                                  {!isInMyChannels ? (
                                    <Plus className="w-3 h-3 text-gray-300 shrink-0" />
                                  ) : (
                                    <Check className="w-3 h-3 text-gray-300 shrink-0" />
                                  )}
                                  <span className="truncate">{opt}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isFilterDrawerOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] flex flex-col justify-end bg-black/40 backdrop-blur-sm"
              onClick={() => setIsFilterDrawerOpen(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-white rounded-t-3xl h-[66%] flex flex-col w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex px-6 py-4 border-b border-gray-100 items-center justify-between">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setDrawerTab("filter")}
                      className={`text-[16px] font-bold transition-colors flex items-center gap-1 ${drawerTab === "filter" ? "text-gray-900" : "text-gray-500"}`}
                    >
                      筛选{" "}
                      {selectedFilterCount > 0 && (
                        <span className="bg-blue-600 text-white text-[10px] px-1.5 rounded-full">
                          {selectedFilterCount}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${drawerTab === "filter" ? "rotate-180 text-blue-600" : ""}`}
                      />
                    </button>
                    <button
                      onClick={() => setDrawerTab("time")}
                      className={`text-[16px] font-bold transition-colors flex items-center gap-1 ${drawerTab === "time" ? "text-blue-600" : "text-gray-500"}`}
                    >
                      时间{" "}
                      {selectedTimeCount > 0 && (
                        <span className="bg-blue-600 text-white text-[10px] px-1.5 rounded-full">
                          {selectedTimeCount}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${drawerTab === "time" ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                  <button
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden flex flex-col">
                  {drawerTab === "filter" ? (
                    <div className="flex flex-1 overflow-hidden">
                      {/* Left Sidebar */}
                      <div className="w-[110px] bg-[#F7F8FA] overflow-y-auto no-scrollbar border-r border-gray-100 shrink-0">
                        {Object.entries(filterOptions).map(
                          ([key, category]) => {
                            const hasSelection =
                              selectedFilters[
                                key as keyof typeof selectedFilters
                              ].length > 0;
                            return (
                              <button
                                key={key}
                                onClick={() => scrollToCategory(key)}
                                className={`w-full text-left px-3 py-4 text-[14px] transition-colors relative flex items-center border-l-[3px] ${
                                  activeFilterTab === key
                                    ? "text-blue-600 font-medium bg-white border-blue-600"
                                    : "text-gray-600 hover:bg-gray-100 border-transparent"
                                }`}
                              >
                                <div className="w-4 flex justify-center shrink-0">
                                  {hasSelection && (
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                  )}
                                </div>
                                <span className="whitespace-nowrap">
                                  {category.label.replace("适用", "")}
                                </span>
                              </button>
                            );
                          },
                        )}
                      </div>

                      {/* Right Content */}
                      <div
                        className="flex-1 overflow-y-auto no-scrollbar bg-white p-5"
                        id="filter-scroll-container"
                      >
                        <div className="space-y-8 pb-10">
                          {Object.entries(filterOptions).map(
                            ([key, category]) => (
                              <div
                                key={key}
                                id={`filter-category-${key}`}
                                className="scroll-mt-4"
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="text-[15px] font-bold text-gray-900">
                                    {category.label}
                                  </h4>
                                  <ChevronDown className="w-4 h-4 text-blue-300" />
                                </div>
                                <div className="grid grid-cols-2 gap-2.5">
                                  {category.options.map((opt) => {
                                    const isSelected =
                                      selectedFilters[
                                        key as keyof typeof selectedFilters
                                      ].includes(opt);
                                    return (
                                      <button
                                        key={opt}
                                        onClick={() =>
                                          toggleFilter(
                                            key as keyof typeof selectedFilters,
                                            opt,
                                          )
                                        }
                                        className={`py-2 px-2 rounded-md text-[13px] text-center transition-all ${
                                          isSelected
                                            ? "bg-blue-50 text-blue-600 font-medium"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                      >
                                        {opt}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 overflow-y-auto no-scrollbar p-6">
                      <div className="flex gap-3 mb-8">
                        {timeOptions.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => toggleFilter("time", opt)}
                            className={`flex-1 py-2 rounded-full text-[14px] text-center transition-all ${
                              selectedFilters.time === opt
                                ? "bg-[#EEF2FF] text-blue-600 font-medium"
                                : "bg-[#F7F8FA] text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      {/* Calendar View */}
                      <div className="bg-white">
                        <div className="grid grid-cols-7 gap-1 text-center mb-4">
                          {[
                            "周日",
                            "周一",
                            "周二",
                            "周三",
                            "周四",
                            "周五",
                            "周六",
                          ].map((d) => (
                            <div
                              key={d}
                              className="text-[13px] text-gray-500 py-1"
                            >
                              {d}
                            </div>
                          ))}
                        </div>

                        <div className="mb-6">
                          <h5 className="text-[15px] font-bold text-gray-900 mb-4 text-left">
                            2026年 3月
                          </h5>
                          <div className="grid grid-cols-7 gap-y-4 text-center">
                            {/* Empty slots for offset */}
                            <div className="py-2"></div>
                            <div className="py-2"></div>
                            <div className="py-2"></div>
                            <div className="py-2"></div>
                            {Array.from({ length: 31 }).map((_, i) => {
                              const day = i + 1;
                              // Mocking the selected range from the image: 9 to 16
                              const isStart = day === 9;
                              const isEnd = day === 16;
                              const inRange = day > 9 && day < 16;

                              return (
                                <div
                                  key={i}
                                  className={`relative flex items-center justify-center`}
                                >
                                  {inRange && (
                                    <div className="absolute inset-0 bg-[#EEF2FF]"></div>
                                  )}
                                  {isStart && (
                                    <div className="absolute inset-y-0 right-0 w-1/2 bg-[#EEF2FF]"></div>
                                  )}
                                  {isEnd && (
                                    <div className="absolute inset-y-0 left-0 w-1/2 bg-[#EEF2FF]"></div>
                                  )}

                                  <button
                                    className={`relative z-10 w-8 h-8 flex items-center justify-center text-[14px] ${
                                      isStart || isEnd
                                        ? "bg-blue-600 text-white rounded-md shadow-sm"
                                        : inRange
                                          ? "text-blue-600 font-medium"
                                          : "text-gray-700"
                                    }`}
                                  >
                                    {day}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="mb-6">
                          <h5 className="text-[15px] font-bold text-gray-900 mb-4 text-left">
                            2026年 4月
                          </h5>
                          <div className="grid grid-cols-7 gap-y-4 text-center">
                            {/* Empty slots for offset */}
                            <div className="py-2"></div>
                            <div className="py-2"></div>
                            <div className="py-2"></div>
                            <div className="py-2"></div>
                            <div className="py-2"></div>
                            <div className="py-2"></div>
                            {Array.from({ length: 30 }).map((_, i) => {
                              const day = i + 1;
                              return (
                                <div
                                  key={i}
                                  className={`relative flex items-center justify-center`}
                                >
                                  <button
                                    className={`relative z-10 w-8 h-8 flex items-center justify-center text-[14px] text-gray-700`}
                                  >
                                    {day}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-gray-100 flex gap-4 bg-white shrink-0">
                  <button
                    onClick={resetFilters}
                    className="flex-1 py-2.5 rounded-full bg-[#EEF2FF] text-blue-600 font-medium text-[15px] active:scale-[0.98] transition-transform"
                  >
                    重置
                  </button>
                  <button
                    onClick={applyFilters}
                    className="flex-[2] py-2.5 rounded-full bg-blue-600 text-white font-medium text-[15px] shadow-lg shadow-blue-200 active:scale-[0.98] transition-transform"
                  >
                    完成
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {showOnboarding && (
          <OnboardingWizard
            onComplete={(data) => {
              console.log("Onboarding data:", data);
              setShowOnboarding(false);
              setIsLoggedIn(true);
            }}
            onSkip={() => {
              setShowOnboarding(false);
              setIsLoggedIn(true);
            }}
          />
        )}

        {/* Message Center Page Overlay */}
        <AnimatePresence>
          {isMessageCenterOpen && (
            <MessageCenterPage
              onBack={() => {
                setIsMessageCenterOpen(false);
                setSelectedMessageId(null);
              }}
              initialMessageId={selectedMessageId}
              onShare={() => setIsShareModalOpen(true)}
            />
          )}
        </AnimatePresence>

        {/* Short Video Feeds Overlay */}
        <AnimatePresence>
          {shortVideoStartIndex !== null && (
            <ShortVideoFeeds
              initialIndex={shortVideoStartIndex}
              posts={[...HOME_POSTS, ...AI_RESULT_POSTS]
                .filter(
                  (post) =>
                    post.type !== "live" &&
                    post.status !== "playback" &&
                    post.type !== "event" &&
                    post.type !== "course" &&
                    post.type !== "publication",
                )
                .sort(
                  (a, b) =>
                    new Date(b.time || 0).getTime() -
                    new Date(a.time || 0).getTime(),
                )}
              onClose={() => setShortVideoStartIndex(null)}
              onShareClick={() => setIsShareModalOpen(true)}
              onCourseClick={(post) => {
                setCourseInitialTab("介绍");
                setCourseInitialChapter(0);
                setSelectedCourse({ ...post, type: "course" });
                setShortVideoStartIndex(null);
              }}
              onEventClick={(post) => {
                setPersistedVideoIndex(shortVideoStartIndex);
                setEventPageInitialEvent(post);
                setCurrentView("event");
                setShortVideoStartIndex(null);
              }}
            />
          )}
        </AnimatePresence>

        {/* Post Detail Page Overlay */}
        <AnimatePresence>
          {selectedPostDetail && (
            <PostDetailPage
              post={selectedPostDetail}
              onClose={() => setSelectedPostDetail(null)}
              onShareClick={() => setIsShareModalOpen(true)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isHotRecommendPageOpen && (
            <HotRecommendPage
              onClose={() => setIsHotRecommendPageOpen(false)}
              onCourseClick={(course) => {
                setCourseInitialTab(course.initialTab || "介绍");
                setCourseInitialChapter(course.initialChapterIndex || 0);
                setSelectedCourse(course);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const NavItem = ({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 group">
    <div
      className={`p-1 rounded-full transition-all ${active ? "text-blue-600" : "text-gray-300"}`}
    >
      <Icon className={`w-6 h-6 ${active ? "fill-blue-600/10" : ""}`} />
    </div>
    <span
      className={`text-[10px] font-medium transition-all ${active ? "text-blue-600" : "text-gray-400"}`}
    >
      {label}
    </span>
  </button>
);
