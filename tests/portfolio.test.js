import assert from 'node:assert/strict';
import test from 'node:test';
import { certifications, getAge, projects } from '../src/data/portfolio.js';
import { getAssistantResponse } from '../src/data/responses.js';

test('age calculation handles birthdays before and on the birthday', () => {
  assert.equal(getAge(new Date('2026-10-10T12:00:00')), 22);
  assert.equal(getAge(new Date('2026-10-11T12:00:00')), 23);
});

test('certifications are shared across the portfolio and resume', () => {
  assert.equal(certifications.length, 7);
  assert.ok(certifications.every(({ title, issuer, date, img }) => title && issuer && date && img));
});

test('projects use shared portfolio data with complete case-study details', () => {
  assert.equal(projects.length, 11);
  assert.ok(projects.every(({ id, title, category, details }) =>
    id && title && category && details.problem && details.solution && details.features.length,
  ));
});

test('assistant responses use current shared profile data', () => {
  assert.match(getAssistantResponse('what is his age').text, /23 years old/);
  assert.match(getAssistantResponse('how can I email him').text, /jezua\.palma1011@gmail\.com/);
  assert.equal(getAssistantResponse('weather in Tokyo'), null);
});
