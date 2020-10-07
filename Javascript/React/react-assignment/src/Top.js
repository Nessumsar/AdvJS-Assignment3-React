import './css/Top.css';
import React, { useState, useEffect, useCallback } from 'react';

//Antal set
//Start
//Tid

const TopComponent = (props) => {
    const [rounds, setRounds] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() =>{
        if(props.MaxRounds == 0){
            setSeconds(0);
        }else{
            setTimeout(() => setSeconds(seconds +1), 1000);
            
        }
    }, [seconds])


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