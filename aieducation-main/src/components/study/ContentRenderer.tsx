
import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { CircleHelp } from 'lucide-react';
import { DetailedExplanation } from './DetailedExplanation';
import { highlightedTerms } from '../../data/learningContent';

interface ContentRendererProps {
  content: React.ReactNode;
}

export function ContentRenderer({ content }: ContentRendererProps) {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [showDefinition, setShowDefinition] = useState(false);
  const [definitionPosition, setDefinitionPosition] = useState({ top: 0, left: 0 });
  const [showDetailedExplanation, setShowDetailedExplanation] = useState(false);
  const [currentTerm, setCurrentTerm] = useState("");

  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.toString().trim() === '') {
        return;
      }
      
      const text = selection.toString().trim().toLowerCase();
      const terms = Object.keys(highlightedTerms);
      const matchedTerm = terms.find(term => 
        term === text || 
        term.replace(/-/g, ' ') === text ||
        highlightedTerms[term as keyof typeof highlightedTerms].term.toLowerCase() === text
      );
      
      if (matchedTerm) {
        setCurrentTerm(matchedTerm);
        setSelectedText(text);
        
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setDefinitionPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX
        });
        
        setShowDefinition(true);
      }
    };

    document.addEventListener('mouseup', handleTextSelection);
    
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, []);

  const closeDefinition = () => {
    setShowDefinition(false);
    setSelectedText(null);
  };
  
  const openDetailedExplanation = () => {
    setShowDefinition(false);
    setShowDetailedExplanation(true);
  };
  
  const closeDetailedExplanation = () => {
    setShowDetailedExplanation(false);
  };
  
  const getDetailedExplanationContent = (term: string) => {
    // This would ideally come from your content database
    // For now we'll just return null and let the DetailedExplanation component use its default content
    return null;
  };
  
  const getExplanation = (term: string) => {
    if (highlightedTerms[term as keyof typeof highlightedTerms]) {
      return highlightedTerms[term as keyof typeof highlightedTerms].shortDefinition;
    }
    
    const explanations: Record<string, string> = {
      'quadratic-formula': 'The formula x = (-b ± √(b² - 4ac)) / 2a used to solve quadratic equations in the form ax² + bx + c = 0.',
      'function': 'A mathematical relationship that assigns exactly one output value to each input value, usually written as f(x).',
      'parabola': 'A U-shaped curve that represents the graph of a quadratic function, such as y = x².',
      'minimum-value': 'The lowest point on a parabola when it opens upward (a > 0).',
      'maximum-value': 'The highest point on a parabola when it opens downward (a < 0).',
      'vertex': 'The point where a parabola changes direction, representing either a minimum or maximum value.',
      'axis-of-symmetry': 'A vertical line passing through the vertex of a parabola about which the parabola is symmetric.'
    };
    
    return explanations[term] || `Definition for ${term.replace(/-/g, ' ')}`;
  };

  return (
    <ScrollArea className="h-full pr-4">
      <div className="content-area pb-20">{content}</div>
      
      {showDefinition && selectedText && (
        <Card 
          className="fixed z-50 w-80 p-4 shadow-lg animate-in fade-in-50 zoom-in-95" 
          style={{ 
            top: `${definitionPosition.top}px`, 
            left: `${definitionPosition.left}px`,
            maxWidth: '80vw'
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="font-semibold text-primary">
              {currentTerm.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </div>
            <button 
              onClick={closeDefinition}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
          
          <div className="text-sm">
            <p className="text-foreground/80 mb-3">
              {getExplanation(currentTerm)}
            </p>
            
            <div className="flex justify-between items-center">
              <button 
                className="text-xs flex items-center text-primary hover:underline"
                onClick={openDetailedExplanation}
              >
                <CircleHelp className="w-3 h-3 mr-1" />
                Detailed Explanation
              </button>
              
              <div className="text-xs text-muted-foreground">
                Click outside to close
              </div>
            </div>
          </div>
        </Card>
      )}
      
      {showDetailedExplanation && (
        <DetailedExplanation 
          title={currentTerm.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          onBack={closeDetailedExplanation}
          onClose={closeDetailedExplanation}
          term={currentTerm}
          content={getDetailedExplanationContent(currentTerm)}
        />
      )}
    </ScrollArea>
  );
}
