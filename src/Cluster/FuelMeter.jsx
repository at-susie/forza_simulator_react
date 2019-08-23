import React from 'react'
import Chart from "react-apexcharts";

///////////////// REV ///////////////// 

class FuelMeter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ['rgba(255, 255, 255, 1.0)'],
        plotOptions: {
          radialBar: {
            size: 240,
            hollow: {
              margin: 0,
              size: "90%"
            },
            track: {
              background: 'rgba(255, 255, 255, 0.1)'
            },
            startAngle: -25,
            endAngle: 30,
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
        },
        stroke: {
          dashArray: 8
        }
      }
    }
  }

  render() {
    return (
      <div className="fm_container">
        <Chart
          options={this.state.options}
          series={[this.props.fuel * 100]}
          type="radialBar"
          width="560"
        />
        <div className="fm_icon">
          <svg width="58px" height="64px" viewBox="0 0 58 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="#ffffff" fillRule="evenodd">
              <path d="M40,25.2417707 L42.8326775,25.2417707 C46.146386,25.2417707 48.8326775,27.9280622 48.8326775,31.2417707 L48.8326775,55.1535259 C48.8326775,56.2580954 49.728108,57.1535259 50.8326775,57.1535259 L51.4835414,57.1535259 C52.5881109,57.1535259 53.4835414,56.2580954 53.4835414,55.1535259 L53.4835414,22.898625 C53.4835414,22.368192 53.2728277,21.8594841 52.897755,21.4844114 L43.8275571,12.4142136 L46.6559843,9.58578644 L55.7261821,18.6559843 C56.8514004,19.7812025 57.4835414,21.307326 57.4835414,22.898625 L57.4835414,55.1535259 C57.4835414,58.4672344 54.7972499,61.1535259 51.4835414,61.1535259 L50.8326775,61.1535259 C47.518969,61.1535259 44.8326775,58.4672344 44.8326775,55.1535259 L44.8326775,31.2417707 C44.8326775,30.1372012 43.937247,29.2417707 42.8326775,29.2417707 L40,29.2417707 L40,60 C40,62.209139 38.209139,64 36,64 L4,64 C1.790861,64 2.705415e-16,62.209139 0,60 L0,4 C-2.705415e-16,1.790861 1.790861,4.05812251e-16 4,0 L36,0 C38.209139,-4.05812251e-16 40,1.790861 40,4 L40,25.2417707 Z M10,9 C8.8954305,9 8,9.8954305 8,11 L8,19 C8,20.1045695 8.8954305,21 10,21 L30,21 C31.1045695,21 32,20.1045695 32,19 L32,11 C32,9.8954305 31.1045695,9 30,9 L10,9 Z" id="Combined-Shape" fill="#ffffff"></path>
            </g>
          </svg>
      </div>
      </div >
    );
  }
}
export default FuelMeter