import test from 'node:test';
import assert from 'node:assert/strict';
import { questions, topics, makeQuiz } from './questions.js';
test('question bank has unique IDs, valid answers, and enough questions per topic', () => {
  assert.equal(new Set(questions.map(q => q.id)).size, questions.length);
  for (const q of questions) {
    assert.ok(topics.some(t => t.id === q.topic));
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options).size, 4);
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4);
    assert.ok(q.explanation.length > 0);
  }
  for (const t of topics) assert.ok(questions.filter(q => q.topic === t.id).length >= 8);
});
test('quiz generation selects unique questions in the requested topic without mutating the bank', () => {
  const before = JSON.stringify(questions);
  for (const topic of topics) for (const count of [5, 8]) {
    const quiz = makeQuiz(topic.id, count, () => 0.42);
    assert.equal(quiz.length, count);
    assert.equal(new Set(quiz.map(q => q.id)).size, count);
    assert.ok(quiz.every(q => q.topic === topic.id));
  }
  assert.equal(JSON.stringify(questions), before);
});
