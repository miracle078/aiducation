import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
  environment: process.env.PINECONE_ENVIRONMENT!,
});

const index = pinecone.Index('aiducation');

interface ContentRequest {
  subject: string;
  topic: string;
  learningStyle?: 'visual' | 'auditory' | 'reading' | 'kinesthetic';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

interface HighlightRequest {
  content: string;
  subject: string;
  topic: string;
}

interface ExamQuestionRequest {
  subject: string;
  topic: string;
  question: string;
}

export class AIService {
  static async generateContent(request: ContentRequest) {
    const prompt = `Generate A-Level ${request.subject} content about ${request.topic}.
    Learning style: ${request.learningStyle || 'balanced'}
    Difficulty: ${request.difficulty || 'intermediate'}
    Ensure the content is:
    1. Aligned with A-Level curriculum
    2. Accurate and verified
    3. Engaging and clear
    4. Includes examples and practice questions`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    return completion.choices[0].message.content;
  }

  static async highlightContent(request: HighlightRequest) {
    const prompt = `Analyze the following ${request.subject} content about ${request.topic} and identify key concepts, definitions, and important points to highlight:
    ${request.content}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    return completion.choices[0].message.content;
  }

  static async solveExamQuestion(request: ExamQuestionRequest) {
    const prompt = `Solve this A-Level ${request.subject} exam question about ${request.topic} step by step:
    ${request.question}
    Provide:
    1. Step-by-step solution
    2. Key concepts used
    3. Common mistakes to avoid
    4. Alternative approaches`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    return completion.choices[0].message.content;
  }

  static async generateVisualContent(request: ContentRequest) {
    const prompt = `Create a detailed description for a visual representation of ${request.topic} in ${request.subject} at A-Level.
    Include:
    1. Key elements to visualize
    2. Relationships between elements
    3. Labels and annotations
    4. Color coding suggestions`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    const imagePrompt = completion.choices[0].message.content;

    const image = await openai.images.generate({
      prompt: imagePrompt!,
      n: 1,
      size: '1024x1024',
    });

    return {
      description: imagePrompt,
      imageUrl: image.data[0].url,
    };
  }

  static async storeContent(subject: string, topic: string, content: string) {
    const embedding = await openai.embeddings.create({
      input: content,
      model: 'text-embedding-ada-002',
    });

    await index.upsert([
      {
        id: `${subject}-${topic}`,
        values: embedding.data[0].embedding,
        metadata: {
          subject,
          topic,
          content,
        },
      },
    ]);
  }

  static async searchContent(subject: string, topic: string, query: string) {
    const embedding = await openai.embeddings.create({
      input: query,
      model: 'text-embedding-ada-002',
    });

    const results = await index.query({
      vector: embedding.data[0].embedding,
      topK: 5,
      includeMetadata: true,
      filter: {
        subject,
        topic,
      },
    });

    return results.matches.map(match => match.metadata);
  }

  static async analyzeEssay(essay: string): Promise<{
    grammar: number;
    structure: number;
    content: number;
    overall: number;
    feedback: string;
  }> {
    const prompt = `Analyze the following essay and provide scores (0-100) for grammar, structure, content, and overall quality. Also provide detailed feedback.
    Essay: ${essay}
    
    Respond in JSON format with the following structure:
    {
      "grammar": number,
      "structure": number,
      "content": number,
      "overall": number,
      "feedback": string
    }`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
      response_format: { type: 'json_object' },
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    return response;
  }

  static async generateTutorResponse(
    subject: string,
    topic: string,
    conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
    userMessage: string
  ): Promise<string> {
    const systemPrompt = `You are an expert A-Level ${subject} tutor specializing in ${topic}. 
    Your role is to help students understand complex concepts, provide clear explanations, and guide them through problem-solving.
    Be patient, encouraging, and focus on building understanding rather than just providing answers.
    Use examples and analogies when appropriate.
    If the student makes a mistake, help them understand why and guide them to the correct solution.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: userMessage },
    ];

    const completion = await openai.chat.completions.create({
      messages,
      model: 'gpt-4',
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content || 'I apologize, but I am unable to provide a response at this time.';
  }

  static async generateStudyMaterial(
    subject: string,
    topic: string,
    learningStyle: 'visual' | 'auditory' | 'reading' | 'kinesthetic'
  ): Promise<{
    content: string;
    examples: string[];
    practiceQuestions: string[];
  }> {
    const prompt = `Create a comprehensive study guide for A-Level ${subject} on the topic of ${topic}.
    The content should be tailored for a ${learningStyle} learning style.
    Include:
    1. Clear explanations of key concepts
    2. Relevant examples
    3. Practice questions with solutions
    
    Respond in JSON format with the following structure:
    {
      "content": string,
      "examples": string[],
      "practiceQuestions": string[]
    }`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
      response_format: { type: 'json_object' },
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    return response;
  }
} 