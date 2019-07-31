import React, {Component} from 'react';

// This is the individual little grey or green boxes that simulate a living thing
class Box extends Component {

  selectBox = () => {   // arrow function allows us to get "this"
    this.props.selectBox (this.props.row, this.props.cols)  
  }  

  render() {
    return(
      <div 
        className={this.props.boxClass} 
        id={this.props.id} 
        onClick={this.selectBox} 
      />
    );
  }
}

export default Box