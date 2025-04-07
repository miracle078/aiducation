import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

interface CircularPeriodicTableProps {
  highlightedElement?: string | null;
  isActive?: boolean;
}

const CircularPeriodicTable: React.FC<CircularPeriodicTableProps> = ({ 
  highlightedElement = null,
  isActive = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<p5>();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clean up any existing p5 instance
    if (canvasRef.current) {
      canvasRef.current.remove();
    }
    
    // Create new p5 instance
    const sketch = (p: p5) => {
      let elements: any[] = [];
      let selectedElement: any = null;
      let cellSize = 70;
      let electronOrbitals: {angle: number, speed: number}[] = [];
      let electronSpeed = 0.02;
      let categoryColors: Record<string, p5.Color> = {};
      
      // Selected elements for circular arrangement (20 key elements)
      const elementSymbols = [
        "H", "He", 
        "Li", "C", "N", "O", "F", "Ne", 
        "Na", "Mg", "Al", "Si", "P", "S", "Cl", 
        "Fe", "Cu", "Zn", "Br", "Ag"
      ];
      
      p.setup = () => {
        p.createCanvas(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
        p.textAlign(p.CENTER, p.CENTER);
        
        // Initialize element data
        loadElementData();
        
        // Set up category colors
        setupCategoryColors();
        
        // Set up electron orbital animation data
        setupElectronOrbitals();
        
        // Set selected element if highlighted
        if (highlightedElement) {
          selectedElement = elements.find(e => e.symbol === highlightedElement) || null;
        }
      };
      
      p.draw = () => {
        if (!isActive) {
          // Just draw a simple placeholder when not active
          p.background(18, 18, 24);
          p.fill(40);
          p.noStroke();
          p.textSize(14);
          p.text("Interactive Periodic Table", p.width/2, p.height/2);
          return;
        }
        
        p.background(18, 18, 24);
        
        // Draw title
        p.fill(200);
        p.textSize(24);
        p.textStyle(p.BOLD);
        p.text("Interactive Periodic Table", p.width/2, 50);
        
        // If no element is selected, animate a default atom in the center
        if (!selectedElement) {
          drawDefaultAtom();
        } else {
          // Draw selected element's atomic structure in the center
          drawAtomAnimation(p.width/2, p.height/2, selectedElement);
          
          // Draw element details
          drawElementDetails();
        }
        
        // Draw elements in a circular pattern
        drawCircularElements();
        
        // Draw category legend if space allows
        if (p.width > 800) {
          drawCategoryLegend();
        }
      };
      
      p.windowResized = () => {
        if (!containerRef.current) return;
        p.resizeCanvas(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };
      
      const drawDefaultAtom = () => {
        // Draw a generic atom animation in the center when no element is selected
        let x = p.width/2;
        let y = p.height/2;
        
        // Draw electron shells (orbits)
        p.noFill();
        for (let i = 0; i < 3; i++) {
          p.stroke(100, 100, 255, 150 - i * 15);
          p.strokeWeight(1);
          p.ellipse(x, y, 100 + i * 80, 100 + i * 80);
        }
        
        // Draw nucleus
        let nucleusSize = 30;
        
        // Nucleus glow effect
        for (let i = 3; i > 0; i--) {
          p.noStroke();
          p.fill(255, 100, 100, 80 - i * 20);
          p.ellipse(x, y, nucleusSize + i * 5, nucleusSize + i * 5);
        }
        
        // Nucleus
        p.fill(255, 70, 70);
        p.ellipse(x, y, nucleusSize, nucleusSize);
        
        // Add texture to nucleus
        for (let i = 0; i < 5; i++) {
          p.fill(255, 150, 150, 150);
          let angle = p.random(p.TWO_PI);
          let distance = p.random(nucleusSize/4);
          p.ellipse(x + p.cos(angle) * distance, y + p.sin(angle) * distance, 2, 2);
        }
        
        // Draw generic electrons
        for (let shell = 0; shell < 3; shell++) {
          let shellRadius = 50 + shell * 40;
          let electronsInShell = shell === 0 ? 2 : shell === 1 ? 8 : 3;
          
          for (let e = 0; e < electronsInShell; e++) {
            let angle = (e / electronsInShell) * p.TWO_PI + (p.millis() / 1000) * (1 - shell * 0.2);
            
            let offsetX = p.cos(angle) * shellRadius;
            let offsetY = p.sin(angle) * shellRadius;
            
            // Draw electron glow
            p.noStroke();
            for (let i = 2; i > 0; i--) {
              p.fill(100, 200, 255, 50 - i * 15);
              p.ellipse(x + offsetX, y + offsetY, 8 + i * 2, 8 + i * 2);
            }
            
            // Draw electron
            p.fill(100, 200, 255);
            p.ellipse(x + offsetX, y + offsetY, 7, 7);
          }
        }
        
        // Add a prompt in the center
        p.fill(200);
        p.textSize(18);
        p.text("Interactive Periodic Table", x, y + 140);
      };
      
      const drawCircularElements = () => {
        const elementCount = elements.length;
        const centerX = p.width/2;
        const centerY = p.height/2;
        const radius = p.min(p.width, p.height) * 0.38;
        
        for (let i = 0; i < elementCount; i++) {
          const element = elements[i];
          
          // Calculate position in a circle
          const angle = p.map(i, 0, elementCount, -p.PI/4, p.TWO_PI-p.PI/4);
          const x = centerX + p.cos(angle) * radius;
          const y = centerY + p.sin(angle) * radius;
          
          // Check if mouse is hovering over this element
          let isHovered = p.dist(p.mouseX, p.mouseY, x, y) < cellSize/2;
          
          if (isHovered) {
            p.fill(220, 220, 255);
            p.stroke(255);
            p.strokeWeight(2);
          } else if (element === selectedElement || element.symbol === highlightedElement) {
            p.fill(250, 250, 180);
            p.stroke(255, 255, 0);
            p.strokeWeight(2);
          } else {
            p.fill(categoryColors[element.category]);
            p.stroke(60);
            p.strokeWeight(1);
          }
          
          // Draw element cell
          p.ellipse(x, y, cellSize, cellSize);
          
          // Draw element symbol - reduced text size
          p.noStroke();
          p.fill(0);
          p.textSize(18);
          p.textStyle(p.BOLD);
          p.text(element.symbol, x, y - 5);
          
          // Draw atomic number - reduced text size
          p.textSize(9);
          p.textStyle(p.NORMAL);
          p.fill(50);
          p.text(element.number, x, y - 18);
          
          // Draw atomic mass with reduced text size
          if (element.mass > 0) {
            p.textSize(8);
            p.text(element.mass.toFixed(1), x, y + 13);
          }
        }
      };
      
      const drawElementDetails = () => {
        if (!selectedElement) return;
        
        // Position for details panel - bottom of the screen
        let detailX = p.width/2 - 400;
        let detailY = p.height - 190;
        let detailWidth = 800;
        let detailHeight = 170;
        
        // Adjust for smaller screens
        if (p.width < 900) {
          detailX = p.width/2 - p.width * 0.45;
          detailWidth = p.width * 0.9;
          detailHeight = 110;
        }
        
        // Draw details background
        p.fill(40, 40, 60, 230);
        p.stroke(100, 100, 150);
        p.strokeWeight(2);
        p.rect(detailX, detailY, detailWidth, detailHeight, 10);
        
        // Element name - reduced size
        p.fill(255);
        p.textAlign(p.CENTER, p.TOP);
        p.textSize(24);
        p.textStyle(p.BOLD);
        p.text(selectedElement.name, p.width/2, detailY + 15);
        
        // Category label - reduced size
        p.textSize(12);
        p.textStyle(p.ITALIC);
        p.fill(categoryColors[selectedElement.category]);
        p.text(selectedElement.category, p.width/2, detailY + 45);
        
        // Draw properties in two columns
        p.fill(255);
        p.textAlign(p.LEFT, p.TOP);
        p.textStyle(p.NORMAL);
        p.textSize(14);
        
        // Left column
        let leftColX = detailX + 30;
        let infoY = detailY + 70;
        let infoSpacing = 20;
        
        p.text(`Atomic Number: ${selectedElement.number}`, leftColX, infoY);
        p.text(`Atomic Mass: ${selectedElement.mass} u`, leftColX, infoY + infoSpacing);
        
        // Right column
        let rightColX = p.width/2 + 50;
        
        p.text(`Electron Config: ${selectedElement.electronConfig}`, rightColX, infoY);
        
        // Reset text alignment
        p.textAlign(p.CENTER, p.CENTER);
      };
      
      const drawAtomAnimation = (x: number, y: number, element: any) => {
        // Get electron configuration for animation
        let electronShells = getElectronShells(element.number);
        let maxShellRadius = 50 + (electronShells.length - 1) * 40;
        
        // Draw electron shells (orbits)
        p.noFill();
        for (let i = 0; i < electronShells.length; i++) {
          if (electronShells[i] > 0) {
            // Draw shell orbit
            p.stroke(100, 100, 255, 150 - i * 15);
            p.strokeWeight(1);
            p.ellipse(x, y, 100 + i * 80, 100 + i * 80);
          }
        }
        
        // Draw nucleus
        let nucleusSize = p.min(20 + element.number/10, 40);
        
        // Nucleus glow effect
        for (let i = 3; i > 0; i--) {
          p.noStroke();
          p.fill(255, 100, 100, 80 - i * 20);
          p.ellipse(x, y, nucleusSize + i * 5, nucleusSize + i * 5);
        }
        
        // Nucleus
        p.fill(255, 70, 70);
        p.ellipse(x, y, nucleusSize, nucleusSize);
        
        // Add texture to nucleus
        for (let i = 0; i < 5; i++) {
          p.fill(255, 150, 150, 150);
          let angle = p.random(p.TWO_PI);
          let distance = p.random(nucleusSize/4);
          p.ellipse(x + p.cos(angle) * distance, y + p.sin(angle) * distance, 2, 2);
        }
        
        // Draw electrons
        p.noStroke();
        
        let totalElectrons = 0;
        for (let shell = 0; shell < electronShells.length; shell++) {
          let electronsInShell = electronShells[shell];
          let shellRadius = 50 + shell * 40;
          
          for (let e = 0; e < electronsInShell; e++) {
            let electronId = totalElectrons + e;
            let orbitAngle = electronId % electronOrbitals.length;
            let angle = electronOrbitals[orbitAngle].angle;
            
            // Add a phase shift based on electron position
            angle += e * (p.TWO_PI / electronsInShell);
            
            let offsetX = p.cos(angle) * shellRadius;
            let offsetY = p.sin(angle) * shellRadius;
            
            // Draw electron glow
            for (let i = 2; i > 0; i--) {
              p.fill(100, 200, 255, 50 - i * 15);
              p.ellipse(x + offsetX, y + offsetY, 8 + i * 2, 8 + i * 2);
            }
            
            // Draw electron
            p.fill(100, 200, 255);
            p.ellipse(x + offsetX, y + offsetY, 7, 7);
          }
          
          totalElectrons += electronsInShell;
        }
        
        // Label for shells - smaller text
        p.textSize(10);
        p.fill(200);
        for (let i = 0; i < electronShells.length; i++) {
          if (electronShells[i] > 0) {
            let shellLabels = ["K", "L", "M", "N", "O", "P", "Q"];
            let labelAngle = p.PI/4;
            let labelX = x + (50 + i * 40) * p.cos(labelAngle);
            let labelY = y + (50 + i * 40) * p.sin(labelAngle);
            p.text(shellLabels[i], labelX, labelY);
          }
        }
        
        // Show valence electrons count - smaller text
        p.textSize(12);
        p.fill(255);
        if (element.group >= 1 && element.group <= 18) {
          let valence = getValenceElectrons(element);
          p.text(`Valence electrons: ${valence}`, x, y + maxShellRadius + 30);
        }
        
        // Update electron animations
        updateElectronAnimations();
      };
      
      const drawCategoryLegend = () => {
        let legendX = 20;
        let legendY = 100;
        let legendSpacing = 22;
        
        p.textAlign(p.LEFT, p.CENTER);
        p.textSize(11);
        
        p.fill(255);
        p.textStyle(p.BOLD);
        p.text("ELEMENT CATEGORIES", legendX, legendY - 20);
        
        p.textStyle(p.NORMAL);
        let index = 0;
        for (let category in categoryColors) {
          let y = legendY + index * legendSpacing;
          
          // Draw color square
          p.fill(categoryColors[category]);
          p.stroke(100);
          p.strokeWeight(0.5);
          p.rect(legendX, y - 6, 10, 10);
          
          // Draw category name
          p.noStroke();
          p.fill(200);
          p.text(category, legendX + 18, y);
          
          index++;
        }
        
        p.textAlign(p.CENTER, p.CENTER);
      };
      
      const getValenceElectrons = (element: any) => {
        if (element.block === "s" || element.block === "p") {
          if (element.group === 1) return 1;
          else if (element.group === 2) return 2;
          else if (element.group >= 13 && element.group <= 18) return element.group - 10;
        } else if (element.block === "d") {
          return (element.group === 12) ? 2 : element.group;
        } else if (element.block === "f") {
          return 3;
        }
        
        return "-";
      };
      
      const updateElectronAnimations = () => {
        for (let i = 0; i < electronOrbitals.length; i++) {
          electronOrbitals[i].angle += electronOrbitals[i].speed;
          if (electronOrbitals[i].angle > p.TWO_PI) {
            electronOrbitals[i].angle -= p.TWO_PI;
          }
        }
      };
      
      const setupElectronOrbitals = () => {
        electronOrbitals = [];
        for (let i = 0; i < 20; i++) {
          let shellNum = Math.floor(i / 8) + 1;
          let speedVariation = p.map(shellNum, 1, 3, 1.5, 0.5);
          
          electronOrbitals.push({
            angle: p.random(p.TWO_PI),
            speed: electronSpeed * speedVariation * p.random(0.8, 1.2)
          });
        }
      };
      
      const getElectronShells = (atomicNumber: number) => {
        let shells = [0, 0, 0, 0, 0, 0, 0];
        let remaining = atomicNumber;
        let shellCapacity = [2, 8, 18, 32, 32, 18, 8];
        
        for (let i = 0; i < shells.length; i++) {
          shells[i] = Math.min(shellCapacity[i], remaining);
          remaining -= shells[i];
          if (remaining <= 0) break;
        }
        
        return shells;
      };
      
      const setupCategoryColors = () => {
        categoryColors = {
          "Alkali Metal": p.color(255, 102, 102, 200),
          "Alkaline Earth Metal": p.color(255, 191, 102, 200),
          "Transition Metal": p.color(255, 217, 102, 200),
          "Post-Transition Metal": p.color(153, 255, 153, 200),
          "Metalloid": p.color(102, 255, 217, 200),
          "Nonmetal": p.color(102, 217, 255, 200),
          "Halogen": p.color(191, 102, 255, 200),
          "Noble Gas": p.color(217, 102, 255, 200)
        };
      };
      
      const loadElementData = () => {
        // Complete element data for the 20 selected elements
        const allElements = [
          // Period 1
          {number: 1, symbol: "H", name: "Hydrogen", mass: 1.008, group: 1, period: 1, category: "Nonmetal", block: "s", electronConfig: "1s¹", meltingPoint: 14.01, boilingPoint: 20.28, discoveredBy: "Henry Cavendish", discoveryYear: 1766, uses: "Fuel, production of ammonia, methanol and hydrogen peroxide; hydrogenation of fats and oils"},
          {number: 2, symbol: "He", name: "Helium", mass: 4.0026, group: 18, period: 1, category: "Noble Gas", block: "s", electronConfig: "1s²", meltingPoint: 0.95, boilingPoint: 4.22, discoveredBy: "Pierre Janssen", discoveryYear: 1868, uses: "Balloons, deep-sea diving, cooling MRI magnets, gas for welding"},
          
          // Period 2
          {number: 3, symbol: "Li", name: "Lithium", mass: 6.94, group: 1, period: 2, category: "Alkali Metal", block: "s", electronConfig: "1s² 2s¹", meltingPoint: 453.69, boilingPoint: 1560, discoveredBy: "Johan August Arfwedson", discoveryYear: 1817, uses: "Rechargeable batteries, ceramics and glass, treatment for bipolar disorder"},
          {number: 6, symbol: "C", name: "Carbon", mass: 12.011, group: 14, period: 2, category: "Nonmetal", block: "p", electronConfig: "1s² 2s² 2p²", meltingPoint: 3800, boilingPoint: 4300, discoveredBy: "Ancient", discoveryYear: 0, uses: "Structural element in all organic compounds, fuels, steel production, pencils (graphite)"},
          {number: 7, symbol: "N", name: "Nitrogen", mass: 14.007, group: 15, period: 2, category: "Nonmetal", block: "p", electronConfig: "1s² 2s² 2p³", meltingPoint: 63.15, boilingPoint: 77.36, discoveredBy: "Daniel Rutherford", discoveryYear: 1772, uses: "Ammonia production, fertilizers, refrigerant, preservation of biological samples"},
          {number: 8, symbol: "O", name: "Oxygen", mass: 15.999, group: 16, period: 2, category: "Nonmetal", block: "p", electronConfig: "1s² 2s² 2p⁴", meltingPoint: 54.36, boilingPoint: 90.2, discoveredBy: "Carl Wilhelm Scheele", discoveryYear: 1771, uses: "Respiration, combustion, steel production, medical treatment"},
          {number: 9, symbol: "F", name: "Fluorine", mass: 18.998, group: 17, period: 2, category: "Halogen", block: "p", electronConfig: "1s² 2s² 2p⁵", meltingPoint: 53.53, boilingPoint: 85.03, discoveredBy: "André-Marie Ampère", discoveryYear: 1810, uses: "Toothpaste, uranium processing, refrigerants, non-stick coatings"},
          {number: 10, symbol: "Ne", name: "Neon", mass: 20.180, group: 18, period: 2, category: "Noble Gas", block: "p", electronConfig: "1s² 2s² 2p⁶", meltingPoint: 24.56, boilingPoint: 27.07, discoveredBy: "William Ramsay", discoveryYear: 1898, uses: "Neon signs, lasers, cryogenic refrigeration, high-voltage indicators"},
          
          // Period 3
          {number: 11, symbol: "Na", name: "Sodium", mass: 22.990, group: 1, period: 3, category: "Alkali Metal", block: "s", electronConfig: "1s² 2s² 2p⁶ 3s¹", meltingPoint: 370.87, boilingPoint: 1156, discoveredBy: "Humphry Davy", discoveryYear: 1807, uses: "Table salt (NaCl), street lamps, soap making, chemical reagent"},
          {number: 12, symbol: "Mg", name: "Magnesium", mass: 24.305, group: 2, period: 3, category: "Alkaline Earth Metal", block: "s", electronConfig: "1s² 2s² 2p⁶ 3s²", meltingPoint: 923, boilingPoint: 1363, discoveredBy: "Joseph Black", discoveryYear: 1755, uses: "Lightweight structural material, flares, fireworks, antacids, fertilizers"},
          {number: 13, symbol: "Al", name: "Aluminum", mass: 26.982, group: 13, period: 3, category: "Post-Transition Metal", block: "p", electronConfig: "1s² 2s² 2p⁶ 3s² 3p¹", meltingPoint: 933.47, boilingPoint: 2792, discoveredBy: "Hans Christian Ørsted", discoveryYear: 1825, uses: "Aircraft construction, packaging, building materials, kitchen utensils"},
          {number: 14, symbol: "Si", name: "Silicon", mass: 28.085, group: 14, period: 3, category: "Metalloid", block: "p", electronConfig: "1s² 2s² 2p⁶ 3s² 3p²", meltingPoint: 1687, boilingPoint: 3538, discoveredBy: "Jöns Jacob Berzelius", discoveryYear: 1824, uses: "Semiconductors, glass, ceramics, solar cells, microelectronics"},
          {number: 15, symbol: "P", name: "Phosphorus", mass: 30.974, group: 15, period: 3, category: "Nonmetal", block: "p", electronConfig: "1s² 2s² 2p⁶ 3s² 3p³", meltingPoint: 317.3, boilingPoint: 553.6, discoveredBy: "Hennig Brand", discoveryYear: 1669, uses: "Fertilizers, detergents, matches, steel production, pesticides"},
          {number: 16, symbol: "S", name: "Sulfur", mass: 32.06, group: 16, period: 3, category: "Nonmetal", block: "p", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁴", meltingPoint: 388.36, boilingPoint: 717.87, discoveredBy: "Ancient", discoveryYear: 0, uses: "Fertilizers, gunpowder, sulfuric acid production, rubber vulcanization, fungicides"},
          {number: 17, symbol: "Cl", name: "Chlorine", mass: 35.45, group: 17, period: 3, category: "Halogen", block: "p", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁵", meltingPoint: 171.6, boilingPoint: 239.11, discoveredBy: "Carl Wilhelm Scheele", discoveryYear: 1774, uses: "Water purification, bleaches, disinfectants, production of plastics like PVC"},
          
          // Selected transition metals
          {number: 26, symbol: "Fe", name: "Iron", mass: 55.845, group: 8, period: 4, category: "Transition Metal", block: "d", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶", meltingPoint: 1811, boilingPoint: 3134, discoveredBy: "Ancient", discoveryYear: 0, uses: "Steel production, construction, tools, vehicles, machinery, hemoglobin in blood"},
          {number: 29, symbol: "Cu", name: "Copper", mass: 63.546, group: 11, period: 4, category: "Transition Metal", block: "d", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d¹⁰", meltingPoint: 1357.77, boilingPoint: 2835, discoveredBy: "Ancient", discoveryYear: 0, uses: "Electrical wiring, plumbing, electronics, coins, roofing materials"},
          {number: 30, symbol: "Zn", name: "Zinc", mass: 65.38, group: 12, period: 4, category: "Transition Metal", block: "d", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰", meltingPoint: 692.68, boilingPoint: 1180, discoveredBy: "Ancient", discoveryYear: 0, uses: "Galvanizing iron, batteries, brass and bronze alloys, sunscreen"},
          
          // Other important elements
          {number: 35, symbol: "Br", name: "Bromine", mass: 79.904, group: 17, period: 4, category: "Halogen", block: "p", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁵", meltingPoint: 265.8, boilingPoint: 332, discoveredBy: "Antoine Jérôme Balard", discoveryYear: 1826, uses: "Flame retardants, water purification, pesticides, medicines"},
          {number: 47, symbol: "Ag", name: "Silver", mass: 107.87, group: 11, period: 5, category: "Transition Metal", block: "d", electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁶ 5s¹ 4d¹⁰", meltingPoint: 1234.93, boilingPoint: 2435, discoveredBy: "Ancient", discoveryYear: 0, uses: "Jewelry, photography, electrical conductors, mirrors, antibacterial agents"}
        ];
        
        // Filter elements by the selected symbols
        elements = [];
        for (let symbol of elementSymbols) {
          const element = allElements.find(e => e.symbol === symbol);
          if (element) {
            elements.push(element);
          }
        }
      };
      
      p.mousePressed = () => {
        if (!isActive) return;
        
        // Check if clicked on an element
        const centerX = p.width/2;
        const centerY = p.height/2;
        const radius = p.min(p.width, p.height) * 0.38;
        
        let clickedOnElement = false;
        
        for (let i = 0; i < elements.length; i++) {
          const angle = p.map(i, 0, elements.length, -p.PI/4, p.TWO_PI-p.PI/4);
          const x = centerX + p.cos(angle) * radius;
          const y = centerY + p.sin(angle) * radius;
          
          if (p.dist(p.mouseX, p.mouseY, x, y) < cellSize/2) {
            selectedElement = elements[i];
            clickedOnElement = true;
            break;
          }
        }
        
        // If clicked outside elements, deselect current element
        if (!clickedOnElement) {
          selectedElement = null;
        }
      };
    };
    
    canvasRef.current = new p5(sketch, containerRef.current);
    
    return () => {
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
    };
  }, [highlightedElement, isActive]);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
    />
  );
};

export default CircularPeriodicTable;
