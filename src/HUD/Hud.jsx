import React from 'react';
import socketIOClient from "socket.io-client";
import Config from '../Config/Config'
import Brake from './Brake';
import TireTemp from './TireTemp';
import CarAngle from '../Cluster/CarAngle';

class Hud extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      yaw: 0,
      pitch: 0,
      roll: 0,
      brake: 0,
      boost: 0,
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      currentRaceTime: 0,
      currentRaceTimeHHMMSS: "00:00:00",
      tireTempFL: 0,
      tireTempFR: 0,
      tireTempRL: 0,
      tireTempRR: 0,
      endpoint: Config.SERVER
    }
    this.convertSeconds = this.convertSeconds.bind(this);
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("datastream", data => {
      this.setState((state) => ({ brake: (data.Brake)}));
      this.setState((state) => ({ yaw: (data.Yaw).toFixed(2) }));
      this.setState((state) => ({ pitch: (data.Pitch).toFixed(2) }));
      this.setState((state) => ({ roll: (data.Roll).toFixed(2) }));
      this.setState((state) => ({ boost: (data.Boost).toFixed(2) }));
      this.setState((state) => ({ positionX: (data.PositionX).toFixed(4) }));
      this.setState((state) => ({ positionY: (data.PositionY).toFixed(4) }));
      this.setState((state) => ({ positionZ: (data.PositionZ).toFixed(4) }));
      this.setState((state) => ({ currentRaceTime: (data.CurrentRaceTime).toFixed(0) }));
      this.convertSeconds(this.state.currentRaceTime);
    });
    
  }

  convertSeconds(sec) {

    var hrs = Math.floor(sec / 3600);
    var min = Math.floor((sec - (hrs * 3600)) / 60);
    var seconds = sec - (hrs * 3600) - (min * 60);
    seconds = Math.round(seconds * 100) / 100

    var result = (hrs < 10 ? "0" + hrs : hrs);
    result += ":" + (min < 10 ? "0" + min : min);
    result += ":" + (seconds < 10 ? "0" + seconds : seconds);
    this.setState((state) => ({ currentRaceTimeHHMMSS: result }));
  }


  render() {

    return (
      <div className="ctn_hud">
        <div className="hud_upper"></div>
        <div className="hud_lower">
          <div className="other_item boost">
            <div className="unit">Boost</div>
            <div className="value">{this.state.boost}</div>
          </div>
          <div className="other_item current_lap">
            <div className="unit">Current Race Time</div>
            <div className="value">{(this.state.currentRaceTimeHHMMSS)}</div>
          </div>
          <div className="other_item ">
            <div className="unit">PositionX</div>
            <div className="value">{(this.state.positionX)}</div>
          </div>
          <div className="other_item ">
            <div className="unit">PositionY</div>
            <div className="value">{(this.state.positionY)}</div>
          </div>
          <div className="other_item ">
            <div className="unit">PositionZ</div>
            <div className="value">{(this.state.positionZ)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hud