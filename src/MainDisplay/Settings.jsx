import React from 'react'

class ListItem extends React.Component {
  render() {
    var isSelected = this.props.selected ? "selected" : "";
    var className = "item " + isSelected;
    return (
      <div className={className} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}

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

    var content = this.props.cardContents.map((cardContent, i) => {
      var {
        title,
        description
      } = cardContent;
      var selected = this.state.selectedIndex === i;
      return (
        <ListItem key={i} onClick={(e) => this.onItemSelected(i)} selected={selected}>
          <div className="content">
            <h2 className="title">{title}</h2>
            <p className="description">{description}</p>
          </div>
        </ListItem>
      );
    });

    return (
      <div className="cardlist">
        {content}
      </div>
    );

  }
}

var settings = [{
  title: "Display",
  description: "Set your display options"
}, {
  title: "Sound",
  description: "Adjust volume, tone, etc."
}, {
  title: "Vehicle",
  description: "Manuever vehicle status"
}, {
  title: "Light",
  description: "Welcome lighting, signal light, etc."
}];

class ContentSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  swipeEvent(direction) {

    switch(direction){
      case 'up':
        if(this.state.selectedIndex > 0) {
          this.setState(prevState => ({
            selectedIndex: prevState.selectedIndex - 1
          }));
        }
      break;
      case 'down':
          if(this.state.selectedIndex < settings.length - 1) {
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
      <div className="ctn_settings">
        <ListView cardContents={settings} selectedIndex={this.state.selectedIndex} onChange={this.onListChanged.bind(this)}/>
      </div>
    );
  }
}

export default ContentSettings
