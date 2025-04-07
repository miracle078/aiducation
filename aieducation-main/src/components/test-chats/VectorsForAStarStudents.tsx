
import React from 'react';

const VectorsForAStarStudents = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-bold mb-3">Introduction to Vectors for Pure Mathematics - A* Level</h2>
      
      <section className="mb-4">
        <h3 className="text-base font-bold mb-2">Definition and Notation</h3>
        
        <p className="mb-2">
          A <strong>vector</strong> is a mathematical object that has both <strong>magnitude</strong> (size) and <strong>direction</strong>, unlike scalars which have only magnitude.
        </p>
        
        <p className="mb-2">Notation:</p>
        <ul className="list-disc pl-4 mb-2">
          <li>Bold letters: <span className="bg-gray-100 px-1 rounded text-sm font-mono">a, v</span> (typically bolded in writing)</li>
          <li>Arrow notation: <span className="bg-gray-100 px-1 rounded text-sm font-mono">AB</span> (with an arrow above in writing)</li>
          <li>Column vector: <span className="bg-gray-100 px-1 rounded text-sm font-mono">(a, b, c)</span></li>
        </ul>
      </section>
      
      <section className="mb-4">
        <h3 className="text-base font-bold mb-2">Vector Operations</h3>
        
        <p className="mb-2"><strong>Addition</strong>: Add corresponding components</p>
        <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
          a + b = (a1, a2, a3) + (b1, b2, b3) = (a1+b1, a2+b2, a3+b3)
        </div>
        
        <p className="mb-2"><strong>Scalar Multiplication</strong>: Multiply each component by scalar</p>
        <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
          k*a = k*(a1, a2, a3) = (k*a1, k*a2, k*a3)
        </div>
        
        <p className="mb-2"><strong>Magnitude</strong>: Length of a vector</p>
        <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
          |a| = sqrt(a1² + a2² + a3²)
        </div>
        
        <p className="mb-2"><strong>Unit Vector</strong>: Vector with magnitude of 1</p>
        <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
          unit a = a/|a|
        </div>
      </section>
      
      <section className="mb-4">
        <h3 className="text-base font-bold mb-2">Dot Product</h3>
        
        <p className="mb-2">The <strong>dot product</strong> (scalar product) of two vectors:</p>
        <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
          a·b = a1*b1 + a2*b2 + a3*b3 = |a|*|b|*cos(theta)
        </div>
        
        <p className="mb-2">Properties:</p>
        <ul className="list-disc pl-4 mb-2">
          <li>If <span className="bg-gray-100 px-1 rounded text-sm font-mono">a·b = 0</span>, vectors are perpendicular</li>
          <li>If <span className="bg-gray-100 px-1 rounded text-sm font-mono">a·b &gt; 0</span>, angle is acute</li>
          <li>If <span className="bg-gray-100 px-1 rounded text-sm font-mono">a·b &lt; 0</span>, angle is obtuse</li>
        </ul>
      </section>
      
      <section className="mb-4">
        <h3 className="text-base font-bold mb-2">Vector Equations of Lines</h3>
        
        <p className="mb-2"><strong>Vector equation</strong>:</p>
        <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
          r = a + t*b
        </div>
        
        <p className="mb-2">Where:</p>
        <ul className="list-disc pl-4 mb-2">
          <li><span className="bg-gray-100 px-1 rounded text-sm font-mono">a</span> is a position vector of a point on the line</li>
          <li><span className="bg-gray-100 px-1 rounded text-sm font-mono">b</span> is the direction vector</li>
          <li><span className="bg-gray-100 px-1 rounded text-sm font-mono">t</span> is a parameter</li>
        </ul>
      </section>
      
      <section className="mb-4">
        <h3 className="text-base font-bold mb-2">Exam Technique for A*</h3>
        
        <ul className="list-disc pl-4 mb-2">
          <li>Always verify your answers: e.g., check if vectors are parallel or perpendicular as claimed</li>
          <li>For vector proofs, establish clear starting points and logical progression</li>
          <li>Express angles between vectors using <span className="bg-gray-100 px-1 rounded text-sm font-mono">cos(theta) = (a·b)/(|a|*|b|)</span></li>
          <li>Be careful with direction: <span className="bg-gray-100 px-1 rounded text-sm font-mono">AB = -BA</span></li>
          <li>Connect geometric understanding with algebraic manipulation</li>
        </ul>
      </section>
    </div>
  );
};

export default VectorsForAStarStudents;
