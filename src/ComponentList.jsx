import React from 'react'
import SpeedmeterInflating from "./Cluster/SpeedmeterInflating";
import SpeedmeterRotating from "./Cluster/SpeedmeterRotating";
import RevGraphic from "./Cluster/RPM";
import Hud from './HUD/Hud';
import ContentNavigation from "./MainDisplay/Navigation";
import Gforce from './Cluster/Gforce';
import CarAngle from './Cluster/CarAngle';
import TireTemp from './HUD/TireTemp';
import socketIOClient from "socket.io-client";
import Brake from './HUD/Brake';
import Icon from '@material-ui/core/Icon';
import Config from './Config/Config';

var socket;

export default class ComponentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewmode: 1,
      speed: 0,
      accelerationX: 0,
      accelerationY: 0,
      accelerationZ: 0,
      pitch: 0,
      roll: 0,
      yaw: 0,
      currentRPM: 0,
      gear: 'N',
      distTraveled: 0,
      speedcolor: 'blue',
      tireTempFL: 0,
      tireTempFR: 0,
      tireTempRL: 0,
      tireTempRR: 0,
      brake: 0,
    }

    socket = socketIOClient(Config.SERVER);
  }

  componentDidMount() {

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
        pitch: data.Pitch,
        roll: data.Roll,
        yaw: data.Yaw,
        currentRPM: data.CurrentEngineRpm,
        gear: data.Gear,
        distTraveled: data.DistanceTraveled,
        speedcolor: speedcol,
        tireTempFL: data.TireTempFrontLeft,
        tireTempFR: data.TireTempFrontRight,
        tireTempRL: data.TireTempRearLeft,
        tireTempRR: data.TireTempRearRight,
        brake: data.Brake,
      }));
    });

  }

  render() {
    return (
      <div className="complist_container">
        <header>Component List</header>
        <div className="complist_upper">
          <ContentNavigation />
          <div className="title_map unit">
            <div className="name">Map</div>
            <Icon>zoom_out_map</Icon>
          </div>
        </div>
        <div className="complist_middle">
          <div className="sp">
            <div className="sp_inf">
              <SpeedmeterInflating speed={this.state.speed} speedcolor={this.state.speedcolor} />
            </div>
            <SpeedmeterRotating speed={this.state.speed} speedcolor={this.state.speedcolor} />
          </div>
          <RevGraphic rpm={this.state.currentRPM} gear={this.state.gear}/>
          <Gforce accelX={this.state.accelerationX} accelY={this.state.accelerationY} accelZ={this.state.accelerationZ} />
          <CarAngle pitch={this.state.pitch} roll={this.state.roll} yaw={this.state.yaw} />
          <TireTemp fl={this.state.tireTempFL} fr={this.state.tireTempFR} rl={this.state.tireTempRL} rr={this.state.tireTempRR} />
          <Brake brake={this.state.brake}/>
          <Hud />
        </div>
      </div>
    )
  }
}
