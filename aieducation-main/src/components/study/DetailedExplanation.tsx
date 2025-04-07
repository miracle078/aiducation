
import React, { useState } from 'react';
import { ArrowLeft, ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { Button } from '../ui/button';
import { InteractiveFunctionGraph } from './InteractiveFunctionGraph';
import { useToast } from '@/hooks/use-toast';

interface DetailedExplanationProps {
  title: string;
  onBack: () => void;
  term?: string;
  content?: React.ReactNode;
  onClose?: () => void;
}

export function DetailedExplanation({ title, onBack, term, content, onClose }: DetailedExplanationProps) {
  const { toast } = useToast();
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  
  const handleClose = onClose || onBack;

  const handleFeedback = (isPositive: boolean) => {
    if (feedbackGiven) return;
    
    setFeedbackGiven(true);
    toast({
      title: "Thanks for your feedback!",
      description: isPositive 
        ? "We're glad you found this explanation helpful." 
        : "We'll work on improving this explanation.",
      variant: "default",
      className: isPositive ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200",
    });
  };

  const renderContentForTerm = () => {
    if (term === 'function') {
      return (
        <div 
          className="prose dark:prose-invert prose-blue max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: `
              <div class="container">
                <h1>Understanding Functions in Mathematics</h1>
                
                <div class="section">
                    <h2>What is a Function?</h2>
                    <p>A function is a special relationship between inputs and outputs where each input has exactly one output. Think of a function as a machine that takes an input value, processes it according to a specific rule, and produces an output value.</p>
                    
                    <div class="function-machine" style="display: flex; align-items: center; justify-content: center; gap: 20px; margin: 30px 0;">
                        <div class="input-box" id="input-value" style="padding: 10px; width: 80px; text-align: center; border: 2px solid #2c3e50; border-radius: 5px; font-weight: bold; font-size: 18px;">x</div>
                        <div class="arrow" style="width: 80px; height: 20px; background-color: #2c3e50; position: relative;"></div>
                        <div class="function-box" style="width: 150px; height: 100px; background-color: #3498db; color: white; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-weight: bold; font-size: 18px; position: relative;">f(x) = 2x + 3</div>
                        <div class="arrow" style="width: 80px; height: 20px; background-color: #2c3e50; position: relative;"></div>
                        <div class="output-box" id="output-value" style="padding::10px; width: 80px; text-align: center; border: 2px solid #2c3e50; border-radius: 5px; font-weight: bold; font-size: 18px;">?</div>
                    </div>
                    
                    <p>In the above example, the function f(x) = 2x + 3 takes an input value x, multiplies it by 2, and then adds 3 to get the output.</p>
                </div>
                
                <div class="section">
                    <h2>Key Characteristics of Functions</h2>
                    <ul>
                        <li><strong>One output per input:</strong> Each input value can only produce one output value.</li>
                        <li><strong>Domain:</strong> The set of all possible input values.</li>
                        <li><strong>Range:</strong> The set of all possible output values.</li>
                        <li><strong>Function notation:</strong> We write f(x) to denote "the value of the function f at input x".</li>
                    </ul>
                    
                    <h3>Function Representations</h3>
                    <p>Functions can be represented in multiple ways:</p>
                    <ol>
                        <li><strong>Equation form:</strong> f(x) = 2x + 3</li>
                        <li><strong>Table form:</strong></li>
                    </ol>
                    
                    <table class="w-full border-collapse my-4" style="border: 1px solid #ddd;">
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: center;">x (Input)</th>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">-2</td>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">-1</td>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">2</td>
                        </tr>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: center;">f(x) (Output)</th>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">-1</td>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">3</td>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">5</td>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">7</td>
                        </tr>
                    </table>
                </div>
                
                <div class="section">
                    <h2>Real-World Examples of Functions</h2>
                    
                    <div style="display: flex; flex-wrap: wrap; gap: 20px; margin: 20px 0;">
                        <div style="flex: 1 1 300px; border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #f9f9f9;">
                            <h4 style="margin-top: 0; color: #3498db;">Temperature Conversion</h4>
                            <p>The function F(C) = (9/5)C + 32 converts temperature from Celsius to Fahrenheit.</p>
                        </div>
                        
                        <div style="flex: 1 1 300px; border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #f9f9f9;">
                            <h4 style="margin-top: 0; color: #3498db;">Distance-Time Relationship</h4>
                            <p>If you travel at a constant speed of 60 km/h, the function d(t) = 60t gives the distance traveled in t hours.</p>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <h2>Educational Video Resources</h2>
                    
                    <div style="background-color: #f5f5f5; border-left: 4px solid #3498db; padding: 15px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #3498db;">Recommended Videos to Learn More About Functions</h3>
                        <p>These educational videos will help enhance your understanding of functions:</p>
                        
                        <a href="https://www.youtube.com/watch?v=kvGsIo1TmsM" style="display: block; margin: 10px 0; color: #2c3e50; text-decoration: none; padding: 8px; background-color: #e8f4fc; border-radius: 4px; transition: background-color 0.2s;" target="_blank">
                            <strong>🎬 What is a Function?</strong> - Khan Academy
                            <p style="margin: 5px 0 0 0;">A clear introduction to the concept of functions and how they work.</p>
                        </a>
                        
                        <a href="https://www.youtube.com/watch?v=C6F33Ir-sY4" style="display: block; margin: 10px 0; color: #2c3e50; text-decoration: none; padding: 8px; background-color: #e8f4fc; border-radius: 4px; transition: background-color 0.2s;" target="_blank">
                            <strong>🎬 Introduction to Function Transformations</strong> - Khan Academy
                            <p style="margin: 5px 0 0 0;">Learn how to transform functions by shifting, stretching, and reflecting.</p>
                        </a>
                    </div>
                </div>
                
                <div class="section">
                    <h2>Check Your Understanding</h2>
                    
                    <div style="margin: 20px 0;">
                        <div style="margin-bottom: 15px;">
                            <h3>Question 1:</h3>
                            <p>If f(x) = 3x + 4, what is f(2)?</p>
                            <div style="margin: 10px 0;">
                                <div style="padding: 10px; background-color: #f1f1f1; border-radius: 5px; margin-bottom: 8px;">a) 7</div>
                                <div style="padding: 10px; background-color: #f1f1f1; border-radius: 5px; margin-bottom: 8px;">b) 8</div>
                                <div style="padding: 10px; background-color: #a8d5ff; border-radius: 5px; margin-bottom: 8px;">c) 10 ✓</div>
                                <div style="padding: 10px; background-color: #f1f1f1; border-radius: 5px; margin-bottom: 8px;">d) 14</div>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <h3>Question 2:</h3>
                            <p>Which of the following is NOT a function?</p>
                            <div style="margin: 10px 0;">
                                <div style="padding: 10px; background-color: #f1f1f1; border-radius: 5px; margin-bottom: 8px;">a) y = x²</div>
                                <div style="padding: 10px; background-color: #f1f1f1; border-radius: 5px; margin-bottom: 8px;">b) y = |x|</div>
                                <div style="padding: 10px; background-color: #a8d5ff; border-radius: 5px; margin-bottom: 8px;">c) x = y² ✓</div>
                                <div style="padding: 10px; background-color: #f1f1f1; border-radius: 5px; margin-bottom: 8px;">d) y = 2ˣ</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
          }}
        />
      );
    }
    
    return (
      <div className="prose dark:prose-invert prose-blue max-w-none">
        <h1>Quadratic Functions: Detailed Explanation</h1>
        
        <p>
          A quadratic function is a type of polynomial function where the highest exponent of the variable is 2. The standard form of a quadratic function is:
        </p>
        
        <div className="my-4 p-4 bg-primary/5 border border-primary/10 rounded-lg text-center">
          <div className="text-xl text-primary font-medium">
            f(x) = ax² + bx + c
          </div>
        </div>
        
        <p>
          Where a, b, and c are constants and a ≠ 0. The graph of a quadratic function is a parabola, which is a U-shaped curve that can open upward or downward depending on the sign of the coefficient a.
        </p>
        
        <h2>Interactive Exploration</h2>
        
        <p>
          Use the interactive tool below to explore how changing the parameters a, b, and c affects the quadratic function. Drag the sliders to see the graph update in real-time.
        </p>
        
        <div className="my-6 border rounded-lg bg-card/50 p-4">
          <InteractiveFunctionGraph containerId="detailed-interactive-graph" className="mb-4" />
        </div>
        
        <h2>Key Characteristics of Quadratic Functions</h2>
        
        <h3>The Vertex</h3>
        <p>
          The vertex is the highest or lowest point on the parabola, depending on whether the parabola opens downward or upward. For a quadratic function in the form f(x) = ax² + bx + c:
        </p>
        <ul>
          <li>The x-coordinate of the vertex is x = -b/(2a)</li>
          <li>The y-coordinate of the vertex is f(-b/(2a))</li>
          <li>If a {`>`} 0, the vertex is a minimum point</li>
          <li>If a {`<`} 0, the vertex is a maximum point</li>
        </ul>
        
        <h3>The Axis of Symmetry</h3>
        <p>
          The axis of symmetry is a vertical line that passes through the vertex. For any point on the parabola, there is a corresponding point on the other side of the axis of symmetry. The equation of the axis of symmetry is:
        </p>
        <div className="my-4 p-4 bg-primary/5 border border-primary/10 rounded-lg text-center">
          <div className="text-lg text-primary font-medium">
            x = -b/(2a)
          </div>
        </div>
        
        <h3>Intercepts</h3>
        <p>
          The y-intercept is the point where the parabola crosses the y-axis. This occurs when x = 0, so the y-intercept is at (0, c).
        </p>
        <p>
          The x-intercepts are the points where the parabola crosses the x-axis. These occur when f(x) = 0, so they can be found by solving the quadratic equation ax² + bx + c = 0. Using the quadratic formula:
        </p>
        <div className="my-4 p-4 bg-primary/5 border border-primary/10 rounded-lg text-center">
          <div className="text-lg text-primary font-medium">
            x = (-b ± √(b² - 4ac)) / 2a
          </div>
        </div>
        
        <h3>The Discriminant</h3>
        <p>
          The expression b² - 4ac is called the discriminant, and it determines the number of real roots (x-intercepts) that the quadratic equation has:
        </p>
        <ul>
          <li>If b² - 4ac {`>`} 0, the quadratic equation has two distinct real roots (the parabola crosses the x-axis at two points)</li>
          <li>If b² - 4ac = 0, the quadratic equation has one repeated real root (the parabola is tangent to the x-axis at one point)</li>
          <li>If b² - 4ac {`<`} 0, the quadratic equation has no real roots (the parabola does not cross the x-axis)</li>
        </ul>
        
        <h2>Transformations of Quadratic Functions</h2>
        
        <p>
          Starting with the basic quadratic function f(x) = x², we can apply various transformations:
        </p>
        <ul>
          <li><strong>Vertical stretch or compression:</strong> f(x) = ax² (|a| {`>`} 1 stretches, 0 {`<`} |a| {`<`} 1 compresses)</li>
          <li><strong>Reflection across the x-axis:</strong> f(x) = -x² (flips the parabola upside down)</li>
          <li><strong>Horizontal shift:</strong> f(x) = a(x - h)² shifts the parabola h units to the right (if h {`>`} 0) or left (if h {`<`} 0)</li>
          <li><strong>Vertical shift:</strong> f(x) = ax² + k shifts the parabola k units up (if k {`>`} 0) or down (if k {`<`} 0)</li>
        </ul>
        <p>
          The vertex form of a quadratic function, f(x) = a(x - h)² + k, makes these transformations explicit, where (h, k) is the vertex.
        </p>
        
        <h2>Applications of Quadratic Functions</h2>
        
        <p>
          Quadratic functions appear in many real-world scenarios:
        </p>
        <ul>
          <li><strong>Physics:</strong> Projectile motion (position as a function of time)</li>
          <li><strong>Economics:</strong> Profit, revenue, and cost functions</li>
          <li><strong>Geometry:</strong> Area as a function of length or width</li>
          <li><strong>Engineering:</strong> Design of parabolic structures (e.g., satellite dishes, bridges)</li>
        </ul>
        
        <h2>Check Your Understanding</h2>
        
        <div className="space-y-6 my-6">
          <div className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between mb-2">
              <p className="font-medium">Question 1:</p>
              <Button variant="outline" size="sm" className="h-7">
                Show Answer
              </Button>
            </div>
            <p>
              A quadratic function has a y-intercept at (0, 3), and its graph passes through the point (2, 7). If the coefficient a = 1, what is the complete function?
            </p>
          </div>
          
          <div className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between mb-2">
              <p className="font-medium">Question 2:</p>
              <Button variant="outline" size="sm" className="h-7">
                Show Answer
              </Button>
            </div>
            <p>
              The vertex of a parabola is at (-1, 4) and it passes through the point (1, 0). Write the quadratic function in vertex form and standard form.
            </p>
          </div>
          
          <div className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between mb-2">
              <p className="font-medium">Question 3:</p>
              <Button variant="outline" size="sm" className="h-7">
                Show Answer
              </Button>
            </div>
            <p>
              For the function f(x) = 2x² - 8x + 6, find the vertex, axis of symmetry, y-intercept, and x-intercepts.
            </p>
          </div>
          
          <div className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between mb-2">
              <p className="font-medium">Question 4:</p>
              <Button variant="outline" size="sm" className="h-7">
                Show Answer
              </Button>
            </div>
            <p>
              A ball is thrown upward with an initial velocity of 20 m/s from a height of 1.5 m. Its height h in meters after t seconds is given by h(t) = -4.9t² + 20t + 1.5. When does the ball reach its maximum height, and what is that height?
            </p>
          </div>
          
          <div className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between mb-2">
              <p className="font-medium">Question 5:</p>
              <Button variant="outline" size="sm" className="h-7">
                Show Answer
              </Button>
            </div>
            <p>
              Explain how changing the value of a in a quadratic function affects the width and direction of the parabola. Provide examples to illustrate your explanation.
            </p>
          </div>
          
          <div className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between mb-2">
              <p className="font-medium">Question 6:</p>
              <Button variant="outline" size="sm" className="h-7">
                Show Answer
              </Button>
            </div>
            <p>
              How does the discriminant help us understand the behavior of a quadratic function graphically? Explain with examples.
            </p>
          </div>
          
          <div className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between mb-2">
              <p className="font-medium">Question 7:</p>
              <Button variant="outline" size="sm" className="h-7">
                Show Answer
              </Button>
            </div>
            <p>
              Convert the quadratic function f(x) = 3x² - 12x + 8 to vertex form. Explain what information about the function becomes more apparent in this form.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-medium text-lg">{title}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          {onClose && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 bg-white/95 dark:bg-black/95">
        {content || renderContentForTerm()}
      </div>
      
      <div className="p-4 border-t flex justify-end">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => handleFeedback(true)}
            disabled={feedbackGiven}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>Helpful</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => handleFeedback(false)}
            disabled={feedbackGiven}
          >
            <ThumbsDown className="h-4 w-4" />
            <span>Not Helpful</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
