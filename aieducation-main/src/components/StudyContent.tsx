import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, ArrowRight, Book, HelpCircle, FileText, StickyNote, CircleHelp, Medal, CheckCircle, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { commonStudyTips } from './scheduler/StudyTips';

interface StudyContentProps {
  title: string;
  content: React.ReactNode;
  breadcrumbs: {
    id: string;
    title: string;
    path: string;
  }[];
  prevLesson?: {
    id: string;
    title: string;
    path: string;
  };
  nextLesson?: {
    id: string;
    title: string;
    path: string;
  };
}

const StudyContent = ({ title, content, breadcrumbs, prevLesson, nextLesson }: StudyContentProps) => {
  const [showTermDefinition, setShowTermDefinition] = useState<Record<string, boolean>>({});
  const [explanationLevel, setExplanationLevel] = useState('medium');
  const [activeTab, setActiveTab] = useState('content');
  const [highlightedTerms, setHighlightedTerms] = useState<Record<string, boolean>>({});
  
  const toggleTermDefinition = (termId: string) => {
    setShowTermDefinition(prev => {
      const newState = {
        ...prev,
        [termId]: !prev[termId]
      };
      return newState;
    });
    
    setHighlightedTerms(prev => ({
      ...prev,
      [termId]: true
    }));
  };

  const closeDefinition = (termId: string) => {
    setShowTermDefinition(prev => ({
      ...prev,
      [termId]: false
    }));
  };
  
  const HighlightTerm = ({ 
    id, 
    children, 
    color = 'blue',
    explanation,
    detailedExplanation
  }: { 
    id: string; 
    children: React.ReactNode; 
    color?: 'blue' | 'green' | 'orange';
    explanation?: string;
    detailedExplanation?: React.ReactNode;
  }) => {
    const colorClasses = {
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/50',
      green: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-900/50',
      orange: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900/50',
    };
    
    const wasHighlighted = highlightedTerms[id];
    
    return (
      <span className="relative inline-block">
        <button
          onClick={() => toggleTermDefinition(id)}
          className={`highlight-term ${colorClasses[color]} ${
            wasHighlighted ? 'outline outline-2 outline-offset-1 outline-blue-400' : ''
          }`}
        >
          {children}
        </button>
        
        {showTermDefinition[id] && (
          <div className="absolute z-10 left-0 top-full mt-1 w-80 p-4 bg-card border border-border rounded-lg shadow-lg animate-fade-in">
            <div className="flex justify-between items-start mb-2">
              <div className="font-semibold text-blue">{id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  closeDefinition(id);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
            
            <div className="text-sm">
              <p className="text-foreground/80 mb-3">
                {explanation || getExplanation(id)}
              </p>
              
              <div className="flex justify-between items-center">
                <button 
                  className="text-xs flex items-center text-blue hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab('detailed-explanation');
                    closeDefinition(id);
                  }}
                >
                  <CircleHelp className="w-3 h-3 mr-1" />
                  Detailed Explanation
                </button>
                
                <div className="text-xs text-muted-foreground">
                  Click outside to close
                </div>
              </div>
            </div>
          </div>
        )}
      </span>
    );
  };
  
  const getExplanation = (id: string) => {
    const explanations: Record<string, string> = {
      'quadratic-formula': 'The formula x = (-b ± √(b² - 4ac)) / 2a used to solve quadratic equations in the form ax² + bx + c = 0.',
      'function': 'A mathematical relationship that assigns exactly one output value to each input value, usually written as f(x).',
      'parabola': 'A U-shaped curve that represents the graph of a quadratic function, such as y = x².',
      'minimum-value': 'The lowest point on a parabola when it opens upward (a > 0).',
      'maximum-value': 'The highest point on a parabola when it opens downward (a < 0).',
      'vertex': 'The point where a parabola changes direction, representing either a minimum or maximum value.',
      'axis-of-symmetry': 'A vertical line passing through the vertex of a parabola about which the parabola is symmetric.'
    };
    
    return explanations[id] || `Definition for ${id.replace(/-/g, ' ')}`;
  };
  
  const renderSummary = () => (
    <div className="p-4 border border-border rounded-lg bg-muted/20">
      <h3 className="text-xl font-medium mb-3">Summary: {title}</h3>
      <ul className="space-y-2">
        <li className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
          <span>A quadratic function has the form f(x) = ax² + bx + c where a ≠ 0.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
          <span>The graph of a quadratic function is a parabola, opening upward when a {">"} 0 and downward when a {"<"} 0.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
          <span>The vertex is at (-b/2a, f(-b/2a)) and represents either a minimum or maximum.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
          <span>The axis of symmetry is the vertical line x = -b/2a.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
          <span>The discriminant b² - 4ac determines the number of roots: two distinct real roots if positive, one real root if zero, or no real roots if negative.</span>
        </li>
      </ul>
    </div>
  );
  
  const renderFlashcards = () => {
    return (
      <div className="space-y-4">
        <div className="p-6 border border-border rounded-lg bg-card shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="font-medium text-muted-foreground">TERM</div>
            <button className="text-xs text-blue hover:underline">Flip All</button>
          </div>
          <div className="text-xl font-medium">What is a quadratic function?</div>
          <div className="mt-4 pt-4 border-t border-border text-muted-foreground text-sm">
            Click to reveal answer
          </div>
        </div>
        
        <div className="p-6 border border-border rounded-lg bg-card shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="font-medium text-muted-foreground">FORMULA</div>
            <button className="text-xs text-blue hover:underline">Flip All</button>
          </div>
          <div className="text-xl font-medium">What is the quadratic formula?</div>
          <div className="mt-4 pt-4 border-t border-border text-muted-foreground text-sm">
            Click to reveal answer
          </div>
        </div>
        
        <div className="p-6 border border-border rounded-lg bg-card shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="font-medium text-muted-foreground">CONCEPT</div>
            <button className="text-xs text-blue hover:underline">Flip All</button>
          </div>
          <div className="text-xl font-medium">What does the discriminant tell us about a quadratic equation?</div>
          <div className="mt-4 pt-4 border-t border-border text-muted-foreground text-sm">
            Click to reveal answer
          </div>
        </div>
      </div>
    );
  };
  
  const renderInteractiveQuestions = () => {
    return (
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-start mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
              <HelpCircle className="w-5 h-5 text-blue" />
            </div>
            <h4 className="text-lg font-semibold">Question 1</h4>
          </div>
          <p className="mb-3">
            How would the graph of f(x) = 2x² - 4x + 5 differ from the graph of g(x) = -2x² - 4x + 5? 
            Think about the shape, direction, and key points.
          </p>
          <Button variant="outline" className="text-sm">
            Show Answer
          </Button>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-start mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
              <Medal className="w-5 h-5 text-blue" />
            </div>
            <h4 className="text-lg font-semibold">Challenge Problem</h4>
          </div>
          <p className="mb-3">
            Find the values of k for which the quadratic equation x² + kx + 4 = 0 has exactly one solution.
          </p>
          <Button variant="outline" className="text-sm">
            Show Answer
          </Button>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-start mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
              <HelpCircle className="w-5 h-5 text-blue" />
            </div>
            <h4 className="text-lg font-semibold">Question 2</h4>
          </div>
          <p className="mb-3">
            The quadratic equation 3x² - kx + 3 = 0 has two distinct real roots. What are the possible values of k?
          </p>
          <Button variant="outline" className="text-sm">
            Show Answer
          </Button>
        </div>
      </div>
    );
  };
  
  const renderDetailedExplanation = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Detailed Explanation: Quadratic Functions</h2>
        
        <div className="bg-muted/30 border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Interactive Graph</h3>
          <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="mb-2 text-lg font-medium">Interactive Graph</div>
              <div className="text-muted-foreground text-sm">
                Adjust parameters to see how they affect the quadratic function
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Parameter a:</label>
              <div className="flex items-center">
                <input type="range" min="-5" max="5" step="0.1" defaultValue="1" className="w-full" />
                <span className="ml-2 w-8 text-center">1.0</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Parameter b:</label>
              <div className="flex items-center">
                <input type="range" min="-10" max="10" step="0.5" defaultValue="0" className="w-full" />
                <span className="ml-2 w-8 text-center">0.0</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Parameter c:</label>
              <div className="flex items-center">
                <input type="range" min="-10" max="10" step="0.5" defaultValue="0" className="w-full" />
                <span className="ml-2 w-8 text-center">0.0</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Mathematical Proof</h3>
          <p>
            Let's derive the quadratic formula by completing the square for a general quadratic equation ax² + bx + c = 0, where a ≠ 0.
          </p>
          
          <div className="space-y-2 p-4 bg-card border border-border rounded-lg">
            <p>Step 1: Divide all terms by a (the coefficient of x²).</p>
            <p className="font-medium text-center">x² + (b/a)x + (c/a) = 0</p>
            
            <p>Step 2: Rearrange to prepare for completing the square.</p>
            <p className="font-medium text-center">x² + (b/a)x = -(c/a)</p>
            
            <p>Step 3: Complete the square for the terms on the left side.</p>
            <p className="font-medium text-center">x² + (b/a)x + (b/2a)² = -(c/a) + (b/2a)²</p>
            <p className="font-medium text-center">(x + b/2a)² = (b²/4a² - c/a)</p>
            <p className="font-medium text-center">(x + b/2a)² = (b² - 4ac)/4a²</p>
            
            <p>Step 4: Take the square root of both sides.</p>
            <p className="font-medium text-center">x + b/2a = ±√(b² - 4ac)/2a</p>
            
            <p>Step 5: Solve for x.</p>
            <p className="font-medium text-center">x = -b/2a ± √(b² - 4ac)/2a</p>
            <p className="font-medium text-center">x = (-b ± √(b² - 4ac))/2a</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4">Educational Video</h3>
          <div className="w-full h-72 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="mb-2 text-lg font-medium">Video Content</div>
              <div className="text-muted-foreground text-sm">
                Educational video explaining quadratic functions in detail
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={() => setActiveTab('content')} 
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Main Content
        </Button>
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
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {crumb.title}
            </a>
          </React.Fragment>
        ))}
      </nav>
      
      <div className="border-b border-border p-4 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <Select value={explanationLevel} onValueChange={setExplanationLevel}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Explanation Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ai">AI-Suggestion</SelectItem>
              <SelectItem value="simple">Simple</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="interactive">More Interactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="border-b border-border">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="pl-4">
            <TabsTrigger value="content" className="flex items-center">
              <Book className="w-4 h-4 mr-2" />
              Content
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
            <TabsTrigger value="detailed-explanation" className="flex items-center">
              <CircleHelp className="w-4 h-4 mr-2" />
              Details
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-3xl">
          <TabsContent value="content" className="mt-0">
            {content || (
              <>
                <p>
                  In this lesson, we'll explore quadratic functions and how they form the foundation of many mathematical concepts. A <HighlightTerm id="function">function</HighlightTerm> is a mathematical relationship that assigns exactly one output value to each input value.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Quadratic Functions</h2>
                
                <p>
                  A quadratic function has the form f(x) = ax² + bx + c, where a, b, and c are constants and a ≠ 0. The graph of a quadratic function is called a <HighlightTerm 
                    id="parabola" 
                    color="green"
                    explanation="A U-shaped curve that is the graph of a quadratic function. Every point on a parabola is equidistant from a fixed point (focus) and a fixed line (directrix)."
                  >parabola</HighlightTerm>.
                </p>
                
                <div className="my-6 w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2 text-lg font-medium">Interactive Graph</div>
                    <div className="text-muted-foreground text-sm">Visualization of y = x² + 2x - 3</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mt-6 mb-4">Key Features of Quadratic Functions</h3>
                
                <ul className="space-y-3">
                  <li>
                    <strong>Shape and Direction:</strong> When a {">"} 0, the parabola opens upward (U-shaped) and has a <HighlightTerm id="minimum-value" color="orange">minimum value</HighlightTerm>. When a {"<"} 0, the parabola opens downward (inverted U-shaped) and has a <HighlightTerm id="maximum-value" color="orange">maximum value</HighlightTerm>.
                  </li>
                  <li>
                    <strong>Vertex:</strong> The <HighlightTerm id="vertex">vertex</HighlightTerm> is the point where the parabola changes direction. For a quadratic function in the form f(x) = ax² + bx + c, the x-coordinate of the vertex is x = -b/(2a).
                  </li>
                  <li>
                    <strong>Axis of Symmetry:</strong> The parabola is symmetric about a vertical line passing through the vertex, called the <HighlightTerm id="axis-of-symmetry">axis of symmetry</HighlightTerm>.
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
                  To find the roots of a quadratic equation (where the function equals zero), we can use the <HighlightTerm id="quadratic-formula" color="orange">quadratic formula</HighlightTerm>:
                </p>
                
                <div className="my-4 p-4 bg-blue/5 border border-blue/10 rounded-lg text-center">
                  <div className="text-xl text-blue-600 dark:text-blue-400 font-medium">
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
                  <li>If b² - 4ac {">"} 0, the equation has two distinct real roots.</li>
                  <li>If b² - 4ac = 0, the equation has exactly one real root (a repeated root).</li>
                  <li>If b² - 4ac {"<"} 0, the equation has no real roots (but two complex conjugate roots).</li>
                </ul>
                
                <div className="mt-8 bg-card border border-border rounded-lg p-5">
                  <div className="flex items-start mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <HelpCircle className="w-5 h-5 text-blue" />
                    </div>
                    <h4 className="text-lg font-semibold">Reflection Question</h4>
                  </div>
                  <p className="mb-3">
                    How would the graph of f(x) = 2x² - 4x + 5 differ from the graph of g(x) = -2x² - 4x + 5? Think about the shape, direction, and key points.
                  </p>
                  <button className="button-primary text-sm">
                    Show Answer
                  </button>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="summary" className="mt-0">
            {renderSummary()}
          </TabsContent>
          
          <TabsContent value="flashcards" className="mt-0">
            {renderFlashcards()}
          </TabsContent>
          
          <TabsContent value="questions" className="mt-0">
            {renderInteractiveQuestions()}
          </TabsContent>
          
          <TabsContent value="detailed-explanation" className="mt-0">
            {renderDetailedExplanation()}
          </TabsContent>
        </div>
      </div>
      
      <div className="p-4 border-t border-border flex items-center justify-between">
        {prevLesson ? (
          <a 
            href={prevLesson.path} 
            className="flex items-center text-sm font-medium text-blue hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Previous: {prevLesson.title}</span>
          </a>
        ) : (
          <div></div>
        )}
        
        {nextLesson && (
          <a 
            href={nextLesson.path} 
            className="flex items-center text-sm font-medium text-blue hover:underline"
          >
            <span>Next: {nextLesson.title}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        )}
      </div>
    </div>
  );
};

export default StudyContent;
