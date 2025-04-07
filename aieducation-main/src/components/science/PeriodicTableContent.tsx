import React, { useState } from 'react';
import { Maximize2, Minimize2, X, PlayCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import InteractivePeriodicTable from './InteractivePeriodicTable';

interface PopupState {
  id: string;
  isOpen: boolean;
  isFolded: boolean;
  showDetailed: boolean;
}

const PeriodicTableContent: React.FC = () => {
  const { toast } = useToast();
  const [activePopups, setActivePopups] = useState<PopupState[]>([]);
  const [overlay, setOverlay] = useState<boolean>(false);
  
  const showPopup = (popupId: string, concept: string) => {
    if (!activePopups.some(popup => popup.id === popupId)) {
      setActivePopups([...activePopups, { 
        id: popupId, 
        isOpen: true, 
        isFolded: false,
        showDetailed: false
      }]);
      setOverlay(true);
    }
    
    document.querySelectorAll('.highlighted').forEach(term => 
      term.classList.remove('active'));
    document.querySelectorAll(`.highlighted[data-concept="${concept}"]`).forEach(term => 
      term.classList.add('active'));
  };
  
  const closePopup = (popupId: string) => {
    setActivePopups(activePopups.filter(popup => popup.id !== popupId));
    
    if (activePopups.length <= 1) {
      setOverlay(false);
    }
    
    document.querySelectorAll('.highlighted').forEach(term => 
      term.classList.remove('active'));
  };
  
  const toggleFoldPopup = (popupId: string) => {
    setActivePopups(activePopups.map(popup => 
      popup.id === popupId 
        ? { ...popup, isFolded: !popup.isFolded } 
        : popup
    ));
  };
  
  const toggleExplanation = (popupId: string) => {
    setActivePopups(activePopups.map(popup => 
      popup.id === popupId 
        ? { ...popup, showDetailed: !popup.showDetailed } 
        : popup
    ));
  };
  
  const checkReflectionAnswer = (
    popupId: string,
    questionId: string, 
    keywordPattern: string
  ) => {
    const textarea = document.getElementById(`reflection-${popupId}-${questionId}`) as HTMLTextAreaElement;
    if (!textarea) return;
    
    const answer = textarea.value.toLowerCase();
    const keywords = keywordPattern.split('|');
    const hasKeyword = keywords.some(keyword => answer.includes(keyword.toLowerCase()));
    
    const questionContainer = textarea.closest('.reflection-question');
    if (!questionContainer) return;
    
    const feedbackEl = questionContainer.querySelector('.answer-feedback') as HTMLElement;
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
    }
    
    if (hasKeyword && answer.length > 20) {
      if (questionContainer) {
        questionContainer.classList.add('correct-answer');
        questionContainer.classList.remove('incorrect-answer');
      }
      
      toast({
        title: "Great answer!",
        description: "You've demonstrated a strong understanding of this concept.",
        variant: "default",
      });
    } else {
      if (questionContainer) {
        questionContainer.classList.add('incorrect-answer');
        questionContainer.classList.remove('correct-answer');
      }
      
      toast({
        title: "Review recommended",
        description: "Try to include more key concepts in your answer.",
        variant: "destructive",
      });
    }
  };
  
  const HighlightedTerm: React.FC<{ 
    id: string, 
    concept: string, 
    color?: 'blue' | 'green' | 'orange',
    children: React.ReactNode 
  }> = ({ id, concept, color = 'blue', children }) => {
    const colorClasses = {
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/50',
      green: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-900/50',
      orange: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900/50',
    };
    
    return (
      <button
        onClick={() => showPopup(id, concept)}
        className={`highlighted ${colorClasses[color]} px-1 py-0.5 rounded cursor-pointer`}
        data-concept={concept}
      >
        {children}
      </button>
    );
  };
  
  return (
    <div className="relative">
      {overlay && (
        <div 
          className="fixed inset-0 bg-black/25 dark:bg-black/40 z-40"
          onClick={() => {
            setOverlay(false);
            setActivePopups([]);
          }}
        />
      )}
      
      <div className="prose prose-lg max-w-none">
        <div className="flex items-center justify-between mb-4">
          <h1>The Periodic Table</h1>
        </div>
        
        <p>
          The <HighlightedTerm id="periodic-table" concept="periodictable">periodic table</HighlightedTerm> is a tabular arrangement of the chemical <HighlightedTerm id="element" concept="element" color="green">elements</HighlightedTerm>, organized based on their atomic number, electron configuration, and recurring chemical properties. Elements are presented in order of increasing atomic number.
        </p>
        
        <p>
          The table is divided into <HighlightedTerm id="period" concept="period" color="orange">periods</HighlightedTerm> (horizontal rows) and <HighlightedTerm id="group" concept="group" color="green">groups</HighlightedTerm> (vertical columns). Elements within the same group typically have similar chemical properties. This layout helps scientists understand the <HighlightedTerm id="periodic-law" concept="periodiclaw">periodic law</HighlightedTerm> and predict how elements will behave.
        </p>
        
        <div className="bg-muted rounded-lg p-6 my-6">
          <div className="text-center mb-4">
            <div className="mb-2 text-lg font-medium">Interactive Periodic Table</div>
            <div className="text-muted-foreground text-sm">Click or hover over elements to see details</div>
          </div>
          <InteractivePeriodicTable />
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Structure of the Periodic Table</h2>
        
        <p>
          The modern periodic table organizes elements based on their <HighlightedTerm id="atomic-number" concept="atomicnumber">atomic number</HighlightedTerm> and arranges them to illustrate recurring trends in their properties. These repeating patterns happen as <HighlightedTerm id="electron-shells" concept="electronshells" color="orange">electron shells</HighlightedTerm> are filled.
        </p>
        
        <p>
          The table separates elements into several key categories:
        </p>
        
        <ul>
          <li><HighlightedTerm id="metals" concept="metals">Metals</HighlightedTerm> - Typically shiny solids that conduct electricity</li>
          <li><HighlightedTerm id="nonmetals" concept="nonmetals">Nonmetals</HighlightedTerm> - Elements that don't conduct electricity well</li>
          <li><HighlightedTerm id="metalloids" concept="metalloids">Metalloids</HighlightedTerm> - Elements with properties of both metals and nonmetals</li>
        </ul>
        
        <div className="mt-8 bg-card border border-border rounded-lg p-5">
          <div className="flex items-start mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
              <PlayCircle className="w-5 h-5 text-blue" />
            </div>
            <h4 className="text-lg font-semibold">Reflection Question</h4>
          </div>
          <div className="reflection-question p-4 border-l-4 border-muted mb-3 rounded">
            <p className="mb-2">How does the arrangement of elements in the periodic table help scientists predict their properties?</p>
            <textarea id="main-reflection" className="w-full p-3 border border-border rounded bg-background min-h-[100px] mb-3" placeholder="Type your answer here..."></textarea>
            <button 
              className="button-primary text-sm"
              onClick={() => checkReflectionAnswer("main", "1", "pattern|recurring|predictive|trends|properties|group|similar")}
            >
              Check Understanding
            </button>
            <div className="answer-feedback mt-3 p-3 rounded bg-muted/50 hidden">
              <p>The periodic table's arrangement shows patterns in element properties, allowing scientists to predict characteristics of elements based on their position in the table.</p>
            </div>
          </div>
        </div>
      </div>
      
      {activePopups.map(popup => (
        <div 
          key={popup.id}
          className={`fixed z-50 bg-card border border-border shadow-lg rounded-lg w-full max-w-lg ${
            popup.isFolded ? 'h-auto' : 'max-h-[80vh] overflow-y-auto'
          }`}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="sticky top-0 z-10 bg-card px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="font-medium">
              {popup.id === "periodic-table" && "Periodic Table"}
              {popup.id === "element" && "Chemical Element"}
              {popup.id === "period" && "Period"}
              {popup.id === "group" && "Group"}
              {popup.id === "periodic-law" && "Periodic Law"}
              {popup.id === "atomic-number" && "Atomic Number"}
              {popup.id === "electron-shells" && "Electron Shells"}
              {popup.id === "metals" && "Metals"}
              {popup.id === "nonmetals" && "Nonmetals"}
              {popup.id === "metalloids" && "Metalloids"}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleFoldPopup(popup.id)}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                {popup.isFolded ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => closePopup(popup.id)}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {!popup.isFolded && (
            <div className="p-4">
              <div className="mb-3">
                <button
                  onClick={() => toggleExplanation(popup.id)}
                  className="text-sm px-3 py-1 bg-muted rounded-md hover:bg-muted/80 transition-colors"
                >
                  {popup.showDetailed ? "Simple Explanation" : "Detailed Explanation"}
                </button>
              </div>
              
              {!popup.showDetailed && (
                <div className="simple-explanation">
                  {popup.id === "periodic-table" && (
                    <p>The periodic table is a chart that arranges all the chemical elements in a way that helps us understand their properties. Elements with similar behaviors are grouped together.</p>
                  )}
                  {popup.id === "element" && (
                    <p>A chemical element is a pure substance that cannot be broken down into simpler components by normal chemical reactions. Each element has a unique number of protons.</p>
                  )}
                  {popup.id === "period" && (
                    <p>A period in the periodic table is a horizontal row. Elements in the same period have the same number of electron shells.</p>
                  )}
                  {popup.id === "group" && (
                    <p>A group in the periodic table is a vertical column. Elements in the same group have similar chemical properties because they have the same number of electrons in their outer shell.</p>
                  )}
                  {popup.id === "periodic-law" && (
                    <p>The periodic law states that when elements are arranged by increasing atomic number, there is a pattern in their properties that repeats.</p>
                  )}
                  {popup.id === "atomic-number" && (
                    <p>The atomic number is the number of protons in the nucleus of an atom, which determines which element it is.</p>
                  )}
                  {popup.id === "electron-shells" && (
                    <p>Electron shells are the regions around an atom's nucleus where electrons are likely to be found. Each shell can hold a certain number of electrons.</p>
                  )}
                  {popup.id === "metals" && (
                    <p>Metals are elements that are typically shiny, good conductors of heat and electricity, malleable, and ductile. Most elements in the periodic table are metals.</p>
                  )}
                  {popup.id === "nonmetals" && (
                    <p>Nonmetals are elements that typically lack the properties of metals. They are usually poor conductors of heat and electricity, and many are gases at room temperature.</p>
                  )}
                  {popup.id === "metalloids" && (
                    <p>Metalloids are elements with properties between metals and nonmetals. They can conduct electricity under certain conditions and are important in electronics.</p>
                  )}
                </div>
              )}
              
              {popup.showDetailed && (
                <div className="detailed-explanation">
                  {popup.id === "periodic-table" && (
                    <>
                      <p>The periodic table is a systematic arrangement of the chemical elements, organized based on their atomic numbers, electron configurations, and recurring chemical properties. The structure of the table shows periodic trends, with elements arranged in order of increasing atomic number.</p>
                      
                      <h3 className="text-lg font-medium mt-4 mb-2">Development</h3>
                      <p>The table was developed by Dmitri Mendeleev in 1869, who noticed patterns in the properties of elements when arranged by atomic weight. The modern table organizes elements by atomic number, which correlates better with chemical properties.</p>
                      
                      <div className="my-4">
                        <h3 className="text-lg font-medium mb-2">Video: Understanding the Periodic Table</h3>
                        <div className="bg-muted rounded-lg p-3 flex items-center justify-center">
                          <p className="text-foreground/60">Video would be embedded here</p>
                        </div>
                      </div>
                      
                      <div className="reflection-question p-4 border-l-4 border-muted mb-3 rounded">
                        <p className="mb-2">How has the periodic table evolved since Mendeleev's original design, and why were these changes important?</p>
                        <textarea 
                          id={`reflection-periodic-table-1`} 
                          className="w-full p-3 border border-border rounded bg-background min-h-[100px] mb-3" 
                          placeholder="Type your answer here..."
                        ></textarea>
                        <button 
                          className="button-primary text-sm"
                          onClick={() => checkReflectionAnswer("periodic-table", "1", "atomic number|electron|configuration|noble gases|lanthanides|actinides")}
                        >
                          Check Understanding
                        </button>
                        <div className="answer-feedback mt-3 p-3 rounded bg-muted/50 hidden">
                          <p>The periodic table has evolved from Mendeleev's original arrangement based on atomic weight to the modern organization by atomic number. Important changes include the addition of noble gases, the proper placement of elements based on electron configuration, and the incorporation of lanthanides and actinides as separate rows.</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {popup.id === "element" && (
                    <>
                      <p>A chemical element is a species of atoms that have a given number of protons in their nuclei, including isotopes. The number of protons (atomic number) defines which element it is. Currently, 118 elements are known, with the first 94 occurring naturally on Earth.</p>
                      
                      <h3 className="text-lg font-medium mt-4 mb-2">Structure</h3>
                      <p>Each element consists of atoms with the same number of protons but can have varying numbers of neutrons (isotopes) and electrons (ions). The chemical behavior of an element is largely determined by its electron configuration, particularly the valence electrons in the outermost shell.</p>
                      
                      <div className="my-4">
                        <h3 className="text-lg font-medium mb-2">Video: Atomic Structure</h3>
                        <div className="bg-muted rounded-lg p-3 flex items-center justify-center">
                          <p className="text-foreground/60">Video would be embedded here</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PeriodicTableContent;
