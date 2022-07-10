import React from 'react';
import './Hangman.css';
import HangmanCanvas from './HangmanCanvas';
import HangmanControl from './HangmanControl';
import lose from './lose.wav';
import win from './win.wav';

class Hangman extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            nWrong:0,
            victory:0,
            bcol: ['#f8bbd0','#f8bbd0','#f8bbd0','#f8bbd0','#f8bbd0','#f8bbd0'],
        };
        this.handleVictory=this.handleVictory.bind(this);
        this.handleChances=this.handleChances.bind(this);
    }
    componentDidMount(){
      let r=document.querySelector(':root');
      r.style.setProperty('--backcolor','seashell');
      r.style.setProperty('--hcolor','black');
      r.style.setProperty('--linkcolor','blue');
    }
    handleVictory()
    {
        this.setState({...this.state,victory:1});
    }
    handleChances(w)
    {
        if(w===-1)
        {
            this.setState({
                nWrong:0,
                victory:0,
            bcol: ['#f8bbd0','#f8bbd0','#f8bbd0','#f8bbd0','#f8bbd0','#f8bbd0']
            });
        }
        else
        {
            let count=this.state.nWrong;
            if(count<6)
            {
                let newbcol=this.state.bcol;
                newbcol[count]='#3b3131';
                this.setState({nWrong:count+1,bcol:[...newbcol]});
            }
            
        }
    }
    render(){
    return (
        <div id='Hangman'>
        <HangmanCanvas
            b1col={this.state.bcol.at(0)}
            b2col={this.state.bcol.at(1)}
            b3col={this.state.bcol.at(2)}
            b4col={this.state.bcol.at(3)}
            b5col={this.state.bcol.at(4)}
            b6col={this.state.bcol.at(5)}
            wrong={this.state.nWrong}
            vic={this.state.victory}
            />
        <HangmanControl handleChances={this.handleChances} handleVictory={this.handleVictory}/>
        <audio id='losemusic' src={lose}></audio>
        <audio id='winmusic' src={win}></audio>
        </div>
    );
    }
    }

export default Hangman;
