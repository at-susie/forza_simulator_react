import React from 'react'
import Icon from '@material-ui/core/Icon';
import SpeedNumber from './SpeedNumber';

///////////////// Speed ///////////////// 

class SpeedmeterGraphic extends React.Component {
  render() {

    const speedSize = (this.props.speed * 240 / 180) + 160;
    // The circle size is Speed * (40vw - 12vw) / Max speed defined

    const styleSize = {
      width: speedSize + 'px',
      height: speedSize + 'px'
    };

    return (
      <div className={"sg_container " + this.props.speedcolor}>
        <div
          className={"sg_graphic " + this.props.speedcolor}
          style={styleSize}
        >
        </div>
        <div className="notification">
          <Icon>warning</Icon>
        </div>
        <SpeedNumber speed={this.props.speed}/>
      </div>
    )
  }
}

export default SpeedmeterGraphic;