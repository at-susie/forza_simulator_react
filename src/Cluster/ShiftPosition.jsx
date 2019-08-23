import React from 'react'

///////////////// Shift Position ///////////////// 

class ShiftPosition extends React.Component {
  render() {
    return (
      <div className="sp_container">
        <div className="unit">GEAR</div>
        <div className="sp_number">{this.props.shiftpos}</div>
      </div>
    )
  }
}

export default ShiftPosition;