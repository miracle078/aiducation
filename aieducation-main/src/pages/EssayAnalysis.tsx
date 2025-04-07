import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { essayAPI } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface EssayAnalysis {
  grammar: {
    score: number;
    feedback: string[];
  };
  structure: {
    score: number;
    feedback: string[];
  };
  content: {
    score: number;
    feedback: string[];
  };
  overall: {
    score: number;
    feedback: string;
  };
}

const EssayAnalysis = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState<EssayAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await essayAPI.saveEssay({
        title,
        content,
        analysis: {}, // This will be populated by the backend
      });
      setAnalysis(response.data.analysis);
      toast({
        title: 'Success',
        description: 'Essay analyzed successfully',
      });
    } catch (error) {
      console.error('Error analyzing essay:', error);
      toast({
        title: 'Error',
        description: 'Failed to analyze essay',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Essay Analysis</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Submit Essay</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter essay title"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                  Content
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your essay content"
                  className="min-h-[200px]"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Analyzing...' : 'Analyze Essay'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {analysis && (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Overall Score: {analysis.overall.score}/100</h3>
                  <p className="text-sm text-gray-600">{analysis.overall.feedback}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Grammar ({analysis.grammar.score}/100)</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {analysis.grammar.feedback.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Structure ({analysis.structure.score}/100)</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {analysis.structure.feedback.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Content ({analysis.content.score}/100)</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {analysis.content.feedback.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EssayAnalysis;
