
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Highlight {
  text: string;
  type: "strong" | "improvement" | "weak";
  feedback?: string;
}

interface EssayWithHighlightsProps {
  essay: string;
  highlights: Highlight[];
  isAnalyzing: boolean;
  analysisStage: number;
}

const EssayWithHighlights: React.FC<EssayWithHighlightsProps> = ({
  essay,
  highlights,
  isAnalyzing,
  analysisStage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to apply highlights to the essay text
  const renderHighlightedEssay = () => {
    if (isAnalyzing && analysisStage < 3) {
      // During scanning animation, just show the plain essay
      return <div className="whitespace-pre-wrap">{essay}</div>;
    }

    let highlightedEssay = essay;
    let offsetDueToTags = 0;

    // Sort highlights by their position in the essay (to avoid issues with overlapping highlights)
    const sortedHighlights = [...highlights].sort(
      (a, b) => essay.indexOf(a.text) - essay.indexOf(b.text)
    );

    // Apply each highlight
    sortedHighlights.forEach((highlight) => {
      const index = essay.indexOf(highlight.text);
      if (index !== -1) {
        const before = highlightedEssay.substring(0, index + offsetDueToTags);
        const after = highlightedEssay.substring(
          index + highlight.text.length + offsetDueToTags
        );

        const highlightClass = cn(
          "px-1 py-0.5 rounded cursor-help transition-colors",
          {
            "bg-green-100 hover:bg-green-200": highlight.type === "strong",
            "bg-yellow-100 hover:bg-yellow-200": highlight.type === "improvement",
            "bg-red-100 hover:bg-red-200": highlight.type === "weak",
          }
        );

        const highlightTag = `<span class="${highlightClass}" data-feedback="${
          highlight.feedback || ""
        }">${highlight.text}</span>`;

        highlightedEssay = before + highlightTag + after;
        offsetDueToTags += highlightTag.length - highlight.text.length;
      }
    });

    return (
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: highlightedEssay }}
      />
    );
  };

  // Add scanning animation effect
  useEffect(() => {
    if (!isAnalyzing || !containerRef.current || analysisStage > 0) return;

    const container = containerRef.current;
    let position = 0;
    const scanSpeed = 100; // pixels per frame

    const scanLine = document.createElement("div");
    scanLine.className =
      "absolute left-0 right-0 h-8 bg-blue-400 bg-opacity-20 pointer-events-none";
    scanLine.style.top = "0px";
    container.style.position = "relative";
    container.appendChild(scanLine);

    const animate = () => {
      position += scanSpeed;
      scanLine.style.top = `${position}px`;

      if (position < container.scrollHeight) {
        requestAnimationFrame(animate);
      } else {
        container.removeChild(scanLine);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      if (container.contains(scanLine)) {
        container.removeChild(scanLine);
      }
    };
  }, [isAnalyzing, analysisStage]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "p-6 border rounded-md bg-white transition-all duration-300 relative font-serif text-gray-800",
        {
          "animate-pulse": isAnalyzing && analysisStage === 0,
        }
      )}
    >
      {isAnalyzing && analysisStage === 0 && (
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-transparent opacity-30 animate-pulse pointer-events-none"></div>
      )}
      {renderHighlightedEssay()}
    </div>
  );
};

export default EssayWithHighlights;
