

/* (FRONTEND) Key-Handling for functionality
        This is the class-function which handles key pressing
*/
import React from 'react';


export class FetchData{
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { counter: 0 };

        // Set up keybindings
        this.data = require('./data/testdata.json');
    }
  

  
  }