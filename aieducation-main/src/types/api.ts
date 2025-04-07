// Study Types
export interface StudyProgress {
  userId: string;
  subject: string;
  topic: string;
  score: number;
  timeSpent: number;
  attempts: number;
  lastAttempt: string;
}

export interface StudyMaterial {
  subject: string;
  topic: string;
  title: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  resources: Array<{
    type: 'video' | 'article' | 'exercise';
    title: string;
    url: string;
  }>;
}

// Essay Types
export interface Essay {
  id: string;
  title: string;
  content: string;
  analysis: {
    grammar: number;
    structure: number;
    content: number;
    overall: number;
  };
  createdAt: string;
  updatedAt: string;
}

// AI Tutor Types
export interface TutorMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface TutorSession {
  id: string;
  subject: string;
  topic: string;
  messages: TutorMessage[];
  createdAt: string;
  updatedAt: string;
}

// Analytics Types
export interface StudyAnalytics {
  totalTimeSpent: number;
  averageScore: number;
  completedTopics: number;
  progressBySubject: Record<string, number>;
}

export interface EssayAnalytics {
  totalEssays: number;
  averageScore: number;
  improvementAreas: string[];
}

export interface TutorAnalytics {
  totalSessions: number;
  averageSessionDuration: number;
  topicsCovered: string[];
}

export interface OverallProgress {
  study: StudyAnalytics;
  essay: EssayAnalytics;
  tutor: TutorAnalytics;
  learningStyle: {
    visual: number;
    auditory: number;
    reading: number;
    kinesthetic: number;
  };
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
} 