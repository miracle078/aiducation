
import React from 'react';

const MathInline: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <span className="inline-block bg-gray-100 px-1 rounded text-sm font-mono">
    {children}
  </span>
);

const MathBlock: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="bg-gray-100 p-2 rounded my-2 text-sm font-mono text-center">
    {children}
  </div>
);

const AStudentContent: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-4 text-sm">
      <section className="mb-4">
        <h3 className="text-base font-bold mb-2">
          <strong>Newton's First Law</strong>: The Law of <strong>Inertia</strong>
        </h3>
        
        <p className="mb-2">
          Statement: "An object at rest remains at rest, and an object in motion continues in uniform motion in a straight line unless acted upon by a net external <strong>force</strong>."
        </p>
        
        <p className="mb-2">Mathematical Representation:</p>
        <MathBlock>Σ F = 0 ⇒ v = constant</MathBlock>
        
        <p className="mb-2">Where:</p>
        <ul className="list-disc pl-4">
          <li><MathInline>Σ F</MathInline> is the net external <strong>force</strong> acting on the object</li>
          <li><MathInline>v</MathInline> is the velocity vector of the object</li>
        </ul>
        
        <p className="mb-2">
          If no net external <strong>force</strong> is applied (<MathInline>Σ F = 0</MathInline>), the object will either remain at rest (<MathInline>v = 0</MathInline>) or move with a constant velocity in a straight line.
        </p>
        
        <p className="mb-2">Concept of <strong>Inertia</strong>:</p>
        <ul className="list-disc pl-4">
          <li><strong>Inertia</strong> is the resistance of an object to changes in its state of motion.</li>
          <li>The <strong>mass</strong> (<MathInline>m</MathInline>) of an object quantifies its <strong>inertia</strong>—the greater the <strong>mass</strong>, the greater the <strong>force</strong> required to change its motion.</li>
        </ul>
        
        <p className="mb-2">Examples:</p>
        <ul className="list-disc pl-4">
          <li>A stationary spacecraft in deep space will continue to remain at rest unless acted upon by an external <strong>force</strong> (e.g., a thrust from an engine).</li>
          <li>A moving car will continue in motion unless external <strong>force</strong>s like friction and air resistance slow it down.</li>
        </ul>
      </section>
      
      <hr className="my-4 border-gray-300" />
      
      <section className="mb-4">
        <h3 className="text-base font-bold mb-2">
          <strong>Newton's Second Law</strong>: The Law of <strong>Acceleration</strong>
        </h3>
        
        <p className="mb-2">
          Statement: "The rate of change of <strong>momentum</strong> of an object is directly proportional to the net external <strong>force</strong> acting on it, and this change occurs in the direction of the applied <strong>force</strong>."
        </p>
        
        <p className="mb-2">Mathematical Representation:</p>
        <MathBlock>Σ F = dp/dt</MathBlock>
        
        <p className="mb-2">Where:</p>
        <ul className="list-disc pl-4">
          <li><MathInline>p = m v</MathInline> is the linear <strong>momentum</strong> of the object</li>
          <li><MathInline>m</MathInline> is the <strong>mass</strong> (assumed constant in classical mechanics)</li>
          <li><MathInline>v</MathInline> is the velocity</li>
          <li><MathInline>dp/dt</MathInline> represents the time derivative of <strong>momentum</strong></li>
        </ul>
        
        <p className="mb-2">Simplified Equation:</p>
        <MathBlock>Σ F = m a</MathBlock>
        
        <p className="mb-2">Implications:</p>
        <ul className="list-disc pl-4">
          <li>The <strong>acceleration</strong> of an object is directly proportional to the applied <strong>force</strong>.</li>
          <li>The <strong>acceleration</strong> is inversely proportional to the <strong>mass</strong> of the object.</li>
        </ul>
        
        <p className="mb-2">Example:</p>
        <MathBlock>a = F/m = 10/2 = 5 m/s²</MathBlock>
      </section>
      
      <hr className="my-4 border-gray-300" />
      
      <section className="mb-4">
        <h3 className="text-base font-bold mb-2">
          <strong>Newton's Third Law</strong>: The Law of Action and Reaction
        </h3>
        
        <p className="mb-2">
          Statement: "For every action, there is an equal and opposite reaction."
        </p>
        
        <p className="mb-2">Mathematical Representation:</p>
        <MathBlock>F(A→B) = -F(B→A)</MathBlock>
        
        <p className="mb-2">Where:</p>
        <ul className="list-disc pl-4">
          <li><MathInline>F(A→B)</MathInline> is the <strong>force</strong> exerted by object A on object B</li>
          <li><MathInline>F(B→A)</MathInline> is the reaction <strong>force</strong> exerted by object B on object A</li>
        </ul>
        
        <p className="mb-2">Characteristics of Action-Reaction <strong>Force</strong>s:</p>
        <ol className="list-decimal pl-4">
          <li>Equal in Magnitude: <MathInline>|F(A→B)| = |F(B→A)|</MathInline></li>
          <li>Opposite in Direction: <MathInline>F(A→B) = -F(B→A)</MathInline></li>
          <li>Act on Different Objects: They never act on the same object, meaning they do not cancel out</li>
        </ol>
        
        <p className="mb-2">Examples:</p>
        <ul className="list-disc pl-4">
          <li>When a person pushes against a wall with a <strong>force</strong> <MathInline>F</MathInline>, the wall pushes back with an equal <strong>force</strong> <MathInline>-F</MathInline>.</li>
          <li>In rocket propulsion, the exhaust gases exert a downward <strong>force</strong>, while the rocket experiences an equal and opposite upward thrust.</li>
        </ul>
      </section>
    </div>
  );
};

export default AStudentContent;
