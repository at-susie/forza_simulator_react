import React from 'react';
import PropTypes from 'prop-types';

// Parent
class parent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoge: 'hogehoge'
    };
  }

  hogeFunc() {
    this.setState({ hoge: '変えたぞ' });
  }
  render() {
    return (
      <div>
        <child dataHoge={() => { this.hogeFunc(); }} />
      </div>
    );
  }
}

// Child
const propTypes = {
  dataHoge: PropTypes.func,
};

class child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  clickButton() {
    return this.props.dataHoge();
  }

  render() {
    return (
      <div>
        <button onClick={() => { this.clickButton(); }}>ボタン</button>
      </div>
    );
  }
}

child.propTypes = propTypes;
export default parent;