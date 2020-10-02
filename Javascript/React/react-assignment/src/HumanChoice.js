import React, { useState } from 'react';
import './css/HumanChoice.css';

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

export default function GenerateButtons({optionParentCallback}){
  
  const [option, setOption] = useState(0);

  function chooseOption(option) {
    setOption(option.name);
    // optionParentCallback(option.name); // callback to parent hook
  }

  function ifChosen(option){
    if(option === 0){
      return (<p>Ditt val: ej valt</p>)
    }
    else{
      return (<p>Ditt val: {option}</p>)
    }

  }

  return(
    <div className="human-choice">
    <div>{ifChosen(option)}</div>

        <div className="human-options">
        {options.map(option => (
          <div key={option.name}>
            <div className="human-emojis">
              <span role="img" aria-label={option.name}>{option.emoji}</span>
            </div>
            <button onClick={() => chooseOption(option)}>Välj</button>
          </div>
        ))}
        </div>

    </div>)
}