
import { toast } from "@/hooks/use-toast";

// Types for Gemini API requests and responses
interface GeminiRequestContent {
  parts: { text: string }[];
}

interface GeminiRequest {
  contents: GeminiRequestContent[];
}

interface GeminiResponsePart {
  text: string;
}

interface GeminiResponseContent {
  parts: GeminiResponsePart[];
}

interface GeminiResponse {
  candidates: {
    content: GeminiResponseContent;
    finishReason: string;
  }[];
}

export const generateContent = async (prompt: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    toast({
      title: "API Key Missing",
      description: "Please set your Gemini API key in the .env file (VITE_GEMINI_API_KEY)",
      variant: "destructive",
    });
    return "To use AI features, you need to set your Gemini API key in the .env file. Get a key at https://aistudio.google.com/app/apikey";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API request failed: ${response.status} ${errorData}`);
    }

    const data = await response.json() as GeminiResponse;
    
    // Extract the generated text from the response
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
      return data.candidates[0].content.parts.map(part => part.text).join("");
    }

    return "No content generated";
  } catch (error) {
    console.error("Error generating content:", error);
    toast({
      title: "Content Generation Failed",
      description: "There was an error generating content with Gemini API",
      variant: "destructive",
    });
    return "Error generating content. Please try again later.";
  }
};

export const generateMathContent = async (
  topic: string,
  level: "simple" | "medium" | "advanced" | "ai"
): Promise<string> => {
  const difficultyLevel = level === "ai" ? "advanced with innovative teaching approaches" : level;
  
  const prompt = `Create A-level mathematics study content for the topic "${topic}" at a ${difficultyLevel} difficulty level. 
  Include:
  1. Clear explanations of key concepts
  2. Mathematical formulas using LaTeX notation (use $ for inline math and $$ for block math)
  3. Examples that demonstrate application
  4. Visual descriptions for educational graphics
  
  Format the response in markdown with LaTeX for mathematical formulas.`;
  
  return generateContent(prompt);
};

export const generateQuestions = async (
  topic: string,
  level: "simple" | "medium" | "advanced" | "ai"
): Promise<string> => {
  const difficultyLevel = level === "ai" ? "varied difficulty" : level;
  
  const prompt = `Generate 4 practice questions for A-level mathematics on the topic "${topic}" at ${difficultyLevel} difficulty level. 
  For each question:
  1. Provide the question text
  2. Include a sample answer
  3. Add a brief explanation of the solution approach
  
  Format the response in markdown using LaTeX notation for mathematical formulas (use $ for inline math and $$ for block math).`;
  
  return generateContent(prompt);
};

export const generateTermDefinition = async (term: string, context: string): Promise<string> => {
  const prompt = `Define the mathematical term "${term}" in the context of ${context}. 
  Provide:
  1. A clear and concise definition
  2. How it relates to the broader mathematical concept
  
  Keep the response under 100 words and explain as if to an A-level student. Use LaTeX notation for mathematical formulas if needed.`;
  
  return generateContent(prompt);
};

export const generateAITutorResponse = async (question: string, topic: string): Promise<string> => {
  const prompt = `As an AI tutor helping with A-level mathematics on the topic of "${topic}", answer the following question:
  
  Question: ${question}
  
  Provide:
  1. A clear and detailed explanation
  2. Any relevant formulas or mathematical concepts using LaTeX notation (use $ for inline math and $$ for block math)
  3. An example if appropriate
  
  Format the response in markdown with LaTeX for mathematical formulas.`;
  
  return generateContent(prompt);
};
