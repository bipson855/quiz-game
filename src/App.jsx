import { useEffect, useRef, useState } from 'react';
import { makeQuiz, topics } from './data/questions';
import Progress from './components/Progress';
import ExitDialog from './components/ExitDialog';

function readBest() { try { return JSON.parse(localStorage.getItem('quiz-studio-best')) || {}; } catch { return {}; } }
export default function App() {
  const [screen, setScreen] = useState('home');
  const [topic, setTopic] = useState('web');
  const [count, setCount] = useState(5);
  const [timed, setTimed] = useState(true);
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [remaining, setRemaining] = useState(30);
  const [best, setBest] = useState(readBest);
  const [confirmExit, setConfirmExit] = useState(false);
  const heading = useRef(null);
  const deadline = useRef(0);
  const current = quiz[index];
  const activeTopic = topics.find(item => item.id === topic);
  const score = answers.reduce((total, answer, i) => total + Number(answer === quiz[i]?.answer), 0);
  useEffect(() => { heading.current?.focus(); }, [screen, index]);
  useEffect(() => {
    if (screen !== 'quiz' || locked || !timed) return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) { setSelected(null); setLocked(true); setAnswers(previous => previous.length > index ? previous : [...previous, null]); }
    };
    tick(); const timer = setInterval(tick, 200); return () => clearInterval(timer);
  }, [screen, index, locked, timed]);
  function start() {
    setQuiz(makeQuiz(topic, count)); setIndex(0); setAnswers([]); setSelected(null); setLocked(false); setRemaining(30); deadline.current = Date.now() + 30000; setConfirmExit(false); setScreen('quiz');
  }
  function submit() {
    if (selected === null || locked) return;
    if (timed && Date.now() >= deadline.current) { setSelected(null); setAnswers([...answers, null]); }
    else setAnswers([...answers, selected]);
    setLocked(true);
  }
  function next() {
    if (index + 1 === quiz.length) {
      const percentage = Math.round(score / quiz.length * 100);
      const updated = {...best, [topic]: Math.max(Number(best[topic]) || 0, percentage)};
      setBest(updated); try { localStorage.setItem('quiz-studio-best', JSON.stringify(updated)); } catch { /* Scores still work when storage is unavailable. */ }
      setScreen('results');
    } else { setIndex(index + 1); setSelected(null); setLocked(false); setRemaining(30); deadline.current = Date.now() + 30000; }
  }
  return <div className="app-shell">
    <header><button className="brand" onClick={() => screen === 'quiz' ? setConfirmExit(true) : setScreen('home')} aria-label="Quiz Studio home"><span className="brand-mark">q.</span>quiz studio<span className="brand-dot">®</span></button><span className="header-note">A LITTLE WISER, EVERY DAY <span>✳</span></span></header>
    <main>
      {screen === 'home' && <>
        <section className="hero"><div><span className="eyebrow"><i /> MADE FOR CURIOUS MINDS</span><h1 ref={heading} tabIndex={-1}>Small quizzes.<br/><em>Big discoveries.</em></h1><p>A little challenge for your everyday. Pick a topic,<br className="desktop-break"/> put your knowledge to the test, and learn something new.</p><div className="hero-meta"><span>↗ &nbsp; 3 topics to explore</span><span>◷ &nbsp; A few minutes is all it takes</span></div></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><span className="spark spark-one">✦</span><span className="spark spark-two">✳</span><div className="art-card"><span>YOUR DAILY DOSE OF</span><b>“aha!”</b><div>STAY CURIOUS ↗</div></div><span className="art-badge">a good day<br/>to learn.</span></div></section>
        <section className="setup"><div className="section-heading"><div><span className="eyebrow">01 / FIND YOUR CURIOSITY</span><h2>What’s your thing?</h2></div><span className="muted">Choose your next challenge</span></div><div className="topic-grid">{topics.map(item => <button key={item.id} className={`topic-card ${item.color} ${topic === item.id ? 'active' : ''}`} onClick={() => setTopic(item.id)} aria-pressed={topic === item.id}><div className="topic-top"><span className="topic-icon">{item.icon}</span><span className="radio">{topic === item.id ? '✓' : ''}</span></div><h3>{item.name}</h3><p>{item.description}</p><div className="topic-bottom"><span>8 questions in the collection</span><span>↗</span></div>{best[item.id] !== undefined && <small>Personal best · {best[item.id]}%</small>}</button>)}</div>
        <div className="launch-bar"><div className="settings"><label>Quiz length<select value={count} onChange={event => setCount(Number(event.target.value))}><option value={5}>5 questions</option><option value={8}>8 questions</option></select></label><label className="timer-setting"><span>Make it a challenge<small>30 seconds per question</small></span><input type="checkbox" checked={timed} onChange={event => setTimed(event.target.checked)}/></label></div><button className="primary" onClick={start}>Let’s play <span>↗</span></button></div></section><p className="bottom-note">NO SIGN-UP. NO PRESSURE. JUST A LITTLE CURIOSITY.</p>
      </>}
      {screen === 'quiz' && current && <section className="play-section"><div className="play-top"><button className="text-button" onClick={() => setConfirmExit(true)}>← Leave quiz</button><span>{activeTopic.name}</span></div><div className="quiz-card"><div className="question-meta"><span className="eyebrow">QUESTION {index + 1} OF {quiz.length}</span>{timed && <span className={`timer ${remaining <= 10 ? 'urgent' : ''}`} role="timer" aria-label={`${remaining} seconds remaining`}>◷ {remaining}s</span>}</div><Progress value={(index + Number(locked)) / quiz.length * 100} label="Quiz progress"/><h1 className="question-title" ref={heading} tabIndex={-1}>{current.prompt}</h1><div className="options">{current.options.map((option, i) => <button key={option} disabled={locked} aria-pressed={selected === i} className={`option ${selected === i ? 'selected' : ''} ${locked && i === current.answer ? 'correct' : ''} ${locked && selected === i && i !== current.answer ? 'incorrect' : ''}`} onClick={() => setSelected(i)}><span className="option-letter">{'ABCD'[i]}</span><span>{option}</span><span className="option-status">{locked && i === current.answer ? '✓' : locked && selected === i ? '×' : selected === i ? '●' : ''}</span></button>)}</div><div aria-live="polite">{locked && <div className={`feedback ${selected === current.answer ? 'success' : ''}`}><strong>{selected === null ? 'Time’s up. Here’s something to learn.' : selected === current.answer ? 'Nicely done! You’ve got it.' : 'A new thing to know.'}</strong><p>{current.explanation}</p></div>}</div><div className="quiz-actions"><span className="muted">{locked ? `${score} correct so far` : 'Choose the best answer.'}</span>{locked ? <button className="primary" onClick={next}>{index + 1 === quiz.length ? 'See my results' : 'Next question'} <span>→</span></button> : <button className="primary" disabled={selected === null} onClick={submit}>Check answer <span>→</span></button>}</div></div></section>}
      {screen === 'results' && <section className="results"><span className="eyebrow">A LITTLE WISER ALREADY</span><h1 ref={heading} tabIndex={-1}>{score === quiz.length ? 'Look at you, know-it-all.' : score >= quiz.length / 2 ? 'Curiosity looks good on you.' : 'Every question is a new start.'}</h1><p>You finished {activeTopic.name.toLowerCase()}. Keep that curiosity going.</p><div className="score-panel"><div className="score-circle"><b>{Math.round(score / quiz.length * 100)}<small>%</small></b><span>YOUR SCORE</span></div><div><h2>{score} out of {quiz.length} correct</h2><p>Personal best in this topic: {best[topic]}%</p><div className="result-actions"><button className="primary" onClick={start}>Play again ↗</button><button className="secondary" onClick={() => setScreen('home')}>Explore topics</button></div></div></div><div className="section-heading"><h2>A second look</h2><span className="muted">Your answers, explained</span></div><div className="review-list">{quiz.map((question, i) => <article key={question.id} className="review-item"><span className={`review-indicator ${answers[i] === question.answer ? 'good' : ''}`}>{answers[i] === question.answer ? '✓' : '×'}</span><div><small>QUESTION {i + 1}</small><h3>{question.prompt}</h3><p>Your answer: <strong>{answers[i] === null ? 'No answer — time expired' : question.options[answers[i]]}</strong></p>{answers[i] !== question.answer && <p className="correct-answer">Correct answer: <strong>{question.options[question.answer]}</strong></p>}<p className="explanation">{question.explanation}</p></div></article>)}</div></section>}
    </main><footer><span>quiz studio</span><span>Keep wondering. Keep growing. <span className="footer-star">✳</span></span></footer>
    {confirmExit && <ExitDialog onClose={() => setConfirmExit(false)} onLeave={() => {setConfirmExit(false); setScreen('home');}}/>}
  </div>;
}
