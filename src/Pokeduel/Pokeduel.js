import React from "react";
import vs from './versus.png';
import atk from './attack.mp3';
import win from './winner.mp3';
import './Pokeduel.css';
import Pokemon from "./Pokemon";
import axios from "axios";
import $ from 'jquery';

class Pokeduel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            player1id: 0,
            player2id: 0,
        }

        this.pokemondeck=React.createRef();
        this.pokemonselectcount=React.createRef(0);
        this.player1=React.createRef();
        this.player2=React.createRef();
        this.operatebutton=React.createRef();
        this.banner=React.createRef();
        this.player1health=React.createRef();
        this.player2health=React.createRef();
        this.attackcount=React.createRef();
        this.atk=React.createRef();
        this.win=React.createRef();
        
        this.seqenceGenerator=this.seqenceGenerator.bind(this);
        this.pokemonClick=this.pokemonClick.bind(this);
        this.pokemonAssign=this.pokemonAssign.bind(this);
        this.duel=this.duel.bind(this);
        this.assignmoves=this.assignmoves.bind(this);
        this.reset=this.reset.bind(this);
        this.attack=this.attack.bind(this);
        this.declarewinner=this.declarewinner.bind(this);

        this.arr=this.seqenceGenerator(100,800);
    }

    componentDidMount(){
        this.pokemonselectcount.current=0;
        this.attackcount.current=0;
    }

    seqenceGenerator(length,max){
        let seq=[];
        while(seq.length<length)
        {
            let num=Math.floor(Math.random()*max)+1
            if(seq.indexOf(num)===-1){
                seq.push(num);
            }
        }
        return seq;
    }    

    pokemonAssign(img, player){
        //img.setAttribute('id','selected');
        
        axios.get(`https://pokeapi.co/api/v2/pokemon/${img.id}`)
        .then(res=>{
            const nameofpokemon=document.createElement('h2');
            nameofpokemon.classList.add('onboard');
            nameofpokemon.innerHTML=res.data.name;
            player.appendChild(nameofpokemon);
            const movelist=document.createElement('ul');
                for(let i of this.seqenceGenerator(5,10))
                {
                    const mov=document.createElement('li');
                    const movehit=document.createElement('button');
                    movehit.innerHTML=res.data.moves[i].move.name;
                    mov.append(movehit);
                    movehit.classList.add('moves');
                    movelist.append(mov);
                }
            movelist.style.display='none';
            movelist.classList.add('onboard');
            movelist.setAttribute('id',`movesofpokemon${img.id}`)
            player.appendChild(movelist);
        })
        .catch(err => {
            alert('Unexpected Error | Please refresh the page');
        })
    }

    pokemonClick(pokemon){
        
        if(this.pokemonselectcount.current===0){
            this.setState(prevState=>{
                return {
                    ...prevState,
                    player1id:pokemon.id
                }
            })
            this.pokemonAssign(pokemon,this.player1.current);
            this.pokemonselectcount.current+=1;
        }else if(this.pokemonselectcount.current===1){
            this.setState(prevState=>{
                return {
                    ...prevState,
                    player2id:pokemon.id
                }
            })
            this.pokemonAssign(pokemon,this.player2.current);
            this.pokemonselectcount.current+=1;
            window.scrollTo({top:0,behavior:"smooth"});
            setTimeout(function(operatebutton, duel){
                operatebutton.innerHTML='Begin'
                operatebutton.style.display='inline-block';
                operatebutton.addEventListener('click',duel);
                }, 1500, this.operatebutton.current, this.duel);
        }
    }
 
    assignmoves(){
        try{
            $(`#movesofpokemon${this.state.player1id}`).slideToggle();
            $(`#movesofpokemon${this.state.player2id}`).slideToggle();
            this.player1health.current.style.display='block';
            this.player2health.current.style.display='block';
            document.querySelectorAll('.hbar')[0].style.display='block';
            document.querySelectorAll('.hbar')[1].style.display='block';
            this.player1health.current.alt=100;
            this.player2health.current.alt=100;
        }catch{
            alert("Unexpected Error! Please refresh page");
        }
    }
    
    duel(){
        this.assignmoves();
        this.banner.current.innerHTML='The Duel Begins';
        this.operatebutton.current.innerHTML='Reset';
        this.operatebutton.current.removeEventListener('click',this.duel);
        this.operatebutton.current.addEventListener('click',this.reset);
        const p1but=document.querySelectorAll('#player1 button');
        const p2but=document.querySelectorAll('#player2 button');
        let attackfn=this.attack;
        for(let button of p1but)
        {
            button.addEventListener('click',function(){
                attackfn(p1but,p2but,2);
            });
        }
        
        for(let button of p2but)
        {
            button.addEventListener('click',function(p1h){
                attackfn(p2but,p1but,1);
            });
        }
    }
    
    attack(pbut,opbut,n){
        let playerh;
        if(n==2)
            playerh=this.player2health.current;
        else
            playerh=this.player1health.current;
        
        if(this.attackcount.current<=5){
            this.atk.current.play();
            let curval=parseInt(playerh.alt);
            let rand=Math.floor(Math.random()*25);
            rand=rand>10?rand:rand+5;
            playerh.style.width=`${curval-rand}%`
            playerh.alt=curval-rand;
            
            for(let button of pbut){
                button.disabled=true;
            }
            
            for(let button of opbut){
                button.disabled=false;
            }
            
            this.attackcount.current+=1;
            
            this.banner.current.innerHTML=`Player ${n} attack`;
            let p1h=parseInt(this.player1health.current.alt);
            let p2h=parseInt(this.player2health.current.alt);
            
            if(this.attackcount.current==6 || p1h==0 || p2h==0){
                this.banner.current.innerHTML="Game Over";
                let dwc=this.declarewinner;
                for(let button of opbut){
                    button.disabled=true;
                }
                setTimeout(function(){
                    dwc(p1h,p2h);
                },500);
            }
        }
    }
    
    declarewinner(p1h,p2h){
        $("ul.onboard").slideToggle(function (){
            this.remove();
        });

        this.banner.current.style.fontSize='x-large';
        this.banner.current.classList.add('winner');
        this.win.current.play();
      
        if(parseInt(p1h)>parseInt(p2h))
            this.banner.current.innerHTML='Player 1 Wins!'
        else if(parseInt(p1h)<parseInt(p2h))
            this.banner.current.innerHTML='Player 2 Wins!'
        else
            this.banner.current.innerHTML='Draw!'
    }
    
    reset(){
        this.player1health.current.style.display='none';
        this.player1health.current.style.display='none';
        document.querySelectorAll('.hbar')[0].style.display='none';
        document.querySelectorAll('.hbar')[1].style.display='none';
        this.player1health.current.alt='100';
        this.player2health.current.alt='100';
        this.player1health.current.style.width='100%'
        this.player2health.current.style.width='100%'
        this.banner.current.innerHTML='Select Your Pokémons'
        this.banner.current.style.fontSize='initial'
        this.banner.current.classList.remove('winner')
        
        this.setState(prevState=>{
            return {
                ...prevState,
                player1id:0,
                player2id:0
            }
        })

        this.pokemonselectcount.current=0;
        this.attackcount.current=0;

        $(".onboard").fadeOut(function (){
            this.remove();
        });
        this.operatebutton.current.style.display='none';
        this.operatebutton.current.removeEventListener('click',this.reset);
    }

    render(){
        return (
            <div id='pokeduel' className="dark:text-white">
                <audio src={atk} ref={this.atk}></audio>
                <audio src={win} ref={this.win}></audio>

                <section id="versus">
                <section id="player1" ref={this.player1}>
                    <h1 className="font-poppins">Player 1</h1>
                    <div class="hbar"><div id="player1health" ref={this.player1health}></div></div>
                    <Pokemon i={this.state.player1id}></Pokemon>
                </section>
                <img src={vs} className=".pokeduelimg w-[120px] h-[120px]" width="120px"/>
                <section id="player2" ref={this.player2}>
                    <h1 className="font-poppins">Player 2</h1>
                    <div class="hbar"><div id="player2health" ref={this.player2health}></div></div>
                    <Pokemon i={this.state.player2id}></Pokemon>
                </section>
            </section>

            <section id="deck" ref={this.pokemondeck} className="flex flex-col items-center content-center">
                <button id="pokeoperate" ref={this.operatebutton}></button>
                <h3 className="font-konkhmer mb-3" ref={this.banner}>Select Your Pokémons</h3>
                <ul className="flex flex-wrap justify-center">
                {
                    this.arr.map(i=>(
                        <Pokemon id={i} i={i} pokemonClickFn={this.pokemonClick}></Pokemon>
                    ))
                }
                </ul>
            </section>
            </div>
        )
    }
}

export default Pokeduel;
