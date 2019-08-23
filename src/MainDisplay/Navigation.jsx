import React, { Component } from 'react';
import MapCanvas from "./MapCanvas";
import socketIOClient from "socket.io-client";
import Config from '../Config/Config';

var socket;

class ContentNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      px: 0,
      py: 0,
      pz: 0,
      yaw: 0
    };

    socket = socketIOClient(Config.SERVER);
  }

  componentDidMount() {
    
    socket.on("datastream", data => {
      this.setState((state) => ({ 
        px: (data.PositionX),
        py: (data.PositionY),
        pz: data.PositionZ,
        yaw: data.Yaw }));

    });

  }

  render() {
    return (
      <div className="ctn_navigation">
        <div id="map" className="ctn_map">
          <MapCanvas px={this.state.px} py={this.state.py} pz={this.state.pz} yaw={this.state.yaw}/>
        </div>
        <div className="nav_info">
          <div className="duration">20min</div>
          <div className="eta">ETA 13:43</div>
          <div className="distance">11.5km</div>
        </div>
      </div>
    )
  }
}

export default ContentNavigation
