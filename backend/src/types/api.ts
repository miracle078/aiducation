// Study Types
export interface StudyProgress {
  userId: string;
  subject: string;
  topic: string;
  score: number;
  timeSpent: number;
  attempts: number;
  lastAttempt: Date;
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
  userId: string;
  title: string;
  content: string;
  analysis: {
    grammar: number;
    structure: number;
    content: number;
    overall: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// AI Tutor Types
export interface TutorMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface TutorSession {
  userId: string;
  subject: string;
  topic: string;
  messages: TutorMessage[];
  createdAt: Date;
  updatedAt: Date;
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