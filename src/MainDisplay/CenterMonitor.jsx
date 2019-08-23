import React from 'react'
import ReactPageScroller from "react-page-scroller";
import Icon from '@material-ui/core/Icon';
import socketIOClient from "socket.io-client";
import ContentNavigation from "./Navigation";
import ContentCommunication from "./Communication";
import ContentMedia from "./Media";
import ContentSettings from "./Settings";
import Config from '../Config/Config';

var socket;

class MainMenuItem extends React.Component {
  render() {
    return (
      <div className="c_menu_item">
        <div className="menu_icon"><Icon>{this.props.iconName}</Icon></div>
        <div className="menu_name">{this.props.menuName}</div>
      </div>
    )
  }
}

class MenuItemWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }

  render() {
    const isSelected = this.props.selectedstate ? "selected" : "";
    const className = "menu_item " + isSelected;
    return (
      <li className={className} onClick={this.props.onClickItem}>
        <MainMenuItem iconName={this.props.iconName} menuName={this.props.menuName}/>
      </li>
    )
  }
}

class CenterMonitor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedmenu: "toppage",
      pageSelected: 0
    };

    this.onTouchNavigation = this.onTouchNavigation.bind(this);
    this.onTouchCommunication = this.onTouchCommunication.bind(this);
    this.onTouchMedia = this.onTouchMedia.bind(this);
    this.onTouchSettings = this.onTouchSettings.bind(this);
    this.toggleClass = this.toggleClass.bind(this);

    socket = socketIOClient(Config.SERVER);
  }

  componentDidMount() {
       
    socket.on("twofinger_swipe_out", direction => {

      switch(direction) {
        case 'up':
          if (this.state.pageSelected === 1) {
            this.onTouchNavigation();
          } else if (this.state.pageSelected === 2) {
            this.onTouchCommunication();
          } else if (this.state.pageSelected === 3) {
            this.onTouchMedia();
          }
        break;
        case 'down':
            if (this.state.pageSelected === 0) {
              this.onTouchCommunication();
            } else if (this.state.pageSelected === 1) {
              this.onTouchMedia();
            } else if (this.state.pageSelected === 2) {
              this.onTouchSettings();
            }
        break;
        default:

        break;
        
      }
      
    });

    socket.on("onefinger_swipe_out", direction => {
      
      if(this.state.pageSelected === 1) {

        window.comm.swipeEvent(direction);

      }

      if(this.state.pageSelected === 2) {

        window.media.swipeEvent(direction);

      }

      if(this.state.pageSelected === 3) {

        window.settings.swipeEvent(direction);

      }
      
    });
   
  }

  onTouchNavigation() {
    this.reactPageScroller.goToPage(0);
    this.setState({ pageSelected: 0 });
  }
  onTouchCommunication() {
    this.reactPageScroller.goToPage(1);
    this.setState((state) => ({ pageSelected: 1 }))
    this.toggleClass()
  }
  onTouchMedia() {
    this.reactPageScroller.goToPage(2);
    this.setState((state) => ({ pageSelected: 2 }))
    this.toggleClass()
  }
  onTouchSettings() {
    this.reactPageScroller.goToPage(3);
    this.setState((state) => ({ pageSelected: 3 }))
    this.toggleClass()
  }

  toggleClass() {

  }

  componentWillUnmount() {
    
    socket.disconnect();

  }

  render() {
    return (
      <div>
        <ul className="main_menu">
          <MenuItemWrapper onClickItem={this.onTouchNavigation} iconName="directions" menuName="Navigation" selectedstate={this.state.pageSelected === 0 ? true : false}/>
          <MenuItemWrapper onClickItem={this.onTouchCommunication} iconName="chat" menuName="Communication" selectedstate={this.state.pageSelected === 1 ? true : false}/>
          <MenuItemWrapper onClickItem={this.onTouchMedia} iconName="music_note" menuName="Media" selectedstate={this.state.pageSelected === 2 ? true : false}/>
          <MenuItemWrapper onClickItem={this.onTouchSettings} iconName="settings_applications" menuName="Settings" selectedstate={this.state.pageSelected === 3 ? true : false}/>
        </ul>
        <div className="main_paging_area">
          <ReactPageScroller ref={c => this.reactPageScroller = c} animationTimer={500} blockScrollUp blockScrollDown>
            <ContentNavigation/>
            <ContentCommunication ref={(comm) => {window.comm = comm}} />
            <ContentMedia ref={(media) => {window.media = media}}/>
            <ContentSettings ref={(settings) => {window.settings = settings}} />
          </ReactPageScroller>
        </div>
      </div>
    )
  }

}

export default CenterMonitor;