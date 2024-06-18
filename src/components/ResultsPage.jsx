import { Button } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultsPage = ({ score, total, setQuizStarted }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const finalScore = state ? state.score : score;
  const totalQuestions = state ? state.total : total;

  const restartQuiz = () => {
    setQuizStarted(false);
    navigate('/');
  };

  return (
    <div className="results-page">
      <h2>Quiz Completed</h2>
      <h4>Your score is {finalScore} out of {totalQuestions}</h4>
      <Button variant="contained" color="primary" onClick={restartQuiz}>
        Restart Quiz
      </Button>
    </div>
  );
};

export default ResultsPage;
