
import React from 'react';

const VectorsVisual = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-lg font-bold mb-3">Vectors: A Visual Introduction</h2>
      
      <section className="mb-6">
        <h3 className="text-base font-bold mb-2">What is a Vector?</h3>
        
        <div className="flex flex-wrap items-center mb-4">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <p className="mb-2">
              A <strong>vector</strong> is like an arrow that has:
            </p>
            <ul className="list-disc pl-5 mb-3">
              <li><strong>Length</strong> (magnitude)</li>
              <li><strong>Direction</strong> (where it points)</li>
            </ul>
            <p>
              In A Level maths, we write vectors as:
            </p>
            <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
              v = (3, 2) or v = 3i + 2j
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <svg width="220" height="220" viewBox="0 0 220 220">
              {/* Coordinate grid */}
              <line x1="10" y1="110" x2="210" y2="110" stroke="#ccc" strokeWidth="1" />
              <line x1="110" y1="10" x2="110" y2="210" stroke="#ccc" strokeWidth="1" />
              
              {/* Grid labels */}
              <text x="205" y="125" fontSize="12" fill="#666">x</text>
              <text x="95" y="20" fontSize="12" fill="#666">y</text>
              <text x="115" y="125" fontSize="12" fill="#666">O</text>
              
              {/* Vector arrow */}
              <line x1="110" y1="110" x2="170" y2="70" stroke="#3366CC" strokeWidth="2" />
              <polygon points="170,70 160,70 166,80" fill="#3366CC" />
              
              {/* Vector components */}
              <line x1="110" y1="110" x2="170" y2="110" stroke="#3366CC" strokeWidth="1" strokeDasharray="4" />
              <line x1="170" y1="110" x2="170" y2="70" stroke="#3366CC" strokeWidth="1" strokeDasharray="4" />
              
              {/* Labels */}
              <text x="175" y="65" fontSize="14" fill="#3366CC">v</text>
              <text x="140" y="125" fontSize="12" fill="#3366CC">3</text>
              <text x="175" y="90" fontSize="12" fill="#3366CC">2</text>
            </svg>
          </div>
        </div>
        
        <p className="mb-2">
          This vector <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">v = (3, 2)</span> means:
        </p>
        <ul className="list-disc pl-5 mb-3">
          <li>Move 3 units right (x-direction)</li>
          <li>Move 2 units up (y-direction)</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h3 className="text-base font-bold mb-2">Vector Addition</h3>
        
        <div className="flex flex-wrap items-center mb-4">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <p className="mb-2">
              To add vectors <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">u + v</span>, you can:
            </p>
            <ol className="list-decimal pl-5 mb-3">
              <li><strong>Method 1:</strong> Add components</li>
              <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
                (3, 1) + (2, 2) = (5, 3)
              </div>
              <li><strong>Method 2:</strong> Place the start of <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">v</span> at the end of <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">u</span></li>
            </ol>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <svg width="220" height="220" viewBox="0 0 220 220">
              {/* Coordinate grid */}
              <line x1="10" y1="110" x2="210" y2="110" stroke="#ccc" strokeWidth="1" />
              <line x1="110" y1="10" x2="110" y2="210" stroke="#ccc" strokeWidth="1" />
              
              {/* Vector a */}
              <line x1="110" y1="110" x2="170" y2="90" stroke="#3366CC" strokeWidth="2" />
              <polygon points="170,90 160,93 164,83" fill="#3366CC" />
              <text x="130" y="95" fontSize="14" fill="#3366CC">u</text>
              
              {/* Vector b */}
              <line x1="170" y1="90" x2="190" y2="70" stroke="#CC3366" strokeWidth="2" />
              <polygon points="190,70 180,76 184,66" fill="#CC3366" />
              <text x="185" y="85" fontSize="14" fill="#CC3366">v</text>
              
              {/* Resultant vector a+b */}
              <line x1="110" y1="110" x2="190" y2="70" stroke="#33CC66" strokeWidth="2" strokeDasharray="3" />
              <polygon points="190,70 180,76 184,66" fill="#33CC66" />
              <text x="140" y="75" fontSize="14" fill="#33CC66">u+v</text>
            </svg>
          </div>
        </div>
      </section>
      
      <section className="mb-6">
        <h3 className="text-base font-bold mb-2">Scalar Multiplication</h3>
        
        <div className="flex flex-wrap items-center mb-4">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <p className="mb-2">
              Multiplying a vector by a scalar (number) changes its <strong>length</strong> but not its direction:
            </p>
            <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
              2v = 2(3, 2) = (6, 4)
            </div>
            <p className="mb-2">
              <strong>Negative</strong> scalar reverses direction:
            </p>
            <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
              -v = -(3, 2) = (-3, -2)
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <svg width="220" height="220" viewBox="0 0 220 220">
              {/* Coordinate grid */}
              <line x1="10" y1="110" x2="210" y2="110" stroke="#ccc" strokeWidth="1" />
              <line x1="110" y1="10" x2="110" y2="210" stroke="#ccc" strokeWidth="1" />
              
              {/* Original vector a */}
              <line x1="110" y1="110" x2="170" y2="70" stroke="#3366CC" strokeWidth="2" />
              <polygon points="170,70 160,70 166,80" fill="#3366CC" />
              <text x="175" y="65" fontSize="14" fill="#3366CC">v</text>
              
              {/* 2a vector */}
              <line x1="110" y1="110" x2="230" y2="30" stroke="#33CC66" strokeWidth="2" strokeDasharray="3" />
              <polygon points="230,30 220,36 224,26" fill="#33CC66" />
              <text x="230" y="30" fontSize="14" fill="#33CC66">2v</text>
              
              {/* -a vector */}
              <line x1="110" y1="110" x2="50" y2="150" stroke="#CC3366" strokeWidth="2" strokeDasharray="3" />
              <polygon points="50,150 60,145 55,155" fill="#CC3366" />
              <text x="40" y="160" fontSize="14" fill="#CC3366">-v</text>
            </svg>
          </div>
        </div>
      </section>
      
      <section className="mb-6">
        <h3 className="text-base font-bold mb-2">Practical Example: Position Vectors</h3>
        
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <p className="mb-2">
              If points A, B, and C form a triangle:
            </p>
            <ul className="list-disc pl-5">
              <li>Vector <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">AB</span> goes from A to B</li>
              <li>Vector <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">BC</span> goes from B to C</li>
              <li>Vector <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">AC</span> goes from A to C</li>
            </ul>
            <p className="mt-2 mb-2">
              An important relationship:
            </p>
            <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
              AB + BC = AC
            </div>
            <p className="mb-2">
              This demonstrates vector addition in real geometric context.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <svg width="220" height="220" viewBox="0 0 220 220">
              {/* Triangle */}
              <polygon points="40,160 160,180 140,60" fill="none" stroke="#999" strokeWidth="1" />
              
              {/* Points */}
              <circle cx="40" cy="160" r="4" fill="#333" />
              <circle cx="160" cy="180" r="4" fill="#333" />
              <circle cx="140" cy="60" r="4" fill="#333" />
              
              {/* Labels */}
              <text x="30" y="175" fontSize="14" fill="#333">A</text>
              <text x="170" y="185" fontSize="14" fill="#333">B</text>
              <text x="150" y="50" fontSize="14" fill="#333">C</text>
              
              {/* Vectors */}
              <line x1="40" y1="160" x2="160" y2="180" stroke="#3366CC" strokeWidth="2" />
              <polygon points="160,180 150,175 151,185" fill="#3366CC" />
              <text x="90" y="185" fontSize="14" fill="#3366CC">AB</text>
              
              <line x1="160" y1="180" x2="140" y2="60" stroke="#CC3366" strokeWidth="2" />
              <polygon points="140,60 136,70 146,66" fill="#CC3366" />
              <text x="160" y="120" fontSize="14" fill="#CC3366">BC</text>
              
              <line x1="40" y1="160" x2="140" y2="60" stroke="#33CC66" strokeWidth="2" strokeDasharray="3" />
              <polygon points="140,60 130,65 135,55" fill="#33CC66" />
              <text x="75" y="100" fontSize="14" fill="#33CC66">AC</text>
            </svg>
          </div>
        </div>
      </section>
      
      <section className="mb-4 bg-blue-50 p-3 rounded">
        <h3 className="text-base font-bold mb-2">Visual Tips for A Level Success</h3>
        
        <ul className="list-disc pl-5">
          <li>Always sketch vectors when solving problems - even a rough diagram helps!</li>
          <li>Break vectors into component form (<span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">v = vx·i + vy·j</span>) to simplify calculations</li>
          <li>Remember that parallel vectors point in the same direction (one is a scalar multiple of the other)</li>
          <li>For perpendicular vectors, their dot product equals zero: <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">u · v = 0</span></li>
          <li>Connect vectors to coordinate geometry - vectors can represent lines, planes, and more!</li>
        </ul>
      </section>
    </div>
  );
};

export default VectorsVisual;
