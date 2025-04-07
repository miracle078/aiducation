
import React, { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Metric {
  name: string;
  score: number;
  maxScore: number;
}

interface FeedbackPoint {
  text: string;
  type: "strong" | "improvement" | "weak";
}

interface AnalysisDashboardProps {
  metrics: Metric[];
  overallScore: number;
  feedback: {
    strengths: FeedbackPoint[];
    improvements: FeedbackPoint[];
    suggestions: FeedbackPoint[];
  };
  isAnalyzing: boolean;
  analysisStage: number;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  metrics,
  overallScore,
  feedback,
  isAnalyzing,
  analysisStage,
}) => {
  const [displayedScore, setDisplayedScore] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    strengths: true,
    improvements: true,
    suggestions: true,
  });
  const [shownMetrics, setShownMetrics] = useState<Metric[]>(
    metrics.map((m) => ({ ...m, score: 0 }))
  );
  const [visibleFeedback, setVisibleFeedback] = useState({
    strengths: [] as FeedbackPoint[],
    improvements: [] as FeedbackPoint[],
    suggestions: [] as FeedbackPoint[],
  });

  const chartRef = useRef<HTMLCanvasElement>(null);

  // Animation for metrics scores
  useEffect(() => {
    if (isAnalyzing && analysisStage >= 2) {
      const duration = 1000; // 1 second for metrics to fill
      const startTime = performance.now();

      const animateMetrics = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Update metrics with animated values
        setShownMetrics(
          metrics.map((metric) => ({
            ...metric,
            score: Math.floor(metric.score * progress),
          }))
        );

        if (progress < 1) {
          requestAnimationFrame(animateMetrics);
        }
      };

      requestAnimationFrame(animateMetrics);
    } else if (!isAnalyzing) {
      setShownMetrics(metrics);
    }
  }, [isAnalyzing, analysisStage, metrics]);

  // Animation for overall score
  useEffect(() => {
    if (isAnalyzing && analysisStage >= 2) {
      const duration = 1000; // 1 second for score to count up
      const startTime = performance.now();
      const startScore = 0;
      const endScore = overallScore;

      const animateScore = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        const currentScore = startScore + (endScore - startScore) * progress;
        setDisplayedScore(Number(currentScore.toFixed(1)));
        
        if (progress < 1) {
          requestAnimationFrame(animateScore);
        }
      };

      requestAnimationFrame(animateScore);
    } else if (!isAnalyzing) {
      setDisplayedScore(overallScore);
    }
  }, [isAnalyzing, analysisStage, overallScore]);

  // Animation for feedback points
  useEffect(() => {
    if (isAnalyzing && analysisStage >= 3) {
      // Show feedback points one by one
      const totalPoints = feedback.strengths.length + 
                         feedback.improvements.length + 
                         feedback.suggestions.length;
      const pointDuration = 1000 / totalPoints; // Divide 1 second among all points
      
      let pointIndex = 0;
      const allPoints = [
        ...feedback.strengths.map(point => ({ point, type: 'strengths' as const })),
        ...feedback.improvements.map(point => ({ point, type: 'improvements' as const })),
        ...feedback.suggestions.map(point => ({ point, type: 'suggestions' as const }))
      ];
      
      const showNextPoint = () => {
        if (pointIndex >= allPoints.length) return;
        
        const { point, type } = allPoints[pointIndex];
        setVisibleFeedback(prev => ({
          ...prev,
          [type]: [...prev[type], point]
        }));
        
        pointIndex++;
        if (pointIndex < allPoints.length) {
          setTimeout(showNextPoint, pointDuration);
        }
      };
      
      showNextPoint();
    } else if (!isAnalyzing) {
      setVisibleFeedback(feedback);
    }
  }, [isAnalyzing, analysisStage, feedback]);

  // Draw radar chart (simulated for this demo)
  useEffect(() => {
    if (!chartRef.current || analysisStage < 2) return;
    
    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Draw radar background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#e2e8f0';
    ctx.stroke();
    
    // Draw inner circles
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * i / 4, 0, 2 * Math.PI);
      ctx.strokeStyle = '#e2e8f0';
      ctx.stroke();
    }
    
    // Draw axes
    const numAxes = metrics.length;
    const angleStep = (2 * Math.PI) / numAxes;
    
    // Determine max score for normalization
    const maxScore = Math.max(...metrics.map(m => m.maxScore));
    
    // Calculate positions for each metric
    const points = metrics.map((metric, i) => {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      const normalizedScore = shownMetrics[i].score / maxScore;
      const distance = radius * normalizedScore;
      return {
        x: centerX + distance * Math.cos(angle),
        y: centerY + distance * Math.sin(angle),
        label: metric.name,
        angle
      };
    });
    
    // Draw axes and labels
    points.forEach(point => {
      const angle = point.angle;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
      ctx.strokeStyle = '#cbd5e1';
      ctx.stroke();
      
      // Draw labels
      const labelX = centerX + (radius + 15) * Math.cos(angle);
      const labelY = centerY + (radius + 15) * Math.sin(angle);
      ctx.fillStyle = '#475569';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(point.label, labelX, labelY);
    });
    
    // Fill the radar chart
    ctx.beginPath();
    points.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(14, 165, 233, 0.2)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(14, 165, 233, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw points
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(14, 165, 233, 1)';
      ctx.fill();
    });
    
  }, [shownMetrics, analysisStage]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className={cn(
      "transition-opacity duration-500",
      isAnalyzing && analysisStage < 2 ? "opacity-0" : "opacity-100"
    )}>
      {/* Overall Score Section */}
      <div className="bg-white rounded-md border p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Overall Assessment</h3>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-blue-600">{displayedScore}</span>
            <span className="text-gray-500">/10</span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className={cn(
            "h-4 bg-gray-100 rounded-full relative overflow-hidden",
            isAnalyzing && analysisStage >= 2 ? "animate-pulse" : ""
          )}>
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000"
              style={{ width: `${(displayedScore / 10) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Weak</span>
            <span>Average</span>
            <span>Excellent</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {shownMetrics.map((metric, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">{metric.name}</span>
                <span className="text-sm font-medium">{metric.score}/{metric.maxScore}</span>
              </div>
              <Progress 
                value={(metric.score / metric.maxScore) * 100} 
                className="h-2" 
              />
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <canvas 
            ref={chartRef} 
            width="300" 
            height="300" 
            className={cn(
              "transition-opacity duration-1000", 
              isAnalyzing && analysisStage < 3 ? "opacity-0" : "opacity-100"
            )}
          ></canvas>
        </div>
      </div>
      
      {/* Feedback Sections */}
      <div className="bg-white rounded-md border overflow-hidden">
        {/* Strengths Section */}
        <div className="border-b">
          <button 
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => toggleSection('strengths')}
          >
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
              <h3 className="font-medium">Strengths</h3>
            </div>
            {expandedSections.strengths ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          
          {expandedSections.strengths && (
            <div className="p-4 pt-0">
              <ul className="space-y-2">
                {visibleFeedback.strengths.map((point, index) => (
                  <li key={index} className={cn(
                    "flex items-start gap-2 p-2 rounded bg-green-50 transition-all duration-300",
                    isAnalyzing && analysisStage >= 3 ? "animate-fade-in" : ""
                  )} style={{ animationDelay: `${index * 200}ms` }}>
                    <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 shrink-0" />
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Areas for Improvement */}
        <div className="border-b">
          <button 
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => toggleSection('improvements')}
          >
            <div className="flex items-center">
              <AlertCircle className="text-yellow-500 mr-2 h-5 w-5" />
              <h3 className="font-medium">Areas for Improvement</h3>
            </div>
            {expandedSections.improvements ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          
          {expandedSections.improvements && (
            <div className="p-4 pt-0">
              <ul className="space-y-2">
                {visibleFeedback.improvements.map((point, index) => (
                  <li key={index} className={cn(
                    "flex items-start gap-2 p-2 rounded bg-yellow-50 transition-all duration-300",
                    isAnalyzing && analysisStage >= 3 ? "animate-fade-in" : ""
                  )} style={{ animationDelay: `${200 + index * 200}ms` }}>
                    <AlertCircle className="text-yellow-500 h-5 w-5 mt-0.5 shrink-0" />
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Enhancement Suggestions */}
        <div>
          <button 
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => toggleSection('suggestions')}
          >
            <div className="flex items-center">
              <AlertTriangle className="text-red-500 mr-2 h-5 w-5" />
              <h3 className="font-medium">Enhancement Suggestions</h3>
            </div>
            {expandedSections.suggestions ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          
          {expandedSections.suggestions && (
            <div className="p-4 pt-0">
              <ul className="space-y-2">
                {visibleFeedback.suggestions.map((point, index) => (
                  <li key={index} className={cn(
                    "flex items-start gap-2 p-2 rounded bg-red-50 transition-all duration-300",
                    isAnalyzing && analysisStage >= 3 ? "animate-fade-in" : ""
                  )} style={{ animationDelay: `${400 + index * 200}ms` }}>
                    <AlertTriangle className="text-red-500 h-5 w-5 mt-0.5 shrink-0" />
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
