import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Study from "./pages/Study";
import Scheduler from "./pages/Scheduler";
import TestChats from "./pages/TestChats";
import TestChats2 from "./pages/TestChats2";
import ExplainToMe from "./pages/ExplainToMe";
import EssayAnalysis from "./pages/EssayAnalysis";
import AITutor from "./pages/AITutor";
import Analytics from "./pages/Analytics";
import AboutMe from "./pages/Architecture";
import GenericGPT from "./pages/GenericGPT";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <Index />
                </main>
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <Dashboard />
                </main>
              </ProtectedRoute>
            } />
            <Route path="/study/:subjectId?/:topicId?" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <Study />
                </main>
              </ProtectedRoute>
            } />
            <Route path="/schedule" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <Scheduler />
                </main>
              </ProtectedRoute>
            } />
            <Route path="/test-chats" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <TestChats />
                </main>
              </ProtectedRoute>
            } />
            <Route path="/test-chats2" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <TestChats2 />
                </main>
              </ProtectedRoute>
            } />
            <Route path="/explain-to-me" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <ExplainToMe />
                </main>
              </ProtectedRoute>
            } />
            <Route path="/essay-analysis" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <EssayAnalysis />
                </main>
              </ProtectedRoute>
            } />
            <Route path="/ai-tutor" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <AITutor />
                </main>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <Analytics />
                </main>
              </ProtectedRoute>
            } />
            <Route path="/about-me" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <AboutMe />
                </main>
              </ProtectedRoute>
            } />
            <Route path="/genericgpt" element={<GenericGPT />} />
            <Route path="*" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <NotFound />
                </main>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
