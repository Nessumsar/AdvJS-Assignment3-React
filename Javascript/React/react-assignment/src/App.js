import React from 'react';
import './css/App.css';

import Top from './Top';
import HumanChoice from './HumanChoice';
import AiChoice from './AiChoice';
import Winner from './Winner';

function App() {
  return (
    <div className="App">
        <Top/>
        <HumanChoice/>
        <AiChoice/>
        <Winner/>
    </div>
  );
}

export default App;
