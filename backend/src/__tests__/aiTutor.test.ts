import request from 'supertest';
import { app } from '../server';
import { User } from '../models/User';
import { TutorSession } from '../models/TutorSession';
import { Types } from 'mongoose';

describe('AI Tutor Controller', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User'
  };
  let token: string;
  let userId: string;
  let sessionId: Types.ObjectId;

  beforeEach(async () => {
    // Clear all collections
    await User.deleteMany({});
    await TutorSession.deleteMany({});

    // Register and login to get token
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    token = registerRes.body.token;
    userId = registerRes.body.user.id;
  });

  describe('GET /api/tutor/sessions', () => {
    it('should get all tutor sessions', async () => {
      // Create test sessions
      await TutorSession.create([
        {
          userId,
          subject: 'Math',
          topic: 'Algebra',
          messages: []
        },
        {
          userId,
          subject: 'Science',
          topic: 'Physics',
          messages: []
        }
      ]);

      const res = await request(app)
        .get('/api/tutor/sessions')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });

    it('should return empty array if no sessions', async () => {
      const res = await request(app)
        .get('/api/tutor/sessions')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });
  });

  describe('POST /api/tutor/sessions', () => {
    it('should start a new tutor session', async () => {
      const sessionData = {
        subject: 'Math',
        topic: 'Algebra'
      };

      const res = await request(app)
        .post('/api/tutor/sessions')
        .set('Authorization', `Bearer ${token}`)
        .send(sessionData);

      expect(res.status).toBe(200);
      expect(res.body.subject).toBe(sessionData.subject);
      expect(res.body.topic).toBe(sessionData.topic);
      expect(res.body.messages).toHaveLength(0);
      expect(res.body.userId).toBe(userId);

      sessionId = new Types.ObjectId(res.body._id);
    });

    it('should require subject and topic', async () => {
      const res = await request(app)
        .post('/api/tutor/sessions')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('POST /api/tutor/sessions/:sessionId/messages', () => {
    beforeEach(async () => {
      // Create a test session
      const session = await TutorSession.create({
        userId,
        subject: 'Math',
        topic: 'Algebra',
        messages: []
      });
      sessionId = session._id;
    });

    it('should send a message and get AI response', async () => {
      const messageData = {
        content: 'What is the quadratic formula?'
      };

      const res = await request(app)
        .post(`/api/tutor/sessions/${sessionId.toString()}/messages`)
        .set('Authorization', `Bearer ${token}`)
        .send(messageData);

      expect(res.status).toBe(200);
      expect(res.body.messages).toHaveLength(2); // User message + AI response
      expect(res.body.messages[0].role).toBe('user');
      expect(res.body.messages[0].content).toBe(messageData.content);
      expect(res.body.messages[1].role).toBe('assistant');
      expect(res.body.messages[1].content).toBeDefined();
    });

    it('should not allow empty messages', async () => {
      const res = await request(app)
        .post(`/api/tutor/sessions/${sessionId.toString()}/messages`)
        .set('Authorization', `Bearer ${token}`)
        .send({ content: '' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('should not allow messages to non-existent sessions', async () => {
      const nonExistentId = new Types.ObjectId();
      const res = await request(app)
        .post(`/api/tutor/sessions/${nonExistentId.toString()}/messages`)
        .set('Authorization', `Bearer ${token}`)
        .send({ content: 'Test message' });

      expect(res.status).toBe(404);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('GET /api/tutor/sessions/:sessionId', () => {
    beforeEach(async () => {
      // Create a test session with messages
      const session = await TutorSession.create({
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
      });
      sessionId = session._id;
    });

    it('should get session history', async () => {
      const res = await request(app)
        .get(`/api/tutor/sessions/${sessionId.toString()}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.messages).toHaveLength(2);
      expect(res.body.messages[0].role).toBe('user');
      expect(res.body.messages[1].role).toBe('assistant');
    });

    it('should not allow access to non-existent sessions', async () => {
      const nonExistentId = new Types.ObjectId();
      const res = await request(app)
        .get(`/api/tutor/sessions/${nonExistentId.toString()}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('DELETE /api/tutor/sessions/:sessionId', () => {
    beforeEach(async () => {
      // Create a test session
      const session = await TutorSession.create({
        userId,
        subject: 'Math',
        topic: 'Algebra',
        messages: []
      });
      sessionId = session._id;
    });

    it('should end a tutor session', async () => {
      const res = await request(app)
        .delete(`/api/tutor/sessions/${sessionId.toString()}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Session ended successfully');

      // Verify session is deleted
      const deletedSession = await TutorSession.findById(sessionId);
      expect(deletedSession).toBeNull();
    });

    it('should not allow ending non-existent sessions', async () => {
      const nonExistentId = new Types.ObjectId();
      const res = await request(app)
        .delete(`/api/tutor/sessions/${nonExistentId.toString()}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBeDefined();
    });
  });
}); 