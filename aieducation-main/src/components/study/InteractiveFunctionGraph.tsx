
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Plotly: any;
  }
}

interface InteractiveFunctionGraphProps {
  containerId?: string;
  className?: string;
}

export function InteractiveFunctionGraph({ 
  containerId = 'interactive-function-graph',
  className = ''
}: InteractiveFunctionGraphProps) {
  const graphRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  
  useEffect(() => {
    if (!graphRef.current || initialized.current) return;
    
    // Allow time for the DOM to render
    const timer = setTimeout(() => {
      initialized.current = true;
      initializeGraph();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [containerId]);
  
  const initializeGraph = () => {
    if (!graphRef.current || !window.Plotly) return;
    
    // Current function parameters
    let a = 1;
    let b = 0;
    let c = 0;
    
    // Function to calculate y value for given x
    const calculateY = (x: number) => {
      return a * x * x + b * x + c;
    };
    
    // Generate data points
    const xValues: number[] = [];
    const yValues: number[] = [];
    
    // Calculate reasonable x range
    const vertexX = a !== 0 ? -b / (2 * a) : 0;
    const range = Math.max(5, Math.abs(vertexX) * 2 + 2);
    const start = -range;
    const end = range;
    const step = (end - start) / 100;
    
    for (let x = start; x <= end; x += step) {
      xValues.push(x);
      yValues.push(calculateY(x));
    }
    
    // Create trace for the main function
    const trace = {
      x: xValues,
      y: yValues,
      type: 'scatter',
      mode: 'lines',
      name: `f(x) = ${a}x² + ${b}x + ${c}`,
      line: {
        color: '#3498db',
        width: 3
      }
    };
    
    // Add vertex point if applicable
    let data = [trace];
    if (a !== 0) {
      const vertexTrace = {
        x: [vertexX],
        y: [calculateY(vertexX)],
        type: 'scatter',
        mode: 'markers',
        name: 'Vertex',
        marker: {
          color: '#ff5722',
          size: 10
        },
        line: {
          color: 'transparent',
          width: 0
        }
      };
      data.push(vertexTrace);
    }
    
    // Define layout
    const layout = {
      title: `Graph of f(x) = ${a}x² + ${b}x + ${c}`,
      xaxis: {
        title: 'x',
        zeroline: true,
        showgrid: true,
        range: [start, end]
      },
      yaxis: {
        title: 'f(x)',
        zeroline: true,
        showgrid: true,
        range: [-10, 10]
      },
      showlegend: false,
      hovermode: 'closest',
      margin: {
        l: 50,
        r: 50,
        b: 50,
        t: 50,
        pad: 4
      }
    };
    
    // Create the plot
    window.Plotly.newPlot(graphRef.current, data, layout);
    
    // Create sliders and update functionality after the graph is rendered
    createControls(graphRef.current.parentNode as HTMLElement);
  };
  
  const createControls = (container: HTMLElement) => {
    if (!container) return;
    
    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'mt-4 space-y-3';
    
    // Create sliders
    const parameters = [
      { id: 'parameter-a', label: 'Parameter a:', min: -5, max: 5, step: 0.1, value: 1 },
      { id: 'parameter-b', label: 'Parameter b:', min: -10, max: 10, step: 0.5, value: 0 },
      { id: 'parameter-c', label: 'Parameter c:', min: -10, max: 10, step: 0.5, value: 0 }
    ];
    
    parameters.forEach(param => {
      const controlDiv = document.createElement('div');
      controlDiv.className = 'grid grid-cols-8 gap-2 items-center';
      
      const label = document.createElement('label');
      label.className = 'col-span-2 text-sm font-medium';
      label.htmlFor = param.id;
      label.textContent = param.label;
      
      const slider = document.createElement('input');
      slider.className = 'col-span-5';
      slider.type = 'range';
      slider.id = param.id;
      slider.min = param.min.toString();
      slider.max = param.max.toString();
      slider.step = param.step.toString();
      slider.value = param.value.toString();
      
      const valueDisplay = document.createElement('span');
      valueDisplay.className = 'col-span-1 text-sm text-right';
      valueDisplay.id = `${param.id}-value`;
      valueDisplay.textContent = param.value.toString();
      
      controlDiv.appendChild(label);
      controlDiv.appendChild(slider);
      controlDiv.appendChild(valueDisplay);
      controlsContainer.appendChild(controlDiv);
    });
    
    // Insert controls before the graph
    container.insertBefore(controlsContainer, graphRef.current);
    
    // Add event listeners
    parameters.forEach(param => {
      const slider = document.getElementById(param.id) as HTMLInputElement;
      const valueDisplay = document.getElementById(`${param.id}-value`) as HTMLSpanElement;
      
      if (slider && valueDisplay) {
        slider.addEventListener('input', function() {
          valueDisplay.textContent = this.value;
          updateGraph();
        });
      }
    });
    
    function updateGraph() {
      if (!graphRef.current) return;
      
      const a = parseFloat((document.getElementById('parameter-a') as HTMLInputElement).value);
      const b = parseFloat((document.getElementById('parameter-b') as HTMLInputElement).value);
      const c = parseFloat((document.getElementById('parameter-c') as HTMLInputElement).value);
      
      // Function to calculate y value for given x
      const calculateY = (x: number) => {
        return a * x * x + b * x + c;
      };
      
      // Generate data points
      const xValues: number[] = [];
      const yValues: number[] = [];
      
      // Calculate reasonable x range based on current function
      const vertexX = a !== 0 ? -b / (2 * a) : 0;
      const range = Math.max(5, Math.abs(vertexX) * 2 + 2);
      const start = -range;
      const end = range;
      const step = (end - start) / 100;
      
      for (let x = start; x <= end; x += step) {
        xValues.push(x);
        yValues.push(calculateY(x));
      }
      
      // Update the main function trace
      window.Plotly.update(
        graphRef.current,
        {
          x: [xValues],
          y: [yValues],
          'name': [`f(x) = ${a}x² + ${b}x + ${c}`]
        },
        {
          title: `Graph of f(x) = ${a}x² + ${b}x + ${c}`,
          'xaxis.range': [start, end]
        },
        [0]
      );
      
      // Update or add the vertex point
      if (a !== 0) {
        const vertexX = -b / (2 * a);
        const vertexY = calculateY(vertexX);
        
        window.Plotly.update(
          graphRef.current,
          {
            x: [[vertexX]],
            y: [[vertexY]]
          },
          {},
          [1]
        );
      }
    }
  };
  
  return (
    <div className={className}>
      <div id={containerId} ref={graphRef} className="w-full h-[300px]" />
    </div>
  );
}
