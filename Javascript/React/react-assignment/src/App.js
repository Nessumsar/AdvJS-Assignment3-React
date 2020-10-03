import React, { useState, useEffect, useCallback } from 'react';
import './css/App.css';

import Top from './Top';
import HumanChoice from './HumanChoice';
import AiChoice from './AiChoice';
import Winner from './Winner';

function App() {
  
  const [PlayerChoice, setPlayerChoice] = useState("");
  const getPlayerChoice = useCallback( (updatedPlayerChoice) => {
    setPlayerChoice(updatedPlayerChoice);
  }, []);

  return (
    <div className="App">
        <Top/>
        <HumanChoice getPlayerChoice={getPlayerChoice}/>
        <AiChoice/>
        <Winner/>
    </div>
  );
}

export default App;
