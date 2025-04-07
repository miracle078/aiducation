
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Minimize2, Bot, Maximize2, BookOpen, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      // Add welcome message when opening for the first time
      if (messages.length === 0) {
        setIsTyping(true);
        setTimeout(() => {
          setMessages([{
            id: generateId(),
            content: "Hi there! I'm your AI tutor. What would you like to learn about today?",
            isUser: false,
            timestamp: new Date()
          }]);
          setIsTyping(false);
        }, 600);
      }
    }
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };
  
  const addBotMessage = (content: string) => {
    setIsTyping(true);
    
    // Simulate typing delay based on message length
    const typingDelay = Math.min(1000, Math.max(600, content.length * 10));
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: generateId(),
          content,
          isUser: false,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, typingDelay);
  };
  
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      const newMessage: Message = {
        id: generateId(),
        content: inputValue,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputValue('');
      
      // Check if message contains "quadratic functions" to deliver specific content
      if (inputValue.toLowerCase().includes("quadratic") || inputValue.toLowerCase().includes("function")) {
        // Typing indicator
        setTimeout(() => {
          addBotMessage("Quadratic functions are an important topic in algebra. Let me explain the key concepts:");
        }, 800);
        
        // First part of explanation
        setTimeout(() => {
          addBotMessage("A quadratic function has the form f(x) = ax² + bx + c, where a, b, and c are constants and a ≠ 0. The graph of a quadratic function is called a parabola.");
        }, 2500);
        
        // Second part with more details
        setTimeout(() => {
          addBotMessage("Key properties of quadratic functions include:\n\n• The vertex represents the minimum or maximum point\n• The axis of symmetry is a vertical line through the vertex\n• The y-intercept is at (0, c)\n• The x-intercepts (if they exist) are the solutions to ax² + bx + c = 0");
        }, 5000);
        
        return;
      }
      
      // Get current page context to provide more relevant responses
      const currentTopic = window.location.pathname.split('/').pop() || '';
      const contextBasedResponses: Record<string, string[]> = {
        'quadratic-functions': [
          "Quadratic functions have the form f(x) = ax² + bx + c where a ≠ 0. The graph is always a parabola.",
          "The discriminant (b² - 4ac) tells us about the nature of the roots: positive means two distinct real roots, zero means one repeated root, negative means no real roots.",
          "To find the vertex of a quadratic function f(x) = ax² + bx + c, use the formula x = -b/(2a) for the x-coordinate, then calculate f(-b/(2a)) for the y-coordinate.",
          "When analyzing the graph of a quadratic function, pay attention to: the direction it opens (based on the sign of a), the vertex position, and where it crosses the axes.",
        ],
        'default': [
          "I can help you understand that concept. Let's break it down step by step...",
          "Great question! The key to solving this problem is to understand that...",
          "That's an interesting topic. Here's what you need to know...",
          "Let me explain this in a simpler way. Think of it like...",
          "I'd recommend focusing on the fundamental principles first. Let's start with...",
        ]
      };
      
      // Generate a contextual response based on the current topic
      setTimeout(() => {
        const topicResponses = contextBasedResponses[currentTopic] || contextBasedResponses.default;
        const randomResponse = topicResponses[Math.floor(Math.random() * topicResponses.length)];
        addBotMessage(randomResponse);
      }, 800);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className={`fixed bottom-5 right-5 z-30 transition-all duration-500 ease-in-out ${
      isMinimized ? 'w-16 h-16' : 'w-[380px] h-[520px] max-w-[calc(100vw-40px)] max-h-[calc(100vh-160px)]'
    }`}>
      {isMinimized ? (
        <Button 
          onClick={toggleMinimized}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-blue to-teal hover:shadow-lg hover:shadow-blue/20 p-0 flex items-center justify-center"
        >
          <BookOpen className="w-7 h-7 text-white" />
        </Button>
      ) : (
        <div className="h-full flex flex-col rounded-xl shadow-xl overflow-hidden border border-border bg-card">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue to-teal p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-medium">AI Study Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleMinimized}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Minimize2 className="w-4 h-4 text-white" />
              </button>
              <button 
                onClick={() => setIsMinimized(true)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-xl p-3 ${
                  message.isUser 
                    ? 'bg-blue text-white rounded-tr-none' 
                    : 'bg-muted border border-border rounded-tl-none'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-xl rounded-tl-none p-3 border border-border">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-blue/60 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-blue/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-blue/60 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about this topic..."
                className="flex-1 max-h-24 min-h-[42px] rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 resize-none"
                rows={1}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                size="icon"
                className={`h-10 w-10 rounded-lg ${
                  inputValue.trim() 
                    ? 'bg-blue text-white hover:bg-blue-600' 
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIAssistant;
