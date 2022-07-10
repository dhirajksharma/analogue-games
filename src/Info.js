import React from 'react';
import './Info.css';
class Info extends React.Component{
    render(){
        return (
            <div id="infodiv">
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
        );
    }
}

export default Info;