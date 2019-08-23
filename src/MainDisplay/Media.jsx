import React, { Component } from "react";
import MediaGridItem from './MediaGridItem';
import { log } from "util";

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedIndex !== prevProps.selectedIndex) {
      this.setState({
        selectedIndex: this.props.selectedIndex,
      });
    }
  }

  onItemSelected(index) {
    this.setState((prevState, props) => {
      props.onChange(index);
      return {
        selectedIndex: index
      }
    });
  }

  render() {

    var content = this.props.cardContents.map((item, i) => {
      var className = this.state.selectedIndex === i ? 'react-list-select--item selected': 'react-list-select--item';
      return (
        <div className={className} key={item.id} onClick={() => {this.onItemSelected(i)}}>
          <MediaGridItem item={item}  />
        </div>
      );
    });

    return (
      <div className="react-list-select">
        {content}
      </div>
    );
  }
}

var friends = [
  { id: 1, class: 'media_1', name: 'The Git Up', secondary: 'Blanco Brown', liststate: 'active' },
  { id: 2, class: 'media_2', name: 'J-AX', secondary: 'Ostia Lido', liststate: 'inactive' },
  { id: 3, class: 'media_3', name: 'Mi Morena', secondary: 'Juan Fran', liststate: 'inactive' },
  { id: 4, class: 'media_4', name: 'Nails, Hair, Hips, Heels', secondary: 'Todrik Hall', liststate: 'inactive' },
  { id: 5, class: 'media_5', name: 'Cha Cha', secondary: 'Freddie Dredd', liststate: 'inactive' },
  { id: 6, class: 'media_6', name: 'The Young Thug', secondary: 'The London', liststate: 'inactive' },
  { id: 7, class: 'media_7', name: 'Jambo', secondary: 'Takagi & Ketra', liststate: 'inactive' },
  { id: 8, class: 'media_8', name: 'Easy (Remix)', secondary: 'DaniLeigh', liststate: 'inactive' },
  { id: 9, class: 'media_9', name: 'Dance Monkey', secondary: 'Tones & I', liststate: 'inactive' },
  { id: 10, class: 'media_10', name: 'Uno', secondary: 'Ambjaay', liststate: 'inactive' },
  { id: 11, class: 'media_11', name: 'Old Twon Road', secondary: 'Lil Nas X', liststate: 'inactive' },
  { id: 12, class: 'media_12', name: 'AB6IX', secondary: 'B:Complete', liststate: 'inactive' }
]

// Outer container
class ContentMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  swipeEvent(direction) {

    switch (direction) {
      case 'up':
        if (this.state.selectedIndex > 0) {
          const t = this.state.selectedIndex - 6;
          if(t >= 0) {
            this.setState(prevState => ({
              selectedIndex: t
            }));
          }
        }
        break;
      case 'down':
        const t = this.state.selectedIndex + 6;
        if(t <= 11) {
          this.setState(prevState => ({
            selectedIndex: t
          }));
        }
        break;
      case 'left':
        if (this.state.selectedIndex > 0) {
          this.setState(prevState => ({
            selectedIndex: prevState.selectedIndex - 1
          }));
        }
        break;
      case 'right':
        if (this.state.selectedIndex < friends.length - 1) {
          this.setState(prevState => ({
            selectedIndex: prevState.selectedIndex + 1
          }));
        }
        break;
      default:

        break;
    }

  }

  onListChanged(index) {
    this.setState({
      selectedIndex: index
    });
  }

  render() {
    return (
      <div className="ctn_media">
        <ListView cardContents={friends} selectedIndex={this.state.selectedIndex} onChange={this.onListChanged.bind(this)} />
      </div>
    );
  }
}

export default ContentMedia;