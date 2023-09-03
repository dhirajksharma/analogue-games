import React from "react";
import vs from './dummy.png';
class Pokemon extends React.Component{
    constructor(props){
        super(props);
        this.pad=this.pad.bind(this);
    }
    
    pad(number, length) {
        let str = '' + number;
        while (str.length < length) {
          str = '0' + str;
        }
        return str;
    }

    render(){
        
        return (
            <img id={this.props.id}
            src={this.props.i!==0?`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${this.props.i}.svg`:vs}
            alt={this.props.i}
            className="pokemons pokeduelimg"
            onClick={(e)=>{
                this.props.pokemonClickFn(e.target)}}
            >
            </img>
        )
    }
}

export default Pokemon;