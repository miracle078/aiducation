import request from 'supertest';
import { app } from '../server';
import { User } from '../models/User';
import { Essay } from '../models/Essay';
import { Types } from 'mongoose';

describe('Essay Controller', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User'
  };
  let token: string;
  let userId: string;
  let essayId: Types.ObjectId;

  beforeEach(async () => {
    // Clear all collections
    await User.deleteMany({});
    await Essay.deleteMany({});

    // Register and login to get token
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    token = registerRes.body.token;
    userId = registerRes.body.user.id;
  });

  describe('POST /api/essays', () => {
    it('should save a new essay', async () => {
      const essayData = {
        title: 'The Impact of Technology',
        content: 'Technology has revolutionized our lives...',
        subject: 'English',
        topic: 'Technology'
      };

      const res = await request(app)
        .post('/api/essays')
        .set('Authorization', `Bearer ${token}`)
        .send(essayData);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe(essayData.title);
      expect(res.body.content).toBe(essayData.content);
      expect(res.body.subject).toBe(essayData.subject);
      expect(res.body.topic).toBe(essayData.topic);
      expect(res.body.userId).toBe(userId);
      expect(res.body.analysis).toBeDefined();

      essayId = new Types.ObjectId(res.body._id);
    });

    it('should require title and content', async () => {
      const res = await request(app)
        .post('/api/essays')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('GET /api/essays', () => {
    beforeEach(async () => {
      // Create test essays
      await Essay.create([
        {
          userId,
          title: 'Essay 1',
          content: 'Content 1',
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
          title: 'Essay 2',
          content: 'Content 2',
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

    it('should get all essays', async () => {
      const res = await request(app)
        .get('/api/essays')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });

    it('should return empty array if no essays', async () => {
      await Essay.deleteMany({});
      const res = await request(app)
        .get('/api/essays')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });
  });

  describe('GET /api/essays/:essayId', () => {
    beforeEach(async () => {
      // Create a test essay
      const essay = await Essay.create({
        userId,
        title: 'Test Essay',
        content: 'Test content',
        subject: 'English',
        topic: 'Literature',
        analysis: {
          overallScore: 85,
          grammarScore: 90,
          structureScore: 80,
          contentScore: 85,
          suggestions: ['Improve conclusion', 'Add more examples']
        }
      });
      essayId = essay._id;
    });

    it('should get essay analysis', async () => {
      const res = await request(app)
        .get(`/api/essays/${essayId.toString()}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.analysis).toBeDefined();
      expect(res.body.analysis.overallScore).toBe(85);
      expect(res.body.analysis.suggestions).toHaveLength(2);
    });

    it('should not allow access to non-existent essays', async () => {
      const nonExistentId = new Types.ObjectId();
      const res = await request(app)
        .get(`/api/essays/${nonExistentId.toString()}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('DELETE /api/essays/:essayId', () => {
    beforeEach(async () => {
      // Create a test essay
      const essay = await Essay.create({
        userId,
        title: 'Test Essay',
        content: 'Test content',
        subject: 'English',
        topic: 'Literature',
        analysis: {
          overallScore: 85,
          grammarScore: 90,
          structureScore: 80,
          contentScore: 85,
          suggestions: []
        }
      });
      essayId = essay._id;
    });

    it('should delete an essay', async () => {
      const res = await request(app)
        .delete(`/api/essays/${essayId.toString()}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Essay deleted successfully');

      // Verify essay is deleted
      const deletedEssay = await Essay.findById(essayId);
      expect(deletedEssay).toBeNull();
    });

    it('should not allow deleting non-existent essays', async () => {
      const nonExistentId = new Types.ObjectId();
      const res = await request(app)
        .delete(`/api/essays/${nonExistentId.toString()}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBeDefined();
    });
  });
}); 