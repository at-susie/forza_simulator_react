import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Config from "../Config/Config";
import Icon from '@material-ui/core/Icon';

var socket;
var ctx;

class CanvasComponent extends React.Component {

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    ctx = this.refs.canvas.getContext('2d');

    if (ctx) {

      ctx.clearRect(0,0, this.props.w, this.props.h);

      if (this.props.touches.length > 0) {

        for (let i = 0; i < this.props.touches.length; i++) {
          ctx.fillStyle = '#F0F';
          ctx.ellipse(this.props.touches[i].clientX, this.props.touches[i].clientY, 25, 25, 0, 0, Math.PI * 2, false);
          ctx.fill();
        }

      }

    }

  }

  clear() {
    ctx.clearRect(0, 0, this.state.dimensions.width, this.state.dimensions.height);
  }

  render() {
    return (
      <canvas className="canvas" ref="canvas" width={this.props.w} height={this.props.h} />
    );
  }
}

class ContentTouchPad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      touches: [],
      currentIdentifier: 0,
      startX: 0,
      startY: 0,
      block: false,
      dimensions: {
        width: 0,
        height: 0
      }
    };

    socket = socketIOClient(Config.SERVER);

    document.body.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.handleTouchDown(e);
    }, { passive: false });

    document.body.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.handleTouchMove(e);
    }, { passive: false });

    document.body.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.handleTouchUp(e);
    }, { passive: false });

  }

  handleTouchDown(event) {

    if(event.touches.length === 1) {

      this.setState({
        touches: event.touches,
        currentIdentifier: event.touches[0].identifier,
        startX: event.touches[0].clientX,
        startY: event.touches[0].clientY
      });

    } else if(event.touches.length === 2) {
      this.setState({
        touches: event.touches,
        currentIdentifier: event.touches[0].identifier,
        startX: event.touches[0].clientX,
        startY: event.touches[0].clientY
      });
    }

    socket.emit('toggle_in', true);

  }

  handleTouchMove(event) {

    this.setState({ touches: event.touches });

  }

  handleTouchUp(event) {

    socket.emit('toggle_in', false);

    let block = false;

    if(this.state.touches.length === 1) {
      
      if(this.state.touches[0].identifier === this.state.currentIdentifier && !this.state.block) {

        const deltaX = this.state.startX - this.state.touches[0].clientX;
        const deltaY = this.state.startY - this.state.touches[0].clientY;
        const delta = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)); 

        if(Math.abs(delta) < 10) {

          socket.emit('single_tap_in', 'tap');

        } else {

          if(deltaY < -200) {

            socket.emit('onefinger_swipe_in', 'down');

          } else if( deltaY > 200) {

            socket.emit('onefinger_swipe_in', 'up');

          } else if(deltaX < -200) {

            socket.emit('onefinger_swipe_in', 'right');

          } else if (deltaX > 200) {

            socket.emit('onefinger_swipe_in', 'left');

          }

        }
        
      }

    } else if(this.state.touches.length === 2) {

      let deltaY = this.state.startY - this.state.touches[0].clientY;

      block = true;

      if(deltaY < -200) {
        socket.emit('twofinger_swipe_in', 'down');
      } else if( deltaY > 200) {
        socket.emit('twofinger_swipe_in', 'up');
      }
    }

    if(event.touches.length === 0) {
      block = false;
    }

    this.setState({ touches: event.touches, block: block });

  }

  componentDidMount() {
    this.setState({
      dimensions: {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
      },
    });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  handleButtonclickPrev() {
    socket.emit('clickbutton_prev_in', 'prev');
  }

  handleButtonclickNext() {
    socket.emit('clickbutton_next_in', 'next');
  }

  handleButtonclickLeft() {
    socket.emit('clickbutton_up_in', 'prev');
  }

  handleButtonclickRight() {
    socket.emit('clickbutton_down_in', 'next');
  }

  renderContent() {
    const { dimensions, touches } = this.state;

    return (
      <div>
        <CanvasComponent touches={touches} w={dimensions.width} h={dimensions.height}></CanvasComponent>
      </div>
    );
  }

  render() {
    const { dimensions } = this.state;

    return (
      <div className="ctn_touchpad" ref={el => (this.container = el)}>

        {dimensions && this.renderContent()}

        <div className="touchpad" ref="toucharea">
          <div className="arrow up"><Icon>arrow_drop_up</Icon></div>
          <div className="arrow right"><Icon>arrow_right</Icon></div>
          <div className="arrow down"><Icon>arrow_drop_down</Icon></div>
          <div className="arrow left"><Icon>arrow_left</Icon></div>
        </div>
        
        <div className="btns">
          <div className="prev_next">
            <button onClick={this.handleButtonclickPrev}>Prev</button>
            <button onClick={this.handleButtonclickNext}>Next</button>
          </div>
          <div className="speed">
            <button
              className="zoomIn"
              onTouchEnd={this.handleButtonclickLeft}
              onClick={this.handleButtonclickLeft}
            >
              Move Left
            </button>
            <button
              className="zoomOut"
              onClick={this.handleButtonclickRight}
            >
              Move Right
            </button>
          </div>

        </div>

      </div>
    )
  }
}

export default ContentTouchPad;