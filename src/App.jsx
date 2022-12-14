import { useState } from 'react';
import './App.css';
import Splash from './components/Splash';

function App() {
  const [splash, setSplash] = useState(true);

  return <div className="App">{splash ? <Splash /> : <Game />}</div>;
}

export default App;
