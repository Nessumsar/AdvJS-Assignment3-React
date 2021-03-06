import React, { useState, useEffect, useCallback, useRef } from 'react';
import './css/App.css';

import Top from './Top';
import HumanChoice from './HumanChoice';
import AiChoice from './AiChoice';
import Winner from './Winner';

function App() {
  
  const [HumanWeapon, setHumanWeapon] = useState("ej valt");
  const getHumanWeapon = useCallback( (updatedHumanWeapon) => {
    setHumanWeapon(updatedHumanWeapon);
  }, []);
  
  const [NewAiWeapon, setNewAiWeapon] = useState(0);

  const [AiWeapon, setAiWeapon] = useState("ej valt");
  const getAiWeapon = useCallback( (updatedAiWeapon) => {
    setAiWeapon(updatedAiWeapon);
  }, []); 

  
  const [CurrentRound, setCurrentRound] = useState(0);

  const [MaxRounds, setMaxRounds] = useState(0);
  const getRounds = useCallback( (updatedRounds) => {
    setMaxRounds(updatedRounds);
  }, []);


  const [LogString, setLogString] = useState("");
  function updateLogString(item){
    setLogString(item);
  }

  const [resetLog, setResetLog] = useState(0);
 

  const [WhoWon, setWhoWon] = useState(" ");

  //Skapar en muterbar variable av valen som kan updateras och användas round funktioner
  const HumanChoiceRef = useRef();
  HumanChoiceRef.current = HumanWeapon;
  const AiWeaponRef = useRef();
  AiWeaponRef.current = AiWeapon;


  //Returnerar win på vinst, lose på förlust, draw på lika,
  const checkWin = () => {
    switch(HumanChoiceRef.current){
      case "sten" : switch(AiWeaponRef.current){
        case "sten" : return "draw";
        case "sax" : return "win";
        case "påse" : return "lose";
      }
      case "sax" : switch(AiWeaponRef.current){
        case "sten" : return "lose";
        case "sax" : return "draw";
        case "påse" : return "win";
      }
      case "påse" : switch(AiWeaponRef.current){ 
        case "sten" : return "win";
        case "sax" : return "lose";
        case "påse" : return "draw";
      }
      default : return false;
    }
  }


  //Resettar spelet och skriver ut resultat
  function resetChoicesAndUpdateLogString(humanWins, aiWins){
    updateLogString(HumanChoiceRef.current + "   |   " + humanWins + " - " + aiWins + "   |   " + AiWeaponRef.current);
    setHumanWeapon("ej valt"); 
    setAiWeapon("ej valt");
  }


  //Spelmotorn, körs så fort en mängd rundor har matats in av användaren
  useEffect(() => {
    let humanWins = 0;
    let aiWins = 0;
    var round = 1; 
    var gameWinner = 0;

    function playGame() {
      setCurrentRound(round);

      //Timeout loop för att kolla vem som vinner rundan, körs var tredje sekund fram tills ett resultat finns
      setTimeout(function() {
        if(round == 1){ 
          setResetLog(0);
        }
        setCurrentRound(round);
        switch(checkWin()){
          case "win":
            humanWins++;
              round++;
                resetChoicesAndUpdateLogString(humanWins, aiWins);
            break;
          case "draw":
            humanWins++;
              aiWins++;
                round++;
                  resetChoicesAndUpdateLogString(humanWins, aiWins);
            break;
          case "lose":
            aiWins++;
              round++;
                resetChoicesAndUpdateLogString(humanWins, aiWins);
            break;
        }
        if (round <= MaxRounds) {           
          playGame();           
        }
        
      }, 3000);

      //Nollställ spel och bestäm slutgiltig vinnare
      if(MaxRounds == round){
        setTimeout(function(){
          setMaxRounds(0);
          setCurrentRound(0);
          setHumanWeapon("ej valt"); 
          setAiWeapon("ej valt");

          if(humanWins > aiWins){
            gameWinner = "Du vann!";
          }else if(humanWins < aiWins){
            gameWinner = "Datorn vann!";
          }else{
            gameWinner = "Oavgjort!";
          }

          //Nollställ log
          setTimeout(function(){
            if(gameWinner != 0){
              setResetLog(1);
            }
          }, 3000);

         
        }, 3500);  
      }
    }

    if(MaxRounds > 0){
      playGame();
    }
    
  },[MaxRounds]);


  //Väljer nytt vapen åt datorn så fort spelarens vapen är valt
  useEffect(() => {
    if(HumanWeapon != "ej valt"){
      setNewAiWeapon(NewAiWeapon + 1);
    }
  },[HumanWeapon]);


  return (
    <div className="App">
        <Top getRounds={getRounds} MaxRounds={MaxRounds}/>
        <p>Omgång {CurrentRound} / {MaxRounds}</p>
        <p>Vinnare: {WhoWon}</p>
        <HumanChoice getHumanWeapon={getHumanWeapon} HumanWeapon={HumanWeapon}/>
        <AiChoice getAiWeapon={getAiWeapon} AiWeapon={AiWeapon} NewAiWeapon={NewAiWeapon}/>
        <Winner logString={LogString} resetLog={resetLog}/>
    </div>
  );
}

export default App;
