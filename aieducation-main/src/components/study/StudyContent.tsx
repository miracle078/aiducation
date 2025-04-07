
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ArrowLeft, ArrowRight, Book, HelpCircle, FileText, StickyNote, Sparkles, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ContentRenderer } from './ContentRenderer';
import { InteractiveFunctionGraph } from './InteractiveFunctionGraph';
import { useToast } from '@/hooks/use-toast';
import InteractiveQuadraticFunctions from './InteractiveQuadraticFunctions';
import { MarkdownRenderer } from './MarkdownRenderer';
import { AIGeneratedContent } from './AIGeneratedContent';
import { useContentGeneration } from '@/hooks/useContentGeneration';
import { AITutorChat } from './AITutorChat';

interface StudyContentProps {
  title: string;
  breadcrumbs: {
    id: string;
    title: string;
    path: string;
  }[];
  prevTopic?: {
    id: string;
    title: string;
    path: string;
  } | null;
  nextTopic?: {
    id: string;
    title: string;
    path: string;
  } | null;
  subjectId: string;
  topicId: string;
}

export function StudyContent({ title, breadcrumbs, prevTopic, nextTopic, subjectId, topicId }: StudyContentProps) {
  const [explanationLevel, setExplanationLevel] = useState('medium');
  const [activeTab, setActiveTab] = useState('content');
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [fullResponse, setFullResponse] = useState('');
  const [showGraph, setShowGraph] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const {
    content: generatedContent,
    questions: generatedQuestions,
    isGeneratingContent,
    isGeneratingQuestions,
    generateQuestionsContent,
    shouldGenerateContent
  } = useContentGeneration(topicId, title, explanationLevel);
  
  const [initialAIMessage, setInitialAIMessage] = useState('');
  const [chatStarted, setChatStarted] = useState(false);
  
  useEffect(() => {
    if (topicId === 'quadratic-functions') {
      setInitialAIMessage("Hello! I'm your AI tutor for quadratic functions. What would you like to learn about them? I can explain the standard form, vertex form, or how to find roots.");
    } else {
      setInitialAIMessage(`Hello! I'm your AI tutor for ${title}. What would you like to learn about this topic?`);
    }
  }, [topicId, title]);

  useEffect(() => {
    if (isTyping && displayedResponse.length < fullResponse.length) {
      const timer = setTimeout(() => {
        setDisplayedResponse(fullResponse.substring(0, displayedResponse.length + 10));
      }, 20);
      return () => clearTimeout(timer);
    } else if (isTyping && displayedResponse.length >= fullResponse.length) {
      setIsTyping(false);
      setShowGraph(true);
    }
  }, [isTyping, displayedResponse, fullResponse]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedResponse]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    if (!chatStarted) {
      setChatStarted(true);
    }
    
    setIsTyping(true);
    setDisplayedResponse('');
    setShowGraph(false);
    
    const exampleResponse = `Quadratic functions are polynomial functions with the highest degree of 2. The standard form is f(x) = ax² + bx + c where a, b, and c are constants and a ≠ 0.

The graph of a quadratic function is a parabola. The coefficient 'a' determines the shape and direction of the parabola:
- When a > 0, the parabola opens upward
- When a < 0, the parabola opens downward
- The larger the absolute value of 'a', the narrower the parabola

Key features of a quadratic function include:
1. The vertex (h,k) where h = -b/(2a) and k = f(h)
2. The axis of symmetry at x = -b/(2a)
3. The y-intercept at f(0) = c
4. The x-intercepts (if they exist) where ax² + bx + c = 0

Would you like me to explain more about any of these aspects?`;
    
    setFullResponse(exampleResponse);
    
    toast({
      title: "Processing your question",
      description: "Generating response about quadratic functions...",
      className: "bg-blue-50 border-blue-200 text-blue-800",
    });
    
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const checkAnswer = (questionNum: number, userAnswer: string) => {
    // Simple placeholder function for the checkAnswer functionality
    setShowAnswers(prev => ({...prev, [questionNum]: true}));
    
    toast({
      title: "Answer submitted",
      description: "Review the sample answer for comparison.",
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  const getContent = () => {
    if (shouldGenerateContent) {
      return (
        <AIGeneratedContent 
          content={generatedContent}
          isGenerating={isGeneratingContent}
          topicTitle={title}
          generateQuestionsContent={generateQuestionsContent}
        />
      );
    }
    
    if (subjectId === 'mathematics' && topicId === 'quadratic-functions') {
      if (explanationLevel === 'ai') {
        return <InteractiveQuadraticFunctions />;
      }
      
      return (
        <div className="space-y-6">
          <p>
            In this lesson, we'll explore quadratic functions and how they form the foundation of many mathematical concepts. A function is a mathematical relationship that assigns exactly one output value to each input value.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Quadratic Functions</h2>
          
          <div className="p-5 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">The General Form</h3>
            <p className="mb-3">
              A quadratic function can be written in the form f(x) = ax² + bx + c, where a, b, and c are constants, and a ≠ 0. This is known as the standard form, and it is the most commonly used representation in A-level mathematics. The value of a determines the opening direction and steepness of the parabola, while b and c influence its position on the coordinate plane.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-5">Key Features of Quadratic Graphs</h3>
            <p className="mb-3">
              The graph of a quadratic function always forms a parabola. When a is positive, the parabola opens upward, creating a U-shape. The function has a minimum value at its lowest point. Conversely, when a is negative, the parabola opens downward in an inverted U-shape, and the function reaches a maximum value at its highest point. The magnitude of a influences the width of the parabola - a larger absolute value of a results in a narrower parabola, while a smaller absolute value creates a wider curve.
            </p>
            
            <p className="mb-3">
              Every parabola has an axis of symmetry, which is a vertical line that passes through the vertex. The axis of symmetry divides the parabola into two mirror-image halves. For a quadratic function in standard form, the axis of symmetry occurs at x = -b/(2a). This is a crucial feature when analyzing the behavior of quadratic functions.
            </p>
            
            <p>
              The vertex of the parabola represents either the minimum or maximum point of the function. Its coordinates can be calculated as (-b/(2a), f(-b/(2a))). Alternatively, the y-coordinate can be found using the formula c - b²/(4a). The vertex is an essential point to identify when sketching quadratic graphs or solving optimization problems involving quadratic functions.
            </p>
          </div>
          
          <div className="my-6 w-full bg-white dark:bg-card rounded-lg flex flex-col border">
            <h3 className="p-4 text-xl font-semibold border-b">Interactive Function Explorer</h3>
            <div className="flex-1 w-full p-4">
              <InteractiveFunctionGraph containerId="main-interactive-graph" />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mt-6 mb-4">Key Features of Quadratic Functions</h3>
          
          <ul className="space-y-3">
            <li>
              <strong>Shape and Direction:</strong> When a &gt; 0, the parabola opens upward (U-shaped) and has a minimum value. When a &lt; 0, the parabola opens downward (inverted U-shaped) and has a maximum value.
            </li>
            <li>
              <strong>Vertex:</strong> The vertex is the point where the parabola changes direction. For a quadratic function in the form f(x) = ax² + bx + c, the x-coordinate of the vertex is x = -b/(2a).
            </li>
            <li>
              <strong>Axis of Symmetry:</strong> The parabola is symmetric about a vertical line passing through the vertex, called the axis of symmetry.
            </li>
            <li>
              <strong>y-intercept:</strong> The y-intercept is the point where the parabola crosses the y-axis, which is at (0, c).
            </li>
            <li>
              <strong>x-intercepts:</strong> The x-intercepts (if they exist) are the points where the parabola crosses the x-axis. These can be found by solving the equation ax² + bx + c = 0.
            </li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-4">Solving Quadratic Equations</h3>
          
          <p>
            To find the roots of a quadratic equation (where the function equals zero), we can use the quadratic formula:
          </p>
          
          <div className="my-4 p-4 bg-primary/5 border border-primary/10 rounded-lg text-center">
            <div className="text-xl text-primary font-medium">
              x = (-b ± √(b² - 4ac)) / 2a
            </div>
          </div>
          
          <p>
            This formula gives us the x-values where the parabola crosses the x-axis, which are the solutions to the equation ax² + bx + c = 0.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-4">The Discriminant</h3>
          
          <p>
            The expression b² - 4ac is called the discriminant. It tells us about the nature of the roots:
          </p>
          
          <ul className="space-y-2">
            <li>If b² - 4ac &gt; 0, the equation has two distinct real roots.</li>
            <li>If b² - 4ac = 0, the equation has exactly one real root (a repeated root).</li>
            <li>If b² - 4ac &lt; 0, the equation has no real roots (but two complex conjugate roots).</li>
          </ul>
          
          <Card className="mt-8 p-5">
            <div className="flex items-start mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <h4 className="text-lg font-semibold">Reflection Questions</h4>
            </div>
            <div className="space-y-4">
              <div>
                <p className="mb-2 font-medium">Question 1:</p>
                <p className="mb-3">
                  How would the graph of f(x) = 2x² - 4x + 5 differ from the graph of g(x) = -2x² - 4x + 5? Think about the shape, direction, and key points.
                </p>
                <Button variant="outline" className="text-sm">
                  Show Answer
                </Button>
              </div>
              
              <div>
                <p className="mb-2 font-medium">Question 2:</p>
                <p className="mb-3">
                  If you change the value of c in a quadratic function, how does it affect the graph? Does it change the vertex? The axis of symmetry?
                </p>
                <Button variant="outline" className="text-sm">
                  Show Answer
                </Button>
              </div>
              
              <div>
                <p className="mb-2 font-medium">Question 3:</p>
                <p className="mb-3">
                  Describe how you would find the range of a quadratic function using its graph or algebraic form.
                </p>
                <Button variant="outline" className="text-sm">
                  Show Answer
                </Button>
              </div>
              
              <div>
                <p className="mb-2 font-medium">Question 4:</p>
                <p className="mb-3">
                  How does the discriminant help us understand the behavior of a quadratic function graphically?
                </p>
                <Button variant="outline" className="text-sm">
                  Show Answer
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }
    
    if (subjectId === 'mathematics' && 
        (topicId.includes('algebra') || 
         ['indices-and-surds', 'simultaneous-equations', 'inequalities', 'polynomials'].includes(topicId))) {
      
      return (
        <div className="space-y-6">
          <p>
            This is the study content for {title}. Select the "AI" option from the explanation level dropdown to generate dynamic content.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">{title}</h2>
          
          <div className="p-5 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">Key Concepts</h3>
            <p className="mb-3">
              This section covers important concepts related to {title}. Choose the AI-suggested option to generate detailed content.
            </p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex items-center justify-center p-12 text-muted-foreground">
        Content for {title} is being developed.
      </div>
    );
  };
  
  const renderSummary = () => {
    if (generatedContent && shouldGenerateContent) {
      return (
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-medium mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Summary: {title}</h3>
          <AIGeneratedContent 
            content={generatedContent}
            isGenerating={isGeneratingContent}
            topicTitle={title}
          />
        </Card>
      );
    }
  
    return (
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <h3 className="text-xl font-medium mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Summary: {title}</h3>
        <p>Select the "AI" option from the explanation level dropdown to generate a summary.</p>
      </Card>
    );
  };
  
  const renderFlashcards = () => {
    const [currentFlashcard, setCurrentFlashcard] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [knowledgeLevel, setKnowledgeLevel] = useState<'none' | 'somewhat' | 'well'>('none');
    
    const flashcards = [
      {
        question: "What is a quadratic function?",
        answer: "A quadratic function is a polynomial function of the form f(x) = ax² + bx + c, where a ≠ 0, which forms a parabola when graphed.",
        type: "TERM"
      },
      {
        question: "What is the quadratic formula?",
        answer: "x = (-b ± √(b² - 4ac)) / 2a, used to find the roots of a quadratic equation ax² + bx + c = 0.",
        type: "FORMULA"
      },
      {
        question: "What does the discriminant tell us?",
        answer: "The discriminant (b² - 4ac) indicates the number and type of roots: >0 means two distinct real roots, =0 means one repeated root, <0 means no real roots.",
        type: "CONCEPT"
      }
    ];
    
    const knowledgeLevelColors = {
      none: {
        bg: "bg-red-500",
        hover: "hover:bg-red-600",
        text: "text-white"
      },
      somewhat: {
        bg: "bg-orange-400",
        hover: "hover:bg-orange-500",
        text: "text-white"
      },
      well: {
        bg: "bg-green-500",
        hover: "hover:bg-green-600",
        text: "text-white"
      }
    };

    return (
      <div className="space-y-6">
        <Card className={`p-6 relative min-h-[15rem] transition-all duration-700 ${flipped ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-card'}`}>
          <div className="flex justify-between items-center mb-4">
            <div className={`font-medium text-xs px-2 py-1 rounded ${
              flashcards[currentFlashcard].type === "TERM" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" :
              flashcards[currentFlashcard].type === "FORMULA" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
              "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
            }`}>
              {flashcards[currentFlashcard].type}
            </div>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => setFlipped(!flipped)}>
              {flipped ? "Show Question" : "Flip"}
            </Button>
          </div>
          
          <div className="text-xl font-medium mb-8">
            {flipped 
              ? flashcards[currentFlashcard].answer 
              : flashcards[currentFlashcard].question}
          </div>
          
          <div className="mt-8 pt-4 border-t border-border text-center">
            <div className="flex justify-between items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setCurrentFlashcard(prev => (prev === 0 ? flashcards.length - 1 : prev - 1))}
                disabled={currentFlashcard === 0}
                className="text-xs"
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentFlashcard + 1} of {flashcards.length}
              </span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentFlashcard(prev => (prev === flashcards.length - 1 ? 0 : prev + 1))}
                disabled={currentFlashcard === flashcards.length - 1}
                className="text-xs"
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
        
        {flipped && (
          <div className="animate-fade-in">
            <h4 className="text-center mb-3 text-sm font-medium">How well did you know this?</h4>
            <div className="flex justify-between gap-3">
              <button 
                className={`flex-1 py-4 rounded-md flex flex-col items-center justify-center shadow-sm ${knowledgeLevelColors.none.bg} ${knowledgeLevelColors.none.hover} ${knowledgeLevelColors.none.text} transition-colors`}
                onClick={() => setKnowledgeLevel('none')}
              >
                <span className="text-2xl mb-1">😕</span>
                <span className="text-sm font-medium">Not Known</span>
              </button>
              <button 
                className={`flex-1 py-4 rounded-md flex flex-col items-center justify-center shadow-sm ${knowledgeLevelColors.somewhat.bg} ${knowledgeLevelColors.somewhat.hover} ${knowledgeLevelColors.somewhat.text} transition-colors`}
                onClick={() => setKnowledgeLevel('somewhat')}
              >
                <span className="text-2xl mb-1">😐</span>
                <span className="text-sm font-medium">Somewhat</span>
              </button>
              <button 
                className={`flex-1 py-4 rounded-md flex flex-col items-center justify-center shadow-sm ${knowledgeLevelColors.well.bg} ${knowledgeLevelColors.well.hover} ${knowledgeLevelColors.well.text} transition-colors`}
                onClick={() => setKnowledgeLevel('well')}
              >
                <span className="text-2xl mb-1">😊</span>
                <span className="text-sm font-medium">Well Known</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  const renderQuestions = () => {
    if (generatedQuestions) {
      return (
        <div className="space-y-4">
          <MarkdownRenderer markdown={generatedQuestions} />
        </div>
      );
    }
    
    if (isGeneratingQuestions) {
      return (
        <div className="w-full py-10 flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin mb-4 text-blue-500" />
          <p className="text-center text-muted-foreground">
            Generating practice questions...
          </p>
        </div>
      );
    }
    
    if (subjectId === 'mathematics' && 
        (topicId.includes('algebra') || 
         ['indices-and-surds', 'simultaneous-equations', 'inequalities', 'polynomials'].includes(topicId)) &&
        topicId !== 'quadratic-functions') {
      
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <Card className="p-8 text-center max-w-md">
            <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Generate Practice Questions</h3>
            <p className="text-muted-foreground mb-4">
              Click below to generate AI-created practice questions for {title}
            </p>
            <Button 
              onClick={generateQuestionsContent}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Generate Questions
            </Button>
          </Card>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((questionNum) => (
          <Card key={questionNum} className="p-6">
            <div className="flex items-start mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <h4 className="text-lg font-semibold">Question {questionNum}</h4>
            </div>
            
            <p className="mb-4">
              {questionNum === 1 && (
                <>
                  How would the graph of f(x) = 2x² - 4x + 5 differ from the graph of g(x) = -2x² - 4x + 5?
                  Think about the shape, direction, and key points.
                </>
              )}
              {questionNum === 2 && (
                <>
                  The quadratic equation 3x² - kx + 3 = 0 has two distinct real roots. What are the possible values of k?
                </>
              )}
              {questionNum === 3 && (
                <>
                  If a parabola passes through the points (1, 4), (2, 7), and (3, 12), determine the quadratic function in the form f(x) = ax² + bx + c.
                </>
              )}
              {questionNum === 4 && (
                <>
                  A ball is thrown upward with an initial velocity of 20 m/s from a height of 1.5 m. Its height h in meters after t seconds is given by h(t) = -4.9t² + 20t + 1.5. Find the maximum height reached by the ball and when it hits the ground.
                </>
              )}
            </p>

            <div className="space-y-4">
              <textarea
                className="w-full min-h-[100px] p-3 rounded-md border bg-background"
                placeholder="Write your answer here..."
                value={userAnswers[questionNum] || ''}
                onChange={(e) => setUserAnswers(prev => ({...prev, [questionNum]: e.target.value}))}
              />
              
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  className="text-sm"
                  onClick={() => checkAnswer(questionNum, userAnswers[questionNum] || '')}
                  disabled={!userAnswers[questionNum]}
                >
                  Check Answer
                </Button>
                
                {showAnswers[questionNum] && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-muted-foreground"
                    onClick={() => setShowAnswers(prev => ({...prev, [questionNum]: !prev[questionNum]}))}
                  >
                    Show Sample Answer
                  </Button>
                )}
              </div>

              {showAnswers[questionNum] && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Sample answer: {questionNum === 1 && (
                      <>
                        The graph of f(x) opens upward with a minimum point, while g(x) opens downward with a maximum point due to the coefficient of x² being positive (2) and negative (-2) respectively.
                      </>
                    )}
                    {questionNum === 2 && (
                      <>
                        |k| &gt; 6 (i.e., k &lt; -6 or k &gt; 6)
                      </>
                    )}
                    {questionNum === 3 && (
                      <>
                        f(x) = x² + 2x + 1
                      </>
                    )}
                    {questionNum === 4 && (
                      <>
                        Maximum height: 20.9m at t = 2.04s; hits ground at t = 4.2s
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    );
  };
  
  const renderAITutor = () => {
    return (
      <div className="flex flex-col h-full">
        <AITutorChat topicId={topicId} topicTitle={title} />
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <nav className="flex items-center space-x-1 p-4 border-b border-border text-sm">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.id}>
            {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />}
            <a 
              href={crumb.path} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {crumb.title}
            </a>
          </React.Fragment>
        ))}
      </nav>
      
      <div className="border-b border-border p-4 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        
        <div className="flex items-center space-x-2">
          <Select value={explanationLevel} onValueChange={setExplanationLevel}>
            <SelectTrigger className="w-44 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <SelectValue placeholder="Explanation Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple">Simple</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="ai">AI Suggested</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="border-b border-border">
            <TabsList className="px-4 h-auto py-1">
              <TabsTrigger value="content" className="flex items-center">
                <Book className="w-4 h-4 mr-2" />
                Content
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Tutor
              </TabsTrigger>
              <TabsTrigger value="summary" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Summary
              </TabsTrigger>
              <TabsTrigger value="flashcards" className="flex items-center">
                <StickyNote className="w-4 h-4 mr-2" />
                Flashcards
              </TabsTrigger>
              <TabsTrigger value="questions" className="flex items-center">
                <HelpCircle className="w-4 h-4 mr-2" />
                Questions
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-hidden p-6">
            <div className="max-w-3xl mx-auto h-full">
              <TabsContent value="content" className="mt-0 h-full">
                <ContentRenderer content={getContent()} />
              </TabsContent>
              
              <TabsContent value="ai" className="mt-0 h-full">
                <ContentRenderer content={renderAITutor()} />
              </TabsContent>
              
              <TabsContent value="summary" className="mt-0 h-full">
                <ContentRenderer content={renderSummary()} />
              </TabsContent>
              
              <TabsContent value="flashcards" className="mt-0 h-full">
                <ContentRenderer content={renderFlashcards()} />
              </TabsContent>
              
              <TabsContent value="questions" className="mt-0 h-full">
                <ContentRenderer content={renderQuestions()} />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
      
      <div className="mt-auto p-4 border-t border-border flex items-center justify-between">
        {prevTopic ? (
          <Button 
            variant="ghost" 
            className="flex items-center text-sm"
            onClick={() => window.location.href = prevTopic.path}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Previous: {prevTopic.title}</span>
          </Button>
        ) : (
          <div></div>
        )}
        
        {nextTopic && (
          <Button 
            variant="ghost" 
            className="flex items-center text-sm"
            onClick={() => window.location.href = nextTopic.path}
          >
            <span>Next: {nextTopic.title}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
