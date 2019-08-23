import React from 'react';
import Clock from 'react-live-clock';

///////////////// Clock ///////////////// 

class ClockContainer extends React.Component {

  render() {
    return (
      <div className="clock_container">
        <Clock format={'HH:mm'} ticking={true} timezone={'Europe/Berlin'} />
      </div>
    )
  }
}

export default ClockContainer;