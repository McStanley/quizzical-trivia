import { useState } from 'react';
import './App.css';
import Splash from './components/Splash';
import Game from './components/Game';

function App() {
  const [splash, setSplash] = useState(true);

  const closeSplash = () => {
    setSplash(false);
  };

  return (
    <div className="App">
      {splash ? <Splash closeSplash={closeSplash} /> : <Game />}
    </div>
  );
}

export default App;
