
import React, { useState, useEffect, useRef } from 'react';
import { SendHorizontal, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

interface StudyAIChatProps {
  subjectId: string;
  topicId: string;
  topicTitle: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function StudyAIChat({ subjectId, topicId, topicTitle }: StudyAIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Set the initial message when component mounts
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: `Hi there! I'm your learning assistant for ${topicTitle}. What would you like to learn about today?`
      }
    ]);
  }, [topicTitle]);
  
  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Check for specific topics to provide more targeted responses
    const lowerCaseInput = input.toLowerCase();
    
    setTimeout(() => {
      let aiResponse = '';
      
      // Provide specific response for quadratic functions
      if (lowerCaseInput.includes('quadratic') || lowerCaseInput.includes('function')) {
        aiResponse = `Quadratic functions are a fundamental concept in algebra. Let me explain:\n\n` +
          `A quadratic function has the form f(x) = ax² + bx + c, where a, b, and c are constants, and a ≠ 0.\n\n` +
          `Key properties include:\n` +
          `• The graph is a parabola\n` +
          `• If a > 0, the parabola opens upward; if a < 0, it opens downward\n` +
          `• The axis of symmetry is the vertical line x = -b/(2a)\n` +
          `• The vertex is at the point (-b/(2a), f(-b/(2a)))\n` +
          `• The y-intercept is at (0, c)\n` +
          `• The x-intercepts, if they exist, are the solutions to ax² + bx + c = 0`;
      } else {
        // General response options
        const responseOptions = [
          `That's a great question about ${topicTitle}! The key concept here is...`,
          `When studying ${topicTitle}, it's important to remember that...`,
          `Let me explain this aspect of ${topicTitle} in more detail...`,
          `I'd recommend trying these practice problems to better understand ${topicTitle}...`
        ];
        aiResponse = responseOptions[Math.floor(Math.random() * responseOptions.length)];
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <Card 
              key={message.id}
              className={`p-3 max-w-[85%] ${
                message.role === 'user' 
                  ? 'ml-auto bg-primary text-primary-foreground' 
                  : 'mr-auto bg-muted'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center mb-1">
                  <Bot className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">Learning Assistant</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </Card>
          ))}
          
          {isLoading && (
            <Card className="p-3 max-w-[85%] mr-auto bg-muted">
              <div className="flex items-center mb-1">
                <Bot className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Learning Assistant</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </Card>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about ${topicTitle}...`}
            className="min-h-12 resize-none"
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage} 
            disabled={!input.trim() || isLoading}
            className="shrink-0"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Ask questions, request examples, or get help with problems.
        </p>
      </div>
    </div>
  );
}
