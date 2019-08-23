import React from 'react'

///////////////// Tire Temp ///////////////// 

class TireTemp extends React.Component {
  render() {
    return (
      <div className="tp_container">
        <div className="tp_graphic_bg">

          <div className="tire fl">
            <div className="temp_number">{((this.props.fl - 32)* 5 / 9).toFixed(0)}</div>
            <div className="graph"></div>
          </div>

          <div className="tire fr">
            <div className="graph"></div>
            <div className="temp_number">{((this.props.fr - 32)* 5 / 9).toFixed(0)}</div>
          </div>

          <div className="tire rl">
            <div className="temp_number">{((this.props.rl - 32)* 5 / 9).toFixed(0)}</div>
            <div className="graph"></div>
          </div>

          <div className="tire rr">
            <div className="graph"></div>
            <div className="temp_number">{((this.props.rr - 32)* 5 / 9).toFixed(0)}</div>
          </div>

        </div>
        <div className="tp_info unit">Tire Temp / °C</div>
      </div>
    )
  }
}

export default TireTemp;