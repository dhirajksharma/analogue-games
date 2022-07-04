import React from "react";
import './HangmanControl.css';

class HangmanControl extends React.Component{
    constructor(props) {
        super(props);
        this.state = { guessed: new Set(), answer: "fanta", nWrong: 0, gameover: 0 };
        this.handleGuess = this.handleGuess.bind(this);
        this.reset= this.reset.bind(this);
        this.victory= this.victory.bind(this);
        
    }

    victory()
    {
        document.querySelector('#winmusic').play();
        this.props.handleVictory();
        this.setState({...this.state,gameover:1});
    }

    guessedWord() {
        return this.state.answer
          .split("")
          .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
    }

    


    handleGuess(evt) {
    let ltr = evt.target.value;
    let st=this.state.answer.includes(ltr) ? 0 : 1;
    this.setState(str => ({
        guessed: str.guessed.add(ltr),
        nWrong: str.nWrong + st,
    }),()=>{
        let arr=[...this.state.answer];
        let arr2=[...this.guessedWord()];
        let i=0;
        let flag=0;
        for(i=0;i<arr.length;i++)
        {
            if(arr[i]!==arr2[i])
            {
                flag=-1;
                break;
            }
        }
        if(flag==0)
            this.victory();
        else{
            if(st===1)
                this.props.handleChances(st);
            let w=this.state.nWrong;
            if(w===6)
            {
                document.querySelector('#losemusic').play();
                this.setState({...this.state,gameover:1});
            }
        }
    });
    }
    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
          <button
            value={ltr}
            className="keys"
            onClick={this.handleGuess}
            disabled={this.state.guessed.has(ltr) || this.state.gameover===1}
          >
            {ltr}
          </button>
        ));
    }
    reset() {
        this.setState({...this.state, guessed: new Set(),nWrong:0,gameover:0});
        window.scrollTo({top:0,behavior:"smooth"});
        this.props.handleChances(-1);
    }
    render(){
        return (
            <div id="control">
                <p id='word'>{this.guessedWord()}</p>
                <div id='keypad'>{this.generateButtons()}</div>
                <button id='reset' onClick={this.reset}>Reset</button>
            </div>
        );
    }
}

export default HangmanControl;