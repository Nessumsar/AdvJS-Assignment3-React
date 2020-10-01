import React, { useState } from 'react';
import ReactDOM from 'react-dom';

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

  return(
    <div className="HumanChoice">
        <div>Ditt val: {option}</div>
        {options.map(option => (
          <div key={option.name}>
            <div className="option">
              <span role="img" aria-label={option.name}>{option.emoji}</span>
            </div>
            <button onClick={() => chooseOption(option)}>Välj</button>
          </div>
        ))}
    </div>)
}