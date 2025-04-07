
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import VectorsForAStarStudents from '@/components/test-chats/VectorsForAStarStudents';
import VectorsForStrugglingStudents from '@/components/test-chats/VectorsForStrugglingStudents';
import VectorsVisual from '@/components/test-chats/VectorsVisual';
import TypingVectorContent from '@/components/test-chats/TypingVectorContent';
import { MessageCircle } from 'lucide-react';

export default function TestChats2() {
  const [showLoading, setShowLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isTypingQuestion, setIsTypingQuestion] = useState(false);
  const [typedQuestion, setTypedQuestion] = useState('');
  const fullQuestion = "Explain to me an introduction to vectors in Pure Mathematics A Levels.";
  
  // Simulates typing the question
  useEffect(() => {
    if (!isTypingQuestion) {
      setIsTypingQuestion(true);
      let index = 0;
      
      const typeQuestion = () => {
        if (index < fullQuestion.length) {
          setTypedQuestion(fullQuestion.substring(0, index + 1));
          index++;
          setTimeout(typeQuestion, 30);
        } else {
          // After question is typed, show loading spinner for 1 second
          setTimeout(() => {
            setShowLoading(false);
            setShowContent(true);
          }, 1000);
        }
      };
      
      typeQuestion();
    }
  }, [fullQuestion, isTypingQuestion]);
  
  return (
    <div className="container mx-auto py-24 px-4">
      <div className="bg-gray-100 p-4 rounded-lg mb-8 flex items-center">
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-full mr-2">
              <MessageCircle className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold">AI Education Assistant</h2>
          </div>
          
          <div className="bg-white p-3 rounded-lg inline-block mb-2 max-w-[90%]">
            <p>{typedQuestion}</p>
            {!showContent && isTypingQuestion && typedQuestion.length === fullQuestion.length && (
              <div className="flex mt-2">
                <div className="bg-gray-200 w-2 h-2 rounded-full mr-1 animate-pulse"></div>
                <div className="bg-gray-200 w-2 h-2 rounded-full mr-1 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="bg-gray-200 w-2 h-2 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showContent && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* A+ Student */}
          <Card className="h-[600px] overflow-hidden">
            <div className="bg-blue-500 text-white p-3 font-medium text-center">
              A+ Student
            </div>
            <CardContent className="p-4 h-[550px] overflow-auto">
              <TypingVectorContent ContentComponent={VectorsForAStarStudents} />
            </CardContent>
          </Card>
          
          {/* Visual Learner */}
          <Card className="h-[600px] overflow-hidden">
            <div className="bg-green-500 text-white p-3 font-medium text-center">
              Visual Learner
            </div>
            <CardContent className="p-4 h-[550px] overflow-auto">
              <TypingVectorContent ContentComponent={VectorsVisual} />
            </CardContent>
          </Card>
          
          {/* Learner with Special Needs */}
          <Card className="h-[600px] overflow-hidden">
            <div className="bg-purple-500 text-white p-3 font-medium text-center">
              Learner with Special Needs
            </div>
            <CardContent className="p-4 h-[550px] overflow-auto">
              <TypingVectorContent ContentComponent={VectorsForStrugglingStudents} />
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="bg-white p-4 rounded-lg mt-8 shadow">
        <div className="relative">
          <input
            type="text"
            placeholder="Ask about any mathematics topic..."
            className="w-full border border-gray-300 rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            readOnly
            value=""
          />
          <button className="absolute right-3 top-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
