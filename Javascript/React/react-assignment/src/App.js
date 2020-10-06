import React, { useState, useEffect, useCallback, useRef } from 'react';
import './css/App.css';

import Top from './Top';
import HumanChoice from './HumanChoice';
import AiChoice from './AiChoice';
import Winner from './Winner';

function App() {
  
  const [PlayerChoice, setPlayerChoice] = useState("ej valt");
  const getPlayerChoice = useCallback( (updatedPlayerChoice) => {
    setPlayerChoice(updatedPlayerChoice);
  }, []);
  
  const [AiWeapon, setAiWeapon] = useState("ej valt");
  const getAiWeapon = useCallback( (updatedAiWeapon) => {
    setAiWeapon(updatedAiWeapon);
  }, []); 

  const [Rounds, setRounds] = useState(0);
  const getRounds = useCallback( (updatedRounds) => {
    setRounds(updatedRounds);
  }, []);

  const [LogString, setLogString] = useState("0-0");
  function updateLogString(a, b){
    setLogString(a + "-" + b)
  }
 
  //Skapar en muterbar variable av valen som kan updateras och användas i funktioner
  const PlayerChoiceRef = useRef();
  PlayerChoiceRef.current = PlayerChoice;
  const AiWeaponRef = useRef();
  AiWeaponRef.current = AiWeapon;

  //Returnerar win på vinst, lose på förlust, draw på lika,
  const checkWin = () => {
  
  switch(PlayerChoiceRef.current){
    case "sten" : switch(AiWeaponRef.current){
      case "sten" : setPlayerChoice("ej valt"); setAiWeapon("ej valt"); return "draw";
      case "sax" : setPlayerChoice("ej valt"); setAiWeapon("ej valt"); return "win";
      case "påse" : setPlayerChoice("ej valt"); setAiWeapon("ej valt"); return "lose";
    }
    case "sax" : switch(AiWeaponRef.current){
      case "sten" : setPlayerChoice("ej valt"); setAiWeapon("ej valt"); return "lose";
      case "sax" : setPlayerChoice("ej valt"); setAiWeapon("ej valt"); return "draw";
      case "påse" : setPlayerChoice("ej valt"); setAiWeapon("ej valt"); return "win";
    }
    case "påse" : switch(AiWeaponRef.current){ 
      case "sten" : setPlayerChoice("ej valt"); setAiWeapon("ej valt"); return "win";
      case "sax" : setPlayerChoice("ej valt"); setAiWeapon("ej valt"); return "lose";
      case "påse" : setPlayerChoice("ej valt"); setAiWeapon("ej valt"); return "draw";
    }
    default : return false;
  }
}

  //Spelmotorn, startar när nya rundor knappas in
  const [CurrentRound, setCurrentRound] = useState(0);
  const [AskForNewWeapon, setAskForNewWeapon] = useState(0);
  useEffect(() => {
    let playerWins = 0;
    let aiWins = 0;
    var i = 1;   

    function playGame() {
      setCurrentRound(i);

      setTimeout(function() {
        setCurrentRound(i);
        
        switch(checkWin()){
          case "win":
            playerWins++;
            updateLogString(playerWins, aiWins);
            i++;
            break;
          case "draw":
            i++;
            break;
          case "lose":
            aiWins++;
            updateLogString(playerWins, aiWins);
            i++;
            break;
        }

        if (i <= Rounds) {           
          playGame();           
        }                       
      }, 4000)
    }

    if(Rounds > 0){
    playGame();
    }
  },[Rounds]);

  //väljer nytt vapen för ai
  useEffect(() =>{
    if(PlayerChoice != "ej valt"){
      setAskForNewWeapon(AskForNewWeapon + 1);
    }
  },[PlayerChoice]);

  return (
    <div className="App">
        <Top getRounds={getRounds}/>
        <p>Omgång {CurrentRound} / {Rounds}</p>
        <HumanChoice getPlayerChoice={getPlayerChoice} PlayerChoice={PlayerChoice}/>
        <AiChoice getAiWeapon={getAiWeapon} AiWeapon={AiWeapon} AskForNewWeapon={AskForNewWeapon}/>
        <Winner logString={LogString}/>
    </div>
  );
}

export default App;
