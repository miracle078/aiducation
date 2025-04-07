
import React, { useState } from "react";
import { generateTermDefinition } from "@/services/geminiService";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";

interface DynamicTermDefinitionProps {
  term: string;
  context: string;
  children: React.ReactNode;
}

export function DynamicTermDefinition({ term, context, children }: DynamicTermDefinitionProps) {
  const [definition, setDefinition] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipOpen = async (open: boolean) => {
    setTooltipOpen(open);
    
    if (open && !definition && !loading) {
      setLoading(true);
      try {
        const generatedDefinition = await generateTermDefinition(term, context);
        setDefinition(generatedDefinition);
      } catch (error) {
        console.error("Failed to generate definition:", error);
        setDefinition("Definition unavailable at the moment.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <TooltipProvider>
      <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpen}>
        <TooltipTrigger asChild>
          <span className="underline decoration-dotted decoration-blue-400 cursor-help">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-4 bg-white dark:bg-gray-900 shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center py-2">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span>Loading definition...</span>
            </div>
          ) : (
            <div>
              <h4 className="font-bold mb-1">{term}</h4>
              <p className="text-sm">{definition}</p>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
