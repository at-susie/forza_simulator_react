import React, { Component } from 'react';

// This is just a box
class MediaGridItem extends Component {

  render() {

    return (

      <div className="item">
        <div className={"media_cover " + this.props.item.class}></div>
        <div className="item_info">
          <p>{this.props.item.name}</p>
          <p>{this.props.item.secondary}</p>
        </div>
      </div>

    );
  }
}


export default MediaGridItem;