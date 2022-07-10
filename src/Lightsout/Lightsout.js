import React from "react";
import Lightboard from "./Lightboard.js";

class Lightsout extends React.Component{
    componentDidMount(){
      let r=document.querySelector(':root');
      r.style.setProperty('--backcolor','#141414');
      r.style.setProperty('--hcolor','white');
      r.style.setProperty('--linkcolor','yellow');
    }
    render(){
        return(
            <Lightboard/>
        );
    }
}

export default Lightsout;