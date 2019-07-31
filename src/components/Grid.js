import React, {Component} from 'react';
import Box from './Box'

// This is the grid that the 'creatures' move around in
class Grid extends Component {
  render() {
    const width = this.props.cols * 14;
    var rowsArr = []
    var boxClass = ""
    for (var i = 0; i < this.props.rows; i++) {   // usually a mapping would be used here
      for (var j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;
        if (this.props.gridFull[i][j] === 1) {
          boxClass = "box off"
        } else if (this.props.gridFull[i][j] === 2) {
          boxClass = "box on"
        } else {
          boxClass = "box plant"
        }
        rowsArr.push(
          <Box 
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            cols={j}
            selectBox={this.props.selectBox}
          />
        )
      }
    }
    return(
      <div className="grid" style={{width: width}}>
        {rowsArr}
      </div>
    )
  }
}

export default Grid