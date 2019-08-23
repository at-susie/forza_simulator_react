import React from 'react'

///////////////// Mini Player ///////////////// 

class MiniPlayer extends React.Component {
  render() {
    return (
      <div className="mp_container">
        <div className="miniplayer_cover"></div>
        <div className="miniplayer_info">
          <div className="unit">
            {/* <Icon>volume_up</Icon> */}
            <div>Now playing</div>
          </div>
          <div className="title">
            <div>J-AX - Ostia Lido</div>
          </div>
        </div>
      </div>
    )
  }
}

export default MiniPlayer;