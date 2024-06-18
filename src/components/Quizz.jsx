import { Button, Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = ({ quizStarted, setQuizStarted, score, setScore, questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (!quizStarted) {
      navigate('/');
    }
  }, [quizStarted, navigate]);

  useEffect(() => {
    if (timer === 0) {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimer(5);
      } else {
        navigate('/results', { state: { score, total: questions.length } });
      }
    }
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, currentQuestionIndex, questions.length, score, navigate]);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(5);
    } else {
      navigate('/results', { state: { score, total: questions.length } });
    }
  };

  if (questions.length === 0) return <div className="loading">Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers].sort();

  return (
    <Card className="quiz-card">
      <CardContent>
        <h2>Question {currentQuestionIndex + 1} / {questions.length}</h2>
        <div className="question">{currentQuestion.question}</div>
        <div className="timer">Time left: {timer}s</div>
        {answers.map((answer, index) => (
          <Button
            key={index}
            variant="outlined"
            color="primary"
            onClick={() => handleAnswerClick(answer === currentQuestion.correct_answer)}
            className="answer-button"
          >
            {answer}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default Quiz;
