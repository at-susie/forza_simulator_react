import React, { Component } from 'react';

class ItemContainer extends Component {
  render() {
    return (
      <div className="item">
        <div className="avatar">
          <div className={this.props.item.class}></div>
        </div>
        <div className="item_info">
          <p>{this.props.item.name}</p>
          <p>{this.props.item.secondary}</p>
        </div>
      </div>
    );
  }
}

export default ItemContainer;