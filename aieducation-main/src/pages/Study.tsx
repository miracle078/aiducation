import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { studyAPI } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface StudyProgress {
  subject: string;
  topic: string;
  progress: number;
  lastStudied: string;
}

interface StudyMaterial {
  _id: string;
  subject: string;
  topic: string;
  title: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const Study = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [progress, setProgress] = useState<StudyProgress[]>([]);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [progressResponse, materialsResponse] = await Promise.all([
          studyAPI.getProgress(),
          studyAPI.getMaterials()
        ]);

        setProgress(progressResponse.data);
        setMaterials(materialsResponse.data);
      } catch (error) {
        console.error('Error fetching study data:', error);
        setError('Failed to load study data');
        toast({
          title: 'Error',
          description: 'Failed to load study data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleStartStudy = async (subject: string, topic: string) => {
    try {
      setSelectedSubject(subject);
      setSelectedTopic(topic);
      await studyAPI.saveSession({
        subject,
        topic,
        duration: 0,
        notes: '',
      });
      toast({
        title: 'Success',
        description: 'Study session started',
      });
    } catch (error) {
      console.error('Error starting study session:', error);
      toast({
        title: 'Error',
        description: 'Failed to start study session',
        variant: 'destructive',
      });
    }
  };

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
      <h1 className="text-3xl font-bold mb-8">Study Materials</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {progress.length > 0 ? (
              <div className="space-y-4">
                {progress.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.subject} - {item.topic}</span>
                      <span className="text-sm text-gray-600">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} />
                    <p className="text-xs text-gray-500">
                      Last studied: {new Date(item.lastStudied).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">No study progress yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Materials</CardTitle>
          </CardHeader>
          <CardContent>
            {materials.length > 0 ? (
              <div className="space-y-4">
                {materials.map((material) => (
                  <div key={material._id} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">{material.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {material.subject} - {material.topic}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Difficulty: {material.difficulty}
                    </p>
                    <Button
                      onClick={() => handleStartStudy(material.subject, material.topic)}
                      className="w-full"
                    >
                      Start Studying
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">No study materials available</p>
            )}
          </CardContent>
        </Card>
      </div>

      {selectedSubject && selectedTopic && (
        <Card>
          <CardHeader>
            <CardTitle>Current Study Session</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium mb-2">
              {selectedSubject} - {selectedTopic}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Start your study session by reading the materials and taking notes
            </p>
            <div className="space-y-4">
              <Button className="w-full">Take Notes</Button>
              <Button className="w-full" variant="outline">End Session</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Study;
