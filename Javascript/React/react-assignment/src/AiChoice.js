import React, { useEffect } from 'react';
import './css/AiChoice.css';
import { useState } from 'react';

const options = [
    {
      emoji: '✊',
      name: 'sten',
      id: 1
    },
    {
      emoji: '✌',
      name: 'sax',
      id: 2
    },
    {
      emoji: '✋',
      name: 'påse',
      id: 3
    }
];

const AiChoice = (props) => {
    const [option, setOption] = useState(0);

    //skriver ut när vapen är valt
    function ifChosen(){
        return (<p>Datorns val: {props.AiWeapon}</p>);
    }

    //metod föratt välja vapen
    function chooseOption(){
        let randomOption = options[Math.floor(Math.random() * options.length)].name;
        setOption(randomOption);
        props.getAiWeapon(randomOption);

        //Förhindrar så att datorn inte kan välja samma vapen två ggr irad
        if(option === randomOption){
            let isAlive = true;
            while(isAlive){
                randomOption = options[Math.floor(Math.random() * options.length)].name;
                if(option != randomOption){
                    setOption(randomOption);
                    props.getAiWeapon(randomOption);
                    isAlive = false;
                }
            }
        }
    }
    
    //Väljer nytt vapen när propsen ändras
    useEffect(() => {
        if(props.NewAiWeapon > 0){
            chooseOption();
        }
    },[props.NewAiWeapon]);
    
    return(
        <div className="AI-choice">
            <div>{ifChosen()}</div>

            <div className="AI-options">
                {options.map(option => (
                    <div key={option.name}>
                        <div className="AI-emojis">
                            <span role="img" aria-label={option.name}>{option.emoji}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={chooseOption}></div>
        </div> 
    );
}

export default AiChoice;