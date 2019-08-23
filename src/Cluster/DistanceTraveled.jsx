import React from 'react'

///////////////// Shift Position ///////////////// 

class DistanceTraveled extends React.Component {
  render() {
    return (
      <div className="odo_container">
        <div className="unit">ODO</div>
        <div className="odo_number">{this.props.odo} <span>KM</span></div>
      </div>
    )
  }
}

export default DistanceTraveled;