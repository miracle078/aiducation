
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TopicMasteryData {
  topic: string;
  mastery: number;
  color: string;
}

const StrengthsWeaknessesChart: React.FC = () => {
  // Sample data - in a real app, this would come from an API or state
  const data: TopicMasteryData[] = [
    { topic: 'Algebra', mastery: 90, color: '#4ade80' },
    { topic: 'Geometry', mastery: 75, color: '#4ade80' },
    { topic: 'Calculus', mastery: 85, color: '#4ade80' },
    { topic: 'Literature', mastery: 60, color: '#f87171' },
    { topic: 'Chemistry', mastery: 70, color: '#fbbf24' },
  ];

  const getBarColor = (value: number) => {
    if (value >= 80) return '#4ade80'; // Green for strengths
    if (value >= 65) return '#fbbf24'; // Yellow for moderate
    return '#f87171'; // Red for weaknesses
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Strengths & Weaknesses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="w-4 h-4 bg-green-400 rounded-sm mr-2"></div>
          <span className="text-sm text-gray-600 mr-4">Mastery Level</span>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 70,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                domain={[0, 100]} 
                tickCount={6} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                type="category" 
                dataKey="topic" 
                axisLine={false} 
                tickLine={false} 
                width={65}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Mastery Level']} 
                labelFormatter={(name) => `Subject: ${name}`}
              />
              <Bar 
                dataKey="mastery" 
                radius={[0, 4, 4, 0]} 
                barSize={30}
                fill="#4ade80"
                label={{ 
                  position: 'right', 
                  formatter: (value: number) => `${value}%`,
                  fill: '#6b7280',
                  fontSize: 12
                }}
              >
                {data.map((entry, index) => (
                  <rect 
                    key={`cell-${index}`} 
                    fill={getBarColor(entry.mastery)} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StrengthsWeaknessesChart;
