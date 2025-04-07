
import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-8 text-center animate-fade-in">
        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-blue/10 flex items-center justify-center">
          <span className="text-5xl font-bold text-gradient">404</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Page not found</h1>
        <p className="text-foreground/70 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/"
            className="button-primary flex items-center w-full sm:w-auto justify-center"
          >
            <HomeIcon className="w-4 h-4 mr-2" />
            Go Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="button-secondary flex items-center w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
