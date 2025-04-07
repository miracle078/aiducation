
import React from 'react';
import { 
  Brain, BookOpen, Database, Server, 
  Globe, Users, Lightbulb, FileText, Cpu,
  Webhook, HardDrive, Bot, BarChart
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AboutMe = () => {
  return (
    <div className="container max-w-7xl mx-auto min-h-screen flex flex-col p-4 pb-10">
      {/* Header */}
      <div className="pt-20 pb-0">
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-xl shadow-xl p-3 mb-2">
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            About Me
          </h1>
          <p className="text-xs text-white/90 max-w-2xl">
            Our specialized approach to training and deploying Large Language Models for educational excellence
          </p>
        </div>
      </div>

      {/* Main Architecture Diagram - Visual Application Architecture Pattern */}
      <div className="flex-1 grid grid-cols-3 gap-4 overflow-visible">
        {/* Left Column - Training Pipeline */}
        <div className="flex flex-col gap-3">
          {/* Training Pipeline Title */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-2 text-white font-bold text-center shadow-lg">
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm">Training Pipeline</span>
            </div>
          </div>
          
          {/* Data Collection */}
          <Card className="shadow-xl border-2 border-indigo-200 dark:border-indigo-900 transition-all duration-300">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="font-bold text-base">Data Collection</h3>
                <ul className="text-sm space-y-1 mt-1">
                  <li className="flex items-center gap-1">
                    <span>A-Level textbooks</span>
                    <Badge variant="outline" className="text-xs ml-1">500+ sources</Badge>
                  </li>
                  <li className="flex items-center gap-1">
                    <span>Question & Answer pairs</span>
                    <Badge variant="outline" className="text-xs ml-1">25,000+</Badge>
                  </li>
                  <li className="flex items-center gap-1">
                    <span>Teacher knowledge</span>
                    <Badge variant="outline" className="text-xs ml-1">100+ educators</Badge>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full p-2">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
          
          {/* Knowledge Mapping */}
          <Card className="shadow-xl border-2 border-purple-200 dark:border-purple-900 transition-all duration-300">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="font-bold text-base">Knowledge Mapping</h3>
                <ul className="text-sm space-y-1 mt-1">
                  <li className="flex items-center gap-1">
                    <span>Subject connections</span>
                    <Badge variant="outline" className="text-xs ml-1">15,000+</Badge>
                  </li>
                  <li className="flex items-center gap-1">
                    <span>Concept relationships</span>
                    <Badge variant="outline" className="text-xs ml-1">50,000+</Badge>
                  </li>
                  <li className="flex items-center gap-1">
                    <span>Knowledge graph nodes</span>
                    <Badge variant="outline" className="text-xs ml-1">120,000+</Badge>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full p-2">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
          
          {/* Fine-tuning */}
          <Card className="shadow-xl border-2 border-violet-200 dark:border-violet-900 transition-all duration-300">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="font-bold text-base">Fine-tuning</h3>
                <ul className="text-sm space-y-1 mt-1">
                  <li className="flex items-center gap-1">
                    <span>Training steps</span>
                    <Badge variant="outline" className="text-xs ml-1">1.2M+</Badge>
                  </li>
                  <li className="flex items-center gap-1">
                    <span>Student feedback loops</span>
                    <Badge variant="outline" className="text-xs ml-1">5,000+</Badge>
                  </li>
                  <li className="flex items-center gap-1">
                    <span>Validation accuracy</span>
                    <Badge variant="outline" className="text-xs ml-1">95.7%</Badge>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-full p-2">
                <Bot className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Middle Column - AI Models */}
        <div className="flex flex-col gap-3">
          {/* AI Models Title */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-2 text-white font-bold text-center shadow-lg">
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm">Core AI System</span>
            </div>
          </div>
          
          {/* Central Brain */}
          <Card className="shadow-xl border-2 border-fuchsia-200 dark:border-fuchsia-900 transition-all duration-300 mb-2">
            <CardContent className="p-3 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-fuchsia-500 to-purple-700 rounded-full h-16 w-16 flex items-center justify-center shadow-lg animate-pulse">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-base mt-1">Educational AI</h3>
                <div className="flex flex-wrap justify-center gap-1 mt-1">
                  <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-200">Large Language Model</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Specialized Models Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* AI Tutor */}
            <Card className="shadow-xl border-2 border-pink-200 dark:border-pink-900 transition-all duration-300">
              <CardContent className="p-3">
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-base">AI Tutor</h3>
                  <p className="text-sm text-center mt-1">Interactive learning assistant</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Exam Helper */}
            <Card className="shadow-xl border-2 border-amber-200 dark:border-amber-900 transition-all duration-300">
              <CardContent className="p-3">
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-base">Exam Helper</h3>
                  <p className="text-sm text-center mt-1">Test preparation</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Concept Explainer */}
            <Card className="shadow-xl border-2 border-emerald-200 dark:border-emerald-900 transition-all duration-300">
              <CardContent className="p-3">
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-base">Concept Explainer</h3>
                  <p className="text-sm text-center mt-1">Clear explanations</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Visual Learning */}
            <Card className="shadow-xl border-2 border-sky-200 dark:border-sky-900 transition-all duration-300">
              <CardContent className="p-3">
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-base">Visual Learning</h3>
                  <p className="text-sm text-center mt-1">Diagrams & charts</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Right Column - Deployment */}
        <div className="flex flex-col gap-3">
          {/* Deployment Title */}
          <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded-xl p-2 text-white font-bold text-center shadow-lg">
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm">Deployment</span>
            </div>
          </div>
          
          {/* Cloud Infrastructure */}
          <Card className="shadow-xl border-2 border-blue-200 dark:border-blue-900 transition-all duration-300">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base">Cloud Infrastructure</h3>
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full p-2">
                  <Server className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-sm mt-1">Scalable computing resources</div>
            </CardContent>
          </Card>
          
          {/* API Layer */}
          <Card className="shadow-xl border-2 border-teal-200 dark:border-teal-900 transition-all duration-300">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base">API Layer</h3>
                <div className="bg-gradient-to-br from-teal-500 to-green-600 rounded-full p-2">
                  <Webhook className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-sm mt-1">Connects apps to AI models</div>
            </CardContent>
          </Card>
          
          {/* Data Stores */}
          <Card className="shadow-xl border-2 border-indigo-200 dark:border-indigo-900 transition-all duration-300">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base">Knowledge Base</h3>
                <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full p-2">
                  <Database className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-sm mt-1">Educational content repository</div>
            </CardContent>
          </Card>
          
          {/* User Experience */}
          <Card className="shadow-xl border-2 border-emerald-200 dark:border-emerald-900 transition-all duration-300">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base">User Experience</h3>
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full p-2">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-sm mt-1">Web, mobile, and integrations</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
