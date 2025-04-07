
import React from 'react';

const VectorsForStrugglingStudents = () => {
  return (
    <div className="container mx-auto px-4 py-4 text-sm">
      <h2 className="text-lg font-bold mb-3">Introduction to Vectors - Making It Simple</h2>
      
      <section className="mb-4 bg-blue-50 p-3 rounded">
        <h3 className="text-base font-bold mb-2">What is a Vector?</h3>
        
        <p className="mb-2">
          Think of a vector as an <strong>arrow</strong>. It has two important features:
        </p>
        
        <ul className="list-disc pl-4 mb-2">
          <li><strong>Length</strong> - how long the arrow is (called magnitude)</li>
          <li><strong>Direction</strong> - which way the arrow points</li>
        </ul>
        
        <p className="mb-2">
          Unlike regular numbers (called scalars), vectors show both <strong>how much</strong> and <strong>which way</strong>.
        </p>
      </section>
      
      <section className="mb-4">
        <h3 className="text-base font-bold mb-2">Writing Vectors</h3>
        
        <p className="mb-2">There are three common ways to write vectors:</p>
        
        <ol className="list-decimal pl-4 mb-2">
          <li className="mb-1">Using letters with arrows: <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">a</span> (with an arrow on top) or bold letters: <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">a</span> (in bold)</li>
          <li className="mb-1">As a column: <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">(3, 4)</span> (this means 3 units right, 4 units up)</li>
          <li className="mb-1">Using starting and ending points: <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">AB</span> (vector from point A to point B)</li>
        </ol>
      </section>
      
      <section className="mb-4 bg-yellow-50 p-3 rounded">
        <h3 className="text-base font-bold mb-2">Key Things to Remember</h3>
        
        <ul className="list-disc pl-4 mb-2">
          <li className="mb-1">A 2D vector has two components: <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">(x, y)</span></li>
          <li className="mb-1">A 3D vector has three components: <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">(x, y, z)</span></li>
          <li className="mb-1">Equal vectors have the same length AND direction</li>
          <li className="mb-1">The <strong>zero vector</strong> <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">(0, 0)</span> has no direction and zero length</li>
        </ul>
      </section>
      
      <section className="mb-4">
        <h3 className="text-base font-bold mb-2">Basic Vector Operations</h3>
        
        <div className="mb-3 border-l-4 border-green-500 pl-3">
          <p className="font-bold mb-1">Adding Vectors</p>
          <p className="mb-1">Just add the matching components:</p>
          <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
            (2, 3) + (1, 5) = (2+1, 3+5) = (3, 8)
          </div>
          <p className="mb-1">Think of it as: move along the first vector, then move along the second.</p>
        </div>
        
        <div className="mb-3 border-l-4 border-red-500 pl-3">
          <p className="font-bold mb-1">Multiplying by a Number</p>
          <p className="mb-1">Multiply each component by that number:</p>
          <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
            3 × (2, 4) = (3 × 2, 3 × 4) = (6, 12)
          </div>
          <p className="mb-1">This changes the vector&apos;s length but keeps its direction (unless you multiply by a negative number, which reverses the direction).</p>
        </div>
      </section>
      
      <section className="mb-4 bg-green-50 p-3 rounded">
        <h3 className="text-base font-bold mb-2">Finding a Vector&apos;s Length</h3>
        
        <p className="mb-2">Use Pythagoras&apos; theorem:</p>
        <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
          |v| = √(x² + y²)
        </div>
        
        <p className="mb-2">Example:</p>
        <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
          |(3, 4)| = √(3² + 4²) = √(9 + 16) = √25 = 5
        </div>
      </section>
      
      <section className="mb-4">
        <h3 className="text-base font-bold mb-2">Common Mistakes to Avoid</h3>
        
        <ul className="list-disc pl-4 mb-2">
          <li className="mb-1">Forgetting that <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">AB</span> and <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">BA</span> point in opposite directions</li>
          <li className="mb-1">Thinking vectors with different starting points must be different (vectors only care about length and direction, not position)</li>
          <li className="mb-1">Confusing the dot product <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">a · b</span> with multiplication</li>
        </ul>
      </section>
      
      <section className="mb-4 bg-purple-50 p-3 rounded">
        <h3 className="text-base font-bold mb-2">Exam Tips</h3>
        
        <ul className="list-disc pl-4 mb-2">
          <li className="mb-1">Draw diagrams for vector problems - visuals really help!</li>
          <li className="mb-1">When finding a point that divides a line in a ratio, use vector methods</li>
          <li className="mb-1">Always check your answers with a quick calculation</li>
          <li className="mb-1">Practice with past papers to get comfortable with different question types</li>
        </ul>
      </section>
    </div>
  );
};

export default VectorsForStrugglingStudents;
