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
 
  //const [AiChoice, setAiChoice] = useState("");
  /* const getAiChoice = useCallback( (updatedAiChoice) => {
    setAiChoice(updatedAiChoice);
  }, []); */

  function logString(){
    return "1-0"
  }

  return (
    <div className="App">
        <Top getRounds={getRounds}/>
        <p>Omgång 0 / {Rounds}</p>
        <HumanChoice getPlayerChoice={getPlayerChoice}/>
        <AiChoice/>
        <Winner logString={logString()}/>
    </div>
  );
}

export default App;
