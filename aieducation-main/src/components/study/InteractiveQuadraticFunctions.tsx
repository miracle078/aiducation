
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InteractiveQuadraticFunctions = () => {
  // State for the quadratic function parameters
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  
  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationParameter, setAnimationParameter] = useState('a');
  const [animationValue, setAnimationValue] = useState(1);
  const [animationDirection, setAnimationDirection] = useState(1);
  
  // Display settings
  const [showVertex, setShowVertex] = useState(true);
  const [showRoots, setShowRoots] = useState(true);
  const [showAxis, setShowAxis] = useState(true);
  const [activeSection, setActiveSection] = useState('intro');
  
  // Calculate important points
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;
  
  const discriminant = b * b - 4 * a * c;
  const hasRealRoots = discriminant >= 0;
  const root1 = hasRealRoots ? (-b + Math.sqrt(discriminant)) / (2 * a) : null;
  const root2 = hasRealRoots ? (-b - Math.sqrt(discriminant)) / (2 * a) : null;
  
  // Animation effect
  useEffect(() => {
    let animationFrame: number | undefined;
    if (isAnimating) {
      const animate = () => {
        setAnimationValue(prev => {
          const newValue = prev + (0.05 * animationDirection);
          
          // Change direction when reaching limits
          if ((animationDirection > 0 && newValue > 3) || 
              (animationDirection < 0 && newValue < -3)) {
            setAnimationDirection(prev => -prev);
          }
          
          // Update the actual parameter being animated
          if (animationParameter === 'a') {
            setA(newValue);
          } else if (animationParameter === 'b') {
            setB(newValue);
          } else if (animationParameter === 'c') {
            setC(newValue);
          }
          
          return newValue;
        });
        
        animationFrame = requestAnimationFrame(animate);
      };
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isAnimating, animationParameter, animationDirection]);
  
  // Generate graph data points
  const generateData = () => {
    const data = [];
    const start = vertexX - 5;
    const end = vertexX + 5;
    
    for (let x = start; x <= end; x += 0.2) {
      const y = a * x * x + b * x + c;
      data.push({ x, y });
    }
    
    return data;
  };
  
  // Format numbers for display
  const formatNumber = (num: number) => {
    return parseFloat(num.toFixed(2));
  };
  
  // Toggle animation
  const toggleAnimation = (param: string) => {
    if (isAnimating && animationParameter === param) {
      setIsAnimating(false);
    } else {
      setAnimationParameter(param);
      setAnimationValue(param === 'a' ? a : param === 'b' ? b : c);
      setIsAnimating(true);
    }
  };
  
  // Format the function expression
  const formatExpression = () => {
    let expr = `f(x) = `;
    
    if (a !== 0) {
      expr += a === 1 ? 'x²' : a === -1 ? '-x²' : `${formatNumber(a)}x²`;
    }
    
    if (b !== 0) {
      const bSign = b > 0 ? (a !== 0 ? ' + ' : '') : ' - ';
      const bValue = Math.abs(b) === 1 ? 'x' : `${formatNumber(Math.abs(b))}x`;
      expr += `${bSign}${bValue}`;
    }
    
    if (c !== 0 || (a === 0 && b === 0)) {
      const cSign = c > 0 ? ((a !== 0 || b !== 0) ? ' + ' : '') : ' - ';
      expr += `${cSign}${formatNumber(Math.abs(c))}`;
    }
    
    return expr;
  };
  
  // Section navigation
  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'standard', title: 'Standard Form' },
    { id: 'vertex', title: 'Vertex' },
    { id: 'roots', title: 'Roots' },
    { id: 'forms', title: 'Different Forms' },
    { id: 'applications', title: 'Real-World Uses' },
  ];
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-background rounded-lg shadow-sm border">
      <h1 className="text-3xl font-bold text-blue-600 mb-3 text-center">Understanding Quadratic Functions</h1>
      <p className="text-muted-foreground mb-6 text-center">An interactive guide to understanding y = ax² + bx + c</p>
      
      {/* Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {sections.map(section => (
          <button
            key={section.id}
            className={`px-3 py-1 rounded-full text-sm ${
              activeSection === section.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-muted text-muted-foreground hover:bg-gray-300'
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.title}
          </button>
        ))}
      </div>
      
      {/* Interactive Graph Section */}
      <div className="mb-8 p-4 bg-muted/40 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Interactive Graph</h2>
        
        <div className="mb-4">
          <p className="font-medium text-lg">{formatExpression()}</p>
        </div>
        
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <div className="flex justify-between mb-1">
              <label>a = {formatNumber(a)}</label>
              <button 
                className={`text-xs px-2 py-0.5 rounded ${isAnimating && animationParameter === 'a' ? 'bg-red-500 text-white' : 'bg-blue-100 hover:bg-blue-200'}`}
                onClick={() => toggleAnimation('a')}
              >
                {isAnimating && animationParameter === 'a' ? 'Stop' : 'Animate'}
              </button>
            </div>
            <input
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={a}
              onChange={(e) => { 
                if (!isAnimating || animationParameter !== 'a') {
                  setA(parseFloat(e.target.value));
                }
              }}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">Controls how wide or narrow the parabola is</p>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label>b = {formatNumber(b)}</label>
              <button 
                className={`text-xs px-2 py-0.5 rounded ${isAnimating && animationParameter === 'b' ? 'bg-red-500 text-white' : 'bg-blue-100 hover:bg-blue-200'}`}
                onClick={() => toggleAnimation('b')}
              >
                {isAnimating && animationParameter === 'b' ? 'Stop' : 'Animate'}
              </button>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={b}
              onChange={(e) => {
                if (!isAnimating || animationParameter !== 'b') {
                  setB(parseFloat(e.target.value));
                }
              }}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">Controls the left-right shift of the parabola</p>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label>c = {formatNumber(c)}</label>
              <button 
                className={`text-xs px-2 py-0.5 rounded ${isAnimating && animationParameter === 'c' ? 'bg-red-500 text-white' : 'bg-blue-100 hover:bg-blue-200'}`}
                onClick={() => toggleAnimation('c')}
              >
                {isAnimating && animationParameter === 'c' ? 'Stop' : 'Animate'}
              </button>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={c}
              onChange={(e) => {
                if (!isAnimating || animationParameter !== 'c') {
                  setC(parseFloat(e.target.value));
                }
              }}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">Controls the up-down shift of the parabola</p>
          </div>
        </div>
        
        {/* Toggle Options */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showVertex"
              checked={showVertex}
              onChange={() => setShowVertex(!showVertex)}
              className="mr-2"
            />
            <label htmlFor="showVertex" className="text-sm">Show Vertex</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showRoots"
              checked={showRoots}
              onChange={() => setShowRoots(!showRoots)}
              className="mr-2"
            />
            <label htmlFor="showRoots" className="text-sm">Show Roots</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showAxis"
              checked={showAxis}
              onChange={() => setShowAxis(!showAxis)}
              className="mr-2"
            />
            <label htmlFor="showAxis" className="text-sm">Show Axis of Symmetry</label>
          </div>
        </div>
        
        {/* Information Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {showVertex && (
            <div className="bg-background p-2 rounded shadow-sm border">
              <h3 className="font-medium text-sm">Vertex:</h3>
              <p className="text-sm">({formatNumber(vertexX)}, {formatNumber(vertexY)})</p>
            </div>
          )}
          
          {showRoots && (
            <div className="bg-background p-2 rounded shadow-sm border">
              <h3 className="font-medium text-sm">Roots:</h3>
              {hasRealRoots ? (
                <p className="text-sm">
                  x = {formatNumber(root1 as number)} and x = {formatNumber(root2 as number)}
                </p>
              ) : (
                <p className="text-sm text-orange-600">No real roots</p>
              )}
            </div>
          )}
          
          {showAxis && (
            <div className="bg-background p-2 rounded shadow-sm border">
              <h3 className="font-medium text-sm">Axis of Symmetry:</h3>
              <p className="text-sm">x = {formatNumber(vertexX)}</p>
            </div>
          )}
        </div>
        
        {/* Main Graph */}
        <div className="h-64 w-full bg-background p-2 rounded shadow border">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={generateData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="x" 
                domain={[Math.floor(vertexX - 5), Math.ceil(vertexX + 5)]} 
                type="number" 
                allowDecimals={false}
              />
              <YAxis domain={[Math.min(-5, vertexY - 5), Math.max(5, vertexY + 5)]} />
              <Tooltip formatter={(value: any) => formatNumber(value as number)} labelFormatter={(label: any) => `x = ${formatNumber(label as number)}`} />
              
              {/* Main parabola line */}
              <Line 
                type="monotone" 
                dataKey="y" 
                stroke="#3B82F6" 
                dot={false} 
                strokeWidth={3}
                isAnimationActive={!isAnimating}
              />
              
              {/* Vertex point */}
              {showVertex && (
                <Line 
                  data={[{ x: vertexX, y: vertexY }]} 
                  dataKey="y" 
                  stroke="#EF4444" 
                  dot={{ r: 6, fill: "#EF4444" }} 
                  isAnimationActive={false} 
                />
              )}
              
              {/* Roots */}
              {showRoots && hasRealRoots && (
                <Line 
                  data={[{ x: root1, y: 0 }, { x: root2, y: 0 }]} 
                  dataKey="y" 
                  stroke="#10B981" 
                  dot={{ r: 6, fill: "#10B981" }} 
                  isAnimationActive={false} 
                />
              )}
              
              {/* Axis of symmetry */}
              {showAxis && (
                <Line 
                  data={[
                    { x: vertexX, y: Math.min(-5, vertexY - 5) }, 
                    { x: vertexX, y: Math.max(5, vertexY + 5) }
                  ]} 
                  dataKey="y" 
                  stroke="#9333EA" 
                  strokeDasharray="5 5" 
                  dot={false} 
                  isAnimationActive={false} 
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Content Sections */}
      {activeSection === 'intro' && (
        <div className="content-section">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">What is a Quadratic Function?</h2>
          <p className="mb-4">
            A quadratic function is a special type of mathematical relationship that creates a U-shaped curve called a <strong>parabola</strong>.
          </p>
          <p className="mb-4">
            In its simplest form, it looks like this: <strong>f(x) = ax² + bx + c</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
              <h3 className="font-medium mb-2">The &apos;a&apos; Value</h3>
              <p className="text-sm">Controls how steep or wide the parabola is.</p>
              <ul className="text-sm list-disc ml-4 mt-2">
                <li>If a &gt; 0: Opens upward (∪)</li>
                <li>If a &lt; 0: Opens downward (∩)</li>
                <li>Larger |a|: Steeper curve</li>
                <li>Smaller |a|: Wider curve</li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
              <h3 className="font-medium mb-2">The &apos;b&apos; Value</h3>
              <p className="text-sm">Influences the left-right position of the vertex.</p>
              <ul className="text-sm list-disc ml-4 mt-2">
                <li>Changing b shifts the parabola horizontally</li>
                <li>Related to the axis of symmetry</li>
                <li>Affects where the parabola crosses the y-axis</li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
              <h3 className="font-medium mb-2">The &apos;c&apos; Value</h3>
              <p className="text-sm">The y-intercept - where the parabola crosses the y-axis.</p>
              <ul className="text-sm list-disc ml-4 mt-2">
                <li>When x = 0, f(0) = c</li>
                <li>Changing c shifts the entire parabola up or down</li>
                <li>Does not affect the shape, only the position</li>
              </ul>
            </div>
          </div>
          <p className="mb-4">
            You&apos;ll find quadratic functions everywhere in real life! They describe the path of a thrown ball, the shape of satellite dishes, and even how light focuses in mirrors and lenses.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900">
            <h3 className="font-medium mb-2">Try This!</h3>
            <p className="text-sm">Use the sliders above to explore how changing a, b, and c affects the parabola. Notice how:</p>
            <ul className="text-sm list-disc ml-4 mt-2">
              <li>Changing &apos;a&apos; makes the parabola steeper or flatter</li>
              <li>Changing &apos;b&apos; moves the parabola left and right</li>
              <li>Changing &apos;c&apos; moves the entire parabola up and down</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Standard Form Section */}
      {activeSection === 'standard' && (
        <div className="content-section">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Standard Form</h2>
          <p className="mb-4">
            The standard form of a quadratic function is <strong>f(x) = ax² + bx + c</strong>, where a, b, and c are constants and a ≠ 0.
          </p>
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Breaking Down the Formula</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-background p-2 rounded shadow-sm text-center border">
                <span className="text-2xl text-blue-600">ax²</span>
                <p className="text-sm mt-1">Quadratic term</p>
              </div>
              <div className="bg-background p-2 rounded shadow-sm text-center border">
                <span className="text-2xl text-blue-600">bx</span>
                <p className="text-sm mt-1">Linear term</p>
              </div>
              <div className="bg-background p-2 rounded shadow-sm text-center border">
                <span className="text-2xl text-blue-600">c</span>
                <p className="text-sm mt-1">Constant term</p>
              </div>
            </div>
          </div>
          <p className="mb-4">
            When we evaluate a quadratic function, we substitute a value for x and follow the order of operations:
          </p>
          <div className="bg-muted/40 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Example: If f(x) = 2x² - 3x + 1, find f(2)</h3>
            <div className="ml-4">
              <p className="mb-1">f(2) = 2(2)² - 3(2) + 1</p>
              <p className="mb-1">f(2) = 2(4) - 6 + 1</p>
              <p className="mb-1">f(2) = 8 - 6 + 1</p>
              <p className="font-medium">f(2) = 3</p>
            </div>
          </div>
          <p className="mb-4">
            The graph of a quadratic function always forms a parabola. The parabola can open upward (if a &gt; 0) or downward (if a &lt; 0).
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900">
            <h3 className="font-medium mb-2">Try This!</h3>
            <p className="text-sm">In the interactive graph above:</p>
            <ol className="text-sm list-decimal ml-4 mt-2">
              <li>Try setting a = 1, b = 0, c = 0 to see the simplest parabola: f(x) = x²</li>
              <li>Now try a = -1 to see how the parabola flips</li>
              <li>Set a = 0.5 to see a wider parabola, or a = 2 for a narrower one</li>
            </ol>
          </div>
        </div>
      )}
      
      {/* Vertex Section */}
      {activeSection === 'vertex' && (
        <div className="content-section">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">The Vertex</h2>
          <p className="mb-4">
            The <strong>vertex</strong> is the lowest point of a parabola that opens upward, or the highest point of a parabola that opens downward.
          </p>
          <div className="mb-6">
            <h3 className="font-medium mb-2">Finding the Vertex</h3>
            <p className="mb-2">To find the vertex of f(x) = ax² + bx + c:</p>
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg mb-3">
              <p className="mb-1">x-coordinate: x = -b/(2a)</p>
              <p>y-coordinate: y = f(x) = f(-b/(2a))</p>
            </div>
            <p className="text-sm mb-4">
              This gives us the point (x,y) where the parabola reaches its maximum or minimum value.
            </p>
          </div>
        </div>
      )}
      
      {/* Roots Section */}
      {activeSection === 'roots' && (
        <div className="content-section">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Finding Roots</h2>
          <p className="mb-4">
            The roots (or x-intercepts) are where the parabola crosses the x-axis. At these points, f(x) = 0.
          </p>
        </div>
      )}
      
      {/* Forms Section */}
      {activeSection === 'forms' && (
        <div className="content-section">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Different Forms</h2>
          <p className="mb-4">
            A quadratic function can be expressed in different forms, each highlighting different properties.
          </p>
        </div>
      )}
      
      {/* Applications Section */}
      {activeSection === 'applications' && (
        <div className="content-section">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Real-World Applications</h2>
          <p className="mb-4">
            Quadratic functions appear in many real-world situations, like projectile motion and optimization problems.
          </p>
        </div>
      )}
      
      {/* Navigation Footer */}
      <div className="mt-8 flex justify-between">
        <button
          className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80"
          onClick={() => {
            const currentIndex = sections.findIndex(s => s.id === activeSection);
            if (currentIndex > 0) {
              setActiveSection(sections[currentIndex - 1].id);
              window.scrollTo(0, 0);
            }
          }}
          disabled={activeSection === sections[0].id}
        >
          Previous: {activeSection !== sections[0].id && sections[sections.findIndex(s => s.id === activeSection) - 1].title}
        </button>
        
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => {
            const currentIndex = sections.findIndex(s => s.id === activeSection);
            if (currentIndex < sections.length - 1) {
              setActiveSection(sections[currentIndex + 1].id);
              window.scrollTo(0, 0);
            }
          }}
          disabled={activeSection === sections[sections.length - 1].id}
        >
          Next: {activeSection !== sections[sections.length - 1].id && sections[sections.findIndex(s => s.id === activeSection) + 1].title}
        </button>
      </div>
    </div>
  );
};

export default InteractiveQuadraticFunctions;
