import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Assessment, ViewState } from './assessment/types';
import { CATEGORIES, ASSESSMENTS, MOCK_QUESTIONS } from './assessment/data';

import { AssessmentList } from './assessment/AssessmentList';
import { AssessmentDetail } from './assessment/AssessmentDetail';
import { AssessmentTesting } from './assessment/AssessmentTesting';
import { AssessmentResult } from './assessment/AssessmentResult';
import { AssessmentHistory } from './assessment/AssessmentHistory';
import { AssessmentFavorites } from './assessment/AssessmentFavorites';
import { PurchaseModal } from './PurchaseModal';
import { CourseDetailPage } from './CourseDetailPage';

interface AssessmentPageProps {
  onBack: () => void;
  initialAssessment?: Assessment | null;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({ onBack, initialAssessment }) => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const isCourseTest = !!initialAssessment;
  const [view, setView] = useState<ViewState>(isCourseTest ? 'testing' : 'list');
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(initialAssessment || null);
  
  // Testing State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number[]>>({});
  const [isFavorited, setIsFavorited] = useState(false);
  const [isPaid, setIsPaid] = useState(isCourseTest);

  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const handleStartTest = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setView('detail');
  };

  const handleCourseClick = (courseId: string) => {
    // Mock course data for recommendations
    const mockCourse = {
      id: courseId,
      title: '高新技术企业认定与研发费用加计扣除实务',
      cover: 'https://picsum.photos/seed/course1/400/250',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      category: '财税实务',
      views: '1.2w',
      duration: '45章',
      chapters: [
        { title: '高企认定的基本条件与流程', duration: '15:00' },
        { title: '研发费用归集与核算的难点解析', duration: '20:00' },
        { title: '申报材料准备及风险规避', duration: '10:00' }
      ]
    };
    setSelectedCourse(mockCourse);
    setView('courseDetail');
  };

  const handleBeginTesting = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setView('testing');
  };

  const handleOptionSelect = (questionId: string, optionIndex: number, type: 'single' | 'multiple' | 'boolean') => {
    setUserAnswers(prev => {
      const current = prev[questionId] || [];
      if (type === 'single' || type === 'boolean') {
        return { ...prev, [questionId]: [optionIndex] };
      } else {
        if (current.includes(optionIndex)) {
          return { ...prev, [questionId]: current.filter(i => i !== optionIndex) };
        } else {
          return { ...prev, [questionId]: [...current, optionIndex].sort() };
        }
      }
    });
  };

  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const handleNextQuestion = () => {
    const questions = selectedAssessment?.questions || [];
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      if (!isCourseTest) {
        setIsPaid(false); // Reset payment state for new attempt only for general assessments
      }
      setView('result');
    }
  };

  const handlePay = () => {
    setIsPurchaseModalOpen(true);
  };

  const calculateScore = () => {
    if (!selectedAssessment) return 0;
    const questions = selectedAssessment.questions;
    if (selectedAssessment.type === 'test') {
      let correct = 0;
      questions.forEach(q => {
        const uAns = userAnswers[q.id] || [];
        if (JSON.stringify(uAns) === JSON.stringify(q.answer)) {
          correct += 1;
        }
      });
      return Math.round((correct / questions.length) * 100);
    } else {
      let total = 0;
      questions.forEach(q => {
        const uAns = userAnswers[q.id] || [];
        if (uAns.length > 0 && q.optionScores) {
          total += q.optionScores[uAns[0]];
        }
      });
      return total;
    }
  };

  const handleViewHistoryReport = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    // Set mock answers for history report
    const mockAnswers: Record<string, number[]> = {};
    assessment.questions.forEach(q => {
      // Mocking correct for tests, first option for evals
      mockAnswers[q.id] = q.answer || [0]; 
    });
    setUserAnswers(mockAnswers);
    setIsPaid(true); // History view doesn't require pay for now in this demo
    setView('result');
  };

  return (
    <AnimatePresence mode="wait">
      {view === 'list' && (
        <AssessmentList 
          key="list"
          onBack={onBack}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onStartTest={handleStartTest}
          onNavigate={(v) => setView(v)}
        />
      )}
      {view === 'detail' && selectedAssessment && (
        <AssessmentDetail 
          key="detail"
          assessment={selectedAssessment}
          isFavorited={isFavorited}
          onToggleFavorite={() => setIsFavorited(!isFavorited)}
          onBack={() => setView('list')}
          onStartTest={handleBeginTesting}
        />
      )}
      {view === 'testing' && selectedAssessment && (
        <AssessmentTesting 
          key="testing"
          assessment={selectedAssessment}
          question={selectedAssessment.questions[currentQuestionIndex]}
          currentIndex={currentQuestionIndex}
          totalQuestions={selectedAssessment.questions.length}
          userAnswers={userAnswers[selectedAssessment.questions[currentQuestionIndex].id] || []}
          onOptionSelect={handleOptionSelect}
          onNext={handleNextQuestion}
          onBack={() => {
            if (isCourseTest) {
              onBack();
            } else {
              setView('detail');
            }
          }}
        />
      )}

      {view === 'result' && selectedAssessment && (
        <AssessmentResult 
          key="result"
          assessment={selectedAssessment}
          score={calculateScore()}
          questions={selectedAssessment.questions}
          userAnswers={userAnswers}
          isPaid={isPaid}
          onPay={handlePay}
          onBackToList={() => {
            if (isCourseTest) {
              onBack();
            } else {
              setView('list');
            }
          }}
          onCourseClick={handleCourseClick}
          hideSalesUI={isCourseTest}
        />
      )}
      {view === 'courseDetail' && selectedCourse && (
        <CourseDetailPage 
          key="courseDetail"
          course={selectedCourse}
          onClose={() => setView('result')}
        />
      )}
      {view === 'history' && (
        <AssessmentHistory 
          key="history"
          history={[ASSESSMENTS[0], ASSESSMENTS[2]]} // Mock history
          onBack={() => setView('list')}
          onViewReport={handleViewHistoryReport}
        />
      )}
      {view === 'favorites' && (
        <AssessmentFavorites 
          key="favorites"
          favorites={[ASSESSMENTS[1], ASSESSMENTS[3]]} // Mock favorites - updated index
          onBack={() => setView('list')}
          onStartTest={handleStartTest}
        />
      )}

      {selectedAssessment && (
        <PurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
          itemType="course"
          itemTitle={selectedAssessment.title + " - 评估报告"}
          price={19.9}
          points={199}
          onSuccess={() => {
            setIsPurchaseModalOpen(false);
            setIsPaid(true);
          }}
        />
      )}
    </AnimatePresence>
  );
};
