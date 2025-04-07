
import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, Image } from "lucide-react";

const ExplainToMe: React.FC = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploaded(true);
      setMessage("Explain the reaction between marble chips and hydrochloric acid");
    }
  };
  
  const handleSendMessage = () => {
    if (isUploaded && !isProcessing && !isCompleted) {
      setIsProcessing(true);
      
      // Simulate processing time (3 seconds)
      setTimeout(() => {
        setIsProcessing(false);
        setIsCompleted(true);
      }, 3000);
    }
  };
  
  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Explain To Me</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Chat and input */}
        <Card className="min-h-[60vh] flex flex-col">
          <div className="flex-grow overflow-auto p-4">
            {isUploaded && (
              <div className="mb-4 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  U
                </div>
                <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex gap-2 items-center mb-2">
                    <span className="text-sm font-semibold">You</span>
                  </div>
                  <p>{message}</p>
                  <div className="mt-2 rounded overflow-hidden">
                    <img src="/lovable-uploads/71255f1f-673c-4c4b-ad97-4b4636fac2ce.png" alt="Question 1" className="max-w-full h-auto" />
                  </div>
                </div>
              </div>
            )}
            
            {isProcessing && (
              <div className="mb-4 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                  AI
                </div>
                <div className="bg-white border rounded-lg p-3 max-w-[80%]">
                  <div className="flex gap-2 items-center mb-2">
                    <span className="text-sm font-semibold">Chemistry Assistant</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t p-4 flex gap-2">
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
            />
            <Button 
              type="button" 
              variant="outline"
              onClick={handleFileButtonClick}
              className="rounded-full p-2 h-auto"
            >
              {isUploaded ? <Image size={18} /> : <Paperclip size={18} />}
            </Button>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question here or attach an image..."
              className="flex-grow resize-none min-h-[40px] max-h-[120px]"
              disabled={isProcessing || isCompleted}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!isUploaded || isProcessing || isCompleted}
              className="rounded-full p-2 h-auto"
            >
              <Send size={18} />
            </Button>
          </div>
        </Card>
        
        {/* Right side - AI response visualization */}
        <Card className="min-h-[80vh] flex flex-col">
          <div className="flex-grow overflow-auto p-4">
            {isCompleted && (
              <div className="h-full w-full">
                <iframe
                  srcDoc={`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marble Chips and HCl Reaction</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        
        h1, h2 {
            color: #333;
        }
        
        .container {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        
        .reaction-equation {
            text-align: center;
            font-size: 24px;
            margin: 30px 0;
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
        }
        
        .equation-input {
            width: 100px;
            text-align: center;
            font-size: 20px;
            border: 2px solid #ddd;
            border-radius: 4px;
            padding: 5px;
            margin: 0 5px;
        }
        
        .check-button {
            display: block;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
        }
        
        .check-button:hover {
            background-color: #45a049;
        }
        
        .result {
            text-align: center;
            font-weight: bold;
            margin-top: 10px;
            height: 24px;
        }
        
        .correct {
            color: #4CAF50;
        }
        
        .incorrect {
            color: #f44336;
        }
        
        .apparatus {
            display: flex;
            justify-content: center;
            margin: 30px 0;
            position: relative;
        }
        
        .experiment-controls {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }
        
        .flask {
            position: relative;
            width: 200px;
            height: 220px;
        }
        
        .flask-body {
            position: absolute;
            bottom: 0;
            width: 200px;
            height: 150px;
            background-color: #f2f2f2;
            border: 2px solid #333;
            border-radius: 0 0 100px 100px;
            overflow: hidden;
        }
        
        .flask-neck {
            position: absolute;
            top: 0;
            left: 85px;
            width: 30px;
            height: 70px;
            background-color: #f2f2f2;
            border: 2px solid #333;
            z-index: 1;
        }
        
        .acid {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 100px;
            background-color: rgba(255, 255, 100, 0.5);
            transition: all 1s ease;
        }
        
        .marble-chips {
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 20px;
            display: flex;
            justify-content: space-around;
        }
        
        .marble-chip {
            width: 15px;
            height: 15px;
            background-color: #ccc;
            border-radius: 50%;
            display: inline-block;
            transition: all 0.5s ease;
        }
        
        .bubbles {
            position: absolute;
            bottom: 25px;
            left: 0;
            width: 100%;
            height: 70px;
            display: none;
        }
        
        .bubble {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            animation: rise 3s infinite;
        }
        
        @keyframes rise {
            0% {
                transform: translateY(0) scale(1);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-70px) scale(0.5);
                opacity: 0;
            }
        }
        
        .tube {
            width: 100px;
            height: 4px;
            background-color: #333;
            position: absolute;
            top: 30px;
            left: 200px;
        }
        
        .tube-vertical {
            width: 4px;
            height: 50px;
            background-color: #333;
            position: absolute;
            top: 30px;
            left: 296px;
        }
        
        .measuring-cylinder {
            position: relative;
            width: 100px;
            height: 250px;
            margin-left: 200px;
        }
        
        .cylinder-body {
            position: absolute;
            bottom: 0;
            width: 100px;
            height: 220px;
            background-color: #f2f2f2;
            border: 2px solid #333;
            border-radius: 0 0 10px 10px;
            overflow: hidden;
        }
        
        .cylinder-top {
            position: absolute;
            top: 0;
            width: 120px;
            height: 10px;
            left: -10px;
            background-color: #f2f2f2;
            border: 2px solid #333;
            border-radius: 5px 5px 0 0;
        }
        
        .water {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 120px;
            background-color: rgba(100, 149, 237, 0.5);
            transition: height 1s ease;
        }
        
        .co2-bubbles {
            position: absolute;
            bottom: 120px;
            left: 0;
            width: 100%;
            height: 100px;
            display: none;
        }
        
        .co2-bubble {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            animation: rise-in-water 2s infinite;
        }
        
        @keyframes rise-in-water {
            0% {
                transform: translateY(0) scale(1);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-50px) scale(0.5);
                opacity: 0;
            }
        }
        
        .measurement-lines {
            position: absolute;
            top: 0;
            right: 10px;
            height: 100%;
            width: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 10px 0;
        }
        
        .measurement-line {
            width: 10px;
            height: 1px;
            background-color: #333;
        }
        
        .measurement-label {
            position: absolute;
            right: 25px;
            font-size: 10px;
        }
        
        .gas-volume {
            position: absolute;
            bottom: 120px;
            width: 100%;
            height: 0;
            background-color: rgba(200, 200, 255, 0.6);
            transition: height 1s ease;
            border-top: 3px solid #3355ff;
        }
        
        .graph-container {
            height: 400px;
            margin-top: 40px;
        }
        
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        
        .data-table th, .data-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }
        
        .data-table th {
            background-color: #f2f2f2;
        }
        
        .data-table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        .tabs {
            display: flex;
            margin-bottom: 10px;
        }
        
        .tab {
            padding: 10px 20px;
            background-color: #ddd;
            border: none;
            cursor: pointer;
            margin-right: 5px;
            border-radius: 5px 5px 0 0;
        }
        
        .tab.active {
            background-color: white;
            border-bottom: 2px solid #4CAF50;
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Reaction between Marble Chips and Hydrochloric Acid</h1>
        
        <div class="tabs">
            <button class="tab active" onclick="openTab(event, 'simulation')">Simulation</button>
            <button class="tab" onclick="openTab(event, 'equation')">Chemical Equation</button>
            <button class="tab" onclick="openTab(event, 'data')">Data Analysis</button>
        </div>
        
        <div id="simulation" class="tab-content active">
            <h2>Interactive Simulation</h2>
            <p>This simulation shows the reaction between marble chips (CaCO₃) and hydrochloric acid (HCl), producing calcium chloride (CaCl₂), water (H₂O), and carbon dioxide (CO₂) gas.</p>
            
            <div class="experiment-controls">
                <button id="start-btn" class="check-button">Start Reaction</button>
                <button id="reset-btn" class="check-button" style="display: none; background-color: #f44336;">Reset</button>
            </div>
            
            <div class="apparatus">
                <div class="flask">
                    <div class="flask-neck"></div>
                    <div class="flask-body">
                        <div class="acid"></div>
                        <div class="marble-chips">
                            <div class="marble-chip"></div>
                            <div class="marble-chip"></div>
                            <div class="marble-chip"></div>
                            <div class="marble-chip"></div>
                            <div class="marble-chip"></div>
                        </div>
                        <div class="bubbles" id="flask-bubbles"></div>
                    </div>
                </div>
                
                <div class="tube"></div>
                <div class="tube-vertical"></div>
                
                <div class="measuring-cylinder">
                    <div class="cylinder-top"></div>
                    <div class="cylinder-body">
                        <div class="water"></div>
                        <div class="gas-volume" id="gas-volume"></div>
                        <div class="co2-bubbles" id="cylinder-bubbles"></div>
                        <div class="measurement-lines">
                            <div class="measurement-line"><span class="measurement-label">0.080</span></div>
                            <div class="measurement-line"><span class="measurement-label">0.060</span></div>
                            <div class="measurement-line"><span class="measurement-label">0.040</span></div>
                            <div class="measurement-line"><span class="measurement-label">0.020</span></div>
                            <div class="measurement-line"><span class="measurement-label">0.000</span></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <p><strong>Time:</strong> <span id="time-display">0</span> seconds</p>
                <p><strong>Volume of gas:</strong> <span id="volume-display">0.000</span> dm³</p>
            </div>
        </div>
        
        <div id="equation" class="tab-content">
            <h2>Balance the Chemical Equation</h2>
            <p>Complete the balanced equation for the reaction between marble chips (calcium carbonate) and hydrochloric acid:</p>
            
            <div class="reaction-equation">
                <input type="text" class="equation-input" id="reactant1"> + 
                <input type="text" class="equation-input" id="reactant2"> → 
                CaCl<sub>2</sub> + 
                <input type="text" class="equation-input" id="product1"> + 
                <input type="text" class="equation-input" id="product2">
            </div>
            
            <button id="check-equation" class="check-button">Check Answer</button>
            
            <div class="result" id="equation-result"></div>
            
            <div id="explanation" style="margin-top: 30px; display: none;">
                <h3>Explanation:</h3>
                <p>In this reaction, calcium carbonate (CaCO₃) from marble chips reacts with hydrochloric acid (HCl) to produce calcium chloride (CaCl₂), water (H₂O), and carbon dioxide (CO₂).</p>
                <p>The balanced equation is:</p>
                <p style="text-align: center; font-size: 20px;">CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂</p>
                <p>This is an example of an acid-carbonate reaction, which always produces a salt, water, and carbon dioxide gas.</p>
            </div>
        </div>
        
        <div id="data" class="tab-content">
            <h2>Data Analysis</h2>
            
            <div class="graph-container">
                <canvas id="data-chart"></canvas>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Time (s)</th>
                        <th>Volume of gas (dm³)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>0</td><td>0.000</td></tr>
                    <tr><td>30</td><td>0.030</td></tr>
                    <tr><td>60</td><td>0.046</td></tr>
                    <tr><td>90</td><td>0.052</td></tr>
                    <tr><td>120</td><td>0.065</td></tr>
                    <tr><td>150</td><td>0.070</td></tr>
                    <tr><td>180</td><td>0.076</td></tr>
                    <tr><td>210</td><td>0.079</td></tr>
                    <tr><td>240</td><td>0.080</td></tr>
                    <tr><td>270</td><td>0.080</td></tr>
                </tbody>
            </table>
            
            <h3>Observations:</h3>
            <ul>
                <li>The reaction begins rapidly, producing CO₂ gas at a higher rate initially.</li>
                <li>The rate of reaction slows down over time as the reactants are consumed.</li>
                <li>The reaction appears to be complete at around 240 seconds, when the volume remains constant at 0.080 dm³.</li>
                <li>This pattern is typical of chemical reactions where one or more reactants are being depleted over time.</li>
            </ul>
        </div>
    </div>

    <script>
        // Tab functionality
        function openTab(evt, tabName) {
            const tabContents = document.getElementsByClassName("tab-content");
            for (let i = 0; i < tabContents.length; i++) {
                tabContents[i].classList.remove("active");
            }
            
            const tabs = document.getElementsByClassName("tab");
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove("active");
            }
            
            document.getElementById(tabName).classList.add("active");
            evt.currentTarget.classList.add("active");
        }
        
        // Equation checking
        document.getElementById("check-equation").addEventListener("click", function() {
            const reactant1 = document.getElementById("reactant1").value.trim().toUpperCase();
            const reactant2 = document.getElementById("reactant2").value.trim().toUpperCase();
            const product1 = document.getElementById("product1").value.trim().toUpperCase();
            const product2 = document.getElementById("product2").value.trim().toUpperCase();
            
            const resultElement = document.getElementById("equation-result");
            
            if (
                (reactant1 === "CACO3" || reactant1 === "CACO₃") && 
                (reactant2 === "2HCL" || reactant2 === "2 HCL" || reactant2 === "2HCL" || reactant2 === "2 HCL") && 
                (product1 === "H2O" || product1 === "H₂O") && 
                (product2 === "CO2" || product2 === "CO₂")
            ) {
                resultElement.innerHTML = "Correct! Well done!";
                resultElement.className = "result correct";
                document.getElementById("explanation").style.display = "block";
            } else {
                resultElement.innerHTML = "Incorrect. Try again!";
                resultElement.className = "result incorrect";
                document.getElementById("explanation").style.display = "none";
            }
        });
        
        // Simulation
        let timer;
        let timeElapsed = 0;
        let simulationRunning = false;
        const gasData = [
            {time: 0, volume: 0.000},
            {time: 30, volume: 0.030},
            {time: 60, volume: 0.046},
            {time: 90, volume: 0.052},
            {time: 120, volume: 0.065},
            {time: 150, volume: 0.070},
            {time: 180, volume: 0.076},
            {time: 210, volume: 0.079},
            {time: 240, volume: 0.080},
            {time: 270, volume: 0.080}
        ];
        
        function getVolumeAtTime(time) {
            // Find the two data points that surround the current time
            for (let i = 0; i < gasData.length - 1; i++) {
                if (time >= gasData[i].time && time < gasData[i+1].time) {
                    // Interpolate between the two data points
                    const timeRange = gasData[i+1].time - gasData[i].time;
                    const volumeRange = gasData[i+1].volume - gasData[i].volume;
                    const timeRatio = (time - gasData[i].time) / timeRange;
                    return gasData[i].volume + (volumeRange * timeRatio);
                }
            }
            
            // If we're past the last data point, return the last volume
            if (time >= gasData[gasData.length - 1].time) {
                return gasData[gasData.length - 1].volume;
            }
            
            // If we're before the first data point, return the first volume
            return gasData[0].volume;
        }
        
        document.getElementById("start-btn").addEventListener("click", function() {
            if (!simulationRunning) {
                simulationRunning = true;
                document.getElementById("start-btn").style.display = "none";
                document.getElementById("reset-btn").style.display = "block";
                
                // Add bubbles in flask
                const flaskBubbles = document.getElementById("flask-bubbles");
                flaskBubbles.style.display = "block";
                flaskBubbles.innerHTML = "";
                for (let i = 0; i < 15; i++) {
                    const bubble = document.createElement("div");
                    bubble.className = "bubble";
                    bubble.style.width = (2 + Math.random() * 4) + "px";
                    bubble.style.height = bubble.style.width;
                    bubble.style.left = (Math.random() * 100) + "%";
                    bubble.style.bottom = (Math.random() * 50) + "px";
                    bubble.style.animationDelay = (Math.random() * 2) + "s";
                    flaskBubbles.appendChild(bubble);
                }
                
                // Add bubbles in cylinder
                const cylinderBubbles = document.getElementById("cylinder-bubbles");
                cylinderBubbles.style.display = "block";
                cylinderBubbles.innerHTML = "";
                for (let i = 0; i < 10; i++) {
                    const bubble = document.createElement("div");
                    bubble.className = "co2-bubble";
                    bubble.style.width = (2 + Math.random() * 3) + "px";
                    bubble.style.height = bubble.style.width;
                    bubble.style.left = (Math.random() * 100) + "%";
                    bubble.style.bottom = (Math.random() * 50) + "px";
                    bubble.style.animationDelay = (Math.random() * 2) + "s";
                    cylinderBubbles.appendChild(bubble);
                }
                
                // Make marble chips appear to dissolve
                const marbleChips = document.querySelectorAll(".marble-chip");
                marbleChips.forEach((chip, index) => {
                    setTimeout(() => {
                        chip.style.opacity = "0.7";
                        setTimeout(() => {
                            chip.style.opacity = "0.3";
                            setTimeout(() => {
                                chip.style.opacity = "0";
                            }, 20000 + (index * 5000));
                        }, 10000 + (index * 5000));
                    }, 5000 + (index * 3000));
                });
                
                // Start timer
                timer = setInterval(function() {
                    timeElapsed += 1;
                    
                    if (timeElapsed > 270) {
                        clearInterval(timer);
                        return;
                    }
                    
                    // Update time display
                    document.getElementById("time-display").textContent = timeElapsed;
                    
                    // Calculate current volume based on time
                    const currentVolume = getVolumeAtTime(timeElapsed);
                    
                    // Update volume display
                    document.getElementById("volume-display").textContent = currentVolume.toFixed(3);
                    
                    // Update gas volume display in cylinder
                    const maxHeight = 95; // maximum height for gas in cylinder in pixels
                    const maxVolume = 0.080; // maximum volume in dm³
                    const height = (currentVolume / maxVolume) * maxHeight;
                    document.getElementById("gas-volume").style.height = height + "px";
                    
                }, 100); // Update every 0.1 second, but each update represents 1 second in the simulation
            }
        });
        
        document.getElementById("reset-btn").addEventListener("click", function() {
            // Stop timer
            clearInterval(timer);
            
            // Reset variables
            timeElapsed = 0;
            simulationRunning = false;
            
            // Reset displays
            document.getElementById("time-display").textContent = "0";
            document.getElementById("volume-display").textContent = "0.000";
            document.getElementById("gas-volume").style.height = "0";
            
            // Hide bubbles
            document.getElementById("flask-bubbles").style.display = "none";
            document.getElementById("cylinder-bubbles").style.display = "none";
            
            // Reset marble chips
            const marbleChips = document.querySelectorAll(".marble-chip");
            marbleChips.forEach(chip => {
                chip.style.opacity = "1";
            });
            
            // Show start button and hide reset button
            document.getElementById("start-btn").style.display = "block";
            document.getElementById("reset-btn").style.display = "none";
        });
        
        // Create chart
        const ctx = document.getElementById('data-chart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: gasData.map(item => item.time),
                datasets: [{
                    label: 'Volume of gas (dm³)',
                    data: gasData.map(item => item.volume),
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time (s)'
                        },
                        ticks: {
                            callback: function(value, index) {
                                return gasData[index].time;
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Volume of gas (dm³)'
                        },
                        min: 0,
                        max: 0.085
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return \`Volume: \${context.parsed.y.toFixed(3)} dm³\`;
                            }
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>
                  `}
                  className="w-full h-full border-0"
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ExplainToMe;
