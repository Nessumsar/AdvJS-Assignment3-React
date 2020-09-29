import React from 'react';
import ReactDom from 'react-dom';

/*
Scorecard, props.value = win : lose
*/
function Scorecard(props){
    if(props.outcome === "win"){
        return(
            <li className ="scorecardWon" >
                You won!
            </li>);
        }else if(props.outcome==="lose"){
        return(
            <li className="scorecardLost">
                You lost!
            </li>);
    }
    return(<></>);
}

export default class ScoreBoard extends React.Component{

}