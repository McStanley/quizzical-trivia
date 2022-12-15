import React, { useState, useEffect } from 'react';
import './Game.css';
import Trivia from './Trivia';
import { nanoid } from 'nanoid';
import he from 'he';

const API_URL = 'https://opentdb.com/api.php?amount=5&category=9&type=multiple';

function Game() {
  const [trivia, setTrivia] = useState([]);
  const [score, setScore] = useState(0);
  const [isOver, setIsOver] = useState(false);

  const shuffleArray = (array) => {
    return array
      .map((entry) => ({ value: entry, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value: entry }) => entry);
  };

  const getTrivia = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    const processedData = data.results.map((entry) => ({
      id: nanoid(),
      question: he.decode(entry.question),
      shuffledAnswers: shuffleArray(
        [...entry.incorrect_answers, entry.correct_answer].map((answer) =>
          he.decode(answer)
        )
      ),
      correctAnswer: he.decode(entry.correct_answer),
      selectedAnswer: null,
    }));

    setTrivia(processedData);
  };

  useEffect(() => {
    if (isOver) return;
    if (trivia.length) {
      setTrivia([]);
    }

    getTrivia();
  }, [isOver]);

  useEffect(() => {
    const correctAnswers = trivia.filter((entry) => {
      if (entry.selectedAnswer === entry.correctAnswer) return true;
      return false;
    });
    setScore(correctAnswers.length);
  }, [trivia]);

  const selectAnswer = (questionID, answer) => {
    if (isOver) return;

    setTrivia((prevTrivia) =>
      prevTrivia.map((entry) => {
        if (entry.id === questionID)
          return {
            ...entry,
            selectedAnswer: answer,
          };

        return entry;
      })
    );
  };

  const triviaElements = trivia.map((entry) => {
    return (
      <Trivia
        key={entry.id}
        question={he.decode(entry.question)}
        answers={entry.shuffledAnswers}
        selectedAnswer={entry.selectedAnswer}
        selectAnswer={(answer) => selectAnswer(entry.id, answer)}
        correctAnswer={entry.correctAnswer}
        showCorrect={isOver}
      />
    );
  });

  const toggleIsOver = () => {
    setIsOver((prevIsOver) => !prevIsOver);
  };

  return (
    <div className="Game">
      {trivia.length ? (
        <React.Fragment>
          {triviaElements}
          <div className="Game__overview">
            {isOver && (
              <p className="Game__results">
                You scored {score}/5 correct answers
              </p>
            )}
            <button
              className="Game__button"
              onClick={toggleIsOver}
            >
              {isOver ? 'Play again' : 'Check answers'}
            </button>
          </div>
        </React.Fragment>
      ) : (
        <h1 className="Game__loading">
          <img src="./loading.svg" />
          Loading...
        </h1>
      )}
    </div>
  );
}

export default Game;
