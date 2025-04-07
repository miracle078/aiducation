import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

// Study API
export const studyAPI = {
  getProgress: () => api.get('/study/progress'),
  updateProgress: (data: { subject: string; topic: string; progress: number }) =>
    api.post('/study/progress', data),
  getMaterials: (subjectId?: string, topicId?: string) => {
    const subject = subjectId && subjectId.trim() !== '' ? subjectId.trim() : 'all';
    const topic = topicId && topicId.trim() !== '' ? topicId.trim() : 'all';
    return api.get(`/study/materials/${subject}/${topic}`.replace(/\/+/g, '/'));
  },
  saveSession: (data: { 
    subject: string; 
    topic: string; 
    duration?: number; 
    notes?: string; 
  }) => {
    // Ensure duration and notes have default values
    const sessionData = {
      subject: data.subject,
      topic: data.topic,
      duration: data.duration || 0,
      notes: data.notes || ''
    };
    return api.post('/study/session', sessionData);
  },
};

// Essay API
export const essayAPI = {
  saveEssay: (data: { title: string; content: string; analysis: any }) =>
    api.post('/essay', data),
  getEssays: () => api.get('/essay'),
  getEssayAnalysis: (essayId: string) => api.get(`/essay/${essayId}/analysis`),
  deleteEssay: (essayId: string) => api.delete(`/essay/${essayId}`),
};

// AI Tutor API
export const aiTutorAPI = {
  startSession: (data: { subject: string; topic: string }) =>
    api.post('/ai-tutor/session', data),
  sendMessage: (sessionId: string, content: string) =>
    api.post(`/ai-tutor/session/${sessionId}/message`, { content }),
  getSessionHistory: (sessionId: string) =>
    api.get(`/ai-tutor/session/${sessionId}`),
  endSession: (sessionId: string) =>
    api.delete(`/ai-tutor/session/${sessionId}`),
};

// Analytics API
export const analyticsAPI = {
  getStudyAnalytics: () => api.get('/analytics/study'),
  getEssayAnalytics: () => api.get('/analytics/essay'),
  getTutorAnalytics: () => api.get('/analytics/tutor'),
  getOverallProgress: () => api.get('/analytics/overall'),
}; 