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

export default function GenerateButtons(props){
  const [option, setOption] = useState("ej valt");
  handleChange = handleChange.bind(this);

  function handleChange(option) {
    setOption(option.name);
    props.getHumanWeapon(option.name);
  }

  function ifChosen(option){
    if(option === "ej valt"){
      return (<p>Ditt val: ej valt</p>)
    }
    else{
      return (<p>Ditt val: {props.HumanWeapon}</p>)
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
            <button onClick={() => handleChange(option)}>Välj</button>
          </div>
        ))}
        </div>

    </div>)
}