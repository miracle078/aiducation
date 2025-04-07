
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Menu, X, PanelLeft, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { StudyNavigation } from './StudyNavigation';
import { StudyContent } from './StudyContent';
import { StudyTools } from './StudyTools';
import { StudyAIChat } from './StudyAIChat';
import { subjectsData } from '@/data/subjects';

interface StudyLayoutProps {
  subjects?: typeof subjectsData; // Optional to override default data
  currentSubjectId?: string;
  currentTopicId?: string;
}

export function StudyLayout({ 
  subjects = subjectsData,
  currentSubjectId,
  currentTopicId
}: StudyLayoutProps) {
  const { subjectId = currentSubjectId || 'mathematics', topicId = currentTopicId || 'quadratic-functions' } = useParams();
  const navigate = useNavigate();
  
  const [showTools, setShowTools] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  
  // Get current subject and topic data
  const subject = subjects[subjectId as keyof typeof subjects] || subjects.mathematics;
  
  // Generate breadcrumbs
  const getTopicTitle = (id: string): string => {
    // Helper function to search for a topic/subtopic across the entire subject
    const findTopicById = (topics: any[]): any | undefined => {
      for (const topic of topics) {
        if (topic.id === id) {
          return topic;
        }
        
        if (topic.subtopics) {
          // Check direct subtopics
          const directSubtopic = topic.subtopics.find((st: any) => st.id === id);
          if (directSubtopic) {
            return directSubtopic;
          }
          
          // Check nested subtopics (if any)
          for (const subtopic of topic.subtopics) {
            if (subtopic.subtopics) {
              const nestedSubtopic = subtopic.subtopics.find((nst: any) => nst.id === id);
              if (nestedSubtopic) {
                return nestedSubtopic;
              }
            }
          }
        }
      }
      return undefined;
    };
    
    const topic = findTopicById(subject.topics);
    return topic ? topic.title : id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  const breadcrumbs = [
    { id: 'home', title: 'Subjects', path: '/dashboard' },
    { id: subjectId, title: subject.title, path: `/study/${subjectId}` },
    { id: topicId, title: getTopicTitle(topicId), path: `/study/${subjectId}/${topicId}` },
  ];
  
  // Navigation utilities
  const getAdjacentTopics = () => {
    const getAllTopicsFlattened = (topics: any[]): any[] => {
      let result: any[] = [];
      
      for (const topic of topics) {
        result.push(topic);
        
        if (topic.subtopics) {
          for (const subtopic of topic.subtopics) {
            result.push(subtopic);
            
            if (subtopic.subtopics) {
              result.push(...subtopic.subtopics);
            }
          }
        }
      }
      
      return result;
    };
    
    const allTopics = getAllTopicsFlattened(subject.topics);
    const currentIndex = allTopics.findIndex(t => t.id === topicId);
    
    let prevTopic = null;
    let nextTopic = null;
    
    if (currentIndex > 0) {
      const prev = allTopics[currentIndex - 1];
      prevTopic = {
        id: prev.id,
        title: prev.title,
        path: `/study/${subjectId}/${prev.id}`
      };
    }
    
    if (currentIndex >= 0 && currentIndex < allTopics.length - 1) {
      const next = allTopics[currentIndex + 1];
      nextTopic = {
        id: next.id,
        title: next.title,
        path: `/study/${subjectId}/${next.id}`
      };
    }
    
    return { prevTopic, nextTopic };
  };
  
  const { prevTopic, nextTopic } = getAdjacentTopics();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="h-[calc(100vh-64px)] pt-16 flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Navigation Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="fixed z-10 top-20 left-4 h-10 w-10 rounded-full md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-80">
          <StudyNavigation 
            subject={subject}
            activeTopic={topicId}
            onNavigate={handleNavigation}
          />
        </SheetContent>
      </Sheet>
      
      {/* Left Panel - Navigation Sidebar */}
      <div className="hidden md:block w-64 h-full border-r border-border">
        <StudyNavigation 
          subject={subject}
          activeTopic={topicId}
          onNavigate={handleNavigation}
        />
      </div>
      
      {/* Middle Panel - Main Content */}
      <div className="relative flex-1 flex flex-col h-full overflow-hidden">
        <StudyContent
          title={getTopicTitle(topicId)}
          breadcrumbs={breadcrumbs}
          prevTopic={prevTopic}
          nextTopic={nextTopic}
          subjectId={subjectId}
          topicId={topicId}
        />
      </div>
      
      {/* Right Panel - AI Chat (only on large screens) */}
      {showAIChat && (
        <div className="hidden lg:block w-80 h-full border-l border-border bg-muted/20">
          <div className="h-full flex flex-col">
            <div className="p-3 border-b border-border flex justify-between items-center">
              <h3 className="font-medium">Learning Assistant</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowAIChat(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <StudyAIChat 
              subjectId={subjectId} 
              topicId={topicId} 
              topicTitle={getTopicTitle(topicId)}
            />
          </div>
        </div>
      )}
      
      {/* Bottom Panel - Study Tools (collapsible) */}
      {showTools && (
        <div className="h-64 border-t border-border">
          <div className="h-full flex flex-col">
            <div className="p-3 border-b border-border flex justify-between items-center">
              <h3 className="font-medium">Study Tools</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowTools(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <StudyTools 
              subjectId={subjectId} 
              topicId={topicId} 
              topicTitle={getTopicTitle(topicId)}
            />
          </div>
        </div>
      )}
      
      {/* Control buttons */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        {!showTools && (
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full bg-card shadow-md"
            onClick={() => setShowTools(true)}
          >
            <PanelLeft className="h-5 w-5" />
          </Button>
        )}
        
        {!showAIChat && (
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full bg-card shadow-md"
            onClick={() => setShowAIChat(true)}
          >
            <Sparkles className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
