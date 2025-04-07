
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  subtopics?: Topic[];
}

interface NavigationSidebarProps {
  subject: {
    id: string;
    title: string;
    topics: Topic[];
  };
  activeTopic?: string;
}

const NavigationSidebar = ({ subject, activeTopic }: NavigationSidebarProps) => {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  
  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };
  
  const isActive = (id: string) => {
    return id === activeTopic;
  };
  
  const renderTopics = (topics: Topic[], level = 0) => {
    return topics.map(topic => (
      <div key={topic.id} className="animate-fade-in" style={{ animationDuration: '0.4s' }}>
        <div className="flex items-center">
          {topic.subtopics && topic.subtopics.length > 0 ? (
            <button
              className="p-1 mr-1 rounded hover:bg-background"
              onClick={() => toggleTopic(topic.id)}
            >
              {expandedTopics[topic.id] ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          ) : (
            <div className="w-6"></div>
          )}
          
          <Link 
            to={`/study/${subject.id}/${topic.id}`}
            className={`topic-link flex-1 text-sm ${
              isActive(topic.id) ? 'bg-blue/10 text-blue font-medium' : ''
            }`}
            style={{ paddingLeft: `${level * 12 + 12}px` }}
          >
            {topic.title}
          </Link>
        </div>
        
        {topic.subtopics && expandedTopics[topic.id] && (
          <div className="ml-6 pl-2 border-l border-border">
            {renderTopics(topic.subtopics, level + 1)}
          </div>
        )}
      </div>
    ));
  };
  
  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-card border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-medium">{subject.title}</h3>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        {renderTopics(subject.topics)}
      </div>
    </div>
  );
};

export default NavigationSidebar;
