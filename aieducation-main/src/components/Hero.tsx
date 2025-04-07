
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Sparkles, Lightbulb, Target } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-40 -left-10 w-60 h-60 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-float"></div>
      <div className="absolute bottom-20 -right-10 w-80 h-80 bg-teal-100 dark:bg-teal-900/20 rounded-full blur-3xl opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      
      {/* Floating Icons - Repositioned Brain icon */}
      <div className="absolute top-40 right-[20%] hidden md:block">
        <div className="relative w-16 h-16 bg-white dark:bg-card rounded-2xl shadow-xl flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
          <Brain className="w-8 h-8 text-blue" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue rounded-full"></div>
        </div>
      </div>
      {/* Repositioned Sparkles icon to avoid overlap with content */}
      <div className="absolute bottom-40 left-[5%] hidden md:block">
        <div className="relative w-14 h-14 bg-white dark:bg-card rounded-2xl shadow-xl flex items-center justify-center animate-float" style={{ animationDelay: '3s' }}>
          <Sparkles className="w-7 h-7 text-teal" />
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-300 font-medium text-sm animate-fade-in">
            Reimagine education with AI
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-normal animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Learn <span className="text-gradient mr-1">smarter</span>, not harder
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Personalized education powered by AI. Unlock your potential with interactive lessons, adaptive learning, and 24/7 AI tutoring.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link to="/dashboard" className="group relative overflow-hidden px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-lg transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center">
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-5 h-5 ml-2 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link to="/about-me" className="group relative overflow-hidden px-8 py-3 rounded-xl bg-white text-blue-600 border-2 border-blue-300 font-medium text-lg transform transition-all duration-300 hover:scale-105 hover:border-blue-500 shadow-md hover:shadow-lg flex items-center">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Learn More</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
        
        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-20 max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="glass-card p-6 flex flex-col items-center text-center transition-transform duration-500 hover:translate-y-[-5px]">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered Learning</h3>
            <p className="text-foreground/80">Adaptive lessons that adjust to your learning style and pace for maximum efficiency.</p>
          </div>
          
          <div className="glass-card p-6 flex flex-col items-center text-center transition-transform duration-500 hover:translate-y-[-5px]">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-teal" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Interactive Content</h3>
            <p className="text-foreground/80">Engage with dynamic visualizations and interactive exercises that make learning enjoyable.</p>
          </div>
          
          <div className="glass-card p-6 flex flex-col items-center text-center transition-transform duration-500 hover:translate-y-[-5px]">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Personalized Path</h3>
            <p className="text-foreground/80">Custom study plans and recommendations based on your progress and learning goals.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
