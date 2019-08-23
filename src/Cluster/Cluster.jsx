import React from 'react'
import SpeedmeterInflating from "./SpeedmeterInflating";
import SpeedmeterRotating from './SpeedmeterRotating';
import RevGraphic from "./RPM";
import MiniPlayer from "./MiniPlayer";
import MiniMap from './MiniMap';
import CarAngle from './CarAngle';
import DistanceTraveled from './DistanceTraveled';
import FuelMeter from './FuelMeter';
import ClockContainer from './Clock';
import TBT from './TBT';
import Gforce from './Gforce';
import socketIOClient from "socket.io-client";
import Config from '../Config/Config'

var socket;

class Cluster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewmode: 1,
      speed: 0,
      px: 2480,
      py: 0,
      pz: 2040,
      accelerationX: 0,
      accelerationY: 0,
      accelerationZ: 0,
      pitch: 0,
      roll: 0,
      yaw: 0,
      currentRPM: 0,
      gear: 'N',
      distTraveled: 0,
      fuel: 0,
      speedcolor: 'blue'
    }
    socket = socketIOClient(Config.SERVER);
  }

  componentDidMount() {

    socket.on("onefinger_swipe_out", direction => {

      switch (direction) {
        case 'left':
          this.setState((prefState) => ({ viewMode: 1 }));
          break;
        case 'right':
          this.setState((prefState) => ({ viewMode: 2 }));
          break;
        default:

          break;
      }

    });

    socket.on('connect', data => {
      console.log('~ Socket Response from socket: ~', socket);
    });

    socket.on("datastream", data => {

      let speedcol = 'blue';

      if (80 >= this.state.speed && this.state.speed > 40) {
        speedcol = 'yellow';
      }
      else if (120 >= this.state.speed && this.state.speed > 80) {
        speedcol = 'orange';
      }
      else if (this.state.speed > 120) {
        speedcol = 'red';
      }

      this.setState((prefState) => ({
        speed: (data.Speed * 3.6),
        accelerationX: data.AccelerationX,
        accelerationY: data.AccelerationY,
        accelerationZ: data.AccelerationZ,
        px: (data.PositionX),
        py: (data.PositionY),
        pz: data.PositionZ,
        pitch: data.Pitch,
        roll: data.Roll,
        yaw: data.Yaw,
        currentRPM: data.CurrentEngineRpm,
        gear: data.Gear,
        distTraveled: data.DistanceTraveled,
        fuel: data.Fuel,
        speedcolor: speedcol
      }
      ));

    });

  }

  componentWillUnmount() {

    socket.disconnect();

  }

  switchViews() {
    this.setState((prefState) => ({ viewMode: prefState.viewMode === 1 ? 2 : 1 }));
  }

  renderClusterView() {
    return (
      <div className="cluster_container" onClick={() => { this.switchViews() }}>
        <div className="cluster_header">
          <ClockContainer />
        </div>
        <div className="cluster_main">
          <div className="carangle_container">
            <Gforce accelX={this.state.accelerationX} accelY={this.state.accelerationY} accelZ={this.state.accelerationZ} />
          </div>
          <div className="speedmeter_container">
            <SpeedmeterInflating speed={this.state.speed} speedcolor={this.state.speedcolor} />
            <FuelMeter fuel={this.state.fuel} />
          </div>
          <div className="revmeter_container">
            <RevGraphic viewmode={1} rpm={this.state.currentRPM} gear={this.state.gear}/>
          </div>

        </div>
        <div className="cluster_footer">
          <MiniPlayer />
          <DistanceTraveled odo={this.state.distTraveled} />
          <TBT />
        </div>
      </div>
    )
  }

  renderClusterViewAlternative() {
    return (
      <div className={"cluster_container viewmode_2"} onClick={() => { this.switchViews() }}>
        <div className="cluster_header">
          <TBT />
        </div>
        <div className="cluster_main">
          <div className="speedmeter_container">
            <SpeedmeterRotating speed={this.state.speed} speedcolor={this.state.speedcolor} />
          </div>
          <div className="mini_map_container">
            <MiniMap px={this.state.px} py={this.state.py} pz={this.state.pz} yaw={this.state.yaw} speed={this.state.speed}/>
          </div>
          <div className="revmeter_container">
            <RevGraphic viewmode={2} rpm={this.state.currentRPM} gear={this.state.gear}/>
          </div>
        </div>
        <div className="cluster_footer">
          <CarAngle pitch={this.state.pitch} roll={this.state.roll} yaw={this.state.yaw} />
        </div>
      </div>
    )
  }

  render() {
    switch (this.state.viewMode) {
      case 1:
        return this.renderClusterView();
      case 2:
        return this.renderClusterViewAlternative();
      default:
        return this.renderClusterView();
    }
  }
}

export default Cluster