
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AIApiKeyNotice: React.FC = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const isApiKeyMissing = !apiKey || apiKey === "your_gemini_api_key_here";
  
  if (!isApiKeyMissing) return null;
  
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>API Key Required</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-2">
          To use AI features, you need to set up your Gemini API key in the .env file:
        </p>
        <ol className="list-decimal pl-4 mb-3 space-y-1">
          <li>Create a .env file in your project root (copy from .env.example)</li>
          <li>Get a Gemini API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a></li>
          <li>Add your API key to the .env file as VITE_GEMINI_API_KEY=your_key_here</li>
          <li>Restart your application</li>
        </ol>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => window.open("https://aistudio.google.com/app/apikey", "_blank")}
        >
          Get API Key
        </Button>
      </AlertDescription>
    </Alert>
  );
};
