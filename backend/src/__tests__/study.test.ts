import request from 'supertest';
import { app } from '../server';
import { User } from '../models/User';
import { StudyProgress } from '../models/StudyProgress';
import { StudyMaterial } from '../models/StudyMaterial';

describe('Study Controller', () => {
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
    await StudyMaterial.deleteMany({});

    // Register and login to get token
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    token = registerRes.body.token;
    userId = registerRes.body.user.id;

    // Create test study materials
    await StudyMaterial.create([
      {
        subject: 'Math',
        topic: 'Algebra',
        title: 'Basic Algebra',
        content: 'Introduction to algebraic expressions',
        difficulty: 'beginner'
      },
      {
        subject: 'Math',
        topic: 'Calculus',
        title: 'Derivatives',
        content: 'Introduction to derivatives',
        difficulty: 'advanced'
      }
    ]);
  });

  describe('GET /api/study/progress', () => {
    it('should get study progress', async () => {
      // Create test progress
      await StudyProgress.create({
        userId,
        subject: 'Math',
        topic: 'Algebra',
        score: 85,
        timeSpent: 30,
        attempts: 1,
        lastAttempt: new Date()
      });

      const res = await request(app)
        .get('/api/study/progress')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].subject).toBe('Math');
      expect(res.body[0].topic).toBe('Algebra');
    });

    it('should return empty array if no progress', async () => {
      const res = await request(app)
        .get('/api/study/progress')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });
  });

  describe('POST /api/study/progress', () => {
    it('should update study progress', async () => {
      const progressData = {
        subject: 'Math',
        topic: 'Algebra',
        score: 90,
        timeSpent: 45
      };

      const res = await request(app)
        .post('/api/study/progress')
        .set('Authorization', `Bearer ${token}`)
        .send(progressData);

      expect(res.status).toBe(200);
      expect(res.body.subject).toBe(progressData.subject);
      expect(res.body.topic).toBe(progressData.topic);
      expect(res.body.score).toBe(progressData.score);
      expect(res.body.timeSpent).toBe(progressData.timeSpent);
      expect(res.body.attempts).toBe(1);
    });

    it('should increment attempts on subsequent updates', async () => {
      const progressData = {
        subject: 'Math',
        topic: 'Algebra',
        score: 90,
        timeSpent: 45
      };

      // First update
      await request(app)
        .post('/api/study/progress')
        .set('Authorization', `Bearer ${token}`)
        .send(progressData);

      // Second update
      const res = await request(app)
        .post('/api/study/progress')
        .set('Authorization', `Bearer ${token}`)
        .send(progressData);

      expect(res.status).toBe(200);
      expect(res.body.attempts).toBe(2);
    });
  });

  describe('GET /api/study/materials', () => {
    it('should get all study materials', async () => {
      const res = await request(app)
        .get('/api/study/materials')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });

    it('should filter materials by subject', async () => {
      const res = await request(app)
        .get('/api/study/materials/Math')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
      expect(res.body.every((m: any) => m.subject === 'Math')).toBe(true);
    });

    it('should filter materials by subject and topic', async () => {
      const res = await request(app)
        .get('/api/study/materials/Math/Algebra')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
      expect(res.body[0].subject).toBe('Math');
      expect(res.body[0].topic).toBe('Algebra');
    });
  });

  describe('POST /api/study/session', () => {
    it('should save a study session', async () => {
      const sessionData = {
        subject: 'Math',
        topic: 'Algebra',
        duration: 30,
        notes: 'Studied basic algebraic expressions'
      };

      const res = await request(app)
        .post('/api/study/session')
        .set('Authorization', `Bearer ${token}`)
        .send(sessionData);

      expect(res.status).toBe(200);
      expect(res.body.subject).toBe(sessionData.subject);
      expect(res.body.topic).toBe(sessionData.topic);
      expect(res.body.timeSpent).toBe(sessionData.duration);
      expect(res.body.score).toBe(0);
      expect(res.body.attempts).toBe(1);
    });
  });
}); 