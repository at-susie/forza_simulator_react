import React, { Component } from 'react';
import $ from 'jquery';


export default class MapCanvasHeadup extends Component {
  componentDidUpdate() {
    
    const scale = 2 - (0.5 * (1 / 240 * this.props.speed * 3.6));
    const centerX = 2465;
    const centerY = 2050;
    const originX = (centerX + ((1 / 15000) * this.props.px * 4800));
    const originY = (centerY + (- (1 / 14800) * this.props.pz * 4800));
    const rot = - (this.props.yaw / Math.PI * 180);

    $('#inner-map-element').css('transform-origin', `${originX}px ${originY}px`);
    $('#inner-map-element').css('transform', `translate( ${-originX}px, ${-originY}px ) rotate( ${rot}deg )`);
    $('#outer-map-element').css('transform', `translate(400px, 400px) scale( ${scale} )`);

  }

  render() {
    return (
      <div className="map">
        <div id="outer-map-element">
          <div id="inner-map-element">
          </div>
        </div>
        <div className="cv_graphic">
          <div className="map_marker">
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
}
