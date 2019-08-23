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

// Composed list item
class ListComposition extends React.Component {

  render() {
    
    var {
      name,
      secondary,
      selected,
    } = this.props;

    return (

      <ListItem onClick={this.props.onClick} selected={selected}>

        <div className="avatar">
          <div className={this.props.avatar}></div>
        </div>
        <div className="item_info">
          <p className="name">{name}</p>
          <p className="secondary">{secondary}</p>
        </div>

      </ListItem>
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
        avatar,
        name,
        secondary
      } = cardContent;
      var selected = this.state.selectedIndex === i;
      return (
        <ListComposition key={i} avatar={avatar}
          name={name} secondary={secondary}
          selected={selected} onClick={(e) => this.onItemSelected(i)} />
      );
    });

    return (
      <div className="cardlist">
        {content}
      </div>
    );
  }
}

var contacts = [
  { avatar: 'avatar_1', name: 'Kenneth Smith', secondary: '(295) 372-8184', liststate: 'active' },
  { avatar: 'avatar_2', name: 'Daniel Walker', secondary: '(295) 457-6514', liststate: 'inactive' },
  { avatar: 'avatar_3', name: 'Jennifer Nelson', secondary: '(255) 158-9835', liststate: 'inactive' },
  { avatar: 'avatar_4', name: 'Lisa Campbell', secondary: '(288) 177-3791', liststate: 'inactive' },
  { avatar: 'avatar_5', name: 'Jennifer Nelson', secondary: '(255) 158-9835', liststate: 'inactive' },
  { avatar: 'avatar_6', name: 'Lisa Campbell', secondary: '(288) 177-3791', liststate: 'inactive' },
  { avatar: 'avatar_7', name: 'Jennifer Nelson', secondary: '(255) 158-9835', liststate: 'inactive' },
  { avatar: 'avatar_8', name: 'Lisa Campbell', secondary: '(288) 177-3791', liststate: 'inactive' },
  { avatar: 'avatar_9', name: 'Jennifer Nelson', secondary: '(255) 158-9835', liststate: 'inactive' },
  { avatar: 'avatar_10', name: 'Lisa Campbell', secondary: '(288) 177-3791', liststate: 'inactive' }
];

class ContentCommunication extends React.Component {
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
          if(this.state.selectedIndex < contacts.length - 1) {
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
      <div className="ctn_communication">
        <ListView cardContents={contacts} selectedIndex={this.state.selectedIndex} onChange={this.onListChanged.bind(this)}/>
      </div>
    );
  }
}

export default ContentCommunication
