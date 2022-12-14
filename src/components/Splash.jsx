import './Splash.css';

function Splash() {
  return (
    <div className="Splash">
      <h1 className="Splash__title">Quizzical</h1>
      <p className="Splash__description">Trivia game</p>
      <button
        type="button"
        className="Splash__button"
      >
        Start quiz
      </button>
    </div>
  );
}

export default Splash;
