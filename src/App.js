import './App.css';
import Hangman from './Hangman';
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      choice:"",
    };
    this.handleChoice=this.handleChoice.bind(this);
  }

  handleChoice(e){
    let option=e.target.value;
    this.setState({choice:option});
  }

  generateOptions()
  {
    return ['Hangman','Lights Out'].map( game => (
      <button
        value={game}
        className="gameoptions"
        onClick={this.handleChoice}
        disabled={this.state.choice===game}
        >
          {game}
        </button>
    ));
  }

  render(){
  return (
    <div>
      <h1>React Games</h1>
      <div id='optionsdiv'>{this.generateOptions()}</div>
      <div id="playarea">
        {this.state.choice==='Hangman'?<Hangman/>:null}
      </div>
    </div>
  );
}
}
export default App;
