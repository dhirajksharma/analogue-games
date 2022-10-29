import React from 'react';
import {Link} from 'react-router-dom';
import './Disp.css';
class Disp extends React.Component{
    
    render(){
        return (
            <div id="dispboard">
                <img className='disp-img' src={this.props.srce}></img>
                <div>
                <h3>{this.props.name}</h3>
                <p>{this.props.cont}</p>
                <button><Link to={`/${this.props.name}`}>Play</Link></button>
                </div>
            </div>
        );
    }
}

export default Disp;