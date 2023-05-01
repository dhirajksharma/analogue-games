import logo from './res/logo.png';
import Hangman from './Hangman/Hangman';
import Lightsout from './Lightsout/Lightsout';
import Home from './Home/Home';
import React from 'react';
import {Route, Routes, NavLink} from 'react-router-dom';

class App extends React.Component {
  
  render(){
  return (
    <div className='max-w-[600px] h-screen mx-auto'>
      
      <div id='navbar' className='flex w-[92%] mx-auto justify-between items-center py-4'>
        <h1 className='inline-block text-3xl font-bold font-goldman'>PS React</h1>
        <NavLink to='/'>
          <img id='logo' src={logo} className='h-16'></img>
        </NavLink>
      </div>
      
      <div id="playarea" className="">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Hangman' element={<Hangman/>}></Route>
          <Route path='/Lights-Out' element={<Lightsout/>}></Route>
        </Routes>
        </div>
    </div>
  );
}
}
export default App;
