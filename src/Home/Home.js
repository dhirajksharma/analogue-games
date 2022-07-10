import React from 'react';
import './Home.css';
import Disp from './Disp';
import img1 from './hmanimg.jpg';
import img2 from './loutimg.jpg';
import img3 from './yahtimg.png';
class Home extends React.Component{
    
    static defaultProps={
        title:["Hangman","Lights-Out","Yahtzee"],
        para:[
            "Do you have it in you to guess the 5 letter word and save your life? Every guess can either get you a step closer to life or to death. Think! Every letter counts",
            "Maybe you are not the dictionary guy, maybe you like to play with lights. Let's see how many moves you need to complete the game. Ready, Steady, Lights On!",
            "Coming Soon",
        ]
    };
    render(){
        return (
            <div id="home">
                <h2 id='initmsg'>Select a game from below to play</h2>
                <Disp srce={img1} name={this.props.title[0]} cont={this.props.para[0]}/>
                <Disp srce={img2} name={this.props.title[1]} cont={this.props.para[1]}/>
                <Disp srce={img3} name={this.props.title[2]} cont={this.props.para[2]}/>
            </div>
        );
    }
}

export default Home;