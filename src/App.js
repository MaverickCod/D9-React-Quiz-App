import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Quiz from './components/Quizz';
import ResultsPage from './components/ResultsPage';
import StartPage from './components/StartPage';

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  return (
    <Router>
      <div className="App">
        <h1>Quiz App</h1>
        <Routes>
          <Route path="/" element={<StartPage setQuizStarted={setQuizStarted} setQuestions={setQuestions} />} />
          <Route path="/quiz" element={<Quiz quizStarted={quizStarted} setQuizStarted={setQuizStarted} score={score} setScore={setScore} questions={questions} />} />
          <Route path="/results" element={<ResultsPage score={score} total={questions.length} setQuizStarted={setQuizStarted} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
