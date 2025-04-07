import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { analyticsAPI, studyAPI } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface StudyProgress {
  subject: string;
  topic: string;
  progress: number;
  lastStudied: string;
}

interface Analytics {
  totalSubjects: number;
  averageProgress: number;
  recentActivity: StudyProgress[];
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [analyticsResponse, progressResponse] = await Promise.all([
          analyticsAPI.getStudyAnalytics(),
          studyAPI.getProgress()
        ]);

        setAnalytics(analyticsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data');
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user?.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={analytics?.averageProgress || 0} className="mb-4" />
            <p className="text-sm text-gray-600">
              Average progress across all subjects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold mb-2">{analytics?.totalSubjects || 0}</p>
            <p className="text-sm text-gray-600">Total subjects being studied</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics?.recentActivity?.length ? (
              <ul className="space-y-2">
                {analytics.recentActivity.map((activity, index) => (
                  <li key={index} className="text-sm">
                    {activity.subject} - {activity.topic} ({activity.progress}%)
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">No recent activity</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" onClick={() => navigate('/study')}>
              Start Studying
            </Button>
            <Button className="w-full" onClick={() => navigate('/essay-analysis')}>
              Analyze Essay
            </Button>
            <Button className="w-full" onClick={() => navigate('/ai-tutor')}>
              Start AI Tutor Session
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Set specific goals for each study session</li>
              <li>• Take regular breaks to maintain focus</li>
              <li>• Review previous topics regularly</li>
              <li>• Use the AI tutor for difficult concepts</li>
              <li>• Track your progress in the analytics section</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
