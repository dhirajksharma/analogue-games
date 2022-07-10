import React from 'react';
import './HangmanCanvas.css';
class HangmanCanvas extends React.Component{
    
    
    render(){
        return (
            <div id="canvas">
                <div id="fig">
                <div id="hor"></div>
                <div id="tilt"></div>
                <div id="tilt2"></div>
                <div id="ver1"></div>
                <div id="ver2"></div>
                <div id="rope"></div>
                <div id="b3"
                    style={{backgroundColor: this.props.b3col}}></div>
                <div id="b4"
                    style={{backgroundColor: this.props.b4col}}></div>
                <div id="b5"
                    style={{backgroundColor: this.props.b5col}}></div>
                <div id="b6"
                    style={{backgroundColor: this.props.b6col}}></div>
                <div id="b2"
                    style={{backgroundColor: this.props.b2col}}></div>
                <div id="b1"
                    style={{backgroundColor: this.props.b1col}}></div>
                </div>{this.props.vic===1?<h3>Victory!!!</h3>:
                        this.props.wrong<6?
                    <h3>{6-this.props.wrong} Guesses Left</h3>:<h3>Game Over!!!</h3>}
            </div>
        );
    }
}

export default HangmanCanvas;