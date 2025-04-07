
import React, { useState, useEffect } from 'react';

const NewtonsLaws = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [firstLawPosition, setFirstLawPosition] = useState(50);
  const [firstLawVelocity, setFirstLawVelocity] = useState(0);
  const [firstLawApplyForce, setFirstLawApplyForce] = useState(false);
  
  const [secondLawForce, setSecondLawForce] = useState(5);
  const [secondLawMass, setSecondLawMass] = useState(1);
  const [secondLawPosition, setSecondLawPosition] = useState(20);
  const [secondLawVelocity, setSecondLawVelocity] = useState(0);
  
  const [thirdLawForce, setThirdLawForce] = useState(5);
  const [thirdLawLeftPosition, setThirdLawLeftPosition] = useState(40);
  const [thirdLawRightPosition, setThirdLawRightPosition] = useState(60);
  const [pushing, setPushing] = useState(false);

  // First Law Animation
  useEffect(() => {
    if (activeTab !== 0) return;
    
    const interval = setInterval(() => {
      if (firstLawApplyForce) {
        // Apply force (acceleration)
        setFirstLawVelocity(prev => prev + 0.2);
      } else {
        // No forces, so velocity remains constant
      }
      
      // Update position based on velocity
      setFirstLawPosition(prev => {
        const newPos = prev + firstLawVelocity;
        if (newPos < 10) {
          setFirstLawVelocity(0);
          return 10;
        }
        if (newPos > 90) {
          setFirstLawVelocity(0);
          return 90;
        }
        return newPos;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [activeTab, firstLawApplyForce, firstLawVelocity]);

  // Second Law Animation
  useEffect(() => {
    if (activeTab !== 1) return;
    
    const interval = setInterval(() => {
      // Calculate acceleration based on F=ma
      const acceleration = secondLawForce / secondLawMass * 0.02;
      
      // Update velocity based on acceleration
      setSecondLawVelocity(prev => prev + acceleration);
      
      // Update position based on velocity
      setSecondLawPosition(prev => {
        const newPos = prev + secondLawVelocity;
        if (newPos < 10) {
          setSecondLawVelocity(0);
          return 10;
        }
        if (newPos > 90) {
          setSecondLawVelocity(0);
          return 90;
        }
        return newPos;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [activeTab, secondLawForce, secondLawMass, secondLawVelocity]);

  // Third Law Animation
  useEffect(() => {
    if (activeTab !== 2) return;
    
    const interval = setInterval(() => {
      if (pushing) {
        // Both objects move in opposite directions with equal force
        const leftAcceleration = -thirdLawForce / 1; // Mass = 1
        const rightAcceleration = thirdLawForce / 1; // Mass = 1
        
        setThirdLawLeftPosition(prev => {
          const newPos = prev + leftAcceleration * 0.1;
          return Math.max(10, newPos);
        });
        
        setThirdLawRightPosition(prev => {
          const newPos = prev + rightAcceleration * 0.1;
          return Math.min(90, newPos);
        });
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [activeTab, pushing, thirdLawForce]);

  // Reset animations when changing tabs
  useEffect(() => {
    // Reset first law
    setFirstLawPosition(50);
    setFirstLawVelocity(0);
    setFirstLawApplyForce(false);
    
    // Reset second law
    setSecondLawPosition(20);
    setSecondLawVelocity(0);
    
    // Reset third law
    setThirdLawLeftPosition(40);
    setThirdLawRightPosition(60);
    setPushing(false);
  }, [activeTab]);

  const tabs = [
    { name: "First Law", title: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force." },
    { name: "Second Law", title: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. (F = ma)" },
    { name: "Third Law", title: "For every action, there is an equal and opposite reaction." }
  ];

  const renderFirstLaw = () => (
    <div className="flex flex-col items-center space-y-4 w-full">
      <div className="bg-blue-100 p-4 rounded-lg w-full">
        <p className="text-lg text-center font-semibold mb-2">Newton's First Law of Motion</p>
        <p className="text-center mb-4">{tabs[0].title}</p>
        
        <div className="flex flex-col items-center">
          <div className="w-full h-12 bg-gray-300 relative rounded-lg mb-4">
            <div 
              className="absolute top-0 bottom-0 w-8 h-8 bg-red-500 rounded-full mt-2"
              style={{ left: `${firstLawPosition}%`, transform: 'translateX(-50%)' }}
            />
          </div>
          
          <div className="flex space-x-4 mb-2">
            <button
              className={`px-4 py-2 rounded ${firstLawApplyForce ? 'bg-green-600 text-white' : 'bg-green-400'}`}
              onMouseDown={() => setFirstLawApplyForce(true)}
              onMouseUp={() => setFirstLawApplyForce(false)}
              onMouseLeave={() => setFirstLawApplyForce(false)}
            >
              Push (Hold)
            </button>
            
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => {
                setFirstLawPosition(50);
                setFirstLawVelocity(0);
              }}
            >
              Reset
            </button>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-100 rounded-lg w-full">
            <p className="text-sm"><strong>Current State:</strong> {firstLawVelocity === 0 ? "Object at rest" : "Object in motion"}</p>
            <p className="text-sm"><strong>Velocity:</strong> {firstLawVelocity.toFixed(1)} units/s</p>
            <p className="text-sm"><strong>Force Applied:</strong> {firstLawApplyForce ? "Yes" : "No"}</p>
          </div>
          
          <div className="mt-4 p-4 bg-purple-100 rounded-lg w-full">
            <p className="text-sm">
              <strong>Explanation:</strong> Without any external force, an object will maintain its state of motion. Press and hold the "Push" button to apply force and observe how the object accelerates. When you release the button, the force is removed, but the object continues moving at a constant velocity (in this ideal environment without friction).
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecondLaw = () => (
    <div className="flex flex-col items-center space-y-4 w-full">
      <div className="bg-green-100 p-4 rounded-lg w-full">
        <p className="text-lg text-center font-semibold mb-2">Newton's Second Law of Motion</p>
        <p className="text-center mb-4">{tabs[1].title}</p>
        
        <div className="flex flex-col items-center">
          <div className="w-full h-16 bg-gray-300 relative rounded-lg mb-4">
            <div 
              className="absolute top-0 bottom-0 bg-blue-500 rounded-xl"
              style={{ 
                left: `${secondLawPosition}%`, 
                transform: 'translateX(-50%)', 
                width: `${Math.max(15, secondLawMass * 8)}px`,
                height: `${Math.max(30, secondLawMass * 8)}px`,
                marginTop: '8px'
              }}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Force (N)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={secondLawForce}
                onChange={(e) => setSecondLawForce(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-center">{secondLawForce} N</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Mass (kg)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={secondLawMass}
                onChange={(e) => setSecondLawMass(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-center">{secondLawMass} kg</p>
            </div>
          </div>
          
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
            onClick={() => {
              setSecondLawPosition(20);
              setSecondLawVelocity(0);
            }}
          >
            Reset
          </button>
          
          <div className="mt-2 p-4 bg-yellow-100 rounded-lg w-full">
            <p className="text-sm"><strong>Force:</strong> {secondLawForce} N</p>
            <p className="text-sm"><strong>Mass:</strong> {secondLawMass} kg</p>
            <p className="text-sm"><strong>Acceleration:</strong> {(secondLawForce / secondLawMass).toFixed(2)} m/s²</p>
            <p className="text-sm"><strong>Velocity:</strong> {secondLawVelocity.toFixed(2)} m/s</p>
          </div>
          
          <div className="mt-4 p-4 bg-purple-100 rounded-lg w-full">
            <p className="text-sm">
              <strong>Explanation:</strong> According to F=ma, the acceleration of an object is directly proportional to the force applied and inversely proportional to its mass. Try adjusting the force and mass sliders to see how they affect the object's acceleration. Notice that increasing the force increases acceleration, while increasing the mass decreases acceleration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderThirdLaw = () => (
    <div className="flex flex-col items-center space-y-4 w-full">
      <div className="bg-red-100 p-4 rounded-lg w-full">
        <p className="text-lg text-center font-semibold mb-2">Newton's Third Law of Motion</p>
        <p className="text-center mb-4">{tabs[2].title}</p>
        
        <div className="flex flex-col items-center">
          <div className="w-full h-16 bg-gray-300 relative rounded-lg mb-4">
            <div 
              className="absolute top-3 h-10 w-10 bg-red-500 rounded-lg"
              style={{ left: `${thirdLawLeftPosition}%`, transform: 'translateX(-50%)' }}
            />
            <div 
              className="absolute top-3 h-10 w-10 bg-blue-500 rounded-lg"
              style={{ left: `${thirdLawRightPosition}%`, transform: 'translateX(-50%)' }}
            />
            
            {/* Force arrows */}
            {pushing && (
              <>
                <div 
                  className="absolute top-5 h-2 bg-yellow-500"
                  style={{ 
                    left: `${thirdLawLeftPosition}%`, 
                    width: `${(thirdLawRightPosition - thirdLawLeftPosition) / 2}%`,
                    transform: 'translateX(0%)'
                  }}
                >
                  <div className="absolute right-0 w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-yellow-500"></div>
                </div>
                <div 
                  className="absolute top-9 h-2 bg-yellow-500"
                  style={{ 
                    left: `${thirdLawRightPosition - ((thirdLawRightPosition - thirdLawLeftPosition) / 2)}%`, 
                    width: `${(thirdLawRightPosition - thirdLawLeftPosition) / 2}%`,
                    transform: 'translateX(-100%)'
                  }}
                >
                  <div className="absolute left-0 w-0 h-0 border-t-4 border-b-4 border-r-8 border-t-transparent border-b-transparent border-r-yellow-500"></div>
                </div>
              </>
            )}
          </div>
          
          <div className="flex space-x-4 mb-4">
            <button
              className={`px-4 py-2 rounded ${pushing ? 'bg-green-600 text-white' : 'bg-green-400'}`}
              onMouseDown={() => setPushing(true)}
              onMouseUp={() => setPushing(false)}
              onMouseLeave={() => setPushing(false)}
            >
              Push Objects Together (Hold)
            </button>
            
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => {
                setThirdLawLeftPosition(40);
                setThirdLawRightPosition(60);
                setPushing(false);
              }}
            >
              Reset
            </button>
          </div>
          
          <div className="mt-2 p-4 bg-yellow-100 rounded-lg w-full">
            <p className="text-sm"><strong>Force Applied:</strong> {pushing ? `${thirdLawForce} N in both directions` : "0 N"}</p>
            <p className="text-sm"><strong>Action:</strong> Force on blue object</p>
            <p className="text-sm"><strong>Reaction:</strong> Equal force on red object</p>
          </div>
          
          <div className="mt-4 p-4 bg-purple-100 rounded-lg w-full">
            <p className="text-sm">
              <strong>Explanation:</strong> Newton's Third Law states that for every action (force), there is an equal and opposite reaction. When you press the button, both objects experience the same magnitude of force but in opposite directions. This is why when you push on a wall, you feel the wall pushing back with equal force.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto space-y-6">
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-center mb-4">Newton's Laws of Motion</h2>
        <p className="text-center mb-4 text-sm">
          Sir Isaac Newton formulated three laws that describe the relationship between objects and the forces acting on them. These laws form the foundation of classical mechanics.
        </p>
      </div>
      
      <div className="flex flex-row justify-center space-x-2 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-3 py-1 text-sm rounded-t-lg ${activeTab === index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      
      {activeTab === 0 && renderFirstLaw()}
      {activeTab === 1 && renderSecondLaw()}
      {activeTab === 2 && renderThirdLaw()}
    </div>
  );
};

export default NewtonsLaws;
