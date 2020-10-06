import React, { useState } from 'react';
import { render } from 'react-dom';
import './css/Winner.css';


//Räknar antal omgångar och poäng

const Winner = (props) => {
    const [logList, setLogList] = useState([]);
    const items = [];

    function updateList(){
        logList.push(props.logString);
        items.push(props.logString)
    }

    function renderList(){   
        return(
        <div>
            {items.map((item, index) => {
                return (<ul className="BattleLog">
                    <li key={index}>{item}</li>
                </ul>)
            })}
        </div>
        );
    }

    return(
    <div onLoad={updateList(props)}>
        <div>
            {renderList(props)}
        </div>
    </div>
    );
}


export default Winner;