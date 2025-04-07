
import React, { useState } from 'react';
import { Clock, Sliders, Check } from 'lucide-react';
import ScheduleCustomizer from './ScheduleCustomizer';

export interface PerformanceData {
  score: number;
  timeSpent: number;
  recommendedExtra: number;
  priority: 'high' | 'medium' | 'low';
}

interface PerformanceRecommendationsProps {
  performanceData: Record<string, PerformanceData>;
  acceptRecommendation: (subject: string) => void;
  saveCustomSchedule: (subject: string, schedule: Record<string, number>) => void;
  currentSchedule: Record<string, Record<string, number>>;
}

const PerformanceRecommendations: React.FC<PerformanceRecommendationsProps> = ({
  performanceData,
  acceptRecommendation,
  saveCustomSchedule,
  currentSchedule
}) => {
  const [customizingSubject, setCustomizingSubject] = useState<string | null>(null);
  
  // Filter subjects that need extra time
  const subjectsWithRecommendations = Object.entries(performanceData)
    .sort((a, b) => {
      const priorityRank = { high: 0, medium: 1, low: 2 };
      return priorityRank[a[1].priority] - priorityRank[b[1].priority];
    });
  
  const getPriorityStyles = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return { 
          color: 'text-red-500',
          bg: 'bg-red-50',
          border: 'border-l-4 border-l-red-500',
          badge: 'bg-red-50 text-red-500'
        };
      case 'medium':
        return { 
          color: 'text-amber-500',
          bg: 'bg-amber-50/50',
          border: 'border-l-4 border-l-amber-500',
          badge: 'bg-amber-50 text-amber-500'
        };
      case 'low':
        return { 
          color: 'text-blue-500',
          bg: 'bg-blue-50/50',
          border: 'border-l-4 border-l-blue-500',
          badge: 'bg-blue-50 text-blue-500'
        };
      default:
        return { 
          color: 'text-gray-500',
          bg: 'bg-gray-50',
          border: 'border-l-4 border-l-gray-300',
          badge: 'bg-gray-50 text-gray-500'
        };
    }
  };
  
  const openCustomizer = (subject: string) => {
    setCustomizingSubject(subject);
  };
  
  const closeCustomizer = () => {
    setCustomizingSubject(null);
  };
  
  const handleSaveCustomSchedule = (subject: string, newSchedule: Record<string, number>) => {
    saveCustomSchedule(subject, newSchedule);
    closeCustomizer();
  };
  
  return (
    <>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjectsWithRecommendations.map(([subject, data]) => {
          const styles = getPriorityStyles(data.priority);
          const hasRecommendation = data.recommendedExtra > 0;
          
          return (
            <div 
              key={subject}
              className={`relative rounded-lg p-4 ${styles.bg} ${styles.border}`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">{subject}</h3>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${styles.badge}`}>
                  {data.priority === 'high' ? 'High' : data.priority === 'medium' ? 'Medium' : 'Low'} priority
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                Based on your performance (score: {data.score}%) and time spent ({data.timeSpent}h), we recommend:
              </p>
              
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue" />
                <span className="font-medium">
                  Extra {data.recommendedExtra} hours per week
                </span>
              </div>
              
              <div className="w-full h-1 bg-muted rounded-full mb-4">
                <div 
                  className="h-full bg-blue rounded-full"
                  style={{ width: `${Math.min(data.score, 100)}%` }}
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => acceptRecommendation(subject)}
                  disabled={!hasRecommendation}
                  className={`flex items-center justify-center gap-1 rounded-lg py-2 px-4 flex-1 text-sm font-medium ${
                    hasRecommendation 
                      ? 'bg-blue text-white hover:bg-blue-600' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Check className="h-4 w-4" />
                  Accept
                </button>
                <button
                  onClick={() => openCustomizer(subject)}
                  className="flex items-center justify-center gap-1 rounded-lg py-2 px-4 bg-muted hover:bg-muted/80 text-sm font-medium"
                >
                  <Sliders className="h-4 w-4" />
                  Customize
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {customizingSubject && (
        <ScheduleCustomizer
          subject={customizingSubject}
          currentSchedule={currentSchedule[customizingSubject]}
          performanceData={performanceData[customizingSubject]}
          onSave={handleSaveCustomSchedule}
          onCancel={closeCustomizer}
        />
      )}
    </>
  );
};

export default PerformanceRecommendations;
