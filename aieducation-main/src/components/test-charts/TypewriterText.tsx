
import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  highlightTerms?: Record<string, string>;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 30,
  highlightTerms = {} 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);
  
  const formatText = (content: string) => {
    // First, handle LaTeX formula blocks with proper rendering
    let processedText = content.replace(/\\[\[(.*?)\\]\]/gs, (match, formula) => {
      return `<div class="bg-gray-100 p-2 rounded my-2 font-mono text-center">${formula}</div>`;
    });
    
    // Handle math inline text
    processedText = processedText.replace(/\\[(.*?)\\]/g, (match, formula) => {
      return `<span class="inline-block bg-gray-100 px-1 rounded text-sm font-mono">${formula}</span>`;
    });
    
    // Remove markdown headers (###)
    processedText = processedText.replace(/^###\s+(.*?)$/gm, '<h3 class="text-base font-bold mb-2">$1</h3>');
    
    // Handle text formatting for highlighted words
    Object.entries(highlightTerms).forEach(([term, color]) => {
      const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      processedText = processedText.replace(regex, `<span style="color:${color};font-weight:bold;">$1</span>`);
    });
    
    // Bold for texts enclosed in **
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic for texts enclosed in *
    processedText = processedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    return processedText;
  };
  
  // Format and then convert line breaks to JSX line breaks
  const formattedTextLines = formatText(displayedText).split('\n').map((line, i) => (
    <React.Fragment key={i}>
      <div dangerouslySetInnerHTML={{ __html: line }} />
      {i < displayedText.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
  
  return <div className="whitespace-pre-line">{formattedTextLines}</div>;
};

export default TypewriterText;
