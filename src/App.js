import logo from './logo.svg';
import './css/App.css';
import {DispKey} from './keys'

import React from 'react';


function App() {
  return (
    <div className='globalcontainer'>
      <div className="foreground">
          <DispKey />
          <div className='scale'></div>
      </div>
      <div className='maincontainer'>
          <div className='stackcontainer'></div>
      </div>
    </div>
  );
}

export default App;