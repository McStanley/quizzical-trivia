import './Trivia.css';

function Trivia(props) {
  const answerElements = props.answers.map((answer) => (
    <button
      key={answer}
      className={`Trivia__button ${
        answer === props.selectedAnswer ? 'Trivia__button--selected' : ''
      } ${
        props.showCorrect &&
        (answer === props.correctAnswer
          ? 'Trivia__button--correct'
          : 'Trivia__button--incorrect')
      }`}
      onClick={() => props.selectAnswer(answer)}
    >
      {answer}
    </button>
  ));

  return (
    <div className="Trivia">
      <p className="Trivia__question">{props.question}</p>
      <div className="Trivia__answers">{answerElements}</div>
      <hr />
    </div>
  );
}

export default Trivia;
