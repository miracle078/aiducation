
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export interface SubjectCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  progress: number;
  lessons: number;
  completedLessons: number;
}

const SubjectCard = ({ id, title, icon, color, progress, lessons, completedLessons }: SubjectCardProps) => {
  return (
    <Link 
      to={`/study/${id}`}
      className="glass-card group p-6 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
        <ChevronRight className="w-5 h-5 text-foreground/40 group-hover:text-blue transition-colors duration-300" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      
      <div className="mt-auto">
        <div className="text-sm text-foreground/70 mb-2">
          {completedLessons} of {lessons} lessons completed
        </div>
        
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${progress}%`,
              background: `linear-gradient(to right, var(--color-start), var(--color-end))`,
              '--color-start': color.includes('blue') ? '#4a6cfa' : 
                              color.includes('teal') ? '#00c4cc' : 
                              color.includes('purple') ? '#8b5cf6' : 
                              color.includes('red') ? '#ef4444' : 
                              color.includes('amber') ? '#f59e0b' : 
                              color.includes('green') ? '#10b981' : 
                              '#4a6cfa',
              '--color-end': color.includes('blue') ? '#818cf8' : 
                            color.includes('teal') ? '#2dd4bf' : 
                            color.includes('purple') ? '#a78bfa' : 
                            color.includes('red') ? '#f87171' : 
                            color.includes('amber') ? '#fbbf24' : 
                            color.includes('green') ? '#34d399' : 
                            '#818cf8',
            } as React.CSSProperties}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;
