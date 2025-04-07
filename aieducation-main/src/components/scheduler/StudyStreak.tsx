
import React from 'react';
import { Trophy, Flame } from 'lucide-react';

interface StudyStreakProps {
  streak: number;
}

const StudyStreak: React.FC<StudyStreakProps> = ({ streak }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="flex items-center">
          <Flame className="w-7 h-7 text-amber-500 mr-2" />
          <span className="text-7xl font-bold text-blue">{streak}</span>
        </div>
        <span className="text-muted-foreground">day streak</span>
      </div>
      
      <div className="flex justify-between mb-6">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-8 h-8 bg-blue rounded-full flex items-center justify-center mb-1">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-xs text-muted-foreground">{day}</span>
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start">
        <Trophy className="w-5 h-5 text-blue mr-2 shrink-0 mt-0.5" />
        <p className="text-sm">
          Congratulations! You've studied every day this week. Keep up the good work!
        </p>
      </div>
    </div>
  );
};

export default StudyStreak;
