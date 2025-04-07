
import React from 'react';
import { cn } from '@/lib/utils';

interface WeeklyScheduleTableProps {
  taskData: Record<string, Record<string, number>>;
}

const WeeklyScheduleTable: React.FC<WeeklyScheduleTableProps> = ({ 
  taskData 
}) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  // Calculate daily totals
  const dailyTotals = days.map(day => 
    Object.values(taskData).reduce((total, subject) => total + subject[day], 0)
  );
  
  // Calculate subject totals
  const subjectTotals = Object.entries(taskData).reduce((totals, [subject, schedule]) => {
    totals[subject] = Object.values(schedule).reduce((total, hours) => total + hours, 0);
    return totals;
  }, {} as Record<string, number>);
  
  // Calculate grand total
  const grandTotal = Object.values(subjectTotals).reduce((total, hours) => total + hours, 0);
  
  // Helper function to get cell background color based on hours
  const getCellBgColor = (hours: number) => {
    if (hours === 0) return "bg-gray-50 dark:bg-gray-900";
    if (hours <= 0.5) return "bg-green-50 dark:bg-green-900/20";
    if (hours <= 1) return "bg-green-100 dark:bg-green-900/40";
    if (hours <= 1.5) return "bg-yellow-50 dark:bg-yellow-900/20";
    return "bg-red-50 dark:bg-red-900/20";
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/30">
            <th className="p-3 text-left font-medium">Subject</th>
            {days.map(day => (
              <th 
                key={day} 
                className={cn(
                  "p-3 text-center font-medium",
                  day === today && "bg-blue/10 text-blue"
                )}
              >
                {day}
              </th>
            ))}
            <th className="p-3 text-center font-medium bg-muted/50">Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(taskData).map(([subject, schedule]) => (
            <tr key={subject} className="border-t border-border">
              <td className="p-3 font-medium">
                {subject}
              </td>
              {days.map(day => {
                const hours = schedule[day];
                
                return (
                  <td 
                    key={day} 
                    className={cn(
                      "p-3 text-center border-l border-border",
                      day === today && "bg-blue/5",
                      getCellBgColor(hours)
                    )}
                  >
                    {hours > 0 ? `${hours}h` : "-"}
                  </td>
                );
              })}
              <td className="p-3 text-center font-medium bg-muted/20 border-l border-border">
                {subjectTotals[subject]}h
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-muted/30 border-t border-border font-medium">
            <td className="p-3">Daily Total</td>
            {dailyTotals.map((total, i) => (
              <td 
                key={days[i]} 
                className={cn(
                  "p-3 text-center border-l border-border",
                  days[i] === today && "bg-blue/10 text-blue"
                )}
              >
                {total}h
              </td>
            ))}
            <td className="p-3 text-center text-blue font-bold bg-blue/10 border-l border-border">
              {grandTotal}h
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default WeeklyScheduleTable;
