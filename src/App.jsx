import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import ContentTouchPad from "./Input/TouchPad";
import Cluster from "./Cluster/Cluster";
import CenterMonitor from "./MainDisplay/CenterMonitor";
import ComponentList from "./ComponentList";
import MainMenu from './Main/MainMenu';

class Wrapper extends Component {

  componentDidMount() {

    console.log('did mount', document);

    document.body.addEventListener('touchstart', (e) => {
      e.preventDefault();     
    }, { passive: false });

    document.body.addEventListener('touchmove', (e) => {
      e.preventDefault();     
    }, { passive: false });

    document.body.addEventListener('touchend', (e) => {
      e.preventDefault();     
    }, { passive: false });
    
  }

  render() {
    return (
      <Router>          
          <div className="main_display_container">
            <Switch>
              <Route exact path="/" component={MainMenu} />
              <Route path="/MainDisplay/CenterMonitor" component={CenterMonitor} />
              <Route path="/Input/TouchPad" component={ContentTouchPad} />
              <Route path="/Cluster/Cluster" component={Cluster} />
              <Route path="/ComponentList" component={ComponentList} />
            </Switch>
          </div>
      </Router>
    );
  }
}

export default Wrapper;
