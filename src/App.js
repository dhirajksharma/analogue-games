import './App.css';
import logo from './logo.png';
import menu from './menu.png';
import Hangman from './Hangman/Hangman';
import Lightsout from './Lightsout/Lightsout';
import Yahtzee from './Yahtzee/Yahtzee';
import Info from './Info';
import Home from './Home/Home';
import React from 'react';
import $ from 'jquery';
import {Route, Routes, NavLink} from 'react-router-dom';

class App extends React.Component {
  toggleNav(){
    $('#optionsdiv').slideToggle('slow');
  }

  generateOptions()
  {
    return ['Hangman','Lights-Out','Yahtzee','Info'].map( game => (
      <NavLink
        className={(navData) => navData.isActive ? "gameoptionactive" : "gameoptions"}
        to={`/${game}`}>{game}
      </NavLink>
    ));
  }

  render(){
  return (
    <div>
      <div id='navbar'>
        <NavLink to='/'>
          <img id='logo' src={logo}></img>
          </NavLink>
        <h1>React Games</h1>
        <img id='menu' onClick={this.toggleNav} src={menu}></img>
      </div>
      <div id='optionsdiv' style={{display:'none'}}>{this.generateOptions()}</div>
      <div id="playarea">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Hangman' element={<Hangman/>}></Route>
          <Route path='/Lights-Out' element={<Lightsout/>}></Route>
          <Route path='/Yahtzee' element={<Yahtzee/>}></Route>
          <Route path='/Info' element={<Info/>}></Route>
        </Routes>
      </div>
    </div>
  );
}
}
export default App;
