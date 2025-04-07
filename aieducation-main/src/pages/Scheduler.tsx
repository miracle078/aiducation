
import React, { useState } from 'react';
import { Calendar, Printer, PenSquare, LightbulbIcon, TrendingUp, RefreshCw, Clock, BrainCircuit, Trophy } from 'lucide-react';
import WeeklyScheduleTable from '@/components/scheduler/WeeklyScheduleTable';
import PerformanceRecommendations from '@/components/scheduler/PerformanceRecommendations';
import StudyTips from '@/components/scheduler/StudyTips';
import StudyStreak from '@/components/scheduler/StudyStreak';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Study hours by subject and day
const initialTaskData = {
  "Mathematics": {
    "Monday": 2,
    "Tuesday": 1.5,
    "Wednesday": 2,
    "Thursday": 1,
    "Friday": 1.5,
    "Saturday": 0.5,
    "Sunday": 0
  },
  "Science": {
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 1,
    "Thursday": 2,
    "Friday": 1,
    "Saturday": 0.5,
    "Sunday": 0
  },
  "English": {
    "Monday": 1,
    "Tuesday": 0.5,
    "Wednesday": 1,
    "Thursday": 0.5,
    "Friday": 1,
    "Saturday": 0,
    "Sunday": 0.5
  },
  "History": {
    "Monday": 0.5,
    "Tuesday": 1,
    "Wednesday": 0.5,
    "Thursday": 1,
    "Friday": 0.5,
    "Saturday": 0.5,
    "Sunday": 0
  },
  "Geography": {
    "Monday": 0.5,
    "Tuesday": 0.5,
    "Wednesday": 0.5,
    "Thursday": 0.5,
    "Friday": 0.5,
    "Saturday": 0,
    "Sunday": 0.5
  },
  "Computer Science": {
    "Monday": 1,
    "Tuesday": 0.5,
    "Wednesday": 1,
    "Thursday": 0.5,
    "Friday": 1,
    "Saturday": 1,
    "Sunday": 0.5
  }
};

// Performance data for recommendations
const performanceData = {
  "Mathematics": { 
    score: 78, 
    timeSpent: 9.5, 
    recommendedExtra: 1.5,
    priority: "medium" as const
  },
  "Science": { 
    score: 85, 
    timeSpent: 7, 
    recommendedExtra: 0.5,
    priority: "low" as const
  },
  "English": { 
    score: 65, 
    timeSpent: 4, 
    recommendedExtra: 2,
    priority: "high" as const
  },
  "History": { 
    score: 72, 
    timeSpent: 4.5, 
    recommendedExtra: 1,
    priority: "medium" as const
  },
  "Geography": {
    score: 80,
    timeSpent: 3,
    recommendedExtra: 0.5,
    priority: "low" as const
  },
  "Computer Science": { 
    score: 88, 
    timeSpent: 5.5, 
    recommendedExtra: 0,
    priority: "low" as const
  }
};

// Tips for effective studying
const studyTips = [
  {
    title: "Time Blocking",
    description: "Allocate specific time blocks for each subject to maintain focus and avoid context switching.",
    icon: <Clock className="h-5 w-5 text-blue" />
  },
  {
    title: "Active Recall",
    description: "Test yourself frequently. Try explaining concepts in your own words to improve retention.",
    icon: <BrainCircuit className="h-5 w-5 text-blue" />
  },
  {
    title: "Spaced Repetition",
    description: "Review material at gradually increasing intervals to strengthen memory.",
    icon: <RefreshCw className="h-5 w-5 text-blue" />
  }
];

const Scheduler = () => {
  const [taskData, setTaskData] = useState(initialTaskData);
  const { toast } = useToast();
  
  // Accept recommendation for a subject
  const acceptRecommendation = (subject: string) => {
    const recommendation = performanceData[subject].recommendedExtra;
    
    if (recommendation <= 0) return;
    
    // Create updated task data
    const updatedTaskData = { ...taskData };
    let remainingTime = recommendation;
    
    // Simple algorithm to distribute time across weekdays
    // Prioritize days with existing study time first
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    while (remainingTime > 0) {
      for (const day of weekdays) {
        if (remainingTime <= 0) break;
        
        // Add 0.5 hours to each day until we've distributed all time
        if (updatedTaskData[subject][day] > 0 && remainingTime > 0) {
          updatedTaskData[subject][day] += 0.5;
          remainingTime -= 0.5;
        }
      }
      
      // If we still have time to distribute, add to days with no study time
      if (remainingTime > 0) {
        for (const day of weekdays) {
          if (remainingTime <= 0) break;
          
          if (updatedTaskData[subject][day] === 0) {
            updatedTaskData[subject][day] = 0.5;
            remainingTime -= 0.5;
          }
        }
      }
    }
    
    // Update state and show notification
    setTaskData(updatedTaskData);
    toast({
      title: "Recommendation Accepted",
      description: `Added ${recommendation} hours to ${subject}`,
      variant: "default",
    });
  };
  
  // Save custom schedule for a subject
  const saveCustomSchedule = (subject: string, newSchedule: Record<string, number>) => {
    const updatedTaskData = { ...taskData };
    updatedTaskData[subject] = newSchedule;
    
    setTaskData(updatedTaskData);
    toast({
      title: "Schedule Updated",
      description: `${subject} schedule has been updated`,
      variant: "default",
    });
  };

  // Print the current schedule
  const printSchedule = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-blue">Study Schedule & Tasks</h1>
          <p className="text-foreground/70 text-lg">Manage your study time and view personalized recommendations</p>
        </div>
        
        <div className="space-y-8">
          {/* Weekly Schedule */}
          <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border">
            <div className="p-4 flex justify-between items-center border-b border-border">
              <h2 className="text-xl font-semibold flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue" />
                <span>Weekly Study Schedule</span>
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={printSchedule}
                  className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
                <button className="flex items-center gap-2 bg-blue text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  <PenSquare className="w-4 h-4" />
                  <span>Customize</span>
                </button>
              </div>
            </div>
            <WeeklyScheduleTable 
              taskData={taskData}
            />
          </div>
          
          {/* Study Recommendations */}
          <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border">
            <div className="p-4 border-b border-border">
              <h2 className="text-xl font-semibold flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue" />
                <span>Study Recommendations Based on Your Performance</span>
              </h2>
            </div>
            <PerformanceRecommendations 
              performanceData={performanceData}
              acceptRecommendation={acceptRecommendation}
              saveCustomSchedule={saveCustomSchedule}
              currentSchedule={taskData}
            />
          </div>
          
          {/* Study Tips and Streak */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border">
              <div className="p-4 border-b border-border">
                <h2 className="text-xl font-semibold flex items-center">
                  <LightbulbIcon className="w-5 h-5 mr-2 text-blue" />
                  <span>Study Tips</span>
                </h2>
              </div>
              <StudyTips tips={studyTips} />
            </div>
            
            <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border">
              <div className="p-4 border-b border-border">
                <h2 className="text-xl font-semibold flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-blue" />
                  <span>Study Streak</span>
                </h2>
              </div>
              <StudyStreak streak={7} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
