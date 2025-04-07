
import React from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { Loader2, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AIApiKeyNotice } from "./AIApiKeyNotice";

interface AIGeneratedContentProps {
  content: string | null;
  isGenerating: boolean;
  topicTitle: string;
  generateQuestionsContent?: () => Promise<void>;
}

export function AIGeneratedContent({
  content,
  isGenerating,
  topicTitle,
  generateQuestionsContent
}: AIGeneratedContentProps) {
  if (isGenerating) {
    return (
      <div className="w-full py-10 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin mb-4 text-blue-500" />
        <p className="text-center text-muted-foreground">
          Generating content with AI...
        </p>
        <p className="text-center text-xs text-muted-foreground mt-1">
          This may take a few moments
        </p>
      </div>
    );
  }

  if (!content) {
    return (
      <Card className="p-8 text-center">
        <AIApiKeyNotice />
        <Bot className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">AI Content Generation</h3>
        <p className="text-muted-foreground mb-4">
          Let the AI generate personalized content for this topic
        </p>
        <Button 
          onClick={generateQuestionsContent}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Generate Practice Questions
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <AIApiKeyNotice />
      <div className="flex items-center gap-2 mb-4 text-blue-600 border-b pb-2">
        <Bot className="h-5 w-5" />
        <span className="font-medium">AI-Generated Content</span>
      </div>
      
      <MarkdownRenderer markdown={content} />
      
      {generateQuestionsContent && (
        <div className="mt-8 text-center">
          <Button 
            onClick={generateQuestionsContent}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Generate Practice Questions
          </Button>
        </div>
      )}
    </div>
  );
}
