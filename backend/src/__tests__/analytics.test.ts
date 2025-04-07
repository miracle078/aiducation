import request from 'supertest';
import { app } from '../server';
import { User } from '../models/User';
import { StudyProgress } from '../models/StudyProgress';
import { TutorSession } from '../models/TutorSession';
import { Essay } from '../models/Essay';
import { LearningAnalytics } from '../models/LearningAnalytics';
import { Types } from 'mongoose';

describe('Analytics Controller', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User'
  };
  let token: string;
  let userId: string;

  beforeEach(async () => {
    // Clear all collections
    await User.deleteMany({});
    await StudyProgress.deleteMany({});
    await TutorSession.deleteMany({});
    await Essay.deleteMany({});
    await LearningAnalytics.deleteMany({});

    // Register and login to get token
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    token = registerRes.body.token;
    userId = registerRes.body.user.id;

    // Create test data
    await StudyProgress.create([
      {
        userId,
        subject: 'Math',
        topic: 'Algebra',
        score: 85,
        timeSpent: 30,
        attempts: 1,
        lastAttempt: new Date()
      },
      {
        userId,
        subject: 'Science',
        topic: 'Physics',
        score: 90,
        timeSpent: 45,
        attempts: 2,
        lastAttempt: new Date()
      }
    ]);

    await TutorSession.create([
      {
        userId,
        subject: 'Math',
        topic: 'Algebra',
        messages: [
          {
            role: 'user',
            content: 'What is 2+2?',
            timestamp: new Date()
          },
          {
            role: 'assistant',
            content: 'The answer is 4.',
            timestamp: new Date()
          }
        ]
      }
    ]);

    await Essay.create([
      {
        userId,
        title: 'Test Essay 1',
        content: 'Test content 1',
        subject: 'English',
        topic: 'Literature',
        analysis: {
          overallScore: 85,
          grammarScore: 90,
          structureScore: 80,
          contentScore: 85,
          suggestions: []
        }
      },
      {
        userId,
        title: 'Test Essay 2',
        content: 'Test content 2',
        subject: 'History',
        topic: 'World War II',
        analysis: {
          overallScore: 90,
          grammarScore: 95,
          structureScore: 85,
          contentScore: 90,
          suggestions: []
        }
      }
    ]);
  });

  describe('GET /api/analytics/study', () => {
    it('should get study analytics', async () => {
      const res = await request(app)
        .get('/api/analytics/study')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('totalTimeSpent');
      expect(res.body).toHaveProperty('averageScore');
      expect(res.body).toHaveProperty('subjects');
      expect(Array.isArray(res.body.subjects)).toBe(true);
      expect(res.body.subjects.length).toBe(2);
    });

    it('should calculate correct analytics', async () => {
      const res = await request(app)
        .get('/api/analytics/study')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.totalTimeSpent).toBe(75); // 30 + 45 minutes
      expect(res.body.averageScore).toBe(87.5); // (85 + 90) / 2
      expect(res.body.subjects[0].subject).toBe('Math');
      expect(res.body.subjects[0].averageScore).toBe(85);
      expect(res.body.subjects[1].subject).toBe('Science');
      expect(res.body.subjects[1].averageScore).toBe(90);
    });
  });

  describe('GET /api/analytics/tutor', () => {
    it('should get tutor session analytics', async () => {
      const res = await request(app)
        .get('/api/analytics/tutor')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('totalSessions');
      expect(res.body).toHaveProperty('totalMessages');
      expect(res.body).toHaveProperty('subjects');
      expect(Array.isArray(res.body.subjects)).toBe(true);
    });

    it('should calculate correct tutor analytics', async () => {
      const res = await request(app)
        .get('/api/analytics/tutor')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.totalSessions).toBe(1);
      expect(res.body.totalMessages).toBe(2);
      expect(res.body.subjects[0].subject).toBe('Math');
      expect(res.body.subjects[0].sessions).toBe(1);
    });
  });

  describe('GET /api/analytics/essay', () => {
    it('should get essay analytics', async () => {
      const res = await request(app)
        .get('/api/analytics/essay')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('totalEssays');
      expect(res.body).toHaveProperty('averageScore');
      expect(res.body).toHaveProperty('subjects');
      expect(Array.isArray(res.body.subjects)).toBe(true);
    });

    it('should calculate correct essay analytics', async () => {
      const res = await request(app)
        .get('/api/analytics/essay')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.totalEssays).toBe(2);
      expect(res.body.averageScore).toBe(87.5); // (85 + 90) / 2
      expect(res.body.subjects[0].subject).toBe('English');
      expect(res.body.subjects[0].averageScore).toBe(85);
      expect(res.body.subjects[1].subject).toBe('History');
      expect(res.body.subjects[1].averageScore).toBe(90);
    });
  });

  describe('GET /api/analytics/overall', () => {
    it('should get overall learning analytics', async () => {
      const res = await request(app)
        .get('/api/analytics/overall')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('studyProgress');
      expect(res.body).toHaveProperty('tutorSessions');
      expect(res.body).toHaveProperty('essayPerformance');
      expect(res.body).toHaveProperty('learningStreak');
      expect(res.body).toHaveProperty('recommendations');
    });

    it('should calculate correct overall analytics', async () => {
      const res = await request(app)
        .get('/api/analytics/overall')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.studyProgress.totalTimeSpent).toBe(75);
      expect(res.body.studyProgress.averageScore).toBe(87.5);
      expect(res.body.tutorSessions.totalSessions).toBe(1);
      expect(res.body.tutorSessions.totalMessages).toBe(2);
      expect(res.body.essayPerformance.totalEssays).toBe(2);
      expect(res.body.essayPerformance.averageScore).toBe(87.5);
      expect(Array.isArray(res.body.recommendations)).toBe(true);
    });
  });
}); 