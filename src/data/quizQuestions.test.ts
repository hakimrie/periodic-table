import { describe, it, expect } from 'vitest';
import { generateQuizQuestions } from './quizQuestions';

describe('Quiz Generator & Question Bank', () => {
  it('generates the requested number of questions', () => {
    const questions5 = generateQuizQuestions(5, 12345);
    expect(questions5.length).toBe(5);

    const questions15 = generateQuizQuestions(15, 67890);
    expect(questions15.length).toBe(15);
  });

  it('generates deterministic questions given the same seed', () => {
    const seed = 42;
    const run1 = generateQuizQuestions(10, seed);
    const run2 = generateQuizQuestions(10, seed);

    expect(run1).toEqual(run2);
  });

  it('generates different questions given different seeds', () => {
    const runA = generateQuizQuestions(10, 1111);
    const runB = generateQuizQuestions(10, 9999);

    const idsA = runA.map((q) => q.id).join(',');
    const idsB = runB.map((q) => q.id).join(',');
    expect(idsA).not.toEqual(idsB);
  });

  it('validates question integrity: question text, options array, valid correctIndex, and educational explanation', () => {
    const questions = generateQuizQuestions(25, 98765, 'all');

    questions.forEach((q) => {
      expect(q.id).toBeTruthy();
      expect(q.question).toBeTruthy();
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(q.options.length);
      expect(q.explanation).toBeTruthy();
    });
  });

  it('filters by educational difficulty level properly', () => {
    const hsQuestions = generateQuizQuestions(10, 123, 'high-school');
    hsQuestions.forEach((q) => {
      expect(q.difficulty).toBe('high-school');
    });

    const uniQuestions = generateQuizQuestions(10, 456, 'university');
    uniQuestions.forEach((q) => {
      expect(q.difficulty).toBe('university');
    });
  });

  it('generates questions in Bahasa Indonesia when lang is set to id', () => {
    const idQuestions = generateQuizQuestions(15, 777, 'all', 'id');
    expect(idQuestions.length).toBe(15);
    idQuestions.forEach((q) => {
      expect(q.question).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      // Should not contain English question words
      expect(q.question).not.toMatch(/Which|How many|Why does|True or False/i);
    });
  });
});
