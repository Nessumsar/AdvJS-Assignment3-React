import React, { useEffect } from 'react';
import './css/AiChoice.css';
import { useState } from 'react';

//Logik och presentation av datorns val
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
    const [option, setOption] = useState("0");

    function ifChosen(){
        return (<p>Datorns val: {props.AiWeapon}</p>)
    }

    function chooseOption(){
        let random = Math.floor(Math.random() * options.length);
        setOption(options[random].name);
        props.getAiWeapon(options[random].name);
    }

    useEffect(() => {
        chooseOption();
    },[props.AskForNewWeapon])
    
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

                <div key="AI val och presentation(?) av det skall skrivas här" className={chooseOption}>
                    
                </div>
            </div> 
        );
}


export default AiChoice;