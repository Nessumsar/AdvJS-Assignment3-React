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
 

  //Skapar en muterbar variable av valen som kan updateras och användas i funktioner
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
    var i = 1;
    var gameWinner = 0;   


    function playGame() {
      setCurrentRound(i);

      //Timeout loop för att kolla vem som vinner rundan, körs var tredje sekund fram tills ett resultat finns
      setTimeout(function() {
        setCurrentRound(i);
        switch(checkWin()){
          case "win":
            humanWins++;
              i++;
                resetChoicesAndUpdateLogString(humanWins, aiWins);
            break;
          case "draw":
            humanWins++;
              aiWins++;
                i++;
                  resetChoicesAndUpdateLogString(humanWins, aiWins);
            break;
          case "lose":
            aiWins++;
              i++;
                resetChoicesAndUpdateLogString(humanWins, aiWins);
            break;
        }
        if (i <= MaxRounds) {           
          playGame();           
        }
        
      }, 3000);

      //reset
      if(MaxRounds == i){
        setTimeout(function(){
          setMaxRounds(0);
          setCurrentRound(0);
          setHumanWeapon("ej valt"); 
          setAiWeapon("ej valt");

          if(humanWins > aiWins){
            gameWinner = "Human";
          }else if(humanWins < aiWins){
            gameWinner = "AI";
          }else{
            gameWinner = "Draw";
          }
          
          //reset av battlelog
          setTimeout(function(){
            if(gameWinner != 0){
              setResetLog(1);
            }
          }, 3000);
          

          //skriv ut något för att presentera vem som vann spelet

          
          //reset på gamewinner

          setResetLog(0);
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
        <HumanChoice getHumanWeapon={getHumanWeapon} HumanWeapon={HumanWeapon}/>
        <AiChoice getAiWeapon={getAiWeapon} AiWeapon={AiWeapon} NewAiWeapon={NewAiWeapon}/>
        <Winner logString={LogString} resetLog={resetLog}/>
    </div>
  );
}

export default App;
