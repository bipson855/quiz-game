# Quiz Studio

A complete responsive React quiz app built with Vite. Includes three topics, 24 explained questions, randomized rounds, five- or eight-question quizzes, an optional 30-second question timer, immediate feedback, results review, replay, and personal best scores saved in your browser.

## Run locally

Requires Node.js 22 LTS and npm.

```sh
cd react-quiz-app
npm install
npm run dev
```

Open the local URL printed in the terminal (usually http://localhost:5173).

## Build and test

```sh
npm test
npm run build
npm run preview
```

The production site is generated in `dist/`. Deploy that directory to any static web host. No backend, API key, or environment variables are required.

## Project structure

- `src/App.jsx`: topic setup, quiz state, timer, feedback, and results
- `src/components/Progress.jsx`: accessible progress indicator
- `src/data/questions.js`: topic definitions, question bank, and randomized selection
- `src/data/questions.test.js`: question integrity and selection tests
- `src/styles.css`: responsive layout and visual design
- `src/main.jsx`: React entry point
- `vite.config.js`: development and production configuration

## Customize

Add topics to `topics` and questions to `questions` in `src/data/questions.js`. Each topic needs at least eight questions to support both round lengths. An answer is the zero-based index of the correct option. Include an explanation for every question.

The timer uses a wall-clock deadline, so switching tabs does not give extra time. Expired questions are marked unanswered. Answers lock after checking; explanations appear before the next question. Personal bests are stored per topic as percentages in localStorage and remain available across reloads. Storage failures do not prevent play. Active rounds are not persisted across reloads.

Google Fonts are optional; system fonts are used when offline. Quiz data is bundled locally. Keyboard controls use standard Tab, Enter, and Space interactions.
