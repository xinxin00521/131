export interface Assessment {
  id: string;
  category: string;
  title: string;
  description: string;
  questionCount: number;
  participants: string;
  duration: string;
  isHot?: boolean;
  isNew?: boolean;
  cover?: string;
  type: 'test' | 'evaluation';
  questions: Question[];
  isFree?: boolean;
}

export interface Question {
  id: string;
  type: 'single' | 'multiple' | 'boolean';
  question: string;
  options: string[];
  answer?: number[]; // Indices of correct options (for 'test')
  optionScores?: number[]; // Scores for each option (for 'evaluation')
  explanation?: string;
  videoUrl?: string;
  relatedKnowledge?: string[];
}

export type ViewState = 'list' | 'detail' | 'testing' | 'result' | 'history' | 'favorites' | 'courseDetail';
