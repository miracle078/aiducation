
import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProgressData {
  month: string;
  quizScore: number;
}

const MonthlyProgressChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState('3months');
  
  // Sample data - in a real app, this would come from an API or state
  const data: Record<string, ProgressData[]> = {
    '3months': [
      { month: 'January', quizScore: 73 },
      { month: 'February', quizScore: 80 },
      { month: 'March', quizScore: 85 },
    ],
    '6months': [
      { month: 'October', quizScore: 65 },
      { month: 'November', quizScore: 68 },
      { month: 'December', quizScore: 70 },
      { month: 'January', quizScore: 73 },
      { month: 'February', quizScore: 80 },
      { month: 'March', quizScore: 85 },
    ],
    '12months': [
      { month: 'April', quizScore: 60 },
      { month: 'May', quizScore: 63 },
      { month: 'June', quizScore: 65 },
      { month: 'July', quizScore: 64 },
      { month: 'August', quizScore: 67 },
      { month: 'September', quizScore: 68 },
      { month: 'October', quizScore: 65 },
      { month: 'November', quizScore: 68 },
      { month: 'December', quizScore: 70 },
      { month: 'January', quizScore: 73 },
      { month: 'February', quizScore: 80 },
      { month: 'March', quizScore: 85 },
    ],
  };
  
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Monthly Progress</CardTitle>
        <Select value={timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="12months">Last 12 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="h-3 w-6 bg-blue-400 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Quiz Scores</span>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data[timeRange]}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ textAnchor: 'middle', dy: 10 }}
              />
              <YAxis 
                domain={[40, 100]} 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(value) => `${value}%`} 
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Score']} 
                labelFormatter={(month) => `Month: ${month}`}
              />
              <ReferenceLine y={70} stroke="#d1d5db" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="quizScore"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4, fill: "#3b82f6" }}
                activeDot={{ r: 6, fill: "#2563eb" }}
                isAnimationActive={true}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyProgressChart;
