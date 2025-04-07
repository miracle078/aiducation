
import React, { useEffect, useRef } from 'react';

const InteractivePeriodicTable: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a script element to load p5.js
    const p5Script = document.createElement('script');
    p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js';
    p5Script.async = true;
    
    p5Script.onload = () => {
      // Create a script element for our periodic table code
      const tableScript = document.createElement('script');
      tableScript.textContent = `
        // Periodic table data
        const elements = [
          { symbol: "H", name: "Hydrogen", atomicNumber: 1, atomicMass: 1.008, category: "Nonmetal", state: "Gas", electronConfig: "1s¹", group: 1, period: 1, color: "#88FF88" },
          { symbol: "He", name: "Helium", atomicNumber: 2, atomicMass: 4.0026, category: "Noble Gas", state: "Gas", electronConfig: "1s²", group: 18, period: 1, color: "#96AAFF" },
          { symbol: "Li", name: "Lithium", atomicNumber: 3, atomicMass: 6.94, category: "Alkali Metal", state: "Solid", electronConfig: "1s² 2s¹", group: 1, period: 2, color: "#FF9988" },
          { symbol: "Be", name: "Beryllium", atomicNumber: 4, atomicMass: 9.0122, category: "Alkaline Earth Metal", state: "Solid", electronConfig: "1s² 2s²", group: 2, period: 2, color: "#FFAA00" },
          { symbol: "B", name: "Boron", atomicNumber: 5, atomicMass: 10.81, category: "Metalloid", state: "Solid", electronConfig: "1s² 2s² 2p¹", group: 13, period: 2, color: "#CC9988" },
          { symbol: "C", name: "Carbon", atomicNumber: 6, atomicMass: 12.011, category: "Nonmetal", state: "Solid", electronConfig: "1s² 2s² 2p²", group: 14, period: 2, color: "#88FF88" },
          { symbol: "N", name: "Nitrogen", atomicNumber: 7, atomicMass: 14.007, category: "Nonmetal", state: "Gas", electronConfig: "1s² 2s² 2p³", group: 15, period: 2, color: "#88FF88" },
          { symbol: "O", name: "Oxygen", atomicNumber: 8, atomicMass: 15.999, category: "Nonmetal", state: "Gas", electronConfig: "1s² 2s² 2p⁴", group: 16, period: 2, color: "#88FF88" },
          { symbol: "F", name: "Fluorine", atomicNumber: 9, atomicMass: 18.998, category: "Halogen", state: "Gas", electronConfig: "1s² 2s² 2p⁵", group: 17, period: 2, color: "#FFFF00" },
          { symbol: "Ne", name: "Neon", atomicNumber: 10, atomicMass: 20.180, category: "Noble Gas", state: "Gas", electronConfig: "1s² 2s² 2p⁶", group: 18, period: 2, color: "#96AAFF" },
          { symbol: "Na", name: "Sodium", atomicNumber: 11, atomicMass: 22.990, category: "Alkali Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s¹", group: 1, period: 3, color: "#FF9988" },
          { symbol: "Mg", name: "Magnesium", atomicNumber: 12, atomicMass: 24.305, category: "Alkaline Earth Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s²", group: 2, period: 3, color: "#FFAA00" },
          { symbol: "Al", name: "Aluminum", atomicNumber: 13, atomicMass: 26.982, category: "Post-Transition Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p¹", group: 13, period: 3, color: "#77AADD" },
          { symbol: "Si", name: "Silicon", atomicNumber: 14, atomicMass: 28.085, category: "Metalloid", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p²", group: 14, period: 3, color: "#CC9988" },
          { symbol: "P", name: "Phosphorus", atomicNumber: 15, atomicMass: 30.974, category: "Nonmetal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p³", group: 15, period: 3, color: "#88FF88" },
          { symbol: "S", name: "Sulfur", atomicNumber: 16, atomicMass: 32.06, category: "Nonmetal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁴", group: 16, period: 3, color: "#88FF88" },
          { symbol: "Cl", name: "Chlorine", atomicNumber: 17, atomicMass: 35.45, category: "Halogen", state: "Gas", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁵", group: 17, period: 3, color: "#FFFF00" },
          { symbol: "Ar", name: "Argon", atomicNumber: 18, atomicMass: 39.948, category: "Noble Gas", state: "Gas", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶", group: 18, period: 3, color: "#96AAFF" },
          { symbol: "K", name: "Potassium", atomicNumber: 19, atomicMass: 39.098, category: "Alkali Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹", group: 1, period: 4, color: "#FF9988" },
          { symbol: "Ca", name: "Calcium", atomicNumber: 20, atomicMass: 40.078, category: "Alkaline Earth Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s²", group: 2, period: 4, color: "#FFAA00" },
          
          // Transition metals - Period 4
          { symbol: "Sc", name: "Scandium", atomicNumber: 21, atomicMass: 44.956, category: "Transition Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹", group: 3, period: 4, color: "#DDAACC" },
          { symbol: "Ti", name: "Titanium", atomicNumber: 22, atomicMass: 47.867, category: "Transition Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d²", group: 4, period: 4, color: "#DDAACC" },
          { symbol: "V", name: "Vanadium", atomicNumber: 23, atomicMass: 50.942, category: "Transition Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d³", group: 5, period: 4, color: "#DDAACC" },
          { symbol: "Cr", name: "Chromium", atomicNumber: 24, atomicMass: 51.996, category: "Transition Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d⁵", group: 6, period: 4, color: "#DDAACC" },
          { symbol: "Mn", name: "Manganese", atomicNumber: 25, atomicMass: 54.938, category: "Transition Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁵", group: 7, period: 4, color: "#DDAACC" },
          { symbol: "Fe", name: "Iron", atomicNumber: 26, atomicMass: 55.845, category: "Transition Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶", group: 8, period: 4, color: "#DDAACC" },
          { symbol: "Co", name: "Cobalt", atomicNumber: 27, atomicMass: 58.933, category: "Transition Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁷", group: 9, period: 4, color: "#DDAACC" },
          { symbol: "Ni", name: "Nickel", atomicNumber: 28, atomicMass: 58.693, category: "Transition Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁸", group: 10, period: 4, color: "#DDAACC" },
          { symbol: "Cu", name: "Copper", atomicNumber: 29, atomicMass: 63.546, category: "Transition Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d¹⁰", group: 11, period: 4, color: "#DDAACC" },
          { symbol: "Zn", name: "Zinc", atomicNumber: 30, atomicMass: 65.38, category: "Transition Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰", group: 12, period: 4, color: "#DDAACC" },
          
          // Post-transition metals and others - Period 4
          { symbol: "Ga", name: "Gallium", atomicNumber: 31, atomicMass: 69.723, category: "Post-Transition Metal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p¹", group: 13, period: 4, color: "#77AADD" },
          { symbol: "Ge", name: "Germanium", atomicNumber: 32, atomicMass: 72.630, category: "Metalloid", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p²", group: 14, period: 4, color: "#CC9988" },
          { symbol: "As", name: "Arsenic", atomicNumber: 33, atomicMass: 74.922, category: "Metalloid", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p³", group: 15, period: 4, color: "#CC9988" },
          { symbol: "Se", name: "Selenium", atomicNumber: 34, atomicMass: 78.971, category: "Nonmetal", state: "Solid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁴", group: 16, period: 4, color: "#88FF88" },
          { symbol: "Br", name: "Bromine", atomicNumber: 35, atomicMass: 79.904, category: "Halogen", state: "Liquid", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁵", group: 17, period: 4, color: "#FFFF00" },
          { symbol: "Kr", name: "Krypton", atomicNumber: 36, atomicMass: 83.798, category: "Noble Gas", state: "Gas", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁶", group: 18, period: 4, color: "#96AAFF" },
        ];
        
        // Map categories to colors for the legend
        const categoryColors = {
          "Nonmetal": "#88FF88",
          "Noble Gas": "#96AAFF",
          "Alkali Metal": "#FF9988",
          "Alkaline Earth Metal": "#FFAA00",
          "Metalloid": "#CC9988",
          "Halogen": "#FFFF00",
          "Post-Transition Metal": "#77AADD",
          "Transition Metal": "#DDAACC"
        };
    
        // Global variables
        let cellWidth, cellHeight;
        let cellPadding = 2;
        let margin = 20;
        let hoverElement = null;
        let electrons = [];
        let nucleusRadius;
        
        // p5.js setup function
        function setup() {
          const canvas = createCanvas(containerWidth, containerHeight);
          canvas.parent('periodic-table-container');
          
          // Calculate cell dimensions based on container size
          const maxCellWidth = (containerWidth - 2 * margin) / 18;
          const maxCellHeight = (containerHeight - 2 * margin - 150) / 7; // Leave space for legend
          cellWidth = min(maxCellWidth, 70);
          cellHeight = min(maxCellHeight, 70);
          
          nucleusRadius = cellWidth / 6;
          
          // Initialize electron animation
          for (let i = 0; i < 10; i++) {
            electrons.push({
              shell: floor(random(1, 4)),
              angle: random(TWO_PI),
              speed: random(0.01, 0.05)
            });
          }
          
          // Create atomic animation sketch
          let atomicSketch = new p5(createAtomicSketch, 'atomic-animation');
        }
        
        // p5.js draw function
        function draw() {
          background(18, 18, 22);
          
          // Draw grid
          drawPeriodicTable();
          
          // Check for hover
          checkHover();
          
          // Draw legend
          drawLegend();
        }
        
        // Draw the periodic table grid
        function drawPeriodicTable() {
          for (let element of elements) {
            const x = margin + (element.group - 1) * cellWidth;
            let y = margin + (element.period - 1) * cellHeight;
            
            // Adjust position for lanthanides and actinides (not implemented in this example)
            
            const isHover = hoverElement === element;
            drawElementCell(x, y, element, isHover);
          }
        }
        
        // Draw individual element cell
        function drawElementCell(x, y, element, isHover) {
          // Cell background
          noStroke();
          if (isHover) {
            fill(255, 255, 255, 30);
          } else {
            fill(hexToRgb(element.color, 0.7));
          }
          
          rect(x, y, cellWidth - cellPadding, cellHeight - cellPadding, 5);
          
          // Add glow effect on hover
          if (isHover) {
            drawingContext.shadowBlur = 15;
            drawingContext.shadowColor = element.color;
          } else {
            drawingContext.shadowBlur = 0;
          }
          
          // Element symbol
          textAlign(CENTER, CENTER);
          textSize(isHover ? 22 : 18);
          fill(255);
          text(element.symbol, x + (cellWidth - cellPadding) / 2, y + (cellHeight - cellPadding) / 2 - 5);
          
          // Atomic number
          textAlign(LEFT, TOP);
          textSize(10);
          fill(200);
          text(element.atomicNumber, x + 5, y + 5);
          
          // Reset shadow
          drawingContext.shadowBlur = 0;
        }
        
        // Draw the category legend
        function drawLegend() {
          const legendX = margin;
          const legendY = height - 100;
          const swatchSize = 15;
          const legendGap = 20;
          
          textAlign(LEFT, CENTER);
          textSize(16);
          fill(255);
          text("Element Categories:", legendX, legendY - 30);
          
          let xPos = legendX;
          let yPos = legendY;
          let count = 0;
          
          for (const [category, color] of Object.entries(categoryColors)) {
            if (count > 0 && count % 4 === 0) {
              xPos = legendX;
              yPos += 25;
            }
            
            fill(hexToRgb(color, 0.7));
            noStroke();
            rect(xPos, yPos, swatchSize, swatchSize, 3);
            
            fill(200);
            textSize(12);
            text(category, xPos + swatchSize + 5, yPos + swatchSize/2);
            
            xPos += 150;
            count++;
          }
        }
        
        // Check if mouse is hovering over an element
        function checkHover() {
          let hoveredElement = null;
          
          for (let element of elements) {
            const x = margin + (element.group - 1) * cellWidth;
            const y = margin + (element.period - 1) * cellHeight;
            
            if (mouseX >= x && mouseX <= x + cellWidth - cellPadding && 
                mouseY >= y && mouseY <= y + cellHeight - cellPadding) {
              hoveredElement = element;
              break;
            }
          }
          
          if (hoveredElement !== hoverElement) {
            hoverElement = hoveredElement;
            updateInfoPanel();
          }
        }
        
        // Update the info panel with element data
        function updateInfoPanel() {
          const infoPanel = document.getElementById("info-panel");
          
          if (hoverElement) {
            document.getElementById("element-name").textContent = hoverElement.name;
            document.getElementById("element-symbol").textContent = hoverElement.symbol;
            document.getElementById("atomic-number").textContent = hoverElement.atomicNumber;
            document.getElementById("atomic-mass").textContent = hoverElement.atomicMass;
            document.getElementById("category").textContent = hoverElement.category;
            document.getElementById("state").textContent = hoverElement.state;
            document.getElementById("electron-config").textContent = hoverElement.electronConfig;
            
            infoPanel.style.display = "block";
          } else {
            infoPanel.style.display = "none";
          }
        }
        
        // Create atomic structure animation
        function createAtomicSketch(p) {
          let width = 300;
          let height = 200;
          let electronShells = [];
          
          p.setup = function() {
            p.createCanvas(width, height);
          };
          
          p.draw = function() {
            p.background(30, 30, 30, 220);
            
            if (hoverElement) {
              // Draw nucleus
              p.push();
              p.translate(width/2, height/2);
              
              // Draw dynamic nucleus glow
              const glowSize = 20 + sin(p.frameCount * 0.05) * 5;
              p.noStroke();
              for (let i = 5; i > 0; i--) {
                const alpha = 50 - i * 10;
                p.fill(200, 50, 80, alpha);
                p.ellipse(0, 0, nucleusRadius * 2 + glowSize/i);
              }
              
              // Draw nucleus
              p.fill(200, 60, 60);
              p.ellipse(0, 0, nucleusRadius * 2);
              
              // Calculate number of electrons based on atomic number
              const electronCount = hoverElement.atomicNumber;
              
              // Determine shells based on electron configuration
              const shells = [];
              let remainingElectrons = electronCount;
              
              // Simplified shell capacity model (2, 8, 8, 18...)
              const shellCapacities = [2, 8, 8, 18, 18, 32, 32];
              
              for (let i = 0; i < shellCapacities.length; i++) {
                const shellElectrons = Math.min(remainingElectrons, shellCapacities[i]);
                if (shellElectrons > 0) {
                  shells.push(shellElectrons);
                  remainingElectrons -= shellElectrons;
                }
                if (remainingElectrons <= 0) break;
              }
              
              // Draw electron shells
              for (let s = 0; s < shells.length; s++) {
                const shellRadius = nucleusRadius * 2 + (s + 1) * 25;
                const shellElectrons = shells[s];
                
                // Draw shell orbit
                p.noFill();
                p.stroke(100, 100, 255, 100);
                p.ellipse(0, 0, shellRadius * 2);
                
                // Draw electrons on this shell
                for (let e = 0; e < shellElectrons; e++) {
                  const angle = p.TWO_PI / shellElectrons * e + (p.frameCount * (0.01 - s * 0.002));
                  const electronX = cos(angle) * shellRadius;
                  const electronY = sin(angle) * shellRadius;
                  
                  // Electron glow
                  p.noStroke();
                  p.fill(100, 150, 255, 100);
                  p.ellipse(electronX, electronY, 8);
                  
                  // Electron
                  p.fill(150, 200, 255);
                  p.ellipse(electronX, electronY, 5);
                }
              }
              
              p.pop();
            }
          };
        }
        
        // Convert hex color to rgba
        function hexToRgb(hex, alpha = 1) {
          // Remove # if present
          hex = hex.replace('#', '');
          
          // Parse hex to rgb
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          
          return \`rgba(\${r}, \${g}, \${b}, \${alpha})\`;
        }
        
        // Handle window resize
        function windowResized() {
          resizeCanvas(containerWidth, containerHeight);
          
          // Recalculate cell dimensions
          const maxCellWidth = (containerWidth - 2 * margin) / 18;
          const maxCellHeight = (containerHeight - 2 * margin - 150) / 7;
          cellWidth = min(maxCellWidth, 70);
          cellHeight = min(maxCellHeight, 70);
          nucleusRadius = cellWidth / 6;
        }
        
        // Get container dimensions
        const containerWidth = ${containerRef.current?.clientWidth || 800};
        const containerHeight = 600; // Fixed height for now
      `;

      // Append the table script
      document.body.appendChild(tableScript);
    };

    // Append p5.js script to document
    document.body.appendChild(p5Script);

    // Create the info panel
    const infoPanel = document.createElement('div');
    infoPanel.id = 'info-panel';
    infoPanel.innerHTML = `
      <h2 id="element-name">Element Name</h2>
      <div class="property">
        <span class="property-label">Symbol:</span>
        <span class="property-value" id="element-symbol">--</span>
      </div>
      <div class="property">
        <span class="property-label">Atomic Number:</span>
        <span class="property-value" id="atomic-number">--</span>
      </div>
      <div class="property">
        <span class="property-label">Atomic Mass:</span>
        <span class="property-value" id="atomic-mass">--</span>
      </div>
      <div class="property">
        <span class="property-label">Category:</span>
        <span class="property-value" id="category">--</span>
      </div>
      <div class="property">
        <span class="property-label">State at STP:</span>
        <span class="property-value" id="state">--</span>
      </div>
      <div class="property">
        <span class="property-label">Electron Configuration:</span>
      </div>
      <div id="electron-config">--</div>
      <div id="atomic-animation"></div>
    `;
    containerRef.current.appendChild(infoPanel);

    // Add styles for the info panel
    const style = document.createElement('style');
    style.textContent = `
      #info-panel {
        position: absolute;
        width: 300px;
        top: 20px;
        right: 20px;
        background-color: rgba(30, 30, 30, 0.85);
        color: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        display: none;
        z-index: 100;
      }
      #info-panel h2 {
        margin-top: 0;
        border-bottom: 1px solid #444;
        padding-bottom: 8px;
      }
      #electron-config {
        font-family: monospace;
        background-color: rgba(40, 40, 40, 0.8);
        padding: 8px;
        border-radius: 5px;
        margin: 10px 0;
      }
      .property {
        margin: 8px 0;
        display: flex;
        justify-content: space-between;
      }
      .property-label {
        color: #aaa;
      }
      .property-value {
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);

    // Clean up function
    return () => {
      if (containerRef.current) {
        // Remove the p5 canvas
        const canvas = containerRef.current.querySelector('canvas');
        if (canvas) canvas.remove();
        
        // Remove the info panel
        const panel = document.getElementById('info-panel');
        if (panel) panel.remove();
      }

      // Remove scripts
      const scripts = document.querySelectorAll('script');
      scripts.forEach(script => {
        if (script.src.includes('p5.js') || script.textContent.includes('elements = [')) {
          script.remove();
        }
      });

      // Remove style
      const styles = document.querySelectorAll('style');
      styles.forEach(style => {
        if (style.textContent.includes('#info-panel')) {
          style.remove();
        }
      });
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-background dark:bg-background rounded-lg overflow-hidden">
      <div id="periodic-table-container" ref={containerRef} className="w-full h-full relative"></div>
    </div>
  );
};

export default InteractivePeriodicTable;
