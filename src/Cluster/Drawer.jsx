import React from 'react';
import ReactDOM from 'react-dom';
import ReactDrawer from 'react-drawer';
import Icon from '@material-ui/core/Icon';

/* if you using webpack, should not apply identity to this css */
import 'react-drawer/lib/react-drawer.css';


class DrawerMemu extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      position: 'left',
      noOverlay: false,
      selectedOption: "mode1"
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);

  }
  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }
  closeDrawer() {
    this.setState({ open: false });
  }
  onDrawerClose() {
    this.setState({ open: false });
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  render() {
    return (
      <div className="drawer_container">
        <div style={{ margin: 200 }}>
          <button
            style={{ margin: 20 }}
            onClick={this.toggleDrawer}
            disabled={this.state.open && !this.state.noOverlay}
          >
            {!this.state.open ? <Icon>menu</Icon> : <Icon>menu</Icon>}
          </button>
        </div>
        <ReactDrawer
          open={this.state.open}
          position={this.state.position}
          onClose={this.onDrawerClose}
          noOverlay={this.state.noOverlay}
          >
          <i onClick={this.closeDrawer} className="icono-cross"></i>
          <h2>View Options</h2>
          <div className="option_contents">
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="react-tips"
                  value="mode1"
                  checked={this.state.selectedOption === "mode1"}
                  onChange={this.handleOptionChange}
                  onClick={this.props.action}
                  className="form-check-input"
                />
                View mode 1
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="react-tips"
                  value="mode2"
                  checked={this.state.selectedOption === "mode2"}
                  onChange={this.handleOptionChange}
                  onClick={this.props.action}
                  className="form-check-input"
                />
                View mode 2
              </label>
            </div>

          </div>
        </ReactDrawer>
      </div>
    );
  }
}

export default DrawerMemu