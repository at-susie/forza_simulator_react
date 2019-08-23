import React from 'react'
import Chart from "react-apexcharts";
import SpeedNumber from "./SpeedNumber";

///////////////// Speed ///////////////// 

class SpeedmeterRotatingOuter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ['rgba(255, 94, 0, 1)'],
        labels: [''],
        plotOptions: {
          radialBar: {
            size: 145,
            hollow: {
              margin: 0,
              size: "85%"
            },
            track: {
              background: 'rgba(255, 255, 255, 0.05)'
            },
            startAngle: -136,
            endAngle: 136,
            dataLabels: {
              name: {
                fontSize: '0px',
                color: undefined,
                offsetY: 120
              },
              value: {
                offsetY: 0,
                fontSize: '0px',
                color: '#fff'
              }
            }
          }
        }
      }
    }
  }

  render() {
    return (
      <div className="speedmeter_outer">
        <Chart
          options={this.state.options}
          series={[(this.props.speed / 240 * 100).toFixed(0)]}
          type="radialBar"
          width="480"
        />
        <div className="circle-container speed">
          <div className="s_item">0</div>
          <div className="s_item">20</div>
          <div className="s_item">40</div>
          <div className="s_item">60</div>
          <div className="s_item">80</div>
          <div className="s_item">100</div>
          <div className="s_item">120</div>
          <div className="s_item">140</div>
          <div className="s_item">160</div>
          <div className="s_item">180</div>
          <div className="s_item">200</div>
          <div className="s_item">220</div>
          <div className="s_item">240</div>
        </div>
        <SpeedNumber speed={this.props.speed}/>
      </div>
    )
  }
}

class SpeedmeterRotatingInner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ['rgba(255, 94, 0, 0.5)'],
        labels: ['RPM x1000'],
        plotOptions: {
          radialBar: {
            size: 230,
            hollow: {
              margin: 0,
              size: "10%"
            },
            track: {
              background: 'rgba(255, 255, 255, 0.1)'
            },
            startAngle: -136,
            endAngle: 136,
            dataLabels: {
              name: {
                fontSize: '0px',
                color: undefined,
                offsetY: 120
              },
              value: {
                offsetY: 0,
                fontSize: '0px',
                color: '#fff'
              }
            }
          }
        }
      }
    }
  }

  render() {
    return (
      <div className="speedmeter_inner">
        <Chart
          options={this.state.options}
          series={[(this.props.speed / 240 * 100).toFixed(0)]}
          type="radialBar"
          width="320"
        />
        
      </div>
    );
  }
}

export default class SpeedmeterRotating extends React.Component {
  render() {
    return (
      <div className="sg_container speedmeter_rotating">
        <SpeedmeterRotatingInner speed={this.props.speed}/>
        <div className="sp_hider"></div>
        <SpeedmeterRotatingOuter speed={this.props.speed}/>
      </div>
    )
  }
}

