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
  
  const [AiWeapon, setAiWeapon] = useState("sax");
  /* const getAiChoice = useCallback( (updatedAiChoice) => {
    setAiChoice(updatedAiChoice);
  }, []); */

  const [Rounds, setRounds] = useState(0);
  const getRounds = useCallback( (updatedRounds) => {
    setRounds(updatedRounds);
  }, []);

  const [LogString, setLogString] = useState("0-0");
  function updateLogString(a, b){
    setLogString(a + "-" + b)
  }
 
  //Skapar en muterbar variable av spelarens val som kan updateras i funktioner
  const PlayerChoiceRef = useRef();
  PlayerChoiceRef.current = PlayerChoice;

  //Returnerar win på vinst, lose på förlust, draw på lika,
  /*
  const checkWin = () =>{
    console.log(win());
    if(PlayerChoiceRef.current == "ej valt"){
      return false;
    }else if(PlayerChoiceRef.current == AiWeapon){
      setPlayerChoice("ej valt");
      return "draw";
    }else if(PlayerChoiceRef.current == "sten" && AiWeapon == "sax"){
      setPlayerChoice("ej valt");
    return "win";
    }else if(PlayerChoiceRef.current == "påse" && AiWeapon == "sten"){
      setPlayerChoice("ej valt");
      return "win";
    }else if(PlayerChoiceRef.current == "sax" && AiWeapon == "påse"){
      setPlayerChoice("ej valt");
      return "win";
    }else{
      setPlayerChoice("ej valt");
      return "lose";
    }
 }
 */


const checkWin = () => {
  
  switch(PlayerChoiceRef.current){
    case "sten" : switch(AiWeapon){
      case "sten" : setPlayerChoice("ej valt"); return "draw";
      case "sax" : setPlayerChoice("ej valt"); return "win";
      case "påse" : setPlayerChoice("ej valt"); return "lose";
    }
    case "sax" : switch(AiWeapon){
      case "sten" : setPlayerChoice("ej valt"); return "lose";
      case "sax" : setPlayerChoice("ej valt"); return "draw";
      case "påse" : setPlayerChoice("ej valt"); return "win";
    }
    case "påse" : switch(AiWeapon){ 
      case "sten" : setPlayerChoice("ej valt"); return "win";
      case "sax" : setPlayerChoice("ej valt"); return "lose";
      case "påse" : setPlayerChoice("ej valt"); return "draw";
    }
    default : return false;
  }
}



  //Spelmotorn, startar när nya rundor knappas in
  const [CurrentRound, setCurrentRound] = useState(0);
  
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
          case "draw":
            i++;
          case "lose":
            aiWins++;
            updateLogString(playerWins, aiWins);
        }

        
        if(checkWin() === "win"){
          playerWins++
          updateLogString(playerWins, aiWins);
          i++
        }else if(checkWin() === "lose"){
          aiWins++
          updateLogString(playerWins, aiWins);
          i++
        }else if(checkWin() === "draw"){
          i++
        }
        if (i === Rounds) {           
          setCurrentRound(0);
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

  return (
    <div className="App">
        <Top getRounds={getRounds}/>
        <p>Omgång {CurrentRound} / {Rounds}</p>
        <HumanChoice getPlayerChoice={getPlayerChoice} PlayerChoice={PlayerChoice}/>
        <AiChoice/>
        <Winner logString={LogString}/>
    </div>
  );
}

export default App;
