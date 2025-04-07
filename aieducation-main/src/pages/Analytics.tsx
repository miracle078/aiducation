
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import SubjectPerformanceChart from '@/components/analytics/SubjectPerformanceChart';
import TimeSpentChart from '@/components/analytics/TimeSpentChart';
import StudyHabitsChart from '@/components/analytics/StudyHabitsChart';
import StrengthsWeaknessesChart from '@/components/analytics/StrengthsWeaknessesChart';
import MonthlyProgressChart from '@/components/analytics/MonthlyProgressChart';
import { Badge } from '@/components/ui/badge';
import { ChartBar, Clock, TrendingUp, Brain, Calendar } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learning Analytics</h1>
        <p className="text-muted-foreground">
          Track your learning progress and study habits to optimize your educational journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="flex items-center mb-4">
            <ChartBar className="w-5 h-5 mr-2 text-blue-500" />
            <h2 className="text-xl font-semibold">Performance Insights</h2>
          </div>
          <SubjectPerformanceChart />
        </div>
        
        <div>
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 mr-2 text-green-500" />
            <h2 className="text-xl font-semibold">Time Distribution</h2>
          </div>
          <TimeSpentChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 mr-2 text-blue-500" />
            <h2 className="text-xl font-semibold">Study Patterns</h2>
          </div>
          <StudyHabitsChart />
        </div>
        
        <div>
          <div className="flex items-center mb-4">
            <Brain className="w-5 h-5 mr-2 text-green-500" />
            <h2 className="text-xl font-semibold">Learning Proficiency</h2>
          </div>
          <StrengthsWeaknessesChart />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
          <h2 className="text-xl font-semibold">Progress Over Time</h2>
        </div>
        <MonthlyProgressChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Recent Achievements</CardTitle>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">New</Badge>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></div>
                <div>
                  <p className="font-medium">90% on Algebra Quiz</p>
                  <p className="text-sm text-muted-foreground">Completed 2 days ago</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></div>
                <div>
                  <p className="font-medium">7-Day Study Streak</p>
                  <p className="text-sm text-muted-foreground">Consistent learning pattern</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></div>
                <div>
                  <p className="font-medium">Mastered Geometry Fundamentals</p>
                  <p className="text-sm text-muted-foreground">Completed all practice exercises</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-2 w-2 bg-amber-500 rounded-full mt-2 mr-2"></div>
                <div>
                  <p className="font-medium">Increase study time for Literature</p>
                  <p className="text-sm text-muted-foreground">Currently your weakest subject</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-amber-500 rounded-full mt-2 mr-2"></div>
                <div>
                  <p className="font-medium">Try spaced repetition for Chemistry</p>
                  <p className="text-sm text-muted-foreground">Improve retention of key concepts</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-amber-500 rounded-full mt-2 mr-2"></div>
                <div>
                  <p className="font-medium">Add more study time on Fridays</p>
                  <p className="text-sm text-muted-foreground">Your least productive day</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Learning Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-2 w-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                <div>
                  <p className="font-medium">Improve Literature score to 75%</p>
                  <p className="text-sm text-muted-foreground">Progress: 80% complete</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                <div>
                  <p className="font-medium">Complete Calculus module</p>
                  <p className="text-sm text-muted-foreground">Progress: 60% complete</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                <div>
                  <p className="font-medium">Maintain 85% average across all subjects</p>
                  <p className="text-sm text-muted-foreground">Progress: 90% complete</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
