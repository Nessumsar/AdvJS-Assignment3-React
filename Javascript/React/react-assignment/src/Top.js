import ReactDOM from 'react-dom';
import './css/Top.css';
import React, { useState, useEffect, useCallback } from 'react';

//Antal set
//Start
//Tid


const TopComponent = (props) => {
    const [rounds, setRounds] = useState("0");


    function countTime(){
        let time = new Date().getTime;
    }

    function startRounds(rounds){
        for(let i=0; i++; i<rounds){
            //spela
        }
    }



    //wip
    function startGame(event){
        event.preventDefault();
        console.log({rounds});
        props.getRounds(rounds);
        countTime();
        startRounds({rounds});
    }

    function handleChange(event){
        console.log(event.target.value)
        setRounds(event.target.value);
    }

    return(
        <div>
            <h1>Sten, sax, påse</h1>

            <div id='seconds-counter'> </div>

            <div className="topbar">
                <form onSubmit={startGame}>
                <label>Välj antal omgångar: </label>
                <input type="number" onChange={handleChange}></input>
                <input type="submit" value="Starta spel"></input>
                </form>
            </div>
        
        </div>
        
    );

}

export default TopComponent;