import './css/Top.css';
import React, { useState, useEffect, useCallback } from 'react';

const TopComponent = (props) => {
    const [rounds, setRounds] = useState(0);
    const [seconds, setSeconds] = useState(0);

    //Räknar sekunder när man startar spelet och slutar räkna när spelet är över.
    useEffect(() =>{
        if(props.MaxRounds == 0){
            setSeconds(0);
            setRounds(0);
        }else{
            setTimeout(() => setSeconds(seconds +1), 1000);
        }
    }, [seconds])

    //Skicka ronder till App.js som startar spelet
    function startGameAndTimer(event){
        event.preventDefault();
        setSeconds(seconds+1);
        props.getRounds(rounds);
    }


    function handleChange(event){
        setRounds(event.target.value);
    }


    return(
        <div>
            <h1>Sten, sax, påse</h1>
            <div className='second-counter'>Tid: {seconds} s</div>

            <div className="topbar">
                <form onSubmit={startGameAndTimer}>
                <label>Välj antal omgångar: </label>
                <input type="number" onChange={handleChange}></input>
                <input type="submit" value="Starta spel"></input>
                </form>
            </div>
        </div>
    );
}

export default TopComponent;