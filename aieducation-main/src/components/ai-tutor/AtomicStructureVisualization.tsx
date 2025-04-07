
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ElementData {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: string;
  group: number;
  period: number;
  block: string;
  electronConfiguration: string;
  valenceElectrons: number;
  electronegativity: number;
  description: string;
}

interface AtomicStructureVisualizationProps {
  currentStage: number;
  progress: number;
  elementData: ElementData;
}

const AtomicStructureVisualization: React.FC<AtomicStructureVisualizationProps> = ({ 
  currentStage,
  progress,
  elementData
}) => {
  const [visibleElectrons, setVisibleElectrons] = useState(0);
  const [showValence, setShowValence] = useState(false);
  const [showOrbitalText, setShowOrbitalText] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const electronOrbitals = useRef<Array<{angle: number, speed: number}>>([]);

  // Set up electron orbital animation data
  useEffect(() => {
    const electronSpeed = 0.02; // Base speed for electron animation
    
    // Create animation data for electrons in different orbitals
    for (let i = 0; i < 20; i++) {
      let shellNum = Math.floor(i / 8) + 1; // Approximate which shell this electron belongs to
      let speedVariation = shellNum === 1 ? 1.5 : 
                           shellNum === 2 ? 1.0 : 
                           shellNum === 3 ? 0.7 : 0.5; // Outer shells move slower
      
      electronOrbitals.current.push({
        angle: Math.random() * Math.PI * 2,
        speed: electronSpeed * speedVariation * (0.8 + Math.random() * 0.4) // Different speeds for varied animation
      });
    }
  }, []);
  
  // Animation for electrons appearing
  useEffect(() => {
    if (currentStage === 2) {
      // Start showing electrons one by one
      const totalElectrons = elementData.atomicNumber;
      const timer = setTimeout(() => {
        setVisibleElectrons(Math.min(visibleElectrons + 1, totalElectrons));
      }, 200);
      
      if (visibleElectrons >= 2) { // 1s² complete
        setShowOrbitalText(true);
      }
      
      return () => clearTimeout(timer);
    } else if (currentStage === 3) {
      // Show all electrons immediately
      setVisibleElectrons(elementData.atomicNumber);
      setShowValence(true);
      setShowOrbitalText(true);
    } else {
      setVisibleElectrons(0);
      setShowValence(false);
      setShowOrbitalText(false);
    }
  }, [currentStage, visibleElectrons, elementData.atomicNumber]);

  // Draw the atomic model
  useEffect(() => {
    if (!canvasRef.current || visibleElectrons === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set up high-resolution canvas
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);
    
    // Get electron shells distribution
    const electronShells = getElectronShells(elementData.atomicNumber);
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw orbits
      for (let i = 0; i < electronShells.length; i++) {
        if (electronShells[i] > 0) {
          // Draw shell orbit
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, 30 + i * 20, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(100, 100, 255, 0.3)';
          ctx.stroke();
          
          // Label for shells
          const shellLabels = ["K", "L", "M", "N", "O", "P", "Q"];
          const labelAngle = Math.PI / 4;
          const labelX = width / 2 + (30 + i * 20) * Math.cos(labelAngle);
          const labelY = height / 2 + (30 + i * 20) * Math.sin(labelAngle);
          
          ctx.font = '10px Arial';
          ctx.fillStyle = '#888';
          ctx.textAlign = 'center';
          ctx.fillText(shellLabels[i], labelX, labelY);
        }
      }
      
      // Draw nucleus
      const nucleusSize = Math.min(15 + elementData.atomicNumber / 15, 30);
      
      // Nucleus glow
      for (let i = 3; i > 0; i--) {
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, nucleusSize + i * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 100, 100, ${0.2 - i * 0.05})`;
        ctx.fill();
      }
      
      // Nucleus
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, nucleusSize, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      
      // Add texture to nucleus
      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * (nucleusSize / 4);
        ctx.beginPath();
        ctx.arc(
          width / 2 + Math.cos(angle) * distance, 
          height / 2 + Math.sin(angle) * distance, 
          2, 0, Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 180, 180, 0.8)';
        ctx.fill();
      }
      
      // Draw electrons
      let totalElectrons = 0;
      for (let shell = 0; shell < electronShells.length; shell++) {
        let electronsInShell = Math.min(electronShells[shell], visibleElectrons - totalElectrons);
        if (electronsInShell <= 0) continue;
        
        const shellRadius = 30 + shell * 20;
        
        for (let e = 0; e < electronsInShell; e++) {
          const electronId = totalElectrons + e;
          const orbitAngle = electronId % electronOrbitals.current.length;
          let angle = electronOrbitals.current[orbitAngle].angle;
          
          // Add a phase shift based on electron position
          angle += e * (Math.PI * 2 / electronsInShell);
          
          const x = width / 2 + Math.cos(angle) * shellRadius;
          const y = height / 2 + Math.sin(angle) * shellRadius;
          
          // Determine if this is a valence electron
          const isValence = shell === electronShells.findIndex(e => e > 0, shell) - 1 || 
                          shell === electronShells.length - 1;
          
          // Electron glow
          for (let i = 2; i > 0; i--) {
            ctx.beginPath();
            ctx.arc(x, y, 4 + i, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 200, 255, ${0.2 - i * 0.05})`;
            ctx.fill();
          }
          
          // Draw electron
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          
          // If showing valence and this is a valence electron, highlight it
          if (showValence && isValence) {
            ctx.fillStyle = '#8b5cf6';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.stroke();
          } else {
            ctx.fillStyle = '#3b82f6';
          }
          
          ctx.fill();
        }
        
        totalElectrons += electronsInShell;
      }
      
      // Update orbital animations
      updateElectronAnimations();
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [visibleElectrons, showValence, elementData.atomicNumber]);

  // Helper function to update electron animations
  const updateElectronAnimations = () => {
    for (let i = 0; i < electronOrbitals.current.length; i++) {
      electronOrbitals.current[i].angle += electronOrbitals.current[i].speed;
      if (electronOrbitals.current[i].angle > Math.PI * 2) {
        electronOrbitals.current[i].angle -= Math.PI * 2;
      }
    }
  };

  // Helper function to get electron shell distribution
  const getElectronShells = (atomicNumber: number) => {
    // Return electron shell distribution (K, L, M, N, O, P, Q)
    // This is a simplified model for visualization purposes
    const shells = [0, 0, 0, 0, 0, 0, 0];
    
    // Fill shells according to basic rules
    let remaining = atomicNumber;
    
    // Maximum electrons per shell (simplified)
    const shellCapacity = [2, 8, 18, 32, 32, 18, 8];
    
    for (let i = 0; i < shells.length; i++) {
      shells[i] = Math.min(shellCapacity[i], remaining);
      remaining -= shells[i];
      if (remaining <= 0) break;
    }
    
    return shells;
  };
  
  return (
    <div className="h-full relative flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Canvas for atom visualization */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-64"
        style={{ touchAction: 'none' }}
      />
      
      {/* Electron configuration display */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Electron Configuration
        </h3>
        
        <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300">
          <span className={cn(
            "transition-opacity duration-500",
            showOrbitalText ? "opacity-100" : "opacity-0"
          )}>
            <span className="font-mono bg-blue-100 px-2 py-1 rounded mr-2">1s²</span>
            <span className="font-mono bg-green-100 px-2 py-1 rounded mr-2">2s²</span>
            <span className="font-mono bg-green-100 px-2 py-1 rounded">2p⁴</span>
          </span>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={cn(
            "bg-white p-3 rounded-lg border transition-all duration-500 transform",
            currentStage === 3 ? "border-purple-300 shadow-md scale-105" : "border-gray-200",
            currentStage < 2 ? "opacity-0" : "opacity-100"
          )}>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Shell Structure</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>K Shell (n=1):</span>
                <span className="font-medium">{Math.min(2, visibleElectrons)} electrons</span>
              </div>
              <div className="flex justify-between">
                <span>L Shell (n=2):</span>
                <span className="font-medium">{Math.min(8, Math.max(0, visibleElectrons - 2))} electrons</span>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "bg-white p-3 rounded-lg border transition-all duration-500 transform",
            currentStage === 3 ? "border-blue-300 shadow-md scale-105" : "border-gray-200",
            currentStage < 3 ? "opacity-0" : "opacity-100"
          )}>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Reactivity Profile</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Valence Electrons:</span>
                <span className="font-medium text-purple-600">{elementData.valenceElectrons}</span>
              </div>
              <div className="flex justify-between">
                <span>Electronegativity:</span>
                <span className="font-medium">{elementData.electronegativity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Annotations that appear based on the stage */}
      {currentStage === 2 && (
        <div className="absolute top-16 left-1/4 bg-blue-100 p-2 rounded-lg border border-blue-300 shadow-md transform -rotate-6 text-sm w-40">
          <div className="font-medium text-blue-800">1s² 2s² 2p⁴</div>
          <div className="text-blue-600 text-xs">Oxygen has 8 electrons arranged in 2 shells</div>
        </div>
      )}
      
      {currentStage === 3 && (
        <div className="absolute top-24 right-1/4 bg-purple-100 p-2 rounded-lg border border-purple-300 shadow-md transform rotate-6 text-sm w-48">
          <div className="font-medium text-purple-800">6 Valence Electrons</div>
          <div className="text-purple-600 text-xs">Makes oxygen highly reactive with metals, which tend to lose electrons</div>
        </div>
      )}
    </div>
  );
};

export default AtomicStructureVisualization;
