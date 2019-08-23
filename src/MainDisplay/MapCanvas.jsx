import React, { Component } from 'react';
import baseImage from '../Img/rastermap.jpg';

export default class MapCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleFactor: 1,
      dimensions: null,
      posiXraw: 0,
      posiZraw: 0,
      yaw: 0,
      translatedX: 0,
      translatedZ: 0,
      yawTranslated: 0
    }

  }

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (state.posiXraw !== props.px || state.posiZraw !== props.pz) {

      const sf = 1 / 4800 * state.dimensions.height;     
      const posiXzero = 2465 + ((1 / 15000) * state.posiXraw * 4800);
      const posiZzero = 2050 - ((1 / 14800) * state.posiZraw * 4800);

      return {
        scaleFactor: sf,
        posiXraw: props.px,
        posiZraw: props.pz,
        translatedX: posiXzero * sf,
        translatedZ: posiZzero * sf,
        yawTranslated: (props.yaw / 3.14 * 180)
      };
      
    }

    return null;
  }

  componentDidMount() {

    // this.mapWindowWidth = this.container.offsetWidth;
    this.mapWindowWidth = 4800;
    
    this.setState({
      dimensions: {
        // width: this.container.offsetWidth,
        // height: this.container.offsetHeight,
        width: 4800,
        height: 4800,
      },
    });
  }

  renderContent() {
    const stylePosition = {
      left: this.state.translatedX + 'px',
      top: this.state.translatedZ + 'px',
      transform: 'rotate(' + this.state.yawTranslated + 'deg)'
    };
    const styleSize = {
      left: '0px',
      top: '0px',
      width: 'auto',
      height: this.state.dimensions.height,
    };

    return (
      <div className="cv_container">
        <img src={baseImage} alt="base_image" className="Image" style={styleSize}/>
        <div className="cv_graphic">
          <div className="map_marker" style={stylePosition}>
            <div className="shadow"></div>
            <div className="shape left">
              <div className="upper">
                <div></div>
              </div>
              <div className="lower">
                <div></div>
              </div>
            </div>
            <div className="shape right">
              <div className="upper">
                <div></div>
              </div>
              <div className="lower">
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { dimensions } = this.state;

    return (
      <div className="Hello" ref={el => (this.container = el)}>
        {dimensions && this.renderContent()}
      </div>
    );
  }
}
