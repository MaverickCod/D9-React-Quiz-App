import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = ({ setQuizStarted, setQuestions }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const startQuiz = () => {
    setLoading(true);
    fetch('https://opentdb.com/api.php?amount=10&type=boolean')
      .then(response => response.json())
      .then(data => {
        setQuestions(data.results || []);
        setLoading(false);
        setQuizStarted(true);
        navigate('/quiz');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  return (
    <div className="start-page">
      <h2>Welcome to the Quiz App</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" color="primary" onClick={startQuiz}>
          Start Quiz
        </Button>
      )}
    </div>
  );
};

export default StartPage;
