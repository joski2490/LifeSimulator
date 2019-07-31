import React, { Component } from 'react'
import { ButtonToolbar, DropdownButton, Dropdown } from 'react-bootstrap';

class Buttons2 extends Component {

  eatSelect = (evt) => {
    this.props.eatRate(evt);
  }

  birthSelect = (evt) => {
    this.props.birthRate(evt);
  }

  pDieSelect = (evt) => {
    this.props.plantDie(evt);
  } 
  
  pSpawnSelect = (evt) => {
    this.props.plantSpawn(evt);
  } 

  overPopSelect = (evt) => {
    this.props.overPop(evt);
  } 
  
  render () {
    return(
      <div className="center">
        <ButtonToolbar>  

          <DropdownButton
            title="Eat Time"
            id="size-menu"
            onSelect={this.eatSelect}
          >
            <Dropdown.Item eventKey="1" className="mybutton">1</Dropdown.Item>
            <Dropdown.Item eventKey="2" className="mybutton">2</Dropdown.Item>
            <Dropdown.Item eventKey="3" className="mybutton">3</Dropdown.Item>
          </DropdownButton>

          <DropdownButton
            title="Birth Rate"
            id="size-menu"
            onSelect={this.birthSelect}
          >
            <Dropdown.Item eventKey="1" className="mybutton">1</Dropdown.Item>
            <Dropdown.Item eventKey="2" className="mybutton">2</Dropdown.Item>
            <Dropdown.Item eventKey="3" className="mybutton">3</Dropdown.Item>
          </DropdownButton>

          <DropdownButton
            title="Plant Gone"
            id="size-menu"
            onSelect={this.pDieSelect}
          >
            <Dropdown.Item eventKey="1" className="mybutton">1</Dropdown.Item>
            <Dropdown.Item eventKey="2" className="mybutton">2</Dropdown.Item>
            <Dropdown.Item eventKey="3" className="mybutton">3</Dropdown.Item>
          </DropdownButton>

          <DropdownButton
            title="Plant Spread"
            id="size-menu"
            onSelect={this.pSpawnSelect}
          >
            <Dropdown.Item eventKey="1" className="mybutton">1</Dropdown.Item>
            <Dropdown.Item eventKey="2" className="mybutton">2</Dropdown.Item>
            <Dropdown.Item eventKey="3" className="mybutton">3</Dropdown.Item>
          </DropdownButton>

          <DropdownButton
            title="Over Population Time"
            id="size-menu"
            onSelect={this.overPopSelect}
          >
            <Dropdown.Item eventKey="1" className="mybutton">1</Dropdown.Item>
            <Dropdown.Item eventKey="2" className="mybutton">2</Dropdown.Item>
            <Dropdown.Item eventKey="3" className="mybutton">3</Dropdown.Item>
          </DropdownButton>

        </ButtonToolbar>
      </div>
    )
  }
}

export default Buttons2
