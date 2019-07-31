//---------------------------------------------------------
// Game of Life                             7-30-19
// This is a ReactJS based demo of Conways's Game of Life
// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
// This is from a tutorial from freeCodeCamp.org
// https://www.youtube.com/watch?v=PM0_Er3SvFQ&list=PLgZ1wCgBs2--7A5gx3uD23FrLi41-gTgV&index=10&t=1622s
// Usage:
// > npm start
// then wait for React to open a browser window
//----------------------------------------------------------

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './components/Grid'
import Buttons from './components/Buttons'


// this is the whole page
class Main extends Component {
  constructor () {
    super();
    this.speed = 150;
    this.rows = 30;
    this.cols = 50;
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
        if (Math.floor(Math.random() * 4) === 1) {
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
    this.speed = 200;
    this.playButton();
  }

  slow = () => {
    this.speed = 500;
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

  play = () => {
    // Two different versions of the grid (to avoid manipulating state directly)
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j] === 2) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1] === 2) count++;
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1] === 2) count++;
		    if (j < this.cols - 1) if (g[i][j + 1] === 2) count++;
		    if (j > 0) if (g[i][j - 1] === 2) count++;
		    if (i < this.rows - 1) if (g[i + 1][j] === 2) count++;
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1] === 2) count++;
		    if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1] === 2) count++;
		    if (g[i][j] === 2 && (count < 2 || count > 3)) g2[i][j] = 1;
		    if (g[i][j] === 1 && count === 3) g2[i][j] = 2;
      }
    }
    this.setState({
      gridFull: g2,
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
        <h1>The Game of Life</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
        <Grid 
          gridFull={this.state.gridFull} 
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    )
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main />, document.getElementById('root'));

