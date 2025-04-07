
import React, { useState, useEffect, useRef } from 'react';
import AStudentContent from './AStudentContent';

interface TypingAStudentContentProps {
  typingSpeed?: number;
}

const TypingAStudentContent: React.FC<TypingAStudentContentProps> = ({ typingSpeed = 5 }) => {
  const [content, setContent] = useState<string>('');
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const originalContentRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Extract text content from the AStudentContent component
  useEffect(() => {
    // Create a temporary div to render the component
    const tempDiv = document.createElement('div');
    const shadowRoot = tempDiv.attachShadow({ mode: 'open' });
    const shadowDiv = document.createElement('div');
    shadowRoot.appendChild(shadowDiv);
    
    // Extract text content
    const extractTextContent = () => {
      if (originalContentRef.current) {
        // Get all text nodes and organize them
        const fullText = extractTextFromNode(originalContentRef.current);
        return fullText;
      }
      return '';
    };

    // Start typing animation
    const startTyping = (fullText: string) => {
      let currentIndex = 0;
      const charactersPerFrame = typingSpeed;
      
      const typeNextChunk = () => {
        if (currentIndex < fullText.length) {
          const nextChunk = fullText.substring(0, currentIndex + charactersPerFrame);
          setContent(nextChunk);
          currentIndex += charactersPerFrame;
          timerRef.current = setTimeout(typeNextChunk, 16); // approx 60fps
        } else {
          setIsComplete(true);
        }
      };
      
      typeNextChunk();
    };

    // Wait for refs to be available
    setTimeout(() => {
      const fullText = extractTextContent();
      startTyping(fullText);
    }, 100);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [typingSpeed]);

  // Function to extract text content from DOM nodes
  const extractTextFromNode = (node: Node): string => {
    let text = '';
    
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      
      // Handle special elements
      if (element.tagName === 'MATHBLOCK') {
        text += `\n[MATH:${element.textContent}]\n`;
      } else if (element.tagName === 'MATHINLINE') {
        text += `[INLINE:${element.textContent}]`;
      } else if (element.tagName === 'STRONG') {
        text += `**${element.textContent}**`;
      } else if (element.tagName === 'HR') {
        text += '\n---\n';
      } else if (element.tagName === 'BR') {
        text += '\n';
      } else {
        // Recursively process child nodes
        for (let i = 0; i < node.childNodes.length; i++) {
          text += extractTextFromNode(node.childNodes[i]);
        }
        
        // Add appropriate spacing based on element type
        if (['P', 'DIV', 'LI', 'H3'].includes(element.tagName)) {
          if (!text.endsWith('\n')) {
            text += '\n';
          }
        }
      }
    }
    
    return text;
  };

  // Create a styled version of the content with the proper formatting
  const createStyledContent = () => {
    if (!content) return null;

    // Process content to handle special formatting
    let formattedContent = content;
    
    // Replace math blocks
    formattedContent = formattedContent.replace(/\[MATH:(.*?)\]/g, (match, formula) => {
      return `<div class="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">${formula}</div>`;
    });
    
    // Replace inline math
    formattedContent = formattedContent.replace(/\[INLINE:(.*?)\]/g, (match, formula) => {
      return `<span class="inline-block bg-gray-100 px-1 rounded text-sm font-mono">${formula}</span>`;
    });
    
    // Replace bold text
    formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace horizontal rules
    formattedContent = formattedContent.replace(/---/g, '<hr class="my-4 border-gray-300">');
    
    // Replace newlines with <br> tags
    formattedContent = formattedContent.replace(/\n/g, '<br>');

    return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
  };

  return (
    <div className="relative">
      {/* Hidden original content for reference */}
      <div className="hidden" ref={originalContentRef}>
        <AStudentContent />
      </div>
      
      {/* Visible typing content */}
      <div ref={contentRef} className="whitespace-pre-line">
        {isComplete ? <AStudentContent /> : createStyledContent()}
      </div>
      
      {/* Cursor */}
      {!isComplete && (
        <span className="inline-block w-2 h-4 ml-1 bg-blue-500 animate-pulse" style={{ verticalAlign: 'middle' }} />
      )}
    </div>
  );
};

export default TypingAStudentContent;
