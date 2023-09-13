import React from "react";
import vs from './dummy.png';
import pokemonloading from './pokemonloading.gif'
class Pokemon extends React.Component{
    constructor(props){
        super(props);
        this.pad=this.pad.bind(this);
        this.handlePokemonLoad=this.handlePokemonLoad.bind(this);
        this.pokeLoadRef=React.createRef();
        this.pokeRef=React.createRef();
    }
    
    pad(number, length) {
        let str = '' + number;
        while (str.length < length) {
          str = '0' + str;
        }
        return str;
    }

    handlePokemonLoad(){
        this.pokeLoadRef.current.classList.add('opacity-0')
        this.pokeLoadRef.current.classList.remove('z-10')
        this.pokeRef.current.classList.remove('opacity-0')
    }
    render(){
        
        return (
            <div className="relative"
                onClick={(e)=>{
                if(e.target.previousElementSibling!==null)
                this.props.pokemonClickFn(e.target.previousElementSibling)
            }}
            >
                <img
                    ref={this.pokeRef}
                    id={this.props.id}
                    src={this.props.i!==0?`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${this.props.i}.svg`:vs}
                    alt={this.props.i}
                    className="absolute opacity-0 pokemons pokeduelimg"
                    onLoad={this.handlePokemonLoad}
                >
                </img>
                <img
                    ref={this.pokeLoadRef}
                    className="pokemons pokeduelimg z-10"
                    src={pokemonloading}
                >
                </img>
            </div>
        )
    }
}

export default Pokemon;