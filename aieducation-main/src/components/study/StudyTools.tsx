
import React, { useState } from 'react';
import { FileText, Brain, Clock, StickyNote, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StudyToolsProps {
  subjectId: string;
  topicId: string;
  topicTitle: string;
}

export function StudyTools({ subjectId, topicId, topicTitle }: StudyToolsProps) {
  const [activeTab, setActiveTab] = useState('tips');
  const [progress, setProgress] = useState(65);
  
  const studyTips = [
    {
      title: "Active Learning",
      description: "Engage actively with the material by taking notes, asking questions, and discussing concepts.",
      icon: <Brain className="w-5 h-5 text-primary" />
    },
    {
      title: "Spaced Repetition",
      description: "Review material at increasing intervals to improve long-term retention.",
      icon: <Clock className="w-5 h-5 text-primary" />
    },
    {
      title: "Regular Practice",
      description: "Apply concepts through regular practice problems to reinforce understanding.",
      icon: <CheckCircle2 className="w-5 h-5 text-primary" />
    }
  ];
  
  return (
    <div className="h-full p-4 overflow-y-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="tips">Study Tips</TabsTrigger>
          <TabsTrigger value="summary">Generate Summary</TabsTrigger>
          <TabsTrigger value="progress">Your Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tips" className="h-[calc(100%-48px)] overflow-y-auto">
          <div className="space-y-4">
            {studyTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-2">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full shrink-0">
                  {tip.icon}
                </div>
                <div>
                  <h3 className="font-medium text-lg">{tip.title}</h3>
                  <p className="text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            ))}
            
            <Button className="w-full mt-4">
              <StickyNote className="w-4 h-4 mr-2" />
              Create Flashcards
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="summary" className="h-[calc(100%-48px)] overflow-y-auto">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">AI-Generated Summary</h3>
              <FileText className="text-muted-foreground w-5 h-5" />
            </div>
            
            <p className="text-muted-foreground mb-4">
              Generate a concise summary of {topicTitle} to help with your revision.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Length</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 px-2">Short</Button>
                  <Button variant="outline" size="sm" className="h-7 px-2">Medium</Button>
                  <Button variant="outline" size="sm" className="h-7 px-2">Detailed</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Include</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 px-2">Formulas</Button>
                  <Button variant="outline" size="sm" className="h-7 px-2">Examples</Button>
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-6">Generate Summary</Button>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress" className="h-[calc(100%-48px)] overflow-y-auto">
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4">Topic Progress</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Completion</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="pt-4 border-t border-border">
                <h4 className="font-medium mb-2">Study Streak</h4>
                <div className="flex justify-between gap-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div 
                      key={day}
                      className={`h-10 flex-1 rounded-md flex items-center justify-center text-xs font-medium ${
                        day < 6 ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Current streak: 5 days
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
