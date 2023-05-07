import React from "react";
import Lightcell from "./Lightcell.js";
import './Lightboard.css';
import click from './click.wav';
import win from './win.wav';

class Lightboard extends React.Component{
  static defaultProps={
    nrows:5,
    ncols:5,
  };
  constructor(props) {
        super(props);
        this.state={
            hasWon: false,
            inPlay: false,
            attempts: 0,
            board: [[false,false,false,false,false],
                    [false,false,false,false,false],
                    [false,false,false,false,false],
                    [false,false,false,false,false],
                    [false,false,false,false,false],
                                      
          ],
        }
      this.handleStart=this.handleStart.bind(this);
      this.flipCellsAround=this.flipCellsAround.bind(this);
      }
    
      handleStart(){
        let nboard=this.createBoard();
        this.setState({...this.state,board:nboard,attempts:0,inPlay:true,hasWon:false});
        document.querySelector('#operate').innerHTML="Reset";
      }

      handleVictory(){
        document.querySelector('#win').play();
        let list=document.querySelectorAll(".row div");
        for(let i=0;i<25;i++)
          {list[i].classList.remove('cell');
            list[i].classList.remove('cell-lit');
            list[i].classList.add('vic');}

        setTimeout(()=>{
          let l=document.querySelectorAll(".row div");
        for(let i=0;i<25;i++)
          {l[i].classList.add('cell');
            l[i].classList.remove('vic');}
        },1700);
      }

      createBoard() {
        let board = [];
        let maxc=this.props.nrows*this.props.ncols;
        let count=Math.floor(Math.random()*(Math.floor(maxc/2)))+2;
        for(let i=0;i<this.props.nrows;i++)
        {
          let temp=[]
          for(let j=0;j<this.props.ncols;j++)
          {
            let val=Math.random()>0.5?true:false;
            if(count>0 && val===true)
              count-=1;
            else if(count===0 && val===true)
              val=false;
            
            temp=[...temp,val];
          }
          board=[...board,temp];
        }
        return board;
      }
    
      
    
      flipCellsAround(coord) {
        if(this.state.inPlay===false)
          return;
        document.querySelector('#click').play();
        let ncols= this.props.ncols;
        let nrows= this.props.nrows;
        let board = this.state.board;
        let [y, x] = coord.split("-").map(Number);


        function flipCell(y, x) {
          if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
            board[y][x] = !board[y][x];
          }
        }
    
        flipCell(y,x);
        flipCell(y-1,x);
        flipCell(y+1,x);
        flipCell(y,x-1);
        flipCell(y,x+1);
        
      function checkWin(board){
        for(let i=0;i<nrows;i++)
          for(let j=0;j<ncols;j++)
            if(board[i][j]===true)
              return false;
        
        return true;
      }
        this.setState({...this.state,board:board,hasWon: checkWin(board),inPlay: !checkWin(board), attempts: this.state.attempts+1},()=>
          {
            if(this.state.hasWon===true)
              this.handleVictory();
          });
      }
    
      generaterows(row,r)
      {
          let c=0;
          return row.map(cell => (
            <Lightcell cellid={`${r}-${c++}`} isLit={cell} flipCellsAroundMe={this.flipCellsAround}/>
          ));
      }
      generateboard()
      {
        let r=0;
        return this.state.board.map(row => (
          <div className="row">
            {this.generaterows(row,r++)}
          </div>
        ));
      }
      render() {
    
        return(
          <div id="Lightsout">
            <audio id='click' src={click}></audio>
            <audio id='win' src={win}></audio>
            <h2 className="font-poppins text-lg mb-4 dark:text-white">{this.state.inPlay===true?`${this.state.attempts} Attempts Made`:
                  this.state.hasWon===true?'Victory':null}</h2>
            <div id='board'>
              {this.generateboard()}
            </div>
            <button id="operate" onClick={this.handleStart}>Start</button>
          </div>
        );
      }
}

export default Lightboard;