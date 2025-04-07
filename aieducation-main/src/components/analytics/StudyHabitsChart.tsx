
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface DailyStudyData {
  day: string;
  hours: number;
}

const StudyHabitsChart: React.FC = () => {
  // Sample data - in a real app, this would come from an API or state
  const data: DailyStudyData[] = [
    { day: 'Monday', hours: 2.5 },
    { day: 'Tuesday', hours: 1.8 },
    { day: 'Wednesday', hours: 3.2 },
    { day: 'Thursday', hours: 2.1 },
    { day: 'Friday', hours: 1.5 },
    { day: 'Saturday', hours: 4.0 },
    { day: 'Sunday', hours: 3.5 },
  ];

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Study Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4 font-medium text-gray-600">Study Hours by Day of Week</div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(value) => `${value}h`} 
                domain={[0, 'dataMax + 0.5']} 
              />
              <Tooltip 
                formatter={(value) => [`${value} hours`, 'Study Time']} 
                labelFormatter={(day) => `${day}`}
              />
              <Bar 
                dataKey="hours" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]} 
                label={{ 
                  position: 'top', 
                  content: (props: any) => <text x={props.x + props.width / 2} y={props.y - 6} fill="#6b7280" textAnchor="middle" fontSize={12}>{`${props.value}h`}</text>
                }} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyHabitsChart;
