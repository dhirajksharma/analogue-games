import React from "react";
import './Lightcell.css';
class Lightcell extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick(evt) {
        this.props.flipCellsAroundMe(evt.target.id);
      }
    
      render() {
        let classes = this.props.isLit ? "cell-lit" : "cell";
    
        return (
            <div id={this.props.cellid} className={classes} onClick={this.handleClick}></div>
        )
      }
}

export default Lightcell;