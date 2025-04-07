
import { useState, useEffect } from "react";
import { generateMathContent, generateQuestions } from "@/services/geminiService";
import { useToast } from "@/hooks/use-toast";

export function useContentGeneration(topicId: string, topicTitle: string, explanationLevel: string) {
  const [content, setContent] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string | null>(null);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const { toast } = useToast();
  
  // Check if this is the Quadratic Functions page which should remain static
  const isQuadraticFunctions = topicId === 'quadratic-functions';
  // Check if this is part of Algebra and Functions section
  const isAlgebraAndFunctions = topicId.includes('algebra') || 
    ['indices-and-surds', 'simultaneous-equations', 'inequalities', 'polynomials'].includes(topicId);
  
  // Only generate content for Algebra and Functions pages that are NOT Quadratic Functions
  const shouldGenerateContent = isAlgebraAndFunctions && !isQuadraticFunctions && explanationLevel === 'ai';

  useEffect(() => {
    // Reset content when topic or level changes
    setContent(null);
    setQuestions(null);
    
    if (!shouldGenerateContent) return;
    
    const generatePageContent = async () => {
      setIsGeneratingContent(true);
      try {
        const generatedContent = await generateMathContent(topicTitle, explanationLevel as any);
        setContent(generatedContent);
      } catch (error) {
        console.error("Error generating content:", error);
        toast({
          title: "Content Generation Failed",
          description: "There was an error generating the content. Using default content instead.",
          variant: "destructive",
        });
      } finally {
        setIsGeneratingContent(false);
      }
    };
    
    generatePageContent();
  }, [topicId, topicTitle, explanationLevel, shouldGenerateContent]);
  
  const generateQuestionsContent = async () => {
    if (isQuadraticFunctions) return;
    
    setIsGeneratingQuestions(true);
    try {
      const generatedQuestions = await generateQuestions(topicTitle, explanationLevel as any);
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error("Error generating questions:", error);
      toast({
        title: "Questions Generation Failed",
        description: "There was an error generating the questions. Using default questions instead.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingQuestions(false);
    }
  };
  
  return {
    content,
    questions,
    isGeneratingContent,
    isGeneratingQuestions,
    generateQuestionsContent,
    shouldGenerateContent
  };
}
