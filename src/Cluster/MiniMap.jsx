import React from 'react'
import MapCanvasHeadup from "../MainDisplay/MapCanvasHeadup";

class MiniMap extends React.Component {
  render() {

    return(
      <div className="minimap_wrapper">
        <MapCanvasHeadup px={this.props.px} py={this.props.py} pz={this.props.pz} yaw={this.props.yaw} speed={this.props.speed}/>
      </div>
    )
  }
}

export default MiniMap;