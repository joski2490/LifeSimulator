//---------------------------------------------------------
// My Game of Life                            7-30-19
// This is modified from the tutorial demo react-life
// Usage:
// > npm start
// then wait for React to open a browser window
//----------------------------------------------------------

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './components/Grid'
import Buttons from './components/Buttons'
import Buttons2 from './components/Buttons2'
import Buttons3 from './components/Buttons3'

// this is the whole page
class Main extends Component {
  constructor () {
    super();
    this.rows = 30;
    this.cols = 50;    
    this.speed = 1000;
    this.creatureEatRate = 1;
    this.creatureBirthRate = 1;
    this.plantDieRate = 1;
    this.plantSpawnRate = 1;
    this.overPopRate = 1;
    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(1))
    }
  }

  // If a box is clicked turn it on or off
  selectBox = (row, cols) => {
    // Instead of updating state directly we make a copy and change that
    let gridCopy = arrayClone(this.state.gridFull);
    if (gridCopy[row][cols] === 1) {
      gridCopy[row][cols] = 2;
    } else {
      gridCopy[row][cols] = 1;
    }
    this.setState({
      gridFull: gridCopy
    })
  }

  // Randomly set some boxes to true 
  seed = () => {
    // Instead of updating state directly we make a copy and change that
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 20) === 1) {
          gridCopy[i][j] = 3;
        }
        if (Math.floor(Math.random() * 10) === 1 && gridCopy[i][j] === 1) {
          gridCopy[i][j] = 2;
        }
      }
    }
    this.setState({
      gridFull: gridCopy
    })
  }

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  }

  pauseButton = () => {
    clearInterval(this.intervalId);
  }

  fast = () => {
    this.speed = 1000;
    this.playButton();
  }

  slow = () => {
    this.speed = 4000;
    this.playButton();
  }

  clear = () => {
    var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(1));
    this.setState({
      gridFull: grid,
      generation: 0
    });
  }

  gridSize = (size) => {
    switch (size) {
      case "1":
        this.cols = 20;
        this.rows = 10;
        break;
      case "2":
        this.cols = 50;
        this.rows = 30;
        break;
      default:
        this.cols = 70;
        this.rows = 50;
    }
    this.clear();
  }

  eatRate = (val) => {
    switch (val) {
      case "1":
        this.creatureEatRate = 1;
        break;
      case "2":
        this.creatureEatRate = 2;
        break;
      default:
        this.creatureEatRate = 3;
    }
    this.clear();
  }

  birthRate = (val) => {
    switch (val) {
      case "1":
        this.creatureBirthRate = 1;
        break;
      case "2":
        this.creatureBirthRate = 2;
        break;
      default:
        this.creatureBirthRate = 3;
    }
    this.clear();
  }

  plantDie = (val) => {
    switch (val) {
      case "1":
        this.plantDieRate = 1;
        break;
      case "2":
        this.plantDieRate = 2;
        break;
      default:
        this.plantDieRate = 3;
    }
    this.clear();
  }

  plantSpawn = (val) => {
    switch (val) {
      case "1":
        this.plantSpawnRate = 1;
        break;
      case "2":
        this.plantSpawnRate = 2;
        break;
      default:
        this.plantSpawnRate = 3;
    }
    this.clear();
  }

  overPop = (val) => {
    switch (val) {
      case "1":
        this.overPopRate = 1;
        break;
      case "2":
        this.overPopRate = 2;
        break;
      default:
        this.overPopRate = 3;
    }
    this.clear();
  }

  play = () => {
    // make a copy of the grid to avaoid changing state directly
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);
    let g3 = arrayClone(this.state.gridFull);

    // check for food source and die if none
    if ( this.state.generation % this.creatureEatRate === 0){ 
      for (let k = 0; k < this.rows; k++) {
        for (let l = 0; l < this.cols; l++) {  
          let food = false;
          if (g[k][l] === 2) {            
            if (k > 0) if (g[k - 1][l] === 3) food = true;
            if (k > 0 && l > 0) if (g[k - 1][l - 1] === 3) food = true;
            if (k > 0 && l < this.cols - 1) if (g[k - 1][l + 1] === 3) food = true;
            if (l < this.cols - 1) if (g[k][l + 1] === 3) food = true;
            if (l > 0) if (g[k][l - 1] === 3) food = true;
            if (k < this.rows - 1) if (g[k + 1][l] === 3) food = true;
            if (k < this.rows - 1 && l > 0) if (g[k + 1][l - 1] === 3) food = true;
            if (k < this.rows - 1 && l < this.cols - 1) if (g[k + 1][l + 1] === 3) food = true;
            if (!food) {
              g2[k][l] = 1;
              g3[k][l] = 1;
            }
          }
        }
      }
    }

    // Check for over population, new births if not
    if ( this.state.generation % (this.overPopRate + 1) === 1){ 
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          let count = 0;
          if (i > 0) if (g2[i - 1][j] === 2) count++;
          if (i > 0 && j > 0) if (g2[i - 1][j - 1] === 2) count++;
          if (i > 0 && j < this.cols - 1) if (g2[i - 1][j + 1] === 2) count++;
          if (j < this.cols - 1) if (g2[i][j + 1] === 2) count++;
          if (j > 0) if (g2[i][j - 1] === 2) count++;
          if (i < this.rows - 1) if (g2[i + 1][j] === 2) count++;
          if (i < this.rows - 1 && j > 0) if (g2[i + 1][j - 1] === 2) count++;
          if (i < this.rows - 1 && j < this.cols - 1) if (g2[i + 1][j + 1] === 2) count++;
          if (g2[i][j] === 2 && count > 3) g3[i][j] = 1;  // die off if over population       
          if (g2[i][j] === 1 && count > 0 && count < 2) g3[i][j] = 2; 
        }
      } 
    }   

    // Food is eaten
    if ( this.state.generation % (this.plantDieRate + 1) === 1){  
      for (let m = 0; m < this.rows; m++) {
        for (let n = 0; n < this.cols; n++) { 
          let count = 0;
          if (g2[m][n] === 3){
            if (m > 0) if (g2[m - 1][n] === 2) count++;
            if (m > 0 && n > 0) if (g2[m - 1][n - 1] === 2) count++;
            if (m > 0 && n < this.cols - 1) if (g2[m - 1][n + 1] === 2) count++;
            if (n < this.cols - 1) if (g2[m][n + 1] === 2) count++;
            if (n > 0) if (g2[m][n - 1] === 2) count++;
            if (m < this.rows - 1) if (g2[m + 1][n] === 2) count++;
            if (m < this.rows - 1 && n > 0) if (g2[m + 1][n - 1] === 2) count++;
            if (m < this.rows - 1 && n < this.cols - 1) if (g2[m + 1][n + 1] === 2) count++;
            if (count > 1) {
              g2[m][n] = 1;
              g3[m][n] = 1;
            }
          }
        }
      }
    }

    // food propogates 
    if ( this.state.generation % (this.plantSpawnRate + 1) === 1){
      for (let m = 0; m < this.rows; m++) {
        for (let n = 0; n < this.cols; n++) { 
          let expand = false;
          if  (g2[m][n] === 3) {          
            if (m > 0) if (g2[m - 1][n] === 1) {
              expand = true;
              g3[m - 1][n] = 3;
            }
            if (m > 0 && n > 0) if (g2[m - 1][n - 1] === 1 && expand === false) {
              expand = true;
              g3[m - 1][n - 1] = 3;
            }
            if (m > 0 && n < this.cols - 1) if (g2[m - 1][n + 1] === 1 && expand === false) {
              expand = true;
              g3[m - 1][n + 1] = 3;
            }
            if (n < this.cols - 1) if (g2[m][n + 1] === 1 && expand === false) {
              expand = true;
              g3[m][n + 1] = 3;
            }
            if (n > 0) if (g[m][n - 1] === 1 && expand === false) {
              expand = true;
              g3[m][n - 1] = 3;
            }
            if (m < this.rows - 1) if (g2[m + 1][n] === 1 && expand === false) {
              expand = true;
              g3[m + 1][n] = 3;
            }
            if (m < this.rows - 1 && n > 0) if (g2[m + 1][n - 1] === 1 && expand === false) {
              expand = true;
              g3[m + 1][n - 1] = 3;
            }
            if (m < this.rows - 1 && n < this.cols - 1) if (g2[m + 1][n + 1] === 1 && expand === false) {
              expand = true;
              g3[m + 1][n + 1] = 3;
            }
          }
        }
      }      
    }

    this.setState({
      gridFull: g3,
      generation: this.state.generation + 1
    })
  }

  // As soon as everything has loaded run the stuff in here
  componentDidMount () {
    // Set some boxes on at start of game
    this.seed();
    this.playButton();
  }

  render() {
    return(
      <div>
        <h1>Life Simulator</h1> 
        <h4>Time Passed: {this.state.generation}</h4>      
        <Grid 
          gridFull={this.state.gridFull} 
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
         <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}         
        />
        <Buttons2
           slow={this.slow}
           fast={this.fast}
           clear={this.clear}
           seed={this.seed}
           gridSize={this.gridSize}
        />     
         <Buttons3
          eatRate = {this.eatRate}
          birthRate = {this.birthRate}
          plantDie = {this.plantDie}
          plantSpawn = {this.plantSpawn}
          overPop = {this.overPop}
        />    
      </div>
    )
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main />, document.getElementById('root'));

