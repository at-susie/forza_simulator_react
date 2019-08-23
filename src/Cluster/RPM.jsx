import React from 'react';
import Chart from "react-apexcharts";
import ShiftPosition from './ShiftPosition';

///////////////// REV ///////////////// 

class RevGraphicOuter extends React.Component {
  
  renderChart(rpm, mode) {
    const renderoptions = {
      colors: ['rgba(255, 255, 255, 1.0)'],
      labels: ['RPM x1000'],
      plotOptions: {
        radialBar: {
          size: 120,
          hollow: {
            margin: 0,
            size: "80%"
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
    return (

      <Chart
          options={renderoptions}
          series={[(rpm / 9000 * 100).toFixed(0)]}
          type="radialBar"
          width= {mode === 1 ? "380" : "480"}
        />
    )
  }

  renderChartAlternative(rpm, mode) {

    const renderoptions = {
      colors: (this.props.viewmode == 2) ? ['rgba(255, 94, 0, 1)'] : ['rgba(255, 255, 255, 1.0)'],
      labels: ['RPM x1000'],
      plotOptions: {
        radialBar: {
          size: (this.props.viewmode == 2) ? 145 : 120,
          hollow: {
            margin: 0,
            size: (this.props.viewmode == 2) ? "85%" : "80%"
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
    return (
      <Chart
          options={renderoptions}
          series={[(rpm / 9000 * 100).toFixed(0)]}
          type="radialBar"
          width= {mode === 1 ? "380" : "480"}
        />
    )
  }

  render() {
    return (
      <div className="revmeter_outer">
        
        {this.props.viewMode === 1 ? this.renderChart(this.props.rpm, this.props.viewmode) : this.renderChartAlternative(this.props.rpm, this.props.viewmode)}

        <div className="circle-container rpm">
          <div className="s_item">0</div>
          <div className="s_item">1</div>
          <div className="s_item">2</div>
          <div className="s_item">3</div>
          <div className="s_item">4</div>
          <div className="s_item">5</div>
          <div className="s_item">6</div>
          <div className="s_item">7</div>
          <div className="s_item">8</div>
          <div className="s_item">9</div>
        </div>
        <div className="label">
          <div className="unit">RPM x1000</div>
        </div>
        <ShiftPosition shiftpos={this.props.gear}/>
      </div>
    );
  }
}

class RevGraphicInner extends React.Component {
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
      <div className="revmeter_inner">
        <Chart
          options={this.state.options}
          series={[(this.props.rpm / 9000 * 100).toFixed(0)]}
          type="radialBar"
          width="320"
        />
        
      </div>
    );
  }
}

class RevGraphic extends React.Component {

  renderRPMView() {
    return (
      <div className="rg_container">
        <RevGraphicOuter viewmode={1} rpm={this.props.rpm} gear={this.props.gear}/>
      </div>
    )
  }

  renderRPMViewAlternative() {
    return (
      <div className="rg_container">
        <RevGraphicInner rpm={this.props.rpm}/>
        <div className="sp_hider"></div>
        <RevGraphicOuter viewmode={2} rpm={this.props.rpm} gear={this.props.gear}/>
      </div>
    )
  }

  render() {
    switch (this.props.viewmode) {
      case 1:
        return this.renderRPMView();
      case 2:
        return this.renderRPMViewAlternative();
      default:
        return this.renderRPMView();
    }
  }
}

export default RevGraphic
