import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { aiTutorAPI } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface TutorSession {
  id: string;
  subject: string;
  topic: string;
  messages: Message[];
  createdAt: string;
}

const AITutor = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<TutorSession[]>([]);
  const [currentSession, setCurrentSession] = useState<TutorSession | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await aiTutorAPI.getSessionHistory('');
        setSessions(response.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
        toast({
          title: 'Error',
          description: 'Failed to load tutor sessions',
          variant: 'destructive',
        });
      }
    };

    fetchSessions();
  }, [toast]);

  const handleStartSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !topic) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await aiTutorAPI.startSession({
        subject,
        topic,
      });
      setCurrentSession(response.data);
      setSessions([...sessions, response.data]);
      toast({
        title: 'Success',
        description: 'Tutor session started',
      });
    } catch (error) {
      console.error('Error starting session:', error);
      toast({
        title: 'Error',
        description: 'Failed to start tutor session',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast({
        title: 'Error',
        description: 'Message cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    if (!currentSession?.id) {
      toast({
        title: 'Error',
        description: 'No active session. Please start a new session first.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await aiTutorAPI.sendMessage(currentSession.id, message);
      setCurrentSession(response.data);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEndSession = async () => {
    if (!currentSession?.id) {
      toast({
        title: 'Error',
        description: 'No active session to end',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await aiTutorAPI.endSession(currentSession.id);
      setCurrentSession(null);
      setSessions(sessions.filter(s => s.id !== currentSession.id));
      toast({
        title: 'Success',
        description: 'Session ended successfully',
      });
    } catch (error) {
      console.error('Error ending session:', error);
      toast({
        title: 'Error',
        description: 'Failed to end session. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Tutor</h1>

      {!currentSession ? (
        <Card>
          <CardHeader>
            <CardTitle>Start New Session</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStartSession} className="space-y-4">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <label htmlFor="topic" className="block text-sm font-medium mb-1">
                  Topic
                </label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter topic"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Starting...' : 'Start Session'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {currentSession.subject} - {currentSession.topic}
                </CardTitle>
                <Button variant="outline" onClick={handleEndSession} disabled={loading}>
                  End Session
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4">
                {currentSession.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}
                  >
                    <p className="font-medium mb-1">
                      {msg.role === 'user' ? 'You' : 'AI Tutor'}:
                    </p>
                    <p>{msg.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(msg.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Previous Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {sessions.length > 0 ? (
                <div className="space-y-2">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => setCurrentSession(session)}
                    >
                      <h3 className="font-medium">
                        {session.subject} - {session.topic}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {session.messages.length} messages
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(session.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">No previous sessions</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AITutor;
