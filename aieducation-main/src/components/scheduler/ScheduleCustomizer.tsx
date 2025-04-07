
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ScheduleCustomizerProps {
  subject: string;
  currentSchedule: Record<string, number>;
  performanceData: {
    timeSpent: number;
    recommendedExtra: number;
  };
  onSave: (subject: string, newSchedule: Record<string, number>) => void;
  onCancel: () => void;
}

const ScheduleCustomizer: React.FC<ScheduleCustomizerProps> = ({
  subject,
  currentSchedule,
  performanceData,
  onSave,
  onCancel
}) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [newSchedule, setNewSchedule] = useState<Record<string, number>>(currentSchedule);
  const [totalHours, setTotalHours] = useState(0);
  
  useEffect(() => {
    // Calculate total hours
    const total = Object.values(newSchedule).reduce((sum, hours) => sum + hours, 0);
    setTotalHours(total);
  }, [newSchedule]);
  
  const handleHourChange = (day: string, hours: number) => {
    // Ensure value is between 0 and 4
    const validHours = Math.min(Math.max(hours, 0), 4);
    
    setNewSchedule(prev => ({
      ...prev,
      [day]: validHours
    }));
  };
  
  const handleSave = () => {
    onSave(subject, newSchedule);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onCancel}>
      <div 
        className="bg-card rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-5 border-b border-border flex justify-between items-center">
          <h2 className="text-xl font-medium">Customize {subject} Schedule</h2>
          <button 
            onClick={onCancel}
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-5">
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Current weekly total:</span>
              <span>{performanceData.timeSpent}h</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span>Recommended additional:</span>
              <span className="text-blue">+{performanceData.recommendedExtra}h</span>
            </div>
            
            <div className="bg-muted/30 p-3 rounded-lg mb-4">
              <div className="flex justify-between font-medium">
                <span>New weekly total:</span>
                <span 
                  className={
                    totalHours > performanceData.timeSpent + performanceData.recommendedExtra
                      ? "text-green-500"
                      : totalHours < performanceData.timeSpent
                        ? "text-red-500"
                        : "text-blue"
                  }
                >
                  {totalHours}h
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            {days.map(day => (
              <div key={day} className="flex items-center justify-between">
                <label htmlFor={`${day.toLowerCase()}-hours`} className="w-24">{day}:</label>
                <div className="flex-1">
                  <input
                    type="range"
                    id={`${day.toLowerCase()}-hours`}
                    min="0"
                    max="4"
                    step="0.5"
                    value={newSchedule[day]}
                    onChange={e => handleHourChange(day, parseFloat(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="w-16 ml-3">
                  <input
                    type="number"
                    value={newSchedule[day]}
                    min="0"
                    max="4"
                    step="0.5"
                    onChange={e => handleHourChange(day, parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 rounded border border-border text-center"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-5 border-t border-border flex justify-end space-x-3">
          <button 
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="button-primary"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCustomizer;
