import React, { Component } from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap';

class Buttons extends Component {

  handleSelect = (evt) => {
    this.props.gridSize(evt);
  }

  render () {
    return(
      <div className="center">
        <ButtonToolbar>
          <Button className="btn btn-default mybutton primary-btn" onClick={this.props.playButton}>
            Play
          </Button>         
          <Button className="btn btn-default mybutton primary-btn" onClick={this.props.pauseButton}>
            Pause
          </Button>         
        </ButtonToolbar>
      </div>
    )
  }
}

export default Buttons
