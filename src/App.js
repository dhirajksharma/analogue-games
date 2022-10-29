import './App.css';
import logo from './logo.png';
import menu from './menu.png';
import Hangman from './Hangman/Hangman';
import Lightsout from './Lightsout/Lightsout';
import Info from './Info';
import Home from './Home/Home';
import React from 'react';
import {Route, Routes, NavLink} from 'react-router-dom';
import Yahtzee from './Yahtzee/Yahtzee';

class App extends React.Component {
  toggleNav(){
    let nav=document.querySelector('#optionsdiv');
    if(nav.style.display==='flex')
      nav.style.display='none';
    else
      nav.style.display='flex';
  }

  generateOptions()
  {
    return ['Hangman','Lights-Out','Yahtzee','Info'].map( game => (
      <NavLink
        className={(navData) => navData.isActive ? "gameoptionactive" : "gameoptions"}
        to={`/reactgames/${game}`}>{game}
      </NavLink>
    ));
  }

  render(){
  return (
    <div>
      <div id='navbar'>
        <NavLink to='/reactgames'>
          <img id='logo' src={logo}></img>
          </NavLink>
        <h1>React Games</h1>
        <img id='menu' onClick={this.toggleNav} src={menu}></img>
      </div>
      <div id='optionsdiv' style={{display:'none'}}>{this.generateOptions()}</div>
      <div id="playarea">
        <Routes>
          <Route path='/reactgames' element={<Home/>}></Route>
          <Route path='/reactgames/Hangman' element={<Hangman/>}></Route>
          <Route path='/reactgames/Lights-Out' element={<Lightsout/>}></Route>
          <Route path='/reactgames/Yahtzee' element={<Yahtzee/>}></Route>
          <Route path='/reactgames/Info' element={<Info/>}></Route>
        </Routes>
      </div>
    </div>
  );
}
}
export default App;
