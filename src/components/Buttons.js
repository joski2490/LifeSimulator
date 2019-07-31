import React, { Component } from 'react'
import { ButtonToolbar, Button, DropdownButton, Dropdown } from 'react-bootstrap';

class Buttons extends Component {

  handleSelect = (evt) => {
    this.props.gridSize(evt);
  }

  render () {
    return(
      <div className="center">
        <ButtonToolbar>
          <Button className="btn btn-default mybutton" onClick={this.props.playButton}>
            Play
          </Button>
          <Button className="btn btn-default mybutton" onClick={this.props.pauseButton}>
            Pause
          </Button>
          <Button className="btn btn-default mybutton" onClick={this.props.clear}>
            Clear
          </Button>
          <Button className="btn btn-default mybutton" onClick={this.props.slow}>
            Slow
          </Button>
          <Button className="btn btn-default mybutton" onClick={this.props.fast}>
            Fast
          </Button>
          <Button className="btn btn-default mybutton" onClick={this.props.seed}>
            Seed
          </Button>
          <DropdownButton
            title="Grid Size"
            id="size-menu"
            onSelect={this.handleSelect}
          >
            <Dropdown.Item eventKey="1" className="mybutton">20x10</Dropdown.Item>
            <Dropdown.Item eventKey="2" className="mybutton">50x30</Dropdown.Item>
            <Dropdown.Item eventKey="3" className="mybutton">70x50</Dropdown.Item>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Buttons
