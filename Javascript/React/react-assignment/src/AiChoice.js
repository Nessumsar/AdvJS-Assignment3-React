import React from 'react';
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
    const [option, setOption] = useState(0);

    function ifChosen(option){
        if(option === 0){return (<p>Datorns val: ej valt</p>)}

        else{return (<p>Datorns val: {option}</p>)}
    }


    function chooseOption(){
        return (<p>To be continued...</p>)
    }


        return(
            <div className="AI-choice">
                <div>{ifChosen(option)}</div>

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