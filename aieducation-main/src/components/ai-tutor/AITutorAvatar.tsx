
import React, { useState, useEffect, useRef } from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AITutorAvatarProps {
  currentStage: number;
  avatarText: string;
  isUserMessage: boolean;
  progress: number;
}

const AITutorAvatar: React.FC<AITutorAvatarProps> = ({ 
  currentStage, 
  avatarText,
  isUserMessage,
  progress 
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const prevStageRef = useRef<number>(-1);

  useEffect(() => {
    if (prevStageRef.current !== currentStage) {
      setDisplayedText("");
      prevStageRef.current = currentStage;
      
      const textLength = avatarText.length;
      const typingInterval = Math.min(30, 500 / textLength); // Dynamic typing speed
      
      let currentIndex = 0;
      const typingTimer = setInterval(() => {
        if (currentIndex <= textLength) {
          setDisplayedText(avatarText.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingTimer);
        }
      }, typingInterval);
      
      return () => clearInterval(typingTimer);
    }
  }, [currentStage, avatarText]);

  return (
    <div className="h-full flex flex-col">
      {/* Avatar header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 text-white">
        <h2 className="font-bold text-lg">Chemistry AI Tutor</h2>
        <p className="text-xs text-blue-100">Interactive learning assistant</p>
      </div>
      
      {/* Avatar body */}
      <div className="flex-1 flex flex-col p-4 bg-gray-50 overflow-hidden relative">
        {/* Lab background */}
        <div 
          className="absolute inset-0 opacity-5 bg-cover bg-center"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }}
        ></div>
        
        {/* Avatar image/animation */}
        <div className="flex-1 flex flex-col items-center justify-center mb-2">
          <div className={cn(
            "w-28 h-28 rounded-full border-4 relative transition-all duration-500",
            isUserMessage ? "border-purple-400 bg-purple-100" : "border-blue-400 bg-blue-100",
            {"animate-pulse": displayedText !== avatarText && !isUserMessage}
          )}>
            {/* Face */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isUserMessage ? (
                <User className="h-16 w-16 text-purple-500" />
              ) : (
                <Bot className="h-16 w-16 text-blue-500" />
              )}
            </div>
            
            {/* Animation glow effect */}
            {!isUserMessage && displayedText !== avatarText && (
              <div className="absolute -inset-1 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
            )}
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            {isUserMessage ? "You" : "AI Tutor"}
          </div>
        </div>
        
        {/* Speech bubble */}
        <div className={cn(
          "relative p-4 rounded-lg max-w-[90%] shadow-sm mb-3",
          isUserMessage 
            ? "bg-purple-100 border border-purple-200 ml-auto rounded-tr-none" 
            : "bg-blue-100 border border-blue-200 mr-auto rounded-tl-none"
        )}>
          <p className="text-sm">{displayedText}</p>
          {displayedText !== avatarText && (
            <div className="mt-1 flex">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
              <div className="w-2 h-2 ml-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 ml-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Input area - voice interaction */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center">
          <div className="flex-1 bg-gray-100 rounded-l-full py-2 px-4 text-gray-400 text-sm">
            Ask about any chemistry concept...
          </div>
          <button className="bg-blue-500 text-white rounded-r-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutorAvatar;
