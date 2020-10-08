import React, { useState } from 'react';
import './css/Winner.css';


//Räknar antal omgångar och poäng

const Winner = (props) => {
    const [logList, setLogList] = useState([]); 
   

    function updateList(){
        if(logList.includes(props.logString)){
            //Gör ingenting för att undvika dubletter
        }else{
            logList.push(props.logString)
        }
    }


    function renderList(){  
        if(props.resetLog == 1){
            const emptyList = []
            const listItems = emptyList.map((item, index) =>
            <li key={index}>{item}</li>);
            console.log(emptyList.length);

            return <ul>{listItems}</ul>;
        }
        else{
            const items = logList;
            const listItems = items.map((item, index) =>
            <li key={index}>{item}</li>);
            
            return <ul>{listItems}</ul>;
        }
    }


    return(
        <div onLoad={updateList(props)}>
            <div className="log">
                {renderList(props)}
            </div>
        </div>
    );
}


export default Winner;