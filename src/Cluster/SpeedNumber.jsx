import React from 'react'

///////////////// Speed ///////////////// 

class SpeedNumber extends React.Component {
  render() {
    return (
      <div className="sn_container">
        <div className="sn_number">{this.props.speed.toFixed(0)}</div>
        <div className="unit">KM/H</div>
      </div>
    )
  }
}

export default SpeedNumber;