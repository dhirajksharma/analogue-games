import './App.css';
import Hangman from './Hangman';
import Lightsout from './Lightsout';
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      choice:"",
    };
    this.handleChoice=this.handleChoice.bind(this);
  }

  handleInfo(){
    document.querySelector('#overlay').style.display='block';
  }

  handleInfoClose(){
    document.querySelector('#overlay').style.display='none';
  }

  handleChoice(e){
    let option=e.target.value;
    this.setState({choice:option});
    let r=document.querySelector(':root');
    if(option==='Hangman'){
      r.style.setProperty('--backcolor','seashell');
      r.style.setProperty('--hcolor','black');
      r.style.setProperty('--linkcolor','blue');
    }
    else if(option==='Lights Out'){
      r.style.setProperty('--backcolor','#141414');
      r.style.setProperty('--hcolor','white');
      r.style.setProperty('--linkcolor','yellow');
    }
  }

  handleStopPropagate(e){
    e.stopPropagation();
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
      <div id='optionsdiv'>{this.generateOptions()} <button className='gameoptions' onClick={this.handleInfo}>Info</button></div>
      <div id="overlay" onClick={this.handleInfoClose}>
    <div id="infodiv" onClick={this.handleStopPropagate}>
        <h2>Instructions</h2>
        <div className='infodivdiv'>
        <h3>Hangman</h3>
        <p>Hangman is a game where the player needs to guess the randomly generated 5 letter word. They can make a maximum of 6 wrong guesses, post which they lose the game.</p>
        <h3>Lights Out</h3>
        <p>When the player starts the game, they are provided with a random set of tiles with lights on. Their goal is to turn off lights for all the tiles.</p>
        </div>
        <h2>About Me</h2>
        <div className='infodivdiv'>
        <p>Hi! I am Dhiraj. I am a 2024 passout B.Tech Undergrad in Computer Science. My areas of interest include front-end development and UI/UX design, among other things like comics and coffee.</p>
        </div>
        <h2>Github Repo</h2>
        <div className='infodivdiv'>
        <p>Here is the <a href="https://github.com/dhirajksharma/reactgames">link</a> to the Github repository of this project.</p>
        </div>
    </div>
    </div>
      <div id="playarea">
      {this.state.choice===''?<h2 id='initmsg'>Select a game from above to play it, or click on Info to know more</h2>:null}
        {this.state.choice==='Hangman'?<Hangman/>:null}
        {this.state.choice==='Lights Out'?<Lightsout/>:null}
      </div>
    </div>
  );
}
}
export default App;
