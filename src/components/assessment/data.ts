import { Assessment, Question } from './types';

export const CATEGORIES = [
  '全部', '免费评估', '免费测试', '财税评估', '人才评估', '流程评估', '风险评估', '合规评估'
];

const TEST_QUESTIONS: Question[] = [
  {
    id: 'q-test-1',
    type: 'single',
    question: '企业发生的符合条件的广告费和业务宣传费支出，不超过当年销售收入（ ）的部分，准予扣除。',
    options: ['10%', '15%', '20%', '30%'],
    answer: [1],
    explanation: '《企业所得税法实施条例》第四十四条规定，不超过当年销售收入15%的部分，准予扣除。',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    relatedKnowledge: ['企业所得税法实施条例第四十四条']
  },
  {
    id: 'q-test-2',
    type: 'multiple',
    question: '下列各项中，在计算企业所得税应纳税所得额时不得扣除的有（ ）。',
    options: ['企业之间支付的管理费', '企业内营业机构之间支付的租金', '罚金、罚款', '税收滞纳金'],
    answer: [0, 1, 2, 3],
    explanation: '根据所得税法，管理费、内部分支机构租金、罚金及滞纳金均不得税前扣除。',
  }
];

const BOOLEAN_QUESTIONS: Question[] = [
  {
    id: 'q-bool-1',
    type: 'boolean',
    question: '个人所得税专项附加扣除中，住房贷款利息扣除期限最长不超过240个月。',
    options: ['正确', '错误'],
    answer: [0],
    explanation: '根据政策规定，住房贷款利息扣除期限最长不超过240个月。',
  },
  {
    id: 'q-bool-2',
    type: 'boolean',
    question: '企业发生的职工福利费支出，不超过工资薪金总额14%的部分，准予扣除。',
    options: ['正确', '错误'],
    answer: [0],
    explanation: '《企业所得税法实施条例》第四十条规定：企业发生的职工福利费支出，不超过工资薪金总额14%的部分，准予扣除。',
  }
];

const FREE_EVAL_QUESTIONS: Question[] = [
  {
    id: 'q-free-1',
    type: 'single',
    question: '企业目前使用的主要财务软件是：',
    options: ['传统单机版', '局域网在线版', '云端SaaS版', '自研系统'],
    optionScores: [10, 20, 30, 40],
  },
  {
    id: 'q-free-2',
    type: 'single',
    question: '财务数据的同步频率是：',
    options: ['按月同步', '按周同步', '按天同步', '实时同步'],
    optionScores: [10, 20, 30, 40],
  }
];

const EVAL_QUESTIONS_CAREER: Question[] = [
  {
    id: 'q-career-1',
    type: 'single',
    question: '在处理财税业务时，您更倾向于：',
    options: ['细致核对每一笔凭证', '研究宏观税控政策', '与客户沟通协调方案', '开发自动化工具'],
    optionScores: [25, 20, 15, 10], 
  },
  {
    id: 'q-career-2',
    type: 'single',
    question: '您对数字的敏感度如何：',
    options: ['非常敏感，一眼能扫出差异', '一般，需要重复核对', '较弱，更擅长逻辑推理', '没感觉，全看软件系统'],
    optionScores: [25, 15, 10, 5],
  }
];

const EVAL_QUESTIONS_COURSE: Question[] = [
  {
    id: 'q-course-1',
    type: 'single',
    question: '您目前最希望提升哪方面的能力：',
    options: ['国际税法基础', '外币报表折算', '出口退税实务', '境外投资架构设计'],
    optionScores: [10, 20, 30, 40],
  },
  {
    id: 'q-course-2',
    type: 'single',
    question: '您负责的项目中，跨境业务占比：',
    options: ['低于20%', '20% - 50%', '50% - 80%', '80%以上'],
    optionScores: [10, 20, 30, 40],
  }
];

export const ASSESSMENTS: Assessment[] = [
  {
    id: 'assess-free-1',
    category: '免费评估',
    title: '企业数字化成熟度免费自测',
    description: '仅需2分钟，评估您企业的财税数字化水平，获取同行对比报告。',
    questionCount: FREE_EVAL_QUESTIONS.length,
    participants: '4.8w',
    duration: '2分钟',
    isHot: true,
    type: 'evaluation',
    isFree: true,
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    questions: FREE_EVAL_QUESTIONS
  },
  {
    id: 'assess-test-free-1',
    category: '免费测试',
    title: '2024财税合规基础知识测试',
    description: '快速检验您的财税基础知识是否扎实。',
    questionCount: BOOLEAN_QUESTIONS.length,
    participants: '1.2w',
    duration: '5分钟',
    isNew: true,
    type: 'test',
    isFree: true,
    cover: 'https://picsum.photos/seed/taxtest1/400/300',
    questions: BOOLEAN_QUESTIONS
  },
  {
    id: 'assess-test-free-2',
    category: '免费测试',
    title: '个税汇算清缴速查卷',
    description: '通过几个关键问题，自查您是否了解个税最新政策。',
    questionCount: TEST_QUESTIONS.length,
    participants: '8900',
    duration: '10分钟',
    isHot: true,
    type: 'test',
    isFree: true,
    cover: 'https://picsum.photos/seed/taxtest2/400/300',
    questions: TEST_QUESTIONS
  },
  {
    id: 'assess-a1',
    category: '财税评估',
    title: '2024企业所得税风险自测',
    description: '全面评估企业在年度所得税汇算清缴中的潜在税务风险。',
    questionCount: TEST_QUESTIONS.length,
    participants: '2.5w',
    duration: '15分钟',
    isHot: true,
    type: 'test',
    cover: 'https://qifu-pub.bj.bcebos.com/datapic/610cd70d00109f52d638780ffef6d030_fullsize.jpg',
    questions: TEST_QUESTIONS
  },
  {
    id: 'assess-t1',
    category: '财税评估',
    title: '企业财税风险合规等级测试 (2024)',
    description: '通过40个核心考点，全面检测您的财税合规知识掌握情况。',
    questionCount: 40,
    participants: '1.5w',
    duration: '45分钟',
    type: 'test',
    isHot: true,
    cover: 'https://picsum.photos/seed/taxrisk/400/300',
    questions: [
      ...TEST_QUESTIONS,
      ...BOOLEAN_QUESTIONS,
      ...TEST_QUESTIONS,
      ...BOOLEAN_QUESTIONS
    ].slice(0, 5) // Mocking more questions
  },
  {
    id: 'assess-e1',
    category: '人才评估',
    title: '财税职业性格健康度评估',
    description: '通过职业性格测试，评估您在财务审计等领域的适配程度。',
    questionCount: EVAL_QUESTIONS_CAREER.length,
    participants: '1.8w',
    duration: '10分钟',
    isHot: true,
    type: 'evaluation',
    cover: 'https://preview.qiantucdn.com/auto_machine/20230701/195fc1a7-50b4-4b86-bcd0-9b20dda6db41.png!w800',
    questions: EVAL_QUESTIONS_CAREER
  },
  {
    id: 'assess-e2',
    category: '财税评估',
    title: '出海财税知识备赛能力评估',
    description: '评估您对国际税收等知识的掌握，给出提升建议。',
    questionCount: EVAL_QUESTIONS_COURSE.length,
    participants: '5600',
    duration: '12分钟',
    isNew: true,
    type: 'evaluation',
    cover: 'https://copyright.bdstatic.com/vcg/creative/aa7cf1e9d830b1b52fd150a8e827d258.eps@h_1280',
    questions: EVAL_QUESTIONS_COURSE
  },
  {
    id: 'assess-a2',
    category: '风险评估',
    title: '增值税申报合规自查',
    description: '检测企业发票开具流程的合规性。',
    questionCount: TEST_QUESTIONS.length,
    participants: '3.2w',
    duration: '20分钟',
    isNew: true,
    type: 'test',
    cover: 'https://p5.itc.cn/q_70/images03/20220312/0a76461d44c146239140192d2ff13158.png',
    questions: TEST_QUESTIONS
  }
];

export const MOCK_QUESTIONS = TEST_QUESTIONS; // Backward compatibility
