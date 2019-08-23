import React from 'react'

///////////////// Gforce ///////////////// 

class Gforce extends React.Component {
  render() {
    const ampGforceX = (this.props.accelX / 9.81) *- 40;
    const ampGforceZ = (this.props.accelZ / 9.81) * 40;
    const styleGforce = {
      transform: 'translate(' + ampGforceX + 'px ,' + ampGforceZ + 'px)',
    };

    return (
      <div className="gf_container">
        <div className="gf_graphic_bg">
          <div className="gf_marker_after3" style={styleGforce}><div className="dot"></div></div>
          <div className="gf_marker_after2" style={styleGforce}><div className="dot"></div></div>
          <div className="gf_marker_after1" style={styleGforce}><div className="dot"></div></div>
          <div className="gf_marker" style={styleGforce}><div className="dot primary"></div></div>
        </div>
        <div className="gf_info">
          <div className="unit">G-FORCE</div>
          {/* <div className="title">Gforce X 横: {(this.props.accelX / 9.81).toFixed(3)}</div>
          <div className="title">Gforce Z 前後: {(this.props.accelZ / 9.81).toFixed(3)}</div> */}
        </div>
      </div>
    )
  }
}

export default Gforce;