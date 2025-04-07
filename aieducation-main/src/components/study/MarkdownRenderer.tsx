
import React from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface MarkdownRendererProps {
  markdown: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  markdown, 
  className 
}) => {
  return (
    <div className={cn("prose dark:prose-invert max-w-none", className)}>
      <ReactMarkdown 
        remarkPlugins={[remarkMath]}
        // Use type assertion to address the compatibility issue between packages
        rehypePlugins={[rehypeKatex as any]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};
