import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Book, GraduationCap, BarChart, Calendar, 
  MessageCircle, School, FileText, Play, BookOpen, FileQuestion,
  User, ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsLoggedIn(['/dashboard', '/analytics', '/schedule', '/ai-tutor', 
                  '/explain-to-me', '/essay-analysis', '/study'].some(path => 
                    location.pathname.startsWith(path)));
  }, [location.pathname]);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home', icon: <Book className="w-5 h-5 mr-2" />, show: true },
    { path: '/about-me', label: 'About Me', icon: <User className="w-5 h-5 mr-2" />, show: true },
    { path: '/dashboard', label: 'My Subjects', icon: <GraduationCap className="w-5 h-5 mr-2" />, show: true },
    { path: '/analytics', label: 'Learning Analytics', icon: <BarChart className="w-5 h-5 mr-2" />, show: true },
    { path: '/schedule', label: 'Study Schedule', icon: <Calendar className="w-5 h-5 mr-2" />, show: true },
    { path: '/ai-tutor', label: 'AI Tutor', icon: <MessageCircle className="w-5 h-5 mr-2" />, show: true },
    { path: '/explain-to-me', label: 'Exam Paper Solver', icon: <School className="w-5 h-5 mr-2" />, show: true },
    { path: '/essay-analysis', label: 'Essay Feedback', icon: <FileText className="w-5 h-5 mr-2" />, show: true },
    { path: '/test-chats', label: 'Learning Examples', icon: <Book className="w-5 h-5 mr-2" />, show: false },
    { path: '/test-chats2', label: 'Advanced Examples', icon: <Book className="w-5 h-5 mr-2" />, show: false },
  ];

  const mainActions = [
    { label: 'Continue Learning', icon: <BookOpen className="w-5 h-5" />, path: '/dashboard', variant: 'default' as const },
    { label: 'Start Quiz', icon: <FileQuestion className="w-5 h-5" />, path: '/explain-to-me', variant: 'outline' as const },
    { label: 'Practice', icon: <Play className="w-5 h-5" />, path: '/ai-tutor', variant: 'ghost' as const },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-card/80 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue to-teal flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">A+</span>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white dark:bg-background rounded-full border-2 border-blue animate-pulse-soft"></div>
          </div>
          <span className="text-xl font-bold text-gradient">AI+ Education</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-3 mx-auto">
          {isLoggedIn && (
            mainActions.map((action) => (
              <Button
                key={action.label}
                variant={action.variant}
                asChild
                className="shadow-sm hover:shadow-md transition-all"
              >
                <Link to={action.path} className="flex items-center gap-2">
                  {action.icon}
                  <span>{action.label}</span>
                </Link>
              </Button>
            ))
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/register')}>Register</Button>
            </div>
          )}
        </div>
        
        <div className="relative flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsNavExpanded(!isNavExpanded)}
            className="ml-2 rounded-full"
            aria-label={isNavExpanded ? "Close navigation" : "Open navigation"}
          >
            {isNavExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          
          <div className={`fixed top-0 right-0 h-screen bg-card/95 dark:bg-card/95 shadow-xl w-72 transform transition-transform duration-300 ease-in-out z-40 ${
            isNavExpanded ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h2 className="font-semibold text-lg">Navigation</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsNavExpanded(false)}
                className="rounded-full hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="pt-4 px-4">
              <nav className="flex flex-col space-y-2">
                {navLinks.filter(link => link.show).map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center py-3 px-4 rounded-xl transition-colors duration-300 ${
                      isActive(link.path) 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-medium' 
                        : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setIsNavExpanded(false)}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="absolute bottom-8 left-0 right-0 px-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => setIsNavExpanded(false)}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Close Menu</span>
              </Button>
            </div>
          </div>
        </div>
        
        <button 
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/95 dark:bg-background/95 backdrop-blur-md pt-20 px-4 animate-fade-in">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-3">
              {isLoggedIn && (
                mainActions.map((action) => (
                  <Button
                    key={action.label}
                    variant={action.variant}
                    asChild
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to={action.path} className="flex items-center gap-2">
                      {action.icon}
                      <span>{action.label}</span>
                    </Link>
                  </Button>
                ))
              )}
            </div>
            
            <div className="border-t border-border my-2"></div>
            
            <nav className="flex flex-col space-y-2">
              {navLinks.filter(link => link.show).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center py-3 px-4 rounded-xl transition-colors duration-300 ${
                    isActive(link.path) 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-medium' 
                      : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto pt-4">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Close Menu
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
