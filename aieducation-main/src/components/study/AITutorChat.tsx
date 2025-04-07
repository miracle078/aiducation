
import React, { useState, useEffect, useRef } from "react";
import { SendHorizontal, Bot, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { generateAITutorResponse } from "@/services/geminiService";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { AIApiKeyNotice } from "./AIApiKeyNotice";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AITutorChatProps {
  topicId: string;
  topicTitle: string;
}

export function AITutorChat({ topicId, topicTitle }: AITutorChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Set the initial message when component mounts
  useEffect(() => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: `Hi there! I'm your AI tutor for ${topicTitle}. What would you like to learn about today?`,
      },
    ]);
  }, [topicTitle]);
  
  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Check if this is for the Quadratic Functions page (which should stay static)
    if (topicId === "quadratic-functions") {
      // Use predefined responses for the demo
      setTimeout(() => {
        const aiResponse = `Quadratic functions are a fundamental concept in algebra. Let me explain:

A quadratic function has the form f(x) = ax² + bx + c, where a, b, and c are constants, and a ≠ 0.

Key properties include:
• The graph is a parabola
• If a > 0, the parabola opens upward; if a < 0, it opens downward
• The axis of symmetry is the vertical line x = -b/(2a)
• The vertex is at the point (-b/(2a), f(-b/(2a)))
• The y-intercept is at (0, c)
• The x-intercepts, if they exist, are the solutions to ax² + bx + c = 0`;
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: aiResponse,
        };
        
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
      return;
    }
    
    try {
      // Use Gemini API for actual response
      const response = await generateAITutorResponse(input, topicTitle);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting tutor response:", error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I had trouble generating a response. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <AIApiKeyNotice />
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`p-3 max-w-[85%] ${
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "mr-auto bg-muted"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex items-center mb-1">
                  <Sparkles className="h-4 w-4 mr-1 text-blue-500" />
                  <span className="text-xs font-medium">AI Tutor</span>
                </div>
              )}
              {message.role === "user" ? (
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              ) : (
                <div className="text-sm">
                  <MarkdownRenderer markdown={message.content} />
                </div>
              )}
            </Card>
          ))}
          
          {isLoading && (
            <Card className="p-3 max-w-[85%] mr-auto bg-muted">
              <div className="flex items-center mb-1">
                <Sparkles className="h-4 w-4 mr-1 text-blue-500" />
                <span className="text-xs font-medium">AI Tutor</span>
              </div>
              <div className="flex space-x-1">
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                <span className="text-sm ml-2">Thinking...</span>
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
