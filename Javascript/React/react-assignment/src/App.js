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
  
  const [Rounds, setRounds] = useState("");
  const getRounds = useCallback( (updatedRounds) => {
    setRounds(updatedRounds);
  }, []);

  return (
    <div className="App">
        <Top getRounds={getRounds}/>
        <HumanChoice getPlayerChoice={getPlayerChoice}/>
        <p>{Rounds}</p>
        <AiChoice/>
        <Winner/>
    </div>
  );
}

export default App;
