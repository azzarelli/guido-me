/* (FRONTEND) Key-Handling for functionality
        This is the class-function which handles key pressing
*/
import React from 'react';

export class DispKey extends React.Component{
    path_start = '[ ';
    path_end = ' ]';
    root = 'r'
    keycode = 'r'
    codetext = 'r';
    latestcmd = '';

    longinputflag = false;
    longinput = '';
    longinputcodetext = '';

    setup_bindings(){
        for (var i in this.bindings){
            if(this.bindings[i] == 'root'){
                this.root = i;
                this.keycode = i;
            }
        }

    }

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { counter: 0 };
        this.handleKeyDown = this.handleKeyDown.bind(this);

        // Set up keybindings
        this.bindings = require('./data/keyconfig.json');
        console.log(Object.keys(this.bindings));
        this.setup_bindings();
    }
  
    // Mount and Dismount Event Listeners 
    componentDidMount(){
      document.addEventListener('keydown', this.handleKeyDown);
    }
    componentWillUnmount(){
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  
    // Key Press Event Handle
    handleKeyDown (event) {
        if(this.longinputflag == false){ // if we are in the 'coding space' and not entering text
            if(event.code.search('Key') == 0){ // if we got a key command (alphabetic)
                const key = event.code.replace('Key', '').toLowerCase();
                const keycode_ = this.keycode + key
                const objs = Object.keys(this.bindings);
                if(objs.indexOf(keycode_) != -1){
                    this.keycode = keycode_; // add to keycode (path)
                    this.latestcmd = key; // latest key
                    this.codetext = this.codetext +'-'+key; // text to display updates
                }
            }else if(event.code.search('Backspace') != -1){ 
                this.codetext = this.codetext.slice(0,-2);
                this.keycode = this.keycode.slice(0, -1);
                this.latestcmd = this.codetext.slice(-1); // +' ['+event.code.toLowerCase()+']';
                if(this.keycode.length == 0){ // Reset the code text, keycode and latest command to the root
                    this.codetext = this.root
                    this.keycode = this.root
                    this.latestcmd = this.root; // +' ['+event.code.toLowerCase()+']';
                }
            }

            if (event.code == 'Space'){ // Spacebar pressed
                this.latestcmd = '';
                this.longinputcodetext = ' typing...';
                this.longinputflag = true;

            }
        }else{ // if we are in the text entering state
            if(event.code.search('Key') == 0){ // if we got a key command (alphabetic)
                const key = event.code.replace('Key', '').toLowerCase();
                this.latestcmd = this.latestcmd + key;
            }else if(event.code.search('Backspace') != -1){ 
                this.latestcmd = this.latestcmd.slice(0, -1);
                if (this.latestcmd.length < 1){
                    this.latestcmd = '';
                }
            }
            if (event.code == 'Space'){ // Spacebar pressed
                this.latestcmd = '';
                this.longinputcodetext = '';
                this.longinputflag = false;

            }
            else if(event.code == 'Enter'){
                async function fetchText() {
                    let hdrs = "application/x-bibtex";

                    let response = new Request('http://dx.doi.org/10.5594/M001868', {
                                                method:'POST',
                                                headers:new Headers({'Content-Type':'application/x-bibtex'})
                                                });

                    let data = await response.text();
                    console.log(fetch(response));
                }
                fetchText();

            }
        }
        this.forceUpdate(); // Re-render the display

    }

    // Construct Path Display Text
    const_path_display(){
        return this.path_start+this.codetext+this.path_end+this.longinputcodetext;
    }

    // Render the page
    render () {
      return( 
        <div className='sb_container'>
            <div className='sb_displayinput'><a className='cmdtext'>{this.latestcmd}</a></div>
            <div className='sb_pathview'> <a className='cmdtext'>{this.const_path_display()}</a></div>
        </div>
      );
    }
  
  }