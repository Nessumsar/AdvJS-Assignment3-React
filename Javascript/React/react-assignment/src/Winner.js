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
        <ul>
            {items.map((item, index) => {
                return <li key={index}>{item}</li>
            })}
        </ul>
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