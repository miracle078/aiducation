
import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface SubjectScoreData {
  subject: string;
  score: number;
  fullMark: number;
}

const SubjectPerformanceChart: React.FC = () => {
  // Sample data - in a real app, this would come from an API or state
  const data: SubjectScoreData[] = [
    { subject: 'Algebra', score: 85, fullMark: 100 },
    { subject: 'Geometry', score: 78, fullMark: 100 },
    { subject: 'Calculus', score: 65, fullMark: 100 },
    { subject: 'Statistics', score: 70, fullMark: 100 },
    { subject: 'Trigonometry', score: 72, fullMark: 100 },
    { subject: 'Physics', score: 68, fullMark: 100 },
  ];

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Subject Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="w-6 h-3 bg-blue-400 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Your Performance</span>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tickCount={6} stroke="#e5e7eb" />
              <Radar
                name="Your Performance"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Score']}
                labelFormatter={(label) => `Subject: ${label}`}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectPerformanceChart;
